/**
 * PULSEBOUND – Main Entry Point
 * Initializes Phaser 3 Game instance with all scenes and responsive scaling.
 */

import Phaser from 'phaser';
import { gameConfig } from './config.js';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { LevelCompleteScene } from './scenes/LevelCompleteScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { VictoryScene } from './scenes/VictoryScene.js';

// Assemble scenes in chronological sequence
const config = {
  ...gameConfig,
  scene: [
    BootScene,
    MenuScene,
    GameScene,
    LevelCompleteScene,
    GameOverScene,
    VictoryScene
  ]
};

// Initialize Phaser Game instance
window.addEventListener('DOMContentLoaded', () => {
  const game = new Phaser.Game(config);

  // Resize handler for perfect responsive aspect ratio on mobile & desktop
  window.addEventListener('resize', () => {
    if (game.scale) {
      game.scale.refresh();
    }
  });

  // Suspend/resume cleanly on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (game.sound) game.sound.pauseAll();
    } else {
      if (game.sound) game.sound.resumeAll();
    }
  });
});
