# Học Tiếng Hàn — website

Website giới thiệu ứng dụng **Học Tiếng Hàn** (`com.vudoancs.hoctienghan`): trang chủ, Xóa tài khoản, Chính sách quyền riêng tư, Điều khoản sử dụng. Next.js 16 (App Router) + TypeScript, không có thư viện UI. Hỗ trợ ba ngôn ngữ: vi (mặc định), en, zh.

```sh
cp .env.example .env.local   # điền các giá trị
npm install
npm run dev                  # http://localhost:3000
npm run check:publish        # liệt kê những gì còn thiếu; exit 1 nếu thiếu mục bắt buộc
npm run build && npm start   # build cũng in danh sách mục còn thiếu (chỉ cảnh báo)
```

Host ở bất kỳ đâu chạy được Next.js có hỗ trợ Proxy (Vercel, Node server…), vì phần chuyển hướng theo ngôn ngữ chạy trong `src/proxy.ts`. Biến môi trường được đọc **lúc build**, nên sau khi đổi cần build lại.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `src/config/site.ts` | **File cấu hình duy nhất**: URL store, email hỗ trợ, tên developer, thời gian xử lý xóa, thời hạn lưu giữ, các dịch vụ app đang dùng |
| `src/i18n/dictionaries/{vi,en,zh}.ts` | Chuỗi giao diện, form, lỗi |
| `src/content/{vi,en,zh}.tsx` | Nội dung chính sách, điều khoản, danh sách dữ liệu bị xóa / giữ lại |
| `src/proxy.ts` | `/`, `/delete-account`, `/privacy-policy`, `/terms-of-service` → `/{ngôn ngữ}/…` (cookie `NEXT_LOCALE` → `Accept-Language` → `vi`) |
| `src/components/DeleteRequestForm.tsx` | Form yêu cầu xóa (gọi API thật) |
| `src/app/[lang]/delete-account/confirm/page.tsx`, `src/components/ConfirmDeletion.tsx` | Trang xác nhận xóa |
| `src/app/sitemap.ts`, `robots.ts` | Sitemap có hreflang, robots |
| `scripts/check-publish.mjs` | Kiểm tra trước khi publish |

## Nguyên tắc nội dung

- Giá trị `null` trong `site.ts` nghĩa là **chủ app chưa xác nhận**. Trang hiển thị nhãn vàng “⚠ Cần bổ sung: …” thay vì tự đặt giá trị, và `npm run check:publish` thất bại.
- Chính sách được viết theo những gì app và backend làm thực tế (kiểm tra ngày 2026-10-13): `pubspec.yaml`, `lib/core/ads.dart`, `lib/core/analytics.dart`, `backend-api/migrations/0002_accounts.sql`, `backend-api/src/routes/me.ts`. Khi app thay đổi (ví dụ bật đồng bộ đám mây ở phase 5), cập nhật `site.services` và nội dung trong `src/content/`.
- Không có đánh giá, lượt tải hay tính năng giả. Hình điện thoại ở trang chủ là hình minh họa vẽ bằng CSS, không chứa số liệu giả.
- Không có secret nào ở frontend. Tất cả biến trong `.env.example` đều công khai. Khóa Resend chỉ nằm trong Worker secret của backend.

## Xóa tài khoản

Luồng xóa trên web, không cần đăng nhập. API nằm trong `backend-api` (`src/routes/account-deletion.ts`; tài liệu chi tiết ở `docs/API.md` và `docs/BACKEND.md → Email`):

1. `/{lang}/delete-account`: người dùng nhập email và tích xác nhận, form gửi `POST {API_BASE_URL}/v1/account-deletion/request {email, locale}`. Server **luôn trả 202 với cùng một thông báo**, dù email có tài khoản hay không. Nếu email khớp tài khoản, server gửi email (vi/en/zh) chứa liên kết dùng một lần, hết hạn sau 30 phút.
2. Liên kết trỏ tới `/{lang}/delete-account/confirm#token=…`. Trang đọc token từ fragment, xóa fragment khỏi thanh địa chỉ ngay và chỉ giữ token trong bộ nhớ. **Mở trang không xóa gì.** Trang hiện cảnh báo, những dữ liệu sẽ bị xóa / giữ lại, và giới hạn đối với dữ liệu trên điện thoại.
3. Chỉ khi người dùng bấm “Xác nhận xóa tài khoản”, trang mới gửi `POST /v1/account-deletion/confirm {token}`. Server xóa tài khoản, liên kết Google/Apple và mọi phiên đăng nhập bằng cùng code với `DELETE /v1/me`, trong một transaction cùng với việc đánh dấu token đã dùng. Trang chỉ báo “đã xóa” khi server trả 200.

Trạng thái hiển thị: đang gửi, đã tiếp nhận, giới hạn tần suất (số giây chờ lấy từ `Retry-After`), email chưa được cấu hình (503), lỗi kết nối, lỗi máy chủ (có thể thử lại cùng liên kết), liên kết sai / đã bị thay / hết hạn / đã dùng, không có mã, và đã xóa.

