/*----- definicion de variables globales -----*/
let ancho=0.00;
let anchoBobina=0.00;
let anchoEtiqueta=0.00;
let avance=0.00;
let avanceEtiqueta=0.00;
let canales=0;
let canalesADespachar=0;
let canalesDespachar=0;    
let cantidadColores=0;
let cantidadCores=0;
let cantidadEtiquetas=0;
let cantidadEtiquetasXPaginas=0;
let cantidadEtiquetasxRollo=0;    
let cantidadXRollos=0;
let cantNPre=0.00;
let checkDesperdicio=false;
let clisheAdicional=0;
let cmsLineales=0.00;
let cmsTotales=0.00;      
let codigoTroquel="";
let cores=0;    
let costo=0.00;
let costoEtiqueta=0.00;
let costoFoil1=0.00;
let costoFoil2=0.00;
let costoLaminacion=0.00;
let costoManoObra=0.00;
let costoMaterial=0.00;
let costoPorImpresion=0.00    ;
let costoSandwich=0.00;
let costoTotalMaterial=0.00;
let costoTransporte=0.00;
let cTemp1=0.00;
let cTemp2=0.00;    
let cTMP_TIP="";   
let cVarLam="";
let cVarFoi="";
let diferenciaPorAncho=0.00;
let etiquetasBlancas=false;
let etiquetasPorRollo=0;
let factor=0.00;    
let fAvance = 0.00;
let fSeparacion = 0.00;
let largo=0.00;
let largoEtiquetas=0.00;
let metrosLineales=0.00;
let mtrs2Bobina=0.00;
let mtrsLineales=0.00;    
let nTemp=0.00;    
let nTMP_AU1=0.00 ;
let nTMP_AUX1=0.00 ;
let nTMP_AU2=0.00;
let nTMP_AU3=0.00;   
let nTMP_COS=0.00;   
let nTMP_DIF=0.00;
let nTMP_PLA=0.00;
let nTMP_RIB=0;     
let nVarAux=0.00;
let nVarCos = 0.00;
let nVarDesc=0.00;
let nVarIni = 0;
let nVarPsa = 0.00;
let nVarRep=0;
let nVarVal = 0;
let porcentajeManoObra=0.00;
let porcentajeSeguridad=0.00;
let porcentajeTransporte=0.00;
let precioClishe=0.00;
let precioColor=0.00;
let precioColores=0.00;
let precioEtiqueta=0.00;
let precioTotalClishe=0.00;
let precioTotalColor=0.00;
let precioTotalMaterial=0.00;
let presentacionV="";    
let repeticiones=0;
let separacion=0.00;
let spiAnc=0.00;
let spiCan=0;         
let spiCol=0;
let sumaCostos=0.00;
let tipoEtiqueta="";
let tipoPresentacion=0;  

//---- esta funcion se usa para mostrar errores 
function msgError (cadena){
    var cadena="<span class='text-danger'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');    
}

function msgWarning (cadena){
    var cadena="<span class='text-warning'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');     
}

function msgInfo (cadena){
    var cadena="<span class='text-info'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');     
}

