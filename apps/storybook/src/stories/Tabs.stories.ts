import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Tabs, GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '分頁樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    modelValue: {
      control: 'text',
      description: '目前啟用的 tab key（v-model）',
    },
  },
  args: {
    variant: 'default',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const DEMO_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'details', label: 'Details' },
  { key: 'settings', label: 'Settings' },
];

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const activeTab = ref('overview');
      return { args, activeTab, DEMO_TABS };
    },
    template: `
      <Tabs
        v-bind="args"
        :tabs="DEMO_TABS"
        v-model="activeTab"
        style="width: 400px;"
      >
        <template #overview>
          <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">
            Overview content — A summary of the item with key highlights and general information.
          </p>
        </template>
        <template #details>
          <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">
            Details content — In-depth specifications and technical information.
          </p>
        </template>
        <template #settings>
          <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">
            Settings content — Configuration options and preferences.
          </p>
        </template>
      </Tabs>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  render: (args) => ({
    components: { Tabs, GlassFilterProvider },
    setup() {
      const activeTab = ref('overview');
      return { args, activeTab, DEMO_TABS };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <Tabs
            v-bind="args"
            :tabs="DEMO_TABS"
            v-model="activeTab"
            style="width: 420px;"
          >
            <template #overview>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.6;">
                Overview content — A summary with key highlights.
              </p>
            </template>
            <template #details>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.6;">
                Details content — In-depth specifications.
              </p>
            </template>
            <template #settings>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.6;">
                Settings content — Configuration options.
              </p>
            </template>
          </Tabs>
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
    components: { Tabs, GlassFilterProvider },
    setup() {
      const activeTab = ref('overview');
      return { args, activeTab, DEMO_TABS };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 16px;
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <Tabs
            v-bind="args"
            :tabs="DEMO_TABS"
            v-model="activeTab"
            style="width: 420px;"
          >
            <template #overview>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.6;">
                Overview content — A summary with key highlights.
              </p>
            </template>
            <template #details>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.6;">
                Details content — In-depth specifications.
              </p>
            </template>
            <template #settings>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.6;">
                Settings content — Configuration options.
              </p>
            </template>
          </Tabs>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 兩種 Glass 變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { Tabs, GlassFilterProvider },
    setup() {
      const activeTab1 = ref('overview');
      const activeTab2 = ref('overview');
      const activeTab3 = ref('overview');
      const activeTab4 = ref('overview');
      return { activeTab1, activeTab2, activeTab3, activeTab4, DEMO_TABS };
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
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <Tabs variant="glass-css-only" :tabs="DEMO_TABS" v-model="activeTab1">
                  <template #overview><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Overview content here.</p></template>
                  <template #details><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Details content here.</p></template>
                  <template #settings><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Settings content here.</p></template>
                </Tabs>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <Tabs variant="glass-highlight-layered" :tabs="DEMO_TABS" v-model="activeTab2">
                  <template #overview><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Overview content here.</p></template>
                  <template #details><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Details content here.</p></template>
                  <template #settings><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Settings content here.</p></template>
                </Tabs>
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
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <Tabs variant="glass-css-only" :tabs="DEMO_TABS" v-model="activeTab3">
                  <template #overview><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Overview content here.</p></template>
                  <template #details><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Details content here.</p></template>
                  <template #settings><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Settings content here.</p></template>
                </Tabs>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <Tabs variant="glass-highlight-layered" :tabs="DEMO_TABS" v-model="activeTab4">
                  <template #overview><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Overview content here.</p></template>
                  <template #details><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Details content here.</p></template>
                  <template #settings><p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">Settings content here.</p></template>
                </Tabs>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};
