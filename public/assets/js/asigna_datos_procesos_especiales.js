///////////////////////////////////////////////////////////////////////////////
// Estas funciones son usadas en el formulario special_process_one           //
// estan diseñadas para asignar valores a los objetos en el formulario       //
// 2025-08-27                                                                //
///////////////////////////////////////////////////////////////////////////////
//  asignamos el ancho cuando la cotizacion es flexo grafica
function setAnchoFlexo(valor){
    console.log ("setAnchoFlexo ", valor);
     document.getElementById('txtAnchoEtiqueta').value=valor;
}

//  asignamos el ancho cuando la cotizacion es indigo
function setAnchoIndigo(valor){
    console.log ("setAnchoIndigo", valor);
     document.getElementById('selAnchoEtiqueta').value=valor;
}

//  asignamos el ancho de la etiqueta
function setAvanceEtiqueta(valor){
    console.log ("setAvanceEtiqueta", valor);
     document.getElementById('txtAvanceEtiqueta').value=valor;
}

//  asignamos el Ancho de Bobina
function setAnchoBobina(valor){
    console.log ("setAnchoBobina", valor);
    document.getElementById('txtAnchoBobina').value=valor;
}

//  asignamos la separacion de la etiqueta
function setSeparacionEtiqueta(valor){
     console.log ("setSeparacionEtiqueta", valor);
     document.getElementById('txtSeparacionEtiqueta').value=valor;
}

//  asignamos los canales de la etiqueta
function setCanalesEtiqueta(valor){
    console.log ("setCanalesEtiqueta", valor);
    document.getElementById('txtCanales').value=valor;
    document.getElementById('txtCanales').disabled=false;

}

//  asignamos las repeticiones del troquel
function setRepeticionesTroquel(valor){
    console.log ("setRepeticionesTroquel", valor);
    document.getElementById('txtRepeticionesTroquel').value=valor;
}

//  asignamos la cantidad de etiquetas 
function setCantidadEtiquetas(valor){
    console.log ("setCantidadEtiquetas", valor);
    document.getElementById('txtCantidadEtiquetas').value=valor;
}

//  asignamos la cantidad de etiquetas por Presentacion
function setCantidadNPre(valor){
    console.log ("setCantidadNPre", valor);
    document.getElementById('cantNPre').value=valor;
}

//  asignamos porcentaje de seguridad
function setPorcentajeSeguridad(valor){
    console.log ("setPorcentajeSeguridad", valor);
    document.getElementById('txtPorcentajeSeguridad').value=valor;
}

//  asignamos Ancho de Bobina
function setAnchoBobina(valor){
    console.log ("setAnchoBobina", valor);
    document.getElementById('txtAnchoBobina').value=valor;
}

//  asignamos Largo Etiqueta
function setLargoEtiqueta(valor){
    console.log ("setLargoEtiqueta", valor);
    document.getElementById('txtLargoTotalEtiqueta').value=valor;
}

//  asignamos CmsLienales
function setCmsLineales(valor){
    console.log ("setCmsLineales", valor);
    document.getElementById('txtCmsLineales').value=valor;
}


//  asignamos el costo del material
function setCostoMaterial(valor){
    console.log ("setCostoMaterial", valor);
    document.getElementById('txtCostoMaterial').value=valor;
}

//  asignamos la cantidad de etiuqetas pro rollo
function setEtiquetasXRollo(valor){
    console.log ("setEtiquetasXRollo", valor);
    document.getElementById('cantXRollos').value=valor;
}

//  asignamos Cms Lineales Totales
function setCmsLinealesTotales(valor){
    console.log ("setCmsLinealesTotales", valor);
    document.getElementById('txtCmsLinealesTotales').value=valor;
}


//  asignamos Cms Lineales Clishe
function setCmsClishe(valor){
    console.log ("setCmsClishe", valor);
    document.getElementById('txtCmsClishe').value=valor;
}

//  asignamos Metros Cuadrados de Bobina
function setMtrs2Bobina(valor){
    console.log ("setMtrs2Bobina", valor);
    document.getElementById('txtMtrs2Bobina').value=valor;
}


//  asignamos MetrosLineales
function setMtrsLineales(valor){
    console.log ("setMtrsLineales", valor);
    document.getElementById('txtMetrosLineales').value=valor;
}

