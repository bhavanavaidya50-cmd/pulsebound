/**
 * PULSEBOUND – Player Entity
 * Responsive platformer physics with coyote time, jump buffering, and sleek animations.
 */

import { GAME_SETTINGS, COLORS } from '../config.js';
import { soundManager } from '../systems/SoundManager.js';

export class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;
    this.speed = GAME_SETTINGS.PLAYER_SPEED;
    this.jumpForce = GAME_SETTINGS.PLAYER_JUMP_FORCE;

    // Platforming feel helpers
    this.coyoteTimeMax = 120; // ms
    this.coyoteTimer = 0;
    this.jumpBufferMax = 140; // ms
    this.jumpBufferTimer = 0;
    this.isInvulnerable = false;
    this.isDead = false;

    // Graphics representation
    this.playerGraphic = scene.add.graphics();
    this.add(this.playerGraphic);

    // Glowing core / visor
    this.coreLight = scene.add.circle(2, -6, 4, COLORS.CYAN, 0.95);
    this.add(this.coreLight);

    // Subtle scarf/trail glow
    this.scarf = scene.add.ellipse(-8, 0, 10, 4, COLORS.MAGENTA, 0.8);
    this.add(this.scarf);

    this.drawPlayer();

    // Enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    this.body.setSize(22, 34);
    this.body.setOffset(-11, -17);
    this.body.setMaxVelocity(320, 680);
    this.body.setCollideWorldBounds(true);

    // Gentle breathing tween when idle
    this.idleTween = scene.tweens.add({
      targets: this.coreLight,
      scaleX: 1.3,
      scaleY: 1.3,
      alpha: 0.6,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
  }

  drawPlayer() {
    this.playerGraphic.clear();

    // Legs / Boots
    this.playerGraphic.fillStyle(0x0f172a, 1);
    this.playerGraphic.fillRect(-7, 7, 5, 10);
    this.playerGraphic.fillRect(2, 7, 5, 10);

    // Torso / Nano-Armor
    this.playerGraphic.fillStyle(0x1e293b, 1);
    this.playerGraphic.fillRoundedRect(-9, -8, 18, 16, 4);

    // Cyan armor trim
    this.playerGraphic.lineStyle(1.5, COLORS.CYAN, 0.8);
    this.playerGraphic.strokeRoundedRect(-9, -8, 18, 16, 4);

    // Helmet
    this.playerGraphic.fillStyle(0x0a0f1d, 1);
    this.playerGraphic.fillCircle(0, -11, 8);

    // Visor rim
    this.playerGraphic.lineStyle(1.5, COLORS.CYAN, 0.9);
    this.playerGraphic.strokeCircle(0, -11, 8);
  }

  handleInput(inputManager, delta) {
    if (this.isDead) return;

    const onGround = this.body.blocked.down || this.body.touching.down;

    // Coyote time tracking
    if (onGround) {
      this.coyoteTimer = this.coyoteTimeMax;
    } else {
      this.coyoteTimer = Math.max(0, this.coyoteTimer - delta);
    }

    // Jump buffering
    if (inputManager.isJumpJustDown()) {
      this.jumpBufferTimer = this.jumpBufferMax;
    } else {
      this.jumpBufferTimer = Math.max(0, this.jumpBufferTimer - delta);
    }

    // Horizontal Movement
    if (inputManager.isLeft()) {
      this.body.setVelocityX(-this.speed);
      this.setScale(-1, 1);
      this.animateRun(true);
    } else if (inputManager.isRight()) {
      this.body.setVelocityX(this.speed);
      this.setScale(1, 1);
      this.animateRun(true);
    } else {
      // Snappy deceleration
      this.body.setVelocityX(this.body.velocity.x * 0.7);
      if (Math.abs(this.body.velocity.x) < 8) this.body.setVelocityX(0);
      this.animateRun(false);
    }

    // Jump Execution with Coyote Time and Jump Buffering
    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
      this.jump();
      this.jumpBufferTimer = 0;
      this.coyoteTimer = 0;
    }

    // Variable jump height: cut jump velocity if player releases jump key early
    if (!inputManager.isJump() && this.body.velocity.y < -120) {
      this.body.setVelocityY(this.body.velocity.y * 0.65);
    }

    // Air animation squash/stretch
    if (!onGround) {
      if (this.body.velocity.y < 0) {
        // Ascending
        this.scarf.setScale(1.2, 0.6);
        this.scarf.y = 4;
      } else {
        // Falling
        this.scarf.setScale(0.8, 1.4);
        this.scarf.y = -2;
      }
    } else {
      this.scarf.setScale(1, 1);
      this.scarf.y = 0;
    }
  }

  jump() {
    this.body.setVelocityY(this.jumpForce);
    soundManager.playJump();

    // Squash & stretch on jump
    this.scene.tweens.add({
      targets: this,
      scaleX: this.scaleX > 0 ? 0.8 : -0.8,
      scaleY: 1.25,
      duration: 120,
      yoyo: true,
      ease: 'Quad.easeOut'
    });

    // Jump dust particles
    if (this.scene.textures.exists('particle_sparkle')) {
      const emitter = this.scene.add.particles(this.x, this.y + 16, 'particle_sparkle', {
        speed: { min: 20, max: 70 },
        scale: { start: 0.4, end: 0 },
        lifespan: 280,
        blendMode: 'ADD',
        quantity: 6,
        tint: COLORS.CYAN
      });
      emitter.setDepth(5);
      this.scene.time.delayedCall(280, () => emitter.destroy());
    }
  }

  animateRun(isRunning) {
    if (isRunning && (this.body.blocked.down || this.body.touching.down)) {
      this.scarf.x = -10 + Math.sin(this.scene.time.now * 0.02) * 3;
    }
  }

  takeDamage(respawnPoint) {
    if (this.isInvulnerable || this.isDead) return false;

    this.isDead = true;
    soundManager.playHurt();

    // Camera shake
    this.scene.cameras.main.shake(250, 0.015);

    // Death particle burst
    if (this.scene.textures.exists('particle_sparkle')) {
      const emitter = this.scene.add.particles(this.x, this.y, 'particle_sparkle', {
        speed: { min: 60, max: 180 },
        scale: { start: 0.8, end: 0 },
        lifespan: 450,
        blendMode: 'ADD',
        quantity: 20,
        tint: [COLORS.MAGENTA, COLORS.RED_ALERT, COLORS.WHITE]
      });
      emitter.setDepth(20);
      this.scene.time.delayedCall(450, () => emitter.destroy());
    }

    this.setVisible(false);
    this.body.setVelocity(0, 0);

    return true;
  }

  respawn(respawnPoint) {
    this.setPosition(respawnPoint.x, respawnPoint.y);
    this.body.setVelocity(0, 0);
    this.setVisible(true);
    this.isDead = false;
    this.isInvulnerable = true;

    // Flashing invulnerability tween
    this.scene.tweens.add({
      targets: this,
      alpha: 0.25,
      duration: 100,
      yoyo: true,
      repeat: 6,
      onComplete: () => {
        this.alpha = 1.0;
        this.isInvulnerable = false;
      }
    });
  }
}
