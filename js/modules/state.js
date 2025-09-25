// Estado y referencias compartidas entre módulos
export const canvas = document.getElementById('waveCanvas');
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 400;

export const state = {
  time: 0,
  energy: 0,
  maxEnergy: 100,
  waveHeight: 30,
  waveLength: 100,
  waveSpeed: 0.05,
  offset: 0,
  isWaveActive: false,
  floater: { x: canvas.width / 2, y: canvas.height / 2, width: 40, height: 20, prevY: 0 },
  coil: { x: canvas.width / 2, y: canvas.height / 2 + 30, width: 10, height: 30 },
  battery: { x: canvas.width - 140, y: 340, width: 100, height: 30 },
};
