'use strict';
let rolUsuarioActual = localStorage.getItem('rolUsuario');
if (rolUsuarioActual == 'Asistente' || rolUsuarioActual == 'Profesor' ) {
    mostrarListaBitacoras(localStorage.getItem('nombreCompletoUsuario'));
}else{
    mostrarListaBitacoras();
}

mostrarCursos();
mostrarProfesorAsistente();

// Esto es para el registrar
let botonRegistrarBitacora = document.querySelector('#btnRegistrar');
botonRegistrarBitacora.addEventListener('click', obtenerDatos);
let inputBuscar = document.querySelector('#txtBusqueda');
let selectNombreProfesor = document.querySelector('#txtNombreProfesor');
let selectNombreAsistente = document.querySelector('#txtNombreAsistente');
let inputCurso = document.querySelector('#sltCurso');

let sNombreAsistente = "";
let sCurso = "";

let dHoy = new Date();

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
}

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

}

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
            AprobarBitacora(_id);

            reload();
            swal(
                '¡Aprobado!',
                'La bitácora ha sido aprobada con éxito',
                'success'
            )
        }
    });

}
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

}

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

            celdaNombreProfesor.innerHTML = listaBitacoras[i]['nombre_profesor_bitacora'];
            celdaNombreAsistente.innerHTML = listaBitacoras[i]['nombre_asistente_bitacora'];
            celdaCurso.innerHTML = listaBitacoras[i]['curso_bitacora'];

            // Esto es por si no tiene actividades, que en horas totales salga el guion
            if (listaBitacoras[i]['horas_totales_bitacora'] == undefined || listaBitacoras[i]['horas_totales_bitacora'] == "") {
                celdaHorasTotales.innerHTML = "-";
            } else {
                celdaHorasTotales.innerHTML = listaBitacoras[i]['horas_totales_bitacora'];
            }

            // Imprime la columna de opciones si el usuario no es asistente
            if (localStorage.getItem('rolUsuario') != 'Asistente') {

                let cOpciones = document.querySelector('#cOpciones');
                cOpciones.hidden = false;

                let celdaOpciones = fila.insertCell();
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

                // Este es el boton de eliminar
                let botonEliminar = document.createElement('span');
                botonEliminar.classList.add('fas');
                botonEliminar.classList.add('fa-trash-alt');
                botonEliminar.dataset._id = listaBitacoras[i]['_id'];

                celdaOpciones.appendChild(botonEliminar);
                botonEliminar.addEventListener('click', eliminar_bitacora);
            }

            // Imprime el boton de ver actividades
            let btnActividades = document.createElement('button');
            btnActividades.name = 'btnTabla';
            btnActividades.textContent = 'Ver actividades'
            btnActividades.dataset._id = listaBitacoras[i]['_id'];
            btnActividades.addEventListener('click', mostrarTablaActividades);

            celdaActividades.appendChild(btnActividades);
        }
    }
};

function mostrarTablaActividades() {
    ppActividades.style.display = "block";
    // Toma el id de la bitacora
    let idBitacora = this.dataset._id;
    let infoBitacora = buscarBitacora(idBitacora);

    // Este titulo se adquiere del curso al que pertenece la bitacora
    let tituloBitacora = document.querySelector('#sct_actividades>div>h1');
    tituloBitacora.textContent = 'Bitácora de: ' + infoBitacora['curso_bitacora'];

    // Este es el boton para agregar una actividad
    let btnAgregarActividad = document.createElement('button');
    btnAgregarActividad.textContent = 'Agregar actividad';
    btnAgregarActividad.name = 'btnTabla';
    btnAgregarActividad.addEventListener('click', function () {
        console.log(infoBitacora['_id']);
    });

    tituloBitacora.appendChild(btnAgregarActividad);

}

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

// Display formulario
let botonAgregar = document.querySelector('#btnAgregar');
let ppRegistrar = document.querySelector('#sct_registrar');
let ppActividades = document.querySelector('#sct_actividades');

//display actividades
let ppActividadesRegistrar = document.querySelector('#sct_registrarActividad');


botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});

function displayActividadesScroll() {
    let scrollTblActividades = document.querySelector('#div_tabla_actividades');
    let tblActividades = document.querySelector('#tblActividades');
    let alturaTablaActividades = tblActividades.scrollHeight;

    if (alturaTablaActividades < 250) {
        scrollTblActividades.classList.remove('scroll');
    } else {
        scrollTblActividades.classList.add('scroll');
    }
}

window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormularioRegistrar();
    }
    if (event.target == ppActividades) {
        ppActividades.style.display = "none";
    }
}

function limpiarFormularioRegistrar() {
    selectNombreAsistente.value = "";
    selectNombreProfesor.value = "";
    inputCurso.value = "";
};

function reload() {
    mostrarListaBitacoras();
    limpiarFormularioRegistrar();
    ppRegistrar.style.display = "none";
    ppActividades.style.display = "none";
}
// Esto es para que despliegue el formulario