//  asignamos Metros Cuadrados de Etiquetas
function setMtrs2Etiquetas(valor){
    console.log ("setMtrs2Etiquetas", valor);
    document.getElementById('txtMtrs2Etiqueta').value=valor;
}

//  asignamos Codigo de Etiqueta
function setCodigoEtiqueta(valor){
    console.log ("setCodigoEtiqueta", valor);
    document.getElementById('txtCodigoEtiqueta').value=valor;
}

// asignamos el codigo del troquel de superficie
function setCodigoTroquelSuperficie(valor){
    console.log ("setCodigoTroquelSuperficie", valor);    
    document.getElementById('txtCodigoTroquelSuperficie').value=valor;
}

// asignamos el doblado de las etiquetas
function setDobladasCada(valor){
    console.log ("setDobladasCada", valor); 
    document.getElementById('txtDobladasCada').value=valor;
}

// esta funcion deshabilita el control dobladas cada
function setDisabledDobladasCada(){
    console.log ("setDisabledDobladasCada"); 
    document.getElementById('txtDobladasCada').disabled=true;
}

// esta funcion deshabilita el control dobladas cada
function setEnabledDobladasCada(){
    console.log ("setEnabledDobladasCada"); 
    document.getElementById('txtDobladasCada').disabled=false;
}

// esta funcion asigna la cantidad de etiquetas por Rollo/paquete
function setCantrol(valor){
    console.log ("setCantrol", valor); 
    document.getElementById('txtCantrol').value=valor;  
}


// esto aplica para troqueles nuevos
//  asignamos los dientes
function setDientes(valor){
    console.log ("setDientes", valor); 
    document.getElementById('txtDientes').value=valor;
}

//  asignamos las repeticiones
function setRepeticiones(valor){
    console.log ("setRepeticiones", valor); 
    document.getElementById('txtRepeticiones').value=valor;
}

//  asignamos etiquetas solas
function setSol(valor){
    console.log ("setSol", valor); 
    document.getElementById('txtSol').value=valor;
}

//  asignamos las observaciones
function setObservaciones(valor){
    console.log ("setObservaciones", valor); 
    return (document.getElementById('txtObservaciones').value);
}

/*****************************************************************************/
/* objetos de la seccion de presentacion                                     */
/*****************************************************************************/
//  asignamos cantidad de N por Presentacion
function setNPresentacion(valor){
     console.log ("setObservaciones", valor); 
    document.getElementById('cantNPre').value=valor;
}


//  asignamos Canales a Despachar
function setCanalesDespachar(valor){
     console.log ("setObservaciones", valor); 
    document.getElementById('canalesDesp').value=valor;
}


//  asignamos Canales a Despachar
function setCantidadCores(valor){
     console.log ("setObservaciones", valor); 
    document.getElementById('cantCores').value=valor;
}

//  asignamos dobladas cada Cuanto
function setDobladasCada(valor){
    console.log ("setDobladasCada", valor); 
    document.getElementById('txtDobladasCada').value=valor;
}

//  asignamos Nombre de la Etiqueta
function setNombreEtiqueta(valor){
    console.log ("setNombreEtiqueta", valor);
    document.getElementById('nombreEtiqueta').value=valor;
}

//  asignamos Cantidad de Etiquetas por Pagina
function setCantidadEtiquetasxPaginas(valor){
    console.log ("setCantidadEtiquetasxPaginas", valor);
    document.getElementById('cantEtqxPag').value=valor;
}

//  asignamos Costos por Impresion
function setCostoXImpresion(valor){
    console.log ("setCostoXImpresion", valor);
    document.getElementById('txtCostoPorImpresion').value=valor;
}

//  asignamos Totales cotiz por Rollos
function setTotalCotizacionxRollos(valor){
    console.log ("setTotalCotizacionxRollos", valor);
    document.getElementById('totalCotizxRollos').value=valor;
}

//  asignamos el texto del ribbon
function setTextoRibbon(valor){
    console.log ("setTextoRibbon", valor);
    return (document.getElementById('ribbonTexto').value.trim());
}

//  asignamos la numeracion desde del ribbon
function setDesdeRibbon(valor){
    console.log ("setDesdeRibbon", valor);
    document.getElementById('numeracionDesde').value=valor;
}

//  asignamos la numeracion hasta del ribbon
function setHastaRibbon(valor){
    console.log ("setHastaRibbon", valor);
    document.getElementById('numeracionHasta').value=valor;
}

