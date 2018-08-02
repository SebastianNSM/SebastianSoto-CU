'use strict';
mostrarListaCarreras();
imprimirSedes();
imprimirCursos();

// Declaracion de variables globales
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputBuscar = document.querySelector('#txtBusqueda');
let inputNombre = document.querySelector('#txtNombre');
let inputGrado = document.querySelector('#txtGrado');
let inputCodigo = document.querySelector('#txtCodigo');
let inputCreditos = document.querySelector('#numCreditos');
let inputFecha = document.querySelector('#dateFecha');
let inputCurso = document.querySelector('#txtCurso');
inputFecha.valueAsDate = new Date();

let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActual);

let inputNombreActual = document.querySelector('#txtNombreActual');
let inputGradoActual = document.querySelector('#txtGradoActual');
let inputCodigoActual = document.querySelector('#txtCodigoActual');
let inputCreditosActual = document.querySelector('#numCreditosActual');
let inputFechaActual = document.querySelector('#dateFechaActual');
let inputSedeActual = document.querySelector('#txtSedeActual');
let inputCursoActual = document.querySelector('#txtCursoActual');
let inputEstadoActual = document.querySelector('#txtEstado');

inputFechaActual.valueAsDate = new Date();

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexCodigo = /^[a-zA-Z0-9-]+$/;
let regexCreditos = /^[0-9]{1,3}$/;

let dHoy = new Date();

let sNombre = "";
let sGrado = "";
let sCodigo = "";
let nCreditos = "";
let dFecha = dHoy;

let sNombreActual = "";
let sGradoActual = "";
let sSedeActual = "";
let sCodigoActual = "";
let nCreditosActual = "";
let dFechaActual = dHoy;

// Declaracion de variables globales


// Esta funcion prepara los inputs de sede para elegir de la lista correspondiente
function imprimirSedes() {
    let sltSede = document.querySelectorAll('select[name = "sede"]');
    sltSede.innerHTML = '';
    let listaSedes = obtenerListaSedes();

    for (let k = 0; k < sltSede.length; k++) {
        for (let i = 0; i < listaSedes.length; i++) {
            let inputSede = sltSede[k];
            let nuevaOpcion = new Option(listaSedes[i]['nombre_sede']);
            nuevaOpcion.value = listaSedes[i]['nombre_sede'];
            inputSede.options.add(nuevaOpcion);
        }
    }
}

// Esta funcion prepara los inputs cursos para la lista
function imprimirCursos() {
    let sltCurso = document.querySelectorAll('select[name = "curso"]');

    // Error si cambian el nombre de obtenerCursos
    let listaCurso = obtenerCursos();

    for (let k = 0; k < sltCurso.length; k++) {
        for (let i = 0; i < listaCurso.length; i++) {
            let inputCurso = sltCurso[k];
            let nuevaOpcion = new Option(listaCurso[i]['nombre_curso']);
            nuevaOpcion.value = listaCurso[i]['nombre_curso'];
            inputCurso.options.add(nuevaOpcion);
        }
    }
}

// Eliminar
// Eliminar
// Eliminar

function eliminar_carrera() {
    let _id = this.dataset._id;
    swal({
        title: 'Desea eliminar esta carrera?',
        text: "La carrera se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarCarrera(_id);
            
            reload();
            swal(
                'Eliminado!',
                'El usuario ha sido eliminado con éxito',
                'success'
            )
        }
    });

}

// Buscar
// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaCarreras(busqueda);
});

function buscarCarreraId() {
    let _id = this.dataset._id;
    let carrera = buscarCarrera(_id);

    inputNombreActual.value = carrera['nombre_carrera'];
    inputGradoActual.value = carrera['grado_carrera'];
    inputCodigoActual.value = carrera['codigo_carrera'];
    inputCreditosActual.value = carrera['creditos_carrera'];
    inputFechaActual.value = carrera['fecha_carrera'];
    inputSedeActual.value = carrera['sedes_carrera'];
    inputCursoActual.value = carrera['cursos_carrera'];
    inputEstadoActual.value = carrera['estado_carrera'];

}

