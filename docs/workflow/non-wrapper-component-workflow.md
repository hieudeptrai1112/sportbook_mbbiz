# Sportbook6vn Non-Wrapper Component Workflow

## Mục tiêu

Triển khai component theo hướng **không wrapper**: component thật được implement trực tiếp trong `sportbook6vn`, còn preview chỉ là cửa sổ QA.

## Quy tắc bắt buộc

1. Không tạo wrapper layer mới để né implement component thật.
2. Preview không phải nguồn code chính; preview chỉ render lại component thật để kiểm thử visual/interaction.
3. `mapping lên app` luôn map vào tab Mapping chung trên app tabbar (integration tab), không tự tách tab component riêng.
4. `tách + <tên component>` mới là lệnh tạo tab docs riêng cho component.
5. Mapping/tách không được viết lại component; chỉ tổ chức demo/docs quanh component thật.
6. Snippet/API/token docs được hoàn thiện sau khi component đã ổn định qua preview và mapping.

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

6. Mapping lên app (tab Mapping chung):
- Dùng lệnh `mapping lên app` hoặc `mapping lên app + <tên component>`.
- Map 1:1 toàn bộ variant/state/interaction đã chốt từ preview sang tab Mapping chung.
- Không tạo tab docs riêng ở bước này.

7. Tách sang tab docs riêng khi cần:
- Dùng lệnh `tách + <tên component>`.
- Tách block đã map từ tab Mapping chung sang tab docs riêng theo chuẩn trang component (pattern như Buttons).
- Tab Mapping chung chỉ giữ vai trò integration summary.

8. Hoàn thiện docs package ở tab riêng:
- Snippet code.
- API docs.
- Component token docs.

9. Chốt phát hành:
- Commit.
- Push.
- Deploy.
- Hard refresh và kiểm tra production docs.

## Command semantics

- `mapping lên app` hoặc `mapping lên app + <tên component>`:
Map 1:1 toàn bộ variant/state/interaction đã chốt từ preview sang tab Mapping chung trên app docs bằng component thật (không wrapper). Không tạo tab component riêng, không tạo block trùng cho cùng component.

- `tách + <tên component>`:
Tách component đã map từ tab Mapping chung ra tab docs riêng theo chuẩn trang component.
Khi chạy lệnh này phải thực hiện đầy đủ các bước sau:
1. Tạo/chuẩn hóa tab riêng ở menu trái cho component.
2. Lấy source block từ tab Mapping chung, tổ chức lại section theo đúng cấu trúc docs của component (không đổi UI đã chốt ở preview).
3. Bổ sung snippet docs cho các section chính:
   - Quick usage (copy-ready).
   - Angular setup/import.
   - Interactive/runtime behavior (nếu component có interaction).
4. Bổ sung API docs:
   - Inputs/Outputs/public types/default values.
   - Mô tả behavior quan trọng (ví dụ controlled/uncontrolled, clear/select/disabled/loading...).
5. Bổ sung component token docs:
   - Danh sách token đang dùng trong style của component.
   - Mapping token -> vai trò UI (border/text/background/state).
6. Tự kiểm tra trước khi báo xong:
   - Snippet copy được và chạy được.
   - API table khớp với code hiện tại.
   - Token table không mâu thuẫn style thực tế.
