'use strict';
mostrarListaCarreras();
imprimirSedes();

let inputBuscar = document.querySelector('#txtBusqueda');
let popup;

// Buscar
// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaCarreras(busqueda);
});

// Listar
// Listar
// Listar
function mostrarListaCarreras(paBuscar) {
    let listaCarreras = obtenerListaCarreras();
    let tbody = document.querySelector('#tblCarreras tbody');
    tbody.innerHTML = '';
    if (paBuscar != undefined) {
        for (let i = 0; i < listaCarreras.length; i++) {
            if (listaCarreras[i]['nombre_carrera'].toLowerCase().includes(paBuscar.toLowerCase())) {
                let fila = tbody.insertRow();
                let celdaNombre = fila.insertCell();
                let celdaGrado = fila.insertCell();
                let celdaCodigo = fila.insertCell();
                let celdaCreditos = fila.insertCell();
                let celdaFechaCreacion = fila.insertCell();
                let celdaSede = fila.insertCell();
                let celdaEstado = fila.insertCell();
                let celdaOpciones = fila.insertCell();

                celdaNombre.innerHTML = listaCarreras[i]['nombre_carrera'];
                celdaGrado.innerHTML = listaCarreras[i]['grado_carrera'];
                celdaCodigo.innerHTML = listaCarreras[i]['codigo_carrera'];
                celdaCreditos.innerHTML = listaCarreras[i]['creditos_carrera'];
                // Fecha de creacion

                // Esto separa la informacion de la fecha
                let dFecha = new Date(listaCarreras[i]['fecha_carrera']);
                let nDia = dFecha.getUTCDate();
                let nMes = dFecha.getUTCMonth() + 1;
                let nAnno = dFecha.getUTCFullYear();
                // Esto despliega la informacion separada para darle formato
                celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;;

                // Fecha de creacion
                celdaSede.innerHTML = listaCarreras[i]['sede_carrera'];
                celdaEstado.innerHTML = listaCarreras[i]['estado_carrera'];


                // Este es el boton de editar
                let botonEditar = document.createElement('span');
                botonEditar.classList.add('fas');
                botonEditar.classList.add('fa-cogs');

                celdaOpciones.appendChild(botonEditar);

                // Este es el boton de eliminar
                let botonEliminar = document.createElement('span');
                botonEliminar.classList.add('fas');
                botonEliminar.classList.add('fa-trash-alt');

                celdaOpciones.appendChild(botonEliminar);

                // Este es el boton de asociar
                let botonAsociar = document.createElement('span');
                botonAsociar.classList.add('fas');
                botonAsociar.classList.add('fa-link');

                celdaOpciones.appendChild(botonAsociar);

                // Icono de editar: <i class="fas fa-cogs"></i>
                // Icono de eliminar: <i class="fas fa-trash-alt"></i>
            }
        }
    }
    else {
        for (let i = 0; i < listaCarreras.length; i++) {
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaGrado = fila.insertCell();
            let celdaCodigo = fila.insertCell();
            let celdaCreditos = fila.insertCell();
            let celdaFechaCreacion = fila.insertCell();
            let celdaSede = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaCarreras[i]['nombre_carrera'];
            celdaGrado.innerHTML = listaCarreras[i]['grado_carrera'];
            celdaCodigo.innerHTML = listaCarreras[i]['codigo_carrera'];
            celdaCreditos.innerHTML = listaCarreras[i]['creditos_carrera'];
            // Fecha de creacion

            // Esto separa la informacion de la fecha
            let dFecha = new Date(listaCarreras[i]['fecha_carrera']);
            let nDia = dFecha.getUTCDate();
            let nMes = dFecha.getUTCMonth() + 1;
            let nAnno = dFecha.getUTCFullYear();
            // Esto despliega la informacion separada para darle formato
            celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;;

            // Fecha de creacion
            celdaSede.innerHTML = listaCarreras[i]['sede_carrera'];
            celdaEstado.innerHTML = listaCarreras[i]['estado_carrera'];


            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');

            celdaOpciones.appendChild(botonEditar);

            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');

            celdaOpciones.appendChild(botonEliminar);

            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');

            celdaOpciones.appendChild(botonAsociar);
        }

    }


};

// Registrar
// Registrar
// Registrar
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputNombre = document.querySelector('#txtNombre');
let inputGrado = document.querySelector('#txtGrado');
let inputCodigo = document.querySelector('#txtCodigo');
let inputCreditos = document.querySelector('#numCreditos');
let inputFecha = document.querySelector('#dateFecha');
inputFecha.valueAsDate = new Date();
let inputSede = document.querySelector('#txtSede');

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexCodigo = /^[a-zA-Z0-9-]+$/;
let regexCreditos = /^[0-9]{1,3}$/;

let dHoy = new Date();

let sNombre = "";
let sGrado = "";
let sCodigo = "";
let nCreditos = "";
let dFecha = dHoy;
let sSede = "";

function obtenerDatos() {
    let infoCarrera = [];

    sNombre = inputNombre.value;
    sGrado = inputGrado.value;
    sCodigo = inputCodigo.value;
    nCreditos = inputCreditos.value;
    dFecha = inputFecha.value;
    sSede = inputSede.value;

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
        infoCarrera.push(sNombre, sGrado, sCodigo, nCreditos, dFecha, sSede);
        registrarCarrera(infoCarrera);
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        limpiarFormulario();
    }
};
function validar() {
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
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };

    // Validacion para el nombre
    if (regexSoloLetras.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    };

    // Validacion para la sede
    if (sSede == "") {
        bError = true;
        inputSede.classList.add('errorInput');
    } else {
        inputSede.classList.remove('errorInput');
    };
    // Validacion para el grado
    if (sGrado == "") {
        bError = true;
        inputGrado.classList.add('errorInput');
    } else {
        inputGrado.classList.remove('errorInput');
    };

    // Validacion para el codigo
    if (regexCodigo.test(sCodigo) == false) {
        bError = true;
        inputCodigo.classList.add('errorInput');
    } else {
        inputCodigo.classList.remove('errorInput');
    };

    // Validacion para los creditos
    if ((regexCreditos.test(nCreditos) == false) || nCreditos < inputCreditos.min || nCreditos > inputCreditos.max) {
        bError = true;
        inputCreditos.classList.add('errorInput');
    } else {
        inputCreditos.classList.remove('errorInput');
    };

    // Validacion de la fecha
    if (dFecha > dHoy || inputFecha.value == "") {
        bError = true;
        inputFecha.classList.add('errorInput');
    } else {
        inputFecha.classList.remove('errorInput');
    };

    return bError;
};

function imprimirSedes() {
    let sltSede = document.querySelector('#txtSede');
    let listaSedes = obtenerListaSedes();

    for (let i = 0; i < listaSedes.length; i++) {
        let nuevaOpcion = new Option(listaSedes[i]['nombre_sede'], listaSedes[i]['nombre_sede']);
        sltSede.appendChild(nuevaOpcion);
    }
}
function limpiarFormulario() {
    inputNombre.value = "";
    inputGrado.value = "";
    inputCodigo.value = "";
    inputCreditos.value = "";
    inputFecha.valueAsDate = dHoy;
    inputSede.value = "";
};

// Display formulario registrar
let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', function () {
    popup = document.querySelector('#sct_registrar');
    popup.style.display = "block";
});

// Esto es para que se salga del formulario si toca fuera del contenido
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
       limpiarFormulario();
    }
}
function clean() {
    popup.style.display = "none";
    limpiarFormulario();
}
function reload(){
    location.reload();
}
// Esto es para que despliegue el formulario