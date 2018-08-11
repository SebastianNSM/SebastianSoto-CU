let imagenUrlActual = '';

$(function() {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'esalomc', api_key: '752794273244253'});

    // Upload button
    let uploadButton = $('#btnModificarFoto');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'esalomc', upload_preset: 'esalomcpreset'},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            
            imagenUrlActual = processImage(id);
            console.log(imagenUrl);
            document.querySelector('#txtImagenActual').src = imagenUrlActual;
            return imagenUrlActual;
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}
