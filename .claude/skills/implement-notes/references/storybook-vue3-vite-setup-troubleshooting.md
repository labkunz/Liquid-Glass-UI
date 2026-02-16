# Storybook 8.0 + Vue 3 + Vite 建置問題排查

在 Monorepo 環境中建立 Storybook for Vue 3 時遇到的問題與解決方案記錄。

---

## 環境資訊

- **專案類型**: pnpm workspace monorepo
- **Storybook 版本**: 8.6.15
- **Framework**: Vue 3.4.21
- **建置工具**: Vite 5.4.21
- **Package Manager**: pnpm 10.16.1

---

## 問題 1: Vite 無法解析 .vue 檔案

### 錯誤訊息

```
4:01:50 AM [vite] Pre-transform error: Failed to parse source for import analysis
because the content contains invalid JS syntax. Install @vitejs/plugin-vue to
handle .vue files.

Internal server error: Failed to parse source for import analysis because the
content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
  Plugin: vite:import-analysis
  File: /packages/ui/src/components/Button/Button.vue:34:10
```

### 問題原因

1. Storybook 8 使用 Vite 作為建置工具
2. Stories 中引入了 workspace 中的 Vue 元件 (`@liquid/ui`)
3. `.storybook/main.ts` 中的 `viteFinal` 配置**缺少 Vue plugin**
4. Vite 預設不知道如何處理 `.vue` 單檔案元件

### 錯誤的配置

```typescript
// ❌ 缺少 Vue plugin
async viteFinal(config) {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@liquid/ui': path.resolve(__dirname, '../../../packages/ui/src'),
        '@liquid/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
      },
    },
  });
}
```

### 解決方案

**步驟 1: 安裝 @vitejs/plugin-vue**

在 `apps/storybook/package.json` 新增：

```json
{
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4"
  }
}
```

**步驟 2: 在 Vite 配置中註冊 Vue plugin**

修改 `.storybook/main.ts`：

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // ✅ 新增 import
import path from 'path';

const config: StorybookConfig = {
  // ... 其他配置

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],  // ✅ 加入 Vue plugin
      resolve: {
        alias: {
          '@liquid/ui': path.resolve(__dirname, '../../../packages/ui/src'),
          '@liquid/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
        },
      },
    });
  },
};
```

### 重要提醒

即使 framework 配置是 `@storybook/vue3-vite`，在 `viteFinal` 自訂配置時**仍需手動註冊 `@vitejs/plugin-vue`**。Storybook 不會自動繼承或合併 Vue plugin。

---

## 問題 2: Storybook Addons 找不到

### 警告訊息

```
WARN Could not resolve addon "@storybook/addon-links", skipping. Is it installed?
WARN Could not resolve addon "@storybook/addon-essentials", skipping. Is it installed?
WARN Could not resolve addon "@storybook/addon-interactions", skipping. Is it installed?
```

### 問題原因

1. `.storybook/main.ts` 的 `addons` 陣列中引用了這些 addons
2. 但 `package.json` 中**沒有安裝**對應的依賴
3. 初始的 `package.json` 只有基礎套件：
   - `storybook`
   - `@storybook/vue3`
   - `@storybook/vue3-vite`

### 解決方案

在 `apps/storybook/package.json` 明確安裝所有使用的 addons：

```json
{
  "devDependencies": {
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-interactions": "^8.0.0",
    "@storybook/addon-links": "^8.0.0",
    "@storybook/vue3": "^8.0.0",
    "@storybook/vue3-vite": "^8.0.0",
    "storybook": "^8.0.0"
  }
}
```

### 常用 Addons 說明

| Addon | 功能 | 是否必要 |
|-------|------|---------|
| `@storybook/addon-essentials` | 包含 controls, actions, viewport, backgrounds 等基礎 addons | ✅ 強烈建議 |
| `@storybook/addon-links` | 支援 story 之間的導航連結 | 可選 |
| `@storybook/addon-interactions` | 支援互動測試和 play function | 可選 |

### 重要提醒

Storybook addons **不會自動安裝**，必須在 `package.json` 中明確列出。即使在 `main.ts` 中引用，沒安裝依賴就不會載入。

---

## 問題 3: pnpm 依賴安裝衝突

### 錯誤訊息

**錯誤 1: 公共提升模式不一致**
```
ERR_PNPM_PUBLIC_HOIST_PATTERN_DIFF
This modules directory was created using a different public-hoist-pattern value.
Run "pnpm install" to recreate the modules directory.
```

**錯誤 2: 非互動式終端無法移除 node_modules**
```
ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY
Aborted removal of modules directory due to no TTY

If you are running pnpm in CI, set the CI environment variable to "true".
```

**錯誤 3: Lockfile 與 package.json 不同步**
```
ERR_PNPM_OUTDATED_LOCKFILE
Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date
with <ROOT>/apps/storybook/package.json

specifiers in the lockfile don't match specifiers in package.json:
* 4 dependencies were added: @storybook/addon-essentials@^8.0.0,
  @storybook/addon-interactions@^8.0.0, @storybook/addon-links@^8.0.0,
  @vitejs/plugin-vue@^5.0.4
```

### 問題原因

1. 手動修改 `package.json` 新增依賴後，`pnpm-lock.yaml` 沒有同步更新
2. pnpm 需要重新建立 node_modules 結構
3. 在非互動式終端（如 Claude Code）中，pnpm 預設使用 CI 模式：
   - 自動啟用 `--frozen-lockfile`
   - 不允許移除舊的 node_modules
   - lockfile 不匹配時會直接報錯

### 解決方案

#### 方法 1: 使用 --no-frozen-lockfile（推薦）

```bash
pnpm install --no-frozen-lockfile
```

這個指令會：
- 允許更新 `pnpm-lock.yaml`
- 自動處理 node_modules 結構變更
- 安裝新增的依賴

#### 方法 2: 設定 CI 環境變數

```bash
CI=true pnpm install
```

然後根據錯誤提示使用：
```bash
pnpm install --no-frozen-lockfile
```

### 完整操作流程

```bash
# 1. 手動編輯 apps/storybook/package.json 新增依賴

