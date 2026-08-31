/* ==========================================================================
   AI XSMB 2026 - OPTIMIZER MINI APP CORE LOGIC (ALL TABS VISUAL & COPYABLE)
   ========================================================================== */

let globalData = null;
let currentOptimized60 = [];
let current36 = [];
let current20 = [];
let current3D = [];
let current4D = [];

// Base AI Scores
const headScores = { 0: 7.5, 1: 10.5, 2: 13.0, 3: 11.0, 4: 5.5, 5: 9.5, 6: 8.5, 7: 6.0, 8: 9.0, 9: 8.5 };
const tailScores = { 0: 6.5, 1: 10.0, 2: 7.0, 3: 11.5, 4: 6.0, 5: 8.5, 6: 6.5, 7: 9.0, 8: 7.5, 9: 8.0 };
const gaussianHighFreq = [39, 43, 57, 25, 89, 70, 34, 93, 52, 84, 7, 75, 2, 20, 98, 48];
const recent2Days = [72, 44];

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initControls();
    loadData();
});

// Load JSON Data
async function loadData() {
    try {
        const res = await fetch('data.json');
        globalData = await res.json();
        
        // Extract 3D & 4D from globalData if available
        if (globalData.top_3d_4d) {
            current3D = globalData.top_3d_4d.filter(x => x['Loại Số'] === '🥇 TOP 20 BA CÀNG (3D) MẠNH NHẤT' || (x['Số Dự Đoán'] && x['Số Dự Đoán'].length === 3)).map(x => x['Số Dự Đoán']).slice(0, 20);
            current4D = globalData.top_3d_4d.filter(x => x['Loại Số'] === '⚡ TOP 20 BỐN CÀNG (4D) MẠNH NHẤT' || (x['Số Dự Đoán'] && x['Số Dự Đoán'].length === 4)).map(x => x['Số Dự Đoán']).slice(0, 20);
        }
        
        // Fallback default 3D / 4D if empty
        if (current3D.length === 0) current3D = ['339', '443', '557', '225', '889', '770', '334', '993', '552', '884', '007', '775', '002', '220', '998', '448', '668', '113', '222', '338'];
        if (current4D.length === 0) current4D = ['1339', '2443', '3557', '4225', '5889', '6770', '7334', '8993', '9552', '0884', '1007', '2775', '3002', '4220', '5998', '6448', '7668', '8113', '9222', '0338'];

        renderHistoryTable(globalData.history);
        renderGaussianList(globalData.dan_nhip_vang);
        render3D4DGrids();
        runOptimizerEngine();
    } catch (err) {
        console.error('Failed to load data.json:', err);
    }
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

    // Copy Buttons across all tabs
    document.getElementById('btn-copy-tab1')?.addEventListener('click', () => copyToClipboard(currentOptimized60.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn 60 Số Tab 1!'));
    document.getElementById('btn-copy-60')?.addEventListener('click', () => copyToClipboard(currentOptimized60.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn 60 Số N1!'));
    document.getElementById('btn-copy-36')?.addEventListener('click', () => copyToClipboard(current36.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn Siêu Lọc 36 Số!'));
    document.getElementById('btn-copy-20')?.addEventListener('click', () => copyToClipboard(current20.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn Hỏa Lực Top 20!'));
    document.getElementById('btn-copy-3d')?.addEventListener('click', () => copyToClipboard(current3D.join(', '), 'Đã sao chép Top 20 Ba Càng (3D)!'));
    document.getElementById('btn-copy-4d')?.addEventListener('click', () => copyToClipboard(current4D.join(', '), 'Đã sao chép Top 20 Bốn Càng (4D)!'));
    document.getElementById('btn-copy-headtail')?.addEventListener('click', () => copyToClipboard('Đầu 2, Đầu 3, Đầu 1, Đầu 5, Đầu 8 - Đuôi 3, Đuôi 1, Đuôi 7, Đuôi 5, Đuôi 9', 'Đã sao chép Top Đầu/Đuôi!'));
    document.getElementById('btn-copy-gaussian')?.addEventListener('click', () => copyToClipboard(gaussianHighFreq.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn Nhịp Vàng Gaussian!'));
    document.getElementById('btn-copy-30recent')?.addEventListener('click', () => {
        if (!globalData) return;
        const recent30 = globalData.history.slice(-30).map(x => x.de).join(', ');
        copyToClipboard(recent30, 'Đã sao chép 30 kỳ Đề gần nhất!');
    });

    document.getElementById('btn-download-txt')?.addEventListener('click', downloadTxtFile);

    // Clickable pills with data-copy attribute
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('.clickable-pill');
        if (target && target.dataset.copy) {
            copyToClipboard(target.dataset.copy, `Đã sao chép con số ${target.dataset.copy}`);
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
        if (!globalData) return;
        const filtered = globalData.history.filter(item => 
            item.date.toLowerCase().includes(query) ||
            item.full_db.includes(query) ||
            item.de.includes(query)
        );
        renderHistoryTable(filtered);
    });
}

// Core 4-Step Optimizer Engine
function runOptimizerEngine() {
    const filterSatHeads = document.getElementById('chk-sat-heads')?.checked ?? true;
    const filterRecent = document.getElementById('chk-recent-days')?.checked ?? true;
    const filterLowScores = document.getElementById('chk-low-scores')?.checked ?? true;
    const useShadows = document.getElementById('chk-shadow-swap')?.checked ?? true;
    const use30DayCross = document.getElementById('chk-30day-cross')?.checked ?? true;

    // Recent 30 history
    const recent30Hits = globalData ? globalData.history.slice(-30).map(x => parseInt(x.de)).filter(x => !isNaN(x)) : [];

    // Calculate score for 100 numbers
    let pool = [];
    for (let i = 0; i < 100; i++) {
        const h = Math.floor(i / 10);
        const t = i % 10;
        const hScore = headScores[h];
        const tScore = tailScores[t];

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
    if (use30DayCross) {
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
    
    // Lower subsets
    current36 = currentOptimized60.filter(n => {
        const h = Math.floor(n / 10);
        return [1, 2, 3, 5, 8, 9].includes(h);
    }).slice(0, 36);

    current20 = pool.filter(p => currentOptimized60.includes(p.num)).sort((a, b) => b.score - a.score).slice(0, 20).map(p => p.num).sort((a, b) => a - b);

    // Update UI Metrics
    document.getElementById('metric-size').textContent = `${currentOptimized60.length} Số`;
    const filteredCount = 100 - validPool.length;
    document.getElementById('metric-filtered').textContent = `${filteredCount} Số`;

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

// Render Lowering Grids (Top 36 & Top 20)
function renderLoweringGrids() {
    const grid36 = document.getElementById('grid-36-numbers');
    const grid20 = document.getElementById('grid-20-numbers');

    if (grid36) {
        grid36.innerHTML = current36.map(n => {
            const str = String(n).padStart(2, '0');
            return `<span class="num-pill top clickable-pill" data-copy="${str}">${str} <i class="fa-regular fa-copy" style="font-size:0.75rem; opacity:0.6;"></i></span>`;
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

// Render Gaussian Top List (Tab 3)
function renderGaussianList(list) {
    const container = document.getElementById('nhip-vang-container');
    if (!container || !list) return;

    container.innerHTML = list.map(item => {
        const numStr = String(item['Con Số 2D']).padStart(2, '0');
        return `
        <div class="clickable-pill" data-copy="${numStr}" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; margin-bottom:8px;">
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

// Render History Table (Tab 4)
function renderHistoryTable(data) {
    const tbody = document.getElementById('tbody-history');
    if (!tbody || !data) return;

    tbody.innerHTML = data.slice().reverse().map((row) => `
        <tr>
            <td>${row.stt}</td>
            <td><strong>${row.date}</strong></td>
            <td><code class="clickable-pill" data-copy="${row.full_db}">${row.full_db}</code></td>
            <td><span class="badge badge-success clickable-pill" data-copy="${row.de}" style="font-size:0.95rem;">${row.de} <i class="fa-regular fa-copy"></i></span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_1}">${row.g7_1}</span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_2}">${row.g7_2}</span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_3}">${row.g7_3}</span></td>
            <td><span class="clickable-pill" data-copy="${row.g7_4}">${row.g7_4}</span></td>
        </tr>
    `).join('');
}

// Copy to Clipboard Utility
function copyToClipboard(text, msg) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
    });
}

// Download TXT
function downloadTxtFile() {
    const content = `DAN 60 SO N1 TOI UU 4 BUOC - XSMB 2026\nNgay: Thu Ba (01/09/2026)\n=========================================\n${currentOptimized60.map(n => String(n).padStart(2, '0')).join(', ')}\n\nDAN SIEU LOC 36 SO (N2):\n${current36.map(n => String(n).padStart(2, '0')).join(', ')}\n\nDAN HOA LUC TOP 20:\n${current20.map(n => String(n).padStart(2, '0')).join(', ')}\n\nTOP 20 BA CANG (3D):\n${current3D.join(', ')}\n\nTOP 20 BON CANG (4D):\n${current4D.join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Dan_60_So_N1_Toi_Uu_2026.txt';
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
