
const intruccion = document.getElementById("myButton");


intruccion.addEventListener("click", function () {


    Swal.fire({
        title: 'Intrucciones de uso',
        text: 'Mueve el mouse arriba y hacia abajo para cambiar la intensidad de la ola.',
        icon: 'success',
        confirmButtonText: '¡Entendido!'
    });
});


