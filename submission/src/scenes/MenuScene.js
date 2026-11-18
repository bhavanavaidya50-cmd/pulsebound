/**
 * PULSEBOUND – MenuScene
 * Atmospheric main menu with animated starfield, glowing title, Play button,
 * Level Select modal, How to Play guide, and Audio controls.
 */

import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js';
import { soundManager } from '../systems/SoundManager.js';
import { scoreManager } from '../systems/ScoreManager.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    soundManager.startAmbientMusic();

    // 1. Animated Atmospheric Background
    this.createBackground();

    // 2. Title & Subtitle with glowing pulse
    this.createTitle();

    // 3. Main Menu Buttons
    this.createMenuButtons();

    // 4. Stats & Audio HUD
    this.createHUD();
  }

  createBackground() {
    // Deep sci-fi gradient
    const bgGraphics = this.add.graphics();
    bgGraphics.fillGradientStyle(0x05070e, 0x05070e, 0x161329, 0x070913, 1);
    bgGraphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Floating background energy particles
    if (this.textures.exists('particle_sparkle')) {
      this.add.particles(GAME_WIDTH / 2, GAME_HEIGHT, 'particle_sparkle', {
        x: { min: 0, max: GAME_WIDTH },
        y: GAME_HEIGHT + 20,
        speedY: { min: -20, max: -60 },
        speedX: { min: -15, max: 15 },
        scale: { start: 0.6, end: 0.1 },
        alpha: { start: 0.5, end: 0 },
        lifespan: 8000,
        blendMode: 'ADD',
        frequency: 200,
        tint: [COLORS.CYAN, COLORS.PURPLE, COLORS.NEON_BLUE]
      });
    }

    // Glowing energy grid lines
    const gridGraphics = this.add.graphics();
    gridGraphics.lineStyle(1, 0x1e293b, 0.4);
    for (let x = 0; x < GAME_WIDTH; x += 60) {
      gridGraphics.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 0; y < GAME_HEIGHT; y += 60) {
      gridGraphics.lineBetween(0, y, GAME_WIDTH, y);
    }
  }

  createTitle() {
    // Pulsing energy circle behind title
    const halo = this.add.circle(GAME_WIDTH / 2, 130, 90, COLORS.CYAN, 0.08);
    this.tweens.add({
      targets: halo,
      scaleX: 1.3,
      scaleY: 1.3,
      alpha: 0.02,
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const title = this.add.text(GAME_WIDTH / 2, 120, 'PULSEBOUND', {
      fontFamily: 'Orbitron',
      fontSize: '52px',
      fontStyle: '900',
      color: '#00f0ff',
      stroke: '#05070e',
      strokeThickness: 6,
      shadow: { blur: 25, color: '#00f0ff', fill: true }
    }).setOrigin(0.5);

    const subtitle = this.add.text(GAME_WIDTH / 2, 175, 'THE HIDDEN PATH', {
      fontFamily: 'Orbitron',
      fontSize: '17px',
      letterSpacing: 8,
      color: '#c084fc',
      stroke: '#05070e',
      strokeThickness: 3
    }).setOrigin(0.5);

    // Subtle floating breathing effect
    this.tweens.add({
      targets: [title, subtitle],
      y: '-=4',
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  createMenuButtons() {
    const startY = 265;
    const spacing = 62;

    // Play Game Button
    this.createNeonButton(GAME_WIDTH / 2, startY, 'PLAY GAME', () => {
      soundManager.playButtonClick();
      scoreManager.startNewGame();
      this.scene.start('GameScene', { level: scoreManager.currentLevel });
    }, { primary: true });

    // Level Select Button
    this.createNeonButton(GAME_WIDTH / 2, startY + spacing, 'SELECT LEVEL', () => {
      soundManager.playButtonClick();
      this.showLevelSelectModal();
    });

    // How to Play Button
    this.createNeonButton(GAME_WIDTH / 2, startY + spacing * 2, 'HOW TO PLAY', () => {
      soundManager.playButtonClick();
      this.showHowToPlayModal();
    });
  }

  createNeonButton(x, y, text, onClick, options = {}) {
    const isPrimary = !!options.primary;
    const width = options.width || 240;
    const height = options.height || 48;

    const container = this.add.container(x, y);

    const bg = this.add.graphics();
    const btnColor = isPrimary ? 0x00f0ff : 0x1e293b;
    const textColor = isPrimary ? '#05070e' : '#f1f5f9';

    const drawBtn = (hover = false) => {
      bg.clear();
      if (isPrimary) {
        bg.fillStyle(hover ? 0x38bdf8 : 0x00f0ff, 1);
        bg.fillRoundedRect(-width / 2, -height / 2, width, height, 10);
        bg.lineStyle(2, 0xffffff, hover ? 1 : 0.8);
        bg.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
      } else {
        bg.fillStyle(hover ? 0x334155 : 0x0f172a, 0.85);
        bg.fillRoundedRect(-width / 2, -height / 2, width, height, 10);
        bg.lineStyle(1.5, hover ? 0x00f0ff : 0x64748b, hover ? 0.9 : 0.5);
        bg.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
      }
    };

    drawBtn(false);
    container.add(bg);

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Orbitron',
      fontSize: isPrimary ? '16px' : '14px',
      fontStyle: 'bold',
      color: textColor,
      letterSpacing: 2
    }).setOrigin(0.5);
    container.add(label);

    container.setSize(width, height);
    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => {
      drawBtn(true);
      container.setScale(1.04);
      soundManager.playButtonHover();
    });

    container.on('pointerout', () => {
      drawBtn(false);
      container.setScale(1.0);
    });

    container.on('pointerdown', () => {
      container.setScale(0.96);
    });

    container.on('pointerup', () => {
      container.setScale(1.04);
      onClick();
    });

    return container;
  }

  createHUD() {
    // High Score badge
    const highText = this.add.text(25, 25, `HIGH SCORE: ${scoreManager.highScore}`, {
      fontFamily: 'Orbitron',
      fontSize: '13px',
      color: '#facc15'
    });

    // Audio Mute Toggle Button
    const muteLabel = soundManager.isMuted ? '🔇 AUDIO: OFF' : '🔊 AUDIO: ON';
    const muteBtn = this.add.text(GAME_WIDTH - 25, 25, muteLabel, {
      fontFamily: 'Orbitron',
      fontSize: '12px',
      color: '#94a3b8'
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

    muteBtn.on('pointerover', () => muteBtn.setColor('#00f0ff'));
    muteBtn.on('pointerout', () => muteBtn.setColor('#94a3b8'));
    muteBtn.on('pointerup', () => {
      const isMuted = soundManager.toggleMute();
      muteBtn.setText(isMuted ? '🔇 AUDIO: OFF' : '🔊 AUDIO: ON');
    });

    // Version & developer attribution
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 20, 'PULSEBOUND v1.0.0 • AI & Game Dev Assignment', {
      fontFamily: 'Rajdhani',
      fontSize: '12px',
      color: '#64748b',
      letterSpacing: 1
    }).setOrigin(0.5);
  }

  showLevelSelectModal() {
    const modalBg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.75).setInteractive();
    const panel = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2);

    const frame = this.add.graphics();
    frame.fillStyle(0x0b1120, 0.96);
    frame.fillRoundedRect(-240, -170, 480, 340, 16);
    frame.lineStyle(2, COLORS.CYAN, 0.8);
    frame.strokeRoundedRect(-240, -170, 480, 340, 16);
    panel.add(frame);

    const heading = this.add.text(0, -125, 'SELECT LEVEL', {
      fontFamily: 'Orbitron',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#00f0ff'
    }).setOrigin(0.5);
    panel.add(heading);

    const levels = [
      { id: 1, title: 'LEVEL 1: AWAKENING', desc: 'Tutorial & Hidden Bridge' },
      { id: 2, title: 'LEVEL 2: SHADOW FOREST', desc: 'Void Creepers & Spores' },
      { id: 3, title: 'LEVEL 3: THE LOST TEMPLE', desc: 'Moving Platforms & Traps' }
    ];

    levels.forEach((lvl, idx) => {
      const isUnlocked = lvl.id <= scoreManager.unlockedLevel;
      const yPos = -60 + idx * 65;

      const lvlBtn = this.add.graphics();
      const drawLvl = (hov = false) => {
        lvlBtn.clear();
        lvlBtn.fillStyle(isUnlocked ? (hov ? 0x1e293b : 0x0f172a) : 0x080c14, 0.9);
        lvlBtn.fillRoundedRect(-190, yPos - 22, 380, 48, 8);
        lvlBtn.lineStyle(1.5, isUnlocked ? (hov ? COLORS.CYAN : 0x38bdf8) : 0x334155, 0.6);
        lvlBtn.strokeRoundedRect(-190, yPos - 22, 380, 48, 8);
      };
      drawLvl(false);
      panel.add(lvlBtn);

      const titleTxt = this.add.text(-170, yPos - 12, lvl.title, {
        fontFamily: 'Orbitron',
        fontSize: '13px',
        fontStyle: 'bold',
        color: isUnlocked ? '#ffffff' : '#475569'
      });
      panel.add(titleTxt);

      const descTxt = this.add.text(-170, yPos + 6, isUnlocked ? lvl.desc : '🔒 Locked - Clear previous level', {
        fontFamily: 'Rajdhani',
        fontSize: '12px',
        color: isUnlocked ? '#94a3b8' : '#64748b'
      });
      panel.add(descTxt);

      if (isUnlocked) {
        const hitArea = this.add.zone(0, yPos + 2, 380, 48).setInteractive({ useHandCursor: true });
        hitArea.on('pointerover', () => { drawLvl(true); soundManager.playButtonHover(); });
        hitArea.on('pointerout', () => drawLvl(false));
        hitArea.on('pointerup', () => {
          soundManager.playButtonClick();
          scoreManager.currentLevel = lvl.id;
          this.scene.start('GameScene', { level: lvl.id });
        });
        panel.add(hitArea);
      }
    });

    // Close button
    const closeBtn = this.add.text(0, 130, '✕ CLOSE', {
      fontFamily: 'Orbitron',
      fontSize: '13px',
      color: '#ef4444'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    closeBtn.on('pointerover', () => closeBtn.setColor('#f87171'));
    closeBtn.on('pointerout', () => closeBtn.setColor('#ef4444'));
    closeBtn.on('pointerup', () => {
      soundManager.playButtonClick();
      modalBg.destroy();
      panel.destroy();
    });
    panel.add(closeBtn);
  }

  showHowToPlayModal() {
    const modalBg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.75).setInteractive();
    const panel = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2);

    const frame = this.add.graphics();
    frame.fillStyle(0x0b1120, 0.96);
    frame.fillRoundedRect(-250, -185, 500, 370, 16);
    frame.lineStyle(2, COLORS.PURPLE, 0.8);
    frame.strokeRoundedRect(-250, -185, 500, 370, 16);
    panel.add(frame);

    const heading = this.add.text(0, -145, 'HOW TO PLAY', {
      fontFamily: 'Orbitron',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#c084fc'
    }).setOrigin(0.5);
    panel.add(heading);

    const instructions = [
      '⚡ ENERGY PULSE: Invisible platforms hide in the dark.',
      '   Press [E] (Desktop) or [PULSE] (Mobile) to reveal them.',
      '   Platforms glow and become solid for 4.5s before vanishing!',
      '',
      '💎 CRYSTALS & PORTAL:',
      '   Collect all glowing energy crystals in each level.',
      '   Reach the Neon Exit Portal to advance.',
      '',
      '🎮 CONTROLS:',
      '   • Movement: [A] / [D] or Arrow Keys (Left / Right buttons)',
      '   • Jump: [SPACE] or Up Arrow (Jump button)',
      '   • Energy Pulse: [E] or Shift (Pulse button)',
      '   • Pause: [ESC] or [P] (Pause button)'
    ];

    const bodyText = this.add.text(-215, -110, instructions.join('\n'), {
      fontFamily: 'Rajdhani',
      fontSize: '15px',
      lineSpacing: 5,
      color: '#e2e8f0'
    });
    panel.add(bodyText);

    // Close button
    const closeBtn = this.add.text(0, 150, 'GOT IT ➔', {
      fontFamily: 'Orbitron',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#00f0ff'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    closeBtn.on('pointerover', () => closeBtn.setColor('#38bdf8'));
    closeBtn.on('pointerout', () => closeBtn.setColor('#00f0ff'));
    closeBtn.on('pointerup', () => {
      soundManager.playButtonClick();
      modalBg.destroy();
      panel.destroy();
    });
    panel.add(closeBtn);
  }
}
