/*---- este script se usa en procesos especiales ---*/
/*--- se usa para determinar si hay barniz en los renglones de producción -----*/
function searchColorFoils(arregloComentario,posicion,tipo){
	try {
		console.log ("entrando searchColorFoils");
		var lineaEncontrada="";
		var cadenaBuscada="";
		var resultado=false;
        var nContador=0;
        var cVarColor="";

		// descripcion color 1
		paso=1;
		cadenaBuscada="DesC01";
		paso=2;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=3;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=4;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=5;
                nContador=nContador+1;
                paso=6;
                if (nContador=posicion){
                    paso=7;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=8;
                    cVarColor=arregloTemp[1];
                }
            }
		} 

		// descripcion color 2
		paso=10;
		cadenaBuscada="DesC02";
		paso=11;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=12;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=13;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=14;
                nContador=nContador+1;
                paso=15;
                if (nContador=posicion){
                    paso=16;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=17;
                    cVarColor=arregloTemp[1];
                }
            }
		}      
        
		// descripcion color 3
		paso=20;
		cadenaBuscada="DesC03";
		paso=21;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=22;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=23;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=24;
                nContador=nContador+1;
                paso=25;
                if (nContador=posicion){
                    paso=26;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=27;
                    cVarColor=arregloTemp[1];
                }
            }
		}         

		// descripcion color 4
		paso=30;
		cadenaBuscada="DesC04";
		paso=31;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=32;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=33;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=34;
                nContador=nContador+1;
                paso=35;
                if (nContador=posicion){
                    paso=36;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=37;
                    cVarColor=arregloTemp[1];
                }
            }
		}       
        
		// descripcion color 5
		paso=40;
		cadenaBuscada="DesC05";
		paso=41;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=42;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=43;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=44;
                nContador=nContador+1;
                paso=45;
                if (nContador=posicion){
                    paso=46;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=47;
                    cVarColor=arregloTemp[1];
                }
            }
		}     
        
		// descripcion color 6
		paso=50;
		cadenaBuscada="DesC06";
		paso=51;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=52;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=53;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=54;
                nContador=nContador+1;
                paso=55;
                if (nContador=posicion){
                    paso=56;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=57;
                    cVarColor=arregloTemp[1];
                }
            }
		}      
        
		// descripcion color 7
		paso=60;
		cadenaBuscada="DesC07";
		paso=61;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=62;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=63;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=64;
                nContador=nContador+1;
                paso=65;
                if (nContador=posicion){
                    paso=66;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=67;
                    cVarColor=arregloTemp[1];
                }
            }
		}   
        
		// descripcion color 8
		paso=70;
		cadenaBuscada="DesC08";
		paso=71;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=72;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=73;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=74;
                nContador=nContador+1;
                paso=75;
                if (nContador=posicion){
                    paso=76;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=77;
                    cVarColor=arregloTemp[1];
                }
            }
		}    
        
		// descripcion color 9
		paso=80;
		cadenaBuscada="DesC09";
		paso=81;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=82;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=83;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=84;
                nContador=nContador+1;
                paso=85;
                if (nContador=posicion){
                    paso=86;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=87;
                    cVarColor=arregloTemp[1];
                }
            }
		}    
        
		// descripcion color 10
		paso=90;
		cadenaBuscada="DesC10";
		paso=91;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=92;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=93;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=94;
                nContador=nContador+1;
                paso=95;
                if (nContador=posicion){
                    paso=96;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=97;
                    cVarColor=arregloTemp[1];
                }
            }
		}            
                
		// descripcion color 11
		paso=100;
		cadenaBuscada="DesC11";
		paso=101;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=102;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=103;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=104;
                nContador=nContador+1;
                paso=105;
                if (nContador=posicion){
                    paso=106;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=107;
                    cVarColor=arregloTemp[1];
                }
            }
		}            

		// descripcion color 12
		paso=110;
		cadenaBuscada="DesC12";
		paso=111;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=112;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=113;
            // verificamos si el tipo esta contenido dentro de la cadena
            if (lineaEncontrada.includes(tipo)){
                paso=114;
                nContador=nContador+1;
                paso=115;
                if (nContador=posicion){
                    paso=116;
                    // creamos un areglo con la linea encontrada
                    arregloTemp=lineaEncontrada.split("=");
                    paso=107;
                    cVarColor=arregloTemp[1];
                }
            }
		}         


	    // si no se consiguieron en los renglones de color verificamos en las variagle Fcolor1 y Fcolor2
        paso=120;
		console.log ("searchColorFoil cVarColor",cVarColor," paso ", paso);
        if (cVarColor==""){
            paso=121;
            if (posicion==1){
                paso=122;
                cadenaBuscada="FColor";
                lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
				console.log ("searchColorFoil Buscando FColor",lineaEncontrada," paso ",paso);
                paso=123;
                if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
                    paso=124;
                    // dividimos la linea en con el caracter = para determinarl el valor
                    arregloTemp=lineaEncontrada.split("=");
                    paso=125;
                    cVarColor=arregloTemp[1];
					console.log ("searchColorFoil Color encontrado",cVarColor," paso ",paso);
                }                
            } else {
               paso=130;
                cadenaBuscada="FColor2";
                lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
				console.log ("searchColorFoil Buscando FColor2",lineaEncontrada," paso ",paso);
                paso=131;
                if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
                    paso=132;
                    // dividimos la linea en con el caracter = para determinarl el valor
                    arregloTemp=lineaEncontrada.split("=");
                    paso=133;
                    cVarColor=arregloTemp[1];
					console.log ("searchColorFoil Color encontrado",cVarColor," paso ",paso);
                }                    
            }
        }
       
        // devolvemos el resultado
		return (cVarColor);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchColorFoils!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 	
}

