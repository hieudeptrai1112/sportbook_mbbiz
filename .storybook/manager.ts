import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'HUI Design',
    brandUrl: 'https://sportbook-mbbiz.vercel.app',
    brandImage: '/assets/hui-design-logo.png',
    colorPrimary: '#165DFF',
    colorSecondary: '#165DFF',
    appBg: '#F7F8FA',
    appContentBg: '#FFFFFF',
    appBorderColor: '#E5E6EB',
    appBorderRadius: 8,
    barTextColor: '#4E5969',
    barSelectedColor: '#165DFF',
    barBg: '#FFFFFF',
    textColor: '#1D2129',
    fontBase: '"Manrope", "Segoe UI", sans-serif'
  }),
});
