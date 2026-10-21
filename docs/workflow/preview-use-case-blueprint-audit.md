# Preview Use Case Blueprint Audit

Mục tiêu: chuẩn hóa lại các component đã xuất hiện trên preview theo workflow non-wrapper mới. Từ nay mỗi component phải có use case blueprint trước khi sửa UI, mapping docs, hoặc tách tab riêng.

## Quy tắc phạm vi

- Blueprint chỉ được lấy từ Figma node đã cung cấp hoặc yêu cầu rõ ràng của user.
- NG-Zorro/Arco chỉ dùng để tham chiếu cách tổ chức use case và API/interaction pattern.
- Nếu NG-Zorro/Arco có case hay nhưng Figma node không có, ghi vào `Suggested missing cases`; không tự implement.
- Preview chỉ render component thật để QA visual/interaction; preview không phải implementation riêng.
- Khi cấu trúc lại, không đổi style/interaction đã chốt nếu chưa có yêu cầu rõ ràng.

## Thống kê hiện tại trên preview

Preview hiện render các component thật sau:

| Nhóm | Component/selector | Preview hiện tại | Trạng thái blueprint |
| --- | --- | --- | --- |
| Input family | `mbbiz-input` | Basic + Status | Cần formalize blueprint từ Figma node input basic. |
| Input family | `mbbiz-affix-input` | Basic + Status | Cần formalize; kiểm tra node có prefix/suffix/both hay không. |
| Input family | `mbbiz-search-input` | Basic + Status | Cần formalize; clear icon phải là behavior thật. |
| Input family | `mbbiz-password-input` | Basic + Status | Cần formalize; cover hide/unhide theo node. |
| Input family | `mbbiz-textarea` | Basic + Status | Cần formalize; kiểm tra counter/max length có nằm trong node không. |
| Input family | `mbbiz-floating-label-input` | Basic + Status | Cần formalize; kiểm tra height/label states theo node. |
| Input family | `mbbiz-affix-label-input` | Basic + Status | Cần formalize; dropdown affix phải có blueprint riêng nếu node có. |
| Input family | `mbbiz-input-tag` | Basic + Status + Advanced | Cần formalize kỹ; Arco advanced case chỉ giữ khi Figma/user đã chốt. |
| Selection | `mbbiz-checkbox` | Basic, Group, Select all, Vertical group | Gần đúng pattern NG-Zorro; cần tạo blueprint chính thức. |
| Selection | `mbbiz-checkbox-group` | Group + Vertical + Select all | Gần đúng pattern NG-Zorro; cần kiểm tra node có select-all không. |
| Selection | `mbbiz-radio` | Basic, Group, Vertical group | Gần đúng pattern Arco/NG-Zorro; cần tạo blueprint chính thức. |
| Selection | `mbbiz-radio-group` | Group + Vertical | Gần đúng; cần kiểm tra node có disabled option hay không. |
| Selection | `mbbiz-switch` | Basic, Disable, Loading, Size | Gần đúng pattern NG-Zorro; cần tạo blueprint chính thức. |
| Feedback/Form | `mbbiz-modal` | Form / Two actions, Form / Single action | Cần formalize theo 2 Figma nodes đã cung cấp. |
| Button | `mbbiz-button` | Rectangle/Pill x Primary/Secondary, Default/With icon/Disabled | Cần đổi blueprint từ ma trận biến thể sang use case-first. |
| Dropdown | `mbbiz-dropdown` | Single, Multi, Empty states | Cần formalize; tránh lẫn trigger state, droplist state, empty state. |
| Dropdown | `mbbiz-dropdown-tag` | Tag states | Cần formalize; kiểm tra rule `+N`, error no helptext, disabled. |

## Tham chiếu tổ chức từ NG-Zorro local package

Các demo có sẵn trong `node_modules/ng-zorro-antd/schematics/demo` dùng làm gợi ý tổ chức, không phải nguồn để tự thêm case:

- Button: `basic`, `icon`, `loading`, `disabled`, `size`, `danger`, `ghost`, `block`, `multiple`.
- Input: `basic`, `size`, `status`, `allow-clear`, `presuffix`, `search-input`, `password-input`, `textarea`, `textarea-with-character-count`, `focus`, `variant`.
- Select/Dropdown: `basic`, `default-value`, `multiple`, `tags`, `search`, `status`, `size`, `placement`, `custom-content`, `max-count`, `automatic-tokenization`.
- Checkbox: `basic`, `disabled`, `group`, `check-all`, `controller`, `layout`.
- Radio: `basic`, `disable`, `radiogroup`, `radiogroup-options`, `radiogroup-with-name`, `size`, `solid`.
- Switch: `basic`, `disabled`, `loading`, `size`, `text`, `control`.
- Modal: `basic`, `footer`, `footer2`, `async`, `confirm`, `service`, `position`, `manual`.

## Kế hoạch cấu trúc lại lần lượt

### Phase 0: Inventory và khóa phạm vi

1. Gắn lại Figma node ID cho từng component/subcomponent trong preview.
2. Với component thiếu node ID trong preview, tìm từ thread hoặc hỏi user trước khi sửa.
3. Tạo bảng `Figma node -> component selector -> required use cases`.
4. Không sửa visual trong Phase 0.

### Phase 1: Component ít rủi ro, dùng để chuẩn hóa format blueprint

1. Switch
   - Blueprint dự kiến: `Basic`, `Disabled`, `Loading`, `Size`.
   - Suggested missing cases nếu node không có: `Text`, `Controlled`.
   - Output: blueprint + preview section đã chia đúng case.

2. Radio
   - Blueprint dự kiến: `Basic`, `Radio group`, `Vertical radio group`.
   - Suggested missing cases nếu node không có: `Disabled option`, `Options array`.

