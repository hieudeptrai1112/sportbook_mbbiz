# Preview Fidelity Guard

Skill này dùng để sửa component preview theo đúng yêu cầu UI mà không drift khỏi scope.

## Khi nào dùng

- User yêu cầu sửa preview UI trong `mbbiz-preview`.
- User nhấn mạnh "chỉ sửa đúng phần này", "không phá phần khác", "xóa state trùng", "đúng tương tác thật".
- Có dấu hiệu server stale/hot-reload sai.

## Quy tắc bắt buộc

1. Chỉ sửa file trong phạm vi user chỉ định.
2. Không thêm state demo giả khi user yêu cầu tương tác thật.
3. Với input-like component, mặc định giữ 3 block: `Interactive`, `Error`, `Disabled` (trừ khi user yêu cầu khác).
4. `X` clear phải xóa toàn bộ text đang nhập trên biến interactive đang bind.
5. Trước khi báo "xong", phải xác nhận bundle runtime đang serve đúng bản mới.

## Quy trình thực thi

1. Xác định `ACTIVE_PREVIEW_URL` user đang mở (ví dụ `http://127.0.0.1:4301/`).
2. Xác định đúng file cần sửa (thường là `projects/mbbiz-preview/src/app/app.component.html` và `.ts`).
3. Chốt scope sửa bằng 1 câu ngắn trước khi edit.
4. Edit tối thiểu, không mở rộng sang component khác.
5. Verify compile nhanh:
   - `npx tsc -p tsconfig.mbbiz-preview.json --noEmit`
6. Verify runtime bundle:
   - đọc `ACTIVE_PREVIEW_URL/main.js`
   - kiểm tra token mong muốn có/không có.
7. Nếu bundle stale:
   - restart đúng dev server của preview port hiện tại.
8. Báo kết quả ngắn, kèm file path và URL preview.

## Checklist trước khi kết thúc

- [ ] Không còn state trùng theo yêu cầu.
- [ ] Tương tác chính hoạt động thật (hover/focus/clear/input).
- [ ] `Error` và `Disabled` vẫn đúng.
- [ ] Bundle runtime đã phản ánh sửa đổi.
- [ ] Không có thay đổi ngoài scope.

## Bổ sung: kiểm tra lại (recheck) cho lỗi "đã sửa nhưng UI chưa đổi"

### Dấu hiệu lỗi

- File đã sửa đúng nhưng UI trên `127.0.0.1` vẫn giữ layout cũ.
- Thường gặp khi dev server báo nhiều dòng `Watchpack Error: EMFILE`.

### Nguyên nhân gốc

- Runtime bundle (`main.js`) bị stale so với source hiện tại do watcher bị quá tải.
- Kết quả là review bằng mắt bị lệch vì đang nhìn bản build cũ.

### Bắt buộc khi user nói "kiểm tra lại"

1. So sánh source và runtime:
   - kiểm tra token CSS/HTML vừa sửa có xuất hiện trong `main.js` chưa.
2. Nếu chưa xuất hiện:
   - restart dev server preview ngay, không tiếp tục sửa code.
3. Sau restart:
   - kiểm tra lại `main.js` lần 2 với chính token vừa sửa.
4. Chỉ sau khi runtime khớp mới kết luận UI đúng/sai.

### Template note cho báo cáo lỗi

- `Lỗi`: runtime stale, không phải logic component.
- `Vị trí`: `ng serve mbbiz_preview` watcher (`EMFILE`) + `main.js` chưa cập nhật.
- `Fix`: restart preview server và re-verify token trong bundle trước khi review UI.

## Prompt ngắn để gọi skill

`Áp dụng Preview Fidelity Guard cho URL http://127.0.0.1:4301/, chỉ sửa đúng component tôi chỉ định, gộp state input về Interactive/Error/Disabled và verify bằng bundle runtime trước khi báo xong.`
