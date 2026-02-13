# pnpm workspace vs Turborepo 技術比較

Monorepo 專案中兩種主要工具的功能定位與使用場景分析。

---

## 核心定位差異

### pnpm workspace
**套件管理工具（Package Manager）**

負責處理 Monorepo 中多個套件的依賴關係和套件連結。

### Turborepo
**建置系統 / 任務執行器（Build System / Task Runner）**

專注於優化建置流程、提升開發效率的任務執行工具。

---

## pnpm workspace 詳解

### 主要功能

1. **依賴管理**
   - 處理多個套件之間的依賴關係
   - 統一管理所有套件的 node_modules

2. **符號連結（Symlink）**
   - 讓套件之間可以互相引用
   - 使用 workspace protocol：`"@liquid/ui": "workspace:*"`

3. **磁碟空間優化**
   - 使用 content-addressable store
   - 相同版本的套件只存一份
   - 大幅節省磁碟空間

### 配置檔案

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### 常用指令

```bash
# 安裝所有依賴
pnpm install

# 只在特定套件執行指令
pnpm --filter @liquid/ui build
pnpm --filter @liquid/ui test

# 遞迴執行所有套件的指令
pnpm -r build
pnpm -r test

# 在所有套件執行指令（並行）
pnpm -r --parallel dev
```

### 優點

- ✅ 快速安裝（比 npm/yarn 快 2-3 倍）
- ✅ 節省磁碟空間（比 npm 節省 50% 以上）
- ✅ 嚴格的依賴解析（避免幽靈依賴）
- ✅ 原生支援 workspace

### 限制

- ❌ 無建置快取機制
- ❌ 無增量建置
- ❌ 需手動管理建置順序
- ❌ 每次都重新執行完整任務

---

## Turborepo 詳解

### 主要功能

1. **智慧快取（Smart Caching）**
   - 記錄建置輸入和輸出的對應關係
   - 相同輸入直接使用快取結果
   - 本地快取 + 遠端快取支援

2. **並行執行（Parallel Execution）**
   - 自動分析套件依賴關係
   - 平行執行無相依的任務
   - 最大化 CPU 使用率

3. **增量建置（Incremental Builds）**
   - 只重建有變更的套件
   - 自動重建依賴變更套件的套件
   - 大幅縮短建置時間

4. **Pipeline 定義**
   - 明確定義任務執行順序
   - 宣告式依賴管理
   - 清晰的任務配置

### 配置檔案

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],    // ^ 表示依賴套件的 build 要先執行
      "outputs": ["dist/**", ".next/**"],  // 快取的輸出目錄
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],     // 本套件的 build 要先執行
      "cache": true,
      "inputs": ["src/**", "test/**"]  // 影響快取的輸入檔案
    },
    "dev": {
      "cache": false,             // 開發模式不使用快取
      "persistent": true          // 持續運行的任務
    },
    "lint": {
      "cache": true
    }
  }
}
```

### 常用指令

```bash
# 執行所有套件的 build 任務
turbo run build

# 執行多個任務
turbo run build test lint

# 只執行特定套件
turbo run build --filter=@liquid/ui

# 執行特定套件及其依賴者
turbo run build --filter=@liquid/ui...

# 強制重新建置（忽略快取）
turbo run build --force

# 查看會執行哪些任務（dry run）
turbo run build --dry-run

# 使用遠端快取
turbo run build --token=<your-token>
```

### 優點

- ✅ 極快的增量建置速度
- ✅ 智慧快取大幅提升效率
- ✅ 自動處理依賴順序
- ✅ 支援遠端快取（團隊共享）
- ✅ 豐富的任務配置選項
- ✅ 優秀的 CI/CD 優化

### 限制

- ⚠️ 需要正確配置 pipeline
- ⚠️ 學習曲線稍高
- ⚠️ 遠端快取需要額外服務（Vercel 免費提供）

---

## 關鍵差異對比表

| 面向 | pnpm workspace | Turborepo |
|------|----------------|-----------|
| **主要職責** | 依賴管理、套件連結 | 任務執行、建置優化 |
| **快取機制** | ❌ 無 | ✅ 本地 + 遠端快取 |
| **平行執行** | 基本支援（`-r --parallel`） | ✅ 智慧平行執行 |
| **依賴分析** | 需手動指定執行順序 | ✅ 自動分析依賴圖 |
| **增量建置** | ❌ 無 | ✅ 只建置變更的部分 |
| **學習曲線** | 低 | 中等 |
| **配置複雜度** | 簡單（一個 YAML 檔） | 中等（需配置 pipeline） |
| **適合場景** | 小型專案、單純依賴管理 | 中大型專案、需要效能優化 |
| **團隊協作** | 基本支援 | ✅ 遠端快取共享 |

---

## 實際使用場景比較

### 場景 1：完整建置所有套件

**只使用 pnpm workspace：**
```bash
pnpm -r run build
# 時間：5 分鐘（每次都重新建置）
```

**使用 pnpm + Turborepo：**
```bash
# 第一次
turbo run build
# 時間：5 分鐘

# 第二次（程式碼無變更）
turbo run build
# 時間：2 秒（使用快取）
```

**效能提升：99% ⬆️**

---

### 場景 2：修改單一套件

假設專案結構：
```
packages/
  ├── utils/       # 基礎工具
  ├── ui/          # UI 元件（依賴 utils）
  └── forms/       # 表單元件（依賴 ui）
