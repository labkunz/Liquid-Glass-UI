import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Modal } from '@liquid/ui';
import { GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'Modal 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Modal 尺寸',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
    },
    title: {
      control: 'text',
      description: 'Modal 標題文字',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showClose: {
      control: 'boolean',
      description: '是否顯示關閉按鈕',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    title: '對話框標題',
    showClose: true,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Modal, GlassFilterProvider },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          background: #f8f9fa;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 2rem;
        ">
          <button
            @click="isOpen = true"
            style="
              padding: 0.625rem 1.25rem;
              border-radius: 8px;
              background: #212529;
              color: white;
              border: none;
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;
            "
          >
            開啟 Modal
          </button>
          <Modal v-bind="args" v-model="isOpen" title="對話框標題">
            <p style="margin: 0; color: #495057; line-height: 1.6;">
              這是 Modal 的內容區域。可以放置任何內容，例如表單、資訊說明或確認訊息。
            </p>
            <template #footer>
              <button
                @click="isOpen = false"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: transparent; border: 1px solid #dee2e6; cursor: pointer; font-size: 14px; color: #495057;"
              >
                取消
              </button>
              <button
                @click="isOpen = false"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: #212529; color: white; border: none; cursor: pointer; font-size: 14px;"
              >
                確認
              </button>
            </template>
          </Modal>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
  },
  render: (args) => ({
    components: { Modal, GlassFilterProvider },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 2rem;
        ">
          <button
            @click="isOpen = true"
            style="
              padding: 0.625rem 1.25rem;
              border-radius: 8px;
              background: rgba(255, 255, 255, 0.2);
              color: white;
              border: 1px solid rgba(255, 255, 255, 0.4);
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            "
          >
            開啟 Glass Modal
          </button>
          <Modal v-bind="args" v-model="isOpen" title="Glass 對話框">
            <p style="margin: 0; color: rgba(255,255,255,0.85); line-height: 1.6;">
              Pure CSS glassmorphism modal。使用 backdrop-filter 和漸層疊加實現玻璃效果，無需 SVG filter。
            </p>
            <template #footer>
              <button
                @click="isOpen = false"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: transparent; border: 1px solid rgba(255,255,255,0.3); cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.8);"
              >
                取消
              </button>
              <button
                @click="isOpen = false"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: rgba(255,255,255,0.25); color: white; border: 1px solid rgba(255,255,255,0.4); cursor: pointer; font-size: 14px;"
              >
                確認
              </button>
            </template>
          </Modal>
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
    components: { Modal, GlassFilterProvider },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 2rem;
        ">
          <button
            @click="isOpen = true"
            style="
              padding: 0.625rem 1.25rem;
              border-radius: 8px;
              background: rgba(255, 255, 255, 0.2);
              color: white;
              border: 1px solid rgba(255, 255, 255, 0.4);
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            "
          >
            開啟 Layered Modal
          </button>
          <Modal v-bind="args" v-model="isOpen" title="Highlight Layered 對話框">
            <p style="margin: 0; color: rgba(255,255,255,0.85); line-height: 1.6;">
              Layered glass modal 使用 SVG filter 搭配 radial-gradient 頂部亮光，呈現最高品質的液態玻璃效果。
            </p>
            <template #footer>
              <button
                @click="isOpen = false"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: transparent; border: 1px solid rgba(255,255,255,0.3); cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.8);"
              >
                取消
              </button>
              <button
                @click="isOpen = false"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: rgba(255,255,255,0.25); color: white; border: 1px solid rgba(255,255,255,0.4); cursor: pointer; font-size: 14px;"
              >
                確認
              </button>
            </template>
          </Modal>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比
