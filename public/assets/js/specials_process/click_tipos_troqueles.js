/**
 * @fileoverview Script para controlar la lógica de la interfaz de usuario
 * al seleccionar diferentes tipos de troqueles.
 */

/**
 * Gestiona el comportamiento de la interfaz de usuario cuando se selecciona
 * el tipo de troquel "Físico".
 * Oculta los campos relacionados con la repetición de cotizaciones
 * y busca un código de troquel preexistente en los comentarios almacenados.
 */
function clickTipoTroquelFisico() {
    console.log("-------------------- Iniciando: Tipo Troquel Físico --------------------");

    // Ocultar campos de repetición de cotización
    document.getElementById('lblDientes').style.display = "none";
    document.getElementById('txtDientes').style.display = "none";
    document.getElementById('lblRepeticiones').style.display = "none";
    document.getElementById('txtRepeticiones').style.display = "none";

    // Habilitar y limpiar el campo del código de troquel
    document.getElementById('txtCodigoTroquelSuperficie').value = "";
    document.getElementById('txtCodigoTroquelSuperficie').disabled = false;

    // Buscar el código del troquel en los comentarios si existe en el almacenamiento local
    const storedArray = localStorage.getItem('myArrayKey');

    if (storedArray) {
        // Obtener el renglón activo del header
        const renglonActivo = parseInt(document.getElementById('nRenglonHeader').innerHTML, 10);
        const myPersistentArray = JSON.parse(storedArray);
        const cComentario = myPersistentArray[renglonActivo]['ccomentario'];

        // Si existen comentarios, buscar el código del troquel
        if (cComentario && cComentario.trim().length > 0) {
            const cadenaResult = cdd(cComentario, "TroCod");
            const result = JSON.parse(cadenaResult);

            if (result[0] === "1") {
                const valor = result[1];
                document.getElementById('txtCodigoTroquelSuperficie').value = valor;
            }
        }
    }

    // Habilitar/deshabilitar campos según el tipo de cotización
    const esFlexografica = document.getElementById('tipoCotiz0').checked;
    if (esFlexografica) {
        document.getElementById('txtAnchoEtiqueta').disabled = true;
        document.getElementById('txtAvanceEtiqueta').disabled = true;
        document.getElementById('txtCanales').disabled = false;
    } else { // Es digital
        document.getElementById('txtAvanceEtiqueta').disabled = true;
        document.getElementById('txtCanales').disabled = true;
    }
    desactivaAvanceEtiqueta();

    // Realizar cálculo de ancho de bobina si los campos obligatorios están llenos
    const spiAncho = parseFloat(document.getElementById('txtAnchoEtiqueta').value) || 0;
    const spiCanales = parseInt(document.getElementById('txtCanales').value, 10) || 0;
    const spiSeparacion = parseFloat(document.getElementById('txtSeparacionEtiqueta').value) || 0;

    if (spiAncho !== 0 && spiCanales !== 0 && spiSeparacion !== 0) {
        calculos7();
    }

    console.log("-------------------- Finalizado: Tipo Troquel Físico --------------------");
}

/**
 * Gestiona el comportamiento de la interfaz de usuario cuando se selecciona
 * el tipo de troquel "Láser".
 * Muestra el campo de repeticiones y establece el código de troquel a "LASER".
 */
function clickTipoTroquelLaser() {
    console.log("-------------------- Iniciando: Tipo Troquel Láser --------------------");

    // Ocultar campo de dientes y mostrar el de repeticiones
    document.getElementById('lblDientes').style.display = "none";
    document.getElementById('txtDientes').style.display = "none";
    document.getElementById('lblRepeticiones').style.display = "none";
    document.getElementById('txtRepeticiones').style.display = "none";

    // Establecer el código del troquel como "LASER" y deshabilitar el campo
    document.getElementById('txtCodigoTroquelSuperficie').value = "LASER";
    document.getElementById('txtCodigoTroquelSuperficie').disabled = true;

    // Habilitar/deshabilitar campos según el tipo de cotización
    const esFlexografica = document.getElementById('tipoCotiz0').checked;
    if (esFlexografica) {
        document.getElementById('txtAnchoEtiqueta').disabled = false;
        document.getElementById('txtCanales').disabled = false;
        document.getElementById('chkRepCotizacion').style.display = "block";
        document.getElementById('lblRepCotizacion').style.display = "block";
    } else { // Es digital
        document.getElementById('txtAvanceEtiqueta').disabled = true;
    }
    activaAvanceEtiqueta();

    // Realizar cálculo de ancho de bobina si los campos obligatorios están llenos
    const spiAncho = parseFloat(document.getElementById('txtAnchoEtiqueta').value) || 0;
    const spiCanales = parseInt(document.getElementById('txtCanales').value, 10) || 0;
    const spiSeparacion = parseFloat(document.getElementById('txtSeparacionEtiqueta').value) || 0;
    
    if (spiAncho !== 0 && spiCanales !== 0 && spiSeparacion !== 0) {
        calculos7();
    }

    console.log("-------------------- Finalizado: Tipo Troquel Láser --------------------");
}