# 2. 更新依賴並同步 lockfile
pnpm install --no-frozen-lockfile

# 3. 驗證安裝結果
ls apps/storybook/node_modules/@storybook/
# 應該看到: addon-essentials, addon-links, addon-interactions, vue3, vue3-vite
```

---

## 完整的最終配置

### 檔案結構

```
apps/storybook/
├── .storybook/
│   ├── main.ts          # Storybook 主配置
│   └── preview.ts       # 預覽配置
├── src/
│   └── stories/
│       └── Button.stories.ts
├── package.json
└── node_modules/
```

### .storybook/main.ts（完整版）

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const config: StorybookConfig = {
  // Stories 檔案位置
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  // Storybook Addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  // Framework 配置
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // 使用 vue-component-meta（Vue 官方推薦的 docgen 工具）
      docgen: 'vue-component-meta',
    },
  },

  // 自訂 Vite 配置
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],  // ✅ 必須：支援 .vue 檔案
      resolve: {
        alias: {
          // 設定別名以正確解析 workspace dependencies
          '@liquid/ui': path.resolve(__dirname, '../../../packages/ui/src'),
          '@liquid/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
        },
      },
    });
  },

  // TypeScript 配置
  typescript: {
    check: false, // 可選：在 Storybook 建置時跳過型別檢查以加快速度
  },

  docs: {
    autodocs: 'tag', // 當 story 包含 'autodocs' tag 時自動生成文件
  },
};

export default config;
```

### .storybook/preview.ts

```typescript
import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';

// 引入 Design Tokens (CSS Variables)
import '@liquid/tokens/colors.css';

// Vue 全域配置（如需要）
setup((app) => {
  // 可以在這裡註冊全域元件或插件
});

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;
```

### package.json（完整版）

```json
{
  "name": "@liquid/storybook",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
  },
  "dependencies": {
    "@liquid/ui": "workspace:*",
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-interactions": "^8.0.0",
    "@storybook/addon-links": "^8.0.0",
    "@storybook/vue3": "^8.0.0",
    "@storybook/vue3-vite": "^8.0.0",
    "@vitejs/plugin-vue": "^5.0.4",
    "storybook": "^8.0.0"
  }
}
```

---

## 驗證成功

啟動 Storybook 後應該看到：

```
@storybook/core v8.6.15

info => Starting manager..
info => Starting preview..
╭─────────────────────────────────────────────────────────────────────╮
│                                                                     │
│   Storybook 8.6.15 for vue3-vite started                            │
│   195 ms for manager and 870 ms for preview                         │
│                                                                     │
│   Local:            http://localhost:6006/                          │
│   On your network:  http://192.168.1.107:6006/                      │
│                                                                     │
╰─────────────────────────────────────────────────────────────────────╯
```

**成功指標：**
- ✅ 無錯誤訊息
- ✅ 無 addon 找不到的警告
- ✅ Vite 能正確解析 `.vue` 檔案
- ✅ Stories 正常顯示在左側導航

---

## 關鍵學習總結

### 1. Storybook + Vue 3 + Vite 的必要配置

```typescript
// main.ts 必須包含
import vue from '@vitejs/plugin-vue';

async viteFinal(config) {
  return mergeConfig(config, {
    plugins: [vue()],  // ← 即使 framework 是 vue3-vite 也要加
    resolve: { alias: { ... } },
  });
}
```

### 2. Addons 必須明確安裝

- 在 `main.ts` 引用的 addons **必須**在 `package.json` 中安裝
- Storybook 不會自動安裝或繼承 addons

### 3. Monorepo 中的 pnpm 依賴管理

- 修改 `package.json` 後使用 `pnpm install --no-frozen-lockfile`
- 非互動式環境（CI、Claude Code）會自動啟用 frozen-lockfile 模式
- 確保 `pnpm-lock.yaml` 與 `package.json` 同步

### 4. Workspace Dependencies 的別名設定

在 Monorepo 中引用本地 workspace 套件時：
- 使用 `workspace:*` protocol
- 在 Vite 配置中設定別名指向 `src` 目錄（而非 `dist`）
- 這樣能支援 HMR 和開發時的即時更新

---

## 常見陷阱與避免方法

| 陷阱 | 後果 | 避免方法 |
|------|------|---------|
| 忘記在 viteFinal 加 vue() | Vite 無法解析 .vue 檔案 | 明確 import 並註冊 vue plugin |
| 只在 main.ts 引用 addon 但不安裝 | Addon 無法載入，功能缺失 | 同步更新 package.json 和 main.ts |
| 直接執行 pnpm install | 在 CI 環境報錯 lockfile 不同步 | 使用 --no-frozen-lockfile flag |
| 別名指向 dist 目錄 | HMR 失效，開發體驗差 | 別名指向 src 目錄 |

---

## 參考資料

- [Storybook for Vue 3 + Vite 官方文件](https://storybook.js.org/docs/vue/get-started/install)
- [Vite Plugin Vue 文件](https://github.com/vitejs/vite-plugin-vue)
- [pnpm Workspace 文件](https://pnpm.io/workspaces)
- [Storybook Addons 目錄](https://storybook.js.org/addons)

---

**文件版本**: 1.0
**建立日期**: 2026-02-17
**適用版本**: Storybook 8.x, Vue 3.x, Vite 5.x
