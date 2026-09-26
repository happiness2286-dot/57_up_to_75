/* ==========================================================================
   AI XSMB 2026 - OPTIMIZER MINI APP CORE LOGIC
   (INTERACTIVE MODE SELECTOR TAB FOR NEXT DAY N1 / N2 / N3)
   ========================================================================== */

// Embedded Default Data Fallback
// Embedded Default Data Fallback
const DEFAULT_DATA = {
    history: [
        {
                "stt": 262,
                "date": "Thứ bảy ngày 26-09-2026",
                "full_db": "18132",
                "de": "32",
                "g7_1": "66",
                "g7_2": "49",
                "g7_3": "22",
                "g7_4": "45"
        },
        {
                "stt": 261,
                "date": "Thứ sáu ngày 25-09-2026",
                "full_db": "34465",
                "de": "65",
                "g7_1": "74",
                "g7_2": "64",
                "g7_3": "48",
                "g7_4": "50"
        },
        {
                "stt": 260,
                "date": "Thứ năm ngày 24-09-2026",
                "full_db": "78196",
                "de": "96",
                "g7_1": "40",
                "g7_2": "28",
                "g7_3": "16",
                "g7_4": "11"
        },
        {
                "stt": 259,
                "date": "Thứ tư ngày 23-09-2026",
                "full_db": "76406",
                "de": "06",
                "g7_1": "34",
                "g7_2": "21",
                "g7_3": "60",
                "g7_4": "89"
        },
        {
                "stt": 258,
                "date": "Thứ ba ngày 22-09-2026",
                "full_db": "31922",
                "de": "22",
                "g7_1": "92",
                "g7_2": "07",
                "g7_3": "35",
                "g7_4": "44"
        }
],
    frame_history: [
        {
                "stt": 262,
                "date_start": "Thứ bảy ngày 26-09-2026",
                "result": "TRÚNG N1 🎯",
                "de_hit": "32",
                "dan_n1": "01, 02, 03, 04, 05, 06, 08, 09, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22, 24, 26, 28, 29, 31, 32, 34, 35, 37, 38, 42, 44, 45, 51, 53, 55, 58, 59, 60, 61, 62, 63, 65, 67, 68, 69, 72, 80, 81, 82, 83, 84, 85, 87, 88, 91, 92, 95, 96, 97, 98, 99 (60 số)"
        },
        {
                "stt": 261,
                "date_start": "Thứ sáu ngày 25-09-2026",
                "result": "TRÚNG N1 🎯",
                "de_hit": "65",
                "dan_n1": "01, 02, 03, 04, 05, 06, 07, 09, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22, 24, 26, 28, 29, 31, 32, 34, 35, 37, 38, 42, 44, 45, 51, 53, 55, 58, 59, 60, 61, 62, 63, 65, 67, 68, 69, 72, 80, 81, 82, 83, 84, 85, 87, 88, 91, 92, 95, 96, 97, 98, 99 (60 số)"
        },
        {
                "stt": 260,
                "date_start": "Thứ năm ngày 24-09-2026",
                "result": "TRƯỢT KHUNG ❌",
                "de_hit": "96",
                "dan_n1": "01, 02, 03, 04, 05, 06, 07, 09, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22, 24, 26, 28, 29, 31, 32, 33, 34, 35, 37, 38, 42, 44, 45, 51, 53, 55, 58, 59, 60, 61, 62, 63, 65, 67, 68, 69, 72, 80, 81, 82, 83, 84, 85, 87, 88, 91, 92, 95, 97, 98, 99 (60 số)"
        },
        {
                "stt": 259,
                "date_start": "Thứ tư ngày 23-09-2026",
                "result": "TRƯỢT KHUNG ❌",
                "de_hit": "06",
                "dan_n1": "01, 02, 03, 04, 05, 07, 08, 09, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22, 24, 26, 28, 29, 31, 32, 33, 34, 35, 37, 38, 42, 44, 45, 51, 53, 55, 58, 59, 60, 61, 62, 63, 65, 67, 68, 69, 72, 80, 81, 82, 83, 84, 85, 87, 88, 91, 92, 95, 97, 98, 99 (60 số)"
        },
        {
                "stt": 258,
                "date_start": "Thứ ba ngày 22-09-2026",
                "result": "TRÚNG N1 🎯",
                "de_hit": "22",
                "dan_n1": "01, 02, 03, 04, 05, 08, 09, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 28, 29, 31, 32, 33, 34, 35, 37, 38, 42, 44, 45, 51, 53, 55, 58, 59, 60, 61, 62, 63, 65, 67, 68, 69, 72, 80, 81, 82, 83, 84, 85, 87, 88, 91, 92, 95, 97, 98, 99 (60 số)"
        }
],
    dan_nhip_vang: [
        { "Thứ Hạng Hỏa Lực": "Top 01", "Con Số 2D": 39, "Điểm Nhịp Vàng Gaussian": "16.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" },
        { "Thứ Hạng Hỏa Lực": "Top 02", "Con Số 2D": 43, "Điểm Nhịp Vàng Gaussian": "12.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" },
        { "Thứ Hạng Hỏa Lực": "Top 03", "Con Số 2D": 57, "Điểm Nhịp Vàng Gaussian": "7.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" },
        { "Thứ Hạng Hỏa Lực": "Top 04", "Con Số 2D": 25, "Điểm Nhịp Vàng Gaussian": "7.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" },
        { "Thứ Hạng Hỏa Lực": "Top 05", "Con Số 2D": 89, "Điểm Nhịp Vàng Gaussian": "5.0 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" }
    ]
};

let globalData = DEFAULT_DATA;

// Global Anchor Cycle State
let activeAnchorDateIso = '2026-09-24'; // Live active anchor date
let selectedAnchorDateIso = '2026-09-24'; // Anchor date currently viewed in Tab 2
let nextCycleAnchorDateIso = '2026-09-25'; // Anchor date for Tab 3 (Khung Kế Tiếp)
let selectedNextDayMode = 'n1'; // Tab 3 mode: 'n1', 'n2', or 'n3'

// Data caches
let currentTab2Frame = null;
let currentTab3Frame = null;
let currentOptimized60 = []; // Tab 1
let current3D = ['339', '443', '557', '225', '889', '770', '334', '993', '552', '884', '007', '775', '002', '220', '998', '448', '668', '113', '222', '338'];
let current4D = ['1339', '2443', '3557', '4225', '5889', '6770', '7334', '8993', '9552', '0884', '1007', '2775', '3002', '4220', '5998', '6448', '7668', '8113', '9222', '0338'];

const VN_DAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const headScores = { 0: 7.5, 1: 10.5, 2: 13.0, 3: 11.0, 4: 5.5, 5: 9.5, 6: 8.5, 7: 6.0, 8: 9.0, 9: 8.5 };
const tailScores = { 0: 6.5, 1: 10.0, 2: 7.0, 3: 11.5, 4: 6.0, 5: 8.5, 6: 6.5, 7: 9.0, 8: 7.5, 9: 8.0 };
const gaussianHighFreq = [39, 43, 57, 25, 89, 70, 34, 93, 52, 84, 7, 75, 2, 20, 98, 48];

