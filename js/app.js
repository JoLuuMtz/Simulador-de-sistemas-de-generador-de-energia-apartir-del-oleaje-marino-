// Obtiene una referencia al elemento canvas del HTML con id 'waveCanvas'
import { state, canvas } from './modules/state.js';
import { animate as animateModule } from './modules/animate.js';

// Referencias de UI
const amplitudeInput = document.getElementById('amplitudeInput');

// Agrega un evento para cambiar la altura de las olas según la posición del slider
// Mayor altura cuando el slider está hacia la derecha

// Botón para detener las olas
document.getElementById('stopWave').addEventListener('click', () => {
    state.isWaveActive = false;
    state.waveHeight = 0; // Detiene la ola visualmente
    if (amplitudeInput) amplitudeInput.value = state.waveHeight;
});

// Botón para reanudar las olas
document.getElementById('startWave').addEventListener('click', () => {
    state.isWaveActive = true;
    if (amplitudeInput) {
        amplitudeInput.addEventListener('input', () => {
            state.waveHeight = parseInt(amplitudeInput.value);
        });
        // Restaura la intensidad predeterminada y sincroniza el slider
        state.waveHeight = 0;
        amplitudeInput.value = state.waveHeight;
    }
});

// Inicia la animación
animateModule();