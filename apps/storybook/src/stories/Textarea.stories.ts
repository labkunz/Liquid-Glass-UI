import type { Meta, StoryObj } from '@storybook/vue3';
import { Textarea, GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'Textarea 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Textarea 尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    rows: {
      control: 'number',
      description: '顯示行數',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    placeholder: {
      control: 'text',
      description: '佔位文字',
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
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: '調整大小方向',
      table: {
        type: { summary: "'none' | 'vertical' | 'horizontal' | 'both'" },
        defaultValue: { summary: 'vertical' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    rows: 4,
    placeholder: '',
    disabled: false,
    resize: 'vertical',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: '輸入多行文字...',
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 300px;">
        <Textarea v-bind="args" />
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    placeholder: '輸入多行文字...',
  },
  render: (args) => ({
    components: { Textarea, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        ">
          <Textarea v-bind="args" style="width: 300px;" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    placeholder: '輸入多行文字...',
  },
  render: (args) => ({
    components: { Textarea, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
        ">
          <Textarea v-bind="args" style="width: 300px;" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { Textarea, GlassFilterProvider },
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
                <Textarea variant="glass-css-only" placeholder="輸入多行文字..." />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <Textarea variant="glass-highlight-layered" placeholder="輸入多行文字..." />
              </div>
            </div>
          </div>

          <!-- Dark Blue Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <Textarea variant="glass-css-only" placeholder="輸入多行文字..." />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <Textarea variant="glass-highlight-layered" placeholder="輸入多行文字..." />
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Sizes 尺寸比較
export const Sizes: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 320px;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="sm"</p>
          <Textarea variant="default" size="sm" placeholder="Small textarea..." :rows="3" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="md" (default)</p>
          <Textarea variant="default" size="md" placeholder="Medium textarea..." :rows="3" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="lg"</p>
          <Textarea variant="default" size="lg" placeholder="Large textarea..." :rows="3" />
        </div>
      </div>
    `,
  }),
};

// Disabled 狀態
export const Disabled: Story = {
  args: {
    variant: 'default',
    placeholder: '此欄位已禁用...',
    disabled: true,
    modelValue: '這是已禁用的 Textarea，無法編輯。',
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 300px;">
        <Textarea v-bind="args" />
      </div>
    `,
  }),
};
