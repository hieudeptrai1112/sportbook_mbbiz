import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

const meta: Meta = {
  title: 'Components/Input',
  decorators: [
    moduleMetadata({
      imports: [FormsModule, NzInputModule],
    }),
  ],
  render: (args: { placeholder: string; value: string }) => ({
    props: args,
    template: `<input nz-input [(ngModel)]="value" [placeholder]="placeholder" />`,
  }),
  args: {
    placeholder: 'Type here',
    value: '',
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {};
