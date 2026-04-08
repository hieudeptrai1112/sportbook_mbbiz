# Component Pages Command Rules

## Context
We are building component documentation pages for the Sportbook design system site.
Input-family specific structure is defined in `docs/commands/input-family-doc-outline.md`.
Demo codebox standard is defined in `docs/commands/component-demo-codebox-checklist.md`.

## Goal
Every new component page must follow the same UX contract as the current Button page, while keeping the global site UI unchanged.

## Non-Negotiable Guardrails
- Do not redesign the global shell (top nav, left sidebar, right anchor column, layout widths, theme switch behavior).
- Keep existing visual language consistent (spacing rhythm, typography hierarchy, table style, code card style).
- Do not change component UI that comes from Figma source of truth. Doc demos must preserve Figma geometry, typography, and visual tokens.
- Do not add fictional stories or misleading examples. All examples must be realistic and implementable.
- New components must plug into the same page framework used by Button; do not create a one-off page pattern.
- `Preview` always means real interactive rendering: no static mockup-only previews for interactive components.

## Required Page Structure (In Order)
1. `Page Header`
   - Meta line (category/version), title, concise description.
   - Divider line between header and body (Arco-like separation).
2. `Variant Demo Sections`
   - Section title, short intent text, token tags.
   - Live preview card with required states/variants.
   - Demo controls: toggle code, copy, language switch.
3. `API`
   - Standard API table: Property, Description, Type, Default.
4. `State / Status Contract` (for interactive form components)
   - Clarify separation between interaction `state` and business `status`.
   - Include deterministic priority mapping and reference code.
5. `Component Token` (rename from Variable Bindings; keep this naming)
   - Color token binding tables.
   - Core Layout and Typography Styles tables.

## Required Documentation Content
- Overview: purpose + when to use.
- Variants: all visual options and states (`default`, `hover`, `pressed`, `disabled` when applicable).
- Usage Guidelines:
  - Designer guidance (do/don't, hierarchy, layout intent).
  - Developer guidance (props/events/constraints).
- Accessibility: keyboard, focus, semantics/ARIA, contrast notes.
- Spacing rules and sizing behavior.
- Implementation examples with copyable snippets.

## Code Snippet Contract (Copy-Ready)
- Keep current snippet UI pattern (same controls/card layout), following `component-demo-codebox-checklist.md`.
- Provide both `HTML` and `TS` snippets for each important demo.
- At least one snippet must include real interaction logic (state change, event handlers, toggles, async/loading if relevant) so devs can copy and run immediately.
- Snippets must stay aligned with the shown preview state/behavior.
- Syntax highlighting style can be improved, but snippet content must remain accurate.

## Table Contracts
### Color Token Tables (inside Component Token)
- Column order:
  1. `Component token` (swatch + token name)
  2. `Alias token`
  3. `Description`
- Row hover state should be visible (Arco-like subtle highlight).
- Use current alias source-of-truth naming; do not invent token names.

### Core Layout + Typography Styles Tables
- Column order:
  1. `Token note`
  2. `Value`
  3. `Applied to`
- Header labels must be single-line.

## Anchor / On This Page Contract
- Follow current Arco-like behavior:
  - Fixed right anchor rail.
  - Collapse/expand button style and position consistent with current implementation.
  - Long labels truncate with ellipsis instead of wrapping.
- Do not reintroduce old anchor styles once standardized.

## Theme Contract
- Light/Dark switch must update the full page surface, not just local cards.
- Maintain readable contrast for all text elements in both modes (especially sidebar section labels and body text).
- Keep mode toggle sizing/position consistent across themes.

## Publish Acceptance Checklist
- [ ] Global shell UI is unchanged.
- [ ] Page structure matches Button baseline.
- [ ] Required sections are complete and ordered.
- [ ] Variant demos include required states and real behavior.
- [ ] Copy-ready snippets include both HTML and TS where needed.
- [ ] API table is complete and consistent.
- [ ] Component Token tables follow the defined column contracts.
- [ ] Anchor behavior and truncation match the standard pattern.
- [ ] Light/Dark rendering is fully consistent and contrast-safe.
