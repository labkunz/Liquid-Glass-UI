# 03 - Liquid Glass 技術方案

## 技術光譜

從底層到高層，瀏覽器裡能實現 Liquid Glass 效果的技術：

| 層級 | 技術 | 能力 | 複雜度 | 本專案定位 |
|------|------|------|--------|-----------|
| 最強 | WebGPU / WebGL + Shader | 物理級光線折射、色散 | 極高 | 實驗性嘗試 |
| 中間 | SVG Filter | 近似折射、高光效果 | 中等 | 主秀元件加分項 |
| 基礎 | 純 CSS | 毛玻璃感（Glassmorphism） | 低 | 所有元件的基底 |

> 參考：Figma 底層用 C++ → WebAssembly → WebGL/WebGPU → GPU 直接渲染像素，完全繞過 HTML/CSS。但對 UI 元件庫來說，CSS + SVG Filter 是工程上更合理的選擇。

---

## 分層策略

### 第一層：CSS 基底（所有元件）

純 CSS 實作，跨瀏覽器支援良好，效能穩定。

**核心技術：**

- `backdrop-filter: blur()` — 毛玻璃模糊
- `background: rgba()` — 半透明背景
- `box-shadow`（含 `inset`）— 深度與內光
- `border: 1px solid rgba()` — 微妙邊框
- CSS `gradient` — 高光模擬

**三層結構：**

- 主元素：邊框和基本樣式
- `::before`：內陰影和色調（光折射模擬）
- `::after`：backdrop 效果

### 第二層：SVG Filter 加強（主秀元件）

在 Card、Modal、Tooltip、Toast 等浮層元件上額外加入折射效果，作為 Progressive Enhancement。

**核心技術：**

- `feDisplacementMap` — 背景扭曲（折射近似）
- `feSpecularLighting` — 高光效果
- `feTurbulence` — 有機質感噪點
- 透過 CSS `filter: url(#filter-id)` 引用

**瀏覽器限制：**

- SVG filter 作為 `backdrop-filter` 目前僅 Chromium 支援
- Firefox / Safari 自動 fallback 到第一層的毛玻璃效果
- 這個 fallback 策略本身就是面試的好談資

### 第三層：Shader 實驗（有空檔再做）

在效果最好的 1-2 個元件上嘗試 WebGL shader，作為實驗性範疇。

**可能的應用：**

- Card 的動態光影反射
- Landing Page 的 Hero 區域特效

**注意：** 這層完全是加分項，不影響專案完成度。

---

## Figma 與 CSS 實作的差異

| 面向 | Figma Glass Effect | CSS 實作 |
|------|-------------------|----------|
| 折射真實度 | 物理級光線折射計算 | 位移圖近似（視覺上差異不大） |
| 動態性 | 靜態畫面 | 真正動態（滾動、背景變化即時更新） |
| 設計到實作 | 理想的視覺目標 | 在瀏覽器限制下的最佳近似 |

**工作流建議：** 可在 Figma 用原生 Glass effect 設計視覺目標（design spec），CSS 實作時拆解成可實現的技術層。

---

## 面試敘事重點

- 「我用純 CSS 建立了跨瀏覽器的玻璃質感基底，並用 SVG Filter 做了折射效果的漸進增強，同時處理了 fallback 策略。」
- 「我知道更底層的技術如 WebGL 可以做得更精確，但對於 UI 元件庫的使用場景，CSS + SVG Filter 是工程上更合理的選擇。」
- 「設計與實作之間的 trade-off：哪些 Figma 效果值得花時間還原、哪些可以簡化。」
