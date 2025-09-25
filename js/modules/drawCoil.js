import { ctx, state } from './state.js';

export function drawCoil() {
  const { coil, floater, energy } = state;

  ctx.fillStyle = '#555555';
  ctx.beginPath();
  ctx.roundRect(coil.x - 15, coil.y + coil.height, 30, 20, 3);
  ctx.fill();
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#444444';
  ctx.fillRect(coil.x - 12, coil.y + coil.height + 20, 4, 250);
  ctx.fillRect(coil.x + 8, coil.y + coil.height + 20, 4, 250);

  const coilGradient = ctx.createLinearGradient(
    coil.x - coil.width, coil.y,
    coil.x + coil.width, coil.y + coil.height
  );
  coilGradient.addColorStop(0, '#8B4513');
  coilGradient.addColorStop(0.5, '#A0522D');
  coilGradient.addColorStop(1, '#8B4513');

  ctx.fillStyle = coilGradient;
  ctx.fillRect(coil.x - coil.width / 2, coil.y, coil.width, coil.height);

  ctx.strokeStyle = '#704214';
  ctx.lineWidth = 1;
  for (let i = 2; i < coil.height; i += 3) {
    ctx.beginPath();
    ctx.moveTo(coil.x - coil.width / 2, coil.y + i);
    ctx.lineTo(coil.x + coil.width / 2, coil.y + i);
    ctx.stroke();
  }

  ctx.fillStyle = '#7D7D7D';
  ctx.beginPath();
  ctx.roundRect(coil.x - 10, coil.y - 10, 20, 10, 2);
  ctx.fill();
  ctx.strokeStyle = '#555555';
  ctx.lineWidth = 1;
  ctx.stroke();

  let velocity = Math.abs(floater.y - floater.prevY);
  if (velocity > 0.2) {
    const sparkIntensity = Math.min(0.8, velocity * 1.5);
    const sparkZoneY = coil.y - 2;
    const sparkZoneWidth = 10;

    ctx.fillStyle = `rgba(255, 230, 140, ${sparkIntensity * 0.3})`;
    ctx.beginPath();
    ctx.ellipse(coil.x, sparkZoneY, sparkZoneWidth, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 210, 50, ${sparkIntensity})`;
    ctx.lineWidth = 0.7;

    const numSparks = Math.min(Math.floor(velocity * 5), 4);

    for (let i = 0; i < numSparks; i++) {
      const sparkX = coil.x - 5 + Math.random() * 10;
      const sparkY = sparkZoneY;
      ctx.beginPath();
      ctx.moveTo(sparkX, sparkY);
      let currentX = sparkX;
      let currentY = sparkY;
      const segments = 2 + Math.floor(Math.random() * 2);
      const segmentLength = 2 + Math.random() * 2;
      for (let j = 0; j < segments; j++) {
        currentX += (Math.random() - 0.5) * 2;
        currentY += segmentLength;
        ctx.lineTo(currentX, currentY);
      }
      ctx.stroke();
    }

    const glowRadius = 2 + velocity * 3;
    const glowGradient = ctx.createRadialGradient(
      coil.x, sparkZoneY, 0,
      coil.x, sparkZoneY, glowRadius
    );
    glowGradient.addColorStop(0, `rgba(255, 255, 200, ${sparkIntensity})`);
    glowGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');

    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(coil.x, sparkZoneY, glowRadius, 0, Math.PI * 2);
    ctx.fill();
  }
}
