# packages/logic TypeScript 建置錯誤修正紀錄

部署 `@liquid/admin` 到 Vercel 時，`packages/logic` 的 build 失敗。以下記錄各錯誤的原因與修正方式。

---

## 錯誤清單

| 錯誤碼 | 檔案 | 說明 |
|--------|------|------|
| TS2742 | `src/composables/modal.ts:71` | `modalStore` 型別無法命名 |
| TS6133 | `src/form/vue/FormEngine.vue:12` | `buildInitialValues` 未使用 |
| TS6133 | `src/form/vue/FormField.vue:27` | `props` 變數未使用 |
| TS2322 / TS2345 | `src/form/vue/FormField.vue:65` | 動態元件 props 型別衝突 |
| TS6133 | `src/table/vue/TableEngine.vue:11` | `LiquidTable` 未使用 |
| TS6196 | `src/table/vue/TableEngine.vue:17` | `ColumnSchema` 未使用 |
| vite-plugin-dts | `packages/logic/vite.config.ts` | api-extractor 模組解析崩潰 |

---

## 修正一：TS2742 — `modalStore` 型別無法命名

**檔案**：`src/composables/modal.ts:71`

**錯誤訊息**：
```
The inferred type of 'modalStore' cannot be named without a reference to
'.pnpm/@vue+shared@3.5.28/node_modules/@vue/shared'. This is likely not portable.
A type annotation is necessary.
```

**原因**：`reactive<ModalState>()` 的回傳型別在內部引用了 `@vue/shared` 的私有路徑。TypeScript 在產生宣告檔（`.d.ts`）時，無法用一個可移植的名稱表達這個推論型別。

**修正**：加上明確的 `ModalState` 型別標注，TypeScript 直接使用已定義的介面，不需要往內推導 Vue 內部型別。

```ts
// Before
export const modalStore = reactive<ModalState>({

// After
export const modalStore: ModalState = reactive<ModalState>({
```

---

## 修正二：TS6133 — `buildInitialValues` 未使用

**檔案**：`src/form/vue/FormEngine.vue:12`

**原因**：`buildInitialValues` 曾被規劃用於初始化表單值，最終改由外部傳入 `modelValue`，但 import 未清理。

**修正**：從 import 中移除。

```ts
// Before
import { parseSchema, buildInitialValues } from '../core/schema-parser'

// After
import { parseSchema } from '../core/schema-parser'
```

---

## 修正三：TS6133 — `props` 變數未使用

**檔案**：`src/form/vue/FormField.vue:27`

**原因**：在 Vue 3 的 `<script setup>` 中，`defineProps()` 的回傳值（`props`）只有在 script 段落內需要以 `props.xxx` 方式存取時才需要捕捉。Template 可以直接使用 prop 名稱（`field`、`modelValue`、`error`），不需要透過 `props` 變數。由於 script 段落內沒有任何地方用到 `props`，TypeScript 將其標記為未使用。

**修正**：移除變數捕捉，直接呼叫 `defineProps<Props>()`。

```ts
// Before
const props = defineProps<Props>()

// After
defineProps<Props>()
```

> ⚠️ Template 中仍可直接使用 `field`、`modelValue`、`error`，行為不變。

---

## 修正四：TS2322 / TS2345 — 動態元件 props 型別衝突

**檔案**：`src/form/vue/FormField.vue:63-70`

**原因**：使用 `<component :is="componentMap[field.type]">` 時，TypeScript 對 `componentMap` 中所有元件的 props 做 **union 型別驗證**，要求傳入的 props 必須同時滿足所有元件的型別要求。

- `modelValue: unknown` 不符合 `LiquidInput` 需要的 `string | number | boolean | null | undefined`
- 某些元件（如 `LiquidCheckbox`）需要額外的 `value` prop，使 union 驗證更加嚴格

**修正**：

1. `:is` 轉型為 `any`，繞過 union 型別驗證（Vue 3 動態元件的標準做法）
2. `:model-value` 明確標注型別

```html
<!-- Before -->
<component
  :is="componentMap[field.type]"
  :model-value="modelValue"

<!-- After -->
<component
  :is="(componentMap[field.type] as any)"
  :model-value="(modelValue as string | number | boolean | null | undefined)"
```

> 動態元件在 runtime 仍會正確渲染，`as any` 只影響靜態型別檢查階段。

---

## 修正五：TS6133 / TS6196 — `TableEngine` 未使用的 import

**檔案**：`src/table/vue/TableEngine.vue`

**原因**：`TableEngine` 最終改為直接渲染原生 `<table>` HTML 元素，而非使用 `<LiquidTable>` 元件。`ColumnSchema` 型別也未在 emits 或任何邏輯中使用，但兩者都留在 import 中。

**修正**：從 import 中移除。

```ts
// Before
import { LiquidTable, LiquidPagination } from '@liquid/ui'
import type { ColumnSchema, SortState, TableEngineProps } from '../core/types'

// After
import { LiquidPagination } from '@liquid/ui'
import type { SortState, TableEngineProps } from '../core/types'
```

---

## 修正六：vite-plugin-dts api-extractor 崩潰

**檔案**：`packages/logic/vite.config.ts`

**錯誤訊息**：
```
[vite:dts] Internal Error: getResolvedModule() could not resolve module name "./modal"
/vercel/path0/packages/logic/dist/logic/src/composables/index.d.ts:3:1
```

**原因**：`rollupTypes: true` 會啟用 `api-extractor` 將所有 `.d.ts` 合併為單一檔案。`api-extractor` 在解析 `composables/index.d.ts` 的 `export * from './modal'` 時，因為 pnpm 的 hoisting 策略導致內部路徑解析機制失效而崩潰。這在 Vercel 的隔離 build 環境中更容易觸發。

**修正**：`rollupTypes: false`，改為輸出獨立的 `.d.ts` 檔案結構，完全避開 api-extractor。

```ts
// Before
dts({
  include: ['src'],
  outDir: 'dist',
  rollupTypes: true
})

// After
dts({
  include: ['src'],
  outDir: 'dist',
  rollupTypes: false
})
```

> `rollupTypes: false` 的型別輸出對 package consumers 使用上無差異，只是宣告檔從單一合併檔改為多個對應原始路徑的檔案。

---

## 觸發條件

這些錯誤在本地開發時不會顯現，原因：

- 本地 `apps/admin` 使用 vite alias 直接指向 `packages/logic/src/`，**完全跳過** `packages/logic` 的 build 流程
- Vercel 執行 `pnpm --filter @liquid/admin... run build` 時，先 build packages 再 build app，`packages/logic` 的 build 錯誤才會暴露
