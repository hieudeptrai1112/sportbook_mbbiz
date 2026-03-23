import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';

type ButtonArgs = {
  label: string;
  type: string;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  decorators: [
    moduleMetadata({
      imports: [NzButtonModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<button nz-button [nzType]="type">{{ label }}</button>`,
  }),
  args: {
    label: 'Primary Button',
    type: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
