'use strict';


function registrarSede(paInfoSede){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_sede',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre_sede : paInfoSede[0],
            dirExacta_sede : paInfoSede[1],
            latitud_sede : paInfoSede[2],
            longitud_sede : paInfoSede[3],
            estado_sede : paInfoSede[4],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       respuesta = response;
      });

      return respuesta;
};

function obtenerListaSedes(){
    let listaSedes = [];
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_sedes',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       listaSedes = response;
      });
    
      peticion.fail(function(response){
        return response;
      });
      return listaSedes;
  
};

function obtener_sede_por_id(pid){
    let sede = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_sede_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
        sede = response;
      });
    
      peticion.fail(function(response){
       
      });

      return sede;
};

function actualizarSede(paInfoSede){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_sede',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoSede[0],
            nombre_sede : paInfoSede[1],
            dirExacta_sede : paInfoSede[2],
            latitud_sede : paInfoSede[3],
            longitud_sede : paInfoSede[4],
            estado_sede: paInfoSede[5],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

};

function eliminarSede(_pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_sede',
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

function agregarCarreraSede(pid, sNombreCarrera, sCodigoCarrera){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/agregar_carrera_sede',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid,
            nombre_carrera : sNombreCarrera,
            codigo_carrera : sCodigoCarrera
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function eliminarCarreraSede(pIdSede,pIdCarrera ){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_subdocumento_carrera_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pIdSede,
            id_carrera : pIdCarrera
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
