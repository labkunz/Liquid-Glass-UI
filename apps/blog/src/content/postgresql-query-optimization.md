# PostgreSQL 查詢最佳化：從 EXPLAIN 看見慢查詢根因

`EXPLAIN ANALYZE` 是找慢查詢最強的工具，但看懂輸出需要一點練習。這篇文章從真實的慢查詢場景出發，帶你讀懂執行計畫、決定何時加 Index。

## 基本使用

```sql
EXPLAIN ANALYZE
SELECT * FROM jobs
WHERE department = 'Engineering'
ORDER BY created_at DESC
LIMIT 20;
```

輸出（簡化版）：
```
Limit  (cost=0.00..1243.50 rows=20 width=256)
  ->  Sort  (cost=0.00..6217.50 rows=1000 width=256)
        Sort Key: created_at DESC
        ->  Seq Scan on jobs  (cost=0.00..1180.00 rows=1000 width=256)
              Filter: (department = 'Engineering')
              Rows Removed by Filter: 9000
```

問題一眼看出：`Seq Scan`（全表掃描）+ Rows Removed 很多 = 應該加 index。

## 讀懂 EXPLAIN 的關鍵指標

```
cost=0.00..1243.50
  ^          ^
  起始成本    總成本（越小越好）

rows=20
  預估回傳行數

actual time=0.042..5.123
  ^            ^
  首行時間      最後一行時間（毫秒）

Rows Removed by Filter: 9000
  掃描了但被過濾掉的行數（越多代表 index 越有用）
```

## 三種常見掃描類型

```
Seq Scan        全表掃描，適合小表或大量資料
Index Scan      用 index，適合高選擇性的查詢
Index Only Scan 完全從 index 取得資料，最快
Bitmap Heap Scan 中間方案，多個條件組合時出現
```

## 何時加 Index？

### 場景 1：WHERE 子句中的欄位

```sql
-- 頻繁查詢 WHERE status = 'open' 的情況
-- 加單欄 Index：
CREATE INDEX idx_jobs_status ON jobs(status);

-- 如果同時過濾 status 和 department：
CREATE INDEX idx_jobs_status_dept ON jobs(status, department);
-- 注意：複合 index 的欄位順序很重要！
-- 選擇性高（值種類多）的欄位放前面
```

### 場景 2：ORDER BY 和 LIMIT 組合

```sql
-- 分頁查詢：WHERE + ORDER BY + LIMIT
SELECT * FROM candidates
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 20 OFFSET 100;

-- 建立 composite index 覆蓋 WHERE 和 ORDER BY
CREATE INDEX idx_candidates_active_date
  ON candidates(status, created_at DESC)
  WHERE status = 'active';  -- Partial Index：只 index 有效資料
```

### 場景 3：JOIN 欄位

```sql
-- JOIN 的條件欄位一定要 index
SELECT j.title, COUNT(c.id) as applicant_count
FROM jobs j
LEFT JOIN candidates c ON c.job_id = j.id  -- job_id 需要 index
GROUP BY j.id;

CREATE INDEX idx_candidates_job_id ON candidates(job_id);
```

## 不應該加 Index 的情況

```sql
-- ❌ 低選擇性欄位（只有幾個唯一值）
CREATE INDEX idx_users_gender ON users(gender);
-- gender 只有 3-4 種值，Postgres 更傾向直接 Seq Scan

-- ❌ 頻繁 INSERT/UPDATE 的表
-- 每次寫入都要更新 index，寫入成本增加

-- ❌ 小表
-- 表格只有幾百行，Seq Scan 比 Index Scan 還快
```

## 實際慢查詢案例

**問題**：應徵者列表頁面，過濾 + 排序 + 分頁，7 秒回應：

```sql
EXPLAIN ANALYZE
SELECT c.*, j.title as job_title
FROM candidates c
JOIN jobs j ON j.id = c.job_id
WHERE c.status IN ('interview_1', 'interview_2')
  AND c.created_at >= '2025-01-01'
ORDER BY c.created_at DESC
LIMIT 20;
```

分析輸出後發現：
- `candidates.status` 沒有 index → Seq Scan 掃 10 萬行
- `candidates.job_id` 沒有 index → Hash Join 很慢

**解決方案**：

```sql
-- 1. 複合 Index 覆蓋 WHERE + ORDER BY
CREATE INDEX idx_candidates_status_date
  ON candidates(status, created_at DESC);

-- 2. JOIN 欄位 Index
CREATE INDEX idx_candidates_job_id ON candidates(job_id);
```

**結果**：從 7 秒降到 45ms。

## EXPLAIN 的進階使用

```sql
-- 看更詳細的資訊
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM candidates WHERE status = 'active';

-- BUFFERS 顯示快取命中率
-- shared hit=1000 miss=0 → 100% 從快取讀取
-- shared hit=0 miss=1000 → 都要讀磁碟
```

## Index 維護

```sql
-- 查看所有 index 大小
SELECT indexname, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes
WHERE relname = 'candidates';

-- 查看 index 使用頻率（使用次數為 0 的可以考慮移除）
SELECT indexname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
WHERE relname = 'candidates';

-- 重建 bloated index
REINDEX INDEX idx_candidates_status_date;
```

查詢最佳化是一個「量測 → 分析 → 改善 → 量測」的循環，`EXPLAIN ANALYZE` 是這個循環的起點。不要猜，看數字說話。
