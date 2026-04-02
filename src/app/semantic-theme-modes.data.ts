import type { SemanticColorTokenMapping } from './semantic-tokens.data';

export type ThemeBrand = 'core';
export type ThemeMode = 'light' | 'dark';
export type ThemeId = `${ThemeBrand}-${ThemeMode}`;

type ThemeAliasMap = Record<string, string>;
type ThemeAliasOverrides = Record<ThemeBrand, Record<ThemeMode, ThemeAliasMap>>;
type ThemeAliasValueMaps = Record<ThemeId, ThemeAliasMap>;
type ThemeAliasPrimitiveMaps = Record<ThemeId, ThemeAliasMap>;

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
      'color/semantic/background/brand-primary1': '#0E16AB',
      'color/semantic/background/brand-primary2': '#121BBB',
      'color/semantic/background/brand-primary3': '#141ED2',
      'color/semantic/background/brand-primary4': '#5F7EEB',
      'color/semantic/background/brand-primary5': '#A3B7FD',
      'color/semantic/background/brand-quaternary1': '#435870',
      'color/semantic/background/brand-quaternary2': '#6D83A7',
      'color/semantic/background/brand-quaternary3': '#9BAFC8',
      'color/semantic/background/brand-quaternary4': '#CADBE8',
      'color/semantic/background/brand-quaternary5': '#516682',
      'color/semantic/background/brand-secondary1': '#5348D3',
      'color/semantic/background/brand-secondary2': '#6150E1',
      'color/semantic/background/brand-secondary3': '#7B5FFF',
      'color/semantic/background/brand-secondary4': '#9781FF',
      'color/semantic/background/brand-secondary5': '#BBADFF',
      'color/semantic/background/brand-tertiary1': '#0C908F',
      'color/semantic/background/brand-tertiary2': '#0FA4A3',
      'color/semantic/background/brand-tertiary3': '#12B7B7',
      'color/semantic/background/brand-tertiary4': '#52DDDD',
      'color/semantic/background/dark': '#050D8C',
      'color/semantic/background/disable1': '#646464',
      'color/semantic/background/disable2': '#646464',
      'color/semantic/background/disable3': '#4D4D4D',
      'color/semantic/background/error-primary': '#BB0403',
      'color/semantic/background/error-secondary': '#D50202',
      'color/semantic/background/error-tertiary': '#F00000',
      'color/semantic/background/primary': '#192D39',
      'color/semantic/background/secondary': '#354A5E',
      'color/semantic/background/success-primary': '#008F56',
      'color/semantic/background/success-quaternary': '#85F1C6',
      'color/semantic/background/success-secondary': '#009E5F',
      'color/semantic/background/success-tertiary': '#00AD68',
      'color/semantic/background/tertiary': '#0054B0',
      'color/semantic/background/warning-primary': '#C36A00',
      'color/semantic/background/warning-secondary': '#FA8A00',
      'color/semantic/background/warning-tertiary': '#FDC64E',
      'color/semantic/blur/1': '#435870',
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
      'color/semantic/border/error1': '#F34343',
      'color/semantic/border/error2': '#FB7070',
      'color/semantic/border/error3': '#FFB1B1',
      'color/semantic/border/primary': '#435870',
      'color/semantic/border/quaternary': '#354A5E',
      'color/semantic/border/quaternary2': '#273B4B',
      'color/semantic/border/secondary': '#516682',
      'color/semantic/border/success': '#CDFCE9',
      'color/semantic/border/tertiary': '#435870',
      'color/semantic/border/warning': '#FBDE97',
      'color/semantic/chart/1': '#5F7EEB',
      'color/semantic/chart/10': '#DBD3FF',
      'color/semantic/chart/11': '#52DDDD',
      'color/semantic/chart/12': '#FBDE97',
      'color/semantic/chart/13': '#CDFCE9',
      'color/semantic/chart/14': '#ECF5FA',
      'color/semantic/chart/15': '#DAE4FF',
      'color/semantic/chart/16': '#F2EBFF',
      'color/semantic/chart/17': '#DEF5FF',
      'color/semantic/chart/18': '#E7FEFE',
      'color/semantic/chart/19': '#FFF4D0',
      'color/semantic/chart/2': '#9781FF',
      'color/semantic/chart/20': '#9B9B9B',
      'color/semantic/chart/3': '#A2F5F5',
      'color/semantic/chart/4': '#F9A500',
      'color/semantic/chart/5': '#00A5FF',
      'color/semantic/chart/6': '#3DD196',
      'color/semantic/chart/7': '#ECF5FA',
      'color/semantic/chart/8': '#CADBE8',
      'color/semantic/chart/9': '#BDE8FF',
      'color/semantic/divider/primary': '#435870',
      'color/semantic/hyperlink/disable': '#808080',
      'color/semantic/hyperlink/primary': '#A3B7FD',
      'color/semantic/icon/brand-primary1': '#A3B7FD',
      'color/semantic/icon/brand-primary2': '#DAE4FF',
      'color/semantic/icon/brand-primary3': '#E9EFFF',
      'color/semantic/icon/brand-primary4': '#E9EFFF',
      'color/semantic/icon/brand-secondary1': '#BBADFF',
      'color/semantic/icon/brand-secondary2': '#DBD3FF',
      'color/semantic/icon/brand-secondary3': '#F2EBFF',
      'color/semantic/icon/brand-secondary4': '#F2EBFF',
      'color/semantic/icon/disable1': '#9B9B9B',
      'color/semantic/icon/disable2': '#CCCCCC',
      'color/semantic/icon/disable3': '#9B9B9B',
      'color/semantic/icon/disable4': '#808080',
      'color/semantic/icon/error': '#FB7070',
      'color/semantic/icon/neutral1': '#FFFFFF',
      'color/semantic/icon/neutral2': '#ECF5FA',
      'color/semantic/icon/neutral3': '#CADBE8',
      'color/semantic/icon/neutral4': '#9BAFC8',
      'color/semantic/icon/neutral5': '#6D83A7',
      'color/semantic/icon/neutral6': '#516682',
      'color/semantic/icon/success': '#85F1C6',
      'color/semantic/icon/warning': '#FDC64E',
      'color/semantic/overlay/primary': '#000000',
      'color/semantic/shadow/1': '#FFFFFF1A',
      'color/semantic/shadow/2': '#FFFFFF1A',
      'color/semantic/shadow/3': '#FFFFFF33',
      'color/semantic/shadow/4': '#FFFFFF33',
      'color/semantic/shadow/5': '#FFFFFF4D',
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
      'color/semantic/text/disable1': '#9B9B9B',
      'color/semantic/text/disable2': '#CCCCCC',
      'color/semantic/text/disable3': '#CCCCCC',
      'color/semantic/text/disable4': '#9B9B9B',
      'color/semantic/text/error': '#FB7070',
      'color/semantic/text/on-brand-tertiary': '#FFFFFF',
      'color/semantic/text/on-warning': '#FFFFFF',
      'color/semantic/text/primary': '#FFFFFF',
      'color/semantic/text/primary2': '#ECF5FA',
      'color/semantic/text/primary3': '#CADBE8',
      'color/semantic/text/primary4': '#6D83A7',
      'color/semantic/text/quaternary': '#516682',
      'color/semantic/text/quaternary2': '#435870',
      'color/semantic/text/secondary': '#9BAFC8',
      'color/semantic/text/success': '#85F1C6',
      'color/semantic/text/tertiary': '#6D83A7',
    },
  },
};

