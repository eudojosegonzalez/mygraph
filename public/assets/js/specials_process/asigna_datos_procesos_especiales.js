///////////////////////////////////////////////////////////////////////////////
// Estas funciones son usadas en el formulario special_process_one           //
// estan diseñadas para asignar valores a los objetos en el formulario       //
// 2025-08-27                                                                //
///////////////////////////////////////////////////////////////////////////////
// asignamos el codigo de la etiqueta en el encabezado
function setcoArtHeader(valor){
    //console.log ("setcoArtHeader ", valor);
    document.getElementById('coArtHeader').innerHTML=valor;

}
// esta funcion asiga el valor de la descripcion del articulo en el encabezado
function setdesArtHeader(valor){
    //console.log ("setdesArtHeader ", valor);
    document.getElementById('desArtHeader').innerHTML=valor;

}

// esta funcion selecciona el tipo de troquel
function setTipoTroquel (valor){
    try {
        paso=1;
        // capturamos la separacion
        separacion=getSeparacionEtiqueta();
        // capturamos los canales
        paso=2;
        canales=getCanalesEtiqueta();   
        // validamos el tipo de cotizacion
        paso=3;
        if (getTipoCotizacion()==1){
            paso=4;
            // es flexografica
            document.getElementById('txtAnchoEtiqueta').style.display="block";
            paso=5;
            document.getElementById('txtAnchoEtiqueta').disabled=false;
            paso=6;
            document.getElementById('txtAvanceEtiqueta').disabled=false;
            paso=7;
            document.getElementById('txtCanales').disabled=false;
            paso=8;
            ancho=getAnchoFlexo();
        } else {
            // es digital
            paso=9;
            document.getElementById('txtAvanceEtiqueta').disabled=false;
            paso=10;
            ancho=getAnchoInfico();
        }    
        paso=11;
        switch (valor){
            case 1:
                // fisico
                paso=12;
                document.getElementById('tipTroq0').checked=true;
                paso=13;
                //document.getElementById('tipTroq2').checked=true;
                paso=14;
                document.getElementById('lblDientes').style.display="none";
                paso=15;
                document.getElementById('txtDientes').style.display="none";
                paso=16;
                document.getElementById('lblRepeticiones').style.display="none";
                paso=17;
                document.getElementById('txtRepeticiones').style.display="none";            
                break;
            case 2:
                // laser
                paso=20;
                document.getElementById('tipTroq1').checked=true;
                paso=21;
                document.getElementById('lblDientes').style.display="none";
                paso=22;
                document.getElementById('txtDientes').style.display="none";
                paso=23;
                document.getElementById('lblRepeticiones').style.display="block";
                paso=24;
                document.getElementById('txtRepeticiones').style.display="block";               
                break;
            case 3:
                // nuevo
                paso=25;
                document.getElementById('tipTroq2').checked=true;
                paso=26;
                document.getElementById('lblDientes').style.display="block";
                paso=27;
                document.getElementById('txtDientes').style.display="block";
                paso=28;
                document.getElementById('lblRepeticiones').style.display="block";
                paso=29;
                document.getElementById('txtRepeticiones').style.display="block";
                break;
            case 4:
                // no aplica
                paso=30;
                document.getElementById('tipTroq3').checked=true;
                paso=31;
                document.getElementById('lblDientes').style.display="none";
                paso=32;
                document.getElementById('txtDientes').style.display="none";
                paso=33;
                document.getElementById('lblRepeticiones').style.display="none";
                paso=34;
                document.getElementById('txtRepeticiones').style.display="none";               
                break;
            case 5:
                // tipografico
                paso=40;
                document.getElementById('tipTroq4').checked=true;
                paso=41;
                document.getElementById('lblDientes').style.display="none";
                paso=42;
                document.getElementById('txtDientes').style.display="none";
                paso=43;
                document.getElementById('lblRepeticiones').style.display="none";
                paso=44;
                document.getElementById('txtRepeticiones').style.display="none";               
                break;
        }
        // validamos la data obtenida
        paso=50;
        if ((ancho!="NaN") && (typeof(ancho)!="undefined") && (ancho!=0.00)
            &&  (separacion!="NaN") && (typeof(separacion)!="undefined") && (separacion!=0.00)
            && (canales!="NaN") && (typeof(canales)!="undefined") && (canales!=0.00)){
            paso=51;
            if ((valor !=4) && (valor !=5)){
                paso=52;
                calculos7();
            }
        }  
    }  catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error SetTipoTroquel");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
  
}

