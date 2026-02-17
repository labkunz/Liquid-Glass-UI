import type { Meta, StoryObj } from '@storybook/vue3';
import { LiquidCard, GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/LiquidCard',
  component: LiquidCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '卡片樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: '卡片內距',
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
  },
} satisfies Meta<typeof LiquidCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { LiquidCard },
    setup() {
      return { args };
    },
    template: `
      <LiquidCard v-bind="args" style="width: 320px;">
        <h3 style="margin: 0 0 0.5rem; font-size: 18px; color: #333;">LiquidCard Title</h3>
        <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
          This is a default card with a clean white background and subtle shadow.
        </p>
      </LiquidCard>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  render: (args) => ({
    components: { LiquidCard, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <LiquidCard v-bind="args" style="width: 320px;">
            <h3 style="margin: 0 0 0.5rem; font-size: 18px; color: rgba(255,255,255,0.95);">Glass LiquidCard</h3>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6;">
              Pure CSS glassmorphism. No SVG filter required — works everywhere.
            </p>
          </LiquidCard>
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
    components: { LiquidCard, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 16px;
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <LiquidCard v-bind="args" style="width: 320px;">
            <h3 style="margin: 0 0 0.5rem; font-size: 18px; color: rgba(255,255,255,0.95);">Glass LiquidCard</h3>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6;">
              Layered glass with organic SVG highlight. Best visual quality.
            </p>
          </LiquidCard>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { LiquidCard, GlassFilterProvider },
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
                <LiquidCard variant="glass-css-only" padding="md">
                  <h4 style="margin: 0 0 0.4rem; color: rgba(255,255,255,0.95); font-size: 15px;">CSS Only</h4>
                  <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.5;">Pure CSS, no SVG required.</p>
                </LiquidCard>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidCard variant="glass-highlight-layered" padding="md">
                  <h4 style="margin: 0 0 0.4rem; color: rgba(255,255,255,0.95); font-size: 15px;">Highlight Layered</h4>
                  <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.5;">Organic SVG highlight.</p>
                </LiquidCard>
              </div>
            </div>
          </div>

          <!-- Ocean Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidCard variant="glass-css-only" padding="md">
                  <h4 style="margin: 0 0 0.4rem; color: rgba(255,255,255,0.95); font-size: 15px;">CSS Only</h4>
                  <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.5;">Subtle on dark backgrounds.</p>
                </LiquidCard>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidCard variant="glass-highlight-layered" padding="md">
                  <h4 style="margin: 0 0 0.4rem; color: rgba(255,255,255,0.95); font-size: 15px;">Highlight Layered</h4>
                  <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.5;">Organic light on dark.</p>
                </LiquidCard>
              </div>
            </div>
          </div>

          <!-- Rose Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Rose Gradient</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidCard variant="glass-css-only" padding="md">
                  <h4 style="margin: 0 0 0.4rem; color: rgba(255,255,255,0.95); font-size: 15px;">CSS Only</h4>
                  <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.5;">Warm glass feel.</p>
                </LiquidCard>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidCard variant="glass-highlight-layered" padding="md">
                  <h4 style="margin: 0 0 0.4rem; color: rgba(255,255,255,0.95); font-size: 15px;">Highlight Layered</h4>
                  <p style="margin: 0; color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.5;">Layered warmth.</p>
                </LiquidCard>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Padding 變體展示
export const PaddingVariants: Story = {
  render: () => ({
    components: { LiquidCard },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 320px;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">padding="none"</p>
          <LiquidCard variant="default" padding="none">
            <div style="background: rgba(0,123,255,0.08); padding: 0.5rem; font-size: 13px; color: #333;">No padding (slot fills edge)</div>
          </LiquidCard>
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">padding="sm"</p>
          <LiquidCard variant="default" padding="sm">
            <p style="margin: 0; font-size: 13px; color: #333;">Small padding card</p>
          </LiquidCard>
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">padding="md" (default)</p>
          <LiquidCard variant="default" padding="md">
            <p style="margin: 0; font-size: 13px; color: #333;">Medium padding card</p>
          </LiquidCard>
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">padding="lg"</p>
          <LiquidCard variant="default" padding="lg">
            <p style="margin: 0; font-size: 13px; color: #333;">Large padding card</p>
          </LiquidCard>
        </div>
      </div>
    `,
  }),
};
