import { ctx, canvas, state } from './state.js';

export function drawLightBulb() {
  const batteryX = canvas.width - 140;
  const batteryY = 340;
  const batteryWidth = 100;

  const bulbX = batteryX + batteryWidth / 2;
  const bulbY = 100;
  const bulbRadius = 20;

  ctx.fillStyle = '#a0a0a0';
  ctx.beginPath();
  ctx.rect(bulbX - 10, bulbY + bulbRadius - 5, 20, 20);
  ctx.fill();
  ctx.strokeStyle = '#707070';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    ctx.moveTo(bulbX - 10, bulbY + bulbRadius + i * 5);
    ctx.lineTo(bulbX + 10, bulbY + bulbRadius + i * 5);
  }
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#606060';
  ctx.beginPath();
  ctx.rect(bulbX - 5, bulbY + bulbRadius + 15, 10, 15);
  ctx.fill();

  ctx.fillRect(bulbX - 3, bulbY + bulbRadius + 30, 6, batteryY - (bulbY + bulbRadius + 1));

  ctx.beginPath();
  ctx.arc(bulbX, bulbY, bulbRadius, 0, Math.PI * 2);

  if (state.energy < 99) {
    const glassGradient = ctx.createRadialGradient(
      bulbX, bulbY, 0,
      bulbX, bulbY, bulbRadius
    );
    glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    glassGradient.addColorStop(0.7, 'rgba(200, 200, 220, 0.7)');
    glassGradient.addColorStop(1, 'rgba(180, 180, 210, 0.5)');
    ctx.fillStyle = glassGradient;
  } else {
    const lightGradient = ctx.createRadialGradient(
      bulbX, bulbY, 0,
      bulbX, bulbY, bulbRadius * 2
    );
    lightGradient.addColorStop(0, 'rgba(255, 255, 200, 1)');
    lightGradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.8)');
    lightGradient.addColorStop(1, 'rgba(255, 200, 0, 0)');
    ctx.fillStyle = lightGradient;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    ctx.arc(bulbX, bulbY, bulbRadius * 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 100, 0.2)';
    ctx.fill();
    ctx.restore();
  }

  ctx.fill();

  ctx.strokeStyle = state.energy >= 99 ? '#ffbb00' : '#cccccc';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(bulbX - bulbRadius * 0.6, bulbY);
  ctx.bezierCurveTo(
    bulbX - bulbRadius * 0.3, bulbY - bulbRadius * 0.5,
    bulbX + bulbRadius * 0.3, bulbY + bulbRadius * 0.5,
    bulbX + bulbRadius * 0.6, bulbY
  );
  ctx.strokeStyle = state.energy >= 99 ? '#ffdd00' : '#999999';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (state.energy >= 99) {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i;
      const innerRadius = bulbRadius * 1.1;
      const outerRadius = bulbRadius * 1.5;
      ctx.moveTo(
        bulbX + innerRadius * Math.cos(angle),
        bulbY + innerRadius * Math.sin(angle)
      );
      ctx.lineTo(
        bulbX + outerRadius * Math.cos(angle),
        bulbY + outerRadius * Math.sin(angle)
      );
    }
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
