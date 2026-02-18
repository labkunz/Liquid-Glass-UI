# Claude Code 開發工作流：讓 AI 寫 Boilerplate，自己把關品質

用 Claude Code 開發 UI 元件庫的實際心得。這不是「AI 全部寫完，我只複製貼上」的故事，而是如何找到正確的人機協作節奏。

## 核心觀念：AI 是加速器，不是替代品

在開始之前，先確立一個心態：Claude Code 的價值在於**消除重複性工作**，讓你把精力放在真正需要判斷力的地方。

```
Claude Code 擅長：          你來負責：
- Boilerplate 生成          - 設計決策
- 相同模式的複製展開        - Edge case 判斷
- 文件和型別定義            - 視覺效果校準
- 測試案例生成              - 架構設計
- CSS 變體套用              - 品質把關
```

## 實際工作流程

### Phase 1：架構設計（自己來）

在讓 Claude Code 動手之前，你需要先思考清楚：

- 元件的 Props API 設計
- 目錄結構
- CSS 模組命名規範
- Build pipeline

這個階段如果讓 AI 主導，它會給你一個「可以跑」但不一定符合你需求的架構。

### Phase 2：第一個元件（人機協作）

用第一個元件（如 Button）建立所有後續元件的「範式」：

```bash
# 告訴 Claude Code：
"根據以下規格實作 LiquidButton：
- Props: variant (primary/secondary/outline/glass-css-only)
- Props: size (sm/md/lg)
- Props: disabled
- 用 CSS Modules，class naming 遵循 BEM
- 遵循 Button.vue 的結構"
```

然後你檢查輸出、調整、確認這個範式是對的。

### Phase 3：批量展開（Claude Code 主導）

一旦範式確立，Claude Code 可以高效展開：

```bash
# 告訴 Claude Code：
"現在根據 Button.vue 的模式，實作以下元件：
Input、Textarea、Select、Checkbox、Radio、Toggle
每個元件結構相同，Props API 各有不同，參考規格文件"
```

這個階段你只需要做 code review，確認沒有偏離範式。

### Phase 4：品質把關（自己來）

Claude Code 生成的程式碼可能有：

- CSS 效果不符合預期（視覺調整需要「眼睛」）
- Edge case 沒處理（disabled + loading 同時的樣式）
- 型別定義不夠嚴謹
- 動畫時機不對

**這些需要你親自確認**，不能只看程式碼是否能跑。

## 有效的 Prompt 技巧

### 1. 給範例而非描述

```bash
# ❌ 模糊：
"幫我實作一個 Glass 風格的 Card"

# ✅ 具體：
"根據已有的 Button.vue 結構，實作 Card.vue
variant='glass-css-only' 應使用這些 CSS properties：
- background: rgba(255,255,255,0.15)
- backdrop-filter: blur(12px)
- border: 1px solid rgba(255,255,255,0.3)
參考 Card.module.css 的命名規範"
```

### 2. 設定約束

```bash
"注意：
- 不要使用 @apply（我們不用 Tailwind）
- 不要引入新的 npm 套件
- CSS 用 Module，不用 scoped
- 所有 class 用 camelCase（因為 localsConvention: 'camelCase'）"
```

### 3. 拆分大任務

```bash
# ❌ 一次要太多：
"幫我實作整個 Form Engine"

# ✅ 拆分：
Step 1: "先設計 FieldSchema 的 TypeScript 型別"
Step 2: "實作 schema-parser.ts"
Step 3: "實作 validator.ts"
Step 4: "實作 FormEngine.vue 元件"
```

## 什麼不要交給 AI

1. **視覺校準**：`backdrop-filter: blur(12px)` 好看還是 `blur(8px)` 好看？只有你的眼睛能判斷
2. **UX 決策**：Modal 裡放 Form 還是獨立頁面？需要理解業務場景
3. **效能 tradeoff**：要不要 virtual scroll？取決於你對使用場景的理解
4. **品牌判斷**：這個 gradient 對不對？這是設計直覺，不是邏輯

## 量化效率提升

在這個 UI Library 專案中，Claude Code 的貢獻：

- 20 個元件的 Boilerplate：省了約 60% 時間
- CSS 變體套用：省了約 70% 時間
- Storybook stories 生成：省了約 80% 時間
- TypeScript 型別定義：省了約 50% 時間

**但**品質把關、設計決策、視覺調整仍然需要相同的時間。AI 壓縮的是重複性工作，不是思考時間。

## 結論

Claude Code 是讓你「以工程師身份做更多事」的工具，不是「讓你不用做工程師」的工具。用對了，你能在更短的時間交出更高品質的成果。
