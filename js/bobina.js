// Obtener el canvas y su contexto
const canvas = document.getElementById('faradayCanvas');
const ctx = canvas.getContext('2d');

// Variables de la animación
let time = 0;
let magnetPosition = 150;
let direction = -1;
let electrons = [];
let sparkles = [];

// Crear gradientes para un aspecto más realista
function createGradients() {
    // Gradiente para el fondo
    window.bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#f0f0f0');
    bgGradient.addColorStop(1, '#e0e0e0');

    // Gradiente para la bobina de cobre
    window.copperGradient = ctx.createLinearGradient(100, 0, 300, 0);
    copperGradient.addColorStop(0, '#d4a76a');
    copperGradient.addColorStop(0.5, '#e3c09b');
    copperGradient.addColorStop(1, '#d4a76a');

    // Gradiente para el imán
    window.magnetGradientN = ctx.createLinearGradient(0, 0, 30, 0);
    magnetGradientN.addColorStop(0, '#cc0000');
    magnetGradientN.addColorStop(0.5, '#ff3333');
    magnetGradientN.addColorStop(1, '#cc0000');

    window.magnetGradientS = ctx.createLinearGradient(0, 0, 30, 0);
    magnetGradientS.addColorStop(0, '#0000cc');
    magnetGradientS.addColorStop(0.5, '#3333ff');
    magnetGradientS.addColorStop(1, '#0000cc');
}

// Inicializar electrones
for (let i = 0; i < 25; i++) {
    electrons.push({
        x: 100 + Math.random() * 200,
        y: 50 + Math.random() * 200,
        speed: 0,
        visible: false,
        size: 2 + Math.random() * 2
    });
}

// Función de animación principal
function animate() {
    // Actualizar el tiempo
    time += 0.03;

    // Mover el imán arriba y abajo de forma sinusoidal
    magnetPosition = 150 + Math.sin(time) * 80;

    // Determinar la dirección del movimiento del imán
    direction = Math.cos(time) < 0 ? 1 : -1;

    // Calcular la intensidad del efecto basado en la velocidad del imán
    const magnetSpeed = Math.abs(Math.cos(time));
    const intensity = magnetSpeed * 2;

    // Actualizar los electrones
    electrons.forEach(electron => {
        const distanceToMagnet = Math.abs(electron.y - magnetPosition);

        if (distanceToMagnet < 80) {
            electron.visible = true;
            electron.speed = direction * intensity * (2.5 + Math.random());

            // Crear chispas cuando el imán está cerca de los electrones y moviéndose rápido
            if (magnetSpeed > 0.7 && Math.random() > 0.95) {
                sparkles.push({
                    x: electron.x,
                    y: electron.y,
                    size: 1 + Math.random() * 3,
                    life: 10 + Math.random() * 20
                });
            }
        } else {
            electron.speed *= 0.95;
            if (Math.abs(electron.speed) < 0.1) {
                electron.visible = false;
            }
        }

        if (electron.visible) {
            electron.x += electron.speed;

            if (electron.x > 300) electron.x = 100;
            if (electron.x < 100) electron.x = 300;
        }
    });

    // Actualizar chispas
    for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].life -= 1;
        sparkles[i].size *= 0.9;
        if (sparkles[i].life <= 0) {
            sparkles.splice(i, 1);
        }
    }

    // Dibujar la escena
    drawScene();

    // Continuar la animación
    requestAnimationFrame(animate);
}

