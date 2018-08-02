'use strict';

function registrarCurso(paInfoCursos){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_curso',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            nombre_curso : paInfoCursos[0],
            codigo_curso : paInfoCursos[1],
            creditos_curso : paInfoCursos[2],
            costo_curso : paInfoCursos[3]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function obtenerCursos(){
    let listaCursos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_curso',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaCursos = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaCursos;
};