// esta funcion asiga el tipo de cotizacion
function setTipoCotizacion(valor) {
    //console.log (">> entrando setTipoCotizacion",valor); 
    if (valor==1)  {
        document.getElementById('tipoCotiz0').checked=true;
        document.getElementById('tipoCotiz1').checked=false;
    } else {
        document.getElementById('tipoCotiz0').checked=false;
        document.getElementById('tipoCotiz1').checked=true;
    }
}

//  asignamos el ancho cuando la cotizacion es flexo grafica
function setAnchoFlexo(valor){
    //console.log ("setAnchoFlexo ", valor);
     document.getElementById('txtAnchoEtiqueta').value=valor;
}

//  asignamos el ancho cuando la cotizacion es indigo
function setAnchoIndigo(valor){
    //console.log ("setAnchoIndigo", valor);
     document.getElementById('selAnchoEtiqueta').value=valor;
}

//  asignamos el ancho de la etiqueta
function setAvanceEtiqueta(valor){
    //console.log ("setAvanceEtiqueta", valor);
     document.getElementById('txtAvanceEtiqueta').value=valor;
}

//  asignamos el Ancho de Bobina General
function setAnchoBobina(valor){
    //console.log ("setAnchoBobina", valor);
    document.getElementById('txtAnchoBobina').value=valor;
}

//  asignamos la separacion de la etiqueta
function setSeparacionEtiqueta(valor){
    //console.log ("setSeparacionEtiqueta", valor);
    document.getElementById('txtSeparacionEtiqueta').value=valor;
    // asignamos el valor en la seccion de resumen
    document.getElementById('txtResumenSeparacionEtiqueta').value=valor;
}

//  asignamos los canales de la etiqueta
function setCanalesEtiqueta(valor){
    //console.log ("setCanalesEtiqueta", valor);
    document.getElementById('txtCanales').value=valor;
    document.getElementById('txtCanales').disabled=false;

}

//  asignamos las repeticiones del troquel
function setRepeticionesTroquel(valor){
    //console.log ("setRepeticionesTroquel", valor);
    document.getElementById('txtRepeticionesTroquel').value=valor;
}

//  asignamos la cantidad de etiquetas 
function setCantidadEtiquetas(valor){
    //console.log ("setCantidadEtiquetas", valor);
    document.getElementById('txtCantidadEtiquetas').value=valor;
}

//  asignamos la cantidad de etiquetas por Presentacion
function setCantidadNPre(valor){
    //console.log ("setCantidadNPre", valor);
    document.getElementById('cantNPre').value=valor;
}

//  asignamos porcentaje de seguridad
function setPorcentajeSeguridad(valor){
    //console.log ("setPorcentajeSeguridad", valor);
    document.getElementById('txtPorcentajeSeguridad').value=valor;
}

//  asignamos Ancho de Bobina Costo
function setCostoAnchoBobina(valor){
    //console.log ("setCostoAnchoBobina", valor);
    document.getElementById('txtCostosAnchoBobina').value=parseFloat(valor).toFixed(2);
}

//  asignamos Largo Etiqueta
function setLargoEtiqueta(valor){
    //console.log ("setLargoEtiqueta", valor);
    document.getElementById('txtLargoTotalEtiqueta').value=valor;
}

//  asignamos CmsLienales
function setCmsLineales(valor){
    //console.log ("setCmsLineales", valor);
    document.getElementById('txtCmsLineales').value=parseFloat(valor).toFixed(2);
}


//  asignamos la cantidad de etiuqetas pro rollo
function setEtiquetasXRollo(valor){
    //console.log ("setEtiquetasXRollo", valor);
    document.getElementById('cantXRollos').value=valor;
}

//  asignamos Cms Lineales Totales
function setCmsLinealesTotales(valor){
    //console.log ("setCmsLinealesTotales", valor);
    document.getElementById('txtCmsLinealesTotales').value=parseFloat(valor).toFixed(2);
}


