#!/usr/bin/env python3
# Project JoJo Wiki updater for v0.23.0.237
# Standard library only.
from __future__ import annotations
from pathlib import Path
import argparse, json, re, subprocess, sys

VERSION = "0.23.0.237"
STANDS = [
    "star-platinum","the-world","king-crimson","crazy-diamond",
    "the-hand","killer-queen","silver-chariot","magicians-red","echoes-act-3"
]

def need(path: Path):
    if not path.exists():
        raise SystemExit(f"[ERROR] Missing: {path}")

def replace_once(text: str, old: str, new: str, label: str, required=True):
    if old in text:
        return text.replace(old, new, 1), True
    if new in text:
        return text, False
    if required:
        raise RuntimeError(f"{label}: expected text was not found")
    return text, False

def get_entry(obj, lang, title):
    for e in obj[lang]:
        if e.get("title") == title:
            return e
    raise RuntimeError(f"guide entry not found: {lang}/{title}")

def load_js_json(path: Path, prefix: str):
    s = path.read_text(encoding="utf-8")
    if not s.startswith(prefix) or not s.rstrip().endswith(";"):
        raise RuntimeError(f"Unexpected JS JSON wrapper: {path}")
    return json.loads(s[len(prefix):].rstrip()[:-1])

def save_js_json(path: Path, prefix: str, obj):
    path.write_text(prefix + json.dumps(obj, ensure_ascii=False, separators=(",", ":")) + ";",
                    encoding="utf-8")

def patch_readme(root: Path):
    p = root / "README.md"
    need(p)
    s = p.read_text(encoding="utf-8")
    s = re.sub(r"# Project JoJo Wiki v[0-9.]+", "# Project JoJo Wiki v4.2", s, count=1)
    s = re.sub(
        r"The complete Thai/English long guide remains available and is updated to v0\.23\.0\.\d+\.",
        "The complete Thai/English long guide remains available and is updated through "
        "v0.23.0.237, including Directional First-Contact Aim, Echoes ACT 3's Barrage buff "
        "and Barrage Guard / projectile deflection.",
        s, count=1
    )
    p.write_text(s, encoding="utf-8")

def patch_data(root: Path):
    p = root / "assets/data.js"
    need(p)
    obj = load_js_json(p, "window.PJ_DATA=")
    obj["version"] = VERSION
    for stand in obj["stands"]:
        if stand.get("id") == "echoes-act-3":
            stand["th"] = "Barrage บัฟแล้ว • Mark • THREE FREEZE • คุมเป้าหมายสำคัญ"
            stand["en"] = "Buffed Barrage • Mark • THREE FREEZE • priority-target control"
    save_js_json(p, "window.PJ_DATA=", obj)

