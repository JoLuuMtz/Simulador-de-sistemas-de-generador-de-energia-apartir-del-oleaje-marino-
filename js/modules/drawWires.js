import { ctx, canvas, state } from './state.js';

export function drawWires() {
  const waterLevel = canvas.height / 2;
  const seafloorY = canvas.height - 10;

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 6;

  const startX = state.coil.x;
  const startY = state.coil.y + state.coil.height + 20;

  const endX = canvas.width - 143;
  const endY = 400;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, seafloorY - 10);

  ctx.bezierCurveTo(
    startX, seafloorY,
    startX + 20, seafloorY,
    startX + 40, seafloorY
  );

  const segments = 5;
  const segmentWidth = (endX - (startX + 40)) / segments;

  for (let i = 1; i <= segments; i++) {
    const segX = startX + 40 + segmentWidth * i;
    const segY = seafloorY + Math.sin(i * 0.8) * 3;
    ctx.lineTo(segX, segY);
  }

  ctx.bezierCurveTo(
    endX, seafloorY,
    endX, seafloorY - 40,
    endX, endY
  );

  ctx.stroke();

  if (state.energy > 50) {
    const currentTime = Date.now() * 0.002;

    ctx.strokeStyle = `rgba(255, 255, 0, ${(state.energy / 100) * 0.5})`;
    ctx.lineWidth = 3;

    const dashLength = 5;
    const gapLength = 15;
    const dashPeriod = dashLength + gapLength;
    const offset = -(currentTime % 1) * dashPeriod;

    ctx.setLineDash([dashLength, gapLength]);
    ctx.lineDashOffset = offset;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, seafloorY - 10);

    ctx.bezierCurveTo(
      startX, seafloorY,
      startX + 20, seafloorY,
      startX + 40, seafloorY
    );

    for (let i = 1; i <= segments; i++) {
      const segX = startX + 40 + segmentWidth * i;
      const segY = seafloorY + Math.sin(i * 0.8) * 3;
      ctx.lineTo(segX, segY);
    }

    ctx.bezierCurveTo(
      endX, seafloorY,
      endX, seafloorY - 40,
      endX, endY
    );

    ctx.stroke();
    ctx.setLineDash([]);
  }
}
