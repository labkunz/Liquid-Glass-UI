import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { LiquidPagination } from '@liquid/ui';
import { GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/LiquidPagination',
  component: LiquidPagination,
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '分頁尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    totalPages: {
      control: 'number',
      description: '總頁數',
      table: {
        type: { summary: 'number' },
      },
    },
    showPrevNext: {
      control: 'boolean',
      description: '是否顯示上一頁/下一頁按鈕',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    totalPages: 10,
    showPrevNext: true,
  },
} satisfies Meta<typeof LiquidPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    totalPages: 10,
  },
  render: (args) => ({
    components: { LiquidPagination },
    setup() {
      const currentPage = ref(3);
      return { args, currentPage };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px;">
        <LiquidPagination
          v-bind="args"
          v-model:currentPage="currentPage"
        />
        <p style="margin-top: 1rem; color: #666; font-size: 13px;">Current page: {{ currentPage }}</p>
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    totalPages: 10,
  },
  render: (args) => ({
    components: { LiquidPagination, GlassFilterProvider },
    setup() {
      const currentPage = ref(3);
      return { args, currentPage };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        ">
          <LiquidPagination
            v-bind="args"
            v-model:currentPage="currentPage"
          />
          <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">Current page: {{ currentPage }}</p>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    totalPages: 10,
  },
  render: (args) => ({
    components: { LiquidPagination, GlassFilterProvider },
    setup() {
      const currentPage = ref(3);
      return { args, currentPage };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 3rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        ">
          <LiquidPagination
            v-bind="args"
            v-model:currentPage="currentPage"
          />
          <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">Current page: {{ currentPage }}</p>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { LiquidPagination, GlassFilterProvider },
    setup() {
      const currentPageA = ref(3);
      const currentPageB = ref(3);
      const currentPageC = ref(3);
      const currentPageD = ref(3);
      return { currentPageA, currentPageB, currentPageC, currentPageD };
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
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidPagination variant="glass-css-only" :totalPages="10" v-model:currentPage="currentPageA" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidPagination variant="glass-highlight-layered" :totalPages="10" v-model:currentPage="currentPageB" />
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
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <LiquidPagination variant="glass-css-only" :totalPages="10" v-model:currentPage="currentPageC" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <LiquidPagination variant="glass-highlight-layered" :totalPages="10" v-model:currentPage="currentPageD" />
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Sizes 比較
export const Sizes: Story = {
  render: () => ({
    components: { LiquidPagination },
    setup() {
      const currentPageSm = ref(3);
      const currentPageMd = ref(3);
      const currentPageLg = ref(3);
      return { currentPageSm, currentPageMd, currentPageLg };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px; display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">size="sm"</p>
          <LiquidPagination variant="default" size="sm" :totalPages="10" v-model:currentPage="currentPageSm" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">size="md" (default)</p>
          <LiquidPagination variant="default" size="md" :totalPages="10" v-model:currentPage="currentPageMd" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">size="lg"</p>
          <LiquidPagination variant="default" size="lg" :totalPages="10" v-model:currentPage="currentPageLg" />
        </div>
      </div>
    `,
  }),
};

// Many Pages - 顯示省略號行為
export const ManyPages: Story = {
  args: {
    variant: 'default',
    totalPages: 50,
  },
  render: (args) => ({
    components: { LiquidPagination },
    setup() {
      const currentPage = ref(3);
      return { args, currentPage };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px; display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem;">50 pages — near start (page {{ currentPage }})</p>
          <LiquidPagination
            v-bind="args"
            v-model:currentPage="currentPage"
          />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem;">50 pages — middle (page 25)</p>
          <LiquidPagination variant="default" :totalPages="50" :currentPage="25" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.75rem;">50 pages — near end (page 48)</p>
          <LiquidPagination variant="default" :totalPages="50" :currentPage="48" />
        </div>
        <p style="margin: 0; color: #666; font-size: 13px;">Interactive page: {{ currentPage }}</p>
      </div>
    `,
  }),
};
