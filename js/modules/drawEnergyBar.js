import { ctx, state } from './state.js';

export function drawEnergyBar() {
  const batteryX = state.battery.x;
  const batteryY = state.battery.y + 30;
  const batteryWidth = state.battery.width;
  const batteryHeight = state.battery.height;
  const tipWidth = 5;
  const tipHeight = 15;

  ctx.fillStyle = '#333';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.roundRect(batteryX, batteryY, batteryWidth, batteryHeight, 5);
  ctx.fill();
  ctx.stroke();

  ctx.fillRect(batteryX + batteryWidth, batteryY + (batteryHeight - tipHeight) / 2, tipWidth, tipHeight);

  const negTermHeight = 10;
  ctx.fillRect(batteryX - tipWidth, batteryY + (batteryHeight - negTermHeight) / 2, tipWidth, negTermHeight);

  ctx.font = 'bold 12px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';

  const margin = 4;
  const fillMaxWidth = batteryWidth - (margin * 2);
  let fillWidth = (state.energy / state.maxEnergy) * fillMaxWidth;

  let fillColor;
  if (state.energy / state.maxEnergy < 0.2) {
    fillColor = '#FF3333';
  } else if (state.energy / state.maxEnergy < 0.5) {
    fillColor = '#FFCC33';
  } else {
    fillColor = '#33CC33';
  }

  ctx.fillStyle = fillColor;
  ctx.fillRect(batteryX + margin, batteryY + margin, fillWidth, batteryHeight - (margin * 2));

  const percentage = Math.floor((state.energy / state.maxEnergy) * 100);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${percentage}%`, batteryX + (batteryWidth / 2), batteryY + (batteryHeight / 2));
}
