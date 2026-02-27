import type { Meta, StoryObj } from '@storybook/vue3';
import { LiquidTable, GlassFilterProvider } from '@liquid/ui';

const DEMO_COLUMNS = [
  { key: 'name', label: '姓名', width: '180px' },
  { key: 'role', label: '職位', width: '140px' },
  { key: 'status', label: '狀態', align: 'center' as const, width: '100px' },
  { key: 'date', label: '加入日期', width: '140px' },
];

const DEMO_ROWS = [
  { name: '陳小明', role: '前端工程師', status: '在職', date: '2023-03-15' },
  { name: '林美華', role: '設計師', status: '在職', date: '2022-11-01' },
  { name: '王大偉', role: '後端工程師', status: '休假', date: '2023-06-20' },
  { name: '張雅婷', role: '產品經理', status: '在職', date: '2021-08-10' },
];

const meta = {
  title: 'Components/LiquidTable',
  component: LiquidTable,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '表格樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    striped: {
      control: 'boolean',
      description: '斑馬紋（偶數列背景）',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hoverable: {
      control: 'boolean',
      description: '滑鼠懸停列高亮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    variant: 'default',
    striped: false,
    hoverable: true,
    columns: DEMO_COLUMNS,
    data: DEMO_ROWS,
  },
} satisfies Meta<typeof LiquidTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    striped: true,
    hoverable: true,
  },
  render: (args) => ({
    components: { LiquidTable },
    setup() {
      return { args, columns: DEMO_COLUMNS, rows: DEMO_ROWS };
    },
    template: `
      <div style="padding: 2rem; background: #f5f7fa; border-radius: 12px;">
        <LiquidTable v-bind="args" :columns="columns" :rows="rows" />
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    striped: false,
    hoverable: true,
  },
  render: (args) => ({
    components: { LiquidTable, GlassFilterProvider },
    setup() {
      return { args, columns: DEMO_COLUMNS, rows: DEMO_ROWS };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 2rem;
          background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
          border-radius: 16px;
          min-height: 300px;
        ">
          <LiquidTable v-bind="args" :columns="columns" :rows="rows" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    striped: false,
    hoverable: true,
  },
  render: (args) => ({
    components: { LiquidTable, GlassFilterProvider },
    setup() {
      return { args, columns: DEMO_COLUMNS, rows: DEMO_ROWS };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          padding: 2rem;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          border-radius: 16px;
          min-height: 300px;
        ">
          <LiquidTable v-bind="args" :columns="columns" :rows="rows" />
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比（垂直排列）
export const GlassComparison: Story = {
  render: () => ({
    components: { LiquidTable, GlassFilterProvider },
    setup() {
      return { columns: DEMO_COLUMNS, rows: DEMO_ROWS };
    },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">

          <!-- Dark Purple Gradient -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
            border-radius: 16px;
          ">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only — Dark Purple Gradient</p>
            <LiquidTable variant="glass-css-only" :columns="columns" :rows="rows" :hoverable="true" />
          </div>

          <!-- Dark Purple Gradient — Highlight Layered -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
            border-radius: 16px;
          ">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered — Dark Purple Gradient</p>
            <LiquidTable variant="glass-highlight-layered" :columns="columns" :rows="rows" :hoverable="true" />
          </div>

          <!-- Dark Ocean Gradient -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only — Dark Ocean Gradient</p>
            <LiquidTable variant="glass-css-only" :columns="columns" :rows="rows" :hoverable="true" />
          </div>

          <!-- Dark Ocean Gradient — Highlight Layered -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
          ">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 1rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered — Dark Ocean Gradient</p>
            <LiquidTable variant="glass-highlight-layered" :columns="columns" :rows="rows" :hoverable="true" />
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Striped 變體展示
export const Striped: Story = {
  args: {
    variant: 'default',
    striped: true,
    hoverable: true,
  },
  render: (args) => ({
    components: { LiquidTable },
    setup() {
      return { args, columns: DEMO_COLUMNS, rows: DEMO_ROWS };
    },
    template: `
      <div style="padding: 2rem; background: #f5f7fa; border-radius: 12px;">
        <LiquidTable v-bind="args" :columns="columns" :rows="rows" />
      </div>
    `,
  }),
};

// Empty 空資料狀態
export const Empty: Story = {
  args: {
    variant: 'default',
    striped: false,
    hoverable: true,
  },
  render: (args) => ({
    components: { LiquidTable },
    setup() {
      return { args, columns: DEMO_COLUMNS };
    },
    template: `
      <div style="padding: 2rem; background: #f5f7fa; border-radius: 12px;">
        <LiquidTable v-bind="args" :columns="columns" :rows="[]" />
      </div>
    `,
  }),
};
