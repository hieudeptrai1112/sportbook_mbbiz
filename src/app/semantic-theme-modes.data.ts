import type { SemanticColorTokenMapping } from './semantic-tokens.data';

export type ThemeMode = 'light' | 'dark';

type ThemeAliasMap = Record<string, string>;
type ThemeAliasOverrides = Record<ThemeMode, ThemeAliasMap>;
type ThemeAliasValueMaps = Record<ThemeMode, ThemeAliasMap>;

export const DEFAULT_THEME_MODE: ThemeMode = 'light';

/**
 * Bootstrap overrides for dark mode.
 * Keep this list explicit and source-truth from Figma Alias Token mode values.
 */
export const SEMANTIC_THEME_ALIAS_OVERRIDES: ThemeAliasOverrides = {
  light: {},
  dark: {
    'color/semantic/background/primary': '#192D39',
    'color/semantic/background/secondary': '#354A5E',
    'color/semantic/border/primary': '#435870',
    'color/semantic/divider/primary': '#435870',
    'color/semantic/text/primary': '#FFFFFF',
    'color/semantic/text/primary2': '#ECF5FA',
    'color/semantic/text/primary3': '#CADBE8',
    'color/semantic/text/secondary': '#9BAFC8',
  },
};

export function buildSemanticThemeAliasValueMaps(
  tokens: SemanticColorTokenMapping[],
): ThemeAliasValueMaps {
  const baseLight = Object.fromEntries(tokens.map((token) => [token.alias, token.value]));

  const lightValues: ThemeAliasMap = {
    ...baseLight,
    ...SEMANTIC_THEME_ALIAS_OVERRIDES.light,
  };

  const darkValues: ThemeAliasMap = {
    ...lightValues,
    ...SEMANTIC_THEME_ALIAS_OVERRIDES.dark,
  };

  return {
    light: lightValues,
    dark: darkValues,
  };
}
