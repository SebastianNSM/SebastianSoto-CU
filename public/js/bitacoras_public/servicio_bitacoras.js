'use strict';

function registrarBitacora(paInfoBitacora) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_bitacora',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_profesor_bitacora: paInfoBitacora[0],
            nombre_asistente_bitacora: paInfoBitacora[1],
            curso_bitacora: paInfoBitacora[2],
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function obtenerListaBitacoras() {
    let listaBitacoras = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_bitacora',
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
function buscarBitacora(pid) {
    let bitacora = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_bitacora_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        bitacora = response;
    });

    peticion.fail(function (response) {

    });

    return bitacora;
};

function eliminarBitacora(_pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/eliminar_bitacora',
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
function agregarActividadBitacora(paInfoActividad) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/agregar_actividad_bitacora',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: paInfoActividad[0],
            fecha_registro_actividad: paInfoActividad[1],
            fecha_actividad_actividad: paInfoActividad[2],
            hora_inicio_actividad: paInfoActividad[3],
            hora_fin_actividad: paInfoActividad[4],
            horas_trabajadas_actividad: paInfoActividad[5],
            accion_actividad: paInfoActividad[6],
            estudiantes_atendidos_actividad: paInfoActividad[7],
            descripcion_actividad: paInfoActividad[8]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function eliminarActividadBitacora(pIdBitacora, pIdActividad) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/eliminar_subdocumento_actividad_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pIdBitacora,
            id_actividad: pIdActividad
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function actualizarBitacora(paInfoBitacora){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_bitacora',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoBitacora[0],
            nombre_profesor_bitacora : paInfoBitacora[1],
            nombre_asistente_bitacora : paInfoBitacora[2],
            curso_bitacora : paInfoBitacora[3],
            horas_totales_bitacora : paInfoBitacora[4]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function actualizarTotalHoras(pid,tHoras){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_bitacora',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pid,
            horas_totales_bitacora : tHoras
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function aprobarBitacora(pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_bitacora',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pid,
            estado_bitacora: "Aprobado"
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function rechazarBitacora(pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_bitacora',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pid,
            estado_bitacora: "Rechazado"
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function actualizarActividad(paInfoActividad){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_actividad_bitacora',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            id_bitacora: paInfoActividad[0],
            id_actividad: paInfoActividad[1],
            fecha_registro_actividad: paInfoActividad[2],
            fecha_actividad_actividad: paInfoActividad[3],
            hora_inicio_actividad: paInfoActividad[4],
            hora_fin_actividad: paInfoActividad[5],
            horas_trabajadas_actividad: paInfoActividad[6],
            accion_actividad: paInfoActividad[7],
            estudiantes_atendidos_actividad: paInfoActividad[8],
            descripcion_actividad: paInfoActividad[9]
        }
      });

      peticion.done(function(response){
       respuesta = response;
      });

      peticion.fail(function(response){

      });

      return respuesta;
};