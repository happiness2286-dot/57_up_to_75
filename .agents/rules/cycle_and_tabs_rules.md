# RULES: Tab 2 Fixed Frame, Tab 3 Reserve Frame, and Auto-Shift Mechanics

## 1. Tab 2: KHUNG HIỆN TẠI (Fixed 3-Day Cycle)
- Pin strictly to initial Anchor Date (e.g. 24/09/2026).
- Shows 3 consecutive days: N1 (24/9), N2 (25/9), N3 (26/9).
- When N1 misses:
  - Do NOT advance/shift 25/9 to N1.
  - Tab 2 stays pinned to 24/9.
  - Highlight N2 (25/9) with active border and badge `🎯 ĐANG ĐÁNH HÔM NAY`.
- Date Picker and quick dropdown must allow inspecting any past anchor date's 3-day frame.

## 2. Tab 3: KHUNG KẾ TIẾP (Reserve Reference Warehouse)
- Independent from Tab 2.
- Anchor date is next cycle (e.g. 25/09/2026).
- Toggle options:
  - N1 (Tham khảo): 60 numbers.
  - N2 (Dự phòng): 36 numbers of mốc 25/9 (to play on 26/9 if N1 misses).
  - N3 (Dự phòng): 36 numbers of mốc 25/9 (to play on 27/9 if N2 misses).

## 3. Auto-Shift Rules
- ONLY trigger upon:
  1. HIT N1: Close current cycle, shift next day's N1 from Tab 3 up to Tab 2.
  2. HIT N2: Close current cycle, shift day after N2 from Tab 3 up to Tab 2.
  3. ALL 3 DAYS MISS: Auto-shift after N3 finishes with explicit notice: "Chu kỳ thất bại, chuyển sang chu kỳ kế tiếp".
- If N1 misses: NEVER auto-shift. Tab 2 stays pinned.
