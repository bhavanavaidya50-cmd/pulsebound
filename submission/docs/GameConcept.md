# PULSEBOUND – The Hidden Path
## Comprehensive Game Concept Document

---

### 1. Executive Summary

- **Title:** PULSEBOUND – The Hidden Path
- **Genre:** 2D Puzzle Platformer / Atmospheric Adventure
- **Platform:** Web Desktop & Mobile Browsers (HTML5 Canvas via Phaser.js 3 & Vite)
- **Target Audience:** Fans of tight indie platformers (*Celeste*, *Limbo*, *Monument Valley*, *Thomas Was Alone*) who enjoy spatial puzzles, rhythmic mechanics, and atmospheric neon aesthetics.
- **Tone:** Mysterious, futuristic, solitary, captivating, and empowering.

---

### 2. Narrative & World Lore

In the forgotten sector of the Quantum Expanse, ancient cyber-structures drift in eternal starlight. Once interconnected by luminous energy corridors, the realm experienced a catastrophic phase collapse, plunging the walkways into phase-shifted darkness.

The player awakens as **The Wanderer**—a cybernetic explorer equipped with a resonant energy core capable of discharging a high-frequency **PULSE**. 

While the surrounding world appears fractured by bottomless chasms and insurmountable drops, the pathways are not destroyed; they are merely invisible to standard light. By gathering dormant **Energy Crystals** and pulsing energy outward, The Wanderer temporarily re-aligns hidden quantum platforms into solid matter, forging a path across the abyss to reach the ancient **Translocation Portals**.

---

### 3. Core Gameplay Loop

```
┌────────────────────────────────────────────────────────┐
│                      SPAWN                             │
│       Player assesses terrain and abyss gaps           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   ACTIVATE PULSE                       │
│    Shockwave ripples out; invisible platforms appear    │
│    Sound chimes; platforms become solid for 4.5s       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               EXECUTE TIMED PLATFORMING                │
│    Run, jump, gather floating Energy Crystals          │
│    Avoid moving Void Creepers and hazard spikes        │
│    Watch platform flicker warning (1.2s before fade)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   REACH EXIT PORTAL                    │
│    Complete level, earn performance stars & bonuses    │
│    Advance to next realm or complete grand trial       │
└────────────────────────────────────────────────────────┘
```

---

### 4. Gameplay Mechanics Breakdown

#### 4.1 Character Controls & Feel
- **Crisp Platformer Physics:**
  - Snappy horizontal velocity (`220 px/s`) with tight deceleration to prevent slippery movement.
  - High jump force (`-430 px/s`) with variable jump height: releasing the jump button early cuts vertical velocity by 35%, granting precision control during narrow leaps.
- **Coyote Time (120ms):**
  - Allows players to execute a jump even for a fraction of a second after slipping off the edge of a platform, eliminating frustrating ledge drops.
- **Jump Buffering (140ms):**
  - If the player presses jump just before touching the ground, the jump executes instantly upon landing.
- **Visual Feedback:**
  - Dynamic energy scarf trails behind the player and bends according to vertical air speed.
  - Squash and stretch tweens trigger upon jumping and landing.

#### 4.2 The Pulse Mechanic (Signature Ability)
- **Activation:** Press `[E]` / `[Shift]` on Desktop or tap the `[PULSE]` virtual button on Mobile.
- **Wave Propagation:** An expanding cyan and magenta shockwave ripples outward up to a 420px radius.
- **Materialization:** Hidden holographic platforms within range illuminate with a neon grid border, emit particle sparkles, and activate physical solid collisions.
- **Temporal Decay & Warning System:**
  - Revealed platforms remain solid for **4.5 seconds**.
  - At **3.3 seconds** (1.2 seconds before expiration), the platform visibly flickers and emits a warning pulse, communicating urgency to the player.
  - At **4.5 seconds**, the platform fades back to a faint ambient outline and becomes intangible.
- **Cooldown & Energy:**
  - 3.0-second recharge cooldown displayed on the HUD energy meter and mobile button glow.

#### 4.3 Collectibles & Scoring
- **Energy Crystals:**
  - Floating 8-faceted diamond gems with pulsing light auras and vertical levitation animations.
  - Each crystal awards **+100 Points** and generates an upward floating score popup with crystalline audio chimes.
- **Performance Rating:**
  - Levels reward 1 to 3 Stars based on crystals collected and time taken.
  - Clean level bonuses (+500 pts) and speed bonuses reward skilled speedrunning.

#### 4.4 Hazards & Enemies
- **Void Creepers (Ground Patrol):**
  - Mechanical crystalline patrols with glowing red sensor eyes that navigate ledges and platforms.
- **Void Sentinels (Floating Aerial Guardians):**
  - Hovering spherical drones with rotating energy rings that patrol vertical and horizontal corridors.
- **Laser Hazard Spikes:**
  - Glowing red energy spikes lining treacherous gaps.
- **Quantum Abyss:**
  - Falling past the world boundaries triggers immediate core dispersion.
- **Health & Lives System:**
  - 3 Lives represented by glowing energy cells on the HUD.
  - Sustaining damage triggers camera shake, core dispersal particles, audio feedback, and safe respawn at the level's start beacon with a brief invulnerability flashing state.
  - Reaching 0 lives triggers the **Quantum Collapse (Game Over)** screen with instant retry options.

---

### 5. Level Progression Structure

1. **Level 1 – Awakening:**
   - Focus: Introduces movement, jump timing, the first pulse bridge puzzle across calm gaps, 3 crystals, and portal navigation.
2. **Level 2 – Shadow Forest:**
   - Focus: Bioluminescent purple aesthetics, introduction of Void Creepers and aerial Sentinels, vertical hidden staircases, mid-air pulse activation, 5 crystals.
3. **Level 3 – The Lost Temple:**
   - Focus: Ancient cyber-sanctuary with moving platforms, multi-tiered hidden structures, laser spike hazards, demanding platforming sequences, 7 crystals, and the climactic victory portal.