// esta funcion inicializa los objetos
function limpia(){
    //console.log (">>>>>>>>>>>>>>>>>>>>>>> proceso de limpieza de objetos");
    //console.log (">>>>>>>> inicializa variables");
    // inicializacion de variables
    ancho=0.00;
    anchoBobina=0.00;
    anchoEtiqueta=0.00;
    avance=0.00;
    avanceEtiqueta=0.00;
    canales=0;
    canalesADespachar=0;
    canalesDespachar=0;    
    cantidadColores=0;
    cantidadCores=0;
    cantidadEtiquetas=0;
    cantidadEtiquetasXPaginas=0;
    cantidadEtiquetasxRollo=0;    
    cantidadXRollos=0;
    cantNPre=0.00;
    checkDesperdicio=false;
    clisheAdicional=0;
    cmsLineales=0.00;
    cmsTotales=0.00;      
    codigoTroquel="";
    cores=0;    
    costo=0.00;
    costoEtiqueta=0.00;
    costoFoil1=0.00;
    costoFoil2=0.00;
    costoLaminacion=0.00;
    costoManoObra=0.00;
    costoMaterial=0.00;
    costoPorImpresion=0.00    ;
    costoSandwich=0.00;
    costoTotalMaterial=0.00;
    costoTransporte=0.00;
    cTemp1=0.00;
    cTemp2=0.00;    
    cTMP_TIP="";   
    cVarLam="";
    cVarFoi="";
    diferenciaPorAncho=0.00;
    etiquetasBlancas=false;
    etiquetasPorRollo=0;
    factor=0.00;    
    fAvance = 0.00;
    fSeparacion = 0.00;
    largo=0.00;
    largoEtiquetas=0.00;
    metrosLineales=0.00;
    mtrs2Bobina=0.00;
    mtrsLineales=0.00;    
    nTemp=0.00;    
    nTMP_AU1=0.00 ;
    nTMP_AU2=0.00;
    nTMP_AU3=0.00;   
    nTMP_COS=0.00;   
    nTMP_DIF=0.00;
    nTMP_PLA=0.00;
    nTMP_RIB=0;     
    nVarAux=0.00;
    nVarCos = 0.00;
    nVarDesc=0.00;
    nVarIni = 0;
    nVarPsa = 0.00;
    nVarRep=0;
    nVarVal = 0;
    porcentajeManoObra=0.00;
    porcentajeSeguridad=0.00;
    porcentajeTransporte=0.00;
    precioClishe=0.00;
    precioColor=0.00;
    precioColores=0.00;
    precioEtiqueta=0.00;
    precioTotalClishe=0.00;
    precioTotalColor=0.00;
    precioTotalMaterial=0.00;
    presentacionV="";    
    repeticiones=0;
    separacion=0.00;
    spiAnc=0.00;
    spiCan=0;         
    spiCol=0;
    sumaCostos=0.00;
    tipoEtiqueta="";
    tipoPresentacion=0;  


    //======== Pagina Generales =======================================//
    //console.log (">>>>>>>> limpia objetos seccion Generales");
    setcoArtHeader("");
    // predeterminamos el tipo de cotizacion
    document.getElementById('tipoCotiz0').checked=true;

    // limpiamos los tipos de troqueles
    document.getElementById('tipTroq0').checked=true;
    document.getElementById('tipTroq1').checked=false;
    document.getElementById('tipTroq2').checked=false;
    document.getElementById('tipTroq3').checked=false;
    document.getElementById('tipTroq4').checked=false;

    document.getElementById('txtCodigoTroquelSuperficie').value="";
    document.getElementById('txtTroquelBase').value="";

    // limpiamos los objetos de medidas
    document.getElementById('txtAnchoEtiqueta').value="0.00";
    document.getElementById('selAnchoEtiqueta').value="0";
    document.getElementById('txtAvanceEtiqueta').value="0.00";
    document.getElementById('txtSeparacionEtiqueta').value="0.30";
    document.getElementById('txtCanales').value="0";
    document.getElementById('txtRepeticionesTroquel').value="0";
    document.getElementById('txtCantidadEtiquetas').value="0";
    document.getElementById('txtPorcentajeSeguridad').value='19.70';
    document.getElementById('txtAnchoBobina').value='0.00';
    document.getElementById('txtLargoTotalEtiqueta').value="0.00";
    document.getElementById('txtCmsLineales').value="0.00";
    document.getElementById('txtCmsLinealesTotales').value="0.00";
    document.getElementById('txtCmsClishe').value="0.00";
    document.getElementById('txtMtrs2Bobina').value="0.00";
    document.getElementById('txtMetrosLineales').value="0.00";
    document.getElementById('txtMtrs2Etiqueta').value="0.00";
    
    document.getElementById('txtCodigoEtiqueta').value="";
    document.getElementById('chkRepCotizacion').checked=false;
    document.getElementById('txtCotizacionOld').value="";
    document.getElementById('txtDientes').value="0";
    document.getElementById('txtRepeticiones').value="0";

    document.getElementById('txtSol').value="0.00"; 
    document.getElementById('chkRedondas').checked=false;
    document.getElementById('txtObservaciones').value="";
    setSeparacionEtiqueta(0.00);
    document.getElementById('txtMtrs2Etiqueta').style.backgroundColor="#ffffff";
    document.getElementById('txtMtrs2Etiqueta').style.color="#000000";    

    //======== Pagina Presentacion =======================================//
    //console.log (">>>>>>>> limpia objetos seccionPresentacion");
    seleccionaRadioPresentacion0()
    deseleccionaRadioPresentacion1()
    setCanalesDespachar(1);
    setCantidadNPre(0);
    setEtiquetasXRollo(0);
    setCantidadCores(0);
    setCantidadEtiquetasxPaginas(0);
    deseleccionachkImpresionRibbon()
    deseleccionachkUtilizaSignado();
    deseleccionachkSandwich()
    /*--- desactivamos y ocultamos los objetos en la inicializacion de la pagina -----*/
    desactivaChkTextoRibbon();
    desactivaChkNumeracionRibbon();
    hideLblRib();
    desactivaTextoRibbon();
    desactivaNumeracionDesdeRibbon();
    desactivaNumeracionHastaRibbon();
    desactivaTxtUtilizaSignado();
    desactivaSignadoPulgadas();
    desactivaSignadoCadaXEtq();
    desactivaChkImpAdhesivo();
    desactivaChkEspejo();
    desactivaChkPegManual();
    desactivaChkDobleCara();
    desactivaChkFormaContinua();
    deseleccionaTipoEtiqueta();
    desactivaSandwich();
    setNombreEtiqueta("");
    setSeparacionEtiqueta(0.30);
    desactivaAvanceEtiqueta();
    deseleccionaArteRedLan();
    desactivaArteRedLan();
    desactivaLevantarArte();
    desactivaLevantarArte();
    deseleccionaChkNumeracionRibbon();
    deseleccionaChkTextoRibbon();
    desactivaChkTextoRibbon();

    
    //======== Pagina Costos =======================================//
    //console.log (">>>>>>>> limpia objetos seccion Costos");
    setCodigoMaterial("");
    setDescripcionMaterial("");
    setCostoAnchoBobina(0.00);
    setCantidadColores(0);
    desseleccionaCMYk();
    setPrecioColores( 0.00012);
    setPorcentajeManoObra(15.00);
    setPorcentajeTransporte(10.00);
    setPrecioClishe(50.00);
    seleccionaNingunAcabado();
    desactivaAcabadoMate1();
    desactivaAcabadoMate2();
    desseleccionaAcabadoMate1();
    desseleccionaAcabadoMate2();
    desseleccionaReservaBarniz1();
    desseleccionaReservaBarniz2();
    desseleccionaBarniz();
    desseleccionaMallaSerigrafica();
    desseleccionaClisheAdicional();
    setCantidadClisheAdicional(0);
    desseleccionaLaminado();
    desactivaCodigoLaminado();
    desactivaCostoLaminado();
    setCostoLaminado(nTMP_PLA);
    setDescripcionLaminado("");
    setCodigoLaminado("");
    setColorFoil1("");
    setColorFoil2("");
    setCostoFoil1(0.00);
    setCostoFoil2(0.00);
    setCostoTotalFoil(0.00);
    setAnchoFoil(0.00);
    seleccionaNingunServicio();
    deseleccionaChkFoil1();   
    deseleccionaChkFoil2();  
    setCostoLaminado(0.00); 
    setCostoSandwich(0.00);
    setCostoMaterial(0.00);
    setCostoManoObra(0.00);
    setCostoMaterialPorEtiqueta(0.00);
    setCostoMaterialXEtiquetas(0.00);
    setCostoTotalMaterial(0.00);
    setPrecioTotalColores(0.00);
    setCostoEtiqueta(0.00);
    setFactor(0.00);
    setCostoTransporte(0.00);
    setCostoTotal(0.00);
    setSumacostos(0.00);
    setPrecioEtiqueta(0.00);

    //======== Pagina Resumen =======================================//
    //console.log (">>>>>>>> limpia objetos seccion Resumen");
    setResumenPrecioClishe(50.00);
    setResumenPrecioColor(0.00012);
    setResumenTotalColor(0.00);
    setResumenTotalClishe(0.00);
    setResumenAnchoEtiqueta(0.00);
    setResumenAvanceEtiqueta(0.00);
    setResumenCanalesEtiqueta(0);
    setResumenCantidadADespachar(1);
    setResumenCantidadCores(0);
    setResumenCantidadEtiqueta(0);
    setResumenCantidadPorPresentacion(0);
    setResumenComision(0.00);
    setResumenCostoEtiqueta(0.00);
    setResumenCostoMateriales(0.00);
    setResumenCostoTotal(0.00);
    setResumenDiametroCore(0.00);
    setResumenEmbobinado(0);
    setResumenFactor(0.00);
    setResumenIva(0.00);
    setResumenMontoEtiqueta(0.00);
    setResumenMontoNeto(0.00);
    setResumenMontoTotal(0.00);
    setResumenSeparacionEtiqueta(0.30);
    setResumenSumaCostos(0.00);
    setResumenPrecioColor(0.00);
    setResumenPrecioEtiqueta(0.00);
    setResumenTotalClishe(0.00);
    setResumenComision(10.00);

    console.clear();

}
function activaAvanceEtiqueta(){
    document.getElementById('txtAvanceEtiqueta').disabled=false;
} 
function desactivaAvanceEtiqueta(){
    document.getElementById('txtAvanceEtiqueta').disabled=true;
} 

