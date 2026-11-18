/**
 * PULSEBOUND – Platform Entity
 * Supports standard platforms and hidden platforms that reveal upon pulse activation.
 */

import { COLORS } from '../config.js';

export class Platform extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, options = {}) {
    super(scene, x, y);

    this.scene = scene;
    this.platformWidth = width;
    this.platformHeight = height;
    this.isHiddenPlatform = !!options.isHidden;
    this.moveRange = options.moveRange || 0;
    this.moveSpeed = options.moveSpeed || 1000;
    this.moveAxis = options.moveAxis || 'x'; // 'x' or 'y'

    this.isRevealed = !this.isHiddenPlatform;
    this.revealTimer = null;
    this.flickerTween = null;

    // Create graphics representation
    this.bgGraphics = scene.add.graphics();
    this.add(this.bgGraphics);

    // Add to scene and enable arcade physics
    scene.add.existing(this);
    scene.physics.add.existing(this, true); // static body initially

    this.drawPlatform();

    if (this.isHiddenPlatform) {
      // Hidden platforms start disabled for collisions
      this.body.checkCollision.none = true;
      this.alpha = 0.12; // faint trace so players see where it might be
    }

    // Set body size
    this.body.setSize(this.platformWidth, this.platformHeight);
    this.body.setOffset(-this.platformWidth / 2, -this.platformHeight / 2);

    // If moving platform, set up tween
    if (this.moveRange > 0) {
      this.setupMovement();
    }
  }

  drawPlatform() {
    this.bgGraphics.clear();
    const w = this.platformWidth;
    const h = this.platformHeight;
    const halfW = -w / 2;
    const halfH = -h / 2;

    if (this.isHiddenPlatform) {
      // Hidden Platform: Futuristic glowing holo-grid
      this.bgGraphics.fillStyle(0x4338ca, 0.4);
      this.bgGraphics.fillRoundedRect(halfW, halfH, w, h, 6);

      this.bgGraphics.lineStyle(2, COLORS.CYAN, 0.9);
      this.bgGraphics.strokeRoundedRect(halfW, halfH, w, h, 6);

      // Inner tech accents
      this.bgGraphics.lineStyle(1, COLORS.MAGENTA, 0.6);
      this.bgGraphics.lineBetween(halfW + 10, 0, halfW + w - 10, 0);

      // Core energy dots
      this.bgGraphics.fillStyle(COLORS.CYAN, 0.9);
      this.bgGraphics.fillCircle(halfW + 12, 0, 3);
      this.bgGraphics.fillCircle(halfW + w - 12, 0, 3);
    } else {
      // Solid Platform: Dark obsidian with neon rim
      this.bgGraphics.fillStyle(COLORS.PLATFORM_SOLID, 0.95);
      this.bgGraphics.fillRoundedRect(halfW, halfH, w, h, 6);

      // Top neon highlight
      this.bgGraphics.fillStyle(COLORS.NEON_BLUE, 0.85);
      this.bgGraphics.fillRect(halfW + 2, halfH, w - 4, 3);

      this.bgGraphics.lineStyle(1.5, 0x38bdf8, 0.6);
      this.bgGraphics.strokeRoundedRect(halfW, halfH, w, h, 6);

      // Side tech notches
      this.bgGraphics.fillStyle(0x64748b, 0.5);
      this.bgGraphics.fillRect(halfW + 6, halfH + 6, 8, h - 12);
      this.bgGraphics.fillRect(halfW + w - 14, halfH + 6, 8, h - 12);
    }
  }

  setupMovement() {
    // Dynamic body for moving platform
    this.scene.physics.world.disable(this);
    this.scene.physics.add.existing(this, false);
    this.body.setImmovable(true);
    this.body.setAllowGravity(false);
    this.body.setSize(this.platformWidth, this.platformHeight);
    this.body.setOffset(-this.platformWidth / 2, -this.platformHeight / 2);

    const tweenConfig = {
      targets: this,
      duration: this.moveSpeed,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    };

    if (this.moveAxis === 'y') {
      tweenConfig.y = this.y + this.moveRange;
    } else {
      tweenConfig.x = this.x + this.moveRange;
    }

    this.scene.tweens.add(tweenConfig);
  }

  reveal(duration = 4500) {
    if (!this.isHiddenPlatform) return;

    if (this.revealTimer) this.revealTimer.remove();
    if (this.flickerTween) this.flickerTween.stop();

    this.isRevealed = true;
    this.body.checkCollision.none = false;

    // Smooth reveal animation
    this.scene.tweens.add({
      targets: this,
      alpha: 1.0,
      scaleX: 1.04,
      scaleY: 1.04,
      duration: 200,
      yoyo: true,
      ease: 'Back.easeOut'
    });

    // Particle sparkle around platform
    if (this.scene.textures.exists('particle_sparkle')) {
      const emitter = this.scene.add.particles(this.x, this.y, 'particle_sparkle', {
        speed: { min: 20, max: 60 },
        scale: { start: 0.5, end: 0 },
        lifespan: 400,
        blendMode: 'ADD',
        quantity: 8,
        tint: COLORS.CYAN
      });
      emitter.setDepth(5);
      this.scene.time.delayedCall(300, () => emitter.destroy());
    }

    // 1.2s before vanishing: flicker warning
    const flickerDelay = Math.max(500, duration - 1200);
    this.scene.time.delayedCall(flickerDelay, () => {
      if (this.isRevealed) {
        this.flickerTween = this.scene.tweens.add({
          targets: this,
          alpha: 0.35,
          duration: 120,
          yoyo: true,
          repeat: 4
        });
      }
    });

    // Fade out and disable collision
    this.revealTimer = this.scene.time.delayedCall(duration, () => {
      this.hide();
    });
  }

  hide() {
    this.isRevealed = false;
    this.body.checkCollision.none = true;

    this.scene.tweens.add({
      targets: this,
      alpha: 0.12,
      duration: 350,
      ease: 'Linear'
    });
  }
}
