/**
 * PULSEBOUND – GameOverScene
 * High-stakes game over state with retry, new game, and return to menu actions.
 */

import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js';
import { soundManager } from '../systems/SoundManager.js';
import { scoreManager } from '../systems/ScoreManager.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create(data) {
    const level = data.level || scoreManager.currentLevel;

    // Dark reddish gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x18040a, 0x18040a, 0x070204, 0x050102, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Glitch particle sparks
    if (this.textures.exists('particle_sparkle')) {
      this.add.particles(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'particle_sparkle', {
        speed: { min: 20, max: 90 },
        scale: { start: 0.5, end: 0 },
        alpha: { start: 0.7, end: 0 },
        lifespan: 800,
        blendMode: 'ADD',
        quantity: 2,
        tint: [COLORS.RED_ALERT, COLORS.MAGENTA]
      });
    }

    const panel = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2);

    const frame = this.add.graphics();
    frame.fillStyle(0x0c0608, 0.96);
    frame.fillRoundedRect(-200, -150, 400, 300, 14);
    frame.lineStyle(2, COLORS.RED_ALERT, 0.85);
    frame.strokeRoundedRect(-200, -150, 400, 300, 14);
    panel.add(frame);

    const title = this.add.text(0, -110, 'QUANTUM COLLAPSE', {
      fontFamily: 'Orbitron',
      fontSize: '24px',
      fontStyle: '900',
      color: '#ef4444'
    }).setOrigin(0.5);
    panel.add(title);

    const subtitle = this.add.text(0, -80, 'All energy signatures depleted.', {
      fontFamily: 'Rajdhani',
      fontSize: '15px',
      color: '#94a3b8'
    }).setOrigin(0.5);
    panel.add(subtitle);

    const scoreInfo = this.add.text(0, -40, `Final Score: ${scoreManager.score}  |  Reached Level ${level}`, {
      fontFamily: 'Orbitron',
      fontSize: '13px',
      color: '#facc15'
    }).setOrigin(0.5);
    panel.add(scoreInfo);

    // Retry Button
    const retryBtn = this.createButton(0, 10, 'RETRY LEVEL', () => {
      scoreManager.restoreLives();
      this.scene.start('GameScene', { level });
    }, true);
    panel.add(retryBtn);

    // New Game Button
    const newGameBtn = this.createButton(0, 60, 'START NEW GAME', () => {
      scoreManager.startNewGame();
      this.scene.start('GameScene', { level: 1 });
    });
    panel.add(newGameBtn);

    // Main Menu Button
    const menuBtn = this.createButton(0, 110, 'MAIN MENU', () => {
      this.scene.start('MenuScene');
    });
    panel.add(menuBtn);
  }

  createButton(x, y, text, onClick, isPrimary = false) {
    const btn = this.add.container(x, y);
    const bg = this.add.graphics();
    const w = 240;
    const h = 38;

    const draw = (hov = false) => {
      bg.clear();
      bg.fillStyle(isPrimary ? (hov ? 0xf87171 : 0xef4444) : (hov ? 0x271318 : 0x18090d), 1);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
      bg.lineStyle(1.5, isPrimary ? 0xffffff : COLORS.RED_ALERT, hov ? 1 : 0.6);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    };
    draw(false);
    btn.add(bg);

    const lbl = this.add.text(0, 0, text, {
      fontFamily: 'Orbitron',
      fontSize: '12px',
      fontStyle: 'bold',
      color: isPrimary ? '#05070e' : '#f87171'
    }).setOrigin(0.5);
    btn.add(lbl);

    btn.setSize(w, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => { draw(true); btn.setScale(1.03); soundManager.playButtonHover(); });
    btn.on('pointerout', () => { draw(false); btn.setScale(1.0); });
    btn.on('pointerup', () => { soundManager.playButtonClick(); onClick(); });

    return btn;
  }
}
