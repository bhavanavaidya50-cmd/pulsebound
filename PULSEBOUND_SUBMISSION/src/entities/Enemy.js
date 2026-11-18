/**
 * PULSEBOUND – Enemy Entity
 * Moving patrol and floating void enemies with collision detection and animations.
 */

import { COLORS } from '../config.js';

export class Enemy extends Phaser.GameObjects.Container {
  constructor(scene, x, y, options = {}) {
    super(scene, x, y);

    this.scene = scene;
    this.type = options.type || 'patrol'; // 'patrol' or 'floating'
    this.patrolDistance = options.patrolDistance || 140;
    this.speed = options.speed || 60;
    this.startX = x;
    this.startY = y;
    this.direction = 1; // 1 = right, -1 = left

    this.enemyGraphic = scene.add.graphics();
    this.add(this.enemyGraphic);

    // Eye glow
    this.eyeGlow = scene.add.circle(0, -2, 4, COLORS.RED_ALERT, 0.9);
    this.add(this.eyeGlow);

    // Enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    if (this.type === 'floating') {
      this.body.setAllowGravity(false);
      this.body.setSize(26, 26);
      this.body.setOffset(-13, -13);
      this.drawFloatingEnemy();

      // Floating bob tween
      scene.tweens.add({
        targets: this,
        y: y + (options.verticalRange || 30),
        duration: 1400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else {
      // Ground / Patrol Enemy
      this.body.setAllowGravity(true);
      this.body.setSize(28, 28);
      this.body.setOffset(-14, -14);
      this.drawPatrolEnemy();
    }

    // Sinister eye pulsing
    scene.tweens.add({
      targets: this.eyeGlow,
      scaleX: 1.6,
      scaleY: 1.6,
      alpha: 0.4,
      duration: 600,
      yoyo: true,
      repeat: -1
    });
  }

  drawPatrolEnemy() {
    this.enemyGraphic.clear();

    // Dark crystalline body
    this.enemyGraphic.fillStyle(0x1e1b4b, 0.95);
    this.enemyGraphic.fillRoundedRect(-14, -14, 28, 28, 6);

    // Red/Magenta warning spikes
    this.enemyGraphic.fillStyle(COLORS.MAGENTA, 0.85);
    this.enemyGraphic.fillTriangle(-8, -14, 0, -22, 8, -14);

    // Cyber border
    this.enemyGraphic.lineStyle(2, COLORS.MAGENTA, 0.8);
    this.enemyGraphic.strokeRoundedRect(-14, -14, 28, 28, 6);

    // Tread/crawler base
    this.enemyGraphic.fillStyle(0x0f172a, 1);
    this.enemyGraphic.fillRect(-12, 10, 24, 4);
  }

  drawFloatingEnemy() {
    this.enemyGraphic.clear();

    // Geometric drone diamond
    this.enemyGraphic.fillStyle(0x311042, 0.95);
    this.enemyGraphic.fillCircle(0, 0, 14);

    // Orbiting rings
    this.enemyGraphic.lineStyle(1.5, COLORS.MAGENTA, 0.85);
    this.enemyGraphic.strokeCircle(0, 0, 16);

    this.enemyGraphic.lineStyle(1, COLORS.CYAN, 0.6);
    this.enemyGraphic.strokeRect(-12, -12, 24, 24);
  }

  update() {
    if (this.type === 'patrol') {
      // Patrol horizontally
      this.body.setVelocityX(this.speed * this.direction);

      if (this.x >= this.startX + this.patrolDistance) {
        this.direction = -1;
        this.setScale(this.direction, 1);
      } else if (this.x <= this.startX - this.patrolDistance) {
        this.direction = 1;
        this.setScale(this.direction, 1);
      }
    } else if (this.type === 'floating' && this.patrolDistance > 0) {
      // Horizontal floating patrol
      this.body.setVelocityX(this.speed * this.direction);
      if (this.x >= this.startX + this.patrolDistance) {
        this.direction = -1;
      } else if (this.x <= this.startX - this.patrolDistance) {
        this.direction = 1;
      }
    }
  }
}
