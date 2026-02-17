import type { Meta, StoryObj } from '@storybook/vue3';
import { GlassFilterProvider } from '@liquid/ui';
import { LiquidDatePicker } from '@liquid/ui';

const meta = {
  title: 'Components/LiquidDatePicker',
  component: LiquidDatePicker,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '日期選擇器樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '日期選擇器尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
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
    disabled: false,
  },
} satisfies Meta<typeof LiquidDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { LiquidDatePicker },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px; display: inline-block;">
        <p style="margin: 0 0 1rem; color: #666; font-size: 13px;">Default date picker</p>
        <LiquidDatePicker v-bind="args" />
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  render: (args) => ({
    components: { LiquidDatePicker, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <LiquidDatePicker v-bind="args" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
  },
  render: (args) => ({
    components: { LiquidDatePicker, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <LiquidDatePicker v-bind="args" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { LiquidDatePicker, GlassFilterProvider },
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
            <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidDatePicker variant="glass-css-only" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidDatePicker variant="glass-highlight-layered" />
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
            <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidDatePicker variant="glass-css-only" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidDatePicker variant="glass-highlight-layered" />
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Size 變體展示
export const Sizes: Story = {
  render: () => ({
    components: { LiquidDatePicker },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem; background: #f8f9fa; border-radius: 12px; display: inline-flex;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="sm"</p>
          <LiquidDatePicker variant="default" size="sm" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="md" (default)</p>
          <LiquidDatePicker variant="default" size="md" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="lg"</p>
          <LiquidDatePicker variant="default" size="lg" />
        </div>
      </div>
    `,
  }),
};

// Disabled 狀態
export const Disabled: Story = {
  args: {
    variant: 'default',
    disabled: true,
  },
  render: (args) => ({
    components: { LiquidDatePicker },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px; display: inline-block;">
        <p style="margin: 0 0 1rem; color: #666; font-size: 13px;">Disabled state</p>
        <LiquidDatePicker v-bind="args" />
      </div>
    `,
  }),
};
