'use strict';

function registrarCarrera (paInfoCarrera)
{
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_carrera',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_carrera: paInfoCarrera[0],
            grado_carrera: paInfoCarrera[1],
            codigo_carrera: paInfoCarrera[2],
            creditos_carrera: paInfoCarrera[3],
            fecha_carrera: paInfoCarrera[4],
        }
    });

    peticion.done(function (response)
    {
        respuesta = response;
    });

    peticion.fail(function (response)
    {

    });

    return respuesta;
}

function obtenerListaCarreras(){
    let listaCarreras = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_carrera',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
}
function buscar_por_carrera_id(pid){
    let carrera = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_carrera',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
        carrera = response;
      });
    
      peticion.fail(function(response){
       
      });

      return carrera;
};
function actualizarCarrera(paInfoCarreraActual){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_carrera',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoCarreraActual[0],
            nombre_carrera : paInfoCarreraActual[1],
            grado_carrera : paInfoCarreraActual[2],
            codigo_carrera : paInfoCarreraActual[3],
            creditos_carrera : paInfoCarreraActual[4],
            fecha_carrera : paInfoCarreraActual[5],
            estado_carrera: paInfoCarreraActual[6],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};
function eliminarCarrera(_pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_carrera',
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
function agregarCursoCarrera(pid, sNombreCurso, sCodigoCurso){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/agregar_curso_carrera',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid,
            nombre_curso : sNombreCurso,
            codigo_curso : sCodigoCurso
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
function eliminarCursoCarrera(pIdCarrera,pIdCurso ){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_subdocumento_curso_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pIdCarrera,
            id_curso : pIdCurso
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
