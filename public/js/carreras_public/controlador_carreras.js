'use strict';
mostrarListaCarreras();
mostrarSedes();
mostrarCursos();

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
let inputEstadoActual = document.querySelector('#txtEstadoActual');
let inputIdCarrera = document.querySelector('#txtId');

// Esto es para el asociar
let btnAsociar = document.querySelector('#btnAsociar');
btnAsociar.addEventListener('click', obtenerDatosAsociar);




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
let sCodigoActual = "";
let nCreditosActual = "";
let dFechaActual = dHoy;
let sEstadoActual = "";


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
function buscarCarrera() {
    let _id = this.dataset._id;
    let carrera = buscar_por_carrera_id(_id);

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

    inputEstadoActual.value = carrera['estado_carrera'];
    inputIdCarrera.value = carrera['_id'];
}

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
    }
};


// Asociar
// Asociar

// paSedes es el arreglo de sedes checkeadas
function limpiarSubdocumentoSede(idSede, idCarreraEliminar) {
    let infoSede = obtener_sede_por_id(idSede);
    for (let i = 0; i < infoSede['carreras_sede'].length; i++) {
        if(infoSede['carreras_sede'][i]['_id'] == idCarreraEliminar){
            console.log('Se elimino: '+infoSede['carreras_sede'][i]['_id']);
        }
        
        // eliminarCarreraSede(idSede, infoSede['carreras_sede'][i]['_id']);
    }
}
function limpiarSubdocumentosCarrera(idCarrera) {
    let infoCarrera = buscar_por_carrera_id(idCarrera);
    for (let i = 0; i < infoCarrera['cursos_carrera'].length; i++) {
        eliminarCursoCarrera(idCarrera, infoCarrera['cursos_carrera'][i]['_id']);
    }
}

function obtenerDatosAsociar() {

    swal({
        title: '¿Desea realizar estos cambios?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {

            let nombre_carrera = ppAsociar.dataset.nombre_carrera;
            let codigo_carrera = ppAsociar.dataset.codigo_carrera;
            let id_carrera = ppAsociar.dataset._id;

            limpiarSubdocumentosCarrera(id_carrera);

            let aCursosChecked = document.querySelectorAll('#divCursoAsociar input[type=checkbox]:checked');
            let aSedesChecked = document.querySelectorAll('#divSedeAsociar input[type=checkbox]:checked');

            if (aCursosChecked.length > 0) {
                for (let i = 0; i < aCursosChecked.length; i++) {
                    let infoCurso = getInfoCurso(aCursosChecked[i].id);
                    agregarCursoCarrera(id_carrera, infoCurso['nombre_curso'], infoCurso['codigo_curso']);
                }
            }
            if (aSedesChecked.length > 0) {
                for (let i = 0; i < aSedesChecked.length; i++) {
                    let idSede = getIdSede(aSedesChecked[i].id);
                    agregarCarreraSede(idSede, nombre_carrera, codigo_carrera);
                }
            }else{
                
            }
            reload();
        }
    });
}

function getCursosCarrera(id_carrera) {
    let infoCarrera = buscar_por_carrera_id(id_carrera);
    let aCursosCarrera = [];
    for (let i = 0; i < infoCarrera['cursos_carrera'].length; i++) {
        aCursosCarrera.push(infoCarrera['cursos_carrera'][i]['nombre_curso']);
    }
    return aCursosCarrera;
};

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
};
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

};


// Estas funciones muestran el checkbox en el asociar
function mostrarSedes() {
    let divSedeAsociar = document.querySelector('#divSedeAsociar');
    let listaSedes = obtenerListaSedes();
    for (let i = 0; i < listaSedes.length; i++) {

        let newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = listaSedes[i]['nombre_sede'];

        let newLabel = document.createElement('label');
        newLabel.htmlFor = newInput.id;
        let newSpan = document.createElement('span');
        newSpan.textContent = listaSedes[i]['nombre_sede'];

        divSedeAsociar.appendChild(newInput);
        divSedeAsociar.appendChild(newLabel);
        newLabel.appendChild(newSpan);
    }
};
function mostrarCursos() {
    let divCursoAsociar = document.querySelector('#divCursoAsociar');
    let listaCurso = obtenerCursos();
    for (let i = 0; i < listaCurso.length; i++) {

        let newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = listaCurso[i]['nombre_curso'];

        let newLabel = document.createElement('label');
        newLabel.htmlFor = newInput.id;
        let newSpan = document.createElement('span');
        newSpan.textContent = listaCurso[i]['nombre_curso'];

        divCursoAsociar.appendChild(newInput);
        divCursoAsociar.appendChild(newLabel);
        newLabel.appendChild(newSpan);
    }
};


