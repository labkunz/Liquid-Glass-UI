import type { Meta, StoryObj } from '@storybook/vue3';
import { TableEngine } from '@liquid/logic';
import type { ColumnSchema } from '@liquid/logic';

// ---- 示範資料 ------------------------------------------------

const COLUMNS: ColumnSchema[] = [
  { key: 'name',   label: '姓名',   width: '160px', sortable: true, filterable: true },
  { key: 'role',   label: '職位',   width: '160px', sortable: true, filterable: true },
  { key: 'dept',   label: '部門',   width: '120px', sortable: true },
  { key: 'salary', label: '薪資',   width: '120px', align: 'right', sortable: true,
    formatter: (v) => `NT$ ${Number(v).toLocaleString()}` },
  { key: 'status', label: '狀態',   width: '100px', align: 'center' },
  { key: 'date',   label: '加入日期', width: '140px', sortable: true },
];

// 產生 30 筆假資料，用於分頁展示
const NAMES   = ['陳小明','林美華','王大偉','張雅婷','李俊宏','吳怡靜','劉建志','黃淑芬','蔡宗翰','周雅文'];
const ROLES   = ['前端工程師','後端工程師','設計師','產品經理','DevOps','QA工程師'];
const DEPTS   = ['工程部','設計部','產品部','行銷部'];
const STATUSES = ['在職','休假','出差'];

const ROWS = Array.from({ length: 30 }, (_, i) => ({
  name:   NAMES[i % NAMES.length],
  role:   ROLES[i % ROLES.length],
  dept:   DEPTS[i % DEPTS.length],
  salary: 45000 + (i * 1500),
  status: STATUSES[i % STATUSES.length],
  date:   `202${Math.floor(i / 10) + 1}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
}));

// ---- Meta ---------------------------------------------------

const meta = {
  title: 'Logic/TableEngine',
  component: TableEngine,
  tags: ['autodocs'],
  argTypes: {
    pageSize: {
      control: { type: 'select' },
      options: [5, 10, 20],
      description: '每頁筆數',
    },
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: '樣式變體',
    },
    striped: {
      control: 'boolean',
      description: '斑馬紋',
    },
    hoverable: {
      control: 'boolean',
      description: '列 hover 高亮',
    },
    showPagination: {
      control: 'boolean',
      description: '顯示分頁列',
    },
  },
  args: {
    pageSize:       10,
    variant:        'default',
    striped:        false,
    hoverable:      true,
    showPagination: true,
  },
} satisfies Meta<typeof TableEngine>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Stories ------------------------------------------------

/** 基本用法：排序 + 過濾 + 分頁 */
export const Default: Story = {
  render: (args) => ({
    components: { TableEngine },
    setup() {
      return { args, columns: COLUMNS, rows: ROWS };
    },
    template: `
      <div style="padding: 2rem; background: #f5f7fa; border-radius: 12px;">
        <p style="margin: 0 0 1rem; font-size: 13px; color: #6b7280;">
          點擊欄位標題可排序，輸入文字可過濾（姓名、職位欄位有啟用）
        </p>
        <TableEngine v-bind="args" :columns="columns" :rows="rows" />
      </div>
    `,
  }),
};

/** 每頁 5 筆，展示多頁分頁 */
export const SmallPageSize: Story = {
  args: { pageSize: 5, striped: true },
  render: (args) => ({
    components: { TableEngine },
    setup() {
      return { args, columns: COLUMNS, rows: ROWS };
    },
    template: `
      <div style="padding: 2rem; background: #f5f7fa; border-radius: 12px;">
        <TableEngine v-bind="args" :columns="columns" :rows="rows" />
      </div>
    `,
  }),
};

/** 自訂 formatter：薪資格式化 */
export const WithFormatter: Story = {
  render: () => ({
    components: { TableEngine },
    setup() {
      const cols: ColumnSchema[] = [
        { key: 'name',   label: '姓名', sortable: true },
        { key: 'salary', label: '月薪', align: 'right', sortable: true,
          formatter: (v) => `💰 NT$ ${Number(v).toLocaleString()}` },
        { key: 'bonus',  label: '年終', align: 'right',
          formatter: (v, row) => `${Number(v)}個月 (${(Number(row.salary) * Number(v)).toLocaleString()})` },
      ];
      const rows = [
        { name: '陳小明', salary: 60000, bonus: 3 },
        { name: '林美華', salary: 75000, bonus: 4 },
        { name: '王大偉', salary: 90000, bonus: 5 },
      ];
      return { cols, rows };
    },
    template: `
      <div style="padding: 2rem; background: #f5f7fa; border-radius: 12px;">
        <TableEngine :columns="cols" :rows="rows" :page-size="10" />
      </div>
    `,
  }),
};

/** 空資料狀態 */
export const Empty: Story = {
  render: () => ({
    components: { TableEngine },
    setup() {
      return { columns: COLUMNS };
    },
    template: `
      <div style="padding: 2rem; background: #f5f7fa; border-radius: 12px;">
        <TableEngine :columns="columns" :rows="[]" :page-size="10" />
      </div>
    `,
  }),
};
