# Input Family Doc Outline (Mbbiz)

## Goal
Create Input documentation that matches the Button page UX contract, while scaling like Arco/Antd input families.
Preserve component visuals from Figma source components exactly (no geometry or style reinterpretation in docs).
Use `docs/commands/component-demo-codebox-checklist.md` for demo/snippet implementation details.
Before publish, re-check alias token mapping on Figma target nodes and confirm color values in docs match current Figma variables.

## Scope (Input Family Split)
Use one parent family `Input` and document these child components:
- `input/basic`
- `input/textarea`
- `input/search`
- `input/password`
- `input/email`
- `input/verification`
- `input/affix-icon`
- `input/affix-label`
- `input/floating-label`

If a variant has different interaction logic or API surface, it must be documented as its own child component section.

## Variant Axis Contract
### Shared axes
- `state`: `default | hover | focus | typing | filled | error | disabled`

### Optional extended error states
- `state`: add `error-typing`, `error-filled` only when design defines distinct visuals.

### Component-specific axes
- `password`: `contentMode=hide | unhide`
- `affix-icon`: `affixMode=prefix | suffix | both`
- `affix-label`: `labelMode=front | post | both`
- `email`: `emailTyped=no | yes`
- `verification`: `state=default | typing | filled | timeout | error`

Never use ambiguous keys like `type` for layout composition.

## API Modeling Contract (Arco-compatible)
- Public form API should prioritize:
  - `status: 'default' | 'error' | 'warning'`
  - `disabled: boolean`
- Visual `state` remains required for docs/QA matrices but should be derived from runtime signals in implementation.
- Recommended priority:
  1. `disabled=true` -> visual `disabled`
  2. `status='error'` -> visual `error / error-typing / error-filled`
  3. interaction signals -> `default/hover/focus/typing/filled`

## Page Sections (In Order)
1. `Overview`
   - Purpose, usage boundary, when not to use.
2. `Anatomy`
   - Input container, value text, placeholder, prefix slot, suffix slot, helper/error text.
3. `State Matrix`
   - Visual states for each relevant axis.
   - For `input/basic`, keep Arco-like order inside demos:
     - `Basic` (neutral interaction states)
     - `Status` (merged error interactive branch + disabled sample)
     - Optional extended matrix only if it adds non-duplicated behavior.
4. `Variants`
   - Child component blocks (`basic`, `search`, `password`, etc).
5. `Interactions`
   - Focus, typing, clear, submit, reveal/hide, validation, timeout flows.
6. `API`
   - Props, emits/events, defaults, constraints.
7. `Component Token`
   - Color token table.
   - Core Layout table.
   - Typography Styles table.
8. `Accessibility`
   - Label association, aria rules, keyboard behavior, error announcement, contrast.
9. `Copy-ready Snippets`
   - HTML + TS snippets with runnable logic.
10. `Edge Cases`
   - Long text, empty value, disabled+error priority, async validation.

## Mandatory Snippets (HTML + TS)
For Input family pages, include at least:
- Basic controlled input with focus/error/disabled switching.
- Prefix/Suffix slot composition:
  - prefix only
  - suffix only
  - both
  - custom content (not icon-only assumption)
- Search input with submit and clear behavior.
- Password input with `contentMode` toggle (hide/unhide).
- TextArea with typing/focus/error and character feedback.
- Email input with `emailTyped` transitions and invalid format handling.
- Verification input with `timeout` and retry flow.

Each snippet must match the visible demo state and run after paste with minimal edits.
Do not output static-only snippets for interactive sections; include event handlers and state transitions used by preview.

## Slot Contract (Code)
Treat prefix/suffix as dynamic projected content, not fixed icon/text.
- Angular recommendation:
  - prefix: `ng-content select="[dsInputPrefix]"`
  - suffix: `ng-content select="[dsInputSuffix]"`
- Document fallback behavior when slot is empty.
- Document spacing rules when one or both slots are present.

## Naming + Copy Rules
- Use machine-friendly, English, lower camel/snake style values.
- Do not mix locale-specific labels inside variant names.
- Do not add fictional examples or fake business stories.

## Publish Checklist (Input Family)
- [ ] Family split and section order follow this file.
- [ ] Variant keys and values match the contract above.
- [ ] Snippets include real interaction logic, not static markup only.
- [ ] Slot examples include dynamic content cases.
- [ ] API, tokens, and demo visuals stay in sync.
