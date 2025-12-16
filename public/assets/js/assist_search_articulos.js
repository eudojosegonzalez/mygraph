function salir(){
    window.close();
}

// esta funcon permite ejecutar la busqueda
function search(){
    document.getElementById('searchInput').style.backgroundColor="#ffffff";
    var idElemento=document.getElementById('idElemento').value;
    var campoTxt=document.getElementById('searchCampo').value;
    var campo="1";
    switch (campoTxt){
        case "Descripción":
            campo="1"
            break;
        case "Código":
            campo="2"
            break; 
        case "Modelo":
            campo="3"
            break;                       
    }

    var cadena = document.getElementById('searchInput').value.trim();
    if (cadena.length >0 ){
        document.location='/search_asists_articulos/?searchInput='+cadena+"&campo="+campo+"&idElemento="+idElemento;
    } else {
        document.getElementById('searchInput').style.backgroundColor="#ff7f00";
        alert ("Debe definir un criterio para la búsqueda");
        return (false);
    }
}

// esta funcion limpia todas las opciones de busqueda
function cleanAll(){
    document.location='/search_asists_articulos';
}


// esta funcion permite cambiar el campo por el que se efectuara la busqueda
function changeCampo(){
    if (document.getElementById('searchCampo').value=='Descripción'){
        document.getElementById('searchCampo').value="Código";
    } else if (document.getElementById('searchCampo').value=='Código'){
        document.getElementById('searchCampo').value="Modelo";
    } else {
        document.getElementById('searchCampo').value="Descripción";
    }
}

// esta función permite seleccionar un articulo en el renglon activo y llenar por defecto las opciones de calculo
function selectArt(coArt, i){
    var idElemento=document.getElementById('idElemento').value;
    
    window.opener.document.getElementById(idElemento).value=coArt.trim();
    let indice = parseInt(idElemento.replace("co_art", ""));

    // buscammos la descripcion
    nomObj="desArt"+i;

    var cDescripcNew=document.getElementById(nomObj).innerHTML;

    console.log (cDescripcNew);

    let myPersistentArray = [];

    const storedArray = localStorage.getItem('myArrayKey'); // 'myArrayKey' is the key for your array

    if (storedArray) {
        // If data exists, parse it back into a JavaScript array
        myPersistentArray = JSON.parse(storedArray);
    }

    // buscamos el elemento correspondiente en el arreglo para actualizar
    /*
        elemento={
            "cAnulado":cAnulado, 
            "fAux01":fAux01, 
            "cAux02":cAux02,
            "fCantImp":fCantImp,
            "fCanProd":fCanProd,
            "cAlmacen":cAlmacen,
            "cAlmacen2":cAlmacen2,
            "cCoArt":cCoArt,
            "cComentario":cComentario,   
            "fCosProOm":fCosProOm,
            "fCosProUn":fCosProUn,
            "cDesArt":cDesArt,
            "nFactNum":nFactNum,
            "dFecLote":dFecLote,
            "fImpProd":fImpProd,
            "fMonIlc":fMonIlc,
            "fMontDev":fMontDev,
            "nNroLote":nNroLote,
            "nNumDoc":nNumDoc,
            "nNumDoc2":nNumDoc2,
            "fOtros":fOtros,
            "fPendiente":fPendiente,
            "fPendiente2":fPendiente2,
            "fPorDesc":fPorDesc,
            "fPrecio1":fPrecio1,
            "fPrecio2":fPrecio2,
            "nRengDoc":nRengDoc,
            "nRengDoc2":nRengDoc2,
            "fRengNeto":fRengNeto,
            "nRenNum":nRenNum,     
            "cRowId":cRowId,
            "nSeleccion":nSeleccion,
            "fSTotalArt":fSTotalArt,
            "cTipoDoc":cTipoDoc,
            "cTipoDoc2":cTipoDoc2,
            "fIva":fIva, 
            "fSTotalDev":fSTotalDev,
            "fSTotalUni":fSTotalUni,        
            "fUltCosOm":fUltCosOm,  
            "fUltCosUn":fUltCosUn,              
            "nUnidad":nUnidad,
            "fCant":fCant,
            "cModelo":cModelo,
            "fAdicional":fAdicional,
        };
    */
    console.log (myPersistentArray[indice]['cCoArt']);
    // esta vacio se debe inicializar los la cantidad, en caso contrario se respeta, pero se inicializan los costos
    if (( myPersistentArray[indice]['cCoArt']=="") ) { 
        myPersistentArray[indice]['fCant']=0;
        myPersistentArray[indice]['cCoArt']=coArt;
        myPersistentArray[indice]['cAlmacen']="APT";
        myPersistentArray[indice]['nUnidad']="UND";
        myPersistentArray[indice]['fPrecio1']=0.00;    
        myPersistentArray[indice]['fPrecio2']=0.00; 
        myPersistentArray[indice]['fPorDesc']=0.00;   
        myPersistentArray[indice]['fIva']="1";   
        myPersistentArray[indice]['fRengNeto']=0.00;
        myPersistentArray[indice]['nRengDoc']="";
        myPersistentArray[indice]['nRengDoc2']="";
        myPersistentArray[indice]['cDesArt']="";
        myPersistentArray[indice]['cModelo']="";
        myPersistentArray[indice]['nRenNum']=indice;
        myPersistentArray[indice]['fAdicinal']=0.00;
    } else {
        if ( myPersistentArray[indice]['cCoArt']!=coArt) {
            myPersistentArray[indice]['cCoArt']=coArt;
            myPersistentArray[indice]['cAlmacen']="APT";
            myPersistentArray[indice]['nUnidad']="UND";
            myPersistentArray[indice]['fPrecio1']=0.00;    
            myPersistentArray[indice]['fPrecio2']=0.00; 
            myPersistentArray[indice]['fPorDesc']=0.00;   
            myPersistentArray[indice]['fIva']="1";   
            myPersistentArray[indice]['fRengNeto']=0.00;
            myPersistentArray[indice]['nRengDoc']="";
            myPersistentArray[indice]['nRengDoc2']="";
            myPersistentArray[indice]['cDesArt']=cDescripcNew;
            myPersistentArray[indice]['cModelo']="";
            myPersistentArray[indice]['nRenNum']=indice;
            myPersistentArray[indice]['fAdicinal']=0.00;            
        }       
    }

    console.log (myPersistentArray[indice]['cCoArt']);

    // pasamos los datos del arreglo al local.storage
    // Convierte el arreglo a una cadena JSON
    const jsonArray = JSON.stringify(myPersistentArray);

    // Guarda la cadena en localStorage con una clave (por ejemplo, 'myArrayKey')
    localStorage.setItem('myArrayKey', jsonArray);    

    // actualizamos la pagina anterior
    window.opener.drawTableDatail(myPersistentArray);

    // cerramos la ventana
    window.close();
}