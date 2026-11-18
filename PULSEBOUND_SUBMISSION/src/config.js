/**
 * PULSEBOUND – Game Configuration & Global Constants
 */

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

export const COLORS = {
  CYAN: 0x00f0ff,
  PURPLE: 0xa855f7,
  MAGENTA: 0xec4899,
  DARK_BG: 0x070913,
  NEON_BLUE: 0x3b82f6,
  GOLD: 0xfacc15,
  WHITE: 0xffffff,
  RED_ALERT: 0xef4444,
  PLATFORM_SOLID: 0x1e293b,
  PLATFORM_HIDDEN: 0x6366f1
};

export const GAME_SETTINGS = {
  PULSE_DURATION: 4500, // Duration in ms hidden platforms stay revealed
  PULSE_COOLDOWN: 3000, // Cooldown in ms between pulses
  PULSE_RADIUS: 420,     // Radius of the pulse wave
  PLAYER_SPEED: 220,
  PLAYER_JUMP_FORCE: -430,
  STARTING_LIVES: 3,
  MAX_LEVELS: 3
};

export const gameConfig = {
  type: typeof Phaser !== 'undefined' ? Phaser.AUTO : 0,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#070913',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 950 },
      debug: false
    }
  },
  scale: {
    mode: typeof Phaser !== 'undefined' ? Phaser.Scale.FIT : 3,
    autoCenter: typeof Phaser !== 'undefined' ? Phaser.Scale.CENTER_BOTH : 1,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  render: {
    pixelArt: false,
    antialias: true
  }
};