def patch_guide(root: Path):
    p = root / "assets/guide-data.js"
    need(p)
    g = load_js_json(p, "window.PJ_GUIDE=")

    th_intro = get_entry(g, "th", "PROJECT JOJO — คู่มือ Stand แบบละเอียด")
    en_intro = get_entry(g, "en", "PROJECT JOJO — COMPLETE STAND GUIDE")
    th_intro["html"] = re.sub(r"v0\.23\.0\.\d+", VERSION, th_intro["html"])
    en_intro["html"] = re.sub(r"v0\.23\.0\.\d+", VERSION, en_intro["html"])

    get_entry(g, "th", "การควบคุมพื้นฐาน")["html"] = """<p><strong>CAPS LOCK</strong> — เรียก / เก็บ Stand</p>
<p><strong>1</strong> — สกิล 1<br><strong>2</strong> — สกิล 2<br><strong>3</strong> — สกิล 3<br><strong>4</strong> — สกิล 4</p>
<p>ใช้ปุ่มเลขแถวบน ไม่ใช่ Numpad</p>
<h3>การเล็งแบบ DIRECTIONAL FIRST-CONTACT — v0.23.0.237</h3>
<p>เมาส์กำหนด <strong>ทิศทาง</strong> ส่วนระยะตรวจโดนใช้ระยะสูงสุดจริงของสกิล จึงไม่ถูก Cursor ใกล้ตัวตัดระยะสกิลยาวให้สั้นลง</p>
<p>ตัวแรกที่ร่างสัมผัสแนวโจมตีจะถูกเลือกก่อน รองรับเป้าประชิด ยืน ล้ม และคลานด้วยขนาดสัมผัสที่เหมาะสม</p>
<p>Barrage เลี้ยวตามเมาส์ได้ระหว่างรัว และรักษา contact เดิมสั้น ๆ ราว <strong>240 ms</strong> เมื่อไม่มีเป้าใหม่ พร้อมเผื่อด้านข้าง 0.30 ช่อง แต่ contact ใหม่มีสิทธิ์ก่อนทันที</p>
<p>หันกลับ / ออกนอกระยะ / ตาย / มีกำแพง ประตู หน้าต่าง หรือรถกั้น จะหลุด contact ตามปกติ PvP / Safety เดิมยังทำงาน</p>"""

    get_entry(g, "en", "BASIC CONTROLS")["html"] = """<p><strong>CAPS LOCK</strong> — Summon / Dismiss Stand</p>
<p><strong>1</strong> — Skill 1<br><strong>2</strong> — Skill 2<br><strong>3</strong> — Skill 3<br><strong>4</strong> — Skill 4</p>
<p>Use the top-row number keys, not Numpad.</p>
<h3>DIRECTIONAL FIRST-CONTACT AIM — v0.23.0.237</h3>
<p>The mouse defines <strong>direction</strong>, while contact checks use the skill's real maximum range. A nearby cursor no longer shortens a long-range skill.</p>
<p>The first body that intersects the attack corridor is selected first, with appropriate contact sizes for close, standing, fallen and crawling targets.</p>
<p>Barrage can be steered while active and may retain the previous contact for about <strong>240 ms</strong> when no new target is found, with 0.30-tile side tolerance. A new real contact takes priority immediately.</p>
<p>Turning away, leaving range, death, or walls/doors/windows/vehicles breaking the line ends contact normally. Existing PvP/Safety rules remain in place.</p>"""

    th_guard = {
        "title":"BARRAGE GUARD / ระบบปัดโปรเจกไทล์",
        "slug":"barrage-guard-ระบบปัดโปรเจกไทล์",
        "group":"systems",
        "html":"""<p><strong>เพิ่มใน v0.23.0.237</strong></p>
<p>ระหว่าง Barrage ที่ทำงานจริง Stand บางตัวสร้างแนวปัดด้านหน้าเพื่อกันโปรเจกไทล์ที่วิ่งเข้าหาเจ้าของหรือคนด้านหลังแนวบัง</p>
<p><strong>เปิดใช้:</strong> Star Platinum, The World, Crazy Diamond (Attack Barrage เท่านั้น), Silver Chariot, King Crimson</p>
<p><strong>ยังไม่เปิด:</strong> The Hand, Killer Queen, Echoes ACT 3, Magician's Red</p>
<p>แนวปัดกว้างรวมประมาณ <strong>2.5 ช่อง</strong> และต้องเป็นกระสุนจากด้านหน้าที่ตัดแนวบังจริง ด้านหลัง/ด้านข้างยังโดนได้</p>
<p>รองรับโดยตรง: <strong>TW Knife, SC Rapier Shot, CD Glass / Glass Homing</strong></p>
<p>ไม่กันระเบิด ไฟพื้นที่ การลบพื้นที่ หรือ THREE FREEZE และไม่ทำงานใน CD Restore Barrage</p>
<p><strong>ปืนเกมหลัก:</strong> มี native per-hit hook แล้ว แต่ยังต้องเทสจริง B42 บน SP / Host / Dedicated ก่อนถือว่ารองรับครบ ถ้า Hook ใช้ไม่ได้ ดาเมจจะผ่านตามปกติ</p>
<p><strong>มอดอื่น:</strong> ไม่รองรับอัตโนมัติ ต้องเชื่อม API <code>JJS_BarrageGuard.interceptProjectile(attacker,sx,sy,ex,ey,z)</code></p>"""
    }
    en_guard = {
        "title":"BARRAGE GUARD / PROJECTILE DEFLECTION",
        "slug":"barrage-guard-projectile-deflection",
        "group":"systems",
        "html":"""<p><strong>Added in v0.23.0.237.</strong></p>
<p>While an offensive Barrage is active, selected Stands create a forward guard line that can stop supported incoming projectiles before they reach the owner or someone directly behind it.</p>
<p><strong>Enabled:</strong> Star Platinum, The World, Crazy Diamond (Attack Barrage only), Silver Chariot, King Crimson</p>
<p><strong>Not enabled:</strong> The Hand, Killer Queen, Echoes ACT 3, Magician's Red</p>
<p>The guard is about <strong>2.5 tiles wide</strong>. The projectile must genuinely travel from the front through the guard line; rear/side paths still hit normally.</p>
<p>Direct support: <strong>TW Knife, SC Rapier Shot, CD Glass / Glass Homing</strong></p>
<p>It does not block explosions, area fire, area erasure or THREE FREEZE, and is disabled during CD Restore Barrage.</p>
<p><strong>Vanilla firearms:</strong> a native per-hit hook exists, but still needs live B42 validation across SP / Host / Dedicated before firearm coverage is considered fully verified. If unavailable, firearm damage passes through normally.</p>
<p><strong>Third-party projectiles:</strong> not automatic; external mods can integrate through <code>JJS_BarrageGuard.interceptProjectile(attacker,sx,sy,ex,ey,z)</code>.</p>"""
    }
    for lang, entry in (("th", th_guard), ("en", en_guard)):
        g[lang] = [x for x in g[lang] if x.get("slug") != entry["slug"] and x.get("title") != entry["title"]]
        i = next(i for i,x in enumerate(g[lang]) if x.get("title") == "BARRAGE CLASH")
        g[lang].insert(i+1, entry)

    # Correct values that were still stale in the long guide.
    e = get_entry(g, "th", "STAR PLATINUM")
    e["html"] = e["html"].replace("4.5 ช่อง", "11.25 ช่อง")
    e = get_entry(g, "en", "STAR PLATINUM")
    e["html"] = e["html"].replace("4.5 tiles", "11.25 tiles")

    e = get_entry(g, "th", "THE WORLD")
    e["html"] = e["html"].replace("5.25 ช่อง", "13.125 ช่อง")
    e = get_entry(g, "en", "THE WORLD")
    e["html"] = e["html"].replace("5.25 tiles", "13.125 tiles")

    e = get_entry(g, "th", "KING CRIMSON")
    e["html"] = e["html"].replace("<strong>5.5 ช่อง</strong>", "<strong>13.75 ช่อง</strong>")
    e = get_entry(g, "en", "KING CRIMSON")
    e["html"] = e["html"].replace("<strong>5.5 tiles</strong>", "<strong>13.75 tiles</strong>")

    e = get_entry(g, "th", "MAGICIAN'S RED")
    e["html"] = re.sub(
        r"<p>Fireball</p>\s*<p><strong>8</strong></p>",
        "<p>Fireball</p><p><strong>ฟรี • โดนทำดาเมจจริง +4 Gauge</strong></p>",
        e["html"], count=1
    )
    e["html"] = e["html"].replace("<p>ค่าใช้:<br><strong>8</strong></p>",
                                  "<p>ค่าใช้:<br><strong>ฟรี</strong></p>")
    if "+4 Gauge" not in e["html"]:
        e["html"] = e["html"].replace(
            "<h3>สกิล 1 — FIREBALL</h3>",
            "<h3>สกิล 1 — FIREBALL</h3><p><strong>v0.23.0.233+:</strong> Fireball ไม่เสีย Fire Gauge และเมื่อทำดาเมจโดนจริงจะได้ +4 Gauge</p>"
        )

    e = get_entry(g, "en", "MAGICIAN'S RED")
    e["html"] = e["html"].replace(
        "<p>Fireball:<br><strong>8</strong></p>",
        "<p>Fireball:<br><strong>FREE • +4 Gauge on a real damaging hit</strong></p>"
    ).replace("<p>Cost:<br><strong>8</strong></p>",
              "<p>Cost:<br><strong>FREE</strong></p>")
    if "+4 Gauge" not in e["html"]:
        e["html"] = e["html"].replace(
            "<h3>SKILL 1 — FIREBALL</h3>",
            "<h3>SKILL 1 — FIREBALL</h3><p><strong>v0.23.0.233+:</strong> Fireball costs no Fire Gauge and grants +4 Gauge on a real damaging hit.</p>"
        )

    e = get_entry(g, "th", "CRAZY DIAMOND")
    e["html"] = (e["html"]
        .replace("<strong>+0.5</strong>", "<strong>+0.30</strong>")
        .replace("<strong>+0.15625 ต่อ Hit</strong>", "<strong>+0.09375 ต่อ Hit</strong>")
        .replace("<strong>+0.625</strong>", "<strong>+0.375</strong>"))
    e = get_entry(g, "en", "CRAZY DIAMOND")
    e["html"] = (e["html"]
        .replace("<strong>+0.5</strong>", "<strong>+0.30</strong>")
        .replace("<strong>+0.15625 per hit</strong>", "<strong>+0.09375 per hit</strong>")
        .replace("<strong>+0.625</strong>", "<strong>+0.375</strong>"))

    e = get_entry(g, "th", "ECHOES ACT 3")
    e["html"] = re.sub(
        r"<p>Damage ของ Echoes ตั้งใจให้ต่ำกว่า Stand สายต่อสู้โดยตรง</p>\s*<p>เพราะจุดประสงค์หลักคือ</p>\s*<p><strong>Control</strong></p>",
        "<p><strong>v0.23.0.237:</strong> ดาเมจพื้นฐาน Barrage ต่อ Hit เพิ่มจาก <strong>0.026 → 0.060</strong> (~<strong>2.31 เท่า</strong>) ก่อนตัวคูณ Level / Crit / Sandbox</p><p>Echoes ยังเน้น Control และ THREE FREEZE แต่ Barrage ไม่อ่อนเท่าเวอร์ชันก่อนแล้ว</p>",
        e["html"], count=1
    )
    e = get_entry(g, "en", "ECHOES ACT 3")
    e["html"] = re.sub(
        r"<p>Damage is intentionally low\.</p>\s*<p>That is not the main purpose\.</p>",
        "<p><strong>v0.23.0.237:</strong> base Barrage damage per hit increased from <strong>0.026 → 0.060</strong> (~<strong>2.31×</strong>) before Level / Crit / Sandbox multipliers.</p><p>Echoes still focuses on control and THREE FREEZE, but its Barrage is no longer as weak as before.</p>",
        e["html"], count=1
    )

    save_js_json(p, "window.PJ_GUIDE=", g)