apps/
  └── web/         # 網站（依賴 ui, forms）
```

修改了 `packages/utils/` 中的一個檔案：

**只使用 pnpm workspace：**
```bash
pnpm -r run build
# 建置：utils, ui, forms, web（全部）
# 時間：5 分鐘
```

**使用 pnpm + Turborepo：**
```bash
turbo run build
# 建置：utils, ui, forms, web（只建置受影響的）
# 其中 utils 重新建置，其他使用快取或增量建置
# 時間：30 秒
```

**效能提升：90% ⬆️**

---

### 場景 3：CI/CD Pipeline

**只使用 pnpm workspace：**
```yaml
# .github/workflows/ci.yml
- run: pnpm install
- run: pnpm -r run build
- run: pnpm -r run test
# 總時間：8-10 分鐘（每次 PR 都重新跑）
```

**使用 pnpm + Turborepo + 遠端快取：**
```yaml
# .github/workflows/ci.yml
- run: pnpm install
- run: turbo run build test --cache-dir=.turbo
  env:
    TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
# 總時間：
# - 首次：8-10 分鐘
# - 之後（無變更）：1-2 分鐘
# - 部分變更：2-5 分鐘
```

**效能提升：50-90% ⬆️**

---

## 兩者關係

### 重要觀念：互補而非取代

```
┌─────────────────────────────────┐
│     Monorepo 完整解決方案       │
├─────────────────────────────────┤
│                                 │
│  pnpm workspace                 │
│  (套件管理層)                   │
│  ├─ 依賴安裝                    │
│  ├─ 套件連結                    │
│  └─ workspace 管理              │
│                                 │
│  Turborepo                      │
│  (任務執行層)                   │
│  ├─ 建置優化                    │
│  ├─ 快取管理                    │
│  └─ 任務編排                    │
│                                 │
└─────────────────────────────────┘
```

### 協作方式

1. **pnpm** 負責：
   - 安裝依賴：`pnpm install`
   - 管理 workspace 結構
   - 套件版本管理

2. **Turborepo** 負責：
   - 執行建置：`turbo run build`
   - 執行測試：`turbo run test`
   - 執行 lint：`turbo run lint`
   - 管理快取和增量建置

---

## 選擇建議

### 選項 1：只用 pnpm workspace

**適合場景：**
- ✅ 專案初期（少於 3 個套件）
- ✅ 團隊對 Monorepo 不熟悉
- ✅ 建置時間可接受（< 2 分鐘）
- ✅ 想快速啟動專案

**何時升級：**
- 建置時間超過 3 分鐘
- 套件數量超過 5 個
- 需要優化 CI/CD 時間
- 團隊成員經常重複建置

---

### 選項 2：pnpm + Turborepo

**適合場景：**
- ✅ 中大型專案（5+ 個套件）
- ✅ 重視開發體驗
- ✅ 需要 CI/CD 優化
- ✅ 團隊協作頻繁

**投資回報：**
- 初期設定時間：30-60 分鐘
- 長期時間節省：每天 1-2 小時
- ROI：通常在 1 週內回本

---

## 遷移路徑

如果你已經使用 pnpm workspace，要加入 Turborepo 很簡單：

### 步驟 1：安裝 Turborepo

```bash
pnpm add -D -w turbo
```

### 步驟 2：建立 turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 步驟 3：更新 package.json 指令

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test"
  }
}
```

### 步驟 4：開始使用

```bash
# 原本
pnpm -r run build

# 現在
pnpm build  # or: turbo run build
```

---

## 最佳實踐

### pnpm workspace 最佳實踐

1. **使用 workspace protocol**
   ```json
   {
     "dependencies": {
       "@liquid/ui": "workspace:*"  // 永遠使用 workspace 版本
     }
   }
   ```

2. **嚴格的依賴管理**
   ```ini
   # .npmrc
   auto-install-peers=true
   strict-peer-dependencies=true
   ```

3. **分離開發和生產依賴**
   ```bash
   # 開發依賴安裝在 root
   pnpm add -D -w eslint prettier

   # 套件依賴安裝在對應套件
   pnpm --filter @liquid/ui add react
   ```

---

### Turborepo 最佳實踐

1. **明確定義 outputs**
   ```json
   {
     "pipeline": {
       "build": {
         "outputs": ["dist/**", "build/**", ".next/**"]
       }
     }
   }
   ```

2. **合理使用快取**
   ```json
   {
     "pipeline": {
       "test": {
         "cache": true,           // 單元測試可快取
         "inputs": ["src/**", "test/**"]
       },
       "e2e": {
         "cache": false           // E2E 測試不快取
       }
     }
   }
   ```

3. **使用 .gitignore 排除快取**
   ```gitignore
   .turbo
   ```

4. **CI 中使用遠端快取**
   ```bash
   turbo run build --token=$TURBO_TOKEN
   ```

---

## 總結

- **pnpm workspace** 是 Monorepo 的基礎，負責套件管理
- **Turborepo** 是效能加速器，負責建置優化
- 兩者可以完美共存，互補而非取代
- 小專案可以只用 pnpm，大專案建議加上 Turborepo
- 隨時可以從 pnpm 升級到 pnpm + Turborepo，遷移成本低

---

## 參考資料

- [pnpm workspace 官方文檔](https://pnpm.io/workspaces)
- [Turborepo 官方文檔](https://turbo.build/repo/docs)
- [Monorepo 工具比較](https://monorepo.tools/)