//  asignamos Cms Lineales Clishe
function setCmsClishe(valor){
    //console.log ("setCmsClishe", valor);
    document.getElementById('txtCmsClishe').value=parseFloat(valor).toFixed(3);
}

//  asignamos Metros Cuadrados de Bobina
function setMtrs2Bobina(valor){
    //console.log ("setMtrs2Bobina", valor);
    document.getElementById('txtMtrs2Bobina').value=valor;
}


//  asignamos MetrosLineales
function setMtrsLineales(valor){
    //console.log ("setMtrsLineales", valor);
    document.getElementById('txtMetrosLineales').value=parseFloat(valor).toFixed(2);
}

//  asignamos Metros Cuadrados de Etiquetas
function setMtrs2Etiquetas(valor){
    //console.log ("setMtrs2Etiquetas", valor);

    document.getElementById('txtMtrs2Etiqueta').value=parseFloat(valor).toFixed(2);
    if (parseFloat(valor).toFixed(2) < 100){
        document.getElementById('txtMtrs2Etiqueta').style.backgroundColor="#FF0000";
        document.getElementById('txtMtrs2Etiqueta').style.color="#ffffff";
    } else {
        document.getElementById('txtMtrs2Etiqueta').style.backgroundColor="#ffffff";
        document.getElementById('txtMtrs2Etiqueta').style.color="#000000";
    }
}

//  asignamos Codigo de Etiqueta
function setCodigoEtiqueta(valor){
    //console.log ("setCodigoEtiqueta", valor);
    document.getElementById('txtCodigoEtiqueta').value=valor;
}

// asignamos el codigo del troquel de superficie
function setCodigoTroquelSuperficie(valor){
    //console.log ("setCodigoTroquelSuperficie", valor);    
    document.getElementById('txtCodigoTroquelSuperficie').value=valor;
}

// asignamos el troquel base
function setCodigoTroquelBase(valor){
    //console.log ("setCodigoTroquelBase", valor);    
    document.getElementById('txtTroquelBase').value=valor;
}


// asignamos el doblado de las etiquetas
function setDobladasCada(valor){
    //console.log ("setDobladasCada", valor); 
    document.getElementById('txtDobladasCada').value=valor;
}

// esta funcion deshabilita el control dobladas cada
function setDisabledDobladasCada(){
    //console.log ("setDisabledDobladasCada"); 
    document.getElementById('txtDobladasCada').disabled=true;
}

// esta funcion deshabilita el control dobladas cada
function setEnabledDobladasCada(){
    //console.log ("setEnabledDobladasCada"); 
    document.getElementById('txtDobladasCada').disabled=false;
}

// esta funcion asigna la cantidad de etiquetas por Rollo/paquete
function setCantrol(valor){
    //console.log ("setCantrol", valor); 
    document.getElementById('txtTotalCotizxRollos').value=valor;  
}


// esto aplica para troqueles nuevos
//  asignamos los dientes
function setDientes(valor){
    //console.log ("setDientes", valor); 
    document.getElementById('txtDientes').value=valor;
}

//  asignamos las repeticiones
function setRepeticiones(valor){
    //console.log ("setRepeticiones", valor); 
    document.getElementById('txtRepeticiones').value=valor;
}

//  asignamos etiquetas solas
function setSol(valor){
    //console.log ("setSol", valor); 
    document.getElementById('txtSol').value=valor;
}

// activamos la presentacion de la cotizacion
function setCbbTip(valor){
    //console.log ("setCbbTip",valor);
    /*
    <select id='cbbTip' name='cbbTip' class="form-control-sm" style='width:95% !important'>
        <option value='1'>Etiquetas</option> E
        <option value='2'>Rollos</option> R
        <option value='3'>Hojas</option> H 
        <option value='4'>Millar</option> M
    </select>    
    */
    switch (valor){
        case "E":
            document.getElementById('cbbTip').value="Etiquetas";
            break;
        case "R":
            document.getElementById('cbbTip').value="Rollos";
            break;    
        case "H":
            document.getElementById('cbbTip').value="Hojas";
            break;  
        case "M":
            document.getElementById('cbbTip').value="Millar";
            break;                                      
    }
}

