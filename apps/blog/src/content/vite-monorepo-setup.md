# Vite Monorepo 實戰：pnpm Workspace 從零設定

用 pnpm workspace 管理多個套件已經是現代前端工程的標配，但從零開始設定往往有很多坑。這篇文章整理完整的設定流程。

## 目錄結構設計

```
my-library/
├── packages/
│   ├── core/          # 核心邏輯
│   ├── ui/            # Vue 元件
│   └── tokens/        # 設計 Token (CSS)
├── apps/
│   ├── storybook/     # 元件展示
│   ├── docs/          # 文件站
│   └── demo/          # Demo App
├── pnpm-workspace.yaml
├── package.json       # Root（私有）
└── tsconfig.json      # 共用 TS 設定
```

## 1. 初始化 Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

Root `package.json` 必須設為私有（防止意外發布）：

```json
{
  "name": "my-library",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "dev:storybook": "pnpm --filter @my/storybook dev"
  }
}
```

## 2. 套件的 package.json 設定

每個套件需要正確設定 `exports`：

```json
{
  "name": "@my/ui",
  "version": "0.0.1",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "peerDependencies": {
    "vue": "^3.4.0"
  }
}
```

## 3. TypeScript Project References

這是讓 IDE 正確理解套件依賴關係的關鍵：

```json
// packages/ui/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"]
}
```

Root `tsconfig.json` 列出所有子專案：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true
  },
  "references": [
    { "path": "packages/tokens" },
    { "path": "packages/ui" },
    { "path": "packages/core" }
  ]
}
```

## 4. Vite Library 模式設定

每個套件的 `vite.config.ts` 用 library 模式：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyUI',
      formats: ['es'],          // 只需 ESM
      fileName: 'index',
    },
    rollupOptions: {
      // 這些不打包進去，由 consumer 提供
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        // 保留 CSS 模組的目錄結構
        assetFileNames: 'components/[name].[ext]',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
```

## 5. Workspace 套件引用

在 apps 中引用 workspace 套件：

```json
{
  "dependencies": {
    "@my/ui": "workspace:*",
    "@my/tokens": "workspace:*"
  }
}
```

`workspace:*` 表示永遠使用 workspace 中的版本，不去 npm 找。

## 6. Vite 開發環境的 Alias 設定

使用 dist 會需要每次重新 build，影響開發效率。用 Vite alias 直接指向 src：

```typescript
// apps/storybook/.storybook/main.ts
viteFinal(config) {
  return mergeConfig(config, {
    resolve: {
      alias: {
        // 直接指向 source，跳過 build
        '@my/ui': path.resolve(__dirname, '../../../packages/ui/src'),
        '@my/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
      },
    },
  })
},
```

這樣在 Storybook 開發時，修改元件 source 會立即 HMR，不需要重新 build。

## 7. 常見問題

### CSS Modules 在 apps 中的 localsConvention

Package 的 CSS Modules 設定和 App 的設定要一致：

```typescript
// vite.config.ts (同時設定 packages 和 apps)
css: {
  modules: {
    localsConvention: 'camelCase',
  },
},
```

### 版本管理

更新套件版本時，workspace 內的依賴會自動跟著更新。發布前記得用 `pnpm changeset` 管理版本。

## 小結

Monorepo 設定的核心是：
1. **pnpm workspace** 管理套件
2. **TypeScript Project References** 讓 IDE 理解依賴
3. **Vite library 模式** 打包套件
4. **Vite alias** 在開發環境跳過 build

設定好後，套件開發和應用開發可以同時進行，修改套件立即看到效果。
