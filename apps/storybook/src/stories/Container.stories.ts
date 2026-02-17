import type { Meta, StoryObj } from '@storybook/vue3';
import { Container } from '@liquid/ui';

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '最大寬度限制',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: 'lg' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: '左右內距',
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    maxWidth: 'lg',
    padding: 'md',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基礎展示
export const Default: Story = {
  args: {
    maxWidth: 'lg',
    padding: 'md',
  },
  render: (args) => ({
    components: { Container },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100%; background: #f5f5f5; padding: 1rem 0;">
        <Container v-bind="args">
          <div style="
            background: rgba(0, 123, 255, 0.1);
            border: 2px dashed rgba(0, 123, 255, 0.4);
            padding: 1.5rem;
            border-radius: 8px;
            font-size: 14px;
            color: #333;
          ">
            Container content — constrained to maxWidth="{{ args.maxWidth }}", padding="{{ args.padding }}"
          </div>
        </Container>
      </div>
    `,
  }),
};

// MaxWidth 所有尺寸對比
export const MaxWidthVariants: Story = {
  render: () => ({
    components: { Container },
    template: `
      <div style="width: 100%; background: #f0f2f5; display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem 0;">

        <div v-for="size in ['sm', 'md', 'lg', 'xl', 'full']" :key="size">
          <Container :maxWidth="size" padding="md">
            <div style="
              background: white;
              border: 1px solid #dee2e6;
              border-left: 3px solid #007bff;
              padding: 0.75rem 1rem;
              border-radius: 4px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 13px;
              color: #333;
            ">
              <span style="font-weight: 600; color: #007bff;">maxWidth="{{ size }}"</span>
              <span style="color: #999;">sm=480px | md=768px | lg=1024px | xl=1280px | full=100%</span>
            </div>
          </Container>
        </div>

      </div>
    `,
  }),
};

// Padding 對比
export const PaddingVariants: Story = {
  render: () => ({
    components: { Container },
    template: `
      <div style="width: 600px; background: #f0f2f5; display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem 0;">

        <div v-for="pad in ['none', 'sm', 'md', 'lg']" :key="pad">
          <Container maxWidth="full" :padding="pad">
            <div style="
              background: white;
              border: 1px solid #dee2e6;
              border-left: 3px solid #28a745;
              padding: 0.75rem 1rem;
              border-radius: 4px;
              font-size: 13px;
              color: #333;
              font-weight: 600;
            ">
              padding="{{ pad }}"
            </div>
          </Container>
        </div>

      </div>
    `,
  }),
};
