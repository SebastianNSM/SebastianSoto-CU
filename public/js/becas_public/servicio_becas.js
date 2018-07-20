'use strict';

function registrarInfoBeca (paInfoBeca)
{
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_beca',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            max_horas: paInfoBeca[0],
            max_beca: paInfoBeca[1]
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
