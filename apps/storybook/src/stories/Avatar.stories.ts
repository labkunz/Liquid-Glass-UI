import type { Meta, StoryObj } from '@storybook/vue3';
import { LiquidAvatar } from '@liquid/ui';
import { GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/LiquidAvatar',
  component: LiquidAvatar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'LiquidAvatar 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'LiquidAvatar 尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'LiquidAvatar 顏色',
      table: {
        type: { summary: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'" },
        defaultValue: { summary: 'default' },
      },
    },
    src: {
      control: 'text',
      description: '頭像圖片 URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    alt: {
      control: 'text',
      description: '圖片替代文字',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    initials: {
      control: 'text',
      description: '顯示縮寫文字（無圖片時）',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    color: 'default',
    src: '',
    alt: '',
    initials: '',
  },
} satisfies Meta<typeof LiquidAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體 — 帶縮寫文字
export const Default: Story = {
  args: {
    variant: 'default',
    initials: '陳明',
    color: 'primary',
    size: 'md',
  },
  render: (args) => ({
    components: { LiquidAvatar },
    setup() {
      return { args };
    },
    template: `
      <LiquidAvatar v-bind="args" />
    `,
  }),
};

// 帶真實圖片
export const WithImage: Story = {
  args: {
    variant: 'default',
    src: 'https://i.pravatar.cc/80',
    alt: '使用者頭像',
    size: 'lg',
  },
  render: (args) => ({
    components: { LiquidAvatar },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <LiquidAvatar v-bind="args" size="sm" />
        <LiquidAvatar v-bind="args" size="md" />
        <LiquidAvatar v-bind="args" size="lg" />
        <LiquidAvatar v-bind="args" size="xl" />
      </div>
    `,
  }),
};

// Glass CSS Only 變體 — 紫色漸層背景，展示所有顏色
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  render: (args) => ({
    components: { LiquidAvatar, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 2.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        ">
          <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only — all colors</p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <LiquidAvatar variant="glass-css-only" initials="陳" color="primary" />
            <LiquidAvatar variant="glass-css-only" initials="林" color="success" />
            <LiquidAvatar variant="glass-css-only" initials="王" color="warning" />
            <LiquidAvatar variant="glass-css-only" initials="張" color="danger" />
            <LiquidAvatar variant="glass-css-only" initials="李" color="info" />
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體 — 深色漸層背景
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
  },
  render: (args) => ({
    components: { LiquidAvatar, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 2.5rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          min-height: 160px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        ">
          <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered — all colors</p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <LiquidAvatar variant="glass-highlight-layered" initials="陳" color="primary" />
            <LiquidAvatar variant="glass-highlight-layered" initials="林" color="success" />
            <LiquidAvatar variant="glass-highlight-layered" initials="王" color="warning" />
            <LiquidAvatar variant="glass-highlight-layered" initials="張" color="danger" />
            <LiquidAvatar variant="glass-highlight-layered" initials="李" color="info" />
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { LiquidAvatar, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem;">

          <!-- Purple Gradient -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Purple Gradient</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; gap: 1rem; align-items: center;">
                  <LiquidAvatar variant="glass-css-only" initials="陳" color="primary" />
                  <LiquidAvatar variant="glass-css-only" initials="林" color="success" />
                  <LiquidAvatar variant="glass-css-only" initials="王" color="warning" />
                  <LiquidAvatar variant="glass-css-only" initials="張" color="danger" />
                  <LiquidAvatar variant="glass-css-only" initials="李" color="info" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; gap: 1rem; align-items: center;">
                  <LiquidAvatar variant="glass-highlight-layered" initials="陳" color="primary" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="林" color="success" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="王" color="warning" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="張" color="danger" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="李" color="info" />
                </div>
              </div>
            </div>
          </div>

          <!-- Dark Ocean Gradient -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; gap: 1rem; align-items: center;">
                  <LiquidAvatar variant="glass-css-only" initials="陳" color="primary" />
                  <LiquidAvatar variant="glass-css-only" initials="林" color="success" />
                  <LiquidAvatar variant="glass-css-only" initials="王" color="warning" />
                  <LiquidAvatar variant="glass-css-only" initials="張" color="danger" />
                  <LiquidAvatar variant="glass-css-only" initials="李" color="info" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; gap: 1rem; align-items: center;">
                  <LiquidAvatar variant="glass-highlight-layered" initials="陳" color="primary" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="林" color="success" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="王" color="warning" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="張" color="danger" />
                  <LiquidAvatar variant="glass-highlight-layered" initials="李" color="info" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Sizes — sm / md / lg / xl 比較
export const Sizes: Story = {
  render: () => ({
    components: { LiquidAvatar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="sm" (32px)</p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <LiquidAvatar variant="default" size="sm" initials="陳" color="primary" />
            <LiquidAvatar variant="default" size="sm" initials="林" color="success" />
            <LiquidAvatar variant="default" size="sm" initials="王" color="warning" />
            <LiquidAvatar variant="default" size="sm" color="default" />
          </div>
        </div>
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="md" (40px, default)</p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <LiquidAvatar variant="default" size="md" initials="陳" color="primary" />
            <LiquidAvatar variant="default" size="md" initials="林" color="success" />
            <LiquidAvatar variant="default" size="md" initials="王" color="warning" />
            <LiquidAvatar variant="default" size="md" color="default" />
          </div>
        </div>
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="lg" (56px)</p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <LiquidAvatar variant="default" size="lg" initials="陳" color="primary" />
            <LiquidAvatar variant="default" size="lg" initials="林" color="success" />
            <LiquidAvatar variant="default" size="lg" initials="王" color="warning" />
            <LiquidAvatar variant="default" size="lg" color="default" />
          </div>
        </div>
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="xl" (80px)</p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <LiquidAvatar variant="default" size="xl" initials="陳" color="primary" />
            <LiquidAvatar variant="default" size="xl" initials="林" color="success" />
            <LiquidAvatar variant="default" size="xl" initials="王" color="warning" />
            <LiquidAvatar variant="default" size="xl" color="default" />
          </div>
        </div>
      </div>
    `,
  }),
};

// AllColors — 所有 6 種顏色在 default 樣式下
export const AllColors: Story = {
  render: () => ({
    components: { LiquidAvatar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p style="margin: 0 0 0.5rem; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.08em;">All 6 colors — default variant</p>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem;">
            <LiquidAvatar variant="default" color="default" initials="預" size="lg" />
            <span style="font-size: 11px; color: #888;">default</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem;">
            <LiquidAvatar variant="default" color="primary" initials="主" size="lg" />
            <span style="font-size: 11px; color: #888;">primary</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem;">
            <LiquidAvatar variant="default" color="success" initials="成" size="lg" />
            <span style="font-size: 11px; color: #888;">success</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem;">
            <LiquidAvatar variant="default" color="warning" initials="警" size="lg" />
            <span style="font-size: 11px; color: #888;">warning</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem;">
            <LiquidAvatar variant="default" color="danger" initials="危" size="lg" />
            <span style="font-size: 11px; color: #888;">danger</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem;">
            <LiquidAvatar variant="default" color="info" initials="訊" size="lg" />
            <span style="font-size: 11px; color: #888;">info</span>
          </div>
        </div>
      </div>
    `,
  }),
};
