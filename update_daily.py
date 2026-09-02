# -*- coding: utf-8 -*-
"""
=============================================================================
XSMB 2026 DAILY AUTO-UPDATER & OPTIMIZER
Tự động cào kết quả từ https://ketqua16.net/, cập nhật Excel, JSON và tái tối ưu Dàn 60 Số N1
=============================================================================
"""

import urllib.request
import re
import json
import os
import sys
import pandas as pd
from datetime import datetime

# Reconfigure stdout for UTF-8
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DATA_JSON_PATH = 'data.json'
EXCEL_PATH = 'Thong_Ke_G7_Va_Top20_XSMB_2026.xlsx'
URL = 'https://ketqua16.net/'

def fetch_latest_result():
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Đang kết nối tới {URL}...")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    req = urllib.request.Request(URL, headers=headers)
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
    except Exception as e:
        print(f"❌ Lỗi khi tải dữ liệu từ {URL}: {e}")
        return None

    # Parse TD contents
    matches = re.findall(r'<td[^>]*>(.*?)</td>', html, re.DOTALL | re.IGNORECASE)
    clean_tds = [re.sub(r'<.*?>', '', m).strip() for m in matches if re.sub(r'<.*?>', '', m).strip()]
    
    date_str = None
    gdb_str = None
    g7_list = []

    # Find Date
    for item in clean_tds:
        if 'ngày' in item.lower() and ('thứ' in item.lower() or 'chủ nhật' in item.lower()):
            # e.g., 'Xổ số Truyền Thống \n\nThứ hai ngày 31-08-2026'
            lines = [l.strip() for l in item.split('\n') if l.strip()]
            date_str = lines[-1]
            break

    # Find Special Prize (GĐB) & G7
    for idx, item in enumerate(clean_tds):
        if 'đặc biệt' in item.lower() and idx + 1 < len(clean_tds):
            val = clean_tds[idx + 1]
            if val.isdigit() and len(val) == 5:
                gdb_str = val
        if 'bảy' in item.lower() and idx + 1 < len(clean_tds):
            val = clean_tds[idx + 1]
            # e.g. '77347020' -> 4 numbers of 2 digits
            digits = re.findall(r'\d{2}', val)
            if len(digits) >= 4:
                g7_list = digits[:4]

    if not date_str or not gdb_str or len(g7_list) < 4:
        print("❌ Không thể trích xuất đầy đủ thông tin từ trang ketqua16.net")
        return None

    so_de = gdb_str[-2:]
    result = {
        'date': date_str,
        'gdb': gdb_str,
        'de': so_de,
        'g7_1': g7_list[0],
        'g7_2': g7_list[1],
        'g7_3': g7_list[2],
        'g7_4': g7_list[3]
    }
    
    print(f"✅ Đã cào thành công kết quả ngày [{date_str}]: GĐB={gdb_str} (Đề={so_de}), G7=[{', '.join(g7_list)}]")
    return result

