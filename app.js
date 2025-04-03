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

// Agrega un evento para cambiar la altura de las olas según la posición vertical del mouse
// Mayor altura cuando el mouse está en la parte inferior de la pantalla
canvas.addEventListener('mousemove', (event) => {
    waveHeight = Math.max(10, Math.min(60, event.clientY / 10));

});

const startWave = document.getElementById("startWave");
const stopWave = document.getElementById("stopWave");

// Evento para iniciar el olaje

// Evento para detener el olaje


// Modifica la función animate para almacenar el ID de la animación




// Función para dibujar las olas animadas en el canvas
function drawWave() {
    // Dibuja el fondo del cielo con color azul claro
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Crea un gradiente lineal vertical para el agua, desde azul medio hasta azul oscuro
    let gradient = ctx.createLinearGradient(0, canvas.height / 2 - waveHeight, 0, canvas.height);
    gradient.addColorStop(0, "#1E90FF"); // Azul dodger para la parte superior
    gradient.addColorStop(1, "#00008B"); // Azul oscuro para la parte inferior
    
    // Comienza a trazar el camino para las olas
    ctx.beginPath();
    // Inicia en el borde izquierdo a la mitad de la altura del canvas
    ctx.moveTo(0, canvas.height / 2);
    // Para cada punto horizontal del canvas, calcula la altura de la ola
    for (let x = 0; x < canvas.width; x++) {
        // Combina dos ondas sinusoidales de diferentes frecuencias para crear olas más naturales
        let y = waveHeight * Math.sin((x / waveLength) + time) +
            (waveHeight / 2) * Math.sin((x / (waveLength / 2)) + time * 1.5) +
            (canvas.height / 2);
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
        floater.x - radius/3, floater.y - radius/3, radius/10,
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
    ctx.arc(floater.x - radius/2, floater.y - radius/2, radius/3, 0, Math.PI * 2);
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
    ctx.fillRect(coil.x - coil.width/2, coil.y, coil.width, coil.height);
    
    // Añade líneas de bobinado
    ctx.strokeStyle = "#704214";
    ctx.lineWidth = 1;
    for (let i = 2; i < coil.height; i += 3) {
        ctx.beginPath();
        ctx.moveTo(coil.x - coil.width/2, coil.y + i);
        ctx.lineTo(coil.x + coil.width/2, coil.y + i);
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
    // Posición de la batería en el canvas
    const batteryX = canvas.width - 140;
    const batteryY = 340;
    const batteryWidth = 100;
    const batteryHeight = 30;
    const tipWidth = 5;
    const tipHeight = 15;
    
    // Dibuja el cuerpo principal de la batería (rectángulo con bordes redondeados)
    ctx.fillStyle = "#333"; // Color gris oscuro para el casco de la batería
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    // Dibuja el cuerpo principal de la batería
    ctx.beginPath();
    ctx.roundRect(batteryX, batteryY, batteryWidth, batteryHeight, 3);
    ctx.fill();
    ctx.stroke();
    
    // Dibuja el terminal positivo (pequeño rectángulo en el extremo derecho)
    ctx.fillRect(batteryX + batteryWidth, batteryY + (batteryHeight - tipHeight) / 2, tipWidth, tipHeight);
    
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
    // Dibuja los cables básicos
    ctx.strokeStyle = "black"; // color de fondo 
    ctx.lineWidth = 5;// achor de los cables
    
    ctx.beginPath();
    ctx.moveTo(floater.x, floater.y + 75);
    
    // Cable con curva más natural
    ctx.bezierCurveTo(
        floater.x, canvas.height - 70,
        canvas.width - 200, canvas.height - 15,
        canvas.width - 140, canvas.height - 15
    );
    
    ctx.lineTo(canvas.width - 140, 250);
    ctx.stroke();
    
    // Si hay suficiente energía, muestra efecto de corriente
    if (energy > 50) {
        ctx.strokeStyle = "rgba(255, 255, 0, " + (energy/100) * 0.5 + ")";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 10]);
        
        ctx.beginPath();
        ctx.moveTo(floater.x, floater.y + 75);
        
        ctx.bezierCurveTo(
            floater.x, canvas.height - 70,
            canvas.width - 200, canvas.height - 15,
            canvas.width - 140, canvas.height - 15
        );
        ctx.lineTo(canvas.width - 140, 250);
        ctx.stroke();
        
        ctx.setLineDash([]);
    }
}

// Efectos de iluminación ambiental cuando la bombilla está encendida

function drawAmbientLight() {
    if (energy >= 99) {
        // Crea un gradiente circular alrededor de la bombilla
        const lightRadius = 200;
        const gradient = ctx.createRadialGradient(
            canvas.width - 100, 100, 10,
            canvas.width - 100, 100, lightRadius
        );
        gradient.addColorStop(0, "rgba(241, 241, 0, 0.3)");
        gradient.addColorStop(1, "rgba(255, 255, 150, 0)");
        
        // Aplica el gradiente sobre toda la escena
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;
        ctx.fillRect(canvas.width - 100 - lightRadius, 100 - lightRadius, 
                    lightRadius * 2, lightRadius * 2);
        ctx.globalCompositeOperation = "source-over";
    }
}



// Dibuja el bombillo con un aspecto más realista
function drawLightBulb() {
    const bulbX = canvas.width - 100;
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
    
    // Conexión con los cables
    ctx.fillRect(bulbX - 3, bulbY + bulbRadius + 30, 6,224 );// base port del bombillo
    
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