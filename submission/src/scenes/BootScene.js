/**
 * PULSEBOUND – BootScene
 * Procedurally generates high-resolution textures, particle assets, and initializes audio.
 */

import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js';
import { soundManager } from '../systems/SoundManager.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    // Generate all game textures directly using Canvas/Graphics
    this.generateTextures();

    // Create a stylized loading screen transition
    const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, COLORS.DARK_BG);

    const titleText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, 'PULSEBOUND', {
      fontFamily: 'Orbitron',
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#00f0ff'
    }).setOrigin(0.5);

    const subtitleText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 5, 'INITIALIZING QUANTUM PATHWAYS...', {
      fontFamily: 'Rajdhani',
      fontSize: '16px',
      color: '#a855f7',
      letterSpacing: 2
    }).setOrigin(0.5);

    const progressBarBg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 45, 260, 6, 0x1e293b).setOrigin(0.5);
    const progressBar = this.add.rectangle(GAME_WIDTH / 2 - 130, GAME_HEIGHT / 2 + 45, 0, 6, 0x00f0ff).setOrigin(0, 0.5);

    this.tweens.add({
      targets: progressBar,
      width: 260,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        // Initialize Web Audio on first user interaction or start
        soundManager.init();
        this.scene.start('MenuScene');
      }
    });
  }

  generateTextures() {
    // 1. Particle Sparkle Texture (radial soft glow circle)
    const particleCanvas = this.textures.createCanvas('particle_sparkle', 32, 32);
    const ctx = particleCanvas.getContext();
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.8)');
    grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    particleCanvas.refresh();

    // 2. Neon Spike Hazard Texture
    const spikeCanvas = this.textures.createCanvas('spike_hazard', 36, 20);
    const sCtx = spikeCanvas.getContext();
    sCtx.fillStyle = '#ef4444';
    // Draw 3 sharp neon teeth
    for (let i = 0; i < 3; i++) {
      const sx = i * 12;
      sCtx.beginPath();
      sCtx.moveTo(sx, 20);
      sCtx.lineTo(sx + 6, 0);
      sCtx.lineTo(sx + 12, 20);
      sCtx.closePath();
      sCtx.fill();
    }
    sCtx.strokeStyle = '#fca5a5';
    sCtx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
      const sx = i * 12;
      sCtx.beginPath();
      sCtx.moveTo(sx + 2, 20);
      sCtx.lineTo(sx + 6, 4);
      sCtx.lineTo(sx + 10, 20);
      sCtx.stroke();
    }
    spikeCanvas.refresh();

    // 3. Heart / Life Cell Texture
    const heartCanvas = this.textures.createCanvas('heart_icon', 24, 24);
    const hCtx = heartCanvas.getContext();
    hCtx.fillStyle = '#ec4899';
    hCtx.beginPath();
    hCtx.arc(8, 8, 6, Math.PI, 0, false);
    hCtx.arc(16, 8, 6, Math.PI, 0, false);
    hCtx.lineTo(22, 11);
    hCtx.lineTo(12, 22);
    hCtx.lineTo(2, 11);
    hCtx.closePath();
    hCtx.fill();
    hCtx.strokeStyle = '#f472b6';
    hCtx.lineWidth = 1.5;
    hCtx.stroke();
    heartCanvas.refresh();

    // 4. Crystal HUD Icon
    const cCanvas = this.textures.createCanvas('hud_crystal', 24, 24);
    const cCtx = cCanvas.getContext();
    cCtx.fillStyle = '#00f0ff';
    cCtx.beginPath();
    cCtx.moveTo(12, 2);
    cCtx.lineTo(20, 10);
    cCtx.lineTo(12, 22);
    cCtx.lineTo(4, 10);
    cCtx.closePath();
    cCtx.fill();
    cCtx.fillStyle = '#ffffff';
    cCtx.beginPath();
    cCtx.moveTo(12, 2);
    cCtx.lineTo(20, 10);
    cCtx.lineTo(12, 22);
    cCtx.closePath();
    cCtx.fill();
    cCanvas.refresh();
  }
}