// activamos el objeto Arte en Red Lan
function activaArteRedLan(){
    document.getElementById('chkArteRedLAN').disabled=false;
}

// desactivamos el objeto Arte en Red Lan
function desactivaArteRedLan(){
    document.getElementById('chkArteRedLAN').disabled=true;
}

// activamos el objeto levantar Arte
function activaLevantarArte(){
    document.getElementById('chkLevantarArte').disabled=false;
}

// desactivamos el objeto Arte en Red Lan
function desactivaLevantarArte(){
    document.getElementById('chkLevantarArte').disabled=true;
}

/*---- esta funcion permite activar el objeto chkTextoRibbon ----*/
function activaChkTextoRibbon(){
    document.getElementById('chkTextoRibbon').disabled=false;
}

/*---- esta funcion permite desactivar el objeto chkTextoRibbon ----*/
function desactivaChkTextoRibbon(){
    document.getElementById('chkTextoRibbon').disabled=true;
}

/*---- esta funcion permite activar el objeto chkTextoRibbon ----*/
function seleccionaChkTextoRibbon(){
    document.getElementById('chkTextoRibbon').checked=true;
}

/*---- esta funcion permite desactivar el objeto chkTextoRibbon ----*/
function deseleccionaChkTextoRibbon(){
    document.getElementById('chkTextoRibbon').checked=true;
}


