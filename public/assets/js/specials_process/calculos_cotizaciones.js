/*======================================================================*/
/*               Area de calculos                                       */
/*======================================================================*/
// esta funcion corresponde a calculos 1 de cotizaciones
// calculo del largo de la etiqueta
// hecho
/*	CALCULA LARGO ETIQUETA	*/
function calculos1(){
    try {
        console.log ("//---------------entrando calculos 1  CALCULA LARGO ETIQUETA -----------------//");
        /*	AVANCE + SEPARACION	*/
        nTMP_AU1v1 =0.00;

        // capturamos avance
        paso=1;
        fAvancev1=getAvanceEtiqueta();

        // capturamos separacion
        paso=1;
        fSeparacionv1=getSeparacionEtiqueta();

        // el largo total
        paso=2;
        nTMP_AU1v1 = fAvancev1 + fSeparacionv1;
        
        /*	ASIGNA EL VALOR AL CONTROL	*/
        paso=3;
        setLargoEtiqueta(nTMP_AU1v1);

        paso=4;
        changeLargoEtiqueta();

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 1!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

// hecho
/*	CALCULA CMS LINEALES	*/
function calculos2(){
    try {
        console.log ("//---------------entrando calculos 2 CALCULA CMS LINEALES -----------------//");

        // capturamos los valores del formulario
        // capturamos el largo de la etiqueta
        paso=1;
        largoEtiquetasv2=getLargoEtiqueta();

        // capturamos la cantidad de etiquetas
        paso=2;
        cantidadEtiquetasv2=getCantidadEtiquetas();

        // capturamos la cantidad de canales 
        paso=3;
        canalesv2=getCanalesEtiqueta();

        // hacemos el calculo
        paso=4;
        nTempv2=((largoEtiquetasv2 * cantidadEtiquetasv2) / canalesv2);

        // asginamos elr esultado al objeto del formulario
        paso=5;
        setCmsLineales(nTempv2.toFixed(3));

        paso=6;
        changeCmsLineales();
        /*
        original foxpro
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 2 ==============="	
        //	((LARGO ETQ * CANT ETQ) / CANALES)	\*
        nTMP_AU1 = ((.TXTTLA.VALUE * .TXTCET.VALUE) / .SPICAN.VALUE)
            ASIGNA EL VALOR AL CONTROL	\*
        .TXTCMS.VALUE = nTMP_AU1    
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 2!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA CMS TOTAL	*/
// hecho
function calculos3(){
    try {
        console.clear();
        console.log ("//---------------entrando calculos 3 CALCULA CMS TOTAL -----------------//");
        // capturamos los centimetros lineales
        paso=1;
        cmsLinealesv3= getCmsLineales();

        // capturamos el porcentaje de seguridad
        paso=2;
        porcentajeSeguridadv3=getPorcentajeSeguridad();    

        // calculamos los cms totales
        paso=3;
        cmsTotalesv3=(((cmsLinealesv3 *  porcentajeSeguridadv3) / 100) + cmsLinealesv3);

        // asignamos el resultado
        paso=4;
        setCmsLinealesTotales(cmsTotalesv3.toFixed(3));

        paso=5;
        changeCmsLinealesTotales();

        /*** original foxpro 
            thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 3 ==============="	
                (((CMS LINEALES * % SEGURIDAD) / 100) + CMS LINEALES)	
            nTMP_AU1 = ((.TXTCMS.VALUE * .TXTPSE.VALUE) / 100) + .TXTCMS.VALUE
            ASIGNA EL VALOR AL CONTROL	
            .TXTTCM.VALUE = nTMP_AU1     
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 3!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

//	CALCULA CANT CORES	//
// hecho
function calculos4(){
    try {
        console.log ("//---------------entrando calculos 4 CALCULA CANT CORES -----------------//");

        cantidadEtiquetasv4=0;
        cantNPrev4=0;
        canalesDespacharv4=0;
        coresv4=0;

        // capturamos la cantidad de etiquetas
        paso=1;
        cantidadEtiquetasv4=getCantidadEtiquetas();

        // catpuramos la cantidad de etiquetas por presentacion
        paso=2;
        cantNPrev4=getEtiquetasXRollo();

        // capturamos los canales a despachar
        paso=3;
        canalesDespacharv4=getCanalesDespachar();

        // calculamos 
        paso=4;
        coresv4= ((cantidadEtiquetasv4 / cantNPrev4) / canalesDespacharv4);

        // asiganmos el resultado al objeto correspondiente
        paso=5;
        setCantidadCores(coresv4);
        paso=6;
        changeCantidadCores()

        console.log ("//---------------fin calculos 4 CALCULA CANT CORES -----------------//");
        /*
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 4 ==============="	
            ((CANT ETQ / CANT ETQ X PRESENTACION) / CANALES A DESPACHAR)	\*
        nTMP_AU1 = (.TXTCET.VALUE / THISFORM.PAGFR1.PAG002.TXTEXR.VALUE) / THISFORM.PAGFR1.PAG002.SPICAN.VALUE
        ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG002.TXTCCO.VALUE = nTMP_AU1    
        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 4!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA CANT NUMEROS POR ROLLOS	*/
// hecho
function calculos5(){
    try { 
        console.log ("//---------------entrando calculos 5 CALCULA CANT NUMEROS POR ROLLOS -----------------//");

        // capturamos el avance
        paso=1;
        cantNPrev5=0;
        avancev5=0.00;
        canalesDespacharv5=0;
        largoEtiquetasv5=0;
        cantidadEtiquetasXRollov5=0;

        paso=2;
        avancev5=getAvanceEtiqueta();

        // capturamos los canales 
        paso=3;
        canalesDespacharv5=getCanalesDespachar();  
        
        // capturamos la cantidad de etiquetas
        paso=4;
        largoEtiquetasv5=getLargoEtiqueta();

        // capturamos la cantidad de etiquetas por rollo
        paso=5;
        cantidadEtiquetasXRollov5=getEtiquetasXRollo();

        // calculamos la cantidad de etiquetas por presentacion
        paso=6;
        cantNPrev5=Math.floor((((largoEtiquetasv5 / nTMP_PUL) * cantidadEtiquetasXRollov5) / 10 ) / canalesDespacharv5);

        // asignamos el calculo al objeto del formulario
        paso=7;
        setCantidadNPre(cantNPrev5);
        
        /*---- original foxpro ------*/
        /* thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 5 ==============="	
        //	(((((AVANCE + 0.4)/CONST PULG (2.54))*CANT ETQ)/10)/CAN A DESPA)	\*
        nTMP_AU1 = ((((.TXTTLA.VALUE / nTMP_PUL) * THISFORM.PAGFR1.PAG002.TXTEXR.VALUE ) /10) /THISFORM.PAGFR1.PAG002.SPICAN.VALUE)
        ((((largototaletiqueta / pulgadas) * cantidad etiquetas por rollo ) / 10 ) / canales a despachar)
        //	ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG002.TXTNXR.VALUE = nTMP_AU1   
        */ 
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 5!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA MTS LINEALES	*/
// hecho
function calculos6(){
    try { 
        console.log ("//---------------entrando calculos 6 CALCULA MTS LINEALES -----------------//");

        // capturamos centimetros lineales totales.
        paso=1;
        cmsLinealesv6=getCmsLinealesTotales();

        // hacemos el calculo
        paso=2;
        mtrsLinealesv6= cmsLinealesv6 / 100;

        // asignamos el resultado
        paso=3;
        setMtrsLineales(mtrsLinealesv6.toFixed(3));

        paso=4;
        changeMetrosLineales();
        /*
        original foxpro
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 6 ==============="	
            CMTS TOTAL / 100	\*
        nTMP_AU1 = .TXTTCM.VALUE / 100
            ASIGNA EL VALOR AL CONTROL	\*
        .TXTMTL.VALUE = nTMP_AU1
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 6!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA ANCHO DE BOBINA	*/
// hecho
function calculos7(){
    try { 
        console.log ("//---------------entrando calculos 7 CALCULA ANCHO DE BOBINA -----------------//");
        paso=1;
        nTMP_LASv7 =0.00;
        nTMP_AU1v7=0.00;
        nTMP_AU2v7=0.00;
        var n=document.getElementsByName('tipTroq').length;
        var valorSeleccionadov7=1;
        paso=2;
        /*for (i=0; i < n; i++){
            paso=3;
            if (document.getElementsByName('tipTroq').item(i).checked){
                paso=4;
                valorSeleccionado=document.getElementsByName('tipTroq').item(i).value;
            }
        }*/
        valorSeleccionadov7=getTipoTroquel();

        // determinamos que tipo de troquel se usara
        paso=5;
        if (valorSeleccionadov7==2){
            paso=6;
            var nTMP_LASv7 = 0.5;
        } else {
            paso=7;
            nTMP_LASv7 = 0;
        }
        // determinamos si es una cotizacion flexo o indigo
        paso=8;
        tipCotizacionv7=0;

        //spiCol=parseInt(document.getElementById('txtCantidadColores').value);
        paso=11;
        tipCotizacionv7=0;
        spiColv7=parseInt(getCantidadColores());
        //spiAnc=parseFloat(document.getElementById('selAnchoEtiqueta').value);
        console.log ("Cantidad de Colores calculos 7:",spiColv7," paso:",paso);
        paso=12;
        if (getTipoCotizacion()==1){
            paso=13;
            tipCotizacionv7=0;
            spiAncv7=parseFloat(getAnchoFlexo())
        } else {
            paso=14;
            spiAncv7=parseFloat(getAnchoIndigo())
        }


        //spiCan=parseInt(document.getElementById('txtCanales').value);
        paso=15;
        spiCanv7=parseInt(getCanalesEtiqueta());

        paso=16;
        if (getTipoCotizacion()==1){
            paso=17;
            // es flexografica  
            /*	((ANCHO ETQ + 0.4) * CANALES) SI LA CANT COLORES >= 4 SE LE SUMA 1	*/
            /*	VALIDA LA CANT DE COLORES	*/

            if (spiColv7 >= 4) {
                paso=18;
                nTMP_AU1v7=(((spiAncv7 + 0.4 + nTMP_LASv7) * spiCanv7) + 1) / nTMP_PUL;
                console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
            } else if ((spiCol >= 1) && (spiCol <=3)) {
                /*	Verifica si lleva forma continua	*/
                paso=19;
                nTMP_AU1v7=(((spiAncv7 + 0.4 + nTMP_LASv7) * spiCanv7) + 1) / nTMP_PUL;
                console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );              
                if (getFormaContinua()){
                    // lleva forma continua
                    paso=20;
                    nTMP_AU1v7=(((spiAncv7 + 0.4 + nTMP_LASv7) * spiCanv7) + 1) / nTMP_PUL;
                    console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
                } else {
                    // no lleva forma continua
                    paso=21;
                    nTMP_AU1v7=(((spiAncv7 + 0.4+ nTMP_LASv7) * spiCanv7) + 0.4) / nTMP_PUL;
                    console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
                }
            } else {
                // tiene un solo color
                paso=22;
                nTMP_AU1v7=(((spiAncv7 + 0.4) * spiCanv7) + 0.4) / nTMP_PUL;
                console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
            }
        } else {
            paso=23;
            // es digital 
            if (spiColv7 >= 4) {
                paso=24;
                nTMP_AU1v7=(((spiAncv7 + 0.4 + nTMP_LASv7) * spiCanv7) + 1) / nTMP_PUL;
                console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
            } else if ((spiColv7 >= 1) && (spiColv7 <=3)) {
                paso=25;
                /*	Verifica si lleva forma continua	*/
                if ( getFormaContinua()){
                    // lleva forma continua
                    paso=26;
                    nTMP_AU1v7=(((spiAncv7 + 0.4 + nTMP_LASv7) * spiCanv7) + 1) / nTMP_PUL;
                    console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
                } else {
                    // no lleva forma continua
                    paso=27;
                    nTMP_AU1v7=(((spiAncv7 + 0.4 + nTMP_LASv7) * spiCanv7) + 0.4) / nTMP_PUL;
                    console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
                }
            } else {
                // tiene un solo color
                paso=28;
                nTMP_AU1v7=(((spiAncv7 + 0.4 + nTMP_LASv7) * spiCanv7) + 0.4) / nTMP_PUL;
                console.log ("calculos 7 paso:",paso, " calculo:",nTMP_AU1v7 );
            }
        }
        /*	ASIGNA EL VALOR DECIMAL	*/
        console.log ("valor antes del redondeo calculos 7", nTMP_AU1v7);
        paso=28;
        nTMP_AU2v7 = nTMP_AU1v7 - Math.floor(nTMP_AU1v7);
        console.log ("valor decimal calculos 7", nTMP_AU2v7);
        
        /*	DEJA EL VALOR ENTERO CON LOS DECIMALES EN 0	*/
        paso=29;
        nTMP_AU1v7 = nTMP_AU1v7 - nTMP_AU2v7;
        console.log ("valor entero calculos 7", nTMP_AU1v7);
        
        paso=30;
        if (nTMP_AU2v7 <= 0.25) {
            paso=31;
            nTMP_AU2v7 = 0.25;
        } else if (nTMP_AU2v7 > 0.25 && nTMP_AU2v7 <= 0.50) {
            paso=32;
            nTMP_AU2v7 = 0.50;
        } else if (nTMP_AU2v7 > 0.50 && nTMP_AU2v7 <= 0.75) {
            paso=33;
            nTMP_AU2v7 = 0.75;
        } else if (nTMP_AU2v7 > 0.75) {
            paso=34;
            nTMP_AU2v7 = 1.00;
        }
        console.log ("nuevo valor decimal calculos 7", nTMP_AU2v7);
        
        /*	SUMA EL VALOR REDONDEADO	*/
        paso=35;
        nTMP_AU1v7 = nTMP_AU1v7 + nTMP_AU2v7
        console.log ("valor redondeado calculos 7", nTMP_AU1v7);
        
        /*	ASIGNA EL VALOR AL CONTROL	*/
        paso=36;
        if (nTMP_AU1v7 > 13) {
            paso=37;
            setAnchoBobina(13);
        } else {
            paso=38;
            setAnchoBobina(nTMP_AU1v7);
        }

        paso=39;
        changeAnchoBobina();  
        
        /* original foxpro
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 7 ==============="	
        IF .OPTGR2.OPT002.VALUE = 1 
            nTMP_LAS = 0.5
        ELSE
            nTMP_LAS = 0
        ENDIF
        IF .OPTGR1.OPTFLX.VALUE = 1 
            *	((ANCHO ETQ + 0.4) * CANALES) SI LA CANT COLORES >= 4 SE LE SUMA 1	\*
            *	VALIDA LA CANT DE COLORES	\*
            IF THISFORM.PAGFR1.PAG003.SPICOL.VALUE >= 4 THEN
                nTMP_AU1 = ((((.SPIANC.VALUE + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 1) / nTMP_PUL
            ELSE
                IF THISFORM.PAGFR1.PAG003.SPICOL.VALUE >= 1 AND THISFORM.PAGFR1.PAG003.SPICOL.VALUE <= 3
                    *	Verifica si lleva forma continua	\*
                    IF THISFORM.PAGFR1.PAG002.CHKFOR.VALUE = 1
                        nTMP_AU1 = ((((.SPIANC.VALUE + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 1) / nTMP_PUL
                    ELSE
                        nTMP_AU1 = ((((.SPIANC.VALUE + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 0.4) / nTMP_PUL
                    ENDIF 
                ELSE
                    nTMP_AU1 = ((((.SPIANC.VALUE + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 0.4) / nTMP_PUL
                ENDIF 
            ENDIF
        ELSE
            *	((ANCHO ETQ + 0.4) * CANALES) SI LA CANT COLORES >= 4 SE LE SUMA 1	\*
            *	VALIDA LA CANT DE COLORES	\*
            IF THISFORM.PAGFR1.PAG003.SPICOL.VALUE >= 4 THEN
                nTMP_AU1 = ((((VAL(.COBANC.VALUE) + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 1) / nTMP_PUL
            ELSE
                IF THISFORM.PAGFR1.PAG003.SPICOL.VALUE >= 1 AND THISFORM.PAGFR1.PAG003.SPICOL.VALUE <= 3
                    *	Verifica si lleva forma continua	\*
                    IF THISFORM.PAGFR1.PAG002.CHKFOR.VALUE = 1
                        nTMP_AU1 = ((((VAL(.COBANC.VALUE) + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 1) / nTMP_PUL
                    ELSE
                        nTMP_AU1 = ((((VAL(.COBANC.VALUE) + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 0.4) / nTMP_PUL
                    ENDIF 
                ELSE
                    nTMP_AU1 = ((((VAL(.COBANC.VALUE) + 0.4) + nTMP_LAS) * .SPICAN.VALUE) + 0.4) / nTMP_PUL
                ENDIF 
            ENDIF
        ENDIF
        *	ASIGNA EL VALOR DECIMAL	\*
        nTMP_AU2 = nTMP_AU1 - INT(nTMP_AU1)
        *	DEJA EL VALOR ENTERO CON LOS DECIMALES EN 0	\*
        nTMP_AU1 = nTMP_AU1 - nTMP_AU2
        *	CASO PARA EVALUAR EL REDONDEO	\*
        DO CASE
            *	<= .25 	\*
            CASE nTMP_AU2 <= 0.25 
                nTMP_AU2 = 0.25
            *	> .25 AND <= .50	\*
            CASE nTMP_AU2 > 0.25 AND nTMP_AU2 <= 0.50
                nTMP_AU2 = 0.50
            *	> .50 AND <= .75	\*
            CASE nTMP_AU2 > 0.50 AND nTMP_AU2 <= 0.75
                nTMP_AU2 = 0.75
            *	> .75	\*
            CASE nTMP_AU2 > 0.75
                nTMP_AU2 = 1.00
        ENDCASE
        *	SUMA EL VALOR REDONDEADO	\*
        nTMP_AU1 = nTMP_AU1 + nTMP_AU2
        *	ASIGNA EL VALOR AL CONTROL	\*
        .TXTABO.VALUE = IIF(nTMP_AU1 > 13, 13, nTMP_AU1)        

        // fin original*/

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 7!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA MTS 2 BOBINA Y ETIQUETAS	*/
// hecho
function calculos8(){
    try {
        console.log ("//---------------entrando calculos 8  CALCULA MTS 2 BOBINA Y ETIQUETAS -----------------//");
        cTemp1v8=0.00;
        cTemp2v8=0.00;

        // capturamos el ancho de bobina
        paso=1;
        anchoBobinav8=getAnchoBobina();

        // capturanos Metros Lineales
        paso=2;
        mtrsLinealesv8=getMtrsLineales();

        // capturamos Metros Cuadrados de Bobina
        paso=3;
        mtrs2Bobinav=getMtrs2Bobina();   

        // calculo inicial
        paso=4;
        cTemp1v8=nTMP_PUL * anchoBobinav8;

        // asignamos al objeto
        paso=5;
        setMtrs2Bobina(cTemp1v8);
         paso=6;
        changeMtrs2Bobina();

        // calculo secundarios
        paso=7;
        cTemp2v8=((mtrsLinealesv8 / 100) * cTemp1v8);

        // asignamos el resultado al control
        paso=8;
        setMtrs2Etiquetas(cTemp2v8.toFixed(3));
        paso=9;
        changeMtrs2Etiqueta();

        /*
        original profit
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 8 ==============="	
            CONSTANTE PULG * ANCHO DE BOBINA	\*
        nTMP_AU1 = nTMP_PUL * .TXTABO.VALUE
            ASIGNA EL VALOR AL CONTROL	\*
        .TXTM2B.VALUE = nTMP_AU1
            ((MTS LINEALES / 100) * MTS2 BOBINA)	\*
        nTMP_AU1 = (.TXTMTL.VALUE / 100) * nTMP_AU1
            ASIGNA EL VALOR AL CONTROL	\*
        .TXTMT2.VALUE = nTMP_AU1    
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 8!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA EL COSTO DEL MATERIAL POR ETIQUETA	*/
// hecho
function calculos9(){
    try { 
        console.log ("//---------------entrando calculos 9 CALCULA EL COSTO DEL MATERIAL POR ETIQUETA -----------------//");
        nTMP_AU1v9=0.00;

        // capturamos el ancho de bobina
        paso=1;
        anchoBobinav9=getAnchoBobina();

        // capturamos los canales
        paso=2;
        canalesv9=getCanalesEtiqueta();

        // capturamos el largo de la etiqueta
        paso=3;
        largoEtiquetasv9=getLargoEtiqueta();

        // capturamos el costo del material
        paso=4;
        costoMaterialv9=getCostoMaterial();
        console.log ("********************************")
        console.log ("ancho bobina",anchoBobinav9);
        console.log ("canales",canalesv9);
        console.log ("largo etiqueta",largoEtiquetasv9);
        console.log ("costo material",costoMaterialv9);
        console.log ("********************************");
        // calculo inicial 
        paso=5;
        if (
            (anchoBobinav9!=0.00) 
            && (typeof(anchoBobinav9)!="NaN")
            && (anchoBobinav9!="NULL")
            && (canalesv9!=0.00) 
            && (typeof(canalesv9)!="NaN")
            && (canalesv9!="NULL")
            && (largoEtiquetasv9!=0.00) 
            && (typeof(largoEtiquetasv9)!="NaN")
            && (largoEtiquetasv9!="NULL") 
            && (canalesv9!="NULL")
            && (costoMaterialv9!=0.00) 
            && (typeof(costoMaterialv9)!="NaN")
            && (costoMaterialv9!="NULL")           
        ){
            console.log ("calculando costo de materiales calculos 9");
            nTMP_AU1v9=(((anchoBobinav9 * nTMP_PUL) / canalesv9) / 100) * ((largoEtiquetasv9 /100) * costoMaterialv9);
            console.log ("resultados costo de materiales 9",nTMP_AU1v9);
            // asignamos el resultado al control
            paso=6;
            setCostoMaterialXEtiquetas(nTMP_AU1v9);
            changeCostoMaterialEtiquetas();

        }
        

        /*
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 9 ==============="	
         PRECIO TOTAL MATERIAL / CANT ETQ	\*
        nTMP_AU1 = ((((THISFORM.PAGFr1.PAg001.TXTABo.VALUE) * nTMP_PUL) / THISFORM.PAGFr1.PAG001.SPICan.VALUE) / 100) * ((THISFORM.PAGFr1.PAg001.TXTTLA.VALUE) / 100) * (THISFORM.PAGFR1.PAG003.TXTPrM.VALUE)
        ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG003.TXTCXE.VALUE = ROUND(nTMP_AU1, 4)
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 9!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA PRECIO TOTAL DEL MATERIAL	*/
// hecho
function calculos10(){
    try {     
        console.log ("//---------------entrando calculos 10 CALCULA PRECIO TOTAL DEL MATERIAL -----------------//");
        paso=1;
        nTMP_AU1va=0.00;

        // capturamos el costo del material
        costoMaterialva=getCostoMaterial();

        // capturamos los metros cuadrados de etiqueta
        paso=2;
        mtrs2Etiquetava=getMtrs2Etiquetas();

        // hacemos el calculo
        paso=3;
        nTMP_AU1va=costoMaterialva*mtrs2Etiquetava;

        // asignamos el resultado al control
        paso=4;
        setCostoTotalMaterial(nTMP_AU1va);
        changeCostoTotalMaterial();

        /*
        original foxpro
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 10 ==============="	
        COSTO MATERIAL * MTS 2 BOBINA	\*
        nTMP_AU1 = (THISFORM.PAGFR1.PAG003.TXTPRM.VALUE * .TXTMT2.VALUE)
        
            ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG003.TXTPFM.VALUE = nTMP_AU1 
        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 10!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA PRECIO TOTAL DEL COLOR	*/
// hecho
function calculos11(){
    try { 
        console.log ("//---------------entrando calculos 11 CALCULA PRECIO TOTAL DEL COLOR -----------------//");
        paso=1;
         nTMP_AU1vb=0.00;

        // capturamos la cantidad de colores
        cantidadColoresvb=getCantidadColores();

        // capturamos el precio del color
        paso=2;
        precioColoresvb=getPrecioColores();

        // hacemos el calculo
        paso=3;
        nTMP_AU1vb= cantidadColoresvb * precioColoresvb;

        // asignamos a los controles correspondientes
        paso=4;
        setPrecioTotalColores(nTMP_AU1vb)
        paso=5;
        setResumenTotalColor(nTMP_AU1vb);
        paso=6;
        setResumenPrecioColor(precioColoresvb);

        /*
        original foxpro
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 11 ==============="	
            CANT COLORES * PRECIO UNIT COLORES	\*
        nTMP_AU1 = THISFORM.PAGFR1.PAG003.SPICOL.VALUE * THISFORM.PAGFR1.PAG003.TXTPRC.VALUE					
        
            ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG003.TXTPTC.VALUE = nTMP_AU1
        
        THISFORM.PAGFR1.PAG004.TXTTCO.VALUE = nTMP_AU1
        
        THISFORM.PAGFR1.PAG004.TXTPCO.VALUE = THISFORM.PAGFR1.PAG003.TXTPRC.VALUE    
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 11!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA EL COSTO DEL TRANSPORTE	*/
// hecho
function calculos12(){
    try { 
        console.log ("//---------------entrando calculos 12 CALCULA EL COSTO DEL TRANSPORTE -----------------//");
        paso=1;
        nTMP_AU1vc=0.00;

        // capturamos el precio total del material
        precioTotalMaterialvc=getCostoTotalMaterial();

        // capturamos el procentaje de transporte
        paso=2;
        porcentajeTransportevc=getPorcentajeTransporte();

        // calculamos
        paso=3;
        nTMP_AU1vc= ((precioTotalMaterialvc * porcentajeTransportevc) / 100);

        // asignamos el resultado a control correspondiente
        paso=4;
        setCostoTransporte(nTMP_AU1vc);

        /*
        original profit
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 12 ==============="	
            PRECIO TOTAL MATERIAL * % DE TRANSPORTE		\*
        nTMP_AU1 = THISFORM.PAGFR1.PAG003.TXTPFM.VALUE * (THISFORM.PAGFR1.PAG003.SPIPDT.VALUE / 100)
        
            ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG003.TXTCDT.VALUE = nTMP_AU1    

        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 12!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA EL COSTO DE MANO DE OBRA	*/
// hecho
function calculos13(){
    try {
        console.log ("//---------------entrando calculos 13 CALCULA EL COSTO DE MANO DE OBRA -----------------//");
        // capturamos el costo total del material
        paso=1;
        nTMP_AU1vd=0.00;

        precioTotalMaterialvd=getCostoTotalMaterial();

        // capturamos el porcentaje de Mano de obra
        paso=2;
        porcentajeManoObravd=getPorcentajeManoObra();

        // hacemos el calculo
        paso=3;
        nTMP_AU1vd=((precioTotalMaterialvd * porcentajeManoObravd) / 100);

        // asignamos el resultado
        paso=4;
        setCostoManoObra(nTMP_AU1vd);
        changeCostoManoObra();

        /*
        original profit
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 13 ==============="	
        	PRECIO TOTAL MATERIAL * % DE MANO OBRA	\*
        nTMP_AU1 = THISFORM.PAGFR1.PAG003.TXTPFM.VALUE * (THISFORM.PAGFR1.PAG003.SPIPMO.VALUE / 100)
        
        	ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG003.TXTCMO.VALUE = nTMP_AU1        
        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 13!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA LA SUMA DE COSTOS	*/
// hecho
function calculos14(){
    try { 
        console.log ("//---------------entrando calculos 14 CALCULA LA SUMA DE COSTOS -----------------//");

        // capturamos precio color
        nTMP_AU1ve=0.00;
        paso=1;
        precioColorve=getPrecioColores();

        // capturamos precio total color
        paso=2;
        precioTotalColorve=getPrecioTotalColores();

        // capturamos costo de Transporte
        paso=3;
        costoTransporteve=getCostoTransporte();

        // capturamos costo mano de obra
        paso=4;
        costoManoObrave=getCostoManoObra();

        // capturamos cantidaq de etiquetas
        paso=5;
        cantidadEtiquetasve=getCantidadEtiquetas();

        // hacemos el calculo segun el tipo de cotizacion

        console.log ("precioColorve",precioColorve);
        console.log ("precioTotalColorve",precioTotalColorve);
        console.log ("costoTransporteve",costoTransporteve);
        console.log ("costoManoObrave",costoManoObrave);
        console.log ("cantidadEtiquetasve",cantidadEtiquetasve);


        paso=6;
        nTMP_AU1ve=0.00;
        if (getTipoCotizacion()==1){
            paso=7;
            // es una cotizacion flexo se usa precio del color
            nTMP_AU1ve= ((precioTotalColorve + (costoTransporteve * 2 ) + costoManoObrave) / cantidadEtiquetasve);
        } else {
            paso=8;
            // es una cotizacion indigo se usa precio total color
            nTMP_AU1ve= ((precioColorve + (costoTransporteve * 2 ) + costoManoObrave) / cantidadEtiquetasve);
        }
        console.log ("resultados calculos 14",nTMP_AU1ve)
        // asignamos el resultado
        // seccion costos
        paso=9;
        setSumacostos(nTMP_AU1ve);
        //changeSumaCostos();
        // seccion resumen
        paso=10;
        setResumenSumaCostos(nTMP_AU1ve);

        /* original foxpro
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 14 ==============="	
        	(PRECIO TOTAL COLOR + (COSTO TRANSPORTE * 2) + COSTO MANO OBRA) / CANT ETQ	\*
        nTMP_AU1 = (IIF(THISFORM.PAGFr1.PAG001.OPTGr1.OPTIND.VALUE = 1, 
            THISFORM.PAGFR1.PAG003.TXTPRC.VALUE, 
            THISFORM.PAGFR1.PAG003.TXTPTC.VALUE) + (THISFORM.PAGFR1.PAG003.TXTCDT.VALUE * 2) ;
                    + THISFORM.PAGFR1.PAG003.TXTCMO.VALUE) / .TXTCET.VALUE
        	ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG003.TXTSDC.VALUE = nTMP_AU1
        THISFORM.PAGFR1.PAG004.TXTSCO.VALUE = nTMP_AU1
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 14!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA EL COSTO DE ETIQUETA	*/
// hecho
function calculos15(){
    try { 
        console.log ("//---------------entrando calculos 15 CALCULA EL COSTO DE ETIQUETA -----------------//");

        // capturamos el costo total del material
        nTMP_AU1vf=0.00;
        paso=1;
        costoTotalMaterialvf=getCostoTotalMaterial();

        // capturamos la cantidad de etiquetas
        paso=2;
        cantidadEtiquetasvf=getCantidadEtiquetas();

        // hacemos el calculo
        paso=3;
        nTMP_AU1vf=costoTotalMaterialvf/cantidadEtiquetasvf;

        // asginamos el resultado a los controles
        // seccion costos
        paso=4;
        setCostoEtiqueta(nTMP_AU1vf);
        changeCostoTotalEtiqueta();

        // seccion resumen
        paso=5;
        setResumenCostoEtiqueta(nTMP_AU1vf);

        /*
        original profit
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 15 ==============="	
        nTMP_AU1 = THISFORM.PAGFr1.PAG003.TXTPFM.Value / THISFORM.PAGFr1.PAG001.TXTCET.VALUE 
        
        ASIGNA EL VALOR AL CONTROnL	\*
        THISFORM.PAGFR1.PAG003.TXTCOE.VALUE = ROUND(nTMP_AU1, 4)
        
        THISFORM.PAGFR1.PAG004.TXTCET.VALUE = ROUND(nTMP_AU1, 4)
        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 15!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}

/*	CALCULA EL COSTO FINAL	*/
// hecho
function calculos16(){
    try { 
        console.log ("//---------------entrando calculos 16 CALCULA EL COSTO FINAL -----------------//");

        // capturamos el total del costo de las etiquetas
        paso=1;
        nTMP_AU1vg=0.00;
        costoEtiquetavg=getCostoEtiqueta();

        // capturamos la suma de costos
        paso=2;
        sumaCostosvg=getSumaCostos();

        // hacemos el calculo
        paso=3;
        console.log ("costo etiqueta", costoEtiquetavg);
        console.log ("suma costos", sumaCostosvg);

        nTMP_AU1vg= costoEtiquetavg + sumaCostosvg;

        console.log ("resultado del calculo", nTMP_AU1vg);

        // asignamos a los controles correspondientes
        // seccion de costos
        paso=4;
        setCostoTotal(nTMP_AU1vg);
        changeCostoTotal();

        //seccion de resumen
        paso=5;
        setResumenCostoTotal(nTMP_AU1vg);

        /* original foxpro
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 16 ==============="	
        
        	COSTO ETQ + SUMA DE COSTOS	\*
        nTMP_AU1 = THISFORM.PAGFR1.PAG003.TXTCOE.VALUE + THISFORM.PAGFR1.PAG003.TXTSDC.VALUE
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"///// cal(16) COSTO ETQ + SUMA DE COSTOS /////"+CHR(13)+STR(nTMP_au1,14,4)
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"///// cal(16) THISFORM.PAGFR1.PAG003.TXTCOE.VALUE /////"+CHR(13)+STR(THISFORM.PAGFR1.PAG003.TXTCOE.VALUE,14,4)
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"///// cal(16) THISFORM.PAGFR1.PAG003.TXTSDC.VALUE /////"+CHR(13)+STR(THISFORM.PAGFR1.PAG003.TXTSDC.VALUE,14,4)					
        	ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG003.TXTCTO.VALUE = ROUND(nTMP_AU1, 4)
        
        THISFORM.PAGFR1.PAG004.TXTCOT.VALUE = ROUND(nTMP_AU1, 4)
        
        nTMP_COS = nTMP_AU1
        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 16!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*	CALCULA EL PRECIO ETIQUETA	*/
// hecho
function calculos17(){
    try {
        paso=1;
        console.clear();
        console.log ("//---------------entrando calculos 17 CALCULA EL PRECIO ETIQUETA -----------------//");

        // determinamos que costo tomar segun si la etiqueta es blanca o no
        // capturamos el factor
        paso=2;
        nTMP_AU1vh=0.00;
        paso=3;
        nTMP_AU2vh=0.00;
        paso=4;
        costoVvh=0.00;
        paso=5;
        factorVvh=0.00;
        paso=6;
        costoFoil1Vvh=0.00;
        paso=7;
        costoFoil2Vvh=0.00;
        paso=8;
        costoSandwichVvh=0.00;
        paso=9;
        costoLaminacionVvh=0.00;
        paso=10;
        costoPorImpresionVvh=0.00;
        paso=11;
        costoTotalVvh=0.00;
        costoMaterialEtiquetasVvh=0.00;

        paso=12;
        if (getFactor()!="NaN"){
            paso=13;
            factorVvh=getFactor();
        } else {
            paso=14;
            factorVvh=0.00;
        }

        paso=14001;
        if (getTipoCotizacion()==1){
            paso=14002;
            console.log ("corrigiendo factor para cotizaciones flexo");
            // es flexografica
            // verificamos si son blancas 
            paso=14003;
            if (getEtiquetasBlancas()){
                paso=14004;
                console.log ("corrigiendo factor para cotizaciones flexo blancas");
                paso=14005;
                factorVvh=factorVvh * 2;
                paso=14006;
                console.log (`factor corregido:${factorVvh} paso=${factorVvh}`);
            } else {
                paso=14007;
                console.log ("corrigiendo factor para cotizaciones indigo");
                paso=14008;
                factorVvh=factorVvh+0.2;
                console.log (`factor corregido:${factorVvh} paso=${factorVvh}`);
            }

        } 
        /*
        esto es un ajuste en el factor segun profit
		IF thisform.pagFr1.pag001.optGr1.optFlx.Value = 1 
			IF THISFORM.PAGFr1.PAG002.OPTGR3.OPtBla.Value = 1
				nFACTOR = THIS.VALUE * 2 && + 0.4
			ELSE
				nFACTOR = THIS.VALUE + 0.2
			ENDIF
		ELSE
			nFACTOR = THIS.VALUE
		ENDIF
        */

        paso=15;
        if (getCostoTotal()!="NaN"){
            paso=16;
            costoTotalVvh=getCostoTotal();
        } else {
            costoTotalVvh=0.00;
        }
        console.log ("costo total calculos 17", costoTotalVvh," paso:",paso);

        if (getCostoMaterialEtiquetas()!="NaN"){
            costoMaterialEtiquetasVvh=getCostoMaterialEtiquetas();
        } else {
            costoMaterialEtiquetasVvh=0.00;
        }

        paso=17;
        console.log ("calculos 17 factor ", factorVvh," paso ",paso);
        paso=18;
        if (getEtiquetasBlancas()){
            paso=19;
            // son etiquetas blancas
            costoVvh=costoMaterialEtiquetasVvh * factorVvh;
            paso=20;
            console.log ("etiquetas blancas calculos 17 Costo Material Etiqueta",costoMaterialEtiquetasVvh, " Calculo: ",costoVvh, "paso:",paso);
        } else {
            // no son etiquetas blancas
            paso=21;
            if (costoTotalVvh!=0.00){
                paso=22;
                costoVvh=costoTotalVvh * factorVvh;
                paso=23;
                console.log ("etiquetas a color calculos 17 Costo Total:",costoTotalVvh, " Calculo: ",costoVvh, "paso:",paso);
            } else {
                paso=24;
                costoVvh=0.00;
                paso=25;
                console.log ("No se efectuo el calculo porque getCostoTotal() no devolvio un numero");
            }
        }
        paso=26;
        nTMP_AU1vh=costoVvh;
        console.log ("Calculo A calculos 17:",nTMP_AU1vh, " paso:", paso);

        // capturamos el costo del foil 1
        paso=27;
        if (getCostoFoil1()!="NaN"){
            paso=28;
            costoFoil1Vvh=getCostoFoil1();
        } else {
            paso=29;
            costoFoil1Vvh=0.00;
        }
        
        // capturamos el costo del foil 2
        paso=30;
        if (getCostoFoil2()!="NaN"){
            paso=31;
            costoFoil2Vvh=getCostoFoil2();
        } else {
            paso=32;
            costoFoil2Vvh=0.00;
        }

        // capturamos el costo del foil
        paso=33;
        if (getCostoSandwich()!="NaN"){
            paso=34;
            costoSandwichVvh=getCostoSandwich();
        } else {
            paso=35;
            costoSandwichVvh=0.00;
        }      
        
        // capturamos el costo de la laminacion
        paso=36;
        if (getCostoLaminado()!="NaN"){
            paso=37;
            costoLaminacionVvh=getCostoLaminado();
        } else {
            paso=38;
            costoLaminacionVvh=0.00;
        }  

        // capturamos costo por impresion
        paso=39;
        if (getCostoPorImpresion()!="NaN"){
            paso=40;
            costoPorImpresionVvh=getCostoPorImpresion();
        } else {
            paso=41;
            costoPorImpresionVvh=0.00;   
        }   

        // sumamos los costos adicionales 
        paso=42;
        nTMP_AU1vh=nTMP_AU1vh + costoFoil1Vvh + costoFoil2Vvh +costoSandwichVvh + costoLaminacionVvh ;
        
        console.log ("=====================================================");
        console.log ("costo material etiquetas",costoMaterialEtiquetasVvh);
        console.log ("costo total",costoTotalVvh);
        console.log ("facto",factorVvh);
        console.log ("costo total por factor",costoVvh);
        console.log ("costo foil 1",costoFoil1Vvh);
        console.log ("costo foil 2",costoFoil2Vvh);
        console.log ("costo sandwich",costoSandwichVvh);
        console.log ("costo laminacion",costoLaminacionVvh);
        console.log ("costo por impresion",costoPorImpresionVvh);
        console.log ("Calculo B calculos 17:",nTMP_AU1vh, " paso:", paso);
        console.log ("=====================================================");        
        // asignamos el resultado a los controles de la seccion de costos
        console.log ("precio etiqueta calculos 17:",nTMP_AU1vh," paso ",paso);
        paso=43;
        setPrecioEtiqueta(nTMP_AU1vh);

        changePrecioEtiqueta();

        // asignamos el resultado a los controles de la seccion de resumen
        paso=44;
        setResumenPrecioEtiqueta(nTMP_AU1vh);
        changeResumenMontoEtq();

        // determinamos si es una cotizacion  indigo
        paso=45;
        console.log ("Tipo de cotizacion", getTipoCotizacion()," calculos 17 paso",paso);
        paso=46;
        if ((getTipoCotizacion()!="NaN")
            && (getTipoCotizacion()!=0)
            && (getTipoCotizacion()!="NULL")
            && (getTipoCotizacion()!=""))
            {
            paso=47;
            if (getTipoCotizacion()==2){
                paso=48;
                nTMP_AU1vh=nTMP_AU1vh+costoPorImpresionVvh;
                paso=52;
                console.log ("2 nTMP_AU1 (precio etiqueta + costo por impresion)",nTMP_AU1vh," calculos 17 paso",paso);
                // asignamos el resultado a los controles de la seccion de costos
                paso=53;
                console.log ("precio etiqueta calculos 17 paso 17:", nTMP_AU1vh);
                paso=54;
                setPrecioEtiqueta(nTMP_AU1vh);
                paso=55;
                changePrecioEtiqueta();
                
                // asignamos el resultado a los controles de la seccion de resumen
                paso=56;
                setResumenPrecioEtiqueta(nTMP_AU1vh);  

            } 
        } else {
            console.log ("No se puede puede aplciar los calculos porque getTipoCotizacion() no devuelve un numero")
        }
       
        console.log ("//---------------fin calculos 17 CALCULA EL PRECIO ETIQUETA -----------------//");        
        /*
        original foxpro
        nTMP_AU1 = THISFORM.PAGFR1.PAG002.TXTCCO.VALUE / 1777777
        nTMP_AU1 = (IIF(thisform.pagFr1.pag002.optGr3.optBla.Value = 1, 
            thisform.PAGFR1.PAG003.TXTCXE.VALUE, 
            THISFORM.PAGFR1.PAG003.TXTCTO.VALUE) * nFACTOR) 
        nTMP_AU1 = nTMP_AU1 + THISFORM.PAGFr1.PAG003.TXTCOSFoil.VALUE    && sumamos costo de foil 1
        nTMP_AU1 = nTMP_AU1 + THISFORM.PAGFr1.PAG003.TXTCOSFoil2.VALUE   && sumamos costo de foil 2 
        nTMP_AU1 = nTMP_AU1 + THISFORM.PAGFr1.PAG003.TXTCOS.VALUE        && sumamos costo de sandwich
        nTMP_AU1 = nTMP_AU1 + Thisform.PagFr1.Pag003.TxtCosLam.value     && sumamos costo de laminacion
        THISFORM.PAGFR1.PAG003.TXTPET.VALUE = IIF(nTMP_AU1 > 1, ROUND(nTMP_AU1, 4), ROUND(nTMP_AU1, 4))
        THISFORM.PAGFR1.PAG004.TXTPET.VALUE = THISFORM.PAGFR1.PAG003.TXTPET.VALUE
        *VALIDA SI LA COTIZACION ES POR LA INGIDO	\*
        IF THISFORM.PAGFR1.PAG001.OPTGR1.OPTIND.VALUE = 1 THEN
            *	ASIGNA EL VALOR AL CONTROL	\*
            THISFORM.PAGFR1.PAG003.TXTPET.VALUE = ROUND(THISFORM.PAGFR1.PAG003.TXTPET.VALUE + THISFORM.PAGFR1.PAG002.TXTCPI.VALUE, 4)
            THISFORM.PAGFR1.PAG004.TXTPET.VALUE = THISFORM.PAGFR1.PAG003.TXTPET.VALUE
        ENDIF     
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 17!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}

/*	CALCULA EL PRECIO TOTAL DEL CLISHE	*/
// hecho
function calculos18(){
    try { 
        console.log ("//---------------entrando calculos 18 CALCULA EL PRECIO TOTAL DEL CLISHE -----------------//");
        
        paso=1;
        nTMP_AU1vi=0.00;
        cantidadColoresvi=getCantidadColores();

        // determinamos si hay clishes adicionales
        paso=2;
        if (getHayClisheAdicional()){
            paso=3;
            clisheAdicionalvi=getCantidadClisheAdicional();
        } else {
            clisheAdicionalvi=0;
        }
        console.log ("calculos 18 cantidad de clishe adicional", clisheAdicionalvi, " hay",getHayClisheAdicional());

        // capturamos el precio del clishe
        paso=4;
        precioClishevi=getPrecioClishe();
        console.log ("calculos 18 precio del clishe", precioClishevi);

        // hacemos el calculo
        paso=5;
        nTMP_AU1vi=(cantidadColoresvi + clisheAdicionalvi) * precioClishevi;
        console.log ("calculos 18 cotos total del clishe", nTMP_AU1vi);
        

        // asignamos el resultado al control correspondiente
        paso=6;
        setResumenTotalClishe(nTMP_AU1vi);
        calculos19();

        /*
        original del profit
        * thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 18 ==============="	
        	(CANT COLORES + CLISHE ADICIONAL) * PRECIO CLISHE	\*
            nTMP_AU1 = (THISFORM.PAGFR1.PAG003.SPICOL.VALUE + THISFORM.PAGFR1.PAG003.SPIADI.VALUE) * THISFORM.PAGFR1.PAG003.TXTPCL.VALUE
            	ASIGNA EL VALOR AL CONTROL	\*
            THISFORM.PAGFR1.PAG004.TXTTCL.VALUE = nTMP_AU1

        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 18!");
        console.error("Mensaje de error:", error.message,"paso: ",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA EL ESTIMADO A FACTURAR	*/
//hecho
function calculos19(){
    try { 
        console.log ("//---------------entrando calculos 19 CALCULA EL ESTIMADO A FACTURAR -----------------//");

        // capturamos cantidad de etiqetas
        paso=1;
        nTMP_AU1V19=0.00;
        nTMP_AU2V19=0.00;
        nTMP_AU3V19=0.00;
        precioEtiquetaV19=0.00;
        precioTotalClisheV19=0.00;
        cantidadEtiquetasV19=0.00; 
        cantidadEtiquetasV19=getCantidadEtiquetas();

        // capturamos el precio de la etiqueta
        paso=2;
        precioEtiquetaV19=getPrecioEtiqueta();
        console.log ("calculos 19, precio etiqueta:",precioEtiquetaV19,"paso:",paso);

        // capturamos el total de clishe
        paso=3;
        precioTotalClisheV19=getResumenTotalClishe();
        console.log ("calculos 19, precio total clishe:",precioTotalClisheV19,"paso:",paso);

        // hacemos el calculo inicial
        paso=4;
        nTMP_AU1V19=(cantidadEtiquetasV19 * precioEtiquetaV19);
        console.log ("calculos 19 precio total etiquetas cantidad etiquetas ",cantidadEtiquetasV19," precio etiquetas ",precioEtiquetaV19, " resultado ",nTMP_AU1V19);

        // asignamos el resultado al control en la seccion de resumen
        paso=5;
        setResumenMontoEtiqueta(nTMP_AU1V19);
        changeResumenMontoEtq();

        // segundo calculo (incluye el precio del clishe)
        paso=6;
        nTMP_AU1V19=(cantidadEtiquetasV19 * precioEtiquetaV19) + precioTotalClisheV19;
        console.log ("calculos 19 neto etiquetas + clishe ",nTMP_AU1V19," precio etiquetas ",precioEtiquetaV19, " clishe",precioTotalClisheV19);

        // se asigna al control en el cuadro de resumen 
        paso=7;
        setResumenMontoNeto(nTMP_AU1V19);

        // calculamos el monto del IVA
        paso=8;
        nTMP_AU2V19=nTMP_AU1V19 * nTMP_IVA;

        // asignamos el resultado al control correspondiente
        paso=9;
        setResumenIva(nTMP_AU2V19);

        // calculamos el monto total de la factura
        paso=10;
        nTMP_AU3V19=nTMP_AU1V19 * 1.16;

        // asiganmos el valor al control correspondiente
        paso=11;
        setResumenMontoTotal(nTMP_AU3V19);

        /*
        original foxpro
        *	PRECIO TOTAL DE ETIQUETA	\*
        nTMP_AU1 = (.TXTCET.VALUE * THISFORM.PAGFR1.PAG003.TXTPET.VALUE)
        *	ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG004.TXTESTETQ.VALUE = nTMP_AU1
        *	CANT ETQ * PRECIO ETQ + PRECIO TOTAL CLISHE + PRECIO COSTO DESP. ANCHO DE BOBINA	\*
        nTMP_AU1 = (.TXTCET.VALUE * THISFORM.PAGFR1.PAG003.TXTPET.VALUE) + THISFORM.PAGFR1.PAG004.TXTTCL.VALUE
        *	ASIGNA EL VALOR AL CONTROL	\*
        THISFORM.PAGFR1.PAG004.TXTESTFAC.VALUE = nTMP_AU1
        *	CALCULA EL IVA EST DE LA FACTURA	\*
        THISFORM.PAGFR1.PAG004.TXTIVA.VALUE = nTMP_AU1 * 0.16
        *	CALCULA EL MONTO TOTAL FACT	\*
        THISFORM.PAGFR1.PAG004.TXTMONTOT.VALUE = nTMP_AU1 * 1.16
    */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 19!");
        console.error("Mensaje de error:", error.message,"paso: ",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA EL DESPERDICIO ADICIONAL POR ANCHO DE BOBINA	*/
// hecho
function calculos20(){
    try { 
        console.log ("//---------------entrando calculos 20 CALCULA EL DESPERDICIO ADICIONAL POR ANCHO DE BOBINA -----------------//");

        // capturamos la diferencia por acho
        paso=1;
        nTMP_AU1vk=0.00;
        nTMP_AU2vk=0.00;
        nTMP_AU3vk=0.00;
        nTMP_COSvk=0.00;
        if (getDifAncho()!="NaN"){
            diferenciaPorAnchovk=getDifAncho();
        } else {
            diferenciaPorAnchovk=0.00;
        }

        // capturamos los metros lineales
        paso=2;
        if (getMtrsLineales()!="NaN"){
            metrosLinealesvk=getMtrsLineales();
        } else {
            metrosLinealesvk=1;
        }

        // capturamos el costo del material
        paso=3;
        if (getCostoMaterial()!="NaN"){
            costoMaterialvk=getCostoMaterial();
        } else {
            costoMaterialvk=0.00;
        }

        // hacemos el calculo inicial
        //	CALCULA LA CANTIDAD DE DESPERDICIO EN MT2	
        paso=4;
        nTMP_AU1vk=(((diferenciaPorAnchovk / nTMP_PUL) / 100) * metrosLinealesvk);

        // calcula el desperdicio 
        //	CALCULA EL COSTO DEL DESPERDICIO	
        paso=5;
        nTMP_AU2vk=(nTMP_AU1vk * costoMaterialvk);

        // asignamos el resultado al control correspondiente 
        paso=6;
        setCostoDesperdicioBobina(nTMP_AU2vk);

        // capturamos el costo total
        paso=7;
        nTMP_COSvk=getCostoTotal();

        // capturamos la cantidad de etiquetas
        paso=8;
        cantidadEtiquetasvk=getCantidadEtiquetas();

        // tercer calculo.
        paso=9;
        nTMP_AU3vk = nTMP_AU2vk /  cantidadEtiquetasvk;

        // hacemos el calculo del costo total en la seccion de costos
        paso=10;
        if (diferenciaPorAnchovk !=0.00){
            paso=11;
            console.log ("asignado costo total calculos 20 A:",(nTMP_AU3vk + nTMP_COSvk)," paso:",paso)
            setCostoTotal(nTMP_AU3vk + nTMP_COSvk);
        } else {
            paso=12;
            console.log ("asignado costo total calculos 20 B:",(nTMP_COSvk)," paso:",paso)
            setCostoTotal(nTMP_COSvk);
        }
        changeCostoTotal();
        /*
        original de foxpro
        * thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"======= paso 20 ==============="	
        *	CALCULA LA CANTIDAD DE DESPERDICIO EN MT2	\*
        nTMP_AU1 = ((THISFORM.PAGFR1.PAG003.TXTDIF.VALUE / nTMP_PUL) / 100) * .TXTMTL.VALUE
        *	CALCULA EL COSTO DEL DESPERDICIO	\*
        nTMP_AU1 = (nTMP_AU1 * THISFORM.PAGFR1.PAG003.TXTPRM.VALUE)
        THISFORM.PAGFR1.PAG003.TXTDES.VALUE = nTMP_AU1
        nTMP_AU1 = nTMP_AU1 / .TXTCET.VALUE
        *	ASIGNA EL VALOR AL CONTROL	\*
           THISFORM.PAGFR1.PAG003.TXTCTO.VALUE = nTMP_COS + IIF(Thisform.PagFr1.Pag003.TxtDif.Value # 0, nTMP_AU1, 0)        
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 20!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*	CALCULA EL AREA DEL CLISHE	*/
// hecho //
function calculos21(){
    try { 
        console.log ("//---------------entrando calculos 21 CALCULA EL AREA DEL CLISHE -----------------//");
        // seleccionamos el ancho segun el tipo de coitzacion flexo o indigo
        paso=1;
        anchoEtiquetavl=0.00;
        repeticionesvl=0;
        repeticionesvl2=0;
        canalesvl=0;
        largovl=0.00;

        if (getTipoCotizacion()==1){
            paso=2;
            anchoEtiquetavl=getAnchoFlexo();
        } else {
            paso=3;
            anchoEtiquetavl=getAnchoIndigo();
        }
        console.log ("calculos 21 ancho Etiqueta:",anchoEtiquetavl);
        // verificamos si hay ancho de etiqueta
        paso=4;
        if (anchoEtiquetavl!=0.00){
            // le sumamos al ancho 0.4
            // lo multiplicamos por la cantidad de canales
            // le sumamos 1.5
            paso=5;
            canalesvl=getCanalesEtiqueta();
            console.log ("calculos 21 canales:",canalesvl);
            paso=6;
            repeticionesvl=getRepeticionesTroquel();
            if (repeticionesvl==0){
                // verificamos si hay datos en las repetciones del troquel nuevo
                repeticionesvl2=getRepeticiones();
                console.log ("calculos 21 Repeticiones de troquel nuevo o laser", repeticionesvl2);
                if ((typeof(repeticionesvl2)!="NaN") && (repeticionesvl2!="NULL")  && (repeticionesvl2!=0.00)){
                    repeticionesvl=repeticionesvl2;
                } else {
                    repeticionesvl=1;
                }
                repeticionesvl=1;
            }
            console.log ("calculos 21  Repeticiones:",repeticionesvl);
            paso=7;
            largovl=getLargoEtiqueta();
            console.log ("calculos 21 largo Etiqueta:",largovl);

            paso=9;
            // primer calculo
            anchoEtiquetavl=((anchoEtiquetavl + 0.4) * canalesvl ) + 1.5;
            console.log ("calculos 21 Calculo a Etiqueta:",anchoEtiquetavl);

            // segundo calculo
            paso=10;
            anchoEtiquetavl = (anchoEtiquetavl * largovl * repeticionesvl);
            console.log ("calculos 21 Calculo b Etiqueta:",anchoEtiquetavl);

            // asignamos el resultado a el objeto del formulario con 3 decimales
            paso=11;
            setCmsClishe(anchoEtiquetavl);
        } else {
            console.log ("no hay ancho");
        }
        /* original */
        /*
        nTMP_AU1 = IIF(THISFORM.PAGFr1.PAG001.OPTGr1.OPtFlx.Value = 1, ;
                        THISFORM.PAGFr1.PAG001.SPIAnc.Value, ;
                        VAL(THISFORM.PAGFr1.PAG001.CObAnc.Value))
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"nTMP_AU1"+STR(nTMP_AU1,13,4);									
        * ANCHO + 0.4	\*
        nTMP_AU1 = ((nTMP_AU1 + 0.4)* THISFORM.PagFr1.PAg001.SPICAn.Value) + 1.5
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"Calculo 1 nTMP_AU1"+STR(nTMP_AU1,13,4);
        *	ANCHO * (AVANCE + 0.3)	\*
        nTMP_AU1 = nTMP_AU1 * (THISFORM.PAGFr1.PAG001.txtTla.Value * nVarRep)
        thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"Calculo 2 nTMP_AU1"+STR(nTMP_AU1,13,4);					 
        THISFORM.PAgFr1.PAg001.TXTCLI.Value = ROUND(nTMP_AU1, 3)
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo 21!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

// 	METODO QUE HACE EL CALCULO DE LA CANT DE ETQ POR PAGINAS PARA COTIZACIONES CON LA INDIGO
function cep(){
    try {
        console.log ("//---------------entrando cep -----------------//");
        console.log ("METODO QUE HACE EL CALCULO DE LA CANT DE ETQ POR PAGINAS PARA COTIZACIONES CON LA INDIGO");
        paso=1;
        // capturamos el ancho de etiqueta de indigo
        anchoEtiquetavm=getAnchoIndigo();

        // capturamos el avance de la etiqueta
        paso=2;
        avancevm=getAvanceEtiqueta();

        // capturamos la cantidad de colores
        paso=3;
        cantidadColoresvm=getCantidadColores();

        // capturamos el precio del dolar HP
        paso=4;
		nVarCosvm = getDolarHP();
		nVarInivm = 1;
		nVarValvm = 1;
		nVarAuxvm = 0.0000000;
        nTMP_AU1vm=0;
        nTMP_AU2vm=0;

        // validamos los datos
        paso=5;
        if (anchoEtiquetavm!=0.00){
            paso=6;
            switch (anchoEtiquetavm){
                case 29.9:
                    nTMP_AU1vm=1;
                    break;
                case 14.7:
                    nTMP_AU1vm=2;
                    break;   
                case 9.7:
                    nTMP_AU1vm=3;
                    break;
                case 7.1:
                    nTMP_AU1vm=4;
                    break; 
                case 5.5:
                    nTMP_AU1vm=5;
                    break;
                case 4.6:
                    nTMP_AU1vm=6;
                    break;   
                case 3.9:
                    nTMP_AU1vm=7;
                    break;
                case 3.3:
                    nTMP_AU1vm=8;
                    break;
                case 2.9:
                    nTMP_AU1vm=9;
                    break;
                case 2.6:
                    nTMP_AU1vm=10;
                    break;   
                case 2.3:
                    nTMP_AU1vm=11;
                    break;
                case 2.1:
                    nTMP_AU1vm=12;
                    break;                                                                            
            }
        }

        // validamos el avance
        paso=7;
        
        if (avancevm!=0.00){
            if (avancevm <= 1.02){
                nTMP_AU2vm=34;
            } else if ((avancevm > 1.02) && (avancevm <= 1.1)){
                nTMP_AU2vm=32;
            } else if ((avancevm > 1.1) && (avancevm <= 1.2)){
                nTMP_AU2vm=30; 
            } else if ((avancevm > 1.2) && (avancevm <= 1.3)){
                nTMP_AU2vm=28;                                                                                                                 
            } else if ((avancevm > 1.3) && (avancevm <= 1.43)){
                nTMP_AU2vm=26;
            } else if ((avancevm > 1.43) && (avancevm <= 1.5)){
                nTMP_AU2vm=25;
            } else if ((avancevm > 1.5) && (avancevm <= 1.63)){
                nTMP_AU2=23;
            } else if ((avancevm > 1.63) && (avancevm <= 1.74)){
                nTMP_AU2=22;
            } else if ((avancevm > 1.74) && (avance <= 1.84)){
                nTMP_AU2vm=21;
            } else if ((avancevm > 1.84) && (avancevm <= 1.95)){
                nTMP_AU2vm=20;
            } else if ((avancevm > 1.95) && (avancevm <= 2.06)){
                nTMP_AU2vm=19;
            } else if ((avancevm > 2.06) && (avance <= 2.2)){
                nTMP_AU2vm=18;
            } else if ((avance > 2.2) && (avancevm <= 2.34)){
                nTMP_AU2vm=17;
            } else if ((avancevm > 2.34) && (avancevm <= 2.51)){
                nTMP_AU2vm=16;
            } else if ((avancevm > 2.51) && (avancevm <= 2.7)){
                nTMP_AU2vm=15;
            } else if ((avancevm > 2.7) && (avancevm <= 2.91)){   
                nTMP_AU2vm=14;                            
            } else if ((avancevm > 2.91) && (avancevm <= 3.16)){
                nTMP_AU2vm=13;                                
            } else if ((avancevm > 3.16) && (avancevm <= 3.45)){ 
                nTMP_AU2vm=12;                               
            } else if ((avancevm > 3.45) && (avancevm <= 3.79)){  
                nTMP_AU2vm=11;                        
            } else if ((avancevm > 3.79) && (avancevm <= 4.2)){   
                nTMP_AU2vm=10;                              
            } else if ((avancevm > 4.2) && (avancevm <= 4.7)){   
                nTMP_AU2vm=9;                              
            } else if ((avancevm > 4.7) && (avancevm <= 5.32)){    
                nTMP_AU2vm=8;                             
            } else if ((avancevm > 5.32) && (avancevm <= 6.12)){    
                nTMP_AU2vm=7;                             
            } else if ((avancevm > 6.12) && (avancevm <= 7.2)){  
                nTMP_AU2vm=6;                               
            } else if ((avancevm > 7.2) && (avancevm <= 8.7)){                                
                nTMP_AU2vm=5; 
            } else if ((avancevm > 8.7) && (avancevm <= 10.95)){                                
                nTMP_AU2vm=4; 
            } else if ((avancevm > 10.95) && (avancevm <= 14.7)){                                
                nTMP_AU2vm=3; 
            } else if ((avancevm > 14.7) && (avancevm <= 22.2)){     
                nTMP_AU2vm=2;                            
            } else if ((avancevm > 22.2) && (avancevm <= 44.7)){     
                nTMP_AU2vm=1;                            
            } else if ((avancevm > 44.7)){   
                nTMP_AU2vm=1;                              
            }

            // asigna lasrepetciones a una variable
            paso=8;
            nVarRepvm=nTMP_AU2vm;       
            setnVarRepvm(nVarRepvm);
        }


        // valida los campos 
        paso=90;
        if ((nTMP_AU1vm!=0) && (nTMP_AU2vm!=0)){
            paso=9;
            // duplica el precio deimpresion si su avamce es myor que 45
            if(avancevm>= 45){
                paso=10;
                for (i=1; i < 10; i++){
                    paso=11;
                    nVarValvm=45*i;
                    paso=12;
                    if (nVarValvm >= avancevm){
                        paso=13;
                        nVarValvm=i;
                        break;
                    }
                }
            }

            // asigna la cantidad de etiquetas por pagina
            paso=14;
            console.log ("cep 14");
            setCantidadEtiquetasxPaginas((nTMP_AU1vm * nTMP_AU2vm).toFixed(0));

            // capturamos la cantidad de etiquetas por pagina
            paso=15;
            cantidadEtiquetasXPaginasvm=getCantidadEtiquetasxPaginas();
            
            // evalue el color seleccionado de las indigo
            paso=16;
            nVarAuxvm=(((4 * 0.019454 * nVarCosvm) / cantidadEtiquetasXPaginasvm) * nVarValvm);
            
            // CMYK + BLANCO + NARANJA + VIOLETA*
            paso=17;
            opcionesCMYKvm=getColoresIndigo();
            /*
            opciones devueltas
            cmyk
            cmyknv
            cmykb
            cmykv
            cmykbnv
            blanco        
            */
           paso=18;
            switch (opcionesCMYKvm){
                case "cmyk":
                    // solo CMYK
                    paso=19;
                    nVarAuxvm = (((4 * (0.019454 * nVarCosvm)) / cantidadEtiquetasXPaginasvm) * nVarValvm)
                    break;
                case "cmyknv":
                    // CMYK + Naranja + Violeta
                    paso=20;
                    nVarAuxvm =  nVarAuxvm + (((2 * (0.021498* nVarCosvm)) / cantidadEtiquetasXPaginasvm ) * nVarValvm)
                    break;       
                case "cmykb":
                    // CMYK + Blanco
                    paso=21;
                    nVarAuxvm = nVarAuxvm + (((1 * (0.03831 * nVarCosvm)) / cantidadEtiquetasXPaginasvm) * nVarValvm)
                    break;
                case "cmykbnv":
                    // solo CMYK + Blanco + Naranja + Violeta
                    paso=22;
                    nVarAuxvmvm = nVarAuxvm + (((1 * (0.03831 * nVarCosvm)) / cantidadEtiquetasXPaginasvm ) * nVarVal) + (((2 * (0.021498* nVarCosvm)) / cantidadEtiquetasXPaginasvm) * nVarValvm) 
                    break;
                case "blanco":
                    // solo blanco
                    paso=23;
                    nVarAuxvm = ((1 * (0.03831 * nVarCosvm)) / cantidadEtiquetasXPaginasvm)
                    break; 
            }

            // ASIGNA EL VALOR AL COSTO POR IMPRESION DE ETQ	\* 0.01934
            paso=24;
            setCostoXImpresion((nVarAuxvm/nVarCosvm));    
            paso=25;
            changeCostoPorImpresion();          
        } else {
            // ASIGNA LA CANT. DE ETQ X PÁGINA
            paso=26;
            console.log ("cep 26");
            setCantidadEtiquetasxPaginas(0);

            // asigna el valor de costo por impresion
            paso=27;
            setCostoXImpresion(0.00); 
            paso=28;   
            changeCostoPorImpresion();  
        }
        console.log ("//---------------fin cep -----------------//");
        /*
		original profit
			METODO QUE HACE EL CALCULO DE LA CANT DE ETQ POR PAGINAS PARA COTIZACIONES CON LA INDIGO	\*
			VARIABLES LOCALES	\*
		LOCAL nTMP_AU1, nTMP_AU2, nTMP_ANC, nTMP_AVA, nTMP_COL, nVarCos, nVarIni, valor, nVarAux
			ASIGNACION DE VALORES A VARIABLES	\*
		nTMP_AU1 = 0												&&			VARIABLE AUXILIAR 1			&&
		nTMP_AU2 = 0												&&			VARIABLE AUXILIAR 2			&&
		nTMP_ANC = VAL(THISFORM.PAGFR1.PAG001.COBANC.VALUE)			&&	ALMACENA EL ANCHO DE ETQ POR INDIGO	&& 
		nTMP_AVA = THISFORM.PAGFR1.PAG001.SPIAVA.VALUE				&&	ALMACENA EL AVANCE DE LA ETQ INDIGO	&&
		nTMP_COL = THISFORM.PAGFr1.PAG003.SPICol.VALUE				&&	CANTIDAD DE COLORES					&&
		nVarCos = 0.00												&&	ALMACENA EL PRECIO DEL DOLAR		&&
		nVarIni = 1													&&	almacena la iteracion for			&&
		nVarVal = 1													&&	almacena el resultado del for		&&
		nVarAux = 0.0000000
		cTMP_SQL = ""
		cTMP_SQL = cTMP_SQL + " Select cambio from moneda where co_mone = '$HP' "
		SQLEXEC(Tconnect, cTMP_SQL, "vCurMone")
			nVarCos = vCurMone.cambio
			VALIDA QUE TENGA DATOS PARA EJECUTAR EL PROCESO	\*
		IF nTMP_ANC != 0.00 THEN
				CASO PARA EVALUAR EL ANCHO DE ETQ SELECCIONADO	\*
			DO CASE
				CASE nTMP_ANC = 29.9
					nTMP_AU1 = 1
				CASE nTMP_ANC = 14.7
					nTMP_AU1 = 2
				CASE nTMP_ANC = 9.7
					nTMP_AU1 = 3
				CASE nTMP_ANC = 7.1
					nTMP_AU1 = 4
				CASE nTMP_ANC = 5.5
					nTMP_AU1 = 5
				CASE nTMP_ANC = 4.6
					nTMP_AU1 = 6
				CASE nTMP_ANC = 3.9
					nTMP_AU1 = 7
				CASE nTMP_ANC = 3.3
					nTMP_AU1 = 8
				CASE nTMP_ANC = 2.9
					nTMP_AU1 = 9
				CASE nTMP_ANC = 2.6
					nTMP_AU1 = 10
				CASE nTMP_ANC = 2.3
					nTMP_AU1 = 11
				CASE nTMP_ANC = 2.1				
					nTMP_AU1 = 12
			ENDCASE
		ENDIF
		VALIDA SI TIENE DATOS PARA EJECUTAR EL PROCESO	\*
		IF nTMP_AVA != 0.00 THEN
			CASO PARA EVALUAR EL AVANCE DE ETQ	\*
    		DO CASE
				CASE nTMP_AVA <= 1.20
					nTMP_AU2 = 34
				CASE nTMP_AVA > 1.02 AND nTMP_AVA <= 1.10
					nTMP_AU2 = 32
				CASE nTMP_AVA > 1.10 AND nTMP_AVA <= 1.20					
					nTMP_AU2 = 30
				CASE nTMP_AVA > 1.20 AND nTMP_AVA <= 1.30
					nTMP_AU2 = 28
				CASE nTMP_AVA > 1.30 AND nTMP_AVA <= 1.43
					nTMP_AU2 = 26
				CASE nTMP_AVA > 1.43 AND nTMP_AVA <= 1.50
					nTMP_AU2 = 25
				CASE nTMP_AVA > 1.50 AND nTMP_AVA <= 1.63
					nTMP_AU2 = 23
				CASE nTMP_AVA > 1.63 AND nTMP_AVA <= 1.74
					nTMP_AU2 = 22
				CASE nTMP_AVA > 1.74 AND nTMP_AVA <= 1.84
					nTMP_AU2 = 21
				CASE nTMP_AVA > 1.84 AND nTMP_AVA <= 1.95
					nTMP_AU2 = 20
				CASE nTMP_AVA > 1.95 AND nTMP_AVA <= 2.06
					nTMP_AU2 = 19
				CASE nTMP_AVA > 2.06 AND nTMP_AVA <= 2.20
					nTMP_AU2 = 18
				CASE nTMP_AVA > 2.20 AND nTMP_AVA <= 2.34
					nTMP_AU2 = 17
				CASE nTMP_AVA > 2.34 AND nTMP_AVA <= 2.51
					nTMP_AU2 = 16
				CASE nTMP_AVA > 2.51 AND nTMP_AVA <= 2.70
					nTMP_AU2 = 15
				CASE nTMP_AVA > 2.70 AND nTMP_AVA <= 2.91
					nTMP_AU2 = 14
				CASE nTMP_AVA > 2.91 AND nTMP_AVA <= 3.16
					nTMP_AU2 = 13
				CASE nTMP_AVA > 3.16 AND nTMP_AVA <= 3.45
					nTMP_AU2 = 12
				CASE nTMP_AVA > 3.45 AND nTMP_AVA <= 3.79
					nTMP_AU2 = 11
				CASE nTMP_AVA > 3.79 AND nTMP_AVA <= 4.20
					nTMP_AU2 = 10
				CASE nTMP_AVA > 4.20 AND nTMP_AVA <= 4.70
					nTMP_AU2 = 09
				CASE nTMP_AVA > 4.70 AND nTMP_AVA <= 5.32
					nTMP_AU2 = 08
				CASE nTMP_AVA > 5.32 AND nTMP_AVA <= 6.12
					nTMP_AU2 = 07
				CASE nTMP_AVA > 6.12 AND nTMP_AVA <= 7.20
					nTMP_AU2 = 06
				CASE nTMP_AVA > 7.20 AND nTMP_AVA <= 8.70
					nTMP_AU2 = 05
				CASE nTMP_AVA > 8.70 AND nTMP_AVA <= 10.95
					nTMP_AU2 = 04
				CASE nTMP_AVA > 10.95 AND nTMP_AVA <= 14.70
					nTMP_AU2 = 03
				CASE nTMP_AVA > 14.70 AND nTMP_AVA <= 22.20
					nTMP_AU2 = 02
				CASE nTMP_AVA > 22.20 AND nTMP_AVA <= 44.70
					nTMP_AU2 = 01
				CASE nTMP_AVA > 44.70
					nTMP_AU2 = 01
			ENDCASE
			*{	Asigna la cant. de repeticiones por Página Indigo	}*
			nVarRPP = nTMP_AU2
		ENDIF
		VALIDA LOS DATOS NECESARIOS	\*
		IF nTMP_AU1 != 0 AND nTMP_AU2 != 0 THEN
			*{	Duplica el costo de la hoja de impresion si su avance es mayor a 45 }*
			IF nTMP_AVA >= 45
				FOR nVarIni = 1 TO 10 
					nVarVal = 45 * nVarIni
					IF nVarVal >= nTMP_AVA
						nVarVal = nVarIni
						EXIT 
					ENDIF 					
				NEXT 
			ENDIF 
			ASIGNA LA CANT. DE ETQ X PÁGINA	\*
			THISFORM.PAGFR1.PAG002.TXTCEP.VALUE = INT(nTMP_AU1 * nTMP_AU2)
			*	evalua el color seleccionado de la indigo	*
				* SOLO CMYK	*
				nVarAux = (((4 * (0.019454 * nVarCos)) / THISFORM.PAGFR1.PAG002.TXTCEP.VALUE) * nVarVal)
				* CMYK + BLANCO	*
				IF thisform.pagFr1.pag003.optGR3.opt002.Value = 1
					nVarAux = nVarAux + (((1 * (0.03831 * nVarCos)) / THISFORM.PAGFR1.PAG002.TXTCEP.VALUE) * nVarVal)
				ELSE
					* CMYK + BLANCO	+ NARANJA + VIOLETA*
					IF thisform.pagFr1.pag003.optGR3.opt003.Value = 1
						nVarAux = nVarAux + (((1 * (0.03831 * nVarCos)) / THISFORM.PAGFR1.PAG002.TXTCEP.VALUE) * nVarVal) ;
										 + (((2 * (0.021498* nVarCos)) / THISFORM.PAGFR1.PAG002.TXTCEP.VALUE) * nVarVal) 
					ELSE
						* CMYK + NARANJA Y VIOLETA*
						IF thisform.pagFr1.pag003.optGR3.opt004.Value = 1
							nVarAux =  nVarAux + (((2 * (0.021498* nVarCos)) / THISFORM.PAGFR1.PAG002.TXTCEP.VALUE) * nVarVal)
						ELSE
							* SOLO BLANCO	*
							IF thisform.pagFr1.pag003.optGR3.opt005.Value = 1
								nVarAux = ((1 * (0.03831 * nVarCos)) / THISFORM.PAGFR1.PAG002.TXTCEP.VALUE)
							ENDIF 
						ENDIF 
					ENDIF 
				ENDIF 
				ASIGNA EL VALOR AL COSTO POR IMPRESION DE ETQ	\* 0.01934
			* modificado el 2025-04-07 se agrego el factor de division 4,2 para poder dolarizar el costo que da en BS
			THISFORM.PAGFR1.PAG002.TXTCPI.VALUE = nVarAux / 4.2
		ELSE
				ASIGNA LA CANT. DE ETQ X PÁGINA	\*
			THISFORM.PAGFR1.PAG002.TXTCEP.VALUE = 0
				ASIGNA EL VALOR AL COSTO POR IMPRESION DE ETQ	\*
			THISFORM.PAGFR1.PAG002.TXTCPI.VALUE = 0.000
		ENDIF
        */

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo CEP!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 

}