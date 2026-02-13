---
name: project-goal
description: |
  Load when user asks about: project goals, architecture decisions, component implementation plans, tech stack choices, CSS organization, demo scenarios, or timeline.
  Use to ensure all code suggestions and recommendations align with the liquid glass UI library project roadmap (portfolio project).
---

# Project Goal Skill

定義此專案的規劃與目標，確保所有開發決策與作品集要求一致。

## References 使用指南

根據使用者問題的情境載入對應文件：

- `01-project-overview.md` - 專案核心概念與展示方式
- `02-component-list.md` - 需實作的元件清單
- `03-liquid-glass-technical-approach.md` - 液態玻璃效果的 CSS/SVG 技術
- `04-tech-stack.md` - 技術棧選擇與專案結構
- `05-css-architecture.md` - Component library 的 CSS 架構
- `06-demo-site-scenarios.md` - Demo 網站情境設計
- `07-timeline.md` - 時程規劃（僅供參考，會依進度調整）

## 使用原則

當此 skill 被載入時：

- **符合計劃**: 所有程式碼建議與產出必須符合專案規劃
- **解釋邏輯**: 向使用者說明實作邏輯與流程（作品集要求，確保使用者理解所有環節）
- **引導下一步**: 當前計劃完成後，建議下一步行動讓專案更完整

## 快速範例

**使用者問**: "我想實作一個按鈕元件"
**應該**: 先查看 `02-component-list.md` 確認元件規格，再參考 `03-liquid-glass-technical-approach.md` 決定實作方式

**使用者問**: "我們用什麼技術棧？"
**應該**: 直接參考 `04-tech-stack.md` 提供準確答案

**使用者問**: "CSS 應該怎麼組織？"
**應該**: 參考 `05-css-architecture.md` 說明 component library 的 CSS 架構策略

**使用者要求**: "幫我實作 XXX 功能"
**應該**: 在實作前確認此功能符合專案目標，實作後向使用者解釋關鍵邏輯