function drawScene() {
    createGradients();

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el fondo
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar sombra para la bobina
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Dibujar la base
    ctx.fillStyle = '#777';
    ctx.fillRect(90, 250, 220, 10);
    ctx.fillStyle = '#555';
    ctx.fillRect(80, 260, 240, 20);

    // Dibujar soporte vertical
    ctx.fillStyle = '#888';
    ctx.fillRect(195, 50, 10, 200);

    // Resetear sombra
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Dibujar el campo magnético (detrás de la bobina)
    drawMagneticField(200, magnetPosition, 30, 60);

    // Dibujar la bobina
    drawRealisticCoil();

    // Dibujar los electrones
    electrons.forEach(electron => {
        if (electron.visible) {
            // Efecto de brillo
            ctx.beginPath();
            const glow = ctx.createRadialGradient(
                electron.x, electron.y, 0,
                electron.x, electron.y, electron.size * 3
            );
            glow.addColorStop(0, 'rgba(100, 200, 255, 0.8)');
            glow.addColorStop(1, 'rgba(100, 200, 255, 0)');
            ctx.fillStyle = glow;
            ctx.arc(electron.x, electron.y, electron.size * 3, 0, Math.PI * 2);
            ctx.fill();

            // Electrón
            ctx.beginPath();
            ctx.arc(electron.x, electron.y, electron.size, 0, Math.PI * 2);
            const electronGradient = ctx.createRadialGradient(
                electron.x - electron.size / 2, electron.y - electron.size / 2, 0,
                electron.x, electron.y, electron.size * 2
            );
            electronGradient.addColorStop(0, '#ffffff');
            electronGradient.addColorStop(1, '#00AAFF');
            ctx.fillStyle = electronGradient;
            ctx.fill();
        }
    });

    // Dibujar chispas
    sparkles.forEach(sparkle => {
        ctx.beginPath();
        const sparkleGlow = ctx.createRadialGradient(
            sparkle.x, sparkle.y, 0,
            sparkle.x, sparkle.y, sparkle.size * 3
        );
        sparkleGlow.addColorStop(0, 'rgba(255, 255, 200, ' + (sparkle.life / 30) + ')');
        sparkleGlow.addColorStop(1, 'rgba(255, 255, 200, 0)');
        ctx.fillStyle = sparkleGlow;
        ctx.arc(sparkle.x, sparkle.y, sparkle.size * 3, 0, Math.PI * 2);
        ctx.fill();
    });

    // Dibujar el imán
    drawRealisticMagnet();
}

