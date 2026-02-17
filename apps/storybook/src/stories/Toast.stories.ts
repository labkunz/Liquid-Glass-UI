import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { GlassFilterProvider } from '@liquid/ui';
import { Toast } from '@liquid/ui';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'Toast 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Toast 類型',
      table: {
        type: { summary: "'info' | 'success' | 'warning' | 'error'" },
        defaultValue: { summary: 'info' },
      },
    },
    message: {
      control: 'text',
      description: 'Toast 顯示訊息',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
      description: 'Toast 顯示位置',
      table: {
        type: { summary: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'" },
        defaultValue: { summary: 'bottom-right' },
      },
    },
    duration: {
      control: 'number',
      description: '自動關閉時間（毫秒），0 表示不自動關閉',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },
  },
  args: {
    variant: 'default',
    type: 'info',
    message: 'This is a toast notification.',
    position: 'bottom-right',
    duration: 3000,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - info type
export const Default: Story = {
  args: {
    variant: 'default',
    type: 'info',
    message: 'This is an info notification.',
  },
  render: (args) => ({
    components: { Toast, GlassFilterProvider },
    setup() {
      const isVisible = ref(false);
      const show = () => { isVisible.value = true; };
      return { args, isVisible, show };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 2rem;">
          <button @click="show" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer; font-size: 14px;">
            顯示 Toast
          </button>
          <Toast v-bind="args" v-model="isVisible" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// AllTypes - show all 4 types at once using separate refs
export const AllTypes: Story = {
  render: () => ({
    components: { Toast, GlassFilterProvider },
    setup() {
      const isVisibleInfo = ref(false);
      const isVisibleSuccess = ref(false);
      const isVisibleWarning = ref(false);
      const isVisibleError = ref(false);
      const showAll = () => {
        isVisibleInfo.value = true;
        setTimeout(() => { isVisibleSuccess.value = true; }, 200);
        setTimeout(() => { isVisibleWarning.value = true; }, 400);
        setTimeout(() => { isVisibleError.value = true; }, 600);
      };
      return { isVisibleInfo, isVisibleSuccess, isVisibleWarning, isVisibleError, showAll };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); min-height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 2rem;">
          <button @click="showAll" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer; font-size: 14px;">
            顯示所有類型
          </button>
          <Toast variant="default" type="info" message="Info: Something to note." position="top-right" :duration="5000" v-model="isVisibleInfo" />
          <Toast variant="default" type="success" message="Success: Operation completed!" position="top-right" :duration="5000" v-model="isVisibleSuccess" />
          <Toast variant="default" type="warning" message="Warning: Proceed with caution." position="bottom-right" :duration="5000" v-model="isVisibleWarning" />
          <Toast variant="default" type="error" message="Error: Something went wrong." position="bottom-right" :duration="5000" v-model="isVisibleError" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// GlassCssOnly - glass-css-only on gradient background
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    type: 'info',
    message: 'Glass CSS Only notification.',
  },
  render: (args) => ({
    components: { Toast, GlassFilterProvider },
    setup() {
      const isVisible = ref(false);
      const show = () => { isVisible.value = true; };
      return { args, isVisible, show };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 2rem;">
          <button @click="show" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer; font-size: 14px;">
            顯示 Toast
          </button>
          <Toast v-bind="args" v-model="isVisible" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// GlassHighlightLayered - glass-highlight-layered variant
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    type: 'success',
    message: 'Glass Highlight Layered notification.',
  },
  render: (args) => ({
    components: { Toast, GlassFilterProvider },
    setup() {
      const isVisible = ref(false);
      const show = () => { isVisible.value = true; };
      return { args, isVisible, show };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); min-height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 2rem;">
          <button @click="show" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer; font-size: 14px;">
            顯示 Toast
          </button>
          <Toast v-bind="args" v-model="isVisible" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// GlassComparison - compare both glass variants, all 4 types shown
export const GlassComparison: Story = {
  render: () => ({
    components: { Toast, GlassFilterProvider },
    setup() {
      const cssOnlyInfo = ref(false);
      const cssOnlySuccess = ref(false);
      const cssOnlyWarning = ref(false);
      const cssOnlyError = ref(false);
      const layeredInfo = ref(false);
      const layeredSuccess = ref(false);
      const layeredWarning = ref(false);
      const layeredError = ref(false);

      const showCssOnly = () => {
        cssOnlyInfo.value = true;
        setTimeout(() => { cssOnlySuccess.value = true; }, 200);
        setTimeout(() => { cssOnlyWarning.value = true; }, 400);
        setTimeout(() => { cssOnlyError.value = true; }, 600);
      };
      const showLayered = () => {
        layeredInfo.value = true;
        setTimeout(() => { layeredSuccess.value = true; }, 200);
        setTimeout(() => { layeredWarning.value = true; }, 400);
        setTimeout(() => { layeredError.value = true; }, 600);
      };

      return {
        cssOnlyInfo, cssOnlySuccess, cssOnlyWarning, cssOnlyError,
        layeredInfo, layeredSuccess, layeredWarning, layeredError,
        showCssOnly, showLayered,
      };
    },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem;">

          <!-- CSS Only comparison -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 220px; display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 2rem; flex-direction: column; gap: 1rem;">
            <p style="color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">glass-css-only — all types</p>
            <button @click="showCssOnly" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer; font-size: 14px;">
              顯示 CSS Only 所有類型
            </button>
          </div>

          <!-- Highlight Layered comparison -->
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); min-height: 220px; display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 2rem; flex-direction: column; gap: 1rem;">
            <p style="color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">glass-highlight-layered — all types</p>
            <button @click="showLayered" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer; font-size: 14px;">
              顯示 Layered 所有類型
            </button>
          </div>

          <!-- CSS Only Toasts -->
          <Toast variant="glass-css-only" type="info" message="CSS Only: Info notification." position="top-left" :duration="6000" v-model="cssOnlyInfo" />
          <Toast variant="glass-css-only" type="success" message="CSS Only: Success notification." position="top-left" :duration="6000" v-model="cssOnlySuccess" />
          <Toast variant="glass-css-only" type="warning" message="CSS Only: Warning notification." position="bottom-left" :duration="6000" v-model="cssOnlyWarning" />
          <Toast variant="glass-css-only" type="error" message="CSS Only: Error notification." position="bottom-left" :duration="6000" v-model="cssOnlyError" />

          <!-- Layered Toasts -->
          <Toast variant="glass-highlight-layered" type="info" message="Layered: Info notification." position="top-right" :duration="6000" v-model="layeredInfo" />
          <Toast variant="glass-highlight-layered" type="success" message="Layered: Success notification." position="top-right" :duration="6000" v-model="layeredSuccess" />
          <Toast variant="glass-highlight-layered" type="warning" message="Layered: Warning notification." position="bottom-right" :duration="6000" v-model="layeredWarning" />
          <Toast variant="glass-highlight-layered" type="error" message="Layered: Error notification." position="bottom-right" :duration="6000" v-model="layeredError" />

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Positions - show bottom-right and top-right
export const Positions: Story = {
  render: () => ({
    components: { Toast, GlassFilterProvider },
    setup() {
      const bottomRight = ref(false);
      const topRight = ref(false);
      const topCenter = ref(false);
      const bottomLeft = ref(false);

      const showAll = () => {
        bottomRight.value = true;
        topRight.value = true;
        topCenter.value = true;
        bottomLeft.value = true;
      };

      return { bottomRight, topRight, topCenter, bottomLeft, showAll };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); min-height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 12px; padding: 2rem;">
          <button @click="showAll" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer; font-size: 14px;">
            顯示各位置 Toast
          </button>
          <Toast variant="default" type="info" message="Bottom Right position." position="bottom-right" :duration="5000" v-model="bottomRight" />
          <Toast variant="default" type="success" message="Top Right position." position="top-right" :duration="5000" v-model="topRight" />
          <Toast variant="default" type="warning" message="Top Center position." position="top-center" :duration="5000" v-model="topCenter" />
          <Toast variant="default" type="error" message="Bottom Left position." position="bottom-left" :duration="5000" v-model="bottomLeft" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};
