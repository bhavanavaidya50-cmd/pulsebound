/**
 * PULSEBOUND – Crystal Entity
 * Collectible glowing energy crystals with floating animation and pickup sparkles.
 */

import { COLORS } from '../config.js';
import { soundManager } from '../systems/SoundManager.js';
import { scoreManager } from '../systems/ScoreManager.js';

export class Crystal extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;
    this.isCollected = false;

    // Glowing aura
    this.aura = scene.add.circle(0, 0, 16, COLORS.CYAN, 0.25);
    this.add(this.aura);

    // Crystal sprite or polygon shape
    this.crystalGraphic = scene.add.graphics();
    this.drawCrystal();
    this.add(this.crystalGraphic);

    // Physics
    scene.add.existing(this);
    scene.physics.add.existing(this, true); // static body
    this.body.setSize(24, 28);
    this.body.setOffset(-12, -14);

    // Floating bob animation
    scene.tweens.add({
      targets: this,
      y: y - 8,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Pulsing aura animation
    scene.tweens.add({
      targets: this.aura,
      scaleX: 1.4,
      scaleY: 1.4,
      alpha: 0.1,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  drawCrystal() {
    this.crystalGraphic.clear();

    // 8-faceted diamond
    const points = [
      { x: 0, y: -13 },
      { x: 9, y: -4 },
      { x: 9, y: 4 },
      { x: 0, y: 13 },
      { x: -9, y: 4 },
      { x: -9, y: -4 }
    ];

    // Main body
    this.crystalGraphic.fillStyle(COLORS.CYAN, 0.95);
    this.crystalGraphic.beginPath();
    this.crystalGraphic.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.crystalGraphic.lineTo(points[i].x, points[i].y);
    }
    this.crystalGraphic.closePath();
    this.crystalGraphic.fillPath();

    // Facet highlights
    this.crystalGraphic.fillStyle(0xffffff, 0.8);
    this.crystalGraphic.beginPath();
    this.crystalGraphic.moveTo(0, -13);
    this.crystalGraphic.lineTo(0, 13);
    this.crystalGraphic.lineTo(9, -4);
    this.crystalGraphic.closePath();
    this.crystalGraphic.fillPath();

    this.crystalGraphic.lineStyle(1.5, 0xffffff, 0.9);
    this.crystalGraphic.strokeCircle(0, 0, 3);
  }

  collect() {
    if (this.isCollected) return;
    this.isCollected = true;

    soundManager.playCrystalCollect();
    scoreManager.addCrystal(100);

    // Particle explosion
    if (this.scene.textures.exists('particle_sparkle')) {
      const emitter = this.scene.add.particles(this.x, this.y, 'particle_sparkle', {
        speed: { min: 60, max: 180 },
        scale: { start: 0.8, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 500,
        blendMode: 'ADD',
        quantity: 16,
        tint: [COLORS.CYAN, COLORS.GOLD, COLORS.WHITE]
      });
      emitter.setDepth(20);
      this.scene.time.delayedCall(450, () => emitter.destroy());
    }

    // Floating score text
    const scoreText = this.scene.add.text(this.x, this.y - 10, '+100', {
      fontFamily: 'Orbitron',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#00f0ff'
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: scoreText,
      y: this.y - 35,
      alpha: 0,
      duration: 650,
      onComplete: () => scoreText.destroy()
    });

    // Pickup shrink tween
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      duration: 180,
      ease: 'Back.easeIn',
      onComplete: () => this.destroy()
    });
  }
}
