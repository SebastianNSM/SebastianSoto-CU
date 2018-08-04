'use strict';
mostrarListaCarreras();
imprimirSedes();
imprimirCursos();

// Esto es para el registrar
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);
let inputBuscar = document.querySelector('#txtBusqueda');
let inputNombre = document.querySelector('#txtNombre');
let inputGrado = document.querySelector('#txtGrado');
let inputCodigo = document.querySelector('#txtCodigo');
let inputCreditos = document.querySelector('#numCreditos');
let inputFecha = document.querySelector('#dateFecha');
inputFecha.valueAsDate = new Date();

// Esto es para el modificar
let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActual);
let inputNombreActual = document.querySelector('#txtNombreActual');
let inputGradoActual = document.querySelector('#txtGradoActual');
let inputCodigoActual = document.querySelector('#txtCodigoActual');
let inputCreditosActual = document.querySelector('#numCreditosActual');
let inputFechaActual = document.querySelector('#dateFechaActual');
let inputSedeActual = document.querySelector('#txtSedeActual');
let inputCursoActual = document.querySelector('#txtCursoActual');
let inputEstadoActual = document.querySelector('#txtEstadoActual');
let inputIdCarrera = document.querySelector('#txtId');

// Esto es para el asociar
let btnAsociar = document.querySelector('#btnAsociar');
btnAsociar.addEventListener('click', obtenerDatosAsociar);
let inputSedeAsociar = document.querySelector('#txtSedeAsociar');
let inputCursoAsociar = document.querySelector('#txtCursoAsociar');


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
let sCursoActual = "";
let sCodigoActual = "";
let nCreditosActual = "";
let dFechaActual = dHoy;
let sEstadoActual = "";

let sSedeAsociar = "";
let sCursoAsociar = "";


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
            nuevaOpcion.dataset._id = listaSedes[i]['_id'];
            inputSede.options.add(nuevaOpcion);
        }
    }
}
// Esta funcion prepara los inputs cursos para la lista
function imprimirCursos() {
    let sltCurso = document.querySelectorAll('select[name = "curso"]');
    sltCurso.innerHTML = '';
    // Error si cambian el nombre de obtenerCursos
    let listaCurso = obtenerCursos();

    for (let k = 0; k < sltCurso.length; k++) {
        for (let i = 0; i < listaCurso.length; i++) {
            let optionCurso = sltCurso[k];
            let nuevaOpcion = new Option(listaCurso[i]['nombre_curso']);
            nuevaOpcion.value = listaCurso[i]['nombre_curso'];
            optionCurso.options.add(nuevaOpcion);
        }
    }
}


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
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaCarreras(busqueda);
});
function buscar_por_carrera_id() {
    let _id = this.dataset._id;
    let carrera = buscarCarrera(_id);

    inputNombreActual.value = carrera['nombre_carrera'];
    inputGradoActual.value = carrera['grado_carrera'];
    inputCodigoActual.value = carrera['codigo_carrera'];
    inputCreditosActual.value = Number(carrera['creditos_carrera']);
    inputIdCarrera.value = _id;

    // Esto es para que se pueda meter la fecha
    let fechaCompleta = new Date(carrera['fecha_carrera']);
    let anno = fechaCompleta.getUTCFullYear();
    let mes = fechaCompleta.getUTCMonth() + 1;
    let dia = fechaCompleta.getUTCDate();
    let stringFecha = anno + "-" + mes + "-" + dia;
    inputFechaActual.valueAsDate = new Date(stringFecha);


    // Solo imprime el primer curso que tenga
    let valorCurso;
    let idCurso;
    if (tieneAsociado(carrera, 'cursos_carrera')) {
        valorCurso = carrera['cursos_carrera'][0]['nombre_curso'];
        idCurso = carrera['cursos_carrera'][0]['_id'];
    } else {
        valorCurso = "";
        idCurso = "";
    }
    inputCursoActual.value = valorCurso;
    // AYUDA PABS

    inputCursoActual.dataset._id = idCurso;
    inputEstadoActual.value = carrera['estado_carrera'];
    inputIdCarrera.value = carrera['_id'];
}
function tieneAsociado(objeto, contenido) {
    if (objeto[contenido].length != 0)
        return true;
    else
        return false;
}


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
    }
};


