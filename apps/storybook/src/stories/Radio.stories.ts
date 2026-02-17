import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Radio, GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'Radio 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio 尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: '標籤文字',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否停用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'Radio 的值',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      const selected = ref('a');
      return { args, selected };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Radio v-bind="args" value="a" label="選項 A" v-model="selected" />
        <Radio v-bind="args" value="b" label="選項 B" v-model="selected" />
        <Radio v-bind="args" value="c" label="選項 C" v-model="selected" />
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  render: (args) => ({
    components: { Radio, GlassFilterProvider },
    setup() {
      const selected = ref('a');
      return { args, selected };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-bind="args" value="a" label="選項 A" v-model="selected" />
            <Radio v-bind="args" value="b" label="選項 B" v-model="selected" />
            <Radio v-bind="args" value="c" label="選項 C" v-model="selected" />
          </div>
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
    components: { Radio, GlassFilterProvider },
    setup() {
      const selected = ref('a');
      return { args, selected };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio v-bind="args" value="a" label="選項 A" v-model="selected" />
            <Radio v-bind="args" value="b" label="選項 B" v-model="selected" />
            <Radio v-bind="args" value="c" label="選項 C" v-model="selected" />
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { Radio, GlassFilterProvider },
    setup() {
      const selectedPurpleCss = ref('a');
      const selectedPurpleLayered = ref('a');
      const selectedDarkCss = ref('a');
      const selectedDarkLayered = ref('a');
      return {
        selectedPurpleCss,
        selectedPurpleLayered,
        selectedDarkCss,
        selectedDarkLayered,
      };
    },
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
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Radio variant="glass-css-only" value="a" label="選項 A" v-model="selectedPurpleCss" />
                  <Radio variant="glass-css-only" value="b" label="選項 B" v-model="selectedPurpleCss" />
                  <Radio variant="glass-css-only" value="c" label="選項 C" v-model="selectedPurpleCss" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Radio variant="glass-highlight-layered" value="a" label="選項 A" v-model="selectedPurpleLayered" />
                  <Radio variant="glass-highlight-layered" value="b" label="選項 B" v-model="selectedPurpleLayered" />
                  <Radio variant="glass-highlight-layered" value="c" label="選項 C" v-model="selectedPurpleLayered" />
                </div>
              </div>
            </div>
          </div>

          <!-- Dark Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Radio variant="glass-css-only" value="a" label="選項 A" v-model="selectedDarkCss" />
                  <Radio variant="glass-css-only" value="b" label="選項 B" v-model="selectedDarkCss" />
                  <Radio variant="glass-css-only" value="c" label="選項 C" v-model="selectedDarkCss" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Radio variant="glass-highlight-layered" value="a" label="選項 A" v-model="selectedDarkLayered" />
                  <Radio variant="glass-highlight-layered" value="b" label="選項 B" v-model="selectedDarkLayered" />
                  <Radio variant="glass-highlight-layered" value="c" label="選項 C" v-model="selectedDarkLayered" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Sizes 展示
export const Sizes: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selectedSm = ref('a');
      const selectedMd = ref('a');
      const selectedLg = ref('a');
      return { selectedSm, selectedMd, selectedLg };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">size="sm"</p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio size="sm" variant="default" value="a" label="選項 A (sm)" v-model="selectedSm" />
            <Radio size="sm" variant="default" value="b" label="選項 B (sm)" v-model="selectedSm" />
            <Radio size="sm" variant="default" value="c" label="選項 C (sm)" v-model="selectedSm" />
          </div>
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">size="md" (default)</p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio size="md" variant="default" value="a" label="選項 A (md)" v-model="selectedMd" />
            <Radio size="md" variant="default" value="b" label="選項 B (md)" v-model="selectedMd" />
            <Radio size="md" variant="default" value="c" label="選項 C (md)" v-model="selectedMd" />
          </div>
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">size="lg"</p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio size="lg" variant="default" value="a" label="選項 A (lg)" v-model="selectedLg" />
            <Radio size="lg" variant="default" value="b" label="選項 B (lg)" v-model="selectedLg" />
            <Radio size="lg" variant="default" value="c" label="選項 C (lg)" v-model="selectedLg" />
          </div>
        </div>
      </div>
    `,
  }),
};

// Disabled 狀態
export const Disabled: Story = {
  render: () => ({
    components: { Radio, GlassFilterProvider },
    setup() {
      const selectedDefault = ref('a');
      const selectedGlass = ref('a');
      return { selectedDefault, selectedGlass };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Default — disabled</p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <Radio variant="default" value="a" label="選項 A (已選取 + 停用)" v-model="selectedDefault" disabled />
            <Radio variant="default" value="b" label="選項 B (未選取 + 停用)" v-model="selectedDefault" disabled />
          </div>
        </div>
        <GlassFilterProvider>
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
          ">
            <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Glass CSS Only — disabled</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <Radio variant="glass-css-only" value="a" label="選項 A (已選取 + 停用)" v-model="selectedGlass" disabled />
              <Radio variant="glass-css-only" value="b" label="選項 B (未選取 + 停用)" v-model="selectedGlass" disabled />
            </div>
          </div>
        </GlassFilterProvider>
      </div>
    `,
  }),
};
