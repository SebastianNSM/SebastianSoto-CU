'use strict';
let rolUsuarioActual = localStorage.getItem('rolUsuario');
if (rolUsuarioActual == 'Asistente' || rolUsuarioActual == 'Profesor') {
    mostrarListaBitacoras(localStorage.getItem('nombreCompletoUsuario'));
    quitarRegistrarBitacora();
} else {
    mostrarListaBitacoras();
}

mostrarCursos();
mostrarProfesorAsistente();

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;

// Esto es para el registrar
let botonRegistrarBitacora = document.querySelector('#btnRegistrar');
botonRegistrarBitacora.addEventListener('click', obtenerDatos);
let inputBuscar = document.querySelector('#txtBusqueda');
let selectNombreProfesor = document.querySelector('#txtNombreProfesor');
let selectNombreAsistente = document.querySelector('#txtNombreAsistente');
let inputCurso = document.querySelector('#sltCurso');

// Esto es para registrar una actividad
let inputIdBitacora = document.querySelector('#idBitacora');
let botonRegistrarActividad = document.querySelector('#btnRegistrarActividad');
botonRegistrarActividad.addEventListener('click', obtenerDatosActividad);
let inputFechaActividad = document.querySelector('#dateFechaActividad');
// Esto es para llenar por defecto con la fecha de hoy
inputFechaActividad.valueAsDate = new Date();
let inputHoraInicio = document.querySelector('#numHoraInicioActividad');
let currentMinute = moment().minute();
let currentHour = moment().hour();
inputHoraInicio.value = "00:00";
let inputHoraFin = document.querySelector('#numHoraFinActividad');
inputHoraFin.value = "00:00";
let selectActividad = document.querySelector('#sltActividad');
let inputEstudianteAtendido = document.querySelector('#txtEstudiante');
let inputDescripcionActividad = document.querySelector
    ('#txtDescripcionActividad');

// En caso de ser atencion individual muesta la opcion de estudiante atendido
let aIndividual = document.querySelector('#atencionIndividual');
selectActividad.addEventListener('change', function () {
    if (selectActividad.selectedIndex == 6) {
        aIndividual.hidden = false;
        inputEstudianteAtendido.required = true;
    }
    else {
        aIndividual.hidden = true;
    }
});

let dFechaActividad = new Date();
let tHoraInicio = "";
let tHoraFin = "";
let sActividad = "";
let sEstudianteAtendido = "";
let sDescripcionActividad = "";

let btnActualizarActividad = document.querySelector('#btnActualizarActividad');
btnActualizarActividad.addEventListener('click', actualizarDatosActividad);
let btnActualizarBitacora = document.querySelector('#btnActualizarBitacora');
btnActualizarBitacora.addEventListener('click', actualizarDatosBitacora);
function mostrarCursos() {
    let listaCursos = obtenerCursos();
    let selectCurso = document.querySelector('#sltCurso');

    for (let i = 0; i < listaCursos.length; i++) {
        let nuevaOpcion = new Option(listaCursos[i]['nombre_curso']);
        nuevaOpcion.value = listaCursos[i]['nombre_curso'];
        selectCurso.appendChild(nuevaOpcion);
    }
};

function mostrarProfesorAsistente() {
    let listaUsuarios = obtenerLista_Usuarios();

    let selectNombreProfesor = document.querySelector('#txtNombreProfesor');
    let selectNombreAsistente = document.querySelector('#txtNombreAsistente');

    for (let i = 0; i < listaUsuarios.length; i++) {
        let nombreCompleto = listaUsuarios[i]['nombre_usuario'] + ' ' + listaUsuarios[i]['primer_apellido_usuario'] + ' ' + listaUsuarios[i]['segundo_apellido_usuario']
        let nuevaOpcion = new Option(nombreCompleto);
        nuevaOpcion.value = nombreCompleto;
        let rolUsuario = listaUsuarios[i]['rol_usuario'];
        if (rolUsuario == 'Asistente') {
            selectNombreAsistente.appendChild(nuevaOpcion);
        } else if (rolUsuario == 'Profesor') {
            selectNombreProfesor.appendChild(nuevaOpcion);
        }
    }
};