// Modificar
function obtenerDatosActual() {
    let infoCarreraActual = [];

    let id = inputIdCarrera.value;
    sNombreActual = inputNombreActual.value;
    sGradoActual = inputGradoActual.value;
    sCodigoActual = inputCodigoActual.value;
    nCreditosActual = inputCreditosActual.value;
    dFechaActual = inputFechaActual.value;
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
        infoCarreraActual.push(id, sNombreActual, sGradoActual, sCodigoActual, nCreditosActual, dFechaActual, sEstadoActual);
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

            // Arreglo de cursos en la carrera i
            let aCursosCarrera = listaCarreras[i]['cursos_carrera'];
            if (aCursosCarrera.length > 0 && aCursosCarrera != null) {

                // Crear boton para ver cursos
                let btnVerCursos = document.createElement('button');
                // Le asigna el name para darle los estilos
                btnVerCursos.name = 'btnTabla';
                btnVerCursos.dataset.nombre_carrera = listaCarreras[i]['nombre_carrera'];
                // Esto le asigna un id al boton usando el codigo de la carrera
                btnVerCursos.id = 'btn' + listaCarreras[i]['codigo_carrera'];
                // Escribe en el boton
                btnVerCursos.textContent = 'Ver cursos';


                // Por cada boton como evento, genera la informacion en tabla
                btnVerCursos.addEventListener('click', function () {


                    let listaCursosAsociados = [];
                    for (let j = 0; j < aCursosCarrera.length; j++) {
                        let infoCursoActual = [];
                        infoCursoActual.push(aCursosCarrera[j]['nombre_curso'], aCursosCarrera[j]['codigo_curso']);
                        listaCursosAsociados.push(infoCursoActual);
                    }
                    ppCursosAsociados.style.display = "block";
                    let tblCursos = document.querySelector('#tblCursos tbody');
                    let tituloCursos = document.querySelector('#sct_cursos_asociados>div>h1');
                    tituloCursos.textContent = listaCarreras[i]['nombre_carrera'];
                    mostrarListaCursos(listaCursosAsociados, tblCursos);
                    displayCursosScroll();


                });

                // Mete el boton en la tabla
                celdaCursos.appendChild(btnVerCursos);

            } else {
                celdaCursos.innerHTML = "-";
            }

            celdaEstado.innerHTML = listaCarreras[i]['estado_carrera'];

            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');

            botonEditar.dataset._id = listaCarreras[i]['_id'];

            botonEditar.addEventListener('click', buscarCarrera);
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

            botonAsociar.addEventListener('click', function () {
                ppAsociar.style.display = "block";
                ppAsociar.dataset.nombre_carrera = listaCarreras[i]['nombre_carrera'];
                ppAsociar.dataset.codigo_carrera = listaCarreras[i]['codigo_carrera'];
                ppAsociar.dataset._id = listaCarreras[i]['_id'];
                btnAsociar.dataset._id = botonAsociar.dataset._id;

                let aSedes = document.querySelectorAll('#divSedeAsociar input[type=checkbox]');
                let aCursos = document.querySelectorAll('#divCursoAsociar input[type=checkbox]');
                deselectOptions();
                let aCursosCarrera = getCursosCarrera(ppAsociar.dataset._id);

                // Esto muestra los cursos que esten activos
                // Si la carrera ya tiene cursos registrados
                if (aCursosCarrera.length > 0 && !null) {
                    // Por cada curso de la carrera
                    for (let j = 0; j < aCursosCarrera.length; j++) {
                        // Compare los que tiene registrados con los cursos en la base de datos
                        for (let k = 0; k < aCursos.length; k++) {
                            if (aCursosCarrera[j] == aCursos[k].id) {
                                aCursos[k].checked = true;
                            }
                        }
                    }
                }

                let listaSedes = obtenerListaSedes();
                for (let j = 0; j < listaSedes.length; j++) {
                    if (listaSedes[j]['carreras_sede'] != 0 && listaSedes[j]['carreras_sede'] != undefined) {
                        for (let k = 0; k < listaSedes[j]['carreras_sede'].length; k++) {
                            if (listaSedes[j]['carreras_sede'][k]['nombre_carrera'] == ppAsociar.dataset.nombre_carrera) {
                                aSedes[j].checked = true;
                            }
                        }
                    }
                }

            });

            celdaOpciones.appendChild(botonAsociar);

        }
    }
};
function mostrarListaCursos(pArreglo, tbody) {

    tbody.innerHTML = '';

    for (let i = 0; i < pArreglo.length; i++) {
        let fila = tbody.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaCodigo = fila.insertCell();

        let sNombreCurso = pArreglo[i][0];
        let sCodigoCurso = pArreglo[i][1];

        celdaNombre.innerHTML = sNombreCurso;
        celdaCodigo.innerHTML = sCodigoCurso;

    }
    $(".scroll").animate({ scrollTop: 0 }, "fast");
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

// Display formulario
let botonAgregar = document.querySelector('#btnAgregar');

let ppRegistrar = document.querySelector('#sct_registrar');
let ppAsociar = document.querySelector('#sct_asociar');
let ppActualizar = document.querySelector('#sct_modificar');
let ppCursosAsociados = document.querySelector('#sct_cursos_asociados');

botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});

function displayCursosScroll() {
    let scrollTblCursos = document.querySelector('#div_tabla_cursos');
    let tblCursos = document.querySelector('#tblCursos');
    let alturaTablaCursos = tblCursos.scrollHeight;

    if (alturaTablaCursos < 275) {
        scrollTblCursos.classList.remove('scroll');
    } else {
        scrollTblCursos.classList.add('scroll');
    }
}
window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormularioRegistrar();
        // Actualizar en cada caso de uso
    }
    if (event.target == ppAsociar) {
        ppAsociar.style.display = "none";
        deselectOptions();
    }
    if (event.target == ppActualizar) {
        ppActualizar.style.display = "none";
        limpiarFormularioModificar();
    }
    if (event.target == ppCursosAsociados) {
        ppCursosAsociados.style.display = "none";
    }
}

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
    inputEstadoActual.value = "";
};
function deselectOptions() {
    let selected = document.querySelectorAll('#sct_asociar input[type=checkbox]:checked');
    for (let i = 0; i < selected.length; i++) {
        selected[i].checked = false;
    }
}
function reload() {
    deselectOptions();
    mostrarListaCarreras();
    limpiarFormularioModificar();
    limpiarFormularioRegistrar();
    ppRegistrar.style.display = "none";
    ppAsociar.style.display = "none";
    ppActualizar.style.display = "none";
}
// Esto es para que despliegue el formulario