function drawRealisticCoil() {
    // Dibujar cilindro de soporte de la bobina (gris claro)
    ctx.fillStyle = '#d8d8d8';
    ctx.beginPath();
    ctx.ellipse(200, 50, 100, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(200, 250, 100, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rectángulo para el tubo
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(100, 50, 200, 200);

    // Dibujar borde del tubo
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(100, 50, 200, 200);

    // Dibujar las espiras (más realistas, con sombras)
    ctx.lineWidth = 3;
    for (let i = 0; i < 20; i++) {
        const yPos = 60 + i * 9;

        // Sombra para la espira
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // Dibujar la espira
        ctx.beginPath();
        ctx.moveTo(100, yPos);
        ctx.lineTo(300, yPos);
        ctx.strokeStyle = copperGradient;
        ctx.stroke();

        // Resetear sombra
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Dibujar los conectores en los extremos
        ctx.beginPath();
        ctx.arc(100, yPos, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#b87333';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(300, yPos, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#b87333';
        ctx.fill();
    }

    // Conectar los extremos - cables verticales
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(100, 60);
    ctx.lineTo(100, 240);
    ctx.strokeStyle = copperGradient;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 60);
    ctx.lineTo(300, 240);
    ctx.strokeStyle = copperGradient;
    ctx.stroke();

    // Puntos de conexión
    ctx.beginPath();
    ctx.arc(100, 60, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#b87333';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, 240, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#b87333';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(300, 60, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#b87333';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(300, 240, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#b87333';
    ctx.fill();
}

function drawRealisticMagnet() {
    const magnetHeight = 60;
    const magnetWidth = 30;

    // Sombra para el imán
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    // Dibuja borde metálico del imán
    ctx.fillStyle = '#999';
    ctx.fillRect(200 - magnetWidth / 2 - 2, magnetPosition - magnetHeight / 2 - 2, magnetWidth + 4, magnetHeight + 4);

    // Resetear sombra
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Polo norte (rojo)
    ctx.fillStyle = magnetGradientN;
    ctx.fillRect(200 - magnetWidth / 2, magnetPosition - magnetHeight / 2, magnetWidth, magnetHeight / 2);

    // Reflejo de luz en el polo norte
    ctx.beginPath();
    ctx.moveTo(200 - magnetWidth / 4, magnetPosition - magnetHeight / 2);
    ctx.lineTo(200 + magnetWidth / 4, magnetPosition - magnetHeight / 2);
    ctx.lineTo(200, magnetPosition - magnetHeight / 4);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();

    // Etiqueta N
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("N", 200, magnetPosition - magnetHeight / 4);

    // Polo sur (azul)
    ctx.fillStyle = magnetGradientS;
    ctx.fillRect(200 - magnetWidth / 2, magnetPosition, magnetWidth, magnetHeight / 2);

    // Reflejo de luz en el polo sur
    ctx.beginPath();
    ctx.moveTo(200 - magnetWidth / 4, magnetPosition + magnetHeight / 2);
    ctx.lineTo(200 + magnetWidth / 4, magnetPosition + magnetHeight / 2);
    ctx.lineTo(200, magnetPosition + magnetHeight / 4);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();

    // Etiqueta S
    ctx.fillStyle = '#fff';
    ctx.fillText("S", 200, magnetPosition + magnetHeight / 4);

    // Línea divisoria entre los polos
    ctx.beginPath();
    ctx.moveTo(200 - magnetWidth / 2, magnetPosition);
    ctx.lineTo(200 + magnetWidth / 2, magnetPosition);
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Función para dibujar el campo magnético con un aspecto más realista
function drawMagneticField(x, y, width, height) {
    const fieldIntensity = 0.7 + Math.sin(time * 4) * 0.3;
    const magnetSpeed = Math.abs(Math.cos(time));

    // Campo magnético alrededor del imán
    for (let i = -3; i <= 3; i++) {
        const startX = x + i * 10;
        ctx.beginPath();
        ctx.moveTo(startX, y - height / 2 - 10);

        // Curvas de campo magnético más suaves y realistas
        const controlPointY1 = y - height * (0.5 + fieldIntensity * 0.3);
        const controlPointY2 = y + height * (0.5 + fieldIntensity * 0.3);
        const endY = i % 2 === 0 ? y - height * 1.2 : y + height * 1.2;

        ctx.bezierCurveTo(
            startX + 25, controlPointY1,
            startX - 25, controlPointY2,
            startX, endY
        );

        // Color del campo magnético dependiendo de la intensidad
        const opacity = fieldIntensity * 0.5 * (1 - Math.abs(i) / 4);
        let fieldColor;

        if (i < 0) {
            // Tonos rojos para las líneas cerca del polo norte
            fieldColor = `rgba(255, 100, 100, ${opacity})`;
        } else if (i > 0) {
            // Tonos azules para las líneas cerca del polo sur
            fieldColor = `rgba(100, 100, 255, ${opacity})`;
        } else {
            // Línea central
            fieldColor = `rgba(200, 100, 255, ${opacity})`;
        }

        ctx.strokeStyle = fieldColor;
        ctx.lineWidth = Math.max(1, 3 * fieldIntensity * (1 - Math.abs(i) / 4));
        ctx.stroke();

        // Añadir pequeñas partículas a lo largo de las líneas de campo cuando el imán se mueve rápido
        if (magnetSpeed > 0.6) {
            const particleCount = Math.floor(magnetSpeed * 5);
            for (let j = 0; j < particleCount; j++) {
                const t = j / particleCount;
                // Calcular punto en la curva de Bezier
                const mt = 1 - t;
                const px = mt * mt * mt * startX + 3 * mt * mt * t * (startX + 25) + 3 * mt * t * t * (startX - 25) + t * t * t * startX;
                const py = mt * mt * mt * (y - height / 2 - 10) + 3 * mt * mt * t * controlPointY1 + 3 * mt * t * t * controlPointY2 + t * t * t * endY;

                const particleSize = Math.random() * 2 * fieldIntensity;
                ctx.beginPath();
                ctx.arc(px, py, particleSize, 0, Math.PI * 2);
                ctx.fillStyle = fieldColor.replace(')', ', ' + Math.random() + ')');
                ctx.fill();
            }
        }
    }
}

// Iniciar la animación automáticamente
animate();