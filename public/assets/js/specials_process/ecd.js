/*---- este script se usa en procesos especiales ---*/
// esta funcion captura el valor del comentario del renglon activo
function getComentRenglonAnctivo(){
    console.log ("----------------- entrando a getComentRenglonAnctivo ---------------");
    try {
        paso=1;
        cComentario="";
        paso=2;
        cComentario=window.opener.document.getElementById('comentCotizacion').value;
        paso=3;
        if (cComentario!=""){
            // verificamos que los comentarios de produccion no esten vacios
            paso=5;
            // convertimos el contenido del comentario en e un arreglo
            arregloRenglon=cComentario.split("\n");
            paso=6;
            if (Array.isArray(arregloRenglon)){
                paso=7;
                return (arregloRenglon)
            } else {
                paso=8;
                msgError("NO hay comentarios para cargar data");
            }
            paso=9;
        } else {
            paso=10;
            console.log("Comentario de renglon vacio");
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error getComentRenglonAnctivo!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
 
}

// esta funcion fue creada para poder satisfacer las necesidades especiales de la consulta de comnetarios
// usa expresiones regulares para encotnrar el comentario del renglon
function buscaObsevacionesComentario(arregloData){
    const regex = /ObsCot=\s*([\s\S]*?)\s*TipPre=/;

    // unimos el arreglo para tratarlo como un texto
    const texto = arregloData.join(";")

    let contenidoExtraido = null;

    // buscamos la coincidencia de la expresion regualr
    const resultado = texto.match(regex);

    // validamos si hay resultados
    if (resultado && resultado.length > 1) {
        // El contenido que buscamos está en el primer grupo de captura (índice 1)
        contenidoExtraido = resultado[1].trim(); 
        // sustituismos los ; por saltos de linea;
        comentario=contenidoExtraido.replace(/;/g, '\n');
        return (comentario);
    } else {
        return ("");
    }
    
}


// esta funcion permite encontrar el valor de la variable 
// buscada o devuelve NULL para indicar que no se encontro
function searchInArray(arregloData,cadenaBuscada){
    var lineaEncontrada="";
    lineaEncontrada = arregloData.find(linea => linea.includes(cadenaBuscada));
	//console.log ("tipo linea encontrada ",typeof(lineaEncontrada));
	if (typeof(lineaEncontrada)!="undefined"){
		if (lineaEncontrada!=""){
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			valor=arregloTemp[1];
			return (valor)
		} else {
			return ("NULL");
		}
	} else {
		return ("NULL");
	}

}

// esta funcion carga la data en los diferentes objetos
function cargaDataECD(codArt,arregloData){
    try {
        console.log ("entrando a cargaDataECD");
        const imgElement = document.getElementById('imgDiametroCore');
        const imgElement2 = document.getElementById('imgEmbobinadoFrontal');
        const imgElement3 = document.getElementById('imgEmbobinadoDorsal');
        nClisheAdicionales=0;
        pasoECD=1;
        setcoArtHeader(codArt);

        // buscamos en los comentarios del renglon la descripcion del articulo
        pasoECD=2;
        resultado="";
        pasoECD=3;
        resultado=searchInArray(arregloData,"NomEtq");
        pasoECD=4;
        if (resultado!="NULL"){
            pasoECD=5;
            setdesArtHeader(resultado);
        }

        // buscamos el tipo de troquel
        pasoECD=6;
        resultado=searchInArray(arregloData,"TipTro");
        console.log ("===> ecd tipo troquel ",resultado);
        pasoECD=7;
        if (resultado!="NULL"){
            pasoECD=8;
            switch (resultado){
                case "F":
                    pasoECD=9;
                    // fisico
                    setTipoTroquel (1);
                    console.log("troquel fisico");
                    break;
                case "L":
                    // laser
                    pasoECD=10;
                    setTipoTroquel (2);
                    console.log("troquel laser");
                    break;   
                case "N":
                    // nuevo
                    pasoECD=11;
                    setTipoTroquel (3);
                    console.log("troquel nuevo");
                    break;   
                case "O":
                    // no aplica
                    pasoECD=12;
                    setTipoTroquel (4);
                    console.log("troquel no aplica");
                    break;        
                case "T":
                    // Tipografico
                    pasoECD=13;
                    setTipoTroquel (5);
                    console.log("troquel tipografico");
                    break;                                                                     
            }
        }
        pasoECD=14;

        // buscamos el tipo de cotizacion TipCot
        resultado=searchInArray(arregloData,"TipCot");
        console.log ("===> ecd tipo cotizacion ",resultado);
        pasoECD=15;
        if (resultado !="NULL"){
            pasoECD=16;
            switch (resultado){
                case "F":
                    pasoECD=16;
                    // flexo grafica
                    setTipoCotizacion(1);
                    pasoECD=17;
                    cambiaTipocotizacion('1');
                    pasoECD=18
                    console.log ("cotizacion flexo");
                    pasoECD=19;
                    resultado=searchInArray(arregloData,"TroCod");
                    console.log ("===> ecd codigo troquel ",resultado);
                    pasoECD=20;
                    if (resultado!="NULL"){
                        pasoECD=21;
                        setCodigoTroquelSuperficie(resultado);
                        pasoECD=22;
                        console.log ("codigo del troquel",resultado);
                        // buscamos los datos del troquel en la bd
                    }
                    // buscamos el troquel base is existe
                    pasoECD=23;
                    resultado=searchInArray(arregloData,"TroBas");
                    console.log ("===> ecd troquel base ",resultado);
                    pasoECD=24;
                    if (resultado != "NULL"){
                        pasoECD=25;
                        setCodigoTroquelBase(resultado);
                        pasoECD=26;
                        console.log ("codigo del troquel base",resultado);
                    }
                    // buscamos el ancho de la etiqueta 
                    pasoECD=27;
                    resultado=searchInArray(arregloData,"AncEtq");
                    console.log ("===> ecd ancho etiqueta ",resultado);
                    pasoECD=28;
                    if (resultado!="NULL"){
                        pasoECD=29;
                        setAnchoFlexo(resultado);
                        pasoECD=30;
                        changeAncho1();
                        pasoECD=31;
                        setResumenAnchoEtiqueta(resultado);
                    }
                    
                    break;
                case "I":
                    // indigo
                    pasoECD=50;
                    setTipoCotizacion(2);
                    pasoECD=51;
                    cambiaTipocotizacion('2');
                    pasoECD=52;
                    console.log ("cotizacion indigo");

                    resultado=searchInArray(arregloData,"AncEtq");
                    console.log ("===> ecd ancho etiqueta ",resultado);
                    pasoECD=28;
                    if (resultado!="NULL"){
                        pasoECD=29;
                        setAnchoIndigo(resultado);
                        pasoECD=30
                        changeSelAnchoEtq();
                    }

                    // buscamos el ancho solicitado
                    pasoECD=31;
                    resultado=searchInArray(arregloData,"AncSol");
                    console.log ("===> ecd ancho solicitado ",resultado);
                    pasoECD=32;
                    if (resultado!="NULL"){
                        pasoECD=33;
                        setSol(resultado);
                        pasoECD=34;
                        activaAnchoSolitado();
                    }
                    pasoECD=33;
                    resultado=searchInArray(arregloData,"TroCod");
                    console.log ("===> ecd codigo troquel ",resultado);
                    pasoECD=34;
                    if (resultado!="NULL"){
                        pasoECD=35;
                        setCodigoTroquelSuperficie(resultado);
                        pasoECD=36;
                        console.log ("codigo del troquel",resultado);
                        // buscamos los datos del troquel en la bd
                    }                    
                    break;
            }
        }
        pasoECD=50;
        // buscamos la presentacion Etiquetas, Rollos, Hojas o Millar
        resultado=searchInArray(arregloData,"CotPre");
        console.log ("===> ecd presentacion de la cotizacion ",resultado);
		pasoECD=51;
        if (resultado!="NULL"){
            /*
            <option value='1'>Etiquetas</option>
            <option value='2'>Rollos</option>
            <option value='3'>Hojas</option>
            <option value='4'>Millar</option>
            */
			pasoECD=52;
            switch (resultado){
                case "E":
                    setCbbTip("Etiquetas");
                    break;
                case "R":
                    setCbbTip("Rollos");
                    break;
                case "H":
                    setCbbTip("Hojas");
                    break;
                case "M":
                    setCbbTip("Millar");
                    break;                                                            
            }
            
			pasoECD=53;
            changeCbbTip();
        }

		// repeticiones del troquel //
		pasoECD=54;
		resultado=searchInArray(arregloData,"RepTro");
        console.log ("===> ecd repeticiones troquel ",resultado);
		pasoECD=55;
        if ((resultado!="NULL") && (resultado!="NaN") && (typeof(resultado)!="undefined")){
			pasoECD=56;
            //setRepeticionesTroquel(resultado);
            setRepeticiones(resultado);
            setRepeticionesTroquel(resultado);
			pasoECD=57;
            changeRepeticionTroquel();
            pasoECD=58;
            changeRepeticionesNuevo();
        } else{
            pasoECD=5701;
            // buscamos POR codigo de troquel las repeticiones
            codTro=getCodigoTroquelSuperficie();
            if ((typeof(codTro)!="undefined") && (codTro!="") && (codTro!="NULL")){
                // buscamos las repeticiones del troquel
                $.ajax({
                    url: "/search_repeticiones_troquel",
                    type: "get",
                    dataType: "html",
                    data:{
                        codtroquel:codTro
                    }
                }).done(function (res) {
                    pasoECD=5702;
                    //console.log (res);
                    pasoECD=5703;
                    var data = JSON.parse(res);  
                    //console.log (data);  
                    pasoECD=5704;            
                    //console.log  (data.valor);                                   
                    if (data["result"]=="1"){
                        pasoECD=5705;
                        // se asiga el precio del material
                        setRepeticionesTroquel(data["data"]);
                        pasoECD=5706;
                        changeRepeticionTroquel();
                    } else if (data["result"]=="-1") {
                        pasoECD=5707;
                        msgError (`No se consigió las repetciones del troquel ${codTro}`);
                    } else {
                        pasoECD=5708;
                        msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
                    }
                }); 

            }
        }

		// dientes del troquel
		pasoECD=64;
		resultado=searchInArray(arregloData,"DieTro");
        console.log ("===> ecd dientes del troquel ",resultado);
        console.log ("ecd dientes del troquel Dientes del troquel ", resultado);
		pasoECD=65;
        if ((resultado!="NULL") && (resultado!="NaN") && (typeof(resultado)!="undefined")){
			pasoECD=66;
			setDientes(resultado);
        }	

		// avance de etiqueta
		pasoECD=74;
		resultado=searchInArray(arregloData,"AvaEtq");
        console.log ("===> ecd avance de etiqueta ",resultado);
		pasoECD=75;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=76;
			setAvanceEtiqueta(resultado);
			pasoECD=77;
			changeAvance();
        }		
		
		// separacion de etiquetas
		pasoECD=84;
		resultado=searchInArray(arregloData,"SepEtq");
        console.log ("===> ecd separacion etiqueta ",resultado, pasoECD);
		pasoECD=85;
        if (resultado!="NULL"){
			pasoECD=86;
			setSeparacionEtiqueta(resultado);
			pasoECD=87;
			changeSeparacion();
            pasoECD=88;
            setResumenSeparacionEtiqueta(resultado);
        }		

		// canales a imprimir
		pasoECD=94;
		resultado=searchInArray(arregloData,"CanEtq");
        console.log ("===> ecd cantidad etiqueta ",resultado, pasoECD);
		pasoECD=95;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=96;
			setCanalesEtiqueta(resultado);
			pasoECD=97;
			changeCanales();
        }		
		
		// cantidad de etiquetas
		pasoECD=100;
		resultado=searchInArray(arregloData,"EtqSol");
        console.log ("===> ecd etiquetas solicitadas ",resultado, pasoECD);
		pasoECD=101;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=102;
			setCantidadEtiquetas(resultado);
			pasoECD=103;
			changeCantidadEtiquetas();
            pasoECD=104;
            setResumenCantidadEtiqueta(resultado);

        }			

		// porcentaje de seguridad
		pasoECD=110;
		resultado=searchInArray(arregloData,"PorSeg");
        console.log ("===> ecd porcentaje seguridad ",resultado, pasoECD);
		pasoECD=111;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=112;
			setPorcentajeSeguridad(resultado);
			pasoECD=113;
			changePorcentajeSeguridad();
        }

		// ancho de bobina
		pasoECD=120;
		resultado=searchInArray(arregloData,"AncBob");
        console.log ("===> ecd ancho bobina ",resultado, pasoECD);
		pasoECD=121;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=122;
			setAnchoBobina(resultado);
			pasoECD=123;
			changeAnchoBobina();
        }		
		
		// largo etiqueta
		pasoECD=130;
		resultado=searchInArray(arregloData,"LarEtq");
        console.log ("===> ecd largo etiqueta ",resultado, pasoECD);
		pasoECD=131;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=132;
			setLargoEtiqueta(resultado);
			pasoECD=133;
			changeLargoEtiqueta();
        }		

		// centimetros lineales
		pasoECD=140;
		resultado=searchInArray(arregloData,"CmsLin");
        console.log ("===> ecd centimetros lineales ",resultado, pasoECD);
		pasoECD=141;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=142;
			setCmsLineales(resultado);
			pasoECD=143;
			changeCmsLineales();
        }			

		// centimetros lineales totales
		pasoECD=150;
		resultado=searchInArray(arregloData,"TotLin");
        console.log ("===> ecd centimetros lineales totales ",resultado, pasoECD);
		pasoECD=151;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=152;
			setCmsLinealesTotales(resultado);
			pasoECD=153;
			changeCmsLinealesTotales();
        }
		
		// metros 2 de bobina
		pasoECD=160;
		resultado=searchInArray(arregloData,"Mt2Bob");
        console.log ("===> ecd metros cuadrados de bobina ",resultado, pasoECD);
		pasoECD=161;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=162;
			setMtrs2Bobina(resultado);
        }

		// metros lineales
		pasoECD=170;
		resultado=searchInArray(arregloData,"MtsLin");
        console.log ("===> ecd metros lineales ",resultado, pasoECD);
		pasoECD=171;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=172;
			setMtrsLineales(resultado);
			pasoECD=173;
			changeMetrosLineales();
        }		

		// metros 2 etiquetas 
		pasoECD=180;
		resultado=searchInArray(arregloData,"Mt2Etq");
        console.log ("===> ecd metros cuadrados etiqueta ",resultado, pasoECD);
		pasoECD=181;
       if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=182;
			setMtrs2Etiquetas(resultado);
			pasoECD=183;
			changeMtrs2Etiqueta();
        }			

		// centimetros cuadrados de clishe
		pasoECD=190;
		resultado=searchInArray(arregloData,"Cm2Cli");
        console.log ("===> ecd cms cuadrado clishe ",resultado, pasoECD);
		pasoECD=191;
        if ((resultado!="NULL") && (resultado!="NaN")){
			pasoECD=192;
			setCmsClishe(resultado);
			pasoECD=193;
			changeCms2Clishe();
        }			

		// codigo de etiqueta
		pasoECD=200;
		resultado=searchInArray(arregloData,"CodEtq");
        console.log ("===> ecd codigo etiqueta ",resultado, pasoECD);
		pasoECD=201;
        if (resultado!="NULL"){
			pasoECD=202;
			setCodigoEtiqueta(resultado);
        }		

		// observaciones de etiqueta
		pasoECD=210;
        resultado=buscaObsevacionesComentario(arregloData);
        console.log ("===> ecd observaciones ",resultado, pasoECD);
		pasoECD=211;
        if (resultado!=""){
			pasoECD=212;
			setObservaciones(resultado);
        }			
        pasoECD=213;

		cep();

		//----------------------------- objetos de la pagina presentacion ----------------------------
        // tipo de presentacion
		pasoECD=220;
		resultado=searchInArray(arregloData,"TipPre");
        console.log ("===> ecd tipo presentacion ",resultado, pasoECD);
		pasoECD=221;
        if (resultado!="NULL"){
			pasoECD=222;
			// evaluamos que tipo de presentacion se tomara
            if (resultado=="R"){
                pasoECD=223;
                document.getElementById('radioPresentacion0').checked=true;
                pasoECD=224;
                document.getElementById('radioPresentacion1').checked=false;  
                pasoECD=225;
                changePresentacionRollos();              
            } else {
                pasoECD=226;
                document.getElementById('radioPresentacion0').checked=false;
                pasoECD=227;
                document.getElementById('radioPresentacion1').checked=true;   
                pasoECD=228;
                changePresentacionPaquetes();
                pasoECD=229;
                // verificamos si son dobles
                resultado2=searchInArray(arregloData,"DobPaq");
                console.log ("===> ecd dobladas cada cuanto ",resultado, pasoECD);
                pasoECD=230;
                if (resultado2!="NULL"){    
                    setDobladasCada(resultado2);
                }            
            }
        }	

        // cantidad por presentacion
        pasoECD=231;
        resultado=searchInArray(arregloData,"CanPre");
        console.log ("===> ecd cantidad por presentacion ",resultado, pasoECD);
        pasoECD=232;
        if (resultado!="NULL"){  
            pasoECD=233;  
            setCantidadNPre(resultado);
            pasoECD=234;
            setEtiquetasXRollo(resultado);
            pasoECD=235;
            changeCantidadxRollos();
        }  

        // diametro del core
        pasoECD=240;
        resultado=searchInArray(arregloData,"CorDia");
        console.log ("===> ecd diametro del core ",resultado.toUpperCase(), pasoECD);
        pasoECD=241;
        if (resultado!="NULL"){  
            const imgElement = document.getElementById('imgDiametroCore');
            pasoECD=242;  
            const imageMap = {
                'A': 'assets/images/diametroA.png',
                'B': 'assets/images/diametroB.png',
                'C': 'assets/images/diametroC.png',
                'D': 'assets/images/diametroD.png',
                'E': 'assets/images/diametroE.png'
            };    
 
            pasoECD=244;
            // Verificamos si la tecla presionada está en nuestro mapa
            if (imageMap[resultado.toUpperCase()]) {
                // Si la tecla existe, cambiamos la fuente de la imagen
                pasoECD=245;
                imgElement.src = imageMap[resultado.toUpperCase()];
                pasoECD=246;
                document.getElementById('txtDiametroCore').value=resultado.toUpperCase();
            } else {
                // Si no es ninguna de las teclas deseadas, puedes restaurar la imagen predeterminada si lo deseas.
                pasoECD=247;
                imgElement.src = 'assets/images/diametronull.png';
                pasoECD=248;
                document.getElementById('txtDiametroCore').value="";
            }           
            pasoECD=249;  
            setResumenDiametroCore(0);
            pasoECD=250; 
            switch (resultado.toUpperCase()){
                case "A":
                    pasoECD=251; 
                    setResumenDiametroCore(1);
                    break;
                case "B":
                    pasoECD=252; 
                    setResumenDiametroCore(1.5);
                    break;  
                case "C":
                    pasoECD=253;  
                    setResumenDiametroCore(3);
                    break;
                case "D":
                    pasoECD=254; 
                    setResumenDiametroCore(0.5);
                    break;   
                case "E":
                    pasoECD=255; 
                    setResumenDiametroCore(6);
                    break;                                                          
            }
        }        
        pasoECD=256;
        // buscamos los canales a despachar
		resultado=searchInArray(arregloData,"CanDes");
        console.log ("===> ecd canales a despachar ",resultado, pasoECD);
		pasoECD=257;
        if (resultado!="NULL"){        
            pasoECD=258;
            setCanalesDespachar(resultado);
            pasoECD=259;
            changeCanalesADespachar();
        }

        pasoECD=260;
        // cantidad de cores aproximados
        resultado=searchInArray(arregloData,"CanCor");
        console.log ("===> ecd cantidad de cores ",resultado, pasoECD);
        pasoECD=261;
        if (resultado!="NULL"){  
            pasoECD=262;
            setCantidadCores(resultado);
            pasoECD=263;
            changeCantidadCores();
        }        

        // buscamos la nombre de la etiqueta
        pasoECD=264;
        resultado=searchInArray(arregloData,"NomEtq");
        console.log ("===> ecd nombre etiqueta ",resultado, pasoECD);
        pasoECD=265;
        if (resultado!="NULL"){
            pasoECD=266;
            setNombreEtiqueta(resultado);
        }

        // cantidad de Nro por presentacion
        pasoECD=267;
        resultado=searchInArray(arregloData,"CanNum");
        console.log ("===> ecd cantidad por presentacion ",resultado, pasoECD);
        pasoECD=268;
        if (resultado!="NULL"){
            pasoECD=269;
            setCantidadNPre(resultado);
            pasoECD=270;
            changeCantidadxRollos();
        }        

        // buscamos el embobinado frontal
        pasoECD=2710;
        resultado=searchInArray(arregloData,"CodEm1");
        console.log ("===> ecd codigo embobinado 1 ",resultado, pasoECD);
        pasoECD=2711;
        if (resultado!="NULL"){
            const imageMap2 = {
                '0': 'assets/images/embobinado0.png',
                '1': 'assets/images/embobinado1.png',
                '2': 'assets/images/embobinado2.png',
                '3': 'assets/images/embobinado3.png',
                '4': 'assets/images/embobinado4.png',
                '5': 'assets/images/embobinado5.png',
                '6': 'assets/images/embobinado6.png',
                '7': 'assets/images/embobinado7.png',
                '8': 'assets/images/embobinado8.png',
                '9': 'assets/images/embobinado9.png'
            };                 
            pasoECD=2712;
            if (imageMap2[resultado]) {
               
                pasoECD=2713;
                // Si la tecla existe, cambiamos la fuente de la imagen
                imgElement2.src = imageMap2[resultado];
                pasoECD=2714;
                document.getElementById('txtEmbobinadoFrontal').value=resultado;
            } else {
                pasoECD=2715;
                // Si no es ninguna de las teclas deseadas, puedes restaurar la imagen predeterminada si lo deseas.
                imgElement2.src = 'assets/images/diametronull.png';
                pasoECD=2716;
                document.getElementById('txtEmbobinadoFrontal').value="";
            }   
            pasoECD=2717;
            if ((resultado>=0) && (resultado<=9)){
                pasoECD=2718;
                setResumenEmbobinado(resultado);
            }            
        }           
   
        // buscamos el embonidado 2
        pasoECD=2720;
        resultado=searchInArray(arregloData,"CodEm2");
        console.log ("===> ecd codigo embobinado 2 ",resultado, pasoECD);
        pasoECD=2721;
        if (resultado!="NULL"){
            const imageMap2 = {
                '0': 'assets/images/embobinado0.png',
                '1': 'assets/images/embobinado1.png',
                '2': 'assets/images/embobinado2.png',
                '3': 'assets/images/embobinado3.png',
                '4': 'assets/images/embobinado4.png',
                '5': 'assets/images/embobinado5.png',
                '6': 'assets/images/embobinado6.png',
                '7': 'assets/images/embobinado7.png',
                '8': 'assets/images/embobinado8.png',
                '9': 'assets/images/embobinado9.png'
            };                 
            pasoECD=2722;
            if (imageMap2[resultado]) {
                // Si la tecla existe, cambiamos la fuente de la imagen
                pasoECD=2723;
                imgElement3.src = imageMap2[resultado];
                pasoECD=2724;
                document.getElementById('txtEmbobinadoDorsal').value=resultado;
            } else {
                // Si no es ninguna de las teclas deseadas, puedes restaurar la imagen predeterminada si lo deseas.
                pasoECD=2725;
                imgElement3.src = 'assets/images/diametronull.png';
                pasoECD=2726;
                document.getElementById('txtEmbobinadoDorsal').value="";
            }            
        }         
        
        // tipo de cliente
        pasoECD=278;
        resultado=searchInArray(arregloData,"TipCli");
        console.log ("===> ecd tipo cliente ",resultado, pasoECD);
        pasoECD=279;
        if (resultado!="NULL"){
            pasoECD=280;
            seleccionaTipoCliente(resultado);
        }        
       
        // imprimir ribbon
        pasoECD=281;
        resultado=searchInArray(arregloData,"ImpRib");
        console.log ("===> ecd imprimir ribbon ",resultado, pasoECD);
        pasoECD=282;
        if ((resultado!="NULL") && (resultado=="1")){
            pasoECD=273;
            // activamos el control de impresion ribbon
            seleccionachkImpresionRibbon();
            // verificamos si hay numeracionde ribbon
            pasoECD=274;
            resultado2=searchInArray(arregloData,"RibNum");
            console.log ("===> ecd numeracion ribbon ",resultado2, pasoECD);
            pasoECD=275;
            if ((resultado2!="NULL") && (resultado2=="1")){
                pasoECD=276;
                // activamos el check de numeracion de ribbon
                activaChkNumeracionRibbon();
                pasoECD=277;
                // activamos la numeracion desde ribbon
                activaNumeracionDesdeRibbon();
                pasoECD=278;
                // activamos la numeracion hasta ribbon
                activaNumeracionHastaRibbon();
                seleccionaChkNumeracionRibbon();

                // buscamos desde ribbon
                pasoECD=2781;
                resultado2a=searchInArray(arregloData,"RibDes");
                pasoECD=2782;
                if ((resultado2a!="NULL") ){
                    pasoECD=2783;
                    setDesdeRibbon(resultado2a);
                }

                // buscamos hasta ribbon
                pasoECD=2784;
                resultado2b=searchInArray(arregloData,"RibHas");
                pasoECD=2785;
                if ((resultado2b!="NULL") ){
                    pasoECD=2786;
                    setHastaRibbon(resultado2b);
                }                

            }
            //verificamos si hay descripcion de ribbon
            pasoECD=279;
            resultado3=searchInArray(arregloData,"DesRib");
            console.log ("===> ecd descricpion ribbon ",resultado3, pasoECD);
            pasoECD=280;
            if ((resultado3!="NULL") && (resultado3=="1")){
                pasoECD=281;
                // activamos el texto de ribbon
                activaTextoRibbon();
                pasoECD=282;
                // buscamos la descripcion de texto de ribbon
                resultado4=searchInArray(arregloData,"Descri");
                console.log ("===> ecd texto ribbon ",resultado4, pasoECD);
                pasoECD=283;
                if (resultado4!="NULL"){  
                    pasoECD=284;
                    // asignamos el texto de ribbon si existe
                    setTextoRibbon(resultado4);
                }          
            }            

        }        
        
        // impreso por el adhesivo
        pasoECD=285;
        resultado=searchInArray(arregloData,"ImpAdh");
        console.log ("===> ecd impreso por el adhesivo ",resultado, pasoECD);
        pasoECD=286;
        if ((resultado!="NULL") && (resultado=="1")){
            pasoECD=287;
            activaChkImpAdhesivo();
            pasoECD=288;
            clickChkImpAdhesivo();
        }  

        // impreso al espejo
        pasoECD=300;
        resultado=searchInArray(arregloData,"ImpEsp");
        console.log ("===> ecd impresion espejo ",resultado, pasoECD);
        pasoECD=301;
        if ((resultado!="NULL") && (resultado==1)){
            pasoECD=302;
            activaChkEspejo();
            pasoECD=303;
            clickChkEspejo();
        }    

        // impreso doble cara
        pasoECD=305;
        resultado=searchInArray(arregloData,"SigPar");
        console.log ("===> ecd impresion doble cara ",resultado, pasoECD);
        pasoECD=306;
        if ((resultado!="NULL") && (resultado==1)){
            pasoECD=307;
            activaChkEspejo();
            pasoECD=308;
            clickChkEspejo();
        }          

        // forma continua
        pasoECD=310;
        resultado=searchInArray(arregloData,"ForCon");
        console.log ("===> ecd forma continua ",resultado, pasoECD);
        pasoECD=311;
        if ((resultado!="NULL") && (resultado==1)){
            pasoECD=312;
            activaChkFormaContinua();
            pasoECD=313;
            clickChkFormaContinua();
        }        

        // pegado manual 
        // forma continua
        pasoECD=315;
        resultado=searchInArray(arregloData,"PegMan");
        console.log ("===> ecd pegado manual ",resultado, pasoECD);
        pasoECD=316;
        if ((resultado!="NULL") && (resultado==1)){
            pasoECD=317;
            activaChkPegManual();
            pasoECD=318;
            clickChkPegManual();
        }      

        // arte en red lan
        pasoECD=320;
        resultado=searchInArray(arregloData,"ArtRed");
        console.log ("===> ecd arte en red ",resultado, pasoECD);
        pasoECD=321;
        if ((resultado!="NULL") && (resultado==1)){
            pasoECD=322;
            activaArteRedLan();
            pasoECD=323;
            seleccionaArteRedLan();
        }        

        // levantar arte
        pasoECD=325;
        resultado=searchInArray(arregloData,"LevArt");
        console.log ("===> ecd levantar arte ",resultado, pasoECD);
        pasoECD=326;
        if ((resultado!="NULL") && (resultado==1)){
            pasoECD=327;
            activaLevantarArte();
            pasoECD=328;
            seleccionaLevantarArte();
        }         

	    // tipo de etiqueta
        pasoECD=330;
        resultado=searchInArray(arregloData,"TipEtq");
        console.log ("===> ecd tipo de etiqueta ",resultado, pasoECD);
        pasoECD=331;
        if ((resultado!="NULL")){
            pasoECD=332;
            setTipoEtiqueta(resultado);
        } 
            
        // utiliza signado
        pasoECD=335;
        resultado=searchInArray(arregloData,"UsaSig");
        console.log ("===> ecd usa signado ",resultado, pasoECD);
        pasoECD=336;
        if ((resultado!="NULL") && (resultado==1)){
            pasoECD=337;
            activaTxtUtilizaSignado();
            pasoECD=338;
            resultado2=searchInArray(arregloData,"CodSig");
            console.log ("===> ecd codigo signado ",resultado2, pasoECD);
            pasoECD=339;
            if ((resultado2!="NULL")){
                pasoECD=340;
                setTextosignado(resultado2);
            }
            pasoECD=341;
            activaSignadoPulgadas();
            pasoECD=342;
            resultado3=searchInArray(arregloData,"PulSig");
            console.log ("===> ecd pulgadas de signado ",resultado3, pasoECD);
            pasoECD=343;
            if ((resultado!="NULL") && (resultado!="NaN")){
                pasoECD=344;
                setPulgadasSignado(resultado3);
            }
            pasoECD=345;
            activaSignadoCadaXEtq();
            pasoECD=346;
            resultado4=searchInArray(arregloData,"SepSig");
            console.log ("===> ecd signado cada etq ",resultado4, pasoECD);
            pasoECD=347;
            if ((resultado4!="NULL")){
                pasoECD=348;
                setCadaXEtq(resultado4);
            }            
        } 
        pasoECD=349;

		//----------------------------- objetos de la pagina costos ----------------------------------
        // BUSCA EL CODIGO DEL MATERIAL	
        pasoECD=400;
        resultado=searchInArray(arregloData,"CodMat");
        console.log ("===> ecd BUSCA EL CODIGO DEL MATERIAL ",resultado, pasoECD);
        pasoECD=401;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=402;
            setCodigoMaterial(resultado);
        } 

        // buscamos la descripcion del material
        pasoECD=4021;
        codMat=getCodigoMaterial();
        console.log ("===> ecd BUSCA DESCRIPCION DEL MATERIAL ",codMat, pasoECD);
        pasoECD=4022;
        if ((typeof(codMat)!="undefined") && (codMat!="") && (codMat!="NULL")){
            // buscamos las repeticiones del troquel
            $.ajax({
                url: "/search_descripcion_material",
                type: "get",
                dataType: "html",
                data:{
                    codmaterial:codMat
                }
            }).done(function (res) {
                pasoECD=4023;
                //console.log (res);
                pasoECD=4024;
                var data = JSON.parse(res);  
                //console.log (data);  
                pasoECD=4025;            
                //console.log  (data.valor);                                   
                if (data["result"]=="1"){
                    pasoECD=4026;
                    // se asiga el precio del material
                    setDescripcionMaterial(data["data"]);
                } else if (data["result"]=="-1") {
                    pasoECD=4028;
                    msgError (`No se consigió laa descripcion del material  ${codMat}`);
                } else {
                    pasoECD=4029;
                    msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
                }
            }); 

        }



        // buscamos si hay acabado de serigrafia
        pasoECD=403;
        resultado=searchSerigrafia(arregloData);
        pasoECD=404;
        if (resultado!="NULL"){
            pasoECD=405;
            clickMallaSerigrafica();
        }
        
        
        //-- ejecutamos la busqueda del precio del material
        pasoECD=406;
        $.ajax({
            url: "/search_precio_venta_materiales",
            type: "get",
            dataType: "html",
            data:{
                codigoMaterial:getCodigoMaterial()
            }
        }).done(function (res) {
            pasoECD=407;
            //console.log (res);
            pasoECD=408;
            var data = JSON.parse(res);  
            //console.log (data);  
            pasoECD=409;            
            //console.log  (data.valor);                                   
            if (data["valor"]=="1"){
                pasoECD=410;
                // se asiga el precio del material
                setCostoMaterial(data["precio"]);
                pasoECD=411;
                changeCostoMaterial();
            } else if (data["valor"]=="-1") {
                pasoECD=412;
                msgError (`No se consigió el precio del Material ${resultado}`);
            } else {
                pasoECD=413;
                msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
            }
        });         

        // calculamos el costo total del material
        pasoECD=420;
        nTMP_AU1=getMtrs2Etiquetas() *  getCostoMaterial();
        console.log ("Costo total del material",nTMP_AU1);
        pasoECD=414;
        setCostoTotalMaterial(nTMP_AU1);

        // BUSCA EL COSTO DE LA ETIQUETA
        pasoECD=420;
        resultado=searchInArray(arregloData,"CosEtq");
        console.log ("===> ecd BUSCA EL COSTO DE LA ETIQUETA ",resultado, pasoECD);
        pasoECD=421;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=422;
            setCostoEtiqueta(resultado);
            pasoECD=423;
            changeCostoTotalEtiqueta();
        }  
        
        // buscamos la cantidad de colores
        pasoECD=420;
        resultado=searchInArray(arregloData,"NcoAct");
        console.log ("===> ecd buscamos la cantidad de colores produccion",resultado, pasoECD);
        pasoECD=421;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=422;
            setCantidadColores(resultado);
            pasoECD=423;
            changeCantidadColores();
        } else {
            pasoECD=424;
            resultado=searchInArray(arregloData,"CanCol");
            console.log ("===> ecd buscamos la cantidad de colores cotizacion",resultado, pasoECD);
            pasoECD=425;
            if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){ 
                pasoECD=426;
                setCantidadColores(resultado);
                pasoECD=427;
                changeCantidadColores();            
            } else {
                console.log (">>>>>>>>>>>>>>>>>> No hay colores <<<<<<<<<<<<<<<<<<<<<<<<")
            }
        }

        // buscamos el precio de cada color
        pasoECD=430;
        resultado=searchInArray(arregloData,"PreCol");
        console.log ("===> ecd  buscamos el precio de cada color ",resultado, pasoECD);
        pasoECD=431;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=432;
            setPrecioColores(resultado);
            pasoECD=433;
            changePrecioColor();

        } 

        // buscamos el costo total por colores
        pasoECD=435;
        resultado=searchInArray(arregloData,"PreTco");
        console.log ("===> ecd  buscamos el costo total por colores",resultado, pasoECD);
        pasoECD=436;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=437;
            setPrecioTotalColores (resultado);
            pasoECD=438;
            changePrecioTotalColores();

        }    
        
        // buscamos el precio del clishe
        pasoECD=4351;
        resultado=searchInArray(arregloData,"PreCli");
        console.log ("===> ecd  buscamos precio del clishe",resultado, pasoECD);
        pasoECD=4361;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=4371;
            setPrecioClishe(resultado);
            pasoECD=4381;
            changePrecioClishe();
        }        
        
        // buscamos si hay clishe adicional
        pasoECD=435;
        resultado=searchInArray(arregloData,"CliAdi");
        console.log ("===> ecd  buscamos si hay clishe adicional",resultado, pasoECD);
        pasoECD=436;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=437;
            setCantidadClisheAdicional(resultado);
            pasoECD=438;
            changeClisheAdicional();

        }

        // buscamos el porcentaje de transporte
        pasoECD=440;
        resultado=searchInArray(arregloData,"PorTra");
        console.log ("===> ecd  buscamos el porcentaje de transporte",resultado, pasoECD);
        pasoECD=441;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=442;
            setPorcentajeTransporte (resultado);
            pasoECD=443;
            changePorcentajeTransporte();
        }    
        
        // buscamos el costo del transporte
        pasoECD=445;
        resultado=searchInArray(arregloData,"CosTra");
        console.log ("===> ecd  buscamos el costo del transporte",resultado, pasoECD);
        pasoECD=446;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=447;
            setCostoTransporte (resultado);
            pasoECD=448;
            changeCostoTransporte();
        }         
        
        // buscamos el BUSCA EL PORCENTAJE DE MANO DE OBRA
        pasoECD=450;
        resultado=searchInArray(arregloData,"PorMDO");
        console.log ("===> ecd  buscamos el BUSCA EL PORCENTAJE DE MANO DE OBRA",resultado, pasoECD);
        pasoECD=451;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=452;
            setPorcentajeManoObra(resultado);
            pasoECD=453;
            changePorcentajeManoObra();
        }           
        
        // buscamos el COSTO POR MANO DE OBRA
        pasoECD=450;
        resultado=searchInArray(arregloData,"CosMDO");
        console.log ("===> ecd  buscamos COSTO POR MANO DE OBRA",resultado, pasoECD);
        pasoECD=451;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=452;
            setCostoManoObra(resultado);
            pasoECD=453;
            changeCostoManoObra();
        }         

        // buscamos LA SUMA DE COSTOS
        pasoECD=450;
        resultado=searchInArray(arregloData,"SumCos");
        console.log ("===> ecd  buscamos LA SUMA DE COSTOS",resultado, pasoECD);
        pasoECD=451;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=452;
            setSumacostos(resultado);
            pasoECD=453;
            changeSumaCostos();
        }             
			
        // buscamos EL COSTO TOTAL
        pasoECD=455;
        resultado=searchInArray(arregloData,"CosTot");
        console.log ("===> ecd  buscamos EL COSTO TOTAL",resultado, pasoECD);
        pasoECD=456;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=457;
            setCostoTotal(resultado);
            pasoECD=458;
            changeCostoTotal();
        }          

        // buscamos EL FACTOR
        pasoECD=455;
        resultado=searchInArray(arregloData,"Factor");
        console.log ("===> ecd  buscamos EL FACTOR",resultado, pasoECD);
        pasoECD=456;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=457;
            setFactor(resultado);
            pasoECD=458;
            changeFactor();
        }         

        // buscamos PRECIO DE LA ETQ
        pasoECD=455;
        resultado=searchInArray(arregloData,"PreFin");
        console.log ("===> ecd  buscamos PRECIO DE LA ETQ pasoECD:", pasoECD);
        pasoECD=456;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=457;
            setPrecioEtiqueta(resultado);
            pasoECD=458;
            nVarPrecioEtq=resultado;
            console.log ("nVarPrecioEtq",nVarPrecioEtq);
            changePrecioEtiqueta();
        }   
        console.log ("===> fin ecd  buscamos PRECIO DE LA ETQ pasoECD:", pasoECD);
      
        // buscamos MONTO DESCONTADO
        pasoECD=460;
        resultado=searchInArray(arregloData,"MonDto");
        console.log ("===> ecd  buscamos MONTO DESCONTADO pasoECD:", pasoECD);
        pasoECD=461;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=462;
            setDescuento(resultado);
            pasoECD=463;
            changeDescuento();
        } 
        console.log ("===> fin ecd  buscamos MONTO DESCONTADO pasoECD:", pasoECD);         

        // buscamos ACTIVAR DESCUENTO
        pasoECD=465;
        resultado=searchInArray(arregloData,"ActDto");
        console.log ("===> ecd  buscamos ACTIVAR DESCUENTO pasoECD:", pasoECD);
        pasoECD=465;
        if ((resultado!="NULL") && (resultado!="") && (resultado=="1")){
            pasoECD=465;
            console.log ("activando descuento",resultado, typeof(resultado));
            activaDescuento();
        } else {
            pasoECD=466;
            console.log ("desactivando descuento",resultado, typeof(resultado));
            desactivaDescuento();            
        }
        console.log ("===> fin ecd  buscamos ACTIVAR DESCUENTO pasoECD:", pasoECD);

        // buscamos PORCENTAJE DE DESCUENTO
        pasoECD=470;
        resultado=searchInArray(arregloData,"PorDto");
        console.log ("===> ecd  buscamos PORCENTAJE DE DESCUENTO pasoECD:", pasoECD);
        pasoECD=471;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=472;
            setDescuento(resultado);
            pasoECD=473;
            changeDescuento();
        }    
        console.log ("===> fin ecd  buscamos PORCENTAJE DE DESCUENTO pasoECD:", pasoECD);     

        // buscamos COSTO DEL MATERIAL POR ETQ
        pasoECD=470;
        resultado=searchInArray(arregloData,"MatEtq");
        console.log ("===> ecd  buscamos COSTO DEL MATERIAL POR ETQ pasoECD:", pasoECD);
        pasoECD=471;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=472;
            setCostoMaterialPorEtiqueta(resultado);
            pasoECD=473;
            changeCostoMaterialEtiquetas();
        } 
        console.log ("===> fin ecd  buscamos COSTO DEL MATERIAL POR ETQ pasoECD:", pasoECD);          

        // BUSCA EL COSTO POR DESPERDICIO DE BOBINA
        pasoECD=475;
        resultado=searchInArray(arregloData,"DesBob");
        console.log ("===> ecd  buscamos BUSCA EL COSTO POR DESPERDICIO DE BOBINA pasoECD:", pasoECD);
        pasoECD=476;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=477;
            setCostoDesperdicioBobina(resultado);
        }  
        console.log ("===> fin ecd  buscamos BUSCA EL COSTO POR DESPERDICIO DE BOBINA pasoECD:", pasoECD);  
        
        // BUSCA EL ANCHO DE BOBINA DISPONIBLE
        pasoECD=480;
        resultado=searchInArray(arregloData,"BobDis");
        console.log ("===> ecd BUSCA EL ANCHO DE BOBINA DISPONIBLE pasoECD:", pasoECD);
        pasoECD=481;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=482;
            setCostoAnchoBobina(resultado);
            pasoECD=483;
            changeCostoAnchoBobina();
        }
        console.log ("===> fin ecd BUSCA EL ANCHO DE BOBINA DISPONIBLE pasoECD:", pasoECD);          


        // BUSCA LA DIFERENCIA POR ANCHOS DE BOBINAS
        pasoECD=485;
        resultado=searchInArray(arregloData,"AncDif");
        console.log ("===> ecd BUSCA LA DIFERENCIA POR ANCHOS DE BOBINAS pasoECD:", pasoECD);
        pasoECD=486;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=487;
            setDifAncho(resultado);
            pasoECD=488;
            changeDiferenciaPorAncho();
        }   
        console.log ("===> fin ecd BUSCA LA DIFERENCIA POR ANCHOS DE BOBINAS pasoECD:", pasoECD);

        // BUSCA Tipos de acabados
        pasoECD=485;
        resultado=searchInArray(arregloData,"TipAca");
        console.log ("===> ecd BUSCA Tipos de acabados pasoECD:", pasoECD);
        pasoECD=486;
        bHayBarniz=false;
        pasoECD=487;
        bBarnizMat=false;
        pasoECD=488;
        bResBarniz=false;
        pasoECD=489;
        bResBarnizMate=false;
        pasoECD=490;
        nReservas=0;
        pasoECD=491;
        bHayBarniz=searchBarniz(arregloData);
        console.log ("hay barniz ECD ",bHayBarniz,"paso:",pasoECD);
        pasoECD=492;
        bBarniz=false;
        nVarNBarniz=0
        if (bHayBarniz){
            pasoECD=494;
            bBarniz=searchTiposBarniz(arregloData,"BARNIZ");
            console.log ("bBarniz",bBarniz," paso ECD:",pasoECD);
            pasoECD=495;
            bBarnizMat=searchTiposBarniz(arregloData,"BARNIZ MATE");
            console.log ("bBarnizMat",bBarnizMat," paso ECD:",pasoECD);
            pasoECD=496;
            bResBarniz=searchTiposBarniz(arregloData,"RESV. BARNIZ");
            console.log ("bResBarniz",bResBarniz," paso ECD:",pasoECD);
            pasoECD=497;
            bResBarnizMat=searchTiposBarniz(arregloData,"RESV. BARNIZ MATE");
            console.log ("bResBarnizMat",bResBarnizMat," paso ECD:",pasoECD);

            /*pasoECD=4971;
            if (bBarniz){
                pasoECD=4972;
                seleccionaBarniz();
                pasoECD=4973;
                if(nVarNBarniz<2) {
                    pasoECD=4974;
                    nVarNBarniz=nVarNBarniz+1
                }
            }*/
            pasoECD=4975;
            if (bBarnizMat){
                pasoECD=4976;
                seleccionaAcabadoMate2();
                pasoECD=4977;
                if(nVarNBarniz<2) {
                    pasoECD=4978;
                    nVarNBarniz=nVarNBarniz+1
                }
            }  

            pasoECD=4979;
            if (bResBarniz){
                pasoECD=4980;
                if(nVarNBarniz<2) {
                    pasoECD=4981;
                    nVarNBarniz=nVarNBarniz+1
                }
            }                      

            pasoECD=4982;
            if (bResBarnizMat){
                pasoECD=4983;
                if(nVarNBarniz<2) {
                    pasoECD=4984;
                    nVarNBarniz=nVarNBarniz+1
                }
            } 
            console.log ("nVarNBarniz",nVarNBarniz," pasoECD",pasoECD);
            // contamos las reservas
            pasoECD=500;
            nReservas=countReservasBarniz(arregloData);
            // verificamos cuantas reservas o barnices se usaran
            if (bBarniz){
                pasoECD=5001;
                console.log ("hay barniz corrido");
                pasoECD=5002;
                desseleccionaNingunAcabado();
                pasoECD=5003;
                seleccionaBarniz();
            } else {
                pasoECD=5004;
                console.log ("No Hay barniz corrido");
                pasoECD=5005;
                desseleccionaBarniz();
                pasoECD=5006;
                switch (nReservas){
                    case 1:
                        //solo hay una reserva de barniz
                        // deseleccionamos ningun acabado
                        pasoECD=501;
                        desseleccionaNingunAcabado();
                        // activamos la primera reserva de barniz
                        pasoECD=502;
                        seleccionaReservaBarniz1();
                        // desactivamos barniz
                        pasoECD=503;
                        desseleccionaBarniz();
                        //deseleccionamos la segunda reserva de barniz
                        pasoECD=504;
                        desseleccionaReservaBarniz2();
                        // desactivamos el acabado mate 2
                        pasoECD=505;
                        desseleccionaAcabadoMate2();

                        if (bResBarnizMat && !bResBarniz){
                            pasoECD=506;
                            seleccionaAcadoMate1();
                            pasoECD=507;
                            activaAcabadoMate1();
                            pasoECD=508;
                            desseleccionaAcabadoMate2();
                        } else if (!bResBarnizMat && bResBarniz){
                            pasoECD=509;
                            desactivaAcabadoMate1();
                            pasoECD=510;
                            desseleccionaReservaBarniz1();
                            pasoECD=511;
                            desseleccionaAcabadoMate1();
                            pasoECD=512;
                            seleccionaReservaBarniz2();
                        }
                        break;
                    case 2:
                        // hay las dos reservas de barniz
                        //desactivamos el barniz corrido
                        pasoECD=513;
                        desseleccionaBarniz();
                        pasoECD=514;
                        desseleccionaAcabadoMate2();
                        pasoECD=515;
                        desseleccionaNingunAcabado();
                        pasoECD=516;
                        activaAcabadoMate1();
                        pasoECD=517;
                        seleccionaAcadoMate1();
                        pasoECD=518;
                        seleccionaReservaBarniz1();
                        pasoECD=519;
                        seleccionaReservaBarniz2();
                        break;
                    default:
                        // se asume que no hay reservas
                        pasoECD=520;
                        desseleccionaAcabadoMate1();
                        pasoECD=521;
                        desseleccionaReservaBarniz1();
                        pasoECD=522;
                        desseleccionaReservaBarniz2();
                        break;
                }                 
            }
   
            
            //restamos los clishes adicionales
            pasoECD=523;
            nClisheAdicionales=getCantidadClisheAdicional();
            console.log ("Clishe adicionales antes de acabados",nClisheAdicionales);
            pasoECD=524;
            // verificamos si quedaron clishe adicionales
            if ((nClisheAdicionales-nVarNBarniz) > 0){
                nClisheAdicionales=nClisheAdicionales-nVarNBarniz;
            }
            
            pasoECD=525;
            console.log ("Clishe Adicionales despues de acabados",nClisheAdicionales," pasoECD",pasoECD);

            pasoECD=526;
            setCantidadClisheAdicional(nClisheAdicionales);
            pasoECD=527;
            if (nClisheAdicionales>0){
                // activamos clishe adicionalespasoECD=527;
                pasoECD=528;
                console.log ("activando Clishe Adicionales  pasoECD",pasoECD);
                seleccionaClisheAdicional();
            } else {
                pasoECD=529;
                console.log ("desactivando Clishe Adicionales  pasoECD",pasoECD);
                desseleccionaClisheAdicional();
            }
            pasoECD=530;
            changeClisheAdicional();            
        } else {
            // no hay barniz en produccion
            pasoECD=550;
            seleccionaNingunAcabado();
            pasoECD=551;
            desseleccionaAcabadoMate1();
            pasoECD=552;
            desactivaAcabadoMate1();
            pasoECD=553;
            desseleccionaAcabadoMate2();
            pasoECD=554;
            desseleccionaReservaBarniz1();
            pasoECD=555;
            desseleccionaReservaBarniz2();
            pasoECD=556;
            clickNingunAcabado();
        }
        console.log ("===> fin ecd BUSCA Tipos de acabados pasoECD:", pasoECD);

        // buscamos el servico de laminado
        pasoECD=600;
        nTMP_VA1v="";
        cVarLam="";
        nANCLAM=0.00;
        nTMP_PLA=0.00;
        resultado=searchInArray(arregloData,"SerLam");
        //console.log ("===> ecd buscamos el servico de laminado pasoECD:", pasoECD, " serlam=",resultado);
        pasoECD=601;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            nTMP_VA1v=resultado;
            //console.log ("valor laminado encontrado paso:", pasoECD, " valor ", nTMP_VA1v);
        }  
        console.log ("===> fin ecd buscamos el servico de laminado pasoECD:", pasoECD);
        
        // buscamos el codigo de la laminacion
        pasoECD=605;
        resultado=searchInArray(arregloData,"CodLam");
        console.log ("===> ecd buscamos el codigo de laminado pasoECD:", pasoECD);
        pasoECD=601;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            cVarLam=resultado;
            setCodigoLaminado(cVarLam);
        }  
        console.log ("===> fin ecd buscamos el codigo de laminado pasoECD:", pasoECD);

        // buscamos el ancho de la laminacion
        pasoECD=605;
        resultado=searchInArray(arregloData,"AncLam");
        console.log ("===> ecd buscamos el ancho de laminado pasoECD:", pasoECD);
        pasoECD=606;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            nANCLAM=parseFloat(resultado);
            setAnchoLaminado(nANCLAM);
        }   
        console.log ("===> fin ecd buscamos el ancho de laminado pasoECD:", pasoECD);      

        // buscamos el precio de la laminacion
        pasoECD=607;
        resultado=searchInArray(arregloData,"PreLam");
        console.log ("===> ecd buscamos el precio de la laminacion pasoECD:", pasoECD);
        pasoECD=608;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            nTMP_PLA=resultado;
            pasoECD=609;
            setCostoLaminado(nTMP_PLA);
            changeCostoLaminacion();
        }  

        // verificamos si hay laminacion
        pasoECD=620;
        console.log (" valor laminado paso", pasoECD, " valor", nTMP_VA1v);
        if (nTMP_VA1v=="1"){
            // activamos el control check de laminacion
            pasoECD=621;
            //console.log ("activa laminado paso", pasoECD, " valor", nTMP_VA1v);
            seleccionaLaminado();
            pasoECD=622;
            clickChkLaminado();
            pasoECD=623;
            if (cVarLam!=""){
                pasoECD=624;
                setCodigoLaminado(cVarLam);
            }
        } else {
            pasoECD=626;
            //console.log ("desactiva laminado paso", pasoECD, " valor", nTMP_VA1);
            desseleccionaLaminado();
            pasoECD=627;
            setCodigoLaminado("");
        }
        console.log ("===> fin ecd buscamos el precio de la laminacion pasoECD:", pasoECD);        
                   
        // buscamos si hay laminado mate
        pasoECD=650;
        resultado=searchInArray(arregloData,"PreLam");
        console.log ("===> ecd si hay laminado mate pasoECD:" , pasoECD);
        pasoECD=608;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=609;
            if (resultado=="1"){
                pasoECD=610;
                seleccionaMateLaminado();
            } else {
                pasoECD=611;
                desseleccionaMateLaminado();
            }
        }    
        console.log ("===> fin ecd si hay laminado mate pasoECD:", pasoECD);     
        
        // buscamos la descripcion del material de laminacion
        if ((typeof(cVarLam)!="undefined") && (cVarLam!="") && (cVarLam!="NULL")){
            // buscamos las repeticiones del troquel
            $.ajax({
                url: "/search_descripcion_material",
                type: "get",
                dataType: "html",
                data:{
                    codmaterial:cVarLam
                }
            }).done(function (res) {
                pasoECD=4023;
                //console.log (res);
                pasoECD=4024;
                var data = JSON.parse(res);  
                //console.log (data);  
                pasoECD=4025;            
                //console.log  (data.valor);                                   
                if (data["result"]=="1"){
                    pasoECD=4026;
                    // se asiga el precio del material
                    setDescripcionLaminado(data["data"]);
                } else if (data["result"]=="-1") {
                    pasoECD=4028;
                    msgError (`No se consigió laa descripcion de la laminacion  ${cVarLam}`);
                } else {
                    pasoECD=4029;
                    msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
                }
            }); 

        }

        console.log ("Clishe adicionales antes de Foils",nClisheAdicionales, " pasoECD:",pasoECD);
        // buscaremos si hay foils
        pasoECD=615;
        console.log ("===>  ecd buscaremos si hay foils pasoECD:", pasoECD); 
        bHayFoils=searchFoils(arregloData);
        if (bHayFoils){
            console.log ("Hay foils en la cotizacion");
        }

        pasoECD=616;
        if (bHayFoils){
            pasoECD=617;
            // buscaremos cuantos foils hay
            nFoils=0;
            nFoils=searchNFoils(arregloData);
            pasoECD=618;
            if (nFoils > 0){
                pasoECD=619;
                // restamos los foils de los clishe adicionales
                nClisheAdicionales=getCantidadClisheAdicional();
                console.log ("Clishe adicionales antes de Foil 1",nClisheAdicionales);
                pasoECD=620;
                //nClisheAdicionales=nClisheAdicionales-nFoils;

                pasoECD=621;
                bColdFoils=false;
                pasoECD=622;
                bHotFoils=false;
                pasoECD=623;
                bColdFoils=searchTiposFoils(arregloData,"COLD FOIL");
                if (bColdFoils){
                    console.log ("Foils Encontrado COLD FOIL")
                }                
                pasoECD=624;
                if (!bColdFoils){
                    // no hay COLD FOIL buscamos C.FOIL
                    pasoECD=625;
                    bColdFoils=searchTiposFoils(arregloData,"C.FOIL");
                    if (bColdFoils){
                        console.log ("Foils Encontrado C.FOIL")
                    }
                }
                pasoECD=626;
                if (!bColdFoils){
                    // no hay COLD FOIL buscamos COLD FOIL HOLOGRAFICO
                    pasoECD=627;
                    bColdFoils=searchTiposFoils(arregloData,"COLD FOIL HOLOGRAFICO");
                    if (bColdFoils){
                        console.log ("Foils Encontrado COLD FOIL HOLOGRAFICO")
                    }                    
                }                
                pasoECD=628;
                if (!bColdFoils){
                    // buscaremos hotfoils si no encontramos cold foils
                    bHotFoils=searchTiposFoils(arregloData,"HOT FOIL");
                    if (bColdFoils){
                        console.log ("Foils Encontrado HOT FOIL")
                    }                
                    pasoECD=629;
                    if (!bHotFoils){
                        // no hay HOT FOIL buscamos H.FOIL
                        pasoECD=630;
                        bHotFoils=searchTiposFoils(arregloData,"H.FOIL");
                        if (bColdFoils){
                            console.log ("Foils Encontrado H.FOIL")
                        }                     
                    }
                }


                // como no se encontraron ni Hot ni Cold foil buscamos solo FOIL
                pasoECD=631;
                if (!bColdFoils && !bHotFoils){
                    pasoECD=632;
                    bColdFoils=searchTiposFoils(arregloData,"FOIL");
                    if (bColdFoils){
                        console.log ("Foils Encontrado FOIL")
                    }                    
                }

                pasoECD=633;
                nVarFoils=0;
                if (bColdFoils || bHotFoils){
                    pasoECD=634;
                    nVarFoils=searchNFoils(arregloData);
                }

                console.log (`Cantidad de foils conseguidos ${nVarFoils}`);

                // activamos los objetos correspondientes
                pasoECD=650;
                switch (nVarFoils){
                    case 1:
                        pasoECD=651;
                        // buscamos el color del coldfoil
                        cVarFoil1=searchColorFoils(arregloData,1,"COLD")
                        pasoECD=652;
                        if (cVarFoil1!=""){
                            pasoECD=653;
                            console.log (`ECD paso ${pasoECD}`);
                            // asignamos el color al objeto del formulario
                            setColorFoil1(cVarFoil1);
                            // deseleccionamos ningun fooil
                            pasoECD=654;
                            console.log (`ECD paso ${pasoECD}`);
                            deseleccionaNingunServicio();
                            // activamos coldfoil
                            pasoECD=655;
                            seleccionaColdFoil();
                            console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);
                            // activamos el chek de color foil1
                            seleccionaChkFoil1();
                        } else{
                            pasoECD=656;
                            cVarFoil1=searchColorFoils(arregloData,1,"C.FOIL");
                            pasoECD=657;
                            if (cVarFoil1!=""){
                                pasoECD=658;
                                // asignamos el color al objeto del formulario
                                setColorFoil1(cVarFoil1);
                                // deseleccionamos ningun fooil
                                pasoECD=659;
                                deseleccionaNingunServicio();
                                // activamos coldfoil
                                pasoECD=660;
                                seleccionaColdFoil();
                                console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);
                                // activamos el chek de color foil1
                                seleccionaChkFoil1();                                
                            } else {
                                pasoECD=661;
                                cVarFoil1=searchColorFoils(arregloData,1,"COLD FOIL HOLOGRAFICO");
                                pasoECD=666;
                                if (cVarFoil1!=""){
                                    pasoECD=667;
                                    // asignamos el color al objeto del formulario
                                    setColorFoil1(cVarFoil1);
                                    pasoECD=668;
                                    // deseleccionamos ningun fooil
                                    deseleccionaNingunServicio();
                                    pasoECD=669;
                                    // activamos coldfoil
                                    seleccionaColdFoil();   
                                    console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);    
                                    // activamos el chek de color foil1
                                    seleccionaChkFoil1();                                                               
                                } else {
                                    pasoECD=670;
                                    cVarFoil1=searchColorFoils(arregloData,1,"HOT FOIL");
                                    pasoECD=671;
                                    if (cVarFoil1!=""){
                                        pasoECD=672;
                                        // asignamos el color al objeto del formulario
                                        setColorFoil1(cVarFoil1);  
                                        pasoECD=673;
                                        // deseleccionamos ningun fooil
                                        deseleccionaNingunServicio(); 
                                        pasoECD=674; 
                                        // activamos hot foil
                                        seleccionaHotFoil();       
                                        console.log (`Selecciona HotFoil ECD paso ${pasoECD}`);   
                                        // activamos el chek de color foil1
                                        seleccionaChkFoil1();                                                                                                          
                                    } else {
                                        pasoECD=675;
                                        cVarFoil1=searchColorFoils(arregloData,1,"H.FOIL");
                                        pasoECD=676;
                                        if (cVarFoil1!=""){
                                            pasoECD=677;
                                            // asignamos el color al objeto del formulario
                                            setColorFoil1(cVarFoil1);  
                                            // deseleccionamos ningun fooil
                                            pasoECD=678;
                                            deseleccionaNingunServicio();  
                                            // activamos hot foil
                                            pasoECD=679;
                                            seleccionaHotFoil(); 
                                            console.log (`Selecciona HotFoil ECD paso ${pasoECD}`);
                                            // activamos el chek de color foil1
                                            seleccionaChkFoil1();                                            
                                        } else {
                                            pasoECD=680;
                                            cVarFoil1=searchColorFoils(arregloData,1,"FOIL");
                                            // asignamos el color al objeto del formulario
                                            pasoECD=681;
                                            setColorFoil1(cVarFoil1);
                                            // deseleccionamos ningun fooil
                                            pasoECD=682;
                                            deseleccionaNingunServicio();
                                            // activamos coldfoil
                                            pasoECD=683;
                                            seleccionaColdFoil();  
                                            console.log (`Selecciona ColFoil ECD paso ${pasoECD}`);    
                                            // activamos el chek de color foil1
                                            seleccionaChkFoil1();                                                                                  
                                        }
                                    }
                                }
                            }                         
                        }  
                        break;
                    case 2:
                        // buscamos el color del coldfoil
                        pasoECD=684;
                        cVarFoil1=searchColorFoils(arregloData,1,"COLD");
                        pasoECD=685;
                        if (cVarFoil1!=""){
                            pasoECD=686;
                            // asignamos el color al objeto del formulario
                            setColorFoil1(cVarFoil1);
                            pasoECD=687;
                            // deseleccionamos ningun fooil
                            deseleccionaNingunServicio();
                            pasoECD=688;
                            // activamos coldfoil
                            seleccionaColdFoil();
                            console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);
                            // activamos el chek de color foil1
                            seleccionaChkFoil1();                            
                        } else{
                            pasoECD=689;
                            cVarFoil1=searchColorFoils(arregloData,1,"C.FOIL");
                            pasoECD=690;
                            if (cVarFoil1!=""){
                                pasoECD=691;
                                // asignamos el color al objeto del formulario
                                setColorFoil1(cVarFoil1);
                                pasoECD=692;
                                // deseleccionamos ningun fooil
                                deseleccionaNingunServicio();
                                pasoECD=693;
                                // activamos coldfoil
                                seleccionaColdFoil();
                                console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);
                                // activamos el chek de color foil1
                                seleccionaChkFoil1();                                
                            } else {
                                pasoECD=694;
                                cVarFoil1=searchColorFoils(arregloData,1,"COLD FOIL HOLOGRAFICO");
                                pasoECD=695;
                                if (cVarFoil1!=""){
                                    pasoECD=696;
                                    // asignamos el color al objeto del formulario
                                    setColorFoil1(cVarFoil1);
                                    // deseleccionamos ningun fooil
                                    pasoECD=697;
                                    deseleccionaNingunServicio();
                                    // activamos coldfoil
                                    pasoECD=698;
                                    seleccionaColdFoil();    
                                    console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);    
                                    // activamos el chek de color foil1
                                    seleccionaChkFoil1();                                                              
                                } else {
                                    pasoECD=699;
                                    cVarFoil1=searchColorFoils(arregloData,1,"HOT FOIL");
                                    pasoECD=670;
                                    if (cVarFoil1!=""){
                                        pasoECD=671;
                                        // asignamos el color al objeto del formulario
                                        setColorFoil1(cVarFoil1);  
                                        // deseleccionamos ningun fooil
                                        pasoECD=672;
                                        deseleccionaNingunServicio();  
                                        // activamos hot foil
                                        pasoECD=673;
                                        seleccionaHotFoil();      
                                        console.log (`Selecciona HotFoil ECD paso ${pasoECD}`);  
                                        // activamos el chek de color foil1
                                        seleccionaChkFoil1();                                                                                                            
                                    } else {
                                        pasoECD=674;
                                        cVarFoil1=searchColorFoils(arregloData,1,"H.FOIL");
                                        pasoECD=675;
                                        if (cVarFoil1!=""){
                                            pasoECD=676;
                                            // asignamos el color al objeto del formulario
                                            setColorFoil1(cVarFoil1);  
                                            // deseleccionamos ningun fooil
                                            pasoECD=677;
                                            deseleccionaNingunServicio();  
                                            // activamos hot foil
                                            pasoECD=678;
                                            seleccionaHotFoil(); 
                                            console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);
                                            // activamos el chek de color foil1
                                            seleccionaChkFoil1();                                            
                                        } else {
                                            pasoECD=679;
                                            cVarFoil1=searchColorFoils(arregloData,1,"FOIL");
                                            // asignamos el color al objeto del formulario
                                            pasoECD=680;
                                            setColorFoil1(cVarFoil1);
                                            // deseleccionamos ningun fooil
                                            pasoECD=681;
                                            deseleccionaNingunServicio();
                                            // activamos coldfoil
                                            pasoECD=682;
                                            seleccionaColdFoil();    
                                            console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`); 
                                            // activamos el chek de color foil1
                                            seleccionaChkFoil1();                                                                                   
                                        }
                                    }
                                }
                            }                         
                        } 
                        /*------------------ foil 2 -------------------------------------*/
                        pasoECD=683;
                        cVarFoil2=searchColorFoils(arregloData,2,"COLD");
                        pasoECD=684;
                        if (cVarFoil2!=""){
                            pasoECD=685;
                            // asignamos el color al objeto del formulario
                            setColorFoil2(cVarFoil2);
                            // deseleccionamos ningun fooil
                            pasoECD=686;
                            deseleccionaNingunServicio();
                            // activamos coldfoil
                            pasoECD=687;
                            seleccionaColdFoil();
                            console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);
                            // activamos el chek de color foil2
                            seleccionaChkFoil2();                            
                        } else{
                            pasoECD=688;
                            cVarFoil2=searchColorFoils(arregloData,2,"C.FOIL");
                            pasoECD=689;
                            if (cVarFoil2!=""){
                                pasoECD=690;
                                // asignamos el color al objeto del formulario
                                setColorFoil1(cVarFoil2);
                                // deseleccionamos ningun fooil
                                pasoECD=691;
                                deseleccionaNingunServicio();
                                // activamos coldfoil
                                pasoECD=692;
                                seleccionaColdFoil();
                                console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);
                                // activamos el chek de color foil2
                                seleccionaChkFoil2();                            

                            } else {
                                pasoECD=693;
                                cVarFoil2=searchColorFoils(arregloData,2,"COLD FOIL HOLOGRAFICO");
                                pasoECD=694;
                                if (cVarFoil2!=""){
                                    pasoECD=695;
                                    // asignamos el color al objeto del formulario
                                    setColorFoil2(cVarFoil2);
                                    // deseleccionamos ningun fooil
                                    pasoECD=696;
                                    deseleccionaNingunServicio();
                                    // activamos coldfoil
                                    pasoECD=697;
                                    seleccionaColdFoil();    
                                    console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);  
                                    // activamos el chek de color foil2
                                    seleccionaChkFoil2();                            

                                } else {
                                    pasoECD=698;
                                    cVarFoil2=searchColorFoils(arregloData,2,"HOT FOIL");
                                    pasoECD=699;
                                    if (cVarFoil2!=""){
                                        pasoECD=700;
                                        // asignamos el color al objeto del formulario
                                        setColorFoil1(cVarFoil2);  
                                        // deseleccionamos ningun fooil
                                        pasoECD=701;
                                        deseleccionaNingunServicio();  
                                        // activamos hot foil
                                        pasoECD=701;
                                        seleccionaHotFoil(); 
                                        console.log (`Selecciona HotFoil ECD paso ${pasoECD}`);     
                                        // activamos el chek de color foil2
                                        seleccionaChkFoil2();                            

                                    } else {
                                        pasoECD=702;
                                        cVarFoil2=searchColorFoils(arregloData,2,"H.FOIL");
                                        pasoECD=703;
                                        if (cVarFoil2!=""){
                                            pasoECD=704;
                                            // asignamos el color al objeto del formulario
                                            setColorFoil1(cVarFoil2);  
                                            // deseleccionamos ningun fooil
                                            pasoECD=705;
                                            deseleccionaNingunServicio();  
                                            // activamos hot foil
                                            pasoECD=706;
                                            seleccionaHotFoil();
                                            console.log (`Selecciona HotFoil ECD paso ${pasoECD}`); 
                                            // activamos el chek de color foil2
                                            seleccionaChkFoil2();                            

                                        } else {
                                            pasoECD=707;
                                            cVarFoil2=searchColorFoils(arregloData,1,"FOIL");
                                            // asignamos el color al objeto del formulario
                                            pasoECD=708;
                                            setColorFoil2(cVarFoil2);
                                            // deseleccionamos ningun fooil
                                            pasoECD=709;
                                            deseleccionaNingunServicio();
                                            // activamos coldfoil
                                            pasoECD=710;
                                            seleccionaColdFoil();    
                                            console.log (`Selecciona ColdFoil ECD paso ${pasoECD}`);  
                                            // activamos el chek de color foil2
                                            seleccionaChkFoil2();                            

                                        }
                                    }
                                }
                            }                         
                        }                                                 
                        break;
                    default:
                        pasoECD=711;
                        seleccionaNingunServicio();
                        console.log (`No se lecciona ninguna servicio ${pasoECD}`);
                        pasoECD=712;
                        // deactivamos el chek de color foil1
                        deseleccionaChkFoil1();              
                        pasoECD=713;              
                        // deactivamos el chek de color foil2
                        deseleccionaChkFoil2();                            
                        break;
                }
                // incrementamos la cantidad de clishe adicionales
                pasoECD=714; 
                console.log (`cantidad de foils antes de  ${nFoils}`);
                console.log (`cantidad de clishes adicionales antes de ${nClisheAdicionales}`);
                pasoECD=715; 
                nClisheAdicionales=nClisheAdicionales+nFoils;
                pasoECD=716; 
                setCantidadClisheAdicional(nClisheAdicionales);
                pasoECD=717; 
                changeClisheAdicional();
            }
        } else {
            // buscamos en los datos de cotizacion
            pasoECD=720;
            resultado=searchInArray(arregloData,"TipSer");
            pasoECD=721;
            nFoils=0;
            if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
                pasoECD=722;
                switch (resultado){
                    case "N":
                        pasoECD=723;
                        // no hay servicios
                        seleccionaNingunServicio();
                        pasoECD=724;
                        deseleccionaColdFoil();
                        pasoECD=725;
                        deseleccionaHotFoil();
                        break;
                    case "C":
                        // cold foils
                        pasoECD=726;
                        seleccionaColdFoil();
                        pasoECD=727;
                        resultado=searchInArray(arregloData,"FColor");
                        pasoECD=728;
                        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
                            pasoECD=729;
                            setColorFoil1(resultado);
                            pasoECD=730;
                            seleccionaChkFoil1();
                            nfoisl=nFoils+1;
                        } else {
                            pasoECD=731;
                            setColorFoil1("");
                            pasoECD=732;
                            deseleccionaChkFoil1();
                        }

                        pasoECD=733;
                        resultado=searchInArray(arregloData,"FColor2");
                        pasoECD=734;
                        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
                            pasoECD=735;
                            setColorFoil2(resultado);
                            pasoECD=736;
                            seleccionaChkFoil2();
                            nfoisl=nFoils+1;
                        } else {
                            pasoECD=737;
                            setColorFoil2("");
                            pasoECD=738;
                            deseleccionaChkFoil2();
                        }                        
                        break;     
                    case "F":
                        // hot foils
                        pasoECD=739;
                        seleccionaHotFoil();
                        pasoECD=740;
                        resultado=searchInArray(arregloData,"FColor");
                        pasoECD=741;
                        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
                            pasoECD=742;
                            setColorFoil1(resultado);
                            pasoECD=743;
                            seleccionaChkFoil1();
                            nfoisl=nFoils+1;
                        } else {
                            pasoECD=744;
                            setColorFoil1("");
                            pasoECD=745;
                            deseleccionaChkFoil1();
                        }
                        pasoECD=746;
                        resultado=searchInArray(arregloData,"FColor2");
                        pasoECD=747;
                        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
                            pasoECD=748;
                            setColorFoil2(resultado);
                            pasoECD=749;
                            seleccionaChkFoil2();
                            nfoisl=nFoils+1;
                        } else {
                            pasoECD=750;
                            setColorFoil2("");
                            pasoECD=751;
                            deseleccionaChkFoil2();
                        }                         
                        break;                                             
                }
            }
            // incrementamos la cantidad de clishe adicionales
            pasoECD=751; 
            console.log (`cantidad de foils antes de  ${nFoils}`);
            console.log (`cantidad de clishes adicionales antes de ${nClisheAdicionales}`);
            pasoECD=752; 
            nClisheAdicionales=nClisheAdicionales+nFoils;
            pasoECD=753; 
            setCantidadClisheAdicional(nClisheAdicionales);
            pasoECD=754; 
            changeClisheAdicional();        
        }
           
        console.log ("===>  fin ecd buscaremos si hay foils pasoECD:", pasoECD);

        // buscamos el costo de del foil1
        pasoECD=7601;
        console.log ("===>  ecd  buscamos el costo del foil 1", pasoECD);
        resultado=searchInArray(arregloData,"CosFoil");
        pasoECD=7602;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")  && (resultado!=0.00)){
            pasoECD=7603;
            setCostoFoil1(resultado);
            changeCostoFoil1();
            pasoECD=7604;
            nClisheAdicionales=getCantidadClisheAdicional();
            console.log ("Clishe adicionales antes de Foil 1",nClisheAdicionales);
            pasoECD=7605;
            //nClisheAdicionales=nClisheAdicionales+1;
            pasoECD=7606;
            console.log ("Clishe adicionales despues de Foil 1",nClisheAdicionales);
            setCantidadClisheAdicional(nClisheAdicionales);
            pasoECD=7607;
            changeClisheAdicional();
            pasoECD=7608;
        }
        console.log ("===>  fin ecd  buscamos el costo del foil 1 pasoECD:", pasoECD);  
        
        // buscamos el costo del foil2
        pasoECD=7610;
        console.log ("===>  ecd  buscamos el costo del foil 2", pasoECD);
        resultado=searchInArray(arregloData,"CosFoil2");
        console.log ("resultado cosfoil2",resultado, " paso 7610");
        pasoECD=7611;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL") && (resultado!=0.00)){
            pasoECD=7612;
            setCostoFoil2(resultado);
            pasoECD=7613;
            changeCostoFoil2();
            pasoECD=7614;
            nClisheAdicionales=getCantidadClisheAdicional();
            console.log ("Clishe adicionales antes de Foil 2",nClisheAdicionales);
            pasoECD=7615;
            //nClisheAdicionales=nClisheAdicionales+1;
            console.log ("Clishe adicionales despues de Foil 2",nClisheAdicionales);
            pasoECD=7616;
            setCantidadClisheAdicional(nClisheAdicionales);
            console.log ("Agregando clishe adicional foil2");
            pasoECD=7617;
            changeClisheAdicional();
            pasoECD=7618;
        }
        console.log ("===>  fin ecd  buscamos el costo del foil 2 pasoECD:", pasoECD);       
        console.log ("Clishe adicionales despues de Foils",nClisheAdicionales, " pasoECD:",pasoECD);     

        // buscamos el ancho del servicio
        pasoECD=760;
        console.log ("===>  ecd  buscamos el ancho del servicio", pasoECD);
        resultado=searchInArray(arregloData,"AncSer");
        pasoECD=761;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=762;
            nVarAnc =parseFloat(resultado);
            pasoECD=763;
            setAnchoFoil(nVarAnc);
        }
        console.log ("===>  fin ecd  buscamos el ancho del servicio pasoECD:", pasoECD);

        // buscamos si hay descuento
        pasoECD=765;
        console.log ("===>  ecd  buscamos si hay descuento pasoECD:", pasoECD);
        resultado=searchInArray(arregloData,"AsuDes");
        pasoECD=766;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=767;
            if (resultado=="1"){
                pasoECD=768;
                activaDescuento();
            } else {
                pasoECD=769;
                desactivaDescuento();
            }
        }
        console.log ("===> fin ecd  buscamos si hay descuento pasoECD:", pasoECD);

        // verificamos si usa sandwich
        pasoECD=770;
        console.log ("===>  ecd verificamos si usa sandwich pasoECD:", pasoECD);
        resultado=searchInArray(arregloData,"UsaSan");
        pasoECD=771;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=772;
            if (resultado=="1"){
                pasoECD=773;
                // activamos el check del sandiwch
                seleccionachkSandwich();
                pasoECD=774
                // desencadenamos el evento click en el objeto chkSandiwch
                clickCkSandwich();

            } else {
                pasoECD=775;
                // desactivamos el check del sandwich
                deseleccionachkSandwich();
                // limpiamos el objeto de codigo del sandwich
                pasoECD=776;
                setSandwich("");
                // limpiamos el costo del sandwich
                pasoECD=777;
                setCostoSandwich(0.00);
            }
        }
        console.log ("===> fin ecd verificamos si usa sandwich pasoECD:", pasoECD);

        // buscamos el codigo del sandwich
        pasoECD=780;
        console.log ("===>  ecd buscamos el codigo del sandwich pasoECD:", pasoECD);
        resultado=searchInArray(arregloData,"CodSan");
        pasoECD=781;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=782;
            // asignamos el valor al objeto de codigo de sandwich
            setSandwich(resultado);
        } else {
            // limpiamos el objeto de codigo de sandwich
            pasoECD=783;
            setSandwich("");
        } 
        console.log ("===> fin ecd buscamos el codigo del sandwich pasoECD:", pasoECD);       

        // costo del sandwich
        pasoECD=785;
        console.log ("===>  ecd buscamos costo del sandwich pasoECD:", pasoECD);
        resultado=searchInArray(arregloData,"CosSan");
        console.log ("Resultado Costo Sandwich ",resultado);
        pasoECD=786;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=787;
            // asignamos el valor al objeto de codigo de sandwich
            setCostoSandwich(resultado);
        } else {
            // limpiamos el objeto de codigo de sandwich
            pasoECD=788;
            setCostoSandwich(0.00);
        }     
        console.log ("===>  fin ecd buscamos costo del sandwich pasoECD:", pasoECD);

        // buscamos los colores de indigo
        pasoECD=790;
        console.log ("===>  ecd buscamos los colores de indigo pasoECD:", pasoECD);
        resultado=searchInArray(arregloData,"OptCol");
        pasoECD=791;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=792;
            // activamos la opcion de color correspondiente
            seleccionaCMYk(resultado);
        }    
        console.log ("===> fin  ecd buscamos los colores de indigo pasoECD:", pasoECD);     


		//------------------------------ objetos de la pagina de resumen ------------------------------
        // buscamos Porcentaje por comision
        pasoECD=800;
        console.log ("===>  ecd  buscamos Porcentaje por comision pasoECD:", pasoECD);
        resultado=searchInArray(arregloData,"PorCom");
        pasoECD=801;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=802;
            // activamos la opcion de color correspondiente
            setResumenComision(resultado);
        }       
        console.log ("===> fin ecd  buscamos Porcentaje por comision pasoECD:", pasoECD);  
	
        // status de la cotizacion
        pasoECD=810;
        console.log ("===>  ecd  buscamos status de la cotizacion pasoECD:", pasoECD);
        resultado=searchInArray(arregloData,"StaCot");
        console.log ("estado de la cotizacion",resultado,"pasoECD ",pasoECD);
        pasoECD=811;
        if ((resultado!="") && (typeof(resultado)!="undefined") && (resultado!="NULL")){
            pasoECD=812;
            // activamos la opcion de color correspondiente
           setResumenStatus(resultado);
        }    

       // buscamos PRECIO DE LA ETQ
        pasoECD=455;
        resultado=searchInArray(arregloData,"PreFin");
        console.log ("===> ecd  buscamos PRECIO DE LA ETQ pasoECD:", pasoECD);
        pasoECD=456;
        if ((resultado!="NULL") && (resultado!="") && (typeof(resultado)!="undefined")){
            pasoECD=457;
            setPrecioEtiqueta(resultado);
            pasoECD=458;
            nVarPrecioEtq=resultado;
            console.log ("nVarPrecioEtq",nVarPrecioEtq);
            changePrecioEtiqueta();
        }   
        console.log ("===> fin fin ecd  buscamos PRECIO DE LA ETQ pasoECD:", pasoECD);
        console.log ("===> fin  ecd  buscamos status de la cotizacion pasoECD:", pasoECD);     
     
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error ecd");
        console.error("Mensaje de error:", error.message,"pasoECD:",pasoECD);
        console.error("Tipo de error:", error.name);
    }  
}