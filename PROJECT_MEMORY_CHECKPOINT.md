# BỘ NHỚ CHỐT DỰ ÁN XSMB AI 2026 (CHECKPOINT: 05/10/2026)

## 📌 1. THÔNG TIN CHUNG
* **Tên Dự Án**: XSMB AI PREDICTION 2026 (Mô hình 58 UP TO 75%)
* **Thư mục Workspace**: `58_up_to_75` (Phân lập độc lập tuyệt đối).
* **GitHub Repository**: [https://github.com/happiness2286-dot/57_up_to_75.git](https://github.com/happiness2286-dot/57_up_to_75.git) (Branch: `main`).
* **Web App Trực Tuyến**: GitHub Pages tương ứng của repository.
* **Thời Điểm Đồng Bộ Bộ Nhớ**: Ngày 05/10/2026.

---

## 🌐 2. KIẾN TRÚC DUAL-ENGINE CÀO & QUÉT KẾT QUẢ SIÊU TỐC
Hệ thống đã hoàn tất nâng cấp toàn bộ sang cơ chế 2 lớp chống gián đoạn và loại bỏ hoàn toàn độ trễ:
1. **Engine 1 - API 383.im Siêu Tốc (Ưu Tiên Số 1)**:
   - **Endpoint**: `https://api.383.im/lottery/live.json`
   - **Tốc Độ Phản Hồi**: **~50ms** (JSON trực tiếp, không phụ thuộc DOM HTML).
   - **Timeout cấu hình**: 3 - 4 giây.
   - **Dữ liệu**: Bóc tách trực tiếp Giải Đặc Biệt (5 số), Số Đề (2 số cuối), G1 đến G7.
2. **Engine 2 - Dự Phòng Tức Thì xosodaiphat.com (Chuyển Đổi Không Độ Trễ)**:
   - **Nguồn**: `https://xosodaiphat.com/xsmb-xo-so-mien-bac.html` (7 ngày) & `https://xosodaiphat.com/xsmb-30-ngay.html` (30 ngày).
   - **Cơ chế**: Tự động kích hoạt ngay lập tức khi API 383.im gặp sự cố mạng, timeout hoặc trả kết quả rỗng. Đảm bảo quy trình cào dữ liệu luôn hoàn thành trong tích tắc.
3. **Engine 3 - Dự Phòng Cấp 3 (Khẩn Cấp)**:
   - `ketqua16.net` / `mketqua.net` chỉ kích hoạt khi cả hai nguồn trên đồng thời gặp sự cố mạng diện rộng.

---

## 🎯 3. BỘ QUY TẮC TAB & CHU KỲ KHUNG NUÔI 3 NGÀY
1. **Tab 2: KHUNG HIỆN TẠI (Cố Định - Tuyệt Đối Không Tự Nhảy)**:
   - Luôn hiển thị trọn vẹn chu kỳ 3 ngày (N1, N2, N3) theo Anchor Date (ngày mốc).
   - **Khi N1 trượt**: Tab 2 **GIỮ NGUYÊN GIAO DIỆN**, không tự đẩy N2 lên làm N1 mới. N1 hiển thị badge đỏ `❌ TRƯỢT N1 (Đề XX)`, N2 tự động phát sáng viền và gán badge `🎯 ĐANG ĐÁNH HÔM NAY`.
   - Cung cấp Date Picker (`<input type="date">`) và Dropdown chọn nhanh để tra cứu lịch sử bất kỳ ngày nào trong quá khứ.
   - Nút `⚡ Về Khung Đang Đánh` giúp quay lại chu kỳ hiện tại tức thì.
2. **Tab 3: KHUNG KẾ TIẾP (Kho Dự Phòng Tham Khảo)**:
   - Đóng vai trò kho số cho chu kỳ tiếp theo (Anchor Date ngày hôm sau).
   - Hoàn toàn độc lập với Tab 2.
   - Gồm 3 chế độ Toggle: N1 (Tham khảo dàn 60 số gốc), N2 (Dự phòng dàn 36 số siêu lọc), N3 (Dự phòng dàn 36 số hỏa lực).
3. **Cơ Chế "Tự Dịch Ngày" (Auto-Shift)**:
   - **NỔ N1**: Chốt sổ chu kỳ, đưa N1 của ngày tiếp theo từ Tab 3 lên làm Khung hiện tại ở Tab 2.
   - **NỔ N2**: Chốt sổ chu kỳ, đưa N1 của ngày kế tiếp từ Tab 3 lên Tab 2.
   - **NỔ N3**: Chốt khung thành công, chuyển sang chu kỳ mới.
   - **TRƯỢT CẢ 3 NGÀY**: Chỉ tự động dịch ngày sau khi ngày N3 kết thúc, kèm thông báo chu kỳ thất bại.
   - **N1 TRƯỢT**: **KHÔNG ĐƯỢC TỰ DỊCH NGÀY**.

---

## 📁 4. CẤU TRÚC TỆP TIN & LUỒNG TỰ ĐỘNG HÓA
* [update_daily.py](file:///e:/DONG%20BO/New%20Ha%20GCCK/N%C4%83m%202026/D%E1%BB%B1%20%C3%81n%20AI_%20Antigravity/58_up_to_75/update_daily.py):
  - Thu thập kết quả qua Dual-Engine (API 383.im & xosodaiphat.com).
  - Cập nhật `data.json` và file Excel `Thong_Ke_G7_Va_Top20_XSMB_2026.xlsx`.
  - Tự động gọi `soi_cau_g1_g5.py` đồng bộ Dàn Tinh Túy G1->G5 và lưu vào `ket_qua_soi_cau_g1_g5.json`, `lich_su_phuong_phap.json`.
  - Cập nhật `DEFAULT_DATA` fallback trong `app.js`.
  - Cập nhật mã cache-busting timestamp trong `index.html`.
  - Tự động pull an toàn (`git pull -X ours`) và push lên GitHub `origin/main`.
* [soi_cau_g1_g5.py](file:///e:/DONG%20BO/New%20Ha%20GCCK/N%C4%83m%202026/D%E1%BB%B1%20%C3%81n%20AI_%20Antigravity/58_up_to_75/soi_cau_g1_g5.py):
  - Tích hợp `fetch_api_383_draw()` (~50ms) kết hợp `fetch_daiphat_draws()`.
  - Phân tích vị trí cầu động, chu kỳ nổ và đối soát dàn 60 số Cấp 4.
* [index.html](file:///e:/DONG%20BO/New%20Ha%20GCCK/N%C4%83m%202026/D%E1%BB%B1%20%C3%81n%20AI_%20Antigravity/58_up_to_75/index.html) & [app.js](file:///e:/DONG%20BO/New%20Ha%20GCCK/N%C4%83m%202026/D%E1%BB%B1%20%C3%81n%20AI_%20Antigravity/58_up_to_75/app.js):
  - 6 Tab chức năng tối ưu cho Desktop và Mobile.
  - Nút "Cập Nhật Trực Tiếp" gọi API 383.im với timeout 3.5s và hiển thị toast kết quả tức thì.
* [auto_push_daily.bat](file:///e:/DONG%20BO/New%20Ha%20GCCK/N%C4%83m%202026/D%E1%BB%B1%20%C3%81n%20AI_%20Antigravity/58_up_to_75/auto_push_daily.bat):
  - Script một chạm chạy cập nhật cục bộ và đẩy lên GitHub.
* `.github/workflows/auto_update.yml`:
  - GitHub Actions chạy tự động trên cloud hàng ngày lúc 18h35 và 18h50 (giờ VN).
