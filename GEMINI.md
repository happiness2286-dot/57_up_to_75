# BỘ QUY TẮC & TRÍ NHỚ HỆ THỐNG AI XSMB 2026 (MEMORY & SYSTEM RULES)

Tài liệu này lưu trữ toàn bộ nguyên lý nghiệp vụ, kiến trúc giao diện và quy tắc tự động hóa của dự án AI XSMB 2026. Các quy tắc này bắt buộc tuân thủ trong mọi lần phát triển và cập nhật tiếp theo.

---

## 1. Tab 2: KHUNG HIỆN TẠI (Cố Định - Không Tự Nhảy)
- **Nhiệm vụ cốt lõi**: Luôn hiển thị trọn vẹn chu kỳ 3 ngày (N1, N2, N3) dựa trên ngày mốc (Anchor Date) ban đầu.
  - *Ví dụ*: Mốc 24/09/2026 -> N1 (24/9), N2 (25/9), N3 (26/9).
- **Trạng thái cố định**: Dù ngày N1 trượt, Tab 2 **TUYỆT ĐỐI GIỮ NGUYÊN GIAO DIỆN NÀY**. Không tự ý đẩy ngày 25/9 lên làm N1 mới. Người dùng tiếp tục theo dõi và đánh dàn N2, N3 của mốc 24/9 ngay tại Tab 2 cho đến khi hết chu kỳ 3 ngày:
  - **Tầng 1 (N1)**: Dàn 60 Số Gốc (Nếu trượt -> hiển thị badge đỏ `❌ TRƯỢT N1 (Đề XX)`).
  - **Tầng 2 (N2)**: Dàn Siêu Lọc 36 Số (Khi N1 trượt, N2 tự động kích hoạt hiệu ứng viền phát sáng và badge `🎯 ĐANG ĐÁNH HÔM NAY`).
  - **Tầng 3 (N3)**: Dàn Hỏa Lực 36 Số (Dự phòng chốt khung nếu N2 trượt).
- **Điều khiển tra cứu**:
  - Tích hợp **Date Picker (`<input type="date">`)** và **Menu Chọn Nhanh (Dropdown)** cho phép xem lại khung 3 ngày của bất kỳ ngày mốc nào trong quá khứ.
  - Có nút `⚡ Về Khung Đang Đánh` để quay lại khung hoạt động tức thì.

---

## 2. Tab 3: KHUNG KẾ TIẾP (Linh Hoạt - Tùy Chọn Tham Khảo)
- **Nhiệm vụ cốt lõi**: Đóng vai trò như **"Kho dự phòng"** cho chu kỳ tiếp theo (ví dụ: mốc 25/09 -> N1: 25/9, N2: 26/9, N3: 27/9).
- **Tính độc lập**: Hoàn toàn độc lập với Tab 2; người dùng tham khảo Tab 3 mà không làm thay đổi trạng thái khung đang đánh ở Tab 2.
- **3 Chế độ Toggle**:
  1. **N1 (Tham Khảo)**: Xem Dàn 60 Số Gốc của ngày 25/09 (để đánh khung mới nếu muốn reset).
  2. **N2 (Dự Phòng)**: Xem Dàn 36 Số Siêu Lọc của mốc 25/09 (để dự phòng đánh cho ngày 26/09 nếu N1 trượt).
  3. **N3 (Dự Phòng)**: Xem Dàn 36 Số Hỏa Lực của mốc 25/09 (để dự phòng đánh cho ngày 27/09 nếu N2 trượt).

---

## 3. Cơ Chế "Tự Dịch Ngày" (Auto-Shift) — Chỉ Kích Hoạt Khi NỔ
- **Trường hợp NỔ N1 hoặc N2**: Khi có kết quả trúng thưởng, hệ thống tự động chốt sổ và dịch ngày:
  - **Nếu NỔ N1 (24/9)**: Tự động chốt sổ chu kỳ 24/9. Chuyển dàn N1 của ngày 25/9 (từ Tab 3) lên làm Khung hiện tại (Tab 2) cho chu kỳ mới bắt đầu từ 25/9.
  - **Nếu NỔ N2 (25/9)**: Tự động chốt sổ chu kỳ 24/9. Chuyển dàn N1 của ngày 26/9 (từ Tab 3) lên làm Khung hiện tại (Tab 2) cho chu kỳ mới bắt đầu từ 26/9.
  - **Nếu NỔ N3 (26/9)**: Chốt khung thành công, chuyển dàn N1 của ngày 27/9 lên làm Khung hiện tại (Tab 2).
- **Trường hợp TRƯỢT cả 3 ngày (N1, N2, N3 đều trượt)**:
  - Hệ thống chỉ tự động dịch ngày sau khi ngày N3 kết thúc.
  - Hiển thị banner thông báo rõ ràng: *"Chu kỳ thất bại (cả 3 ngày đều trượt), chuyển sang chu kỳ kế tiếp"*.
- **Trường hợp N1 TRƯỢT**: **KHÔNG ĐƯỢC DỊCH NGÀY**. Giữ nguyên Tab 2 và chuyển tiêu điểm sang N2 hôm nay.

---

## 4. Kiến Trúc Mã Nguồn & Tệp Tin
- `index.html`: Cấu trúc 6 tab (Tab 1: Tối Ưu, Tab 2: Khung Hiện Tại, Tab 3: Khung Kế Tiếp, Tab 4: Lịch Sử Khung, Tab 5: Nhịp Vàng Gaussian, Tab 6: Lịch Sử KQXS).
- `styles.css`: Thiết kế Dark Glassmorphism, CSS thuần (Vanilla CSS), không phụ thuộc TailwindCSS, tối ưu mobile.
- `app.js`:
  - `generateFrameDataForAnchor(anchorIsoDate)`: Tính toán dàn số và đối soát kết quả quá khứ hoàn toàn tất định (deterministic).
  - `resolveActiveCycleFromHistory()`: Xác định chu kỳ đang hoạt động dựa trên luật Auto-Shift.
  - `renderTab2()`, `renderTab3()`: Độc lập với `runOptimizerEngine()` của Tab 1.
- `update_daily.py`: Cào kết quả tự động từ ketqua16.net, cập nhật Excel, JSON, làm mới mã cache-busting `styles.css?v=...` & `app.js?v=...`, và tự động đẩy Git.
- `auto_push_daily.bat`: Script một chạm chạy quy trình hàng ngày.
