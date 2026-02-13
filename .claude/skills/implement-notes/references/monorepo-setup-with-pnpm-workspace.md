# Monorepo 專案建立流程 - pnpm workspace

使用 pnpm workspace 建立 Monorepo 專案架構的完整操作指南。

---

## 前置準備

### 環境檢查

**必要工具：**
- Node.js (v18+)
- pnpm (v8+)
- Git

**確認 pnpm 安裝：**
```bash
# 檢查 pnpm 版本
pnpm --version

# 如果未安裝，使用以下指令安裝
npm install -g pnpm
# 或
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**技術棧確認：**
- 前端框架：Vue 3
- 語言：TypeScript
- 建置工具：Vite
- CSS 架構：CSS Variables + CSS Modules
- 測試框架：Vitest (可選)

---

## 步驟 1：初始化專案基礎

### 1.1 建立專案目錄

```bash
# 建立專案根目錄
mkdir liquid-ui-library
cd liquid-ui-library
```

### 1.2 初始化 Git

```bash
git init
```

### 1.3 初始化 Root Package

```bash
pnpm init
```

**產生檔案：** `package.json`

**設定內容：**
```json
{
  "name": "liquid-ui-library",
  "version": "0.0.0",
  "private": true,
  "description": "Liquid UI Component Library Monorepo",
  "scripts": {},
  "keywords": ["ui", "components", "monorepo"],
  "author": "",
  "license": "MIT"
}
```

**說明：**
- `"private": true` - 防止整個 monorepo 被發布到 npm
- Root package.json 只負責管理 workspace 和共用腳本

---

## 步驟 2：建立 Workspace 配置

### 2.1 建立 pnpm-workspace.yaml

在專案根目錄建立 `pnpm-workspace.yaml`：

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**說明：**
- `packages/*` - 存放可發布的套件（libraries）
- `apps/*` - 存放應用程式（不會發布）
- pnpm 會自動掃描這些目錄下的所有子目錄

**進階配置範例：**
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - '!**/test/**'      # 排除測試目錄
```

---

## 步驟 3：建立目錄結構

### 3.1 建立主要目錄

```bash
# 建立套件目錄
mkdir -p packages/tokens/src
mkdir -p packages/ui/src/components
mkdir -p packages/engine/core
mkdir -p packages/engine/vue

# 建立應用程式目錄
mkdir -p apps/landing/src
mkdir -p apps/docs
mkdir -p apps/storybook
mkdir -p apps/blog/src
mkdir -p apps/admin/src
```

### 3.2 完整目錄結構

```
liquid-ui-library/
├── .git/
├── package.json                    # Root package.json
├── pnpm-workspace.yaml             # Workspace 配置
├── tsconfig.json                   # 共用 TypeScript 配置
├── .gitignore
│
├── packages/                       # 套件目錄
│   ├── tokens/                     # Design Tokens (CSS Variables)
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── colors.css
│   │       ├── spacing.css
│   │       └── glass.css
│   │
│   ├── ui/                         # Vue UI 元件庫
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── src/
│   │       ├── index.ts
│   │       └── components/
│   │           ├── Button/
│   │           │   ├── Button.vue
│   │           │   ├── Button.module.css
│   │           │   └── index.ts
│   │           └── Card/
│   │               ├── Card.vue
│   │               ├── Card.module.css
│   │               └── index.ts
│   │
│   └── engine/                     # Form Engine + Table Engine
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── core/                   # 純 TypeScript 邏輯
│       │   ├── form/
│       │   │   ├── schema.ts
│       │   │   └── validator.ts
│       │   └── table/
│       │       ├── sort.ts
│       │       ├── filter.ts
│       │       └── pagination.ts
│       │
│       └── vue/                    # Vue 整合層
│           ├── FormEngine.vue
│           ├── TableEngine.vue
│           └── index.ts
│
└── apps/                           # 應用程式目錄
    ├── landing/                    # Landing Page
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   ├── index.html
    │   └── src/
    │       └── main.ts
    │
    ├── docs/                       # VitePress 文檔網站
    │   ├── package.json
    │   └── .vitepress/
    │       └── config.ts
    │
    ├── storybook/                  # Storybook
    │   ├── package.json
    │   └── .storybook/
    │       └── main.ts
    │
    ├── blog/                       # Demo - Liquid Glass 部落格
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   ├── index.html
    │   └── src/
    │       └── main.ts
    │
    └── admin/                      # Demo - 後台管理系統
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        ├── index.html
        └── src/
            └── main.ts
```

---

## 步驟 4：建立套件 Package.json

### 4.1 packages/tokens/package.json

```bash
cd packages/tokens
pnpm init
```

**配置內容：**
```json
{
  "name": "@liquid/tokens",
  "version": "0.0.1",
  "description": "Liquid Glass Design Tokens (CSS Variables)",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./colors.css": "./dist/colors.css",
    "./spacing.css": "./dist/spacing.css",
    "./glass.css": "./dist/glass.css",
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch"
  },
  "keywords": ["design-tokens", "css-variables", "liquid-glass"],
  "publishConfig": {
    "access": "public"
  }
}
```

### 4.2 packages/ui/package.json

```bash
cd ../ui
pnpm init
```

**配置內容：**
```json
{
  "name": "@liquid/ui",
  "version": "0.0.1",
  "description": "Liquid Glass Vue UI Component Library",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./style.css": "./dist/style.css",
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "vite build && vue-tsc --declaration --emitDeclarationOnly",
    "dev": "vite build --watch",
    "typecheck": "vue-tsc --noEmit"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  },
  "dependencies": {
    "@liquid/tokens": "workspace:*"
  },
  "devDependencies": {
    "vue": "^3.4.21",
    "@vitejs/plugin-vue": "^5.0.4",
    "vue-tsc": "^2.0.6"
  },
  "keywords": ["vue", "vue3", "ui", "components", "liquid-glass"],
  "publishConfig": {
    "access": "public"
  }
}
```

### 4.3 packages/engine/package.json

```bash
cd ../engine
pnpm init
```

**配置內容：**
```json
{
  "name": "@liquid/engine",
  "version": "0.0.1",
  "description": "Schema-Driven Form Engine & Table Engine",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./core": {
      "types": "./dist/core/index.d.ts",
      "import": "./dist/core/index.js"
    },
    "./vue": {
      "types": "./dist/vue/index.d.ts",
      "import": "./dist/vue/index.js"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "vite build && vue-tsc --declaration --emitDeclarationOnly",
    "dev": "vite build --watch",
    "typecheck": "vue-tsc --noEmit"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  },
  "dependencies": {
    "@liquid/ui": "workspace:*"
  },
  "devDependencies": {
    "vue": "^3.4.21",
    "@vitejs/plugin-vue": "^5.0.4",
    "vue-tsc": "^2.0.6"
  },
  "keywords": ["form-engine", "table-engine", "schema-driven", "vue"],
  "publishConfig": {
    "access": "public"
  }
}
```

**關鍵欄位說明：**
- `"type": "module"` - 使用 ES Module
- `"main"` / `"module"` - 套件入口點
- `"types"` - TypeScript 型別定義檔
- `"exports"` - 現代化的套件匯出定義（支援多入口點）
- `"files"` - 發布時包含的檔案
- `"peerDependencies"` - 需要使用者自行安裝的依賴
- `"workspace:*"` - 使用 workspace 中的本地套件
- `"publishConfig"` - npm 發布設定

### 4.4 apps/landing/package.json

```bash
cd ../../apps/landing
pnpm init
```

**配置內容：**
```json
{
  "name": "@liquid/landing",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@liquid/ui": "workspace:*",
    "@liquid/tokens": "workspace:*",
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.4.0",
    "vue-tsc": "^2.0.6"
  }
}
```

**Workspace Protocol 說明：**
```json
{
  "dependencies": {
    "@liquid/ui": "workspace:*"
  }
}
```
- `workspace:*` - 永遠使用 workspace 中的最新版本
- `workspace:^` - 使用相容的 workspace 版本
- `workspace:~` - 使用補丁版本範圍

### 4.5 apps/docs/package.json

```bash
cd ../docs
pnpm init
```

**配置內容：**
```json
{
  "name": "@liquid/docs",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "dependencies": {
    "@liquid/ui": "workspace:*",
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "vitepress": "^1.3.1"
  }
}
```

### 4.6 apps/storybook/package.json

```bash
cd ../storybook
pnpm init
```

**配置內容：**
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
    "@storybook/vue3": "^8.0.0",
    "@storybook/vue3-vite": "^8.0.0",
    "storybook": "^8.0.0"
  }
}
```

### 4.7 apps/blog/package.json

```bash
cd ../blog
pnpm init
```

**配置內容：**
```json
{
  "name": "@liquid/blog",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@liquid/ui": "workspace:*",
    "@liquid/tokens": "workspace:*",
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.4.0",
    "vue-tsc": "^2.0.6"
  }
}
```

### 4.8 apps/admin/package.json

```bash
cd ../admin
pnpm init
```

**配置內容：**
```json
{
  "name": "@liquid/admin",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@liquid/ui": "workspace:*",
    "@liquid/engine": "workspace:*",
    "@liquid/tokens": "workspace:*",
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.4.0",
    "vue-tsc": "^2.0.6"
  }
}
```

---

## 步驟 5：設定 TypeScript 配置

### 5.1 Root tsconfig.json（共用配置）

```bash
cd ../..  # 回到 root
```

建立 `tsconfig.json`：

```json
{
  "compilerOptions": {
    // 語言與環境
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",

    // 模組系統
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,

    // 型別檢查
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,

    // 互操作性
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,

    // 其他
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### 5.2 packages/liquid-ui/tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules", "**/*.spec.ts"]
}
```

**關鍵設定：**
- `"extends"` - 繼承 root 配置
- `"composite": true` - 啟用專案引用（提升型別檢查效能）
- `"outDir"` / `"rootDir"` - 輸出和來源目錄

### 5.3 apps/landing/tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": false,
    "noEmit": true
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../../packages/ui" },
    { "path": "../../packages/tokens" }
  ]
}
```