// Listar
// Listar
// Listar
function mostrarListaCarreras(paBuscar) {
    let listaCarreras = obtenerListaCarreras();
    let tbody = document.querySelector('#tblCarreras tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaCarreras.length; i++) {
        if ((listaCarreras[i]['nombre_carrera'].toLowerCase().includes(paBuscar.toLowerCase())) || (listaCarreras[i]['grado_carrera'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaGrado = fila.insertCell();
            let celdaCodigo = fila.insertCell();
            let celdaCreditos = fila.insertCell();
            let celdaFechaCreacion = fila.insertCell();
            let celdaSede = fila.insertCell();
            let celdaCursos = fila.insertCell();
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

            // Esto cambia el estado de la carrera en caso de no estar definida
            if (listaCarreras[i]['sedes_carrera'].length != 0) {
                for (let s = 0; s < listaCarreras[i]['sedes_carrera'].length; s++) {
                    if (listaCarreras[i]['sedes_carrera'][s]['nombre_sede'] != undefined) {
                        celdaSede.innerHTML = listaCarreras[i]['sedes_carrera'][s]['nombre_sede'];
                    }
                }
            } else {
                celdaSede.innerHTML = "-";
            }

            // Esto cambia el estado de la carrera en caso de no estar definida
            if (listaCarreras[i]['cursos_carrera'].length != 0) {
                for (let s = 0; s < listaCarreras[i]['cursos_carrera'].length; s++) {
                    if (listaCarreras[i]['cursos_carrera'][s]['nombre_curso'] != undefined) {
                        celdaCursos.innerHTML = listaCarreras[i]['cursos_carrera'][s]['nombre_curso'];
                    }
                }
            } else {
                celdaCursos.innerHTML = "-";
            }

            celdaEstado.innerHTML = listaCarreras[i]['estado_carrera'];

            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');

            botonEditar.dataset._id = listaCarreras[i]['_id'];

            botonEditar.addEventListener('click', function () {

                ppActualizar.style.display = "block";
            });

            celdaOpciones.appendChild(botonEditar);



            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset._id = listaCarreras[i]['_id'];

            botonEliminar.addEventListener('click', eliminar_carrera);

            celdaOpciones.appendChild(botonEliminar);



            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');

            botonAsociar.dataset._id = listaCarreras[i]['_id'];

            botonAsociar.addEventListener('click', function () {
                ppAsociar.style.display = "block";
            });

            celdaOpciones.appendChild(botonAsociar);

        }
    }
};

// Registrar
// Registrar
// Registrar

function obtenerDatos() {
    let infoCarrera = [];

    sNombre = inputNombre.value;
    sGrado = inputGrado.value;
    sCodigo = inputCodigo.value;
    nCreditos = inputCreditos.value;
    dFecha = inputFecha.value;

    let bError = false;
    bError = validarRegistrar();

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
        $('.swal2-confirm').click(function () {
            reload();
        });
        limpiarFormularioRegistrar();
    }
};

// Modificar
// Modificar
// Modificar
function obtenerDatosActual() {
    let infoCarreraActual = [];

    sNombreActual = inputNombreActual.value;
    sGradoActual = inputGradoActual.value;
    sSedeActual = inputSedeActual.value;
    sCodigoActual = inputCodigoActual.value;
    dFechaActual = inputFechaActual.value;

    let bError = false;
    bError = validarActualizar();

    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar la carrera, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Actualización correcta',
            text: 'La carrera se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoCarreraActual.push(sNombre, sGrado, sCodigo, nCreditos, dFecha, sSede);
        registrarCarrera(infoCarrera);
        $('.swal2-confirm').click(function () {
            reload();
        });
        limpiarFormularioModificar();
    }
};

function validarRegistrar() {
    let bError = false;
    sNombre = inputNombre.value;
    sGrado = inputGrado.value;
    sCodigo = inputCodigo.value;
    nCreditos = Number(inputCreditos.value);
    dFecha = new Date(inputFecha.value);

    // Validacion contra blancos
    let arregloInputs = document.querySelectorAll('#sct_registrar input:required');
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
function validarActualizar() {
    let bError = false;
    sNombre = inputNombre.value;
    sGrado = inputGrado.value;
    sCodigo = inputCodigo.value;
    nCreditos = Number(inputCreditos.value);
    dFecha = new Date(inputFecha.value);

    // Validacion contra blancos
    let arregloInputs = document.querySelectorAll('#sct_registrar input:required');
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

// Display formulario registrar
let botonAgregar = document.querySelector('#btnAgregar');

let ppRegistrar = document.querySelector('#sct_registrar');
let ppAsociar = document.querySelector('#sct_asociar');
let ppActualizar = document.querySelector('#sct_modificar');

botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});

window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormularioRegistrar();
    }
    if (event.target == ppAsociar) {
        ppAsociar.style.display = "none";
    }
    if (event.target == ppActualizar) {
        ppActualizar.style.display = "none";
    }

}

function limpiarAsociar() {
    inputNombre.value = "";
    inputGrado.value = "";
    inputCodigo.value = "";
    inputCreditos.value = "";
    inputFecha.valueAsDate = dHoy;
};

function limpiarFormularioRegistrar() {
    inputNombre.value = "";
    inputGrado.value = "";
    inputCodigo.value = "";
    inputCreditos.value = "";
    inputFecha.valueAsDate = dHoy;
};

function limpiarFormularioModificar() {
    inputNombre.value = "";
    inputGrado.value = "";
    inputCodigo.value = "";
    inputCreditos.value = "";
    inputFecha.valueAsDate = dHoy;
};

function reload() {
    mostrarListaCarreras();
    imprimirSedes();
    imprimirCursos();
}
// Esto es para que despliegue el formulario