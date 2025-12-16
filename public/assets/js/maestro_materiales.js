/*--- esta funcion permite seleccionar el codigo del artículo y pasarlo a la ventana de procesos especiales uno ---*/
function selectArt(coArt,desArt,coSubl,campo1,precio){
    try {    
        console.log ("entrando proceso selectArt");
        paso=1;
        coArtV=coArt;
        paso=2;
        coSublV=coSubl;
        paso=3;
        campo1V=campo1;
        paso=4;
        precioV=precio;
        // determinamos que tipo de busqueda es segun el campo cTMP_TIP
        // capturamos el acnho de la etiqueta segun si es flexo o indigo
        if (window.opener.getTipoCotizacion()==1){
            paso=5;
            // es flexo
            anchoEtiqueta=window.opener.getAnchoFlexo();
        } else {
            // es indigo
            paso=6;
            anchoEtiqueta=window.opener.getAnchoIndigo();
        }

        // capturamos el avance
        paso=7;
        avanceEtiqueta=window.opener.getAvanceEtiqueta();

        // capturamos el ancho de la bobina
        paso=8;
        anchoBobina=window.opener.getAnchoBobina();
        anchoBobina=campo1;

        // capturamos el largo de la etiqueta
        paso=9;
        largoEtiqueta=window.opener.getLargoEtiqueta();

        // capturamos los canales de la etiqueta
        paso=10;
        canalesEtiquetas=window.opener.getCanalesEtiqueta();

        paso=11;
        cTMP_TIPV=document.getElementById('cTMP_TIP').value;
        
        // actualizamos los datos en el formulario anterior    
        paso=12;
        if (cTMP_TIPV=="M"){
            // es un material
            paso=13;
            window.opener.setCodigoMaterial(coArt);
            paso=14;
            window.opener.setDescripcionMaterial(desArt);
            window.opener.setCostoAnchoBobina(anchoBobina);
            window.opener.changeCostoMaterial();
        } else if (cTMP_TIPV=="S"){
            paso=15;
            // es un sandwich
            window.opener.setSandwich(coArt);
            paso=16; 
            window.opener.setDescripcionSandwich(desArt);
        } else if (cTMP_TIPV=="L"){
            // es un laminado
            paso=17;
            window.opener.setCodigoLaminado(coArt);
            paso=18;
            window.opener.setDescripcionLaminado(desArt);        
        }

        // ajustamos el ancho de bobina segun el codigo de sublinea
        paso=19;
        if (coSublV=="BL"){
            paso=20;
            window.opener.setAnchoBobina(8.5);
            paso=21;
            window.opener.changeAnchoBobina();
        }
        // buscamos el precio segun el tipo de material buscado
        paso=22;
        $.ajax({
            url: "/busca_precio_material",
            type: "get",
            dataType: "html",
            data:{
                searchInput:coArt,
                cTMP_TIP:cTMP_TIPV,
                coSubl:coSublV,
                campo1:campo1V,
                precio:precioV,           
            }
        }).done(function (res) {
            paso=23;
            //console.log (res);
            var data = JSON.parse(res);   
            paso=24;             
            //console.log  (data.valor);                                      
            if (data["valor"]==1){
                paso=25;
                precioVenta=data["precioVenta"];
                paso=26;
                // debemos seleccionar que elemento esta solicitando el precio
                switch (cTMP_TIPV){
                    case "M":
                        paso=27;
                        window.opener.setCostoMaterial(precioVenta);
                        paso=28;
                        window.opener.changeCostoMaterial();
                        window.opener.changeCostoTotalMaterial();
                        window.opener.changeCantidadEtiquetas();
                        //codigoMaterial
                        break;
                    case "L":
                        paso=29;
                        // el calculo del precio es (((ancho * avance) / 10000) * precio venta)
                        nTMP_AUX1=(((anchoEtiqueta * avanceEtiqueta ) / 10000) * precioVenta);
                        window.opener.setCostoLaminado(nTMP_AUX1.toFixed(3));
                        paso=30;
                        window.opener.changeCostoLaminacion();
                        //codigoLaminado
                        break;  
                    case "S":
                        // el calculo del precio es 
                        // redondeo ((anchoBobina * 2.54) / CanalesEtiqueta)/100) * (largoEtiqueta /100 ) * precioVenta
                        // oTMP_FRM.PAGFR1.PAG003.TXTCOS.VALUE = ROUND((((oTMP_FRM.PAGFr1.PAg001.TXTABo.VALUE * 2.54) / oTMP_FRM.PAGFr1.PAG001.SPICan.VALUE) / 100) * (oTMP_FRM.PAGFr1.PAg001.TXTTLA.VALUE / 100) * uTMP_BUS.PREC_VTA1, 2)
                        paso=31;
                        if (canalesEtiquetas > 0){
                            nTMP_AUX1=(((anchoBobina * 2.54 ) / canalesEtiquetas) / 100) * (largoEtiqueta / 100) * precioVenta;
                            window.opener.setCostoSandwich(nTMP_AUX1.toFixed(2));
                            paso=32;
                            window.opener.changeCostoSandwich();
                            //txtSandwich
                        } else {
                            paso=33;
                            cadena="Debe definir los canales de impresión" ;
                            paso=34;
                            msgError(cadena);                            
                        }

                        break;                                              
                }
                paso=35;
                window.close();
            } else {
                paso=50;
                cadena="No se puede encontrar el precio del proveedor: 'Kaluka' <br>" ;
                cadena+=" para el material: '" + coArt + " - " + desArt + "' <br>";
                cadena+=" se tomará el precio del material por defecto ";
                paso=51;
                msgError(cadena);
            }
        });
    
        // asignamos el ancho de bobina
        paso=60;
        //window.opener.setCostoAnchoBobina(campo1V);
        paso=61;
       // window.opener.changeCostoAnchoBobina()

        //window.close();
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error selectArt");
        console.error("Mensaje de error:", error.message, "paso:", paso);
        console.error("Tipo de error:", error.name);
    }          
}

