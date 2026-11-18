# Image Assets

PULSEBOUND employs a hybrid procedural rendering pipeline.
High-resolution particle emitters, spike hazard meshes, HUD hearts, and crystal icons are procedurally generated at runtime via the HTML5 Canvas API in `BootScene.js` for zero load latency and zero broken-link risk.

External raster or SVG graphics can be placed in this directory and loaded directly via standard Phaser asset loaders if desired.
