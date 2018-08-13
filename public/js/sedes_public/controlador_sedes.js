
'use strict';
mostrarListaSedes();

let inputBuscar = document.querySelector('#txtBusqueda');

// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaSedes(busqueda);
});


// Listar
function mostrarListaSedes(paBuscar) {
    let listaSedes = obtenerListaSedes();
    let tbody = document.querySelector('#tblSedes tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
        if ((listaSedes[i]['nombre_sede'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
                let celdaNombre = fila.insertCell();
                let celdaDirExacta = fila.insertCell();
                let celdaLatitud = fila.insertCell();
                let celdaLongitud = fila.insertCell();
                let celdaEstado = fila.insertCell();
                let celdaOpciones = fila.insertCell();

                celdaNombre.innerHTML = listaSedes[i]['nombre_sede'];
                celdaDirExacta.innerHTML = listaSedes[i]['dirExacta_sede'];
                celdaLatitud.innerHTML = listaSedes[i]['latitud_sede'];
                celdaLongitud.innerHTML = listaSedes[i]['longitud_sede'];
                celdaEstado.innerHTML = listaSedes[i]['estado_sede'];


                // Este es el boton de editar
                let botonEditar = document.createElement('span');
                botonEditar.classList.add('fas');
                botonEditar.classList.add('fa-cogs');

                botonEditar.dataset._id = listaSedes[i]['_id'];
                botonEditar.addEventListener('click', buscar_por_id);
                botonEditar.addEventListener('click', function () {
                    popup = document.querySelector('#sct_registrar')
                    popup.style.display = "block";
                    let titulo;
                    titulo = document.getElementById('h1');
                    titulo.innerHTML = 'Modificar Sede';
                });
                let titulo;
                titulo = document.getElementById('h1');
                titulo.innerHTML = 'Registrar Sede';
                // Agregar esto a los formularios que tengan mucho contenido (hace una animacion de scroll a la parte superior del formulario)
                $(".scroll").animate({ scrollTop: 0 }, "fast");
    
    
                celdaOpciones.appendChild(botonEditar);

                // Este es el boton de eliminar
                let botonEliminar = document.createElement('span');
                botonEliminar.classList.add('fas');
                botonEliminar.classList.add('fa-trash-alt');

                botonEliminar.dataset._id = listaSedes[i]['_id'];
                botonEliminar.addEventListener('click', remover_sede);

                celdaOpciones.appendChild(botonEliminar);

                // Este es el boton de asociar
                let botonAsociar = document.createElement('span');
                botonAsociar.classList.add('fas');
                botonAsociar.classList.add('fa-link');

                celdaOpciones.appendChild(botonAsociar);

                // Icono de editar: <i class="fas fa-cogs"></i>
                // Icono de eliminar: <i class="fas fa-trash-alt"></i>
            }
        };
    };
// Registrar
// Registrar
// Registrar

let botonRegistrar = document.querySelector("#btnRegistrar");
let botonActualizar = document.querySelector("#btnActualizar");
let popup;
botonActualizar.hidden = true;

botonRegistrar.addEventListener('click', obtenerDatosRegistro);
botonActualizar.addEventListener('click', obtenerDatosActualizar);

let inputIdSede = document.querySelector('#txtId');
let inputNombreSede = document.querySelector("#txtNombre");
let inputDirExactaSede = document.querySelector("#txtDirExacta");
let inputLatitudSede = document.querySelector("#numLatitud");
let inputLongitudSede = document.querySelector("#numLongitud");
let inputEstadoSede = document.querySelector("#txtEstado");
let divEstado = document.querySelector("#divEstado");
divEstado.hidden = true;


let sNombreSede = '';
let sDirExactaSede = '';
let sLatitudSede = 0;
let sLongitudSede = 0;
let sEstadoSede = '';
let sIdSede = '';

let regexDirExacta = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ., ]+$/;
let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexCoordenadas = /^[0-9.-]+$/;


function obtenerDatosRegistro() {
    let infoSede = [];
    let bError = false;

    sNombreSede = inputNombreSede.value;
    sDirExactaSede = inputDirExactaSede.value;
    sLatitudSede = inputLatitudSede.value;
    sLongitudSede = inputLongitudSede.value;
    sEstadoSede = inputEstadoSede.value;

    infoSede.push(sNombreSede, sDirExactaSede, sLatitudSede, sLongitudSede, sEstadoSede);

    bError = validarSedes();
    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la sede, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La sede se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        $('.swal2-confirm').click(function () {
            registrarSede(infoSede);
            reload();
        });

    }
};

