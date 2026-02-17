# Glass Button Variants 實作筆記

Button 元件的 Liquid Glass 效果實驗記錄。共迭代出 6 種方案，從基本 CSS Glassmorphism 到 SVG Filter 應用，每種方案有不同的技術取捨。

---

## 背景知識：CSS `filter` vs `backdrop-filter`

在開始前必須釐清兩個容易混淆的屬性：

| 屬性 | 作用對象 | 效果 |
|------|----------|------|
| `filter: url(#id)` | 元素自身的像素 | 扭曲邊框、背景、文字 |
| `backdrop-filter: blur()` | 元素後面的背景 | 模糊「透過元素看到的背景」 |

這個差異是整個實驗的核心。若希望製造「玻璃折射感」，理想上應該用 `backdrop-filter: url(#id)`，但此屬性的瀏覽器支援極差，所以只能用 `::before` 偽元素套用 `filter` 來製造幻覺。

---

## SVG Filter Pipeline 說明

### GlassFilterProvider 架構

在 `packages/ui/src/components/GlassFilterProvider/GlassFilterProvider.vue` 定義四個全域 SVG filter，元件透過 `filter: url(#id)` 引用。需在 App 最外層掛載：

```vue
<GlassFilterProvider>
  <App />
</GlassFilterProvider>
```

### Filter 1: `#glass-subtle`（保守，含位移）

```svg
feTurbulence (fractalNoise, baseFrequency=0.01, seed=1)
  → feGaussianBlur (stdDeviation=1.5)
  → feDisplacementMap (scale=3, R→X, G→Y)  ← 造成形狀扭曲
  + feSpecularLighting (surfaceScale=2, k=0.6)  ← 鏡面高光
  → feComposite (arithmetic: displaced + 0.3 * specular)
```

- 位移量 scale=3，扭曲程度輕微但仍可見
- 適用於 `glass` variant

### Filter 2: `#glass-intense`（激進，含位移）

- 與 `#glass-subtle` 相同結構，但 scale=12、高光強度更高
- 扭曲程度明顯
- 適用於 `glass-intense` variant

### Filter 3: `#glass-highlight-only`（只有高光，無位移）

```svg
feTurbulence (fractalNoise, baseFrequency=0.012, seed=3)
  → feGaussianBlur (stdDeviation=1)
  → feSpecularLighting (surfaceScale=2.5, k=0.7)  ← 有機高光
  → feComposite (in: 限制在元素範圍內)
  → feComposite (arithmetic: SourceGraphic + 0.35 * highlight)
```

- **移除 feDisplacementMap**，元素形狀不會被扭曲
- 「有機高光」指光照結果帶有 turbulence 噪點的不規則感，比 CSS 漸層自然

---

## 六種方案詳細記錄

### 方案一：`glass`（對照組 A）

**技術架構**：整個元素套用含位移的 SVG filter

```css
.liquid-button--glass {
  background: rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  filter: url(#glass-subtle);  /* 整個元素被扭曲 */
}
```

**視覺結果**：邊框呈現「微微彎曲的長方形」——`feDisplacementMap` 位移了邊框上的每個像素，導致矩形輪廓不再平直。

**問題**：這是預期外的效果，彎曲的邊框不符合 glassmorphism 的預期質感。

---

### 方案二：`glass-intense`（對照組 B）

**技術架構**：同方案一，但套用 `#glass-intense`（scale=12）

```css
.liquid-button--glass-intense {
  filter: url(#glass-intense);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.4);
}
```

- 增加 `text-shadow` 補償文字可讀性（因 filter 會影響文字）
- 邊框扭曲更明顯
- 視覺上更「液態」但更不實用

---

### 方案三：`glass-css-only`（實驗組 1）

**技術架構**：完全不使用 SVG filter，純 CSS glassmorphism

```css
.liquid-button--glass-css-only {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.95);
  overflow: hidden;
}

/* 左上角到右下角高光漸層 */
.liquid-button--glass-css-only::before {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(255, 255, 255, 0) 60%
  );
}

/* 頂部圓弧內光 */
.liquid-button--glass-css-only::after {
  background: radial-gradient(
    ellipse at 50% -10%,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 70%
  );
}
```

**視覺結果**：乾淨、邊框直線、高光自然，實用性最高。

**優點**：無 SVG filter 依賴，瀏覽器相容性最好，渲染效能最佳。

**缺點**：高光完全由 CSS 漸層決定，缺乏「有機感」——光照方向固定、不自然。

---

### 方案四：`glass-highlight-only`（實驗組 2）

**技術架構**：整個元素套用只有高光的 SVG filter（無位移）

```css
.liquid-button--glass-highlight-only {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  filter: url(#glass-highlight-only);  /* 整個元素套用，但不扭曲形狀 */
}
```

**視覺結果**：邊框保持直線（無 feDisplacementMap），高光帶有 turbulence 的有機感。

**問題**：filter 套用在整個元素，文字也會受到高光影響，可能略微降低文字清晰度。

---

### 方案五：`glass-layered`（實驗組 3）

**技術架構**：多層分離，filter 只套用於 `::before` 偽元素

