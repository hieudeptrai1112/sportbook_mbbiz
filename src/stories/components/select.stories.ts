import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

const meta: Meta = {
  title: 'Components/Select',
  decorators: [
    moduleMetadata({
      imports: [FormsModule, NzSelectModule],
    }),
  ],
  render: (args: { value: string }) => ({
    props: args,
    template: `
      <nz-select [(ngModel)]="value" style="width: 220px">
        <nz-option nzValue="one" nzLabel="Option One"></nz-option>
        <nz-option nzValue="two" nzLabel="Option Two"></nz-option>
        <nz-option nzValue="three" nzLabel="Option Three"></nz-option>
      </nz-select>
    `,
  }),
  args: {
    value: 'one',
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {};
