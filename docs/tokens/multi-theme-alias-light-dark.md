# Multi-Theme Alias Tokens (Light + Dark)

## Current implementation
- Theme source is in `src/app/semantic-theme-modes.data.ts`.
- Theme architecture uses `brand + mode`:
  - `ThemeBrand`: `core`
  - `ThemeMode`: `light | dark`
  - `ThemeId`: `core-light | core-dark`
- `core-light` uses all values from `SEMANTIC_COLOR_TOKEN_MAPPINGS` plus optional `core.light` overrides.
- `core-dark` is built as: `core-light` + explicit overrides in `SEMANTIC_THEME_ALIAS_OVERRIDES.core.dark`.
- Runtime token application is in `src/app/app.ts` (`applyThemeMode`), which writes alias values to CSS variables in the format:
  - `color/semantic/text/primary` -> `--color-semantic-text-primary`

## Figma status (Alias collection)
- File: `Master-Token` (`VtfMVehVniPRQ9BTYzQzdD`)
- Collection: `Alias`
- Modes: `Light`, `Dark`
- Dark overrides currently applied: `61` alias tokens
  - Background: `5`
  - Border: `16`
  - Divider: `1`
  - Hyperlink: `1`
  - Icon: `16`
  - Skeleton: `2`
  - Text: `20`
- Mapping source:
  - All overrides are set in Figma Dark mode at alias level (mostly alias-to-primitive).
  - Code map in `SEMANTIC_THEME_ALIAS_OVERRIDES.core.dark` is synced from those Dark resolved values.

## How to add or update dark values
1. Open `src/app/semantic-theme-modes.data.ts`.
2. Add or change entries in `SEMANTIC_THEME_ALIAS_OVERRIDES.core.dark`.
3. Keep alias keys exactly the same as in `src/app/semantic-tokens.data.ts`.
4. Use values exported from Figma Alias Token dark mode as source of truth.
5. Rebuild and verify:
   - Header theme switch (`Light` / `Dark`)
   - `Design Tokens > Colors` table mode switch
   - Button variants that consume `--color-semantic-*` variables

## Multi-theme extension strategy
- Keep alias names theme-independent:
  - Good: `color/semantic/text/primary`
  - Avoid: `color/semantic/dark/text/primary`
- Add new themes by extending `ThemeBrand` and `SEMANTIC_THEME_ALIAS_OVERRIDES`:
  - `brandA.light`, `brandA.dark`, `brandB.light`, `brandB.dark`
- Keep fallback chain stable:
  - `base light` -> `brand light` -> `brand dark` -> `component usage`

### Suggested rollout for additional brands
1. Add new brand key in `ThemeBrand`.
2. Add light/dark override maps for that brand.
3. Create Figma mode pair for brand or a dedicated Alias extension file.
4. Sync values from Figma Alias modes to code override map.
5. Add brand switcher UI only after token parity is stable.

## Notes
- The app persists selected theme in `localStorage` key: `sportbook.theme-id`.
- Backward compatibility is kept for legacy stored values `light | dark`.
- If no stored value exists, app defaults to:
  - system `prefers-color-scheme: dark` -> `core-dark`
  - otherwise `core-light`
