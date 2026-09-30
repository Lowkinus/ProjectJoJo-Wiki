(() => {
  const m = location.pathname.match(/\/stands\/([^\/]+)\.html$/i);
  if (!m) return;
  const stand = m[1].toLowerCase();
  const allowed = new Set([
    "star-platinum","the-world","king-crimson","crazy-diamond","the-hand",
    "killer-queen","silver-chariot","magicians-red","echoes-act-3"
  ]);
  if (!allowed.has(stand)) return;

  // TH + EN use the same synthetic key, so both languages contribute to one Stand rank.
  const img = new Image(1, 1);
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  img.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none";
  img.src = `https://hits.sh/lowkinus.github.io/ProjectJoJo-Wiki/stand/${stand}.svg?label=views&style=flat-square`;
  document.body.appendChild(img);
})();