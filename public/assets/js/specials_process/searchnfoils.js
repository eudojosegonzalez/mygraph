/*---- este script se usa en procesos especiales ---*/
/*--- se usa para determinar foils hay en los renglones de producción -----*/
function searchNFoils(arregloComentario){
    try {
        console.log ("entrando searchNFoils");
        paso=1;

        var lineaEncontrada="";
        var cadenaBuscada="";
        var nFoils=0;

         // descripcion color 1
        paso=2;
        cadenaBuscada="DesC01";
        paso=3;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=4;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=5;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=6;
            valor=arregloTemp[1];
            paso=7;
            if (valor=="FOIL"){
                paso=8;
                if (nFoils < 2 ){
                    nFoils++;
                }
            }
        } 

        // descripcion color 2
        paso=9;
        cadenaBuscada="DesC02";
        paso=10;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=11;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=12;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=13;
            valor=arregloTemp[1];
            paso=14;
            if (valor=="FOIL"){
                paso=15;
                if (nFoils < 2 ){
                    nFoils++;
                }
            }
        }  
        
        // descripcion color 3
        paso=16;
        cadenaBuscada="DesC03";
        paso=17;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=18;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=19;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=20;
            valor=arregloTemp[1];
            paso=21;
            if (valor=="FOIL"){
                paso=22;
                if (nFoils < 2 ){
                    paso=23;
                    nFoils++;
                }
            }
        }    
        
        // descripcion color 4
        paso=25;
        cadenaBuscada="DesC04";
        paso=26;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=27;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=28;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=29;
            valor=arregloTemp[1];
            paso=30;
            if (valor=="FOIL"){
                paso=31;
                if (nFoils < 2 ){
                    paso=32;
                    nFoils++;
                }
            }
        } 
        
       // descripcion color 5
        paso=35;
        cadenaBuscada="DesC05";
        paso=36;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=37;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=38;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=39;
            valor=arregloTemp[1];
            paso=40;
            if (valor=="FOIL"){
                paso=41;
                if (nFoils < 2 ){
                    paso=42;
                    nFoils++;
                }
            }
        }         

       // descripcion color 6
        paso=45;
        cadenaBuscada="DesC06";
        paso=46;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=47;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=48;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=49;
            valor=arregloTemp[1];
            paso=50;
            if (valor=="FOIL"){
                paso=51;
                if (nFoils < 2 ){
                    paso=52;
                    nFoils++;
                }
            }
        }  
        
       // descripcion color 7
        paso=55;
        cadenaBuscada="DesC07";
        paso=56;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=57;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=58;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=59;
            valor=arregloTemp[1];
            paso=60;
            if (valor=="FOIL"){
                paso=61;
                if (nFoils < 2 ){
                    paso=62;
                    nFoils++;
                }
            }
        }  
        
       // descripcion color 7
        paso=65;
        cadenaBuscada="DesC07";
        paso=66;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=67;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=68;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=69;
            valor=arregloTemp[1];
            paso=70;
            if (valor=="FOIL"){
                paso=71;
                if (nFoils < 2 ){
                    paso=72;
                    nFoils++;
                }
            }
        } 
        
        // descripcion color 8
        paso=75;
        cadenaBuscada="DesC08";
        paso=76;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=77;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=78;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=79;
            valor=arregloTemp[1];
            paso=80;
            if (valor=="FOIL"){
                paso=81;
                if (nFoils < 2 ){
                    paso=82;
                    nFoils++;
                }
            }
        }   
        
        // descripcion color 9
        paso=85;
        cadenaBuscada="DesC09";
        paso=86;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=87;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=88;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=89;
            valor=arregloTemp[1];
            paso=90;
            if (valor=="FOIL"){
                paso=91;
                if (nFoils < 2 ){
                    paso=92;
                    nFoils++;
                }
            }
        } 
        
        // descripcion color 10
        paso=95;
        cadenaBuscada="DesC10";
        paso=96;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=97;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=98;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=99;
            valor=arregloTemp[1];
            paso=100;
            if (valor=="FOIL"){
                paso=101;
                if (nFoils < 2 ){
                    paso=102;
                    nFoils++;
                }
            }
        }    
        
        // descripcion color 11
        paso=105;
        cadenaBuscada="DesC11";
        paso=106;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=107;
       if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=108;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=109;
            valor=arregloTemp[1];
            paso=110;
            if (valor=="FOIL"){
                paso=111;
                if (nFoils < 2 ){
                    paso=112;
                    nFoils++;
                }
            }
        }   
        
        
        // descripcion color 12
        paso=115;
        cadenaBuscada="DesC12";
        paso=116;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=117;
        if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
            paso=118;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=119;
            valor=arregloTemp[1];
            paso=111;
            if (valor=="FOIL"){
                paso=112;
                if (nFoils < 2 ){
                    paso=113;
                    nFoils++;
                }
            }
        } 
        paso=200;
        if (nFoils == 0){
            paso=201;
            // no encontrado en produccion, buscamos en los datos de la cotizacion
            console.log ("No encontrado en produccion, buscamos cantidad de foils en cotizacion")
            // buscamos FCOLOR FOIL1
            paso=202;
            cadenaBuscada="FColor";
            console.log ("Buscando FCOLOR");
            paso=203;
            lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
            paso=204;
            if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
                paso=205;
                // dividimos la linea en con el caracter = para determinarl el valor
                arregloTemp=lineaEncontrada.split("=");
                paso=206;
                valor=arregloTemp[1];
                paso=207;
                if (valor!=""){
                    paso=208;
                    if (nFoils < 2 ){
                        paso=209;
                        nFoils++;
                    }
                }
            }  
            paso=210;
            // buscamos FCOLOR2
            cadenaBuscada="FColor2";
            console.log ("Buscando FCOLOR2");
            paso=213;
            lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
            paso=214;
            if ((typeof(lineaEncontrada)!="undefined") && (lineaEncontrada!="") && (lineaEncontrada!="NULL")){
                paso=215;
                // dividimos la linea en con el caracter = para determinarl el valor
                arregloTemp=lineaEncontrada.split("=");
                paso=216;
                valor=arregloTemp[1];
                paso=217;
                if (valor!=""){
                    paso=218;
                    if (nFoils < 2 ){
                        paso=219;
                        nFoils++;
                    }
                }
            }              
        }
        paso=220;
        console.log ("cantidad de foils encontrados ",nFoils);
        return (nFoils);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchNFoils");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  

}