// Eliminar
// Eliminar
function eliminar_bitacora() {
    let _id = this.dataset._id;
    swal({
        title: '¿Desea eliminar esta bitácora?',
        text: "La bitácora se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarBitacora(_id);

            reload();
            swal(
                '¡Eliminado!',
                'La bitácora ha sido eliminada con éxito',
                'success'
            )
        }
    });

};
function eliminar_actividad() {
    let id_actividad = this.dataset.id_actividad;
    let _id = inputIdBitacora.value;
    swal({
        title: '¿Desea eliminar esta actividad?',
        text: "La actividad se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarActividadBitacora(_id, id_actividad);

            reload();
            swal(
                '¡Eliminado!',
                'La actividad ha sido eliminada con éxito',
                'success'
            )
        }
    });
};

// Aprobar y rechazar
function aprobar_bitacora() {
    let _id = this.dataset._id;
    swal({
        title: '¿Desea aprobar esta bitácora?',
        text: "La bitácora será aprobada",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aprobar'
    }).then((result) => {
        if (result.value) {
            aprobarBitacora(_id);

            reload();
            swal(
                '¡Aprobado!',
                'La bitácora ha sido aprobada con éxito',
                'success'
            )
        }
    });

};
function rechazar_bitacora() {
    let _id = this.dataset._id;
    swal({
        title: '¿Desea rechazar esta bitácora?',
        text: "La bitácora será rechazada",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Rechazar'
    }).then((result) => {
        if (result.value) {
            rechazarBitacora(_id);

            reload();
            swal(
                '¡Desaprobado!',
                'La bitácora ha sido rechazada con éxito',
                'success'
            )
        }
    });

};

// Buscar
// Buscar`
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaBitacoras(busqueda);
});
// Registrar
// Registrar
function obtenerDatos() {
    let infoBitacora = [];

    let sNombreProfesor = selectNombreProfesor.value;
    let sNombreAsistente = selectNombreAsistente.value;
    let sCurso = inputCurso.value;

    let bError = false;
    bError = validarRegistrar();

    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la bitácora, verifique que completó correctamente toda la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La bitácora se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoBitacora.push(sNombreProfesor, sNombreAsistente, sCurso);
        registrarBitacora(infoBitacora);
        $('.swal2-confirm').click(function () {
            reload();
        });
    }
};

function obtenerDatosActividad() {
    let infoActividad = [];

    let idBitacora = inputIdBitacora.value;
    let dFechaRegistro = new Date();
    dFechaActividad = inputFechaActividad.valueAsDate;
    tHoraInicio = inputHoraInicio.value;
    tHoraFin = inputHoraFin.value;
    let totalHorasActividad = getHorasActividad(tHoraInicio, tHoraFin);
    sActividad = selectActividad.value;

    if (selectActividad.selectedIndex == 6) {
        sEstudianteAtendido = inputEstudianteAtendido.value;
    } else {
        sEstudianteAtendido = "";
    }
    sDescripcionActividad = inputDescripcionActividad.value;

    let bError = false;
    bError = validarRegistrarActividad(true);

    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la actividad, verifique que completó correctamente toda la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La actividad se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoActividad.push(idBitacora, dFechaRegistro, dFechaActividad, tHoraInicio, tHoraFin, totalHorasActividad, sActividad, sEstudianteAtendido, sDescripcionActividad);
        $('.swal2-confirm').click(function () {
            agregarActividadBitacora(infoActividad);
            reload();
        });
    }
};

