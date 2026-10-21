PROJECT JOJO WIKI — ZIP สำหรับแตกทับอัปโหลด GitHub

รีโป: https://github.com/Lowkinus/ProjectJoJo-Wiki

วิธีใช้
1. สำรอง Repo เดิมก่อน
2. ดาวน์โหลด ZIP นี้แล้วแตกไฟล์
3. เปิด Repo ของตัวเอง / ดาวน์โหลดหรือ Clone ที่มีอยู่แล้ว
4. คัดลอกไฟล์และโฟลเดอร์ assets, en, th, zh จาก ZIP ทับของเดิมโดยรักษาโครงสร้างเดิม
5. Commit / Upload ไฟล์ที่ถูกเพิ่มและแทนที่ขึ้น GitHub Pages
6. เปิด Wiki และ Refresh แบบ Ctrl+F5 (หาก CDN แคช JS เดิม)

ไฟล์สำหรับ Steam Workshop:
STEAM_WORKSHOP_CURRENT.txt (หรือ STEAM_WORKSHOP_PROJECT_JOJO_UPDATED.txt)
คัดลอกข้อความจากไฟล์นี้ไปใส่คำอธิบายของมอดหลักเท่านั้น ไม่ต้องคัดลอกไปยังมอดเสริม

ไม่มี Python/BAT/script build ใด ๆ ใน ZIP; ไฟล์ JS คือสคริปต์เว็บไซต์ที่ GitHub Pages ใช้งานปกติ
ไม่ต้องลงใหม่ทั้ง Repo; ZIP มีเฉพาะไฟล์ที่เพิ่ม/แก้เพื่อคัดลอกทับ

รายละเอียดงาน
- assets/hero-ranking.js: อัปเดตการ์ดหน้าแรก EN/TH, TUSK กลับเป็นพัฒนา, ป้ายขวาบน, การ์ด Cream/D4C, หมวด Hamon/Spin/Vampire และ current systems
- zh/index.html: ทำหน้า Chinese ให้แสดงการ์ดและหมวดใหม่โดยตรง
- en/th/zh/stands: หน้าข้อมูล KC 77%, MR, SC, EA3 และสถานะ TUSK
- en/th/zh/current-systems.html: หน้าอธิบาย Core .350 แบบทดสอบ, PvP, Knockback, Environment, และมอดเสริม
- assets/stands/spoilers และ assets/powers: ภาพใหม่จากไฟล์ที่ส่งมา

หมายเหตุ: .350 คือ TEST PATCH ยังไม่ได้ยืนยันว่าบั๊ก Knockback และวัตถุดรอปหายครบทุกกรณี
