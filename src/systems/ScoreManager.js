/**
 * PULSEBOUND – ScoreManager
 * Manages player score, crystals, lives, level progression, and stats persistence.
 */

import { GAME_SETTINGS } from '../config.js';

class ScoreManager {
  constructor() {
    this.score = 0;
    this.totalCrystals = 0;
    this.currentLevelCrystals = 0;
    this.maxLevelCrystals = 0;
    this.currentLevel = 1;
    this.lives = GAME_SETTINGS.STARTING_LIVES;
    this.highScore = 0;
    this.levelStartTime = 0;
    this.unlockedLevel = 1;

    this.loadData();
  }

  loadData() {
    try {
      const savedHigh = localStorage.getItem('pulsebound_highscore');
      if (savedHigh) this.highScore = parseInt(savedHigh, 10) || 0;
      const savedUnlocked = localStorage.getItem('pulsebound_unlocked');
      if (savedUnlocked) this.unlockedLevel = parseInt(savedUnlocked, 10) || 1;
    } catch (e) {}
  }

  saveData() {
    try {
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('pulsebound_highscore', this.highScore.toString());
      }
      if (this.unlockedLevel < this.currentLevel) {
        this.unlockedLevel = this.currentLevel;
        localStorage.setItem('pulsebound_unlocked', this.unlockedLevel.toString());
      }
    } catch (e) {}
  }

  startNewGame() {
    this.score = 0;
    this.totalCrystals = 0;
    this.currentLevel = 1;
    this.lives = GAME_SETTINGS.STARTING_LIVES;
    this.resetLevelStats(0);
  }

  resetLevelStats(maxCrystals = 0) {
    this.currentLevelCrystals = 0;
    this.maxLevelCrystals = maxCrystals;
    this.levelStartTime = Date.now();
  }

  addCrystal(points = 100) {
    this.currentLevelCrystals++;
    this.totalCrystals++;
    this.addScore(points);
  }

  addScore(points) {
    this.score += points;
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }

  loseLife() {
    this.lives--;
    return this.lives <= 0;
  }

  restoreLives() {
    this.lives = GAME_SETTINGS.STARTING_LIVES;
  }

  completeLevel() {
    const elapsedSeconds = Math.max(1, Math.floor((Date.now() - this.levelStartTime) / 1000));
    // Time bonus: fast completion earns extra score
    const timeBonus = Math.max(0, 500 - elapsedSeconds * 5);
    const clearBonus = 500;
    const allCrystalsBonus = (this.currentLevelCrystals >= this.maxLevelCrystals) ? 300 : 0;

    const levelBonus = clearBonus + timeBonus + allCrystalsBonus;
    this.addScore(levelBonus);

    const completedLevel = this.currentLevel;
    if (this.currentLevel < GAME_SETTINGS.MAX_LEVELS) {
      this.currentLevel++;
      if (this.currentLevel > this.unlockedLevel) {
        this.unlockedLevel = this.currentLevel;
      }
    }
    this.saveData();

    return {
      level: completedLevel,
      crystalsCollected: this.currentLevelCrystals,
      maxCrystals: this.maxLevelCrystals,
      elapsedSeconds,
      levelBonus,
      totalScore: this.score
    };
  }
}

export const scoreManager = new ScoreManager();
