
function initMap() {

    //la posicion por default va a estar encima de costa rica para que el usuario de zoom y posicione
    //el marker
    posicionCentral = { lat: 9.934739, lng: -84.087502 };


    //configuracion del mapa (tendra zoom de 7) y se centrara en la posicion guardada
    let opciones = {
        zoom: 7,
        center: posicionCentral
    }
    
    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapa'), opciones);
    

    //Marker (la posicion del marker es la misma posicion que donde se centra el mapa y hace que el marker sea arrastrable)
    let markerMapa = new google.maps.Marker({
        position: posicionCentral,
        map: mapa,
        draggable: true
    });


    //event listener que cuando el marker se mueva, guarde la latitud y longitud en el localstorage//en su caso en la base de datos
    google.maps.event.addListener(markerMapa, 'dragend', function () {
        latitudSede = markerMapa.getPosition().lat();
        longitudSede = markerMapa.getPosition().lng();
        document.querySelector('#numLongitud').value=longitudSede;
        document.querySelector('#numLatitud').value=latitudSede;
    });
}