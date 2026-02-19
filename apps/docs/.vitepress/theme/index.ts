import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import {
  GlassFilterProvider,
  LiquidButton,
  LiquidCard,
  LiquidBadge,
  LiquidModal,
  LiquidNavbar,
  LiquidToast,
  LiquidInput,
  LiquidSelect,
} from '@liquid/ui'
import '@liquid/tokens/colors.css'
import '@liquid/tokens/glass.css'

export default {
  extends: DefaultTheme,
  // Wrap root layout with GlassFilterProvider so SVG filter variants work in demos
  Layout: () => {
    return h(GlassFilterProvider, null, {
      default: () => h(DefaultTheme.Layout),
    })
  },
  enhanceApp({ app }) {
    // Register components globally so they can be used directly in .md files
    app.component('GlassFilterProvider', GlassFilterProvider)
    app.component('LiquidButton', LiquidButton)
    app.component('LiquidCard', LiquidCard)
    app.component('LiquidBadge', LiquidBadge)
    app.component('LiquidModal', LiquidModal)
    app.component('LiquidNavbar', LiquidNavbar)
    app.component('LiquidToast', LiquidToast)
    app.component('LiquidInput', LiquidInput)
    app.component('LiquidSelect', LiquidSelect)
  },
} satisfies Theme
