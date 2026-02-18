# 用 CSS 重現液態玻璃折射效果

液態玻璃效果在 2025 年成為設計主流，從 Apple 的 macOS 到各種 UI 框架都在討論這種效果。但真正的折射效果不是只加一個 `backdrop-filter: blur()` 這麼簡單。

## 什麼是「折射」？

真實玻璃的折射（refraction）是光線穿過玻璃時因介質密度不同而彎曲的現象。在 CSS 中，我們用 SVG Filter 的 `feDisplacementMap` 來模擬這個效果。

## 核心技術棧

```css
/* 基礎玻璃效果 */
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.4);
}
```

## SVG Filter 加入折射效果

純 CSS 做不到折射，我們需要 SVG Filter：

```html
<svg style="display: none">
  <filter id="glass-refraction">
    <!-- 產生有機形狀的噪點 -->
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.008"
      numOctaves="3"
      result="noise"
    />
    <!-- 用噪點位移背景像素，產生折射感 -->
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="8"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>
```

然後在 CSS 中套用：

```css
.glass-refraction {
  filter: url(#glass-refraction);
}
```

## 高光效果：層疊偽元素

真實玻璃表面有光線反射，用 `::before` 和 `::after` 模擬：

```css
.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.08) 40%,
    transparent 60%
  );
  border-radius: inherit;
  pointer-events: none;
}

.glass::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% -10%,
    rgba(255, 255, 255, 0.35) 0%,
    transparent 65%
  );
  border-radius: inherit;
  pointer-events: none;
}
```

## 效能注意事項

`backdrop-filter` 會強制建立一個新的 stacking context，這對效能有影響：

- **避免**對大量小元素同時套用 `backdrop-filter`
- **考慮**只在關鍵 UI 元素（Navbar、Modal、Card）使用
- **使用** `will-change: transform` 讓瀏覽器預先分配 GPU 資源

```css
/* 效能優化寫法 */
.glass-navbar {
  backdrop-filter: blur(12px);
  will-change: transform;
  /* 避免在 hover 動態改變 blur 值，會觸發重繪 */
}
```

## 設計克制的重要性

這裡有個重要觀念：**文字可讀性永遠優先於視覺效果**。

在長文閱讀場景中，玻璃效果只應該出現在「框架」上（Navbar、Card 外框），**不應該**出現在文字內容區域。低對比度的玻璃背景加上文字，是最常見的可讀性殺手。

## 總結

液態玻璃效果的技術層次：

1. **第一層**：純 CSS `backdrop-filter` + 透明背景
2. **第二層**：偽元素高光漸層
3. **第三層**：SVG Filter 折射效果

每增加一層，效果更真實，但複雜度和效能成本也成長。根據場景選擇合適的層次，才是正確的工程判斷。