/*---- esta funcion permite activar el objeto chkNumeracionRibbon ----*/
function activaChkNumeracionRibbon(){
    document.getElementById('chkNumeracionRibbon').disabled=false;
}

/*---- esta funcion permite desactivar el objeto chkNumeracionRibbon ----*/
function desactivaChkNumeracionRibbon(){
    document.getElementById('chkNumeracionRibbon').disabled=true;
}

/*---- esta funcion permite seleccionar el objeto chkNumeracionRibbon ----*/
function seleccionaChkNumeracionRibbon(){
    document.getElementById('chkNumeracionRibbon').checked=true;
}

/*---- esta funcion permite desactivar el objeto chkNumeracionRibbon ----*/
function deseleccionaChkNumeracionRibbon(){
    document.getElementById('chkNumeracionRibbon').checked=false;
}


/*---- este metodo hace visible la etiqueta lblRib de la seccion de presentacion -----*/
function displayLblRib(){
    document.getElementById('lblRib').style.visibility="visible";
}

/*---- este metodo oculta la etiqueta lblRib de la seccion de presentacion -----*/
function hideLblRib(){
    document.getElementById('lblRib').style.visibility="hidden";
}

/*----- esta funcion habilita el cuadro de texto de los ribbons ------*/
function activaTextoRibbon(){
    document.getElementById('ribbonTexto').disabled=false;
}

/*----- esta funcion deshabilita el cuadro de texto de los ribbons ------*/
function desactivaTextoRibbon(){
    document.getElementById('ribbonTexto').disabled=true;
    document.getElementById('ribbonTexto').value="";
}

/*----- esta funcion habilita el cuadro de texto numeracionDese de los ribbons ------*/
function activaNumeracionDesdeRibbon(){
    document.getElementById('numeracionDesde').disabled=false;
}

/*----- esta funcion habilita el cuadro de texto numeracionDese de los ribbons ------*/
function desactivaNumeracionDesdeRibbon(){
    document.getElementById('numeracionDesde').disabled=false;
    document.getElementById('numeracionDesde').value="";
}

/*----- esta funcion habilita el cuadro de texto numeracion Desde de los ribbons ------*/
function activaNumeracionHastaRibbon(){
    document.getElementById('numeracionHasta').disabled=false;
}

