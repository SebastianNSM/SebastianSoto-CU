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
            nombre_curso : paInfoCursos[1],
            codigo_curso : paInfoCursos[2],
            creditos_curso : paInfoCursos[3],
            costo_curso : paInfoCursos[4]
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

function buscar_curso_id(_pid){
    let curso = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_curso_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : _pid
        }
      });
    
      peticion.done(function(response){
        curso = response;
      });
    
      peticion.fail(function(response){
       
      });

      return curso;

};

function actualizarCurso (paInfoCursos){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_curso',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoCursos[0],
            nombre_curso : paInfoCursos[1],
            codigo_curso : paInfoCursos[2],
            creditos_curso : paInfoCursos[3],
            costo_curso : paInfoCursos[4]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

};

function eliminarCurso (_pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_curso',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: _pid
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;

};