import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { LiquidFilterBar } from '@liquid/ui';

const meta = {
  title: 'Components/LiquidFilterBar',
  component: LiquidFilterBar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-light'],
      description: 'FilterBar 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-light'" },
        defaultValue: { summary: 'default' },
      },
    },
    modelValue: {
      control: 'text',
      description: '目前選中的值（v-model）',
    },
  },
  args: {
    variant: 'default',
    modelValue: '全部',
    options: ['全部', 'Vue', 'React', 'TypeScript', 'CSS'],
  },
} satisfies Meta<typeof LiquidFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: { variant: 'default' },
  render: (args) => ({
    components: { LiquidFilterBar },
    setup() {
      const selected = ref('全部');
      return { args, selected };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px;">
        <p style="color: #888; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="default"</p>
        <LiquidFilterBar
          variant="default"
          :options="args.options"
          v-model="selected"
        />
        <p style="margin-top: 1rem; color: #666; font-size: 13px;">已選擇：{{ selected }}</p>
      </div>
    `,
  }),
};

// Glass Light 變體 — 亮色背景（如 Blog）
export const GlassLight: Story = {
  args: { variant: 'glass-light' },
  render: (args) => ({
    components: { LiquidFilterBar },
    setup() {
      const selected = ref('全部');
      return { args, selected };
    },
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%); border-radius: 12px;">
        <p style="color: #888; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="glass-light"</p>
        <LiquidFilterBar
          variant="glass-light"
          :options="args.options"
          v-model="selected"
        />
        <p style="margin-top: 1rem; color: #555; font-size: 13px;">已選擇：{{ selected }}</p>
      </div>
    `,
  }),
};

// Glass CSS Only 變體 — 暗色背景（如 Admin）
export const GlassCssOnly: Story = {
  args: { variant: 'glass-css-only' },
  render: (args) => ({
    components: { LiquidFilterBar },
    setup() {
      const selected = ref('全部');
      return { args, selected };
    },
    template: `
      <div style="padding: 2rem; background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); border-radius: 12px;">
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="glass-css-only"</p>
        <LiquidFilterBar
          variant="glass-css-only"
          :options="args.options"
          v-model="selected"
        />
        <p style="margin-top: 1rem; color: rgba(255,255,255,0.6); font-size: 13px;">已選擇：{{ selected }}</p>
      </div>
    `,
  }),
};

// 三種變體對比
export const VariantComparison: Story = {
  render: () => ({
    components: { LiquidFilterBar },
    setup() {
      const selectedA = ref('全部');
      const selectedB = ref('全部');
      const selectedC = ref('全部');
      const options = ['全部', 'Vue', 'React', 'TypeScript', 'CSS'];
      return { selectedA, selectedB, selectedC, options };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">

        <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px;">
          <p style="color: #888; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="default"</p>
          <LiquidFilterBar variant="default" :options="options" v-model="selectedA" />
        </div>

        <div style="padding: 2rem; background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%); border-radius: 12px;">
          <p style="color: #888; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="glass-light"</p>
          <LiquidFilterBar variant="glass-light" :options="options" v-model="selectedB" />
        </div>

        <div style="padding: 2rem; background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); border-radius: 12px;">
          <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="glass-css-only"</p>
          <LiquidFilterBar variant="glass-css-only" :options="options" v-model="selectedC" />
        </div>

      </div>
    `,
  }),
};

// 使用 FilterBarOption 格式（label + value 分離）
export const WithOptionObjects: Story = {
  render: () => ({
    components: { LiquidFilterBar },
    setup() {
      const selected = ref('all');
      const options = [
        { label: '全部文章', value: 'all' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'CSS / 設計', value: 'css' },
      ];
      return { selected, options };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px;">
        <p style="color: #888; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">FilterBarOption[] 格式（label ≠ value）</p>
        <LiquidFilterBar variant="default" :options="options" v-model="selected" />
        <p style="margin-top: 1rem; color: #666; font-size: 13px;">已選擇 value：{{ selected }}</p>
      </div>
    `,
  }),
};
