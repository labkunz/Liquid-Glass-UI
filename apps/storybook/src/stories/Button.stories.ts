import type { Meta, StoryObj } from '@storybook/vue3';
import { LiquidButton, GlassFilterProvider } from '@liquid/ui';

// Meta 定義
const meta = {
  title: 'Components/LiquidButton',
  component: LiquidButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'outline',
        'ghost', 'danger',
        'glass', 'glass-intense',
        'glass-css-only', 'glass-highlight-only', 'glass-layered', 'glass-highlight-layered',
      ],
      description: '按鈕樣式變體',
      table: {
        type: { summary: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glass' | ..." },
        defaultValue: { summary: 'primary' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '原生 button type（表單送出等情境）',
      table: {
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: 'button' },
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
} satisfies Meta<typeof LiquidButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary 變體
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { LiquidButton },
    setup() {
      const handleClick = () => {
        console.log('Primary button clicked');
      };
      return { args, handleClick };
    },
    template: '<LiquidButton v-bind="args" @click="handleClick">Primary LiquidButton</LiquidButton>',
  }),
};

// Secondary 變體
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { LiquidButton },
    setup() {
      const handleClick = () => {
        console.log('Secondary button clicked');
      };
      return { args, handleClick };
    },
    template: '<LiquidButton v-bind="args" @click="handleClick">Secondary LiquidButton</LiquidButton>',
  }),
};

// Outline 變體
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { LiquidButton },
    setup() {
      const handleClick = () => {
        console.log('Outline button clicked');
      };
      return { args, handleClick };
    },
    template: '<LiquidButton v-bind="args" @click="handleClick">Outline LiquidButton</LiquidButton>',
  }),
};

// Small 尺寸
export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    components: { LiquidButton },
    setup() {
      return { args };
    },
    template: '<LiquidButton v-bind="args">Small LiquidButton</LiquidButton>',
  }),
};

// Medium 尺寸（預設）
export const Medium: Story = {
  args: {
    size: 'md',
  },
  render: (args) => ({
    components: { LiquidButton },
    setup() {
      return { args };
    },
    template: '<LiquidButton v-bind="args">Medium LiquidButton</LiquidButton>',
  }),
};

// Large 尺寸
export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    components: { LiquidButton },
    setup() {
      return { args };
    },
    template: '<LiquidButton v-bind="args">Large LiquidButton</LiquidButton>',
  }),
};

// Disabled 狀態
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { LiquidButton },
    setup() {
      return { args };
    },
    template: '<LiquidButton v-bind="args">Disabled LiquidButton</LiquidButton>',
  }),
};

