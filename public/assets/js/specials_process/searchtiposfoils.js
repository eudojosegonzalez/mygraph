/*---- este script se usa en procesos especiales ---*/
/*--- se usa para determinar si hay barniz en los renglones de producción -----*/
function searchTiposFoils(arregloComentario,tipo){
	try {
		console.log ("entrando searchTiposFoils tipo buscado", tipo);
		var lineaEncontrada="";
		var cadenaBuscada="";
		var resultado=false;

		// descripcion color 1
		paso=1;
		cadenaBuscada="DesC01";
		paso=2;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=3;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=4;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=5;
			valor=arregloTemp[1];
			paso=6;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=7;
				resultado=true;
			}
		} 

		// descripcion color 2
		paso=10;
		cadenaBuscada="DesC02";
		paso=11;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=12;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=13;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=14;
			valor=arregloTemp[1];
			paso=15;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=16;
				resultado=true;
			}
		}  
        
		// descripcion color 3
		paso=20;
		cadenaBuscada="DesC03";
		paso=21;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=22;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=23;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=24;
			valor=arregloTemp[1];
			paso=25;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=26;
				resultado=true;
			}
		}    
        
		// descripcion color 4
		paso=30;
		cadenaBuscada="DesC04";
		paso=31;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=32;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=33;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=34;
			valor=arregloTemp[1];
			paso=35;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=36;
				resultado=true;
			}
		}   
        
		// descripcion color 5
		paso=40;
		cadenaBuscada="DesC05";
		paso=41;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=42;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=43;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=44;
			valor=arregloTemp[1];
			paso=45;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=46;
				resultado=true;
			}
		} 
        
		// descripcion color 6
		paso=50;
		cadenaBuscada="DesC06";
		paso=51;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=52;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=53;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=54;
			valor=arregloTemp[1];
			paso=55;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=56;
				resultado=true;
			}
		}   
        
		// descripcion color 7
		paso=60;
		cadenaBuscada="DesC07";
		paso=61;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=62;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=63;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=64;
			valor=arregloTemp[1];
			paso=65;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=66;
				resultado=true;
			}
		}      
        
		// descripcion color 8
		paso=70;
		cadenaBuscada="DesC08";
		paso=71;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=72;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=73;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=74;
			valor=arregloTemp[1];
			paso=75;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=76;
				resultado=true;
			}
		}  

		// descripcion color 9
		paso=80;
		cadenaBuscada="DesC09";
		paso=81;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=82;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=83;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=84;
			valor=arregloTemp[1];
			paso=85;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=86;
				resultado=true;
			}
		}    
        
		// descripcion color 10
		paso=90;
		cadenaBuscada="DesC10";
		paso=91;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=92;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=93;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=94;
			valor=arregloTemp[1];
			paso=95;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=96;
				resultado=true;
			}
		}          
        
		// descripcion color 11
		paso=100;
		cadenaBuscada="DesC11";
		paso=101;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=102;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=103;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=104;
			valor=arregloTemp[1];
			paso=105;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=106;
				resultado=true;
			}
		}          
        
		// descripcion color 12
		paso=110;
		cadenaBuscada="DesC12";
		paso=111;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=112;
		if ((lineaEncontrada!="") && (lineaEncontrada!="NULL") && (typeof(lineaEncontrada)!="undefined")){
			paso=113;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=114;
			valor=arregloTemp[1];
			paso=115;
			if (valor.toUpperCase()==tipo.toUpperCase() ){
				paso=116;
				resultado=true;
			}
		}   

		// no encontramos los tipos de foils en produccion buscamos en cotizaciones
		console.log ("No se econtraron los tipos de foils en producción, buscamos en cotizaciones")

		/*
		COLD FOIL
		C.FOIL
		COLD FOIL HOLOGRAFICO

		HOT FOIL
		H.FOIL
		FOIL
		*/
		if ((tipo=="COLD FOIL") || (tipo=="C.FOIL") || (tipo=="COLD FOIL HOLOGRAFICO")){
			// buscamos en cotizacion los foils tipo cold
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
                if ((valor=="C") ){
                    paso=90;
                    resultado=true;
                    console.log ("servicio encontrado cold foil paso:", paso);
                }
            }    			
		}
		
		if (((tipo=="HOT FOIL") || (tipo=="H.FOIL") || (tipo=="FOIL")) && (!resultado)){
			// buscamos en cotizacion los foils tipo cold
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
                if ((valor=="F") ){
                    paso=90;
                    resultado=true;
                    console.log ("servicio encontrado hot foil paso:",paso);
                }
            }    			
		}		
 
        // devolvemos el resultado
		return (resultado);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchTipoFoils!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 	
}