//  asignamos las observaciones
function setObservaciones(valor){
    //console.log ("setObservaciones", valor); 
    document.getElementById('txtObservaciones').value=valor;
}

/*****************************************************************************/
/* objetos de la seccion de presentacion                                     */
/*****************************************************************************/
//  asignamos cantidad de N por Presentacion
function setNPresentacion(valor){
     //console.log ("setObservaciones", valor); 
    document.getElementById('cantNPre').value=valor;
}


//  asignamos Canales a Despachar
function setCanalesDespachar(valor){
     //console.log ("setObservaciones", valor); 
    document.getElementById('canalesDesp').value=valor;
}


//  asignamos Canales a Despachar
function setCantidadCores(valor){
    //console.log ("setCantidadCores", valor); 
    document.getElementById('cantCores').value=Math.round(valor);
}

//  asignamos dobladas cada Cuanto
function setDobladasCada(valor){
    //console.log ("setDobladasCada", valor); 
    document.getElementById('txtDobladasCada').value=valor;
}

//  asignamos Nombre de la Etiqueta
function setNombreEtiqueta(valor){
    //console.log ("setNombreEtiqueta", valor);
    document.getElementById('nombreEtiqueta').value=valor;
    
}

// esta funcion cambia el nombre de la etiqueta en el header
function setNombreEtiquetaHeader(valor){
    document.getElementById('desArtHeader').innerHTML=valor;
}

//  asignamos Cantidad de Etiquetas por Pagina
function setCantidadEtiquetasxPaginas(valor){
    //console.log ("setCantidadEtiquetasxPaginas", valor);
    document.getElementById('cantEtqxPag').value=valor;
}

//  asignamos Costos por Impresion
function setCostoXImpresion(valor){
    //console.log ("setCostoXImpresion", valor);
    document.getElementById('txtCostoPorImpresion').value=parseFloat(valor).toFixed(4);
}

//  asignamos Totales cotiz por Rollos
function setTotalCotizacionxRollos(valor){
    //console.log ("setTotalCotizacionxRollos", valor);
    document.getElementById('totalCotizxRollos').value=valor;
}

//  asignamos el texto del ribbon
function setTextoRibbon(valor){
    //console.log ("setTextoRibbon", valor);
    return (document.getElementById('ribbonTexto').value.trim());
}

//  asignamos la numeracion desde del ribbon
function setDesdeRibbon(valor){
    //console.log ("setDesdeRibbon", valor);
    document.getElementById('numeracionDesde').value=valor;
}

//  asignamos la numeracion hasta del ribbon
function setHastaRibbon(valor){
    //console.log ("setHastaRibbon", valor);
    document.getElementById('numeracionHasta').value=valor;
}

//  asignamos texto signado
function setTextosignado(valor){
    //console.log ("setTextosignado", valor);
    document.getElementById('txtUtilizaSignado').value=valor;
}

//  asignamos pulgadas
function setPulgadasSignado(valor){
    //console.log ("setPulgadasSignado", valor);
    document.getElementById('signadoPulgadas').value=valor;
}

//  asignamos cadaXEtq
function setCadaXEtq(valor){
    //console.log ("setCadaXEtq", valor);
    document.getElementById('signadoCadaXEtq').value=valor;
}

// asignamos el precio por rollos
function setPrecioXRollo(){
    //console.log ("setPrecioXRollo", valor);
    document.getElementById('txtPrecxRollos').value=parseFloat(valor);    

}

