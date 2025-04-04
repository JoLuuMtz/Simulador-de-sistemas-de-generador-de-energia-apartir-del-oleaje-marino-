
const intruccion = document.getElementById("btn-intructions");


intruccion.addEventListener("click", () => {


    Swal.fire({
        title: 'Intrucciones de uso',
        text: `
        Mueve el mouse hacia arriba para reducir la intensidad de la ola y hacia abajo para aumentarla.

        La energía cinética generada por el oleaje se transmite al flotador, que a su vez la transporta hacia el almacenador en el fondo del mar. Dependiendo de la intensidad del oleaje, el almacenador se llenará o se vaciará.

        Si el almacenador está lleno, significa que hay suficiente energía para encender la farola.

        `,
        icon: 'success',
        confirmButtonText: '¡Entendido!'
    });

    intruccion.style.animation = 'none';

});


const explication = document.getElementById("btn-explication");
explication.addEventListener("click", () => {

    Swal.fire({
        title: 'Explicación del juego',
        text: `
        Aqui va la explicacion de lo que pasa
            `,
        icon: 'info',
        confirmButtonText: '¡Ok!'
    });

    explication.style.animation = 'none';

});






