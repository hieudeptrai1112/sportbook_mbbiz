import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'HUI Design',
    brandImage: '/assets/hui-design-logo.png',
    colorPrimary: '#1677ff',
    colorSecondary: '#1677ff',
    appBg: '#17171A',
    appContentBg: '#17171A',
    appBorderColor: '#17171A',
    appBorderRadius: 12,
    barBg: '#17171A',
    barSelectedColor: '#FFFFFF',
    barTextColor: 'rgba(255, 255, 255, 0.8)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    textInverseColor: '#17171A',
    inputBg: '#232324',
    inputBorder: '#232324',
    inputTextColor: 'rgba(255, 255, 255, 0.9)',
  }),
});
