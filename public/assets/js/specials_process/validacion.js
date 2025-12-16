function validar(){
    try {
        cVarColorError="#f0ac74";
        console.log ("Entrando validar cotizacion");
        paso=1;

        valido=true;
        paso=2;
        //============================= validamos los objetos de la pagina generales ===============
        tipoCotizacion=getTipoCotizacion();
        paso=3;
        if(tipoCotizacion==1){
            paso=4;
            // cotizaciones flexo
            codTroquel=getCodigoTroquelSuperficie();
            paso=5;
            tipoTroquel=getTipoTroquel();
            paso=6;
            // validamos que el troquel este correcto
            if ((codTroquel=="") || (typeof(codTroquel)=="undefined")){
                paso=7;
                if ((tipoTroquel=="1") ){
                    paso=8;
                    document.getElementById('txtCodigoTroquelSuperficie').style.backgroundColor=cVarColorError;
                    msgError("No se ha definido un troquel de superfice<br>Por favor verifique");
                    paso=9;
                    return (false);
                }
            }
            // validamos el ancho
            paso=10;
            anchoEtiqueta=getAnchoFlexo();
            console.log ("ancho de etiqueta validacion",anchoEtiqueta, " paso:", paso);
            paso=11;
            if ((anchoEtiqueta==0.00) || (typeof(anchoEtiqueta)=="undefined") || (Number.isNaN(anchoEtiqueta))){
                paso=12;
                document.getElementById('txtAnchoEtiqueta').style.backgroundColor=cVarColorError;
                msgError("Ingrese el ancho de Etiqueta");
                paso=13;
                return (false); 
            } 

            paso=14;
            // si es nuevo
            if (tipoTroquel==3){
                paso=15;
                // validamos las repeticiones del troquel
                repTroquel=getRepeticionesTroquel();
                repTroquel2=getRepeticiones();
                console.log ("repeticiones troquel validacion", repTroquel, " paso:", paso);
                paso=16;
                if ((repTroquel==0) ||(typeof(repTroquel)=="undefined") ||(Number.isNaN(repTroquel))){
                    paso=17;
                    document.getElementById('txtRepeticionesTroquel').style.backgroundColor=cVarColorError;
                    msgError("Ingrese la cant. de Repeticiones del Troquel");
                    paso=18;
                    return (false);                 
                }

                // validamos la cantidad de dientes
                paso=19;
                dieTroquel=getDientes();
                console.log ("dientes troquel validacion", dieTroquel, " paso:", paso);
                paso=20;
                if ((dieTroquel==0) ||(typeof(dieTroquel)=="undefined")  ||(Number.isNaN(dieTroquel))){
                    paso=21;
                    document.getElementById('txtDientes').style.backgroundColor=cVarColorError;
                    msgError("Ingrese la cant. de Dientes del Troquel");
                    paso=22;
                    return (false);                 
                }    
                // si usa troquel laser se valida las repeticiones
                paso=23;
                console.log ("repeticiones troquel validacion", repTroquel, " paso:", paso);
                if (codTroquel.includes("LASER")){
                    paso=24;
                    if ((repTroquel==0) || (typeof(repTroquel)=="undefined") || (Number.isNaN(repTroquel))){
                        paso=25;
                        document.getElementById('txtRepeticiones').style.backgroundColor=cVarColorError;
                        msgError("Ingrese la cant. de Repeticiones del Troquel");
                        paso=26;
                        return (false);                 
                    }
                }
            }        
        } else {
            paso=27;
            // cotizaciones indigo
            anchoEtiqueta=getAnchoIndigo();
            console.log ("ancho etiqueta validacion", anchoEtiqueta, " paso:", paso);
            paso=28;
            if ((anchoEtiqueta=0.00) || (typeof(anchoEtiqueta)=="undefined") || (Number.isNaN(anchoEtiqueta))){
                paso=29;
                document.getElementById('selAnchoEtiqueta').style.backgroundColor=cVarColorError;
                msgError("Debe seleccionar el ancho de Etiqueta");
                paso=30;
                return (false); 
            }
            // validamos que se haya definido el troquel
            paso=31;
            codTroquel=getCodigoTroquelSuperficie();
            console.log ("codigo troquel validacion", codTroquel, " paso:", paso);
            paso=32;
            if ((codTroquel=="") || (typeof(codTroquel)=="undefined")){
                paso=33;
                document.getElementById('txtCodigoTroquelSuperficie').style.backgroundColor=cVarColorError;
                msgError("No se ha definido un troquel de superfice<br>Por favor verifique");
                paso=34;
                return (false);
            } 
        }        

        // AVANCE DE ETIQUETA	\*
        paso=40;
        avanceEtiqueta=getAvanceEtiqueta();
        if ((avanceEtiqueta=="") || (typeof(avanceEtiqueta)=="undefined") || (Number.isNaN(avanceEtiqueta))){
            paso=41;
            document.getElementById('txtAvanceEtiqueta').style.backgroundColor=cVarColorError;
            paso=42;
            msgError("Indique el avance de la Etiqueta");
            paso=43;
            return (false);
        } 

        //	VALIDA LA CANTIDAD DE CANALES	\*
        paso=45;
        canales=getCanalesEtiqueta();
        if ((canales=="") || (typeof(canales)=="undefined") || (Number.isNaN(canales))){
            paso=46;
            document.getElementById('txtCanales').style.backgroundColor=cVarColorError;
            paso=47;
            msgError("Ingrese la cantidad de canales a Fabricar la Etiqueta");
            paso=47;
            return (false);
        }

        //	VALIDA LA CANTIDAD DE ETIQUETAS	\*
        paso=50;
        cantidadEtiquetas=getCantidadEtiquetas();
        if ((cantidadEtiquetas=="") || (typeof(cantidadEtiquetas)=="undefined") || (Number.isNaN(cantidadEtiquetas)) || (cantidadEtiquetas==0)){
            paso=51;
            document.getElementById('txtCantidadEtiquetas').style.backgroundColor=cVarColorError;
            paso=52;
            msgError("Ingrese la Cant. de Etiquetas Solicitadas por el Cliente");
            paso=53;
            return (false);
        }

        
        //	% DE SEGURIDAD	\*
        paso=50;
        porcentajeSeguridad=getPorcentajeSeguridad();
        if ((porcentajeSeguridad=="") || (typeof(porcentajeSeguridad)=="undefined") || (Number.isNaN(porcentajeSeguridad)) || (porcentajeSeguridad==0.00)){
            paso=51;
            document.getElementById('txtPorcentajeSeguridad').style.backgroundColor=cVarColorError;
            paso=52;
            msgError("Ingrese un Porcentaje de Seguridad valido");
            paso=53;
            return (false);
        }        
       
        //============================= validamos los objetos de la pagina presentacion ===============
        //	PAQUETES	\*
        paso=60;
        tipoPresentacion=getTipoPresentacion();
        if ((porcentajeSeguridad=="") || (typeof(porcentajeSeguridad)=="undefined")){
            paso=61;
            msgError("No se ha definido el tipo de presentación");
            paso=62;
            return (false);
        } else {
            paso=63;
            if (tipoPresentacion=="paquete"){
                paso=64;
                dobladas=getDobladasCadaCuanto();
                paso=65;
                if ((dobladas=="") || (typeof(dobladas)=="undefined") || (Number.isNaN(dobladas)) || (dobladas==0)){
                    paso=66;
                    // Construcción del mensaje (usando \n para el salto de línea CHR(13)):
                    mensaje = "No ha definido la cant de dobles por paquete\n\n    ¿Desea continuar con la operación?";
                    paso=67;
                    // 1. Mostrar el cuadro de diálogo de confirmación.
                    //    - Si el usuario presiona 'Aceptar' (equivalente a Sí), la función devuelve 'true'.
                    //    - Si el usuario presiona 'Cancelar' (equivalente a No), la función devuelve 'false'.
                    deseaContinuar = confirm(mensaje);
                    paso=68;
                    // 2. Evaluar la respuesta. La lógica VFP busca "No" (valor 7),
                    //    así que comprobamos si la respuesta es 'false' (el usuario presionó Cancelar/No).
                    if (deseaContinuar === false) {
                        paso=69;
                        document.getElementById('txtDobladasCada').style.backgroundColor=cVarColorError;
                        paso=70;
                        return (false);
                    } 

                } 
            }
        }

        //	VALIDA LA CANT DE ETQ POR PRESENTACION	\*
        paso=80;
        etiquetasPorRollo=getEtiquetasXRollo();
        paso=81;
        if ((etiquetasPorRollo=="") || (typeof(etiquetasPorRollo)=="undefined") || (Number.isNaN(etiquetasPorRollo)) || (etiquetasPorRollo==0)){
            paso=82;
            document.getElementById('cantXRollos').style.backgroundColor=cVarColorError;
            paso=83;
            msgError("Ingrese la cant. de Etq por Presentación");
            paso=84;
            return (false);
        } else {
            paso=85;
            if (etiquetasPorRollo > cantidadEtiquetas){
                paso=86;
                document.getElementById('cantXRollos').style.backgroundColor=cVarColorError;
                paso=87;
                msgError("La Cant. por Presentación no puede ser mayor que las Etq. Solicitadas");
                paso=88;
                return (false);                
            }
        }       

        //	VALIDA EL DIAMETRO DEL CORE	\*
        paso=90;
        diametroCore=document.getElementById('txtDiametroCore').value;
        paso=91;
        if ((diametroCore=="") || (typeof(diametroCore)=="undefined") || (Number.isNaN(diametroCore)) || (diametroCore==0)){
            paso=92;
            document.getElementById('diametroCore').style.backgroundColor=cVarColorError;
            paso=93;
            mensaje = "No ha definido un Diámetro del Core\n\n¿Desea continuar con la operación?";
            paso=94;
            // 1. Mostrar el cuadro de diálogo de confirmación.
            //    - Si el usuario presiona 'Aceptar' (equivalente a Sí), la función devuelve 'true'.
            //    - Si el usuario presiona 'Cancelar' (equivalente a No), la función devuelve 'false'.
            deseaContinuar = confirm(mensaje);
            paso=95;
            // 2. Evaluar la respuesta. La lógica VFP busca "No" (valor 7),
            //    así que comprobamos si la respuesta es 'false' (el usuario presionó Cancelar/No).
            if (deseaContinuar === false) {
                paso=96;
                return (false);
            } 
        }        
      
        //	VALIDA LA CANT DE CANALES A DESPACHAR	\*
        paso=100;
        canalesADespachar=getCanalesDespachar();
        if ((canalesADespachar=="") || (typeof(canalesADespachar)=="undefined") || (Number.isNaN(canalesADespachar)) || (canalesADespachar==0)){
            paso=101;
            document.getElementById('canalesDesp').style.backgroundColor=cVarColorError;
            paso=102;
            msgError("Ingrese la Cant. de Canales a despachar las Etiquetas");
            paso=103;
            return (false);
        }  

        //	DESCRIPCION DE LA ETIQUETA	\*
        paso=110;
        nombreEtiqueta=getNombreEtiqueta();
        if ((nombreEtiqueta=="") || (typeof(nombreEtiqueta)=="undefined")){
            paso=111;
            document.getElementById('nombreEtiqueta').style.backgroundColor=cVarColorError;
            paso=112;
            msgError("Ingrese la descripción de la Etiqueta");
            paso=113;
            return (false);
        }  

        //	VALIDA EL EMBOBINADO	\*
        paso=115;
        embobinadoF=document.getElementById('txtEmbobinadoFrontal').value;
        paso=116;
        embobinadoD=document.getElementById('txtEmbobinadoDorsal').value;
        paso=117;
        pegarManual=getPegarManual();
        paso=118;
        if (((embobinadoF=="") || (typeof(embobinadoF)=="undefined")) &&
            ((embobinadoD=="") || (typeof(embobinadoD)=="undefined")) &&
            (!pegarManual)){
            paso=119;
            msgError("Por favor defina un embobinado ó active la casilla de pegado manual");
            paso=120;
            return (false);
        } 

        //	VALIDA LA NUMERACION CON RIBBON	\*
        paso=125;
        imprimirRibbon=getImprimirRibbon();
        paso=126;
        desdeRibbon=getDesdeRibbon();
        paso=127;
        hastaRibbon=getHastaRibbon();
        // verificamos si esta activo el check
        paso=128;
        checkTextoRibbon=getCheckTextoRibbon();
        paso=129;
        textoRibbon=getTextoRibbon();
        paso=130;
        if (imprimirRibbon){
            paso=131;
            // verificamos que desde este correcto
            if ((desdeRibbon=="") || (typeof(desdeRibbon)=="undefined") || (Number.isNaN(desdeRibbon)) ){
                paso=132;
                document.getElementById('numeracionDesde').style.backgroundColor=cVarColorError;
                paso=133;
                msgError("Ingrese el inicio de la numeración con ribbon");
                paso=134;
                return (false);
            }  
            
            // verificamos que hasta este correcto
            paso=135;
            if ((hastaRibbon=="") || (typeof(hastaRibbon)=="undefined") || (Number.isNaN(hastaRibbon)) ){
                paso=136;
                document.getElementById('numeracionHasta').style.backgroundColor=cVarColorError;
                paso=137;
                msgError("Ingrese la culminación de la numeración con ribbon");
                paso=138;
                return (false);
            }    
            
            // verificamos si esta activo la descripcion del ribbon
            paso=139;
            if (checkTextoRibbon){
                paso=140;
                if ((textoRibbon =="") || (typeof(textoRibbon)=="undefined") ){
                    paso=141;
                    document.getElementById('textoRibbon').style.backgroundColor=cVarColorError;
                    paso=142;
                    msgError("Ingrese la descripción con ribbon");
                    paso=143;
                    return (false);
                }                 
            }
        }
        
        //	SIGNADO	\*
        paso=150;
        utilizaSignado=getUsaraSignado();
        paso=151;
        textoSignado=getTextosignado();
        paso=152;
        // verificamos si esta activo el signado
        if (utilizaSignado){
            paso=153;
            // verificamos si no esta vacio el texto de signado
            if ((textoSignado =="") || (typeof(textoSignado)=="undefined") ){
                paso=155;
                document.getElementById('txtUtilizaSignado').style.backgroundColor=cVarColorError;
                paso=156;
                msgError("Ingrese el Signado a utilizar");
                paso=157;
                return (false);
            }  
            // verificamos las pulgadas del signado
            paso=158;
            pulgadasSignado=getPulgadasSignado();
            paso=159;
            primerCaracter=textoSignado[0];
            paso=160;
            if ((primerCaracter!="") 
                && (typeof(primerCaracter)!="undefined") 
                && (primerCaracter=="S")  
                && (pulgadasSignado)==0)
            {
                paso=155;
                document.getElementById('pulgadas').style.backgroundColor=cVarColorError;
                paso=156;
                msgError("Ingrese la pulgada del Signado");
                paso=157;
                return (false);
            }
        }
        
        // agregado el 2025-05-13 para validar que se haya seleccionado uno de los elementos en caso de etiqueta nueva
        paso=200;
        tipoEtiqueta=getTipoEtiqueta();
        paso=201;
        arteLan=getArteLAN();
        paso=202;
        levantarArte=getLevantarArte();
        paso=203;
        txtObservaciones=getObservaciones();
        // verificamos si es una etiqueta nueva

        if (tipoEtiqueta=="Nueva"){
            paso=204;
            // validamos si el arte es ta en la red o hay que lavantarlo
            if (!arteLan && !levantarArte){
                paso=205;
                msgError("Debe seleccionar una de las siguientes opciones<br>Arte en Red LAN ó<br>Levantar Arte");
                paso=206;
                return (false);                
            }

            // validamos si se escribio una observacion, esto es obligatorio en las etiquetas nuevas
            paso=207;
            if ((txtObservaciones=="") ||
                (typeof(txtObservaciones)=="undefined")){
                paso=208;
                document.getElementById('txtObservaciones').style.backgroundColor=cVarColorError;
                paso=209;
                msgError("Las etiquetas Nuevas deben tener una observación obligatoria");
                paso=210;
                return (false);
               
            }
        }

        //============================= validamos los objetos de la pagina costos ===============
        paso=230;
        // validamos el codigo del material a utilizar 
        codigoMaterial=getCodigoMaterial();
        if ((codigoMaterial=="") || (typeof(codigoMaterial)=="undefined")){
            paso=231;
            document.getElementById('codigoMaterial').style.backgroundColor=cVarColorError;
            paso=232;
            msgError("Ingrese el Material a utilizar");
            paso=233;
            return (false);
            
        }        

        // validamos la cantidad de colores
        paso=240;
        cantidadColores=getCantidadColores();
        paso=241;
        precioColor=getPrecioColores();
        console.log ("validando precio color", precioColor);
        paso=242;
        precioClishe=getPrecioClishe();
        // validamos que se haya definido cantidad de colores
        if ((cantidadColores!="") && (typeof(cantidadColores!="undefined")) && (!Number.isNaN(cantidadColores))){
            // si se definio cantidad de colores
            if (cantidadColores!=0){
                // validamos que exista el precio de color
                if ((precioColor=="") || (typeof(precioColor)=="undefined") || (Number.isNaN(precioColor)) || (precioColor==0.00)){
                    // no se han definido precio de colores
                    paso=243;
                    document.getElementById('txtPrecioColores').style.backgroundColor=cVarColorError;
                    paso=244;
                    msgError("Ingrese el precio por Color");
                    paso=245;
                    return (false);
                }

                // validamos si existe el precio del clishe
                // validamos que exista el precio de color
                paso=246;
                if ((precioClishe=="") || (typeof(precioClishe)=="undefined") || (Number.isNaN(precioClishe)) || (precioClishe==0.00)){
                    paso=247;
                    mensaje = "No ha definido el precio del clishe\n\n¿Desea continuar con la operación?";
                    paso=248;
                    // 1. Mostrar el cuadro de diálogo de confirmación.
                    //    - Si el usuario presiona 'Aceptar' (equivalente a Sí), la función devuelve 'true'.
                    //    - Si el usuario presiona 'Cancelar' (equivalente a No), la función devuelve 'false'.
                    deseaContinuar = confirm(mensaje);
                    paso=249;
                    // 2. Evaluar la respuesta. La lógica VFP busca "No" (valor 7),
                    //    así que comprobamos si la respuesta es 'false' (el usuario presionó Cancelar/No).
                    if (deseaContinuar === false) {
                        paso=250;
                        return (false);
                    } 
                }                    
            } else {
                paso=251;
                // no se han definido colores validamos que la impresion sea digital
                tipoCotizacion=getTipoCotizacion();
                paso=252;
                if (tipoCotizacion==2){
                    // no se han definido precio de colores
                    paso=253;
                    document.getElementById('txtCantidadColores').style.backgroundColor=cVarColorError;
                    paso=254;
                    msgError("Ingrese al menos un color");
                    paso=255;
                    return (false);
                }
            }
        } 
     
        paso=260;
        // validamos el factor
        factor=getFactor();
        if ((factor =="") || (typeof(factor)=="undefined") || (Number.isNaN(factor)) || (factor==0.00)){
            paso=261;
            document.getElementById('txtFactor').style.backgroundColor=cVarColorError;
            paso=262;
            msgError("Ingrese el Factor de venta");
            paso=263;
            return (false);
        } 

        // validamos el precio de la etiqueta
        paso=270;
        precioEtiqueta=getPrecioEtiqueta();
        if ((precioEtiqueta =="") || (typeof(precioEtiqueta)=="undefined") || (Number.isNaN(precioEtiqueta)) || (precioEtiqueta==0.00)){
            paso=271;
            document.getElementById('txtPrecioEtiqueta').style.backgroundColor=cVarColorError;
            paso=272;
            msgError("Verifique el precio de Venta de la Etiqueta");
            paso=273;
            return (false);
        } 

        // validamos el desperdicio por ancho de bobina
        paso=280;
        asumirDesperdicio=getAsumirDesperdicio();
        paso=281;
        diferenciaAnchoBobina=getDifAncho();
        paso=282;
        if (asumirDesperdicio){
            paso=283;
            if ((diferenciaAnchoBobina=="") || (typeof(diferenciaAnchoBobina)=="undefined") || (Number.isNaN(diferenciaAnchoBobina)) && (diferenciaAnchoBobina<0.00)){
                paso=284;
                cadena=`El ancho por desperdicio de bobina adicional no puede ser ${diferenciaAnchoBobina}<br>`
                paso=285;
                cadena=cadena+` por favor verifique el ancho de bobina solicitado<br>`;
                paso=286;
                cadena=cadena+` con el ancho disponible, recuerde que:<br>`;
                paso=287;
                cadena=cadena+` el ancho de bobina disponible debe ser mayor que el solicitado`;
                paso=288;
                msgError(cadena);
                paso=289;
                return (false);                    
            }        
        }

        // validamos los foils
        // en este paso se valida que si se definio un ancho del foil 
        // entonces los colores no deben estar vacios
        paso=300;
        cVarFoil1=getColorFoil1();
        paso=301;
        cVarFoil2=getColorFoil2();
        paso=302;
        nVarAnchoFoil=getAnchoFoil();
        console.log ("validacion ancho del foil", nVarAnchoFoil, " paso ", paso);
        // en este paso se valida que si se definio colores de foils
        // entonces el ancho del foil no debe estar vacio
        console.log ("validacion cVarFoil1 valor", cVarFoil1, paso);
        console.log ("validacion cVarFoil1 ancho variable ", cVarFoil1.length, paso);
        console.log ("validacion cVarFoil1 tipo ", typeof(cVarFoil1), paso);

        console.log ("validacion cVarFoil2 valor ", cVarFoil2, paso);
        console.log ("validacion cVarFoil2 ancho ", cVarFoil2.length, paso);
        console.log ("validacion cVarFoil2 tipo ", typeof(cVarFoil2), paso);

        console.log ("validacion nVarAnchoFoil valor ", nVarAnchoFoil, paso);
        console.log ("validacion nVarAnchoFoil tipo", typeof(nVarAnchoFoil), paso);        

        // verificamos que exista un color de foil1 o de foil2
        if (((cVarFoil1=="Ninguno") ||  (typeof(cVarFoil1)=="undefined") || (cVarFoil1.length==0)) && ((cVarFoil2=="Ninguno") ||  (typeof(cVarFoil2)=="undefined") ||  (cVarFoil2.length==0))){
            // verificamos si hay un acho de foil
            paso=303;
            if ((nVarAnchoFoil!="") && (typeof(nVarAnchoFoil)!="undefined") && (!Number.isNaN(nVarAnchoFoil)) && (nVarAnchoFoil!=0)){
                paso=304;
                cadena="Ha definido ancho para los Foils, ";
                cadena=cadena+"sin embargo no ha suministrado los colores para los mismos paso:"+paso;
                msgError(cadena);
                paso=305;
                return (false);                          
            }
        }

        // en este paso se valida que si se definio colores de foils
        // entonces el ancho del foil no debe estar vacio
        paso=30001;
        console.log ("validacion cVarFoil1", cVarFoil1, paso);
        console.log ("validacion cVarFoil1", cVarFoil1.length, paso);
        console.log ("validacion cVarFoil1", typeof(cVarFoil1), paso);

        console.log ("validacion cVarFoil2", cVarFoil2, paso);
        console.log ("validacion cVarFoil2", cVarFoil2.length, paso);
        console.log ("validacion cVarFoil2", typeof(cVarFoil2), paso);

        console.log ("validacion nVarAnchoFoil", nVarAnchoFoil, paso);
        console.log ("validacion nVarAnchoFoil", typeof(nVarAnchoFoil), paso);        

        paso=310;
        if (((cVarFoil1!="Ninguno") && (cVarFoil1!="") &&  (typeof(cVarFoil1)!="undefined") && (cVarFoil1.length!=0)) || ((cVarFoil2!="Ninguno")  && (cVarFoil2!="") &&  (typeof(cVarFoil2)!="undefined") &&  (cVarFoil2.length!=0))){
            if ((nVarAnchoFoil=="") || (typeof(nVarAnchoFoil)=="undefined") || (Number.isNaN(nVarAnchoFoil)) || (nVarAnchoFoil==0)){
                paso=311;
                cadena="Ha definido Colores para los Foils, ";
                cadena=cadena+"sin embargo no ha definido un ancho para el mismo paso:"+paso ;
                paso=312;
                msgError(cadena);
                paso=313;
                return (false);                          
            }
        }


        paso=1000;
        return (valido);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error validar cotizacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 

    /*
    original foxpro
		//	METODO QUE HACE LA VALIDACION DE LOS DATOS ANTES DE GUARDAR	\*
		//	PARAMETRO	\*
		LPARAMETERS bTMP_VAL
		******************************************************************************
		* agregado el 2025-02-19
		* inicializamos los cuadro de texto de ancho y colores de los foils
		thisform.pagFr1.pag003.txtColorFoil1.BackColor=RGB(255,255,255)
		thisform.pagFr1.pag003.txtColorFoil2.BackColor=RGB(255,255,255)
		thisform.pagFr1.pag003.txtAnchoFoil.BackColor=RGB(255,255,255)
		******************************************************************************
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