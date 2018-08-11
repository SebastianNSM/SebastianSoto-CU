'use strict'
mostrarListaUsuarios();

document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatosUsuario);
let botonActualizar = document.querySelector("#btnActualizar");
botonActualizar.addEventListener('click', obtenerDatosActual);
botonActualizar.hidden = true;

let popup;

let inputIdUsuario = document.querySelector('#txtId');
const elementoImagen = document.querySelector('#txtImagen');
let inputNombre = document.querySelector('#txtNombre');
let inputPrimerApellido = document.querySelector('#txtPrimerApellido');
let inputSegundoApellido = document.querySelector('#txtSegundoApellido');
let inputCedula = document.querySelector('#txtCedula');
let inputFecha = document.querySelector('#dateFecha');
let inputCorreo = document.querySelector('#txtCorreo');
let inputTelefono = document.querySelector('#txtTelefono');
let inputDireccion = document.querySelector('#txtDireccion');
let inputProvincia = document.querySelector('#sltProvincia');
let inputCanton = document.querySelector('#sltCanton');
let inputDistrito = document.querySelector('#sltDistrito');
let inputRol = document.querySelector('#txtRol');
let inputEstado = document.querySelector('#txtEstado');

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexDireccion = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexSoloNumeros = /^[0-9]+$/;
let regexCorreo = /^[a-zA-Z0-9._]+@ucenfotec.ac.cr+$/;
let regexCedula = /^[1-9]-?\d{4}-?\d{4}$/;

let dHoy = new Date();

let id = '';
let sNombre = '';
let sPrimerApellido = '';
let sSegundoApellido = '';
let nCedula = 0;
let dFecha = dHoy;
let sCorreo = '';
let nTelefono = 0;
let sDireccion = '';
let sProvincia = '';
let sCanton = '';
let sDistrito = '';
let sRol = '';
let sEstado = '';


let inputBuscar = document.querySelector('#txtBusqueda');

// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaUsuarios(busqueda);
});


// Listar
function mostrarListaUsuarios(paBuscar) {
    let listaUsuarios = obtenerLista_Usuarios();
    let tbody = document.querySelector('#tblUsuarios tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        if ((listaUsuarios[i]['nombre_usuario'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
            let celdaFoto = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaRol = fila.insertCell();
            let celdaVerMas = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            let imagen = document.createElement('img');
            imagen.src = listaUsuarios[i]['foto_usuario'];
            imagen.classList.add('imageSettings');
            celdaFoto.appendChild(imagen);

            //    Esto separa el nombre de los apellidos
            let sNombre = listaUsuarios[i]['nombre_usuario'];
            let sPrimerApellido = listaUsuarios[i]['primer_apellido_usuario'];
            let sSegundoApellido = listaUsuarios[i]['segundo_apellido_usuario'];

            let nombreSpan = crearSpan(sNombre + ' ' + sPrimerApellido + ' ' + sSegundoApellido);
            let rolSpan = crearSpan(listaUsuarios[i]['rol_usuario']);

            celdaNombre.appendChild(nombreSpan);
            celdaRol.appendChild(rolSpan);

            //Este es el boton de ver mas info
            let botonVerMas = document.createElement('button');
            botonVerMas.classList.add('boton-ver-mas');
            botonVerMas.innerHTML = "Ver mas informacion";
            celdaVerMas.appendChild(botonVerMas);


            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');
            botonEditar.dataset._id = listaUsuarios[i]['_id'];
            botonEditar.addEventListener('click', buscar_por_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('#sct_registrar')
                popup.style.display = "block";
                let titulo;
                titulo = document.getElementById('h1');
                titulo.innerHTML = 'Modificar Usuario';
            });
            let titulo;
            titulo = document.getElementById('h1');
            titulo.innerHTML = 'Registrar Usuario';
            // Agregar esto a los formularios que tengan mucho contenido (hace una animacion de scroll a la parte superior del formulario)
            $(".scroll").animate({ scrollTop: 0 }, "fast");


            celdaOpciones.appendChild(botonEditar);



            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');
            botonEliminar.dataset._id = listaUsuarios[i]['_id'];

            celdaOpciones.appendChild(botonEliminar);
            botonEliminar.addEventListener('click', eliminar_usuario);
            // Este es el boton de eliminar



            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');
            celdaOpciones.appendChild(botonAsociar);

        }
    };
};


// Funcion que recibe un parametro y crea un span con ese texto.
function crearSpan(pInfo) {
    let nuevoSpan = document.createElement('span');
    nuevoSpan.textContent = pInfo;
    return nuevoSpan;
}


// Registrar
// Registrar
// Registrar

function obtenerDatosUsuario() {
    let infoUsuario = [];

    sNombre = inputNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    nCedula = inputCedula.value;
    dFecha = inputFecha.value;
    sCorreo = inputCorreo.value;
    nTelefono = inputTelefono.value;
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sRol = inputRol.value;
    sEstado = inputEstado.value;

    let bError = false;
    bError = validarUsuario();
    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su usuario, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'el usuario se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoUsuario.push(imagenUrl, sNombre, sPrimerApellido, sSegundoApellido, nCedula, dFecha, sCorreo, nTelefono, sDireccion, sProvincia, sDistrito, sCanton, sRol, sEstado, nCedula);
        registrar_Usuarios(infoUsuario);
        $('.swal2-confirm').click(function () {
        reload();
        });
    }
};

