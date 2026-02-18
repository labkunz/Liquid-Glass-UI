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
    overflow: {
      control: 'select',
      options: ['hidden', 'visible', 'auto'],
      description: 'overflow 行為。含 LiquidSelect 等下拉元件時需設為 visible',
      table: {
        type: { summary: "'hidden' | 'visible' | 'auto'" },
        defaultValue: { summary: 'hidden' },
      },
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
    overflow: 'hidden',
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

// overflow="visible" — 避免下拉選單被裁切
export const OverflowVisible: Story = {
  render: () => ({
    components: { LiquidCard },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem; align-items: start;">
        <!-- overflow hidden（預設） -->
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">
            overflow="hidden"（預設）
          </p>
          <LiquidCard variant="default" padding="md" overflow="hidden" style="position: relative;">
            <p style="margin: 0 0 0.75rem; font-size: 13px; color: #555;">若卡片內有下拉選單，overflow:hidden 會將選單裁切掉。</p>
            <!-- 模擬下拉選單被裁切的情況 -->
            <div style="position: relative; display: inline-block;">
              <div style="
                border: 1px solid #dee2e6; border-radius: 6px; padding: 0.4rem 0.75rem;
                font-size: 13px; color: #333; background: #fff; cursor: pointer;
              ">選項 A ▾</div>
              <div style="
                position: absolute; top: 110%; left: 0; width: 140px;
                background: #fff; border: 1px solid #dee2e6; border-radius: 6px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.12); padding: 0.25rem 0; z-index: 10;
              ">
                <div style="padding: 0.4rem 0.75rem; font-size: 13px; color: #333;">選項 A</div>
                <div style="padding: 0.4rem 0.75rem; font-size: 13px; color: #333;">選項 B</div>
                <div style="padding: 0.4rem 0.75rem; font-size: 13px; color: #333;">選項 C</div>
              </div>
            </div>
          </LiquidCard>
        </div>

        <!-- overflow visible -->
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">
            overflow="visible"
          </p>
          <LiquidCard variant="default" padding="md" overflow="visible" style="position: relative;">
            <p style="margin: 0 0 0.75rem; font-size: 13px; color: #555;">設定 overflow="visible" 後，下拉選單可以正常超出卡片邊界。</p>
            <div style="position: relative; display: inline-block;">
              <div style="
                border: 1px solid #dee2e6; border-radius: 6px; padding: 0.4rem 0.75rem;
                font-size: 13px; color: #333; background: #fff; cursor: pointer;
              ">選項 A ▾</div>
              <div style="
                position: absolute; top: 110%; left: 0; width: 140px;
                background: #fff; border: 1px solid #dee2e6; border-radius: 6px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.12); padding: 0.25rem 0; z-index: 10;
              ">
                <div style="padding: 0.4rem 0.75rem; font-size: 13px; color: #333;">選項 A</div>
                <div style="padding: 0.4rem 0.75rem; font-size: 13px; color: #333;">選項 B</div>
                <div style="padding: 0.4rem 0.75rem; font-size: 13px; color: #333;">選項 C</div>
              </div>
            </div>
          </LiquidCard>
        </div>
      </div>
    `,
  }),
};

// 暗色主題 CSS 變數覆蓋 — glass-css-only
export const DarkThemeCssVars: Story = {
  render: () => ({
    components: { LiquidCard, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: #0f1117; border-radius: 16px;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">
            暗色主題 CSS 變數覆蓋
          </p>
          <p style="color: #64748b; font-size: 12px; margin: -1rem 0 0; line-height: 1.6;">
            在父層或 :root 設定<br>
            <code style="color: #a78bfa; font-size: 11px;">--liquid-card-glass-bg: rgba(255,255,255,0.05)</code><br>
            <code style="color: #a78bfa; font-size: 11px;">--liquid-card-glass-border-color: rgba(255,255,255,0.08)</code><br>
            <code style="color: #a78bfa; font-size: 11px;">--liquid-card-glass-highlight-opacity: 0.06</code>
          </p>

          <!-- 預設光亮值（不覆蓋） -->
          <div>
            <p style="color: #64748b; font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.06em;">
              預設值（光亮主題）
            </p>
            <LiquidCard variant="glass-css-only" padding="md">
              <h4 style="margin: 0 0 0.4rem; color: rgba(255,255,255,0.9); font-size: 15px;">Glass Card</h4>
              <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.5;">
                使用預設 15% 白底、35% 邊框。在暗色背景下偏亮。
              </p>
            </LiquidCard>
          </div>

          <!-- 暗色主題覆蓋 -->
          <div style="
            --liquid-card-glass-bg: rgba(255, 255, 255, 0.05);
            --liquid-card-glass-border-color: rgba(255, 255, 255, 0.08);
            --liquid-card-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
            --liquid-card-glass-highlight-opacity: 0.06;
            --glass-blur: 16px;
          ">
            <p style="color: #64748b; font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.06em;">
              CSS 變數覆蓋（暗色主題）
            </p>
            <LiquidCard variant="glass-css-only" padding="md">
              <h4 style="margin: 0 0 0.4rem; color: #e2e8f0; font-size: 15px;">Glass Card（暗）</h4>
              <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.5;">
                5% 白底、8% 邊框，高光降至 6%，完美融入暗色背景。
              </p>
            </LiquidCard>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};