// Asociar
// Asociar
// Asociar
function obtenerDatosAsociar() {
    let _id = this.dataset._id;
    let nombreSede = inputSedeAsociar.value;
    let nombreCurso = inputCursoAsociar.value;

    // En caso de que sedes tenga informacion
    if (nombreSede != "") {
        let nombre_carrera = inputSedeAsociar.dataset.nombre_carrera;
        let codigo_carrera = inputSedeAsociar.dataset.codigo_carrera;
        let idSede = getIdSede(nombreSede);

        agregarCarreraSede(idSede, nombre_carrera, codigo_carrera);
    }
    // En caso de que cursos tenga informacion
    if (nombreCurso != "") {
        let infoCurso = getInfoCurso(nombreCurso);
        let idCurso = infoCurso['_id'];
        infoCurso = buscar_curso_id(idCurso);

        swal({
            title: 'Asociación correcta',
            text: 'La información se asoció correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });

        agregarCursoCarrera(_id, infoCurso['nombre_curso'], infoCurso['codigo_curso']);

        $('.swal2-confirm').click(function () {
            reload();
        });
    }
    ppAsociar.style.display = "none";
}
function getInfoCurso(pCursoNombre) {
    let listaCurso = obtenerCursos();
    let informacionCurso = "";
    for (let i = 0; i < listaCurso.length; i++) {
        if (listaCurso[i]['nombre_curso'] == pCursoNombre) {
            let cursoId = listaCurso[i]['_id'];
            informacionCurso = buscar_curso_id(cursoId);
        }
    }
    return informacionCurso;
}
function getIdSede(pSedeNombre) {
    let listaSedes = obtenerListaSedes();
    let idSede;
    for (let i = 0; i < listaSedes.length; i++) {
        if (listaSedes[i]['nombre_sede'] == pSedeNombre) {
            idSede = listaSedes[i]['_id'];
            break;
        }
    }
    return idSede;

}

// Modificar
// Esto recibe la sede actual, no funciona (mantenimiento)
function obtenerDatosActual() {
    let infoCarreraActual = [];

    let id = inputIdCarrera.value;
    sNombreActual = inputNombreActual.value;
    sGradoActual = inputGradoActual.value;
    sCodigoActual = inputCodigoActual.value;
    nCreditosActual = inputCreditosActual.value;
    dFechaActual = inputFechaActual.value;
    // sSedeActual = inputSedeActual.value;
    sCursoActual = inputCursoActual.value;
    sEstadoActual = inputEstadoActual.value;

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
        infoCarreraActual.push(id, sNombreActual, sGradoActual, sCodigoActual, nCreditosActual, dFechaActual, sSedeActual, sCursoActual, sEstadoActual);
        actualizarCarrera(infoCarreraActual);
        $('.swal2-confirm').click(function () {
            reload();
        });
    }
};


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
            celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;

            // Esto es lo que hace por defecto, mientras no tenga el asociar de sedes listo
            let listaSedes = obtenerListaSedes();

            // Esto va por cada sede registrada
            for (let i = 0; i < listaSedes.length; i++) {
                // Si la sede tiene carreras
                if (listaSedes[i]['carreras_sede'] != "") {
                    // Esto va por cada carrera de dicha sede
                    for (let j = 0; listaSedes[i]['carreras_sede'].length; j++) {

                        if (listaCarreras['carreras_sede'] == null) {
                            celdaSede.innerHTML = "-";
                        } else {
                            let carreraSede = listaSedes['carreras_sede'][j]['nombre_carrera'];
                            console.log(carreraSede);
                        }
                    }
                }else{
                    celdaSede.innerHTML = "-";
                }
            }

            // Esto Imprime el curso que tenga asociado en caso de tener algo
            let aCursosCarrera = listaCarreras[i]['cursos_carrera'];
            if (aCursosCarrera.length > 0) {
                for (let j = 0; j < aCursosCarrera.length; j++) {
                    if (aCursosCarrera[j] == null) {
                        celdaCursos.innerHTML = "-";
                    } else {
                        celdaCursos.innerHTML = aCursosCarrera[j]['nombre_curso'];
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

            botonEditar.addEventListener('click', buscar_por_carrera_id);
            botonEditar.addEventListener('click', function () {
                ppActualizar.style.display = "block";

                // Agregar esto a los formularios que tengan mucho contenido (hace una animacion de scroll a la parte superior del formulario)
                $(".scroll").animate({ scrollTop: 0 }, "fast");
            });
            celdaOpciones.appendChild(botonEditar);



            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');
            botonEliminar.dataset._id = listaCarreras[i]['_id'];

            celdaOpciones.appendChild(botonEliminar);
            botonEliminar.addEventListener('click', eliminar_carrera);
            // Este es el boton de eliminar



            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');

            botonAsociar.dataset._id = listaCarreras[i]['_id'];

            botonAsociar.addEventListener('click', function () {
                ppAsociar.style.display = "block";
                inputSedeAsociar.dataset.nombre_carrera = listaCarreras[i]['nombre_carrera'];
                inputSedeAsociar.dataset.codigo_carrera = listaCarreras[i]['codigo_carrera'];
                btnAsociar.dataset._id = botonAsociar.dataset._id;
            });

            celdaOpciones.appendChild(botonAsociar);

        }
    }
};


// Validar
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
    sNombreActual = inputNombreActual.value;
    sGradoActual = inputGradoActual.value;
    sCodigoActual = inputCodigoActual.value;
    nCreditosActual = Number(inputCreditosActual.value);
    dFechaActual = new Date(inputFechaActual.value);

    // Validacion contra blancos
    let arregloInputsModificar = document.querySelectorAll('#sct_modificar input:required');
    for (let i = 0; i < arregloInputsModificar.length; i++) {
        if (arregloInputsModificar[i].value == '') {
            bError = true;
            arregloInputsModificar[i].classList.add('errorInput');
        } else {
            arregloInputsModificar[i].classList.remove('errorInput');
        }
    };

    // Validacion para el nombre
    if (regexSoloLetras.test(sNombreActual) == false) {
        bError = true;
        inputNombreActual.classList.add('errorInput');
    } else {
        inputNombreActual.classList.remove('errorInput');
    };

    // Validacion para el grado
    if (sGradoActual == "") {
        bError = true;
        inputGradoActual.classList.add('errorInput');
    } else {
        inputGradoActual.classList.remove('errorInput');
    };

    // Validacion para el codigo
    if (regexCodigo.test(sCodigoActual) == false) {
        bError = true;
        inputCodigoActual.classList.add('errorInput');
    } else {
        inputCodigoActual.classList.remove('errorInput');
    };

    // Validacion para los creditos
    if ((regexCreditos.test(nCreditosActual) == false) || nCreditosActual < inputCreditosActual.min || nCreditosActual > inputCreditosActual.max) {
        bError = true;
        inputCreditosActual.classList.add('errorInput');
    } else {
        inputCreditosActual.classList.remove('errorInput');
    };

    // Validacion de la fecha
    if (dFechaActual > dHoy || inputFechaActual.value == "") {
        bError = true;
        inputFechaActual.classList.add('errorInput');
    } else {
        inputFechaActual.classList.remove('errorInput');
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
        // Actualizar en cada caso de uso
    }
    if (event.target == ppAsociar) {
        ppAsociar.style.display = "none";
        limpiarAsociar();
    }
    if (event.target == ppActualizar) {
        ppActualizar.style.display = "none";
        limpiarFormularioModificar();
    }

}

function limpiarAsociar() {
    inputSedeAsociar.value = "";
    inputCursoAsociar.value = "";
};

function limpiarFormularioRegistrar() {
    inputNombre.value = "";
    inputGrado.value = "";
    inputCodigo.value = "";
    inputCreditos.value = "";
    inputFecha.valueAsDate = dHoy;
};

function limpiarFormularioModificar() {
    inputNombreActual.value = "";
    inputGradoActual.value = "";
    inputCodigoActual.value = "";
    inputCreditosActual.value = "";
    inputFechaActual.value = "";
    inputSedeActual.value = "";
    inputCursoActual.value = "";
    inputEstadoActual.value = "";

};

function reload() {
    mostrarListaCarreras();
    limpiarAsociar();
    limpiarFormularioModificar();
    limpiarFormularioRegistrar();
    ppRegistrar.style.display = "none";
    ppAsociar.style.display = "none";
    ppActualizar.style.display = "none";
}
// Esto es para que despliegue el formulario