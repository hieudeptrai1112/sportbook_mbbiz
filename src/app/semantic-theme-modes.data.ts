import type { SemanticColorTokenMapping } from './semantic-tokens.data';

export type ThemeBrand = 'core';

export const DEFAULT_THEME_BRAND: ThemeBrand = 'core';

export function buildSemanticAliasValueMap(
  tokens: SemanticColorTokenMapping[],
): Record<string, string> {
  return Object.fromEntries(tokens.map((token) => [token.alias, token.value]));
}

export function buildSemanticAliasPrimitiveMap(
  tokens: SemanticColorTokenMapping[],
): Record<string, string> {
  return Object.fromEntries(tokens.map((token) => [token.alias, token.primitive]));
}
