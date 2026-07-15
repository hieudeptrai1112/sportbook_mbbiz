---
name: pattern-preview-authoring
description: Build or map a pattern page in the mbbiz preview app when the user says "pattern + <component/pattern name>". Use exact Figma nodes, follow the component-page preview structure, reuse existing Mbbiz dependencies, and do not push until the user explicitly says "push".
---

# Pattern preview authoring

Use this skill when the user asks for a new pattern page or a new pattern tab in the preview app, for example:

- `pattern footer`
- `pattern header`
- `pattern table toolbar`

## Required outcome

Create or update a Pattern tab/page in the `mbbiz` preview app with:

- a page header consistent with other component pages
- a title and lead description
- demo sections split into cases
- a visible demo frame/card for each case

Do not push unless the user explicitly says `push`.

## Workflow

1. Read the exact Figma node(s) first.
2. Use Figma node values as the source of truth for:
   - spacing
   - button width and height
   - shell padding
   - overlay direction and anchor
   - preview frame size needed to show the full case
3. Reuse existing Mbbiz components used inside the pattern.
4. Add the pattern page under Pattern in the preview app. Keep the page structure parallel to other component pages.
5. Split the pattern into explicit cases. Each case should have:
   - section title
   - short description or usage note
   - demo frame
6. Skip snippet code, API docs, and token docs in the first mapping pass unless the user asks for them.
7. Validate the rendered structure with the smallest relevant checks.

## Pattern-specific guardrails

### Never do these again

- Do not estimate layout from screenshots when the user has provided a Figma node.
- Do not replace exact node widths with `clamp`, rough percentages, or guessed responsive values during the first pass.
- Do not put overlay UI in normal flow if Figma shows it as an anchored overlay.
- Do not let demo containers clip overlays.
- Do not ignore product context. A footer pattern sits at the bottom of a page, so overflow menus may need to open upward.

### Overlay rules

If the pattern has a dropdown, droplist, or popover:

- anchor it to the trigger shown in Figma
- match the opening direction from Figma
- keep the trigger aligned with the rest of the row
- reserve enough preview height so the full overlay is visible
- do not let the overlay shift sibling actions out of place

### Dependency rules

- Use the project's real dependency component, not a hand-drawn substitute.
- If the pattern depends on Button, use the existing `mbbiz-button`.
- Width fidelity must be enforced at the actual rendered host, not only at an outer wrapper, when the component API allows the host to stretch differently.

## Preview app mapping checklist

- Pattern tab exists and is placed under Pattern navigation
- Page structure matches other preview pages
- Cases are split clearly
- Demo frame is visible and large enough
- Exact Figma spacing is applied
- Existing dependencies are reused
- Overlay behavior matches node behavior
- No snippet/API/token sections were added unless requested
- Changes remain local until the user says `push`

## Validation

Run only the smallest relevant checks for the change. Prefer:

- `git diff --check`
- preview app build

If the user questions visual fidelity, re-check the node directly rather than defending the current output from screenshots.