/**
 * Primitive refs per mode (source-truth from Figma Alias collection mode mappings).
 * This is used by docs tables to show correct Primitive Ref in both Light and Dark.
 */
export const SEMANTIC_THEME_ALIAS_PRIMITIVE_OVERRIDES: ThemeAliasOverrides = {
  core: {
    light: {},
    dark: {
      'color/semantic/background/brand-primary1': 'color/primitive/blue/700',
      'color/semantic/background/brand-primary2': 'color/primitive/blue/600',
      'color/semantic/background/brand-primary3': 'color/primitive/blue/500',
      'color/semantic/background/brand-primary4': 'color/primitive/blue/400',
      'color/semantic/background/brand-primary5': 'color/primitive/blue/300',
      'color/semantic/background/brand-quaternary1': 'color/primitive/darkblue/700',
      'color/semantic/background/brand-quaternary2': 'color/primitive/darkblue/500',
      'color/semantic/background/brand-quaternary3': 'color/primitive/darkblue/400',
      'color/semantic/background/brand-quaternary4': 'color/primitive/darkblue/300',
      'color/semantic/background/brand-quaternary5': 'color/primitive/darkblue/600',
      'color/semantic/background/brand-secondary1': 'color/primitive/purple/700',
      'color/semantic/background/brand-secondary2': 'color/primitive/purple/600',
      'color/semantic/background/brand-secondary3': 'color/primitive/purple/500',
      'color/semantic/background/brand-secondary4': 'color/primitive/purple/400',
      'color/semantic/background/brand-secondary5': 'color/primitive/purple/300',
      'color/semantic/background/brand-tertiary1': 'color/primitive/turquoise/700',
      'color/semantic/background/brand-tertiary2': 'color/primitive/turquoise/600',
      'color/semantic/background/brand-tertiary3': 'color/primitive/turquoise/500',
      'color/semantic/background/brand-tertiary4': 'color/primitive/turquoise/400',
      'color/semantic/background/dark': 'color/primitive/blue/900',
      'color/semantic/background/disable1': 'color/primitive/grayscale/700',
      'color/semantic/background/disable2': 'color/primitive/grayscale/700',
      'color/semantic/background/disable3': 'color/primitive/grayscale/800',
      'color/semantic/background/error-primary': 'color/primitive/red/700',
      'color/semantic/background/error-secondary': 'color/primitive/red/600',
      'color/semantic/background/error-tertiary': 'color/primitive/red/500',
      'color/semantic/background/primary': 'color/primitive/darkblue/1000',
      'color/semantic/background/secondary': 'color/primitive/darkblue/800',
      'color/semantic/background/success-primary': 'color/primitive/green/700',
      'color/semantic/background/success-quaternary': 'color/primitive/green/300',
      'color/semantic/background/success-secondary': 'color/primitive/green/600',
      'color/semantic/background/success-tertiary': 'color/primitive/green/500',
      'color/semantic/background/tertiary': 'color/primitive/lightblue/800',
      'color/semantic/background/warning-primary': 'color/primitive/orange/700',
      'color/semantic/background/warning-secondary': 'color/primitive/orange/500',
      'color/semantic/background/warning-tertiary': 'color/primitive/orange/300',
      'color/semantic/blur/1': 'color/primitive/darkblue/700',
      'color/semantic/border/brand-primary1': 'color/primitive/blue/300',
      'color/semantic/border/brand-primary2': 'color/primitive/blue/200',
      'color/semantic/border/brand-primary3': 'color/primitive/blue/100',
      'color/semantic/border/brand-primary4': 'color/primitive/darkblue/400',
      'color/semantic/border/brand-secondary1': 'color/primitive/purple/300',
      'color/semantic/border/brand-secondary2': 'color/primitive/purple/200',
      'color/semantic/border/brand-secondary3': 'color/primitive/purple/100',
      'color/semantic/border/brand-secondary4': 'color/primitive/darkblue/300',
      'color/semantic/border/brand-tertiary': 'color/primitive/turquoise/300',
      'color/semantic/border/disable1': 'color/primitive/grayscale/700',
      'color/semantic/border/disable2': 'color/primitive/grayscale/600',
      'color/semantic/border/error1': 'color/primitive/red/400',
      'color/semantic/border/error2': 'color/primitive/red/300',
      'color/semantic/border/error3': 'color/primitive/red/200',
      'color/semantic/border/primary': 'color/primitive/darkblue/700',
      'color/semantic/border/quaternary': 'color/primitive/darkblue/800',
      'color/semantic/border/quaternary2': 'color/primitive/darkblue/900',
      'color/semantic/border/secondary': 'color/primitive/darkblue/600',
      'color/semantic/border/success': 'color/primitive/green/200',
      'color/semantic/border/tertiary': 'color/primitive/darkblue/700',
      'color/semantic/border/warning': 'color/primitive/orange/200',
      'color/semantic/chart/1': 'color/primitive/blue/400',
      'color/semantic/chart/10': 'color/primitive/purple/200',
      'color/semantic/chart/11': 'color/primitive/turquoise/400',
      'color/semantic/chart/12': 'color/primitive/orange/200',
      'color/semantic/chart/13': 'color/primitive/green/200',
      'color/semantic/chart/14': 'color/primitive/darkblue/200',
      'color/semantic/chart/15': 'color/primitive/blue/200',
      'color/semantic/chart/16': 'color/primitive/purple/100',
      'color/semantic/chart/17': 'color/primitive/lightblue/100',
      'color/semantic/chart/18': 'color/primitive/turquoise/100',
      'color/semantic/chart/19': 'color/primitive/orange/100',
      'color/semantic/chart/2': 'color/primitive/purple/400',
      'color/semantic/chart/20': 'color/primitive/grayscale/500',
      'color/semantic/chart/3': 'color/primitive/turquoise/300',
      'color/semantic/chart/4': 'color/primitive/orange/400',
      'color/semantic/chart/5': 'color/primitive/lightblue/400',
      'color/semantic/chart/6': 'color/primitive/green/400',
      'color/semantic/chart/7': 'color/primitive/darkblue/200',
      'color/semantic/chart/8': 'color/primitive/darkblue/300',
      'color/semantic/chart/9': 'color/primitive/lightblue/200',
      'color/semantic/divider/primary': 'color/primitive/darkblue/700',
      'color/semantic/hyperlink/disable': 'color/primitive/grayscale/600',
      'color/semantic/hyperlink/primary': 'color/primitive/blue/300',
      'color/semantic/icon/brand-primary1': 'color/primitive/blue/300',
      'color/semantic/icon/brand-primary2': 'color/primitive/blue/200',
      'color/semantic/icon/brand-primary3': 'color/primitive/blue/100',
      'color/semantic/icon/brand-primary4': 'color/primitive/blue/100',
      'color/semantic/icon/brand-secondary1': 'color/primitive/purple/300',
      'color/semantic/icon/brand-secondary2': 'color/primitive/purple/200',
      'color/semantic/icon/brand-secondary3': 'color/primitive/purple/100',
      'color/semantic/icon/brand-secondary4': 'color/primitive/purple/100',
      'color/semantic/icon/disable1': 'color/primitive/grayscale/500',
      'color/semantic/icon/disable2': 'color/primitive/grayscale/400',
      'color/semantic/icon/disable3': 'color/primitive/grayscale/500',
      'color/semantic/icon/disable4': 'color/primitive/grayscale/600',
      'color/semantic/icon/error': 'color/primitive/red/300',
      'color/semantic/icon/neutral1': 'color/primitive/white/100%',
      'color/semantic/icon/neutral2': 'color/primitive/darkblue/200',
      'color/semantic/icon/neutral3': 'color/primitive/darkblue/300',
      'color/semantic/icon/neutral4': 'color/primitive/darkblue/400',
      'color/semantic/icon/neutral5': 'color/primitive/darkblue/500',
      'color/semantic/icon/neutral6': 'color/primitive/darkblue/600',
      'color/semantic/icon/success': 'color/primitive/green/300',
      'color/semantic/icon/warning': 'color/primitive/orange/300',
      'color/semantic/overlay/primary': 'color/primitive/black/100%',
      'color/semantic/shadow/1': 'color/primitive/white/10%',
      'color/semantic/shadow/2': 'color/primitive/white/10%',
      'color/semantic/shadow/3': 'color/primitive/white/20%',
      'color/semantic/shadow/4': 'color/primitive/white/20%',
      'color/semantic/shadow/5': 'color/primitive/white/30%',
      'color/semantic/skeleton/primary': 'color/primitive/grayscale/700',
      'color/semantic/skeleton/secondary': 'color/primitive/grayscale/800',
      'color/semantic/text/brand-primary1': 'color/primitive/blue/300',
      'color/semantic/text/brand-primary2': 'color/primitive/blue/200',
      'color/semantic/text/brand-primary3': 'color/primitive/blue/100',
      'color/semantic/text/brand-primary4': 'color/primitive/blue/100',
      'color/semantic/text/brand-secondary1': 'color/primitive/purple/300',
      'color/semantic/text/brand-secondary2': 'color/primitive/purple/200',
      'color/semantic/text/brand-secondary3': 'color/primitive/purple/100',
      'color/semantic/text/brand-secondary4': 'color/primitive/purple/100',
      'color/semantic/text/brand-tertiary1': 'color/primitive/turquoise/300',
      'color/semantic/text/brand-tertiary2': 'color/primitive/turquoise/200',
      'color/semantic/text/disable1': 'color/primitive/grayscale/500',
      'color/semantic/text/disable2': 'color/primitive/grayscale/400',
      'color/semantic/text/disable3': 'color/primitive/grayscale/400',
      'color/semantic/text/disable4': 'color/primitive/grayscale/500',
      'color/semantic/text/error': 'color/primitive/red/300',
      'color/semantic/text/on-brand-tertiary': 'color/primitive/white/100%',
      'color/semantic/text/on-warning': 'color/primitive/white/100%',
      'color/semantic/text/primary': 'color/primitive/white/100%',
      'color/semantic/text/primary2': 'color/primitive/darkblue/200',
      'color/semantic/text/primary3': 'color/primitive/darkblue/300',
      'color/semantic/text/primary4': 'color/primitive/darkblue/500',
      'color/semantic/text/quaternary': 'color/primitive/darkblue/600',
      'color/semantic/text/quaternary2': 'color/primitive/darkblue/700',
      'color/semantic/text/secondary': 'color/primitive/darkblue/400',
      'color/semantic/text/success': 'color/primitive/green/300',
      'color/semantic/text/tertiary': 'color/primitive/darkblue/500',
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

export function buildSemanticThemeAliasPrimitiveMaps(
  tokens: SemanticColorTokenMapping[],
): ThemeAliasPrimitiveMaps {
  const baseLight = Object.fromEntries(tokens.map((token) => [token.alias, token.primitive]));

  const maps = {} as ThemeAliasPrimitiveMaps;
  for (const brand of SUPPORTED_THEME_BRANDS) {
    const lightRefs: ThemeAliasMap = {
      ...baseLight,
      ...SEMANTIC_THEME_ALIAS_PRIMITIVE_OVERRIDES[brand].light,
    };

    const darkRefs: ThemeAliasMap = {
      ...lightRefs,
      ...SEMANTIC_THEME_ALIAS_PRIMITIVE_OVERRIDES[brand].dark,
    };

    maps[getThemeId(brand, 'light')] = lightRefs;
    maps[getThemeId(brand, 'dark')] = darkRefs;
  }

  return maps;
}
