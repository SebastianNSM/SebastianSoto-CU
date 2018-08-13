'use strict';
mostrarListaPeriodos();
let popup;
let inputBuscar = document.querySelector('#txtBusqueda');

// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaPeriodos(busqueda);
});


// Listar
function mostrarListaPeriodos(paBuscar) {
    let listaPeriodos = obtenerListaPeriodos();
    let tbody = document.querySelector('#tblPeriodos tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaPeriodos.length; i++) {
        if ((listaPeriodos[i]['nombre_periodo'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaPeriodos[i]['nombre_periodo'];
            celdaEstado.innerHTML = listaPeriodos[i]['estado_periodo'];
            // Fecha de creacion

            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');

            botonEditar.dataset._id = listaPeriodos[i]['_id'];
            botonEditar.addEventListener('click', buscar_por_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('#sct_registrar');
                popup.style.display = "block";
                let titulo;
                titulo = document.getElementById('h1');
                titulo.innerHTML = 'Modificar Período';
            });
            let titulo;
            titulo = document.getElementById('h1');
            titulo.innerHTML = 'Registrar Período';


            celdaOpciones.appendChild(botonEditar);

            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset._id = listaPeriodos[i]['_id'];
                botonEliminar.addEventListener('click', remover_periodo);

            celdaOpciones.appendChild(botonEliminar);

            // Icono de editar: <i class="fas fa-cogs"></i>
            // Icono de eliminar: <i class="fas fa-trash-alt"></i>
        }
    };
};






// Registrar
// Registrar
// Registrar

let botonRegistrar = document.querySelector("#btnRegistrar");
botonRegistrar.addEventListener('click', obtenerDatos);
let botonActualizar = document.querySelector("#btnActualizar");
botonActualizar.addEventListener('click', obtenerDatosActual);
botonActualizar.hidden = true;

let inputIdPeriodo = document.querySelector("#txtId")
let inputNombre = document.querySelector("#txtNombre");
let inputEstado = document.querySelector("#txtEstado");

let id = '';
let sNombre = '';
let sEstado = '';

let regexCodigo = /^[a-zA-Z0-9-]+$/;

function obtenerDatos() {
    let infoPeriodo = [];

    sNombre = inputNombre.value;
    sEstado = inputEstado.value;

    let bError = false;
    bError = validar();

    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la Periodo, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La Periodo se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoPeriodo.push(sNombre, sEstado);
        registrarPeriodo(infoPeriodo);
        $('.swal2-confirm').click(function () {
            reload();
            clean();
        });
        limpiarFormulario();
    }
};

function obtenerDatosActual() {
    let infoPeriodo = [];

    id = inputIdPeriodo.value;
    sNombre = inputNombre.value;
    sEstado = inputEstado.value;

    let bError = false;
    bError = validar();

    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la Periodo, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La Periodo se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoPeriodo.push(id, sNombre, sEstado);
        actualizarPeriodo(infoPeriodo);
        $('.swal2-confirm').click(function () {
            reload();
        });
        limpiarFormulario();
    }
};
function validar() {

    let bError = false;
    let arregloInputs = [];
    arregloInputs = document.querySelectorAll('input:required');
    sNombre = inputNombre.value;

    // Validacion contra blancos
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };

    // Validacion para el nombre
    if (regexCodigo.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    };

    return bError;
};

function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    divEstado.hidden = false;

    let periodo = obtener_periodo_por_id(_id);

    console.log(periodo);

    inputIdPeriodo.value = periodo['_id'];
    inputNombre.value = periodo['nombre_periodo'];
    inputEstado.value = periodo['estado_periodo'];
};

function limpiarFormulario() {
    inputNombre.value = "";
    inputEstado.value = "";
};

function remover_periodo() {
    let _id = this.dataset._id;
    swal({
        title: 'Está seguro?',
        text: "La sede se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarPeriodo(_id);
            obtenerListaPeriodos();
            mostrarListaPeriodos();
            swal(
                'Eliminado!',
                'La sede ha sido eliminado con éxito',
                'success'
            )
        }
    });

};

// Display formulario registrar
let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', function () {
    popup = document.querySelector('#sct_registrar');
    popup.style.display = "block";
    let titulo;
    titulo = document.getElementById('h1');
    titulo.innerHTML = 'Registrar Período';
    botonRegistrar.hidden = false;
    botonActualizar.hidden = true;
    divEstado.hidden = true;
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
function reload() {
    location.reload();
}
// Esto es para que despliegue el formulario