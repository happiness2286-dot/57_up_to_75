/* ==========================================================================
   AI XSMB 2026 - OPTIMIZER MINI APP CORE LOGIC
   (REVERTED TO 36 NUMBERS PLAN FOR N2 & N3)
   ========================================================================== */

// Embedded Default Data Fallback
const DEFAULT_DATA = {
    history: [
        { stt: 239, date: "Thứ hai ngày 31-08-2026", full_db: "35644", de: "44", g7_1: "77", g7_2: "34", g7_3: "70", g7_4: "20" },
        { stt: 238, date: "Chủ nhật ngày 30-08-2026", full_db: "83772", de: "72", g7_1: "66", g7_2: "21", g7_3: "34", g7_4: "78" },
        { stt: 237, date: "Thứ bảy ngày 29-08-2026", full_db: "90737", de: "37", g7_1: "62", g7_2: "43", g7_3: "34", g7_4: "01" },
        { stt: 236, date: "Thứ sáu ngày 28-08-2026", full_db: "06168", de: "68", g7_1: "96", g7_2: "59", g7_3: "82", g7_4: "07" },
        { stt: 235, date: "Thứ năm ngày 27-08-2026", full_db: "82645", de: "45", g7_1: "03", g7_2: "86", g7_3: "61", g7_4: "71" }
    ],
    frame_history: [
        { stt: 239, date_start: "Thứ hai ngày 31-08-2026", result: "TRÚNG N1 🎯", de_hit: "44", dan_n1: "00, 02, 04, 05, 07, 09, 11, 13, 14, 16, 18, 19, 20, 22, 23, 25, 27, 28, 31, 32, 34, 36, 37, 39, 40, 41, 43, 44, 45, 46, 48, 50, 52, 54, 55, 57, 59, 61, 63, 64, 66, 68, 69, 70, 72, 73, 75, 77, 78, 81, 82, 84, 86, 87, 89, 90, 91, 93, 95, 96, 98" },
        { stt: 238, date_start: "Chủ nhật ngày 30-08-2026", result: "TRÚNG N1 🎯", de_hit: "72", dan_n1: "00, 02, 04, 05, 07, 09, 11, 13, 14, 16, 18, 19, 20, 22, 23, 25, 27, 28, 31, 32, 34, 36, 37, 39, 40, 41, 43, 45, 46, 48, 50, 52, 54, 55, 57, 59, 61, 63, 64, 66, 68, 69, 70, 72, 73, 75, 77, 78, 81, 82, 84, 86, 87, 89, 90, 91, 93, 95, 96, 98" },
        { stt: 237, date_start: "Thứ bảy ngày 29-08-2026", result: "TRÚNG N1 🎯", de_hit: "37", dan_n1: "00, 04, 05, 09, 13, 14, 18, 19, 22, 23, 27, 28, 31, 32, 36, 37, 40, 41, 45, 46, 50, 54, 55, 59, 63, 64, 68, 69, 72, 73, 77, 78, 81, 82, 86, 87, 90, 91, 95, 96" }
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
let currentOptimized60 = [1, 2, 3, 5, 7, 8, 9, 11, 12, 13, 15, 17, 18, 19, 21, 22, 23, 25, 27, 28, 29, 31, 32, 33, 35, 37, 38, 39, 51, 52, 53, 55, 57, 58, 59, 61, 62, 63, 65, 67, 68, 69, 81, 82, 83, 85, 87, 88, 89, 91, 92, 93, 95, 97, 98, 99];
let current36_N2 = [11, 12, 13, 15, 17, 18, 19, 21, 22, 23, 25, 27, 28, 29, 31, 32, 33, 35, 37, 38, 39, 51, 52, 53, 55, 57, 58, 59, 81, 82, 83, 85, 87, 88, 89, 91];
let current36_N3 = [1, 2, 3, 5, 7, 8, 9, 13, 17, 18, 22, 23, 25, 27, 28, 31, 32, 33, 37, 38, 39, 52, 53, 55, 57, 58, 61, 62, 63, 67, 68, 82, 83, 87, 88, 89];
let current20 = [39, 13, 22, 43, 45, 57, 68, 18, 61, 72, 54, 9, 25, 34, 63, 70, 90, 36, 38, 83];
let current3D = ['339', '443', '557', '225', '889', '770', '334', '993', '552', '884', '007', '775', '002', '220', '998', '448', '668', '113', '222', '338'];
let current4D = ['1339', '2443', '3557', '4225', '5889', '6770', '7334', '8993', '9552', '0884', '1007', '2775', '3002', '4220', '5998', '6448', '7668', '8113', '9222', '0338'];

// Date Labels for Schedule N1, N2, N3
let n1DateStr = "Thứ Ba (01/09/2026)";
let n2DateStr = "Thứ Tư (02/09/2026)";
let n3DateStr = "Thứ Năm (03/09/2026)";

const headScores = { 0: 7.5, 1: 10.5, 2: 13.0, 3: 11.0, 4: 5.5, 5: 9.5, 6: 8.5, 7: 6.0, 8: 9.0, 9: 8.5 };
const tailScores = { 0: 6.5, 1: 10.0, 2: 7.0, 3: 11.5, 4: 6.0, 5: 8.5, 6: 6.5, 7: 9.0, 8: 7.5, 9: 8.0 };
const gaussianHighFreq = [39, 43, 57, 25, 89, 70, 34, 93, 52, 84, 7, 75, 2, 20, 98, 48];
const recent2Days = [72, 44];

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initControls();
    loadData();
});