**說明：**
- `"noEmit": true` - App 不需要輸出型別檔案
- `"references"` - TypeScript 專案引用（可選，提升效能）
- 各 app 可根據依賴的 packages 調整 `references`

---

## 步驟 6：建立 Vite 配置

### 6.1 packages/ui/vite.config.ts

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LiquidUI',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
});
```

**配置說明：**
- `@vitejs/plugin-vue` - Vue 3 SFC 支援
- `vite-plugin-dts` - 自動生成 TypeScript 型別定義
- `build.lib` - Library 模式配置
- `external: ['vue']` - 不打包 Vue（作為 peer dependency）
- `css.modules` - CSS Modules 配置
- `formats: ['es']` - 只輸出 ES Module 格式

### 6.2 packages/engine/vite.config.ts

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['core', 'vue'],
      outDir: 'dist',
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'core/index.ts'),
        vue: resolve(__dirname, 'vue/index.ts')
      },
      name: 'LiquidEngine',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@liquid/ui'],
      output: {
        globals: {
          vue: 'Vue',
          '@liquid/ui': 'LiquidUI'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});
```

### 6.3 apps/landing/vite.config.ts

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  }
});
```

### 6.4 apps/blog/vite.config.ts

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
    open: true
  }
});
```

### 6.5 apps/admin/vite.config.ts

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3002,
    open: true
  }
});
```

---

## 步驟 7：建立基礎原始碼

### 7.1 packages/ui/src/index.ts

```typescript
// 元件匯出
export { default as Button } from './components/Button';
export { default as Card } from './components/Card';

