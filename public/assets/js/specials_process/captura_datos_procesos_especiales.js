///////////////////////////////////////////////////////////////////////////////
// Estas funciones son usadas en el formulario special_process_one           //
// estan diseñadas para capturar valores a los objetos en el formulario      //
// 2025-08-27                                                                //
///////////////////////////////////////////////////////////////////////////////
// capturamos el tipo de cotizacion 
// 1 para Flexo
// 2 para indigo
function getTipoCotizacion() {
    //console.log (">> entrando getTipoCotizacion");    
    if (document.getElementById('tipoCotiz0').checked){
        return (1); // es flexo
    } else {
        return (2); // es indigo
    }
}

// capturamos si son etoiquetas blancas
// devuelve true o false
function getEtiquetasBlancas(){
    //console.log (">> entrando getEtiquetasBlancas");    
    if (document.getElementById('TipoEtiqueta3').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si son etoiquetas redondas
// devuelve true o false
function getEtiquetasRedondas(){
    //console.log (">> entrando getEtiquetasRedondas");    
    if (document.getElementById('chkRedondas').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos el tipo de troquel 
function getTipoTroquel(){
    //console.log (">> entrando getTipoTroquel");    
    if (document.getElementById('tipTroq0').checked){
        // es un troquel fisico
        return (1);
    } 

    if (document.getElementById('tipTroq1').checked){
        // es un troquel laser
        return (2);
    }     

    if (document.getElementById('tipTroq2').checked){
        // es un troquel nuevo
        return (3);
    }  

    if (document.getElementById('tipTroq3').checked){
        // es un troquel no aplica
        return (4);
    } 
    
    if (document.getElementById('tipTroq4').checked){
        // es un troquel tipografico
        return (5);
    }  
    
    // no se ha defindo ningun tipo de troquel
    return (-1);
}

// capturamos el tipo de presentacion
function getCbbTip(){
    //console.log (">> entrando getCbbTip");
    return (document.getElementById('cbbTip').value);
}

// capturamos el ancho cuando la cotizacion es flexo grafica
function getAnchoFlexo(){
    //console.log (">> entrando getAnchoFlexo");
    return (parseFloat(document.getElementById('txtAnchoEtiqueta').value));
}

// capturamos el ancho cuando la cotizacion es indigo
function getAnchoIndigo(){
    //console.log (">> entrando getAnchoIndigo");
    return (parseFloat(document.getElementById('selAnchoEtiqueta').value));
}

// capturamos el ancho de la etiqueta
function getAvanceEtiqueta(){
    //console.log (">> entrando getAvanceEtiqueta");
    return (parseFloat(document.getElementById('txtAvanceEtiqueta').value));
}

// capturamos la separacion de la etiqueta
function getSeparacionEtiqueta(){
    //console.log (">> entrando  getSeparacionEtiqueta");
    return (parseFloat(document.getElementById('txtSeparacionEtiqueta').value));
}

// capturamos los canales de la etiqueta
function getCanalesEtiqueta(){
    //console.log (">> entrando getCanalesEtiqueta");
    return (parseInt(document.getElementById('txtCanales').value));
}

// capturamos las repeticiones del troquel
function getRepeticionesTroquel(){
    //console.log (">> entrando getRepeticionesTroquel");
    return (parseInt(document.getElementById('txtRepeticionesTroquel').value));
}

// capturamos la cantidad de etiquetas 
function getCantidadEtiquetas(){
    //console.log (">> entrando getCantidadEtiquetas");
    return (parseInt(document.getElementById('txtCantidadEtiquetas').value));
}


// capturamos porcentaje de seguridad
function getPorcentajeSeguridad(){
    //console.log (">> entrando getPorcentajeSeguridad");
    return (parseFloat(document.getElementById('txtPorcentajeSeguridad').value));
}

// capturamos Ancho de Bobina
function getAnchoBobina(){
    //console.log (">> entrando getAnchoBobina");
    return (parseFloat(document.getElementById('txtAnchoBobina').value));
}

// capturamos Largo Etiqueta
function getLargoEtiqueta(){
    //console.log (">> entrando getLargoEtiqueta");
    return (parseFloat(document.getElementById('txtLargoTotalEtiqueta').value));
}

// capturamos CmsLienales
function getCmsLineales(){
    //console.log (">> entrando getCmsLineales");
    return (parseFloat(document.getElementById('txtCmsLineales').value));
}



// capturamos el codigo del troquel
function getCodigoTroquelSuperficie(){
    //console.log (">> entrando getCodigoTroquelSuperficie");
    return (document.getElementById('txtCodigoTroquelSuperficie').value.trim());
}

// capturamos el codigo del troquel base
function getCodigoTroquelBase(){
    //console.log (">> entrando getCodigoTroquelSuperficie");
    return (document.getElementById('txtTroquelBase').value.trim());
}

// capturamos la cantidad de etiuqetas pro rollo
function getEtiquetasXRollo(){
    //console.log (">> entrando getEtiquetasXRollo");
    return (parseInt(document.getElementById('cantXRollos').value));
}

// capturamos Cms Lineales Totales
function getCmsLinealesTotales(){
    //console.log (">> entrando getCmsLinealesTotales");
    return (parseFloat(document.getElementById('txtCmsLinealesTotales').value));
}


// capturamos Cms Lineales Clishe
function getCmsClishe(){
    //console.log (">> entrando getCmsClishe");
    return (parseFloat(document.getElementById('txtCmsClishe').value));
}

// capturamos Metros Cuadrados de Bobina
function getMtrs2Bobina(){
    //console.log (">> entrando getMtrs2Bobina");
    return (parseFloat(document.getElementById('txtMtrs2Bobina').value));
}


// capturamos MetrosLineales
function getMtrsLineales(){
    //console.log (">> entrando getMtrsLineales");
    return (parseFloat(document.getElementById('txtMetrosLineales').value));
}

// capturamos Metros Cuadrados de Etiquetas
function getMtrs2Etiquetas(){
    //console.log (">> entrando getMtrs2Etiquetas");
    return (parseFloat(document.getElementById('txtMtrs2Etiqueta').value));
}

// capturamos Codigo de Etiqueta
function getCodigoEtiqueta(){
    //console.log (">> entrando getCodigoEtiqueta");
    return (document.getElementById('txtCodigoEtiqueta').value.trim());
}

// esto aplica para troqueles nuevos
// capturamos los dientes
function getDientes(){
    //console.log (">> entrando getDientes");
    return (parseInt(document.getElementById('txtDientes').value));
}

// capturamos las repeticiones
function getRepeticiones(){
    //console.log (">> entrando getRepeticiones");
    return (parseInt(document.getElementById('txtRepeticiones').value));
}

// capturamos ancho etiquetas solicitadas
function getSol(){
    //console.log (">> entrando getSol");
    return (parseInt(document.getElementById('txtSol').value));
}

// capturamos las observaciones
function getObservaciones(){
    //console.log (">> entrando getObservaciones");
    return (document.getElementById('txtObservaciones').value);
}

/*******************************************************************************/
/* capturas relacionadas con las seccion de presentaction                      */
/*******************************************************************************/
// capturamos el tipo de presentacion
function getTipoPresentacion(){
    //console.log (">> entrando getTipoPresentacion");
    if (document.getElementById('radioPresentacion0').checked){
        return ('rollo');
    } else {
         return ('paquete');   
    }
}

// capturamos el diametro del core
function getDiametroCore(){
    return (document.getElementById('txtDiametroCore').value.trim());
    
}

// capturamos el embobinado frontal
function getEmbonibadoFrontal(){
    return (document.getElementById('txtEmbobinadoFrontal').value.trim());
    
}

// capturamos el embobinado frontal
function getEmbonibadoDorsal(){
    return (document.getElementById('txtEmbobinadoDorsal').value.trim());
    
}

// capturamos Ancho de Bobina de la seccion de costos
function getCostoAnchoBobina(){
    //console.log (">> entrando getCostoAnchoBobina");
    return (parseFloat(document.getElementById('txtCostosAnchoBobina').value));
}

// capturamos cantidad de etiquetas por rollos
/*function getSol(){
    //console.log (">> entrando getSol");
    return (parseInt(document.getElementById('cantXRollos').value));
}*/

// capturamos cantidad de N por Presentacion
function getCantNPresentacion(){
    //console.log (">> entrando getCantNPresentacion");
    return (parseInt(document.getElementById('cantNPre').value));
}


// capturamos Canales a Despachar
function getCanalesDespachar(){
    //console.log (">> entrando getCanalesDespachar");
    return (parseInt(document.getElementById('canalesDesp').value));
}


// capturamos Canales a Despachar
function getCantidadCores(){
    //console.log (">> entrando getCantidadCores");
    return (parseInt(document.getElementById('cantCores').value));
}

// capturamos dobladas cada Cuanto
function getDobladasCadaCuanto(){
    //console.log (">> entrando getDobladasCadaCuanto");
    return (parseInt(document.getElementById('txtDobladasCada').value));
}


// capturamos Nombre de la Etiqueta
function getNombreEtiqueta(){
    //console.log (">> entrando getNombreEtiqueta");
    return (document.getElementById('nombreEtiqueta').value);
}

// getmmos el tipo de clienet
function getTipoCliente(){
    //console.log (">> entrando getTipoCliente");
    if (document.getElementById('cliente').checked){
        return ('cliente');
    } else {
         return ('distribuidor');   
    }
}


// capturamos el tipo de etiqueta 
function getTipoEtiqueta(){
    //console.log (">> entrando getTipoEtiqueta");
    if (document.getElementById('TipoEtiqueta0').checked){
        // Nueva
        return (document.getElementById('TipoEtiqueta0').value);
    } else if (document.getElementById('TipoEtiqueta1').checked) {
        // Modificación
        return (document.getElementById('TipoEtiqueta1').value);
    } else if (document.getElementById('TipoEtiqueta2').checked) {
        // Repetición
        return (document.getElementById('TipoEtiqueta2').value);
    }  else if (document.getElementById('TipoEtiqueta3').checked) {
        // Blanco
        return (document.getElementById('TipoEtiqueta3').value);
    }  else if (document.getElementById('TipoEtiqueta4').checked) {
        // Fondeada
        return (document.getElementById('TipoEtiqueta4').value);
    }
}

// capturamos Cantidad de Etiquetas por Pagina
function getCantidadEtiquetasxPaginas(){
    //console.log (">> entrando getCantidadEtiquetasxPaginas");
    return (parseInt(document.getElementById('cantEtqxPag').value));
}

// capturamos Costos por Impresion
function getCostesXImpresion(){
    //console.log (">> entrando  getCostesXImpresion");
    return (parseFloat(document.getElementById('costoPorImpre').value));
}

// capturamos Totales cotiz por Rollos
function getTotalCotizacionxRollos(){
    //console.log (">> entrando getTotalCotizacionxRollos");
    return (parseInt(document.getElementById('totalCotiz').value));
}


// capturamos si se imprimira con Texto ribbon
function getImprimirRibbon(){
    //console.log (">> entrando getImprimirRibbon");
    if (document.getElementById('chkImpresionRibbon').checked){
        return (true);
    } else {
        return (false);
    }
}


// capturamos si se imprimira con Texto ribbon
function getCheckTextoRibbon(){
    //console.log (">> entrando getImprimirRibbon");
    if (document.getElementById('chkTextoRibbon').checked){
        return (true);
    } else {
        return (false);
    }
}


// capturamos si se imprimira con Numeracion ribbon
function getCheckNumeracionRibbon(){
    if (document.getElementById('chkNumeracionRibbon').checked){
        return (true);
    } else {
        return (false);
    }
}


// capturamos el texto del ribbon
function getTextoRibbon(){
    //console.log (">> entrando getTextoRibbon");
    return (document.getElementById('ribbonTexto').value.trim());
}

// capturamos la numeracion desde del ribbon
function getDesdeRibbon(){
    //console.log (">> entrando getDesdeRibbon");
    return (parseInt(document.getElementById('numeracionDesde').value));
}

// capturamos la numeracion hasta del ribbon
function getHastaRibbon(){
    //console.log (">> entrando getHastaRibbon");
    return (parseInt(document.getElementById('numeracionHasta').value));
}

// capturamos siutilizará signado
function getUsaraSignado(){
    //console.log (">> entrando getUsaraSignado");
    if (document.getElementById('chkUtilizaSignado').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos texto signado
function getTextosignado(){
    //console.log (">> entrando getTextosignado");
    return (parseInt(document.getElementById('txtUtilizaSignado').value));
}

// capturamos signado cada x Etoquetas
function getSignadoCadaXEtq(){
    //console.log (">> entrando getTextosignado");
    return (parseInt(document.getElementById('signadoCadaXEtq').value));
}



// capturamos pulgadas
function getPulgadasSignado(){
    //console.log (">> entrando getPulgadasSignado");
    return (parseFloat(document.getElementById('pulgadas').value));
}

// capturamos cadaXEtq
function getCadaXEtq(){
    //console.log (">> entrando getCadaXEtq");
    return (parseFloat(document.getElementById('cadaXEtq').value));
}

// capturamos si sera doble cara
function getDobleCara(){
    //console.log (">> entrando getDobleCara");
    if (document.getElementById('chkDobleCara').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si sera forma continua
function getFormaContinua(){
    //console.log (">> entrando getFormaContinua");
    if (document.getElementById('chkFormaContinua').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si sera al espejo
function getImprimiEspejo(){
    //console.log (">> entrando getImprimiEspejo");
    if (document.getElementById('chkEspejo').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si pegara manual
function getPegarManual(){
    //console.log (">> entrando getPegarManual");
    if (document.getElementById('chkPegManual').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si imprimira por el adhesivo
function getImprimirAdhsivo(){
    //console.log (">> entrando getImprimirAdhsivo");
    if (document.getElementById('chkImpAdhesivo').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si el arte esta en la redn LAN
function getArteLAN(){
    //console.log (">> entrando getArteLAN");
    if (document.getElementById('chkArteRedLAN').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si hay que levantar el arte
function getLevantarArte(){
    //console.log (">> entrando getArteLAN");
    if (document.getElementById('chkLevantarArte').checked){
        return (true);
    } else {
        return (false);
    }
}


/**************************************************************************/
/* capturas de la division de costos                                      */
/**************************************************************************/
// capturamos el codigo del material
function getCodigoMaterial(){
    //console.log (">> entrando getCodigoMaterial");
    return (document.getElementById('codigoMaterial').value.trim());
}

// capturamos el codigo del material
function getDescripcioMaterial(){
    //console.log (">> entrando getDescripcioMaterial");
    return (document.getElementById('descripcionMaterial').value.trim());
}


// capturamos el color de la indigo
function getColoresIndigo(){
    //console.log (">> entrando getColoresIndigo");
    if (document.getElementById('coloresInd0').checked){
        return (document.getElementById('coloresInd0').value);
    } else if (document.getElementById('coloresInd0').checked) {
        return (document.getElementById('coloresInd1').value);
    } else if (document.getElementById('coloresInd2').checked) {
        return (document.getElementById('coloresInd2').value);
    }  else if (document.getElementById('coloresInd3').checked) {
        return (document.getElementById('coloresInd3').value);
    }  else if (document.getElementById('coloresInd4').checked) {
        return (document.getElementById('coloresInd4').value);
    } 
}


// capturamos el Costo del Material
function getCostoMaterial(){
    //console.log (">> entrando getCostoMaterial");
    return (parseFloat(document.getElementById('txtCostoMaterial').value));
}

// capturamos el Costo total del Material
function getCostoTotalMaterial(){
    //console.log (">> entrando getCostoTotalMaterial");
    return (parseFloat(document.getElementById('txtCostoTotalMaterial').value));
}

// capturamos el Costo de la Etiqueta
function getCostoEtiqueta(){
    //console.log (">> entrando getCostoEtiqueta");
    return (parseFloat(document.getElementById('txtCostoEtiqueta').value));
}

// capturamos la Cantidad de Colores
function getCantidadColores(){
    //console.log (">> entrando getCantidadColores");
    return (parseInt(document.getElementById('txtCantidadColores').value));
}

// capturamos el precio de los colores
function getPrecioColores(){
    //console.log (">> entrando getPrecioColores");
    return (parseFloat(document.getElementById('txtPrecioColores').value));
}

// capturamos el precio Total de los colores
function getPrecioTotalColores(){
    //console.log (">> entrando getPrecioTotalColores");
    return (parseFloat(document.getElementById('txtPrecioTotalColores').value));
}

// capturamos el precio Total de los colores
function getPrecioClishe(){
    //console.log (">> entrando getPrecioClishe");
    return (parseFloat(document.getElementById('txtPrecioClishe').value));
}

// capturamos el precio del transporte
function getPorcentajeTransporte(){
    //console.log (">> entrando getPorcentajeTransporte");
    return (parseFloat(document.getElementById('txtPorcentajeTransporte').value));
}

// capturamos el costo del transporte
function getCostoTransporte(){
    //console.log (">> entrando getCostoTransporte");
    return (parseFloat(document.getElementById('txtCostoTransporte').value));
}

// capturamos Porcentaje Mano de Obra
function getPorcentajeManoObra(){
    //console.log (">> entrando getPorcentajeManoObra");
    return (parseFloat(document.getElementById('txtPorcentajeManoObra').value));
}

// capturamos Costo Mano de Obra
function getCostoManoObra(){
    //console.log (">> entrando getCostoManoObra");
    return (parseFloat(document.getElementById('txtCostoManoObra').value));
}

// capturamos Suma de Costos
function getSumaCostos(){
    //console.log (">> entrando getSumaCostos");
    return (parseFloat(document.getElementById('txtSumaCostos').value));
}

// capturamos Costo Total
function getCostoTotal(){
    //console.log (">> entrando getCostoTotal");
    return (parseFloat(document.getElementById('txtCostoTotal').value));
}

// capturamos Factor
function getFactor(){
    //console.log (">> entrando getFactor");
    return (parseFloat(document.getElementById('txtFactor').value));
}

// capturamos el Costo de Material por Etiquetas
function getCostoMaterialEtiquetas(){
    //console.log (">> entrando getCostoMaterialEtiquetas");
    return (parseFloat(document.getElementById('txtCostoMaterialXEtiqueta').value));
}

// capturamos el Costo del Foil 1
function getCostoFoil1(){
    //console.log (">> entrando getCostoFoil1");
    return (parseFloat(document.getElementById('txtCostoFoil1').value));
}

// capturamos el Costo del Foil 2
function getCostoFoil2(){
    //console.log (">> entrando getCostoFoil2");
    return (parseFloat(document.getElementById('txtCostoFoil2').value));
}

// capturamos el Precio de la Etiqueta
function getPrecioEtiqueta(){
    //console.log (">> entrando getPrecioEtiqueta");
    return (parseFloat(document.getElementById('txtPrecioEtiqueta').value));
}

// capturamos el Costo del Desperdicio de Bobina
function getCostoDesperdicioBobina(){
    //console.log (">> entrando getCostoDesperdicioBobina");
    return (parseFloat(document.getElementById('txtCostoDespBobina').value));
}

// capturamos la Diferencia por Ancho
function getDifAncho(){
    //console.log (">> entrando getDifAncho");
    return (parseFloat(document.getElementById('txtDifAncho').value));
}

// capturamos El Costo Total del Foil
function getCostoTotalFoil(){
    //console.log (">> entrando getCostoTotalFoil");
    return (parseFloat(document.getElementById('txtCostoTotalFoil').value));
}

// capturamos el Ancho del Foil
function getAnchoFoil(){
    //console.log (">> entrando getAnchoFoil");
    return (parseFloat(document.getElementById('txtAnchoFoil').value));
}

// capturamos el Color del Foil 1
function getColorFoil1(){
    //console.log (">> entrando getColorFoil1");
    return (document.getElementById('txtColorFoil1').value.trim());
}

// capturamos el Color del Foil 2
function getColorFoil2(){
    //console.log (">> entrando getColorFoil2");
    return (document.getElementById('txtColorFoil2').value.trim());
}

// determinamos si hay descuento
function getHayDescuento(){
    //console.log (">> entrando getHayDescuento");
    if (document.getElementById('chkDescuento').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos el Descuento
function getDescuento(){
    //console.log (">> entrando getDescuento");
    return (parseFloat(document.getElementById('txtDescuento').value));
}


// determinamos si hay sandwicth
function getHaySandwich(){
    //console.log (">> entrando getHaySandwich");
    if (document.getElementById('chkSandwich').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos el Texto del Sandwich
function getSandwich(){
    //console.log (">> entrando getSandwich");
    return (document.getElementById('txtSandwich').value.trim());
}

// capturamos la Descripcion del Sandwich
function getDescripcionSandwich(){
    //console.log (">> entrando getDescripcionSandwich");
    return (document.getElementById('txtDescripcionSandwich').value.trim());
}

// capturamos el Costo del Sandwich
function getCostoSandwich(){
    //console.log (">> entrando getCostoSandwich");
    return (parseFloat(document.getElementById('txtCostoSandwich').value));
}

// determinamos si no hay ningún acabado
function getNingunAcabado(){
    //console.log (">> entrando getNingunAcabado");
    if (document.getElementById('ningunAcabado').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay reserva de barniz
function getReservaBarniz(){
    //console.log (">> entrando getReservaBarniz");
    if (document.getElementById('rbarniz').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay Reserva Barniz Mate
function getReservaBarnizMate(){
    //console.log (">> entrando getReservaBarnizMate");
    if (document.getElementById('mateAcabado').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay reserva de barniz 2
function getReservaBarniz2(){
    //console.log (">> entrando getReservaBarniz2");
    if (document.getElementById('rbarniz2').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay Barniz Corrido
function getBarniz(){
    //console.log (">> entrando getBarniz");
    if (document.getElementById('barniz').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay  Barniz Mate
function getBarnizMate(){
    //console.log (">> entrando getReservaBarnizMate");
    if (document.getElementById('mateAcabado2').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay Malla Serigrafica
function getMallaSerigrafica(){
    //console.log (">> entrando getMallaSerigrafica");
    if (document.getElementById('mallaSerigrafica').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay Laminado
function getLaminado(){
    //console.log (">> entrando getLaminado");
    if (document.getElementById('chkLaminado').checked){
        return (true);
    } else {
        return (false);
    }
}

// determinamos si hay Laminado Mate
function getLaminadoMate(){
    //console.log (">> entrando getLaminadoMate");
    if (document.getElementById('mateLaminado').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos el codigo del laminado
function getCodigoLaminado(){
    //console.log (">> entrando getCodigoLaminado");
    return (document.getElementById('codigoLaminado').value.trim());
}

// capturamos el codigo del laminado
function getDescripcionLaminado(){
    //console.log (">> entrando getDescripcionLaminado");
    return (document.getElementById('descripcionLaminado').value.trim());
}

// capturamos el costo del Laminado
function getCostoLaminado(){
    //console.log (">> entrando getCostoLaminado");
    return (parseFloat(document.getElementById('costoLaminado').value));
}


// capturamos si no hay servicio
function getNingunServicio(){
    //console.log (">> entrando getNingunServicio");
    if (document.getElementById('radioServicio0').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si hay hotfoil
function getHotFoil(){
    //console.log (">> entrando getHotFoil");
    if (document.getElementById('radioServicio1').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si hay foil1
function getFoil1(){
    //console.log (">> entrando getFoil1");
    if (document.getElementById('chkFoil1').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si hay foil2
function getFoil2(){
    //console.log (">> entrando getFoil2");
    if (document.getElementById('chkFoil2').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si hay coldfoil
function getColdFoil(){
    //console.log (">> entrando getHotFoil");
    if (document.getElementById('radioServicio2').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos si hay Desperdicio
function getAsumirDesperdicio(){
    //console.log (">> entrando getAsumirDesperdicio");
    if (document.getElementById('chkAsumirDesperdicio').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos el precio del dolar HP
function getDolarHP(){
    //console.log (">> entrando getDolarHP");
    return (parseFloat(document.getElementById('dolarHP').value));
}

/**********************************************************************************/
/* objetos de la division de resumen                                              */
/**********************************************************************************/
// capturamos Ancho de la etiqueta en el Resumen
function getResumenAnchoEtiqueta(){
    //console.log (">> entrando getResumenAnchoEtiqueta");
    return (parseFloat(document.getElementById('txtResumenAnchoEtiqueta').value));
}

// capturamos Avance de la etiqueta en el Resumen
function getResumenAvanceEtiqueta(){
    //console.log (">> entrando getResumenAvanceEtiqueta");
    return (parseFloat(document.getElementById('txtResumenAvanceEtiqueta').value));
}

// capturamos Separacion de la etiqueta en el Resumen
function getResumenSeparacionEtiqueta(){
    //console.log (">> entrando getResumenSeparacionEtiqueta");
    return (parseFloat(document.getElementById('txtResumenSeparacionEtiqueta').value));
}

// capturamos Canales de la etiqueta en el Resumen
function getResumenCanalesEtiqueta(){
    //console.log (">> entrando getResumenCanalesEtiqueta");
    return (parseInt(document.getElementById('txtResumenCanales').value));
}

// capturamos Canales de la etiqueta en el Resumen
function getResumenCantidadEtiqueta(){
    //console.log (">> entrando getResumenCantidadEtiqueta");
    return (parseInt(document.getElementById('txtResumenCantidadEtiquetas').value));
}

// capturamos Cantidad por Presentacion en el Resumen
function getResumenCantidadPorPresentacion(){
    //console.log (">> entrando getResumenCantidadPorPresentacion");
    return (parseInt(document.getElementById('cantPorPre').value));
}

// capturamos el Diametro del Core en el Resumen
function getResumenDiametroCore(){
    //console.log (">> entrando getResumenDiametroCore");
    return (parseFloat(document.getElementById('diametroCore').value));
}

// capturamos Cantidad a Despachar en el Resumen
function getResumenCantidadADespachar(){
    //console.log (">> entrando getResumenCantidadADespachar");
    return (parseInt(document.getElementById('canADesp').value));
}

// capturamos Cantidad de Cores en el Resumen
function getResumenCantidadCores(){
    //console.log (">> entrando getResumenCantidadCores");
    return (parseInt(document.getElementById('txtResumenCantCores').value));
}

// capturamos Embobinado en el Resumen
function getResumenEmbobinado(){
    //console.log (">> entrando getResumenEmbobinado");
    return (parseInt(document.getElementById('embobinado').value));
}


// capturamos Costo del Material en el Resumen
function getResumenCostoMateriales(){
    //console.log (">> entrando getResumenCostoMateriales");
    return (parseFloat(document.getElementById('resumenCostoMateriales').value));
}


// capturamos Costo del Material en el Resumen
function getResumenCostoEtiqueta(){
    //console.log (">> entrando getResumenCostoEtiqueta");
    return (parseFloat(document.getElementById('resumenCostoEtq').value));
}

// capturamos Suma de Costos en el Resumen
function getResumenCostoEtiqueta(){
    //console.log (">> entrando getResumenCostoEtiqueta");
    return (parseFloat(document.getElementById('resumenSumaCostos').value));
}

// capturamos Suma de Costos en el Resumen
function getResumenCostoTotal(){
    //console.log (">> entrando getResumenCostoTotal");
    return (parseFloat(document.getElementById('resumenCostoTotal').value));
}

// capturamos Factor en el Resumen
function getResumenFactor(){
    //console.log (">> entrando getResumenFactor");
    let valor = parseFloat(document.getElementById('resumenFactor').value);

    if (isNaN(valor)) {
    return (0.00);
    } else {
    return (valor);
    }
}


// capturamos Precio del Color en el Resumen
function getResumenPrecioColor(){
    //console.log (">> entrando getResumenPrecioColor");
    return (parseFloat(document.getElementById('precioColor').value));
}

// capturamos Total del Color en el Resumen
function getResumenTotalColor(){
    //console.log (">> entrando getResumenTotalColor");
    return (parseFloat(document.getElementById('totalColor').value));
}


// capturamos Precio del clishe en el Resumen
function getResumenPrecioClishe(){
    //console.log (">> entrando getResumenPrecioClishe");
    return (parseFloat(document.getElementById('resumenPrecioClishe').value));
}

// capturamos total del clishe en el Resumen
function getResumenTotalClishe(){
    //console.log (">> entrando getResumenTotalClishe");
    return (parseFloat(document.getElementById('resumenTotalClishe').value));
}


// capturamos Precio de la Etiqueta en el Resumen
function getResumenPrecioEtiqueta(){
    //console.log (">> entrando getResumenPrecioEtiqueta");
    return (parseFloat(document.getElementById('resumenPrecioEtq').value));
}

// capturamos comision en el Resumen
function getResumenComision(){
    //console.log (">> entrando getResumenComision");
    return (parseFloat(document.getElementById('comision').value));
}

// capturamos Monto Etiqueta en el Resumen
function getResumenMontoEtiqueta(){
    //console.log (">> entrando getResumenMontoEtiqueta");
    return (parseFloat(document.getElementById('resumenMontoEtq').value));
}

// capturamos Monto Neto en el Resumen
function getResumenMontoNeto(){
    //console.log (">> entrando getResumenMontoNeto");
    return (parseFloat(document.getElementById('resumenMontoNeto').value));
}


// capturamos Iva en el Resumen
function getResumenIva(){
    //console.log (">> entrando getResumenIva");
    return (parseFloat(document.getElementById('iva').value));
}

// capturamos Monto Total en el Resumen
function getResumenMontoTotal(){
    //console.log (">> entrando getResumenMontoTotal");
    return (parseFloat(document.getElementById('resumenMontoTotal').value));
}

// capturamos Status en el Resumen
function getResumenStatus(){
    //console.log (">> entrando  getResumenStatus");
    return (parseInt(document.getElementById('status').value));
}


// capturamos el costo po impresion, se aplica en las impresiones indigo
function getCostoPorImpresion(){
    //console.log (">> entrando getCostoPorImpresion");
    return (parseFloat(document.getElementById('txtCostoPorImpresion').value));
}

// capturamos si hay o no clishe adicional
function getHayClisheAdicional(){
    //console.log (">> entrando getHayClisheAdicional");
    if (document.getElementById('chkClisheAdicional').checked){
        return (true);
    } else {
        return (false);
    }
}

// capturamos la cantidad de clishe adicionales
function getCantidadClisheAdicional(){
    //console.log (">> entrando getCantidadClisheAdicional");
    return (parseInt(document.getElementById('txtClisheAdicional').value));
}

// esta funcion se usa para captura el resultado de una variable proveniente de CEP
function getnVarRepvm(){
    return(document.getElementById('nVarRepvm').value);
}


// esta funcion se utiliza captura el monto descontado
function getMontoDescontado(){
    return (parseFloat(document.getElementById('montoDescontado').value).toFixed(4));
}


// esta funcion se utiliza para leer del ancho del laminado
function getAnchoLaminado(){
    return (parseFloat(document.getElementById('anchoLaminado').value).toFixed(4));
}