def patch_index(root: Path, lang: str):
    p = root / lang / "index.html"
    need(p)
    s = p.read_text(encoding="utf-8")
    s = re.sub(r'<div class="hero-tags"><span>v0\.23\.0\.\d+</span>',
               '<div class="hero-tags"><span>v0.23.0.237</span>', s, count=1)
    if lang == "th":
        s = s.replace("ทิศเมาส์กำหนดแนวโจมตี ระบบประชิดมีตัวช่วยเล็ง แต่ยังต้องหันให้ถูกทาง",
                      "เมาส์กำหนดทิศ ระบบใช้ระยะจริงของสกิลและเลือกตัวแรกที่สัมผัสแนวโจมตี")
        s = s.replace("Barrage → THREE FREEZE • ล็อก 9 วิ • Freeze รถได้",
                      "Barrage บัฟ ~2.31× • THREE FREEZE 9 วิ • Freeze รถได้")
        s = re.sub(r"พร้อมอัปเดต[^<]*v0\.23\.0\.\d+",
                   "พร้อมอัปเดต First-Contact Aim, Barrage Guard และบาลานซ์ให้ตรง v0.23.0.237", s, count=1)
        if "<span>BARRAGE GUARD</span>" not in s:
            old = '<article class="system-card"><span>MULTIPLAYER</span><strong>PVP / SAFETY</strong><p>ดาเมจผู้เล่นเคารพ PvP/Safety และ SHA ไม่ล่าผู้เล่นที่ได้รับการป้องกัน</p></article></div></section>'
            new = '<article class="system-card"><span>MULTIPLAYER</span><strong>PVP / SAFETY</strong><p>ดาเมจผู้เล่นเคารพ PvP/Safety และ SHA ไม่ล่าผู้เล่นที่ได้รับการป้องกัน</p></article><article class="system-card"><span>BARRAGE GUARD</span><strong>5 STANDS</strong><p>SP / TW / CD / SC / KC ปัดโปรเจกไทล์ด้านหน้าได้ระหว่าง Barrage • ปืน native hook ยังรอเทสจริง B42</p></article></div></section>'
            s = s.replace(old, new)
        rows = """<div class="change-list"><div class="change-row"><b>v0.23.0.237</b><p>First-Contact ใช้ระยะจริง • Barrage grace 240 ms / ชดเชยเฟรมช้าสูงสุด 3 hit • TH Pull 21.875 ช่อง • Echoes 0.026 → 0.060 (~2.31×) • Barrage Guard สำหรับ SP/TW/CD/SC/KC</p></div><div class="change-row"><b>v0.23.0.236</b><p>Directional First-Contact Aim: เมาส์กำหนดทิศ, ตัวแรกในแนวโดนก่อน, Barrage เปลี่ยนทิศได้ทันที</p></div><div class="change-row"><b>v0.23.0.235</b><p>Core Load hotfix สำหรับ SP / Host / MP และ duplicate-event guards</p></div><div class="change-row"><b>v0.23.0.234</b><p>MP hotfix: pending attacks, Time Stop nil call, PvP target filtering, downed hit capsule, TH Pull pose และ KC clone</p></div><div class="change-row"><b>v0.23.0.233</b><p>Time Dash SP/TW/KC ×2.5 • MR Fireball ฟรี +4 Gauge เมื่อโดนจริง • CD attack Restore gain -40%</p></div></div>"""
    else:
        s = s.replace("Mouse direction controls your attack line. Close-range attacks have soft aim assistance.",
                      "Mouse sets attack direction; skills use their real range and the first body that contacts the attack line is selected.")
        s = s.replace("Barrage → THREE FREEZE • 9 sec control • vehicle freeze",
                      "~2.31× Barrage buff • 9 sec THREE FREEZE • vehicle freeze")
        s = re.sub(r"updated for v0\.23\.0\.\d+\.",
                   "updated through v0.23.0.237 with First-Contact Aim and Barrage Guard.", s, count=1)
        if "<span>BARRAGE GUARD</span>" not in s:
            old = '<article class="system-card"><span>MULTIPLAYER</span><strong>PVP / SAFETY</strong><p>Player damage respects PvP/Safety, and protected players are not autonomous SHA targets.</p></article></div></section>'
            new = '<article class="system-card"><span>MULTIPLAYER</span><strong>PVP / SAFETY</strong><p>Player damage respects PvP/Safety, and protected players are not autonomous SHA targets.</p></article><article class="system-card"><span>BARRAGE GUARD</span><strong>5 STANDS</strong><p>SP / TW / CD / SC / KC can deflect supported front projectiles during Barrage • native firearm hook still needs live B42 validation</p></article></div></section>'
            s = s.replace(old, new)
        rows = """<div class="change-list"><div class="change-row"><b>v0.23.0.237</b><p>First-Contact uses real skill range • 240 ms Barrage grace / up to 3 catch-up hits • TH Pull 21.875 tiles • Echoes 0.026 → 0.060 (~2.31×) • Barrage Guard for SP/TW/CD/SC/KC</p></div><div class="change-row"><b>v0.23.0.236</b><p>Directional First-Contact Aim: mouse defines direction, first body in the corridor is hit first, Barrage redirects immediately</p></div><div class="change-row"><b>v0.23.0.235</b><p>Core-load hotfix for SP / Host / MP and duplicate-event guards</p></div><div class="change-row"><b>v0.23.0.234</b><p>MP hotfixes: pending attacks, Time Stop nil calls, PvP target filtering, downed hit capsules, TH Pull pose and KC clone</p></div><div class="change-row"><b>v0.23.0.233</b><p>SP/TW/KC Time Dash ×2.5 • MR Fireball free +4 Gauge on hit • CD attack Restore gain -40%</p></div></div>"""
    s2, n = re.subn(r'<div class="change-list">[\s\S]*?</div></section>\s*</main>',
                    rows + '</section>\n</main>', s, count=1)
    if n != 1:
        raise RuntimeError(f"{lang}/index.html: changelog block not found")
    p.write_text(s2, encoding="utf-8")