// 型別匯出
export type { ButtonProps } from './components/Button';
export type { CardProps } from './components/Card';
```

### 7.2 packages/ui/src/components/Button/Button.vue

```vue
<script setup lang="ts">
export interface ButtonProps {
  /**
   * 按鈕樣式變體
   */
  variant?: 'primary' | 'secondary' | 'outline';

  /**
   * 按鈕尺寸
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 是否禁用
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
});

const emit = defineEmits<{
  click: []
}>();

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<template>
  <button
    :class="[
      'liquid-button',
      `liquid-button--${variant}`,
      `liquid-button--${size}`
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style module>
/* 樣式將在 Button.module.css 中定義 */
</style>
```

### 7.3 packages/ui/src/components/Button/Button.module.css

```css
.liquid-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

/* 變體樣式 */
.liquid-button--primary {
  background: var(--liquid-color-primary, #007bff);
  color: white;
}

.liquid-button--primary:hover:not(:disabled) {
  background: var(--liquid-color-primary-dark, #0056b3);
}

.liquid-button--secondary {
  background: var(--liquid-color-secondary, #6c757d);
  color: white;
}

.liquid-button--secondary:hover:not(:disabled) {
  background: var(--liquid-color-secondary-dark, #545b62);
}

.liquid-button--outline {
  background: transparent;
  color: var(--liquid-color-primary, #007bff);
  border: 1px solid var(--liquid-color-primary, #007bff);
}

.liquid-button--outline:hover:not(:disabled) {
  background: var(--liquid-color-primary, #007bff);
  color: white;
}

/* 尺寸樣式 */
.liquid-button--sm {
  padding: 0.25rem 0.5rem;
  font-size: 12px;
}

.liquid-button--md {
  padding: 0.5rem 1rem;
  font-size: 14px;
}

.liquid-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: 16px;
}

/* 禁用狀態 */
.liquid-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 7.4 packages/ui/src/components/Button/index.ts

```typescript
import Button from './Button.vue';
export type { ButtonProps } from './Button.vue';
export default Button;
```

### 7.5 apps/landing/index.html

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Liquid UI Library</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 7.6 apps/landing/src/main.ts

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).mount('#app');
```

### 7.7 apps/landing/src/App.vue

```vue
<script setup lang="ts">
import { Button } from '@liquid/ui';

const handleClick = (variant: string) => {
  alert(`${variant} clicked!`);
};
</script>

<template>
  <div class="app">
    <h1>Liquid UI Library</h1>

    <section class="section">
      <h2>Button Variants</h2>
      <div class="button-group">
        <Button variant="primary" @click="() => handleClick('Primary')">
          Primary Button
        </Button>

        <Button variant="secondary" @click="() => handleClick('Secondary')">
          Secondary Button
        </Button>

        <Button variant="outline" @click="() => handleClick('Outline')">
          Outline Button
        </Button>
      </div>
    </section>

    <section class="section">
      <h2>Button Sizes</h2>
      <div class="button-group">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </section>

    <section class="section">
      <h2>Disabled State</h2>
      <div class="button-group">
        <Button disabled>Disabled Button</Button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: var(--liquid-color-text, #333);
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--liquid-color-text-secondary, #666);
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
```

### 7.8 apps/landing/src/style.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --liquid-color-primary: #007bff;
  --liquid-color-primary-dark: #0056b3;
  --liquid-color-secondary: #6c757d;
  --liquid-color-secondary-dark: #545b62;
  --liquid-color-text: #333;
  --liquid-color-text-secondary: #666;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background: #f5f5f5;
  color: var(--liquid-color-text);
}
```

---

## 步驟 8：安裝依賴

### 8.1 在 Root 安裝共用開發依賴

```bash
# 回到專案根目錄
cd /path/to/liquid-ui-library

# 安裝 TypeScript 和建置工具
pnpm add -D -w typescript vite @vitejs/plugin-vue vite-plugin-dts

# 安裝 Vue 型別支援
pnpm add -D -w vue-tsc

# 安裝型別定義
pnpm add -D -w @types/node
```

**指令說明：**
- `-D` = `--save-dev` (開發依賴)
- `-w` = `--workspace-root` (安裝到 root)

### 8.2 在 tokens 安裝依賴

```bash
# tokens 主要是 CSS，無需額外依賴
# 依賴已在 root 安裝
```

### 8.3 在 ui 安裝依賴

```bash
# Peer dependencies (開發時需要)
pnpm --filter @liquid/ui add -D vue

# 如果需要安裝 @liquid/tokens
pnpm --filter @liquid/ui add @liquid/tokens
```

### 8.4 在 engine 安裝依賴

```bash
# Peer dependencies
pnpm --filter @liquid/engine add -D vue

# Workspace dependencies
pnpm --filter @liquid/engine add @liquid/ui
```

### 8.5 在 landing 安裝依賴

```bash
# Vue 執行時依賴
pnpm --filter @liquid/landing add vue

# Workspace dependencies
pnpm --filter @liquid/landing add @liquid/ui @liquid/tokens
```

### 8.6 在 blog 和 admin 安裝依賴

```bash
# Blog
pnpm --filter @liquid/blog add vue vue-router
pnpm --filter @liquid/blog add @liquid/ui @liquid/tokens

# Admin
pnpm --filter @liquid/admin add vue vue-router
pnpm --filter @liquid/admin add @liquid/ui @liquid/engine @liquid/tokens
```

### 8.7 安裝所有套件依賴

```bash
# 執行一次完整安裝，建立 workspace 連結
pnpm install
```

**執行結果：**
- 安裝所有套件的依賴
- 自動建立 workspace 套件間的 symlink
  - `@liquid/tokens` → `@liquid/ui`
  - `@liquid/ui` → `@liquid/engine`, `@liquid/landing`, `@liquid/blog`, `@liquid/admin`
  - `@liquid/engine` → `@liquid/admin`
- 生成 `pnpm-lock.yaml` 鎖定檔

---

## 步驟 9：設定 Root 腳本

### 更新 package.json 的 scripts

```json
{
  "scripts": {
    "dev": "pnpm --filter @liquid/landing dev",
    "dev:landing": "pnpm --filter @liquid/landing dev",
    "dev:blog": "pnpm --filter @liquid/blog dev",
    "dev:admin": "pnpm --filter @liquid/admin dev",
    "dev:docs": "pnpm --filter @liquid/docs dev",
    "dev:storybook": "pnpm --filter @liquid/storybook dev",

    "dev:ui": "pnpm --filter @liquid/ui dev",
    "dev:engine": "pnpm --filter @liquid/engine dev",

    "build": "pnpm -r --filter './packages/*' run build",
    "build:packages": "pnpm -r --filter './packages/*' run build",
    "build:tokens": "pnpm --filter @liquid/tokens run build",
    "build:ui": "pnpm --filter @liquid/ui run build",
    "build:engine": "pnpm --filter @liquid/engine run build",

    "build:apps": "pnpm -r --filter './apps/*' run build",
    "build:landing": "pnpm --filter @liquid/landing run build",
    "build:blog": "pnpm --filter @liquid/blog run build",
    "build:admin": "pnpm --filter @liquid/admin run build",
    "build:docs": "pnpm --filter @liquid/docs run build",
    "build:storybook": "pnpm --filter @liquid/storybook run build",

    "typecheck": "pnpm -r run typecheck",
    "typecheck:packages": "pnpm -r --filter './packages/*' run typecheck",

    "clean": "pnpm -r exec rm -rf dist node_modules",
    "clean:dist": "pnpm -r exec rm -rf dist",

    "install:all": "pnpm install"
  }
}
```

**腳本說明：**

| 指令 | 說明 |
|------|------|
| `pnpm -r` | recursive，在所有套件執行 |
| `pnpm --filter <pkg>` | 只在特定套件執行 |
| `pnpm -r --parallel` | 平行執行（用於 dev 等持續運行的任務） |
| `pnpm -r exec` | 在所有套件執行任意指令 |

---

## 步驟 10：建立 .gitignore

```gitignore
# Dependencies
node_modules
.pnpm-store
.pnpm-debug.log

# Build outputs
dist
build
*.tsbuildinfo

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage
.nyc_output

# Temporary files
*.tmp
.cache
.temp
```

---

## 步驟 11：建立 .npmrc（可選但建議）

在 root 建立 `.npmrc`：

```ini
# 嚴格的 peer dependencies 檢查
strict-peer-dependencies=true

# 自動安裝 peer dependencies
auto-install-peers=true

# 使用 symlink（預設行為）
shamefully-hoist=false

# 鎖定檔版本
lockfile-version=6.0

# 儲存精確版本
save-exact=false
```

---

## 步驟 12：初始化 Git 提交

```bash
# 查看狀態
git status

# 加入所有檔案
git add .

# 初始提交
git commit -m "chore: initialize monorepo with pnpm workspace"
```

---

## 步驟 13：測試設定

### 13.1 建置 Packages

```bash
# 建置所有 packages
pnpm run build:packages

# 或個別建置
pnpm run build:tokens
pnpm run build:ui
pnpm run build:engine
```

**預期輸出：**
```
packages/tokens/dist/
├── index.js
├── colors.css
├── spacing.css
└── glass.css

packages/ui/dist/
├── index.js
├── index.js.map
├── index.d.ts
├── index.d.ts.map
└── style.css

packages/engine/dist/
├── index.js
├── index.d.ts
├── core/
│   ├── index.js
│   └── index.d.ts
└── vue/
    ├── index.js
    └── index.d.ts
```

### 13.2 啟動開發環境

```bash
# 啟動 Landing Page
pnpm run dev

# 或啟動其他 app
pnpm run dev:blog
pnpm run dev:admin
pnpm run dev:docs
```

**預期結果：**
- Vite 開發伺服器啟動
- 瀏覽器自動開啟對應的 port
  - Landing: `http://localhost:3000`
  - Blog: `http://localhost:3001`
  - Admin: `http://localhost:3002`
- 顯示對應頁面與元件範例

### 13.3 測試 Hot Module Replacement (HMR)

1. 修改 `packages/ui/src/components/Button/Button.vue`
2. 儲存檔案
3. 瀏覽器應自動更新（無需重新整理）

---

## 常用 pnpm Workspace 指令

### 依賴管理

```bash
# 在 root 安裝開發依賴
pnpm add -D -w <package>

# 在特定套件安裝依賴
pnpm --filter @liquid/ui add <package>

# 在所有套件安裝相同依賴
pnpm -r add <package>

# 移除依賴
pnpm --filter @liquid/ui remove <package>

# 更新依賴
pnpm -r update
```

### 執行腳本

```bash
# 在特定套件執行
pnpm --filter @liquid/ui run build

# 在所有套件執行（依序）
pnpm -r run build

# 在所有套件平行執行
pnpm -r --parallel run dev

# 在特定套件及其依賴者執行
pnpm --filter @liquid/ui... run build
```

### Workspace 篩選語法

```bash
# 只執行指定套件
pnpm --filter @liquid/ui run build

# 執行指定套件及其所有依賴
pnpm --filter ...@liquid/ui run build

# 執行指定套件及其所有依賴者
pnpm --filter @liquid/ui... run build

# 執行指定目錄下的所有套件
pnpm --filter "./packages/*" run build

# 排除特定套件
pnpm --filter "!@liquid/docs" run build
```

---

## 專案維護指令

### 清理專案

```bash
# 清理所有建置輸出
pnpm run clean:dist

# 完整清理（包含 node_modules）
pnpm run clean
pnpm install
```

### 檢查依賴

```bash
# 列出所有套件及其依賴
pnpm list -r

# 檢查過期依賴
pnpm outdated -r

# 檢查依賴樹
pnpm why <package>
```

### 型別檢查

```bash
# 執行所有套件的型別檢查
pnpm run typecheck

# 只檢查特定套件
pnpm --filter @liquid/ui run typecheck
```

---

## Workspace 依賴關係圖

```
@liquid/tokens (Design Tokens - 最底層)
    ↓ workspace:*
    │
@liquid/ui (Vue 元件庫)
    ├── 依賴 @liquid/tokens
    ↓ workspace:*
    │
@liquid/engine (Form + Table Engine)
    ├── 依賴 @liquid/ui
    ↓ workspace:*
    │
應用程式層：
├── @liquid/landing (依賴 @liquid/ui, @liquid/tokens)
├── @liquid/docs (依賴 @liquid/ui)
├── @liquid/storybook (依賴 @liquid/ui)
├── @liquid/blog (依賴 @liquid/ui, @liquid/tokens)
└── @liquid/admin (依賴 @liquid/ui, @liquid/engine, @liquid/tokens)
```

**依賴層級說明：**
1. **Layer 0**: `@liquid/tokens` - 純 CSS Variables，無依賴
2. **Layer 1**: `@liquid/ui` - 依賴 tokens
3. **Layer 2**: `@liquid/engine` - 依賴 ui
4. **Layer 3**: 所有 apps - 依賴各自需要的 packages

**修改影響範圍：**
- 修改 `@liquid/tokens` → 影響 ui, landing, blog, admin
- 修改 `@liquid/ui` → 影響 engine 及所有 apps
- 修改 `@liquid/engine` → 只影響 admin
- 所有修改都會透過 workspace symlink 自動反映

---

## 常見問題處理

### 問題 1：Workspace 連結未生效

**症狀：** 修改 `@liquid/ui` 後，playground 沒有更新

**解決方法：**
```bash
# 重新安裝建立連結
pnpm install

# 或清理後重裝
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```

### 問題 2：型別定義找不到

**症狀：** TypeScript 報錯找不到 `@liquid/ui` 的型別

**解決方法：**
```bash
# 確保 liquid-ui 已建置
pnpm run build:ui

# 檢查 dist 目錄是否有 .d.ts 檔案
ls packages/liquid-ui/dist/
```

### 問題 3：pnpm install 速度慢

**優化方法：**
```bash
# 使用本地 registry 快取
pnpm config set store-dir ~/.pnpm-store

# 啟用網路重試
pnpm config set network-timeout 300000
```

### 問題 4：Circular dependency 警告

**原因：** 套件間形成循環依賴

**檢查方法：**
```bash
pnpm list -r --depth=Infinity
```

**解決方案：** 重新設計套件架構，避免循環依賴

---

## 最佳實踐

### 1. 套件命名規範

- 使用 scope：`@liquid/ui`, `@liquid/core`
- 套件名稱使用 kebab-case
- App 套件標記為 `private: true`

### 2. 版本管理

```json
{
  "dependencies": {
    "@liquid/ui": "workspace:*"    // 開發時：使用最新
  }
}
```

發布前轉換：
```json
{
  "dependencies": {
    "@liquid/ui": "^0.1.0"         // 發布時：使用實際版本
  }
}
```

### 3. 腳本組織

- Root `package.json` 只放全域腳本
- 各套件維護自己的 `build`、`test` 腳本
- 使用 `-r` 統一執行

### 4. 型別安全

- 開啟 `strict` 模式
- 使用 TypeScript 專案引用（`references`）
- 確保每個套件都有 `typecheck` 腳本

### 5. 建置順序

pnpm 會自動根據 workspace 依賴關係決定建置順序：
```
@liquid/ui → @liquid/playground
            ↘ @liquid/docs
```

---

## 進階配置（可選）

### 使用 .pnpmfile.cjs 自訂行為

```javascript
// .pnpmfile.cjs
module.exports = {
  hooks: {
    readPackage(pkg) {
      // 自動修正依賴版本
      if (pkg.dependencies?.lodash) {
        pkg.dependencies.lodash = '^4.17.21';
      }
      return pkg;
    }
  }
};
```

### 配置 Catalog（pnpm 8.6+）

在 root `package.json` 統一管理版本：

```json
{
  "pnpm": {
    "catalogs": {
      "default": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "vite": "^5.4.0"
      }
    }
  }
}
```

套件中使用：
```json
{
  "dependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  }
}
```

---

## 總結

使用 pnpm workspace 建立 Monorepo 的關鍵步驟：

1. ✅ 建立 `pnpm-workspace.yaml` 定義 workspace
2. ✅ 組織目錄結構（`packages/` 和 `apps/`）
3. ✅ 為每個套件建立 `package.json`
4. ✅ 使用 `workspace:*` 建立套件間依賴
5. ✅ 設定共用的 TypeScript 和建置配置
6. ✅ 在 root `package.json` 建立統一的執行腳本
7. ✅ 使用 `pnpm install` 建立 workspace 連結

**pnpm workspace 的優勢：**
- 🚀 快速的依賴安裝
- 💾 節省磁碟空間
- 🔗 自動的 workspace 套件連結
- 🛡️ 嚴格的依賴管理（避免幽靈依賴）
- 📦 原生的 monorepo 支援

---

## 下一步

建立完成後，可以考慮：

1. **加入測試框架** - Vitest、Jest
2. **設定 Linting** - ESLint、Prettier
3. **加入 CI/CD** - GitHub Actions
4. **考慮升級到 Turborepo** - 當建置速度成為瓶頸時
5. **建立發布流程** - Changesets、semantic-release

---

## 參考資料

- [pnpm Workspace 官方文檔](https://pnpm.io/workspaces)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