// Glass 變體 - A 方案（保守）
export const Glass: Story = {
  args: {
    variant: 'glass',
  },
  render: (args) => ({
    components: { LiquidButton, GlassFilterProvider },
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
          <LiquidButton v-bind="args" @click="handleClick">Glass LiquidButton</LiquidButton>
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
    components: { LiquidButton, GlassFilterProvider },
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
          <LiquidButton v-bind="args" @click="handleClick">Glass Intense LiquidButton</LiquidButton>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 效果對比 - 兩種方案並排展示
export const GlassComparison: Story = {
  render: () => ({
    components: { LiquidButton, GlassFilterProvider },
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
              <LiquidButton variant="glass" size="sm">Small Glass</LiquidButton>
              <LiquidButton variant="glass" size="md">Medium Glass</LiquidButton>
              <LiquidButton variant="glass" size="lg">Large Glass</LiquidButton>
              <LiquidButton variant="glass" disabled>Disabled</LiquidButton>
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
              <LiquidButton variant="glass-intense" size="sm">Small Intense</LiquidButton>
              <LiquidButton variant="glass-intense" size="md">Medium Intense</LiquidButton>
              <LiquidButton variant="glass-intense" size="lg">Large Intense</LiquidButton>
              <LiquidButton variant="glass-intense" disabled>Disabled</LiquidButton>
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
                <LiquidButton variant="glass">Click Me</LiquidButton>
              </div>
              <div style="text-align: center;">
                <p style="margin-bottom: 0.5rem; color: white; font-weight: 600;">激進</p>
                <LiquidButton variant="glass-intense">Click Me</LiquidButton>
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
    components: { LiquidButton, GlassFilterProvider },
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
              <LiquidButton variant="glass">Glass</LiquidButton>
              <LiquidButton variant="glass-intense">Intense</LiquidButton>
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
              <LiquidButton variant="glass">Glass</LiquidButton>
              <LiquidButton variant="glass-intense">Intense</LiquidButton>
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
              <LiquidButton variant="glass">Glass</LiquidButton>
              <LiquidButton variant="glass-intense">Intense</LiquidButton>
            </div>
          </div>

          <!-- 圖片背景（模擬） -->
          <div style="
            padding: 2rem;
            background:
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23667eea" width="50" height="50"/><rect fill="%23764ba2" x="50" width="50" height="50"/><rect fill="%23764ba2" y="50" width="50" height="50"/><rect fill="%23667eea" x="50" y="50" width="50" height="50"/></svg>'),
              linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
            background-size: 20px 20px, cover;
            border-radius: 8px;
          ">
            <p style="color: white; margin-bottom: 1rem; font-weight: 600;">Pattern Background</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <LiquidButton variant="glass">Glass</LiquidButton>
              <LiquidButton variant="glass-intense">Intense</LiquidButton>
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
              <LiquidButton variant="glass">Glass</LiquidButton>
              <LiquidButton variant="glass-intense">Intense</LiquidButton>
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
              <LiquidButton variant="glass">Glass</LiquidButton>
              <LiquidButton variant="glass-intense">Intense</LiquidButton>
            </div>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Ghost 變體（暗色背景用）
export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => ({
    components: { LiquidButton },
    setup() { return { args }; },
    template: `
      <div style="padding: 2rem; background: #0f1117; border-radius: 8px; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <LiquidButton v-bind="args">Ghost Button</LiquidButton>
        <LiquidButton variant="ghost" size="sm">Ghost SM</LiquidButton>
        <LiquidButton variant="ghost" disabled>Disabled</LiquidButton>
      </div>
    `,
  }),
};

// Danger 變體（刪除等破壞性操作）
export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    components: { LiquidButton },
    setup() { return { args }; },
    template: `
      <div style="padding: 2rem; background: #0f1117; border-radius: 8px; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <LiquidButton v-bind="args">刪除</LiquidButton>
        <LiquidButton variant="danger" size="sm">刪除 SM</LiquidButton>
        <LiquidButton variant="danger" disabled>Disabled</LiquidButton>
      </div>
    `,
  }),
};

// type="submit" 表單送出示範
export const SubmitType: Story = {
  render: () => ({
    components: { LiquidButton },
    setup() {
      const handleSubmit = (e: Event) => {
        e.preventDefault();
        alert('Form submitted!');
      };
      return { handleSubmit };
    },
    template: `
      <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;" @submit="handleSubmit">
        <input style="padding: 0.5rem; border: 1px solid #dee2e6; border-radius: 8px;" placeholder="Name" />
        <div style="display: flex; gap: 0.5rem;">
          <LiquidButton type="submit" variant="primary">送出（type=submit）</LiquidButton>
          <LiquidButton type="reset" variant="ghost">重置（type=reset）</LiquidButton>
        </div>
      </form>
    `,
  }),
};

// 暗色背景完整展示（Ghost + Danger 使用情境）
export const DarkThemeVariants: Story = {
  render: () => ({
    components: { LiquidButton },
    template: `
      <div style="padding: 2rem; background: #0f1117; border-radius: 12px; display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.75rem;">Primary Actions</p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
            <LiquidButton variant="primary">新增職缺</LiquidButton>
            <LiquidButton variant="primary" size="sm">新增</LiquidButton>
          </div>
        </div>
        <div>
          <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.75rem;">Secondary Actions</p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
            <LiquidButton variant="ghost">取消</LiquidButton>
            <LiquidButton variant="ghost" size="sm">編輯</LiquidButton>
            <LiquidButton variant="ghost" disabled>停用中</LiquidButton>
          </div>
        </div>
        <div>
          <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.75rem;">Destructive Actions</p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
            <LiquidButton variant="danger">刪除</LiquidButton>
            <LiquidButton variant="danger" size="sm">刪除 SM</LiquidButton>
            <LiquidButton variant="danger" disabled>停用中</LiquidButton>
          </div>
        </div>
      </div>
    `,
  }),
};

// 所有變體展示
export const AllVariants: Story = {
  render: () => ({
    components: { LiquidButton, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- 傳統變體 -->
          <div>
            <h3 style="margin-bottom: 1rem; color: #333;">Traditional Variants</h3>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
              <LiquidButton variant="primary">Primary</LiquidButton>
              <LiquidButton variant="secondary">Secondary</LiquidButton>
              <LiquidButton variant="outline">Outline</LiquidButton>
              <LiquidButton variant="primary" disabled>Disabled</LiquidButton>
            </div>
          </div>

          <!-- 暗色主題變體 -->
          <div>
            <h3 style="margin-bottom: 1rem; color: #333;">Dark Theme Variants</h3>
            <div style="padding: 2rem; background: #0f1117; border-radius: 8px; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
              <LiquidButton variant="ghost">Ghost</LiquidButton>
              <LiquidButton variant="danger">Danger</LiquidButton>
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
              <LiquidButton variant="glass">Glass</LiquidButton>
              <LiquidButton variant="glass-intense">Glass Intense</LiquidButton>
              <LiquidButton variant="glass" disabled>Glass Disabled</LiquidButton>
            </div>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// ================================================================
// 實驗組：四種技術方案
// ================================================================

// 1. 純 CSS 效果（無任何 SVG Filter）
export const GlassCssOnly: Story = {
  args: { variant: 'glass-css-only' },
  render: (args) => ({
    components: { LiquidButton, GlassFilterProvider },
    setup() { return { args }; },
    template: `
      <GlassFilterProvider>
        <div style="padding: 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
          <LiquidButton v-bind="args">CSS Only LiquidButton</LiquidButton>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 2. 只保留高光（整個元素套用，無位移）
export const GlassHighlightOnly: Story = {
  args: { variant: 'glass-highlight-only' },
  render: (args) => ({
    components: { LiquidButton, GlassFilterProvider },
    setup() { return { args }; },
    template: `
      <GlassFilterProvider>
        <div style="padding: 3rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px;">
          <LiquidButton v-bind="args">Highlight Only LiquidButton</LiquidButton>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 3. 多層分離（::before 套用含位移的 filter）
export const GlassLayered: Story = {
  args: { variant: 'glass-layered' },
  render: (args) => ({
    components: { LiquidButton, GlassFilterProvider },
    setup() { return { args }; },
    template: `
      <GlassFilterProvider>
        <div style="padding: 3rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 8px;">
          <LiquidButton v-bind="args">Layered LiquidButton</LiquidButton>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 4. 合體版（::before 套用只有高光的 filter）
export const GlassHighlightLayered: Story = {
  args: { variant: 'glass-highlight-layered' },
  render: (args) => ({
    components: { LiquidButton, GlassFilterProvider },
    setup() { return { args }; },
    template: `
      <GlassFilterProvider>
        <div style="padding: 3rem; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 8px;">
          <LiquidButton v-bind="args">Highlight + Layered LiquidButton</LiquidButton>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 六種方案完整對比
export const GlassFullComparison: Story = {
  render: () => ({
    components: { LiquidButton, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 1.5rem; min-width: 700px;">

          <!-- 背景說明 -->
          <p style="color: #555; font-size: 13px; margin: 0;">
            每種方案使用相同的漸層背景，觀察邊框直線度、文字清晰度、高光有機感的差異
          </p>

          <!-- 對照組 A：glass（原有，整體含位移） -->
          <div>
            <p style="color: #333; font-size: 12px; font-weight: 700; margin: 0 0 8px; letter-spacing: 0.5px;">
              對照組 A：glass（整體套用，位移 scale=3）
            </p>
            <div style="padding: 1.5rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px; display: flex; gap: 1rem;">
              <LiquidButton variant="glass" size="sm">Small</LiquidButton>
              <LiquidButton variant="glass" size="md">Medium</LiquidButton>
              <LiquidButton variant="glass" size="lg">Large</LiquidButton>
            </div>
          </div>

          <!-- 對照組 B：glass-intense（原有，整體強位移） -->
          <div>
            <p style="color: #333; font-size: 12px; font-weight: 700; margin: 0 0 8px; letter-spacing: 0.5px;">
              對照組 B：glass-intense（整體套用，位移 scale=12）
            </p>
            <div style="padding: 1.5rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px; display: flex; gap: 1rem;">
              <LiquidButton variant="glass-intense" size="sm">Small</LiquidButton>
              <LiquidButton variant="glass-intense" size="md">Medium</LiquidButton>
              <LiquidButton variant="glass-intense" size="lg">Large</LiquidButton>
            </div>
          </div>

          <!-- 實驗 1：glass-css-only（純 CSS） -->
          <div>
            <p style="color: #333; font-size: 12px; font-weight: 700; margin: 0 0 8px; letter-spacing: 0.5px;">
              實驗 1：glass-css-only（純 CSS，無 SVG Filter）
            </p>
            <div style="padding: 1.5rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px; display: flex; gap: 1rem;">
              <LiquidButton variant="glass-css-only" size="sm">Small</LiquidButton>
              <LiquidButton variant="glass-css-only" size="md">Medium</LiquidButton>
              <LiquidButton variant="glass-css-only" size="lg">Large</LiquidButton>
            </div>
          </div>

          <!-- 實驗 2：glass-highlight-only（整體高光，無位移） -->
          <div>
            <p style="color: #333; font-size: 12px; font-weight: 700; margin: 0 0 8px; letter-spacing: 0.5px;">
              實驗 2：glass-highlight-only（整體套用，只有高光，無位移）
            </p>
            <div style="padding: 1.5rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px; display: flex; gap: 1rem;">
              <LiquidButton variant="glass-highlight-only" size="sm">Small</LiquidButton>
              <LiquidButton variant="glass-highlight-only" size="md">Medium</LiquidButton>
              <LiquidButton variant="glass-highlight-only" size="lg">Large</LiquidButton>
            </div>
          </div>

          <!-- 實驗 3：glass-layered（::before 分離，含位移） -->
          <div>
            <p style="color: #333; font-size: 12px; font-weight: 700; margin: 0 0 8px; letter-spacing: 0.5px;">
              實驗 3：glass-layered（::before 分離，位移在底層，邊框直線）
            </p>
            <div style="padding: 1.5rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px; display: flex; gap: 1rem;">
              <LiquidButton variant="glass-layered" size="sm">Small</LiquidButton>
              <LiquidButton variant="glass-layered" size="md">Medium</LiquidButton>
              <LiquidButton variant="glass-layered" size="lg">Large</LiquidButton>
            </div>
          </div>

          <!-- 實驗 4：glass-highlight-layered（::before 分離，只有高光） -->
          <div>
            <p style="color: #333; font-size: 12px; font-weight: 700; margin: 0 0 8px; letter-spacing: 0.5px;">
              實驗 4：glass-highlight-layered（::before 分離，只有高光，無任何位移）
            </p>
            <div style="padding: 1.5rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px; display: flex; gap: 1rem;">
              <LiquidButton variant="glass-highlight-layered" size="sm">Small</LiquidButton>
              <LiquidButton variant="glass-highlight-layered" size="md">Medium</LiquidButton>
              <LiquidButton variant="glass-highlight-layered" size="lg">Large</LiquidButton>
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
    components: { LiquidButton },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <LiquidButton size="sm">Small</LiquidButton>
        <LiquidButton size="md">Medium</LiquidButton>
        <LiquidButton size="lg">Large</LiquidButton>
      </div>
    `,
  }),
};
