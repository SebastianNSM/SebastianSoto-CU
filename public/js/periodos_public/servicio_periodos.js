'use strict';


function registrarPeriodo(paInfoPeriodo) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_periodo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_periodo: paInfoPeriodo[0],
            estado_periodo: paInfoPeriodo[1]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta
};


function obtenerListaPeriodos() {
    let listaPeriodos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_periodos',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        listaPeriodos = response;
    });

    peticion.fail(function (response) {
        return response;
    });
    return listaPeriodos;

}

function obtener_periodo_por_id(pid){
    let periodo = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_periodo_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
        periodo = response;
      });
    
      peticion.fail(function(response){
       
      });

      return periodo;
};

function actualizarPeriodo(paInfoPeriodo){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_periodo',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoPeriodo[0],
            nombre_periodo : paInfoPeriodo[1],
            estado_periodo : paInfoPeriodo[2],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

};

function eliminarPeriodo(_pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_periodo',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: _pid,
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;

};