// asigna el tipo de etiqueta 
function setTipoEtiqueta(valor){
    //console.log (">> entrando setTipoEtiqueta",valor);
    switch (valor){
        case "N":
            document.getElementById('TipoEtiqueta0').checked=true; // nueva
            document.getElementById('TipoEtiqueta1').checked=false; // modificacion
            document.getElementById('TipoEtiqueta2').checked=false; // repeticion         
            document.getElementById('TipoEtiqueta3').checked=false; // blanco          
            document.getElementById('TipoEtiqueta4').checked=false; // fondeada
            clickTipoEtiquetaNueva();
            break;
        case "M":
            document.getElementById('TipoEtiqueta0').checked=false; // nueva
            document.getElementById('TipoEtiqueta1').checked=true; // modificacion
            document.getElementById('TipoEtiqueta2').checked=false; // repeticion         
            document.getElementById('TipoEtiqueta3').checked=false; // blanco          
            document.getElementById('TipoEtiqueta4').checked=false; // fondeada
            clickTipoEtiquetaModificacion();
            break;  
        case "R":
            document.getElementById('TipoEtiqueta0').checked=false; // nueva
            document.getElementById('TipoEtiqueta1').checked=false; // modificacion
            document.getElementById('TipoEtiqueta2').checked=true; // repeticion         
            document.getElementById('TipoEtiqueta3').checked=false; // blanco          
            document.getElementById('TipoEtiqueta4').checked=false; // fondeada
            clickTipoEtiquetaRepeticion();
            break;   
        case "B":
            document.getElementById('TipoEtiqueta0').checked=false; // nueva
            document.getElementById('TipoEtiqueta1').checked=false; // modificacion
            document.getElementById('TipoEtiqueta2').checked=false; // repeticion         
            document.getElementById('TipoEtiqueta3').checked=true; // blanco          
            document.getElementById('TipoEtiqueta4').checked=false; // fondeada
            clickTipoEtiquetaBlanco();
            break;  
        case "F":
            document.getElementById('TipoEtiqueta0').checked=false; // nueva
            document.getElementById('TipoEtiqueta1').checked=false; // modificacion
            document.getElementById('TipoEtiqueta2').checked=false; // repeticion         
            document.getElementById('TipoEtiqueta3').checked=false; // blanco          
            document.getElementById('TipoEtiqueta4').checked=true; // fondeada
            clickTipoEtiquetaFondeado();
            break;                                        
    }
}





/**********************************************************************************/
/* objetos de la div de costos                                                    */
/**********************************************************************************/
//  asignamos el codigo del material
function setCodigoMaterial(valor){
    //console.log ("setCodigoMaterial", valor);
    document.getElementById('codigoMaterial').value=valor;
}

//  asignamos el codigo del material
function setDescripcionMaterial(valor){
    //console.log ("setDescripcioMaterial", valor);
    document.getElementById('descripcionMaterial').value=valor;
}

//  asignamos el Costo del Material
function setCostoMaterial(valor){
    //console.log ("txtCostoMaterial", valor);
    document.getElementById('txtCostoMaterial').value=parseFloat(valor).toFixed(4);
}

//  asignamos el Costo total del Material
function setCostoTotalMaterial(valor){
    //console.log ("setCostoTotalMaterial", valor);
    document.getElementById('txtCostoTotalMaterial').value=parseFloat(valor).toFixed(4);
}

//  asignamos el Costo de la Etiqueta
function setCostoEtiqueta(valor){
    //console.log ("setCostoEtiqueta", valor);
    document.getElementById('txtCostoEtiqueta').value=parseFloat(valor).toFixed(4);
}

//  asignamos la Cantidad de Colores
function setCantidadColores(valor){
    //console.log ("setCantidadColores", valor);
    document.getElementById('txtCantidadColores').value=valor;
}

//  asignamos el precio de los colores
function setPrecioColores(valor){
    //console.log ("setPrecioColores", valor);
    document.getElementById('txtPrecioColores').value=parseFloat(valor);
}

//  asignamos el precio Total de los colores
function setPrecioTotalColores(valor){
    //console.log ("setPrecioTotalColores", valor);
    document.getElementById('txtPrecioTotalColores').value=valor;
}

//  asignamos el precio Total de los colores
function setPrecioClishe(valor){
    //console.log ("setPrecioClishe", valor);
    document.getElementById('txtPrecioClishe').value=parseFloat(valor).toFixed(2);
}

//  asignamos el precio del transporte
function setPorcentajeTransporte(valor){
    //console.log ("setPorcentajeTransporte", valor);
    document.getElementById('txtPorcentajeTransporte').value=parseFloat(valor);
}

//  asignamos el costo del transporte
function setCostoTransporte(valor){
    //console.log ("setCostoTransporte", valor);
    document.getElementById('txtCostoTransporte').value=parseFloat(valor).toFixed(4);
}

