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
    "echoes-act-3": ["ECHOES ACT 3", "echoes-act-3.webp"]
  };

  function apply() {
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, {once:true});
  } else {
    apply();
  }
})();