# Token Schema + Naming Map v1

Status: proposed
Scope: Alias Token - Typo, Alias Token - Spacing, Alias Token - Effect
Goal: rename tokens without breaking current build by keeping backward aliases.

## 1) Schema v1 (3 layers)

### Layer A - Primitive
Raw values only (no usage meaning).

- `primitive/color/*`
- `primitive/space/*`
- `primitive/typography/*`
- `primitive/effect/*`

Examples:
- `primitive/space/4`
- `primitive/space/1.5`
- `primitive/typography/font-weight/semibold`

### Layer B - Semantic (foundation)
Meaningful roles used by components and docs.

- `semantic/typography/font-size/{xs|s|m|l|xl|2xl}`
- `semantic/typography/line-height/{xs|s|m|l|xl|2xl}`
- `semantic/typography/font-weight/{regular|semibold}`
- `semantic/spacing/{none|xxs|xs|s|m|l|xl|2xl|3xl|4xl|5xl}`
- `semantic/padding/{none|xxs|xs|s|m|l|xl|2xl|3xl}`
- `semantic/radius/{xxs|xs|s|m|l|xl|2xl|3xl|4xl|full}`
- `semantic/stroke/{s|m|l}`
- `semantic/icon-size/{xs|s|m|l|xl|2xl}`
- `semantic/layout/width/{s|m|l|xl|2xl|3xl|4xl}`
- `semantic/effect/elevation/{1|2|3|4|5}`

### Layer C - Component (future)
Component-specific tokens mapped from semantic layer.

- `component/button/*`
- `component/input/*`
- `component/card/*`

## 2) Naming Rules v1

- Use lowercase kebab segments.
- Use stable domain prefix: `primitive/`, `semantic/`, `component/`.
- Replace ambiguous names:
  - `effect/1` -> `semantic/effect/elevation/1`
  - `radius/round` -> `semantic/radius/full`
  - `spacing/n` -> `semantic/spacing/none`
  - `padding/size-3xl` -> `semantic/padding/3xl`
- Keep physical unit out of token name (`px` not in name), store in value.

## 3) CSS Variable Contract

Generate public css variables from semantic tokens.

Pattern:
- token: `semantic/typography/font-size/m`
- css var: `--sb-typography-font-size-m`

This conversion is included in `naming-map-v1.json` as `newCssVar`.

## 4) Non-breaking Migration Strategy

1. Keep old token names as aliases to new token names.
2. New usages must use v1 names only.
3. Export both old and new names during transition.
4. Remove old names only after all consumers migrate.

## 5) Deliverables in repo

- Mapping file: `docs/tokens/naming-map-v1.json`
- This schema doc: `docs/tokens/schema-v1.md`

`naming-map-v1.json` currently contains 65 mappings:
- Typo: 14
- Spacing: 46
- Effect: 5