NOTES = {
"th":{
"star-platinum":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Punch, ORA Barrage และ Star Finger ใช้ Directional First-Contact ใหม่ และ ORA Barrage เปิดแนว Barrage Guard ด้านหน้าเพื่อปัดโปรเจกไทล์ที่รองรับ</p>',
"the-world":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Punch, MUDA Barrage และ Knife ใช้ First-Contact ใหม่ และ MUDA Barrage เปิด Barrage Guard ได้</p>',
"king-crimson":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Punch/Barrage ใช้ First-Contact ใหม่ และ Barrage ของ King Crimson เปิดแนวปัดโปรเจกไทล์ด้านหน้าได้</p>',
"crazy-diamond":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Attack/Restore contact ใช้แนวเมาส์ปัจจุบัน ไม่มี sticky target เก่า และ Glass Shot ใช้ First-Contact ใหม่ Barrage Guard ทำงานเฉพาะ <strong>Attack Barrage</strong>; Restore Barrage ไม่ปัดโปรเจกไทล์</p>',
"the-hand":'<hr/><h3>v0.23.0.237 — FIRST CONTACT</h3><p>Space Pull ใช้ระยะจริง <strong>21.875 ช่อง</strong> โดยไม่ถูก Cursor ตัดสั้น และ Pull/Erase ใช้ First-Contact ใหม่ Barrage Guard ยังไม่เปิดให้ The Hand</p>',
"killer-queen":'<hr/><h3>v0.23.0.237 — FIRST CONTACT</h3><p>Punch, Barrage และ First Bomb ใช้ Directional First-Contact ใหม่ Barrage Guard ยังไม่เปิดให้ Killer Queen</p>',
"silver-chariot":'<hr/><h3>v0.23.0.237 — BARRAGE GUARD</h3><p>Stab/Rush/Rapier Shot ใช้ First-Contact ใหม่ และ Rapier Rush เปิดแนวปัดโปรเจกไทล์ด้านหน้าได้</p>',
"magicians-red":'<hr/><h3>v0.23.0.237 — FIRST CONTACT</h3><p>Fireball และแนวโจมตีตรงใช้ First-Contact ใหม่ Barrage Guard ยังไม่เปิดให้ Magician\\'s Red</p>',
"echoes-act-3":'<hr/><h3>v0.23.0.237 — ECHOES BUFF / FIRST CONTACT</h3><p>ดาเมจ Barrage ต่อ Hit เพิ่มจาก <strong>0.026 → 0.060</strong> (~<strong>2.31 เท่า</strong>) ก่อน Level/Crit/Sandbox และ Barrage/THREE FREEZE ใช้ First-Contact ใหม่ Barrage Guard ยังไม่เปิดให้ Echoes ACT 3</p>'
},
"en":{
"star-platinum":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Punch, ORA Barrage and Star Finger use Directional First-Contact, and ORA Barrage can activate the forward Barrage Guard.</p>',
"the-world":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Punch, MUDA Barrage and Knife use First-Contact, and MUDA Barrage can activate Barrage Guard.</p>',
"king-crimson":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Punch/Barrage use First-Contact, and King Crimson\\'s Barrage can activate the forward projectile guard.</p>',
"crazy-diamond":'<hr/><h3>v0.23.0.237 — AIM / BARRAGE GUARD</h3><p>Attack/Restore contact uses the current mouse corridor without sticky old targets. Glass Shot uses First-Contact. Barrage Guard works only in <strong>Attack Barrage</strong>; Restore Barrage does not deflect projectiles.</p>',
"the-hand":'<hr/><h3>v0.23.0.237 — FIRST CONTACT</h3><p>Space Pull uses its real <strong>21.875-tile</strong> range without cursor-distance shortening it, and Pull/Erase use First-Contact. Barrage Guard is not enabled for The Hand.</p>',
"killer-queen":'<hr/><h3>v0.23.0.237 — FIRST CONTACT</h3><p>Punch, Barrage and First Bomb use Directional First-Contact. Barrage Guard is not enabled for Killer Queen.</p>',
"silver-chariot":'<hr/><h3>v0.23.0.237 — BARRAGE GUARD</h3><p>Stab/Rush/Rapier Shot use First-Contact, and Rapier Rush can activate the forward projectile guard.</p>',
"magicians-red":'<hr/><h3>v0.23.0.237 — FIRST CONTACT</h3><p>Fireball and directional contact checks use First-Contact. Barrage Guard is not enabled for Magician\\'s Red.</p>',
"echoes-act-3":'<hr/><h3>v0.23.0.237 — ECHOES BUFF / FIRST CONTACT</h3><p>Base Barrage damage per hit increased from <strong>0.026 → 0.060</strong> (~<strong>2.31×</strong>) before Level/Crit/Sandbox multipliers. Barrage/THREE FREEZE use First-Contact. Barrage Guard is not enabled for Echoes ACT 3.</p>'
}}

