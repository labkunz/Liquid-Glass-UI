import type { Meta, StoryObj } from '@storybook/vue3';
import { LiquidStack } from '@liquid/ui';

const meta = {
  title: 'Layout/LiquidStack',
  component: LiquidStack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: '排列方向',
      table: {
        type: { summary: "'row' | 'column'" },
        defaultValue: { summary: 'column' },
      },
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: '子元素間距',
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: '交叉軸對齊（align-items）',
      table: {
        type: { summary: "'start' | 'center' | 'end' | 'stretch'" },
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'],
      description: '主軸對齊（justify-content）',
      table: {
        type: { summary: "'start' | 'center' | 'end' | 'between' | 'around'" },
        defaultValue: { summary: 'start' },
      },
    },
  },
  args: {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
  },
} satisfies Meta<typeof LiquidStack>;

export default meta;
type Story = StoryObj<typeof meta>;

// 色塊 helper
const BOX_STYLE = 'background: rgba(0,123,255,0.15); border: 1px solid rgba(0,123,255,0.3); border-radius: 6px; padding: 0.75rem 1rem; font-size: 13px; color: #333; font-weight: 500;';

// Column 方向（預設）
export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'md',
  },
  render: (args) => ({
    components: { LiquidStack },
    setup() {
      return { args, BOX_STYLE };
    },
    template: `
      <LiquidStack v-bind="args" style="width: 280px;">
        <div :style="BOX_STYLE">Item 1</div>
        <div :style="BOX_STYLE">Item 2</div>
        <div :style="BOX_STYLE">Item 3</div>
      </LiquidStack>
    `,
  }),
};

// Row 方向
export const Row: Story = {
  args: {
    direction: 'row',
    gap: 'md',
    align: 'center',
  },
  render: (args) => ({
    components: { LiquidStack },
    setup() {
      return { args, BOX_STYLE };
    },
    template: `
      <LiquidStack v-bind="args">
        <div :style="BOX_STYLE">Item 1</div>
        <div :style="BOX_STYLE">Item 2</div>
        <div :style="BOX_STYLE">Item 3</div>
      </LiquidStack>
    `,
  }),
};

// Gap 所有尺寸對比
export const GapVariants: Story = {
  render: () => ({
    components: { LiquidStack },
    template: `
      <LiquidStack direction="column" gap="lg">

        <div v-for="gap in ['none', 'sm', 'md', 'lg']" :key="gap">
          <p style="font-size: 12px; color: #666; margin: 0 0 0.4rem; font-weight: 600;">gap="{{ gap }}"</p>
          <LiquidStack direction="row" :gap="gap" style="background: #f5f5f5; padding: 0.75rem; border-radius: 8px;">
            <div style="background: #007bff; color: white; border-radius: 4px; padding: 0.5rem 0.75rem; font-size: 12px; font-weight: 600;">A</div>
            <div style="background: #28a745; color: white; border-radius: 4px; padding: 0.5rem 0.75rem; font-size: 12px; font-weight: 600;">B</div>
            <div style="background: #dc3545; color: white; border-radius: 4px; padding: 0.5rem 0.75rem; font-size: 12px; font-weight: 600;">C</div>
          </LiquidStack>
        </div>

      </LiquidStack>
    `,
  }),
};

// Justify 所有模式對比（Row 方向）
export const JustifyVariants: Story = {
  render: () => ({
    components: { LiquidStack },
    template: `
      <LiquidStack direction="column" gap="md" style="width: 500px;">

        <div v-for="justify in ['start', 'center', 'end', 'between', 'around']" :key="justify">
          <p style="font-size: 12px; color: #666; margin: 0 0 0.4rem; font-weight: 600;">justify="{{ justify }}"</p>
          <LiquidStack direction="row" :justify="justify" style="background: #f5f5f5; padding: 0.75rem; border-radius: 8px; width: 100%;">
            <div style="background: #007bff; color: white; border-radius: 4px; padding: 0.5rem 0.75rem; font-size: 12px; font-weight: 600;">A</div>
            <div style="background: #28a745; color: white; border-radius: 4px; padding: 0.5rem 0.75rem; font-size: 12px; font-weight: 600;">B</div>
            <div style="background: #dc3545; color: white; border-radius: 4px; padding: 0.5rem 0.75rem; font-size: 12px; font-weight: 600;">C</div>
          </LiquidStack>
        </div>

      </LiquidStack>
    `,
  }),
};

// LiquidStack 組合使用範例（Card + LiquidStack）
export const ComposedExample: Story = {
  render: () => ({
    components: { LiquidStack },
    template: `
      <LiquidStack direction="column" gap="md" style="width: 340px; background: white; border: 1px solid #dee2e6; border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

        <LiquidStack direction="row" gap="sm" align="center" justify="between">
          <span style="font-size: 16px; font-weight: 700; color: #333;">User Profile</span>
          <span style="font-size: 12px; color: #999; background: #f0f0f0; padding: 0.25rem 0.5rem; border-radius: 4px;">Active</span>
        </LiquidStack>

        <LiquidStack direction="row" gap="md" align="center">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); flex-shrink: 0;"></div>
          <LiquidStack direction="column" gap="none">
            <span style="font-size: 14px; font-weight: 600; color: #333;">Alex Chen</span>
            <span style="font-size: 12px; color: #999;">Senior Designer</span>
          </LiquidStack>
        </LiquidStack>

        <LiquidStack direction="row" gap="sm" justify="start">
          <div style="background: rgba(0,123,255,0.1); color: #007bff; font-size: 11px; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px;">Vue</div>
          <div style="background: rgba(40,167,69,0.1); color: #28a745; font-size: 11px; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px;">TypeScript</div>
          <div style="background: rgba(220,53,69,0.1); color: #dc3545; font-size: 11px; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px;">Figma</div>
        </LiquidStack>

      </LiquidStack>
    `,
  }),
};