//  asignamos texto signado
function setTextosignado(valor){
    console.log ("setTextosignado", valor);
    document.getElementById('txtUtilizaSignado').value=valor;
}

//  asignamos pulgadas
function setPulgadasSignado(valor){
    console.log ("setPulgadasSignado", valor);
    document.getElementById('pulgadas').value=valor;
}

//  asignamos cadaXEtq
function setCadaXEtq(valor){
    console.log ("setCadaXEtq", valor);
    document.getElementById('cadaXEtq').value=valor;
}




/**********************************************************************************/
/* objetos de la div de costos                                                    */
/**********************************************************************************/
//  asignamos el codigo del material
function setCodigoMaterial(valor){
    console.log ("setCodigoMaterial", valor);
    document.getElementById('codigoMaterial').value=valor;
}

//  asignamos el codigo del material
function setDescripcioMaterial(valor){
    console.log ("setDescripcioMaterial", valor);
    document.getElementById('descripcionMaterial').value=valor;
}

//  asignamos el Costo del Material
function setCostoMaterial(valor){
    console.log ("setDescripcioMaterial", valor);
    document.getElementById('setDescripcioMaterial').value=valor;
}

//  asignamos el Costo total del Material
function setCostoTotalMaterial(valor){
    console.log ("setCostoTotalMaterial", valor);
    document.getElementById('txtCostoTotalMaterial').value=valor;
}

//  asignamos el Costo de la Etiqueta
function setCostoEtiqueta(valor){
    console.log ("setCostoEtiqueta", valor);
    document.getElementById('txtCostoEtiqueta').value=valor;
}

//  asignamos la Cantidad de Colores
function setCantidadColores(valor){
    console.log ("setCantidadColores", valor);
    document.getElementById('txtCantidadColores').value=valor;
}

//  asignamos el precio de los colores
function setPrecioColores(valor){
    console.log ("setPrecioColores", valor);
    document.getElementById('txtPrecioColores').value=valor;
}

//  asignamos el precio Total de los colores
function setPrecioTotalColores(valor){
    console.log ("setPrecioTotalColores", valor);
    document.getElementById('txtPrecioTotalColores').value=valor;
}

//  asignamos el precio Total de los colores
function setPrecioClishe(valor){
    console.log ("setPrecioClishe", valor);
    document.getElementById('txtPrecioClishe').value=valor;
}

//  asignamos el precio del transporte
function setPorcentajeTransporte(valor){
    console.log ("setPorcentajeTransporte", valor);
    document.getElementById('txtPorcentajeTransporte').value=valor;
}

//  asignamos el costo del transporte
function setCostoTransporte(valor){
    console.log ("setCostoTransporte", valor);
    document.getElementById('txtCostoTransporte').value=valor;
}

//  asignamos Porcentaje Mano de Obra
function setPorcentajeManoObra(valor){
    console.log ("setPorcentajeManoObra", valor);
    document.getElementById('txtPorcentajeManoObra').value=valor;
}

//  asignamos Costo Mano de Obra
function setCostoManoObra(valor){
    console.log ("setCostoManoObra", valor);
    document.getElementById('txtCostoManoObra').value=valor;
}

//  asignamos Suma de Costos Seccion de Costos
function setSumacostos(valor){
    console.log ("setSumacostos", valor);
    document.getElementById('txtSumaCostos').value=valor;
}

//  asignamos Costo Total
function setCostoTotal(valor){
    console.log ("setCostoTotal", valor);
    document.getElementById('txtCostoTotal').value=valor;
}

//  asignamos Fator
function setFactor(valor){
    console.log ("setFactor", valor);
    document.getElementById('txtFactor').value=valor;
}

//  asignamos el Costo de Material por Etiquetas
function setCostoMaterialPorEtiqueta(valor){
    console.log ("setCostoMaterialPorEtiqueta", valor);
    document.getElementById('txtCostoMaterialXEtiqueta').value=valor;
}

//  asignamos el Costo del Foil 1
function setCostoFoil1(valor){
    console.log ("setCostoFoil1", valor);
    document.getElementById('txtCostoFoil1').value=valor;
}

//  asignamos el Costo del Foil 2
function setCostoFoil2(valor){
    console.log ("setCostoFoil2", valor);
    document.getElementById('txtCostoFoil2').value=valor;
}

