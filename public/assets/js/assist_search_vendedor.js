function salir(){
    window.close();
}

// esta funcon permite ejecutar la busqueda
function search(){
    console.log ("entrando a search()");
    paso=0;    
    try {    
        paso=1;
        document.getElementById('searchInput').style.backgroundColor="#ffffff";
        paso=2;
        var idElemento=document.getElementById('idElemento').value;
        paso=3;
        var campoTxt=document.getElementById('searchCampo').value;
        paso=4;
        var campo="1";
        paso=5;
        switch (campoTxt){
            case "Descripción":
                paso=5;
                campo="1";
                break;
            case "Código":
                paso=6;
                campo="2";
                break; 
        }

        paso=9;
        var cadena = document.getElementById('searchInput').value.trim();
        paso=10;
        if (cadena.length >0 ){
            paso=11;
            document.location='/search_asists_vendedor/?searchInput='+cadena+"&idElemento="+campo;
        } else {
            paso=12;
            document.getElementById('searchInput').style.backgroundColor="#ff7f00";
            paso=13;
            alert ("Debe definir un criterio para la búsqueda");
            paso=14;
            return (false);
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error search()");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

// esta funcion limpia todas las opciones de busqueda
function cleanAll(){
    document.location='/search_asists_vendedor';
}


// esta funcion permite cambiar el campo por el que se efectuara la busqueda
function changeCampo(){
    paso=1;
    console.log (document.getElementById('searchCampo').value);
    if (document.getElementById('searchCampo').value=='Descripción'){
        paso=2;
        document.getElementById('searchCampo').value="Código";
    } else if (document.getElementById('searchCampo').value=='Código'){
        paso=3;
        document.getElementById('searchCampo').value="Descripción";
    } else  {
        paso=5;
        document.getElementById('searchCampo').value="Descripción";
    }
    console.log (document.getElementById('searchCampo').value, paso);    
}

// esta función permite seleccionar un articulo en el renglon activo y llenar por defecto las opciones de calculo
function selectVendedor(coVendedor){
    console.log ("entrando a selectVendedor()");
    paso=0;    
    console.log (`Vendedor:${coVendedor}`);
    try {    
        paso=16;
        const searchValue2 = coVendedor.trim(); 
        // activamos el nombre del vendedor en el objeto 
        const selectElement3 = window.opener.document.getElementById('codvendedor');
        console.log (paso);
        paso=17;
        if (selectElement3) {
            paso=18;
            // Recorrer todas las opciones del SELECT
            for (let i = 0; i < selectElement3.options.length; i++) {
                paso=19;
                const option = selectElement3.options[i];
                paso=20;
                // Comparar el valor de la opción con la variable
                if (option.value === searchValue2) {
                    console.log(paso);
                    paso=21;
                    // 1. Establecer la propiedad 'selected' a true
                    option.selected = true;
                    paso=22;
                    console.log(paso);
                    // 2. Salir del bucle una vez que se encuentra la opción
                    break; 
                }
            }
            console.log (paso);
        }            

        paso=23;
        // activamos el nombre del vendedor en el objeto 
        const selectElement4 = window.opener.document.getElementById('codvendedor2');
        paso=24;
        console.log (paso);
        if (selectElement4) {
            paso=25;
            // Recorrer todas las opciones del SELECT
            for (let i = 0; i < selectElement4.options.length; i++) {
                paso=26;
                const option = selectElement4.options[i];
                paso=27;
                // Comparar el valor de la opción con la variable
                if (option.value === searchValue2) {
                    console.log (paso);
                    paso=28;
                    // 1. Establecer la propiedad 'selected' a true
                    option.selected = true;
                    paso=29;
                    console.log(paso);
                    // 2. Salir del bucle una vez que se encuentra la opción
                    break; 
                }
            }
        }        
        paso=50;
        console.log(paso);
        //window.close();
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error selectVendedor()");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}