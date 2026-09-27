let boton =
    document.getElementById("boton");

let puntosTexto =
    document.getElementById("puntos");

let tiempoTexto =
    document.getElementById("tiempo");

let empezar =
    document.getElementById("empezar");

let tiempoElegido =
    document.getElementById("tiempoElegido");

let pausa =
    document.getElementById("pausa");


/* ========================= */
/* RESULTADOS */
/* ========================= */

let pantallaResultados =
    document.getElementById("pantallaResultados");

let resultadoPuntos =
    document.getElementById("resultadoPuntos");

let resultadoRacha =
    document.getElementById("resultadoRacha");

let resultadoAciertos =
    document.getElementById("resultadoAciertos");

let resultadoBombas =
    document.getElementById("resultadoBombas");

let mensajeRecord =
    document.getElementById("mensajeRecord");

let jugarOtra =
    document.getElementById("jugarOtra");

let ajustes =
    document.getElementById("ajustes");


/* ========================= */
/* ANUNCIO */
/* ========================= */

let pantallaAnuncio =
    document.getElementById("pantallaAnuncio");

let verAnuncio =
    document.getElementById("verAnuncio");

let contadorAnuncio =
    document.getElementById("contadorAnuncio");

let temporizadorAnuncio;


/* ========================= */
/* AJUSTES */
/* ========================= */

let pantallaAjustes =
    document.getElementById("pantallaAjustes");

let tiempoAjustes =
    document.getElementById("tiempoAjustes");

let velocidad =
    document.getElementById("velocidad");

let activarBombas =
    document.getElementById("activarBombas");

let activarDoble =
    document.getElementById("activarDoble");

let activarTiempo =
    document.getElementById("activarTiempo");

let guardarAjustes =
    document.getElementById("guardarAjustes");

let volverResultados =
    document.getElementById("volverResultados");


/* ========================= */
/* VARIABLES */
/* ========================= */

let puntos = 0;

let tiempo = 10;

let racha = 0;

let mejorRacha = 0;

let aciertos = 0;

let bombasPulsadas = 0;

let temporizador;

let desaparecedor;

let jugando = false;

let pausado = false;

let tipoBoton = "normal";


/* AJUSTES */

let tiempoDesaparicion = 1000;

let bombasActivadas = true;

let dobleActivado = true;

let tiempoActivado = true;


let records =
    JSON.parse(
        localStorage.getItem("records")
    ) || [];


/* ========================= */
/* RACHA */
/* ========================= */

let rachaTexto =
    document.createElement("div");

rachaTexto.id = "racha";

rachaTexto.style.position = "fixed";

rachaTexto.style.top = "60px";

rachaTexto.style.left = "20px";

rachaTexto.style.fontSize = "22px";

rachaTexto.style.fontWeight = "bold";

rachaTexto.textContent =
    "🔥 Racha: 0";

document.body.appendChild(
    rachaTexto
);


/* ========================= */
/* EMPEZAR */
/* ========================= */

empezar.addEventListener(
    "click",
    empezarPartida
);


jugarOtra.addEventListener(
    "click",
    function() {

        pantallaResultados.style.display =
            "none";

        empezarPartida();

    }
);


/* ========================= */
/* AJUSTES */
/* ========================= */

ajustes.addEventListener(
    "click",
    function() {

        pantallaResultados.style.display =
            "none";

        pantallaAjustes.style.display =
            "flex";


        tiempoAjustes.value =
            tiempoElegido.value;

        velocidad.value =
            tiempoDesaparicion;

        activarBombas.checked =
            bombasActivadas;

        activarDoble.checked =
            dobleActivado;

        activarTiempo.checked =
            tiempoActivado;

    }
);


guardarAjustes.addEventListener(
    "click",
    function() {

        let nuevoTiempo =
            parseInt(
                tiempoAjustes.value
            );


        if (
            isNaN(nuevoTiempo) ||
            nuevoTiempo < 1
        ) {

            nuevoTiempo = 10;

        }


        tiempoElegido.value =
            nuevoTiempo;

        tiempoDesaparicion =
            parseInt(
                velocidad.value
            );

        bombasActivadas =
            activarBombas.checked;

        dobleActivado =
            activarDoble.checked;

        tiempoActivado =
            activarTiempo.checked;


        pantallaAjustes.style.display =
            "none";

        pantallaResultados.style.display =
            "flex";

    }
);


volverResultados.addEventListener(
    "click",
    function() {

        pantallaAjustes.style.display =
            "none";

        pantallaResultados.style.display =
            "flex";

    }
);


/* ========================= */
/* EMPEZAR PARTIDA */
/* ========================= */