3. Checkbox
   - Blueprint dự kiến: `Basic`, `Checkbox group`, `Select all`, `Vertical checkbox group`.
   - Suggested missing cases nếu node không có: `Controller/layout`.

### Phase 2: Component đã chốt nhưng đang tổ chức theo ma trận biến thể

4. Button
   - Chuyển tư duy blueprint từ `Rectangle/Primary`, `Pill/Secondary` sang use case-first.
   - Blueprint dự kiến theo phạm vi Figma: `Basic`, `Size`, `Shape`, `With icon`, `Disabled`.
   - Suggested missing cases nếu Figma không có: `Loading`, `Danger`, `Block`.
   - Không động tab `Buttons` nếu chỉ làm preview/mapping.
   - Phase 2 update: preview đã chuyển sang các card `Basic`, `Size`, `Shape`, `With icon`, `Disabled`; chi tiết khóa ở `docs/workflow/phase-2-button-modal-blueprint.md`.

5. Modal
   - Blueprint dự kiến: `Form / Two actions`, `Form / Single action`.
   - Suggested missing cases nếu Figma không có: `Async close`, `Confirm`, `Footer custom`.
   - Kiểm tra single action footer alignment trước khi chốt.
   - Phase 2 update: preview giữ đúng hai use case đã có Figma node; chi tiết khóa ở `docs/workflow/phase-2-button-modal-blueprint.md`.

### Phase 3: Dropdown family, tách trigger và droplist rõ ràng

6. Dropdown single
   - Blueprint dự kiến: `Basic`, `Selected`, `Inside label`, `Open`, `Error`, `Disabled`.
   - Không thêm title outside nếu node không có.
   - Phase 3 update: preview đã chuyển sang docs-ready card `Basic Select`, `Inside Label`, `Searchable Droplist`, `Status`, `Disabled`; chi tiết khóa ở `docs/workflow/phase-3-dropdown-blueprint.md`.

7. Dropdown multi
   - Blueprint dự kiến: `Basic`, `Selected`, `Inside label`, `Open`, `Error`, `Disabled`.
   - Kiểm tra overflow text không tràn.
   - Phase 3 update: preview đã chuyển sang docs-ready card `Multiple Select`, `Inside Label`, `Searchable Droplist`, `Status`, `Disabled`; chi tiết khóa ở `docs/workflow/phase-3-dropdown-blueprint.md`.

8. Dropdown tag
   - Blueprint dự kiến: `Basic`, `Selected tags`, `Overflow +N`, `Open`, `Error`, `Disabled`.
   - `+N` hover popover chỉ làm nếu Figma/user đã yêu cầu.
   - Phase 3 update: preview đã chuyển sang docs-ready card `Tag Select`, `Tag Droplist`, `Status`, `Disabled`; error không thêm helptext; chi tiết khóa ở `docs/workflow/phase-3-dropdown-blueprint.md`.

9. Droplist empty states
   - Blueprint dự kiến theo node đã cung cấp: `No data`, `Search no data`, `API error`, `Loading`.
   - Rule search/scrollbar chỉ áp dụng theo sản phẩm: >5 options hiển thị search + scrollbar.
   - Phase 3 update: preview đã chuyển sang docs-ready card `Empty States` với bốn use case có nhãn; chi tiết khóa ở `docs/workflow/phase-3-dropdown-blueprint.md`.

### Phase 4: Input family, xử lý từng child component

10. Input basic
    - Blueprint dự kiến: `Basic interactive`, `Error`, `Disabled`.
    - Interactive phải tự cover default/hover/focus/typing/filled; không tách state strip dư.

11. Search input
    - Blueprint dự kiến: `Basic interactive`, `Typed with clear`, `Error`, `Disabled`.
    - Clear icon phải xóa toàn bộ text đang nhập.

12. Password input
    - Blueprint dự kiến: `Basic interactive`, `Filled + toggle visibility`, `Error`, `Disabled`.
    - Không tự thêm title nếu node state không có.

13. Textarea
    - Blueprint dự kiến: `Basic interactive`, `Counter`, `Error`, `Disabled`.
    - Counter chỉ giữ nếu node có hoặc user đã chốt.

14. Floating label input
    - Blueprint dự kiến: `Basic interactive`, `Filled`, `Error`, `Disabled`.
    - Cần kiểm tra height/label position theo Figma.

15. Affix input
    - Blueprint dự kiến: `Prefix`, `Suffix`, `Both`, `Error`, `Disabled` nếu node có.
    - Không tự thêm mode không có trong node.

16. Affix label input
    - Blueprint dự kiến: `Prefix dropdown`, `Suffix dropdown`, `Open droplist`, `Error`, `Disabled` nếu node có.
    - Flag/currency option phải update selected value đúng option được bấm.

17. Input tag
    - Blueprint dự kiến: `Basic interactive`, `Error`, `Disabled`, `MaxTagCount`, `Responsive tags`, `Render tag`, `Validate email` nếu node/user đã chốt.
    - `Label in value` và `Token separator` không đưa lại nếu user đã yêu cầu xóa hoặc Figma không có.

## Done criteria cho mỗi component khi làm lại blueprint

- Có Figma node ID hoặc user xác nhận phạm vi.
- Có bảng `Use case -> evidence -> preview block -> behavior test`.
- Preview không có state trùng, không thiếu state trong node, không có state ngoài node.
- Component thật giữ nguyên source of truth; preview chỉ render component thật.
- Nếu phát hiện case NG-Zorro/Arco hợp lý nhưng thiếu trong Figma, chỉ ghi `Suggested missing cases`.
- Sau khi user chốt preview, mới mapping/tách/docs.