/*----- esta funcion habilita el cuadro de texto numeracion Hasta de los ribbons ------*/
function desactivaNumeracionHastaRibbon(){
    document.getElementById('numeracionHasta').disabled=false;
    document.getElementById('numeracionHasta').value="";
}

/*---- esta funcion habilita el control TXTSIG en presentacion -----*/
function activaTxtUtilizaSignado(){
    document.getElementById('txtUtilizaSignado').disabled=false;
}

/*---- esta funcion deshabilita el control TXTSIG en presentacion -----*/
function desactivaTxtUtilizaSignado(){
    document.getElementById('txtUtilizaSignado').disabled=true;
    document.getElementById('txtUtilizaSignado').value="";
}


/*---- esta funcion habilita el control TXTSIG en presentacion -----*/
function activaTxtUtilizaSignado(){
    document.getElementById('txtUtilizaSignado').disabled=false;
}

/*---- esta funcion deshabilita el control TXTSIG en presentacion -----*/
function desactivaTxtUtilizaSignado(){
    document.getElementById('txtUtilizaSignado').disabled=true;
    document.getElementById('txtUtilizaSignado').value="";
}

/*---- esta funcion habilita el control TXTSIG en presentacion -----*/
function activaSignadoPulgadas(){
    document.getElementById('signadoPulgadas').disabled=false;
}

/*---- esta funcion deshabilita el control TXTSIG en presentacion -----*/
function desactivaSignadoPulgadas(){
    document.getElementById('signadoPulgadas').disabled=true;
    document.getElementById('signadoPulgadas').value=0;
}

/*---- esta funcion habilita el control TXTSIG en presentacion -----*/
function activaSignadoCadaXEtq(){
    document.getElementById('signadoCadaXEtq').disabled=false;
}

/*---- esta funcion deshabilita el control TXTSIG en presentacion -----*/
function desactivaSignadoCadaXEtq(){
    document.getElementById('signadoCadaXEtq').disabled=true;
    document.getElementById('signadoCadaXEtq').value=0;
}

/*--- esta funcion activa la impresion Espejo -----*/
function activaChkEspejo(){
    document.getElementById('chkEspejo').checked=true;
}

/*--- esta funcion desactiva la impresion Espejo -----*/
function desactivaChkEspejo(){
    document.getElementById('chkEspejo').checked=false;
}

/*--- esta funcion activa la impresion por el adhesivo -----*/
function activaChkImpAdhesivo(){
    document.getElementById('chkImpAdhesivo').checked=true;
}

/*--- esta funcion desactiva la impresion por el adhesivo -----*/
function desactivaChkImpAdhesivo(){
    document.getElementById('chkImpAdhesivo').checked=false;
}

/*--- esta funcion activa el pegado manual -----*/
function activaChkPegManual(){
    document.getElementById('chkPegManual').checked=true;
}

/*--- esta funcion desactiva el pegado manual -----*/
function desactivaChkPegManual(){
    document.getElementById('chkPegManual').checked=false;
}

/*--- esta funcion desactiva el impresion doble cara -----*/
function desactivaChkDobleCara(){
    document.getElementById('chkDobleCara').checked=false;
}

/*--- esta funcion activa el impresion en forma continua -----*/
function activaChkFormaContinua(){
    document.getElementById('chkFormaContinua').checked=true;
}

/*--- esta funcion desactiva el impresion en forma continua -----*/
function desactivaChkFormaContinua(){
    document.getElementById('chkFormaContinua').checked=false;
}


/*------ esta funcion activa el check de desperdicio ------------*/
function activaChkDesperdicio(){
   document.getElementById('chkAsumirDesperdicio').disabled=false;
}

/*------ esta funcion desactiva el check de descuento ------------*/
function desactivaChkDesperdicio(){
   document.getElementById('chkAsumirDesperdicio').disabled=true;
}

/*---- esta funcion desactiva los CMYK ----*/
function desseleccionaCMYk(){
    document.getElementById('coloresInd0').checked=false;
    document.getElementById('coloresInd1').checked=false;
    document.getElementById('coloresInd2').checked=false;
    document.getElementById('coloresInd3').checked=false;
    document.getElementById('coloresInd4').checked=false;
}

