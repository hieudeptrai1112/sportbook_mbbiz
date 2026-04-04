# Component Contracts

This folder is the source of truth for component documentation content and copy-ready code examples.

## Goal

Keep current UI unchanged while standardizing component page data so every component can include:

1. Overview
2. State model
3. Interaction model
4. API contract
5. Accessibility contract
6. Token bindings
7. Examples
8. Copy-ready snippets
9. Test matrix
10. Changelog

## Structure

- `schema/component-contract.schema.json`: machine-readable schema reference.
- `templates/component-contract.template.json`: starter file for new components.
- `components/*.contract.json`: concrete contracts per component.
- `snippets/<component>/*.ts`: copy-ready Angular snippets focused on state and interaction.

## Workflow

1. Create or update `components/<name>.contract.json`.
2. Add snippet files under `snippets/<name>/`.
3. Run `npm run contracts:validate`.
4. Only then wire the contract into UI pages.

## Notes

- Contracts may include `implementationStatus` with values `shipped` or `planned`.
- `planned` components must be clearly marked to avoid misleading readers.
