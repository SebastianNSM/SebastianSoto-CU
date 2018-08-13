'use strict';

function registrar_Usuarios(paInfoUsuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_usuarios',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            foto_usuario: paInfoUsuario[0],
            nombre_usuario: paInfoUsuario[1],
            primer_apellido_usuario: paInfoUsuario[2],
            segundo_apellido_usuario: paInfoUsuario[3],
            cedula_usuario: paInfoUsuario[4],
            fecha_usuario: paInfoUsuario[5],
            correo_usuario: paInfoUsuario[6],
            telefono_usuario: paInfoUsuario[7],
            direccion_usuario: paInfoUsuario[8],
            provincia_usuario: paInfoUsuario[9],
            canton_usuario: paInfoUsuario[10],
            distrito_usuario: paInfoUsuario[11],
            rol_usuario: paInfoUsuario[12],
            estado_usuario: paInfoUsuario[13],
            contrasenna_usuario: paInfoUsuario[14],
            first_log: paInfoUsuario[15]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function obtenerLista_Usuarios() {
    let listaUsuarios = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_usuarios',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function obtener_usuario_por_id(pid) {
    let usuario = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_usuario_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        usuario = response;
    });

    peticion.fail(function (response) {

    });

    return usuario;
};

function obtener_masInfo_por_id(pid) {
    let usuario = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_masInfo_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        usuario = response;
    });

    peticion.fail(function (response) {

    });

    return usuario;
};

function actualizarUsuario(paInfoUsuarioActual) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: paInfoUsuarioActual[0],
            foto_usuario: paInfoUsuarioActual[1],
            nombre_usuario: paInfoUsuarioActual[2],
            primer_apellido_usuario: paInfoUsuarioActual[3],
            segundo_apellido_usuario: paInfoUsuarioActual[4],
            cedula_usuario: paInfoUsuarioActual[5],
            fecha_usuario: paInfoUsuarioActual[6],
            correo_usuario: paInfoUsuarioActual[7],
            telefono_usuario: paInfoUsuarioActual[8],
            direccion_usuario: paInfoUsuarioActual[9],
            provincia_usuario: paInfoUsuarioActual[10],
            canton_usuario: paInfoUsuarioActual[11],
            distrito_usuario: paInfoUsuarioActual[12],
            rol_usuario: paInfoUsuarioActual[13],
            estado_usuario: paInfoUsuarioActual[14],
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function actualizarContrasenna(paInfoContrasenna) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: paInfoContrasenna[0],
            contrasenna_usuario: paInfoContrasenna[1],
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function actualizarFirstLog(pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid,
            first_log: false
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function eliminarUsuario(_pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/eliminar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: _pid
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};