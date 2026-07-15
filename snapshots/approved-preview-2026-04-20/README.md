# Approved Preview Snapshot

Snapshot này là bản sao nội bộ để giữ lại mốc preview/library đã được chốt tại thời điểm `2026-04-20`.

Mục đích:
- giữ một baseline an toàn trong repo để đối chiếu khi preview hiện tại bị sửa lệch
- giúp phục hồi lại `mbbiz` và `mbbiz-preview` mà không phải suy luận từ lịch sử chat
- tránh phải sửa tay từng file khi cần quay lại trạng thái đã chốt

Phạm vi snapshot:
- `workspace/`
  - `angular.json`
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
  - `tsconfig.mbbiz-preview.json`
- `projects/mbbiz/`
- `projects/mbbiz-preview/`

Tiện ích kèm theo:
- `tools/diff-against-live.sh`
  - so sánh snapshot với workspace hiện tại
- `tools/restore-to-live.sh --apply`
  - tạo backup hiện tại trước
  - chỉ khôi phục đúng các file/thư mục nằm trong snapshot này

Ghi chú:
- Đây là bản sao tham chiếu, không tự được app dùng trực tiếp.
- Script khôi phục không chạy nếu không truyền `--apply`.
- Snapshot này được tạo để giảm rủi ro khi chỉnh preview/library ở các vòng sau.
