# IELTS Quest v1

Website học tiếng Anh tĩnh, chạy trực tiếp trên GitHub Pages.

## Tính năng hiện có
- Lộ trình A1 đến IELTS 8.0
- Thẻ từ vựng theo chủ đề
- Phát âm bằng giọng đọc của trình duyệt
- Bài nghe, nói, đọc, viết mẫu
- Quiz 10 câu
- Lưu tiến độ bằng localStorage
- Giao diện điện thoại và máy tính
- Content Security Policy cơ bản

## Cách đưa lên GitHub
1. Giải nén file ZIP.
2. Trong repository `ielts-quest`, chọn **Thêm tệp → Tải tệp lên**.
3. Kéo toàn bộ 5 file vào: `index.html`, `styles.css`, `app.js`, `data.js`, `README.md`.
4. Chọn **Cam kết thay đổi**.
5. Mở **Cài đặt → Trang (Pages)**.
6. Tại Build and deployment, chọn **Deploy from a branch**.
7. Chọn nhánh `main` hoặc `chủ yếu`, thư mục `/(root)`, rồi **Save**.
8. Chờ 1–3 phút để GitHub tạo đường dẫn website.

## Lưu ý
- Đây là phiên bản 1 chạy được thật, không phải toàn bộ kho 500–1000 từ/chủ đề.
- Dữ liệu hiện chỉ lưu trên từng trình duyệt. Muốn đăng nhập và đồng bộ nhiều thiết bị cần thêm cơ sở dữ liệu/backend.
- Không được đặt khóa API bí mật trong các file JavaScript công khai.