def patch_stand_pages(root: Path):
    marker = '</div></section><nav class="stand-prevnext">'
    for lang in ("th","en"):
        for slug in STANDS:
            p = root / lang / "stands" / f"{slug}.html"
            need(p)
            s = p.read_text(encoding="utf-8")
            s = re.sub(r"Detailed Stand Guide • v0\.23\.0\.\d+",
                       "Detailed Stand Guide • v0.23.0.237", s, count=1)
            s = re.sub(r'<!-- V237_UPDATE_START -->[\s\S]*?<!-- V237_UPDATE_END -->', '', s)
            if marker not in s:
                raise RuntimeError(f"stand page marker missing: {p}")
            s = s.replace(marker,
                f'<!-- V237_UPDATE_START -->{NOTES[lang][slug]}<!-- V237_UPDATE_END -->{marker}',
                1)
            p.write_text(s, encoding="utf-8")

def validate(root: Path):
    checks = []
    def chk(name, ok):
        checks.append((name, bool(ok)))
    gd = (root/"assets/guide-data.js").read_text(encoding="utf-8")
    th = (root/"th/index.html").read_text(encoding="utf-8")
    en = (root/"en/index.html").read_text(encoding="utf-8")
    data = (root/"assets/data.js").read_text(encoding="utf-8")
    chk("data version", '"version":"0.23.0.237"' in data)
    chk("guide version", "v0.23.0.237" in gd)
    chk("first-contact", "DIRECTIONAL FIRST-CONTACT" in gd)
    chk("barrage guard", "PROJECTILE DEFLECTION" in gd and "ระบบปัดโปรเจกไทล์" in gd)
    chk("echoes buff", "0.026 → 0.060" in gd)
    chk("crazy diamond restore", "+0.09375" in gd and "+0.375" in gd)
    chk("SP dash", "11.25 tiles" in gd and "11.25 ช่อง" in gd)
    chk("TW dash", "13.125 tiles" in gd and "13.125 ช่อง" in gd)
    chk("KC dash", "13.75 tiles" in gd and "13.75 ช่อง" in gd)
    chk("home TH", "v0.23.0.237" in th and "v0.23.0.236" in th)
    chk("home EN", "v0.23.0.237" in en and "v0.23.0.236" in en)
    for lang in ("th","en"):
        for slug in STANDS:
            s=(root/lang/"stands"/f"{slug}.html").read_text(encoding="utf-8")
            chk(f"{lang}/{slug}", "Detailed Stand Guide • v0.23.0.237" in s and "V237_UPDATE_START" in s)
    failed=[n for n,ok in checks if not ok]
    if failed:
        print("[VALIDATION FAILED]")
        for n in failed: print(" -", n)
        return False
    print(f"[OK] {len(checks)} validation checks passed.")
    return True

