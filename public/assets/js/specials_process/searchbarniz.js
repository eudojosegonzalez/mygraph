/*---- este script se usa en procesos especiales ---*/
/*--- se usa para determinar si hay barniz en los renglones de producción -----*/
function searchBarniz(arregloComentario){
	try {
		console.log ("entrando searchBarniz");
		var lineaEncontrada="";
		var cadenaBuscada="";
		var resultado=false;

		// descripcion color 1
		paso=1;
		cadenaBuscada="DesC01";
		paso=2;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=3;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")) {
			paso=4;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=5;
			valor=arregloTemp[1];
			paso=6;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=7;
				resultado=true;
			}
		} 

		// descripcion color 2
		paso=8;
		cadenaBuscada="DesC02";
		paso=9;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=10;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=11;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=12;
			valor=arregloTemp[1];
			paso=13;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
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
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=18;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=19;
			valor=arregloTemp[1];
			paso=20;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=21;
				resultado=true;
			}
		}     
		
		// descripcion color 4
		paso=22;
		cadenaBuscada="DesC04";
		paso=23;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=24;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=25;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=26;
			valor=arregloTemp[1];
			paso=27;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=28;
				resultado=true;
			}
		}     
		
		// descripcion color 5
		paso=29;
		cadenaBuscada="DesC05";
		paso=30;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=31;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=32;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=33;
			valor=arregloTemp[1];
			paso=34;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=35;
				resultado=true;
			}
		}    
		
		// descripcion color 6
		paso=36;
		cadenaBuscada="DesC06";
		paso=37;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=38;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=39;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=40;
			valor=arregloTemp[1];
			paso=41;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=42;
				resultado=true;
			}
		}      

		// descripcion color 7
		paso=43;
		cadenaBuscada="DesC07";
		paso=44;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=45;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=46;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=47;
			valor=arregloTemp[1];
			paso=48;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=49;
				resultado=true;
			}
		}   
		
		// descripcion color 8
		paso=50;
		cadenaBuscada="DesC08";
		paso=51;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=52;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=53;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=54;
			valor=arregloTemp[1];
			paso=55;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=56;
				resultado=true;
			}
		}    
		
		// descripcion color 9
		paso=57;
		cadenaBuscada="DesC09";
		paso=58;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=59;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=60;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=61;
			valor=arregloTemp[1];
			paso=62;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=63;
				resultado=true;
			}
		}     
		
		// descripcion color 10
		paso=63;
		cadenaBuscada="DesC10";
		paso=64;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=65;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=66;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=67;
			valor=arregloTemp[1];
			paso=68;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=69;
				resultado=true;
			}
		}   
		
		// descripcion color 11
		paso=70;
		cadenaBuscada="DesC11";
		paso=71;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=72;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=73;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=74;
			valor=arregloTemp[1];
			paso=75;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=76;
				resultado=true;
			}
		}  
		
		// descripcion color 12
		paso=77;
		cadenaBuscada="DesC12";
		paso=78;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=79;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=80;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=81;
			valor=arregloTemp[1];
			paso=82;
			if ((valor=="BARNIZ") || (valor=="BARNIZ MATE")  || (valor=="RESV. BARNIZ MATE") || (valor=="RESV. BARNIZ")){
				paso=83;
				resultado=true;
			}
		}  
		
		// no encontramos varniz en los colores, buscamos en la cotizacion TipAca="R"
		paso=84;
		if (resultado==false) {
			paso=85;
			cadenaBuscada="TipAca";
			paso=86;
			lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
			paso=87;
			if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
				paso=88;
				// dividimos la linea en con el caracter = para determinarl el valor
				arregloTemp=lineaEncontrada.split("=");
				paso=89;
				valor=arregloTemp[1];
				paso=90;
				if ((valor=="R") || (valor=="B") ){
					paso=91;
					resultado=true;
				}
			}        
		}
		paso=92;

		// devolvemos el resultado
		return (resultado);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchBarniz!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 	
}

