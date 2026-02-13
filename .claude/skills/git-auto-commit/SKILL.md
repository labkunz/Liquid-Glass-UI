---
name: "git-auto-commit"
description: "自動 Git 提交工作流程。當完成任何程式碼修改、新增檔案、修復 bug、實作功能、重構程式碼後使用。每次完成一個邏輯變更後，自動執行 git add 和 git commit。"
---

# Git Auto-Commit Skill

## 使用時機

每次完成以下任務後自動執行：
- 新增功能
- 修復 bug
- 重構程式碼
- 更新文件
- 修改配置

## 工作流程

### 1. 完成程式碼變更後

確認所有變更已完成且可正常運作（測試通過、lint 無誤）。

### 2. 檢查變更內容

執行 `git status` 和 `git diff --stat` 確認變更範圍。

### 3. Stage 變更

根據變更的邏輯分組進行 git add：
- 如果所有變更屬於同一個邏輯單元：`git add -A`
- 如果包含多個不相關變更：分開 stage 和 commit

### 4. 撰寫 Commit Message

遵循 Conventional Commits 格式：
```
<type>(<scope>): <簡短描述>

<詳細說明（可選）>
```

**Type 選擇：**
- `feat`: 新功能
- `fix`: 修復 bug
- `refactor`: 重構（不改變功能）
- `docs`: 文件更新
- `style`: 格式調整（不影響邏輯）
- `test`: 新增或修改測試
- `chore`: 建置工具或輔助工具變更

**範例：**
```
feat(auth): 新增 Google OAuth2 登入功能
fix(validation): 修正 email 驗證未處理空白字元的問題
refactor(api): 將使用者路由拆分為獨立模組
docs(readme): 更新安裝說明
```

### 5. 執行 Commit
```bash
git add <相關檔案>
git commit -m "<type>(<scope>): <描述>"
```

## 重要原則

- **原子性提交**：每個 commit 只包含一個邏輯變更
- **不要混合**：不要把功能開發和格式調整放在同一個 commit
- **描述要具體**：說明「做了什麼」而非「改了哪個檔案」
- **中文或英文皆可**：依專案慣例決定
- **完成後主動提交**：不需等使用者要求，變更完成即提交