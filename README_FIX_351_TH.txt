PROJECT JOJO WIKI — VISUAL CONSISTENCY HOTFIX v351

วัตถุประสงค์: แก้ความไม่สอดคล้องของ Wiki ZIP v350 ก่อนเผยแพร่

- เก็บ CSS/การ์ด/โครงสร้างเว็บเดิมไว้ (ไม่ได้ย้ายหรือเขียนทับ assets/v237.css)
- ปรับการโหลดการ์ด Home ให้แยกจับ Error เพื่อไม่ให้จุดเดียวทำการ์ดส่วนที่เหลือหาย
- รูป Hamon / Spin / Vampire จะแสดงเต็มภาพ (contain) แทนการ Crop ด้วย cover
- หน้าจีนคืนหัวข้อประวัติ Changelog ก่อนหน้าที่ v350 เคยลบทิ้ง
- หน้าจีนใช้รูปแบบกล่องระบบเดียวกับ CSS หลักแทนคลาสเฉพาะ
- คง TUSK / CREAM / D4C และ 3 พลังใหม่เป็น IN DEVELOPMENT

คำเตือน: นี่คือ PATCH สำหรับรีโปเดิม ไม่ใช่เว็บไซต์แบบ Standalone
กรุณาแตกไฟล์นี้ทับรีโปเดิม โดยรักษาไฟล์อื่นเดิมทั้งหมด เช่น assets/v237.css, Stand images, index.html
ไฟล์ใน ZIP นี้ไม่มีโฟลเดอร์รีโปครบบริบูรณ์ การเปิด zh/index.html ภายใน ZIP โดยไม่แตกทับรีโปเดิมจะทำให้ CSS/รูปภาพจำนวนมากหาย

สำคัญ: en/index.html และ th/index.html ในรีโปเดิมเรียก hero-ranking.js?v=444
ไฟล์ JavaScript อาจยังถูกแคชใน GitHub Pages / เบราว์เซอร์ หลังอัปโหลดให้ Refresh Ctrl+F5 หรือ Incognito
หาก GitHub Pages ยังเห็นการ์ดเก่าให้เปลี่ยน query parameter ของ <script src="../assets/hero-ranking.js?v=444"> เป็น ?v=351 ในไฟล์ en/index.html / th/index.html
เพื่อบังคับโหลดเวอร์ชันใหม่ (ไฟล์ HTML สองไฟล์นี้ไม่ได้แก้ใน ZIP เพื่อป้องกันการเขียนทับหน้าแรกเดิม)

ไม่ได้แก้มอด, ไม่ได้แก้ GitHub โดยตรง และยังไม่ได้ทดสอบบน GitHub Pages จริง