//  asignamos Porcentaje Mano de Obra
function setPorcentajeManoObra(valor){
    //console.log ("setPorcentajeManoObra", valor);
    document.getElementById('txtPorcentajeManoObra').value=parseFloat(valor);
}

//  asignamos Costo Mano de Obra
function setCostoManoObra(valor){
    //console.log ("setCostoManoObra", valor);
    document.getElementById('txtCostoManoObra').value=parseFloat(valor).toFixed(4);
}

//  asignamos Suma de Costos Seccion de Costos
function setSumacostos(valor){
    //console.log ("setSumacostos", valor);
    document.getElementById('txtSumaCostos').value=parseFloat(valor).toFixed(4);
}

//  asignamos Costo Total
function setCostoTotal(valor){
    //console.log ("setCostoTotal", valor);
    document.getElementById('txtCostoTotal').value=parseFloat(valor).toFixed(4);
}

//  asignamos Fator
function setFactor(valor){
    //console.log ("setFactor", valor);
    document.getElementById('txtFactor').value=valor;
}

//  asignamos el Costo de Material por Etiquetas
function setCostoMaterialPorEtiqueta(valor){
    //console.log ("setCostoMaterialPorEtiqueta", valor);
    document.getElementById('txtCostoMaterialXEtiqueta').value=parseFloat(valor).toFixed(4);
}

//  asignamos el Costo del Foil 1
function setCostoFoil1(valor){
    //console.log ("setCostoFoil1", valor);
    document.getElementById('txtCostoFoil1').value=parseFloat(valor).toFixed(4);
}

//  asignamos el Costo del Foil 2
function setCostoFoil2(valor){
    //console.log ("setCostoFoil2", valor);
    document.getElementById('txtCostoFoil2').value=parseFloat(valor).toFixed(4);
}

//  asignamos el Precio de la Etiqueta
function setPrecioEtiqueta(valor){
    console.log ("setPrecioEtiqueta", valor);
    document.getElementById('txtPrecioEtiqueta').value=parseFloat(valor).toFixed(4);
}

//  asignamos el Costo del Desperdicio de Bobina
function setCostoDesperdicioBobina(valor){
    //console.log ("setCostoDesperdicioBobina", valor);
    document.getElementById('txtCostoDespBobina').value=parseFloat(valor).toFixed(4);
}

//  asignamos la Diferencia por Ancho
function setDifAncho(valor){
    //console.log ("setDifAncho", valor);
    document.getElementById('txtDifAncho').value=valor;
}

//  asignamos El Costo Total del Foil
function setCostoTotalFoil(valor){
    //console.log ("setCostoTotalFoil", valor);
    document.getElementById('txtCostoTotalFoil').value=valor;
}

//  asignamos el Ancho del Foil
function setAnchoFoil(valor){
    //console.log ("setAnchoFoil", valor);
    document.getElementById('txtAnchoFoil').value=valor;
}

//  asignamos el Color del Foil 1
function setColorFoil1(valor){
    //console.log ("setColorFoil1", valor);
    document.getElementById('txtColorFoil1').value=valor;
}

//  asignamos el Color del Foil 2
function setColorFoil2(valor){
    //console.log ("setColorFoil2", valor);
    document.getElementById('txtColorFoil2').value=valor;
}

//  asignamos el Descuento
function setDescuento(valor){
    //console.log ("setDescuento", valor);
    document.getElementById('txtDescuento').value=parseFloat(valor).toFixed(4);
}

//  asignamos el Texto del Sandwich
function setSandwich(valor){
    //console.log ("setSandwich", valor);
    document.getElementById('txtSandwich').value=valor;
}

//  asignamos la Descripcion del Sandwich
function setDescripcionSandwich(valor){
    //console.log ("setDescripcionSandwich", valor);
    document.getElementById('txtDescripcionSandwich').value=valor;
}

//  asignamos el Costo del Sandwich
function setCostoSandwich(valor){
    //console.log ("setCostoSandwich", valor);
    document.getElementById('txtCostoSandwich').value=valor;
}

//  asignamos el codigo del laminado
function setCodigoLaminado(valor){
    //console.log ("setCodigoLaminado", valor);
    document.getElementById('codigoLaminado').value=valor;
}

