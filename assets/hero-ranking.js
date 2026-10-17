(() => {
  const stands = {
    "star-platinum": ["STAR PLATINUM", "star-platinum.webp"],
    "the-world": ["THE WORLD", "the-world-v440.webp"],
    "king-crimson": ["KING CRIMSON", "king-crimson.webp"],
    "crazy-diamond": ["CRAZY DIAMOND", "crazy-diamond.webp"],
    "the-hand": ["THE HAND", "the-hand-v440.webp"],
    "killer-queen": ["KILLER QUEEN", "killer-queen.webp"],
    "silver-chariot": ["SILVER CHARIOT", "silver-chariot.webp"],
    "magicians-red": ["MAGICIAN'S RED", "magicians-red.webp"],
    "echoes-act-3": ["ECHOES ACT 3", "echoes-act-3.webp"],
    "atum": ["ATUM", "atum.png"],
    "tusk": ["TUSK", "tusk-act4.png"]
  };

  const isThai = () => (document.documentElement.lang || "").toLowerCase().startsWith("th");

  function applyRanking() {
    const r = Array.isArray(window.PJ_STAND_RANKING) ? window.PJ_STAND_RANKING : [];
    const top1 = stands[r[0]] ? r[0] : "star-platinum";
    const top2 = stands[r[1]] ? r[1] : "king-crimson";
    const set = (rank, id) => {
      const img = document.getElementById(`heroRank${rank}Image`);
      const link = document.getElementById(`heroRank${rank}Link`);
      if (!img || !link) return;
      img.src = `../assets/stands/${stands[id][1]}`;
      img.alt = stands[id][0];
      link.href = `stands/${id}.html`;
    };
    set(1, top1);
    set(2, top2);
  }

  function addMasteryNav() {
    const nav = document.querySelector('.topnav');
    if (!nav || nav.querySelector('[data-pj-mastery]')) return;
    const a = document.createElement('a');
    a.dataset.pjMastery = '1';
    a.href = 'mastery.html';
    a.textContent = 'Mastery';
    nav.appendChild(a);
  }

  // Keep current-version info useful but out of the opening area.
  // It is inserted immediately before CHANGELOG, after the Stand list/settings/combat systems.
  function addLatestPanel() {
    if (document.querySelector('[data-pj-current-release]')) return;
    const updates = document.getElementById('updates');
    if (!updates || !updates.parentNode) return;

    const sec = document.createElement('section');
    sec.className = 'section';
    sec.id = 'current-version';
    sec.dataset.pjCurrentRelease = '1';
    const th = isThai();

    sec.innerHTML = `
      <div class="eyebrow">${th ? 'เวอร์ชันที่ Wiki ใช้อ้างอิงปัจจุบัน' : 'CURRENT WIKI REFERENCE'}</div>
      <h2>${th ? 'เวอร์ชันปัจจุบัน' : 'CURRENT RELEASE'}</h2>
      <div class="systems">
        <article class="system">
          <strong>CORE v0.23.0.322</strong>
          <p>${th
            ? 'HUD ของสกิลที่มีท่าคู่ใช้ชื่อแบบสั้น <b>สกิล/สกิล</b> และ Silver Chariot สามารถ Summon/Dismiss ได้ตามปกติแม้ Armor Off กำลังคูลดาวน์ — คูลดาวน์ล็อกเฉพาะการเปิด Armor Off ซ้ำ'
            : 'Dual-action skills use compact <b>SKILL/SKILL</b> HUD names, and Silver Chariot can Summon/Dismiss normally while Armor Off is cooling down — that cooldown only blocks reactivating Armor Off.'}</p>
        </article>
        <article class="system">
          <strong>${th ? 'STAND MASTERY' : 'STAND MASTERY'}</strong>
          <p>LV.1 = <b>50%</b> damage • LV.100 = <b>120%</b> • ≈ <b>1,059 Stand kills</b> to mastery.</p>
          <p><a class="more" href="mastery.html">${th ? 'ดูตารางคูลดาวน์ LV100 →' : 'Open LV100 cooldown table →'}</a></p>
        </article>
        <article class="system">
          <strong>OFFICIAL ADDONS</strong>
          <p>Tusk <b>.248</b> • Harvest <b>.4.26</b> • Heaven's Door <b>.2.20</b> • ATUM <b>.069</b></p>
        </article>
      </div>`;

    updates.parentNode.insertBefore(sec, updates);
  }

  function insertTusk() {
    if (document.querySelector('[data-pj-tusk-playable]')) return;
    const grid = document.querySelector('#stands > .grid');
    if (!grid) return;

    const future = grid.querySelector('.future-card');
    const article = document.createElement('article');
    article.className = 'card addon-card';
    article.dataset.pjTuskPlayable = '1';
    const th = isThai();

    article.innerHTML = `<div class="addon-badge">ADDON</div><a class="card-img" href="stands/tusk.html"><img alt="TUSK ACT 4" src="../assets/stands/tusk-act4.png" loading="lazy"></a><div class="card-body"><div class="role">ACT 1–4 / Nail / Wormhole / Infinite Rotation</div><h3>TUSK</h3><p>${th
      ? 'Official Addon แบบหลาย ACT ใช้ Nail เป็นทรัพยากร พัฒนาจากการยิงเล็บและ Wormhole ไปจนถึง ACT4 และ Infinite Rotation.'
      : 'Official multi-ACT addon built around Nails, evolving from ranged shots and wormholes into ACT4 and Infinite Rotation.'}</p><a class="more" href="stands/tusk.html">${th ? 'อ่านแบบละเอียด →' : 'Open full guide →'}</a></div>`;

    if (future) grid.insertBefore(article, future);
    else grid.appendChild(article);
  }

  function insertSpoilerStands() {
    document.querySelectorAll('[data-pj-spoiler-stand="1"]').forEach(n => n.remove());
    const grid = document.querySelector('#stands > .grid');
    if (!grid) return;
    const th = isThai();
    const cards = [
      ["THE SUN", "the-sun.jpg"],
      ["SEX PISTOLS", "sex-pistols.jpg"],
      ["PEARL JAM", "pearl-jam.webp"],
      ["PURPLE HAZE", "purple-haze.png"]
    ];
    cards.forEach(([name, file]) => {
      const article = document.createElement('article');
      article.className = 'card future-card';
      article.dataset.pjSpoilerStand = '1';
      article.innerHTML = `<div class="future-badge">${th ? 'กำลังพัฒนา' : 'IN DEVELOPMENT'}</div><div class="card-img" style="background:radial-gradient(circle at center,#211326 0%,#0b0710 76%);display:flex;align-items:center;justify-content:center;overflow:hidden"><img src="../assets/stands/spoilers/${file}" alt="${name}" loading="lazy" style="width:100%;height:100%;object-fit:contain;object-position:center"></div><div class="card-body"><div class="role">${th ? 'ยังไม่เปิดให้เล่น' : 'NOT PLAYABLE YET'}</div><h3>${name}</h3><p>${th ? 'อยู่ระหว่างพัฒนา รายละเอียดและสกิลอาจเปลี่ยนก่อนปล่อยจริง' : 'In development. Skills and details may change before release.'}</p></div>`;
      grid.appendChild(article);
    });
  }

  function addChangelog() {
    const box = document.querySelector('.changelog');
    if (!box || box.querySelector('[data-pj-latest]')) return;
    const th = isThai();
    const entries = th ? [
      ['v0.23.0.322 — COMPACT SKILL HUD / SILVER CHARIOT', 'ชื่อท่าคู่บน HUD ใช้รูปแบบสั้น สกิล/สกิล เช่น CROSS FIRE/FIRE TRAP • Silver Chariot เก็บ/เรียก Stand ได้ระหว่าง Armor Off cooldown โดย cooldown ยังล็อกเฉพาะการเปิด Armor Off ซ้ำ • คงบาลานซ์ Armor Off เดิม'],
      ['v0.23.0.284 — MASTERY / TIER BALANCE', 'LV1 50% → LV100 120% • XP curve ใหม่ ≈ 1,059 Stand kills • Cooldown Mastery รายสกิล • TH Erase 25→12.5 • SP Time Stop 35→17.5 • TW 42→21 • KC Time Erase 32→20'],
      ['v0.1.0.248 — TUSK', 'ACT4 Infinite Rotation 30→18s ที่ LV100 • รักษา ACT4 punch/barrage arm layer, nail visual และ Dark Wormhole VFX'],
      ['v0.4.26 — HARVEST', 'Needle 1→0.75s • Storm 1.2→0.85s ที่ LV100 • เก็บ Relaxed Balloon Follow + Soft Anchor 7.25 tiles / staggered rebase'],
      ['v0.2.20 — HEAVEN\'S DOOR', 'MP observer fall/knockdown replication + UI readability pass'],
      ['v0.24.0.069 — ATUM', 'เวอร์ชัน Official Addon ล่าสุด; Mastery ของ Barrage/Gamble ใช้ระบบจาก Core']
    ] : [
      ['v0.23.0.322 — COMPACT SKILL HUD / SILVER CHARIOT', 'Dual-action HUD names now use compact SKILL/SKILL labels such as CROSS FIRE/FIRE TRAP • Silver Chariot can Summon/Dismiss during Armor Off cooldown while the cooldown continues to block only Armor Off reactivation • Armor Off balance is unchanged'],
      ['v0.23.0.284 — MASTERY / TIER BALANCE', 'LV1 50% → LV100 120% • new XP curve ≈ 1,059 Stand kills • per-skill cooldown mastery • TH Erase 25→12.5 • SP Time Stop 35→17.5 • TW 42→21 • KC Time Erase 32→20'],
      ['v0.1.0.248 — TUSK', 'ACT4 Infinite Rotation 30→18s at LV100 • retains ACT4 punch/barrage arm layer, smaller Nail visual and Dark Wormhole VFX'],
      ['v0.4.26 — HARVEST', 'Needle 1→0.75s • Storm 1.2→0.85s at LV100 • retains Relaxed Balloon Follow + 7.25-tile Soft Anchor / staggered rebase'],
      ['v0.2.20 — HEAVEN\'S DOOR', 'MP observer fall/knockdown replication + UI readability pass'],
      ['v0.24.0.069 — ATUM', 'Current official addon version; Barrage/Gamble mastery uses the shared Core system']
    ];

    entries.reverse().forEach(([t, p]) => {
      const d = document.createElement('details');
      d.className = 'change';
      d.dataset.pjLatest = '1';
      d.innerHTML = `<summary><b>${t}</b></summary><p>${p}</p>`;
      box.insertBefore(d, box.firstChild);
    });
  }

  function apply() {
    applyRanking();
    addMasteryNav();
    insertTusk();
    insertSpoilerStands();
    addLatestPanel();
    addChangelog();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
})();
