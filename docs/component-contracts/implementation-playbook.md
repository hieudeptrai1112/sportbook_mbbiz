# Component Implementation Playbook

Use this checklist whenever adding a new component contract.

## 1. Define Contract

Create `docs/component-contracts/components/<component>.contract.json` and fill all required sections.

Minimum quality gate:

1. At least 3 states
2. At least 3 interactions
3. At least 4 API rows
4. Accessibility notes for keyboard, focus, and aria
5. At least 2 copy snippets
6. At least 3 tests in test matrix

## 2. Add Interaction Snippets

Create snippets under `docs/component-contracts/snippets/<component>/`.

Each component should have:

- one controlled-state snippet
- one accessibility-focused snippet

## 3. Validate

Run:

```bash
npm run contracts:validate
```

Validation fails if:

- required section is missing
- snippet file path in contract is missing
- component has fewer than the minimum required entries

## 4. Wire into UI (later)

Current repository keeps UI unchanged by design. After contract quality is stable, integrate contract data into page rendering.
