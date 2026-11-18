/**
 * PULSEBOUND – VictoryScene
 * Grand celebration upon completing all three levels of the game.
 */

import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js';
import { soundManager } from '../systems/SoundManager.js';
import { scoreManager } from '../systems/ScoreManager.js';

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super('VictoryScene');
  }

  create(data) {
    soundManager.playVictory();

    // Cosmic gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x0f172a, 0x1e1b4b, 0x070913, 0x0f172a, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Continuous celebration fireworks / sparkle fountain
    if (this.textures.exists('particle_sparkle')) {
      this.add.particles(GAME_WIDTH / 2, GAME_HEIGHT - 40, 'particle_sparkle', {
        x: { min: 80, max: GAME_WIDTH - 80 },
        speedY: { min: -120, max: -280 },
        speedX: { min: -40, max: 40 },
        scale: { start: 0.9, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 1400,
        blendMode: 'ADD',
        quantity: 3,
        frequency: 60,
        tint: [COLORS.CYAN, COLORS.GOLD, COLORS.MAGENTA, 0x38bdf8]
      });
    }

    const panel = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2);

    const frame = this.add.graphics();
    frame.fillStyle(0x0b1120, 0.96);
    frame.fillRoundedRect(-240, -190, 480, 380, 16);
    frame.lineStyle(2, COLORS.GOLD, 0.9);
    frame.strokeRoundedRect(-240, -190, 480, 380, 16);
    panel.add(frame);

    // Glowing victory badge
    const badge = this.add.text(0, -150, '👑 THE HIDDEN PATH RESTORED!', {
      fontFamily: 'Orbitron',
      fontSize: '20px',
      fontStyle: '900',
      color: '#facc15'
    }).setOrigin(0.5);
    panel.add(badge);

    const storyText = this.add.text(0, -115, 'You have mastered the pulse energy and unlocked\nthe ancient secrets of all three realms.', {
      fontFamily: 'Rajdhani',
      fontSize: '15px',
      color: '#cbd5e1',
      align: 'center'
    }).setOrigin(0.5);
    panel.add(storyText);

    // Total stats
    const totalMaxCrystals = 15; // 3 + 5 + 7
    const statLines = [
      { label: 'Total Crystals Collected:', val: `${scoreManager.totalCrystals} / ${totalMaxCrystals} 💎` },
      { label: 'Final Score:', val: `${scoreManager.score} PTS` },
      { label: 'All-Time High Score:', val: `${scoreManager.highScore} PTS` },
      { label: 'Platformer Rank:', val: scoreManager.totalCrystals >= 13 ? '⭐ PULSE MASTER' : '✨ PATHFINDER' }
    ];

    statLines.forEach((s, idx) => {
      const yPos = -60 + idx * 30;
      const lbl = this.add.text(-180, yPos, s.label, {
        fontFamily: 'Rajdhani',
        fontSize: '16px',
        color: '#94a3b8'
      });
      const val = this.add.text(180, yPos, s.val, {
        fontFamily: 'Orbitron',
        fontSize: '14px',
        fontStyle: 'bold',
        color: idx === 1 ? '#facc15' : '#00f0ff'
      }).setOrigin(1, 0);
      panel.add([lbl, val]);
    });

    // Play Again Button
    const playAgainBtn = this.createButton(0, 80, 'PLAY AGAIN', () => {
      scoreManager.startNewGame();
      this.scene.start('GameScene', { level: 1 });
    }, true);
    panel.add(playAgainBtn);

    // Main Menu Button
    const menuBtn = this.createButton(0, 135, 'RETURN TO MAIN MENU', () => {
      this.scene.start('MenuScene');
    });
    panel.add(menuBtn);
  }

  createButton(x, y, text, onClick, isPrimary = false) {
    const btn = this.add.container(x, y);
    const bg = this.add.graphics();
    const w = 260;
    const h = 40;

    const draw = (hov = false) => {
      bg.clear();
      bg.fillStyle(isPrimary ? (hov ? 0xfde047 : 0xfacc15) : (hov ? 0x334155 : 0x1e293b), 1);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
      bg.lineStyle(1.5, isPrimary ? 0xffffff : COLORS.GOLD, hov ? 1 : 0.6);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
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

    btn.setSize(w, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => { draw(true); btn.setScale(1.03); soundManager.playButtonHover(); });
    btn.on('pointerout', () => { draw(false); btn.setScale(1.0); });
    btn.on('pointerup', () => { soundManager.playButtonClick(); onClick(); });

    return btn;
  }
}