/*
original foxpro 
****************************************************************************************
** 2025-05-06
** esta función se creo para poder el tipo de acabado de barniz, toma como parametr la variable tipo y busca en el comentario del ultimo pedido de la etiqueta
** y asi evitar que se tome el primer comentario que corresponde a la orden de produccion general
** adicional se busca en las ordenes de producción para verificar si existe o no un codigo de troquel diferente
*******************************************************************************************


*!*	TRY
	LPARAMETERS tipo
	
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
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC02",laArreglo[i]))
			paso=5006
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC02", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC03",laArreglo[i]))
			paso=5008
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC03", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC04",laArreglo[i]))
			paso=5010
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC04", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC05",laArreglo[i]))
			paso=5012
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC05", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC06",laArreglo[i]))
			paso=5014
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC06", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC07",laArreglo[i]))
			paso=5016
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC07", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC08",laArreglo[i]))
			paso=5018
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC08", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif		
		
		IF !EMPTY(thisform.otmp_cdd("DesC09",laArreglo[i]))
			paso=5020
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC09", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC10",laArreglo[i]))
			paso=5022
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC10", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
				
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC11",laArreglo[i]))
			paso=5024
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC11", laArreglo[i])))
			*MESSAGEBOX(cVarContenido)
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
				
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC12",laArreglo[i]))
			paso=5026
			cVarContenido=UPPER(ALLTRIM(thisform.otmp_cdd("DesC12", laArreglo[i])))
*			MESSAGEBOX(cVarContenido+ "  "+str(paso))
			IF (cVarContenido==UPPER(tipo)) then
				bHayBarniz=.t.
			endif
		endif	
		
	ENDFOR
	paso=5028
	
	* como la variable resulto false, se buscara en los comentarios de cotizaciones
*!*		bBarniz=thisform.searchtiposbarniz("BARNIZ")
*!*		bBarnizMat=thisform.searchtiposbarniz("BARNIZ MATE")
*!*		bResBarniz=thisform.searchtiposbarniz("RESV. BARNIZ")
*!*		bResBarnizMat=thisform.searchtiposbarniz("RESV. BARNIZ MATE")	
	IF  (bHayBarniz=.f.) then
		IF (UPPER(tipo)=="BARNIZ")
			* buscamos si se trata de acabado barniz
			FOR i = 1 TO lnElementos
				paso=6000
				IF !EMPTY(thisform.otmp_cdd("TipAca",laArreglo[i]))
					paso=6001
					cVarContenido=thisform.otmp_cdd("TipAca", laArreglo[i])
					IF (cVarContenido=="B") then
						* verificamos que no se trate de barniz mate
						FOR j = 1 TO lnElementos
							IF !EMPTY(thisform.otmp_cdd("BarMat",laArreglo[j]))
								cVarContenido2=thisform.otmp_cdd("BarMat", laArreglo[j])
								IF (cVarContenido2=="0") then
									bHayBarniz=.t.
									*MESSAGEBOX("1 Barniz Brillante "+ tipo + " Encontrado: "+cVarContenido2)
								endif
							endif
						next
						
					endif
				ENDIF	
			next		
		ELSE
			* buscamos si se trata de barniz mate
			IF (UPPER(tipo)=="BARNIZ MATE")
				* buscamos si se trata de acabado barniz mate
				FOR i = 1 TO lnElementos
					paso=6000
					IF !EMPTY(thisform.otmp_cdd("TipAca",laArreglo[i]))
						paso=6001
						cVarContenido=thisform.otmp_cdd("TipAca", laArreglo[i])
						IF (cVarContenido=="B") then
							* verificamos que no se trate de barniz mate
							FOR j = 1 TO lnElementos
								IF !EMPTY(thisform.otmp_cdd("BarMat",laArreglo[j]))
									cVarContenido2=thisform.otmp_cdd("BarMat", laArreglo[j])
									IF (cVarContenido2=="1") then
										bHayBarniz=.t.
										*MESSAGEBOX("2 Barniz Mate " + tipo + " Encontrado: "+cVarContenido2)										
									endif
								endif
							next
							
						endif
					ENDIF	
				next			
			ELSE
				* verificamos que se trata de reserva de barniz brillante
				IF (UPPER(tipo)=="RESV. BARNIZ")	then
					* buscamos si se trata de acabado reserva de barniz
					FOR i = 1 TO lnElementos
						paso=6000
						IF !EMPTY(thisform.otmp_cdd("TipAca",laArreglo[i]))
							paso=6001
							cVarContenido=thisform.otmp_cdd("TipAca", laArreglo[i])
							IF (cVarContenido=="R") then
								* verificamos que no se trate de reserva barniz mate
								FOR j = 1 TO lnElementos
									IF !EMPTY(thisform.otmp_cdd("BarMat",laArreglo[j]))
										cVarContenido2=thisform.otmp_cdd("BarMat", laArreglo[j])
										IF (cVarContenido2=="0") then
											bHayBarniz=.t.
											*MESSAGEBOX("3 Reserva Barniz Brillante " + tipo+ " Encontrado: "+cVarContenido2)
										endif
									endif
								next
								
							endif
						ENDIF	
					next				
				ELSE
					IF (UPPER(tipo)=="RESV. BARNIZ MATE")
						* buscamos si se trata de acabado reserva de barniz mate
						FOR i = 1 TO lnElementos
							paso=6000
							IF !EMPTY(thisform.otmp_cdd("TipAca",laArreglo[i]))
								paso=6001
								cVarContenido=thisform.otmp_cdd("TipAca", laArreglo[i])
								IF (cVarContenido=="R") then
									* verificamos que no se trate de reserva barniz mate
									FOR j = 1 TO lnElementos
										IF !EMPTY(thisform.otmp_cdd("BarMat",laArreglo[j]))
											cVarContenido2=thisform.otmp_cdd("BarMat", laArreglo[j])
											IF (cVarContenido2=="1") then
												bHayBarniz=.t.
												*MESSAGEBOX("4 Reserva Barniz Mate " + tipo + " Encontrado: "+cVarContenido2)
											endif
										endif
									next
									
								endif
							ENDIF	
						next						
					ENDIF
				endif		
			endif
		ENDIF
	endif

	RETURN (bHayBarniz)
*!*	CATCH TO oError
*!*		MESSAGEBOX("Se consiguio un error en el Paso: "+STR(paso)+ " Error:"+oError.message)
*!*	endtry
*/
