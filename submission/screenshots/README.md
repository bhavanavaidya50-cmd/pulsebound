# Screenshots

This folder contains gameplay screenshots captured during the automated Playwright QA session.

## Captured Screenshots

Screenshots were taken at key moments during the automated gameplay test:

| Screenshot | Scene | Description |
|---|---|---|
| `01_title_screen.png` | MenuScene | PULSEBOUND neon title with cyber-gradient background |
| `02_how_to_play.png` | MenuScene | "How To Play" modal with keyboard controls |
| `03_level_select.png` | MenuScene | Level Select showing 3 level cards |
| `04_level1_start.png` | GameScene (L1) | Level 1 "Awakening" – player on starting platform |
| `05_pulse_activated.png` | GameScene (L1) | Pulse wave revealing hidden platforms |
| `06_crystal_collect.png` | GameScene (L1) | Player collecting energy crystal |
| `07_level1_complete.png` | LevelCompleteScene | Level 1 completion screen |
| `08_level2_enemies.png` | GameScene (L2) | Shadow Forest – Void Creepers patrolling |
| `09_level3_lasers.png` | GameScene (L3) | Lost Temple – laser traps active |
| `10_victory_screen.png` | VictoryScene | Final victory screen with total score |
| `11_mobile_ui.png` | GameScene (Mobile) | Touch overlay with D-Pad and action buttons |

## How Screenshots Were Captured

Screenshots were captured automatically using **Playwright 1.58.0** (Chromium) running against the local Vite development server at `http://localhost:3000/pulsebound/`.

For the full gameplay demonstration, see `PULSEBOUND_Gameplay_Demo.mp4` in the submission root.

## Live Game

Play the game live at: https://bhavanavaidya50-cmd.github.io/pulsebound/
