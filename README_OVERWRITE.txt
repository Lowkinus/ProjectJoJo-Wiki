PROJECT JOJO WIKI — v0.23.0.322 OVERWRITE PATCH
================================================

HOW TO USE
1. Extract this ZIP.
2. Copy everything inside into the ROOT of your ProjectJoJo-Wiki repository.
3. Allow Windows/Git to replace files with the same names.
4. Commit/push normally.

NO PYTHON WAS USED TO BUILD THIS PATCH.

UPDATED WIKI
- assets/hero-ranking.js
  * Current Release moved away from the opening area and now appears before CHANGELOG.
  * Current Core reference: v0.23.0.322.
  * Mastery: LV1 50% -> LV100 120%, ~1,059 Stand kills.
  * Official addon versions: Tusk .248 / Harvest .4.26 / Heaven's Door .2.20 / ATUM .069.
  * Tusk homepage card now uses the real ACT4 art instead of tusk.svg.
  * Tusk can also use the ACT4 art if it appears in the popularity hero ranking.
  * Adds v0.23.0.322 changelog entry.

- assets/stands/tusk-act4.png
  * Real Tusk ACT4 artwork supplied by the mod author.

- assets/tusk-addon-150.png
  * 150x150 transparent Tusk image for Steam Workshop BBCode.

- th/mastery.html / en/mastery.html
  * Current Core changed from .284 to .322.
  * Magician's Red naming updated: Fireball -> Cross Fire; old Cross Fire entry -> Cross Fire Bomb.
  * Mastery/addon versions retained at their current values.

- th/stands/tusk.html / en/stands/tusk.html
  * Replaces tusk.svg with assets/stands/tusk-act4.png.
  * Current Wiki reference updated to Core .322 while keeping minimum compatibility Core .284+.

- th/stands/magicians-red.html / en/stands/magicians-red.html
  * Skill 1: CROSS FIRE / FIRE TRAP.
  * Skill 3: FIRE CONTROL / DETECTOR.
  * Cross Fire Bomb naming kept separate from Cross Fire.

- th/stands/silver-chariot.html / en/stands/silver-chariot.html
  * Documents Armor Off and the v0.23.0.322 dismiss-safe behavior.
  * Armor Off cooldown blocks only Armor Off reactivation, not normal Stand Summon/Dismiss.

UPDATED STEAM TEXT
- STEAM_WORKSHOP_CURRENT.txt
- steam/STEAM_WORKSHOP_PROJECT_JOJO_CURRENT.txt
  * Full current Project JoJo Workshop description ready to copy/paste.
  * Current Release block is placed after STAND LEVELS, not near the top.
  * Core v0.23.0.322 and current addon versions included.
  * Tusk added to Official Addons and uses the new Wiki-hosted 150px image.
  * Magician's Red updated to Cross Fire / Fire Trap / Fire Control / Detector naming.
  * Silver Chariot Armor Off dismiss behavior updated.

- steam/STEAM_OFFICIAL_ADDONS_BLOCKS.txt
  * Tusk added to all cross-promo blocks.

TUSK WORKSHOP LINK NOTE
No explicit Tusk Steam Workshop ID exists in the current Wiki repository/source text used for this patch.
To avoid inventing a wrong ID, the Tusk button currently links to the Tusk Wiki guide.
The other known direct Workshop links remain unchanged:
- ATUM: 3811605058
- HARVEST: 3812032546
- HEAVEN'S DOOR: 3817697288
- PROJECT JOJO CORE: 3807750510