//  asignamos el codigo del laminado
function setDescripcionLaminado(valor){
    //console.log ("setDescripcionLaminado", valor);
    document.getElementById('descripcionLaminado').value=valor;
}

//  asignamos el costo del Laminado
function setCostoLaminado(valor){
    //console.log ("setCostoLaminado", valor);
    document.getElementById('costoLaminado').value=valor;
}

// asignamos el Costo de Material Por Etiquetas
function setCostoMaterialXEtiquetas(valor){
    //console.log ("setCostoMaterialXEtiquetas", valor);
    document.getElementById('txtCostoMaterialXEtiqueta').value=parseFloat(valor).toFixed(4);
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
    //console.log ("setResumenAnchoEtiqueta", valor);
    document.getElementById('txtResumenAnchoEtiqueta').value=valor;
}

//  asignamos Avance de la etiqueta en el Resumen
function setResumenAvanceEtiqueta(valor){
    //console.log ("setResumenAvanceEtiqueta", valor);
    document.getElementById('txtResumenAvanceEtiqueta').value=valor;
}

//  asignamos Separacion de la etiqueta en el Resumen
function setResumenSeparacionEtiqueta(valor){
    //console.log ("setResumenSeparacionEtiqueta", valor);
    document.getElementById('txtResumenSeparacionEtiqueta').value=valor;
}

//  asignamos Canales de la etiqueta en el Resumen
function setResumenCanalesEtiqueta(valor){
    //console.log ("setResumenCanalesEtiqueta", valor);
    document.getElementById('txtResumenCanales').value=valor;
}

//  asignamos Canales de la etiqueta en el Resumen
function setResumenCantidadEtiqueta(valor){
    //console.log ("setResumenCantidadEtiqueta", valor);
    document.getElementById('txtResumenCantidadEtiquetas').value=valor;
}

//  asignamos Cantidad por Presentacion en el Resumen
function setResumenCantidadPorPresentacion(valor){
    //console.log ("setResumenCantidadPorPresentacion", valor);
    document.getElementById('cantPorPre').value=valor;
}

//  asignamos el Diametro del Core en el Resumen
function setResumenDiametroCore(valor){
    //console.log ("setResumenDiametroCore", valor);
    document.getElementById('diametroCore').value=valor;
}

//  asignamos Cantidad a Despachar en el Resumen
function setResumenCantidadADespachar(valor){
    //console.log ("setResumenCantidadADespachar", valor);
    document.getElementById('canADesp').value=valor;
}

//  asignamos Cantidad de Cores en el Resumen
function setResumenCantidadCores(valor){
    //console.log ("setResumenCantidadCores", valor);
    document.getElementById('txtResumenCantCores').value=valor;
}

//  asignamos Embobinado en el Resumen
function setResumenEmbobinado(valor){
    //console.log ("setResumenEmbobinado", valor);
    document.getElementById('embobinado').value=valor;
}


//  asignamos Costo del Material en el Resumen
function setResumenCostoMateriales(valor){
    //console.log ("setResumenCostoMateriales", valor);
    document.getElementById('resumenCostoMateriales').value=parseFloat(valor).toFixed(4);
}


//  asignamos Costo del Material en el Resumen
function setResumenCostoEtiqueta(valor){
    //console.log ("setResumenCostoEtiqueta", valor);
    document.getElementById('resumenCostoEtq').value=parseFloat(valor).toFixed(4);
}

//  asignamos Suma de Costos en el Resumen
function setResumenSumaCostos(valor){
    //console.log ("setResumenSumaCostos", valor);
    document.getElementById('resumenSumaCostos').value=parseFloat(valor).toFixed(4);
}

//  asignamos Suma de Costos en el Resumen
function setResumenCostoTotal(valor){
    //console.log ("setResumenCostoTotal", valor);    
    document.getElementById('resumenCostoTotal').value=parseFloat(valor).toFixed(4);
}

//  asignamos Factor en el Resumen
function setResumenFactor(valor){
    //console.log ("setResumenFactor", valor);        
    document.getElementById('resumenFactor').value=valor;
}


//  asignamos Precio del Color en el Resumen
function setResumenPrecioColor(valor){
    //console.log ("setResumenPrecioColor", valor);        
    document.getElementById('resumenPrecioColor').value=valor;
}

