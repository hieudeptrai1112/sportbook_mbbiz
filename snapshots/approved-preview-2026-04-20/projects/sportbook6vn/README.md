# sportbook6vn

`projects/sportbook6vn` is the production Angular component library for this workspace.

It is intentionally separate from the documentation app in `src/app`.

## Responsibility Split

- `projects/sportbook6vn`: publishable components and public API
- `src/app`: showcase, docs, copy snippets, visual QA states
- `docs/component-contracts`: source of truth for contract-first implementation

## Rules

1. New components start with a contract in `docs/component-contracts/components`.
2. App code should import components from `sportbook6vn`, not from NG-Zorro directly.
3. Demo-only knobs do not belong in the public library API.
4. Heavy components may wrap NG-Zorro internally, but the wrapper API stays owned by this library.

## Current Seed Wrappers

- `Sportbook6vnButtonComponent`
- `Sportbook6vnInputComponent`
- `Sportbook6vnSearchInputComponent`
- `Sportbook6vnPasswordInputComponent`
- `Sportbook6vnTextareaComponent`
- `Sportbook6vnFloatingLabelInputComponent`
- `Sportbook6vnAffixLabelInputComponent`
- `Sportbook6vnDropdownComponent`
- `Sportbook6vnDropdownTagComponent`

Use it as the template for:

- naming
- file layout
- token fallback strategy
- wrapper-to-NG-Zorro mapping
- smoke tests

## Theme Bridge

Import these files in the consuming application:

1. `sportbook6vn-theme.css`
2. `zorro-bridge.less`

The CSS file owns your semantic tokens. The Less file translates a stable subset of those tokens into NG-Zorro theme variables.

## Commands

```bash
npm run build:sportbook6vn
npm run test:sportbook6vn
npm run contracts:validate
```

## Wrapper QA

Use `/Users/apple/Documents/Playground 2/sportbook_mbbiz/docs/sportbook6vn-wrapper-checklist.md` as the pre-release checklist for every new wrapper.
