# PULSEBOUND – Player & Reviewer Gameplay Guide

---

## 1. Quick Start Guide

### Launching the Game
1. Open your terminal in the project directory.
2. Run `npm install` (if dependencies are not yet installed).
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the local URL in your browser: `http://localhost:3000` (or the port displayed by Vite).
5. Click **PLAY GAME** on the main menu to begin your journey.

---

## 2. Control Schemes

### Desktop Controls

| Action | Primary Key | Secondary Key |
| :--- | :--- | :--- |
| **Move Left** | `A` | Left Arrow (`←`) |
| **Move Right** | `D` | Right Arrow (`→`) |
| **Jump** | `SPACE` | Up Arrow (`↑`) / `W` |
| **Activate Pulse** | `E` | `Shift` |
| **Pause Game** | `ESC` | `P` |

*Pro-Tip for Desktop Testers:* Click the **"📱 Touch UI: Auto"** button at the bottom center of the screen to display on-screen mobile controls for touch/mouse testing on desktop.

### Mobile Touch Controls
- **Left D-Pad (Bottom-Left):**
  - `◀` Button: Run Left
  - `▶` Button: Run Right
- **Right Action Cluster (Bottom-Right):**
  - **PULSE Button (Pink Glow):** Expands the energy wave to reveal hidden platforms.
  - **JUMP Button (Purple Glow):** Leaps into the air.
- **Top-Right Pause Button:**
  - `⏸` Button: Instantly toggles the pause menu.

---

## 3. Core Mechanics & Systems Walkthrough

### 3.1 The Pulse Ability
- When you encounter an impassable chasm, press `[E]` or tap `[PULSE]`.
- An expanding shockwave will illuminate invisible platforms.
- **Duration:** Platforms remain solid for **4.5 seconds**.
- **The Flicker Warning:** At 3.3 seconds, platforms begin to strobe rapidly. This is your cue to reach solid ground immediately before they dematerialize!
- **Cooldown:** The Pulse meter recharges in **3.0 seconds**. The HUD indicates `[E] PULSE: READY` when charged.

### 3.2 Dynamic Jump Physics
- **Short Hop vs. Full Jump:** Tap jump briefly for a controlled low hop; hold jump down for maximum height.
- **Coyote Time:** If you run off the edge of a platform, you still have ~120ms to press jump in mid-air and recover.
- **Mid-Air Pulse:** You can activate the pulse while jumping to reveal platforms directly beneath you!

### 3.3 Lives & Scoring
- You start with **3 Energy Cells (Lives)**.
- Colliding with enemies, hazard spikes, or falling into the abyss expends 1 life and respawns you safely with temporary invulnerability.
- **Scoring Breakdown:**
  - Crystal Collected: **+100 Points**
  - Level Clear Bonus: **+500 Points**
  - Time Bonus: Up to **+500 Points** (decreases by 5 pts/second)
  - All Crystals Collected Bonus: **+300 Points**
- Complete a level with all crystals and fast times to earn **3 Stars (★★★)**!

---

## 4. Level-by-Level Walkthrough

### Level 1 – Awakening
- **Objective:** Master basic movement, learn the pulse rhythm, gather 3 crystals, and enter the exit portal.
- **Walkthrough:**
  1. Move right using `[D]` or `[→]`. Jump over the small starting gaps.
  2. At the large chasm (near the tutorial sign), press `[E]` to trigger the Pulse.
  3. Two hidden platforms will illuminate across the abyss. Jump across before they vanish.
  4. Collect **Crystal 1** hovering over the bridge.
  5. Scale the elevated ledges to reach **Crystal 2** high in the air.
  6. Pulse once more to reveal the stepping path to **Crystal 3** and enter the swirling Neon Exit Portal.

### Level 2 – Shadow Forest
- **Objective:** Navigate the bioluminescent canopy, evade moving Void Creepers and Sentinels, collect 5 crystals.
- **Walkthrough:**
  1. Ascend the first hill. Watch for the patrolling **Void Creeper**; wait until it turns away before leaping.
  2. Collect **Crystal 1** above the creeper.
  3. Activate Pulse to reveal a vertical staircase of hidden platforms leading up to the canopy.
  4. Collect **Crystal 2** and **Crystal 3** on the high roosts while avoiding the hovering **Void Sentinel**.
  5. Time your jump onto the horizontally moving platform over the deep spike chasm to grab **Crystal 4**.
  6. Pulse to uncover the descending staircase, snag **Crystal 5**, and step into the exit portal.

### Level 3 – The Lost Temple
- **Objective:** The ultimate test of platforming mastery. Moving platforms, laser traps, aggressive sentinels, 7 crystals.
- **Walkthrough:**
  1. Leap across the sanctuary spires to collect **Crystal 1**.
  2. Pulse while airborne to reveal the secret upper bridge leading to **Crystal 2**.
  3. Ride the vertical elevator platform upward to grab **Crystal 3**.
  4. Leap onto the central altar, carefully avoiding the laser spike traps and the patrolling temple guardian.
  5. Pulse to bridge the gap between the altar and the high floating obelisk to collect **Crystals 4 & 5**.
  6. Ride the horizontal abyss platform while timing pulses to grab **Crystal 6**.
  7. Reveal the final grand staircase, secure **Crystal 7**, and enter the Core Gateway to trigger the **Victory Scene**!

---

## 5. Reviewer & Speedrun Tips

1. **Air-Pulsing:** Don't wait until you're on the ledge—pulse just as you jump so the platforms are fully solid by the time you reach your peak.
2. **Watch the Cooldown Meter:** Look at the blue bar next to your health cells to anticipate exactly when your next pulse is ready.
3. **Sound Cues:** Listen for the pitch changes. The pulse makes a deep rumble that sweeps high, while crystals produce musical arpeggios that confirm collection.