/*---- esta funcion activa los CMYK dependiendo del parametro i----*/
function seleccionaCMYk(i){
    switch (i){
        case "1": // CMYK
            document.getElementById('coloresInd0').checked=true;
            document.getElementById('coloresInd1').checked=false;
            document.getElementById('coloresInd2').checked=false;
            document.getElementById('coloresInd3').checked=false;
            document.getElementById('coloresInd4').checked=false;      
            clickCMYK();  
            break;
        case "2": // CMYK+B
            document.getElementById('coloresInd0').checked=false;
            document.getElementById('coloresInd1').checked=false;
            document.getElementById('coloresInd2').checked=true;
            document.getElementById('coloresInd3').checked=false;
            document.getElementById('coloresInd4').checked=false;
            clickCMYKB();
            break;     
        case "3": // CMYK + B + N + V
            document.getElementById('coloresInd0').checked=false;
            document.getElementById('coloresInd1').checked=false;
            document.getElementById('coloresInd2').checked=false;
            document.getElementById('coloresInd3').checked=true;
            document.getElementById('coloresInd4').checked=false;  
            clickCMYKBNV();      
            break;
        case "4": // CMYK + N + V
            document.getElementById('coloresInd0').checked=false;
            document.getElementById('coloresInd1').checked=true;
            document.getElementById('coloresInd2').checked=false;
            document.getElementById('coloresInd3').checked=false;
            document.getElementById('coloresInd4').checked=false; 
            clickCMYKNV();       
            break;
        case "5": // blanco
            document.getElementById('coloresInd0').checked=false;
            document.getElementById('coloresInd1').checked=false;
            document.getElementById('coloresInd2').checked=false;
            document.getElementById('coloresInd3').checked=true;
            document.getElementById('coloresInd4').checked=false; 
            clickBlanco();      
            break;
    }
}

/*--- esta funcion deselecciona los tipos de etiquetas en el caso de presentacion----*/
function deseleccionaTipoEtiqueta(){
    document.getElementById('TipoEtiqueta0').checked=false;
    document.getElementById('TipoEtiqueta1').checked=false;
    document.getElementById('TipoEtiqueta2').checked=false;
    document.getElementById('TipoEtiqueta3').checked=false;
    document.getElementById('TipoEtiqueta4').checked=false;    
}

/*--- esta funcion activa el descuento -----*/
function activaDescuento(){
    document.getElementById('txtDescuento').disabled=false;
}

/*--- esta funcion desactiva el descuento -----*/
function desactivaDescuento(){
    document.getElementById('txtDescuento').disabled=true;
    document.getElementById('txtDescuento').value=0.00;
}

/*--- esta funcion activa el sandwich -----*/
function activaSandwich(){
    document.getElementById('txtSandwich').disabled=false;
}

/*--- esta funcion activa el sandwich -----*/
function desactivaSandwich(){
    document.getElementById('txtSandwich').disabled=true;

    document.getElementById('txtSandwich').value="";
    document.getElementById('txtDescripcionSandwich').value="";    
    setCostoSandwich(0.00);
}

/*--- esta funcion selecciona Ningun Acabado -----*/
function seleccionaNingunAcabado(){
    document.getElementById('ningunAcabado').checked=true;
}
/*--- esta funcion deselecciona Ningun Acabado -----*/
function desseleccionaNingunAcabado(){
    document.getElementById('ningunAcabado').checked=false;
}

/*--- esta funcion selecciona la Reserva de Barniz -----*/
function seleccionaReservaBarniz1(){
    document.getElementById('rbarniz').checked=true;
}
/*--- esta funcion deselecciona la Reserva de Barniz -----*/
function desseleccionaReservaBarniz1(){
    document.getElementById('rbarniz').checked=false;
}

/*--- esta funcion selecciona la Reserva de Barniz -----*/
function seleccionaReservaBarniz1(){
    document.getElementById('rbarniz').checked=true;
}

/*--- esta funcion deselecciona la Reserva de Barniz -----*/
function desseleccionaReservaBarniz1(){
    document.getElementById('rbarniz').checked=false;
}

/*--- esta funcion selecciona la acabado mate 1 -----*/
function seleccionaAcadoMate1(){
    document.getElementById('mateAcabado').checked=true;
}

/*--- esta funcion deselecciona la acabado mate 1 -----*/
function desseleccionaAcabadoMate1(){
    document.getElementById('mateAcabado').checked=false;
}

