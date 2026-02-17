import type { Meta, StoryObj } from '@storybook/vue3';
import { Badge } from '@liquid/ui';
import { GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'Badge 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge 尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'Badge 顏色',
      table: {
        type: { summary: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'" },
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    color: 'default',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體 — 所有顏色並排展示
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p style="margin: 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.08em;">Default variant — all colors</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <Badge variant="default" color="default">預設</Badge>
          <Badge variant="default" color="primary">主要</Badge>
          <Badge variant="default" color="success">成功</Badge>
          <Badge variant="default" color="warning">警告</Badge>
          <Badge variant="default" color="danger">危險</Badge>
          <Badge variant="default" color="info">資訊</Badge>
        </div>
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
    components: { Badge, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 2.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        ">
          <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only — all colors</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <Badge variant="glass-css-only" color="default">預設</Badge>
            <Badge variant="glass-css-only" color="primary">主要</Badge>
            <Badge variant="glass-css-only" color="success">成功</Badge>
            <Badge variant="glass-css-only" color="warning">警告</Badge>
            <Badge variant="glass-css-only" color="danger">危險</Badge>
            <Badge variant="glass-css-only" color="info">資訊</Badge>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體 — 深色漸層背景，展示所有顏色
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
  },
  render: (args) => ({
    components: { Badge, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 2.5rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        ">
          <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered — all colors</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <Badge variant="glass-highlight-layered" color="default">預設</Badge>
            <Badge variant="glass-highlight-layered" color="primary">主要</Badge>
            <Badge variant="glass-highlight-layered" color="success">成功</Badge>
            <Badge variant="glass-highlight-layered" color="warning">警告</Badge>
            <Badge variant="glass-highlight-layered" color="danger">危險</Badge>
            <Badge variant="glass-highlight-layered" color="info">資訊</Badge>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { Badge, GlassFilterProvider },
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
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                  <Badge variant="glass-css-only" color="default">預設</Badge>
                  <Badge variant="glass-css-only" color="primary">主要</Badge>
                  <Badge variant="glass-css-only" color="success">成功</Badge>
                  <Badge variant="glass-css-only" color="warning">警告</Badge>
                  <Badge variant="glass-css-only" color="danger">危險</Badge>
                  <Badge variant="glass-css-only" color="info">資訊</Badge>
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                  <Badge variant="glass-highlight-layered" color="default">預設</Badge>
                  <Badge variant="glass-highlight-layered" color="primary">主要</Badge>
                  <Badge variant="glass-highlight-layered" color="success">成功</Badge>
                  <Badge variant="glass-highlight-layered" color="warning">警告</Badge>
                  <Badge variant="glass-highlight-layered" color="danger">危險</Badge>
                  <Badge variant="glass-highlight-layered" color="info">資訊</Badge>
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
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                  <Badge variant="glass-css-only" color="default">預設</Badge>
                  <Badge variant="glass-css-only" color="primary">主要</Badge>
                  <Badge variant="glass-css-only" color="success">成功</Badge>
                  <Badge variant="glass-css-only" color="warning">警告</Badge>
                  <Badge variant="glass-css-only" color="danger">危險</Badge>
                  <Badge variant="glass-css-only" color="info">資訊</Badge>
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                  <Badge variant="glass-highlight-layered" color="default">預設</Badge>
                  <Badge variant="glass-highlight-layered" color="primary">主要</Badge>
                  <Badge variant="glass-highlight-layered" color="success">成功</Badge>
                  <Badge variant="glass-highlight-layered" color="warning">警告</Badge>
                  <Badge variant="glass-highlight-layered" color="danger">危險</Badge>
                  <Badge variant="glass-highlight-layered" color="info">資訊</Badge>
                </div>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Sizes — sm / md / lg 比較
export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="sm"</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <Badge variant="default" size="sm" color="default">預設</Badge>
            <Badge variant="default" size="sm" color="primary">主要</Badge>
            <Badge variant="default" size="sm" color="success">成功</Badge>
            <Badge variant="default" size="sm" color="warning">警告</Badge>
            <Badge variant="default" size="sm" color="danger">危險</Badge>
            <Badge variant="default" size="sm" color="info">資訊</Badge>
          </div>
        </div>
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="md" (default)</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <Badge variant="default" size="md" color="default">預設</Badge>
            <Badge variant="default" size="md" color="primary">主要</Badge>
            <Badge variant="default" size="md" color="success">成功</Badge>
            <Badge variant="default" size="md" color="warning">警告</Badge>
            <Badge variant="default" size="md" color="danger">危險</Badge>
            <Badge variant="default" size="md" color="info">資訊</Badge>
          </div>
        </div>
        <div>
          <p style="color: #888; font-size: 12px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">size="lg"</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <Badge variant="default" size="lg" color="default">預設</Badge>
            <Badge variant="default" size="lg" color="primary">主要</Badge>
            <Badge variant="default" size="lg" color="success">成功</Badge>
            <Badge variant="default" size="lg" color="warning">警告</Badge>
            <Badge variant="default" size="lg" color="danger">危險</Badge>
            <Badge variant="default" size="lg" color="info">資訊</Badge>
          </div>
        </div>
      </div>
    `,
  }),
};

// AllColors — 所有 6 種顏色在 default 樣式下
export const AllColors: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <p style="margin: 0 0 0.5rem; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.08em;">All 6 colors — default variant</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <Badge variant="default" color="default">預設 (default)</Badge>
          <Badge variant="default" color="primary">主要 (primary)</Badge>
          <Badge variant="default" color="success">成功 (success)</Badge>
          <Badge variant="default" color="warning">警告 (warning)</Badge>
          <Badge variant="default" color="danger">危險 (danger)</Badge>
          <Badge variant="default" color="info">資訊 (info)</Badge>
        </div>
      </div>
    `,
  }),
};