// Modificar
// Esto recibe el usuario actual, no funciona (mantenimiento)
function obtenerDatosActual() {
    let infoUsuarioActual = [];

    let id = inputIdUsuario.value;
    sNombre = inputNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    nCedula = inputCedula.value;
    dFecha = inputFecha.value;
    sCorreo = inputCorreo.value;
    nTelefono = inputTelefono.value;
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sRol = inputRol.value;
    sEstado = inputEstado.value;


    let bError = false;
    bError = validarUsuario();

    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar el usuario, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Actualización correcta',
            text: 'El usuario se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoUsuarioActual.push(id, imagenUrl, sNombre, sPrimerApellido, sSegundoApellido, nCedula, dFecha, sCorreo, nTelefono, sDireccion, sProvincia, sCanton, sDistrito, sRol, sEstado);
        actualizarUsuario(infoUsuarioActual);
        $('.swal2-confirm').click(function () {
        reload();
        });
        botonRegistrar.hidden = false;
        botonActualizar.hidden = true;
        divEstado.hidden = true;
    }
};

function validarUsuario() {
    let bError = false;
    sNombre = inputNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    nCedula = Number(inputCedula.value);
    dFecha = new Date(inputFecha.value);
    let dHoy = new Date();
    sCorreo = inputCorreo.value;
    nTelefono = Number(inputTelefono.value);
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sRol = inputRol.value;
    sEstado = inputEstado.value;

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

    // Validacion para el primer apellido
    if (regexSoloLetras.test(sPrimerApellido) == false) {
        bError = true;
        inputPrimerApellido.classList.add('errorInput');
    } else {
        inputPrimerApellido.classList.remove('errorInput');
    };

    // Validacion para el segundo apellido
    if (regexSoloLetras.test(sSegundoApellido) == false) {
        bError = true;
        inputSegundoApellido.classList.add('errorInput');
    } else {
        inputSegundoApellido.classList.remove('errorInput');
    };


    // Validacion de la fecha
    if (dFecha > dHoy) {
        bError = true;
        inputFecha.classList.add('errorInput');
    } else {
        inputFecha.classList.remove('errorInput');
    };

    // Validacion para el correo
    if (regexCorreo.test(sCorreo) == false) {
        bError = true;
        inputCorreo.classList.add('errorInput');
    } else {
        inputCorreo.classList.remove('errorInput');
    };

    // Validacion para el telefono
    if (regexSoloNumeros.test(nTelefono) == false) {
        bError = true;
        inputTelefono.classList.add('errorInput');
    } else {
        inputTelefono.classList.remove('errorInput');
    };
    // Validacion para la direccion

    if (regexDireccion.test(sDireccion) == false) {
        bError = true;
        inputDireccion.classList.add('errorInput');
    } else {
        inputDireccion.classList.remove('errorInput');
    };

    // Validacion para la provincia
    if (inputProvincia.value == '') {
        inputProvincia.classList.add('error_input');
        bError = true;
    } else {
        inputProvincia.classList.remove('error_input');
    };

    // Validacion para el canton
    if (inputCanton.value == '') {
        inputCanton.classList.add('error_input');
        bError = true;
    } else {
        inputCanton.classList.remove('error_input');
    };

    // Validacion para el distrito
    if (inputDistrito.value == '') {
        inputDistrito.classList.add('error_input');
        bError = true;
    } else {
        inputDistrito.classList.remove('error_input');
    };

    // Validacion para el rol
    if (inputRol.value == '') {
        inputRol.classList.add('error_input');
        bError = true;
    } else {
        inputRol.classList.remove('error_input');
    };

    // Validacion para la cedula
    if (regexCedula.test(nCedula) == false) {
        bError = true;
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    };


    return bError;
};




function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    let usuario = obtener_usuario_por_id(_id);

    console.log(usuario);

    inputIdUsuario.value = usuario['_id'];
    elementoImagen.src = usuario['foto_usuario'];
    inputNombre.value = usuario['nombre_usuario'];
    inputPrimerApellido.value = usuario['primer_apellido_usuario'];
    inputSegundoApellido.value = usuario['segundo_apellido_usuario'];
    inputCedula.value = usuario['cedula_usuario'];
    inputFecha.value = usuario['fecha_usuario'];
    inputCorreo.value = usuario['correo_usuario'];
    inputTelefono.value = usuario['telefono_usuario'];
    inputDireccion.value = usuario['direccion_usuario'];
    inputProvincia.value = usuario['provincia_usuario'];
    inputCanton.value = usuario['canton_usuario'];
    inputDistrito.value = usuario['distrito_usuario'];
    inputRol.value = usuario['rol_usuario'];
};

function eliminar_usuario() {
    let _id = this.dataset._id;
    swal({
        title: 'Desea eliminar a este usuario?',
        text: "El usuario se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarUsuario(_id);

            reload();
            swal(
                'Eliminado!',
                'El usuario ha sido eliminado con éxito',
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
    botonRegistrar.hidden = false;
    botonActualizar.hidden = true;
    let titulo;
    titulo = document.getElementById('h1');
    titulo.innerHTML = 'Registrar Usuario';
    limpiarFormularioRegistrar();
});

let ppRegistrar = document.querySelector('#sct_registrar');

botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});

window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormularioRegistrar();
        // Actualizar en cada caso de uso
    }

}


function limpiarFormularioRegistrar() {
    elementoImagen.src = "../../img/default-avatar.png";
    inputNombre.value = "";
    inputPrimerApellido.value = "";
    inputSegundoApellido.value = "";
    inputCedula.value = 0;
    inputFecha.valueAsDate = dHoy;
    inputCorreo.value = "";
    inputTelefono.value = 0;
    inputDireccion.value = "";
    inputProvincia.value = "";
    inputCanton.value = "";
    inputDistrito.value = "";
    inputRol.value = "";
};


function reload() {
    mostrarListaUsuarios();
    limpiarFormularioRegistrar();
    ppRegistrar.style.display = "none";
    ppActualizar.style.display = "none";
}
// Esto es para que despliegue el formulario
