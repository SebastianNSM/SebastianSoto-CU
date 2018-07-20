'use strict';
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputHoras = document.querySelector('#numMaxHoras');
let inputPorcentaje = document.querySelector('#numMaxBeca');

let regexHoras = /^[0-9]{1,3}$/;
let regexBeca = /^[0-9]{1,2}$/;

let nHoras = 0;
let nPorcentaje = 0;

function obtenerDatos(){
    let infoBeca = [];

    let bError = false;

    nHoras = inputHoras.value;
    nPorcentaje = inputPorcentaje.value;

    bError = validar();

    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la información de beca, verifique que completó correctamente lo que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entiendo'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La información de beca se registró correctamente',
            type: 'success',
            //Agregue esto para que la confirmacion sea con timer
            showConfirmButton: false,
            timer: 2500
        });
        infoBeca.push(nHoras,nPorcentaje);
        registrarInfoBeca(infoBeca);
        limpiarFormulario();
    }
};

function limpiarFormulario(){
    inputHoras.value = "";
    inputPorcentaje.value = "";
};

function validar (){
    let bError = false;
    nHoras = inputHoras.value;
    nPorcentaje = inputPorcentaje.value;

    if(nHoras == 0 || regexHoras.test(nHoras) == false){
        bError = true;
        inputHoras.classList.add('errorInputs');
    } else {
        inputHoras.classList.remove('errorInputs');
    };
    if(nPorcentaje == 0 || regexBeca.test(nPorcentaje) == false){
        bError = true;
        inputPorcentaje.classList.add('errorInputs');
    } else {
        inputPorcentaje.classList.remove('errorInputs');
    };
    return bError;
};