function obtenerDatosActualizar() {
    let infoSede = [];
    let bError = false;


    sIdSede = inputIdSede.value;
    sNombreSede = inputNombreSede.value;
    sDirExactaSede = inputDirExactaSede.value;
    sLatitudSede = inputLatitudSede.value;
    sLongitudSede = inputLongitudSede.value;
    sEstadoSede = inputEstadoSede.value;

    infoSede.push(sIdSede, sNombreSede, sDirExactaSede, sLatitudSede, sLongitudSede, sEstadoSede);

    bError = validarSedes();
    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar la sede, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Actualización correcto',
            text: 'La sede se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        $('.swal2-confirm').click(function () {
            actualizarSede(infoSede);
            reload();
        });
        botonRegistrar.hidden = false;
        botonActualizar.hidden = true;
        divEstado.hidden = true;
    }

};

function validarSedes() {
    let bError = false;
    let arregloInputs = [];
    arregloInputs = document.querySelectorAll('input:required');

    sNombreSede = inputNombreSede.value;
    sDirExactaSede = inputDirExactaSede.value;
    sLatitudSede = inputLatitudSede.value;
    sLongitudSede = inputLongitudSede.value;

    // Validacion contra blancos
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }

        // Validacion para el nombre
        if (regexSoloLetras.test(sNombreSede) == false) {
            bError = true;
            inputNombreSede.classList.add('errorInput');
        } else {
            inputNombreSede.classList.remove('errorInput');
        }

        // Validacion para el nombre
        if (regexDirExacta.test(sDirExactaSede) == false) {
            bError = true;
            inputDirExactaSede.classList.add('errorInput');
        } else {
            inputDirExactaSede.classList.remove('errorInput');
        }

        // Validacion para la longitud
        if (regexCoordenadas.test(sLongitudSede) == false) {
            bError = true;
            inputLongitudSede.classList.add('errorInput');
        } else {
            inputLongitudSede.classList.remove('errorInput');
        }

        // Validacion para la latitud
        if (regexCoordenadas.test(sLatitudSede) == false) {
            bError = true;
            inputLatitudSede.classList.add('errorInput');
        } else {
            inputLatitudSede.classList.remove('errorInput');
        }
    }
    return bError
};

function limpiarFormulario() {
    inputNombreSede.value = "";
    inputDirExactaSede.value = "";
    inputLatitudSede.value = 0;
    inputLongitudSede.value = 0;
    divEstado.hidden = true;
};


function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    divEstado.hidden = false;

    let sede = obtener_sede_por_id(_id);

    console.log(sede);

    inputIdSede.value = sede['_id'];
    inputNombreSede.value = sede['nombre_sede'];
    inputDirExactaSede.value = sede['dirExacta_sede'];
    inputLatitudSede.value = sede['latitud_sede'];
    inputLongitudSede.value = sede['longitud_sede'];
    inputEstadoSede.value = sede['estado_sede'];
};

function remover_sede() {
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
            eliminarSede(_id);
            obtenerListaSedes();
            mostrarListaSedes();
            swal(
                'Eliminado!',
                'La sede ha sido eliminado con éxito',
                'success'
            )
        }
    });

};

// Display formulario registrar
// Display formulario registrar
let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', function () {
    popup = document.querySelector('#sct_registrar');
    popup.style.display = "block";
    botonRegistrar.hidden = false;
    botonActualizar.hidden = true;
    let titulo;
    titulo = document.getElementById('h1');
    titulo.innerHTML = 'Registrar Sede';
    limpiarFormulario();
});

let ppRegistrar = document.querySelector('#sct_registrar');

botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});

window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormulario();
        // Actualizar en cada caso de uso
    }

}
function reload() {
    location.reload();
    popup.style.display = "none";
    limpiarFormulario();
}
// Esto es para que despliegue el formulario
