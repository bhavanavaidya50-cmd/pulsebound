/**
 * PULSEBOUND – LevelManager
 * Contains detailed map configurations, platforms, hazards, enemies, crystals,
 * and environmental presets for all 3 progressive levels.
 */

export const LEVEL_DATA = {
  1: {
    id: 1,
    title: 'Level 1 – Awakening',
    subtitle: 'Learn the Pulse & Reveal Hidden Pathways',
    worldWidth: 2000,
    worldHeight: 600,
    playerStart: { x: 100, y: 440 },
    theme: {
      bgTop: '#090d21',
      bgBottom: '#020308',
      particleColor: 0x00f0ff,
      fogAlpha: 0.15
    },
    tutorialHints: [
      { x: 120, y: 380, text: 'Move: [A]/[D] or ◀ ▶  |  Jump: [SPACE] or 🡹' },
      { x: 490, y: 350, text: 'A chasm blocks your way...\nPress [E] or [PULSE] to reveal hidden path!' },
      { x: 1100, y: 340, text: 'Platforms fade over time! Watch the flicker!' },
      { x: 1720, y: 360, text: 'Enter the Neon Portal to proceed ➔' }
    ],
    // Solid Ground & Bases
    platforms: [
      // Starting ground
      { x: 180, y: 520, width: 380, height: 40 },
      // First gap edge
      { x: 800, y: 520, width: 220, height: 40 },
      // Stepping ledge
      { x: 1120, y: 450, width: 140, height: 30 },
      // Middle island
      { x: 1360, y: 400, width: 160, height: 30 },
      // Exit portal platform
      { x: 1800, y: 500, width: 340, height: 40 }
    ],
    // Hidden Platforms (Revealed via Pulse)
    hiddenPlatforms: [
      // Bridge across first chasm (between 370 and 690)
      { x: 470, y: 520, width: 130, height: 26 },
      { x: 640, y: 520, width: 130, height: 26 },
      // Stepping stones over second chasm
      { x: 970, y: 480, width: 110, height: 24 },
      // Upper shortcut to crystal
      { x: 1240, y: 330, width: 90, height: 24 },
      // Path toward portal
      { x: 1560, y: 430, width: 120, height: 26 }
    ],
    // Hazards (bottom death zone covers y > 570)
    hazards: [
      // Danger zone spikes
      { x: 400, y: 580, width: 450, height: 24 }
    ],
    // Enemies (Level 1 is introductory, no enemies to allow mastering controls)
    enemies: [],
    // Collectibles (3 Crystals)
    crystals: [
      { x: 550, y: 460 },
      { x: 1240, y: 280 },
      { x: 1560, y: 380 }
    ],
    // Exit Portal
    portal: { x: 1880, y: 440 }
  },

  2: {
    id: 2,
    title: 'Level 2 – Shadow Forest',
    subtitle: 'Bioluminescent Canopy & Void Creepers',
    worldWidth: 2400,
    worldHeight: 650,
    playerStart: { x: 100, y: 480 },
    theme: {
      bgTop: '#0a192f',
      bgBottom: '#030a13',
      particleColor: 0xa855f7,
      fogAlpha: 0.22
    },
    tutorialHints: [
      { x: 180, y: 410, text: 'Beware of Void Creepers! Avoid contact.' },
      { x: 780, y: 300, text: 'Activate Pulse while airborne to chain jumps!' },
      { x: 1450, y: 260, text: 'Time your leap through the sentinel zone.' }
    ],
    // Solid Platforms
    platforms: [
      // Starting ground
      { x: 160, y: 550, width: 320, height: 40 },
      // First elevated hill
      { x: 480, y: 490, width: 180, height: 35 },
      // Forest tree canopy branches
      { x: 920, y: 420, width: 220, height: 30 },
      // High roost
      { x: 1280, y: 320, width: 160, height: 30 },
      // Moving platform in middle
      { x: 1520, y: 440, width: 130, height: 26, moveRange: 140, moveSpeed: 2200, moveAxis: 'x' },
      // Far canopy
      { x: 1880, y: 380, width: 180, height: 30 },
      // Exit platform
      { x: 2240, y: 500, width: 280, height: 40 }
    ],
    // Hidden Platforms
    hiddenPlatforms: [
      // Stairway ascending after first hill
      { x: 670, y: 460, width: 110, height: 24 },
      { x: 790, y: 430, width: 110, height: 24 },
      // Vertical ascent to high crystal
      { x: 1120, y: 360, width: 100, height: 24 },
      // Bridge past moving platform
      { x: 1720, y: 410, width: 110, height: 24 },
      // Final descent staircase to portal
      { x: 2060, y: 440, width: 100, height: 24 }
    ],
    hazards: [
      // Spikes along ground chasms
      { x: 350, y: 620, width: 1800, height: 30 },
      { x: 920, y: 395, width: 40, height: 16, isSpike: true }
    ],
    // Moving enemies
    enemies: [
      // Ground patrol crawler on first hill
      { x: 480, y: 450, type: 'patrol', patrolDistance: 60, speed: 55 },
      // Floating sentinel guarding high canopy
      { x: 1280, y: 270, type: 'floating', patrolDistance: 70, verticalRange: 35, speed: 45 },
      // Floating sentinel over far bridge
      { x: 1880, y: 330, type: 'patrol', patrolDistance: 65, speed: 65 }
    ],
    // Collectibles (5 Crystals)
    crystals: [
      { x: 480, y: 440 },
      { x: 790, y: 380 },
      { x: 1120, y: 310 },
      { x: 1520, y: 370 },
      { x: 2060, y: 390 }
    ],
    portal: { x: 2280, y: 440 }
  },

  3: {
    id: 3,
    title: 'Level 3 – The Lost Temple',
    subtitle: 'Ancient Cyber-Ruins & The Ultimate Pulse Trial',
    worldWidth: 2900,
    worldHeight: 700,
    playerStart: { x: 100, y: 520 },
    theme: {
      bgTop: '#1a0b2e',
      bgBottom: '#04020a',
      particleColor: 0xec4899,
      fogAlpha: 0.28
    },
    tutorialHints: [
      { x: 160, y: 440, text: 'The Temple Sanctuary: Pure platforming mastery.' },
      { x: 800, y: 360, text: 'Moving holo-platforms activate under Pulse!' },
      { x: 1700, y: 250, text: 'Master your Coyote time and air pulses.' },
      { x: 2600, y: 380, text: 'The Core Gateway awaits! Claim victory!' }
    ],
    // Complex platform layout
    platforms: [
      // Starting sanctuary
      { x: 150, y: 580, width: 280, height: 40 },
      // Stepping spire 1
      { x: 420, y: 510, width: 110, height: 30 },
      // High temple ledge
      { x: 680, y: 420, width: 160, height: 30 },
      // Moving vertical elevator platform
      { x: 960, y: 450, width: 110, height: 24, moveRange: -120, moveSpeed: 2000, moveAxis: 'y' },
      // Central temple altar
      { x: 1260, y: 340, width: 200, height: 35 },
      // High floating obelisk
      { x: 1600, y: 290, width: 120, height: 26 },
      // Moving horizontal platform across abyss
      { x: 1900, y: 380, width: 130, height: 26, moveRange: 160, moveSpeed: 2400, moveAxis: 'x' },
      // Far spire
      { x: 2320, y: 460, width: 160, height: 30 },
      // Victory portal platform
      { x: 2720, y: 540, width: 320, height: 45 }
    ],
    // Intricate hidden pulse paths
    hiddenPlatforms: [
      // Ascending staircase to ledge 1
      { x: 550, y: 465, width: 90, height: 22 },
      // Upper secret crystal bridge
      { x: 820, y: 370, width: 90, height: 22 },
      // Bridge from altar to obelisk
      { x: 1430, y: 315, width: 100, height: 22 },
      // Dual hidden stepping stones over abyss
      { x: 1760, y: 340, width: 90, height: 22 },
      { x: 2120, y: 420, width: 90, height: 22 },
      // Final staircase toward victory portal
      { x: 2520, y: 500, width: 110, height: 24 }
    ],
    hazards: [
      // Floor abyss
      { x: 500, y: 680, width: 2400, height: 30 },
      // Temple energy traps on surfaces
      { x: 680, y: 395, width: 36, height: 16, isSpike: true },
      { x: 1260, y: 312, width: 36, height: 16, isSpike: true },
      { x: 2320, y: 435, width: 36, height: 16, isSpike: true }
    ],
    // High-threat patrol & floating guardians
    enemies: [
      { x: 680, y: 380, type: 'patrol', patrolDistance: 50, speed: 65 },
      { x: 1260, y: 260, type: 'floating', patrolDistance: 60, verticalRange: 40, speed: 50 },
      { x: 1600, y: 210, type: 'floating', patrolDistance: 50, verticalRange: 30, speed: 60 },
      { x: 2320, y: 420, type: 'patrol', patrolDistance: 55, speed: 70 }
    ],
    // Collectibles (7 Crystals)
    crystals: [
      { x: 420, y: 460 },
      { x: 820, y: 320 },
      { x: 960, y: 280 },
      { x: 1430, y: 260 },
      { x: 1600, y: 230 },
      { x: 2120, y: 360 },
      { x: 2520, y: 440 }
    ],
    portal: { x: 2780, y: 470 }
  }
};
