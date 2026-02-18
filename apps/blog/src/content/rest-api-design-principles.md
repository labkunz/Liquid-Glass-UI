# REST API 設計原則：讓 API 說出好故事

好的 API 設計像一本清晰的書：命名直覺、狀態碼準確、錯誤訊息有意義。這篇整理了七個核心原則，以及你可能正在犯的常見反模式。

## 原則 1：資源導向，而非動作導向

REST 的核心是**資源（Resource）**，不是動作。URL 應該代表名詞，HTTP Method 代表動詞：

```
# ❌ 動作導向（RPC 風格）
GET  /getUsers
POST /createUser
POST /updateUser/123
POST /deleteUser/123

# ✅ 資源導向（REST 風格）
GET    /users           # 取得列表
POST   /users           # 建立
GET    /users/123       # 取得單筆
PUT    /users/123       # 完整更新
PATCH  /users/123       # 部分更新
DELETE /users/123       # 刪除
```

## 原則 2：準確使用 HTTP 狀態碼

狀態碼是 API 的「表情」，用錯了讓使用者摸不著頭緒：

```
2xx 成功：
  200 OK          - 通用成功
  201 Created     - 建立成功（POST 後回傳）
  204 No Content  - 成功但無回傳（DELETE 後）

4xx 客戶端錯誤：
  400 Bad Request     - 請求格式錯誤、驗證失敗
  401 Unauthorized    - 未認證（沒有 token）
  403 Forbidden       - 已認證但無權限
  404 Not Found       - 資源不存在
  409 Conflict        - 資源衝突（重複建立）
  422 Unprocessable   - 格式對但業務邏輯驗證失敗

5xx 伺服器錯誤：
  500 Internal Error  - 未預期錯誤
  503 Service Unavail - 服務暫時不可用
```

最常見的錯誤：所有錯誤都回傳 200，把錯誤碼放在 body 裡。這讓客戶端無法用標準方式處理錯誤。

## 原則 3：一致的錯誤格式

定義一個統一的錯誤回應結構：

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "請求資料驗證失敗",
    "details": [
      {
        "field": "email",
        "message": "必須是有效的 Email 格式"
      },
      {
        "field": "name",
        "message": "名稱不能超過 50 字"
      }
    ],
    "requestId": "req-abc123"
  }
}
```

`requestId` 很重要——讓使用者可以在報告問題時提供，讓你能在 logs 裡找到對應的記錄。

## 原則 4：分頁標準化

列表資源必須支援分頁，格式要統一：

```json
// cursor-based pagination（推薦，適合大資料集）
GET /articles?cursor=eyJpZCI6MTAwfQ&limit=20

{
  "data": [...],
  "pagination": {
    "hasNext": true,
    "cursor": "eyJpZCI6MTIwfQ",
    "limit": 20,
    "total": 500
  }
}

// offset-based pagination（適合需要跳頁的場景）
GET /articles?page=3&pageSize=20

{
  "data": [...],
  "pagination": {
    "page": 3,
    "pageSize": 20,
    "total": 500,
    "totalPages": 25
  }
}
```

## 原則 5：版本管理

API 一旦公開，修改就要向後相容。版本管理是必要的：

```
# URL 版本（最直觀）
/api/v1/users
/api/v2/users

# Header 版本（對 URL 友好）
Accept: application/vnd.myapi.v2+json

# Query String 版本（不推薦，容易被快取忽略）
/api/users?version=2
```

URL 版本是最常見也最直觀的選擇，適合大多數 API。

## 原則 6：過濾、排序、搜尋的設計

```
# 過濾
GET /jobs?status=open&department=engineering

# 排序（field 加 -/+ 或 sort/order 參數）
GET /jobs?sort=-createdAt          # 降序
GET /jobs?sort=applicants&order=desc

# 搜尋
GET /jobs?q=frontend+engineer

# 組合
GET /jobs?status=open&sort=-createdAt&page=1&pageSize=10
```

## 原則 7：Nested Resource 的限度

```
# ✅ 一層 nested 是合理的
GET /jobs/123/applicants

# ❌ 超過兩層就難以維護
GET /companies/1/departments/2/teams/3/members/4/tasks/5
```

超過兩層時，考慮用 query parameter：

```
GET /tasks?memberId=4
```

## 常見反模式

```
❌ 敏感資訊在 URL
   GET /users/login?password=secret123

❌ 動詞在 URL
   POST /users/activate/123

❌ 忽略冪等性
   多次 DELETE /users/123 應該都回 204（不是第二次 404）

❌ 回傳裸陣列
   [{ "id": 1 }, { "id": 2 }]
   # 應該包在物件裡，方便未來加 metadata
   { "data": [...], "total": 2 }
```

## 實用的 OpenAPI 文件

好的 API 需要文件。用 OpenAPI（Swagger）規格：

```yaml
paths:
  /jobs:
    get:
      summary: 取得職缺列表
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [open, closed, draft]
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/JobListResponse'
```

先寫 OpenAPI 規格再實作，是「API-First 開發」的核心——讓前後端可以並行開發。

好的 API 是工程團隊最重要的公共財之一，值得認真設計。
