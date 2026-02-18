import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { ModalProvider, useModal } from '@liquid/logic';
import { LiquidButton } from '@liquid/ui';

const meta = {
  title: 'Logic/useModal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
\`useModal\` 是命令式 Modal composable。

**使用前提：** 在 App 根層掛載 \`<ModalProvider />\` 一次。

\`\`\`ts
import { useModal, ModalProvider } from '@liquid/logic'

const { modal } = useModal()

// 一般開啟
modal.open({ title: '標題', content: '內文', size: 'md' })

// 確認對話框（await Promise）
const confirmed = await modal.confirm({
  title: '確認刪除？',
  message: '此操作無法還原，確定要繼續嗎？',
  confirmLabel: '刪除',
  cancelLabel:  '取消',
})
if (confirmed) { /* 執行刪除 */ }

// 關閉
modal.close()
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Stories ------------------------------------------------

/** 基本開啟 / 關閉 */
export const BasicOpen: Story = {
  render: () => ({
    components: { ModalProvider, LiquidButton },
    setup() {
      const { modal } = useModal();
      const open = () => modal.open({
        title:   '歡迎使用 Liquid UI',
        content: '這是一個透過 useModal() 開啟的 Modal，不需要在模板中宣告任何狀態。',
        size:    'md',
      });
      return { open };
    },
    template: `
      <ModalProvider />
      <div style="padding: 2rem;">
        <LiquidButton @click="open">開啟 Modal</LiquidButton>
      </div>
    `,
  }),
};

/** confirm 模式：await Promise */
export const ConfirmDialog: Story = {
  render: () => ({
    components: { ModalProvider, LiquidButton },
    setup() {
      const { modal } = useModal();
      const result = ref<string>('尚未操作');

      const confirmDelete = async () => {
        const ok = await modal.confirm({
          title:        '確認刪除？',
          message:      '此操作無法還原，刪除後資料將永久移除，確定要繼續嗎？',
          confirmLabel: '刪除',
          cancelLabel:  '取消',
          size:         'sm',
        });
        result.value = ok ? '✅ 使用者確認刪除' : '❌ 使用者取消';
      };

      return { confirmDelete, result };
    },
    template: `
      <ModalProvider />
      <div style="padding: 2rem; display: flex; align-items: center; gap: 16px;">
        <LiquidButton variant="outline" @click="confirmDelete">刪除資料</LiquidButton>
        <span style="font-size: 14px; color: #374151;">{{ result }}</span>
      </div>
    `,
  }),
};

/** 尺寸比較 */
export const Sizes: Story = {
  render: () => ({
    components: { ModalProvider, LiquidButton },
    setup() {
      const { modal } = useModal();
      const open = (size: 'sm' | 'md' | 'lg' | 'xl') =>
        modal.open({
          title:   `size: ${size}`,
          content: `這是 ${size} 尺寸的 Modal，可透過 size 屬性調整寬度。`,
          size,
        });
      return { open };
    },
    template: `
      <ModalProvider />
      <div style="padding: 2rem; display: flex; gap: 8px; flex-wrap: wrap;">
        <LiquidButton size="sm" variant="outline" @click="open('sm')"> sm </LiquidButton>
        <LiquidButton size="sm" variant="outline" @click="open('md')"> md </LiquidButton>
        <LiquidButton size="sm" variant="outline" @click="open('lg')"> lg </LiquidButton>
        <LiquidButton size="sm" variant="outline" @click="open('xl')"> xl </LiquidButton>
      </div>
    `,
  }),
};

/** Glass 樣式變體 */
export const GlassVariant: Story = {
  render: () => ({
    components: { ModalProvider, LiquidButton },
    setup() {
      const { modal } = useModal();
      const openGlass = () => modal.open({
        title:   'Glass CSS Only',
        content: '使用 glass-css-only 樣式的 Modal。',
        variant: 'glass-css-only',
      });
      const openLayered = () => modal.open({
        title:   'Glass Highlight Layered',
        content: '使用 glass-highlight-layered 樣式的 Modal。',
        variant: 'glass-highlight-layered',
      });
      return { openGlass, openLayered };
    },
    template: `
      <ModalProvider />
      <div style="padding: 2rem; display: flex; gap: 8px;">
        <LiquidButton @click="openGlass">   glass-css-only          </LiquidButton>
        <LiquidButton @click="openLayered"> glass-highlight-layered </LiquidButton>
      </div>
    `,
  }),
};

/** 連續 confirm：展示 Promise chain 用法 */
export const ChainedConfirm: Story = {
  render: () => ({
    components: { ModalProvider, LiquidButton },
    setup() {
      const { modal } = useModal();
      const result = ref<string>('尚未操作');

      const run = async () => {
        const step1 = await modal.confirm({
          title: '步驟 1 of 2',
          message: '確定要開始流程嗎？',
        });
        if (!step1) { result.value = '❌ 第一步取消'; return; }

        const step2 = await modal.confirm({
          title: '步驟 2 of 2',
          message: '確認執行最終操作？',
          confirmLabel: '執行',
        });
        result.value = step2 ? '✅ 流程完成！' : '❌ 第二步取消';
      };

      return { run, result };
    },
    template: `
      <ModalProvider />
      <div style="padding: 2rem; display: flex; align-items: center; gap: 16px;">
        <LiquidButton @click="run">開始兩步驟流程</LiquidButton>
        <span style="font-size: 14px; color: #374151;">{{ result }}</span>
      </div>
    `,
  }),
};