def run_git(root: Path, push: bool):
    def cmd(*args):
        print("+ git", *args)
        subprocess.run(["git", *args], cwd=root, check=True)
    cmd("add", "README.md", "assets/data.js", "assets/guide-data.js",
        "th/index.html", "en/index.html", "th/stands", "en/stands")
    # Do not fail if a previous run already committed identical content.
    dirty = subprocess.run(["git","diff","--cached","--quiet"], cwd=root)
    if dirty.returncode != 0:
        cmd("commit", "-m", "Update Project JoJo Wiki for v0.23.0.237")
    else:
        print("[INFO] No staged changes; files already match.")
    if push:
        cmd("push", "origin", "HEAD")

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--repo", default=".", help="Path to ProjectJoJo-Wiki repository")
    ap.add_argument("--commit", action="store_true", help="git add + commit after patching")
    ap.add_argument("--push", action="store_true", help="also push current branch to origin (implies --commit)")
    args=ap.parse_args()
    root=Path(args.repo).resolve()
    for p in ["assets/data.js","assets/guide-data.js","th/index.html","en/index.html"]:
        need(root/p)
    print("[INFO] Patching", root)
    patch_readme(root)
    patch_data(root)
    patch_guide(root)
    patch_index(root,"th")
    patch_index(root,"en")
    patch_stand_pages(root)
    if not validate(root):
        raise SystemExit(2)
    print("[OK] Wiki updated locally to v0.23.0.237.")
    if args.commit or args.push:
        run_git(root, args.push)

if __name__ == "__main__":
    main()
