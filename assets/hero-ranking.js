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
    "atum": ["ATUM", "atum.png"]
  };

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
      link.title = rank === 1
        ? `#1 Most viewed Stand — ${stands[id][0]}`
        : `#2 Most viewed Stand — ${stands[id][0]}`;
    };
    set(1, top1);
    set(2, top2);
  }

  function insertConfigGuide() {
    if (document.getElementById("project-jojo-client-options")) return;

    const sections = Array.from(document.querySelectorAll("main > section.section"));
    const combat = sections.find((section) => {
      const eyebrow = section.querySelector(":scope > .eyebrow");
      if (!eyebrow) return false;
      const text = (eyebrow.textContent || "").trim().toLowerCase();
      return text === "ระบบต่อสู้ที่ควรรู้" || text === "know the rules before the pose";
    });
    if (!combat || !combat.parentNode) return;

    const isThai = (document.documentElement.lang || "").toLowerCase().startsWith("th");
    const section = document.createElement("section");
    section.className = "section";
    section.id = "project-jojo-client-options";

    if (isThai) {
      section.innerHTML = `
        <div class="eyebrow">ตั้งค่าก่อนลุย</div>
        <h2>ปรับ PROJECT JOJO ให้เข้ากับวิธีเล่นของคุณ</h2>
        <p class="section-lead">ก่อนเข้าไฟต์ ลองเปิด <b>Options → ม็อด → Project JoJo</b> ก่อน ค่าพวกนี้เป็น Client Options ของแต่ละคน จึงปรับ HUD การเล็ง เสียง และปุ่มของตัวเองได้โดยไม่เปลี่ยนของผู้เล่นคนอื่น</p>
        <div class="systems">
          <article class="system"><strong>TARGETING MODE</strong><p><b>Mouse / Pointer</b> ใช้ทิศเมาส์แบบเดิม • <b>Facing Direction</b> โจมตีไปทางที่ตัวละครหัน เหมาะกับคนไม่อยากใช้เมาส์เล็งหรือใช้มอดมุมมองที่ซ่อน Cursor เช่น Project Viewpoint • <b>Controller Aim</b> ใช้ทิศเล็งจากจอย และเมื่ออนาล็อกอยู่ใน dead-zone จะกลับไปใช้ Facing Direction</p></article>
          <article class="system"><strong>DIRECTIONAL FIRST-CONTACT</strong><p>เปลี่ยน Targeting Mode ไม่ได้เปลี่ยนกฎการโดน ระบบยังเลือกเป้าหมายแรกตามแนวโจมตีจริง กำแพง ประตู หน้าต่าง รถ และสิ่งกีดขวางที่รองรับยังบังตามปกติ จึงไม่มีการล็อกเป้าทะลุตัวหน้า</p></article>
          <article class="system"><strong>STAND HUD</strong><p><b>Normal</b> แสดง HUD เต็ม • <b>Minimal</b> เหลือข้อมูลสำคัญและ Cooldown • <b>Hidden</b> ซ่อน Stand HUD ปกติทั้งหมด พร้อมปรับ <b>HUD Opacity 20–100%</b> และ <b>HUD Scale 70–150%</b> ได้ตามหน้าจอของตัวเอง</p></article>
          <article class="system"><strong>AUDIO / RESET</strong><p><b>Personal Project JoJo Volume 0–100%</b> ปรับเสียงของมอดเฉพาะเครื่องตัวเอง มีปุ่ม <b>Reset Visual / Audio / Targeting</b> และ <b>Reset Keybinds</b> แยกกัน จึงคืนค่าเฉพาะส่วนที่ต้องการได้</p></article>
          <article class="system"><strong>GAMEPLAY UI ยังอยู่</strong><p>การซ่อน HUD ไม่ซ่อนหน้าจอที่ต้องใช้เล่นจริง เช่น <b>HARVEST Search Command</b>, <b>ATUM Minigames / YES-NO</b> และ <b>HEAVEN'S DOOR Book / Command UI</b> เพราะพวกนี้เป็น Gameplay UI ไม่ใช่ HUD ตกแต่ง</p></article>
          <article class="system"><strong>CLIENT vs SANDBOX</strong><p>Client Options มีผลเฉพาะผู้เล่นคนนั้น ส่วนบาลานซ์โลก/เซิร์ฟเวอร์ เช่น <b>Arrow Drop Rate, Stand Damage, Stand Levels, Infinite Stand Arrow และ Super Arrow</b> อยู่ใน Sandbox Settings. <b>Super Arrow</b> ปิดเป็นค่าเริ่มต้น; เมื่อเปิด Stand Arrow จะแสดงรายชื่อ Stand ที่โหลดและลงทะเบียนอยู่ให้เลือกแทนการสุ่ม</p></article>
        </div>`;
    } else {
      section.innerHTML = `
        <div class="eyebrow">SET IT UP BEFORE THE FIGHT</div>
        <h2>MAKE PROJECT JOJO FIT HOW YOU PLAY</h2>
        <p class="section-lead">Before jumping into combat, open <b>Options → Mods → Project JoJo</b>. These are per-client preferences, so you can change your own aiming, HUD, audio and keybinds without changing another player's setup.</p>
        <div class="systems">
          <article class="system"><strong>TARGETING MODE</strong><p><b>Mouse / Pointer</b> uses the classic mouse direction • <b>Facing Direction</b> attacks where your character is facing and works well for players who do not want mouse aiming or use cursor-hidden camera mods such as Project Viewpoint • <b>Controller Aim</b> reads controller aim direction and falls back to Facing Direction inside the stick dead-zone</p></article>
          <article class="system"><strong>DIRECTIONAL FIRST-CONTACT</strong><p>Changing Targeting Mode does not change hit rules. The first valid body along the real attack line takes contact first, while supported walls, doors, windows, vehicles and other blockers still stop attacks when appropriate.</p></article>
          <article class="system"><strong>STAND HUD</strong><p><b>Normal</b> shows the full HUD • <b>Minimal</b> keeps essential information and cooldowns • <b>Hidden</b> removes the normal Stand HUD. You can also set <b>HUD Opacity 20–100%</b> and <b>HUD Scale 70–150%</b> for your own screen.</p></article>
          <article class="system"><strong>AUDIO / RESET</strong><p><b>Personal Project JoJo Volume 0–100%</b> changes this mod's audio only for your client. Separate <b>Reset Visual / Audio / Targeting</b> and <b>Reset Keybinds</b> buttons let you restore only the part you want.</p></article>
          <article class="system"><strong>GAMEPLAY UI STAYS USABLE</strong><p>Hiding the Stand HUD does not hide required gameplay screens such as <b>HARVEST Search Command</b>, <b>ATUM Minigames / YES-NO</b> or the <b>HEAVEN'S DOOR Book / Command UI</b>.</p></article>
          <article class="system"><strong>CLIENT vs SANDBOX</strong><p>Client Options affect only that player. Shared world/server balance such as <b>Arrow Drop Rate, Stand Damage, Stand Levels, Infinite Stand Arrow and Super Arrow</b> stays in Sandbox Settings. <b>Super Arrow</b> is OFF by default; when enabled, using a Stand Arrow shows the currently loaded and registered Stands to choose from instead of rolling randomly.</p></article>
        </div>`;
    }

    combat.parentNode.insertBefore(section, combat);
  }

  function apply() {
    applyRanking();
    insertConfigGuide();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, {once:true});
  } else {
    apply();
  }
})();
