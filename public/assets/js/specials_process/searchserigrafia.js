/*---- este script se usa en procesos especiales ---*/
/*--- se usa para determinar si hay foils en los renglones de producción -----*/
function searchSerigrafia(arregloComentario){
    try {
        console.log ("entrando searchSerigrafia");
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=5;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=6;
            valor=arregloTemp[1];
            paso=7;
            if (valor=="BARNIZ SERIGRAFICO"){
                paso=8;
                resultado=true;
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
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=14;
            valor=arregloTemp[1];
            paso=15;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=23;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=24;
            valor=arregloTemp[1];
            paso=25;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=33;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=34;
            valor=arregloTemp[1];
            paso=35;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=43;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=44;
            valor=arregloTemp[1];
            paso=45;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=53;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=54;
            valor=arregloTemp[1];
            paso=55;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=63;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=64;
            valor=arregloTemp[1];
            paso=65;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=73;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=74;
            valor=arregloTemp[1];
            paso=75;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=83;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=84;
            valor=arregloTemp[1];
            paso=85;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=93;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=94;
            valor=arregloTemp[1];
            paso=95;
            if (valor=="BARNIZ SERIGRAFICO"){
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
       if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=103;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=104;
            valor=arregloTemp[1];
            paso=105;
            if (valor=="BARNIZ SERIGRAFICO"){
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
        if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
            paso=113;
            // dividimos la linea en con el caracter = para determinarl el valor
            arregloTemp=lineaEncontrada.split("=");
            paso=114;
            valor=arregloTemp[1];
            paso=115;
            if (valor=="BARNIZ SERIGRAFICO"){
                paso=116;
                resultado=true;
            }
        }          

        // buscamos en las variables de comentarios si no se encontro en los colores
        paso=118;
        if (!resultado){
            paso=120;
            cadenaBuscada="Serigraf=1";
            paso=111;
            lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
            paso=112;
            if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
                paso=113;
                resultado=true;
            } 
        }

        paso=120;
        // devolvemos el resultado
        return (resultado);        
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchSerigrafia");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  

}

/*
original foxpro 
****************************************************************************************
** 2025-05-07
** esta función se creo para poder comprobar si en los comentarios de produccion existe Barniz Serigrafico
** se debe descontar 1 a la variable ColAct que genera produccion con la cantodad de colores, para que no afecte los cálculos
** del precio del color
** BARNIZ SERIGRAFICO
*!*	Desactiva objeto chkSerigraf
*!*	¿Existe la frase Malla Serigrafica en los renglones de colores de la orden de producción?
*!*	Si existe
*!*		Activa objeto chkSerigraf
*!*	Si no
*!*		Se busca la variable Serigraf dentro de los comentarios 
*!*		Si existe
*!*			Activa objeto chkSerigraf
*!*		Sino
*!*			Se busca dentro de la descripción de la etiqueta la frase SERIGRAFIA
*!*			Si existe
*!*				Activa objeto chkSerigraf
*!*			Sino 
*!*				Desactiva objeto chkSerigraf
*!*			Fin si
*!*		Fin si
*!*	Fin si
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
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC01", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				bHayBarniz=.t.
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC02",laArreglo[i]))
			paso=5006
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC02", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5007
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		ENDIF
		
		IF !EMPTY(thisform.otmp_cdd("DesC03",laArreglo[i]))
			paso=5008
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC03", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5009
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC04",laArreglo[i]))
			paso=5010
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC04", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
						IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5011
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC05",laArreglo[i]))
			paso=5012
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC05", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5013
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC06",laArreglo[i]))
			paso=5014
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC06", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5015
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC07",laArreglo[i]))
			paso=5016
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC07", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5017
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC08",laArreglo[i]))
			paso=5018
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC08", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5019
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif		
		
		IF !EMPTY(thisform.otmp_cdd("DesC09",laArreglo[i]))
			paso=5020
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC09", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5021
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC10",laArreglo[i]))
			paso=5022
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC10", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5023
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC11",laArreglo[i]))
			paso=5024
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC11", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5025
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
		
		IF !EMPTY(thisform.otmp_cdd("DesC12",laArreglo[i]))
			paso=5026
			cVarContenido=STRTRAN(UPPER(ALLTRIM(thisform.otmp_cdd("DesC12", laArreglo[i]))),"  "," ")
			* MESSAGEBOX(cVarContenido)
			IF (cVarContenido=="BARNIZ SERIGRAFICO") then
				paso=5027
				bHayBarniz=.t.
				*MESSAGEBOX(cVarContenido+ "  "+str(paso))
			endif
		endif	
	ENDFOR
	paso=5028
	
	* buscamos en los comentarios si existe la variable Serigraf
	IF (bHayBarniz=.f.) then
		* recorremos los comentarios de produccion buscando la variable 
		FOR i = 1 TO lnElementos
			paso=5004
			IF !EMPTY(thisform.otmp_cdd("Serigraf",laArreglo[i]))
				paso=5005
				cVarContenido=alltrim(thisform.otmp_cdd("Serigraf", laArreglo[i]))
				* MESSAGEBOX(cVarContenido)
				IF (cVarContenido=="1") then
					bHayBarniz=.t.
					*MESSAGEBOX("Entontre en Variable")
				endif
			ENDIF
		ENDFOR		
	endif
	
	* buscamos en la descripcion de la etiqueta si existe la frase SERIGRAFIA
	IF (bHayBarniz=.f.) then
		cVarContenido=UPPER(ALLTRIM(thisform.label4.Caption))
		IF (ATC("SERIGRAFIA", cVarContenido) > 0) then
			bHayBarniz=.t.
			*MESSAGEBOX("Encontre en el nombre")
		endif		
	endif
	RETURN (bHayBarniz)
*!*	CATCH TO oError
*!*		MESSAGEBOX("Se consiguio un error en el Paso: "+STR(paso)+ " Error:"+oError.message)
*!*	endtry
*/
