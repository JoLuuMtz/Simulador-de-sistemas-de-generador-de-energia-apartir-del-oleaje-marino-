
// // Selecciona el elemento canvas donde se dibujará la simulación.
// const canvas = document.getElementById('waveCanvas');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = 400;

// // Variable de tiempo usada para animar las olas
// let time = 0;
// let energy = 10; // La energía mínima ahora es 10
// const maxEnergy = 100;
// let waveHeight = 30;
// const waveLength = 100;
// const waveSpeed = 0.05;
// const floater = { x: canvas.width / 2, y: canvas.height / 2, width: 40, height: 20, prevY: 0 };
// const coil = { x: floater.x, y: floater.y + 30, width: 10, height: 30 };

// // Evento para cambiar la intensidad de la ola con el mouse
// canvas.addEventListener('mousemove', (event) => {
//     waveHeight = Math.max(10, Math.min(60, event.clientY / 10));
// });

// // Dibuja las olas del mar con un efecto de animación
// function drawWave() {
//     ctx.fillStyle = "#87CEEB";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
//     let gradient = ctx.createLinearGradient(0, canvas.height / 2 - waveHeight, 0, canvas.height);
//     gradient.addColorStop(0, "#1E90FF");
//     gradient.addColorStop(1, "#00008B");

//     ctx.beginPath();
//     ctx.moveTo(0, canvas.height / 2);
//     for (let x = 0; x < canvas.width; x++) {
//         let y = waveHeight * Math.sin((x / waveLength) + time) +
//                 (waveHeight / 2) * Math.sin((x / (waveLength / 2)) + time * 1.5) +
//                 (canvas.height / 2);
//         ctx.lineTo(x, y);
//     }
//     ctx.lineTo(canvas.width, canvas.height);
//     ctx.lineTo(0, canvas.height);
//     ctx.closePath();
//     ctx.fillStyle = gradient;
//     ctx.fill();
// }

// // Actualiza la posición del flotador para que siga las olas
// function updateFloater() {
//     let targetY = waveHeight * Math.sin((floater.x / waveLength) + time) + (canvas.height / 2);
//     floater.prevY = floater.y;
//     floater.y += (targetY - floater.y) * 0.1;
//     coil.y = floater.y + 30;
    
//     ctx.fillStyle = "#d9534f";
//     ctx.fillRect(floater.x - floater.width / 2, floater.y - floater.height / 2, floater.width, floater.height);
//     ctx.strokeStyle = "black";
//     ctx.strokeRect(floater.x - floater.width / 2, floater.y - floater.height / 2, floater.width, floater.height);
// }

// // Dibuja la bobina que representa la generación de energía
// function drawCoil() {
//     ctx.fillStyle = "brown";
//     ctx.fillRect(coil.x - coil.width / 2, coil.y, coil.width, coil.height);
// }

// // Calcula la energía generada con base en la velocidad del flotador y el oleaje
// function generateEnergy() {
//     let velocity = Math.abs(floater.y - floater.prevY);
//     let waveFactor = waveHeight / 30;
//     energy += velocity * waveFactor * 2;
    
//     if (energy > maxEnergy) energy = maxEnergy;
//     if (energy > 10) energy -= 0.5;
//     if (energy < 10) energy = 10;
// }

// // Dibuja la barra de energía acumulada
// function drawEnergyBar() {
//     ctx.fillStyle = "gray";
//     ctx.fillRect(canvas.width - 250, 80, 200, 20);
    
//     let animatedWidth = (energy / maxEnergy) * 200;
//     ctx.fillStyle = "yellow";
//     ctx.fillRect(canvas.width - 250, 80, animatedWidth, 20);
    
//     ctx.strokeStyle = "black";
//     ctx.strokeRect(canvas.width - 250, 80, 200, 20);
    
//     ctx.fillStyle = "black";
//     ctx.fillText(`Energía: ${Math.floor(energy)}`, canvas.width - 250, 75);
// }

// // Dibuja los cables de conexión bajo el agua hasta el bombillo
// function drawWires() {
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 2;
    
//     ctx.beginPath();
//     ctx.moveTo(floater.x, floater.y);
//     ctx.lineTo(floater.x, canvas.height - 50);
//     ctx.lineTo(canvas.width - 250, canvas.height - 50);
//     ctx.lineTo(canvas.width - 250, 90);
//     ctx.stroke();
// }

// // Dibuja el bombillo con una forma más realista
// function drawLightBulb() {
//     ctx.beginPath();
//     ctx.arc(canvas.width - 100, 100, 20, 0, Math.PI * 2);
//     ctx.fillStyle = energy >= 99 ? "yellow" : "black";
//     ctx.fill();
    
//     if (energy >= 99) {
//         ctx.beginPath();
//         ctx.arc(canvas.width - 100, 100, 30, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
//         ctx.fill();
//     }
    
