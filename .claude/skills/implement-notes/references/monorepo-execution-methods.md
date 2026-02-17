# Monorepo 專案執行方式與比較

在 pnpm workspace Monorepo 架構下，有多種方式可以執行子專案，本文整理了三種主要方法及其差異分析。

## 專案結構

本專案包含以下子專案：

**Applications (apps/):**
- `@liquid/landing` - 官網
- `@liquid/blog` - 部落格
- `@liquid/admin` - 後台管理系統
- `@liquid/docs` - 文件網站
- `@liquid/storybook` - Storybook 元件展示

**Packages (packages/):**
- `@liquid/ui` - UI 元件庫
- `@liquid/engine` - 核心引擎
- `@liquid/tokens` - Design Tokens

## 三種執行方式

### 方法一：使用預定義腳本（推薦）

在專案根目錄的 `package.json` 中預先定義好執行腳本：

```json
{
  "scripts": {
    "dev:landing": "pnpm --filter @liquid/landing dev",
    "dev:blog": "pnpm --filter @liquid/blog dev",
    "dev:admin": "pnpm --filter @liquid/admin dev",
    "dev:docs": "pnpm --filter @liquid/docs dev",
    "dev:storybook": "pnpm --filter @liquid/storybook dev",
    "dev:ui": "pnpm --filter @liquid/ui dev",
    "dev:engine": "pnpm --filter @liquid/engine dev"
  }
}
```

**使用方式：**
```bash
# 在根目錄執行
pnpm dev:admin
pnpm dev:landing
pnpm build:ui
```

### 方法二：進入子專案目錄執行

直接進入特定專案目錄，執行該專案的本地腳本：

```bash
# 進入子專案目錄
cd apps/admin
pnpm dev

# 或
cd packages/ui
pnpm build
```

### 方法三：使用 pnpm filter 命令

在根目錄直接使用 pnpm 的 `--filter` 參數：

```bash
# 指定單一專案
pnpm --filter @liquid/admin dev
pnpm --filter @liquid/landing build

# 批量執行（所有 apps）
pnpm --filter "./apps/*" build

# 執行特定 pattern
pnpm --filter "@liquid/*" typecheck
```

## 方法一 vs 方法三：本質分析

### 核心關係

**方法一其實就是方法三的包裝（別名）**

當執行 `pnpm dev:admin` 時，實際上執行的是：
```bash
pnpm --filter @liquid/admin dev
```

這是一種常見的設計模式：為底層命令建立簡短的別名。

### 方法一的優勢

| 優勢 | 說明 |
|------|------|
| **簡潔易記** | `pnpm dev:admin` 比 `pnpm --filter @liquid/admin dev` 更短 |
| **統一管理** | 所有常用命令集中在根目錄 `package.json`，一目了然 |
| **團隊協作** | 新成員查看 `package.json` 就知道有哪些可用命令 |
| **IDE 支援** | 大多數 IDE 會自動識別 npm scripts，可直接點擊執行 |
| **可擴展性** | 未來需要在執行前/後加入其他命令時，只需修改一處 |
| **語義清楚** | `dev:admin` 明確表達「開發模式執行 admin」 |

### 方法三的優勢

| 優勢 | 說明 |
|------|------|
| **更靈活** | 可執行任何命令，不限於預定義的腳本 |
| **無需預定義** | 適合臨時性操作，不需事先在 package.json 中定義 |
| **強大的過濾** | 支援 glob pattern，可批量操作多個專案 |
| **動態性** | 可用於 CI/CD 或腳本中動態組合命令 |

## 實際使用場景

### 日常開發（推薦方法一）

```bash
# 啟動開發伺服器
pnpm dev:admin
pnpm dev:landing

# 建置專案
pnpm build:ui
pnpm build:packages
```

### 臨時操作（使用方法三）

```bash
# 執行未預定義的命令
pnpm --filter @liquid/admin test
pnpm --filter @liquid/ui lint

# 批量操作
pnpm --filter "./apps/*" build
pnpm --filter "@liquid/*" typecheck

# CI/CD 腳本中
pnpm --filter $PACKAGE_NAME build
```

### 快速切換（使用方法二）

```bash
# 專注在單一專案開發時
cd apps/admin
pnpm dev
pnpm build
pnpm test
```

## 開發流程建議

### 開發 UI 元件庫

當需要同時開發 UI 元件和使用該元件的應用程式時：

**Terminal 1（監聽 UI 變更）：**
```bash
pnpm dev:ui
```

**Terminal 2（運行應用程式）：**
```bash
pnpm dev:admin
```

這樣修改 UI 元件時，應用程式會自動重新載入。

### 同時開發多個專案

開啟多個終端視窗：

```bash
# Terminal 1
pnpm dev:ui

# Terminal 2
pnpm dev:admin

# Terminal 3
pnpm dev:landing
```

## 專案依賴關係

理解依賴關係有助於決定啟動順序：

```
@liquid/admin
  ├── @liquid/ui
  ├── @liquid/tokens
  └── @liquid/engine

@liquid/landing
  ├── @liquid/ui
  └── @liquid/tokens

@liquid/ui
  └── @liquid/tokens
```

## 設計模式總結

這種「別名 + 底層命令」的設計模式在許多工具中都能見到：

**類似案例：**
- Git: `git co` (alias) → `git checkout` (底層命令)
- npm: `npm i` (alias) → `npm install` (底層命令)
- Docker: `docker ps` (alias) → `docker container ls` (底層命令)

**設計原則：**
1. 為常用操作提供簡短別名（提升效率）
2. 保留底層命令的完整功能（保持靈活性）
3. 別名可自訂擴展（符合團隊需求）

## 最佳實踐建議

1. **日常開發**：優先使用方法一（預定義腳本）
2. **特殊需求**：使用方法三（pnpm filter）
3. **專注單一專案**：可考慮方法二（進入目錄）
4. **團隊規範**：在 README 或文件中明確說明推薦的執行方式
5. **CI/CD**：使用方法三以獲得最大靈活性

## 參考資料

- [pnpm filtering](https://pnpm.io/filtering)
- [pnpm workspace](https://pnpm.io/workspaces)
