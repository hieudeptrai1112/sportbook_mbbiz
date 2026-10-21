do not reference any fake stories or examples that would mislead a reader

# User Workflow Memory

## Preview App

- When the user says `preview app`, understand this as the `mbbiz` preview app.
- The preview app is where component cases are split, adjusted, and reviewed before mapping into docs/app.

## Important User Skills

### tao

- Trigger: `tạo + <component name>`.
- Read the Figma node(s) the user sends.
- Refer to NG-Zorro code and Arco/NG-Zorro case organization.
- Implement the component on the `mbbiz` preview app.

### tao-copy

- Trigger: `tạo copy + <component name>`.
- Same workflow as `tạo`, except copy the relevant NG-Zorro implementation directly.
- Do not create a wrapper and do not write source attribution in the product/docs output.

### mapping-len-app

- Trigger: `mapping lên app + <component name>` or `mapping lên app "<component name>"`.
- Map preview components into a complete docs/app component page/tab.
- Do not put these components into the three Core mapping sections.
- Do not generate snippet code, API docs, or component token docs during mapping.
- If the user asks to list related components before mapping, list them first, then map.

### code

- Trigger: `code + <component/page component>`.
- Generate snippet code, API docs, and component token docs for an already mapped component/page.

### pattern

- Trigger: `pattern + <component/pattern name>`.
- Create or extend a tab under Pattern in the `mbbiz` preview app.
- Render the preview page with the same page structure used by other component pages:
  - page header
  - title
  - lead/description
  - demo sections/cases
  - demo card/frame
- Do not generate snippet code, API docs, or token docs during the first pattern mapping pass unless the user explicitly asks.
- Read the exact Figma node(s) first. Do not estimate spacing, size, or overlay behavior from screenshots alone.
- Reuse existing Mbbiz components that the pattern depends on. Do not redraw a dependency if the component already exists.
- If the pattern contains overlay UI such as dropdown, droplist, or popover, place it according to the product context shown in Figma:
  - footer/bottom-page patterns must open upward when the node shows an upward menu
  - the preview frame must reserve enough visible area to show the full overlay
  - do not place overlay content in normal flow when Figma shows it as an anchored overlay
- Match exact Figma dimensions when the node provides them. Do not replace fixed node values with approximate or responsive guesses unless the user asks for adaptation.
- Do not push after implementing a pattern unless the user explicitly says `push`.

### tach

- Trigger: `tách + <component name>`.
- Legacy flow for splitting a component into its own docs tab/page.

### thay-token

- Trigger: `token + <component name>`, for example `token button`.
- Use the skill draft at `docs/skills/thay-token/SKILL.md`.
- Use this when replacing, updating, adding, or remapping alias/component tokens for an existing Mbbiz component.
- Treat Figma alias tokens as the source of truth. Do not edit primitive/global tokens unless the user explicitly asks.
- Before editing, audit token usage with `rg` and identify blast radius across runtime library CSS, preview/docs demo CSS, and token docs.
- Never change a shared token variable before checking every selector and component case that uses it.
- Keep scope explicit: component, variant, shape, state, and role.
- Role must match use: `background/*`, `text/*`, `icon/*`, and `border/*`.
- If only one shape/variant changes, use shape/state-specific selectors or component-scoped tokens so unrelated variants are not affected.
- Runtime CSS, docs/demo CSS, and color/component token tables must stay in sync.
- Validate with the smallest relevant checks, normally `npm run build:mbbiz`, `npm run build`, and `npm run test:mbbiz -- --watch=false` when shared component CSS changed.
