import type { Meta, StoryObj } from '@storybook/vue3';
import { LiquidInput, GlassFilterProvider } from '@liquid/ui';
import { ref } from 'vue';

const meta = {
  title: 'Components/LiquidInput',
  component: LiquidInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '輸入框樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '輸入框尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
      description: '輸入框類型',
      table: {
        type: { summary: "'text' | 'email' | 'password' | 'number' | 'search'" },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: '佔位符文字',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    type: 'text',
    placeholder: 'Enter text...',
    disabled: false,
    modelValue: '',
  },
} satisfies Meta<typeof LiquidInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: 'Enter text...',
  },
  render: (args) => ({
    components: { LiquidInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="width: 280px;">
        <LiquidInput v-bind="args" v-model="value" />
        <p style="margin-top: 0.5rem; font-size: 12px; color: #888;">Value: {{ value }}</p>
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    placeholder: 'Glass input...',
  },
  render: (args) => ({
    components: { LiquidInput, GlassFilterProvider },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 12px;
        ">
          <div style="width: 280px;">
            <LiquidInput v-bind="args" v-model="value" />
            <p style="margin-top: 0.5rem; font-size: 12px; color: rgba(255,255,255,0.7);">Value: {{ value }}</p>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    placeholder: 'Glass input...',
  },
  render: (args) => ({
    components: { LiquidInput, GlassFilterProvider },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 12px;
        ">
          <div style="width: 280px;">
            <LiquidInput v-bind="args" v-model="value" />
            <p style="margin-top: 0.5rem; font-size: 12px; color: rgba(255,255,255,0.7);">Value: {{ value }}</p>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { LiquidInput, GlassFilterProvider },
    setup() {
      const values = ref({
        purpleCssOnly: '',
        purpleLayered: '',
        tealCssOnly: '',
        tealLayered: '',
      });
      return { values };
    },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">

          <!-- Purple Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Purple Gradient</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidInput variant="glass-css-only" placeholder="CSS only..." v-model="values.purpleCssOnly" style="width: 100%;" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidInput variant="glass-highlight-layered" placeholder="Layered..." v-model="values.purpleLayered" style="width: 100%;" />
              </div>
            </div>
          </div>

          <!-- Dark Ocean Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidInput variant="glass-css-only" placeholder="CSS only..." v-model="values.tealCssOnly" style="width: 100%;" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidInput variant="glass-highlight-layered" placeholder="Layered..." v-model="values.tealLayered" style="width: 100%;" />
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 尺寸變體展示
export const Sizes: Story = {
  render: () => ({
    components: { LiquidInput },
    setup() {
      const sm = ref('');
      const md = ref('');
      const lg = ref('');
      return { sm, md, lg };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; width: 320px;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="sm" (height ~32px, font 13px)</p>
          <LiquidInput size="sm" placeholder="Small input..." v-model="sm" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="md" (height ~40px, font 14px) — default</p>
          <LiquidInput size="md" placeholder="Medium input..." v-model="md" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="lg" (height ~48px, font 16px)</p>
          <LiquidInput size="lg" placeholder="Large input..." v-model="lg" />
        </div>
      </div>
    `,
  }),
};

// 禁用狀態
export const Disabled: Story = {
  render: () => ({
    components: { LiquidInput, GlassFilterProvider },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">

        <!-- Default disabled -->
        <div style="width: 320px;">
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;">Default — Disabled</p>
          <LiquidInput variant="default" placeholder="Disabled input" disabled model-value="Cannot edit this" />
        </div>

        <!-- Glass disabled on gradient -->
        <GlassFilterProvider>
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          ">
            <p style="color: white; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; opacity: 0.8;">Glass Variants — Disabled</p>
            <div style="width: 280px;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
              <LiquidInput variant="glass-css-only" placeholder="Disabled" disabled model-value="Cannot edit this" />
            </div>
            <div style="width: 280px;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
              <LiquidInput variant="glass-highlight-layered" placeholder="Disabled" disabled model-value="Cannot edit this" />
            </div>
          </div>
        </GlassFilterProvider>

      </div>
    `,
  }),
};
