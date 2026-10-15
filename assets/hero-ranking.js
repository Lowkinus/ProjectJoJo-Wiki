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

  function insertSpoilerStands() {
    if (document.querySelector('[data-pj-spoiler-stand="1"]')) return;
    const standsSection = document.getElementById("stands");
    if (!standsSection) return;
    const grid = standsSection.querySelector(":scope > .grid");
    if (!grid) return;

    const isThai = (document.documentElement.lang || "").toLowerCase().startsWith("th");
    const cards = [
      ["THE SUN", "the-sun.jpg"],
      ["SEX PISTOLS", "sex-pistols.jpg"],
      ["PEARL JAM", "pearl-jam.webp"],
      ["TUSK ACT 4", "tusk-act-4.png"],
      ["PURPLE HAZE", "purple-haze.png"]
    ];

    cards.forEach(([name, file]) => {
      const article = document.createElement("article");
      article.className = "card future-card";
      article.setAttribute("data-pj-spoiler-stand", "1");
      article.innerHTML = `
        <div class="future-badge">${isThai ? "กำลังพัฒนา" : "IN DEVELOPMENT"}</div>
        <div class="card-img" style="background:radial-gradient(circle at center,#211326 0%,#0b0710 76%);display:flex;align-items:center;justify-content:center;overflow:hidden">
          <img src="../assets/stands/spoilers/${file}" alt="${name}" loading="lazy" style="width:100%;height:100%;object-fit:contain;object-position:center">
        </div>
        <div class="card-body">
          <div class="role">${isThai ? "ยังไม่เปิดให้เล่น" : "NOT PLAYABLE YET"}</div>
          <h3>${name}</h3>
          <p>${isThai ? "อยู่ระหว่างพัฒนา รายละเอียดและสกิลอาจเปลี่ยนก่อนปล่อยจริง" : "In development. Skills and details may change before release."}</p>
        </div>`;
      grid.appendChild(article);
    });
  }

  function apply() {
    applyRanking();
    insertSpoilerStands();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, {once:true});
  } else {
    apply();
  }
})();