//     ctx.fillStyle = "black";
//     ctx.fillRect(canvas.width - 105, 120, 10, 80);
    
//     ctx.beginPath();
//     ctx.moveTo(canvas.width - 100, 200);
//     ctx.lineTo(canvas.width - 100, canvas.height);
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 3;
//     ctx.stroke();
// }

// // Función principal que actualiza y dibuja todos los elementos en cada frame
// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawWave();
//     updateFloater();
//     drawCoil();
//     generateEnergy();
//     drawEnergyBar();
//     drawWires();
//     drawLightBulb();
//     time += waveSpeed;
//     requestAnimationFrame(animate);
// }

// animate();

// Selecciona el elemento canvas donde se dibujará la simulación.
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 400;

// Variable de tiempo usada para animar las olas
let time = 0;
let energy = 10; // La energía mínima ahora es 10
const maxEnergy = 100;
let waveHeight = 30;
const waveLength = 100;
const waveSpeed = 0.05;
const floater = { x: canvas.width / 2, y: canvas.height / 2, width: 40, height: 20, prevY: 0 };
const coil = { x: floater.x, y: floater.y + 30, width: 10, height: 30 };

// Evento para cambiar la intensidad de la ola con el mouse
canvas.addEventListener('mousemove', (event) => {
    waveHeight = Math.max(10, Math.min(60, event.clientY / 10));
});

// Dibuja las olas del mar con un efecto de animación
function drawWave() {
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let gradient = ctx.createLinearGradient(0, canvas.height / 2 - waveHeight, 0, canvas.height);
    gradient.addColorStop(0, "#1E90FF");
    gradient.addColorStop(1, "#00008B");

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
        let y = waveHeight * Math.sin((x / waveLength) + time) +
                (waveHeight / 2) * Math.sin((x / (waveLength / 2)) + time * 1.5) +
                (canvas.height / 2);
        ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
}

// Actualiza la posición del flotador para que siga las olas
function updateFloater() {
    let targetY = waveHeight * Math.sin((floater.x / waveLength) + time) + (canvas.height / 2);
    floater.prevY = floater.y;
    floater.y += (targetY - floater.y) * 0.1;
    coil.y = floater.y + 30;
    
    ctx.fillStyle = "#d9534f";
    ctx.fillRect(floater.x - floater.width / 2, floater.y - floater.height / 2, floater.width, floater.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(floater.x - floater.width / 2, floater.y - floater.height / 2, floater.width, floater.height);
}

// Dibuja la bobina que representa la generación de energía
function drawCoil() {
    ctx.fillStyle = "brown";
    ctx.fillRect(coil.x - coil.width / 2, coil.y, coil.width, coil.height);
}

// Calcula la energía generada con base en la velocidad del flotador y el oleaje
function generateEnergy() {
    let velocity = Math.abs(floater.y - floater.prevY);
    let waveFactor = waveHeight / 30;
    energy += velocity * waveFactor * 2;
    
    //asegura que la energia no exceda el maximo
    if (energy > maxEnergy) energy = maxEnergy;
    if (energy > 10) energy -= 0.5;
    if (energy < 10) energy = 10;
}

// Dibuja la barra de energía debajo del bombillo
function drawEnergyBar() {
    const barX = canvas.width - 140;
    const barY = 250;
    ctx.fillStyle = "gray";
    ctx.fillRect(barX, barY, 100, 15);
    
    let animatedWidth = (energy / maxEnergy) * 100;
    ctx.fillStyle = "yellow";
    ctx.fillRect(barX, barY, animatedWidth, 15);
    
    ctx.strokeStyle = "black";
    ctx.strokeRect(barX, barY, 100, 15);
}

// Dibuja los cables conectando la barra de energía con el bombillo
function drawWires() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(floater.x, floater.y);
    ctx.lineTo(floater.x, canvas.height - 50);
    ctx.lineTo(canvas.width - 140, canvas.height - 50);
    ctx.lineTo(canvas.width - 140, 250);
    ctx.stroke();
}

// Dibuja el bombillo con una forma más realista
function drawLightBulb() {
    ctx.beginPath();
    ctx.arc(canvas.width - 100, 100, 20, 0, Math.PI * 2);
    ctx.fillStyle = energy >= 99 ? "yellow" : "black";
    ctx.fill();
    
    if (energy >= 99) {
        ctx.beginPath();
        ctx.arc(canvas.width - 100, 100, 30, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
        ctx.fill();
    }
    
    ctx.fillStyle = "black";
    // ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.fillRect(canvas.width - 105, 120, 10, 130);
}

// Función principal que actualiza y dibuja todos los elementos en cada frame
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWave();
    updateFloater();
    drawCoil();
    generateEnergy();
    drawEnergyBar();
    drawWires();
    drawLightBulb();
    time += waveSpeed;
    requestAnimationFrame(animate);
}

animate();