Trang xác nhận có `noindex`, `Referrer-Policy: no-referrer`, `Cache-Control: no-store`, không nằm trong sitemap, và có CSP chỉ cho phép script của chính site và kết nối tới `API_BASE_URL`. Toàn site không có analytics hay script bên thứ ba.

**Cấu hình:** đặt `API_BASE_URL` khi build website, và thêm origin của website vào `CORS_ORIGINS` của API. Khi chưa đặt `API_BASE_URL`, trang `/delete-account` chỉ hướng dẫn gửi email tới `SUPPORT_EMAIL`, không giả lập gửi yêu cầu.

**Giới hạn có thật (đã ghi trên trang và trong chính sách):**
- Yêu thích, lịch sử, ghi chú, tiến độ và bản ghi âm chỉ nằm trên điện thoại, nên xóa qua web không xóa được những dữ liệu này.
- Xóa trong app (`AccountController.deleteAllData`) gọi `DELETE /v1/me`, rồi xóa file ghi âm và các bảng local.
- Sau khi xóa qua web, app mất phiên ở lần gọi API kế tiếp, nhưng vẫn giữ `accountUid` nên vẫn hiển thị như đang đăng nhập. Nếu bấm “Xóa tài khoản” trong app lúc này, `DELETE /v1/me` trả 401 và **dữ liệu local không bị xóa**. Cách đúng: Cài đặt → Tài khoản → Đăng xuất, rồi “Xóa dữ liệu học trên máy”, hoặc gỡ app. Đề xuất sửa phía app: khi gặp `SessionExpiredException` thì vẫn xóa dữ liệu local và xóa `accountUid`.

## Cần bổ sung trước khi publish

Chạy `npm run check:publish` để xem danh sách hiện tại (kết quả lúc viết README này ở bên dưới).

**Bắt buộc (chủ app cung cấp; tôi không tự điền)**
- [ ] `SITE_URL` — địa chỉ website (canonical, hreflang, sitemap)
- [x] `SUPPORT_EMAIL` — đã đặt trên Vercel
- [x] `policy.lastUpdated` = 2026-10-13. Cập nhật mỗi khi sửa nội dung chính sách hoặc điều khoản
- [x] `policy.minimumAge` = 13. Trong Play Console → App content → Target audience, **không chọn nhóm dưới 13 tuổi**
- [x] `policy.retention.serverLogsDays` = 3 — Workers Logs trên gói Workers Free (chủ app xác nhận 2026-10-13). Đổi thành 7 nếu nâng lên Workers Paid
- [x] `policy.retention.backupDays` = 7 — D1 Time Travel trên gói Free (chủ app xác nhận 2026-10-13). Đổi thành 30 nếu nâng lên Workers Paid
- [x] `policy.retention.deletionRecordDays` = 365, khớp `DELETION_RECORD_DAYS` của backend (cron tự xóa)
- [x] Firebase chưa dùng (chủ app xác nhận 2026-10-13): `services.firebaseAnalytics = false`, nên không cần `analyticsMonths`. Khi bật Firebase trong app, đặt lại `true` và điền `analyticsMonths`
- [ ] `developer.name` — đang là “Lada Tech” (tên publisher lấy từ link “Ứng dụng khác” trong app). Xác nhận khớp Play Console

**Tùy chọn (có phương án dự phòng)**
- [ ] `API_BASE_URL` — bật luồng xóa qua email. Chưa đặt thì dùng hướng dẫn gửi email hỗ trợ, khi đó cần thêm `deletion.processingDays`
- [ ] `APP_STORE_URL` — chưa có thì trang hiển thị “Sắp ra mắt trên App Store”. Khi có, thêm badge chính thức vào `public/badges/app-store-{vi,en,zh}.svg`
- [ ] Ảnh chụp màn hình thật thay cho hình minh họa CSS

**Trước khi bật xóa qua web (blocker, xem `docs/BACKEND.md → Email`)**
- [ ] Tài khoản Resend, domain gửi đã được xác minh (SPF/DKIM), `RESEND_API_KEY` (secret của Worker), `EMAIL_FROM`, `WEB_BASE_URL`, `CORS_ORIGINS`
- [ ] Đăng ký domain gửi trong Apple Developer → Sign in with Apple for Email Communication (cho người dùng “Ẩn email của tôi”)
- [ ] `npm run db:migrate:staging`, deploy staging, chạy thử với tài khoản test; sau đó mới làm cho production

**Kiểm tra lại cho khớp thực tế**
- [ ] Mục Data safety trên Google Play khớp với chính sách (thêm việc email được xử lý khi xóa tài khoản qua web)
- [ ] AdMob App ID trong app vẫn là ID mẫu của Google
- [ ] Đăng nhập Apple chỉ bật khi build với `APPLE_SIGN_IN=true`; nếu không phát hành, đặt `services.appleSignIn = false`