def get_dan_60(history_slice):
    head_scores = {0: 7.5, 1: 10.5, 2: 13.0, 3: 11.0, 4: 5.5, 5: 9.5, 6: 8.5, 7: 6.0, 8: 9.0, 9: 8.5}
    tail_scores = {0: 6.5, 1: 10.0, 2: 7.0, 3: 11.5, 4: 6.0, 5: 8.5, 6: 6.5, 7: 9.0, 8: 7.5, 9: 8.0}
    gaussian_high_freq = [39, 43, 57, 25, 89, 70, 34, 93, 52, 84, 7, 75, 2, 20, 98, 48]
    
    recent_2_days = [int(x['de']) for x in history_slice[-2:] if str(x.get('de', '')).isdigit()]
    recent_30_hits = [int(x['de']) for x in history_slice[-30:] if str(x.get('de', '')).isdigit()]
    
    pool = []
    for i in range(100):
        h = i // 10
        t = i % 10
        h_score = head_scores.get(h, 5.0)
        t_score = tail_scores.get(t, 5.0)
        
        score = h_score * 2.0 + t_score * 1.5
        if i in gaussian_high_freq:
            score += 10.0
            
        count_30 = recent_30_hits.count(i)
        score += count_30 * 4.0
        
        valid = True
        if h == 4 or h == 7:
            valid = False
        if i in recent_2_days:
            valid = False
        if h_score < 7.0 or t_score < 7.0:
            valid = False
            
        pool.append({'num': i, 'score': score, 'valid': valid})
        
    valid_pool = sorted([p for p in pool if p['valid']], key=lambda x: x['score'], reverse=True)
    selected = [p['num'] for p in valid_pool[:60]]
    if not selected:
        selected = [p['num'] for p in sorted(pool, key=lambda x: x['score'], reverse=True)[:60]]
        
    top_10 = selected[:10]
    for num in top_10:
        sh = ((num // 10 + 5) % 10) * 10 + ((num % 10 + 5) % 10)
        target = next((p for p in pool if p['num'] == sh), None)
        if target and target['valid'] and sh not in selected and len(selected) < 60:
            selected.append(sh)
            
    if recent_30_hits:
        inactive_30 = [n for n in selected if n not in recent_30_hits]
        active_outside = [p['num'] for p in valid_pool if p['num'] not in selected and p['num'] in recent_30_hits]
        swap_count = min(len(inactive_30), len(active_outside))
        for k in range(swap_count):
            rem_idx = selected.index(inactive_30[k])
            selected[rem_idx] = active_outside[k]
            
    return sorted(selected)

def sync_frame_history(data):
    history = data.get('history', [])
    frame_history = data.get('frame_history', [])
    existing_frame_stts = {f['stt'] for f in frame_history}
    
    updated = False
    for idx, rec in enumerate(history):
        stt = rec['stt']
        if stt not in existing_frame_stts and idx > 0:
            hist_before = history[:idx]
            dan_60 = get_dan_60(hist_before)
            de_hit = int(rec['de']) if str(rec.get('de', '')).isdigit() else -1
            
            is_hit = de_hit in dan_60
            result_str = "TRÚNG N1 🎯" if is_hit else "TRƯỢT KHUNG ❌"
            dan_str = ", ".join(f"{n:02d}" for n in dan_60) + f" ({len(dan_60)} số)"
            
            frame_entry = {
                "stt": stt,
                "date_start": rec['date'],
                "result": result_str,
                "de_hit": rec['de'],
                "dan_n1": dan_str
            }
            frame_history.append(frame_entry)
            updated = True
            
    data['frame_history'] = frame_history
    return updated

def update_app_js_fallback(data):
    if not os.path.exists('app.js'):
        return
    
    history = data.get('history', [])
    frame_history = data.get('frame_history', [])
    if not history:
        return

    latest_hist = history[-5:][::-1]
    latest_frame = frame_history[-5:][::-1]
    
    recent_5_hist_json = json.dumps(latest_hist, ensure_ascii=False, indent=8)
    recent_5_frame_json = json.dumps(latest_frame, ensure_ascii=False, indent=8)
    
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    new_default_data = f"""const DEFAULT_DATA = {{
    history: {recent_5_hist_json},
    frame_history: {recent_5_frame_json},
    dan_nhip_vang: [
        {{ "Thứ Hạng Hỏa Lực": "Top 01", "Con Số 2D": 39, "Điểm Nhịp Vàng Gaussian": "16.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" }},
        {{ "Thứ Hạng Hỏa Lực": "Top 02", "Con Số 2D": 43, "Điểm Nhịp Vàng Gaussian": "12.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" }},
        {{ "Thứ Hạng Hỏa Lực": "Top 03", "Con Số 2D": 57, "Điểm Nhịp Vàng Gaussian": "7.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" }},
        {{ "Thứ Hạng Hỏa Lực": "Top 04", "Con Số 2D": 25, "Điểm Nhịp Vàng Gaussian": "7.5 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" }},
        {{ "Thứ Hạng Hỏa Lực": "Top 05", "Con Số 2D": 89, "Điểm Nhịp Vàng Gaussian": "5.0 điểm", "Khuyến Nghị Vốn": "Ưu tiên hỏa lực chính" }}
    ]
}};"""

    content_updated = re.sub(
        r'// Embedded Default Data Fallback\s*const DEFAULT_DATA = \{.*?\};',
        f'// Embedded Default Data Fallback\n{new_default_data}',
        content,
        flags=re.DOTALL
    )

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content_updated)
        
    print("🎉 Đã tự động đồng bộ dữ liệu dự phòng DEFAULT_DATA vào app.js!")

def update_excel_and_json(result):
    if not result:
        return False

    # Load data.json
    if os.path.exists(DATA_JSON_PATH):
        with open(DATA_JSON_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = {'history': [], 'frame_history': []}

    history = data.get('history', [])
    
    # Check if date already exists
    last_record = history[-1] if history else None
    already_exists = last_record and result['gdb'] == last_record['full_db']

    if not already_exists:
        new_stt = (last_record['stt'] + 1) if (last_record and isinstance(last_record['stt'], int)) else len(history) + 1
        new_entry = {
            'stt': new_stt,
            'date': result['date'],
            'full_db': result['gdb'],
            'de': result['de'],
            'g7_1': result['g7_1'],
            'g7_2': result['g7_2'],
            'g7_3': result['g7_3'],
            'g7_4': result['g7_4']
        }
        
        history.append(new_entry)
        data['history'] = history
        print(f"🎉 Đã cập nhật STT {new_stt} ({result['date']}) vào data.json!")

    # Synchronize frame history hit/miss evaluation
    frame_updated = sync_frame_history(data)

    if not already_exists or frame_updated:
        with open(DATA_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    # Always ensure app.js fallback data is synced
    update_app_js_fallback(data)

    if already_exists and not frame_updated:
        print(f"ℹ️ Kết quả ngày [{result['date']}] ({result['gdb']}) đã tồn tại trong cơ sở dữ liệu. Hệ thống đã tối ưu đồng bộ 100%.")
        return False

    # Optionally update Excel file if openpyxl is installed
    try:
        if not already_exists:
            xl = pd.ExcelFile(EXCEL_PATH)
            df_hist = xl.parse('Du_Lieu_2026')
            if new_stt not in df_hist['STT'].values:
                new_row = {
                    'STT': new_stt,
                    'Ngày Quay': result['date'],
                    'Giải Đặc Biệt (5 số)': result['gdb'],
                    'Số Đề (2 số cuối)': result['de'],
                    'G7.1': result['g7_1'],
                    'G7.2': result['g7_2'],
                    'G7.3': result['g7_3'],
                    'G7.4': result['g7_4']
                }
                df_updated = pd.concat([df_hist, pd.DataFrame([new_row])], ignore_index=True)
                with pd.ExcelWriter(EXCEL_PATH, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
                    df_updated.to_excel(writer, sheet_name='Du_Lieu_2026', index=False)
                print("🎉 Đã lưu dòng mới vào Excel file!")
    except Exception as e:
        print(f"⚠️ Lưu ý: Không thể ghi đè trực tiếp file Excel ({e}), nhưng data.json đã được cập nhật hoàn hảo cho Web App.")

    return True

if __name__ == '__main__':
    print("=" * 65)
    print("   HỆ THỐNG CẬP NHẬT TỰ ĐỘNG KẾT QUẢ XSMB & TÁI TỐI ƯU 4 BƯỚC")
    print("=" * 65)
    
    res = fetch_latest_result()
    updated = update_excel_and_json(res)
    
    if updated:
        print("✅ Hoàn tất cập nhật dữ liệu ngày mới!")
    else:
        print("⚡ Dữ liệu hiện tại đã là mới nhất.")

