import { ctx, state } from './state.js';

export function displayEnergyInfo(velocity) {
  ctx.fillStyle = '#333';
  ctx.font = 'bold 14px Arial';

  const voltage = velocity * 5;
  const current = velocity * 2;
  const power = voltage * current;

  ctx.fillText(`Voltaje inducido: ${voltage.toFixed(2)} V`, 114, 50);
  ctx.fillText(`Potencia generada: ${power.toFixed(2)} W`, 130, 70);
  ctx.fillText(`Energía acumulada: ${Math.floor(state.energy)}`, 115, 90);

  const efficiency = (velocity > 0.1) ? Math.min(90, 40 + velocity * 30) : 0;
  ctx.fillText(`Eficiencia: ${Math.floor(efficiency)}%`, 90, 110);
}
