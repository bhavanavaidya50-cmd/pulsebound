# PULSEBOUND – The Hidden Path
### 2D Cyber-Ethereal Puzzle Platformer Built with Phaser.js 3 & Vite

![PULSEBOUND Banner](https://img.shields.io/badge/PULSEBOUND-The_Hidden_Path-00f0ff?style=for-the-badge&logo=ghost)
![Phaser 3](https://img.shields.io/badge/Phaser-v3.87-a855f7?style=for-the-badge&logo=html5)
![Vite](https://img.shields.io/badge/Vite-v5.4-ec4899?style=for-the-badge&logo=vite)
![Platforms](https://img.shields.io/badge/Platform-Desktop_%7C_Mobile-3b82f6?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-facc15?style=for-the-badge)

> Developed for the **Xorstack AI & Game Developer Assignment**.  
> A unique, polished, visually attractive, and fully playable HTML5 game prototype showcasing advanced Phaser 3 mechanics, responsive controls, procedural audio/visual pipelines, and AI-assisted engineering.

---

## 🌟 Game Highlights

- **Signature "Pulse" Ability:** Press `[E]` or tap the mobile `[PULSE]` button to emit expanding quantum shockwaves that reveal hidden pathways across lethal chasms.
- **Dynamic Platform Decay:** Revealed platforms remain solid for **4.5 seconds**, with a rapid visual flicker warning 1.2s before vanishing.
- **Celeste-Grade Game Feel:** Engineered with **Coyote Time (120ms)**, **Jump Buffering (140ms)**, and **Variable Jump Heights** for ultra-responsive platforming.
- **3 Progressively Challenging Levels:**
  - **Level 1: Awakening** – Tutorial mechanics, chasm puzzles, and core platforming.
  - **Level 2: Shadow Forest** – Moving Void Creepers, hovering Sentinels, vertical hidden staircases, and bioluminescent aesthetics.
  - **Level 3: The Lost Temple** – Multi-axis moving platforms, laser traps, intricate hidden paths, and climactic victory trial.
- **Zero-Dependency Procedural Audio Engine:** Custom Web Audio API synthesizer generating responsive jump chirps, pulse shockwave sweeps, crystalline pickup arpeggios, hurt glitches, victory fanfares, and looping dark ambient synth chords.
- **Universal Cross-Platform Playability:** Seamless support for desktop keyboards and on-screen glassmorphic mobile touch controls.
- **Indie Art Direction:** Dark obsidian silhouettes juxtaposed against neon cyan, electric violet, magenta flares, floating ambient spores, and camera shake feedback.

---

## 🕹️ Controls Guide

### Desktop Controls

| Action | Primary Key | Secondary Key |
| :--- | :--- | :--- |
| **Move Left** | `A` | `←` (Left Arrow) |
| **Move Right** | `D` | `→` (Right Arrow) |
| **Jump** | `SPACE` | `↑` (Up Arrow) / `W` |
| **Activate Pulse** | `E` | `Shift` |
| **Pause / Resume** | `ESC` | `P` |

*Tester Shortcut:* Click the bottom toggle **"📱 Touch UI: Auto"** to display on-screen virtual buttons for mobile simulation directly on desktop browsers.

### Mobile Touch Controls
- **Left Cluster:** `◀` / `▶` Virtual Directional Buttons.
- **Right Cluster:** `[PULSE]` (Shockwave) & `[JUMP]` (Leap) Buttons.
- **Top Bar:** `⏸` Pause Button.

---

## 📁 Project Architecture

```
PULSEBOUND/
├── index.html                 # Main entry HTML with viewport lock & mobile touch overlay
├── package.json               # Project manifest, scripts, and Phaser/Vite dependencies
├── vite.config.js             # Vite configuration with port 3000 & responsive scaling
├── README.md                  # Complete documentation and setup guide
│
├── src/
│   ├── main.js                # Phaser.Game initialization and lifecycle handlers
│   ├── config.js              # Global constants, physics gravity, and color palettes
│   │
│   ├── scenes/
│   │   ├── BootScene.js           # Procedural canvas asset generator & audio init
│   │   ├── MenuScene.js           # Main menu, starfield, level select & guide modals
│   │   ├── GameScene.js           # Main loop: physics, camera lerp, HUD, pause overlay
│   │   ├── LevelCompleteScene.js  # Performance stats, crystal tally & star rating
│   │   ├── GameOverScene.js       # Quantum collapse state with retry & menu options
│   │   └── VictoryScene.js        # Grand finale celebration with run statistics
│   │
│   ├── entities/
│   │   ├── Player.js          # Player kinematics, coyote time, jump buffer & animations
│   │   ├── Platform.js        # Solid & hidden platforms with decay and flicker timers
│   │   ├── Crystal.js         # Collectible floating gems with particle explosions
│   │   └── Enemy.js           # Moving patrol crawlers and floating void sentinels
│   │
│   ├── systems/
│   │   ├── InputManager.js    # Unified input abstraction (Keyboard + Touch)
│   │   ├── PulseSystem.js     # Shockwave ripple expansion and platform reveal logic
│   │   ├── LevelManager.js    # Data definitions for Levels 1, 2, and 3
│   │   ├── ScoreManager.js    # Score tracking, lives, and high-score persistence
│   │   └── SoundManager.js    # Zero-dependency procedural Web Audio API synth
│   │
│   ├── styles/
│   │   └── style.css          # Cyber-glassmorphism, glowing buttons & mobile layout
│   └── assets/
│       ├── images/            # Image asset directory
│       └── audio/             # Audio asset directory
│
├── docs/
│   ├── GameConcept.md         # Story, lore, core loop, and mechanics breakdown
│   ├── GameResearch.md        # Comparative analysis of Limbo, Celeste & Monument Valley
│   ├── ArtDirection.md        # Color palettes, character design & UI/UX specs
│   ├── AI_Tools_Used.md       # Honest transparency documentation of AI workflows
│   └── GameplayGuide.md       # Step-by-step walkthrough, tips & speedrun strategies
│
└── screenshots/               # Visual captures & gameplay demonstration guide
```

---

## 🚀 Installation & Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended; tested on v22.16.0)
- npm (Version 9 or higher)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Step 3: Production Build & Preview
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Testing & Quality Assurance Verification

The codebase has undergone comprehensive quality checks:
1. **Production Build Validation:** Executed `npm run build` with Vite 5.4; all 23 modules compiled and tree-shaken with zero syntax or packaging errors.
2. **Asset Integrity Check:** 100% self-contained procedural graphics and Web Audio API synthesis ensure **zero 404 network errors** or missing assets.
3. **Controls Verification:** Dual-input pipeline verified for simultaneous keyboard (`WASD` / Arrows) and pointer/touch events.
4. **Physics & Mechanics:** Verified coyote time (120ms), jump buffering (140ms), variable jump height velocity clipping, moving platforms, patrol enemies, and exit portal state triggers.
5. **Level Progression:** Verified seamless transitions:
   - Level 1 ➔ Level Complete Scene ➔ Level 2
   - Level 2 ➔ Level Complete Scene ➔ Level 3
   - Level 3 ➔ Victory Scene with full run statistics.

---

## 📹 Gameplay Demonstration Recording Guide

To record a 1–2 minute gameplay demonstration showcasing all assignment deliverables:

### Recommended Free Tools
- **Windows:** Built-in Xbox Game Bar (`Win + G` ➔ Record) or [OBS Studio](https://obsproject.com/).
- **Mac:** QuickTime Player (`Cmd + Shift + 5` ➔ Record Selected Portion).
- **Chrome / Edge Extension:** Loom or Screenity.

### Recommended 90-Second Recording Routine:
1. **[0:00 - 0:15] Main Menu:**
   - Show animated starfield, glowing title, and audio toggle.
   - Click "SELECT LEVEL" and "HOW TO PLAY" modals.
2. **[0:15 - 0:35] Level 1 (Awakening):**
   - Click "PLAY GAME". Show character movement and jumping.
   - Stop at the chasm: Press `[E]` to demonstrate the glowing expanding Pulse shockwave.
   - Run across the revealed platforms as they flicker and collect the crystals.
   - Enter the swirling exit portal and show the 3-star Level Complete screen.
3. **[0:35 - 0:55] Level 2 (Shadow Forest):**
   - Click "NEXT LEVEL".
   - Demonstrate moving Void Creepers and aerial Sentinels.
   - Show mid-air pulse activation and jumping onto the moving platform.
4. **[0:55 - 1:15] Level 3 (The Lost Temple):**
   - Navigate the multi-tiered cyber-ruins and elevator platforms.
   - Show laser spike avoidance and gather the final crystals.
5. **[1:15 - 1:30] Victory Screen & Touch UI:**
   - Enter the final Core Gateway.
   - Display the Grand Victory Screen with total score and rank.
   - Toggle the "📱 Touch UI" button to showcase the responsive mobile controls layout.

---

## 📄 Submission Documentation Index

Detailed documentation files are available in the [`docs/`](./docs/) directory:
- [📖 Game Concept (`docs/GameConcept.md`)](./docs/GameConcept.md)
- [🔬 Game Research: Limbo, Celeste & Monument Valley (`docs/GameResearch.md`)](./docs/GameResearch.md)
- [🎨 Art Direction & UI/UX System (`docs/ArtDirection.md`)](./docs/ArtDirection.md)
- [🤖 AI Tools Used & Transparency Log (`docs/AI_Tools_Used.md`)](./docs/AI_Tools_Used.md)
- [🎮 Complete Gameplay Guide & Walkthrough (`docs/GameplayGuide.md`)](./docs/GameplayGuide.md)

---

## 📜 License & Acknowledgments

- Developed for the **Xorstack AI & Game Developer Practical Assignment**.
- Built with [Phaser.js 3](https://phaser.io/) & [Vite](https://vitejs.dev/).
- Fonts by [Google Fonts (Orbitron & Rajdhani)](https://fonts.google.com/).
