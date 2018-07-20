'use strict';
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputNombre = document.querySelector('#txtNombre');
let inputGrado = document.querySelector('#txtGrado');
let inputCodigo = document.querySelector('#txtCodigo');
let inputCreditos = document.querySelector('#numCreditos');
let inputFecha = document.querySelector('#dateFecha');

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexCodigo = /^[a-zA-Z0-9-]+$/;
let regexCreditos = /^[0-9]{1,3}$/;

let dHoy = new Date();
let sNombre = "";
let sGrado = "Seleccione una opción";
let sCodigo = "";
let nCreditos = 0;
let dFecha = dHoy;

function obtenerDatos ()
{
    let infoCarrera = [];

    sNombre = inputNombre.value;
    sGrado = inputGrado.value;
    sCodigo = inputCodigo.value;
    nCreditos = inputCreditos.value;
    dFecha = inputFecha.value;

    let bError = false;
    bError = validar();

    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la carrera, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La carrera se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoCarrera.push(sNombre, sGrado, sCodigo, nCreditos, dFecha);
        registrarCarrera(infoCarrera);
        limpiarFormulario();
    }
};


function validar ()
{
    let bError = false;
    sNombre = inputNombre.value;
    sGrado = inputGrado.value;
    sCodigo = inputCodigo.value;
    nCreditos = Number(inputCreditos.value);
    dFecha = new Date(inputFecha.value);

    // Validacion contra blancos
    let arregloInputs = document.querySelectorAll('input:required');
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInputs');
        } else {
            arregloInputs[i].classList.remove('errorInputs');
        }
    };

    // Validacion para el nombre
    if (regexSoloLetras.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInputs');
    } else {
        inputNombre.classList.remove('errorInputs');
    };

    // Validacion para el grado
    if(sGrado == ""){
        bError = true;
        inputGrado.classList.add('errorInputs');
    } else {
        inputGrado.classList.remove('errorInputs');
    };

    // Validacion para el codigo
    if (regexCodigo.test(sCodigo) == false) {
        bError = true;
        inputCodigo.classList.add('errorInputs');
    } else {
        inputCodigo.classList.remove('errorInputs');
    };

    // Validacion para los creditos
    if ((regexCreditos.test(nCreditos) == false) || nCreditos === 0) {
        bError = true;
        inputCreditos.classList.add('errorInputs');
    } else {
        inputCreditos.classList.remove('errorInputs');
    };

    // Validacion de la fecha
    if (dFecha > dHoy||  inputFecha.value == "") {
        bError = true;
        inputFecha.classList.add('errorInputs');
    } else {
        inputFecha.classList.remove('errorInputs');
    };
    
    return bError;
};

function limpiarFormulario ()
{
    inputNombre.value = "";
    inputGrado.value = "";
    inputCodigo.value = "";
    inputCreditos.value = "";
    inputFecha.value = "";
};


