# Component Demo Codebox Checklist (Arco-style)

## Purpose
Standardize every demo block so developers can preview, inspect, copy, and run snippets immediately.
This checklist applies to all component pages (Button, Input, Dropdown, Checkbox, ...).

## Required Block Structure
Each demo section must keep this order:
1. `Section header`
2. `Section description`
3. `Token tags` (optional but recommended)
4. `Preview card`
5. `Demo operations row`
6. `Code panel` (expand/collapse)

## UI Contract (Do Not Drift)
- Keep current global shell UI unchanged (top nav, sidebar, right anchor).
- Keep preview visuals 1:1 with Figma source component.
- Keep operation controls consistent across pages:
  - Toggle code
  - Copy
  - Language switch (`HTML` / `TS`)
- Keep code panel visual style consistent (header row + syntax-highlighted code block).

## Accessibility Contract
- All operation buttons must be real `<button>` elements.
- Every icon-only button must include `aria-label`.
- Keyboard navigation must work for:
  - toggle code
  - copy
  - snippet language switch

## Copy-Ready Snippet Contract
- Every important demo must provide `HTML` and `TS`.
- Snippets must be runnable with minimal edits:
  - include all required imports
  - include required Angular dependencies (for example `CommonModule` when using `*ngFor`)
  - avoid missing external files unless clearly documented
- At least one snippet per component must include real interaction logic:
  - state transition
  - click/input handler
  - disabled/loading/validation behavior (when relevant)
- Snippet behavior must match visible preview behavior exactly.

## Data Contract for Demo Definitions
For section-driven data files (`*.demos.data.ts`), keep:
- `title`, `description`, `tags`
- `actions` or `interactive` state metadata
- `snippetHtml`, `snippetTs` as source of truth for copy panel
- Avoid demo-only fake stories; use neutral, implementable examples.

## QA Checklist Before Merge
- [ ] Preview matches Figma visuals.
- [ ] Snippet matches preview output and behavior.
- [ ] Copy button copies the currently selected language snippet.
- [ ] Snippet compiles in project TypeScript check.
- [ ] Dark mode and light mode preserve readable code contrast.
- [ ] No fake business story or misleading placeholder logic.
