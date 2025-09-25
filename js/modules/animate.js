import { ctx, canvas, state } from './state.js';
import { drawWave } from './drawWave.js';
import { updateFloater } from './updateFloater.js';
import { drawCoil } from './drawCoil.js';
import { generateEnergy } from './generateEnergy.js';
import { drawEnergyBar } from './drawEnergyBar.js';
import { drawWires } from './drawWires.js';
import { drawLightBulb } from './drawLightBulb.js';
import { drawAmbientLight } from './drawAmbientLight.js';

export function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWave();
  updateFloater();
  drawCoil();
  generateEnergy();
  drawEnergyBar();
  drawWires();
  drawLightBulb();
  drawAmbientLight();
  state.time += state.waveSpeed;
  requestAnimationFrame(animate);
}
