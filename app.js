




// Obtiene una referencia al elemento canvas del HTML con id 'waveCanvas'
const canvas = document.getElementById('waveCanvas');
// Obtiene el contexto 2D del canvas, necesario para dibujar en él
const ctx = canvas.getContext('2d');
// Establece el ancho del canvas al ancho completo de la ventana
canvas.width = window.innerWidth;
// Establece la altura del canvas en 400 píxeles
canvas.height = 400;

// Variable que almacena el tiempo para la animación de las olas
let time = 0;
// Nivel inicial de energía, con un valor mínimo de 10
let energy = 10;
// Valor máximo que puede alcanzar la energía
const maxEnergy = 100;
// Altura de las olas, afecta a la apariencia visual y a la generación de energía
let waveHeight = 30;
// Longitud de onda que determina la distancia entre crestas de las olas
const waveLength = 100;
// Velocidad a la que se mueven las olas (valor bajo para movimiento suave)
const waveSpeed = 0.05;
// Objeto que representa el dispositivo flotante, con posición, dimensiones y posición Y anterior
const floater = { x: canvas.width / 2, y: canvas.height / 2, width: 40, height: 20, prevY: 0 };
// Objeto que representa la bobina colocada debajo del flotador
const coil = { x: floater.x, y: floater.y + 30, width: 10, height: 30 };
// Objeto que representa la batería
const battery = { x: canvas.width - 140, y: 340, width: 100, height: 30 };

let offset = 0; // Controla el desplazamiento de la corriente

// Agrega un evento para cambiar la altura de las olas según la posición vertical del mouse
// Mayor altura cuando el mouse está en la parte inferior de la pantalla




// Evento para iniciar el olaje
// Botón para detener las olas
document.getElementById('stopWave').addEventListener('click', () => {
    isWaveActive = false;

    if (isWaveActive === false) {
        canvas.removeEventListener('mousemove', (event) => {
            waveHeight = Math.max(10, Math.min(60, event.clientY / 10));
        });
    }
    waveHeight = 0; // Detiene la ola visualmente


});

// Botón para reanudar las olas
document.getElementById('startWave').addEventListener('click', () => {
    isWaveActive = true;

    //
    if (isWaveActive === true) {
        canvas.addEventListener('mousemove', (event) => {
            waveHeight = Math.max(10, Math.min(60, event.clientY / 10));
        });
    }

    waveHeight = 30; // Restaura la intensidad predeterminada
});


// Evento para detener el olaje


// Modifica la función animate para almacenar el ID de la animación


// Función para dibujar las olas animadas en el canvas
function drawWave() {
    // Dibuja el fondo del cielo con color azul claro
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibuja nubes
    drawClouds();

    // Nivel de agua (línea media con altura variable según las olas)
    const waterLevel = canvas.height / 2;

    // Dibuja el fondo marino (suelo del mar)
    

    // Crea un gradiente lineal vertical para el agua, colores más realistas
    let gradient = ctx.createLinearGradient(0, waterLevel - waveHeight, 0, canvas.height);
    gradient.addColorStop(0, "#0077BE"); // Azul más realista para la superficie
    gradient.addColorStop(0.3, "#006994"); // Azul medio
    gradient.addColorStop(0.7, "#004D71"); // Azul más profundo
    gradient.addColorStop(1, "#00364F"); // Azul muy oscuro para el fondo



    // Comienza a trazar el camino para las olas
    ctx.beginPath();
    // Inicia en el borde izquierdo a la mitad de la altura del canvas
    ctx.moveTo(0, waterLevel);

    // Para cada punto horizontal del canvas, calcula la altura de la ola
    for (let x = 0; x < canvas.width; x += 5) { // Incremento menor para más detalle
        // Combina tres ondas sinusoidales de diferentes frecuencias para olas más naturales
        let y = waveHeight * Math.sin((x / waveLength) + time) +
            (waveHeight / 2) * Math.sin((x / (waveLength / 2)) + time * 1.5) +
            (waveHeight / 4) * Math.sin((x / (waveLength / 4)) + time * 2) +
            waterLevel;



        // Dibuja línea hasta este punto
        ctx.lineTo(x, y);
    }

    // Completa el camino hasta la esquina inferior derecha
    ctx.lineTo(canvas.width, canvas.height);
    // Luego hasta la esquina inferior izquierda
    ctx.lineTo(0, canvas.height);
    // Cierra el camino para formar una forma completa
    ctx.closePath();

    // Rellena la forma con el gradiente azul
    ctx.fillStyle = gradient;
    ctx.fill();


}





