import { ctx, canvas, state } from './state.js';
import { drawClouds } from './drawClouds.js';

export function drawWave() {
  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawClouds();

  const waterLevel = canvas.height / 2;
  const gradient = ctx.createLinearGradient(0, waterLevel - state.waveHeight, 0, canvas.height);
  gradient.addColorStop(0, '#0077BE');
  gradient.addColorStop(0.3, '#006994');
  gradient.addColorStop(0.7, '#004D71');
  gradient.addColorStop(1, '#00364F');

  ctx.beginPath();
  ctx.moveTo(0, waterLevel);

  for (let x = 0; x < canvas.width; x += 5) {
    const y = state.waveHeight * Math.sin((x / state.waveLength) + state.time)
      + (state.waveHeight / 2) * Math.sin((x / (state.waveLength / 2)) + state.time * 1.5)
      + (state.waveHeight / 4) * Math.sin((x / (state.waveLength / 4)) + state.time * 2)
      + waterLevel;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.fill();
}