//  asignamos el Precio de la Etiqueta
function setPrecioEtiqueta(valor){
    console.log ("setPrecioEtiqueta", valor);
    document.getElementById('txtPrecioEtiqueta').value=valor;
}

//  asignamos el Costo del Desperdicio de Bobina
function setCostoDesperdicioBobina(valor){
    console.log ("setCostoDesperdicioBobina", valor);
    document.getElementById('txtCostoDespBobina').value=valor;
}

//  asignamos la Diferencia por Ancho
function setDifAncho(valor){
    console.log ("setDifAncho", valor);
    document.getElementById('txtDifAncho').value=valor;
}

//  asignamos El Costo Total del Foil
function setCostoTotalFoil(valor){
    console.log ("setCostoTotalFoil", valor);
    document.getElementById('txtCostoTotalFoil').value=valor;
}

//  asignamos el Ancho del Foil
function setAnchoFoil(valor){
    console.log ("setAnchoFoil", valor);
    document.getElementById('txtAnchoFoil').value=valor;
}

//  asignamos el Color del Foil 1
function setColorFoil1(valor){
    console.log ("setColorFoil1", valor);
    document.getElementById('txtColorFoil1').value=valor;
}

//  asignamos el Color del Foil 2
function setColorFoil2(valor){
    console.log ("setColorFoil2", valor);
    document.getElementById('txtColorFoil2').value=valor;
}

//  asignamos el Descuento
function setDescuento(valor){
    console.log ("setDescuento", valor);
    document.getElementById('txtDescuento').value=valor;
}

//  asignamos el Texto del Sandwich
function setSandwich(valor){
    console.log ("setSandwich", valor);
    document.getElementById('txtSandwich').value=valor;
}

//  asignamos la Descripcion del Sandwich
function setDescripcionSandwich(valor){
    console.log ("setDescripcionSandwich", valor);
    document.getElementById('txtDescripcionSandwich').value=valor;
}

//  asignamos el Costo del Sandwich
function setCostoSandwich(valor){
    console.log ("setCostoSandwich", valor);
    document.getElementById('txtCostoSandwich').value=valor;
}

//  asignamos el codigo del laminado
function setCodigoLaminado(valor){
    console.log ("setCodigoLaminado", valor);
    document.getElementById('codigoLaminado').value=valor;
}

//  asignamos el codigo del laminado
function setDescripcionLaminado(valor){
    console.log ("setDescripcionLaminado", valor);
    document.getElementById('descripcionLaminado').value=valor;
}

//  asignamos el costo del Laminado
function seCostoLaminado(valor){
    console.log ("setCostoLaminado", valor);
    document.getElementById('costoLaminado').value=valor;
}

// asignamos el Costo de Material Por Etiquetas
function setCostoMaterialXEtiquetas(valor){
    document.getElementById('txtCostoMaterialXEtiqueta').value=valor;
}

// asignamos el valor de las pulgadas en el signado
function setSignadoPulgadas(valor){
    document.getElementById('signadoPulgadas').value=valor;
}

/****************************************************************************/
/* objetos de la division de resumen                                        */
/****************************************************************************/
//  asignamos Ancho de la etiqueta en el Resumen
function setResumenAnchoEtiqueta(valor){
    console.log ("setResumenAnchoEtiqueta", valor);
    document.getElementById('txtResumenAnchoEtiqueta').value=valor;
}

//  asignamos Avance de la etiqueta en el Resumen
function setResumenAvanceEtiqueta(valor){
    console.log ("setResumenAvanceEtiqueta", valor);
    document.getElementById('txtResumenAvanceEtiqueta').value=valor;
}

//  asignamos Separacion de la etiqueta en el Resumen
function setResumenSeparacionEtiqueta(valor){
    console.log ("setResumenSeparacionEtiqueta", valor);
    document.getElementById('txtResumenSeparacionEtiqueta').value=valor;
}

//  asignamos Canales de la etiqueta en el Resumen
function setResumenCanalesEtiqueta(valor){
    console.log ("setResumenCanalesEtiqueta", valor);
    document.getElementById('txtResumenCanales').value=valor;
}

//  asignamos Canales de la etiqueta en el Resumen
function setResumenCantidadEtiqueta(valor){
    console.log ("setResumenCantidadEtiqueta", valor);
    document.getElementById('txtResumenCantidadEtiquetas').value=valor;
}