/*
original foxpro 
* 2025-05-07
* metodo para contar los foils dentro de los renglones de colores de produccion
* esto se hace para descontar de la cantidad de colores que se almacena en la variable ActCol que genera produccion
* se busca la palabra Foil
* puede haber hasta dos estaciones con Foil ya sea Cold Foil o Hot Foil
* se toma como parametro de comentario el contenido del campo edit edtcom que se carga con los comentarios de las ordenes de producción
***************************************************************************************************************************************

*!*	TRY
	LOCAL comentario
	comentario=thisform.edTCOM.value
	
	paso=6000
	* reemplazamos el caracter ; por chr(13)
	nComentario=STRTRAN(thisform.edTCOM.Value, ";", CHR(13))

	* creamos un arreglo temporal para hacer la buqueda de los codigos de troqueles en el comentario
	paso=6001
	DIMENSION laArreglo[1]

	paso=6002
	lnElementos = ALINES(laArreglo, nComentario)

	nFoil=0
	paso=6003
	* buscamos en el arreglo que contiene las variables del comentario
	FOR i = 1 TO lnElementos
		paso=6004
		IF !EMPTY(thisform.otmp_cdd("DesC01",laArreglo[i]))
			paso=6005
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC01", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC02",laArreglo[i]))
			paso=6006
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC02", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6007
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC03",laArreglo[i]))
			paso=6008
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC03", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6009
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC04",laArreglo[i]))
			paso=6010
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC04", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6011
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC05",laArreglo[i]))
			paso=6012
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC05", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6013
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC06",laArreglo[i]))
			paso=6014
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC06", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6015
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC07",laArreglo[i]))
			paso=6016
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC07", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6017
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC08",laArreglo[i]))
			paso=6018
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC08", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6019
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif		
		
		IF !EMPTY(thisform.otmp_cdd("DesC09",laArreglo[i]))
			paso=6020
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC09", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6021
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC10",laArreglo[i]))
			paso=6022
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC10", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6023
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC11",laArreglo[i]))
			paso=6024
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC11", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6025
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC12",laArreglo[i]))
			paso=6026
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC12", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6027
				IF nFoil < 2 then
					nFoil=nFoil+1
				endif
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
	ENDFOR
	paso=6028
	

	RETURN (nFoil)
*!*	CATCH TO oError
*!*		MESSAGEBOX("Se consiguio un error en el Paso: "+STR(paso)+ " Error:"+oError.message)
*!*	endtry
*/
