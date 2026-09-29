PROJECT JOJO WIKI — VIEW COUNTER FIXED v4
===========================================

แก้จากปัญหา:
- LIVE VISITORS เก่ายังค้างอยู่
- view counter v3 ไม่ขึ้น
- browser cache style.css?v=4.0

เวอร์ชันนี้:
- ลบ LIVE VISITORS ออกจาก CSS หมด
- ไม่ใช้ CSS pseudo-element สำหรับตัวนับ
- ใส่ตัวนับเป็น HTML จริง
- แสดงแค่: view (จำนวน)
- หน้า EN/TH อยู่ข้างปุ่มภาษา
- หน้าเลือกภาษาอยู่ใต้ตัวเลือกภาษา
- เปลี่ยน CSS cache key เป็น style.css?v=4.1

ไฟล์ที่ต้องอัปโหลดทับ:
1. assets/style.css
2. index.html
3. en/index.html
4. th/index.html

หลัง Commit:
- เปิดเว็บแล้วกด Ctrl+F5 หนึ่งครั้ง
- ถ้าใช้มือถือ ปิดแท็บเว็บแล้วเปิดใหม่ หรือเคลียร์ cache ของเว็บไซต์

หมายเหตุ:
หน้าคู่มือ/หน้า Stand ยังใช้ style.css เดิม path เดียวกัน ดังนั้น LIVE VISITORS จะหายเมื่อ browser รับ CSS ใหม่
