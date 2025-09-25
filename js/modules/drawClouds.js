import { ctx, canvas, state } from './state.js';

export function drawClouds() {
  // Definir las nubes (posiciones fijas)
  const clouds = [
    { x: 100, y: 50, size: 40 },
    { x: 300, y: 70, size: 50 },
    { x: 500, y: 40, size: 60 },
    { x: 700, y: 60, size: 45 },
    { x: 900, y: 50, size: 55 }
  ];

  function drawCloud(x, y, size) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.6, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y + size * 0.2, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 1.2, y + size * 0.1, size * 0.4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.beginPath();
    ctx.arc(x + size * 0.1, y + size * 0.3, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.5, y + size * 0.4, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.9, y + size * 0.3, size * 0.4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  clouds.forEach(cloud => {
    const adjustedX = (cloud.x + state.time * 10) % (canvas.width + 200) - 100;
    drawCloud(adjustedX, cloud.y, cloud.size);
  });
}
