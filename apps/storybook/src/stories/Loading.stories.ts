import type { Meta, StoryObj } from '@storybook/vue3';
import { Loading } from '@liquid/ui';
import { GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '載入元件樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '載入元件尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse'],
      description: '動畫類型',
      table: {
        type: { summary: "'spinner' | 'dots' | 'pulse'" },
        defaultValue: { summary: 'spinner' },
      },
    },
    label: {
      control: 'text',
      description: '載入文字標籤',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    overlay: {
      control: 'boolean',
      description: '是否顯示全頁遮罩',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    type: 'spinner',
    label: '',
    overlay: false,
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    type: 'spinner',
  },
  render: (args) => ({
    components: { Loading },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 2rem; display: flex; align-items: center; justify-content: center;">
        <Loading v-bind="args" />
      </div>
    `,
  }),
};

// All animation types side by side
export const AllTypes: Story = {
  render: () => ({
    components: { Loading },
    template: `
      <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Animation Types — size md</p>
          <div style="display: flex; gap: 3rem; align-items: center;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="spinner" size="md" />
              <span style="font-size: 12px; color: #888;">spinner</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="dots" size="md" />
              <span style="font-size: 12px; color: #888;">dots</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="pulse" size="md" />
              <span style="font-size: 12px; color: #888;">pulse</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Glass CSS Only variant
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  render: (args) => ({
    components: { Loading, GlassFilterProvider },
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
          <div style="display: flex; gap: 2rem; align-items: center;">
            <Loading variant="glass-css-only" type="spinner" />
            <Loading variant="glass-css-only" type="dots" />
            <Loading variant="glass-css-only" type="pulse" />
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered variant
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
  },
  render: (args) => ({
    components: { Loading, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="display: flex; gap: 2rem; align-items: center;">
            <Loading variant="glass-highlight-layered" type="spinner" />
            <Loading variant="glass-highlight-layered" type="dots" />
            <Loading variant="glass-highlight-layered" type="pulse" />
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Comparison — both variants side by side, all 3 animation types
export const GlassComparison: Story = {
  render: () => ({
    components: { Loading, GlassFilterProvider },
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
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <Loading variant="glass-css-only" type="spinner" />
                  <Loading variant="glass-css-only" type="dots" />
                  <Loading variant="glass-css-only" type="pulse" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <Loading variant="glass-highlight-layered" type="spinner" />
                  <Loading variant="glass-highlight-layered" type="dots" />
                  <Loading variant="glass-highlight-layered" type="pulse" />
                </div>
              </div>
            </div>
          </div>

          <!-- Dark Ocean Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <Loading variant="glass-css-only" type="spinner" />
                  <Loading variant="glass-css-only" type="dots" />
                  <Loading variant="glass-css-only" type="pulse" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <Loading variant="glass-highlight-layered" type="spinner" />
                  <Loading variant="glass-highlight-layered" type="dots" />
                  <Loading variant="glass-highlight-layered" type="pulse" />
                </div>
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
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <Loading variant="glass-css-only" type="spinner" />
                  <Loading variant="glass-css-only" type="dots" />
                  <Loading variant="glass-css-only" type="pulse" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <Loading variant="glass-highlight-layered" type="spinner" />
                  <Loading variant="glass-highlight-layered" type="dots" />
                  <Loading variant="glass-highlight-layered" type="pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Sizes comparison
export const Sizes: Story = {
  render: () => ({
    components: { Loading },
    template: `
      <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Spinner — All Sizes</p>
          <div style="display: flex; gap: 3rem; align-items: center;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="spinner" size="sm" />
              <span style="font-size: 12px; color: #888;">sm</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="spinner" size="md" />
              <span style="font-size: 12px; color: #888;">md</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="spinner" size="lg" />
              <span style="font-size: 12px; color: #888;">lg</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="spinner" size="xl" />
              <span style="font-size: 12px; color: #888;">xl</span>
            </div>
          </div>
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Dots — All Sizes</p>
          <div style="display: flex; gap: 3rem; align-items: center;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="dots" size="sm" />
              <span style="font-size: 12px; color: #888;">sm</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="dots" size="md" />
              <span style="font-size: 12px; color: #888;">md</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="dots" size="lg" />
              <span style="font-size: 12px; color: #888;">lg</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="dots" size="xl" />
              <span style="font-size: 12px; color: #888;">xl</span>
            </div>
          </div>
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Pulse — All Sizes</p>
          <div style="display: flex; gap: 3rem; align-items: center;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="pulse" size="sm" />
              <span style="font-size: 12px; color: #888;">sm</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="pulse" size="md" />
              <span style="font-size: 12px; color: #888;">md</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="pulse" size="lg" />
              <span style="font-size: 12px; color: #888;">lg</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <Loading variant="default" type="pulse" size="xl" />
              <span style="font-size: 12px; color: #888;">xl</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// With label
export const WithLabel: Story = {
  args: {
    variant: 'default',
    size: 'md',
    type: 'spinner',
    label: '資料載入中...',
  },
  render: (args) => ({
    components: { Loading },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Spinner with label</p>
          <Loading variant="default" type="spinner" size="md" label="資料載入中..." />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Dots with label</p>
          <Loading variant="default" type="dots" size="md" label="資料載入中..." />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Pulse with label</p>
          <Loading variant="default" type="pulse" size="md" label="資料載入中..." />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">Large spinner with label</p>
          <Loading variant="default" type="spinner" size="lg" label="資料載入中..." />
        </div>
      </div>
    `,
  }),
};
