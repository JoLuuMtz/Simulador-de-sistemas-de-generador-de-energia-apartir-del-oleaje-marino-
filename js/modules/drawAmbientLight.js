import { ctx, canvas, state } from './state.js';

export function drawAmbientLight() {
  if (state.energy >= 99) {
    const batteryX = canvas.width - 140;
    const batteryWidth = 100;
    const bulbX = batteryX + batteryWidth / 2;
    const bulbY = 100;

    const lightRadius = 200;
    const gradient = ctx.createRadialGradient(
      bulbX, bulbY, 10,
      bulbX, bulbY, lightRadius
    );
    gradient.addColorStop(0, 'rgba(241, 241, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 150, 0)');

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gradient;
    ctx.fillRect(bulbX - lightRadius, bulbY - lightRadius, lightRadius * 2, lightRadius * 2);
    ctx.globalCompositeOperation = 'source-over';
  }
}