function actualizarDatosActividad() {
    let infoActividad = [];

    let id_actividad = this.dataset.id_actividad;
    let idBitacora = inputIdBitacora.value;
    let dFechaRegistro = new Date();
    dFechaActividad = new Date(inputFechaActividad.value);
    tHoraInicio = inputHoraInicio.value;
    tHoraFin = inputHoraFin.value;
    let totalHorasActividad = getHorasActividad(tHoraInicio, tHoraFin);
    sActividad = selectActividad.value;

    if (selectActividad.selectedIndex == 6) {
        sEstudianteAtendido = inputEstudianteAtendido.value;
    } else{
        inputEstudianteAtendido.value = "";
    }

    sDescripcionActividad = inputDescripcionActividad.value;

    let bError = false;
    bError = validarRegistrarActividad(false);

    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar la actividad, verifique que completó correctamente los espacios que desea modificar',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La actividad se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoActividad.push(idBitacora, id_actividad, dFechaRegistro, dFechaActividad, tHoraInicio, tHoraFin, totalHorasActividad, sActividad, sEstudianteAtendido, sDescripcionActividad);
        $('.swal2-confirm').click(function () {
            actualizarActividad(infoActividad);
            reload();
        });
    }
};
function actualizarDatosBitacora() {
    let infoBitacora = [];
    let idBitacora = this.dataset._id;
    let nombreProfe = selectNombreProfesor.value;
    let nombreAsistente = selectNombreAsistente.value;
    let nombreCurso = inputCurso.value;

    infoBitacora.push(idBitacora, nombreProfe, nombreAsistente, nombreCurso);
    let selectList = [];

    selectList.push(selectNombreProfesor, selectNombreAsistente, inputCurso);
    let bError = false;

    for (let i = 0; i < selectList.length; i++) {
        if (selectList[i].selectedIndex == 0) {
            bError = true;
            selectList[i].classList.add('errorInput');
        } else {
            selectList[i].classList.remove('errorInput');
        }
    }

    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar la bitacora, verifique que completó correctamente los espacios que desea modificar',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La bitacora se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        $('.swal2-confirm').click(function () {

            actualizarBitacora(infoBitacora);
            reload();
        });
    }

}
function llenarFormularioBitacora() {
    let idBitacora = this.dataset._id;
    let infoBitacora = buscarBitacora(idBitacora);
    selectNombreProfesor.value = infoBitacora['nombre_profesor_bitacora'];
    selectNombreAsistente.value = infoBitacora['nombre_asistente_bitacora'];
    inputCurso.value = infoBitacora['curso_bitacora'];
}
function llenarFormularioActualizar() {
    let idBitacora = inputIdBitacora.value;
    let idActivdad = this.dataset.id_actividad;
    let infoBitacora = buscarBitacora(idBitacora);
    for (let i = 0; i < infoBitacora['actividades_bitacora'].length; i++) {
        let actividadActual = infoBitacora['actividades_bitacora'][i];
        if (actividadActual['_id'] == idActivdad) {
            inputFechaActividad.valueAsDate = new Date(actividadActual['fecha_actividad_actividad']);
            inputHoraInicio.value = actividadActual['hora_inicio_actividad'];
            inputHoraFin.value = actividadActual['hora_fin_actividad'];
            selectActividad.value = actividadActual['accion_actividad'];
            if (selectActividad.selectedIndex == 6) {
                inputEstudianteAtendido.value = actividadActual['estudiantes_atendidos_actividad'];
                aIndividual.hidden = false;
                inputEstudianteAtendido.required = true;
            } else {
                sEstudianteAtendido = "";
            }
            inputDescripcionActividad.value = actividadActual['descripcion_actividad'];
        }
    }
};
// Esta funcion traduce la hora de inicio y la de fin en la totalidad de horas trabajadas de la persona
function getHorasActividad(tHoraInicio, tHoraFin) {

    // Esto convierte un string a un objeto moment
    let valorHoraInicio = moment(tHoraInicio, "HH:mm");
    let valorHoraFin = moment(tHoraFin, "HH:mm");

    // Esto saca las horas y minutos individualmente de dicho objeto
    let hourHoraInicio = valorHoraInicio.hours();
    let minHInicio = valorHoraInicio.minutes();
    let hourHoraFin = valorHoraFin.hours();
    let minHFin = valorHoraFin.minutes();

    // Esto substrae las horas de inicio y fin para sacar la cantidad de horas trabajada
    let horasTrabajadas = hourHoraFin - hourHoraInicio;
    let minutosTrabajados = minHFin - minHInicio;

    let totalHoras = moment.duration({
        minutes: minutosTrabajados,
        hours: horasTrabajadas
    });
    let tHoras = totalHoras.asHours();
    if (tHoras < 0) {
        tHoras = 24 + tHoras;
    }
    return tHoras;
};

