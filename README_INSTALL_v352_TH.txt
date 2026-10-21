PROJECT JOJO WIKI — v352 MOBILE & POWER CARD FIX

นี่เป็น ZIP สำหรับแตกทับ ProjectJoJo-Wiki REPOSITORY เดิมบน GitHub
ไม่ใช่เว็บไซต์แบบ standalone — อย่าลบไฟล์เดิมทั้งหมด

แก้ไข:
- หน้าไทย/อังกฤษ: HAMON / SPIN / VAMPIRE แสดงชื่อและคำอธิบายเฉพาะแบบการ์ด Stand กำลังพัฒนา ผ่าน assets/hero-ranking.js
- หน้าจีน: การ์ดพลังทั้งสามและคำอธิบายด้วยรูปแบบเดียวกันแบบ HTML จริง
- CSS Responsive: ย้ายชื่อ/คำอธิบายมาทับด้านล่างภาพอย่างชัดเจนในมือถือ รวมถึงป้ายกำลังพัฒนา
- ข้อมูลอื่นจาก .351 คงเดิม (TUSK/Cream/D4C, คู่มือ, Steam Workshop ฯลฯ)

ติดตั้ง: แตก ZIP นี้ทับไฟล์ใน REPO เดิมแบบ Merge/Replace แล้วอัปโหลดไฟล์ที่เปลี่ยนขึ้น GitHub
สำคัญ: th/index.html และ en/index.html ของรีโปเดิมเรียก hero-ranking.js?v=444
ไฟล์นี้เปลี่ยน hero-ranking.js แต่ยังไม่แก้ HTML สองหน้านั้น จึงอาจเจอ cache เก่า
ถ้ายังเห็นของเดิมบนมือถือ แนะนำให้เปลี่ยน ?v=444 เป็น ?v=352 บน HTML หรือทดสอบผ่าน Incognito/Private Tab.
GitHub Pages อาจใช้เวลาเผยแพร่หลัง Commit และ Browser อาจเก็บ cache แต่การ์ดที่หายเพราะโค้ดไม่ใช่เรื่องที่ต้องรอให้หายเอง

ไม่มีไฟล์ .py ใน ZIP และไม่ได้แก้รีโพซิทอรีบน GitHub โดยตรง
