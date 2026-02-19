# Vercel Monorepo 部署策略

將 pnpm workspace monorepo（5 個 app + 3 個 package）部署至 Vercel 的完整策略與設定。

---

## 架構決策

### 5 個獨立 Vercel Project

每個 app 對應一個 Vercel project，全部指向同一個 GitHub repo。

| Vercel Project | App | 說明 |
|---------------|-----|------|
| liquid-landing | `apps/landing` | 主要入口，放在履歷的唯一連結 |
| liquid-blog | `apps/blog` | Demo：部落格 |
| liquid-admin | `apps/admin` | Demo：後台管理 |
| liquid-docs | `apps/docs` | VitePress 文件站 |
| liquid-storybook | `apps/storybook` | Storybook 元件展示 |

### URL 策略

- 無自訂域名，使用 Vercel 預設 URL（`project-name.vercel.app`）
- **Landing 是唯一對外分享的連結**，其他站從 Landing 導出
- Project 命名決定 URL 可讀性，命名時盡量簡潔有意義

### 部署順序（重要）

Landing 頁面需要連結到其他站，因此：

1. 先部署 blog、admin、docs、storybook（取得各自 URL）
2. 最後部署 landing（填入其他站的連結）

---

## Root Directory 策略：解法 A

**每個 Vercel project 的 Root Directory 設為各自的 app 目錄**（非 repo root）。

優點：
- 每個 app 有獨立的 `vercel.json`，runtime 行為各自精確
- Output Directory 填法更簡單（`dist` 而非 `apps/landing/dist`）

---

## 各 Project 的完整設定

| 設定項目 | landing | blog | admin | docs | storybook |
|---------|---------|------|-------|------|-----------|
| Root Directory | `apps/landing` | `apps/blog` | `apps/admin` | `apps/docs` | `apps/storybook` |
| Framework Preset | **Other** | **Other** | **Other** | **Other** | **Other** |
| Build Command | 見下表 | 見下表 | 見下表 | 見下表 | 見下表 |
| Output Directory | `dist` | `dist` | `dist` | `.vitepress/dist` | `storybook-static` |

> ⚠️ Framework Preset 必須選 **Other**，避免 Vercel 自動偵測覆蓋 Build Command。

### Build Commands

```bash
# landing
pnpm -w --filter @liquid/landing... run build

# blog
pnpm -w --filter @liquid/blog... run build

# admin
pnpm -w --filter @liquid/admin... run build

# docs
pnpm -w --filter @liquid/docs... run build

# storybook
pnpm -w --filter @liquid/storybook... run build
```

**`-w` 的作用**：從 workspace root 執行，即使 Vercel 的 cwd 在 app 子目錄內也能正確找到所有 packages。

**`...` 的作用**：自動包含該 app 的所有 workspace 依賴，並依照拓撲順序 build（例如 `tokens → ui → landing`）。

### Environment Variables（每個 project 都要加）

```
ENABLE_EXPERIMENTAL_COREPACK=1
```

讓 Vercel 使用 Corepack，根據 `package.json` 的 `packageManager` 欄位自動使用正確版本的 pnpm。

---

## vercel.json 設定

### SPA App（landing、blog、admin）

```json
{
  "installCommand": "pnpm install",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- `installCommand`：確保 pnpm 從 workspace root 安裝，不依賴 Vercel 的推測邏輯
- `rewrites`：Vue Router 的 SPA 必須，避免直接訪問子路由時 404

### 靜態站（docs、storybook）

```json
{
  "installCommand": "pnpm install"
}
```

不需要 SPA rewrite（VitePress / Storybook 輸出完整靜態 HTML）。

### 根目錄 vercel.json

保留為空（只留 `$schema`），不會被任何 project 讀取，純作標記用途。

---

## 關鍵踩坑紀錄

### 1. vite.config 的 `base` 路徑

blog 和 admin 原本有：
```ts
base: process.env.NODE_ENV === 'production' ? '/blog' : '/'
```

這是假設 app 部署在同一 domain 的子路徑下。改為獨立 Vercel project 後，`base` 必須移除（預設 `/`），否則資源路徑錯誤導致白畫面。

### 2. pnpm workspace 的依賴 build 順序

各 app 依賴 packages 的 **build 產物**（`dist/`），直接執行 `vite build` 不會自動先 build packages。Build Command 必須用 `pnpm -w --filter <app>... run build` 讓 pnpm 處理順序。

### 3. vite.config 的 alias 指向 src/

各 app 的 alias 設定：
```ts
'@liquid/ui': path.resolve(__dirname, '../../packages/ui/src'),
```

這讓 Vite build 時直接編譯 packages 的 source，而非使用 `dist/`。在 Vercel 上可正常運作（source 存在於 repo），但 `...` filter 先跑出來的 packages `dist/` 會白 build（冗餘但無害）。

---

## CI/CD 策略

### 目前方案：純 Vercel Git Integration

```
git push → GitHub → Vercel 偵測 → 5 個 project 並行 rebuild
```

不需要 GitHub Actions，零設定。

### 未來升級時機

當以下任一條件出現時，考慮引入 GitHub Actions：
- **Build 明顯變慢**：需要選擇性部署（只 rebuild 有變更的 app）
- **加入測試流程**：需要在部署前跑 typecheck / unit test

GitHub Actions 方案需要：`VERCEL_TOKEN`、各 project 的 `VERCEL_PROJECT_ID` 和 `VERCEL_ORG_ID` 作為 GitHub Secrets。
