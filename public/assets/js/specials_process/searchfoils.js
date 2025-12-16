/*---- este script se usa en procesos especiales ---*/
/*--- se usa para determinar si hay foils en los renglones de producción -----*/
function searchFoils(arregloComentario){
    try {
        console.log ("entrando searchFoils");
        paso=1;

        var lineaEncontrada="";
        var cadenaBuscada="";
        var resultado=false;

        // descripcion color 1
        paso=2;
        cadenaBuscada="DesC01";
        paso=3;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=4;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=5;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=6;
            valor=arregloTemp[1];
            paso=7;
            if (valor=="FOIL"){
                paso=8;
                resultado=true;
            }
        } 

        // descripcion color 2
        paso=8;
        cadenaBuscada="DesC02";
        paso=9;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=10;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=11;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=12;
            valor=arregloTemp[1];
            paso=13;
            if (valor=="FOIL"){
                paso=14;
                resultado=true;
            }
        }     

        // descripcion color 3
        paso=15;
        cadenaBuscada="DesC03";
        paso=16;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=17;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=18;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=19;
            valor=arregloTemp[1];
            paso=20;
            if (valor=="FOIL"){
                paso=21;
                resultado=true;
            }
        }   
        
        // descripcion color 4
        paso=21;
        cadenaBuscada="DesC04";
        paso=22;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=23;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=24;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=25;
            valor=arregloTemp[1];
            paso=26;
            if (valor=="FOIL"){
                paso=27;
                resultado=true;
            }
        }    

        // descripcion color 5
        paso=28;
        cadenaBuscada="DesC05";
        paso=29;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=30;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=31;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=32;
            valor=arregloTemp[1];
            paso=33;
            if (valor=="FOIL"){
                paso=34;
                resultado=true;
            }
        }    
    
        // descripcion color 6
        paso=35;
        cadenaBuscada="DesC06";
        paso=36;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=37;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=38;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=39;
            valor=arregloTemp[1];
            paso=40;
            if (valor=="FOIL"){
                paso=41;
                resultado=true;
            }
        }   
        
        // descripcion color 7
        paso=41;
        cadenaBuscada="DesC07";
        paso=42;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=43;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=44;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=45;
            valor=arregloTemp[1];
            paso=46;
            if (valor=="FOIL"){
                paso=47;
                resultado=true;
            }
        }    
        
        // descripcion color 8
        paso=48;
        cadenaBuscada="DesC08";
        paso=49;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=50;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=51;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=52;
            valor=arregloTemp[1];
            paso=53;
            if (valor=="FOIL"){
                paso=54;
                resultado=true;
            }
        }    

        // descripcion color 9
        paso=55;
        cadenaBuscada="DesC09";
        paso=56;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=57;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=58;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=59;
            valor=arregloTemp[1];
            paso=60;
            if (valor=="FOIL"){
                paso=61;
                resultado=true;
            }
        }    
        
        // descripcion color 10
        paso=62;
        cadenaBuscada="DesC10";
        paso=63;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=64;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=65;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=66;
            valor=arregloTemp[1];
            paso=67;
            if (valor=="FOIL"){
                paso=68;
                resultado=true;
            }
        }    

        // descripcion color 11
        paso=69;
        cadenaBuscada="DesC11";
        paso=70;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=71;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=72;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=73;
            valor=arregloTemp[1];
            paso=74;
            if (valor=="FOIL"){
                paso=75;
                resultado=true;
            }
        }  
        
        // descripcion color 12
        paso=76;
        cadenaBuscada="DesC12";
        paso=77;
        lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
        paso=78;
        if ((lineaEncontrada!="")&& (typeof(lineaEncontrada)!="undefined") ){
            paso=79;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=80;
            valor=arregloTemp[1];
            paso=81;
            if (valor=="FOIL"){
                paso=82;
                resultado=true;
            }
        }  
        
        // no encontramos Foils en los colores, buscamos en los comentarios de cotizacion
        paso=83;
        if (!resultado) {
            console.log ("No encontrado en produccion, buscamos en cotizacion");
            paso=84;
            cadenaBuscada="TipSer";
            paso=85;
            lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
            console.log ("linea encontrada",lineaEncontrada," paso ",paso);
            paso=86;
            if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined") ){
                paso=87;
                // dividimos la linea en con el caracter = para determinarl el valor
                arregloTemp=lineaEncontrada.split("=");
                paso=88;
                valor=arregloTemp[1];
                paso=89;
                if ((valor=="C") || (valor=="F") ){
                    paso=90;
                    resultado=true;
                    console.log ("servicio encontrado ");
                }
            }        
        }
        paso=91;
        // devolvemos el resultado
        return (resultado);        
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchFoils");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  

}

/*
original foxpro 
* 2025-05-07
* metodo para buscar foils dentro de los renglones de colores de produccion
* esto se hace para descontar de la cantidad de colores que se almacena en la variable ActCol que genera produccion
* se busca la palabra Foil
* puede haber hasta dos estaciones con Foil ya sea Cold Foil o Hot Foil
* se toma como parametro de comentario el contenido del campo edit edtcom que se carga con los comentarios de las ordenes de producción
***************************************************************************************************************************************

*!*	TRY
	LOCAL comentario, cVarColor, cVarRenglon, bHayFoil
	comentario=thisform.edTCOM.value
	
	paso=6000
	* reemplazamos el caracter ; por chr(13)
	nComentario=STRTRAN(thisform.edTCOM.Value, ";", CHR(13))

	* creamos un arreglo temporal para hacer la buqueda de los codigos de troqueles en el comentario
	paso=6001
	DIMENSION laArreglo[1]

	paso=6002
	lnElementos = ALINES(laArreglo, nComentario)

	bHayFoil=.f.
	paso=6003
	* buscamos en el arreglo que contiene las variables del comentario
	FOR i = 1 TO lnElementos
		paso=6004
		IF !EMPTY(thisform.otmp_cdd("DesC01",laArreglo[i]))
			paso=6005
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC01", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC02",laArreglo[i]))
			paso=6006
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC02", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6007
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC03",laArreglo[i]))
			paso=6008
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC03", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6009
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC04",laArreglo[i]))
			paso=6010
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC04", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6011
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC05",laArreglo[i]))
			paso=6012
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC05", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6013
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC06",laArreglo[i]))
			paso=6014
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC06", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6015
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC07",laArreglo[i]))
			paso=6016
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC07", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6017
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC08",laArreglo[i]))
			paso=6018
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC08", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6019
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif		
		
		IF !EMPTY(thisform.otmp_cdd("DesC09",laArreglo[i]))
			paso=6020
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC09", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6021
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC10",laArreglo[i]))
			paso=6022
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC10", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6023
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC11",laArreglo[i]))
			paso=6024
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC11", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6025
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC12",laArreglo[i]))
			paso=6026
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC12", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (ATC("FOIL", cVarContenido) > 0) then
				paso=6027
				bHayFoil=.t.
				* * MESSAGEBOX(cVarContenido)
			endif
		endif	
		
	ENDFOR
	paso=6028
	

	RETURN (bHayFoil)
*!*	CATCH TO oError
*!*		MESSAGEBOX("Se consiguio un error en el Paso: "+STR(paso)+ " Error:"+oError.message)
*!*	endtry
*/
