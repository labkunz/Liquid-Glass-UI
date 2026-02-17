import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Select, GlassFilterProvider } from '@liquid/ui';

const DEMO_OPTIONS = [
  { value: 'apple', label: '蘋果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橘子' },
  { value: 'grape', label: '葡萄' },
  { value: 'watermelon', label: '西瓜' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '下拉選單樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '下拉選單尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    placeholder: {
      control: 'text',
      description: '未選擇時的佔位文字',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '請選擇...' },
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
  },
  args: {
    variant: 'default',
    size: 'md',
    placeholder: '請選擇...',
    disabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref(null);
      return { args, selected, DEMO_OPTIONS };
    },
    template: `
      <div style="padding: 2rem; min-height: 200px;">
        <Select
          v-bind="args"
          :options="DEMO_OPTIONS"
          v-model="selected"
        />
        <p style="margin-top: 1rem; font-size: 13px; color: #666;">
          已選擇：{{ selected ?? '（未選擇）' }}
        </p>
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pure CSS glassmorphism 下拉選單。點擊觸發按鈕可看到開啟時的 border 高光與 box-shadow 效果，下拉面板同樣套用 backdrop-filter blur，無需 SVG filter。',
      },
    },
  },
  render: (args) => ({
    components: { Select, GlassFilterProvider },
    setup() {
      const selected = ref(null);
      return { args, selected, DEMO_OPTIONS };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 3rem;
        ">
          <Select
            v-bind="args"
            :options="DEMO_OPTIONS"
            v-model="selected"
          />
          <p style="margin-top: 1rem; font-size: 13px; color: rgba(255,255,255,0.8);">
            已選擇：{{ selected ?? '（未選擇）' }}
          </p>
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
    components: { Select, GlassFilterProvider },
    setup() {
      const selected = ref(null);
      return { args, selected, DEMO_OPTIONS };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 3rem;
        ">
          <Select
            v-bind="args"
            :options="DEMO_OPTIONS"
            v-model="selected"
          />
          <p style="margin-top: 1rem; font-size: 13px; color: rgba(255,255,255,0.8);">
            已選擇：{{ selected ?? '（未選擇）' }}
          </p>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { Select, GlassFilterProvider },
    setup() {
      const selectedA = ref(null);
      const selectedB = ref(null);
      const selectedC = ref(null);
      const selectedD = ref(null);
      return { DEMO_OPTIONS, selectedA, selectedB, selectedC, selectedD };
    },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">

          <!-- Purple Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            min-height: 200px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Purple Gradient</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <Select variant="glass-css-only" :options="DEMO_OPTIONS" v-model="selectedA" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <Select variant="glass-highlight-layered" :options="DEMO_OPTIONS" v-model="selectedB" />
              </div>
            </div>
          </div>

          <!-- Dark Ocean Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
            min-height: 200px;
          ">
            <p style="color: white; margin: 0 0 1.5rem; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Dark Ocean</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <Select variant="glass-css-only" :options="DEMO_OPTIONS" v-model="selectedC" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <Select variant="glass-highlight-layered" :options="DEMO_OPTIONS" v-model="selectedD" />
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 尺寸對比
export const Sizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedSm = ref(null);
      const selectedMd = ref(null);
      const selectedLg = ref(null);
      return { DEMO_OPTIONS, selectedSm, selectedMd, selectedLg };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; min-height: 300px;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="sm"</p>
          <Select variant="default" size="sm" :options="DEMO_OPTIONS" v-model="selectedSm" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="md" (default)</p>
          <Select variant="default" size="md" :options="DEMO_OPTIONS" v-model="selectedMd" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.4rem;">size="lg"</p>
          <Select variant="default" size="lg" :options="DEMO_OPTIONS" v-model="selectedLg" />
        </div>
      </div>
    `,
  }),
};

// 預設選取值
export const WithSelectedValue: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref('banana');
      return { args, selected, DEMO_OPTIONS };
    },
    template: `
      <div style="padding: 2rem; min-height: 200px;">
        <Select
          v-bind="args"
          :options="DEMO_OPTIONS"
          v-model="selected"
        />
        <p style="margin-top: 1rem; font-size: 13px; color: #666;">
          已選擇：{{ selected ?? '（未選擇）' }}
        </p>
      </div>
    `,
  }),
};
