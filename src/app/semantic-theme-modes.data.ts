import type { SemanticColorTokenMapping } from './semantic-tokens.data';

export type ThemeBrand = 'core';
export type ThemeMode = 'light' | 'dark';
export type ThemeId = `${ThemeBrand}-${ThemeMode}`;

type ThemeAliasMap = Record<string, string>;
type ThemeAliasOverrides = Record<ThemeBrand, Record<ThemeMode, ThemeAliasMap>>;
type ThemeAliasValueMaps = Record<ThemeId, ThemeAliasMap>;

export const DEFAULT_THEME_BRAND: ThemeBrand = 'core';
export const DEFAULT_THEME_MODE: ThemeMode = 'light';
export const DEFAULT_THEME_ID: ThemeId = 'core-light';

export const SUPPORTED_THEME_BRANDS: ThemeBrand[] = ['core'];
export const SUPPORTED_THEME_MODES: ThemeMode[] = ['light', 'dark'];

export function getThemeId(brand: ThemeBrand, mode: ThemeMode): ThemeId {
  return `${brand}-${mode}`;
}

export function parseThemeId(value: string | null): ThemeId | null {
  if (!value) {
    return null;
  }

  const [brand, mode] = value.split('-');
  if (isThemeBrand(brand) && isThemeMode(mode)) {
    return `${brand}-${mode}`;
  }

  return null;
}

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

export function isThemeBrand(value: string | null): value is ThemeBrand {
  return value === 'core';
}

export function getThemeModeFromId(themeId: ThemeId): ThemeMode {
  return themeId.split('-')[1] as ThemeMode;
}

export function getThemeBrandFromId(themeId: ThemeId): ThemeBrand {
  return themeId.split('-')[0] as ThemeBrand;
}

/**
 * Bootstrap overrides for dark mode.
 * Keep this list explicit and source-truth from Figma Alias Token mode values.
 */
export const SEMANTIC_THEME_ALIAS_OVERRIDES: ThemeAliasOverrides = {
  core: {
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
  },
};

export function buildSemanticThemeAliasValueMaps(
  tokens: SemanticColorTokenMapping[],
): ThemeAliasValueMaps {
  const baseLight = Object.fromEntries(tokens.map((token) => [token.alias, token.value]));

  const maps = {} as ThemeAliasValueMaps;
  for (const brand of SUPPORTED_THEME_BRANDS) {
    const lightValues: ThemeAliasMap = {
      ...baseLight,
      ...SEMANTIC_THEME_ALIAS_OVERRIDES[brand].light,
    };

    const darkValues: ThemeAliasMap = {
      ...lightValues,
      ...SEMANTIC_THEME_ALIAS_OVERRIDES[brand].dark,
    };

    maps[getThemeId(brand, 'light')] = lightValues;
    maps[getThemeId(brand, 'dark')] = darkValues;
  }

  return maps;
}
