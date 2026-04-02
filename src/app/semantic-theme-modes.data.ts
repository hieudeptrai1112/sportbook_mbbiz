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
      'color/semantic/background/disable1': '#646464',
      'color/semantic/background/disable2': '#646464',
      'color/semantic/background/disable3': '#4D4D4D',
      'color/semantic/background/primary': '#192D39',
      'color/semantic/background/secondary': '#354A5E',
      'color/semantic/border/brand-primary1': '#A3B7FD',
      'color/semantic/border/brand-primary2': '#DAE4FF',
      'color/semantic/border/brand-primary3': '#E9EFFF',
      'color/semantic/border/brand-primary4': '#9BAFC8',
      'color/semantic/border/brand-secondary1': '#BBADFF',
      'color/semantic/border/brand-secondary2': '#DBD3FF',
      'color/semantic/border/brand-secondary3': '#F2EBFF',
      'color/semantic/border/brand-secondary4': '#CADBE8',
      'color/semantic/border/brand-tertiary': '#A2F5F5',
      'color/semantic/border/disable1': '#646464',
      'color/semantic/border/disable2': '#808080',
      'color/semantic/border/primary': '#435870',
      'color/semantic/border/quaternary': '#354A5E',
      'color/semantic/border/quaternary2': '#273B4B',
      'color/semantic/border/secondary': '#516682',
      'color/semantic/border/tertiary': '#435870',
      'color/semantic/divider/primary': '#435870',
      'color/semantic/hyperlink/primary': '#A3B7FD',
      'color/semantic/icon/brand-primary1': '#A3B7FD',
      'color/semantic/icon/brand-primary2': '#DAE4FF',
      'color/semantic/icon/brand-primary3': '#E9EFFF',
      'color/semantic/icon/brand-primary4': '#E9EFFF',
      'color/semantic/icon/brand-secondary1': '#BBADFF',
      'color/semantic/icon/brand-secondary2': '#DBD3FF',
      'color/semantic/icon/brand-secondary3': '#F2EBFF',
      'color/semantic/icon/brand-secondary4': '#F2EBFF',
      'color/semantic/icon/disable3': '#9B9B9B',
      'color/semantic/icon/disable4': '#808080',
      'color/semantic/icon/neutral1': '#FFFFFF',
      'color/semantic/icon/neutral2': '#ECF5FA',
      'color/semantic/icon/neutral3': '#CADBE8',
      'color/semantic/icon/neutral4': '#9BAFC8',
      'color/semantic/icon/neutral5': '#6D83A7',
      'color/semantic/icon/neutral6': '#516682',
      'color/semantic/skeleton/primary': '#646464',
      'color/semantic/skeleton/secondary': '#4D4D4D',
      'color/semantic/text/brand-primary1': '#A3B7FD',
      'color/semantic/text/brand-primary2': '#DAE4FF',
      'color/semantic/text/brand-primary3': '#E9EFFF',
      'color/semantic/text/brand-primary4': '#E9EFFF',
      'color/semantic/text/brand-secondary1': '#BBADFF',
      'color/semantic/text/brand-secondary2': '#DBD3FF',
      'color/semantic/text/brand-secondary3': '#F2EBFF',
      'color/semantic/text/brand-secondary4': '#F2EBFF',
      'color/semantic/text/brand-tertiary1': '#A2F5F5',
      'color/semantic/text/brand-tertiary2': '#D4FBFB',
      'color/semantic/text/disable3': '#CCCCCC',
      'color/semantic/text/disable4': '#9B9B9B',
      'color/semantic/text/primary': '#FFFFFF',
      'color/semantic/text/primary2': '#ECF5FA',
      'color/semantic/text/primary3': '#CADBE8',
      'color/semantic/text/primary4': '#6D83A7',
      'color/semantic/text/quaternary': '#516682',
      'color/semantic/text/quaternary2': '#435870',
      'color/semantic/text/secondary': '#9BAFC8',
      'color/semantic/text/tertiary': '#6D83A7',
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
