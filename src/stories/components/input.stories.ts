import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

type InputArgs = {
  placeholder: string;
  value: string;
};

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  decorators: [
    moduleMetadata({
      imports: [FormsModule, NzInputModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<input nz-input [(ngModel)]="value" [placeholder]="placeholder" />`,
  }),
  args: {
    placeholder: 'Type here',
    value: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