export const GlassComparison: Story = {
  render: () => ({
    components: { Modal, GlassFilterProvider },
    setup() {
      const isOpenCssOnly = ref(false);
      const isOpenLayered = ref(false);
      return { isOpenCssOnly, isOpenLayered };
    },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">

          <!-- Purple Gradient -->
          <div style="
            padding: 2.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            display: flex;
            gap: 1rem;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
          ">
            <p style="color: white; margin: 0; width: 100%; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">
              Purple Gradient — Glass Variants Comparison
            </p>

            <div>
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
              <button
                @click="isOpenCssOnly = true"
                style="
                  padding: 0.625rem 1.25rem;
                  border-radius: 8px;
                  background: rgba(255, 255, 255, 0.2);
                  color: white;
                  border: 1px solid rgba(255, 255, 255, 0.35);
                  cursor: pointer;
                  font-size: 14px;
                  backdrop-filter: blur(8px);
                  -webkit-backdrop-filter: blur(8px);
                "
              >
                CSS Only Modal
              </button>
            </div>

            <div>
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
              <button
                @click="isOpenLayered = true"
                style="
                  padding: 0.625rem 1.25rem;
                  border-radius: 8px;
                  background: rgba(255, 255, 255, 0.2);
                  color: white;
                  border: 1px solid rgba(255, 255, 255, 0.35);
                  cursor: pointer;
                  font-size: 14px;
                  backdrop-filter: blur(8px);
                  -webkit-backdrop-filter: blur(8px);
                "
              >
                Layered Modal
              </button>
            </div>
          </div>

          <!-- Modals -->
          <Modal v-model="isOpenCssOnly" variant="glass-css-only" title="CSS Only Glass">
            <p style="margin: 0; color: rgba(255,255,255,0.85); line-height: 1.6;">
              Pure CSS glassmorphism. backdrop-filter + gradient overlay. No SVG required.
            </p>
            <template #footer>
              <button @click="isOpenCssOnly = false" style="padding: 0.5rem 1rem; border-radius: 6px; background: transparent; border: 1px solid rgba(255,255,255,0.3); cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.8);">關閉</button>
            </template>
          </Modal>

          <Modal v-model="isOpenLayered" variant="glass-highlight-layered" title="Highlight Layered Glass">
            <p style="margin: 0; color: rgba(255,255,255,0.85); line-height: 1.6;">
              Layered glass with SVG highlight filter and radial gradient top-light. Best visual quality.
            </p>
            <template #footer>
              <button @click="isOpenLayered = false" style="padding: 0.5rem 1rem; border-radius: 6px; background: transparent; border: 1px solid rgba(255,255,255,0.3); cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.8);">關閉</button>
            </template>
          </Modal>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Size 變體展示
export const Sizes: Story = {
  render: () => ({
    components: { Modal, GlassFilterProvider },
    setup() {
      const openSize = ref<string | null>(null);
      return { openSize };
    },
    template: `
      <GlassFilterProvider>
        <div style="
          background: #f8f9fa;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 2rem;
          gap: 1rem;
          flex-wrap: wrap;
        ">
          <div v-for="size in ['sm', 'md', 'lg', 'xl']" :key="size">
            <p style="color: #6c757d; font-size: 11px; margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.08em; text-align: center;">{{ size }}</p>
            <button
              @click="openSize = size"
              style="
                padding: 0.5rem 1rem;
                border-radius: 8px;
                background: #212529;
                color: white;
                border: none;
                cursor: pointer;
                font-size: 13px;
                min-width: 80px;
              "
            >
              {{ size.toUpperCase() }}
            </button>
          </div>

          <Modal
            v-for="size in ['sm', 'md', 'lg', 'xl']"
            :key="size"
            :modelValue="openSize === size"
            @update:modelValue="openSize = null"
            variant="default"
            :size="size"
            :title="size.toUpperCase() + ' — 尺寸展示'"
          >
            <p style="margin: 0; color: #495057; line-height: 1.6;">
              這是 <strong>{{ size }}</strong> 尺寸的 Modal。max-width:
              <span v-if="size === 'sm'">400px</span>
              <span v-if="size === 'md'">560px</span>
              <span v-if="size === 'lg'">720px</span>
              <span v-if="size === 'xl'">960px</span>
            </p>
            <template #footer>
              <button
                @click="openSize = null"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: transparent; border: 1px solid #dee2e6; cursor: pointer; font-size: 14px; color: #495057;"
              >
                關閉
              </button>
              <button
                @click="openSize = null"
                style="padding: 0.5rem 1rem; border-radius: 6px; background: #212529; color: white; border: none; cursor: pointer; font-size: 14px;"
              >
                確認
              </button>
            </template>
          </Modal>
        </div>
      </GlassFilterProvider>
    `,
  }),
};
