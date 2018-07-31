
'use strict';


function registrarSede(paInfoSede){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_sedes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre_sede : paInfoSede[0],
            dirExacta_sede : paInfoSede[1],
            latitud_sede : paInfoSede[2],
            longitud_sede : paInfoSede[3],
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
  
}