/*
original foxpro 
********************************************************************************************
** este metodo se creo para poder determinar el color del foil que nos interesa segun
** sea el primer o segundo foil y el tipo de foil involucrado
** creado el 2025-05-09
********************************************************************************************
LPARAMETERS posicion, tipo

	paso=5000
	cVarColor=0
	cVarRenglon=""
	nRenglon=0
	cVarColor=""
	nContador=0
	* reemplazamos el caracter ; por chr(13)
	nComentario=STRTRAN(thisform.edTCOM.Value, ";", CHR(13))

	* creamos un arreglo temporal para hacer la buqueda de los codigos de troqueles en el comentario
	paso=5001
	DIMENSION laArreglo[1]

	paso=5002
	lnElementos = ALINES(laArreglo, nComentario)

	bHayFoils=.f.
	paso=5003
	* buscamos en el arreglo que contiene las variables del comentario
	FOR i = 1 TO lnElementos
		paso=5004
		IF !EMPTY(thisform.otmp_cdd("DesC01",laArreglo[i]))
			paso=5005
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC01", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				nContador=ncontador+1
				IF (nContador=posicion) then
					cVarColor=cVarContenido
				endif
			endif
		ENDIF

		IF !EMPTY(thisform.otmp_cdd("DesC02",laArreglo[i]))
			paso=5006
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC02", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5007
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5008
					cVarColor=cVarContenido
				endif
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC02",laArreglo[i]))
			paso=5009
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC03", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5010
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5011
					cVarColor=cVarContenido
				endif
			endif
		ENDIF	
		
		IF !EMPTY(thisform.otmp_cdd("DesC04",laArreglo[i]))
			paso=5012
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC04", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5013
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5014
					cVarColor=cVarContenido
				endif
			endif
		ENDIF	
		
		IF !EMPTY(thisform.otmp_cdd("DesC05",laArreglo[i]))
			paso=5015
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC05", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5016
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5017
					cVarColor=cVarContenido
				endif
			endif
		ENDIF		
				
		IF !EMPTY(thisform.otmp_cdd("DesC06",laArreglo[i]))
			paso=5018
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC06", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5019
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5020
					cVarColor=cVarContenido
				endif
			endif
		ENDIF	
		
		IF !EMPTY(thisform.otmp_cdd("DesC06",laArreglo[i]))
			paso=5021
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC06", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5022
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5023
					cVarColor=cVarContenido
				endif
			endif
		ENDIF		
				
		IF !EMPTY(thisform.otmp_cdd("DesC07",laArreglo[i]))
			paso=5024
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC07", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5025
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5026
					cVarColor=cVarContenido
				endif
			endif
		ENDIF				
				
		IF !EMPTY(thisform.otmp_cdd("DesC08",laArreglo[i]))
			paso=5027
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC08", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5028
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5029
					cVarColor=cVarContenido
				endif
			endif
		ENDIF				
				
				
		IF !EMPTY(thisform.otmp_cdd("DesC09",laArreglo[i]))
			paso=5030
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC09", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5031
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5032
					cVarColor=cVarContenido
				endif
			endif
		ENDIF	
		
		IF !EMPTY(thisform.otmp_cdd("DesC10",laArreglo[i]))
			paso=5033
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC10", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then	
				paso=5034
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5035
					cVarColor=cVarContenido
				endif
			endif
		ENDIF	
		
		
		IF !EMPTY(thisform.otmp_cdd("DesC11",laArreglo[i]))
			paso=5036
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC11", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5037
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5038
					cVarColor=cVarContenido
				endif
			endif
		ENDIF			
		
		IF !EMPTY(thisform.otmp_cdd("DesC12",laArreglo[i]))
			paso=5039
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC12", laArreglo[i])))
			IF (ATC(tipo, cVarContenido) > 0) then
				paso=5040
				nContador=ncontador+1
				IF (nContador=posicion) then
					paso=5041
					cVarColor=cVarContenido
				endif
			endif
		ENDIF		
						
	ENDFOR
	paso=5042
	
	* si no se consiguieron en los renglones de color verificamos en las variagle Fcolor1 y Fcolor2
	IF LEN(ALLTRIM(cVarcolor)==0) then
		* verificamos la posicion
		IF posicion=1 then
			* buscamos en la variable Fcolor por ser el primer foil
			FOR i = 1 TO lnElementos
				paso=5004
				* verificaos que exista la varible del color del primer foil
				IF !EMPTY(thisform.otmp_cdd("Fcolor",laArreglo[i]))
					paso=5005
					cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("Fcolor", laArreglo[i])))
					cVarColor=cVarContenido
				ENDIF
			endfor			
		ELSE
			* buscamos en la variable Fcolor2 por ser el segundo foil
			FOR i = 1 TO lnElementos
				paso=5004
				* verificaos que exista la varible del color del segundo foil
				IF !EMPTY(thisform.otmp_cdd("Fcolor2",laArreglo[i]))
					paso=5005
					cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("Fcolor2", laArreglo[i])))
					cVarColor=cVarContenido
				ENDIF
			endfor		
		endif
	endif
	RETURN (cVarcolor)

*/
