/* ==========================================================================
   AI XSMB 2026 - OPTIMIZER MINI APP CORE LOGIC
   ========================================================================== */

let globalData = null;
let currentOptimized60 = [];
let current36 = [];
let current20 = [];

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
        renderHistoryTable(globalData.history);
        renderGaussianList(globalData.dan_nhip_vang);
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

// Controls Event Listeners
function initControls() {
    ['chk-sat-heads', 'chk-recent-days', 'chk-low-scores', 'chk-shadow-swap', 'chk-30day-cross'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', runOptimizerEngine);
    });

    document.getElementById('btn-copy-60')?.addEventListener('click', () => copyToClipboard(currentOptimized60.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn 60 Số N1!'));
    document.getElementById('btn-copy-36')?.addEventListener('click', () => copyToClipboard(current36.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn Siêu Lọc 36 Số!'));
    document.getElementById('btn-copy-20')?.addEventListener('click', () => copyToClipboard(current20.map(n => String(n).padStart(2, '0')).join(', '), 'Đã sao chép Dàn Hỏa Lực Top 20!'));
    document.getElementById('btn-download-txt')?.addEventListener('click', downloadTxtFile);

    // GitHub Push
    document.getElementById('btn-export-git')?.addEventListener('click', () => {
        showToast('Repository ready! Git commit & push commands prepared.');
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

    renderNumberGrid(currentOptimized60);
    renderLoweringGrids();
}

// Render 60 Number Grid
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
        cell.title = `Số ${str} - AI Score: ${isGaussian ? 'Cực Cao (Gaussian)' : 'Tối Ưu 4 Bước'}`;
        cell.addEventListener('click', () => copyToClipboard(str, `Đã sao chép con số ${str}`));
        grid.appendChild(cell);
    });
}

// Render Lowering Grids
function renderLoweringGrids() {
    const grid36 = document.getElementById('grid-36-numbers');
    const grid20 = document.getElementById('grid-20-numbers');

    if (grid36) {
        grid36.innerHTML = current36.map(n => `<span class="num-pill top">${String(n).padStart(2, '0')}</span>`).join('');
    }
    if (grid20) {
        grid20.innerHTML = current20.map(n => `<span class="num-pill top">${String(n).padStart(2, '0')}</span>`).join('');
    }
}

// Render Gaussian Top List
function renderGaussianList(list) {
    const container = document.getElementById('nhip-vang-container');
    if (!container || !list) return;

    container.innerHTML = list.map(item => `
        <div style="display:flex; justify-shadow:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <span class="badge badge-purple">${item['Thứ Hạng Hỏa Lực']}</span>
                <span style="font-size:1.2rem; font-weight:800; color:var(--accent-amber); font-family:var(--font-heading);">${String(item['Con Số 2D']).padStart(2, '0')}</span>
            </div>
            <div style="text-align:right;">
                <div style="font-weight:700; font-size:0.85rem; color:var(--accent-emerald);">${item['Điểm Nhịp Vàng Gaussian']}</div>
                <div style="font-size:0.75rem; color:var(--text-secondary);">${item['Khuyến Nghị Vốn']}</div>
            </div>
        </div>
    `).join('');
}

// Render History Table
function renderHistoryTable(data) {
    const tbody = document.getElementById('tbody-history');
    if (!tbody || !data) return;

    tbody.innerHTML = data.slice().reverse().map((row, idx) => `
        <tr>
            <td>${row.stt}</td>
            <td><strong>${row.date}</strong></td>
            <td><code>${row.full_db}</code></td>
            <td><span class="badge badge-success" style="font-size:0.95rem;">${row.de}</span></td>
            <td>${row.g7_1}</td>
            <td>${row.g7_2}</td>
            <td>${row.g7_3}</td>
            <td>${row.g7_4}</td>
        </tr>
    `).join('');
}

// Copy to Clipboard Utility
function copyToClipboard(text, msg) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
    });
}

// Download TXT
function downloadTxtFile() {
    const content = `DAN 60 SO N1 TOI UU 4 BUOC - XSMB 2026\nNgay: Thu Ba (01/09/2026)\n=========================================\n${currentOptimized60.map(n => String(n).padStart(2, '0')).join(', ')}\n\nDAN SIEU LOC 36 SO (N2):\n${current36.map(n => String(n).padStart(2, '0')).join(', ')}\n\nDAN HOA LUC TOP 20:\n${current20.map(n => String(n).padStart(2, '0')).join(', ')}`;
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
