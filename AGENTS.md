do not reference any fake stories or examples that would mislead a reader

# User Workflow Memory

## Preview App

- When the user says `preview app`, understand this as the `sportbook6vn` preview app.
- The preview app is where component cases are split, adjusted, and reviewed before mapping into docs/app.

## Important User Skills

### tao

- Trigger: `tạo + <component name>`.
- Read the Figma node(s) the user sends.
- Refer to NG-Zorro code and Arco/NG-Zorro case organization.
- Implement the component on the `sportbook6vn` preview app.

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

### tach

- Trigger: `tách + <component name>`.
- Legacy flow for splitting a component into its own docs tab/page.

### thay-token

- Trigger: `token + <component name>`, for example `token button`.
- Use the skill draft at `docs/skills/thay-token/SKILL.md`.
- Use this when replacing, updating, adding, or remapping alias/component tokens for an existing Sportbook6vn component.
- Treat Figma alias tokens as the source of truth. Do not edit primitive/global tokens unless the user explicitly asks.
- Before editing, audit token usage with `rg` and identify blast radius across runtime library CSS, preview/docs demo CSS, and token docs.
- Never change a shared token variable before checking every selector and component case that uses it.
- Keep scope explicit: component, variant, shape, state, and role.
- Role must match use: `background/*`, `text/*`, `icon/*`, and `border/*`.
- If only one shape/variant changes, use shape/state-specific selectors or component-scoped tokens so unrelated variants are not affected.
- Runtime CSS, docs/demo CSS, and color/component token tables must stay in sync.
- Validate with the smallest relevant checks, normally `npm run build:sportbook6vn`, `npm run build`, and `npm run test:sportbook6vn -- --watch=false` when shared component CSS changed.
