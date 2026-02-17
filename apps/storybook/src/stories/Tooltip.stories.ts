import type { Meta, StoryObj } from '@storybook/vue3';
import { Tooltip, GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'Tooltip 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    content: {
      control: 'text',
      description: 'Tooltip 顯示的文字內容',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip 出現的位置',
      table: {
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
        defaultValue: { summary: 'top' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用 Tooltip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'default',
    content: '這是提示文字',
    placement: 'top',
    disabled: false,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    placement: 'top',
    content: '這是提示文字',
  },
  render: (args) => ({
    components: { Tooltip, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 200px; display: flex; align-items: center; justify-content: center; gap: 2rem; border-radius: 12px; padding: 3rem;">
          <Tooltip v-bind="args" content="這是提示文字">
            <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
              懸停查看提示
            </button>
          </Tooltip>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 四個方向並排展示
export const Placements: Story = {
  render: () => ({
    components: { Tooltip, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 300px; display: flex; align-items: center; justify-content: center; gap: 3rem; border-radius: 12px; padding: 4rem;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <p style="color: rgba(255,255,255,0.7); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">top</p>
            <Tooltip variant="default" placement="top" content="上方提示">
              <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                Top
              </button>
            </Tooltip>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <p style="color: rgba(255,255,255,0.7); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">bottom</p>
            <Tooltip variant="default" placement="bottom" content="下方提示">
              <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                Bottom
              </button>
            </Tooltip>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <p style="color: rgba(255,255,255,0.7); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">left</p>
            <Tooltip variant="default" placement="left" content="左側提示">
              <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                Left
              </button>
            </Tooltip>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <p style="color: rgba(255,255,255,0.7); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">right</p>
            <Tooltip variant="default" placement="right" content="右側提示">
              <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                Right
              </button>
            </Tooltip>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    placement: 'top',
    content: '玻璃效果提示',
  },
  render: (args) => ({
    components: { Tooltip, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 200px; display: flex; align-items: center; justify-content: center; gap: 2rem; border-radius: 12px; padding: 3rem;">
          <Tooltip v-bind="args" content="玻璃效果提示">
            <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
              懸停查看提示
            </button>
          </Tooltip>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    placement: 'top',
    content: '高光玻璃提示',
  },
  render: (args) => ({
    components: { Tooltip, GlassFilterProvider },
    setup() {
      return { args };
    },
    template: `
      <GlassFilterProvider>
        <div style="background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); min-height: 200px; display: flex; align-items: center; justify-content: center; gap: 2rem; border-radius: 12px; padding: 3rem;">
          <Tooltip v-bind="args" content="高光玻璃提示">
            <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
              懸停查看提示
            </button>
          </Tooltip>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { Tooltip, GlassFilterProvider },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">

          <!-- Purple Gradient -->
          <div style="
            padding: 3rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            min-height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4rem;
          ">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
              <Tooltip variant="glass-css-only" placement="top" content="純 CSS 玻璃效果">
                <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                  CSS Only
                </button>
              </Tooltip>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
              <Tooltip variant="glass-highlight-layered" placement="top" content="高光層疊玻璃效果">
                <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                  Highlight Layered
                </button>
              </Tooltip>
            </div>
          </div>

          <!-- Dark Ocean -->
          <div style="
            padding: 3rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 16px;
            min-height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4rem;
          ">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
              <Tooltip variant="glass-css-only" placement="top" content="深色背景玻璃">
                <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white; cursor: pointer;">
                  CSS Only
                </button>
              </Tooltip>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
              <Tooltip variant="glass-highlight-layered" placement="top" content="深色高光玻璃">
                <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white; cursor: pointer;">
                  Highlight Layered
                </button>
              </Tooltip>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// 所有變體並排展示
export const AllVariants: Story = {
  render: () => ({
    components: { Tooltip, GlassFilterProvider },
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
          gap: 3rem;
        ">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">default</p>
            <Tooltip variant="default" placement="top" content="預設樣式提示">
              <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                懸停查看提示
              </button>
            </Tooltip>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
            <Tooltip variant="glass-css-only" placement="top" content="玻璃效果提示">
              <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                懸停查看提示
              </button>
            </Tooltip>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
            <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
            <Tooltip variant="glass-highlight-layered" placement="top" content="高光玻璃提示">
              <button style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; cursor: pointer;">
                懸停查看提示
              </button>
            </Tooltip>
          </div>
        </div>
      </GlassFilterProvider>
    `,
  }),
};