/*--- esta funcion activa la acabado mate 1 -----*/
function activaAcabadoMate1(){
    document.getElementById('mateAcabado').disabled=false;
}

/*--- esta funcion activa la acabado mate 1 -----*/
function desactivaAcabadoMate1(){
    document.getElementById('mateAcabado').disabled=true;
}

/*--- esta funcion deselecciona la Reserva de Barniz 2-----*/
function seleccionaReservaBarniz2(){
    document.getElementById('rbarniz2').checked=true;
}

/*--- esta funcion deselecciona la Reserva de Barniz 2-----*/
function desseleccionaReservaBarniz2(){
    document.getElementById('rbarniz2').checked=false;
}

/*--- esta funcion selecciona la Reserva de Barniz 2-----*/
function seleccionaBarniz(){
    document.getElementById('barniz').checked=true;
}

/*--- esta funcion deselecciona la Reserva de Barniz 2-----*/
function desseleccionaBarniz(){
    document.getElementById('barniz').checked=false;
}

/*--- esta funcion selecciona la acabado mate 2 -----*/
function seleccionaAcabadoMate2(){
    document.getElementById('mateAcabado2').checked=true;
}

/*--- esta funcion activa la acabado mate 2 -----*/
function activaAcabadoMate2(){
    document.getElementById('mateAcabado2').disabled=false;
}

/*--- esta funcion activa la acabado mate 2 -----*/
function desactivaAcabadoMate2(){
    document.getElementById('mateAcabado2').disabled=true;
}

/*--- esta funcion deselecciona la acabado mate 2 -----*/
function desseleccionaAcabadoMate2(){
    document.getElementById('mateAcabado2').checked=false;
}

/*--- esta funcion deselecciona la Malla Serigráfica -----*/
function seleccionaMallaSerigrafica(){
    document.getElementById('mallaSerigrafica').checked=true;
}

/*--- esta funcion deselecciona la Malla Serigráfica -----*/
function desseleccionaMallaSerigrafica(){
    document.getElementById('mallaSerigrafica').checked=false;
}

/*--- esta funcion activa clishe adicional -----*/
function seleccionaClisheAdicional(){
    console.log ("activando clishe adicional");
    document.getElementById('chkClisheAdicional').checked=true;
}

/*--- esta funcion desactiva clishe adicional -----*/
function desseleccionaClisheAdicional(){
    console.log ("desactivando clishe adicional");
    document.getElementById('chkClisheAdicional').checked=false;
}

/*--- esta funcion activa laminado -----*/
function seleccionaLaminado(){
    document.getElementById('chkLaminado').checked=true;
}

/*--- esta funcion desactiva laminado -----*/
function desseleccionaLaminado(){
    document.getElementById('chkLaminado').checked=false;
}

/*--- esta funcion activa la mate laminado -----*/
function activaMateLaminado(){
    document.getElementById('mateLaminado').disabled=false;
}

/*--- esta funcion activa la mate laminado -----*/
function desactivaMateLaminado(){
    document.getElementById('mateLaminado').disabled=true;
}

/*--- esta funcion activa mate laminado -----*/
function seleccionaMateLaminado(){
    document.getElementById('mateLaminado').checked=true;
}

/*--- esta funcion desactiva clishe adicional -----*/
function desseleccionaMateLaminado(){
    document.getElementById('mateLaminado').checked=false;
}

/*--- esta funcion activa el objeto de codigo de laminado -----*/
function activaCodigoLaminado(){
    document.getElementById('codigoLaminado').disabled=false;
}

/*--- esta funcion activa  el objeto de codigo de laminado  -----*/
function desactivaCodigoLaminado(){
    document.getElementById('codigoLaminado').disabled=true;
}

/*---- esta funcion desactiva el costo del laminado para que solo sea acesibe desde la programación -*/
function desactivaCostoLaminado(){
     document.getElementById('costoLaminado').disabled=true;
}

/*--- esta funcion selecciona ningun servicio -----*/
function seleccionaNingunServicio(){
    document.getElementById('radioServicio0').checked=true;
}

/*--- esta funcion deselecciona ningun servicio ----*/
function deseleccionaNingunServicio(){
    document.getElementById('radioServicio0').checked=false;
}

/*--- esta funcion selecciona cold foil -----*/
function seleccionaColdFoil(){
    document.getElementById('radioServicio2').checked=true;
}