// Date utilities
function parseIso(isoStr) {
    if (!isoStr) return new Date();
    const parts = isoStr.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

function toIso(dt) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function addDays(isoStr, n) {
    const dt = parseIso(isoStr);
    dt.setDate(dt.getDate() + n);
    return toIso(dt);
}

function fmtVNFull(isoStr) {
    const dt = parseIso(isoStr);
    const day = VN_DAYS[dt.getDay()];
    const d = String(dt.getDate()).padStart(2, '0');
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const y = dt.getFullYear();
    return `${day} (${d}/${m}/${y})`;
}

function fmtVNShort(isoStr) {
    const dt = parseIso(isoStr);
    const day = VN_DAYS[dt.getDay()];
    const d = String(dt.getDate()).padStart(2, '0');
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    return `${day} ${d}/${m}`;
}

function fmtDateOnly(isoStr) {
    const dt = parseIso(isoStr);
    const d = String(dt.getDate()).padStart(2, '0');
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    return `${d}/${m}`;
}

function getHistRecordByDate(isoStr) {
    if (!globalData || !globalData.history) return null;
    return globalData.history.find(r => {
        const m = r.date.match(/(\d{2})-(\d{2})-(\d{4})/);
        if (m) {
            return `${m[3]}-${m[2]}-${m[1]}` === isoStr;
        }
        return false;
    });
}

function getRecent2Days() {
    if (globalData && globalData.history && globalData.history.length >= 2) {
        const sortedHist = globalData.history.slice().sort((a, b) => (Number(a.stt) || 0) - (Number(b.stt) || 0));
        return sortedHist.slice(-2).map(x => parseInt(x.de)).filter(x => !isNaN(x));
    }
    return [44, 21];
}

function setTxt(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
}

// Generate Dàn numbers and check draw results for ANY anchor date
function generateFrameDataForAnchor(anchorIsoDate) {
    const histBefore = (globalData && globalData.history) 
        ? globalData.history.filter(r => {
            const m = r.date.match(/(\d{2})-(\d{2})-(\d{4})/);
            if (!m) return false;
            return `${m[3]}-${m[2]}-${m[1]}` < anchorIsoDate;
        }).sort((a, b) => (Number(a.stt) || 0) - (Number(b.stt) || 0))
        : [];

    const effectiveHist = histBefore.length >= 10 ? histBefore : (globalData.history || []);
    const recent30Hits = effectiveHist.slice(-30).map(x => parseInt(x.de)).filter(x => !isNaN(x));
    const recent2Days = effectiveHist.slice(-2).map(x => parseInt(x.de)).filter(x => !isNaN(x));

    let pool = [];
    for (let i = 0; i < 100; i++) {
        const h = Math.floor(i / 10);
        const t = i % 10;
        const hScore = headScores[h] || 5.0;
        const tScore = tailScores[t] || 5.0;
        let score = hScore * 2.0 + tScore * 1.5;
        if (gaussianHighFreq.includes(i)) score += 10.0;
        const count30 = recent30Hits.filter(x => x === i).length;
        score += count30 * 4.0;

        if (h === 4 || h === 7) score -= 12.0;
        if (recent2Days.includes(i)) score -= 15.0;
        if (hScore < 7.0 || tScore < 7.0) score -= 8.0;

        pool.push({ num: i, score });
    }

    let validPool = pool.slice().sort((a, b) => b.score - a.score);
    let selectedNums = validPool.slice(0, 60).map(p => p.num);

    const top10 = selectedNums.slice(0, 10);
    top10.forEach(num => {
        const sh = ((Math.floor(num / 10) + 5) % 10) * 10 + ((num % 10) + 5) % 10;
        if (!selectedNums.includes(sh) && selectedNums.length < 60) {
            selectedNums.push(sh);
        }
    });

    if (recent30Hits.length > 0) {
        let inactive30 = selectedNums.filter(n => !recent30Hits.includes(n));
        let activeOutside = validPool.map(p => p.num).filter(n => !selectedNums.includes(n) && recent30Hits.includes(n));
        const swapCount = Math.min(inactive30.length, activeOutside.length);
        for (let k = 0; k < swapCount; k++) {
            const remIdx = selectedNums.indexOf(inactive30[k]);
            if (remIdx > -1) {
                selectedNums.splice(remIdx, 1);
                selectedNums.push(activeOutside[k]);
            }
        }
    }

    const dan60_N1 = selectedNums.slice().sort((a, b) => a - b);
    const n1Scored = pool.filter(p => dan60_N1.includes(p.num)).sort((a, b) => b.score - a.score);
    const dan36_N2 = n1Scored.slice(0, 36).map(p => p.num).sort((a, b) => a - b);
    const dan36_N3 = n1Scored.slice(0, 36).map(p => p.num).sort((a, b) => a - b);
    const dan20 = n1Scored.slice(0, 20).map(p => p.num).sort((a, b) => a - b);

    const n1DateIso = anchorIsoDate;
    const n2DateIso = addDays(anchorIsoDate, 1);
    const n3DateIso = addDays(anchorIsoDate, 2);

    const recN1 = getHistRecordByDate(n1DateIso);
    const recN2 = getHistRecordByDate(n2DateIso);
    const recN3 = getHistRecordByDate(n3DateIso);

    let statusN1 = 'PENDING';
    let labelN1 = '⏳ Đang Chờ Quay';
    let badgeN1 = 'badge-secondary';
    let deN1 = recN1 ? String(recN1.de).padStart(2, '0') : null;
    let hitN1 = false;
    if (recN1) {
        hitN1 = dan60_N1.includes(parseInt(deN1));
        statusN1 = hitN1 ? 'HIT' : 'MISS';
        labelN1 = hitN1 ? `🎯 NỔ N1 (Đề ${deN1})` : `❌ TRƯỢT N1 (Đề ${deN1})`;
        badgeN1 = hitN1 ? 'badge-success' : 'badge-danger';
    }

    let statusN2 = 'WAITING';
    let labelN2 = '⏳ Dự Phòng N2';
    let badgeN2 = 'badge-secondary';
    let deN2 = recN2 ? String(recN2.de).padStart(2, '0') : null;
    let hitN2 = false;
    if (recN2) {
        hitN2 = dan36_N2.includes(parseInt(deN2));
        statusN2 = hitN2 ? 'HIT' : 'MISS';
        labelN2 = hitN2 ? `🎯 NỔ N2 (Đề ${deN2})` : `❌ TRƯỢT N2 (Đề ${deN2})`;
        badgeN2 = hitN2 ? 'badge-success' : 'badge-danger';
    } else {
        if (statusN1 === 'MISS') {
            statusN2 = 'ACTIVE';
            labelN2 = '🎯 ĐANG ĐÁNH HÔM NAY';
            badgeN2 = 'badge-warning pulse-border';
        } else if (statusN1 === 'HIT') {
            statusN2 = 'CLOSED';
            labelN2 = '✅ Đã Chốt Sổ (N1 Nổ)';
            badgeN2 = 'badge-secondary';
        }
    }

    let statusN3 = 'WAITING';
    let labelN3 = '⏳ Dự Phòng N3';
    let badgeN3 = 'badge-secondary';
    let deN3 = recN3 ? String(recN3.de).padStart(2, '0') : null;
    let hitN3 = false;
    if (recN3) {
        hitN3 = dan36_N3.includes(parseInt(deN3));
        statusN3 = hitN3 ? 'HIT' : 'MISS';
        labelN3 = hitN3 ? `🎯 NỔ N3 (Đề ${deN3})` : `❌ TRƯỢT N3 (Đề ${deN3})`;
        badgeN3 = hitN3 ? 'badge-success' : 'badge-danger';
    } else {
        if (statusN1 === 'MISS' && statusN2 === 'MISS') {
            statusN3 = 'ACTIVE';
            labelN3 = '🔥 ĐANG ĐÁNH CHỐT KHUNG';
            badgeN3 = 'badge-warning pulse-border';
        } else if (statusN1 === 'HIT' || statusN2 === 'HIT') {
            statusN3 = 'CLOSED';
            labelN3 = '✅ Đã Chốt Sổ';
            badgeN3 = 'badge-secondary';
        }
    }

    let cycleState = 'IN_PROGRESS';
    let alertTitle = '';
    let alertDesc = '';
    let nextAutoShiftAnchor = addDays(anchorIsoDate, 1);
    let isFinished = false;

    if (statusN1 === 'HIT') {
        cycleState = 'WON_N1';
        alertTitle = `🎉 KHUNG MỐC ${fmtDateOnly(anchorIsoDate)} ĐÃ NỔ N1 THÀNH CÔNG (ĐỀ ${deN1})!`;
        alertDesc = `Kỳ quay N1 (${fmtVNShort(n1DateIso)}) đã nổ <strong>TRÚNG N1 🎯 (Đề ${deN1})</strong>. Hệ thống tự động chốt sổ chu kỳ ${fmtDateOnly(anchorIsoDate)} và chuyển sang chu kỳ mới bắt đầu từ ${fmtDateOnly(addDays(anchorIsoDate, 1))}.`;
        nextAutoShiftAnchor = addDays(anchorIsoDate, 1);
        isFinished = true;
    } else if (statusN2 === 'HIT') {
        cycleState = 'WON_N2';
        alertTitle = `🎉 KHUNG MỐC ${fmtDateOnly(anchorIsoDate)} ĐÃ NỔ N2 THÀNH CÔNG (ĐỀ ${deN2})!`;
        alertDesc = `Kỳ quay N2 (${fmtVNShort(n2DateIso)}) đã nổ <strong>TRÚNG N2 🎯 (Đề ${deN2})</strong>. Hệ thống tự động chốt sổ chu kỳ ${fmtDateOnly(anchorIsoDate)} và chuyển sang chu kỳ mới bắt đầu từ ${fmtDateOnly(addDays(anchorIsoDate, 2))}.`;
        nextAutoShiftAnchor = addDays(anchorIsoDate, 2);
        isFinished = true;
    } else if (statusN3 === 'HIT') {
        cycleState = 'WON_N3';
        alertTitle = `🎉 KHUNG MỐC ${fmtDateOnly(anchorIsoDate)} ĐÃ NỔ N3 CHỐT KHUNG (ĐỀ ${deN3})!`;
        alertDesc = `Kỳ quay N3 (${fmtVNShort(n3DateIso)}) đã chốt khung thành công với <strong>Đề ${deN3}</strong>. Hệ thống tự động chuyển sang chu kỳ mới bắt đầu từ ${fmtDateOnly(addDays(anchorIsoDate, 3))}.`;
        nextAutoShiftAnchor = addDays(anchorIsoDate, 3);
        isFinished = true;
    } else if (statusN1 === 'MISS' && statusN2 === 'MISS' && statusN3 === 'MISS') {
        cycleState = 'LOST_ALL';
        alertTitle = `⚠️ CHU KỲ MỐC ${fmtDateOnly(anchorIsoDate)} THẤT BẠI (CẢ 3 NGÀY ĐỀU TRƯỢT)`;
        alertDesc = `Chu kỳ ${fmtDateOnly(anchorIsoDate)} đã kết thúc cả 3 ngày mà không nổ. Hệ thống tự động dịch ngày sang chu kỳ kế tiếp bắt đầu từ ${fmtDateOnly(addDays(anchorIsoDate, 1))}.`;
        nextAutoShiftAnchor = addDays(anchorIsoDate, 1);
        isFinished = true;
    } else if (statusN1 === 'MISS' && statusN2 === 'ACTIVE') {
        cycleState = 'IN_PROGRESS_N2';
        alertTitle = `⚠️ KHUNG MỐC ${fmtDateOnly(anchorIsoDate)}: N1 TRƯỢT (ĐỀ ${deN1}) ➔ CỐ ĐỊNH TAB 2 THEO DÕI N2 HÔM NAY`;
        alertDesc = `Tab 2 CỐ ĐỊNH giữ nguyên mốc ${fmtDateOnly(anchorIsoDate)} (không tự nhảy ngày). N1 đã trượt, hôm nay chuyển sang đánh <strong>TẦNG 2: DÀN 36 SỐ N2 (${fmtVNShort(n2DateIso)})</strong>. Cơ chế Auto-Shift chỉ kích hoạt khi có kết quả NỔ hoặc gãy cả 3 ngày.`;
        nextAutoShiftAnchor = addDays(anchorIsoDate, 1);
        isFinished = false;
    } else if (statusN1 === 'MISS' && statusN2 === 'MISS' && statusN3 === 'ACTIVE') {
        cycleState = 'IN_PROGRESS_N3';
        alertTitle = `⚠️ KHUNG MỐC ${fmtDateOnly(anchorIsoDate)}: N1 & N2 ĐỀU TRƯỢT ➔ TAB 2 CỐ ĐỊNH CHỐT KHUNG N3`;
        alertDesc = `Tab 2 CỐ ĐỊNH giữ nguyên mốc ${fmtDateOnly(anchorIsoDate)}. N1 và N2 đã trượt, hôm nay chuyển sang đánh <strong>TẦNG 3: DÀN 36 SỐ N3 (${fmtVNShort(n3DateIso)})</strong>. Hệ thống CHƯA dịch ngày.`;
        nextAutoShiftAnchor = addDays(anchorIsoDate, 1);
        isFinished = false;
    } else {
        cycleState = 'IN_PROGRESS_N1';
        alertTitle = `🎯 KHUNG HIỆN TẠI: MỐC ${fmtDateOnly(anchorIsoDate)} — ĐANG ĐÁNH NGÀY N1 (${fmtVNShort(n1DateIso)})`;
        alertDesc = `Khung 3 ngày bắt đầu từ ngày mốc ${fmtDateOnly(anchorIsoDate)}. Hôm nay tập trung đánh <strong>TẦNG 1: DÀN 60 SỐ GỐC N1</strong>.`;
        nextAutoShiftAnchor = addDays(anchorIsoDate, 1);
        isFinished = false;
    }

    return {
        anchorIsoDate,
        dan60_N1,
        dan36_N2,
        dan36_N3,
        dan20,
        n1DateIso,
        n2DateIso,
        n3DateIso,
        recN1,
        recN2,
        recN3,
        statusN1,
        labelN1,
        badgeN1,
        deN1,
        statusN2,
        labelN2,
        badgeN2,
        deN2,
        statusN3,
        labelN3,
        badgeN3,
        deN3,
        cycleState,
        alertTitle,
        alertDesc,
        nextAutoShiftAnchor,
        isFinished
    };
}

// Auto-Shift Resolver: Determines active frame anchor from history
function resolveActiveCycleFromHistory() {
    activeAnchorDateIso = '2026-09-24';
    nextCycleAnchorDateIso = '2026-09-25';

    if (!globalData || !globalData.history || globalData.history.length === 0) {
        return;
    }

    const testFrame24 = generateFrameDataForAnchor('2026-09-24');
    if (!testFrame24.isFinished) {
        activeAnchorDateIso = '2026-09-24';
        nextCycleAnchorDateIso = '2026-09-25';
    } else {
        activeAnchorDateIso = testFrame24.nextAutoShiftAnchor;
        nextCycleAnchorDateIso = addDays(activeAnchorDateIso, 1);
    }
}

// Update Top Alert Box
function updateTopAlertBanner(activeFrame) {
    const titleEl = document.getElementById('alert-title');
    const descEl = document.getElementById('alert-desc');
    const hdrStatus = document.getElementById('hdr-frame-status');

    if (titleEl) titleEl.textContent = activeFrame.alertTitle;
    if (descEl) descEl.innerHTML = activeFrame.alertDesc;

    if (hdrStatus) {
        if (activeFrame.cycleState === 'IN_PROGRESS_N2') {
            hdrStatus.innerHTML = `⚠️ Trạng Thái: <strong class="text-amber">CỐ ĐỊNH KHUNG ${fmtDateOnly(activeFrame.anchorIsoDate)} ➔ THEO DÕI N2 (${fmtDateOnly(activeFrame.n2DateIso)})</strong>`;
        } else if (activeFrame.cycleState === 'IN_PROGRESS_N3') {
            hdrStatus.innerHTML = `🔥 Trạng Thái: <strong class="text-amber">CỐ ĐỊNH KHUNG ${fmtDateOnly(activeFrame.anchorIsoDate)} ➔ CHỐT KHUNG N3 (${fmtDateOnly(activeFrame.n3DateIso)})</strong>`;
        } else if (activeFrame.isFinished) {
            hdrStatus.innerHTML = `🎯 Trạng Thái: <strong class="text-emerald">ĐÃ NỔ ➔ RESET KHUNG MỚI (${fmtDateOnly(activeFrame.nextAutoShiftAnchor)})</strong>`;
        } else {
            hdrStatus.innerHTML = `🎯 Trạng Thái: <strong class="text-emerald">ĐANG ĐÁNH N1 (${fmtDateOnly(activeFrame.n1DateIso)})</strong>`;
        }
    }

    setTxt('chip-n1-date', fmtVNShort(activeFrame.n1DateIso));
    setTxt('chip-n2-date', fmtVNShort(activeFrame.n2DateIso));
    setTxt('chip-n3-date', fmtVNShort(activeFrame.n3DateIso));

    const chips = document.querySelectorAll('.alert-dates .date-chip');
    chips.forEach(c => c.classList.remove('active'));
    if (activeFrame.statusN2 === 'ACTIVE' && chips[1]) {
        chips[1].classList.add('active');
    } else if (activeFrame.statusN3 === 'ACTIVE' && chips[2]) {
        chips[2].classList.add('active');
    } else if (chips[0]) {
        chips[0].classList.add('active');
    }
}

// Render Tab 2: KHUNG HIỆN TẠI (Cố Định 3 Ngày)
function renderTab2(anchorIsoDate) {
    const frame = generateFrameDataForAnchor(anchorIsoDate);
    currentTab2Frame = frame;

    const isCurrentActive = (anchorIsoDate === activeAnchorDateIso);

    // Update Date Picker input and Quick Select
    const datePicker = document.getElementById('tab2-date-picker');
    if (datePicker && datePicker.value !== anchorIsoDate) {
        datePicker.value = anchorIsoDate;
    }
    const quickSelect = document.getElementById('tab2-quick-select');
    if (quickSelect) {
        quickSelect.value = anchorIsoDate;
    }

    // Status Badge
    const badgeEl = document.getElementById('tab2-anchor-status-badge');
    if (badgeEl) {
        if (isCurrentActive) {
            let stepNote = 'N1';
            if (frame.statusN2 === 'ACTIVE') stepNote = 'THEO DÕI N2';
            else if (frame.statusN3 === 'ACTIVE') stepNote = 'CHỐT KHUNG N3';
            badgeEl.className = 'badge badge-success';
            badgeEl.innerHTML = `<i class="fa-solid fa-lock"></i> KHUNG HIỆN TẠI (ĐANG ${stepNote})`;
        } else {
            badgeEl.className = 'badge badge-purple';
            badgeEl.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> LỊCH SỬ KHUNG MỐC ${fmtDateOnly(anchorIsoDate)}`;
        }
    }

    setTxt('lbl-active-anchor-short', fmtDateOnly(activeAnchorDateIso));
    setTxt('nav-tab2-anchor', `Mốc ${fmtDateOnly(anchorIsoDate)}`);
    setTxt('t2-grid60-anchor-lbl', `${fmtDateOnly(anchorIsoDate)}/${parseIso(anchorIsoDate).getFullYear()}`);

    // Tracker Bar Step Cards
    const cardN1 = document.getElementById('tracker-card-n1');
    const cardN2 = document.getElementById('tracker-card-n2');
    const cardN3 = document.getElementById('tracker-card-n3');

    cardN1?.classList.remove('active-step');
    cardN2?.classList.remove('active-step');
    cardN3?.classList.remove('active-step');

    if (frame.statusN2 === 'ACTIVE') cardN2?.classList.add('active-step');
    else if (frame.statusN3 === 'ACTIVE') cardN3?.classList.add('active-step');
    else if (frame.statusN1 === 'PENDING') cardN1?.classList.add('active-step');

    setTxt('tracker-n1-date', fmtVNFull(frame.n1DateIso));
    const badgeN1El = document.getElementById('tracker-n1-badge');
    if (badgeN1El) {
        badgeN1El.className = `step-badge ${frame.badgeN1}`;
        badgeN1El.textContent = frame.labelN1;
    }
    setTxt('tracker-n1-info', frame.recN1 ? `Kết quả: Đề ${frame.deN1}` : 'Chưa có kết quả');

    setTxt('tracker-n2-date', fmtVNFull(frame.n2DateIso));
    const badgeN2El = document.getElementById('tracker-n2-badge');
    if (badgeN2El) {
        badgeN2El.className = `step-badge ${frame.badgeN2}`;
        badgeN2El.textContent = frame.labelN2;
    }
    setTxt('tracker-n2-info', frame.recN2 ? `Kết quả: Đề ${frame.deN2}` : (frame.statusN2 === 'ACTIVE' ? 'Đang đánh hôm nay' : 'Dự phòng'));

    setTxt('tracker-n3-date', fmtVNFull(frame.n3DateIso));
    const badgeN3El = document.getElementById('tracker-n3-badge');
    if (badgeN3El) {
        badgeN3El.className = `step-badge ${frame.badgeN3}`;
        badgeN3El.textContent = frame.labelN3;
    }
    setTxt('tracker-n3-info', frame.recN3 ? `Kết quả: Đề ${frame.deN3}` : (frame.statusN3 === 'ACTIVE' ? 'Đang đánh chốt khung' : 'Dự phòng'));

    // Tier 1 (60s N1)
    setTxt('grid60-n1-date', fmtVNFull(frame.n1DateIso));
    const g60Badge = document.getElementById('grid60-n1-result-badge');
    if (g60Badge) {
        g60Badge.className = `badge ${frame.badgeN1}`;
        g60Badge.textContent = frame.labelN1;
    }
    renderNumberGrid(frame.dan60_N1);

    // Tier 2 (36s N2)
    setTxt('grid36-n2-date', fmtVNFull(frame.n2DateIso));
    const g36Badge = document.getElementById('grid36-n2-result-badge');
    if (g36Badge) {
        g36Badge.className = `badge ${frame.badgeN2}`;
        g36Badge.textContent = frame.labelN2;
    }

    // Tier 3 (36s N3)
    setTxt('grid36-n3-date', fmtVNFull(frame.n3DateIso));
    const gN3Badge = document.getElementById('grid36-n3-result-badge');
    if (gN3Badge) {
        gN3Badge.className = `badge ${frame.badgeN3}`;
        gN3Badge.textContent = frame.labelN3;
    }

    // Top 20 & 3D & 4D dates
    setTxt('grid20-n1-date', fmtVNShort(frame.n1DateIso));
    setTxt('grid3d-n1-date', fmtVNShort(frame.n1DateIso));
    setTxt('grid4d-n1-date', fmtVNShort(frame.n1DateIso));

    // Render Lowering Grids
    renderLoweringGrids(frame.dan36_N2, frame.dan36_N3, frame.dan20);
}

// Render Tab 3: KHUNG KẾ TIẾP (Dự Phòng Tham Khảo)
function renderTab3(nextAnchorIsoDate) {
    const frame = generateFrameDataForAnchor(nextAnchorIsoDate);
    currentTab3Frame = frame;

    setTxt('t3-anchor-cycle-lbl', `Mốc ${fmtDateOnly(nextAnchorIsoDate)}/${parseIso(nextAnchorIsoDate).getFullYear()}`);
    setTxt('t3-sub-n1', fmtDateOnly(frame.n1DateIso));
    setTxt('t3-sub-n2', fmtDateOnly(frame.n2DateIso));
    setTxt('t3-sub-n3', fmtDateOnly(frame.n3DateIso));

    // Mode 1 card
    setTxt('t3-desc-n1-date', fmtDateOnly(frame.n1DateIso));
    setTxt('t3-btn-n1-date', fmtVNShort(frame.n1DateIso));

    // Mode 2 card
    setTxt('t3-desc-anchor-n2', fmtDateOnly(nextAnchorIsoDate));
    setTxt('t3-desc-n2-date', fmtDateOnly(frame.n2DateIso));
    setTxt('t3-btn-n2-date', fmtVNShort(frame.n2DateIso));

    // Mode 3 card
    setTxt('t3-desc-anchor-n3', fmtDateOnly(nextAnchorIsoDate));
    setTxt('t3-desc-n3-date', fmtDateOnly(frame.n3DateIso));
    setTxt('t3-btn-n3-date', fmtVNShort(frame.n3DateIso));

    renderSelectedModeGrid();
}

function renderSelectedModeGrid() {
    const container = document.getElementById('grid-selected-mode-numbers');
    const titleEl = document.getElementById('selected-mode-title');
    const dateEl = document.getElementById('selected-mode-date');
    const countBadge = document.getElementById('selected-mode-count-badge');
    if (!container || !currentTab3Frame) return;

    let targetArr = currentTab3Frame.dan60_N1;
    let label = 'Khung Mới N1 - 60 Số Gốc';
    let targetDate = currentTab3Frame.n1DateIso;
    let countTxt = `${targetArr.length} Số`;

    if (selectedNextDayMode === 'n2') {
        targetArr = currentTab3Frame.dan36_N2;
        label = 'Dàn Nối Khung N2 - 36 Số Siêu Lọc';
        targetDate = currentTab3Frame.n2DateIso;
        countTxt = `${targetArr.length} Số`;
    } else if (selectedNextDayMode === 'n3') {
        targetArr = currentTab3Frame.dan36_N3;
        label = 'Dàn Chốt Khung N3 - 36 Số Hỏa Lực';
        targetDate = currentTab3Frame.n3DateIso;
        countTxt = `${targetArr.length} Số`;
    }

    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-fire text-amber"></i> Danh Sách Dàn Số Đã Chọn (${label})`;
    if (dateEl) dateEl.textContent = fmtVNFull(targetDate);
    if (countBadge) countBadge.textContent = countTxt;

    container.innerHTML = targetArr.map(n => {
        const str = String(n).padStart(2, '0');
        return `<span class="num-pill top clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
    }).join('');
}

function copySelectedMode() {
    if (!currentTab3Frame) return;
    let targetArr = currentTab3Frame.dan60_N1;
    let label = 'Dàn N1 Tham Khảo (60 Số)';
    let targetDate = currentTab3Frame.n1DateIso;

    if (selectedNextDayMode === 'n2') {
        targetArr = currentTab3Frame.dan36_N2;
        label = 'Dàn N2 Dự Phòng (36 Số)';
        targetDate = currentTab3Frame.n2DateIso;
    } else if (selectedNextDayMode === 'n3') {
        targetArr = currentTab3Frame.dan36_N3;
        label = 'Dàn N3 Dự Phòng (36 Số)';
        targetDate = currentTab3Frame.n3DateIso;
    }

    copyToClipboard(formatNumList(targetArr), `Đã sao chép ${label} cho ngày ${fmtVNShort(targetDate)}!`);
}

// Populate Date Picker & Quick Select Dropdown for Tab 2
function initTab2DatePicker() {
    const datePicker = document.getElementById('tab2-date-picker');
    const quickSelect = document.getElementById('tab2-quick-select');
    const resetBtn = document.getElementById('btn-tab2-current-frame');

    if (quickSelect && globalData && globalData.history) {
        quickSelect.innerHTML = '';

        const optActive = document.createElement('option');
        optActive.value = activeAnchorDateIso;
        optActive.textContent = `⚡ Mốc ${fmtDateOnly(activeAnchorDateIso)} (Khung Đang Đánh)`;
        quickSelect.appendChild(optActive);

        const sortedHist = globalData.history.slice().sort((a, b) => (Number(a.stt) || 0) - (Number(b.stt) || 0));
        const recentDates = [];
        for (let i = sortedHist.length - 1; i >= Math.max(0, sortedHist.length - 35); i--) {
            const m = sortedHist[i].date.match(/(\d{2})-(\d{2})-(\d{4})/);
            if (m) {
                const iso = `${m[3]}-${m[2]}-${m[1]}`;
                if (!recentDates.includes(iso)) {
                    recentDates.push(iso);
                }
            }
        }

        recentDates.forEach(iso => {
            if (iso !== activeAnchorDateIso) {
                const opt = document.createElement('option');
                opt.value = iso;
                opt.textContent = `📅 Mốc ${fmtDateOnly(iso)} (${fmtVNShort(iso)})`;
                quickSelect.appendChild(opt);
            }
        });
    }

    datePicker?.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
            selectedAnchorDateIso = val;
            renderTab2(selectedAnchorDateIso);
            showToast(`Đang xem Khung 3 ngày mốc ${fmtVNShort(val)}`);
        }
    });

    quickSelect?.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
            selectedAnchorDateIso = val;
            renderTab2(selectedAnchorDateIso);
            showToast(`Đang xem Khung 3 ngày mốc ${fmtVNShort(val)}`);
        }
    });

    resetBtn?.addEventListener('click', () => {
        selectedAnchorDateIso = activeAnchorDateIso;
        renderTab2(selectedAnchorDateIso);
        showToast(`Đã quay về Khung Đang Đánh (${fmtVNShort(activeAnchorDateIso)})!`);
    });
}

// Mode Selector Cards on Tab 3
function initModeSelector() {
    ['mode-card-n1', 'mode-card-n2', 'mode-card-n3'].forEach(id => {
        const card = document.getElementById(id);
        if (card) {
            card.addEventListener('click', () => {
                document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                selectedNextDayMode = card.dataset.mode;
                renderSelectedModeGrid();
            });
        }
    });

    document.getElementById('btn-copy-selected-mode')?.addEventListener('click', copySelectedMode);
    document.getElementById('btn-copy-mode-inner')?.addEventListener('click', copySelectedMode);
}

// Tab Switching
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(target)?.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initControls();
    initModeSelector();
    loadData();
});

// Load JSON Data safely with Cache Busting
async function loadData() {
    try {
        const res = await fetch('data.json?t=' + Date.now());
        if (res.ok) {
            const fetched = await res.json();
            if (fetched && fetched.history && fetched.history.length > 0) {
                globalData = fetched;
            }
        }
    } catch (err) {
        console.warn('Using embedded fallback data:', err);
    }
    
    // Resolve active cycle from history
    resolveActiveCycleFromHistory();

    // Set selected anchor to active anchor initially
    selectedAnchorDateIso = activeAnchorDateIso;

    // Render Tab 2 and Tab 3
    initTab2DatePicker();
    renderTab2(selectedAnchorDateIso);
    renderTab3(nextCycleAnchorDateIso);

    // Update Top Alert Box
    const activeFrame = generateFrameDataForAnchor(activeAnchorDateIso);
    updateTopAlertBanner(activeFrame);

    // Extract 3D & 4D if available
    if (globalData.top_3d_4d) {
        const parsed3D = globalData.top_3d_4d.filter(x => x['Loại Số'] === '🥇 TOP 20 BA CÀNG (3D) MẠNH NHẤT' || (x['Số Dự Đoán'] && x['Số Dự Đoán'].length === 3)).map(x => x['Số Dự Đoán']).slice(0, 20);
        const parsed4D = globalData.top_3d_4d.filter(x => x['Loại Số'] === '⚡ TOP 20 BỐN CÀNG (4D) MẠNH NHẤT' || (x['Số Dự Đoán'] && x['Số Dự Đoán'].length === 4)).map(x => x['Số Dự Đoán']).slice(0, 20);
        if (parsed3D.length > 0) current3D = parsed3D;
        if (parsed4D.length > 0) current4D = parsed4D;
    }

    renderHistoryTable(globalData.history);
    renderFrameHistoryTable(globalData.frame_history || globalData.history);
    renderGaussianList(globalData.dan_nhip_vang);
    render3D4DGrids();
    runOptimizerEngine();
}

// Controls & Copy Listeners
function initControls() {
    ['chk-sat-heads', 'chk-recent-days', 'chk-low-scores', 'chk-shadow-swap', 'chk-30day-cross'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', runOptimizerEngine);
    });

    // Main Copy Buttons for Tab 2
    document.getElementById('btn-copy-tab1')?.addEventListener('click', () => {
        copyToClipboard(formatNumList(currentOptimized60), `Đã sao chép Dàn 60 Số N1 Tối Ưu (${fmtVNShort(nextCycleAnchorDateIso)})!`);
    });

    document.getElementById('btn-copy-60')?.addEventListener('click', () => {
        const nums = currentTab2Frame ? currentTab2Frame.dan60_N1 : currentOptimized60;
        const dStr = currentTab2Frame ? fmtVNShort(currentTab2Frame.n1DateIso) : '';
        copyToClipboard(formatNumList(nums), `Đã sao chép Dàn 60 Số N1 (Mốc ${dStr})!`);
    });

    document.getElementById('btn-copy-36')?.addEventListener('click', () => {
        const nums = currentTab2Frame ? currentTab2Frame.dan36_N2 : [];
        const dStr = currentTab2Frame ? fmtVNShort(currentTab2Frame.n2DateIso) : '';
        copyToClipboard(formatNumList(nums), `Đã sao chép Dàn 36 Số N2 (${dStr})!`);
    });

    document.getElementById('btn-copy-n3')?.addEventListener('click', () => {
        const nums = currentTab2Frame ? currentTab2Frame.dan36_N3 : [];
        const dStr = currentTab2Frame ? fmtVNShort(currentTab2Frame.n3DateIso) : '';
        copyToClipboard(formatNumList(nums), `Đã sao chép Dàn 36 Số N3 (${dStr})!`);
    });

    document.getElementById('btn-copy-20')?.addEventListener('click', () => {
        const nums = currentTab2Frame ? currentTab2Frame.dan20 : [];
        const dStr = currentTab2Frame ? fmtVNShort(currentTab2Frame.n1DateIso) : '';
        copyToClipboard(formatNumList(nums), `Đã sao chép Dàn Top 20 (${dStr})!`);
    });

    document.getElementById('btn-copy-3d')?.addEventListener('click', () => {
        const dStr = currentTab2Frame ? fmtVNShort(currentTab2Frame.n1DateIso) : '';
        copyToClipboard(current3D.join(', '), `Đã sao chép Top 20 3D (${dStr})!`);
    });

    document.getElementById('btn-copy-4d')?.addEventListener('click', () => {
        const dStr = currentTab2Frame ? fmtVNShort(currentTab2Frame.n1DateIso) : '';
        copyToClipboard(current4D.join(', '), `Đã sao chép Top 20 4D (${dStr})!`);
    });

    document.getElementById('btn-copy-headtail')?.addEventListener('click', () => copyToClipboard('Đầu 2, Đầu 3, Đầu 1, Đầu 5, Đầu 8 - Đuôi 3, Đuôi 1, Đuôi 7, Đuôi 5, Đuôi 9', 'Đã sao chép Top Đầu/Đuôi!'));
    document.getElementById('btn-copy-gaussian')?.addEventListener('click', () => copyToClipboard(formatNumList(gaussianHighFreq), 'Đã sao chép Dàn Nhịp Vàng Gaussian!'));

    document.getElementById('btn-copy-30recent')?.addEventListener('click', () => {
        if (!globalData || !globalData.history) return;
        const recent30 = globalData.history.slice(-30).map(x => x.de).join(', ');
        copyToClipboard(recent30, 'Đã sao chép 30 kỳ Đề gần nhất!');
    });

    document.getElementById('btn-copy-frame-log')?.addEventListener('click', () => {
        if (!globalData || !globalData.frame_history) return;
        const logTxt = globalData.frame_history.slice(-20).map(f => `STT ${f.stt} [${f.date_start}]: ${f.result}`).join('\n');
        copyToClipboard(logTxt, 'Đã sao chép nhật ký 20 khung gần nhất!');
    });

    document.getElementById('btn-download-txt')?.addEventListener('click', downloadTxtFile);

    // Global Click Delegation for Pill Copying
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('.clickable-pill') || e.target.closest('.num-pill') || e.target.closest('.score-badge');
        if (target) {
            const val = target.dataset.copy || target.innerText.replace(/[^0-9]/g, '');
            if (val && val.length > 0) {
                copyToClipboard(val, `Đã sao chép con số ${val}`);
            }
        }
    });

    // Live Fetch Button
    document.getElementById('btn-fetch-live')?.addEventListener('click', async () => {
        showToast('Đang kết nối ketqua16.net và cập nhật dữ liệu...');
        await loadData();
        runOptimizerEngine();
        setTimeout(() => showToast('Dữ liệu đã được cập nhật mới nhất!'), 1000);
    });

    // GitHub Push Button
    document.getElementById('btn-export-git')?.addEventListener('click', () => {
        showToast('Hãy chạy file auto_push_daily.bat để đẩy code lên GitHub!');
    });

    // History Search
    document.getElementById('history-search')?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!globalData || !globalData.history) return;
        const filtered = globalData.history.filter(item => 
            item.date.toLowerCase().includes(query) ||
            item.full_db.includes(query) ||
            item.de.includes(query)
        );
        renderHistoryTable(filtered);
    });

    // Frame Search
    document.getElementById('frame-search')?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!globalData || !globalData.frame_history) return;
        const filtered = globalData.frame_history.filter(item => 
            String(item.stt).includes(query) ||
            item.date_start.toLowerCase().includes(query) ||
            item.result.toLowerCase().includes(query)
        );
        renderFrameHistoryTable(filtered);
    });
}

function formatNumList(arr) {
    if (!arr || arr.length === 0) return '';
    return arr.map(n => String(n).padStart(2, '0')).join(', ');
}

// Core 4-Step Optimizer Engine
function runOptimizerEngine() {
    const filterSatHeads = document.getElementById('chk-sat-heads')?.checked ?? true;
    const filterRecent = document.getElementById('chk-recent-days')?.checked ?? true;
    const filterLowScores = document.getElementById('chk-low-scores')?.checked ?? true;
    const useShadows = document.getElementById('chk-shadow-swap')?.checked ?? true;
    const use30DayCross = document.getElementById('chk-30day-cross')?.checked ?? true;

    // Recent 30 history & 2 days
    const recent30Hits = (globalData && globalData.history) ? globalData.history.slice(-30).map(x => parseInt(x.de)).filter(x => !isNaN(x)) : [];
    const recent2Days = getRecent2Days();

    // Calculate score for 100 numbers
    let pool = [];
    for (let i = 0; i < 100; i++) {
        const h = Math.floor(i / 10);
        const t = i % 10;
        const hScore = headScores[h] || 5.0;
        const tScore = tailScores[t] || 5.0;

        let score = hScore * 2.0 + tScore * 1.5;
        if (gaussianHighFreq.includes(i)) score += 10.0;
        
        const count30 = recent30Hits.filter(x => x === i).length;
        score += count30 * 4.0;

        let valid = true;
        let rejectReason = '';

        // Soft filters (Điểm phạt thay vì loại bỏ cứng)
        if (filterSatHeads && (h === 4 || h === 7)) {
            score -= 12.0;
            rejectReason = 'Phạt Đầu 4,7 (-12đ)';
        }
        if (filterRecent && recent2Days.includes(i)) {
            score -= 15.0;
            rejectReason = 'Phạt Đề rơi (-15đ)';
        }
        if (filterLowScores && (hScore < 7.0 || tScore < 7.0)) {
            score -= 8.0;
            rejectReason = 'Phạt Đ/Đuôi kém (-8đ)';
        }

        pool.push({ num: i, head: h, tail: t, score, valid: true, rejectReason, count30 });
    }

    // Sort pool by total composite score
    let validPool = pool.sort((a, b) => b.score - a.score);

    // Initial 60 selection
    let selectedNums = validPool.slice(0, 60).map(p => p.num);

    // Step 3: Shadow injection
    if (useShadows) {
        const top10 = selectedNums.slice(0, 10);
        top10.forEach(num => {
            const sh = ((Math.floor(num / 10) + 5) % 10) * 10 + ((num % 10) + 5) % 10;
            const targetObj = pool.find(p => p.num === sh);
            if (targetObj && targetObj.valid && !selectedNums.includes(sh) && selectedNums.length < 60) {
                selectedNums.push(sh);
            }
        });
    }

    // Step 4: 30-day cross verification
    if (use30DayCross && recent30Hits.length > 0) {
        let active30 = selectedNums.filter(n => recent30Hits.includes(n));
        let inactive30 = selectedNums.filter(n => !recent30Hits.includes(n));
        let activeOutside = validPool.map(p => p.num).filter(n => !selectedNums.includes(n) && recent30Hits.includes(n));

        const swapCount = Math.min(inactive30.length, activeOutside.length);
        for (let k = 0; k < swapCount; k++) {
            const remIdx = selectedNums.indexOf(inactive30[k]);
            if (remIdx > -1) {
                selectedNums.splice(remIdx, 1);
                selectedNums.push(activeOutside[k]);
            }
        }
    }

    currentOptimized60 = selectedNums.sort((a, b) => a - b);
    
    // OPTIMIZED 36 NUMBERS PLAN FOR N2 & N3
    // Strictly extract Top 36 AI scored numbers from N1 60 numbers
    const n1PoolWithScore = pool.filter(p => currentOptimized60.includes(p.num)).sort((a, b) => b.score - a.score);
    current36_N2 = n1PoolWithScore.slice(0, 36).map(p => p.num).sort((a, b) => a - b);
    current36_N3 = n1PoolWithScore.slice(0, 36).map(p => p.num).sort((a, b) => a - b);

    current20 = n1PoolWithScore.slice(0, 20).map(p => p.num).sort((a, b) => a - b);

    // Update UI Metrics
    const metricSize = document.getElementById('metric-size');
    if (metricSize) metricSize.textContent = `${currentOptimized60.length} Số`;
    
    const metricFiltered = document.getElementById('metric-filtered');
    if (metricFiltered) metricFiltered.textContent = `${100 - validPool.length} Số`;

    // Render Tab 1 Live Preview Grid
    renderTab1VisualGrid(currentOptimized60);
}

// Render Tab 1 Live Preview Grid
function renderTab1VisualGrid(nums) {
    const grid = document.getElementById('tab1-visual-grid');
    if (!grid) return;

    grid.innerHTML = nums.map(n => {
        const str = String(n).padStart(2, '0');
        const isGaussian = gaussianHighFreq.includes(n);
        const cls = isGaussian ? 'gaussian' : 'top';
        return `<span class="num-pill ${cls} clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
    }).join('');
}

// Render 60 Number Grid (Tab 2)
function renderNumberGrid(nums) {
    const grid = document.getElementById('grid-60-numbers');
    if (!grid) return;

    grid.innerHTML = '';
    nums.forEach(n => {
        const str = String(n).padStart(2, '0');
        const isGaussian = gaussianHighFreq.includes(n);
        const isShadow = [28, 89, 68, 2, 84, 83].includes(n);

        const cell = document.createElement('div');
        cell.className = `num-cell ${isGaussian ? 'gaussian' : ''} ${isShadow ? 'shadow' : ''}`;
        cell.innerHTML = `${str} <span class="num-tag"></span>`;
        cell.title = `Số ${str} - Click để Sao chép`;
        cell.addEventListener('click', () => copyToClipboard(str, `Đã sao chép con số ${str}`));
        grid.appendChild(cell);
    });
}

// Render Lowering Grids (Top 36 N2, Top 36 N3, Top 20)
function renderLoweringGrids(dan36N2, dan36N3, dan20) {
    const grid36 = document.getElementById('grid-36-numbers');
    const gridN3 = document.getElementById('grid-n3-numbers');
    const grid20 = document.getElementById('grid-20-numbers');

    const list36N2 = dan36N2 || (currentTab2Frame ? currentTab2Frame.dan36_N2 : current36_N2) || [];
    const list36N3 = dan36N3 || (currentTab2Frame ? currentTab2Frame.dan36_N3 : current36_N3) || [];
    const list20 = dan20 || (currentTab2Frame ? currentTab2Frame.dan20 : current20) || [];

    if (grid36) {
        grid36.innerHTML = list36N2.map(n => {
            const str = String(n).padStart(2, '0');
            return `<span class="num-pill top clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
        }).join('');
    }

    if (gridN3) {
        gridN3.innerHTML = list36N3.map(n => {
            const str = String(n).padStart(2, '0');
            return `<span class="num-pill purple clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
        }).join('');
    }

    if (grid20) {
        grid20.innerHTML = list20.map(n => {
            const str = String(n).padStart(2, '0');
            return `<span class="num-pill gaussian clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
        }).join('');
    }
}

// Render 3D & 4D Visual Grids
function render3D4DGrids() {
    const grid3D = document.getElementById('grid-3d-numbers');
    const grid4D = document.getElementById('grid-4d-numbers');

    if (grid3D && current3D.length > 0) {
        grid3D.innerHTML = current3D.map(num => `<span class="num-pill gaussian clickable-pill" data-copy="${num}">${num} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`).join('');
    }
    if (grid4D && current4D.length > 0) {
        grid4D.innerHTML = current4D.map(num => `<span class="num-pill purple clickable-pill" data-copy="${num}">${num} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`).join('');
    }
}

// Render Frame History Journal Table (Tab 4)
function renderFrameHistoryTable(data) {
    const tbody = document.getElementById('tbody-frame-history');
    if (!tbody || !data) return;

    tbody.innerHTML = data.slice().reverse().map((row) => {
        const isHit = row.result && row.result.includes('TRÚNG');
        const badgeCls = isHit ? 'badge-success' : 'badge-danger';
        const sttNum = row.stt;
        const deHit = row.de_hit || (globalData.history.find(h => h.stt === sttNum)?.de || '--');

        return `
        <tr>
            <td><strong>Khung ${sttNum}</strong></td>
            <td><strong>${row.date_start}</strong></td>
            <td><span class="badge ${badgeCls}" style="font-size:0.9rem;">${row.result || 'TRÚNG N1 🎯'}</span></td>
            <td><span class="badge badge-purple clickable-pill" data-copy="${deHit}" style="font-size:0.95rem;">${deHit} <i class="fa-regular fa-copy"></i></span></td>
            <td><code class="clickable-pill" data-copy="${row.dan_n1 || ''}" style="font-size:0.8rem;">${(row.dan_n1 || '').slice(0, 45)}...</code></td>
            <td><span class="text-emerald" style="font-size:0.82rem; font-weight:700;"><i class="fa-solid fa-arrows-rotate"></i> Reset Khung Mới</span></td>
        </tr>
    `;
    }).join('');
}

// Render Gaussian Top List (Tab 5)
function renderGaussianList(list) {
    const container = document.getElementById('nhip-vang-container');
    if (!container || !list) return;

    container.innerHTML = list.map(item => {
        const numStr = String(item['Con Số 2D']).padStart(2, '0');
        return `
        <div class="clickable-pill" data-copy="${numStr}" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; margin-bottom:8px; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:12px;">
                <span class="badge badge-purple">${item['Thứ Hạng Hỏa Lực']}</span>
                <span style="font-size:1.2rem; font-weight:800; color:var(--accent-amber); font-family:var(--font-heading);">${numStr}</span>
                <i class="fa-regular fa-copy" style="color:var(--text-muted); font-size:0.85rem;"></i>
            </div>
            <div style="text-align:right;">
                <div style="font-weight:700; font-size:0.85rem; color:var(--accent-emerald);">${item['Điểm Nhịp Vàng Gaussian']}</div>
                <div style="font-size:0.75rem; color:var(--text-secondary);">${item['Khuyến Nghị Vốn']}</div>
            </div>
        </div>
    `;
    }).join('');
}

// Render History Table (Tab 6)
function renderHistoryTable(data) {
    const tbody = document.getElementById('tbody-history');
    if (!tbody || !data) return;

    tbody.innerHTML = data.slice().reverse().map((row) => `
        <tr>
            <td>${row.stt}</td>
            <td><strong>${row.date}</strong></td>
            <td><code class="clickable-pill" data-copy="${row.full_db}">${row.full_db}</code></td>
            <td><span class="badge badge-success clickable-pill" data-copy="${row.de}" style="font-size:0.95rem; cursor:pointer;">${row.de} <i class="fa-regular fa-copy"></i></span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_1}">${row.g7_1}</span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_2}">${row.g7_2}</span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_3}">${row.g7_3}</span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_4}">${row.g7_4}</span></td>
        </tr>
    `).join('');
}

// BULLETPROOF COPY HELPER WITH FALLBACK FOR ALL BROWSERS & FILE PROTOCOL
function copyToClipboard(text, msg) {
    if (!text || String(text).trim() === '') {
        showToast('⚠️ Không có dữ liệu để sao chép!');
        return;
    }
    
    const cleanText = String(text).trim();

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(cleanText).then(() => {
            showToast(msg);
        }).catch(() => {
            fallbackCopyText(cleanText, msg);
        });
    } else {
        fallbackCopyText(cleanText, msg);
    }
}

function fallbackCopyText(text, msg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(msg);
    } catch (err) {
        console.error('Fallback copy failed', err);
        showToast(`Đã sao chép: ${text.slice(0, 20)}...`);
    }
    document.body.removeChild(textArea);
}

// Download TXT
function downloadTxtFile() {
    const frame = currentTab2Frame || generateFrameDataForAnchor(activeAnchorDateIso);
    const n1DateStr = fmtVNFull(frame.n1DateIso);
    const n2DateStr = fmtVNFull(frame.n2DateIso);
    const n3DateStr = fmtVNFull(frame.n3DateIso);

    const sortedHist = (globalData && globalData.history) ? globalData.history.slice().sort((a, b) => (Number(a.stt) || 0) - (Number(b.stt) || 0)) : [];
    const lastRec = sortedHist[sortedHist.length - 1] || {};
    const lastDe = lastRec.de || '--';

    const content = `DAN 60 SO N1 TOI UU 4 BUOC - XSMB 2026\nKhung 3 Ngay MOC: ${n1DateStr} (Ky gan nhat: De ${lastDe})\n=========================================\n\nTANG 1: DAN GOC 60 SO (N1 - ${n1DateStr}):\n${formatNumList(frame.dan60_N1)}\n\nTANG 2: DAN SIEU LOC 36 SO (N2 - ${n2DateStr}):\n${formatNumList(frame.dan36_N2)}\n\nTANG 3: DAN SIEU LOC 36 SO (N3 - ${n3DateStr}):\n${formatNumList(frame.dan36_N3)}\n\nDAN HOA LUC TOP 20 (${n1DateStr}):\n${formatNumList(frame.dan20)}\n\nTOP 20 BA CANG 3D (${n1DateStr}):\n${current3D.join(', ')}\n\nTOP 20 BON CANG 4D (${n1DateStr}):\n${current4D.join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Khung_3_Ngay_Moc_${fmtDateOnly(frame.anchorIsoDate).replace('/', '_')}.txt`;
    a.click();
    showToast('Đã tải xuống file .TXT!');
}


// Toast
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}
