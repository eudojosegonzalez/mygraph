//---- esta funcion se usa para mostrar errores 
function msgError (cadena){
    try {
        console.log ("entrando a msgError");
        paso=1;
        var cadena="<span class='text-danger'>"+cadena+"</span>";
        paso=2;
        $('#miModal').find('.modal-body').html(cadena);
        paso=3;
        const tituloModal = document.querySelector('#miModal .modal-title');
        paso=4;
        tituloModal.innerHTML = "Atención";
        paso=5;
        $('#miModal').modal('show'); 
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error msgError");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
   
}

/*----- esta funcion permite tomar losdatos de los foils --------------*/
function guardar(){
    try {
        console.log ("Entrando a guardar");

        paso=1;
        // capturamos el ancho del foil
        anchoFoilV=document.getElementById('selAnchoFoil').value;

        // capturamos el color del foil 1
        paso=2;
        colorFoil1V=document.getElementById('selColorFoil1').value;

        // capturamos el color del foil 2
        paso=3;
        colorFoil2V=document.getElementById('selColorFoil2').value;

        // captuamos el tipo de foil
        paso=4;
        tipoFoilV=document.getElementById('tipoFoil').value;

        // validamos los datos
        paso=5;
        dbV=document.getElementById('db').value;

        if (anchoFoilV!='-99'){
            // validamos si el color de Foil1 esta seleccionado
            paso=6;
            if (colorFoil1V!='-99'){
                paso=7;
                //asignamos el color del foil al objeto del fomulario anterior
                if (colorFoil1V!="-99"){
                    paso=8;
                    window.opener.setColorFoil1(colorFoil1V);
                }
                paso=9;
                if (colorFoil2V!="-99"){
                    paso=10;
                    window.opener.setColorFoil2(colorFoil2V);
                }
                paso=11;
                if (anchoFoilV!="-99"){
                    paso=12;
                    window.opener.setAnchoFoil(anchoFoilV);
                }

                
            } else {
                paso=13;
                cadena="Debe seleccionar un color de Foil";
                paso=14;
                msgError(cadena);                
            }

            // buscamos el precio de venta
            // configuramos los valores iniciales
            paso=20;
            window.opener.setColorFoil1("");
            window.opener.setCostoFoil1(0.00);
            window.opener.changeCostoFoil1();
            window.opener.deseleccionaChkFoil1();
            paso=21;
            window.opener.setColorFoil2("");
            window.opener.setCostoFoil2(0.00);
            window.opener.changeCostoFoil2();
            paso=22;
            window.opener.setCostoTotalFoil(0.00); 
            window.opener.changeCostoTotalFoil();
            window.opener.deseleccionaChkFoil2();
            paso=23;   
            nTMP_AUX1=0.00;    
            //------------------------
            paso=24;
            $.ajax({
                url: "/precio_venta_foils",
                type: "get",
                dataType: "html",
                data : {
                    anchoFoil:anchoFoilV,
                    colorFoil1:colorFoil1V,
                    colorFoil2:colorFoil2V,
                    tipoFoil:tipoFoilV,
                    db:dbV,
                }
            }).done(function (res) {
                paso=25;
                //console.log (res);
                var data = JSON.parse(res); 
                paso=26;               
                console.log  (data);  
                paso=27;                                    
                if (data.valor==1){
                    paso=30;

                    // determinamos que tipo de cotizaciones Flexo o Indigo
                    if (window.opener.getTipoCotizacion()=="1"){
                        paso=31;
                        anchoEtiqueta=window.opener.getAnchoFlexo();
                    } else {
                        paso=32;
                        anchoEtiqueta=window.opener.getAnchoIndigo();
                    }
                    // capturamos el avance
                    paso=33;
                    avanceEtiqueta=window.opener.getAvanceEtiqueta();
                    // calculamos el costo segun la formula 
                    // (((ancho * avance) / 10000) * precio)
                    paso=34;

                    nTMP_AUX1=(((anchoEtiqueta * avanceEtiqueta) / 10000) * parseFloat(data.precio));
                    console.log ("ancho",anchoEtiqueta);
                    console.log ("avance",avanceEtiqueta);   
                    console.log ("precio Venta:",parseFloat(data.precio));
                    console.log ("costo:",nTMP_AUX1);                                     
                    paso=35;
                    window.opener.setColorFoil1(colorFoil1V);
                    window.opener.seleccionaChkFoil1();
                    window.opener.setCostoFoil1(parseFloat(nTMP_AUX1));
                    window.opener.changeCostoFoil1();
                    // verificamos si se seteo el color del foil2
                    if (colorFoil2V!="-99"){
                        paso=36;
                        window.opener.setColorFoil2(colorFoil2V);
                        window.opener.seleccionaChkFoil2();
                        window.opener.setCostoFoil2(parseFloat(nTMP_AUX1));
                        window.opener.changeCostoFoil2();
                    } else {
                        paso=37;
                        window.opener.setColorFoil2("");
                        window.opener.deseleccionaChkFoil2();
                        window.opener.setColorFoil2(0.00);
                        window.opener.changeCostoFoil2();
                    }
                    // sumamos los costos de los foils
                    paso=38;
                    nTMP_AUX1=window.opener.getCostoFoil1()+window.opener.getCostoFoil2();
                    console.log ("costoTotalFoil:",nTMP_AUX1);
                    // asignamos el valor al control
                    paso=39;
                    window.opener.setCostoTotalFoil(nTMP_AUX1);
                    window.opener.changeCostoTotalFoil();
                    paso=40;
                    window.close();
                } else if (data.valor==-2) {
                    paso=50;
                    cadena="No se pudo encontrar el precio de venta de los foils";
                    paso=51;
                    msgError(cadena);
                } else {
                    paso=60;
                    cadena="Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo";
                    paso=61;
                    msgError(cadena);
                }
            });  
            paso=70;           
        } else {
            paso=80;
            cadena="Debe seleccionar un ancho de Foil";
            paso=81;
            msgError(cadena);
        }
        // buscamos el precio de venta del foil


        /*
		original foxpro

        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error guardar");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
}

/*----- esta funcion permite salir del formulario --------------*/
function salir(){
    window.close();
}