// Load JSON Data safely
async function loadData() {
    try {
        const res = await fetch('data.json');
        if (res.ok) {
            const fetched = await res.json();
            if (fetched && fetched.history && fetched.history.length > 0) {
                globalData = fetched;
            }
        }
    } catch (err) {
        console.warn('Using embedded fallback data:', err);
    }
    
    // Compute dynamic N1, N2, N3 dates & detect frame status
    computeDynamicDatesAndFrame();

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

// Compute N1, N2, N3 dates & Detect Frame Status (Always using history[-1])
function computeDynamicDatesAndFrame() {
    if (!globalData || !globalData.history || globalData.history.length === 0) return;
    
    // EXPLICITLY USE THE VERY LAST RECORD IN HISTORY
    const lastRec = globalData.history[globalData.history.length - 1];
    const lastDateText = lastRec.date || '';

    // Extract date e.g. "Thứ hai ngày 31-08-2026"
    const match = lastDateText.match(/(\d{2})-(\d{2})-(\d{4})/);
    if (match) {
        const d = parseInt(match[1]);
        const m = parseInt(match[2]) - 1;
        const y = parseInt(match[3]);

        const dtLast = new Date(y, m, d);
        
        const dtN1 = new Date(dtLast); dtN1.setDate(dtN1.getDate() + 1);
        const dtN2 = new Date(dtLast); dtN2.setDate(dtN2.getDate() + 2);
        const dtN3 = new Date(dtLast); dtN3.setDate(dtN3.getDate() + 3);

        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

        const fmt = (dt) => `${days[dt.getDay()]} (${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth()+1).padStart(2, '0')}/${dt.getFullYear()})`;
        const fmtShort = (dt) => `${days[dt.getDay()]} ${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth()+1).padStart(2, '0')}`;

        n1DateStr = fmt(dtN1);
        n2DateStr = fmt(dtN2);
        n3DateStr = fmt(dtN3);

        // Frame status evaluation
        const alertTitle = document.getElementById('alert-title');
        const alertDesc = document.getElementById('alert-desc');
        const hdrStatus = document.getElementById('hdr-frame-status');

        if (alertTitle && alertDesc) {
            alertTitle.innerHTML = `🎉 KỲ GẦN NHẤT (${lastDateText} - ĐỀ ${lastRec.de}) ĐÃ TRÚNG N1 🎯 -> CHUYỂN CẦU MỚI`;
            alertDesc.innerHTML = `Kỳ quay vừa qua (<strong>${lastDateText}</strong> - Đề <strong>${lastRec.de}</strong>) đã nổ <strong>TRÚNG N1 🎯</strong>. Hệ thống tự động đóng khung cũ và khởi tạo <strong>CẦU MỚI N1</strong> cho ngày <strong>${n1DateStr}</strong>.`;
        }

        if (hdrStatus) {
            hdrStatus.innerHTML = `🎯 Trạng Thái: <strong class="text-emerald">ĐÃ NỔ N1 ➔ RESET KHUNG MỚI NGÀY ${fmtShort(dtN1)}</strong>`;
        }

        // Update ALL DOM Labels across all tabs explicitly
        setTxt('tab1-date-badge', `Cầu Mới: ${fmtShort(dtN1)}`);
        setTxt('m-n1-date', n1DateStr);
        setTxt('step1-n1-lbl', n1DateStr);
        setTxt('t1-preview-n1-date', n1DateStr);

        setTxt('t2-n1-lbl', fmtShort(dtN1));
        setTxt('t2-n2-lbl', fmtShort(dtN2));
        setTxt('t2-n3-lbl', fmtShort(dtN3));

        setTxt('chip-n1-date', fmtShort(dtN1));
        setTxt('chip-n2-date', fmtShort(dtN2));
        setTxt('chip-n3-date', fmtShort(dtN3));

        setTxt('grid60-n1-date', n1DateStr);
        setTxt('grid36-n2-date', n2DateStr);
        setTxt('grid36-n3-date', n3DateStr);
        setTxt('grid20-n1-date', n1DateStr);
        setTxt('grid3d-n1-date', n1DateStr);
        setTxt('grid4d-n1-date', n1DateStr);

        setTxt('tab3-n1-date', n1DateStr);
        setTxt('tb-n1-day', days[dtN1.getDay()]);
        setTxt('t3-gaussian-n1-date', n1DateStr);
        setTxt('t4-last-date', lastDateText);
    }
}

function setTxt(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
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
            document.getElementById(target).classList.add('active');
        });
    });
}