function drawClouds() {
    // Definir las nubes (posiciones fijas)
    const clouds = [
        { x: 100, y: 50, size: 40 },
        { x: 300, y: 70, size: 50 },
        { x: 500, y: 40, size: 60 },
        { x: 700, y: 60, size: 45 },
        { x: 900, y: 50, size: 55 }
    ];

    // Función para dibujar una nube individual
    function drawCloud(x, y, size) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

        // Dibujar varias circunferencias para formar la nube
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.6, 0, Math.PI * 2);
        ctx.arc(x + size * 0.8, y, size * 0.5, 0, Math.PI * 2);
        ctx.arc(x + size * 0.4, y + size * 0.2, size * 0.4, 0, Math.PI * 2);
        ctx.arc(x + size * 1.2, y + size * 0.1, size * 0.4, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Añadir un efecto de sombra sutil por debajo
        ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
        ctx.beginPath();
        ctx.arc(x + size * 0.1, y + size * 0.3, size * 0.4, 0, Math.PI * 2);
        ctx.arc(x + size * 0.5, y + size * 0.4, size * 0.5, 0, Math.PI * 2);
        ctx.arc(x + size * 0.9, y + size * 0.3, size * 0.4, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    // Dibujar todas las nubes
    clouds.forEach(cloud => {
        // Hacer que las nubes se muevan lentamente
        const adjustedX = (cloud.x + time * 10) % (canvas.width + 200) - 100;
        drawCloud(adjustedX, cloud.y, cloud.size);
    });
}


// Actualiza la posición del flotador para que siga el movimiento de las olas
// Actualiza la posición del flotador para que siga las olas, ahora con forma de esfera
function updateFloater() {
    // Calcula la posición vertical objetivo basada en la forma de la ola
    let targetY = waveHeight * Math.sin((floater.x / waveLength) + time) + (canvas.height / 2);
    // Guarda la posición Y actual antes de actualizarla
    floater.prevY = floater.y;
    // Mueve el flotador gradualmente hacia la posición objetivo
    floater.y += (targetY - floater.y) * 0.1;
    // Actualiza la posición de la bobina para que siga al flotador
    coil.y = floater.y + 30;

    // Dibuja el flotador como una esfera realista
    const radius = floater.width / 2;

    // Dibuja la sombra para dar efecto de profundidad
    ctx.beginPath();
    ctx.arc(floater.x, floater.y, radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fill();

    // Dibuja la esfera principal
    ctx.beginPath();
    ctx.arc(floater.x, floater.y, radius, 0, Math.PI * 2);

    // Crea un gradiente radial para dar efecto de volumen
    const gradient = ctx.createRadialGradient(
        floater.x - radius / 3, floater.y - radius / 3, radius / 10,
        floater.x, floater.y, radius
    );
    gradient.addColorStop(0, "#ff8080"); // Color más claro en el centro
    gradient.addColorStop(0.8, "#d9534f"); // Color principal
    gradient.addColorStop(1, "#b52b27"); // Color más oscuro en los bordes

    ctx.fillStyle = gradient;
    ctx.fill();

    // Añade un borde suave
    ctx.strokeStyle = "#b52b27";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Añade un reflejo de luz para dar más realismo
    ctx.beginPath();
    ctx.arc(floater.x - radius / 2, floater.y - radius / 2, radius / 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
}




function drawCoil() {
    // Dibuja el mecanismo fijo (base/imán)
    ctx.fillStyle = "#555555";
    ctx.beginPath();
    ctx.roundRect(coil.x - 15, coil.y + coil.height, 30, 20, 3);
    ctx.fill();
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Añade "patas" de soporte para mantenerlo fijo
    ctx.fillStyle = "#444444";
    ctx.fillRect(coil.x - 12, coil.y + coil.height + 20, 4, 30);
    ctx.fillRect(coil.x + 8, coil.y + coil.height + 20, 4, 30);

    // Dibuja la bobina con aspecto más realista
    const coilGradient = ctx.createLinearGradient(
        coil.x - coil.width, coil.y,
        coil.x + coil.width, coil.y + coil.height
    );
    coilGradient.addColorStop(0, "#8B4513");  // Marrón claro
    coilGradient.addColorStop(0.5, "#A0522D"); // Marrón medio
    coilGradient.addColorStop(1, "#8B4513");   // Marrón claro

    ctx.fillStyle = coilGradient;
    ctx.fillRect(coil.x - coil.width / 2, coil.y, coil.width, coil.height);

    // Añade líneas de bobinado
    ctx.strokeStyle = "#704214";
    ctx.lineWidth = 1;
    for (let i = 2; i < coil.height; i += 3) {
        ctx.beginPath();
        ctx.moveTo(coil.x - coil.width / 2, coil.y + i);
        ctx.lineTo(coil.x + coil.width / 2, coil.y + i);
        ctx.stroke();
    }

    // Dibuja el objeto móvil (parte inferior del flotador/imán)
    ctx.fillStyle = "#7D7D7D";
    ctx.beginPath();
    ctx.roundRect(coil.x - 10, coil.y - 10, 20, 10, 2);
    ctx.fill();
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Si hay movimiento suficiente, muestra efecto de generación de electricidad
    let velocity = Math.abs(floater.y - floater.prevY);
    if (velocity > 0.2) {
        // Añade "chispas" eléctricas entre el objeto móvil y la bobina
        ctx.strokeStyle = "rgba(255, 255, 100, 0.8)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < Math.min(velocity * 10, 5); i++) {
            ctx.beginPath();
            ctx.moveTo(coil.x - 5 + Math.random() * 10, coil.y - 5);
            ctx.lineTo(coil.x - 5 + Math.random() * 10, coil.y + 5);
            ctx.stroke();
        }
    }
}


// Calcula la energía generada basada en el movimiento del flotador
function generateEnergy() {
    // La velocidad es la diferencia absoluta entre la posición actual y la anterior
    let velocity = Math.abs(floater.y - floater.prevY);
    // Factor que multiplica la generación de energía según la altura de las olas
    let waveFactor = waveHeight / 30;
    // Aumenta la energía basada en la velocidad y el factor de olas
    energy += velocity * waveFactor * 2;

    // Limita la energía al valor máximo establecido
    if (energy > maxEnergy) energy = maxEnergy;
    // Si hay suficiente energía, disminuye gradualmente (simulando consumo)
    if (energy > 10) energy -= 0.5;
    // Mantiene un mínimo de energía de 10
    if (energy < 10) energy = 10;
}


// Dibuja la barra que muestra la cantidad de energía generada
function drawEnergyBar() {
    // Posición de la batería en el canvas (ahora es un objeto global)
    const batteryX = battery.x; // posicion en x de la batería
    const batteryY = battery.y +  30; // posicion Y de la batería
    const batteryWidth = battery.width;
    const batteryHeight = battery.height ;
    const tipWidth = 5;
    const tipHeight =15;

    // Dibuja el cuerpo principal de la batería (rectángulo con bordes redondeados)
    ctx.fillStyle = "#333"; // Color gris oscuro para el casco de la batería
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Dibuja el cuerpo principal de la batería
    ctx.beginPath();
    ctx.roundRect(batteryX, batteryY, batteryWidth, batteryHeight, 5);
    ctx.fill();
    ctx.stroke();

    // Dibuja el terminal positivo (pequeño rectángulo en el extremo derecho)
    ctx.fillRect(batteryX + batteryWidth, batteryY + (batteryHeight - tipHeight) / 2, tipWidth, tipHeight);

    // Dibuja el terminal negativo (pequeño rectángulo más corto en el lado izquierdo)
    const negTermHeight = 10;
    ctx.fillRect(batteryX - tipWidth, batteryY + (batteryHeight - negTermHeight) / 2, tipWidth, negTermHeight);

    // Añade etiquetas + y - a los terminales
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";


    // Calcula el ancho del relleno en proporción a la energía actual
    const margin = 4; // Margen interior
    const fillMaxWidth = batteryWidth - (margin * 2);
    let fillWidth = (energy / maxEnergy) * fillMaxWidth;

    // Selecciona el color basado en el nivel de energía
    let fillColor;
    if (energy / maxEnergy < 0.2) {
        fillColor = "#FF3333"; // Rojo cuando está casi vacía
    } else if (energy / maxEnergy < 0.5) {
        fillColor = "#FFCC33"; // Amarillo cuando está a media capacidad
    } else {
        fillColor = "#33CC33"; // Verde cuando está casi llena
    }

    // Dibuja el relleno de la batería
    ctx.fillStyle = fillColor;
    ctx.fillRect(batteryX + margin, batteryY + margin, fillWidth, batteryHeight - (margin * 2));

    // Muestra el porcentaje de energía
    const percentage = Math.floor((energy / maxEnergy) * 100);
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${percentage}%`, batteryX + (batteryWidth / 2), batteryY + (batteryHeight / 2));
}


function drawWires() {
    // Determinar la altura del suelo marino
    const waterLevel = canvas.height / 2;
    const seafloorY = canvas.height - 10; // Ajusta este valor según el dibujo del fondo marino

    // Cable desde la bobina hasta la batería
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;

    // Punto de inicio en la bobina
    const startX = coil.x;
    const startY = coil.y + coil.height + 20;

    // Punto final en la batería
    const endX = canvas.width - 143;
    const endY = 400; // Posición Y de la batería

    // Dibuja el cable principal
    ctx.beginPath();
    ctx.moveTo(startX, startY);

    // Cable que baja al fondo del mar
    ctx.lineTo(startX, seafloorY - 10);

    // Pequeña curva donde el cable toca el fondo (para mostrar que reposa)
    ctx.bezierCurveTo(
        startX, seafloorY,
        startX + 20, seafloorY,
        startX + 40, seafloorY
    );

    // Cable que se arrastra por el fondo hasta debajo de la batería
    // Con pequeñas ondulaciones para simular que sigue el contorno del fondo
    const segments = 5;
    const segmentWidth = (endX - (startX + 40)) / segments;

    for (let i = 1; i <= segments; i++) {
        const segX = startX + 40 + segmentWidth * i;
        const segY = seafloorY + Math.sin(i * 0.8) * 3; // Pequeña ondulación
        ctx.lineTo(segX, segY);
    }

    // Cable que sube hasta la batería
    ctx.bezierCurveTo(
        endX, seafloorY,
        endX, seafloorY - 40,
        endX, endY
    );

    ctx.stroke();

    // Si hay suficiente energía, muestra efecto de corriente
    if (energy > 50) {

        ctx.strokeStyle = `rgba(255, 255, 0, ${(energy / 100) * 0.5})`;
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 10]);

        // Repite el mismo trazado para el efecto de energía
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
            const segY = seafloorY + Math.sin(i * 0.8) * 5;
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

// Efectos de iluminación ambiental cuando la bombilla está encendida

function drawAmbientLight() {
    // Si la energía es suficiente, añade luz ambiental
    if (energy >= 99) {
        const batteryX = canvas.width - 140;
        const batteryWidth = 100;
        const bulbX = batteryX + batteryWidth / 2;
        const bulbY = 100;

        // Crea un gradiente circular alrededor de la bombilla
        const lightRadius = 200;
        const gradient = ctx.createRadialGradient(
            bulbX, bulbY, 10,
            bulbX, bulbY, lightRadius
        );
        gradient.addColorStop(0, "rgba(241, 241, 0, 0.3)");
        gradient.addColorStop(1, "rgba(255, 255, 150, 0)");

        // Aplica el gradiente sobre toda la escena
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;
        ctx.fillRect(bulbX - lightRadius, bulbY - lightRadius,
            lightRadius * 2, lightRadius * 2);
        ctx.globalCompositeOperation = "source-over";
    }
}

// Dibuja el bombillo con un aspecto más realista
function drawLightBulb() {
    const batteryX = canvas.width - 140;
    const batteryY = 340;
    const batteryWidth = 100;

    const bulbX = batteryX + batteryWidth / 2; // Centrado sobre la batería
    const bulbY = 100;
    const bulbRadius = 20;

    // Dibuja el casquillo metálico (base de la bombilla)
    ctx.fillStyle = "#a0a0a0"; // Color gris metálico
    ctx.beginPath();
    ctx.rect(bulbX - 10, bulbY + bulbRadius - 5, 20, 20);
    ctx.fill();
    ctx.strokeStyle = "#707070";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Dibuja las líneas del casquillo (rosca)
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        ctx.moveTo(bulbX - 10, bulbY + bulbRadius + i * 5);
        ctx.lineTo(bulbX + 10, bulbY + bulbRadius + i * 5);
    }
    ctx.strokeStyle = "#606060";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Dibuja el soporte metálico que conecta con los cables
    ctx.fillStyle = "#606060";
    ctx.beginPath();
    ctx.rect(bulbX - 5, bulbY + bulbRadius + 15, 10, 15);
    ctx.fill();

    // Conexión directa con la batería (barra vertical)
    ctx.fillRect(bulbX - 3, bulbY + bulbRadius + 30, 6, batteryY - (bulbY + bulbRadius + 1));

    // Dibuja el vidrio de la bombilla
    ctx.beginPath();
    ctx.arc(bulbX, bulbY, bulbRadius, 0, Math.PI * 2);

    // Si no tiene suficiente energía, se ve como vidrio claro
    if (energy < 99) {
        const glassGradient = ctx.createRadialGradient(
            bulbX, bulbY, 0,
            bulbX, bulbY, bulbRadius
        );
        glassGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        glassGradient.addColorStop(0.7, "rgba(200, 200, 220, 0.7)");
        glassGradient.addColorStop(1, "rgba(180, 180, 210, 0.5)");
        ctx.fillStyle = glassGradient;
    }
    // Si tiene suficiente energía, brilla con luz amarilla
    else {
        const lightGradient = ctx.createRadialGradient(
            bulbX, bulbY, 0,
            bulbX, bulbY, bulbRadius * 2
        );
        lightGradient.addColorStop(0, "rgba(255, 255, 200, 1)");
        lightGradient.addColorStop(0.4, "rgba(255, 255, 0, 0.8)");
        lightGradient.addColorStop(1, "rgba(255, 200, 0, 0)");
        ctx.fillStyle = lightGradient;

        // Agrega un resplandor exterior cuando está encendido
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, bulbRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 100, 0.2)";
        ctx.fill();
        ctx.restore();
    }

    ctx.fill();

    // Dibuja el contorno del vidrio
    ctx.strokeStyle = energy >= 99 ? "#ffbb00" : "#cccccc";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Dibuja el filamento dentro de la bombilla
    ctx.beginPath();
    ctx.moveTo(bulbX - bulbRadius * 0.6, bulbY);
    ctx.bezierCurveTo(
        bulbX - bulbRadius * 0.3, bulbY - bulbRadius * 0.5,
        bulbX + bulbRadius * 0.3, bulbY + bulbRadius * 0.5,
        bulbX + bulbRadius * 0.6, bulbY
    );
    ctx.strokeStyle = energy >= 99 ? "#ffdd00" : "#999999";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Si la bombilla está encendida, añade destellos
    if (energy >= 99) {
        // Líneas de destello
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
        ctx.strokeStyle = "rgba(255, 255, 0, 0.7)";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}


// Función principal de animación que actualiza todo en cada cuadro
function animate() {
    // Limpia todo el canvas para el nuevo cuadro
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibuja las olas
    drawWave();
    // Actualiza y dibuja el flotador
    updateFloater();
    // Dibuja la bobina
    drawCoil();
    // Calcula la energía generada
    generateEnergy();
    // Dibuja la barra de energía
    drawEnergyBar();
    // Dibuja los cables
    drawWires();
    // Dibuja la bombilla
    drawLightBulb();
    // Incrementa el tiempo para animar las olas
    time += waveSpeed;
    // Programa el siguiente cuadro de animación
    requestAnimationFrame(animate);

}

// Inicia el ciclo de animación
animate();