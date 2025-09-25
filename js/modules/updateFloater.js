import { ctx, canvas, state } from './state.js';

export function updateFloater() {
  const { floater, coil, waveHeight, waveLength, time } = state;
  const targetY = waveHeight * Math.sin((floater.x / waveLength) + time) + (canvas.height / 2);
  floater.prevY = floater.y;
  floater.y += (targetY - floater.y) * 0.1;
  coil.y = floater.y + 30;

  const radius = floater.width / 2;

  ctx.beginPath();
  ctx.arc(floater.x, floater.y, radius + 2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(floater.x, floater.y, radius, 0, Math.PI * 2);

  const gradient = ctx.createRadialGradient(
    floater.x - radius / 3, floater.y - radius / 3, radius / 10,
    floater.x, floater.y, radius
  );
  gradient.addColorStop(0, '#ff8080');
  gradient.addColorStop(0.8, '#d9534f');
  gradient.addColorStop(1, '#b52b27');

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.strokeStyle = '#b52b27';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(floater.x - radius / 2, floater.y - radius / 2, radius / 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fill();
}
