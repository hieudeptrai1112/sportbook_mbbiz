# Core-3 Stabilization And Next Step

Mục tiêu của tài liệu này là khóa an toàn cho 3 family đã chốt (`button`, `input`, `dropdown`) trước khi mở rộng component tiếp theo.

## 1) Khóa baseline đã chốt

Chạy lệnh:

```bash
npm run verify:core3
```

Lệnh này kiểm tra:
- mapping Figma ↔ code ở `docs/workflow/core3-code-connect-manifest.json`
- baseline hash lock ở `docs/workflow/core3-baseline.lock.json`
- API lock ở `docs/workflow/core3-api-lock.json`
- mapping preview ↔ library/app ở `docs/workflow/core3-preview-app-map.json`
- tính hợp lệ contract (`npm run contracts:validate`)
- compile preview (`npx tsc -p tsconfig.mbbiz-preview.json --noEmit`)

Nếu chỉ cần kiểm tra lock nhanh trước khi sửa UI:

```bash
npm run verify:core3:locks
```

Nếu cố ý cập nhật core-3 và muốn chốt baseline mới:

```bash
npm run lock:core3:update
```

Nếu cần diff với snapshot an toàn:

```bash
./snapshots/approved-preview-2026-04-20/tools/diff-against-live.sh
```

## 2) Quy tắc khi làm component mới

- Không sửa UI của `button`, `input`, `dropdown` nếu không có yêu cầu rõ ràng.
- Chỉ mở scope file cho component mới + block preview tương ứng.
- Mỗi component mới phải đi qua 3 bước:
  1. chốt node ID Figma
  2. implement component thật + interaction thật
  3. verify lại `verify:core3` để chắc chắn core-3 không bị drift

## 3) Component tiếp theo nên làm

Theo roadmap trước đó, component tiếp theo nên là `modal` (độc lập, ít phụ thuộc, nhanh để chốt pattern).

Input cần chốt trước khi code:
- danh sách node ID cho modal và biến thể
- rule tương tác bắt buộc (CTA, close, pagination, icon variant)
- rule giữ nguyên/không giữ nguyên demo hiện tại

Khi có đủ input trên, triển khai theo cùng pattern đã dùng cho core-3.

## 4) DoD checklist cho mỗi component (sau khi chốt preview)

Checklist này áp dụng cho flow hiện tại (clone NG-Zorro style + component thật `mbbiz`):

- [ ] Chốt node ID Figma + rule interaction bắt buộc.
- [ ] Implement component trong `projects/mbbiz/src/lib/components/<component>/`.
- [ ] Chốt full variant/state/interaction trên preview (không thiếu, không thừa).
- [ ] Chạy `mapping lên app + <tên component>` để map 1:1 từ preview sang app docs.
- [ ] Commit + push + kiểm tra bản deploy thực tế (hard refresh).
- [ ] Chạy Code Connect cho component vừa chốt (map node Figma ↔ component code).
- [ ] Chạy `npm run verify:core3` để kiểm tra contracts + locks + type-check.
- [ ] Chỉ khi chủ động chốt baseline mới thì chạy `npm run lock:core3:update`.
- [ ] Nếu cần tách nội dung theo docs IA: chạy `tách + <tên component>` để tạo tab/menu trái riêng và giữ đúng cấu trúc docs rules.
- [ ] Chốt release nội bộ (version + changelog ngắn) để app team dùng thật.