// Listar
// Listar
function mostrarListaBitacoras(paBuscar) {
    let listaBitacoras = obtenerListaBitacoras();
    let tbody = document.querySelector('#tblBitacoras tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaBitacoras.length; i++) {
        if ((listaBitacoras[i]['nombre_profesor_bitacora'].toLowerCase().includes(paBuscar.toLowerCase())) ||
            (listaBitacoras[i]['nombre_asistente_bitacora'].toLowerCase().includes(paBuscar.toLowerCase())) ||
            (listaBitacoras[i]['curso_bitacora'].toLowerCase().includes(paBuscar.toLowerCase()))) {

            let fila = tbody.insertRow();
            let celdaNombreProfesor = fila.insertCell();
            let celdaNombreAsistente = fila.insertCell();
            let celdaCurso = fila.insertCell();
            let celdaHorasTotales = fila.insertCell();
            let celdaActividades = fila.insertCell();
            let celdaEstado = fila.insertCell();

            celdaNombreProfesor.innerHTML = listaBitacoras[i]['nombre_profesor_bitacora'];
            celdaNombreAsistente.innerHTML = listaBitacoras[i]['nombre_asistente_bitacora'];
            celdaCurso.innerHTML = listaBitacoras[i]['curso_bitacora'];
            celdaEstado.innerHTML = listaBitacoras[i]['estado_bitacora'];

            // Esto es por si no tiene actividades, que en horas totales salga el guion
            if (listaBitacoras[i]['actividades_bitacora'].length < 0) {
                celdaHorasTotales.innerHTML = "-";
            } else {
                let tHoras = getTotalHorasBitacora(listaBitacoras[i]['actividades_bitacora']);
                actualizarTotalHoras(listaBitacoras[i]['_id'], tHoras);
                celdaHorasTotales.innerHTML = tHoras.toFixed(2);
            }

            // Imprime la columna de opciones si el usuario no es asistente
            if (localStorage.getItem('rolUsuario') != 'Asistente' || rolUsuarioActual == 'Administrador') {

                let cOpciones = document.querySelector('#cOpcionesBitacora');
                cOpciones.hidden = false;

                let celdaOpciones = fila.insertCell();

                if (rolUsuarioActual == 'Profesor' || rolUsuarioActual == 'Administrador') {
                    // Este es el boton de aprobar
                    let botonAprobar = document.createElement('span');
                    botonAprobar.classList.add('fas');
                    botonAprobar.classList.add('fa-check-circle');
                    botonAprobar.dataset._id = listaBitacoras[i]['_id'];

                    celdaOpciones.appendChild(botonAprobar);
                    botonAprobar.addEventListener('click', aprobar_bitacora);

                    // este es el boton de rechazar
                    let botonRechazar = document.createElement('span');
                    botonRechazar.classList.add('fas');
                    botonRechazar.classList.add('fa-times-circle');
                    botonRechazar.dataset._id = listaBitacoras[i]['_id'];

                    celdaOpciones.appendChild(botonRechazar);
                    botonRechazar.addEventListener('click', rechazar_bitacora);
                }

                if (rolUsuarioActual == 'Asistente de decanatura' || rolUsuarioActual == 'Administrador') {
                    // Este es el boton editar
                    let botonEditar = document.createElement('span');
                    botonEditar.classList.add('fas');
                    botonEditar.classList.add('fa-edit');
                    botonEditar.dataset._id = listaBitacoras[i]['_id'];

                    celdaOpciones.appendChild(botonEditar);
                    botonEditar.addEventListener('click', llenarFormularioBitacora);
                    botonEditar.addEventListener('click', cambiarDatosFormularioBitacora);
                    botonEditar.addEventListener('click', function () {
                        ppRegistrar.style.display = "block";
                        btnActualizarBitacora.dataset._id = botonEditar.dataset._id;
                    });

                    // Este es el boton de eliminar
                    let botonEliminar = document.createElement('span');
                    botonEliminar.classList.add('fas');
                    botonEliminar.classList.add('fa-trash-alt');
                    botonEliminar.dataset._id = listaBitacoras[i]['_id'];

                    celdaOpciones.appendChild(botonEliminar);
                    botonEliminar.addEventListener('click', eliminar_bitacora);
                }
            }

            // Imprime el boton de ver actividades
            let btnActividades = document.createElement('button');
            btnActividades.name = 'btnTabla';
            btnActividades.textContent = 'Ver actividades'
            btnActividades.dataset._id = listaBitacoras[i]['_id'];
            btnActividades.addEventListener('click', mostrarContenidoBitacora);

            celdaActividades.appendChild(btnActividades);
        }
    }
};
function getTotalHorasBitacora(paBitacora) {
    let totalHoras = 0;
    for (let i = 0; i < paBitacora.length; i++) {
        totalHoras += paBitacora[i]['horas_trabajadas_actividad'];
    }
    return totalHoras;
};

