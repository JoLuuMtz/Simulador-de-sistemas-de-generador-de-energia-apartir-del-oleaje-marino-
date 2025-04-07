// Obtener el canvas y su contexto
const canvas = document.getElementById('faradayCanvas');
const ctx = canvas.getContext('2d');

// Variables de la animación
let time = 0;
let magnetPosition = 150; // Ajustado para el centro vertical
let direction = -1;
let electrons = [];

// Inicializar electrones
for (let i = 0; i < 20; i++) {
    electrons.push({
        x: 100 + Math.random() * 200, // Ajustado para el centro horizontal
        y: 50 + Math.random() * 200,  // Ajustado para el centro vertical
        speed: 0,
        visible: false
    });
}

// Función de animación principal
function animate() {
    // Actualizar el tiempo
    time += 0.03;

    // Mover el imán arriba y abajo de forma sinusoidal
    magnetPosition = 150 + Math.sin(time) * 80; // Ajustado para el centro vertical

    // Determinar la dirección del movimiento del imán
    direction = Math.cos(time) < 0 ? 1 : -1; // Si cos < 0, está bajando, sino subiendo

    // Calcular la intensidad del efecto basado en la velocidad del imán
    const magnetSpeed = Math.abs(Math.cos(time));
    const intensity = magnetSpeed * 2;

    // Actualizar los electrones
    electrons.forEach(electron => {
        const distanceToMagnet = Math.abs(electron.y - magnetPosition);

        if (distanceToMagnet < 80) {
            electron.visible = true;
            electron.speed = direction * intensity * 3;
        } else {
            electron.speed *= 0.95;
            if (Math.abs(electron.speed) < 0.1) {
                electron.visible = false;
            }
        }

        if (electron.visible) {
            electron.x += electron.speed;

            // Ajustado para el centro horizontal
            if (electron.x > 300) electron.x = 100;
            if (electron.x < 100) electron.x = 300;
        }
    });

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la bobina
    ctx.strokeStyle = "#B87333"; // Color cobre
    ctx.lineWidth = 3;

    // Dibujar las espiras - centradas en el canvas
    for (let i = 0; i < 20; i++) {
        const yPos = 50 + i * 10; // Ajustado para el centro vertical
        ctx.beginPath();
        ctx.moveTo(100, yPos); // Ajustado para el centro horizontal
        ctx.lineTo(300, yPos); // Ajustado para el centro horizontal
        ctx.stroke();
    }

    // Conectar los extremos
    ctx.beginPath();
    ctx.moveTo(100, 50); // Ajustado para el centro
    ctx.lineTo(100, 240); // Ajustado para el centro
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 50); // Ajustado para el centro
    ctx.lineTo(300, 240); // Ajustado para el centro
    ctx.stroke();

    // Dibujar los electrones
    electrons.forEach(electron => {
        if (electron.visible) {
            ctx.beginPath();
            ctx.arc(electron.x, electron.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#00AAFF";
            ctx.fill();
        }
    });

    // Dibujar el imán
    const magnetHeight = 60;
    const magnetWidth = 30;

    // Polo norte (rojo)
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(200 - magnetWidth / 2, magnetPosition - magnetHeight / 2, magnetWidth, magnetHeight / 2);
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("N", 200, magnetPosition - magnetHeight / 4);

    // Polo sur (azul)
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(200 - magnetWidth / 2, magnetPosition, magnetWidth, magnetHeight / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("S", 200, magnetPosition + magnetHeight / 4);

    // Dibujar el campo magnético
    drawMagneticField(200, magnetPosition, magnetWidth, magnetHeight);

    // Continuar la animación
    requestAnimationFrame(animate);
}

// Función para dibujar el campo magnético
function drawMagneticField(x, y, width, height) {
    const fieldIntensity = 0.7 + Math.sin(time * 4) * 0.3;

    ctx.beginPath();
    for (let i = -3; i <= 3; i++) {
        const startX = x + i * 10;
        const endY = y + (i % 2 === 0 ? -80 : 80) * fieldIntensity;

        ctx.moveTo(startX, y - height / 2);
        ctx.bezierCurveTo(
            startX + 20, y - height / 4,
            startX - 20, y + height / 4,
            startX, endY
        );
    }

    ctx.strokeStyle = `rgba(128, 128, 255, ${fieldIntensity * 0.7})`;
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Iniciar la animación automáticamente
animate();