# Audio Assets

PULSEBOUND features a dedicated zero-dependency procedural Web Audio API synthesizer (`src/systems/SoundManager.js`).
Sound effects (Pulse sweeps, jump chirps, crystal pickup arpeggios, hazard glitches, victory fanfares) and the atmospheric ambient background drone music are synthesized mathematically in real-time.

Additional audio tracks or sound files (.mp3, .ogg, .wav) can be placed here and loaded in `BootScene.js` as optional overrides.