//  asignamos Total del Color en el Resumen
function setResumenTotalColor(valor){
    //console.log ("setResumenTotalColor", valor);
    document.getElementById('resumenTotalColor').value=valor;
}


//  asignamos Precio del clishe en el Resumen
function setResumenPrecioClishe(valor){
    //console.log ("setResumenPrecioClishe", valor);
    document.getElementById('resumenPrecioClishe').value=parseFloat(valor).toFixed(2);
}

//  asignamos total del clishe en el Resumen
function setResumenTotalClishe(valor){
    //console.log ("setResumenTotalClishe", valor);    
    document.getElementById('resumenTotalClishe').value=parseFloat(valor).toFixed(2);
}


//  asignamos Precio de la Etiqueta en el Resumen
function setResumenPrecioEtiqueta(valor){
    //console.log ("setResumenPrecioEtiqueta", valor);        
    document.getElementById('resumenPrecioEtq').value=parseFloat(valor).toFixed(4);
}

//  asignamos comision en el Resumen
function setResumenComision(valor){
    //console.log ("setResumenComision", valor);    
    document.getElementById('comision').value=parseFloat(valor).toFixed(2);
}

//  asignamos Monto Etiqueta en el Resumen
function setResumenMontoEtiqueta(valor){
    //console.log ("setResumenMontoEtiqueta", valor);  
    document.getElementById('resumenMontoEtq').value=parseFloat(valor).toFixed(2);
}

//  asignamos Monto Neto en el Resumen
function setResumenMontoNeto(valor){
    //console.log ("setResumenMontoNeto", valor);  
    document.getElementById('resumenMontoNeto').value=parseFloat(valor).toFixed(2);
}


//  asignamos Iva en el Resumen
function setResumenIva(valor){
    //console.log ("setResumenIva", valor);
    document.getElementById('iva').value=parseFloat(valor).toFixed(2);
}

//  asignamos Monto Total en el Resumen
function setResumenMontoTotal(valor){
    //console.log ("setResumenMontoTotal", valor);
    document.getElementById('resumenMontoTotal').value=parseFloat(valor).toFixed(2);
}

//  asignamos Status en el Resumen
function setResumenStatus(valor){
    //console.log ("setResumenStatus", valor);

    // 2. Obtener el elemento <select> por su ID
    const selectElement = document.getElementById('status');

    // 3. Iterar sobre las opciones para encontrar la que coincide con el estado
    for (let i = 0; i < selectElement.options.length; i++) {
        const option = selectElement.options[i];
        // Comparamos el TEXTO de la opción (ej: 'Normal') con el valor de la variable
        if (option.text === valor) {
            // Establecer esta opción como seleccionada
            option.selected = true;
            // Salir del bucle una vez que se encuentra la opción
            break; 
        }
    }
}

// asignamos la cantidad de clishe adicionales
function setCantidadClisheAdicional(valor){
    //console.log (">> entrando setCantidadClisheAdicional",valor);
    document.getElementById('txtClisheAdicional').value=parseInt(valor);
}

// esta funcion activa la impresion con ribbon
function activaImpresionRibbon(){
    //console.log (">> entrando activaImpresionRibbon",valor);
    document.getElementById('chkTextoRibbon').checked=true;
}


// esta funcion desactiva la imprsion con ribbon
function desactivaImpresionRibbon(){
    //console.log (">> entrando activaImpresionRibbon",valor);
    document.getElementById('chkTextoRibbon').checked=false;
}

// esta funcion se isa para almacenar el resultado de una variable proveniente de CEP
function setnVarRepvm(valor){
    document.getElementById('nVarRepvm').value=valor;
}

// esta funcion se utiliza para asignar el valor del monto descontado, proveniente del cambio del
// porcentaje de descuento
function setMontoDescontado(valor){
    document.getElementById('montoDescontado').value=parseFloat(valor).toFixed(4);
}

// esta funcion se utiliza para asignar el valor del ancho del laminado, proveniente de la carga de datos
// de cotizacion
function setAnchoLaminado(valor){
    document.getElementById('anchoLaminado').value=parseFloat(valor).toFixed(4);
}



