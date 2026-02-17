# Vue CSS Modules 在 Storybook 中的樣式失效問題

在 Vue 元件使用 CSS Modules 時，於 Storybook 中樣式不如預期套用的問題排查記錄。

---

## 環境資訊

- **Storybook 版本**: 8.6.15
- **Framework**: Vue 3.4.21
- **建置工具**: Vite 5.4.21
- **CSS 機制**: Vue SFC + CSS Modules (`.module.css`)

---

## 問題描述

Button 元件在 Storybook 中顯示為原生 HTML 按鈕樣式，用瀏覽器開發工具查看，可以看到樣式來源是 `user agent stylesheet`，自訂的 CSS 規則完全沒有套用。

---

## 根本原因分析（三層問題）

### 問題一：`<style scoped>` 與 `.module.css` 並用，但用字串類名

**錯誤的寫法：**

```vue
<template>
  <button :class="['liquid-button', `liquid-button--${variant}`]">
  </button>
</template>

<style src="./Button.module.css" scoped></style>
```

**問題所在：**

CSS Modules（`.module.css` 後綴）會將類名 hash 化。例如：
- CSS 中的 `.liquid-button` → 實際輸出 `.liquid-button_abc12`
- 但 template 中直接寫死的字串 `'liquid-button'` 不會被 hash 化
- 兩者對不上，樣式無法套用

**直覺誤解：** 很多人以為 `.module.css` 只是命名慣例，實際上 Vite 會以此判斷是否啟用 CSS Modules 機制。

---

### 問題二：`<style>` 標籤要用 `module` 而非 `scoped`

CSS Modules 和 scoped 是兩種不同的樣式隔離機制，不應混用：

| 機制 | 運作方式 | 引用方式 |
|------|---------|---------|
| `scoped` | 為元素加 `data-v-xxx` 屬性選擇器 | 直接使用類名字串 |
| `module` | 將類名 hash 化，透過 JS 物件引用 | 透過 `$style` 或 `useCssModule()` |

**修正：**

```vue
<!-- ❌ 錯誤 -->
<style src="./Button.module.css" scoped></style>

<!-- ✅ 正確 -->
<style src="./Button.module.css" module></style>
```

---

### 問題三：Storybook 的 Vite 配置未設定 `localsConvention`

**背景：**

`packages/ui/vite.config.ts` 有設定：

```ts
css: {
  modules: {
    localsConvention: 'camelCase'
  }
}
```

但此設定**只在 `pnpm build:ui` 時有效**，Storybook 使用自己的 Vite 實例，不繼承這個配置。

**兩個環境的 CSS Module key 格式不同：**

| 環境 | `localsConvention` | `.liquid-button--primary` 的 key |
|------|-------------------|-------------------------------|
| `pnpm build:ui` | `'camelCase'` | `liquidButtonPrimary` |
| Storybook（修改前） | 未設定（預設） | `liquid-button--primary` |

因此在 Storybook 中，用 camelCase 去查找 CSS Module key 會得到 `undefined`。

**修正：在 `apps/storybook/.storybook/main.ts` 的 `viteFinal` 中補上設定：**

```ts
async viteFinal(config) {
  return mergeConfig(config, {
    plugins: [vue()],
    resolve: { alias: { ... } },
    css: {
      modules: {
        localsConvention: 'camelCase',  // ← 新增，與 packages/ui 保持一致
      },
    },
  });
},
```

---

## 解決方案：改用 `useCssModule()` + `computed`

### 最終寫法

**Button.vue：**

```vue
<script setup lang="ts">
import { computed, useCssModule } from 'vue';

// ... props / emit 定義 ...

const style = useCssModule();

// 將 kebab-case 轉換成 camelCase（處理 BEM 的 -- 雙連字號）
const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-button')],
  style[toCamelCase(`liquid-button--${props.variant}`)],
  style[toCamelCase(`liquid-button--${props.size}`)],
]);
</script>

<template>
  <button :class="classes" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<style src="./Button.module.css" module></style>
```

---

## 關鍵細節：`toCamelCase` 的正則表達式

### 錯誤版本

```ts
// ❌ 只匹配「一個 - 後接字母」
str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
```

**問題：** BEM 命名的 `--` 雙連字號無法正確處理。

追蹤 `'liquid-button--primary'`：

| 位置 | 片段 | 是否匹配 `/-([a-z])/` | 結果 |
|------|-----|-------------------|------|
| `-b` | `-button` | ✅ | → `B` |
| `--` | `--primary` 的第一個 `-` 後接 `-` | ❌ 後面是 `-`，非字母 | **`-` 保留** |
| `-p` | `--primary` 的第二個 `-` 後接 `p` | ✅ | → `P` |

**輸出：** `liquidButton-Primary`（中間多一個 `-`，找不到對應 key）

### 正確版本

```ts
// ✅ 匹配「一個或多個 - 後接字母」
str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase())
```

**驗證：**

| 輸入 | 輸出 | 說明 |
|------|------|------|
| `liquid-button` | `liquidButton` | 單一 `-` 正常 |
| `liquid-button--primary` | `liquidButtonPrimary` | `--` 被正確消除 |
| `liquid-button--glass-intense` | `liquidButtonGlassIntense` | 多個 `--` 和 `-` 都正確 |

---

## 為什麼不改回普通 CSS？

考慮到這是 UI 組件庫，也評估過直接移除 `.module` 後綴改用普通 CSS：

| 方案 | 優點 | 缺點 |
|------|------|------|
| 普通 CSS（移除 .module） | 改動少；類名可預測，外部容易自訂 | 需手動引入 `style.css`；全域污染風險 |
| CSS Modules（本方案） | 樣式完全隔離；不需額外引入 CSS | template 需用 `useCssModule()` |

最終選擇 CSS Modules，因為未來組件庫規模擴大時樣式隔離更重要。

---

## 修改的檔案清單

| 檔案 | 修改內容 |
|------|---------|
| `packages/ui/src/components/Button/Button.vue` | 加入 `useCssModule` 邏輯；template 改用 `classes`；`<style>` 改為 `module` |
| `apps/storybook/.storybook/main.ts` | `viteFinal` 中新增 `css.modules.localsConvention: 'camelCase'` |

---

## 關鍵學習

1. **`.module.css` 後綴是功能性的**，不只是命名慣例，Vite 以此判斷是否啟用 CSS Modules
2. **`scoped` 與 `module` 是互斥機制**，不應同時使用
3. **Storybook 的 Vite 配置與 packages 的 Vite 配置是獨立的**，需在 `viteFinal` 中明確補齊設定
4. **BEM 的 `--` 雙連字號**在 `toCamelCase` 的正則中需特別處理，要用 `/[-]+/` 而非 `/-/`
5. **`useCssModule()` 的型別推斷**依賴 `<style module>` 標籤，沒有 `module` 屬性時回傳型別為 `{}`

---

**文件版本**: 1.0
**建立日期**: 2026-02-17
**適用版本**: Storybook 8.x, Vue 3.x, Vite 5.x
