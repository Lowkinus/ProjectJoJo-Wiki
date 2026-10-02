(() => {
  const m = location.pathname.match(/\/stands\/([^\/]+)\.html$/i);
  if (!m) return;
  const stand = m[1].toLowerCase();
  const allowed = new Set([
    "star-platinum","the-world","king-crimson","crazy-diamond","the-hand",
    "killer-queen","silver-chariot","magicians-red","echoes-act-3","atum"
  ]);
  if (!allowed.has(stand)) return;

  const lang = (document.documentElement.lang || "").toLowerCase();
  const kicker = document.querySelector(".article .kicker");
  const updateBox = document.querySelector(".article .updatebox");
  const footer = document.querySelector(".footer");

  if (lang.startsWith("th")) {
    if (kicker) kicker.textContent = "คู่มือ Stand แบบละเอียด";
    if (updateBox && /รีเช็กกับโค้ด|ไม่ได้ดึงเลขเก่าจาก Wiki|v0\.23\.0\.237|v237/i.test(updateBox.textContent || "")) {
      updateBox.remove();
    }
  } else if (lang.startsWith("en")) {
    if (kicker) kicker.textContent = "Detailed Stand Guide";
    if (updateBox && /rebuilt against|older Wiki snapshot|v0\.23\.0\.237|v237/i.test(updateBox.textContent || "")) {
      updateBox.remove();
    }

    if (stand === "echoes-act-3") {
      document.querySelectorAll(".article p").forEach((p) => {
        const t = p.textContent || "";
        if (/v237 raised base Barrage damage per hit from 0\.026 to 0\.060/i.test(t)) {
          p.innerHTML = p.innerHTML.replace(
            /v237 raised base Barrage damage per hit from 0\.026 to 0\.060\./i,
            "Base Barrage damage per hit is <strong>0.060</strong>."
          );
        }
      });
    }
  }

  if (footer && footer.firstChild && footer.firstChild.nodeType === Node.TEXT_NODE) {
    footer.firstChild.textContent = "PROJECT JOJO • WIKI";
  }

  const img = new Image(1, 1);
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  img.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none";
  img.src = `https://hits.sh/lowkinus.github.io/ProjectJoJo-Wiki/stand/${stand}.svg?label=views&style=flat-square`;
  document.body.appendChild(img);
})();