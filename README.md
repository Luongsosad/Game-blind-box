# 🎯 Trò Chơi Câu Hỏi Trắc Nghiệm

Ứng dụng web trò chơi câu hỏi trắc nghiệm với 4 đáp án, phù hợp cho thuyết trình và giáo dục.

## ✨ Tính năng

- **Trang chơi (`/`)**: Hiển thị câu hỏi với 4 đáp án, theo dõi điểm số và kết quả
- **Trang quản lý (`/manage`)**: Thêm, xem và xóa câu hỏi
- Hiệu ứng động khi chọn đáp án đúng/sai
- Lưu trữ câu hỏi bằng LocalStorage
- Giao diện đẹp mắt, responsive
- Hiển thị thống kê chi tiết sau khi hoàn thành

## 🚀 Cài đặt

```bash
# Di chuyển vào thư mục dự án
cd Games

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## 📖 Hướng dẫn sử dụng

### Trang chơi
1. Đọc câu hỏi và chọn 1 trong 4 đáp án
2. Click "Xác nhận đáp án" để kiểm tra
3. Đáp án đúng sẽ hiển thị màu xanh, sai hiển thị màu đỏ
4. Click "Câu tiếp theo" để tiếp tục
5. Xem kết quả tổng thể sau khi hoàn thành

### Trang quản lý
1. Truy cập `/manage` hoặc click link "Quản lý câu hỏi"
2. Nhập câu hỏi vào ô textarea
3. Nhập 4 đáp án
4. Chọn đáp án đúng bằng ô radio
5. Click "Thêm câu hỏi"
6. Xem danh sách câu hỏi bên dưới
7. Xóa câu hỏi bằng nút "Xóa"

## 🛠️ Công nghệ sử dụng

- React 18
- React Router DOM
- Vite
- LocalStorage API
- CSS3 với animations

## 📱 Responsive Design

Ứng dụng được thiết kế responsive, hoạt động tốt trên:
- Desktop
- Tablet
- Mobile

## 🎨 Tùy chỉnh

Bạn có thể tùy chỉnh giao diện bằng cách chỉnh sửa file `src/styles.css`:
- Màu sắc theme
- Font chữ
- Kích thước
- Animations

## 📝 License

MIT
