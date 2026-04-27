# Phase 1 Selection Controls Blueprint

Mục tiêu: chuẩn hóa `switch`, `radio`, `checkbox` trên preview theo workflow use case blueprint. File này là nguồn kiểm soát trước khi sửa preview/app docs.

## Confirmed Figma nodes

| Component | Figma node | Current preview selector |
| --- | --- | --- |
| Switch | `3874:181912` | `sportbook6vn-switch` |
| Radio | `3800:178451` | `sportbook6vn-radio`, `sportbook6vn-radio-group` |
| Checkbox | `3800:179128` | `sportbook6vn-checkbox`, `sportbook6vn-checkbox-group` |

## Scope guard

- Chỉ implement/restructure các case có evidence trong Figma node hoặc đã được user yêu cầu trước đó.
- NG-Zorro/Arco chỉ dùng để tổ chức use case, không phải nguồn để tự thêm variant.
- Các case NG-Zorro/Arco có nhưng Figma node không có phải để ở `Suggested missing cases`.

## Switch blueprint

### Figma evidence

Node `3874:181912` chứa:

- Axis `Active`: `No`, `Yes`
- Axis `State`: `Default`, `Loading`, `Pressed`, `Disable`
- Axis `Size`: `M`, `L`
- Tổng cộng: 16 variants

### NG-Zorro organization reference

Local NG-Zorro demo names:

- `switch-basic`
- `switch-disabled`
- `switch-loading`
- `switch-size`
- `switch-text`
- `switch-control`

### Approved blueprint for preview

| Use case | Evidence | Preview requirement |
| --- | --- | --- |
| Basic | `Active=No/Yes`, `State=Default`, `Size=L/M` | Một interactive switch phải toggle được on/off; show thêm static default on/off nếu cần visual QA. |
| Disabled | `State=Disable`, `Active=No/Yes`, `Size=M/L` | Cần có disabled off và disabled on. |
| Loading | `State=Loading`, `Active=No/Yes`, `Size=M/L` | Cần có loading off và loading on, có animation. |
| Size | `Size=M/L`, `State=Default` | Cần show `L` và `M`; không nhân đôi toàn bộ state nếu đã cover ở Basic/Disabled/Loading. |
| Pressed | `State=Pressed` | Không cần static riêng nếu component có real `:active`/pressed interaction; nếu khó QA thì thêm row `Pressed reference`. |

### Current preview gap

- Đã có `Basic`, `Disable`, `Loading`, `Size`.
- Thiếu disabled checked/on.
- Thiếu static/reference cho pressed nếu user cần QA trạng thái pressed.
- Size row hiện chỉ show checked/on; node có cả active no/yes.

### Suggested missing cases

- `Text`: có trong NG-Zorro nhưng không thấy trong Figma node này.
- `Controlled`: có trong NG-Zorro nhưng là behavior docs/demo, không phải visual variant trong node.

## Radio blueprint

### Figma evidence

Node `3800:178451` chứa:

- Axis `Normal`: `Default`, `Disable`
- Axis `Checked`: `No`, `Yes`
- Tổng cộng: 4 variants

### NG-Zorro/Arco organization reference

Local NG-Zorro demo names:

- `radio-basic`
- `radio-disable`
- `radio-radiogroup`
- `radio-radiogroup-options`
- `radio-radiogroup-with-name`
- `radio-size`
- `radio-solid`

User previously requested Arco-like `Radio Group` and `Vertical Radio.Group`, so group/vertical are allowed.

### Approved blueprint for preview

| Use case | Evidence | Preview requirement |
| --- | --- | --- |
| Basic | `Checked=No/Yes`, `Normal=Default` | Show unchecked and checked radio; checked can come from interactive group or direct checked radio. |
| Disabled | `Normal=Disable`, `Checked=No/Yes` | Show disabled unchecked and disabled checked. |
| Radio group | User-requested Arco/NG-Zorro pattern | Horizontal group with one selected option. |
| Vertical radio group | User-requested Arco/NG-Zorro pattern | Vertical group with one selected option. |

### Current preview gap

- Basic currently shows unchecked radio and disabled unchecked only.
- Checked default is only visible through `radio-group`, not in the `Basic` row.
- Disabled checked is missing.

### Suggested missing cases

- `Size`, `Solid`, `Radio button`: present in NG-Zorro but not evidenced by Figma node/user scope for this phase.

## Checkbox blueprint

### Figma evidence

Node `3800:179128` contains:

- Axis `Type`: `Unselected`, `Selected`, `Indeterminate`
- Axis `State`: `Normal`, `Hover`, `Pressed`, `Disable`
- Total visible variants: 12

### NG-Zorro/Arco organization reference

Local NG-Zorro demo names:

- `checkbox-basic`
- `checkbox-disabled`
- `checkbox-group`
- `checkbox-check-all`
- `checkbox-controller`
- `checkbox-layout`

User previously requested `checkbox group`, `vertical checkbox group`, and `select all` with indeterminate state.

### Approved blueprint for preview

| Use case | Evidence | Preview requirement |
| --- | --- | --- |
| Basic | `Type=Unselected/Selected`, `State=Normal` | Show unchecked and checked checkbox, with real toggle interaction. |
| Disabled | `State=Disable`, all types | Show disabled unchecked, disabled checked, disabled indeterminate. |
| Indeterminate | `Type=Indeterminate` | Show standalone indeterminate and select-all indeterminate behavior. |
| Checkbox group | User-requested NG-Zorro/Arco pattern | Horizontal group with selected item(s). |
| Select all | User-requested + `Indeterminate` evidence | Parent checkbox toggles all; partial children set parent indeterminate. |
| Vertical checkbox group | User-requested NG-Zorro/Arco pattern | Vertical group with selected item(s). |
| Hover/Pressed | `State=Hover/Pressed` | Prefer real CSS hover/active interaction; static matrix only if user needs visual state QA. |

### Current preview gap

- Basic currently shows unchecked + disabled unchecked only.
- Standalone checked and standalone indeterminate are not clearly visible in Basic.
- Disabled checked and disabled indeterminate are missing.
- Select-all behavior exists and should be retained.

### Suggested missing cases

- `Controller`: present in NG-Zorro, but current user scope already maps this through `Select all`.
- `Layout`: present in NG-Zorro, but current user scope maps this through vertical group.

## Execution order

1. Switch: fix preview coverage gaps first because scope is smallest and node axes are explicit.
2. Radio: add checked/disabled-checked coverage without disturbing group behavior.
3. Checkbox: add standalone checked/indeterminate/disabled variants while retaining group and select-all behavior.

## Verification checklist per component

- Preview section labels follow blueprint names.
- No new use case outside Figma/user scope.
- Real interaction still works after adding static QA samples.
- Unit tests continue to pass.
- If preview changes are made, run:
  - `npx tsc -p tsconfig.sportbook6vn-preview.json --noEmit`
  - relevant `npm run test:sportbook6vn -- --watch=false`

