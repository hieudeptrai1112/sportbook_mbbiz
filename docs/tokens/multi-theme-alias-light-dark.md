# Multi-Theme Alias Tokens (Light + Dark)

## Current implementation
- Theme source is in `src/app/semantic-theme-modes.data.ts`.
- `light` mode uses all values from `SEMANTIC_COLOR_TOKEN_MAPPINGS`.
- `dark` mode is built as: light values + explicit overrides in `SEMANTIC_THEME_ALIAS_OVERRIDES.dark`.
- Runtime token application is in `src/app/app.ts` (`applyThemeMode`), which writes alias values to CSS variables in the format:
  - `color/semantic/text/primary` -> `--color-semantic-text-primary`

## How to add or update dark values
1. Open `src/app/semantic-theme-modes.data.ts`.
2. Add or change entries in `SEMANTIC_THEME_ALIAS_OVERRIDES.dark`.
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
- Add new themes by extending `ThemeMode` and `SEMANTIC_THEME_ALIAS_OVERRIDES`:
  - `brand-a-light`, `brand-a-dark`, etc.
- Keep fallback chain stable:
  - `base light` -> `theme overrides` -> `component usage`

## Notes
- The app persists selected theme in `localStorage` key: `sportbook.theme-mode`.
- If no stored value exists, app defaults to:
  - system `prefers-color-scheme: dark` -> `dark`
  - otherwise `light`
