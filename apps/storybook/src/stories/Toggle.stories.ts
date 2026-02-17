import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Toggle } from '@liquid/ui';
import { GlassFilterProvider } from '@liquid/ui';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass-css-only', 'glass-highlight-layered'],
      description: 'Toggle 樣式變體',
      table: {
        type: { summary: "'default' | 'glass-css-only' | 'glass-highlight-layered'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Toggle 尺寸',
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
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    modelValue: {
      control: 'boolean',
      description: '開關狀態',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    label: '',
    disabled: false,
    modelValue: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default 變體
export const Default: Story = {
  args: {
    variant: 'default',
    label: '啟用通知',
  },
  render: (args) => ({
    components: { Toggle },
    setup() {
      const value = ref(false);
      return { args, value };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px; display: inline-flex; flex-direction: column; gap: 1rem;">
        <Toggle v-bind="args" v-model="value" />
        <p style="margin: 0; font-size: 12px; color: #666;">當前狀態：{{ value ? '開' : '關' }}</p>
      </div>
    `,
  }),
};

// Glass CSS Only 變體
export const GlassCssOnly: Story = {
  args: {
    variant: 'glass-css-only',
    label: '啟用通知',
  },
  render: (args) => ({
    components: { Toggle, GlassFilterProvider },
    setup() {
      const value = ref(false);
      return { args, value };
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
          min-height: 160px;
          justify-content: center;
        ">
          <Toggle v-bind="args" v-model="value" />
          <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7);">當前狀態：{{ value ? '開' : '關' }}</p>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass Highlight Layered 變體
export const GlassHighlightLayered: Story = {
  args: {
    variant: 'glass-highlight-layered',
    label: '啟用通知',
  },
  render: (args) => ({
    components: { Toggle, GlassFilterProvider },
    setup() {
      const value = ref(false);
      return { args, value };
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
          min-height: 160px;
          justify-content: center;
        ">
          <Toggle v-bind="args" v-model="value" />
          <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.7);">當前狀態：{{ value ? '開' : '關' }}</p>
        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Glass 兩種變體對比 — ON 與 OFF 狀態並排
export const GlassComparison: Story = {
  render: () => ({
    components: { Toggle, GlassFilterProvider },
    setup() {
      const cssOnlyOn = ref(true);
      const cssOnlyOff = ref(false);
      const layeredOn = ref(true);
      const layeredOff = ref(false);
      const cssOnlyOn2 = ref(true);
      const cssOnlyOff2 = ref(false);
      const layeredOn2 = ref(true);
      const layeredOff2 = ref(false);
      return {
        cssOnlyOn, cssOnlyOff,
        layeredOn, layeredOff,
        cssOnlyOn2, cssOnlyOff2,
        layeredOn2, layeredOff2,
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
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Toggle variant="glass-css-only" label="ON state" v-model="cssOnlyOn" />
                  <Toggle variant="glass-css-only" label="OFF state" v-model="cssOnlyOff" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Toggle variant="glass-highlight-layered" label="ON state" v-model="layeredOn" />
                  <Toggle variant="glass-highlight-layered" label="OFF state" v-model="layeredOff" />
                </div>
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
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-css-only</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Toggle variant="glass-css-only" label="ON state" v-model="cssOnlyOn2" />
                  <Toggle variant="glass-css-only" label="OFF state" v-model="cssOnlyOff2" />
                </div>
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">glass-highlight-layered</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <Toggle variant="glass-highlight-layered" label="ON state" v-model="layeredOn2" />
                  <Toggle variant="glass-highlight-layered" label="OFF state" v-model="layeredOff2" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};

// Sizes 尺寸比較
export const Sizes: Story = {
  render: () => ({
    components: { Toggle },
    setup() {
      const smValue = ref(false);
      const mdValue = ref(false);
      const lgValue = ref(false);
      return { smValue, mdValue, lgValue };
    },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px; display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem;">size="sm"</p>
          <Toggle size="sm" label="小尺寸 Toggle" v-model="smValue" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem;">size="md" (預設)</p>
          <Toggle size="md" label="中尺寸 Toggle" v-model="mdValue" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem;">size="lg"</p>
          <Toggle size="lg" label="大尺寸 Toggle" v-model="lgValue" />
        </div>
      </div>
    `,
  }),
};

// Disabled 狀態
export const Disabled: Story = {
  render: () => ({
    components: { Toggle },
    template: `
      <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px; display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem;">disabled + OFF</p>
          <Toggle label="禁用（關閉）" disabled :model-value="false" />
        </div>
        <div>
          <p style="color: #666; font-size: 12px; margin: 0 0 0.5rem;">disabled + ON</p>
          <Toggle label="禁用（開啟）" disabled :model-value="true" />
        </div>
      </div>
    `,
  }),
};

// AllStates — 所有 variant 的 OFF / ON 展示
export const AllStates: Story = {
  render: () => ({
    components: { Toggle, GlassFilterProvider },
    setup() {
      const defaultOn = ref(true);
      const defaultOff = ref(false);
      const cssOn = ref(true);
      const cssOff = ref(false);
      const layOn = ref(true);
      const layOff = ref(false);
      return { defaultOn, defaultOff, cssOn, cssOff, layOn, layOff };
    },
    template: `
      <GlassFilterProvider>
        <div style="display: flex; flex-direction: column; gap: 2rem;">

          <!-- default -->
          <div style="padding: 2rem; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #555; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 1rem;">variant: default</p>
            <div style="display: flex; gap: 2rem;">
              <div>
                <p style="color: #999; font-size: 11px; margin: 0 0 0.4rem;">OFF</p>
                <Toggle variant="default" label="通知" v-model="defaultOff" />
              </div>
              <div>
                <p style="color: #999; font-size: 11px; margin: 0 0 0.4rem;">ON</p>
                <Toggle variant="default" label="通知" v-model="defaultOn" />
              </div>
            </div>
          </div>

          <!-- glass-css-only -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
          ">
            <p style="color: rgba(255,255,255,0.8); font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 1rem;">variant: glass-css-only</p>
            <div style="display: flex; gap: 2rem;">
              <div>
                <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0 0 0.4rem;">OFF</p>
                <Toggle variant="glass-css-only" label="通知" v-model="cssOff" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0 0 0.4rem;">ON</p>
                <Toggle variant="glass-css-only" label="通知" v-model="cssOn" />
              </div>
            </div>
          </div>

          <!-- glass-highlight-layered -->
          <div style="
            padding: 2rem;
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            border-radius: 12px;
          ">
            <p style="color: rgba(255,255,255,0.8); font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 1rem;">variant: glass-highlight-layered</p>
            <div style="display: flex; gap: 2rem;">
              <div>
                <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0 0 0.4rem;">OFF</p>
                <Toggle variant="glass-highlight-layered" label="通知" v-model="layOff" />
              </div>
              <div>
                <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0 0 0.4rem;">ON</p>
                <Toggle variant="glass-highlight-layered" label="通知" v-model="layOn" />
              </div>
            </div>
          </div>

        </div>
      </GlassFilterProvider>
    `,
  }),
};
