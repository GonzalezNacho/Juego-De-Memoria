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
    boton.innerHTML = `<img src="/assets/img/${numeros[boton.id]}.png" alt="asd">`;
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
        incrementarAciertos();
        rigthAudio.play();
    } else {
        setTimeout(()=>{
            boton1.innerHTML = ' ';
            boton1.disabled = false;
            boton2.innerHTML = ' ';
            boton2.disabled = false;
            wrongAudio.play();
        },800);    
    }
}

function incrementarAciertos() {
    aciertos++;
    aciertosHtml = document.getElementById('cantAciertos');
    aciertosHtml.innerHTML = aciertos;
    if (aciertos == 8){
        alert("Ganaste");
        clearInterval(cuentaRegresiva);
        winAudio.play();
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
            alert('perdiste');
        }
    },1000);
}

function bloquearTarjetas(){
    botonesHtml = document.getElementsByClassName("botones");
    for (let boton in botonesHtml) {
        botonesHtml[boton].disabled = true;
        botonesHtml[boton].innerHTML = `<img src="/assets/img/${numeros[botonesHtml[boton].id]}.png" alt="asd">`;
    }
}