#!/usr/bin/env python3
import json, re, urllib.request
from pathlib import Path

STANDS = [
    "star-platinum","the-world","king-crimson","crazy-diamond","the-hand",
    "killer-queen","silver-chariot","magicians-red","echoes-act-3"
]
OUT = Path("assets/stand-ranking.js")

def parse_num(s):
    s = s.strip().replace(",", "").lower()
    mul = 1
    if s.endswith("k"):
        mul, s = 1000, s[:-1]
    elif s.endswith("m"):
        mul, s = 1000000, s[:-1]
    return int(float(s) * mul)

def read_count(stand):
    url = f"https://hits.sh/lowkinus.github.io/ProjectJoJo-Wiki/stand/{stand}.svg?label=views&style=flat-square"
    req = urllib.request.Request(url, headers={"User-Agent":"ProjectJoJo-Wiki-Ranking/1.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        svg = r.read().decode("utf-8", "replace")

    # Modern shields-style SVG normally exposes `aria-label="views: 123"`.
    m = re.search(r'aria-label="[^"]*?:\s*([0-9][0-9.,]*[kKmM]?)"', svg)
    if m:
        return parse_num(m.group(1))

    # Fallback: inspect SVG text nodes and take the last numeric-looking value.
    values = re.findall(r'>([0-9][0-9.,]*[kKmM]?)<', svg)
    if values:
        return parse_num(values[-1])
    raise RuntimeError(f"Could not parse count for {stand}")

counts = {}
errors = []
for stand in STANDS:
    try:
        counts[stand] = read_count(stand)
    except Exception as e:
        errors.append(f"{stand}: {e}")

if errors:
    raise SystemExit("hits.sh ranking not updated:\n" + "\n".join(errors))

order_index = {s:i for i,s in enumerate(STANDS)}
ranked = sorted(STANDS, key=lambda s: (-counts[s], order_index[s]))
top2 = ranked[:2]

new = "window.PJ_STAND_RANKING=" + json.dumps(top2, separators=(",",":")) + ";\n"

# Avoid a commit every hour just because counts changed. Commit only when the Top 2 order changes.
old = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
if old != new:
    OUT.write_text(new, encoding="utf-8")
    print("Top 2 changed:", top2, {s:counts[s] for s in top2})
else:
    print("Top 2 unchanged:", top2)
