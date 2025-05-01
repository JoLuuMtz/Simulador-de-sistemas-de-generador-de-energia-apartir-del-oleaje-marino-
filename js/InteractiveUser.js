
// const intruccion = document.getElementById("btn-intructions");


// intruccion.addEventListener("click", () => {


//     Swal.fire({
//         title: 'Intrucciones de uso',
//         text: `
//         Mueve el mouse hacia arriba para reducir la intensidad de la ola y hacia abajo para aumentarla.

//         La energía cinética generada por el oleaje se transmite al flotador, que a su vez la transporta hacia el almacenador en el fondo del mar. Dependiendo de la intensidad del oleaje, el almacenador se llenará o se vaciará.

//         Si el almacenador está lleno, significa que hay suficiente energía para encender la farola.

//         `,
//         icon: 'success',
//         confirmButtonText: '¡Entendido!'
//     });

//     intruccion.style.animation = 'none';

// });


const explication = document.getElementById("btn-explication");
explication.addEventListener("click", () => {

    Swal.fire({
        title: 'Explicación del juego',
        html: `
            <div style="text-align: justify; font-size: 20px;">
                La <strong>Ley de Faraday</strong> explica que una corriente eléctrica puede generarse cuando un
                campo magnético cambia alrededor de una bobina de alambre. En el caso de la
                <strong>energía undimotriz</strong>, el movimiento de las olas del mar hace que un imán se mueva dentro o
                cerca de una bobina. Este movimiento cambia el campo magnético que atraviesa la bobina, lo que
                provoca que se genere electricidad. Es así como la energía del movimiento de las olas se
                transforma en energía eléctrica, aprovechando principios del electromagnetismo.
                <br><br>
                En este caso, el <strong>flotador</strong> es el que se mueve por la fuerza de las olas y el <strong>almacenador</strong>
                es la bobina que genera la electricidad. La <strong>energía cinética</strong> generada por el oleaje se transmite
                al flotador, que a su vez la transporta hacia el almacenador en el fondo del mar. Dependiendo de
                la <strong>intensidad del oleaje</strong>, el almacenador se llenará o se vaciará.
            </div>
        `,
        icon: 'info',
        confirmButtonText: '¡Ok!'
    });
    

    explication.style.animation = 'none';

});






