import type { Meta, StoryObj } from '@storybook/vue3';
import { Button, GlassFilterProvider } from '@liquid/ui';

// Meta 定義
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'glass', 'glass-intense'],
      description: '按鈕樣式變體',
      table: {
        type: { summary: "'primary' | 'secondary' | 'outline' | 'glass' | 'glass-intense'" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '按鈕尺寸',
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
    onClick: {
      action: 'clicked',
      description: '點擊事件',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary 變體
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      const handleClick = () => {
        console.log('Primary button clicked');
      };
      return { args, handleClick };
    },
    template: '<Button v-bind="args" @click="handleClick">Primary Button</Button>',
  }),
};

// Secondary 變體
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      const handleClick = () => {
        console.log('Secondary button clicked');
      };
      return { args, handleClick };
    },
    template: '<Button v-bind="args" @click="handleClick">Secondary Button</Button>',
  }),
};

// Outline 變體
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      const handleClick = () => {
        console.log('Outline button clicked');
      };
      return { args, handleClick };
    },
    template: '<Button v-bind="args" @click="handleClick">Outline Button</Button>',
  }),
};

// Small 尺寸
export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Small Button</Button>',
  }),
};

// Medium 尺寸（預設）
export const Medium: Story = {
  args: {
    size: 'md',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Medium Button</Button>',
  }),
};

// Large 尺寸
export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Large Button</Button>',
  }),
};

// Disabled 狀態
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Disabled Button</Button>',
  }),
};

// Glass 變體 - A 方案（保守）
export const Glass: Story = {
  args: {
    variant: 'glass',
  },
  render: (args) => ({
    components: { Button, GlassFilterProvider },
    setup() {
      const handleClick = () => {
        console.log('Glass button clicked');
      };
      return { args, handleClick };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
        ">
          <Button v-bind="args" @click="handleClick">Glass Button</Button>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Intense 變體 - B 方案（激進）
export const GlassIntense: Story = {
  args: {
    variant: 'glass-intense',
  },
  render: (args) => ({
    components: { Button, GlassFilterProvider },
    setup() {
      const handleClick = () => {
        console.log('Glass Intense button clicked');
      };
      return { args, handleClick };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 8px;
        ">
          <Button v-bind="args" @click="handleClick">Glass Intense Button</Button>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 效果對比 - 兩種方案並排展示
export const GlassComparison: Story = {
  render: () => ({
    components: { Button, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- A 方案：保守 -->
          <div>
            <h3 style="margin-bottom: 1rem; color: #333;">A 方案：保守（文字清晰優先）</h3>
            <div style="
              padding: 3rem;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 8px;
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
            ">
              <Button variant="glass" size="sm">Small Glass</Button>
              <Button variant="glass" size="md">Medium Glass</Button>
              <Button variant="glass" size="lg">Large Glass</Button>
              <Button variant="glass" disabled>Disabled</Button>
            </div>
          </div>

          <!-- B 方案：激進 -->
          <div>
            <h3 style="margin-bottom: 1rem; color: #333;">B 方案：激進（視覺優先）</h3>
            <div style="
              padding: 3rem;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              border-radius: 8px;
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
            ">
              <Button variant="glass-intense" size="sm">Small Intense</Button>
              <Button variant="glass-intense" size="md">Medium Intense</Button>
              <Button variant="glass-intense" size="lg">Large Intense</Button>
              <Button variant="glass-intense" disabled>Disabled</Button>
            </div>
          </div>

          <!-- 並排對比 -->
          <div>
            <h3 style="margin-bottom: 1rem; color: #333;">直接對比</h3>
            <div style="
              padding: 3rem;
              background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
              border-radius: 8px;
              display: flex;
              gap: 2rem;
              flex-wrap: wrap;
              align-items: center;
            ">
              <div style="text-align: center;">
                <p style="margin-bottom: 0.5rem; color: white; font-weight: 600;">保守</p>
                <Button variant="glass">Click Me</Button>
              </div>
              <div style="text-align: center;">
                <p style="margin-bottom: 0.5rem; color: white; font-weight: 600;">激進</p>
                <Button variant="glass-intense">Click Me</Button>
              </div>
            </div>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 不同背景下的 Glass 效果測試
export const GlassOnDifferentBackgrounds: Story = {
  render: () => ({
    components: { Button, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <!-- 漸層背景 1 -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
          ">
            <p style="color: white; margin-bottom: 1rem; font-weight: 600;">Purple Gradient</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button variant="glass">Glass</Button>
              <Button variant="glass-intense">Intense</Button>
            </div>
          </div>

          <!-- 漸層背景 2 -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 8px;
          ">
            <p style="color: white; margin-bottom: 1rem; font-weight: 600;">Pink Gradient</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button variant="glass">Glass</Button>
              <Button variant="glass-intense">Intense</Button>
            </div>
          </div>

          <!-- 漸層背景 3 -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            border-radius: 8px;
          ">
            <p style="color: white; margin-bottom: 1rem; font-weight: 600;">Blue Gradient</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button variant="glass">Glass</Button>
              <Button variant="glass-intense">Intense</Button>
            </div>
          </div>

          <!-- 圖片背景（模擬） -->
          <div style="
            padding: 2rem;
            background:
              url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><rect fill=\"%23667eea\" width=\"50\" height=\"50\"/><rect fill=\"%23764ba2\" x=\"50\" width=\"50\" height=\"50\"/><rect fill=\"%23764ba2\" y=\"50\" width=\"50\" height=\"50\"/><rect fill=\"%23667eea\" x=\"50\" y=\"50\" width=\"50\" height=\"50\"/></svg>'),
              linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
            background-size: 20px 20px, cover;
            border-radius: 8px;
          ">
            <p style="color: white; margin-bottom: 1rem; font-weight: 600;">Pattern Background</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button variant="glass">Glass</Button>
              <Button variant="glass-intense">Intense</Button>
            </div>
          </div>

          <!-- 純色背景（最差情況） -->
          <div style="
            padding: 2rem;
            background: #3b82f6;
            border-radius: 8px;
          ">
            <p style="color: white; margin-bottom: 1rem; font-weight: 600;">Solid Color (Worst Case)</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button variant="glass">Glass</Button>
              <Button variant="glass-intense">Intense</Button>
            </div>
          </div>

          <!-- 暗色背景 -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 8px;
          ">
            <p style="color: white; margin-bottom: 1rem; font-weight: 600;">Dark Background</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button variant="glass">Glass</Button>
              <Button variant="glass-intense">Intense</Button>
            </div>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 所有變體展示
export const AllVariants: Story = {
  render: () => ({
    components: { Button, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- 傳統變體 -->
          <div>
            <h3 style="margin-bottom: 1rem; color: #333;">Traditional Variants</h3>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          <!-- Glass 變體 -->
          <div>
            <h3 style="margin-bottom: 1rem; color: #333;">Glass Variants</h3>
            <div style="
              padding: 2rem;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 8px;
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
            ">
              <Button variant="glass">Glass</Button>
              <Button variant="glass-intense">Glass Intense</Button>
              <Button variant="glass" disabled>Glass Disabled</Button>
            </div>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 所有尺寸展示
export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    `,
  }),
};
