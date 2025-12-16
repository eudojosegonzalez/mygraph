/*---- este script se usa en procesos especiales ---*/
/*--- se usa para contar las reservas de barniz -----*/
function countReservasBarniz(arregloComentario){
	try {
		console.log ("entrando countReservasBarniz");
        nReservas=0;
        nRenglonColor=0;
        tipo=("Resv. Barniz Mate").toUpperCase();

		// descripcion color 1
		paso=1;
		cadenaBuscada="DesC01";
		paso=2;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=3;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=4;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=5;
			valor=arregloTemp[1];
			paso=6;
			if (valor==tipo){
				paso=7;
				nRenglonColor=1;
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
			if (valor==tipo){
				paso=14;
				nRenglonColor=2;
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
			if (valor==tipo){
				paso=21;
				nRenglonColor=3;
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
			if (valor==tipo){
				paso=28;
				nRenglonColor=4;
			}
		}        

        // descripcion color 5
		paso=30;
		cadenaBuscada="DesC05";
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
			if (valor==tipo){
				paso=36;
				nRenglonColor=5;
			}
		}  

        // descripcion color 6
		paso=40;
		cadenaBuscada="DesC06";
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
			if (valor==tipo){
				paso=46;
				nRenglonColor=6;
			}
		}         
		

        // descripcion color 7
		paso=50;
		cadenaBuscada="DesC07";
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
			if (valor==tipo){
				paso=56;
				nRenglonColor=7;
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
			if (valor==tipo){
				paso=56;
				nRenglonColor=8;
			}
		}     
        
        // descripcion color 9
		paso=60;
		cadenaBuscada="DesC09";
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
			if (valor==tipo){
				paso=66;
				nRenglonColor=9;
			}
		}          

        // descripcion color 10
		paso=70;
		cadenaBuscada="DesC10";
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
			if (valor==tipo){
				paso=76;
				nRenglonColor=10;
			}
		}   
        
       // descripcion color 11
		paso=80;
		cadenaBuscada="DesC11";
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
			if (valor==tipo){
				paso=86;
				nRenglonColor=11;
			}
		}      
        
      // descripcion color 12
		paso=90;
		cadenaBuscada="DesC12";
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
			if (valor==tipo){
				paso=96;
				nRenglonColor=12;
			}
		}     
        
        //se encontro alguno de los renglones de color
        paso=97;
        if (nRenglonColor >0) {
            paso=98
            nReservas=1;
        }

        paso=99;
        tipo=("Resv. Barniz").toUpperCase();

		paso=100;
		cadenaBuscada="DesC01";
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
			if (valor==tipo){
				paso=106;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}      
        
		paso=110;
		cadenaBuscada="DesC02";
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
			if (valor==tipo){
				paso=116;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}           

		paso=120;
		cadenaBuscada="DesC03";
		paso=121;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=122;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=123;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=124;
			valor=arregloTemp[1];
			paso=125;
			if (valor==tipo){
				paso=126;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}         


		paso=130;
		cadenaBuscada="DesC04";
		paso=131;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=132;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=133;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=134;
			valor=arregloTemp[1];
			paso=135;
			if (valor==tipo){
				paso=136;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}     
        
		paso=140;
		cadenaBuscada="DesC05";
		paso=141;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=142;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=143;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=144;
			valor=arregloTemp[1];
			paso=145;
			if (valor==tipo){
				paso=146;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}     
        
		paso=150;
		cadenaBuscada="DesC06";
		paso=151;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=152;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=153;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=154;
			valor=arregloTemp[1];
			paso=155;
			if (valor==tipo){
				paso=156;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		} 
        
        
		paso=160;
		cadenaBuscada="DesC07";
		paso=161;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=162;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=163;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=164;
			valor=arregloTemp[1];
			paso=165;
			if (valor==tipo){
				paso=166;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}     
        
		paso=170;
		cadenaBuscada="DesC08";
		paso=171;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=172;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=173;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=174;
			valor=arregloTemp[1];
			paso=175;
			if (valor==tipo){
				paso=176;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}  
        
        
		paso=180;
		cadenaBuscada="DesC09";
		paso=181;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=182;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=183;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=184;
			valor=arregloTemp[1];
			paso=185;
			if (valor==tipo){
				paso=186;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}   
        
		paso=190;
		cadenaBuscada="DesC10";
		paso=191;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=192;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=193;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=194;
			valor=arregloTemp[1];
			paso=195;
			if (valor==tipo){
				paso=196;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}   
        
		paso=200;
		cadenaBuscada="DesC11";
		paso=201;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=202;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=203;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=204;
			valor=arregloTemp[1];
			paso=205;
			if (valor==tipo){
				paso=206;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}   
        
		paso=210;
		cadenaBuscada="DesC12";
		paso=211;
		lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
		paso=212;
		if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
			paso=213;
			// dividimos la linea en con el caracter = para determinarl el valor
			arregloTemp=lineaEncontrada.split("=");
			paso=214;
			valor=arregloTemp[1];
			paso=215;
			if (valor==tipo){
				paso=216;
                if (nRenglonColor != 1){
                    if (nReservas < 2){
                        nReservas=nReservas+1;
                    }
                }
			}
		}  
        
        // verificamos si se consiguieron reservas en los colores
        // buscamos en los datos de planificacion 
        if (nReservas ==0){
            paso=220;
            cadenaBuscada="TipAca";
            paso=221;
            lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
            paso=222;
            if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
                paso=223;
                arregloTemp=lineaEncontrada.split("=");
                paso=224;
                valor=arregloTemp[1];
                paso=225;
                if (valor=="R"){
                    paso=226;
                    nReservas=1;
                }
            }              
        }

        if (nReservas ==0){
            paso=230;
            cadenaBuscada="TipAca";
            paso=231;
            lineaEncontrada = arregloComentario.find(linea => linea.includes(cadenaBuscada));
            paso=232;
            if ((lineaEncontrada!="") && (typeof(lineaEncontrada)!="undefined")){
                paso=233;
                arregloTemp=lineaEncontrada.split("=");
                paso=234;
                valor=arregloTemp[1];
                paso=235;
                if (valor=="B"){
                    paso=236;
                    nReservas=1;
                }
            }              
        }        

		// devolvemos el resultado
		paso=250;
		return (nReservas);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error countReservasBarniz!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 	
}

/*
original foxpro 

*/
