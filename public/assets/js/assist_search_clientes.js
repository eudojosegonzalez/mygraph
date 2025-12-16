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
            case "RIF":
                paso=7;
                campo="3";
                break;                       
            case "NIT":
                paso=8;
                campo="4"
                break;                       

        }

        paso=9;
        var cadena = document.getElementById('searchInput').value.trim();
        paso=10;
        if (cadena.length >0 ){
            paso=11;
            document.location='/search_asists_cliente/?searchInput='+cadena+"&idElemento="+campo;
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
    document.location='/search_asists_cliente';
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
        document.getElementById('searchCampo').value="RIF";
    } else if (document.getElementById('searchCampo').value=='RIF') {
        paso=4;
        document.getElementById('searchCampo').value="NIT";
    } else  {
        paso=5;
        document.getElementById('searchCampo').value="Descripción";
    }
    console.log (document.getElementById('searchCampo').value, paso);    
}

// esta función permite seleccionar un articulo en el renglon activo y llenar por defecto las opciones de calculo
function selectCliente(coCliente, desCliente, coVendedor){
    console.log ("entrando a selectCliente()");
    paso=0;    
    console.log (`Cliente:${coCliente}, Desccripcion:${desCliente}, Vendedor:${coVendedor}`);
    try {    
        paso=1;
        const searchValue = coCliente.trim(); 
        paso=2;
        // activamos el nombre del cliente en el objeto codcliente
        const selectElement = window.opener.document.getElementById('codcliente');
        paso=3;
        if (selectElement) {
            paso=4;
            // Recorrer todas las opciones del SELECT
            for (let i = 0; i < selectElement.options.length; i++) {
                paso=5;
                const option = selectElement.options[i];
                paso=6;
                // Comparar el valor de la opción con la variable
                if (option.value === searchValue) {
                    paso=7;
                    // 1. Establecer la propiedad 'selected' a true
                    option.selected = true;
                    paso=8;
                    // 2. Salir del bucle una vez que se encuentra la opción
                    break; 
                }
            }
        }       
        paso=9;
        // activamos el nombre del cliente en el objeto codcliente2
        const selectElement2 = window.opener.document.getElementById('codcliente2');
        paso=10;
        if (selectElement2) {
            paso=11;
            // Recorrer todas las opciones del SELECT
            for (let i = 0; i < selectElement2.options.length; i++) {
                paso=12;
                const option = selectElement2.options[i];
                paso=13;
                // Comparar el valor de la opción con la variable
                if (option.value === searchValue) {
                    paso=14;
                    // 1. Establecer la propiedad 'selected' a true
                    option.selected = true;
                    paso=15;
                    // 2. Salir del bucle una vez que se encuentra la opción
                    break; 
                }
            }
        }       
        paso=16;
        const searchValue2 = coVendedor.trim(); 
        // activamos el nombre del vendedor en el objeto 
        const selectElement3 = window.opener.document.getElementById('codvendedor');
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
                    paso=21;
                    // 1. Establecer la propiedad 'selected' a true
                    option.selected = true;
                    paso=22;
                    // 2. Salir del bucle una vez que se encuentra la opción
                    break; 
                }
            }
        }            

        paso=23;
        // activamos el nombre del vendedor en el objeto 
        const selectElement4 = window.opener.document.getElementById('codvendedor2');
        paso=24;
        if (selectElement4) {
            paso=25;
            // Recorrer todas las opciones del SELECT
            for (let i = 0; i < selectElement4.options.length; i++) {
                paso=26;
                const option = selectElement4.options[i];
                paso=27;
                // Comparar el valor de la opción con la variable
                if (option.value === searchValue2) {
                    paso=28;
                    // 1. Establecer la propiedad 'selected' a true
                    option.selected = true;
                    paso=29;
                    // 2. Salir del bucle una vez que se encuentra la opción
                    break; 
                }
            }
        }        
        paso=50;
        //window.close();
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error search()");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}