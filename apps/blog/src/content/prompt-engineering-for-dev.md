# Prompt Engineering 實戰：給工程師的提示詞技巧

工程師使用 LLM 的場景和一般用戶不同。我們需要的是**準確、可重複、符合程式碼規範**的輸出。這篇整理 10 個讓 AI 寫出更精確程式碼的提示詞模式。

## 為什麼工程師需要特別學習 Prompt？

一般用戶寫：「幫我寫一個登入頁面」，得到一個能跑的頁面就滿足了。

工程師需要：
- 符合現有程式碼風格
- 遵守特定的架構約束
- 使用已選定的函式庫版本
- 產出可維護的程式碼

這需要更精確的提示詞。

## 10 個實戰模式

### 模式 1：角色 + 約束設定

在對話開始時設定背景，比每次都重複說明更有效：

```
你是一個 Vue 3 + TypeScript 的專家。
在這個對話中，請遵守以下約束：
- 使用 Composition API（不用 Options API）
- CSS 用 CSS Modules，不用 Tailwind
- 不引入新的 npm 套件
- 所有函式都要有 JSDoc
```

### 模式 2：給「反例」

說明「不要做什麼」往往比說「要做什麼」更有效：

```
實作一個 useAsync composable，注意：
- ✅ 使用 ref 和 reactive
- ❌ 不要使用 VueUse（我們不依賴它）
- ❌ 不要用 options API 的寫法
- ❌ 不要在 composable 裡直接使用 fetch，請接受外部 fn 參數
```

### 模式 3：Few-Shot 範例

給 AI 看「我期待的輸出樣式」：

```
我需要 TypeScript 工具函式，格式如下（參考範例）：

範例輸出：
/**
 * 格式化日期為 zh-TW 格式
 * @param date - 要格式化的日期
 * @returns 格式化後的字串，例如 '2025年2月15日'
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

現在請用同樣格式實作：formatCurrency、formatFileSize、formatRelativeTime
```

### 模式 4：Chain-of-Thought

對複雜問題，要求 AI 先思考再給答案：

```
請幫我設計一個 Schema-Driven Form Engine。

在給出程式碼之前，請先思考：
1. FieldSchema 需要哪些欄位？
2. 驗證邏輯應該在哪一層？
3. 條件顯示（conditional rendering）怎麼實作最乾淨？
4. 有哪些 edge cases 需要處理？

思考完後再給出實作。
```

### 模式 5：漸進式精化

不要一次要求完整實作，先要概覽再深入：

```
Step 1: 先給我 useModal 的 TypeScript 型別定義（不用實作）
Step 2: [看完後] 型別沒問題，現在實作 core 邏輯
Step 3: [看完後] 現在加入 escape key 關閉和 body scroll lock 的功能
```

### 模式 6：指定輸出格式

明確說你要什麼格式，避免 AI 給你解釋文：

```
請用以下格式輸出，只要程式碼，不要說明：

1. types.ts（型別定義）
2. schema-parser.ts（核心邏輯）
3. FormEngine.vue（Vue 元件）

每個檔案用 # filename.ts 標題分隔。
```

### 模式 7：引用現有程式碼

把現有的程式碼直接貼入，要求 AI 延伸或修改：

```
這是現有的 Button.vue：
[貼上程式碼]

請根據相同的模式實作 IconButton.vue，
額外的 props：
- icon: string（icon name）
- iconPosition: 'left' | 'right'（預設 'left'）
```

### 模式 8：要求解釋設計決策

不只要程式碼，也要理解為什麼：

```
實作 useLocalStorage 後，請解釋：
1. 為什麼用 watch 而不是 watchEffect？
2. 為什麼序列化函式要可注入（而不是硬碼 JSON.stringify）？
3. SSR 環境下這個 composable 會有什麼問題？
```

### 模式 9：寫測試驅動

先要求 AI 寫測試案例，再根據測試實作：

```
先給我 validateForm() 函式的測試案例（用 Vitest 語法）：
- 測試 required 驗證
- 測試 minLength 驗證
- 測試 email 格式驗證
- 測試條件欄位（隱藏的欄位不驗證）

看完測試確認邏輯正確後，再實作函式本體。
```

### 模式 10：明確的完成標準

告訴 AI 你的驗收標準：

```
實作完成的標準：
- TypeScript 無任何 any（除非有充分理由）
- 所有 public function 有 JSDoc
- 有使用範例（在 comment 中）
- 邊界情況處理：null input、空陣列、undefined
```

## 重要觀念

**Prompt 是軟體工程的一部分**。好的 Prompt 像好的程式規格：清楚、具體、有例子、有約束。模糊的規格得到模糊的程式碼。

**迭代比完美更重要**。先得到 80% 正確的輸出，再透過對話精化，通常比一次寫完美的 Prompt 更有效率。

**知識決定品質**。Prompt 寫得再好，如果你不懂得判斷輸出的品質，還是會接受有問題的程式碼。AI 工具的上限是你自己的專業程度。
