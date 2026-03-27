import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/stories/Introduction.mdx",
    "../src/stories/DesignTokens.mdx",
    "../src/stories/Button.mdx",
    "../src/stories/components/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/angular",
  "staticDirs": [
    "../public"
  ]
};
export default config;