//  asignamos Cantidad por Presentacion en el Resumen
function setResumenCantidadPorPresentacion(valor){
    console.log ("setResumenCantidadPorPresentacion", valor);
    document.getElementById('cantPorPre').value=valor;
}

//  asignamos el Diametro del Core en el Resumen
function setResumenDiametroCore(valor){
    console.log ("setResumenDiametroCore", valor);
    document.getElementById('diametroCore').value=valor;
}

//  asignamos Cantidad a Despachar en el Resumen
function setResumenCantidadADespachar(valor){
    console.log ("setResumenCantidadADespachar", valor);
    document.getElementById('canADesp').value=valor;
}

//  asignamos Cantidad de Cores en el Resumen
function setResumenCantidadCores(valor){
    console.log ("setResumenCantidadCores", valor);
    document.getElementById('txtResumenCantCores').value=valor;
}

//  asignamos Embobinado en el Resumen
function setResumenEmbobinado(valor){
    console.log ("setResumenEmbobinado", valor);
    document.getElementById('embobinado').value=valor;
}


//  asignamos Costo del Material en el Resumen
function setResumenCostoMateriales(valor){
    console.log ("setResumenCostoMateriales", valor);
    document.getElementById('resumenCostoMateriales').value=valor;
}


//  asignamos Costo del Material en el Resumen
function setResumenCostoEtiqueta(valor){
    console.log ("setResumenCostoEtiqueta", valor);
    document.getElementById('resumenCostoEtq').value=valor;
}

//  asignamos Suma de Costos en el Resumen
function setResumenSumaCostos(valor){
    console.log ("setResumenSumaCostos", valor);
    document.getElementById('resumenSumaCostos').value=valor;
}

//  asignamos Suma de Costos en el Resumen
function setResumenCostoTotal(valor){
    console.log ("setResumenCostoTotal", valor);    
    document.getElementById('resumenCostoTotal').value=valor;
}

//  asignamos Factor en el Resumen
function setResumenFactor(valor){
    console.log ("setResumenFactor", valor);        
    document.getElementById('factor').value=valor;
}


//  asignamos Precio del Color en el Resumen
function setResumenPrecioColor(valor){
    console.log ("setResumenPrecioColor", valor);        
    document.getElementById('resumenPrecioColor').value=valor;
}

//  asignamos Total del Color en el Resumen
function setResumenTotalColor(valor){
    console.log ("setResumenTotalColor", valor);
    document.getElementById('resumenTotalColor').value=valor;
}


//  asignamos Precio del clishe en el Resumen
function setResumenPrecioClishe(valor){
    console.log ("setResumenPrecioClishe", valor);
    document.getElementById('resumenPrecioClishe').value=valor;
}

//  asignamos total del clishe en el Resumen
function setResumenTotalClishe(valor){
    console.log ("setResumenTotalClishe", valor);    
    document.getElementById('resumenTotalClishe').value=valor;
}


//  asignamos Precio de la Etiqueta en el Resumen
function setResumenPrecioEtiqueta(valor){
    console.log ("setResumenPrecioEtiqueta", valor);        
    document.getElementById('resumenPrecioEtq').value=valor;
}

//  asignamos comision en el Resumen
function setResumenComision(valor){
    console.log ("setResumenComision", valor);    
    document.getElementById('comision').value=valor;
}

//  asignamos Monto Etiqueta en el Resumen
function setResumenMontoEtiqueta(valor){
    console.log ("setResumenMontoEtiqueta", valor);  
    document.getElementById('resumentMontoEtq').value=valor;
}

//  asignamos Monto Neto en el Resumen
function setResumenMontoNeto(valor){
    console.log ("setResumenMontoNeto", valor);  
    document.getElementById('resumenMontoNeto').value=valor;
}


//  asignamos Iva en el Resumen
function setResumenIva(valor){
    console.log ("setResumenIva", valor);setResumenIva
    document.getElementById('iva').value=valor;
}

//  asignamos Monto Total en el Resumen
function setResumenMontoTotal(valor){
    console.log ("setResumenMontoTotal", valor);setResumenIva
    document.getElementById('resumenMontoTotal').value=valor;
}

//  asignamos Status en el Resumen
function setResumenStatus(valor){
    console.log ("setResumenStatus", valor);setResumenIva
    document.getElementById('status').value=valor;
}
