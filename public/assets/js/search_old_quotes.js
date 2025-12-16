function aceptar (){
    var n=document.getElementsByName('itemCotizacion').length;
    var seleccionados=0;
    var coArt="";
    var comentario="";
    var modelo="";
    for (i=0;i<n;i++){
        if (document.getElementsByName('itemCotizacion')[i].checked){
            var valor=document.getElementsByName('itemCotizacion')[i].value;    
            var arrValor=valor.split("|");
            coArt=arrValor[0];
            comentario=arrValor[1];
            modelo=arrValor[2] ?? "";
            seleccionados++;
        }   
    }
    console.log("coArt: "+coArt);
    console.log("comentario: "+comentario); 
    console.log("modelo: "+modelo); 
    if (seleccionados==1){
        // debemos actualizar el arreglo persistente de datos para que el proceso especial tome estos datos
        arregloComentario = comentario.split(";");
        window.opener.document.getElementById('modeloArticulo').value=modelo.trim();
        window.opener.cargaDataECD(coArt,arregloComentario);
    } else {
        alert("Debe seleccionar un solo item.");
    }
}

function salir(){
    window.close();
}





