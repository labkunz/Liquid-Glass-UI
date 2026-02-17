import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { LiquidCheckbox, GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/LiquidCheckbox',
  component: LiquidCheckbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'LiquidCheckbox 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'LiquidCheckbox 尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'LiquidCheckbox 標籤文字',
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
    modelValue: {
      control: 'boolean',
      description: '是否勾選（v-model）',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    label: '同意使用條款',
    disabled: false,
    modelValue: false,
  },
} satisfies Meta<typeof LiquidCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    label: '同意使用條款',
    modelValue: false,
  },
  render: (args) => ({
    components: { LiquidCheckbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 8px;">
        <LiquidCheckbox
          v-bind="args"
          v-model="checked"
          :label="args.label"
        />
      </div>
    `,
  }),
};

// Checked 狀態
export const Checked: Story = {
  args: {
    variant: 'default',
    label: '已勾選狀態',
    modelValue: true,
  },
  render: (args) => ({
    components: { LiquidCheckbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 8px;">
        <LiquidCheckbox
          v-bind="args"
          v-model="checked"
          :label="args.label"
        />
      </div>
    `,
  }),
};

// Disabled 狀態
export const Disabled: Story = {
  args: {
    variant: 'default',
    label: '禁用狀態',
    disabled: true,
    modelValue: false,
  },
  render: (args) => ({
    components: { LiquidCheckbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 8px; display: flex; flex-direction: column; gap: 1rem;">
        <LiquidCheckbox
          v-bind="args"
          v-model="checked"
          label="禁用未勾選"
          :disabled="true"
          :modelValue="false"
        />
        <LiquidCheckbox
          v-bind="args"
          label="禁用已勾選"
          :disabled="true"
          :modelValue="true"
        />
      </div>
    `,
  }),
};

// Sizes 尺寸對比
export const Sizes: Story = {
  render: () => ({
    components: { LiquidCheckbox },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 8px; display: flex; flex-direction: column; gap: 1.2rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="sm"</p>
          <LiquidCheckbox variant="default" size="sm" label="小尺寸 LiquidCheckbox" :modelValue="false" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="md" (default)</p>
          <LiquidCheckbox variant="default" size="md" label="中尺寸 LiquidCheckbox" :modelValue="false" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="lg"</p>
          <LiquidCheckbox variant="default" size="lg" label="大尺寸 LiquidCheckbox" :modelValue="false" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="sm" (checked)</p>
          <LiquidCheckbox variant="default" size="sm" label="小尺寸 已勾選" :modelValue="true" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="md" (checked)</p>
          <LiquidCheckbox variant="default" size="md" label="中尺寸 已勾選" :modelValue="true" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="lg" (checked)</p>
          <LiquidCheckbox variant="default" size="lg" label="大尺寸 已勾選" :modelValue="true" />
        </div>
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    label: '同意使用條款',
    modelValue: false,
  },
  render: (args) => ({
    components: { LiquidCheckbox, GlassFilterProvider },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        ">
          <LiquidCheckbox
            v-bind="args"
            v-model="checked"
            :label="args.label"
          />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    label: '同意使用條款',
    modelValue: false,
  },
  render: (args) => ({
    components: { LiquidCheckbox, GlassFilterProvider },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
        ">
          <LiquidCheckbox
            v-bind="args"
            v-model="checked"
            :label="args.label"
          />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比（互動式）
export const GlassComparison: Story = {
  render: (args) => ({
    components: { LiquidCheckbox, GlassFilterProvider },
    setup() {
      const checked1 = ref(false);
      const checked2 = ref(true);
      return { args, checked1, checked2 };
    },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem;">

          <!-- Purple Gradient -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
              <p style="color: white; margin: 0; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Purple Gradient</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                  <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <LiquidCheckbox variant="glass-css-only" label="未勾選" :modelValue="false" />
                    <LiquidCheckbox variant="glass-css-only" label="已勾選" :modelValue="true" />
                    <LiquidCheckbox variant="glass-css-only" label="互動式" v-model="checked1" />
                  </div>
                </div>
                <div>
                  <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <LiquidCheckbox variant="glass-highlight-layered" label="未勾選" :modelValue="false" />
                    <LiquidCheckbox variant="glass-highlight-layered" label="已勾選" :modelValue="true" />
                    <LiquidCheckbox variant="glass-highlight-layered" label="互動式" v-model="checked2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dark Ocean Gradient -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 12px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
              <p style="color: white; margin: 0; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                  <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <LiquidCheckbox variant="glass-css-only" label="未勾選" :modelValue="false" />
                    <LiquidCheckbox variant="glass-css-only" label="已勾選" :modelValue="true" />
                  </div>
                </div>
                <div>
                  <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <LiquidCheckbox variant="glass-highlight-layered" label="未勾選" :modelValue="false" />
                    <LiquidCheckbox variant="glass-highlight-layered" label="已勾選" :modelValue="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};
