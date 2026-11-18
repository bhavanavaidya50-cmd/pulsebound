/**
 * PULSEBOUND – GameScene
 * Main gameplay loop: camera parallax, physics, entities, pulse system,
 * collisions, HUD, pause state, and level transitions.
 */

import { GAME_WIDTH, GAME_HEIGHT, COLORS, GAME_SETTINGS } from '../config.js';
import { LEVEL_DATA } from '../systems/LevelManager.js';
import { InputManager } from '../systems/InputManager.js';
import { PulseSystem } from '../systems/PulseSystem.js';
import { soundManager } from '../systems/SoundManager.js';
import { scoreManager } from '../systems/ScoreManager.js';
import { Player } from '../entities/Player.js';
import { Platform } from '../entities/Platform.js';
import { Crystal } from '../entities/Crystal.js';
import { Enemy } from '../entities/Enemy.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.levelId = data.level || scoreManager.currentLevel || 1;
    this.levelData = LEVEL_DATA[this.levelId] || LEVEL_DATA[1];
    this.isPaused = false;
    this.isLevelTransitioning = false;
  }

  create() {
    this.isLevelTransitioning = false;
    this.isPaused = false;

    // Set world and physics bounds
    this.physics.world.setBounds(0, 0, this.levelData.worldWidth, this.levelData.worldHeight);

    // Initialize systems
    this.inputManager = new InputManager(this);
    this.pulseSystem = new PulseSystem(this);
    scoreManager.resetLevelStats(this.levelData.crystals.length);

    // 1. Build Parallax Background
    this.createParallaxBackground();

    // 2. Build World Platforms & Hazards
    this.createPlatforms();

    // 3. Spawn Exit Portal
    this.createPortal();

    // 4. Spawn Player
    this.createPlayer();

    // 5. Spawn Crystals
    this.createCrystals();

    // 6. Spawn Enemies
    this.createEnemies();

    // 7. Render Tutorial Hints & Glyphs
    this.createTutorialHints();

    // 8. Setup Collisions and Overlaps
    this.setupCollisions();

    // 9. Camera Follow Setup
    this.setupCamera();

    // 10. Build HUD Overlay
    this.createHUD();

    // 11. Level Intro Banner
    this.showLevelBanner();

    // Start background music
    soundManager.startAmbientMusic();
  }

  createParallaxBackground() {
    const { worldWidth, worldHeight, theme } = this.levelData;

    // Sky gradient rectangle
    const bgSky = this.add.graphics().setScrollFactor(0);
    bgSky.fillGradientStyle(
      Phaser.Display.Color.HexStringToColor(theme.bgTop).color,
      Phaser.Display.Color.HexStringToColor(theme.bgTop).color,
      Phaser.Display.Color.HexStringToColor(theme.bgBottom).color,
      Phaser.Display.Color.HexStringToColor(theme.bgBottom).color,
      1
    );
    bgSky.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bgSky.setDepth(-10);

    // Parallax distant futuristic silhouettes / pillars
    this.bgSilhouettes = this.add.graphics().setScrollFactor(0.2);
    this.bgSilhouettes.fillStyle(0x0c1322, 0.7);
    this.bgSilhouettes.setDepth(-8);

    for (let x = 0; x < worldWidth; x += 160) {
      const h = 180 + Math.sin(x * 0.05) * 80;
      this.bgSilhouettes.fillRect(x, worldHeight - h, 70, h);
      this.bgSilhouettes.lineStyle(1, theme.particleColor, 0.25);
      this.bgSilhouettes.strokeRect(x, worldHeight - h, 70, h);
    }

    // Mid-ground cyber cables and geometric arches
    this.midGround = this.add.graphics().setScrollFactor(0.5);
    this.midGround.lineStyle(2, 0x1e293b, 0.8);
    this.midGround.setDepth(-6);
    for (let x = 80; x < worldWidth; x += 320) {
      this.midGround.strokeCircle(x, 180, 50);
      this.midGround.lineBetween(x, 0, x, worldHeight);
    }

    // Atmospheric floating spores / dust particles
    if (this.textures.exists('particle_sparkle')) {
      const emitter = this.add.particles(worldWidth / 2, worldHeight / 2, 'particle_sparkle', {
        x: { min: 0, max: worldWidth },
        y: { min: 0, max: worldHeight },
        speedY: { min: -10, max: -30 },
        speedX: { min: -10, max: 10 },
        scale: { start: 0.45, end: 0.1 },
        alpha: { start: 0.4, end: 0 },
        lifespan: 5000,
        blendMode: 'ADD',
        frequency: 250,
        tint: [theme.particleColor, COLORS.CYAN]
      });
      emitter.setDepth(-5);
    }
  }

  createPlatforms() {
    this.solidPlatforms = this.add.group();
    this.hiddenPlatforms = this.add.group();
    this.hazardGroup = this.physics.add.staticGroup();

    // 1. Solid platforms
    this.levelData.platforms.forEach((pData) => {
      const platform = new Platform(this, pData.x, pData.y, pData.width, pData.height, {
        isHidden: false,
        moveRange: pData.moveRange,
        moveSpeed: pData.moveSpeed,
        moveAxis: pData.moveAxis
      });
      this.solidPlatforms.add(platform);
    });

    // 2. Hidden Pulse platforms
    this.levelData.hiddenPlatforms.forEach((pData) => {
      const hiddenPlatform = new Platform(this, pData.x, pData.y, pData.width, pData.height, {
        isHidden: true
      });
      this.hiddenPlatforms.add(hiddenPlatform);
      this.pulseSystem.registerPlatform(hiddenPlatform);
    });

    // 3. Hazards (spikes)
    this.levelData.hazards.forEach((hData) => {
      if (hData.isSpike) {
        const spike = this.hazardGroup.create(hData.x, hData.y, 'spike_hazard').setOrigin(0.5, 1);
        spike.refreshBody();
      } else {
        // Abyss floor hazard trigger
        const abyss = this.add.rectangle(hData.x, hData.y, hData.width, hData.height, 0xff0000, 0);
        this.physics.add.existing(abyss, true);
        this.hazardGroup.add(abyss);
      }
    });
  }

  createPortal() {
    const portalData = this.levelData.portal;
    this.portal = this.add.container(portalData.x, portalData.y);

    // Swirling rings
    const ring1 = this.add.circle(0, 0, 28, COLORS.CYAN, 0.25);
    ring1.setStrokeStyle(3, COLORS.CYAN, 0.9);
    this.portal.add(ring1);

    const ring2 = this.add.circle(0, 0, 18, COLORS.PURPLE, 0.4);
    ring2.setStrokeStyle(2, COLORS.MAGENTA, 0.9);
    this.portal.add(ring2);

    const core = this.add.circle(0, 0, 8, 0xffffff, 0.95);
    this.portal.add(core);

    // Ambient portal rotation
    this.tweens.add({
      targets: ring1,
      scaleX: 1.25,
      scaleY: 0.9,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.tweens.add({
      targets: ring2,
      scaleX: 0.85,
      scaleY: 1.3,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Portal sparkles
    if (this.textures.exists('particle_sparkle')) {
      const emitter = this.add.particles(portalData.x, portalData.y, 'particle_sparkle', {
        speed: { min: 15, max: 45 },
        scale: { start: 0.45, end: 0 },
        alpha: { start: 0.8, end: 0 },
        lifespan: 600,
        blendMode: 'ADD',
        frequency: 100,
        tint: [COLORS.CYAN, COLORS.MAGENTA]
      });
      emitter.setDepth(2);
    }

    // Portal Physics Zone
    this.physics.add.existing(this.portal, true);
    this.portal.body.setSize(44, 60);
    this.portal.body.setOffset(-22, -30);
  }

  createPlayer() {
    const start = this.levelData.playerStart;
    this.player = new Player(this, start.x, start.y);
    this.player.setDepth(10);
    this.spawnPoint = { ...start };
  }

  createCrystals() {
    this.crystalGroup = this.add.group();
    this.levelData.crystals.forEach((cPos) => {
      const crystal = new Crystal(this, cPos.x, cPos.y);
      crystal.setDepth(8);
      this.crystalGroup.add(crystal);
    });
  }

  createEnemies() {
    this.enemyGroup = this.add.group();
    this.levelData.enemies.forEach((eData) => {
      const enemy = new Enemy(this, eData.x, eData.y, eData);
      enemy.setDepth(9);
      this.enemyGroup.add(enemy);
    });
  }

  createTutorialHints() {
    if (!this.levelData.tutorialHints) return;

    this.levelData.tutorialHints.forEach((hint) => {
      const bg = this.add.graphics();
      bg.fillStyle(0x0f172a, 0.75);
      bg.lineStyle(1, COLORS.CYAN, 0.4);

      const text = this.add.text(hint.x, hint.y, hint.text, {
        fontFamily: 'Rajdhani',
        fontSize: '14px',
        fontWeight: '600',
        color: '#94a3b8',
        align: 'center'
      }).setOrigin(0.5);

      const bWidth = text.width + 24;
      const bHeight = text.height + 12;
      bg.fillRoundedRect(hint.x - bWidth / 2, hint.y - bHeight / 2, bWidth, bHeight, 6);
      bg.strokeRoundedRect(hint.x - bWidth / 2, hint.y - bHeight / 2, bWidth, bHeight, 6);
      bg.setDepth(1);
      text.setDepth(2);
    });
  }

  setupCollisions() {
    // Player with solid platforms
    this.physics.add.collider(this.player, this.solidPlatforms);

    // Player with revealed hidden platforms
    this.physics.add.collider(this.player, this.hiddenPlatforms);

    // Enemies with solid platforms
    this.physics.add.collider(this.enemyGroup, this.solidPlatforms);

    // Player with Crystals
    this.physics.add.overlap(this.player, this.crystalGroup, (player, crystal) => {
      crystal.collect();
      this.updateHUD();
    });

    // Player with Hazards (Spikes & Abyss)
    this.physics.add.overlap(this.player, this.hazardGroup, () => {
      this.handlePlayerHit();
    });

    // Player with Enemies
    this.physics.add.overlap(this.player, this.enemyGroup, () => {
      this.handlePlayerHit();
    });

    // Player with Exit Portal
    this.physics.add.overlap(this.player, this.portal, () => {
      this.handleLevelClear();
    });
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, this.levelData.worldWidth, this.levelData.worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(80, 40);
  }

  createHUD() {
    // HUD Container fixed to screen (scrollFactor: 0)
    this.hudContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(100);

    // 1. Health Cells / Hearts
    this.hudHearts = [];
    for (let i = 0; i < GAME_SETTINGS.STARTING_LIVES; i++) {
      const heart = this.add.image(30 + i * 28, 25, 'heart_icon').setScale(1.1);
      this.hudContainer.add(heart);
      this.hudHearts.push(heart);
    }

    // 2. Pulse Energy Gauge
    this.pulseMeterBg = this.add.rectangle(170, 25, 90, 10, 0x1e293b).setOrigin(0, 0.5);
    this.pulseMeterBar = this.add.rectangle(170, 25, 90, 10, COLORS.CYAN).setOrigin(0, 0.5);
    this.pulseMeterBorder = this.add.graphics();
    this.pulseMeterBorder.lineStyle(1.5, COLORS.CYAN, 0.8);
    this.pulseMeterBorder.strokeRoundedRect(168, 19, 94, 12, 3);

    this.pulseLabel = this.add.text(170, 36, '[E] PULSE: READY', {
      fontFamily: 'Orbitron',
      fontSize: '10px',
      color: '#00f0ff'
    });

    this.hudContainer.add([this.pulseMeterBg, this.pulseMeterBar, this.pulseMeterBorder, this.pulseLabel]);

    // 3. Crystal Counter
    this.crystalIcon = this.add.image(330, 25, 'hud_crystal').setScale(0.9);
    this.crystalText = this.add.text(348, 18, `0 / ${this.levelData.crystals.length}`, {
      fontFamily: 'Orbitron',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#00f0ff'
    });
    this.hudContainer.add([this.crystalIcon, this.crystalText]);

    // 4. Score Display
    this.scoreText = this.add.text(GAME_WIDTH - 150, 18, `SCORE: ${scoreManager.score}`, {
      fontFamily: 'Orbitron',
      fontSize: '13px',
      color: '#facc15'
    });
    this.hudContainer.add(this.scoreText);

    // 5. Pause Button
    const pauseBtn = this.add.text(GAME_WIDTH - 30, 18, '⏸', {
      fontFamily: 'Orbitron',
      fontSize: '16px',
      color: '#94a3b8'
    }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });

    pauseBtn.on('pointerover', () => pauseBtn.setColor('#00f0ff'));
    pauseBtn.on('pointerout', () => pauseBtn.setColor('#94a3b8'));
    pauseBtn.on('pointerup', () => this.togglePause());
    this.hudContainer.add(pauseBtn);

    this.updateHUD();
  }

  updateHUD() {
    // Update Lives
    for (let i = 0; i < this.hudHearts.length; i++) {
      this.hudHearts[i].setVisible(i < scoreManager.lives);
    }

    // Update Crystal count
    this.crystalText.setText(`${scoreManager.currentLevelCrystals} / ${this.levelData.crystals.length}`);

    // Update Score
    this.scoreText.setText(`SCORE: ${scoreManager.score}`);
  }

  showLevelBanner() {
    const banner = this.add.container(GAME_WIDTH / 2, 90).setScrollFactor(0).setDepth(90);

    const title = this.add.text(0, 0, this.levelData.title, {
      fontFamily: 'Orbitron',
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#00f0ff',
      stroke: '#05070e',
      strokeThickness: 5
    }).setOrigin(0.5);

    const subtitle = this.add.text(0, 26, this.levelData.subtitle, {
      fontFamily: 'Rajdhani',
      fontSize: '15px',
      color: '#a855f7'
    }).setOrigin(0.5);

    banner.add([title, subtitle]);

    this.tweens.add({
      targets: banner,
      alpha: 0,
      y: 60,
      delay: 2400,
      duration: 800,
      onComplete: () => banner.destroy()
    });
  }

  handlePlayerHit() {
    if (this.player.isInvulnerable || this.player.isDead || this.isLevelTransitioning) return;

    const isGameOver = scoreManager.loseLife();
    this.player.takeDamage(this.spawnPoint);
    this.updateHUD();

    if (isGameOver) {
      soundManager.playGameOver();
      this.time.delayedCall(600, () => {
        this.scene.start('GameOverScene', { level: this.levelId });
      });
    } else {
      // Respawn after short delay
      this.time.delayedCall(450, () => {
        this.player.respawn(this.spawnPoint);
      });
    }
  }

  handleLevelClear() {
    if (this.isLevelTransitioning) return;
    this.isLevelTransitioning = true;

    soundManager.playPortal();
    this.player.body.setVelocity(0, 0);

    // Player absorption into portal animation
    this.tweens.add({
      targets: this.player,
      x: this.portal.x,
      y: this.portal.y,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      duration: 650,
      ease: 'Cubic.easeIn'
    });

    this.cameras.main.fade(700, 0, 240, 255);

    this.time.delayedCall(800, () => {
      const summary = scoreManager.completeLevel();
      if (this.levelId >= GAME_SETTINGS.MAX_LEVELS) {
        this.scene.start('VictoryScene', summary);
      } else {
        this.scene.start('LevelCompleteScene', summary);
      }
    });
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.physics.pause();
      this.showPauseOverlay();
    } else {
      this.physics.resume();
      if (this.pauseOverlay) {
        this.pauseOverlay.destroy();
        this.pauseOverlay = null;
      }
    }
  }

  showPauseOverlay() {
    if (this.pauseOverlay) this.pauseOverlay.destroy();
    this.pauseOverlay = this.add.container(0, 0).setScrollFactor(0).setDepth(200);

    const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.75).setInteractive();
    this.pauseOverlay.add(bg);

    const frame = this.add.graphics();
    frame.fillStyle(0x0b1120, 0.95);
    frame.fillRoundedRect(GAME_WIDTH / 2 - 160, GAME_HEIGHT / 2 - 130, 320, 260, 14);
    frame.lineStyle(2, COLORS.CYAN, 0.8);
    frame.strokeRoundedRect(GAME_WIDTH / 2 - 160, GAME_HEIGHT / 2 - 130, 320, 260, 14);
    this.pauseOverlay.add(frame);

    const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 85, 'GAME PAUSED', {
      fontFamily: 'Orbitron',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#00f0ff'
    }).setOrigin(0.5);
    this.pauseOverlay.add(title);

    // Resume button
    const resumeBtn = this.createPauseBtn(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30, 'RESUME', () => {
      this.togglePause();
    });

    // Restart Level button
    const restartBtn = this.createPauseBtn(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 25, 'RESTART LEVEL', () => {
      this.togglePause();
      this.scene.restart({ level: this.levelId });
    });

    // Main Menu button
    const menuBtn = this.createPauseBtn(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 80, 'MAIN MENU', () => {
      this.togglePause();
      this.scene.start('MenuScene');
    });

    this.pauseOverlay.add([resumeBtn, restartBtn, menuBtn]);
  }

  createPauseBtn(x, y, text, onClick) {
    const btn = this.add.container(x, y);
    const bg = this.add.graphics();
    bg.fillStyle(0x1e293b, 0.9);
    bg.fillRoundedRect(-100, -18, 200, 36, 6);
    bg.lineStyle(1.5, 0x38bdf8, 0.6);
    bg.strokeRoundedRect(-100, -18, 200, 36, 6);
    btn.add(bg);

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Orbitron',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#f1f5f9'
    }).setOrigin(0.5);
    btn.add(label);

    btn.setSize(200, 36);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(0x334155, 1);
      bg.fillRoundedRect(-100, -18, 200, 36, 6);
      bg.lineStyle(1.5, COLORS.CYAN, 0.9);
      bg.strokeRoundedRect(-100, -18, 200, 36, 6);
      btn.setScale(1.03);
    });

    btn.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x1e293b, 0.9);
      bg.fillRoundedRect(-100, -18, 200, 36, 6);
      bg.lineStyle(1.5, 0x38bdf8, 0.6);
      bg.strokeRoundedRect(-100, -18, 200, 36, 6);
      btn.setScale(1.0);
    });

    btn.on('pointerup', () => {
      soundManager.playButtonClick();
      onClick();
    });

    return btn;
  }

  update(time, delta) {
    if (this.isPaused) return;

    // Check pause input
    if (this.inputManager.isPauseJustDown()) {
      this.togglePause();
      return;
    }

    // Pulse activation check
    if (this.inputManager.isPulseJustDown()) {
      this.pulseSystem.triggerPulse(this.player.x, this.player.y);
    }

    // Update pulse cooldown bar & label
    this.pulseSystem.update(time, delta);
    const ratio = this.pulseSystem.getCooldownRatio();
    this.pulseMeterBar.width = 90 * ratio;

    if (this.pulseSystem.canPulse()) {
      this.pulseMeterBar.fillColor = COLORS.CYAN;
      this.pulseLabel.setText('[E] PULSE: READY');
      this.pulseLabel.setColor('#00f0ff');
    } else {
      this.pulseMeterBar.fillColor = 0x64748b;
      this.pulseLabel.setText('[E] CHARGING...');
      this.pulseLabel.setColor('#94a3b8');
    }

    // Player movement
    this.player.handleInput(this.inputManager, delta);

    // Fall into abyss check
    if (this.player.y > this.levelData.worldHeight + 20) {
      this.handlePlayerHit();
    }

    // Update enemies
    this.enemyGroup.getChildren().forEach((enemy) => enemy.update());
  }
}
