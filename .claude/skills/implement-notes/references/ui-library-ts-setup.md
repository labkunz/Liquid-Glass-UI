# UI Library TypeScript 設定與 Export 命名規範

## 摘要

記錄 `@liquid/ui` export 命名決策，以及 monorepo 跨 package 型別解析的設定方式與踩坑紀錄。

---

## 1. Export 命名規範：加上 `Liquid` 前綴

### 決策

所有元件 export 統一加上 `Liquid` 前綴：

```ts
// packages/ui/src/index.ts
export { default as LiquidInput }    from './components/Input'
export { default as LiquidSelect }   from './components/Select'
export { default as LiquidButton }   from './components/Button'
// ...
```

例外：`GlassFilterProvider` 維持原名（它是 Provider，不是一般 UI 元件）。

### 理由

- 避免與原生 HTML 元素或使用端自定義元件命名衝突（`Input` 太通用）
- 與 Vue 生態系慣例一致（Element Plus 用 `El`、Naive UI 用 `N`）
- `FormField.vue` 的 `componentMap` 語意更清晰
- 面試說明時更自然：「這是 Liquid UI 的元件」

### 不保留雙版本的理由

此 library 為全新開發，沒有外部使用者，無需向後兼容，直接改名即可。

---

## 2. Monorepo 型別解析：paths vs build

### 問題背景

`packages/logic` 的 `FormField.vue` import `@liquid/ui` 時，TypeScript 預設從 `dist/index.d.ts` 讀型別定義。若 `dist/` 是舊的 build 產物，就會看到過時的 export 名稱，導致 TS 報錯。

### 兩個機制各自的職責

| 機制 | 作用範圍 | 說明 |
|------|---------|------|
| `tsconfig paths` | TypeScript 型別檢查 | 告訴 TS compiler 去哪裡讀型別，改 source 即時生效 |
| `dist/` build 產物 | Vite build / 執行期 | 實際 JavaScript 執行時依賴，需要 build 才更新 |

兩者是獨立系統，`paths` 不影響 Vite 的模組解析。

### 設定方式

在根目錄 `tsconfig.json` 加上 `paths`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@liquid/ui":     ["packages/ui/src/index.ts"],
      "@liquid/tokens": ["packages/tokens/src/index.ts"],
      "@liquid/logic":  ["packages/logic/src/index.ts"]
    }
  }
}
```

放在根目錄讓所有 packages 和 apps 繼承，不需要每個 tsconfig 重複設定。

### 實際執行流程

- **開發期**：修改 `packages/ui/src/index.ts` → IDE 立即感知，不需要 build
- **執行期**：需要先 `pnpm build:ui` 更新 `dist/`，Vite 才能正確 bundle

---

## 3. `composite: true` 與 `paths` 的衝突

### 問題

`packages/logic/tsconfig.json` 原本有 `"composite": true`，加上 `paths` 後出現兩個 TS 錯誤：

- **TS6059**：`packages/ui/src/index.ts` 不在 `rootDir` 之下
- **TS6307**：該檔案未列於 `include` 清單內

### 根本原因

`composite: true` 強制所有被此 tsconfig 編譯到的原始檔必須在 package 自身目錄內。`paths` 將 `@liquid/ui` 重導向到 `packages/ui/src/index.ts`，該檔案在 `packages/logic/` 之外，違反了邊界限制。

### 解決方式：移除 `composite: true`

```json
// packages/logic/tsconfig.json（修改後）
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules", "**/*.spec.ts"]
}
```

### 為什麼可以移除

`composite: true` 的主要用途是搭配 TypeScript Project References 的增量編譯。此專案規模小，沒有啟用 Project References，`composite` 是原始 scaffolding 的遺留設定，移除不影響任何功能。

### 哪些 package 保留 `composite: true`

`packages/ui` 和 `packages/tokens` 保留，因為它們是被依賴的「葉節點」，不會 import 其他 workspace packages，不會觸發同樣的衝突。

---

## 4. Storybook stories 同步更新

將 `@liquid/ui` export 從無前綴改成 `Liquid` 前綴後，所有 Storybook stories 的 import 和 `component:` 欄位都需要同步更新。

使用 `perl` 進行批次替換（macOS 的 BSD `sed` 不支援 `\b` word boundary）：

```bash
perl -pi -e 's/\bButton\b/LiquidButton/g' Button.stories.ts
# 對每個元件對應的 stories 檔案執行
```
