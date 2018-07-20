'use strict';
// Utilizando jquery, hago que el menu cambie si display al presionar el boton
$("#btnMenu").click(function(){
    showMenu();
});

$("#menu").mouseleave(function(){
    hideMenu();
});

function showMenu(){
    if ($("#menu").css("display") === 'none') {
        $("#menu").fadeIn("slow");
    }
};
function hideMenu(){
    $("#menu").fadeOut("slow");
};

