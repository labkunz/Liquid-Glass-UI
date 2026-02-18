# Glass Morphism 設計原則：克制才是力量

當 Apple 在 WWDC 2025 推出 Liquid Glass 設計語言，Glass Morphism 效果瞬間成為所有設計師的追求。但用錯了地方，這種效果會成為可用性的災難。

## 什麼時候該用 Glass？

Glass 效果的本質是「透視」——讓使用者感知到介面後方有內容。這個特性讓它最適合：

- **浮動層**：Navbar、Modal、Sidebar 浮在內容之上
- **提示元件**：Tooltip、Toast，需要視覺層次區分
- **卡片容器**：顯示可滑動內容的容器背景

## 什麼時候不該用 Glass？

### 文字密集的閱讀場景

這是最常見的錯誤。長文章的內容區域如果用玻璃背景，文字對比度必然下降：

```
❌ 錯誤：整頁都是 Glass
   背景 → Glass → 文字（對比度不足）

✅ 正確：只有框架是 Glass
   Glass Navbar
   ─────────────
   白色/實底內容區域
   文字清晰可讀
   ─────────────
   Glass Footer
```

### 表格資料

表格的核心是快速掃描大量資訊。玻璃背景造成的干擾會讓眼睛疲勞：

```
❌ 錯誤：Table 本身是 Glass
   每個 cell 都透視，視覺噪音大

✅ 正確：Table 用乾淨的實底
   Glass 只用在外層容器
```

## 六個核心原則

### 1. 背景要有顏色對比

Glass 效果需要有趣的背景才能發揮作用。純白背景上的 Glass Card 幾乎看不出效果：

```css
/* ✅ 給 body 一個漸層背景 */
body {
  background: linear-gradient(135deg, #f0f4ff 0%, #faf0ff 50%, #f0faff 100%);
  background-attachment: fixed;
}
```

### 2. 模糊強度要適中

太少：效果不明顯；太多：效能差，且背景細節完全消失

```
blur(4px)  → 太淡
blur(12px) → 適中（推薦）
blur(24px) → 太強，背景看不出來
```

### 3. 邊框是關鍵

高光邊框讓玻璃感更真實，少了它效果會很平：

```css
/* 頂部/左側的白色邊框模擬光源反射 */
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
```

### 4. 文字要保持高對比

WCAG AA 標準要求文字對比度至少 4.5:1。Glass 背景下要格外注意：

```css
/* 在 Glass 容器中，文字用深色且帶 text-shadow */
.glass-card__title {
  color: #1a1a2e;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}
```

### 5. 層次要有邏輯

Glass 效果強調的是「浮在上面」的感覺。要確保 z-index 和視覺層次一致：

```
Layer 0: 背景漸層
Layer 1: 主要內容（實底）
Layer 2: Glass Card
Layer 3: Glass Navbar（固定）
Layer 4: Modal（Glass + 暗色 overlay）
```

### 6. 暗色主題要特別處理

暗色背景下，Glass 的參數需要完全重新校準：

```css
[data-theme="dark"] {
  --glass-opacity: 0.08;       /* 比亮色更低 */
  --glass-blur: 16px;          /* 更強的模糊 */
  --glass-border-opacity: 0.12; /* 邊框要更細緻 */
}
```

## 面試時怎麼談？

如果面試官問到 Glass 效果，這個取捨本身是很好的談資：

> 「我在部落格場景中刻意不在文字區域用 Glass，這是對可讀性和效果的主動取捨。Glass 用在 Navbar 和 Card 框架上，讓整體有玻璃質感，但長文閱讀依然保持高對比度。這個判斷展示了我對 Glass 效果的理解不只是「加 backdrop-filter 就好」，而是知道何時克制。」

克制，才是真正掌握一個設計工具的標誌。
