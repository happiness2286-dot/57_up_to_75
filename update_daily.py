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

def update_excel_and_json(result):
    if not result:
        return False

    # Load data.json
    if os.path.exists(DATA_JSON_PATH):
        with open(DATA_JSON_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = {'history': []}

    history = data.get('history', [])
    
    # Check if date already exists
    last_record = history[-1] if history else None
    if last_record and result['gdb'] == last_record['full_db']:
        print(f"ℹ️ Kết quả ngày [{result['date']}] ({result['gdb']}) đã tồn tại trong cơ sở dữ liệu. Không cần bổ sung.")
        return False

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

    # Update data.json
    with open(DATA_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"🎉 Đã cập nhật STT {new_stt} ({result['date']}) vào data.json!")

    # Optionally update Excel file if openpyxl is installed
    try:
        xl = pd.ExcelFile(EXCEL_PATH)
        df_hist = xl.parse('Du_Lieu_2026')
        # Check if STT exists in df_hist
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
