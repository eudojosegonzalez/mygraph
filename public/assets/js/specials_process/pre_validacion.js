function preValidar(){
    try {
        console.log ("Entrando preValidar");
        paso=1;

        //validamos los objetos de la seccion generales
        document.getElementById('txtCodigoTroquelSuperficie').style.backgroundColor="#FFFFFF";
        //document.getElementById('txtTroquelBase').style.backgroundColor="#ffffff";

        // limpiamos los objetos de medidas
        document.getElementById('txtAnchoEtiqueta').style.backgroundColor="#FFFFFF";
        document.getElementById('selAnchoEtiqueta').style.backgroundColor="#FFFFFF";
        document.getElementById('txtAvanceEtiqueta').style.backgroundColor="#FFFFFF";
        document.getElementById('txtSeparacionEtiqueta').style.backgroundColor="#FFFFFF";
        document.getElementById('txtCanales').style.backgroundColor="#FFFFFF";
        document.getElementById('txtRepeticionesTroquel').style.backgroundColor="#FFFFFF";
        document.getElementById('txtCantidadEtiquetas').style.backgroundColor="#FFFFFF";
        document.getElementById('txtPorcentajeSeguridad').style.backgroundColor="#FFFFFF";
        document.getElementById('txtAnchoBobina').style.backgroundColor="#FFFFFF";
        document.getElementById('txtLargoTotalEtiqueta').style.backgroundColor="#FFFFFF";
        document.getElementById('txtCmsLineales').style.backgroundColor="#FFFFFF";
        document.getElementById('txtCmsLinealesTotales').style.backgroundColor="#FFFFFF";
        document.getElementById('txtCmsClishe').style.backgroundColor="#FFFFFF";
        document.getElementById('txtMtrs2Bobina').style.backgroundColor="#FFFFFF";
        document.getElementById('txtMetrosLineales').style.backgroundColor="#FFFFFF";
        document.getElementById('txtMtrs2Etiqueta').style.backgroundColor="#FFFFFF";
        
        document.getElementById('txtCodigoEtiqueta').style.backgroundColor="#FFFFFF";
        document.getElementById('txtDientes').style.backgroundColor="#FFFFFF";
        document.getElementById('txtRepeticiones').style.backgroundColor="#FFFFFF";

        document.getElementById('txtSol').style.backgroundColor="#FFFFFF"; 
        document.getElementById('txtMtrs2Etiqueta').style.backgroundColor="#FFFFFF"; 

        //validamos los objetos de la seccion Presentacion
        document.getElementById('txtDobladasCada').style.backgroundColor="#FFFFFF";

        //validamos los objetos de la seccion Costos

        //validamos los objetos de la seccion Resumen
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error preValidar");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 

    



   /*
    original foxpro
    //	METODO QUE HACE LA VALIDACION DE LOS DATOS ANTES DE GUARDAR	\*

    //	PARAMETRO	\*
    LPARAMETERS bTMP_VAL

    // ******************************************************************************
    // * agregado el 2025-02-19
    // * inicializamos los cuadro de texto de ancho y colores de los foils
    // thisform.pagFr1.pag003.txtColorFoil1.BackColor=RGB(255,255,255)
    //thisform.pagFr1.pag003.txtColorFoil2.BackColor=RGB(255,255,255)
    //thisform.pagFr1.pag003.txtAnchoFoil.BackColor=RGB(255,255,255)
    // ******************************************************************************
                        
    //	PAGE 1 (GENERAL)	\*
    WITH THISFORM.PAGFR1.PAG001
        //	DO CASE	\*
        DO CASE
            //	COTIZACION FLEXO	\*
            CASE .OPTGR1.OPTFLX.VALUE = 1
                //	VALIDA QUE TENGA DATOS EL TROQUEL	\*
                IF EMPTY(.TXTCTR.VALUE) AND .OPTGR2.OPT001.VALUE = 1
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX(	" No ha definido un Troquel de superficie a utilizar" + CHR(13) + ;
                                "                por favor verifique                ", 0 + 48, cTMP_TIT)
                    THISFORM.PAGFR1.ACTIVEPAGE = 1
                    .TXTCTR.SETFOCUS
                    bTMP_VAL = .F.
                    //	DETIENE EL METODO	\*
                    RETURN .F.
                ENDIF
                //	VALIDA QUE TENGA DATOS EL ANCHO	\*
                IF .SPIANC.VALUE = 0.00 THEN
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX("Ingrese el ancho de Etiqueta", 0 + 16, cTMP_TIT)
                    THISFORM.PAGFR1.ACTIVEPAGE = 1
                    .SPIANC.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF
                //	OPCION NINGUNO	\*
                IF .OPTGR2.OPTNIN.VALUE = 1
                    //	REPETICIONES DEL TROQUEL	\*
                    IF .TXTREP.VALUE = 0
                        //	MENSAJE DE SISTEMA	\*
                        MESSAGEBOX("Ingrese la cant. de Repeticiones del Troquel", 0 + 16, cTMP_TIT)
                        THISFORM.PAGFR1.ACTIVEPAGE = 1
                        .TXTREP.SETFOCUS
                        bTMP_VAL = .F.
                        RETURN .F.
                    ENDIF
                    //	DIENTES DEL TROQUEL	\*
                    IF .TXTDIE.VALUE = 0
                        //	MENSAJE DE SISTEMA	\*
                        MESSAGEBOX("Ingrese la cant. de Dientes del Troquel", 0 + 16, cTMP_TIT)
                        THISFORM.PAGFR1.ACTIVEPAGE = 1
                        .TXTDIE.SETFOCUS
                        bTMP_VAL = .F.
                        RETURN .F.
                    ENDIF
                ENDIF
                *	Valida si usa troquel Laser y no ha definido las repeticiones
                IF ALLTRIM(UPPER((.TXTCTR.VALUE))) $ "LASER" AND .TXTREP.VALUE = 0
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX("Ingrese la cant. de Repeticiones del Troquel", 0 + 16, cTMP_TIT)
                    THISFORM.PAGFR1.ACTIVEPAGE = 1
                    .TXTREP.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF 
            //	COTIZACION INDIGO	\*
            CASE .OPTGR1.OPTIND.VALUE = 1
                //	VALIDA QUE TENGA DATOS EL ANCHO	\*
                IF EMPTY(.COBANC.VALUE) = .T. THEN
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX("Debe seleccionar el ancho de Etiqueta", 0 + 16, cTMP_TIT)
                    THISFORM.PAGFR1.ACTIVEPAGE = 1
                    .COBANC.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF
                //	VALIDA QUE TENGA DATOS EL TROQUEL	\*
                IF EMPTY(.TXTCTR.VALUE)
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX(	" No ha definido un Troquel a utilizar" + CHR(13) + ;
                                "         por favor verifique ", 0 + 16, cTMP_TIT)
                        THISFORM.PAGFR1.ACTIVEPAGE = 1
                        .TXTCTR.SETFOCUS
                        bTMP_VAL = .F.
                        //	DETIENE EL METODO	\*
                        RETURN .F.
                ENDIF
        ENDCASE
        //	VALIDA LOS SIGUIENTES DATOS NO COMUNES	\*
        
        // AVANCE DE ETIQUETA	\*
        IF .SPIAVA.VALUE = 0.00 THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Indique el avance de la Etiqueta", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 1
            .SPIAVA.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.		
        ENDIF
        
        //	VALIDA LA CANTIDAD DE CANALES	\*
        IF .SPICAN.VALUE = 0 THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese la cantidad de canales a Fabricar la Etiqueta", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 1
            .SPICAN.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ENDIF
        
        //	VALIDA LA CANTIDAD DE ETIQUETAS	\*
        IF .TXTCET.VALUE = 0.00 THEN 
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese la Cant. de Etiquetas Solicitadas por el Cliente", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 1
            .TXTCET.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ENDIF
        
        //	% DE SEGURIDAD	\*
        IF .TXTPSE.VALUE = 0.00 THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese un Porcentaje de Seguridad valido", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 1
            .TXTPSE.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ENDIF
        
        bTMP_VAL = .T.	
    ENDWITH

    //	PAGE 2 (PRESENTACION)	\*
    WITH THISFORM.PAGFR1.PAG002

        //	PAQUETES	\*
        IF .OPTGR1.OPTPAQ.VALUE = 1
            IF .TXTDOB.VALUE = 0
                //	MENSAJE DE SISTEMA	\*
                IF MESSAGEBOX(	" No ha definido la cant de dobles por paquete" + CHR(13) + ;
                                "     ¿Desea continuar con la operación? ", 4 + 32, cTMP_TIT) = 7
                    THISFORM.PAGFR1.ACTIVEPAGE = 2
                    .TXTEXR.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF
            ENDIF
        ENDIF
        
        //	VALIDA LA CANT DE ETQ POR PRESENTACION	\*
        IF .TXTEXR.VALUE = 0 THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese la cant. de Etq por Presentación", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 2
            .TXTEXR.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ELSE
            IF .TXTEXR.VALUE > THISFORM.PAGFR1.PAG001.TXTCET.VALUE THEN
            
                //	MENSAJE DE SISTEMA	\*
                MESSAGEBOX("La Cant. por Presentación no puede ser mayor que las Etq. Solicitadas", 0 + 16, cTMP_TIT)
                THISFORM.PAGFR1.ACTIVEPAGE = 2
                .TXTEXR.SETFOCUS 
                bTMP_VAL = .F.
                RETURN .F. 
            ENDIF
        ENDIF
        
        //	VALIDA EL DIAMETRO DEL CORE	\*
        IF EMPTY(.TXTCOR.VALUE)
            //	MENSAJE DE SISTEMA	\*
            IF MESSAGEBOX(	" No ha definido un Diámetro del Core " + CHR(13) + ;
                            " ¿Desea continuar con la operación?", 4 + 32, cTMP_TIT) = 7
                THISFORM.PAGFR1.ACTIVEPAGE = 2
                .TXTCOR.SETFOCUS 
                bTMP_VAL = .F.
                RETURN .F.
            ENDIF 
        ENDIF
        
        //	VALIDA LA CANT DE CANALES A DESPACHAR	\*
        IF .SPICAN.VALUE = 0 THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese la Cant. de Canales a despachar las Etiquetas", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 2
            .SPICAN.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.				
        ENDIF
        
        //	DESCRIPCION DE LA ETIQUETA	\*
        IF EMPTY(.TXTETQ.VALUE) = .T. THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese la descripción de la Etiqueta", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 2
            .TXTETQ.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ENDIF
        
        //	VALIDA EL EMBOBINADO	\*
        IF EMPTY(.TXTEM1.VALUE) AND EMPTY(.TXTEM2.VALUE) AND (.ChkPeg.value) = 0
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX(	"Por favor defina un embobinado ó" + CHR(13) + ;
                        "active la casilla de pegado manual", 0 + 48, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 2
            .TXTEM1.SETFOCUS
            RETURN .F.
        ENDIF
        
        //	VALIDA LA NUMERACION CON RIBBON	\*
        IF .CHKRIB.VALUE = 1 THEN
            
            IF .CHECK1.VALUE = 1
                //	NUMERACION DESDE	\*
                IF EMPTY(.SPIDES.VALUE)
                
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX("Ingrese el inicio de la numeración con ribbon", 0 + 48, cTMP_TIT)
                    THISFORM.PAGFR1.ACTIVEPAGE = 2
                    .SPIDES.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF
                
                //	NUMERACION HASTA	\*
                IF EMPTY(.SPIHAS.VALUE)
                
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX("Ingrese la culminación de la numeración con ribbon", 0 + 48, cTMP_TIT)
                    THISFORM.PAGFR1.ACTIVEPAGE = 2
                    .SPIHAS.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF
            ENDIF
            
            IF .CHECK2.VALUE = 1
                IF EMPTY(.EDTDES.VALUE)
                    //	MENSAJE DE SISTEMA	\*
                    MESSAGEBOX("Ingrese la descripción con ribbon", 0 + 48, cTMP_TIT)
                    THISFORM.PAGFR1.ACTIVEPAGE = 2
                    .EDTDES.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF
            ENDIF
        ENDIF
        
        //	SIGNADO	\*
        IF .CHECK3.VALUE = 1
            //	DESCRIP	\*
            IF EMPTY(.TXTSIG.VALUE)
                //	MENSAJE DE SISTEMA	\*
                MESSAGEBOX("Ingrese el Signado a utilizar", 0 + 48, cTMP_TIT)
                THISFORM.PAGFR1.ACTIVEPAGE = 2
                .TXTSIG.SETFOCUS
                bTMP_VAL = .F.
                RETURN .F.
            ENDIF
            
            //	PULGADA	\*
            IF .SPIPUL.VALUE = 0 AND LEFT(.TXTSIG.VALUE, 1) = "S"
                //	MENSAJE DE SISTEMA	\*
                MESSAGEBOX("Ingrese la pulgada del Signado", 0 + 48, cTMP_TIT)
                THISFORM.PAGFR1.ACTIVEPAGE = 2
                .SPIPUL.SETFOCUS
                bTMP_VAL = .F.
                RETURN .F.
            ENDIF
        ENDIF
        * agregado el 2025-05-13 para validar que se haya seleccionado uno de los elementos en caso de etiqueta nueva
        IF (THISFORM.PAGFR1.PAG002.OPTGR3.OPTNUE.VALUE = 1)
                * verificamos si seleccion Arte en Red LAN o Levantar Arte
                IF (THISFORM.PAGFr1.Pag002.CHKRED.Value==0 and THISFORM.PAGFr1.Pag002.CHKLEV.Value==0) then
                    ** esta validacion se agrego el 2025-05-27 para verificar si la cotizacion está aprobada
                    ** esta vriable se carga en el evento locad del formulario						
                    IF (EstadoCotizacion="S")
                        MESSAGEBOX("Debe seleccionar una de las siguientes opciones"+CHR(13)+"Arte en Red LAN"+CHR(13)+"     o     "+CHR(13)+"Levantar Arte",0+16,cTMP_TIT)
                        RETURN (.f.)
                    endif
                ENDIF
                
                * verificamos si se escribio una observacion, esto es obligatorio en caso de ser una etiqueta nueva y ya esté aprobado por el cliente
                IF (LEN(ALLTRIM(thisform.pagFr1.pag001.edtObs.Value))<=10) then
                    ** esta validacion se agrego el 2025-05-27 para verificar si la cotizacion está aprobada
                    ** esta vriable se carga en el evento locad del formulario
                    IF (EstadoCotizacion="S") then
                        thisform.pagFr1.pag001.Click()
                        thisform.pagFr1.pag001.edtObs.SetFocus()
                        MESSAGEBOX("Las etiquetas Nuevas deben tener una observación obligatoria",0+16,cTMP_TIT)
                        RETURN (.f.)
                    endif
                endif
        ENDIF
            
        bTMP_VAL = .T.
    ENDWITH

    //	PAGE 3 (COSTOS)	\*
    WITH THISFORM.PAGFR1.PAG003
        //	VALIDA EL MATERIAL	\*
        IF EMPTY(.TXTCOM.VALUE) = .T. THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese el Material a utilizar", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 3
            .TXTCOM.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ENDIF
        
        //	VERIFICA LA CANT DE COLORES	\*
        IF .SPICOL.VALUE != 0 THEN
            //	VALIDA EL PRECIO DEL COLOR	\*
            IF .TXTPRC.VALUE = 0.00 THEN
                //	MENSAJE DE SISTEMA	\*
                MESSAGEBOX("Ingrese el precio por Color", 0 + 16, cTMP_TIT)
                THISFORM.PAGFR1.ACTIVEPAGE = 3
                .TXTPRC.SETFOCUS
                bTMP_VAL = .F.
                RETURN .F.
            ENDIF
            //	VALIDA EL PRECIO POR CLISHE	\*
            IF .TXTPCL.VALUE = 0.00
                //	MENSAJE DE SISTEMA	\*
                IF MESSAGEBOX(	" No ha definido el precio del clishe " + CHR(13) + ;
                                " ¿Desea continuar con la operación?", 4 + 32, cTMP_TIT) = 7
                    THISFORM.PAGFR1.ACTIVEPAGE = 3
                    .TXTPCL.SETFOCUS
                    bTMP_VAL = .F.
                    RETURN .F.
                ENDIF 
            ENDIF
        ELSE
            IF thisform.pagFr1.pag001.optGr1.optInd.Value = 1
                //	MENSAJE DE SISTEMA	\*
                MESSAGEBOX("Ingrese al menos un color", 0 + 16, cTMP_TIT)
                THISFORM.PAGFR1.ACTIVEPAGE = 3
                .SPICOL.SETFOCUS
                bTMP_VAL = .F.
                RETURN .F.
            ENDIF 
        ENDIF
        //	VALIDA EL FACTOR	\*
        IF .TXTFAC.VALUE = 0.0 THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Ingrese el Factor de venta", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 3
            .TXTFAC.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ENDIF
        
        //	VALIDA EL PRECIO DE LA ETIQUETA	\*
        IF .TXTPET.VALUE = 0.00 THEN
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Verifique el precio de Venta de la Etiqueta", 0 + 16, cTMP_TIT)
            THISFORM.PAGFR1.ACTIVEPAGE = 3
            .TXTPET.SETFOCUS
            bTMP_VAL = .F.
            RETURN .F.
        ENDIF
        
        //	VALIDA EL DESPERDICIO POR ANCHO DE BOBINA	\*
        IF .CHKDES.VALUE = 0 THEN
            //	VALIDA EL ANCHO ADICIONAL A COBRAR NO PUEDE SER < 0.00	\*
            IF .TXTDIF.VALUE < 0.00 THEN
                //	MENSAJE DE SISTEMA	\*
                MESSAGEBOX("El ancho por desperdicio de bobina adicional no puede ser " +STR(.TXTDIF.VALUE,5,2) + CHR(13) + ;
                            "       por favor verifique el ancho de bobina solicitado" + CHR(13) + ;
                            "            con el ancho disponible, recuerde que:" + CHR(13) + ;
                            "el ancho de bobina disponible debe ser mayor que el solicitado", 0 + 16, cTMP_TIT)
                bTMP_VAL = .F.
                RETURN .F.
            ENDIF					
        ENDIF
        
        ****************************************************************************************
        * agregado el 2025-02-19
        * eudo
        * validaciones de Foil
        * si existe un ancho debe existir un color en txtColorFoil1 o txtColorFoil2
        * se debe validar si existen Foil Seleccionados debe existir un ancho
        cVarFoil1=""
        cVarFoil2=""
        nVarAnchoFoil=0
        
        * tomamos el ancho
        nVarAnchoFoil=VAL(thisform.PagFr1.Pag003.txtAnchoFoil.Value)
        
        * tomamos el color del foil1
        cVarFoil1=ALLTRIM(thisform.PagFr1.Pag003.txtColorFoil1.Value)
        
        * tomamos el color del foil2
        cVarFoil2=ALLTRIM(thisform.PagFr1.Pag003.txtColorFoil2.Value)	
        
        *MESSAGEBOX("Ancho:"+thisform.PagFr1.Pag003.txtAnchoFoil.Value+" F1:"+cVarFoil1+" F2:"+cVarFoil2)
        
        ** verificamos si existe colores seleccionados cuando se indicó un ancho de material
        cVarFoil=thisform.pagFr1.pag003.txtColorFoil1.value
        cVarFoil2=thisform.pagFr1.pag003.txtColorFoil2.value
        IF ((cVarFoil1="Ninguno" .or. LEN(cVarFoil1)=0) .and. (cVarFoil2="Ninguno" .or. LEN(cVarFoil2)=0))
            ** validamos el ancho del foil
            IF (nVarAnchoFoil <> 0)
                * retornamos falso
                thisform.pagFr1.pag003.txtColorFoil1.BackColor=RGB(255,128,128)
                thisform.pagFr1.pag003.txtColorFoil2.BackColor=RGB(255,128,128)
                MESSAGEBOX("Ha definido ancho para los Foils, sin embargo no ha suministrado los colores para los mismos", 0 + 16, cTMP_TIT)
                bTMP_VAL = .F.
                RETURN .F.				
            endif			
        ENDIF
        
        ** verificamos que se haya especificado un color cuando el ancho del acabado es diferente de cero
        nVarAnchoFoil=VAL(thisform.pagFr1.pag003.txtAnchoFoil.Value)
        IF (nVarAnchoFoil = 0)
            * verificamos si existe colores seleccionados cuando se indicó un ancho de material
            IF ((cVarFoil1<>"Ninguno" .and. LEN(cVarFoil1)<>0) .or. (cVarFoil2<>"Ninguno" .and. LEN(cVarFoil2)<>0))
                thisform.PagFr1.Pag003.txtAnchoFoil.BackColor=RGB(255,128,128)
                MESSAGEBOX("Ha definido Colores para los Foils, sin embargo no ha definido un ancho para el mismo", 0 + 16, cTMP_TIT)
                bTMP_VAL = .F.
                RETURN .F.				
            ENDIF			
        endif					
        ****************************************************************************************
        
        bTMP_VAL = .T.
    ENDWITH

    RETURN bTMP_VAL    

    */
}