// En esta funcion se genera el texto o la tabla segun lo amerite, tambien crea el boton de agregar actividad
function mostrarContenidoBitacora() {
    ppActividades.style.display = "block";
    let idBitacora = this.dataset._id;
    inputIdBitacora.value = idBitacora;
    let infoBitacora = buscarBitacora(idBitacora);
    // Este titulo se adquiere del curso al que pertenece la bitacora
    let tituloBitacora = document.querySelector('#sct_actividades>div>h1');
    tituloBitacora.textContent = 'Bitácora de: ' + infoBitacora['curso_bitacora'];

    // Esto crea el boton de agregar actividad
    let btnAgregarActividad = document.querySelector('#btnAgregarActividad');
    if (rolUsuarioActual == 'Asistente' || rolUsuarioActual == 'Administrador') {
        btnAgregarActividad.addEventListener('click', function () {
            ppActividades.style.display = "none";
            ppRegistrarActividad.style.display = "block";
        });
        btnAgregarActividad.addEventListener('click', cambiarDatosFormularioActividad);
    } else {
        btnAgregarActividad.hidden = true;
        document.querySelector('#sct_actividades .popup-content').style.display = 'block';
    }

    let table = document.querySelector('#tblActividades');
    let msgNoActividad = document.querySelector('#msjActividad');

    let listaActividades = infoBitacora['actividades_bitacora'];

    if (infoBitacora['actividades_bitacora'].length == 0 || infoBitacora['actividades_bitacora'].length == null || infoBitacora['actividades_bitacora'].length == undefined) {
        table.style.display = "none";
        document.querySelector('#sct_actividades .popup-content').style.width = '60%';
        msgNoActividad.style.display = "block";
    } else {
        table.style.display = "table";
        document.querySelector('#sct_actividades .popup-content').style.width = '90%';
        msgNoActividad.style.display = "none";
    }

    let tbody = document.querySelector('#tblActividades tbody');

    tbody.innerHTML = '';

    for (let i = 0; i < listaActividades.length; i++) {

        let fila = tbody.insertRow();
        let celdaFechaRegistro = fila.insertCell();
        let celdaFechaActividad = fila.insertCell();
        let celdaHoraInicio = fila.insertCell();
        let celdaHoraFin = fila.insertCell();
        let celdaHorasTrabajadas = fila.insertCell();
        let celdaAccionActividad = fila.insertCell();
        let celdaEstudianteAtendido = fila.insertCell();
        let celdaDescripcion = fila.insertCell();

        celdaFechaRegistro.innerHTML = formatDate(listaActividades[i]['fecha_registro_actividad']);
        celdaFechaActividad.innerHTML = formatDate(listaActividades[i]['fecha_actividad_actividad']);
        celdaHoraInicio.innerHTML = listaActividades[i]['hora_inicio_actividad'];
        celdaHoraFin.innerHTML = listaActividades[i]['hora_fin_actividad'];
        if (listaActividades[i]['horas_trabajadas_actividad'] != undefined || listaActividades[i]['horas_trabajadas_actividad'] != "") {
            celdaHorasTrabajadas.innerHTML = listaActividades[i]['horas_trabajadas_actividad'].toFixed(2);
        } else {
            celdaHorasTrabajadas.innerHTML = '-';
        }

        celdaAccionActividad.innerHTML = listaActividades[i]['accion_actividad'];

        if (listaActividades[i]['estudiantes_atendidos_actividad'] != "") {
            celdaEstudianteAtendido.innerHTML = listaActividades[i]['estudiantes_atendidos_actividad'];
        } else {
            celdaEstudianteAtendido.innerHTML = "-";
        }

        celdaDescripcion.innerHTML = listaActividades[i]['descripcion_actividad'];

        // Imprime la columna de opciones si el usuario no es asistente
        if (rolUsuarioActual == 'Asistente' || rolUsuarioActual == 'Administrador') {

            let cOpciones = document.querySelector('#cOpcionesActividad');
            cOpciones.hidden = false;
            let celdaOpciones = fila.insertCell();

            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');

            botonEditar.dataset.id_actividad = listaActividades[i]['_id'];
            botonEditar.name = "btnEditarActividad"

            if (rolUsuarioActual == 'Asistente' || rolUsuarioActual == 'Administrador') {
                botonEditar.addEventListener('click', function () {
                    ppActividades.style.display = "none";
                    ppRegistrarActividad.style.display = "block";
                });
                botonEditar.addEventListener('click', cambiarDatosFormularioActividad);
                botonEditar.addEventListener('click', llenarFormularioActualizar);
            }

            celdaOpciones.appendChild(botonEditar);


            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');
            botonEliminar.dataset.id_actividad = listaActividades[i]['_id'];

            celdaOpciones.appendChild(botonEliminar);
            botonEliminar.addEventListener('click', eliminar_actividad);

            celdaOpciones.appendChild(botonEliminar);
        }

    }
    displayActividadesScroll();


};

