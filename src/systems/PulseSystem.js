/**
 * PULSEBOUND – PulseSystem
 * Manages the energy pulse mechanic, shockwave expansion, and dynamic platform revelation.
 */

import { GAME_SETTINGS, COLORS } from '../config.js';
import { soundManager } from './SoundManager.js';

export class PulseSystem {
  constructor(scene) {
    this.scene = scene;
    this.isReady = true;
    this.cooldownTime = GAME_SETTINGS.PULSE_COOLDOWN;
    this.duration = GAME_SETTINGS.PULSE_DURATION;
    this.lastPulseTime = -this.cooldownTime;
    this.cooldownProgress = 1.0; // 0 to 1 (1 = fully charged)

    this.hiddenPlatforms = [];
    this.activeRipples = [];
  }

  registerPlatform(platform) {
    if (platform.isHiddenPlatform) {
      this.hiddenPlatforms.push(platform);
    }
  }

  clearPlatforms() {
    this.hiddenPlatforms = [];
  }

  canPulse() {
    return this.isReady;
  }

  triggerPulse(playerX, playerY) {
    if (!this.canPulse()) return false;

    this.isReady = false;
    this.lastPulseTime = this.scene.time.now;
    this.cooldownProgress = 0;

    soundManager.playPulse();

    // Trigger visual shockwave wave effect
    this.createShockwave(playerX, playerY);

    // Screen chromatic/flash effect
    this.scene.cameras.main.flash(180, 0, 240, 255, false);

    // Reveal hidden platforms
    this.hiddenPlatforms.forEach((platform) => {
      const dist = Phaser.Math.Distance.Between(playerX, playerY, platform.x, platform.y);
      // Small delay based on wave propagation distance
      const delay = Math.min(dist / 1.4, 400);

      this.scene.time.delayedCall(delay, () => {
        if (platform.active) {
          platform.reveal(this.duration);
        }
      });
    });

    return true;
  }

  createShockwave(x, y) {
    // Expanding neon ring
    const ring = this.scene.add.circle(x, y, 10, 0x00f0ff, 0.4);
    ring.setStrokeStyle(4, 0x00f0ff, 0.9);
    ring.setDepth(15);

    const outerRing = this.scene.add.circle(x, y, 10, 0xec4899, 0.2);
    outerRing.setStrokeStyle(2, 0xa855f7, 0.8);
    outerRing.setDepth(14);

    this.scene.tweens.add({
      targets: ring,
      radius: GAME_SETTINGS.PULSE_RADIUS,
      alpha: 0,
      strokeAlpha: 0,
      duration: 650,
      ease: 'Cubic.easeOut',
      onComplete: () => ring.destroy()
    });

    this.scene.tweens.add({
      targets: outerRing,
      radius: GAME_SETTINGS.PULSE_RADIUS * 1.25,
      alpha: 0,
      strokeAlpha: 0,
      duration: 800,
      ease: 'Quad.easeOut',
      onComplete: () => outerRing.destroy()
    });

    // Particle burst
    if (this.scene.textures.exists('particle_sparkle')) {
      const emitter = this.scene.add.particles(x, y, 'particle_sparkle', {
        speed: { min: 80, max: 260 },
        scale: { start: 0.8, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 550,
        blendMode: 'ADD',
        quantity: 24,
        tint: [COLORS.CYAN, COLORS.PURPLE, COLORS.MAGENTA]
      });
      emitter.setDepth(16);
      this.scene.time.delayedCall(500, () => emitter.destroy());
    }
  }

  update(time, delta) {
    if (!this.isReady) {
      const elapsed = time - this.lastPulseTime;
      this.cooldownProgress = Math.min(1.0, elapsed / this.cooldownTime);

      if (elapsed >= this.cooldownTime) {
        this.isReady = true;
        this.cooldownProgress = 1.0;
      }
    }
  }

  getCooldownRatio() {
    return this.cooldownProgress;
  }
}