```css
/* 主元素：不套用任何 filter，邊框在這層 */
.liquid-button--glass-layered {
  background: transparent;  /* 背景交給 ::before */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);  /* 邊框保持直線 */
  overflow: hidden;
}

/* ::before：半透明背景 + 含位移的 filter（只有這層被扭曲） */
.liquid-button--glass-layered::before {
  background: rgba(255, 255, 255, 0.15);
  filter: url(#glass-subtle);  /* 位移發生在這層，不影響邊框/文字 */
  z-index: 0;
}

/* ::after：純 CSS 高光，不受任何 filter 影響 */
.liquid-button--glass-layered::after {
  background: linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%);
  z-index: 1;
}

/* 確保文字在最上層 */
.liquid-button--glass-layered > * {
  position: relative;
  z-index: 2;
}
```

**視覺結果**：邊框直線，文字清晰，`::before` 層有輕微扭曲感。

**關鍵洞察**：filter 套用在 `::before` 時，扭曲的是 `::before` 自身的像素（它的半透明背景色），而不是真實的背景圖像，所以效果更像「表面紋理」而非「折射」。

---

### 方案六：`glass-highlight-layered`（實驗組 4，最受喜愛）

**技術架構**：多層分離 + 只有高光的 filter

```css
/* 主元素：不套用任何 filter */
.liquid-button--glass-highlight-layered {
  background: transparent;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  overflow: hidden;
}

/* ::before：半透明背景 + 只有有機高光的 filter */
.liquid-button--glass-highlight-layered::before {
  background: rgba(255, 255, 255, 0.15);
  filter: url(#glass-highlight-only);  /* 有機高光，無位移，邊框/文字完全不受影響 */
  z-index: 0;
}

/* ::after：CSS 漸層補充光源 */
.liquid-button--glass-highlight-layered::after {
  background: radial-gradient(
    ellipse at 30% 20%,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0) 65%
  );
  z-index: 1;
}

/* 文字在最上層 */
.liquid-button--glass-highlight-layered > * {
  position: relative;
  z-index: 2;
}
```

**視覺結果**：邊框直線、文字清晰、高光帶有 SVG turbulence 的有機感，同時 CSS radial-gradient 補充整體光源方向感。

**為何最受喜愛**：結合了「CSS 方案的清晰度」與「SVG filter 的有機高光質感」，兩者相輔相成而非互相干擾。

---

## 方案比較表

| Variant | SVG Filter | 位移扭曲 | 有機高光 | 邊框狀態 | 文字清晰度 | 評價 |
|---------|-----------|---------|---------|---------|-----------|------|
| `glass` | `#glass-subtle` | ✓ | ✓ | 微彎 | 略受影響 | 視覺有趣但不實用 |
| `glass-intense` | `#glass-intense` | ✓ (強) | ✓ (強) | 明顯彎曲 | 受影響 | 液態感強但不實用 |
| `glass-css-only` | 無 | ✗ | ✗ | 直線 | 清晰 | 最穩定，效果乾淨 |
| `glass-highlight-only` | `#glass-highlight-only` | ✗ | ✓ | 直線 | 略受影響 | 適中 |
| `glass-layered` | `::before` 用 `#glass-subtle` | ✓ (隔離) | ✓ | 直線 | 清晰 | 層次最豐富 |
| `glass-highlight-layered` | `::before` 用 `#glass-highlight-only` | ✗ | ✓ | 直線 | 清晰 | **推薦，最佳平衡** |

---

## 架構設計決策

### CSS Modules 的 camelCase 轉換

Button 元件使用 `useCssModule()` 存取 CSS Modules，但 CSS class 名為 kebab-case（如 `liquid-button--glass-highlight-layered`），需轉換：

```typescript
const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

// 'liquid-button--glass-highlight-layered'
// → 'liquidButton--glassHighlightLayered' (不正確)
// 實際 CSS Modules 會將整串 kebab 轉換
```

注意：CSS Modules 將 class 名轉為 camelCase 時，`--` 也視為分隔符。若遇到存取問題，可用 `style['liquid-button--variant']` 方括號語法直接存取。

### GlassFilterProvider 必須在最外層

SVG filter 以 `id` 引用，必須存在於同一個 document 中。若 SVG 在 shadow DOM 或不同 document 中，`filter: url(#id)` 會失效。Storybook 中透過 `preview.ts` 全域註冊並在 decorator 中使用：

```typescript
// apps/storybook/.storybook/preview.ts
setup((app) => {
  app.component('GlassFilterProvider', GlassFilterProvider);
});
```

### Design Tokens 集中管理

```css
/* packages/tokens/src/glass.css */
:root {
  --glass-blur: 12px;
  --glass-bg-primary: rgba(59, 130, 246, 0.15);
  --glass-border: 1px solid rgba(255, 255, 255, 0.3);
  --glass-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* ... */
}
```

SVG filter 的參數（如 `baseFrequency`、`scale`）**無法使用 CSS Variables**，因為 SVG attribute 不是 CSS property，需直接在 SVG 中寫死數值。

---

## 後續方向

1. **WebGL Shader（第三階段）**：真正的折射需要 WebGL，可讀取背景紋理並進行扭曲，效果遠優於 SVG filter
2. **動態光源**：使用 JavaScript 追蹤滑鼠位置，動態更新 `fePointLight` 的 x/y 座標，製造跟隨光源效果
3. **Motion 動畫**：`glass-highlight-layered` 的高光可加入微小的動畫，模擬光線移動
4. **`glass-highlight-layered` 作為正式 variant**：目前命名過長，可考慮重命名為 `glass-organic` 或直接作為預設 `glass` 方案
