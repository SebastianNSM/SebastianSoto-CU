'use strict';

leerRolOpciones();

// Para menu Opciones
$('#btnOpciones').click(function () {
    if ($('#menuOpciones').css('display') === 'none') {
        $('#menuOpciones').slideDown('250');
    }
});
$('#menuOpciones, header nav>div').mouseleave(function () {
    $('#menuOpciones').slideUp('250');
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
    let rolActual = localStorage.getItem('rolUsuario');
    let opcionesAdministrador = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos', 'Bitácora'];
    let opcionesRectoria = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos', 'Solicitud'];
    let opcionesDecanatura = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos', 'Solicitud'];
    let opcionesAsistenteDecanatura = ['Sedes', 'Carreras', 'Cursos', 'Grupos', 'Laboratorios', 'Usuarios', 'Períodos'];
    let opcionesProfesor = ['Bitácora', 'Solicitud'];
    let opcionesAsistente = ['Bitácora'];
    switch (rolActual) {
        case 'Administrador':
            imprimirOpciones(opcionesAdministrador);
            break;
        case 'Rector':
            imprimirOpciones(opcionesRectoria);
            break;
        case 'Decanatura':
            imprimirOpciones(opcionesDecanatura);
            break;
        case 'AsistenteDecanatura':
            imprimirOpciones(opcionesAsistenteDecanatura);
            break;
        case 'Profesor':
            imprimirOpciones(opcionesProfesor);
            break;
        case 'Asistente':
            imprimirOpciones(opcionesAsistente);
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