// Validar
function validarRegistrar() {

    let bError = false;

    let arregloInputs = document.querySelectorAll('#sct_registrar div.form select');
    for (let i = 0; i < arregloInputs.length; i++) {

        if (arregloInputs[i].value == "") {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    }

    return bError;


};
function validarRegistrarActividad(estado) {
    let bError = false;

    let arregloInputs = document.querySelectorAll('#sct_registrar_actividad form input:required');

    dFechaActividad = inputFechaActividad.value;
    tHoraInicio = inputHoraInicio.value;
    tHoraFin = inputHoraFin.value;
    sActividad = selectActividad.value;
    sEstudianteAtendido = inputEstudianteAtendido.value;
    sDescripcionActividad = inputDescripcionActividad.value;
    if (estado) {
        // Validacion contra blancos y validacion del time
        for (let i = 0; i < arregloInputs.length; i++) {
            if (arregloInputs[i].value == "") {
                bError = true;
                arregloInputs[i].classList.add('errorInput');
            }
            else {
                arregloInputs[i].classList.remove('errorInput');
            }
        }

        if (arregloInputs[1].value == "00:00") {
            bError = true;
            arregloInputs[1].classList.add('errorInput');
        } else {
            arregloInputs[1].classList.remove('errorInput');
        }
        if (arregloInputs[2].value == "00:00") {
            bError = true;
            arregloInputs[2].classList.add('errorInput');
        } else {
            arregloInputs[2].classList.remove('errorInput');
        }

        // Validacion del select de actividad
        if (selectActividad.selectedIndex == 0) {
            bError = true;
            selectActividad.classList.add('errorInput');
        }
        else {
            selectActividad.classList.remove('errorInput');
        }

        selectActividad.addEventListener('change', function () {
            if (selectActividad.selectedIndex == 6) {
                sEstudianteAtendido = "";
                inputEstudianteAtendido.classList.remove('errorInput');
            }
        });

        if (sEstudianteAtendido == "" && (regexSoloLetras.test(sEstudianteAtendido) == false)) {
            bError = true;
            inputEstudianteAtendido.classList.add('errorInput');
        }
        else {
            inputEstudianteAtendido.classList.remove('errorInput');
        }

    } else {
        if (selectActividad.selectedIndex == 6) {
            if (regexSoloLetras.test(sEstudianteAtendido) == false || inputEstudianteAtendido.value == "") {
                bError = true;
                inputEstudianteAtendido.classList.add('errorInput');
            }
            else {
                inputEstudianteAtendido.classList.remove('errorInput');
            }
        }

    }
    return bError;
};

// Utilidades
// Utilidades

// Display formulario
let botonAgregar = document.querySelector('#btnAgregar');
let ppRegistrar = document.querySelector('#sct_registrar');
let ppActividades = document.querySelector('#sct_actividades');
let ppRegistrarActividad = document.querySelector('#sct_registrar_actividad');
let ppActividadesRegistrar = document.querySelector('#sct_registrar_actividad');

botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});
function displayActividadesScroll() {
    let scrollTblActividades = document.querySelector('#div_tabla_actividades>div');
    let tblActividades = document.querySelector('#tblActividades');
    let alturaTablaActividades = tblActividades.scrollHeight;

    if (alturaTablaActividades < 250) {
        scrollTblActividades.classList.remove('scroll');
    } else {
        scrollTblActividades.classList.add('scroll');
    }
}
function formatDate(dateObject) {
    // Esto separa la informacion de la fecha
    let dFecha = new Date(dateObject);
    let nDia = dFecha.getUTCDate();
    let nMes = dFecha.getUTCMonth() + 1;
    let nAnno = dFecha.getUTCFullYear();
    // Esto despliega la informacion separada para darle formato
    let stringFecha = nDia + '/' + nMes + '/' + nAnno;
    return stringFecha;
}

