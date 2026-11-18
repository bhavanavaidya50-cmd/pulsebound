# PULSEBOUND – Art Direction & UI/UX Design System

---

## 1. Visual Theme & Creative Philosophy

**Theme:** *Cyber-Ethereal / Dark Futuristic Fantasy*

PULSEBOUND is set in a fractured world suspended between physical reality and phase-shifted quantum dimensions. The visual language avoids generic browser-game tropes, striving instead for the atmospheric polish of an indie darling (*Hyper Light Drifter*, *Solar Ash*, *Risk of Rain*).

### Core Aesthetic Pillars:
1. **High Contrast Luminescence:** Stark, dark obsidian silhouettes contrasted against hyper-saturated neon glows (cyan, violet, and magenta).
2. **Atmospheric Depth:** Multi-layered parallax backgrounds featuring distant monolithic ruins, floating starlight motes, and volumetric fog gradients.
3. **Kinetic Particle Systems:** Every interaction—pulsing, jumping, collecting crystals, or stepping on fading platforms—emits luminous additive particles.
4. **Futuristic Glassmorphic UI:** Sleek, translucent dark panels with glowing borders and sharp typography that feels integral to the cyber-world.

---

## 2. Color Palette & Lighting Hierarchy

```
Deep Void (Background Base):     #05070e   ■  Primary canvas darkness
Abyssal Navy (Sky Top):          #0a192f   ■  Deep night atmospheric gradient
Quantum Purple (Secondary Base): #1e1b4b   ■  Shadow Forest & temple background
Neon Cyan (Primary Energy):      #00f0ff   ■  Player visor, pulse ring, crystals
Magenta / Violet (Pulse Flare):  #ec4899   ■  Pulse secondary wave, player scarf
Electric Violet (Holo-Grid):     #a855f7   ■  Hidden platform holo-matrix
Solar Gold (Scores & Stars):     #facc15   ■  Score counters, victory star badges
Hazard Crimson (Danger):         #ef4444   ■  Spikes, enemy sensor eyes, collapse
```

### Lighting & Shading Model
- **Additive Blending (`BLEND_MODES.ADD`):** Used on shockwave rings, crystal auras, and jump dust to simulate glowing light emission without expensive post-processing overhead.
- **Dynamic Camera Flashes:** When the player activates a pulse, the main camera renders a subtle, rapid white/cyan flash (180ms), imparting tangible physical impact to the energy release.
- **Screen Shake Feedback:** Sustaining damage triggers a crisp 250ms camera shake (`shake(250, 0.015)`) delivering instantaneous physical consequence.

---

## 3. Character Design: "The Wanderer"

- **Visual Concept:** A solitary cybernetic scout traversing decayed spatial corridors.
- **Silhouette & Proportions:**
  - Compact, agile 22x34px bounding frame for precision platforming readability.
  - Dark slate obsidian nano-armor with neon cyan edge trimming.
  - Spherical helmet with a luminescent cyan visor that bobs and breathes during idle states.
  - **The Kinetic Energy Scarf:** A flowing magenta tail attached to the back of the player that dynamically squashes and stretches based on velocity (stretches vertically when ascending, flares outward horizontally when descending or running).
- **Animation States:**
  - *Idle:* Gentle sine-wave breathing on the core visor light.
  - *Run:* Horizontal scarf oscillation and subtle lean into the direction of movement.
  - *Jump:* Instant squash-and-stretch tween (`scaleX: 0.8, scaleY: 1.25`) with emitting jump dust particles.
  - *Pulse Release:* Momentary radial flash and energy burst from the character's center.
  - *Core Dispersal (Hit/Death):* Particle burst scattering into red/magenta embers followed by an invulnerability strobe flash on respawn.

---

## 4. Environmental Art Direction (Biomes)

### Level 1: Awakening (The Calcite Chasm)
- **Palette:** Obsidian black, Deep Space Indigo (`#090d21`), and Neon Cyan (`#00f0ff`).
- **Environment:** Clean geometric monoliths, starry void background, gentle floating dust motes.
- **Feel:** Pristine, quiet, expansive; designed to focus player attention on the newly discovered Pulse mechanic.

### Level 2: Shadow Forest (The Bioluminescent Canopy)
- **Palette:** Dark Midnight Teal (`#0a192f`), Bioluminescent Purple (`#a855f7`), and Magenta.
- **Environment:** Spore-filled air, towering branch-like silhouettes, moving organic cyber-creepers with pulsating red eyes.
- **Feel:** Mysterious, organic, treacherous; heightened verticality and moving platforms across bottomless canopies.

### Level 3: The Lost Temple (The Quantum Core)
- **Palette:** Imperial Violet (`#1a0b2e`), Cosmic Black (`#04020a`), and Solar Gold (`#facc15`).
- **Environment:** Floating geometric cyber-obelisks, ancient power conduits, moving laser elevators, and hovering Sentinels.
- **Feel:** Climactic, sacred, mechanically intricate; demanding mastery of air-pulsing and jump momentum.

---

## 5. UI/UX & Glassmorphism Design System

### 5.1 Typography
- **Display Font:** `Orbitron` (Google Fonts) – Futuristic, geometric, wide letter-spacing. Used for game titles, buttons, score displays, and level banners.
- **Body & Subtitle Font:** `Rajdhani` (Google Fonts) – Technical, legible, clean proportions. Used for tutorial prompts, stats cards, and story excerpts.

### 5.2 HUD Components
- **Health Indicator:** 3 glowing pink/magenta energy cells with glowing outlines.
- **Pulse Readiness Gauge:** Horizontal gauge with real-time recharge fill and contextual label:
  - `[E] PULSE: READY` in bright cyan when charged.
  - `[E] CHARGING...` in muted slate during cooldown.
- **Crystal Tracker:** High-contrast `hud_crystal` icon accompanied by progress counter (`💎 2 / 5`).
- **Score Readout:** Amber gold score counter positioned in the upper right.

### 5.3 On-Screen Mobile Controls (Responsive Touch UI)
- Glassmorphic circular action pads (`backdrop-filter: blur(8px)`) with glowing cyan and purple borders.
- Left / Right directional cluster positioned on the lower left.
- Jump and Pulse buttons clustered on the lower right, sized generously (68px – 76px) with distinct colors to eliminate input errors.
- Visual touch response: Instant scale down (`0.92`) and luminous border highlight upon contact.
