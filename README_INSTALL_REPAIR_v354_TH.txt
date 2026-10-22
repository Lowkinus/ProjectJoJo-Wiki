PROJECT JOJO WIKI — RECOVERY / CLEANUP v354

สาเหตุหลัก: index.html ระดับรากถูกแทนที่ด้วยหน้า Chinese ที่เขียน ../assets ทำให้ CSS และรูปเสีย + ลิงก์ไประดับรากที่เป็นสำเนาเก่า

วิธีติดตั้ง (ไม่ต้องใช้ Python/Script):
1. สำรอง repository ProjectJoJo-Wiki ปัจจุบันก่อน
2. แตก ZIP นี้เข้าโฟลเดอร์รากของ repository เดิม (ต้องเห็น index.html, assets/, en/, th/, zh/ อยู่แล้ว) และเลือกแทนที่ไฟล์ซ้ำ
3. Commit/Upload ไฟล์ที่เปลี่ยนขึ้น GitHub, โดยเฉพาะ index.html และ root redirects, assets/hero-ranking.js, assets/pj-restore-v354.css, zh/index.html
4. ตรวจ https://lowkinus.github.io/ProjectJoJo-Wiki/ ว่าเห็น 3 ปุ่มเลือกภาษา และทดสอบหน้า th/index.html, en/index.html, zh/index.html
5. GitHub Pages / Browser cache อาจใช้เวลาให้หน้าใหม่แพร่กระจาย ลอง Private/Incognito และ Ctrl+F5

ข้อมูลที่ต้องรู้:
- ไฟล์นี้เป็น PATCH แตกทับ ไม่ใช่ full repository อย่าลบ assets/ รูปเก่า, assets/style.css, assets/v237.css
- Root pages เช่น guide.html / king-crimson.html เป็นสำเนาเก่าและใช้พาธ CSS ที่ไม่ถูกต้อง; ในแพตช์นี้แทนด้วย redirect ไป en/ หรือ en/stands/
- ไม่ได้ลบไฟล์ใดจาก GitHub อัตโนมัติ และไม่ต้องรัน CLEAN*.bat
- ถ้าจะทำความสะอาดจริง ให้สร้างสำเนา repo ใหม่และตรวจรายการไฟล์ที่ไม่มีการอ้างอิงก่อนลบ (ดู CLEANUP_REVIEW.txt)
- สคริปต์ hero-ranking.js มี mobile styling ของเวอร์ชันเก่าถูกถอนออกแล้ว เพื่อกลับไปยึด CSS รูปแบบคลาสสิกของเว็บไซต์
- หน้าจอไทย/อังกฤษเดิมยังอ้างสคริปต์ ?v=444 อยู่ การแก้ไฟล์ที่ชื่อเดิมอาจติดแคชชั่วคราว จึงควรแก้ th/index.html และ en/index.html ให้ใช้ ?v=354 ด้วยเมื่อพร้อม (ดู CLEANUP_REVIEW.txt)

ตรวจ: HTML / โครงสร้างไฟล์ / JS Syntax / ลิงก์สัมพันธ์แบบออฟไลน์ และทดสอบ Local Chromium ตามขอบเขตไฟล์ที่มี
