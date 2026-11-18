/**
 * PULSEBOUND – LevelCompleteScene
 * Displays performance metrics, crystal tally, star rating, and Next Level navigation.
 */

import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js';
import { soundManager } from '../systems/SoundManager.js';
import { scoreManager } from '../systems/ScoreManager.js';

export class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelCompleteScene');
  }

  create(data) {
    const { level, crystalsCollected, maxCrystals, elapsedSeconds, levelBonus, totalScore } = data;

    // Background overlay
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x05070e, 0x05070e, 0x0f172a, 0x05070e, 0.95);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Particle celebration
    if (this.textures.exists('particle_sparkle')) {
      this.add.particles(GAME_WIDTH / 2, 100, 'particle_sparkle', {
        speed: { min: 40, max: 150 },
        scale: { start: 0.6, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 1200,
        blendMode: 'ADD',
        quantity: 2,
        frequency: 80,
        tint: [COLORS.CYAN, COLORS.GOLD, COLORS.MAGENTA]
      });
    }

    // Modal Panel
    const panel = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2);

    const frame = this.add.graphics();
    frame.fillStyle(0x0b1120, 0.96);
    frame.fillRoundedRect(-220, -180, 440, 360, 16);
    frame.lineStyle(2, COLORS.CYAN, 0.9);
    frame.strokeRoundedRect(-220, -180, 440, 360, 16);
    panel.add(frame);

    // Title
    const title = this.add.text(0, -140, 'LEVEL COMPLETED!', {
      fontFamily: 'Orbitron',
      fontSize: '24px',
      fontStyle: '900',
      color: '#00f0ff'
    }).setOrigin(0.5);
    panel.add(title);

    // Star rating (1 to 3 stars)
    const starsEarned = (crystalsCollected >= maxCrystals) ? 3 : (crystalsCollected >= Math.ceil(maxCrystals / 2) ? 2 : 1);
    for (let i = 0; i < 3; i++) {
      const star = this.add.text(-40 + i * 40, -100, '★', {
        fontFamily: 'Orbitron',
        fontSize: '32px',
        color: (i < starsEarned) ? '#facc15' : '#334155'
      }).setOrigin(0.5);
      panel.add(star);
    }

    // Stats Grid
    const statLines = [
      { label: 'Crystals Collected:', val: `${crystalsCollected} / ${maxCrystals}` },
      { label: 'Time Elapsed:', val: `${elapsedSeconds}s` },
      { label: 'Level Clear Bonus:', val: `+${levelBonus} PTS` },
      { label: 'Total Score:', val: `${totalScore} PTS` }
    ];

    statLines.forEach((s, idx) => {
      const yPos = -50 + idx * 30;
      const lbl = this.add.text(-170, yPos, s.label, {
        fontFamily: 'Rajdhani',
        fontSize: '16px',
        color: '#94a3b8'
      });
      const val = this.add.text(170, yPos, s.val, {
        fontFamily: 'Orbitron',
        fontSize: '15px',
        fontStyle: 'bold',
        color: idx === 3 ? '#facc15' : '#00f0ff'
      }).setOrigin(1, 0);
      panel.add([lbl, val]);
    });

    // Next Level Button
    const nextBtn = this.createButton(0, 85, 'NEXT LEVEL ➔', () => {
      this.scene.start('GameScene', { level: scoreManager.currentLevel });
    }, true);
    panel.add(nextBtn);

    // Replay Level Button
    const replayBtn = this.createButton(-100, 135, 'REPLAY', () => {
      this.scene.start('GameScene', { level });
    }, false, 140);
    panel.add(replayBtn);

    // Menu Button
    const menuBtn = this.createButton(100, 135, 'MAIN MENU', () => {
      this.scene.start('MenuScene');
    }, false, 140);
    panel.add(menuBtn);
  }

  createButton(x, y, text, onClick, isPrimary = false, width = 300) {
    const btn = this.add.container(x, y);
    const bg = this.add.graphics();
    const h = 38;

    const draw = (hov = false) => {
      bg.clear();
      bg.fillStyle(isPrimary ? (hov ? 0x38bdf8 : 0x00f0ff) : (hov ? 0x334155 : 0x1e293b), 1);
      bg.fillRoundedRect(-width / 2, -h / 2, width, h, 8);
      bg.lineStyle(1.5, isPrimary ? 0xffffff : 0x38bdf8, hov ? 1 : 0.6);
      bg.strokeRoundedRect(-width / 2, -h / 2, width, h, 8);
    };
    draw(false);
    btn.add(bg);

    const lbl = this.add.text(0, 0, text, {
      fontFamily: 'Orbitron',
      fontSize: '12px',
      fontStyle: 'bold',
      color: isPrimary ? '#05070e' : '#f1f5f9'
    }).setOrigin(0.5);
    btn.add(lbl);

    btn.setSize(width, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => { draw(true); btn.setScale(1.03); soundManager.playButtonHover(); });
    btn.on('pointerout', () => { draw(false); btn.setScale(1.0); });
    btn.on('pointerup', () => { soundManager.playButtonClick(); onClick(); });

    return btn;
  }
}