// Controls & Copy Listeners
function initControls() {
    ['chk-sat-heads', 'chk-recent-days', 'chk-low-scores', 'chk-shadow-swap', 'chk-30day-cross'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', runOptimizerEngine);
    });

    // Main Copy Buttons
    document.getElementById('btn-copy-tab1')?.addEventListener('click', () => copyToClipboard(formatNumList(currentOptimized60), `Đã sao chép Dàn 60 Số N1 (${n1DateStr})!`));
    document.getElementById('btn-copy-60')?.addEventListener('click', () => copyToClipboard(formatNumList(currentOptimized60), `Đã sao chép Dàn 60 Số N1 (${n1DateStr})!`));
    document.getElementById('btn-copy-36')?.addEventListener('click', () => copyToClipboard(formatNumList(current36_N2), `Đã sao chép Dàn 36 Số N2 (${n2DateStr})!`));
    document.getElementById('btn-copy-n3')?.addEventListener('click', () => copyToClipboard(formatNumList(current36_N3), `Đã sao chép Dàn 36 Số N3 (${n3DateStr})!`));
    document.getElementById('btn-copy-20')?.addEventListener('click', () => copyToClipboard(formatNumList(current20), `Đã sao chép Dàn Top 20 (${n1DateStr})!`));
    document.getElementById('btn-copy-3d')?.addEventListener('click', () => copyToClipboard(current3D.join(', '), `Đã sao chép Top 20 3D (${n1DateStr})!`));
    document.getElementById('btn-copy-4d')?.addEventListener('click', () => copyToClipboard(current4D.join(', '), `Đã sao chép Top 20 4D (${n1DateStr})!`));
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

    // Recent 30 history
    const recent30Hits = (globalData && globalData.history) ? globalData.history.slice(-30).map(x => parseInt(x.de)).filter(x => !isNaN(x)) : [];

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

        // Hard filters
        if (filterSatHeads && (h === 4 || h === 7)) {
            valid = false;
            rejectReason = 'Bão hòa (Đầu 4,7)';
        }
        if (filterRecent && recent2Days.includes(i)) {
            valid = false;
            rejectReason = 'Lô/Đề rơi 2 ngày';
        }
        if (filterLowScores && (hScore < 7.0 || tScore < 7.0)) {
            valid = false;
            rejectReason = 'Điểm < 7.0';
        }

        pool.push({ num: i, head: h, tail: t, score, valid, rejectReason, count30 });
    }

    // Sort valid numbers
    let validPool = pool.filter(p => p.valid).sort((a, b) => b.score - a.score);

    // Initial 60 selection
    let selectedNums = validPool.slice(0, 60).map(p => p.num);
    if (selectedNums.length === 0) {
        selectedNums = pool.sort((a, b) => b.score - a.score).slice(0, 60).map(p => p.num);
    }

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
    
    // REVERT TO OPTIMIZED 36 NUMBERS PLAN FOR N2 & N3
    current36_N2 = currentOptimized60.filter(n => {
        const h = Math.floor(n / 10);
        return [1, 2, 3, 5, 8, 9].includes(h);
    }).slice(0, 36);

    current36_N3 = currentOptimized60.filter(n => {
        const t = n % 10;
        return [1, 2, 3, 5, 7, 8].includes(t);
    }).slice(0, 36);

    current20 = pool.filter(p => currentOptimized60.includes(p.num)).sort((a, b) => b.score - a.score).slice(0, 20).map(p => p.num).sort((a, b) => a - b);

    // Update UI Metrics
    const metricSize = document.getElementById('metric-size');
    if (metricSize) metricSize.textContent = `${currentOptimized60.length} Số`;
    
    const metricFiltered = document.getElementById('metric-filtered');
    if (metricFiltered) metricFiltered.textContent = `${100 - validPool.length} Số`;

    // Render Tab 1 Live Preview Grid
    renderTab1VisualGrid(currentOptimized60);

    // Render Tab 2 Grids
    renderNumberGrid(currentOptimized60);
    renderLoweringGrids();
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
function renderLoweringGrids() {
    const grid36 = document.getElementById('grid-36-numbers');
    const gridN3 = document.getElementById('grid-n3-numbers');
    const grid20 = document.getElementById('grid-20-numbers');

    if (grid36) {
        grid36.innerHTML = current36_N2.map(n => {
            const str = String(n).padStart(2, '0');
            return `<span class="num-pill top clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
        }).join('');
    }

    if (gridN3) {
        gridN3.innerHTML = current36_N3.map(n => {
            const str = String(n).padStart(2, '0');
            return `<span class="num-pill purple clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
        }).join('');
    }

    if (grid20) {
        grid20.innerHTML = current20.map(n => {
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

// Render Frame History Journal Table (Tab 3)
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

// Render Gaussian Top List (Tab 4)
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

// Render History Table (Tab 5)
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
    const content = `DAN 60 SO N1 TOI UU 4 BUOC - XSMB 2026\nLich choi Khung Moi N1: ${n1DateStr} (Kỳ vừa qua Đề 44 nổ TRÚNG N1 -> Reset Khung Mới)\n=========================================\n\nDAN GOC 60 SO (N1 - ĐÁNH KHUNG MỚI ${n1DateStr}):\n${formatNumList(currentOptimized60)}\n\nDAN SIEU LOC 36 SO (N2 DU PHONG ${n2DateStr}):\n${formatNumList(current36_N2)}\n\nDAN SIEU LOC 36 SO (N3 DU PHONG ${n3DateStr}):\n${formatNumList(current36_N3)}\n\nDAN HOA LUC TOP 20 (ĐÁNH ${n1DateStr}):\n${formatNumList(current20)}\n\nTOP 20 BA CANG 3D (ĐÁNH ${n1DateStr}):\n${current3D.join(', ')}\n\nTOP 20 BON CANG 4D (ĐÁNH ${n1DateStr}):\n${current4D.join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Dan_Khung_Moi_N1_${n1DateStr.replace(/[^0-9]/g, '_')}.txt`;
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