/**
 * Gestiona el comportamiento de la interfaz de usuario cuando se selecciona
 * el tipo de troquel "Nuevo".
 * Muestra los campos de dientes y repeticiones y establece el código a "NUEVO".
 */
function clickTipoTroquelNuevo() {
    console.log("-------------------- Iniciando: Tipo Troquel Nuevo --------------------");

    // Mostrar campos de dientes y repeticiones
    document.getElementById('lblDientes').style.display = "block";
    document.getElementById('txtDientes').style.display = "block";
    document.getElementById('lblRepeticiones').style.display = "block";
    document.getElementById('txtRepeticiones').style.display = "block";

    // Establecer el código del troquel como "NUEVO" y deshabilitar el campo
    document.getElementById('txtCodigoTroquelSuperficie').value = "NUEVO";
    document.getElementById('txtCodigoTroquelSuperficie').disabled = true;

    // Habilitar/deshabilitar campos según el tipo de cotización
    const esFlexografica = document.getElementById('tipoCotiz0').checked;
    if (esFlexografica) {
        document.getElementById('txtAnchoEtiqueta').disabled = false;
        document.getElementById('txtAvanceEtiqueta').disabled = false;
        document.getElementById('txtCanales').disabled = false;
    } else { // Es digital
        document.getElementById('txtAvanceEtiqueta').disabled = true;
    }

    // Realizar cálculo de ancho de bobina si los campos obligatorios están llenos
    const spiAncho = parseFloat(document.getElementById('txtAnchoEtiqueta').value) || 0;
    const spiCanales = parseInt(document.getElementById('txtCanales').value, 10) || 0;
    const spiSeparacion = parseFloat(document.getElementById('txtSeparacionEtiqueta').value) || 0;
    
    if (spiAncho !== 0 && spiCanales !== 0 && spiSeparacion !== 0) {
        calculos7();
    }

    console.log("-------------------- Finalizado: Tipo Troquel Nuevo --------------------");
}

/**
 * Gestiona el comportamiento de la interfaz de usuario cuando se selecciona
 * el tipo de troquel "No Aplica".
 * Oculta los campos de dientes y repeticiones y establece el código a "NO APLICA".
 */
function clickTipoTroquelNoAplica() {
    console.log("-------------------- Iniciando: Tipo Troquel No Aplica --------------------");

    // Ocultar campos de dientes y repeticiones
    document.getElementById('lblDientes').style.display = "none";
    document.getElementById('txtDientes').style.display = "none";
    document.getElementById('lblRepeticiones').style.display = "none";
    document.getElementById('txtRepeticiones').style.display = "none";

    // Establecer el código del troquel como "NO APLICA" y deshabilitar el campo
    document.getElementById('txtCodigoTroquelSuperficie').value = "NO APLICA";
    document.getElementById('txtCodigoTroquelSuperficie').disabled = true;

    // Habilitar/deshabilitar campos según el tipo de cotización
    const esFlexografica = document.getElementById('tipoCotiz0').checked;
    if (esFlexografica) {
        document.getElementById('txtAnchoEtiqueta').disabled = false;
        document.getElementById('txtAvanceEtiqueta').disabled = false;
        document.getElementById('txtCanales').disabled = false;
    } else { // Es digital
        document.getElementById('txtAvanceEtiqueta').disabled = false;
    }

    console.log("-------------------- Finalizado: Tipo Troquel No Aplica --------------------");
}

/**
 * Gestiona el comportamiento de la interfaz de usuario cuando se selecciona
 * el tipo de troquel "Tipográfico".
 * Oculta los campos de dientes y repeticiones y establece el código a "TIPOGRAFICO".
 */
function clickTipoTroquelTipografico() {
    console.log("-------------------- Iniciando: Tipo Troquel Tipográfico --------------------");

    // Ocultar campos de dientes y repeticiones
    document.getElementById('lblDientes').style.display = "none";
    document.getElementById('txtDientes').style.display = "none";
    document.getElementById('lblRepeticiones').style.display = "none";
    document.getElementById('txtRepeticiones').style.display = "none";

    // Establecer el código del troquel como "TIPOGRAFICO" y habilitar el campo
    document.getElementById('txtCodigoTroquelSuperficie').value = "TIPOGRAFICO";
    document.getElementById('txtCodigoTroquelSuperficie').disabled = false;

    console.log("-------------------- Finalizado: Tipo Troquel Tipográfico --------------------");
}

