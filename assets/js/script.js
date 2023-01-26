let tarjetasDestapadas = 0;
let primerResultado = null;
let segundoResultado = null;
let tarjeta1 = null;
let tarjeta2 = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false
let timer = 30;
let cuentaRegresiva = null;
let timerHtml = document.getElementById('tiempoRestante');
const modal = document.querySelector(".modal");
let botonesHtml = document.getElementsByClassName("botones");
const personajes = {
    1:"Mario",
    2:"Lugi",
    3:"Bowser",
    4:"Koopa",
    5:"Champiñón",
    6:"Star",
    7:"Toad",
    8:"Yoshi"
}

let winAudio = new Audio('/assets/sounds/ganaste.wav');
let loseAudio = new Audio('/assets/sounds/perdiste.wav');
let clickAudio = new Audio('/assets/sounds/click.wav');
let rigthAudio = new Audio('/assets/sounds/acierto.wav');
let wrongAudio = new Audio('/assets/sounds/error.wav');

let numeros = [1,8,2,7,3,6,5,4,5,8,6,3,7,2,4,1];
numeros.sort(()=>{return Math.random()-0.5});
agregarEventListenerBotones()

function destapar(boton) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    boton.innerHTML = `<img src="/assets/img/${numeros[boton.id]}.png" alt="imagen de ${personajes[numeros[boton.id]]}">`;
    boton.disabled = true;

    if (tarjetasDestapadas == 1) {
        tarjeta1 = boton;
        primerResultado = numeros[tarjeta1.id];
        clickAudio.play();
        
    } else if (tarjetasDestapadas == 2) {
        tarjeta2 = boton;
        segundoResultado = numeros[tarjeta2.id];
        incrementarMovimientos();
        verificarConcidencia(tarjeta1, tarjeta2);
    }
}

function incrementarMovimientos() {
    movimientos++;
    movimientosHtml = document.getElementById('cantMovimientos');
    movimientosHtml.innerHTML = movimientos;
    tarjetasDestapadas = 0
}

function verificarConcidencia(boton1, boton2) {
    if (primerResultado == segundoResultado) {
        rigthAudio.play();
        incrementarAciertos();
    } else {
        wrongAudio.play();
        setTimeout(()=>{
            boton1.innerHTML = ' ';
            boton1.disabled = false;
            boton2.innerHTML = ' ';
            boton2.disabled = false;
        },800);    
    }
}

function incrementarAciertos() {
    aciertos++;
    aciertosHtml = document.getElementById('cantAciertos');
    aciertosHtml.innerHTML = aciertos;
    if (aciertos == 8){
        winAudio.play();
        clearInterval(cuentaRegresiva);
        mostrarModal();
    }
}

function contarTiempo() {
    cuentaRegresiva = setInterval(()=>{
        timer --;
        timerHtml.innerHTML = timer;
        if (timer == 0) {
            clearInterval(cuentaRegresiva);
            bloquearTarjetas();
            loseAudio.play();
            mostrarModal();
        }
    },1000);
}

function bloquearTarjetas() {
    for (let boton in botonesHtml) {
        botonesHtml[boton].disabled = true;
        botonesHtml[boton].innerHTML = `<img src="/assets/img/${numeros[botonesHtml[boton].id]}.png" alt="imagen de ${personajes[numeros[botonesHtml[boton].id]]}">`;
    }
}

function agregarEventListenerBotones() {
    for (let i = 0; i <= 15; i++) {
        let boton = document.getElementById(i)
        boton.addEventListener('click', () => {
            destapar(boton);
        })
    }
}

function mostrarModal() {
    let contenidoModal = '<div class="modal_container">';
    if (aciertos == 8 ) {
        contenidoModal += '<h2>Ganaste</h2>';
        contenidoModal += '<img src="./assets/img/win.png" alt="imagen de Mario y Luigi">';
        contenidoModal += '<h4>Solo demoraste ' + (30-timer) + ' segundos</h4>'; 
    } else {
        contenidoModal += '<h2>Perdiste</h2>';
        contenidoModal += '<img src="./assets/img/lose.png" alt="imagen de Bowser">';
        contenidoModal += '<h4>aciertos: ' + aciertos + ' </h4>';
    }
    contenidoModal += '<h4>movimientos: ' + movimientos + ' </h4>'; 
    contenidoModal += '<a href="#" class="modalReiniciar" onclick="reiniciarJuego()">reiniciar juego</a>';
    contenidoModal += '</div>';
    modal.innerHTML= contenidoModal;
    modal.classList.add("modal--show");
}

function reiniciarJuego() {
    modal.classList.remove("modal--show");
    for (let boton in botonesHtml) {
        botonesHtml[boton].disabled = false;
        botonesHtml[boton].innerHTML = ``;
    }
    tarjetasDestapadas = 0;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = 30;
    numeros.sort(()=>{return Math.random()-0.5});
}