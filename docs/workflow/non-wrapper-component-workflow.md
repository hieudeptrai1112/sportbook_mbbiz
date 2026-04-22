# Sportbook6vn Non-Wrapper Component Workflow

## Mục tiêu

Triển khai component theo hướng **không wrapper**: component thật được implement trực tiếp trong `sportbook6vn`, còn preview chỉ là cửa sổ QA.

## Quy tắc bắt buộc

1. Không tạo wrapper layer mới để né implement component thật.
2. Preview không phải nguồn code chính; preview chỉ render lại component thật để kiểm thử visual/interaction.
3. Mapping lên docs/component page chỉ tổ chức demo/section, không viết lại component.
4. Chỉ viết snippet/API/token docs sau khi component ổn định.

## Chuỗi bước chuẩn

1. Chốt đầu vào:
- Node Figma.
- Link code NG-Zorro tham chiếu.
- Danh sách state/variant bắt buộc.

2. Implement trực tiếp component thật trong `sportbook6vn`:
- Logic.
- Template.
- Style.
- Token.

3. Thêm unit test cho behavior chính:
- `select all`, `indeterminate`, `loading`, `clear`, `disabled` (và các behavior đặc thù của component).

4. Render chính component đó lên preview để QA:
- Preview chỉ là cửa sổ kiểm thử visual và interaction.

5. QA và chốt trên preview.

6. Mapping sang trang docs/component page:
- Không viết lại component.
- Chỉ tổ chức demo + section theo cấu trúc docs.

7. Sau khi ổn định mới hoàn thiện:
- Snippet code.
- API docs.
- Component token docs.

8. Chốt phát hành:
- Commit.
- Push.
- Deploy.
- Hard refresh và kiểm tra production docs.

## Command semantics

- `mapping lên app + <tên component>`:
Map 1:1 toàn bộ variant/state/interaction đã chốt từ preview sang app docs bằng component thật (không wrapper).

- `tách + <tên component>`:
Tách component đã map ra tab docs riêng theo chuẩn trang component; `Core-3 Mapping` chỉ giữ vai trò integration summary.
