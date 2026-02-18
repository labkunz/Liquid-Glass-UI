import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';
import { ToastProvider, useToast } from '@liquid/logic';
import { LiquidButton, LiquidStack } from '@liquid/ui';

// ToastProvider 需要掛在根層；Storybook 每個 story 的 render 包含它即可

const meta = {
  title: 'Logic/useToast',
  // 沒有單一 component，用 render 展示
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
\`useToast\` 是命令式 Toast composable。

**使用前提：** 在 App 根層掛載 \`<ToastProvider />\` 一次。

\`\`\`ts
import { useToast, ToastProvider } from '@liquid/logic'

const { toast } = useToast()

toast.success('儲存成功')
toast.error('操作失敗', { position: 'top-center' })
toast.info('提示訊息',  { duration: 0 })   // duration: 0 不自動關閉
toast.warning('警告')
toast.dismiss(id)  // 手動關閉特定 toast
toast.clear()      // 關閉全部
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Stories ------------------------------------------------

/** 四種 type 按鈕觸發 */
export const AllTypes: Story = {
  render: () => ({
    components: { ToastProvider, LiquidButton, LiquidStack },
    setup() {
      const { toast } = useToast();
      return {
        showInfo:    () => toast.info('這是一則資訊通知'),
        showSuccess: () => toast.success('操作成功完成！'),
        showWarning: () => toast.warning('請注意此操作不可還原'),
        showError:   () => toast.error('發生錯誤，請重試'),
      };
    },
    template: `
      <ToastProvider />
      <div style="padding: 2rem; display: flex; gap: 12px; flex-wrap: wrap;">
        <LiquidButton variant="primary"   @click="showInfo">    Info    </LiquidButton>
        <LiquidButton variant="primary"   @click="showSuccess"> Success </LiquidButton>
        <LiquidButton variant="secondary" @click="showWarning"> Warning </LiquidButton>
        <LiquidButton variant="outline"   @click="showError">   Error   </LiquidButton>
      </div>
    `,
  }),
};

/** 不同位置展示 */
export const Positions: Story = {
  render: () => ({
    components: { ToastProvider, LiquidButton },
    setup() {
      const { toast } = useToast();
      const positions = [
        'top-left', 'top-center', 'top-right',
        'bottom-left', 'bottom-center', 'bottom-right',
      ] as const;
      const show = (pos: typeof positions[number]) =>
        toast.info(`位置：${pos}`, { position: pos });
      return { positions, show };
    },
    template: `
      <ToastProvider />
      <div style="padding: 2rem; display: grid; grid-template-columns: repeat(3, auto); gap: 8px; width: fit-content;">
        <LiquidButton v-for="pos in positions" :key="pos" size="sm" variant="outline"
          @click="show(pos)">
          {{ pos }}
        </LiquidButton>
      </div>
    `,
  }),
};

/** duration: 0 → 不自動關閉，需手動 dismiss */
export const ManualDismiss: Story = {
  render: () => ({
    components: { ToastProvider, LiquidButton },
    setup() {
      const { toast } = useToast();
      let lastId = '';
      const show = () => {
        lastId = toast.info('此 Toast 不會自動消失（duration: 0）', { duration: 0 });
      };
      const dismiss = () => toast.dismiss(lastId);
      const clear   = () => toast.clear();
      return { show, dismiss, clear };
    },
    template: `
      <ToastProvider />
      <div style="padding: 2rem; display: flex; gap: 12px;">
        <LiquidButton @click="show">    顯示（不自動關閉）</LiquidButton>
        <LiquidButton variant="outline" @click="dismiss"> 關閉最後一則  </LiquidButton>
        <LiquidButton variant="outline" @click="clear">   清除全部      </LiquidButton>
      </div>
    `,
  }),
};

/** Glass 樣式變體 */
export const GlassVariant: Story = {
  render: () => ({
    components: { ToastProvider, LiquidButton },
    setup() {
      const { toast } = useToast();
      return {
        showGlass:        () => toast.success('Glass CSS Only', { variant: 'glass-css-only', duration: 4000 }),
        showGlassLayered: () => toast.success('Glass Highlight Layered', { variant: 'glass-highlight-layered', duration: 4000 }),
      };
    },
    template: `
      <ToastProvider />
      <div style="padding: 2rem; display: flex; gap: 12px;">
        <LiquidButton @click="showGlass">        glass-css-only           </LiquidButton>
        <LiquidButton @click="showGlassLayered"> glass-highlight-layered  </LiquidButton>
      </div>
    `,
  }),
};