window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormularioRegistrarBitacora();
    }
    if (event.target == ppActividades) {
        ppActividades.style.display = "none";
    }
    if (event.target == ppRegistrarActividad) {
        limpiarFormularioRegistrarActividad();
        ppRegistrarActividad.style.display = "none";
    }
}

function limpiarFormularioRegistrarBitacora() {
    selectNombreAsistente.value = "";
    selectNombreProfesor.value = "";
    inputCurso.value = "";
};
function limpiarFormularioRegistrarActividad() {
    inputFechaActividad.valueAsDate = new Date();
    inputHoraInicio.value = "00:00"
    inputHoraFin.value = "00:00"
    selectActividad.selectedIndex = 0;
    inputEstudianteAtendido.value = "";
    inputDescripcionActividad.value = "";

    let arregloInput = document.querySelectorAll('#sct_registrar_actividad form input:required');
    for (let i = 0; i < arregloInput.length; i++) {
        arregloInput[i].classList.remove('errorInput');
    }
    selectActividad.classList.remove('errorInput');
}
function reload() {
    ppRegistrar.style.display = "none";
    ppRegistrarActividad.style.display = "none";
    ppActividades.style.display = "none";
    if (rolUsuarioActual == 'Asistente' || rolUsuarioActual == 'Profesor') {
        mostrarListaBitacoras(localStorage.getItem('nombreCompletoUsuario'));
    } else {
        mostrarListaBitacoras();
    }
    limpiarFormularioRegistrarBitacora();
    limpiarFormularioRegistrarActividad();
}

