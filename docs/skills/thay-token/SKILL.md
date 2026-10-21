---
name: thay-token
description: Use when the user prompts `token + <component name>`, for example `token button`, or asks in Vietnamese/English to replace, update, add, or remap alias/component tokens for an existing Mbbiz component. This skill is for safe token changes in the component library and docs, especially color token changes from Figma alias tokens.
metadata:
  short-description: Safely update component tokens
---

# Thay Token

Use this skill when the user says `token + <component>` such as `token button`, or asks to change/update/add token mappings for an existing Mbbiz component.

Vietnamese trigger intent: `token + tên component`.

## Core Rules

- Treat alias tokens as the source of truth. Do not edit primitive/global tokens unless the user explicitly asks.
- Do not invent new primitive or alias tokens. If a new component token is needed, map it to an existing alias token.
- Never change a token variable before checking where it is used. A token that looks variant-specific may still be shared by another shape/state.
- Keep scope narrow: component, variant, shape, state, and role must be explicit before editing.
- Role must match use: background uses `background/*`, text uses `text/*`, icon uses `icon/*`, border/stroke uses `border/*`.
- If Figma reports a suspicious role, for example a border bound to `background/*`, stop and report the mismatch before choosing a role-correct alias.
- Do not let runtime component CSS, preview/docs demo CSS, and token docs drift from each other.

## Required Workflow

1. **Parse the request**
   - Identify component name, Figma URL/node if provided, and target variants/states.
   - If no Figma node or token table is provided, inspect existing docs/code first. Ask only if the target token cannot be inferred safely.

2. **Read Figma when provided**
   - Use `figma-use` before any Figma MCP call.
   - Extract alias tokens by role and state.
   - Produce a local mapping table with: `component`, `variant`, `shape`, `state`, `role`, `alias`, `value`.

3. **Audit current code before editing**
   - Use `rg` to find component files, existing component tokens, alias names, and CSS variables.
   - Check at minimum:
     - `projects/mbbiz/src/lib/foundations/tokens/`
     - `projects/mbbiz/src/lib/components/<component>/`
     - `src/app/components/ds-<component>/`
     - component docs/data files such as `src/app/*<component>*data.ts`
   - Search for generic selectors that can leak changes, such as tone-only or variant-only selectors without shape/state qualifiers.

4. **Determine blast radius**
   - If a token is used by unrelated variants or shapes, do not change that token value directly.
   - Prefer a shape/state-specific selector or a component-scoped token mapped to an existing alias.
   - For shared secondary button cases, separate rectangle and pill scopes before assigning new pill tokens.

5. **Edit in the correct layers**
   - Update library runtime tokens/CSS.
   - Update docs/preview demo CSS only where that page renders the component.
   - Update component token tables and examples so they match runtime behavior.
   - Keep unrelated token tables and unrelated component cases unchanged.

6. **Post-edit checks**
   - Run `rg` again for changed token names and generic selectors.
   - Confirm the changed variant uses the new alias and unaffected variants still use their old alias.
   - Confirm token docs still match runtime CSS.

7. **Validation**
   - Run the smallest relevant build/test first.
   - For Mbbiz component changes, prefer:
     - `npm run build:mbbiz`
     - `npm run build`
     - `npm run test:mbbiz -- --watch=false` when component behavior or shared CSS changed
   - Report build warnings separately from failures.

8. **Push**
   - Push only after validation.
   - If local git auth is blocked, use the GitHub connector and verify remote file contents after push.

## Failure Patterns To Avoid

- Do not change a shared token like `button-secondary-*` when the request only targets one shape such as pill.
- Do not use generic selectors like `.tone-secondary` when only `.shape-pill.tone-secondary` should change.
- Do not update docs token tables without updating runtime CSS, or runtime CSS without updating docs token tables.
- Do not assume Figma alias category is always role-correct. Validate role by the rendered property.
- Do not rely on build alone for visual token correctness; builds do not catch wrong colors.

## Minimum Response Before Editing

When the change is non-trivial, briefly state:

- Target component and variants.
- Tokens/roles that will change.
- Cases that must remain unchanged.
- Validation commands to run.

Keep this short, then proceed unless the user explicitly asks only for a plan.