function empezarPartida() {

    let tiempoSeleccionado =
        parseInt(
            tiempoElegido.value
        );


    if (
        isNaN(tiempoSeleccionado) ||
        tiempoSeleccionado < 1
    ) {

        tiempoSeleccionado = 10;

        tiempoElegido.value = 10;

    }


    puntos = 0;

    racha = 0;

    mejorRacha = 0;

    aciertos = 0;

    bombasPulsadas = 0;

    tiempo = tiempoSeleccionado;

    jugando = true;

    pausado = false;


    puntosTexto.textContent =
        "Puntos: 0";

    tiempoTexto.textContent =
        "Tiempo: " + tiempo;

    rachaTexto.textContent =
        "🔥 Racha: 0";

    pausa.textContent =
        "⏸️";


    empezar.style.display =
        "none";

    tiempoElegido.disabled =
        true;

    pausa.style.display =
        "block";

    boton.style.display =
        "block";


    moverCirculo();


    temporizador =
        setInterval(
            function() {

                if (!pausado) {

                    tiempo--;

                    tiempoTexto.textContent =
                        "Tiempo: " + tiempo;


                    if (tiempo <= 0) {

                        terminarPartida(
                            tiempoSeleccionado
                        );

                    }

                }

            },
            1000
        );
}


/* ========================= */
/* PAUSA */
/* ========================= */

pausa.addEventListener(
    "click",
    function() {

        if (!jugando) return;


        pausado = !pausado;

        tiempoElegido.disabled =
            true;


        if (pausado) {

            clearTimeout(
                desaparecedor
            );

            boton.style.display =
                "none";

            pausa.textContent =
                "▶️";


        } else {

            pausa.textContent =
                "⏸️";

            moverCirculo();

        }

    }
);


/* ========================= */
/* TERMINAR PARTIDA */
/* ========================= */

function terminarPartida(
    tiempoSeleccionado
) {

    clearInterval(
        temporizador
    );

    clearTimeout(
        desaparecedor
    );


    jugando = false;

    pausado = false;


    boton.style.display =
        "none";

    pausa.style.display =
        "none";


    empezar.style.display =
        "block";

    tiempoElegido.disabled =
        false;


    pausa.textContent =
        "⏸️";


    /* RÉCORD */

    let eraRecord = false;


    if (records.length < 3) {

        eraRecord =
            puntos > 0;

    } else {

        eraRecord =
            puntos >
            records[
                records.length - 1
            ];

    }


    records.push(puntos);


    records.sort(
        function(a, b) {

            return b - a;

        }
    );


    records =
        records.slice(0, 3);


    localStorage.setItem(
        "records",
        JSON.stringify(records)
    );


    actualizarRecords();


    /* DATOS */

    resultadoPuntos.textContent =
        puntos;

    resultadoRacha.textContent =
        mejorRacha;

    resultadoAciertos.textContent =
        aciertos;

    resultadoBombas.textContent =
        bombasPulsadas;


    if (
        eraRecord &&
        puntos > 0
    ) {

        mensajeRecord.textContent =
            "🎉 ¡NUEVO RÉCORD!";

    } else {

        mensajeRecord.textContent =
            "";

    }


    /*
       IMPORTANTE:
       PRIMERO ANUNCIO
       Y DESPUÉS RESULTADOS
    */

    mostrarAnuncio();


    /* REINICIAR */

    puntos = 0;

    racha = 0;

    puntosTexto.textContent =
        "Puntos: 0";

    rachaTexto.textContent =
        "🔥 Racha: 0";

    tiempoTexto.textContent =
        "Tiempo: " +
        tiempoSeleccionado;
}


/* ========================= */
/* MOSTRAR ANUNCIO */
/* ========================= */

function mostrarAnuncio() {

    clearInterval(
        temporizadorAnuncio
    );


    let segundos = 3;


    pantallaAnuncio.style.display =
        "flex";


    contadorAnuncio.textContent =
        segundos;


    temporizadorAnuncio =
        setInterval(
            function() {

                segundos--;

                contadorAnuncio.textContent =
                    segundos;


                if (segundos <= 0) {

                    clearInterval(
                        temporizadorAnuncio
                    );

                    mostrarResultados();

                }

            },
            1000
        );
}


/* ========================= */
/* MOSTRAR RESULTADOS */
/* ========================= */

function mostrarResultados() {

    clearInterval(
        temporizadorAnuncio
    );


    pantallaAnuncio.style.display =
        "none";


    pantallaResultados.style.display =
        "flex";
}


/* ========================= */
/* BOTÓN +10 SEGUNDOS */
/* ========================= */

verAnuncio.addEventListener(
    "click",
    function() {

        clearInterval(
            temporizadorAnuncio
        );


        /*
           DE MOMENTO SIMULAMOS
           EL ANUNCIO
        */

        tiempo += 10;


        mostrarResultados();

    }
);


/* ========================= */
/* PULSAR CÍRCULO */
/* ========================= */

