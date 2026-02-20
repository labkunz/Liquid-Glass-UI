import type { Meta, StoryObj } from '@storybook/vue3';
import { LiquidNavbar } from '@liquid/ui';

const meta = {
  title: 'Components/LiquidNavbar',
  component: LiquidNavbar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-light'],
      description: 'Navbar 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-light'" },
        defaultValue: { summary: 'default' },
      },
    },
    sticky: {
      control: 'boolean',
      description: '是否固定在頁面頂端',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    variant: 'default',
    sticky: false,
  },
} satisfies Meta<typeof LiquidNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體 — 白色背景
export const Default: Story = {
  args: { variant: 'default', sticky: false },
  render: (args) => ({
    components: { LiquidNavbar },
    setup() { return { args }; },
    template: `
      <div style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; overflow: hidden; background: #f8f9fa;">
        <LiquidNavbar v-bind="args">
          <template #logo>
            <span style="font-weight: 700; font-size: 1rem; color: #1a1a2e;">◈ Liquid UI</span>
          </template>
          <template #links>
            <a href="#" style="font-size: 0.9rem; color: #4a5568; text-decoration: none; font-weight: 500;">首頁</a>
            <a href="#" style="font-size: 0.9rem; color: #4a5568; text-decoration: none; font-weight: 500;">文件</a>
            <a href="#" style="font-size: 0.9rem; color: #4a5568; text-decoration: none; font-weight: 500;">元件</a>
          </template>
          <template #actions>
            <button style="padding: 0.4rem 1rem; border-radius: 8px; background: #7c3aed; color: white; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500;">開始使用</button>
          </template>
        </LiquidNavbar>
        <div style="padding: 3rem 2rem;">
          <p style="color: #666; font-size: 14px; margin: 0;">頁面內容區域</p>
        </div>
      </div>
    `,
  }),
};

// Glass Light 變體 — 亮色背景（如 Blog）
export const GlassLight: Story = {
  args: { variant: 'glass-light', sticky: false },
  render: (args) => ({
    components: { LiquidNavbar },
    setup() { return { args }; },
    template: `
      <div style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%);">
        <LiquidNavbar v-bind="args">
          <template #logo>
            <span style="font-weight: 700; font-size: 1rem;">
              <span style="background: linear-gradient(135deg, #7c3aed, #2563eb); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">◈</span>
              <span style="color: #1a1a2e; margin-left: 0.4rem;">Liquid Glass Blog</span>
            </span>
          </template>
          <template #links>
            <a href="#" style="font-size: 0.9rem; color: #4a5568; text-decoration: none; font-weight: 500;">文章</a>
            <a href="#" style="font-size: 0.9rem; color: #4a5568; text-decoration: none; font-weight: 500;">GitHub</a>
          </template>
        </LiquidNavbar>
        <div style="padding: 3rem 2rem;">
          <p style="color: #555; font-size: 14px; margin: 0;">Blog 頁面內容區域（亮色漸層背景）</p>
        </div>
      </div>
    `,
  }),
};

// Glass CSS Only 變體 — 暗色背景（如 Admin）
export const GlassCssOnly: Story = {
  args: { variant: 'glass-css-only', sticky: false },
  render: (args) => ({
    components: { LiquidNavbar },
    setup() { return { args }; },
    template: `
      <div style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);">
        <LiquidNavbar v-bind="args">
          <template #logo>
            <span style="font-weight: 700; font-size: 1rem; color: white;">⚙ Admin Panel</span>
          </template>
          <template #links>
            <a href="#" style="font-size: 0.9rem; color: rgba(255,255,255,0.8); text-decoration: none; font-weight: 500;">儀表板</a>
            <a href="#" style="font-size: 0.9rem; color: rgba(255,255,255,0.8); text-decoration: none; font-weight: 500;">使用者</a>
            <a href="#" style="font-size: 0.9rem; color: rgba(255,255,255,0.8); text-decoration: none; font-weight: 500;">設定</a>
          </template>
          <template #actions>
            <button style="padding: 0.4rem 1rem; border-radius: 8px; background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; font-size: 0.875rem; font-weight: 500; backdrop-filter: blur(8px);">登出</button>
          </template>
        </LiquidNavbar>
        <div style="padding: 3rem 2rem;">
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0;">Admin 頁面內容區域（暗色背景）</p>
        </div>
      </div>
    `,
  }),
};

// 三種變體對比
export const VariantComparison: Story = {
  render: () => ({
    components: { LiquidNavbar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">

        <!-- Default -->
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="default"</p>
          <div style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; overflow: hidden; background: #f8f9fa;">
            <LiquidNavbar variant="default" :sticky="false">
              <template #logo>
                <span style="font-weight: 700; color: #1a1a2e;">◈ Liquid UI</span>
              </template>
              <template #links>
                <a href="#" style="color: #4a5568; text-decoration: none; font-size: 0.875rem;">首頁</a>
                <a href="#" style="color: #4a5568; text-decoration: none; font-size: 0.875rem;">文件</a>
              </template>
            </LiquidNavbar>
            <div style="padding: 1.5rem 2rem;">
              <p style="color: #999; font-size: 13px; margin: 0;">一般亮色頁面</p>
            </div>
          </div>
        </div>

        <!-- Glass Light -->
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="glass-light"</p>
          <div style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%);">
            <LiquidNavbar variant="glass-light" :sticky="false">
              <template #logo>
                <span style="font-weight: 700; color: #1a1a2e;">◈ Blog</span>
              </template>
              <template #links>
                <a href="#" style="color: #4a5568; text-decoration: none; font-size: 0.875rem;">文章</a>
                <a href="#" style="color: #4a5568; text-decoration: none; font-size: 0.875rem;">GitHub</a>
              </template>
            </LiquidNavbar>
            <div style="padding: 1.5rem 2rem;">
              <p style="color: #777; font-size: 13px; margin: 0;">亮色漸層背景（Blog 場景）</p>
            </div>
          </div>
        </div>

        <!-- Glass CSS Only -->
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">variant="glass-css-only"</p>
          <div style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);">
            <LiquidNavbar variant="glass-css-only" :sticky="false">
              <template #logo>
                <span style="font-weight: 700; color: white;">⚙ Admin</span>
              </template>
              <template #links>
                <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.875rem;">儀表板</a>
                <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.875rem;">設定</a>
              </template>
            </LiquidNavbar>
            <div style="padding: 1.5rem 2rem;">
              <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 0;">暗色漸層背景（Admin 場景）</p>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};
