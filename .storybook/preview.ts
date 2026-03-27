import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    viewMode: 'docs',
    docs: {
      defaultName: 'Docs',
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Giới thiệu',
          'Tokens',
          'Components',
          ['Cơ bản', 'Dữ liệu', 'Nhập liệu', 'Phản hồi'],
        ],
        method: 'alphabetical',
      },
    },
  },
};

export default preview;