function quitarRegistrarBitacora() {
    let btnAgregar = document.querySelector('#btnAgregar');
    btnAgregar.style.display = 'none';
    let side = document.querySelector('#sct_side');
    let newSpace = document.createElement('div');
    newSpace.classList.add('side-agregar');
    side.appendChild(newSpace);
}

function cambiarDatosFormularioBitacora() {
    let idBitacora = this.dataset._id;
    let title = document.querySelector('#sct_registrar h1.title');
    let sProfe = document.querySelector('label[for="txtNombreProfesor"]');
    let sAsist = document.querySelector('label[for="txtNombreAsistente"]');
    let sCurso = document.querySelector('label[for="sltCurso"]');

    let btnRegistrarBitacora = document.querySelector('#btnRegistrar');
    let btnActualizarBitacora = document.querySelector('#btnActualizarBitacora');

    title.innerHTML = 'Actualizar bitácora';
    sProfe.innerHTML = 'Profesor responsable';
    sAsist.innerHTML = 'Asistente responsable';
    sCurso.innerHTML = 'Curso asignado';

    btnRegistrarBitacora.hidden = true;
    btnActualizarBitacora.hidden = false;
}

function cambiarDatosFormularioActividad() {

    let id_actividad = this.dataset.id_actividad;

    let actividadTitle = document.querySelector('#sct_registrar_actividad h1.title');
    let labelFechaActividad = document.querySelector('label[for="dateFechaActividad"]');
    let labelHoraInicio = document.querySelector('label[for="numHoraInicioActividad"]');
    let labelHoraFin = document.querySelector('label[for="numHoraFinActividad"]');
    let labelActividad = document.querySelector('label[for="sltActividad"]');
    let labelEstudianteAtendido = document.querySelector('label[for="txtEstudiante"]');
    let labelDescripcion = document.querySelector('label[for="txtDescripcionActividad"]');

    let btnRegistrarActividad = document.querySelector('#btnRegistrarActividad');
    let btnActualizarActividad = document.querySelector('#btnActualizarActividad');

    btnActualizarActividad.dataset.id_actividad = id_actividad;

    if (this.name == "btnEditarActividad") {

        actividadTitle.innerHTML = 'Actualizar actividad';
        labelFechaActividad.innerHTML = 'Fecha en la que se realiza la actividad';
        labelHoraInicio.innerHTML = 'Hora al iniciar';
        labelHoraFin.innerHTML = 'Hora al finalizar';
        labelActividad.innerHTML = 'Actividad relizada';
        labelEstudianteAtendido.innerHTML = 'Estudiante atendido';
        labelDescripcion.innerHTML = 'Descripción de la actividad';

        btnRegistrarActividad.hidden = true;
        btnActualizarActividad.hidden = false;
    } else {
        actividadTitle.innerHTML = 'Registrar actividad';
        labelFechaActividad.innerHTML = 'Fecha en la que se realiza la actividad*';
        labelHoraInicio.innerHTML = 'Hora al iniciar*';
        labelHoraFin.innerHTML = 'Hora al finalizar*';
        labelActividad.innerHTML = 'Actividad relizada*';
        labelEstudianteAtendido.innerHTML = 'Estudiante atendido*';
        labelDescripcion.innerHTML = 'Descripción de la actividad*';

        btnRegistrarActividad.hidden = false;
        btnActualizarActividad.hidden = true;
    }
}
// Esto es para que despliegue el formulario