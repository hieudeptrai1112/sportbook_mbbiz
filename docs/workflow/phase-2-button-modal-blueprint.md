# Phase 2 Button And Modal Blueprint

Mục tiêu: chuẩn hóa lại Button và Modal đã chốt trên preview theo hướng use-case-first trước khi mapping/tách/docs.

## Scope guard

- Preview app: `http://127.0.0.1:4300/`.
- Không sửa tab `Buttons` hoặc `Button Mapping` trên sportbook6vn app trong phase này.
- Không thêm use case ngoài Figma node đã có hoặc yêu cầu rõ ràng của user.
- NG-Zorro/Arco chỉ dùng để tham chiếu cách chia demo, không dùng để tự phát sinh state mới.

## Button

| Item | Value |
| --- | --- |
| Figma node | `18693:412281` |
| Selector | `sportbook6vn-button` |
| Source component | `projects/sportbook6vn/src/lib/components/button` |
| Preview section | `Button family` |

### Required use cases

| Use case | Preview coverage | Evidence |
| --- | --- | --- |
| Basic | Primary, Secondary, Pill Primary, Pill Secondary | Figma button node has rectangle/pill and primary/secondary variants already approved. |
| Size | `lg`, `md`, `sm` for Rectangle/Pill x Primary/Secondary | Existing approved preview had all size variants. |
| Shape | Rectangle and Pill for Primary/Secondary | Existing approved preview had shape families. |
| With icon | Leading, trailing, both sides | User explicitly requested missing icon case and aligned icon/text. |
| Disabled | Disabled variants for Rectangle/Pill x Primary/Secondary x sizes | Existing approved preview had disabled rows. |

### Suggested missing cases

- `Loading`: NG-Zorro has loading demo, but current Figma node scope for Button has not been confirmed for this case.
- `Danger`: NG-Zorro has danger demo, but current Figma node scope has not been confirmed for this case.
- `Block`: NG-Zorro has block demo, but current Figma node scope has not been confirmed for this case.

## Modal

| Item | Value |
| --- | --- |
| Figma nodes | `19611:24390`, `19611:24307` |
| Selector | `sportbook6vn-modal` |
| Source component | `projects/sportbook6vn/src/lib/components/modal` |
| Preview section | `Modal family` |

### Required use cases

| Use case | Preview coverage | Evidence |
| --- | --- | --- |
| Form / Two actions | Modal title, close icon, two inputs, secondary + primary footer actions | User provided modal Figma nodes and approved this family direction. |
| Form / Single action | Same form body with one centered footer action | User explicitly corrected: single action button must be centered in footer. |

### Suggested missing cases

- `Async close`: NG-Zorro has async modal demo, but current Figma node scope has not been confirmed for this case.
- `Confirm`: NG-Zorro has confirm/service modal demos, but current Figma node scope has not been confirmed for this case.
- `Footer custom`: NG-Zorro has custom footer demos, but current Figma node scope has not been confirmed for this case.

## Done criteria

- Button preview is no longer organized as `Rectangle/Primary`, `Rectangle/Secondary`, `Pill/Primary`, `Pill/Secondary` cards.
- Button preview is organized as `Basic`, `Size`, `Shape`, `With icon`, `Disabled`.
- Modal preview remains limited to confirmed form modal cases.
- No new component API is introduced in this phase.
- Type check and library tests pass.
