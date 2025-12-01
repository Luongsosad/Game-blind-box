# 🎉 Các tính năng mới đã thêm vào Game

## ✅ Đã hoàn thành:

### 1. 🎊 Màn hình chúc mừng khi chọn box
- Khi người chơi chọn một box, sẽ hiện màn hình **"Chúc mừng người được chọn: Thành viên số X"**
- Màn hình có hiệu ứng pháo hoa đẹp mắt
- Tự động chuyển sang câu hỏi sau 3 giây (hoặc click nút "Tiếp tục")

### 2. ⏱️ Đồng hồ đếm ngược 30 giây
- Mỗi câu hỏi có **timer 30 giây** đếm ngược
- Timer hiển thị ở đầu câu hỏi với icon đồng hồ
- Khi còn **10 giây**: Timer chuyển màu cam và nhấp nháy cảnh báo
- Khi **hết thời gian**: 
  - Timer chuyển màu đỏ
  - Tự động tính là trả lời sai
  - Hiện thông báo "Hết thời gian! Đáp án đúng là X"

### 3. 🎵 Nhạc nền và âm thanh
- **Nhạc nền** phát liên tục trong suốt game (loop)
- **Âm thanh đúng** khi trả lời đúng câu hỏi
- **Âm thanh sai** khi trả lời sai hoặc hết thời gian
- **Nút điều khiển** nhạc (🔊/🔇) ở góc dưới bên phải màn hình

## 📁 File cần thêm:

Bạn cần thêm các file âm thanh vào thư mục `public/sounds/`:

```
public/
  sounds/
    ├── background.mp3  (Nhạc nền - loop)
    ├── correct.mp3     (Âm thanh trả lời đúng)
    └── wrong.mp3       (Âm thanh trả lời sai)
```

### 🎵 Cách tải file âm thanh MIỄN PHÍ:

#### Tùy chọn 1: Freesound.org
1. Truy cập: https://freesound.org/
2. Tạo tài khoản miễn phí
3. Tìm kiếm:
   - "correct answer sound"
   - "wrong answer buzzer"
   - "game background music loop"
4. Tải về và đổi tên file

#### Tùy chọn 2: Mixkit.co (Không cần tài khoản)
1. Truy cập: https://mixkit.co/free-sound-effects/
2. Chọn danh mục:
   - **Game Sounds** cho correct/wrong
   - **Music** cho background
3. Tải về trực tiếp

#### Tùy chọn 3: Pixabay (Không cần tài khoản)
1. Truy cập: https://pixabay.com/sound-effects/
2. Tìm kiếm và tải miễn phí

#### Tùy chọn 4: Uppbeat (Miễn phí cho dự án cá nhân)
1. Truy cập: https://uppbeat.io/
2. Chọn nhạc nền game

### 🎯 Gợi ý từ khóa tìm kiếm:

**Cho correct.mp3:**
- "success sound"
- "correct answer"
- "win sound"
- "ding"
- "bell success"
- "achievement unlock"

**Cho wrong.mp3:**
- "wrong answer"
- "error buzzer"
- "fail sound"
- "incorrect buzz"
- "game over short"

**Cho background.mp3:**
- "game background music loop"
- "upbeat game music"
- "fun background music"
- "casual game music"
- "happy game loop"

### 📝 Lưu ý quan trọng:

1. **File format**: Nên dùng MP3 (tương thích tốt nhất)
2. **Kích thước**: 
   - Correct/Wrong: < 500KB (âm thanh ngắn 1-3 giây)
   - Background: < 2MB (nhạc nền khoảng 1-2 phút, có thể loop)
3. **Âm lượng**: Nhạc nền đã được tự động giảm xuống 30% để không quá ồn
4. **Không có file âm thanh?**: Game vẫn chạy bình thường, chỉ không có âm thanh

## 🚀 Cách chạy game:

```bash
npm install
npm run dev
```

## 🎮 Luồng chơi mới:

1. Màn hình chính → Chọn box
2. **Màn hình chúc mừng** → Hiện "Thành viên số X"
3. Màn hình câu hỏi → **Timer 30s đếm ngược**
4. Trả lời câu hỏi → **Phát âm thanh đúng/sai**
5. Quay lại màn hình chính hoặc câu tiếp theo
6. Kết thúc → Màn hình kết quả

## 🎨 Các hiệu ứng đã thêm:

- ✨ Hiệu ứng pháo hoa trên màn hình chúc mừng
- 🎯 Animation bounce cho icon và số thành viên
- ⏰ Timer đổi màu và nhấp nháy khi gần hết giờ
- 🎵 Nút nhạc có hiệu ứng float (bay lơ lửng)
- 🌈 Gradient và shadow đẹp mắt cho tất cả component

## 🔧 Tuỳ chỉnh:

### Thay đổi thời gian đếm ngược:
Trong `QuestionScreen.jsx`, dòng 7:
```javascript
const [timeLeft, setTimeLeft] = useState(30) // Đổi 30 thành số giây bạn muốn
```

### Thay đổi thời gian tự động chuyển màn hình chúc mừng:
Trong `CongratulationScreen.jsx`, dòng 6:
```javascript
setTimeout(() => {
  onContinue()
}, 3000) // Đổi 3000 thành milliseconds bạn muốn (3000 = 3 giây)
```

### Thay đổi âm lượng nhạc nền:
Trong `QuizGame.jsx`, dòng 24:
```javascript
backgroundMusicRef.current.volume = 0.3 // Đổi 0.3 (30%) thành giá trị 0.0 - 1.0
```

## 🐛 Xử lý lỗi thường gặp:

### Nhạc không phát?
- Kiểm tra file âm thanh đã có trong `public/sounds/`
- Kiểm tra tên file đúng: `background.mp3`, `correct.mp3`, `wrong.mp3`
- Click nút 🔊 để bật nhạc
- Một số trình duyệt chặn autoplay, hãy click vào màn hình trước

### Timer không hoạt động?
- Mở Console (F12) xem có lỗi không
- Đảm bảo đã cập nhật lại code mới nhất

## 📱 Responsive:
Game đã được tối ưu cho:
- 📱 Mobile (< 480px)
- 📱 Tablet (480px - 768px)
- 💻 Desktop (> 768px)

---

## 🎊 Chúc bạn chơi game vui vẻ!

Nếu có vấn đề gì, hãy kiểm tra Console (F12) để xem log lỗi.
