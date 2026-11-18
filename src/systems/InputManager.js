/**
 * PULSEBOUND – InputManager
 * Unified input abstraction supporting Keyboard and On-Screen Mobile Touch Controls.
 */

export class InputManager {
  constructor(scene) {
    this.scene = scene;

    // Internal states
    this.keys = {};
    this.touchState = {
      left: false,
      right: false,
      jump: false,
      jumpJustDown: false,
      pulseJustDown: false,
      pauseJustDown: false
    };

    this.mobileControlsVisible = false;
    this.setupKeyboard();
    this.setupTouchControls();
  }

  setupKeyboard() {
    if (!this.scene.input || !this.scene.input.keyboard) return;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keys = this.scene.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      W: Phaser.Input.Keyboard.KeyCodes.W,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      UP: Phaser.Input.Keyboard.KeyCodes.UP,
      E: Phaser.Input.Keyboard.KeyCodes.E,
      ESC: Phaser.Input.Keyboard.KeyCodes.ESC,
      P: Phaser.Input.Keyboard.KeyCodes.P
    });
  }

  setupTouchControls() {
    const mobileControlsEl = document.getElementById('mobile-controls');
    const toggleBtn = document.getElementById('btn-toggle-touch');

    // Auto-detect mobile touch support
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice && mobileControlsEl) {
      mobileControlsEl.classList.remove('hidden');
      this.mobileControlsVisible = true;
    }

    // Toggle button for testing mobile controls on desktop
    if (toggleBtn && !toggleBtn.hasAttribute('data-bound')) {
      toggleBtn.setAttribute('data-bound', 'true');
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleTouchControls();
      });
    }

    // Bind touch/pointer buttons
    this.bindButton('btn-left', (pressed) => { this.touchState.left = pressed; });
    this.bindButton('btn-right', (pressed) => { this.touchState.right = pressed; });
    this.bindButton('btn-jump', (pressed) => {
      if (pressed && !this.touchState.jump) {
        this.touchState.jumpJustDown = true;
      }
      this.touchState.jump = pressed;
    });
    this.bindButton('btn-pulse', (pressed) => {
      if (pressed) {
        this.touchState.pulseJustDown = true;
      }
    });
    this.bindButton('btn-mobile-pause', (pressed) => {
      if (pressed) {
        this.touchState.pauseJustDown = true;
      }
    });
  }

  bindButton(elementId, callback) {
    const btn = document.getElementById(elementId);
    if (!btn || btn.hasAttribute('data-bound')) return;
    btn.setAttribute('data-bound', 'true');

    const handlePress = (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.add('active');
      callback(true);
    };

    const handleRelease = (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.remove('active');
      callback(false);
    };

    btn.addEventListener('pointerdown', handlePress, { passive: false });
    btn.addEventListener('pointerup', handleRelease, { passive: false });
    btn.addEventListener('pointercancel', handleRelease, { passive: false });
    btn.addEventListener('pointerleave', handleRelease, { passive: false });
  }

  toggleTouchControls() {
    const mobileControlsEl = document.getElementById('mobile-controls');
    const toggleBtn = document.getElementById('btn-toggle-touch');
    if (!mobileControlsEl) return;

    this.mobileControlsVisible = !this.mobileControlsVisible;
    if (this.mobileControlsVisible) {
      mobileControlsEl.classList.remove('hidden');
      if (toggleBtn) toggleBtn.textContent = '📱 Touch UI: ON';
    } else {
      mobileControlsEl.classList.add('hidden');
      if (toggleBtn) toggleBtn.textContent = '📱 Touch UI: OFF';
    }
  }

  isLeft() {
    const keyLeft = (this.cursors && this.cursors.left && this.cursors.left.isDown) ||
                    (this.keys.A && this.keys.A.isDown);
    return keyLeft || this.touchState.left;
  }

  isRight() {
    const keyRight = (this.cursors && this.cursors.right && this.cursors.right.isDown) ||
                     (this.keys.D && this.keys.D.isDown);
    return keyRight || this.touchState.right;
  }

  isJump() {
    const keyJump = (this.cursors && this.cursors.up && this.cursors.up.isDown) ||
                    (this.keys.W && this.keys.W.isDown) ||
                    (this.keys.SPACE && this.keys.SPACE.isDown);
    return keyJump || this.touchState.jump;
  }

  isJumpJustDown() {
    const keyJump = (this.cursors && Phaser.Input.Keyboard.JustDown(this.cursors.up)) ||
                    (this.keys.W && Phaser.Input.Keyboard.JustDown(this.keys.W)) ||
                    (this.keys.SPACE && Phaser.Input.Keyboard.JustDown(this.keys.SPACE));
    const touchJump = this.touchState.jumpJustDown;
    this.touchState.jumpJustDown = false;
    return keyJump || touchJump;
  }

  isPulseJustDown() {
    const keyPulse = (this.keys.E && Phaser.Input.Keyboard.JustDown(this.keys.E));
    const touchPulse = this.touchState.pulseJustDown;
    this.touchState.pulseJustDown = false;
    return keyPulse || touchPulse;
  }

  isPauseJustDown() {
    const keyPause = (this.keys.ESC && Phaser.Input.Keyboard.JustDown(this.keys.ESC)) ||
                     (this.keys.P && Phaser.Input.Keyboard.JustDown(this.keys.P));
    const touchPause = this.touchState.pauseJustDown;
    this.touchState.pauseJustDown = false;
    return keyPause || touchPause;
  }
}