boton.addEventListener(
    "click",
    function() {

        if (
            !jugando ||
            pausado
        ) return;


        clearTimeout(
            desaparecedor
        );


        if (
            tipoBoton === "bomba"
        ) {

            puntos -= 2;

            bombasPulsadas++;

            racha = 0;


            if (puntos < 0) {

                puntos = 0;

            }


        } else if (
            tipoBoton === "normal"
        ) {

            puntos += 1;

            racha++;

            aciertos++;


        } else if (
            tipoBoton === "doble"
        ) {

            puntos += 2;

            racha++;

            aciertos++;


        } else if (
            tipoBoton === "tiempo"
        ) {

            tiempo += 3;

            racha++;

            aciertos++;


            tiempoTexto.textContent =
                "Tiempo: " + tiempo;

        }


        if (
            racha > mejorRacha
        ) {

            mejorRacha =
                racha;

        }


        if (
            racha > 0 &&
            racha % 5 === 0
        ) {

            puntos += 3;

        }


        puntosTexto.textContent =
            "Puntos: " + puntos;

        rachaTexto.textContent =
            "🔥 Racha: " + racha;


        moverCirculo();

    }
);


/* ========================= */
/* MOVER CÍRCULO */
/* ========================= */

function moverCirculo() {

    clearTimeout(
        desaparecedor
    );


    let x;

    let y;


    let tabla =
        document.getElementById(
            "records"
        );

    let tablaRect =
        tabla.getBoundingClientRect();


    do {

        x =
            Math.random() *
            (
                window.innerWidth -
                boton.offsetWidth
            );


        y =
            Math.random() *
            (
                window.innerHeight -
                boton.offsetHeight
            );


    } while (

        x < tablaRect.right &&

        x + boton.offsetWidth >
            tablaRect.left &&

        y < tablaRect.bottom &&

        y + boton.offsetHeight >
            tablaRect.top

    );


    let numero =
        Math.random();


    /* BOMBA */

    if (
        bombasActivadas &&
        numero < 0.15
    ) {

        tipoBoton = "bomba";

        boton.style.backgroundColor =
            "black";

        boton.style.border =
            "3px solid white";


        boton.innerHTML = `

            <div style="
                width: 45px;
                height: 45px;
                background: black;
                border-radius: 50%;
                position: absolute;
                left: 25px;
                top: 30px;
            "></div>

            <div style="
                width: 18px;
                height: 8px;
                background: #777;
                position: absolute;
                left: 60px;
                top: 22px;
                transform: rotate(-35deg);
                border-radius: 5px;
            "></div>

            <div style="
                width: 8px;
                height: 15px;
                background: orange;
                position: absolute;
                left: 73px;
                top: 10px;
                transform: rotate(20deg);
                border-radius: 50%;
            "></div>

        `;


    /* DOBLE */

    } else if (
        dobleActivado &&
        numero < 0.30
    ) {

        tipoBoton = "doble";

        boton.style.backgroundColor =
            "#FFD700";

        boton.style.border =
            "3px solid white";


        boton.innerHTML = `

            <div style="
                color: black;
                font-size: 42px;
                font-weight: bold;
                position: absolute;
                left: 27px;
                top: 23px;
            ">×2</div>

        `;


    /* +3 SEGUNDOS */

    } else if (
        tiempoActivado &&
        numero < 0.40
    ) {

        tipoBoton = "tiempo";

        boton.style.backgroundColor =
            "#2196F3";

        boton.style.border =
            "3px solid white";


        boton.innerHTML = `

            <div style="
                color: white;
                font-size: 30px;
                font-weight: bold;
                position: absolute;
                left: 18px;
                top: 32px;
            ">+3s</div>

        `;


    /* NORMAL */

    } else {

        tipoBoton = "normal";

        boton.style.backgroundColor =
            "white";

        boton.style.border =
            "none";

        boton.innerHTML = "";

    }


    boton.style.left =
        x + "px";

    boton.style.top =
        y + "px";

    boton.style.display =
        "block";


    desaparecedor =
        setTimeout(
            function() {

                if (
                    jugando &&
                    !pausado
                ) {

                    racha = 0;

                    rachaTexto.textContent =
                        "🔥 Racha: 0";


                    boton.style.display =
                        "none";


                    setTimeout(
                        function() {

                            if (
                                jugando &&
                                !pausado
                            ) {

                                boton.style.display =
                                    "block";

                                moverCirculo();

                            }

                        },
                        100
                    );

                }

            },
            tiempoDesaparicion
        );
}


/* ========================= */
/* RECORDS */
/* ========================= */

function actualizarRecords() {

    let lista =
        document.getElementById(
            "listaRecords"
        );


    lista.innerHTML = "";


    let medallas =
        ["🥇", "🥈", "🥉"];


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        let li =
            document.createElement(
                "li"
            );


        li.textContent =
            medallas[i] +
            " " +
            (records[i] || 0) +
            " puntos";


        lista.appendChild(li);

    }

}


actualizarRecords();


/* PAUSA OCULTA AL PRINCIPIO */

pausa.style.display =
    "none";