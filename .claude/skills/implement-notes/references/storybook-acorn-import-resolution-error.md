# Storybook Acorn Import Resolution Error

Storybook 在靜態分析 story 檔案時，會用獨立的 acorn 解析器建立索引，**不走 Vite 的 alias 設定**。若 import 路徑無法被 acorn 解析，Storybook 整個 story 索引將失敗。

---

## 環境資訊

- **Framework**: Vue 3 + Vite
- **建置工具**: Storybook 8.x（`@storybook/vue3-vite`）
- **套件管理**: pnpm workspace（monorepo）
- **發現情境**: 新增 15 個元件的 story 後，Storybook 顯示 `Error fetching /index.json`

---

## 問題描述

Storybook 啟動後出現以下錯誤：

```
Error fetching `/index.json`:
Unable to index ./src/stories/Avatar.stories.ts:
  Error: Could not parse import/exports with acorn
```

左側元件列表顯示 "Oh no! Something went wrong loading this Storybook."，所有 story 無法載入。

---

## 根本原因

### Storybook 的兩層解析機制

Storybook 啟動時分兩個階段處理 story 檔案：

| 階段 | 工具 | 說明 |
|------|------|------|
| **靜態索引** | acorn（JS 解析器） | 掃描所有 story 檔案，建立元件索引（`/index.json`） |
| **執行時編譯** | Vite（含 alias） | 實際將 story 編譯執行，alias 設定在此生效 |

**關鍵問題**：acorn 靜態分析不使用 Vite alias，因此 `@liquid/ui` 的子路徑 export 若未在 `package.json` 的 `exports` 欄位定義，acorn 就無法解析。

### 觸發錯誤的 import 寫法

**類型一：子路徑 import（`package.json` 未定義的路徑）**

```typescript
// ❌ 錯誤：@liquid/ui/components/Avatar 未在 package.json exports 中定義
import Avatar from '@liquid/ui/components/Avatar';
```

`packages/ui/package.json` 的 `exports` 只定義了：
```json
{
  "exports": {
    ".": { "import": "./dist/index.js" },
    "./style.css": "./dist/style.css"
  }
}
```

沒有 `"./components/*"` 的路徑，acorn 認定為無效 import。

**類型二：相對路徑直接指向 `.vue` 檔**

```typescript
// ❌ 錯誤：acorn 無法解析跨套件的相對路徑且 .vue 不是純 JS
import Modal from '../../../../packages/ui/src/components/Modal/Modal.vue';
```

---

## 解決方案

### 統一使用主入口 import

確保 `packages/ui/src/index.ts` 已匯出所有元件後，所有 story 一律使用：

```typescript
// ✅ 正確：使用已定義的主入口
import { Avatar, Modal, Toast } from '@liquid/ui';
import { GlassFilterProvider } from '@liquid/ui';
```

### 修正範例（8 個檔案）

| 檔案 | 修正前 | 修正後 |
|------|--------|--------|
| `Avatar.stories.ts` | `import Avatar from '@liquid/ui/components/Avatar'` | `import { Avatar } from '@liquid/ui'` |
| `Badge.stories.ts` | `import Badge from '@liquid/ui/components/Badge'` | `import { Badge } from '@liquid/ui'` |
| `Pagination.stories.ts` | `import Pagination from '@liquid/ui/components/Pagination'` | `import { Pagination } from '@liquid/ui'` |
| `DatePicker.stories.ts` | `import DatePicker from '@liquid/ui/components/DatePicker'` | `import { DatePicker } from '@liquid/ui'` |
| `Toggle.stories.ts` | `import Toggle from '@liquid/ui/components/Toggle'` | `import { Toggle } from '@liquid/ui'` |
| `Modal.stories.ts` | `import Modal from '../../../../packages/ui/src/...'` | `import { Modal } from '@liquid/ui'` |
| `Toast.stories.ts` | `import Toast from '../../../../packages/ui/src/...'` | `import { Toast } from '@liquid/ui'` |
| `Loading.stories.ts` | `import Loading from '../../../../packages/ui/src/...'` | `import { Loading } from '@liquid/ui'` |

---

## 專案命名規範（確立）

### Story 檔案 import 規則

```typescript
// ✅ 元件：使用 named import，從 @liquid/ui 主入口
import { Button, Card, Avatar } from '@liquid/ui';

// ✅ GlassFilterProvider：同上
import { GlassFilterProvider } from '@liquid/ui';

// ✅ 型別：使用 import type
import type { Meta, StoryObj } from '@storybook/vue3';

// ✅ Vue 工具：從 vue 引入
import { ref } from 'vue';
```

---

## 延伸注意事項

若未來需要讓子路徑 import 合法，可在 `packages/ui/package.json` 新增 sub-path exports：

```json
{
  "exports": {
    ".": { "import": "./dist/index.js" },
    "./components/*": { "import": "./dist/components/*/index.js" }
  }
}
```

但考慮到此專案的使用情境，**建議維持統一從主入口 import**，避免 tree-shaking 設定複雜化。