/*--- esta funccion se ejecuta cuando se cambia el criterio de busqueda -----*/
function cambiaCampo(){
    try {    
        paso=1;
        console.log ("entrando proceso cambiaCampo");  
        paso=2;  
        var opcionActiva=document.getElementById('campo').value;

        // SE BLANQUEAN LOS CONTROLES
        paso=3;
        document.getElementById('txtCodigoMaterial').value="";
        paso=4;
        document.getElementById('txtAnchoMaterial').value="";
        if (opcionActiva=="4"){
            paso=5;
            document.getElementById('txtAnchoMaterial').disabled=false;
        } else {
            // deshabilitamos el campo de ancho 
            paso=6;
            document.getElementById('txtAnchoMaterial').disabled=true;
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo cambiaCampo");
        console.error("Mensaje de error:", error.message);
        console.error("Tipo de error:", error.name);
    }            
}

function msgError (cadena){
    var cadena="<span class='text-danger'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');    
}

/*------ esta funcon permite hacer el filtrado de articulos ----*/
function buscarArt(){
    try {
        paso=1;
        document.getElementById('selectTipoSearch').style.backgroundColor="#FFFFFF";
        paso=2;
        document.getElementById('txtSearchInput').style.backgroundColor="#FFFFFF";
        paso=3;
        document.getElementById('txtSearchAncho').style.backgroundColor="#FFFFFF";
        paso=4;
        var tipoBusqueda=document.getElementById('selectTipoSearch').value;
        cTMP_TIP=document.getElementById('cTMP_TIP').value;
        paso=5;
        if (tipoBusqueda=="-99"){
            paso=6;
            document.getElementById('selectTipoSearch').style.backgroundColor="#dc3545";
            paso=7;
            var cadena="Debe seleccionar un criterio para efectuar la Búsqueda";
            paso=8;
            msgError(cadena);
            return (false);
        }

        paso=9;
        var txtSearch=document.getElementById('txtSearchInput').value.trim();
        if (txtSearch.length==0){
            paso=10;
            var cadena="Debe escribir una frase para efectuar la Búsqueda";
            paso=11;
            document.getElementById('txtSearchInput').style.backgroundColor="#dc3545";
            paso=12;
            msgError(cadena);
            return (false);
        }

        // validamos que se este buscanco por ancho y descripcion
        paso=13;
        if (document.getElementById('selectTipoSearch').value=="4"){
            paso=14;
            var txtSearchAncho=document.getElementById('txtSearchAncho').value.trim();
            if (txtSearchAncho.length==0){
                paso=15;
                var cadena="Debe escribir una frase para efectuar la Búsqueda por ancho";
                paso=16;
                document.getElementById('txtSearchAncho').style.backgroundColor="#dc3545";
                paso=17;
                msgError(cadena);
                return (false); 
            }
        }
        paso=18;
        var empresaV=document.getElementById('selectedEnterprise').value;
        paso=19;
        window.document.location="/maestro_materiales/?empresa="+empresaV+"&cTMP_TIP="+cTMP_TIP+"&searchInput="+txtSearch+"&searchType="+tipoBusqueda+"&searchAncho="+txtSearchAncho;
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo cambiaCampo");
        console.error("Mensaje de error:", error.message);
        console.error("Tipo de error:", error.name);
    }       
}

/*--- esta funcion permite limpiar los filtros de busqueda -----*/
function cleanAll(){
    var empresaV=document.getElementById('selectedEnterprise').value;
    window.document.location="/maestro_materiales/?empresa="+empresaV;
}

/*----- esta funcion permite salir del formulario --------------*/
function salir(){
    window.close();
}