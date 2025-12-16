const STORAGE_KEY = 'comentariosArticulos';

function guardarRenglonCotizacion(){
    try {
        console.log ("entrando guardarRenglonCotizacion");
        console.log ("data en local storage");
        console.log (localStorage.getItem('myArrayKey'));
        console.log ("data en arreglo persistencte");
        console.log (myPersistentArray);
        paso=1;
        cTMP_MGD = "";
        paso=2;
        //-------------- elementos seccion generales -----------------
	    //	VALIDA EL TIPO DE COTIZ	\*
        if (getTipoCotizacion()==1){
            // cotizacion flexografica
            paso=3;
            cTMP_MGD = "æ;TipCot=F;"
            paso=4;
            anchoEtiqueta=getAnchoFlexo();
            paso=5;
            cTMP_MGD = cTMP_MGD + "AncEtq=" + anchoEtiqueta.toFixed(2) + ";"
        } else {
            // cotizacion digitalç
            paso=6;
            cTMP_MGD = "æ;TipCot=I;";
            paso=7;
            anchoEtiqueta=getAnchoIndigo();
            paso=8;
            cTMP_MGD = cTMP_MGD + "AncEtq=" + anchoEtiqueta.toFixed(2) + ";"
        }

		//	GUARDA EL ANCHO SOLICITADO	\*
        paso=10;
        anchoSolicitado=getSol();
        paso=11;
		cTMP_MGD = cTMP_MGD + "AncSol=" +anchoSolicitado.toFixed(2) + ";"

        paso=12;
	    //	GUARDA EL TIPO DE TROQUEL	\*
        tipoTroquel=getTipoTroquel();
        paso=13;
        if (tipoTroquel==1){
            // fisico
            paso=14;
            cTMP_MGD = cTMP_MGD + "TipTro=F;"
        } else if (tipoTroquel==2){
            // laser
            paso=15;
            cTMP_MGD = cTMP_MGD + "TipTro=L;"
        } else if (tipoTroquel==3){
            // nuevo
            paso=16;
            cTMP_MGD = cTMP_MGD + "TipTro=N;"
        } else if (tipoTroquel==4){
            // no aplica
            paso=17;
            cTMP_MGD = cTMP_MGD + "TipTro=O;"
        } else if (tipoTroquel==5){
            // tipografico
            paso=18;
            cTMP_MGD = cTMP_MGD + "TipTro=T;"
        }
      
	    //	GUARDA EL TIPO DE COTIZACION	\*
        paso=20;
        tipoCotizacion=getCbbTip();
        paso=21;

        if (tipoCotizacion=="1"){
            paso=22;
            // etiquetas
            cTMP_MGD = cTMP_MGD + "CotPre=E;" ;
        } else if (tipoCotizacion=="2") {
            paso=23;
            // rollos
            cTMP_MGD = cTMP_MGD + "CotPre=R;" ;
        } else if (tipoCotizacion=="3") {
            paso=24;
            // hojas
            cTMP_MGD = cTMP_MGD + "CotPre=H;" ;
        } else if (tipoCotizacion=="4") {
            paso=25;
            // millar
            cTMP_MGD = cTMP_MGD + "CotPre=M;" ;            
        } 


	    //	GUARDA EL CODIGO DEL TROQUEL	\*
        paso=30;
        codigoTroquel=getCodigoTroquelSuperficie();
        paso=31;
		cTMP_MGD = cTMP_MGD + "TroCod=" +codigoTroquel+";";
	
	    //	GUARDA EL CODIGO DEL TROQUEL base	\*
        paso=32;
        codigoTroquelBase=getCodigoTroquelBase();
        paso=33;
		cTMP_MGD = cTMP_MGD + "TroBas=" + codigoTroquelBase + ";";
		

        //	AVANCE DE LA ETIQUETA	\*
        paso=33;
        avanceEtiqueta=getAvanceEtiqueta();
        paso=34;
		cTMP_MGD = cTMP_MGD + "AvaEtq=" + avanceEtiqueta.toFixed(2) + ";";
	
	    //	SEPARACION DE ETQ	\*
        paso=35;
        separacionEtiqueta=getSeparacionEtiqueta();
        paso=36;
		cTMP_MGD = cTMP_MGD + "SepEtq=" + separacionEtiqueta.toFixed(2) + ";";
		
	    //	CANALES DE ETQ	\*
        paso=37;
        canalesEtiquetas=getCanalesEtiqueta();
        paso=38;
		cTMP_MGD = cTMP_MGD + "CanEtq=" + canalesEtiquetas + ";";


	    //	REPETICIONES	\*
        paso=39;
        repeticionesTroquel=getRepeticionesTroquel();
        paso=40
        if ((repeticionesTroquel!="") && (typeof(repeticionesTroquel)!="undefined") && (!Number.isNaN(repeticionesTroquel)) && (repeticionesTroquel!=0)){
            paso=41;
            cTMP_MGD = cTMP_MGD + "RepTro=" +  repeticionesTroquel + ";";
        }
	
	    //	DIENTES	\*
        paso=42;
        dientes=getDientes();
        paso=43;
        if ((dientes!="") && (typeof(dientes)!="undefined") && (!Number.isNaN(dientes)) && (dientes !=0)){
            paso=44;
            cTMP_MGD = cTMP_MGD + "DieTro=" +  dientes + ";";
        }        

        //	CANT. DE ETIQUETAS SOLICITADAS	\*
        paso=45;
        etiquetasSolicitadas=getCantidadEtiquetas();
        paso=46;
		cTMP_MGD = cTMP_MGD + "EtqSol=" + etiquetasSolicitadas + ";";
	
	    //	% DE SEGURIDAD	\*
        paso=46;
        porcentajeSeguridad=getPorcentajeSeguridad();
        paso=46
		cTMP_MGD = cTMP_MGD + "PorSeg=" + porcentajeSeguridad + ";";
		
	    //	ANCHO DE BOBINA	\*
        paso=47;
        anchoBobina=getAnchoBobina();
		paso=48;
        cTMP_MGD = cTMP_MGD + "AncBob=" + anchoBobina.toFixed(2) + ";";

	    //	LARGO TOTAL DE ETIQUETA	\*
        paso=49;
        largoEtiqueta=getLargoEtiqueta();
        paso=50;
		cTMP_MGD = cTMP_MGD + "LarEtq=" + largoEtiqueta.toFixed(2) + ";";
	
	    //	CMS LINEALES	\*
        paso=51;
        cmsLineales=getCmsLineales();
        paos=52;
		cTMP_MGD = cTMP_MGD + "CmsLin=" + cmsLineales.toFixed(2) + ";";
	
	    //	CMS LINEALES TOTAL	\*
        paso=53;
        cmsLinealesTotales=getCmsLinealesTotales();
        paso=54;
		cTMP_MGD = cTMP_MGD + "TotLin=" + cmsLinealesTotales.toFixed(2) + ";";
	
	    //	MTS 2 DE BOBINA	\*
        paso=55;
        mtrs2Bobina=getMtrs2Bobina();
        paso=56;
		cTMP_MGD = cTMP_MGD + "Mt2Bob=" + mtrs2Bobina.toFixed(2) + ";";
	
	    //	MTS LINEALES	\*
        paso=57;
        mtrsLineales=getMtrsLineales();
        paso=58;
		cTMP_MGD = cTMP_MGD + "MtsLin=" + mtrsLineales.toFixed(2) + ";";
        
	    //	MTS 2 DE ETIQUETA	\*
        paso=59;
        mtrs2Etiqueta=getMtrs2Etiquetas();
        paso=60;
		cTMP_MGD = cTMP_MGD + "Mt2Etq=" + mtrs2Etiqueta.toFixed(2) + ";";
	
	    //	CM2 DE CLISHE	\*
        paso=61;
        cms2Clishe=getCmsClishe();
        paso=62;
		cTMP_MGD = cTMP_MGD + "Cm2Cli=" + cms2Clishe.toFixed(2) + ";";
	
	    //	CODIGO DE ETIQUETA	\*
        paso=63;
        codigoEtiqueta=getCodigoEtiqueta();
        paso=64;
		cTMP_MGD = cTMP_MGD + "CodEtq=" + codigoEtiqueta + ";";
		
	    //	FACTOR	\*
        paso=65;
        factor=getFactor();
        paso=66;
		cTMP_MGD = cTMP_MGD + "Factor=" + factor.toFixed(2) + ";";
		
	    //	OBSERVACIONES	\*
        paso=67;
        observaciones=getObservaciones().toUpperCase().trim();
        paso=68;
		cTMP_MGD = cTMP_MGD + "ObsCot=" + observaciones + ";"   ;     


        //-------------- elementos seccion presentacion --------------
    	//	VERIFICA EL TIPO DE PRESENTACION	\*
        paso=70;
        tipoPresentacion=getTipoPresentacion();
        paso=71;
        if (tipoPresentacion=="rollo"){
            // es rollo
            paso=72;
            cTMP_MGD = cTMP_MGD + "TipPre=R;";
        } else {
            // es paquete
            paso=73;
            cTMP_MGD = cTMP_MGD + "TipPre=P;";
            paso=74;
            dobladasCada=getDobladasCadaCuanto();
            paso=75;
            cTMP_MGD = cTMP_MGD + "DobPaq=" + dobladasCada + ";";
        }

        //	CANTIDAD POR PRESENTACION	\*
		paso=76;
        canPre=getEtiquetasXRollo();
        paso=77;
        cTMP_MGD = cTMP_MGD + "CanPre=" + canPre + ";";
	
    	//	CORE (DIAMETRO)	\*
        paso=78;
        diametroCore=getDiametroCore();
        paso=79;
		cTMP_MGD = cTMP_MGD + "CorDia=" + diametroCore.toUpperCase() + ";";
	
	    //	CANALES A DESPACHAR	\*
        paso=80;
        canalesDespachar=getCanalesDespachar();
        paso=81;
		cTMP_MGD = cTMP_MGD + "CanDes=" + canalesADespachar + ";";
	
	    //	CANT DE CORES APROXIMADO	\*
        paso=82;
        cantidadCores=getCantidadCores();
        paso=83;
		cTMP_MGD = cTMP_MGD + "CanCor=" + cantidadCores + ";";
        
	    //	NOMBRE DE LA ETIQUETA	\*
        paso=85;
        nombreEtiqueta=getNombreEtiqueta();
        paso=86;
		cTMP_MGD = cTMP_MGD + "NomEtq=" + nombreEtiqueta + ";";
		
        // verificamos si lleva serigrafia
        paso=87;
        bSerigrafia=getMallaSerigrafica();
        paso=88;
        if (bSerigrafia){
            paso=89;
            cTMP_MGD = cTMP_MGD + "Serigraf=1;";
            paso=90;
            cTMP_MGD = cTMP_MGD + "PrecSerigraf=0;";
        } else {
            paso=91;
            cTMP_MGD = cTMP_MGD + "Serigraf=0;";
            paso=92;
            cTMP_MGD = cTMP_MGD + "PrecSerigraf=0;";
        }

	    //	CANT N° POR PRESENTACION (REBOBINADO)	\*
        paso=93;
        cantidadNPresentacion=getCantNPresentacion();
        paso=94;
		cTMP_MGD = cTMP_MGD + "CanNum=" + cantidadNPresentacion + ";";
	
	    //	CODIGO DEL EMBOBINADO frontal	\*
        paso=95;
        codigoEmb1=getEmbonibadoFrontal();
        paso=96;
		cTMP_MGD = cTMP_MGD + "CodEm1=" + codigoEmb1 + ";";
	
	    //	CODIGO DEL EMBOBINADO dorsal	\*
        paso=98;
        codigoEmb2=getEmbonibadoDorsal();
        paso=99;
		cTMP_MGD = cTMP_MGD + "CodEm2=" + codigoEmb2 + ";";

	
        //	EVALUA EL TIPO DE CLIENTE	\*
        paso=100;
        tipoCliente=getTipoCliente();
        paso=101;
        if (tipoCliente=="cliente"){
            paso=102;
            cTMP_MGD = cTMP_MGD + "TipCli=F;" ;
        } else {
            paso=103;
            cTMP_MGD = cTMP_MGD + "TipCli=D;" ;
        }

        //	VERIFICA SI TIENE NUMERACION RIBBON	\*
        paso=104;
        bRibbon=getImprimirRibbon();
        paso=105;
        if (bRibbon){
            // lleva ribbon
            paso=106;
            cTMP_MGD = cTMP_MGD + "ImpRib=1;";

		    //	NUMERACION	\*
            paso=107;
            bNumeracionRibbon=getCheckNumeracionRibbon();
            paso=108;
            if (bNumeracionRibbon){
                // lleva numeracion de ribbon
                paso=109;
                cTMP_MGD = cTMP_MGD + "RibNum=1;";

                // desde ribbon
                paso=110;
                desdeRibbon=getDesdeRibbon();
                paso=111;
                cTMP_MGD = cTMP_MGD + "RibDes=" + desdeRibbon + ";";

                // hasta ribbon
                paso=112;
                hastaRibbon=getHastaRibbon();
                paso=113;
                cTMP_MGD = cTMP_MGD + "RibHas=" +  hastaRibbon + ";";
            }
		
		    //	DESCRIPCION	\*
            paso=114;
            bTextoRibbon=getCheckTextoRibbon();
            paso=115;
            if (bTextoRibbon){
                paso=116;
                cTMP_MGD = cTMP_MGD + "DesRib=1;";
                paso=117;
                descripcionTextoRibbon=getTextoRibbon();
                paso=118;
                cTMP_MGD = cTMP_MGD + "Descri=" + descripcionTextoRibbon + ";";
            } else {
                paso=119;
                cTMP_MGD = cTMP_MGD + "DesRib=0;";
            }
        } else {
            // no lleva ribbon
            paso=120;
            cTMP_MGD = cTMP_MGD + "ImpRib=0;";
        }

        //	VERIFICA SI ES IMPRESO POR EL ADHESIVO	\*
        paso=121;
        bImpresoAdhesivo=getImprimirAdhsivo();
        paso=122;
        if (bImpresoAdhesivo){
            // lleva impresin por el adhesivo
            paso=123;
            cTMP_MGD = cTMP_MGD + "ImpAdh=1;";
        } else {
            // no lleva impresion por el adhesivo
            paso=124;
            cTMP_MGD = cTMP_MGD + "ImpAdh=0;";
        }
    
        // verificamos si es imrpesion espejo
        paso=125;
        bImpresionEspejo=getImprimiEspejo();
        paso=126;
        if (bImpresionEspejo){
            // lleva impresion espejo
            paso=127;
            cTMP_MGD = cTMP_MGD + "ImpEsp=1;";
        } else {
            // no lleva impresion espejo
            paso=128;
            cTMP_MGD = cTMP_MGD + "ImpEsp=0;";
        }

        //	EVALUA EL TIPO DE ETIQUETA	\*
        paso=129;
        tipoEtiqueta=getTipoEtiqueta();
        paso=130;
        if (tipoEtiqueta=="Nueva"){
            paso=131;
            cTMP_MGD = cTMP_MGD + "TipEtq=N;";
        } else if (tipoEtiqueta=="Modificación"){
            paso=132;
            cTMP_MGD = cTMP_MGD + "TipEtq=M;";
        } else if (tipoEtiqueta=="Repetición"){
            paso=133;
            cTMP_MGD = cTMP_MGD + "TipEtq=R;";
        } else if (tipoEtiqueta=="Blanco"){
            paso=134;
            cTMP_MGD = cTMP_MGD + "TipEtq=B;";
        } else if (tipoEtiqueta=="Fondeada"){
            paso=135;
            cTMP_MGD = cTMP_MGD + "TipEtq=F;";
        }
             
      

	    //	VERIFICA SI ES EL SIGUIENTE RENGLON ES PAR	\*
        paso=140;
        bSignado=getUsaraSignado();
        paso=141;
        if (bSignado){
            paso=142;
            // usara signado
            cTMP_MGD = cTMP_MGD + "SigPar=1;";
        } else {
            paso=143;
            // no usara signado
            cTMP_MGD = cTMP_MGD + "SigPar=0;";
        }
	
        //	FORMA CONTINUA	\*
        paso=144;
        bFormaContinua=getFormaContinua();
        paso=145;
        if (bFormaContinua){
            paso=146;
            // usara forma Continua
            cTMP_MGD = cTMP_MGD + "ForCon=1;";
        } else {
            paso=147;
            // no usara forma continua
            cTMP_MGD = cTMP_MGD + "ForCon=0;";
        }
        
        //	ARTE EN RED LAN	\*
        paso=148;
        bArteLan=getArteLAN();
        paso=149;
        if (bArteLan){
            paso=150;
            // hay arte en la red
            cTMP_MGD = cTMP_MGD + "ArtRed=1;";
        } else {
            paso=151;
            // no hay arte en la red
            cTMP_MGD = cTMP_MGD + "ArtRed=0;";
        }
	
        //	LEVANTAR ARTE	\*	
        paso=152;
        bLevantarArte=getLevantarArte();
        paso=153;
        if (bLevantarArte){
            paso=154;
            // hay que levanatr arte
            cTMP_MGD = cTMP_MGD + "LevArt=1;";
        } else {
            paso=155;
            // no hay que levantar arte
            cTMP_MGD = cTMP_MGD + "LevArt=0;";
        }

        paso=156;
        bPegadoManual=getPegarManual();
        paso=157;
        if (bPegadoManual){
            paso=158;
            // hay que pegar manual
            cTMP_MGD = cTMP_MGD + "PegMan=1;";
        } else {
            paso=159;
            // no hay que pegar manual
            cTMP_MGD = cTMP_MGD + "PegMan=0;";
        }

        //	UTILIZA SIGNADO	\*
        paso=160;
        bUsaSignado=getUsaraSignado();
        paso=161;
        if (bUsaSignado){   
            paso=162;
            // usara signado
            cTMP_MGD = cTMP_MGD + "UsaSig=1;";

            // codigo del signado
            paso=163;
            codigoSignado=getTextosignado();
            paso=164;
            cTMP_MGD = cTMP_MGD + "CodSig=" + codigoSignado + ";";

            // buscaremos si la separacion tiene parte decimal
            paso=165;
            nTMP_VAL=getPulgadasSignado()-parseInt(getPulgadasSignado());

            paso=166;
            if (nTMP_VAL > 0){
                paso=167;
                cTMP_MGD = cTMP_MGD + "PulSig=" + getPulgadasSignado().toFixed(3) + ";";
            } else {
                paso=168;
                cTMP_MGD = cTMP_MGD + "PulSig=" + getPulgadasSignado() + ";";
            }

            // buscamos la separacion del signado
            paso=169;
            separacionSignado=getSignadoCadaXEtq();
    		cTMP_MGD = cTMP_MGD + "SepSig=" + separacionSignado + ";";

        } else {
            // no usara signado
            paso=170;
            cTMP_MGD = cTMP_MGD + "UsaSig=0;";
        }

        //	Agrega la Cant. de Etq por página de Indigo	
        paso=171;
        cantidadEtiquetasPagina=getCantidadEtiquetasxPaginas();
        paso=172;
        cTMP_MGD = cTMP_MGD + "CanEPP=" + cantidadEtiquetasPagina + ";";
	
	    // Agrega la Cant. de Repeticiones por página Indigo	}*
        paso=173;
        nVarRepvm=getnVarRepvm();
        paso=174;
	    cTMP_MGD = cTMP_MGD + "RepInd=" + nVarRepvm + ";";
	        
	

        //-------------- elementos seccion costos --------------------
        //	CODIGO DEL MATERIAL	\*
        paso=175;
        codigoMaterial= getCodigoMaterial();
        paso=176;
        cTMP_MGD = cTMP_MGD + "CodMat=" + codigoMaterial.toUpperCase() + ";";
        
        //	COSTO DEL MATERIAL	\*
        paso=177;
        costoMaterial=getCostoMaterial();
        paso=178;
        cTMP_MGD = cTMP_MGD + "CosMat=" + costoMaterial.toFixed(4) + ";";
        
        //	PRECIO SOLO DEL MATERIAL	\*
        paso=180;
        precioMateial=getCostoMaterial();
        paso=181;
        cTMP_MGD = cTMP_MGD + "PreMat=" + precioMateial.toFixed(4) + ";";

	    //	PRECIO TOTAL DEL MATERIAL	\*
        paso=182;
        precioTotalMaterial=getCostoTotalMaterial();
        paso=183;
	    cTMP_MGD = cTMP_MGD + "PrcMat=" + precioTotalMaterial.toFixed(4) + ";";
	
    	//	COSTO DE ETIQUETA	\*
        paso=184;
        costoEtiqueta=getCostoEtiqueta();
        paso=185;
	    cTMP_MGD = cTMP_MGD + "CosEtq=" + costoEtiqueta.toFixed(4) + ";";

        // opciones de colores
        // verificamos si es indigo
        paso=186;
        tipoCotizacion=getTipoCotizacion();
        paso=187;
        if (tipoCotizacion==2){
            paso=188;
            coloresIndigo=getColoresIndigo();
            paso=189;
            if (coloresIndigo=="cmyk"){
                paso=190;
                valor="1";
            } else if (coloresIndigo=="cmykb"){
                paso=191;
                valor="2";
            } else if (coloresIndigo=="cmykbnv"){
                paos=192;
                valor="3";
            } else if (coloresIndigo=="cmyknv"){
                paos=193;
                valor="4";
            } else if (coloresIndigo=="blanco"){
                paso=195;
                valor="5";
            }
            paso=196;
            cTMP_MGD = cTMP_MGD + valor+";";
        }

    	//	CANTIDAD DE COLORES	\*
        paso=200;
        cantidadColores=getCantidadColores();
        paso=201;
	    cTMP_MGD = cTMP_MGD + "CanCol=" + cantidadColores + ";";
	
	    //	PRECIO POR COLOR	\*
        paso=202;
        precioColor=getPrecioColores();
        paso=203;
	    cTMP_MGD = cTMP_MGD + "PreCol=" + precioColor.toFixed(5) + ";";

        //	PRECIO TOTAL POR COLOR	\*
        paso=204;
        precioTotalColor=getPrecioTotalColores();
	    paso=205;
        cTMP_MGD = cTMP_MGD + "PreTco=" + precioTotalColor.toFixed(5) + ";";
	
	    //	PRECIO POR CLISHE	\*
        paso=206;
        precioClishe=getPrecioClishe();
        paso=207;
	    cTMP_MGD = cTMP_MGD + "PreCli=" + precioClishe.toFixed(2) + ";";

        //	PRECIO TOTAL DEL CLISHE	\*
	    paso=208;
        precioTotalClishe=getResumenTotalClishe();
        paso=209;
        cTMP_MGD = cTMP_MGD + "PreTcl=" + precioTotalClishe.toFixed(2) + ";";

        //	VERIFICA SI TIENE CLISHES ADICIONALES	\*
	    //	GUARDA EL VALOR DEL CLISHE ADICIONAL	\*
        paso=210;
        clisheAdicional=getCantidadClisheAdicional();
        paso=211;
        cTMP_MGD = cTMP_MGD + "CliAdi=" + clisheAdicional + ";";
		 
	    //	PORCENTAJE DE COSTO DE TRANSPORTE	\*
	    paso=212;
        porcentajeTransporte=getPorcentajeTransporte();
        paso=213;
        cTMP_MGD = cTMP_MGD + "PorTra=" + porcentajeTransporte.toFixed(2) + ";";
	
	    //	COSTO DE TRANSPORTE	\*
        paso=214;
	    costoTransporte=getCostoTransporte();
        paso=215;
        cTMP_MGD = cTMP_MGD + "CosTra=" + costoTransporte.toFixed(2) + ";";
	
	    //	PORCENTAJE DE COSTO DE MANO DE OBRA	\*
	    paso=216;
        porcentajeManoObra=getPorcentajeManoObra();
        paso=217;
        cTMP_MGD = cTMP_MGD + "PorMDO=" + porcentajeManoObra.toFixed(2) + ";";
	
	    //	COSTO DE MANO DE OBRA	\*
        paso=218;
        costoManoObra=getCostoManoObra();
        paso=219;
	    cTMP_MGD = cTMP_MGD + "CosMDO=" + costoManoObra.toFixed(2) + ";";
	        
    	//	SUMA DE COSTOS	\*
        paso=220;
        sumaCostos=getSumaCostos();
        paso=221;
	    cTMP_MGD = cTMP_MGD + "SumCos=" + sumaCostos.toFixed(4) + ";";
	
	    //	COSTO TOTAL	\*
        paso=222;
        costoTotal=getCostoTotal();
        paso=223;
	    cTMP_MGD = cTMP_MGD + "CosTot=" + costoTotal.toFixed(4) + ";";
				
	    //	PRECIO DE ETIQUETA	\*
        paso=224;
        precioEtiqueta=getPrecioEtiqueta();
        paso=225;
	    cTMP_MGD = cTMP_MGD + "PreFin=" + precioEtiqueta.toFixed(4) + ";";
		
	    //	ACTIVAR DESCUENTO	\*
        paso=226;
        bDescuento=getHayDescuento();
        paso=227;
        if (bDescuento){
            paso=228;
            valor="1";
        } else {
            paso=229;
            valor="0";
        }
        paso=230;
	    cTMP_MGD = cTMP_MGD + "ActDto=" + valor + ";";
		
	    //	PORCENTAJE DESCUENTO	\*
        paso=231;
        porcentajeDescuento=getDescuento();
        paso=232;
	    cTMP_MGD = cTMP_MGD + "PorDto=" + porcentajeDescuento.toFixed(3) + ";";
		
	    //	DIFERENCIA DE DESCUENTO	\*
        paso=233;
        diferenciaDescuento=getMontoDescontado();
        if ((diferenciaDescuento!="") && (typeof(diferenciaDescuento)!="undefined") && (Number.isNaN(diferenciaDescuento))){
            paso=224;
            console.log ("Diferencia Descuento ",diferenciaDescuento);
            cTMP_MGD = cTMP_MGD + "MonDto=" + diferenciaDescuento.toFixed(3) + ";";
        } else {
            paso=224;
            cTMP_MGD = cTMP_MGD + "MonDto=0.00;";
        }
        
	    //	COSTO DEL MATERIAL POR ETIQUETA	\*
        paso=225;
        costoMaterialEtiqueta=getCostoMaterialEtiquetas();
        paso=226;
	    cTMP_MGD = cTMP_MGD + "MatEtq=" + costoMaterialEtiqueta.toFixed(4) + ";";

        // tipos de acabados
        paso=227;
        bReservaBarniz1=getReservaBarniz();
        paso=228;
        bReservaBarniz2=getReservaBarniz2();
        paso=229;
        bBarniz=getBarniz();
        paso=230;
        bReservaBarnizMate=getReservaBarnizMate();
        paso=231;
        bBarnizMate=getBarnizMate();

        paso=232;
        if (bReservaBarniz1 || bReservaBarniz2){
            paso=233;
            cTMP_MGD = cTMP_MGD + "TipAca=R;";
        } else {
            paso=234;
            if (bBarniz){
                paso=235;
                cTMP_MGD = cTMP_MGD + "TipAca=B;";
            } else {
                paso=236;
                cTMP_MGD = cTMP_MGD + "TipAca=N;";
            }
        }

        paso=237;
        if (bReservaBarniz1){
            paso=238;
            cTMP_MGD = cTMP_MGD + "ResvBar1=1;";
        } else {
            paso=239;
            cTMP_MGD = cTMP_MGD + "ResvBar1=0;";
        }

        paso=240;
        if (bReservaBarnizMate){
            paso=241;
            cTMP_MGD = cTMP_MGD + "BarMat=1;";
        } else {
            paso=242;
            cTMP_MGD = cTMP_MGD + "BarMat=0;";
        }

        paso=243;
        if (bReservaBarniz2){
            paso=244;
            cTMP_MGD = cTMP_MGD + "ResvBar2=1;";
        } else {
            paso=245;
            cTMP_MGD = cTMP_MGD + "ResvBar2=0;";
        }

        if (bBarniz){
            cTMP_MGD = cTMP_MGD + "Barniz=1;";
        } else {
            cTMP_MGD = cTMP_MGD + "Barniz=0;";
        }

        paso=246;
        if (bBarnizMate){
            paso=247;
            cTMP_MGD = cTMP_MGD + "BarMat2=1;";
        } else {
            paso=248;
            cTMP_MGD = cTMP_MGD + "BarMat2=0;";
        }
       
	    //	LAMINACION	\*
        paso=250;
        bLaminacion=getLaminado();
        console.log ("Servicio Laminado Guardar",bLaminacion, "paso:", paso);
        paso=251;
        if (bLaminacion){
            //console.log ("Servicio Laminado Guardar 2",bLaminacion, "paso:", paso);
            paso=252;
            cTMP_MGD = cTMP_MGD + "SerLam=1;";

            paso=253;
            codigoLaminacion=getCodigoLaminado();
            paso=254;
            cTMP_MGD = cTMP_MGD + "CodLam=" + codigoLaminacion + ";";

            paso=255;
            anchoLaminacion=getAnchoLaminado();
            paso=256;
            cTMP_MGD = cTMP_MGD + "AncLam=" + anchoLaminacion + ";";

            paso=257;
            precioLaminacion=getCostoLaminado();
            paso=258;
            cTMP_MGD = cTMP_MGD + "PreLam=" + precioLaminacion.toFixed(4) + ";";
        } else {
            paso=259;
            cTMP_MGD = cTMP_MGD + "SerLam=0;";
        }

        //	LAMINADO MATE	\*
        paso=260;
        bLaminadoMate=getLaminadoMate();
        paso=261;
        if (bLaminadoMate){
            paso=262;
            cTMP_MGD = cTMP_MGD + "MatLam=1;";
        } else {
            cTMP_MGD = cTMP_MGD + "MatLam=0;";
        }

        // verificamos los servicios
        paso=270;
        if (getNingunServicio()){
            // verificamos si no hay servicios 
            paso=271;
            cTMP_MGD = cTMP_MGD + "TipSer=N;";
        } else  if (getColdFoil()){
            // verificamos si es cold foil
            paso=272;
            cTMP_MGD = cTMP_MGD + "TipSer=C;";
            // verificamos los colores del foil 1
            paso=273;
            if (getFoil1()){
                paso=274;
                colorFoil1=getColorFoil1();
                paso=275;
                if ((colorFoil1!="") && (typeof(colorFoil1)!="undefined") && (colorFoil1.length)){
                    paso=276;
                    cTMP_MGD = cTMP_MGD + "FColor=" +colorFoil1 + ";";
                } 
            }
            // verificamos los colores del foil 2
            paso=277;
            if (getFoil2()){
                paso=278;
                colorFoil2=getColorFoil2();
                paso=279;
                if ((colorFoil2!="") && (typeof(colorFoil2)!="undefined") && (colorFoil2.length)){
                    paso=280;
                    cTMP_MGD = cTMP_MGD + "FColor2=" + colorFoil2 + ";";
                } 
            }
        } else if (getHotFoil()){
            paso=281;
            // verificamos si es hot foil;
            cTMP_MGD = cTMP_MGD + "TipSer=F;";

           // verificamos los colores del foil 1
           paso=282;
            if (getFoil1()){
                paso=283;
                colorFoil1=getColorFoil1();
                paso=284;
                if ((colorFoil1!="") && (typeof(colorFoil1)!="undefined") && (colorFoil1.length)){
                    paso=285;
                    cTMP_MGD = cTMP_MGD + "FColor=" +colorFoil1 + ";";
                } 
            }
            // verificamos los colores del foil 2
            paso=286;
            if (getFoil2()){
                paso=287;
                colorFoil2=getColorFoil2();
                paso=288;
                if ((colorFoil2!="") && (typeof(colorFoil2)!="undefined") && (colorFoil2.length)){
                    paso=289;
                    cTMP_MGD = cTMP_MGD + "FColor2=" + colorFoil2 + ";";
                } 
            }            
        }

        //	ancho del servicio
        paso=290;
        anchoServicio=getAnchoFoil();
        paso=291;
        if ((anchoServicio!="") && (typeof(anchoServicio)!="undefined") && (anchoServicio!=0) && (!Number.isNaN(anchoServicio))){
            paso=292;
            cTMP_MGD = cTMP_MGD + "AncSer=" + anchoServicio + ";";
        } else {
            paso=293;
            cTMP_MGD = cTMP_MGD + "AncSer=0;";
        }
	
        // costo del foil 1
        paso=294;
        costoFoil1=getCostoFoil1();
        if ((costoFoil1!="") && (typeof(costoFoil1)!="undefined") && (costoFoil1!=0) && (!Number.isNaN(costoFoil1))){
            paso=295;
            cTMP_MGD = cTMP_MGD + "CosFoil=" + costoFoil1.toFixed(4) + ";";
        } else {
            paso=296;
            cTMP_MGD = cTMP_MGD + "CosFoil=0.00;";
        }

        // costo del foil 2
        paso=294;
        costoFoil2=getCostoFoil2();
        if ((costoFoil2!="") && (typeof(costoFoil2)!="undefined") && (costoFoil2!=0) && (!Number.isNaN(costoFoil2))){
            paso=295;
            cTMP_MGD = cTMP_MGD + "CosFoil2=" + costoFoil2.toFixed(4) + ";";
        } else {
            paso=296;
            cTMP_MGD = cTMP_MGD + "CosFoil2=0.00;";
        }

        //	VALIDA SI EL DESPERDICIO LO ASUME LA EMPRESA O LO PAGA EL CLIENTE	\*
        paso=300;
        if (getAsumirDesperdicio()){
            paso=301;
            cTMP_MGD = cTMP_MGD + "AsuDes=1;";
        } else {
            paso=302;
            cTMP_MGD = cTMP_MGD + "AsuDes=0;";
        }
	
        //	GUARDA EL MONTO POR DESPERDICIO DE BOBINA	\*
        paso=304;
        desperdicioBobina=getCostoDesperdicioBobina();
        if ((desperdicioBobina!="") && (typeof(desperdicioBobina)!="undefined") && (desperdicioBobina!=0) && (!Number.isNaN(desperdicioBobina))){
            paso=305;
            cTMP_MGD = cTMP_MGD + "DesBob=" + desperdicioBobina.toFixed(4) + ";";
        } else {
            paso=306;
            cTMP_MGD = cTMP_MGD + "DesBob=0.00;";
        }

        paso=307;
        //	GUARDA EL ANCHO DE BOBINA DISPONIBLE	\*
        anchoBobinaDisponible=getCostoAnchoBobina();
        if ((anchoBobinaDisponible!="") && (typeof(anchoBobinaDisponible)!="undefined") && (anchoBobinaDisponible!=0) && (!Number.isNaN(anchoBobinaDisponible))){
            paso=308;
            cTMP_MGD = cTMP_MGD + "BobDis=" + anchoBobinaDisponible.toFixed(2) + ";";
        } else {
            paso=309;
            cTMP_MGD = cTMP_MGD + "BobDis=0.00;";
        }

        //	GUARDA LA DIFERENCIA DE ANCHO POR BOBINAS SOLICITADAS - DISPONIBLES	\*
        paso=310;
        diferenciaAncho=getDifAncho();
        if ((diferenciaAncho!="") && (typeof(diferenciaAncho)!="undefined") && (diferenciaAncho!=0) && (!Number.isNaN(diferenciaAncho))){
            paso=311;
            cTMP_MGD = cTMP_MGD + "AncDif=" + diferenciaAncho.toFixed(2) + ";";
        } else {
            paso=312;
            cTMP_MGD = cTMP_MGD + "AncDif=0.00;";
        }        

        //	USA SANDWICH	\*
        paso=313;
        usaSandwich=getHaySandwich();
        paso=314;
        if (usaSandwich){
            paso=315;
            cTMP_MGD = cTMP_MGD + "UsaSan=1;";
            //	CODIGO DEL SANDWICH	\*
            paso=316;
            codigoSandwich=getSandwich();
            paso=317;
            cTMP_MGD = cTMP_MGD + "CodSan=" + codigoSandwich + ";";

            //	COSTO DEL SANDWICH	\*
            paso=318;
            costoSanwdich=getCostoSandwich();
            if ((costoSanwdich!="") && (typeof(costoSanwdich)!="undefined") && (costoSanwdich!=0) && (!Number.isNaN(costoSanwdich))){
                paso=319;
                cTMP_MGD = cTMP_MGD + "CosSan=" + costoSanwdich.toFixed(3) + ";";
            }            
        } else {
            paso=319;
            cTMP_MGD = cTMP_MGD + "UsaSan=0;";
        }
	
        //-------------- elementos seccion resumen -------------------
	    //	% COMISION DEL VENDEDOR	\*
        paso=320;
        comisionVendedor=getResumenComision();
        if ((comisionVendedor!="") && (typeof(comisionVendedor)!="undefined") && (comisionVendedor!=0) && (!Number.isNaN(comisionVendedor))){
            paso=319;
            cTMP_MGD = cTMP_MGD + "PorCom=" + comisionVendedor.toFixed(2) + ";";
        }          

    	//	MONTO ESTIMADO DE ETQ VENDIDAS	\*
        paso=320;
        montoEtiquetas=getResumenMontoEtiqueta();
        paso=321;
        if ((montoEtiquetas!="") && (typeof(montoEtiquetas)!="undefined") && (montoEtiquetas!=0) && (!Number.isNaN(montoEtiquetas))){
            paso=322;
            cTMP_MGD = cTMP_MGD + "EstEtq=" + montoEtiquetas.toFixed(2) + ";";
        }          

        //	ESTIMADO A FACTURAR	\*
        paso=325;
        montoNeto=getResumenMontoNeto();
        if ((montoNeto!="") && (typeof(montoNeto)!="undefined") && (montoNeto!=0) && (!Number.isNaN(montoNeto))){
            paso=326;
            cTMP_MGD = cTMP_MGD + "EstFac=" + montoNeto.toFixed(2) + ";";
        }         
	
	    //	I.V.A. ESTIMADO	\*
        paso=328;
        ivaEstimado=getResumenIva();
        if ((ivaEstimado!="") && (typeof(ivaEstimado)!="undefined") && (ivaEstimado!=0) && (!Number.isNaN(ivaEstimado))){
            paso=329;
            cTMP_MGD = cTMP_MGD + "IVAEst=" + ivaEstimado.toFixed(2) + ";";
        }         

    	//	MONTO TOTAL ESTIMADO	\*
        paso=330;
        montoTotal=getResumenMontoTotal();
        paso=331;
        if ((montoTotal!="") && (typeof(montoTotal)!="undefined") && (montoTotal!=0) && (!Number.isNaN(montoTotal))){
            paso=332;
            cTMP_MGD = cTMP_MGD + "TotEst=" + montoTotal.toFixed(2) + ";";
        }             

    	//	Status de la cotización	\*
        paso=335;
        estatusCotizacion=getResumenStatus();
        paso=336;
        if (estatusCotizacion=="1"){
            paso=337;
            cTMP_MGD = cTMP_MGD + "StaCot=Normal;æ;";
        } else {
            paso=338;
            cTMP_MGD = cTMP_MGD + "StaCot=Urgente;æ;";
        }

        // debemos validar que en el almacenamiento de comentarios (myPersistentArray) 
        //  no este vacio el comentario del renglon actual
        // si no esta vacio se manda un advertencia de actualizacion
        //      esta data se carga dede el script ecd.js, el cual lee de la pantalla anterior
        //      de una variable local llamada 
        // si esta vacio se anexa

        nRenglonActivo=parseInt(document.getElementById('nRenglonHeader').innerHTML)-1;
        console.log ("renglon activo", nRenglonActivo);
        if (typeof(myPersistentArray)!="undefined"){
            console.log ("Array Persitente", myPersistentArray);
            if (myPersistentArray.length>0){
                console.log ("comentario Persitente antes del cambio", myPersistentArray[nRenglonActivo]['cComentario'])

                paso=340;
                cComentarioViejo=myPersistentArray[nRenglonActivo]['cComentario'];
                if (cComentarioViejo.length !=0){
                    paso=341;
                    // existe un comentario previo advertimos al usuario si desea gardar
                    resp=confirm("¿Desea actualizar los datos del renglón?");
                    paso=342;
                    console.log ("respuesta del usuario:",resp);
                    paso=343;
                    // el usuario confirmo la actualización
                    if (resp){
                        paso=344;
                        myPersistentArray[nRenglonActivo]['cComentario']=cTMP_MGD;
                        paso=345;
                        console.log ("comentario Persitente despues del cambio",myPersistentArray[nRenglonActivo]['cComentario']);
                        // pasamos el contenido del nuevo comentario al objeto contenedor de la pagina abriente
                        window.opener.document.getElementById('comentCotizacion').value=cTMP_MGD.replace(/;/g, '\n');   ;

                        const comentariosJSON = localStorage.getItem(STORAGE_KEY);
                        paso=346;
                        console.log (comentariosJSON);   
                        
                        // 3. Recuperar el arreglo de localStorage
                        paso=347;
                        let arregloJSON = localStorage.getItem(STORAGE_KEY);
                        paso=348;
                        let arreglo;
                        paso=349;
                        arreglo = JSON.parse(arregloJSON);
                        console.log ("arreglo alado desde pagina A", arreglo);

                        // 4. Buscar y actualizar el objeto con "nreng": 1
                        paso=350;
                        let encontrado = false;
                        paso=351;
                        for (let i = 0; i < arreglo.length; i++) {
                            paso=352;
                            // Usamos doble signo de igualdad (==) ya que 'nreng' es un número
                            // pero al leerlo del JSON (siempre y cuando se haya guardado como número) 
                            // y para asegurar la compatibilidad con el código, lo comparamos.
                            // En el JSON de ejemplo, está como número, así que se usa `1`.
                            if (arreglo[i].nreng == (nRenglonActivo+1)) { 
                                paso=353;
                                arreglo[i].comentarios = cTMP_MGD;
                                paso=354;
                                encontrado = true;
                                paso=355;
                                // Si solo puede haber un elemento con nreng: 1, puedes salir del bucle
                                break; 
                            }
                        }
                        paso=356;
                        if (encontrado) {
                            paso=357;
                            console.log(`Comentario del renglón actualizado a: "${cTMP_MGD}"`);
                            // 5. Guardar el arreglo actualizado de nuevo en localStorage
                            paso=358;
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(arreglo));

                            // Opcional: Mostrar el arreglo actualizado en consola
                            paso=386;
                            // actualizamos el la cantidad de etiquetas
                            console.log ("*************************************************************");
                            console.log (myPersistentArray);
                            const objetoAActualizar = myPersistentArray.find(item => item.nRenNum == (nRenglonActivo+1));
                            console.log ((nRenglonActivo+1));
                            console.log ("*************************************************************");
                            // 3. Verifica si se encontró el objeto y actualiza la propiedad
                            paso=387;
                            if (typeof(objetoAActualizar)!="undefined") {
                                paso=388;
                                // actualizamos el codigo de la etiqueta
                                objetoAActualizar.cCoArt = codigoEtiqueta;
                                paso=389;
                                // actualizamos la cantidad de etiquetas           
                                paso=390;                     
                                objetoAActualizar.fPendiente = cantidadEtiquetas;
                                paso=391;
                                objetoAActualizar.fSTotalArt = cantidadEtiquetas;
                                paso=392;
                                objetoAActualizar.fCant=cantidadEtiquetas;
                                paso=393;
                                // actualizamos el precio de le etiqueta
                                paso=394;
                                objetoAActualizar.fPrecio1=precioEtiqueta;
                                paso=395;
                                objetoAActualizar.fPrecio2=precioEtiqueta;
                                // actualizamos el nombre de la etiqueta
                                paso=396;
                                objetoAActualizar.cDesArt=nombreEtiqueta;
                                // actualizamos el almacen
                                paso=397;
                                objetoAActualizar.cAlmacen="APT";
                                // actualizamos el neto del articulo
                                paso=398;
                                objetoAActualizar.fRengNeto=getResumenMontoEtiqueta();
                                paso=399;
                                // actualizamos el modelo del articulo
                                objetoAActualizar.cModelo=document.getElementById('modeloArticulo').value;
                                console.log("Objeto actualizado:", objetoAActualizar);
                            }      
                            // refrescamos el arreglo persistente de datos
                            paso=400;
                            window.opener.refreshPersistenteArray (myPersistentArray);
                            // redibujamos la tabla
                            paso=401;
                            window.opener.drawTableDatail(myPersistentArray); 
                            // recalculamos la tabla          
                            paso=402;       
                            // esta función permite hacer el recalculo de la cotizacion
                            window.opener.recalCotizacion(myPersistentArray);
                            paso=403;
                            console.log("Arreglo JSON actualizado:", arreglo);    
                            paso=404;
                        } else {
                            paso=500;
                            console.log(`No se encontró ningún objeto con 'nreng': ${(nRenglonActivo+1)} para actualizar`);
                        }

                    } else {
                        // el suaurio nego la actualización
                        paso=600;
                        cadena="No se produjo ningún cambio";
                        paso=601;
                        msgInfo(cadena);
                    }  
                } else {
                    paso=700;
                    console.log (`El cComentario esta vacio paso ${paso}`);
                    //myPersistentArray[nRenglonActivo]['cComentario']=cTMP_MGD;
                }              
            } else {
                // no existe el arreglo debemos apilar el elemento
                paso=800;
                //myPersistentArray[nRenglonActivo]['cComentario']=cTMP_MGD;
                console.log (`myPersistentArray esta vacio  paso ${paso}`);
                paso=801;
                uniqId="";
                $.ajax({
                    url: "/new_uniqid",
                    type: "get",
                    dataType: "html",
                }).done(function (res) {
                    paso=802;
                    //console.log (res);
                    var data = JSON.parse(res); 
                    paso=803;               
                    console.log  (data);  
                    paso=804;                                    
                    if (data.valor==1){
                        paso=805;
                        uniqId=data.resultado;

                    } else {
                        paso=806;
                        cadena="Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo";
                        paso=807;
                        msgError(cadena);
                        return (false);
                    }
                });                  

                paso=808;
                elemento={
                    "cAnulado":"0", 
                    "fAux01":"0.00", 
                    "cAux02":"0.00",
                    "fCantImp":"0.00",
                    "fCanProd":"0.00",
                    "cAlmacen":"APT",
                    "cAlmacen2":"",
                    "cCoArt":codigoEtiqueta,
                    "cComentario":cTMP_MGD,   
                    "fCosProOm":"0.00",
                    "fCosProUn":"0.00",
                    "cDesArt":nombreEtiqueta,
                    "nFactNum":"",
                    "dFecLote":"",
                    "fImpProd":"0.00",
                    "fMonIlc":"0.00",
                    "fMontDev":"0.00",
                    "nNroLote":"",
                    "nNumDoc":"0",
                    "nNumDoc2":"0",
                    "fOtros":"0.00",
                    "fPendiente":cantidadEtiquetas,
                    "fPendiente2":"0",
                    "fPorDesc":porcentajeDescuento,
                    "fPrecio1":precioEtiqueta,
                    "fPrecio2":precioEtiqueta,
                    "nRengDoc":"0",
                    "nRengDoc2":"0",
                    "fRengNeto":getResumenMontoEtiqueta(),
                    "nRenNum":"1",     
                    "cRowId":uniqId, // generar un identificador unico con php
                    "nSeleccion":"0",
                    "fSTotalArt":cantidadEtiquetas,
                    "cTipoDoc":"0",
                    "cTipoDoc2":"0",
                    "fIva":getResumenIva(), 
                    "fSTotalDev":"0",
                    "fSTotalUni":"1.00",        
                    "fUltCosOm":"0.00",  
                    "fUltCosUn":"0.00",              
                    "nUnidad":"UNI",
                    "fCant":cantidadEtiquetas,
                    "cModelo":"",
                    "fAdicional":"0.00",
                };   
                paso=809;
                myPersistentArray.push(elemento);

                // verificamos que la etiqueta sea nueva
                // si es nueva debemos agrear cliches adicionales y servicio de desarrollo, 
                // que puede ser flexografia o digital
                console.log (`tipo etiqueta ${tipoEtiqueta}`);
                if (tipoEtiqueta=="Nueva"){
                    console.log ("guardando renglones nuevos etiqueta");
                    paso=810;
                    // capturamos la cantidad de cliches adicionales y colores
                    cantidadColores=getCantidadColores();
                    console.log (`cantidad colores ${cantidadColores}`);

                    // capturamos el tipo de etiquequeta
                    paso=812;
                    tipoCotizacion=getTipoCotizacion();
                    console.log (`tipo cotizacion ${tipoCotizacion}`);
                    if (tipoCotizacion=="1"){
                        paso=813;
                        // es flexografia
                        // agregamos los cliches adicionales
                        console.log ("guardando renglones nuevos Clishe");
                        elemento={
                            "cAnulado":"0", 
                            "fAux01":"0.00", 
                            "cAux02":"0.00",
                            "fCantImp":"0.00",
                            "fCanProd":"0.00",
                            "cAlmacen":"APT",
                            "cAlmacen2":"",
                            "cCoArt":"CLI-GEN",
                            "cComentario":"",   
                            "fCosProOm":"0.00",
                            "fCosProUn":"0.00",
                            "cDesArt":"CLISHE",
                            "nFactNum":"",
                            "dFecLote":"",
                            "fImpProd":"0.00",
                            "fMonIlc":"0.00",
                            "fMontDev":"0.00",
                            "nNroLote":"",
                            "nNumDoc":"0",
                            "nNumDoc2":"0",
                            "fOtros":"0.00",
                            "fPendiente":cantidadColores,
                            "fPendiente2":"0",
                            "fPorDesc":"0.00",
                            "fPrecio1":"50.00",
                            "fPrecio2":"50.00",
                            "nRengDoc":"0",
                            "nRengDoc2":"0",
                            "fRengNeto":(50*cantidadColores),
                            "nRenNum":"2",     
                            "cRowId":uniqId, // generar un identificador unico con php
                            "nSeleccion":"0",
                            "fSTotalArt":cantidadColores,
                            "cTipoDoc":"0",
                            "cTipoDoc2":"0",
                            "fIva":getResumenIva(), 
                            "fSTotalDev":"0",
                            "fSTotalUni":"1.00",        
                            "fUltCosOm":"0.00",  
                            "fUltCosUn":"0.00",              
                            "nUnidad":"UNI",
                            "fCant":cantidadColores,
                            "cModelo":"",
                            "fAdicional":"0.00",
                        };   
                        paso=814;
                        myPersistentArray.push(elemento);
                        
                        // adicionamos el servicio de desarrollo HP
                        paso=815;
                        // es flexografia
                        // agregamos los cliches adicionales
                        console.log ("guardando renglones nuevos arte");
                        elemento={
                            "cAnulado":"0", 
                            "fAux01":"0.00", 
                            "cAux02":"0.00",
                            "fCantImp":"0.00",
                            "fCanProd":"0.00",
                            "cAlmacen":"APT",
                            "cAlmacen2":"",
                            "cCoArt":"SERARTEFL",
                            "cComentario":"",   
                            "fCosProOm":"0.00",
                            "fCosProUn":"0.00",
                            "cDesArt":"DESAROLLO FLEXO",
                            "nFactNum":"",
                            "dFecLote":"",
                            "fImpProd":"0.00",
                            "fMonIlc":"0.00",
                            "fMontDev":"0.00",
                            "nNroLote":"",
                            "nNumDoc":"0",
                            "nNumDoc2":"0",
                            "fOtros":"0.00",
                            "fPendiente":"1",
                            "fPendiente2":"0",
                            "fPorDesc":"0.00",
                            "fPrecio1":"63.00",
                            "fPrecio2":"63.00",
                            "nRengDoc":"0",
                            "nRengDoc2":"0",
                            "fRengNeto":"63.00",
                            "nRenNum":"3",     
                            "cRowId":uniqId, // generar un identificador unico con php
                            "nSeleccion":"0",
                            "fSTotalArt":"63.00",
                            "cTipoDoc":"0",
                            "cTipoDoc2":"0",
                            "fIva":getResumenIva(), 
                            "fSTotalDev":"0",
                            "fSTotalUni":"1.00",        
                            "fUltCosOm":"0.00",  
                            "fUltCosUn":"0.00",              
                            "nUnidad":"UNI",
                            "fCant":"1",
                            "cModelo":"",
                            "fAdicional":"0.00",
                        };   
                        paso=816;
                        myPersistentArray.push(elemento);                        

                    } else {
                        // es digital
                        paso=820;
                        console.log (` es digital ${paso}`);

                        // adicionamos el servicio de desarrollo HP
                        paso=821;
                        // es flexografia
                        // agregamos los cliches adicionales
                        console.log ("guardando renglones nuevos arte");
                        elemento={
                            "cAnulado":"0", 
                            "fAux01":"0.00", 
                            "cAux02":"0.00",
                            "fCantImp":"0.00",
                            "fCanProd":"0.00",
                            "cAlmacen":"APT",
                            "cAlmacen2":"",
                            "cCoArt":"SERARTEHP",
                            "cComentario":"",   
                            "fCosProOm":"0.00",
                            "fCosProUn":"0.00",
                            "cDesArt":"DESAROLLO HP",
                            "nFactNum":"",
                            "dFecLote":"",
                            "fImpProd":"0.00",
                            "fMonIlc":"0.00",
                            "fMontDev":"0.00",
                            "nNroLote":"",
                            "nNumDoc":"0",
                            "nNumDoc2":"0",
                            "fOtros":"0.00",
                            "fPendiente":"1",
                            "fPendiente2":"0",
                            "fPorDesc":"0.00",
                            "fPrecio1":"126.00",
                            "fPrecio2":"126.00",
                            "nRengDoc":"0",
                            "nRengDoc2":"0",
                            "fRengNeto":"126.00",
                            "nRenNum":"3",     
                            "cRowId":uniqId, // generar un identificador unico con php
                            "nSeleccion":"0",
                            "fSTotalArt":"126",
                            "cTipoDoc":"0",
                            "cTipoDoc2":"0",
                            "fIva":getResumenIva(), 
                            "fSTotalDev":"0",
                            "fSTotalUni":"1.00",        
                            "fUltCosOm":"0.00",  
                            "fUltCosUn":"0.00",              
                            "nUnidad":"UNI",
                            "fCant":"1",
                            "cModelo":"",
                            "fAdicional":"0.00",
                        };   
                        paso=816;
                        myPersistentArray.push(elemento);                             
                    }
                }

                // refrescamos el arreglo persistente de datos
                paso=850;
                console.log (myPersistentArray);
                window.opener.refreshPersistenteArray (myPersistentArray);
                window.opener.console.log(myPersistentArray);
                // redibujamos la tabla
                paso=851;
                window.opener.drawTableDatail(myPersistentArray); 
                // recalculamos la tabla          
                paso=852;       
                // esta función permite hacer el recalculo de la cotizacion
                window.opener.recalCotizacion(myPersistentArray);

                /*
                anulado: "0"
                aux01: ".00000"
                aux02: " "
                cant_imp: ".00000"
                cant_prod: ".00000"
                co_alma: "APT   "
                co_alma2: "      "
                co_art: "ETQ17010002                   "
                comentario: "æ;TipCot=I;AncEtq=29.9;AncSol=20.00;TipTro=L;CotPre=E;TroCod=LASER;TroBas=;AvaEtq=20.00;SepEtq=0.30;CanEtq=1;EtqSol=400;PorSeg=7.00;AncBob=12.75;LarEtq=20.30;CmsLin=8120.00;TotLin=8688.40;Mt2Bob=32.39;MtsLin=86.88;Mt2Etq=28.14;Cm2Cli=645.54;CodEtq=ETQ17010002;Factor=0.01;ObsCot=- BAJO EL NRO. DE OC SE ENCUENTRAN LOS ARTES.\r\n- ENVIAR PARA APROBACION.\r\n- EL CLIENTE VENDRA APROBAR EN MAQUINA.\r\n- ESTAS OBSERVACIONES APLICAN PARA TODOS LOS CAMBIOS.;TipPre=R;CanPre=400;CorDia=C;CanDes=1;CanCor=1;NomEtq=VOLTEX 15W40 SAE API SP MIENRAL 19L COD.;Serigraf=0;PrecSerigraf=0;CanNum=320;CodEm1=;CodEm2=;TipCli=F;ImpRib=0;ImpAdh=0;ImpEsp=0;TipEtq=N;SigPar=0;ForCon=0;ArtRed=0;LevArt=0;PegMan=1;UsaSig=0;CanEPP=2.00;RepInd=2;CodMat=PLDPG1300-IK;CosMat=0.5500;PreMat=0.550;PrcMat=15.4748;CosEtq=0.0387;OptCol=1;CanCol=4;PreCol=0.00012;PreTco=0.00048;PreCli=58.00;PreTcl=232.00;CliAdi=0;PorTra=10;CosTra=1.55;PorMDO=15;CosMDO=2.32;SumCos=0.0135;CosTot=0.0522;PreFin=0.0557;ActDto=0;PorDto=0.000;MonDto=0.000;MatEtq=0.0362;TipAca=N;ResvBar1=0;BarMat=0;ResvBar2=0;Barniz=0;BarMat2=0;SerLam=1;CodLam=PPTLA1275-IK;AncLam=12.75;PreLam=0.0155;MatLam=0;TipSer=N;AncSer=0.00;CosFoil=0.0000;CosFoil2=0.0000;AsuDes=0;DesBob=0.0470;BobDis=13.00;AncDif=0.25;UsaSan=0;PorCom=3.00;EstEtq=22.28;EstFac=254.28;IVAEst=40.68;TotEst=294.96;StaCot=Normal;æ"
                cos_pro_om: ".00000"
                cos_pro_un: ".00000"
                des_art: " "
                fact_num: "36384"
                fec_lote: "2025-06-09 00:00:00"
                imp_prod: ".00000"
                mon_ilc: ".00000"
                monto_dev: ".00000"
                nro_lote: "                    "
                num_doc: "0"
                num_doc2: "0"
                otros: ".00000"
                pendiente: ".00000"
                pendiente2: ".00000"
                porc_desc: "               "
                prec_vta: ".00010"
                prec_vta2: ".00010"
                reng_doc: "0"
                reng_doc2: "0"
                reng_neto: ".04"
                reng_num: "1"
                rowguid: "30AFD4C2-1D92-4F49-A967-2363475DE96B"
                seleccion: "0"
                stotal_art: ".00000"
                tipo_doc: " "
                tipo_doc2: " "
                tipo_imp: "1"
                total_art: "400.00000"
                total_dev: ".00000"
                total_uni: "1.00000"
                ult_cos_om: ".00000"
                ult_cos_un: ".00000"
                uni_venta: "UNI   "  
                */
                              
            } 
        } else {
            // no existe el arreglo persistente debemos crearlo
            paso=900;
            //myPersistentArray[nRenglonActivo]['cComentario']=cTMP_MGD;
            console.log (`myPersistentArray no existe paso ${paso}`);
        }

        //	VALIDA SI ES MODIFICACION DE DATOS O NUEVOS DATOS	\*
        /*
        IF EMPTY(VRENG_CAC.COMENTARIO) = .F. THEN
                
            //	MENSAJE DE CONFIRMACIÓN	\*
            IF MESSAGEBOX("¿Desea actualizar los datos de la cotización?", 4 + 48, cTMP_TIT) = 6 THEN
                
                //	LLAMA AL METODO QUE AGREGA DATOS EN EL CURSOR	\*
                    THISFORM.oTMP_ADD(1)
                    
                //	MENSAJE DE SISTEMA	\*
                MESSAGEBOX("Información Actualizada con éxito", 0 + 64, cTMP_TIT)
            ENDIF
        ELSE
            
            //	LLAMA AL METODO QUE AGREGA DATOS EN EL CURSOR	\*
            THISFORM.oTMP_ADD(0)				
            
            //	MENSAJE DE SISTEMA	\*
            MESSAGEBOX("Información Guardada correctamente", 0 + 64, cTMP_TIT)
            
        ENDIF     
        */   
        paso=390;
        console.log ("nueva cadena de comentarios",cTMP_MGD);
              
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error guardarRenglonCotizacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*
original foxpro
//	METODO QUE GUARDA LOS DATOS EN LAS COTIZACIONES 	\*
//	VARIABLE LOCAL	\*
PUBLIC cTMP_MGD
LOCAL nTMP_VAL 

cTMP_MGD = ""
	
//	PAGE 2 (PRESENTACIÓN)	\*
	
	
//	PAGE 3 (COSTOS)	\*
	

//	PAGE 4 (RESUMEN)	\*

	


	//	SELECT DEL CURSOR	\*
	SELECT VRENG_CAC 

	//	VALIDA SI ES MODIFICACION DE DATOS O NUEVOS DATOS	\*
	IF EMPTY(VRENG_CAC.COMENTARIO) = .F. THEN
			
		//	MENSAJE DE CONFIRMACIÓN	\*
		IF MESSAGEBOX("¿Desea actualizar los datos de la cotización?", 4 + 48, cTMP_TIT) = 6 THEN
			
			//	LLAMA AL METODO QUE AGREGA DATOS EN EL CURSOR	\*
				THISFORM.oTMP_ADD(1)
				
			//	MENSAJE DE SISTEMA	\*
			MESSAGEBOX("Información Actualizada con éxito", 0 + 64, cTMP_TIT)
		ENDIF
	ELSE
		
		//	LLAMA AL METODO QUE AGREGA DATOS EN EL CURSOR	\*
		THISFORM.oTMP_ADD(0)				
		
		//	MENSAJE DE SISTEMA	\*
		MESSAGEBOX("Información Guardada correctamente", 0 + 64, cTMP_TIT)
		
	ENDIF
*/