
const D=window.PJ_DATA||{stands:[]};
const G=window.PJ_GUIDE||{th:[],en:[]};
function safeStorageGet(key){
 try{return window.localStorage ? localStorage.getItem(key) : null}catch(_){return null}
}
function safeStorageSet(key,value){
 try{if(window.localStorage)localStorage.setItem(key,value)}catch(_){}
}
let lang=safeStorageGet("pj-lang")||"";
if(lang!=="th"&&lang!=="en")lang="";
let currentGuideTitle="";
const T={
 th:{
  nav:["เริ่มเล่น","Stand","คู่มือ","อัปเดต"],
  hero:"หา Stand Arrow ปลุกพลัง แล้วเลือกวิธีเล่นของนายเอง — ประชิด, Time Stop, ระเบิด, Support, Crowd Control หรือ Time Erase",
  startBtn:"เริ่มเล่น",standsBtn:"เลือก Stand",
  startEyebrow:"มือใหม่เริ่มตรงนี้",startTitle:"เริ่มเล่นในไม่กี่ขั้น",startLead:"ตัดข้อมูลที่ไม่จำเป็นออก เหลือสิ่งที่คนเพิ่งลงมอดต้องรู้ก่อนเข้าไปต่อยซอมบี้",
  steps:[
   ["STAND ARROW","หา Stand Arrow","ดรอปจากโลก/ซอมบี้ได้ และ Arrow ปกติ 1 ดอกใช้สำเร็จได้ 3 ครั้ง"],
   ["CAPS LOCK","เรียก Stand","กด CAPS LOCK เพื่อเรียกหรือเก็บ Stand ของตัวเอง"],
   ["1 – 4","ใช้สกิล","ใช้เลขแถวบน 1–4 ไม่ใช่ Numpad หลายสกิลกดค้างเพื่อชาร์จเต็ม"],
   ["MOUSE","เล็งการโจมตี","Stand ตามทิศเมาส์ ระบบประชิดมีตัวช่วยเล็ง แต่ยังต้องหันให้ถูกทาง"]
  ],
  important:"จำง่าย ๆ: บางปุ่มมีทั้งกดปกติและกดค้าง เช่น KQ Skill 3 = First Bomb / Sheer Heart Attack และ SP/TW Skill 4 = Time Dash / Time Stop",
  standsEyebrow:"เลือกตามสไตล์การเล่น",standsTitle:"9 STANDS",standsLead:"กด “เปิดคู่มือเต็ม” เพื่อกระโดดไปยังคู่มือเดิมแบบละเอียด ไม่ได้ตัดเนื้อหาเหลือแค่สรุปสั้น ๆ แล้ว",
  searchStand:"ค้นหา Stand...",
  fullGuide:"เปิดคู่มือเต็ม",reference:"รูปอ้างอิง JoJo",
  guideEyebrow:"เนื้อหาจากไกด์ฉบับเต็ม",guideTitle:"คู่มือแบบละเอียด",guideLead:"รวมไกด์ยาวที่ทำไว้เดิมทั้งหมด แล้วอัปเดต Stand Arrow / SHA / PvP ให้ตรง v0.23.0.232",
  searchGuide:"ค้นหาหัวข้อ...",
  groups:{intro:"ภาพรวม",start:"เริ่มต้น",systems:"ระบบหลัก",stands:"คู่มือ Stand",more:"ทีม / เซิร์ฟ / อื่น ๆ"},
  articleTag:"PROJECT JOJO GUIDE",
  updatesTitle:"อัปเดตล่าสุด",
  noResult:"ไม่พบหัวข้อที่ค้นหา",
 },
 en:{
  nav:["Start","Stands","Guide","Updates"],
  hero:"Find a Stand Arrow, awaken a Stand and choose your playstyle — melee, Time Stop, bombs, support, crowd control or Time Erase.",
  startBtn:"Start here",standsBtn:"Choose a Stand",
  startEyebrow:"NEW PLAYER",startTitle:"START PLAYING",startLead:"Only the information a new player actually needs before jumping into the game.",
  steps:[
   ["STAND ARROW","Find an Arrow","World/zombie loot. A normal Arrow has 3 successful uses."],
   ["CAPS LOCK","Summon your Stand","CAPS LOCK summons or dismisses your current Stand."],
   ["1 – 4","Use skills","Use the top-row 1–4 keys. Many skills have a full-charge version."],
   ["MOUSE","Aim attacks","Stand attacks follow mouse direction. Close-range attacks have soft assistance, but you still need to aim."]
  ],
  important:"Remember: some buttons have tap and full-charge behavior. KQ Skill 3 = First Bomb / SHA; SP/TW Skill 4 = Time Dash / Time Stop.",
  standsEyebrow:"CHOOSE BY PLAYSTYLE",standsTitle:"9 STANDS",standsLead:"Use “Full guide” to open the original long-form guide for that Stand. The Wiki is no longer just a short summary.",
  searchStand:"Search Stand...",
  fullGuide:"Full guide",reference:"JoJo reference",
  guideEyebrow:"FULL LONG-FORM GUIDE",guideTitle:"DETAILED WIKI",guideLead:"The full original guide is preserved here and updated for v0.23.0.232 Stand Arrow / SHA / PvP behavior.",
  searchGuide:"Search guide...",
  groups:{intro:"Overview",start:"Getting Started",systems:"Core Systems",stands:"Stand Guides",more:"Team / Server / More"},
  articleTag:"PROJECT JOJO GUIDE",
  updatesTitle:"Latest Updates",
  noResult:"No matching guide section",
 }
};
const CH={
 th:[
  ["v0.23.0.232","SHA = 50% ของ KQ Detonate • ไม่มี idle HP drain • ทุก 2 ระเบิดเสีย 1 HP • PvP/Safety protected players ไม่ถูก SHA เลือกเป็นเป้า"],
  ["v0.23.0.231","ปรับ SHA movement / facing ให้ลื่นขึ้น ลดอาการนิ่งแล้ววาร์ป"],
  ["v0.23.0.230","แก้ resolveTarget ที่ทำให้สกิล 1–4 ไม่ทำงาน"],
  ["v0.23.0.229","Stand Arrow เปลี่ยนเป็น native Condition 3-use และแก้ client load blocker"]
 ],
 en:[
  ["v0.23.0.232","SHA = 50% of KQ Detonate • no idle HP drain • every 2 explosions costs 1 HP • PvP/Safety-protected players are not SHA targets"],
  ["v0.23.0.231","Smoother SHA movement / facing; reduced stop-and-warp behavior"],
  ["v0.23.0.230","Fixed resolveTarget regression that broke skills 1–4"],
  ["v0.23.0.229","Native 3-use Stand Arrow Condition + client load blocker fix"]
 ]
};
function ui(){return T[lang||"en"]}
function setLang(x){
 if(x!=="th"&&x!=="en")return;
 lang=x;
 safeStorageSet("pj-lang",x);
 const gate=document.querySelector("#gate");
 if(gate)gate.classList.add("hidden");
 currentGuideTitle="";
 render();
}
function render(){
 if(!lang)return;
 const t=ui();
 document.documentElement.lang=lang;
 ["Start","Stands","Guide","Updates"].forEach((x,i)=>document.querySelector("#nav"+x).textContent=t.nav[i]);
 document.querySelector("#heroText").textContent=t.hero;
 document.querySelector("#heroStart").textContent=t.startBtn;
 document.querySelector("#heroStands").textContent=t.standsBtn;
 document.querySelector("#startEyebrow").textContent=t.startEyebrow;
 document.querySelector("#startTitle").textContent=t.startTitle;
 document.querySelector("#startLead").textContent=t.startLead;
 document.querySelector("#standsEyebrow").textContent=t.standsEyebrow;
 document.querySelector("#standsTitle").textContent=t.standsTitle;
 document.querySelector("#standsLead").textContent=t.standsLead;
 document.querySelector("#standSearch").placeholder=t.searchStand;
 document.querySelector("#guideEyebrow").textContent=t.guideEyebrow;
 document.querySelector("#guideTitle").textContent=t.guideTitle;
 document.querySelector("#guideLead").textContent=t.guideLead;
 document.querySelector("#guideSearch").placeholder=t.searchGuide;
 document.querySelector("#updatesTitle").textContent=t.updatesTitle;
 document.querySelector("#langSwitch").textContent=lang==="th"?"EN":"TH";
 renderStart();renderStands();renderToc();renderChanges();renderCredits();
 if(!currentGuideTitle){
   const preferred=(G[lang]||[]).find(s=>s.group==="start")||(G[lang]||[])[0];
   if(preferred) showGuide(preferred.title,false);
 }else{
   const found=(G[lang]||[]).find(s=>s.title===currentGuideTitle);
   if(!found){const preferred=(G[lang]||[]).find(s=>s.group==="start")||(G[lang]||[])[0];if(preferred)showGuide(preferred.title,false)}
   else showGuide(found.title,false);
 }
}
function renderStart(){
 const t=ui(),g=document.querySelector("#startGrid");g.innerHTML="";
 t.steps.forEach(([key,title,body])=>{
  const e=document.createElement("article");e.className="start-card";
  e.innerHTML=`<span class="key">${key}</span><h3>${title}</h3><p>${body}</p>`;g.appendChild(e);
 });
 document.querySelector("#importantRow").textContent=t.important;
}
function renderStands(){
 const t=ui(),g=document.querySelector("#standGrid");g.innerHTML="";
 D.stands.forEach(s=>{
  const e=document.createElement("article");e.className="stand-card";
  const summary=lang==="th"?s.th:s.en;
  e.dataset.search=(s.name+" "+s.role+" "+summary).toLowerCase();
  e.innerHTML=`<div class="stand-art"><img src="${s.image}" alt="${s.name} Project JoJo model render"></div>
   <div class="stand-body"><div class="stand-role">${s.role}</div><h3>${s.name}</h3><p>${summary}</p>
   <div class="stand-actions"><button class="mini-btn primary guide-open">${t.fullGuide}</button>
   <a class="mini-btn" href="${s.ref}" target="_blank" rel="noopener">${t.reference}</a></div></div>`;
  e.querySelector(".guide-open").onclick=()=>openStandGuide(s);
  g.appendChild(e);
 });
}
function openStandGuide(s){
 const title=lang==="th"?s.guideTh:s.guideEn;
 showGuide(title,true);
 document.querySelector("#guide").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderToc(filter=""){
 const t=ui(),root=document.querySelector("#guideToc");root.innerHTML="";
 const q=filter.trim().toLowerCase();
 let last="";
 let found=0;
 (G[lang]||[]).forEach(sec=>{
   if(q && !(sec.title.toLowerCase().includes(q) || sec.html.toLowerCase().includes(q)))return;
   found++;
   if(sec.group!==last){
     last=sec.group;
     const label=document.createElement("div");label.className="toc-group";label.textContent=t.groups[last]||last;root.appendChild(label);
   }
   const b=document.createElement("button");b.className="toc-btn"+(sec.title===currentGuideTitle?" active":"");
   b.textContent=sec.title;b.onclick=()=>showGuide(sec.title,true);root.appendChild(b);
 });
 if(!found){const e=document.createElement("div");e.className="guide-empty";e.textContent=t.noResult;root.appendChild(e)}
}
function showGuide(title,focus){
 const sec=(G[lang]||[]).find(s=>s.title===title);if(!sec)return;
 currentGuideTitle=title;
 const a=document.querySelector("#guideArticle");
 a.innerHTML=`<div class="article-tag">${ui().articleTag}</div><h1>${sec.title}</h1>${sec.html}`;
 document.querySelectorAll(".toc-btn").forEach(b=>b.classList.toggle("active",b.textContent===title));
 if(focus)a.focus?.();
}
function renderChanges(){
 const g=document.querySelector("#changeList");g.innerHTML="";
 CH[lang].forEach(([v,p])=>{const e=document.createElement("div");e.className="change";e.innerHTML=`<b>${v}</b><p>${p}</p>`;g.appendChild(e)});
}
function renderCredits(){
 document.querySelector("#creditsBody").innerHTML=lang==="th"
 ?`<p><strong>ภาพ Stand บนเว็บ:</strong> เรนเดอร์จากโมเดล 3D ที่อยู่ใน Project JoJo v0.23.0.232 โดยตรง จึงไม่ต้องพึ่ง hotlink และไม่เกิดปัญหารูปหายแบบเว็บก่อน</p><p><strong>3D Model Credits:</strong> <a href="https://sketchfab.com/SomeoneSae" target="_blank" rel="noopener">SomeoneSae</a> • <a href="https://sketchfab.com/20062020year" target="_blank" rel="noopener">20062020year</a> • <a href="https://sketchfab.com/NeiL" target="_blank" rel="noopener">NeiL</a> • ผู้สร้างต้นฉบับที่เกี่ยวข้อง โมเดลถูกปรับ rig/bone, optimize และทำ animation สำหรับ Project Zomboid</p><p>ลิงก์ “รูปอ้างอิง JoJo” เปิด JoJo Wiki แยกหน้าแทนการฝังรูปจากเว็บอื่น เพื่อไม่ให้รูปโดนบล็อกอีก</p>`
 :`<p><strong>Stand images on this site:</strong> rendered directly from the 3D models packaged in Project JoJo v0.23.0.232, so the Wiki no longer depends on fragile image hotlinks.</p><p><strong>3D Model Credits:</strong> <a href="https://sketchfab.com/SomeoneSae" target="_blank" rel="noopener">SomeoneSae</a> • <a href="https://sketchfab.com/20062020year" target="_blank" rel="noopener">20062020year</a> • <a href="https://sketchfab.com/NeiL" target="_blank" rel="noopener">NeiL</a> • respective original creators. Models were adapted for Project Zomboid with rig/bone adjustments, optimization and custom animations.</p><p>The “JoJo reference” buttons open JoJo Wiki separately instead of embedding third-party images that may block hotlinking.</p>`;
}
document.addEventListener("DOMContentLoaded",()=>{
 const th=document.querySelector("#thChoice");
 const en=document.querySelector("#enChoice");
 const sw=document.querySelector("#langSwitch");
 const standSearch=document.querySelector("#standSearch");
 const guideSearch=document.querySelector("#guideSearch");
 if(th)th.addEventListener("click",()=>setLang("th"));
 if(en)en.addEventListener("click",()=>setLang("en"));
 if(sw)sw.addEventListener("click",()=>setLang(lang==="th"?"en":"th"));
 if(standSearch)standSearch.addEventListener("input",e=>{
   const q=e.target.value.trim().toLowerCase();
   document.querySelectorAll(".stand-card").forEach(c=>c.classList.toggle("hidden-card",q&&!c.dataset.search.includes(q)));
 });
 if(guideSearch)guideSearch.addEventListener("input",e=>renderToc(e.target.value));
 if(lang){
   const gate=document.querySelector("#gate");
   if(gate)gate.classList.add("hidden");
   render();
 }
});
