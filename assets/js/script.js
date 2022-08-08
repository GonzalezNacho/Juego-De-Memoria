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

let winAudio = new Audio('/assets/sounds/ganaste.wav');
let loseAudio = new Audio('/assets/sounds/perdiste.wav');
let clickAudio = new Audio('/assets/sounds/click.wav');
let rigthAudio = new Audio('/assets/sounds/acierto.wav');
let wrongAudio = new Audio('/assets/sounds/error.wav');

let numeros = [1,8,2,7,3,6,5,4,5,8,6,3,7,2,4,1];
numeros.sort(()=>{return Math.random()-0.5});

function destapar(boton) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(boton.id);
    boton.innerHTML = `<img src="/assets/img/${numeros[boton.id]}.png" alt="">`;
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
        alert("Ganaste");
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
            mostrarModalPerdiste();
        }
    },1000);
}

function bloquearTarjetas(){
    for (let boton in botonesHtml) {
        botonesHtml[boton].disabled = true;
        botonesHtml[boton].innerHTML = `<img src="/assets/img/${numeros[botonesHtml[boton].id]}.png" alt="asd">`;
    }
}

function mostrarModalPerdiste() {
    let aciertosModal = document.getElementById("aciertosModal");
    let movimientosModal = document.getElementById("movimientosModal");
    aciertosModal.innerHTML = aciertos;
    movimientosModal.innerHTML = movimientos;
    modal.classList.add("modal--show");
}

function reiniciarJuego() {
    modal.classList.remove("modal--show");
    for (let boton in botonesHtml) {
        botonesHtml[boton].disabled = false;
        botonesHtml[boton].innerHTML = ``;
    }
    tarjetasDestapadas = 0;
    /*primerResultado = null;
    segundoResultado = null;
    tarjeta1 = null;
    tarjeta2 = null;*/
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = 30;
    /*cuentaRegresiva = null;*/
    numeros.sort(()=>{return Math.random()-0.5});
}