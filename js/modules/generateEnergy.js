import { state } from './state.js';
import { displayEnergyInfo } from './displayEnergyInfo.js';

export function generateEnergy() {
  const { floater, maxEnergy, isWaveActive } = state;
  let velocity = Math.abs(floater.y - floater.prevY);
  let waveFactor = state.waveHeight / 30;
  state.energy += velocity * waveFactor * 2;

  if (state.energy > maxEnergy) state.energy = maxEnergy;

  if (!isWaveActive) {
    state.energy -= 1;
    if (state.energy < 0) state.energy = 0;
  } else {
    if (state.energy > 10) state.energy -= 0.5;
    if (state.energy < 10) state.energy = 10;
  }
  displayEnergyInfo(velocity);
}
