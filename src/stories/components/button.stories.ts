import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';

const meta: Meta = {
  title: 'Components/Button',
  decorators: [
    moduleMetadata({
      imports: [NzButtonModule],
    }),
  ],
  render: (args: { label: string; type: string }) => ({
    props: args,
    template: `<button nz-button [nzType]="type">{{ label }}</button>`,
  }),
  args: {
    label: 'Primary Button',
    type: 'primary',
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};