/*
original foxpro 
****************************************************************************************
** 2025-05-07
** esta función se creo para poder determinar si existe acabados de barniz dentro de los renglones de colores de produccion
** Existen 4 posibilidades
** BARNIZ 
** BARNIZ MATE
** RESV. BARNIZ
** RESV. BARNIZ MATE
*******************************************************************************************
*!*	TRY
	LOCAL comentario
	comentario=thisform.edTCOM.value
	
	paso=5000
	* reemplazamos el caracter ; por chr(13)
	nComentario=STRTRAN(thisform.edTCOM.Value, ";", CHR(13))

	* creamos un arreglo temporal para hacer la buqueda de los codigos de troqueles en el comentario
	paso=5001
	DIMENSION laArreglo[1]

	paso=5002
	lnElementos = ALINES(laArreglo, nComentario)

	bHayBarniz=.f.
	paso=5003
	* buscamos en el arreglo que contiene las variables del comentario
	FOR i = 1 TO lnElementos
		paso=5004
		IF !EMPTY(thisform.otmp_cdd("DesC01",laArreglo[i]))
			paso=5005
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC01", laArreglo[i])))
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC02",laArreglo[i]))
			paso=5006
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC02", laArreglo[i])))
			* *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5007
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC03",laArreglo[i]))
			paso=5008
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC03", laArreglo[i])))
			* *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5009
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC04",laArreglo[i]))
			paso=5010
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC04", laArreglo[i])))
			* *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
						IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5011
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC05",laArreglo[i]))
			paso=5012
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC05", laArreglo[i])))
			* *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5013
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC06",laArreglo[i]))
			paso=5014
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC06", laArreglo[i])))
			* *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5015
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC07",laArreglo[i]))
			paso=5016
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC07", laArreglo[i])))
			 *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5017
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC08",laArreglo[i]))
			paso=5018
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC08", laArreglo[i])))
			 *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5019
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif		
		
		IF !EMPTY(thisform.otmp_cdd("DesC09",laArreglo[i]))
			paso=5020
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC09", laArreglo[i])))
			 *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5021
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC10",laArreglo[i]))
			paso=5022
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC10", laArreglo[i])))
			 *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5023
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC11",laArreglo[i]))
			paso=5024
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC11", laArreglo[i])))
			 *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5025
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC12",laArreglo[i]))
			paso=5026
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC12", laArreglo[i])))
			 *MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido)
			IF (cVarContenido=="BARNIZ") OR (cVarContenido=="BARNIZ MATE")  OR (cVarContenido=="RESV. BARNIZ MATE") OR (cVarContenido=="RESV. BARNIZ") then
				paso=5027
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
	ENDFOR
	paso=5028
	
	* no encontramos varniz en los colores, buscamos en la cotizacion TipAca="B"
	IF (bHayBarniz=.f.) then
		FOR i = 1 TO lnElementos
			paso=5004
			IF !EMPTY(thisform.otmp_cdd("TipAca",laArreglo[i]))
				cVarContenido=thisform.otmp_cdd("TipAca", laArreglo[i])
				IF (cVarContenido = "B") then
					bHayBarniz=.t.
				endif
			endif
		endfor		
	ENDIF
	
	* no encontramos varniz en los colores, buscamos en la cotizacion TipAca="R"
	IF (bHayBarniz=.f.) then
		FOR i = 1 TO lnElementos
			paso=5004
			IF !EMPTY(thisform.otmp_cdd("TipAca",laArreglo[i]))
				cVarContenido=thisform.otmp_cdd("TipAca", laArreglo[i])
				IF ((cVarContenido = "R") OR (cVarContenido = "B")) then
					bHayBarniz=.t.
				endif
			endif
		endfor		
	ENDIF
	
		
	*************************************************
	RETURN (bHayBarniz)
*!*	CATCH TO oError
*!*		*MESSAGEBOX(cVarContenido+ "  "+str(paso))("Se consiguio un error en el Paso: "+STR(paso)+ " Error:"+oError.message)
*!*	endtry

*/