/*--- esta funcion deselecciona cold foil ----*/
function deseleccionaColdFoil(){
    document.getElementById('radioServicio2').checked=false;
}

/*--- esta funcion selecciona hot foil -----*/
function seleccionaHotFoil(){
    document.getElementById('radioServicio1').checked=true;
}

/*--- esta funcion deselecciona hot foil ----*/
function deseleccionaHotFoil(){
    document.getElementById('radioServicio1').checked=false;
}

/*---- esta funcion selecciona el chkFoil1 -----*/
function seleccionaChkFoil1(){
    document.getElementById('chkFoil1').checked=true;
}

/*---- esta funcion deselecciona el chkFoil1 -----*/
function deseleccionaChkFoil1(){
    document.getElementById('chkFoil1').checked=false;
}

/*---- esta funcion selecciona el chkFoil2 -----*/
function seleccionaChkFoil2(){
    document.getElementById('chkFoil2').checked=true;
}

/*---- esta funcion deselecciona el chkFoil2 -----*/
function deseleccionaChkFoil2(){
    document.getElementById('chkFoil2').checked=false;
}

/* esta funcion permite ver el ancho solicitado ---*/
function activaAnchoSolitado(){
    document.getElementById('txtSol').style.display="block";
}

/* esta funcion oculta el ancho solicitado ---*/
function desactivaAnchoSolitado(){
    document.getElementById('TxtSol').style.display="none";
}

/*--- esta funcion selecciona tipo de cliente Cliente -----*/
function seleccionaTipoCliente(valor){
    if (valor=="F"){
        // es un cliente
        document.getElementById('cliente').checked=true;
        document.getElementById('distribuidor').checked=false;
    } else {
        // es un distribuidor
        document.getElementById('cliente').checked=false;
        document.getElementById('distribuidor').checked=true;

    }
}

// esta funcion activa el descuento
function activaDescuento(){
    document.getElementById('chkDescuento').checked=true;
    document.getElementById('txtDescuento').disabled=false;

}

// esta funcion desactiva el descuento
function desactivaDescuento(){
    document.getElementById('chkDescuento').checked=false;
    document.getElementById('txtDescuento').disabled=true;
    document.getElementById('txtDescuento').value="0.00";
}


/*----- esta funcion seleccion el arte en red lan ----*/
function seleccionaArteRedLan(){
    document.getElementById('chkArteRedLAN').checked=true;
}

/*----- esta funcion deseleccion el arte en red lan ----*/
function deseleccionaArteRedLan(){
    document.getElementById('chkArteRedLAN').checked=false;
}

// selecciona el objeto levantar Arte
function seleccionaLevantarArte(){
    document.getElementById('chkLevantarArte').checked=true;
}

// deselecciona el objeto levantar Arte
function deseleccionaLevantarArte(){
    document.getElementById('chkLevantarArte').checked=false;
}

// selecciona utiliza signado
function seleccionachkUtilizaSignado(){
    document.getElementById('chkUtilizaSignado').checked=true;
}

// deselecciona utiliza signado
function deseleccionachkUtilizaSignado(){
    document.getElementById('chkUtilizaSignado').checked=false;
}

// selecciona impresion ribbon
function seleccionachkImpresionRibbon(){
    document.getElementById('chkImpresionRibbon').checked=true;
}

// desselecciona impresion ribbon
function deseleccionachkImpresionRibbon(){
    document.getElementById('chkImpresionRibbon').checked=false;
}

// selecciona sandwich
function seleccionachkSandwich(){
    document.getElementById('chkSandwich').checked=true;
}

// deselecciona sandwich
function deseleccionachkSandwich(){
    document.getElementById('chkSandwich').checked=false;
}

// selecciona Radio Presentacion 0
function seleccionaRadioPresentacion0(){
    document.getElementById('radioPresentacion0').checked=true;
}

// deselecciona Radio Presentacion 0
function deseleccionaRadioPresentacion0(){
    document.getElementById('radioPresentacion0').checked=false;
}

// selecciona Radio Presentacion 1
function seleccionaRadioPresentacion1(){
    document.getElementById('radioPresentacion1').checked=true;
}

// deselecciona Radio Presentacion 1
function deseleccionaRadioPresentacion1(){
    document.getElementById('radioPresentacion1').checked=false;
}









