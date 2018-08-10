'use strict';
let rolActual = localStorage.getItem('rolUsuario');
leerRolOpciones();
imprimirInfoPerfil();
// Para menu Opciones
$('#btnOpciones').click(function () {
    if ($('#menuOpciones').css('display') === 'none') {
        $('#menuOpciones').slideDown('250');
    }
});
$('#menuOpciones, header nav>div').mouseleave(function () {
    $('#menuOpciones').slideUp('250');
});

// Para menu beca
$('#btnBeca').click(function () {
    if ($('#menuBeca').css('display') === 'none') {
        $('#menuBeca').slideDown('250');
    }
});
$('#menuBeca, header nav>div').mouseleave(function () {
    $('#menuBeca').slideUp('250');
});

// Para cerrar sesion
let botonCerrar = document.querySelector('#btnCerrarSesion');
botonCerrar.addEventListener('click', cerrarSesion);
function cerrarSesion() {
    swal({
        title: '¿Seguro que desea cerrar sesión?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            window.localStorage.clear();
            window.location.href = "../../html/landing_page.html";
        }
    })

}

// Desplegar el boton de opciones con las opciones que correopnden
function leerRolOpciones() {

    let opcionesAdministrador = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos', 'Bitácora'];
    let opcionesRectoria = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos', 'Solicitud'];
    let opcionesDecanatura = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos', 'Solicitud'];
    let opcionesAsistenteDecanatura = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos'];
    let opcionesProfesor = ['Bitácora', 'Solicitud'];
    let opcionesAsistente = ['Bitácora'];

    let becaAsistente = ['Porcentaje de actual'];
    let becaSuperior = ['Información de beca', 'Modificar información de beca'];

    switch (rolActual) {
        case 'Administrador':
            imprimirOpciones(opcionesAdministrador);
            imprimirOpcionesBeca(becaSuperior);
            break;
        case 'Rector':
            imprimirOpciones(opcionesRectoria);
            imprimirOpcionesBeca(becaSuperior);
            break;
        case 'Decanatura':
            imprimirOpciones(opcionesDecanatura);
            imprimirOpcionesBeca(becaSuperior);
            break;
        case 'AsistenteDecanatura':
            imprimirOpciones(opcionesAsistenteDecanatura);
            imprimirOpcionesBeca(becaSuperior);
            break;
        case 'Profesor':
            imprimirOpciones(opcionesProfesor);
            break;
        case 'Asistente':
            imprimirOpciones(opcionesAsistente);
            imprimirOpcionesBeca(becaAsistente);
            break;
    }
}

function imprimirOpciones(paOpciones) {
    let menu = document.querySelector('#menuOpciones');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = "#";//Aca va el link al que redirecciona.
        newA.textContent = paOpciones[i];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}

function imprimirOpcionesBeca(paOpciones) {
    let menu = document.querySelector('#menuBeca');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = "#";//Aca va el link al que redirecciona.
        newA.textContent = paOpciones[i];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}

function imprimirInfoPerfil() {
    let fotoPerfil = document.querySelector('#img');
    let nombrePerfil = document.querySelector('#nombrePerfil');
    let perfilInfo = document.querySelector('.perfil-info');
    let infoUsuarioActual = obtener_usuario_por_id(localStorage.getItem('idUsuario'));

    fotoPerfil.style.backgroundImage = "url('" + infoUsuarioActual['foto_usuario'] + "')";
    
    nombrePerfil.innerHTML = '';
    let nombreCompleto = infoUsuarioActual['nombre_usuario']+" "+infoUsuarioActual['primer_apellido_usuario']+" "+infoUsuarioActual['segundo_apellido_usuario'];
    nombrePerfil.innerHTML = nombreCompleto;

    perfilInfo.innerHTML = '';
    perfilInfo.appendChild(createTextElement('Cédula:','h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['cedula_usuario'],'h2'));
    perfilInfo.appendChild(createTextElement('Correo:','h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['correo_usuario'],'h2'));
    perfilInfo.appendChild(createTextElement('Teléfono:','h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['telefono_usuario'],'h2'));
    perfilInfo.appendChild(createTextElement('Dirección exacta:','h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['direccion_usuario'],'h2'));

}
function createTextElement(text, element) {
    let newH2 = document.createElement(element);
    newH2.textContent = text;
    return newH2
}
// style.backgroundImage = "url('" + getImgUrl(listaEntrenador[i]['foto_entrenador']) + "')";
let ppPerfil = document.querySelector('#sct_perfil');
let botonPerfil = document.querySelector('#btnPerfil');
botonPerfil.addEventListener('click', function () {
    ppPerfil.style.display = "block";
    window.onclick = function (event) {
        if (event.target == ppPerfil) {
            ppPerfil.style.display = "none";
        }
    }
});


