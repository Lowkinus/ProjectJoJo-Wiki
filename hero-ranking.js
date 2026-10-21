/* Project JoJo Wiki | Core v.350 documentation update | upload-ready vanilla JS */
(() => {
  'use strict';
  const ranks = {
    'star-platinum':['STAR PLATINUM','star-platinum.webp'],
    'the-world':['THE WORLD','the-world-v440.webp'],
    'king-crimson':['KING CRIMSON','king-crimson.webp'],
    'crazy-diamond':['CRAZY DIAMOND','crazy-diamond.webp'],
    'the-hand':['THE HAND','the-hand-v440.webp'],
    'killer-queen':['KILLER QUEEN','killer-queen.webp'],
    'silver-chariot':['SILVER CHARIOT','silver-chariot.webp'],
    'magicians-red':["MAGICIAN'S RED",'magicians-red.webp'],
    'echoes-act-3':['ECHOES ACT 3','echoes-act-3.webp'],
    'atum':['ATUM','atum.png']
  };
  const th = (document.documentElement.lang || '').toLowerCase().startsWith('th');
  const L = (thai,eng) => th ? thai : eng;
  const devLabel = L('กำลังพัฒนา','IN DEVELOPMENT');
  function style() {
    if (document.getElementById('pj-current-visual-css')) return;
    const n=document.createElement('style'); n.id='pj-current-visual-css';
    n.textContent=`
      #stands .future-card{position:relative;min-width:0}
      #stands .future-card .future-badge{position:absolute!important;left:auto!important;right:13px!important;top:13px!important;z-index:8!important;
        max-width:calc(100% - 25px);font-size:10px;line-height:1.1;text-align:center;font-weight:900;letter-spacing:.3px;
        border:1px solid #c68bdc;border-radius:999px;padding:7px 10px;background:rgba(20,10,30,.92);color:#f8d7ff;
        box-shadow:0 4px 16px #0009;pointer-events:none}
      #stands .future-card .card-img{background:radial-gradient(circle at center,#211326 0%,#0b0710 76%)}
      #stands .future-card .card-img img{object-fit:contain;max-width:100%;max-height:100%;filter:saturate(.9)}
      #stands .future-card .card-body{padding-top:17px}
      #stands .future-card .role{color:#dfb5ec}
      .pj-power-banner{padding:23px 25px;border:1px solid #694479;background:linear-gradient(115deg,#24122e,#130b1a);border-radius:16px;margin-bottom:18px}
      .pj-power-banner p{margin:7px 0 0;color:#d2c1dc;line-height:1.75}
      .pj-current-note{border-left:4px solid #ffd64a;padding:12px 16px;margin:20px 0;color:#e9d9ea;background:#21122b;line-height:1.7}
      .pj-feature-list{margin:10px 0 0;padding-left:22px;color:#dac6df;line-height:1.75}
      #powers .card-img{background:#0b0710}
      #powers .card-img img{object-fit:cover;height:100%;width:100%}
      @media(max-width:590px){#stands .future-card .future-badge{right:8px!important;top:8px!important;font-size:9px;padding:6px 8px}}
    `;
    document.head.appendChild(n);
  }
  function applyRanking() {
    const r=Array.isArray(window.PJ_STAND_RANKING)?window.PJ_STAND_RANKING:[];
    [1,2].forEach(rank=>{
      const id=ranks[r[rank-1]]?r[rank-1]:(rank===1?'star-platinum':'king-crimson');
      const img=document.getElementById(`heroRank${rank}Image`);
      const link=document.getElementById(`heroRank${rank}Link`);
      if(img){img.src=`../assets/stands/${ranks[id][1]}`;img.alt=ranks[id][0];}
      if(link)link.href=`stands/${id}.html`;
    });
  }
  function addMasteryNav() {
    const nav=document.querySelector('.topnav');
    if(!nav)return;
    if(!nav.querySelector('[data-pj-mastery]')){
      const a=document.createElement('a');a.dataset.pjMastery='1';a.href='mastery.html';a.textContent='Mastery';nav.appendChild(a);
    }
    if(!nav.querySelector('[data-pj-powers]')){
      const a=document.createElement('a');a.dataset.pjPowers='1';a.href='index.html#powers';a.textContent=L('พลังอื่น','Other Powers');nav.appendChild(a);
    }
  }
  function makeFuture(name, file, role, description, opts={}) {
    const article=document.createElement('article');
    article.className='card future-card';article.dataset.pjCurrentDev='1';
    article.innerHTML=`<div class="future-badge">${devLabel}</div><div class="card-img"><img src="../assets/stands/${file}" alt="${name}" loading="lazy"></div>
      <div class="card-body"><div class="role">${role || L('ยังไม่เปิดให้เล่น','NOT PLAYABLE YET')}</div><h3>${name}</h3><p>${description || L('อยู่ระหว่างพัฒนา สกิลและรายละเอียดอาจเปลี่ยนก่อนเปิดตัวจริง','In development. Skills and details may change before release.')}</p>
      ${opts.href?`<a class="more" href="${opts.href}">${L('ดูหน้าตัวอย่างการพัฒนา →','Development preview →')}</a>`:''}</div>`;
    return article;
  }
  function futureCards() {
    const grid=document.querySelector('#stands > .grid');if(!grid)return;
    // Future cards are dynamically authored here; leave the released Core/Addons untouched.
    grid.querySelectorAll('[data-pj-spoiler-stand], [data-pj-tusk-playable], [data-pj-current-dev]').forEach(e=>e.remove());
    for(const card of Array.from(grid.querySelectorAll('article.card'))){
      if((card.querySelector('h3')?.textContent||'').trim().toUpperCase()==='TUSK') card.remove();
    }
    // TUSK returns to development; never label it as a released ADDON.
    grid.appendChild(makeFuture('TUSK','tusk-act4.png',L('ACT 1–4 • กลับไปพัฒนา','ACT 1–4 • IN DEVELOPMENT'),
      L('กำลังปรับปรุงระบบ ACT, โมเดล และแอนิเมชัน ไม่ถือเป็นแอดออนที่พร้อมเล่นใน Wiki ฉบับนี้','ACT progression, models and animation are being refined; this is not shown as a currently playable addon.'),{href:'stands/tusk.html'}));
    [
      ['THE SUN','spoilers/the-sun.jpg'],
      ['SEX PISTOLS','spoilers/sex-pistols.jpg'],
      ['PEARL JAM','spoilers/pearl-jam.webp'],
      ['PURPLE HAZE','spoilers/purple-haze.png'],
      ['CREAM','spoilers/cream.webp'],
      ['D4C','spoilers/d4c.jpg']
    ].forEach(([name,file])=>grid.appendChild(makeFuture(name,file)));
    const lead=document.querySelector('#stands .section-lead');
    if(lead)lead.innerHTML=L(
      'เรียงต่อกัน: <b>9 Stand หลัก</b>, <b>Official Addons ที่เปิดใช้ได้</b> และการ์ด <b>กำลังพัฒนา</b> รวม TUSK / CREAM / D4C (ยังเล่นไม่ได้)',
      'Browse <b>9 Core Stands</b>, <b>available Official Addons</b> and <b>in-development</b> cards including TUSK / CREAM / D4C (not playable yet).');
  }
  function powers() {
    const stands=document.getElementById('stands'); if(!stands || !stands.parentNode || document.getElementById('powers'))return;
    const section=document.createElement('section');section.className='section';section.id='powers';
    section.innerHTML=`<div class="eyebrow">${L('พลังใน JoJo ที่ไม่ใช่ Stand','JOJO ABILITIES BEYOND STANDS')}</div>
      <h2>${L('พลังอื่นใน JOJO','OTHER JOJO POWERS')}</h2>
      <div class="pj-power-banner"><strong>${L('แยกจาก Stand โดยเฉพาะ','A separate category from Stands')}</strong>
      <p>${L('Hamon, Spin และ Vampire ไม่ใช่ Stand ทั้งสามระบบอยู่ระหว่างพัฒนา ยังไม่มีสกิลหรือวิธีปลดล็อกที่ยืนยันสำหรับเวอร์ชันเล่นจริง',
      'Hamon, Spin and Vampire are not Stands. These three systems are in development; no final skills or unlock requirements are promised for a playable release.')}</p></div>
      <div class="grid">
      ${[['HAMON','hamon.jpg',L('พลังคลื่นมนตรา','Ripple energy')],['SPIN','spin.webp',L('วิชาการหมุน','Rotation technique')],['VAMPIRE','vampire.jpg',L('พลังแวมไพร์','Vampiric abilities')]].map(([name,img,role])=>
      `<article class="card future-card"><div class="future-badge">${devLabel}</div><div class="card-img"><img alt="${name}" src="../assets/powers/${img}" loading="lazy"></div><div class="card-body"><div class="role">${role}</div><h3>${name}</h3><p>${L('กำลังพัฒนา ไม่ใช่ Stand และยังไม่เปิดให้เล่น','In development, not a Stand, and not playable yet.')}</p></div></article>`).join('')}
      </div>`;
    stands.insertAdjacentElement('afterend',section);
  }
  function refreshStandCards() {
    const grid=document.querySelector('#stands > .grid');if(!grid)return;
    const cards=Array.from(grid.querySelectorAll('article.card'));
    const update=(name,role,desc)=>{const c=cards.find(x=>(x.querySelector('h3')?.textContent||'').trim().toUpperCase()===name);
      if(!c)return;const r=c.querySelector('.role'),p=c.querySelector('.card-body p');if(r)r.textContent=role;if(p)p.textContent=desc;};
    update('KING CRIMSON',L('สวนกลับ / คริด้านหลัง 77% / Time Erase','Counter / 77% rear critical / Time Erase'),
      L('คริ 77% เมื่อโจมตีเป้าหมายที่หันหลังให้ (ตรวจรายเป้าหมาย) HUD แสดงตามมุมโจมตี และ Epitaph ช่วยสวนจังหวะอันตราย',
      '77% crit chance against a back-facing target (checked per victim). HUD changes with the angle; Epitaph counters committed attacks.'));
    update("MAGICIAN'S RED",L('CROSS FIRE/FIRE TRAP / เกจไฟ','CROSS FIRE/FIRE TRAP / Fire Gauge'),
      L('ยิง Cross Fire เพื่อเติม Fire Gauge, กดค้างช่องเดียวกันวาง Fire Trap และใช้ Fire Control/Detector จัดการพื้นที่',
      'Cross Fire builds Fire Gauge; hold the same skill for Fire Trap. Fire Control/Detector helps manage the battlefield.'));
    update('SILVER CHARIOT',L('นักดาบความเร็ว / ถอดเกราะ','Speed sword / Armor Off'),
      L('สะสม Speed จากการเคลื่อนไหว ใช้ Armor Off เพื่อเร่งเกม และยังเรียก/เก็บ Stand ได้ขณะ Armor Off คูลดาวน์',
      'Movement refills Speed. Armor Off increases combat tempo without preventing normal summon/dismiss while its cooldown is running.'));
    update('ECHOES ACT 3',L('รัวหมัด / THREE FREEZE 9 วิ','Barrage / THREE FREEZE 9 seconds'),
      L('รัวหมัดเลือกเป้าเพื่อใช้ THREE FREEZE ชะงักศัตรูสำคัญ 9 วินาที โมเดลและแอนิเมชันอยู่ระหว่างปรับปรุง',
      'Barrage sets up your target; THREE FREEZE locks a threat for 9 seconds. Model and animation work remains under test.'));
  }
  function latestPanel() {
    if(document.querySelector('[data-pj-current-release]'))return;
    const updates=document.getElementById('updates');if(!updates||!updates.parentNode)return;
    const sec=document.createElement('section');sec.className='section';sec.id='current-version';sec.dataset.pjCurrentRelease='1';
    sec.innerHTML=`<div class="eyebrow">${L('สถานะคู่มือ','CURRENT WIKI REFERENCE')}</div><h2>${L('ระบบและแพตช์ล่าสุด','CURRENT SYSTEMS & PATCHES')}</h2>
      <div class="pj-current-note">${L('หมายเหตุ: Core .350 เป็นชุดทดสอบ การแก้ Knockback / ดรอปวัสดุยังต้องยืนยันผลในเกมจริงก่อนประกาศว่าเสร็จสมบูรณ์',
      'Note: Core .350 is a test patch. Knockback and environment-drop fixes still require live game verification before being considered fully resolved.')}</div>
      <div class="systems"><article class="system"><strong>CORE v0.23.0.350 — TEST</strong><p>${L(
      'เชื่อมระบบดาเมจและแรงกระแทกมอดเสริม แก้เส้นทางการตีสิ่งก่อสร้างผ่าน Vanilla เพิ่มการตรวจเมื่อโจมตีด้านหลัง และปรับโหมดคลิกเมาส์/HUD',
      'Addon combat/reaction parity, vanilla environment-hit/drop paths, rear-hit direction handling and HUD/mouse compatibility work.')}</p><p><a class="more" href="current-systems.html">${L('อ่านรายละเอียดระบบล่าสุด →','Read the latest system details →')}</a></p></article>
      <article class="system"><strong>STAND LEVELS</strong><p>LV.1 = <b>50%</b> ${L('ดาเมจ','damage')} • LV.100 = <b>120%</b> • ≈ <b>1,059</b> Stand kills.</p><p><a class="more" href="mastery.html">LV100 ${L('ตารางคูลดาวน์','cooldown table')} →</a></p></article>
      <article class="system"><strong>OFFICIAL ADDONS</strong><p>ATUM <b>.071</b> • HARVEST <b>.28</b> • HEAVEN'S DOOR <b>.23</b></p><p>TUSK — <b>${devLabel}</b></p></article></div>`;
    updates.parentNode.insertBefore(sec,updates);
  }
  function latestChangelog() {
    const box=document.querySelector('.changelog');if(!box||box.querySelector('[data-pj-latest]'))return;
    const entries=[
      ['CORE v0.23.0.350 — TEST', L('ปรับเส้นทางตีประตู/ต้นไม้/สิ่งก่อสร้างผ่านระบบ Vanilla เพื่อรักษาการดรอป • ปรับการร่วมทำงานของ ATUM, Harvest และ Heaven’s Door • รอทดสอบในเกม',
      'Environment-hit/drop path improvements using Vanilla behavior • Core integration for ATUM, Harvest and Heaven’s Door • live validation pending.')],
      ['CORE v0.23.0.348–.349 — TEST',L('Echoes ACT 3 โมเดลและรัวหมัดชุดใหม่ • ปรับ HUD/เมาส์ • เพิ่มคริ 77% ของ King Crimson เมื่อโจมตีเป้าที่หันหลัง • ปรับ Knockback',
      'Echoes ACT 3 animation rebuilding • HUD/mouse updates • King Crimson 77% critical chance on back-facing targets • knockback work.')]
    ];
    entries.slice().reverse().forEach(([title,desc])=>{
      const d=document.createElement('details');d.className='change';d.dataset.pjLatest='1';
      d.innerHTML=`<summary><b>${title}</b></summary><p>${desc}</p>`;box.insertBefore(d,box.firstChild);
    });
  }
  function apply(){style();applyRanking();addMasteryNav();futureCards();powers();refreshStandCards();latestPanel();latestChangelog();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
