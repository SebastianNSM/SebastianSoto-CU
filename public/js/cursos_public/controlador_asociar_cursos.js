'use strict';
crearInput();
selectOptions();

let botonElegir = document.querySelector('#btnElegir');
botonElegir.addEventListener('click', obtenerEleccion);

let inputCarrera = document.querySelector('#sltCarrera');

let sCarrera = "";

function obtenerEleccion(){
    sCarrera = inputCarrera.value;

    
};

function crearInput() {
    // Se cambia la funcion obtenerCursos por lo que sea que quieren asociar
    let listaCursos = obtenerCursos();
    let form = document.querySelector('#formCursos div.checkbox');

    for (let i = 0; i < listaCursos.length; i++) {
        let current = listaCursos[i]['nombre_curso'];
        let nuevoLabel = document.createElement('label');
        nuevoLabel.htmlFor = current;

        let text = document.createTextNode(listaCursos[i]['nombre_curso']);
        nuevoLabel.appendChild(text);


        let nuevoInput = document.createElement('input');
        nuevoInput.value = current;
        nuevoInput.id = current;
        nuevoInput.type = "checkbox";
        form.appendChild(nuevoInput);
        form.appendChild(nuevoLabel);
    }
};

// Hacer una funcion de estas por asosiacion
function selectOptions() {
    // Cambiar esta funcion del servicio correspondiente
    let listaCarreras = obtenerListaCarreras();
    // Se le cambia el nombre del id
    let select = document.querySelector('#sltCarrera');

    for (let i = 0; i < listaCarreras.length; i++) {
        let current = listaCarreras[i]['nombre_carrera'];
        let nuevaOpcion = new Option(current);
        nuevaOpcion.value = current
        select.appendChild(nuevaOpcion);
    }
};