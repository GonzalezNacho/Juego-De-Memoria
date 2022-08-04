let tarjetasDestapadas = 0;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;


let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function destapar(boton) {
    tarjetasDestapadas++;

    if (tarjetasDestapadas == 1) {
        primerResultado = numeros[boton.id];
        boton.innerHTML = primerResultado;
        boton.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        segundoResultado = numeros[boton.id];
        boton.innerHTML = segundoResultado;
        boton.disabled = true;
        movimientos++;
    }
}