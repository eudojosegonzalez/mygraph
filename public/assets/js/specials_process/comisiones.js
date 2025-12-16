// este metodo sirve para calcular la comisiones del vendedor
function comisionesVendedor(){
    try{
        console.log ("entrando al metodo comisionesVendedor");
        paso=1;

		nTMP_PCB = 0.000    //	COMISION BASE CARGADA EN MAESTRO DE FACTORES	&&
		nTMP_VA1 = 0.000    //	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_VA2 = 0.000    //	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_VA3 = 0.000    //	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_VA4 = 0.000    //	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_PET = getResumenMontoEtiqueta()    //	ALMACENA LA VENTA ESTIMADA POR ETIQUETAS		&&
		nTMP_FAC = getFactor()  //	ALMACENA EL VALOR DEL FACTOR DE VENTA			&&
		nTMP_COL = getCantidadColores() //	ALMACENA LA CANTIDAD DE COLORES DE LA ETQ		&&
		nTMP_COM = 0.000    //	ALMACENA EL VALOR FINAL DE LA COMISION DEL VEND	&&
		nTMP_POR = 0.000    //	ALMACENA EL VALOR DE LA COMISION POR ETQ VENDID	&&
        // determinamos la comision por barniz segun sea el caso
        // si es barniz corrido o reserva de barniz 0.02
        // en caso contrario 0
        paso=2;
        if ((getReservaBarniz) || getReservaBarniz2() || getBarniz()){
            paso=2;
            nTMP_BAR =0.02;
        } else {
            paso=3;
            nTMP_BAR =0.0;
        }

        // capturamos el precio del factor
        paso=3;
        factor=getFactor();

        // calculo de la comision base
        paso=4;
        if (factor <= 0.9 && factor < 1) {
            // FACTOR <= 0.9 (3 %)
            nTMP_PCB = 0.030;
        } else if (factor >= 1 && factor < 1.1) {
            // FACTOR = 1 (4 %)
            nTMP_PCB = 0.040;
        } else if (factor >= 1.1 && factor < 1.2) {
            // FACTOR 1.1 (5 %)
            nTMP_PCB = 0.050;
        } else if (factor >= 1.2 && factor < 1.3) {
            // FACTOR 1.2 (6 %)
            nTMP_PCB = 0.060;
        } else if (factor >= 1.3 && factor < 1.4) {
            // FACTOR 1.3 (7 %)
            nTMP_PCB = 0.070;
        } else if (factor >= 1.4 && factor < 1.5) {
            // FACTOR 1.4 (8 %)
            nTMP_PCB = 0.080;
        } else if (factor >= 1.5 && factor < 1.6) {
            // FACTOR 1.5 (9 %)
            nTMP_PCB = 0.090;
        } else if (factor >= 1.6) {
            // FACTOR >= 1.6 (10 %)
            nTMP_PCB = 0.100;
        }        

        //	CASO PARA CALCULAR LA COMISION DEPENDIENDO DEL VALOR DEL FACTOR	\*
        paso=5;
        if ((nTMP_PET > 500000) && (factor = 1.5) && ( factor < 1.6)) {
            nTMP_VA2 = 0.005;
        } else  if ((nTMP_PET > 500000) && (factor = 1.4) && ( factor < 1.5)) {
            nTMP_VA2 = 0.010;
        } else  if ((nTMP_PET > 500000) && (factor = 1.3) && ( factor < 1.4)) { 
            nTMP_VA2 = 0.015;
        } else  if ((nTMP_PET > 500000) && (factor = 1.2) && ( factor < 1.3)) { 
            nTMP_VA2 = 0.020;
        } else  if ((nTMP_PET > 500000) && (factor = 1.1) && ( factor < 1.2)) { 
            nTMP_VA2 = 0.025;
        } else  if ((nTMP_PET > 500000) && (factor = 1) && ( factor < 1.1)) { 
            nTMP_VA2 = 0.030;
        } else {
            nTMP_VA2 = 0;
        }

        //	CASO PARA CALCULAR EL PRIMER VALOR DE COMISION EN BASE A EL MONTO DE ETQ VENDIDAS	\*
        paso=6;
        if (nTMP_PET < 19999 ){
            nTMP_VA1 = 0.000;
        } else if ((nTMP_PET >= 20000) && (nTMP_PET <= 49999)) {
            nTMP_VA1 = 0.010;
        } else if ((nTMP_PET >= 50000) && (nTMP_PET <= 99999)) {
            nTMP_VA1 = 0.020;
        } else if ((nTMP_PET >= 100000) && (nTMP_PET <= 199999)) {
            nTMP_VA1 = 0.025;
        } else if ((nTMP_PET >= 200000) && (nTMP_PET <= 299999)) {
            nTMP_VA1 = 0.030;
        } else if ((nTMP_PET >= 300000) && (nTMP_PET <= 499999)) {
            nTMP_VA1 = 0.040;
        } else if ((nTMP_PET >= 500000) && (nTMP_PET <= 749999)) {
            nTMP_VA1 = 0.045;
        } else if ((nTMP_PET >= 750000) && (nTMP_PET <= 999999)) {
            nTMP_VA1 = 0.050;
        } else if ((nTMP_PET >= 1000000) && (nTMP_PET <= 1499999)) {
            nTMP_VA1 = 0.055;
        } else if ((nTMP_PET >= 1500000) && (nTMP_PET <= 1999999)) {
            nTMP_VA1 = 0.060;
        } else if (nTMP_PET >= 2000000) {
            nTMP_VA1 = 0.065;
        }

        //	CASO PARA EVALUAR LA COMISION SIN COLORES Y CON FACTOR ASIGNADO	\*
        //	VALIDA QUE NO TENGA COLORES PARA ENTRAR EN LA CONDICION	\*
        paso=7;
        if (nTMP_COL == 0){
            if ((factor < 1.3) && (nTMP_PET < 1000000)){
                nTMP_VA3 = 0.005;
            } else if ((factor < 1.3) && (nTMP_PET >= 1000000)){
                nTMP_VA3 = 0.0025;
            } else if (factor >= 1.3){
                nTMP_VA3 = 0.000;
            }
            //	VERIFICA EL MONTO DE LA VENTA	\*
            paso=8;
            if (nTMP_PET < 10000){
                nTMP_POR = 0.100;
            } else if ((nTMP_PET >= 10000) && (nTMP_PET < 20000)){
                nTMP_POR = 0.100;
            } else if ((nTMP_PET >= 20000) && (nTMP_PET < 50000)){
                nTMP_POR = 0.090;
            } else if ((nTMP_PET >= 50000) && (nTMP_PET < 100000)){
                nTMP_POR = 0.080;
            } else if ((nTMP_PET >= 100000) && (nTMP_PET < 200000)){
                nTMP_POR = 0.075;
            } else if ((nTMP_PET >= 200000) && (nTMP_PET < 300000)){
                nTMP_POR = 0.070;
            } else if ((nTMP_PET >= 300000) && (nTMP_PET < 500000)){
                nTMP_POR = 0.060;
            } else if ((nTMP_PET >= 500000) && (nTMP_PET < 750000)){
                nTMP_POR = 0.055;
            } else if ((nTMP_PET >= 750000) && (nTMP_PET < 1000000)){
                nTMP_POR = 0.050;
            } else if ((nTMP_PET >= 1000000) && (nTMP_PET < 1500000)){
                nTMP_POR = 0.045;
            } else if ((nTMP_PET >= 1500000) && (nTMP_PET < 2000000)){
                nTMP_POR = 0.040;
            } else if ((nTMP_PET >= 2000000) && (nTMP_PET < 2500000)){
                nTMP_POR = 0.035;
            } else if ((nTMP_PET >= 2500000) && (nTMP_PET < 3000000)){
                nTMP_POR = 0.030;
            }  else if ((nTMP_PET >= 3000000)){
                nTMP_POR = 0.025;
            }
        }
        paso=9;
        if (nTMP_COL==0){
            paso=10;
            nTMP_COM = nTMP_POR - nTMP_VA3;
        } else {
            //	HACE LA SUMATORIA Y RESTA DE LOS VALORES DE LAS VARIABLES Y ESA ES LA COMISION	\*
            paso=11;
			nTMP_COM = nTMP_PCB + nTMP_VA2 - nTMP_VA1;           
        }
        // asignamos el valor de la comision
        paso=12;
        if (nTMP_COM <= 0.010){
            paso=13;
            valor=0.010 * 100;
            paso=14;
            setResumenComision (valor);
        } else {
            paso=15;
            valor=nTMP_COM * 100;
            paso=16;
            setResumenComision (valor);
        }

        console.log(`resultados de los calculos de las comisiones ${valor} paso:${paso}`);

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error comisionesVendedor");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}
/*
original foxpro
		//	METODO QUE HACE EL CALCULO DEL PORCENTAJE DE COMISION QUE CORRESPONDE AL VENDEDOR	\*
		//	VARIABLES LOCALES	\*
		LOCAL nTMP_PCB, nTMP_VA1, nTMP_VA2, nTMP_VA3, nTMP_VA4, nTMP_PET, nTMP_FAC, nTMP_COL, nTMP_COM, nTMP_POR, nTMP_BAR
		
		nTMP_PCB = 0.000									&&	COMISION BASE CARGADA EN MAESTRO DE FACTORES	&&
		nTMP_VA1 = 0.000									&&	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_VA2 = 0.000									&&	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_VA3 = 0.000									&&	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_VA4 = 0.000									&&	VARIABLE QUE ALMACENA EL VALOR DE COMISION		&&
		nTMP_PET = THISFORM.PAGFR1.PAG004.TXTESTETQ.VALUE	&&	ALMACENA LA VENTA ESTIMADA POR ETIQUETAS		&&
		nTMP_FAC = THISFORM.PAGFR1.PAG003.TXTFAC.VALUE		&&	ALMACENA EL VALOR DEL FACTOR DE VENTA			&&
		nTMP_COL = THISFORM.PAGFR1.PAG003.SPICOL.VALUE		&&	ALMACENA LA CANTIDAD DE COLORES DE LA ETQ		&&
		nTMP_COM = 0.000									&&	ALMACENA EL VALOR FINAL DE LA COMISION DEL VEND	&&
		nTMP_POR = 0.000									&&	ALMACENA EL VALOR DE LA COMISION POR ETQ VENDID	&&
		nTMP_BAR = IIF(THISFORM.PAGFr1.PAG003.OPTGR1.OPtBar.Value = 1, 0.020, + ;
					IIF(THISFORM.PAGFr1.PAG003.OPTGR1.OPtRBa.Value = 1, 0.020, 0.000))
		WITH THISFORM
			//	COMISION BASE	\*	
			DO CASE
				//	FACTOR <= 0.9	\*
				CASE nTMP_FAC <= 0.9 AND nTMP_FAC < 1
					//	3 % \*
					nTMP_PCB = 0.030
				//	FACTOR = 1	\*
				CASE nTMP_FAC >= 1 AND nTMP_FAC < 1.1
					//	4 %	\*
					nTMP_PCB = 0.040
				//	FACTOR 1.1	\*
				CASE nTMP_FAC >= 1.1 AND nTMP_FAC < 1.2
					//	5 %	\*
					nTMP_PCB = 0.050
				//	FACTOR 1.2	\*
				CASE nTMP_FAC >= 1.2 AND nTMP_FAC < 1.3
					//	6 %	\*
					nTMP_PCB = 0.060
				//	FACTOR 1.3	\*
				CASE nTMP_FAC >= 1.3 AND nTMP_FAC < 1.4
					//	7 %	\*
					nTMP_PCB = 0.070
				//	FACTOR 1.4	\*
				CASE nTMP_FAC >= 1.4 AND nTMP_FAC < 1.5
					//	8 %	\*
					nTMP_PCB = 0.080
				//	FACTOR 1.5	\*
				CASE nTMP_FAC >= 1.5 AND nTMP_FAC < 1.6
					//	9 %	\*
					nTMP_PCB = 0.090
				//	FACTOR >= 1.6	\*
				CASE nTMP_FAC >= 1.6 
					//	10 %	\*
					nTMP_PCB = 0.100
			ENDCASE
			//	CASO PARA CALCULAR LA COMISION DEPENDIENDO DEL VALOR DEL FACTOR	\*
			DO CASE
				//	MONTO ETQ  VENDIDAS > 500000 Y FACTOR = 1.5 	\*
				CASE nTMP_PET > 500000 AND nTMP_FAC = 1.5 AND nTMP_FAC < 1.6
					nTMP_VA2 = 0.005
				//	MONTO ETQ VENDIDAS > 500000 Y FACTOR 1.4	\*
				CASE nTMP_PET > 500000 AND nTMP_FAC = 1.4 AND nTMP_FAC < 1.5
					nTMP_VA2 = 0.010
				//	MONTO ETQ VENDIDAS > 500000 Y FACTOR 1.3	\*
				CASE nTMP_PET > 500000 AND nTMP_FAC = 1.3 AND nTMP_FAC < 1.4
					nTMP_VA2 = 0.015
				//	MONTO ETQ VENDIDAS > 500000 Y FACTOR 1.2	\*
				CASE nTMP_PET > 500000 AND nTMP_FAC = 1.2 AND nTMP_FAC < 1.3
					nTMP_VA2 = 0.020
				//	MONTO ETQ VENDIDAS > 500000 Y FACTOR 1.1	\**
				CASE nTMP_PET > 500000 AND nTMP_FAC = 1.1 AND nTMP_FAC < 1.2
					nTMP_VA2 = 0.025
				//	MONTO ETQ VENDIDAS > 500000 Y FACTOR 1	\*
				CASE nTMP_PET > 500000 AND nTMP_FAC = 1 AND nTMP_FAC < 1.1
					nTMP_VA2 = 0.030
				OTHERWISE
					nTMP_VA2 = 0
			ENDCASE
			//	CASO PARA CALCULAR EL PRIMER VALOR DE COMISION EN BASE A EL MONTO DE ETQ VENDIDAS	\*
			DO CASE
				//	MONTO ETQ VENDIDAS < 19999	\*
				CASE nTMP_PET < 19999 
					nTMP_VA1 = 0.000
				//	MONTO ETQ VENDIDAS >= 20000 Y <= 49999	\*
				CASE nTMP_PET >= 20000 AND nTMP_PET <= 49999
					nTMP_VA1 = 0.010
				//	MONTO ETQ VENDIDAS >= 50000 Y <= 99999	\*
				CASE nTMP_PET >= 50000 AND nTMP_PET <= 99999
					nTMP_VA1 = 0.020
				//	MONTO ETQ VENDIDAS >= 100000 Y <= 199999	\*
				CASE nTMP_PET >= 100000 AND nTMP_PET <= 199999
					nTMP_VA1 = 0.025
				//	MONTO ETQ VENDIDAS >= 200000 Y <= 299999	\*
				CASE nTMP_PET >= 200000 AND nTMP_PET <= 299999 
					nTMP_VA1 = 0.030
				//	MONTO ETQ VENDIDAS >= 300000 Y <= 499999	\*
				CASE nTMP_PET >= 300000 AND nTMP_PET <= 499999
					nTMP_VA1 = 0.040
				//	MONTO ETQ VENDIDAS >= 500000 Y <= 749999	\*
				CASE nTMP_PET >= 500000 AND nTMP_PET <= 749999
					nTMP_VA1 = 0.045
				//	MONTO ETQ VENDIDAS >= 750000	\*
				CASE nTMP_PET >= 750000 AND nTMP_PET <= 999999
					nTMP_VA1 = 0.050
				CASE nTMP_PET >= 1000000 AND nTMP_PET <= 1499999					
					nTMP_VA1 = 0.055
				CASE nTMP_PET >= 1500000 AND nTMP_PET <= 1999999					
					nTMP_VA1 = 0.060
				CASE nTMP_PET >= 2000000
					nTMP_VA1 = 0.065
			ENDCASE
			//	CASO PARA EVALUAR LA COMISION SIN COLORES Y CON FACTOR ASIGNADO	\*
			//	VALIDA QUE NO TENGA COLORES PARA ENTRAR EN LA CONDICION	\*
			IF nTMP_COL = 0 THEN
				DO CASE
					CASE nTMP_FAC < 1.3 AND nTMP_PET < 1000000
						nTMP_VA3 = 0.005
					CASE nTMP_FAC < 1.3 AND nTMP_PET >= 1000000
						nTMP_VA3 = 0.0025
					CASE nTMP_FAC >= 1.3
						nTMP_VA3 = 0.000
				ENDCASE
				//	VERIFICA EL MONTO DE LA VENTA	\*
				DO CASE
					CASE nTMP_PET < 10000
						nTMP_POR = 0.100
					CASE nTMP_PET >= 10000 AND nTMP_PET < 20000
						nTMP_POR = 0.100
					CASE nTMP_PET >= 20000 AND nTMP_PET < 50000
						nTMP_POR = 0.090
					CASE nTMP_PET >= 50000 AND nTMP_PET < 100000
						nTMP_POR = 0.080
					CASE nTMP_PET >= 100000 AND nTMP_PET < 200000
						nTMP_POR = 0.075
					CASE nTMP_PET >= 200000 AND nTMP_PET < 300000
						nTMP_POR = 0.070
					CASE nTMP_PET >= 300000 AND nTMP_PET < 500000
						nTMP_POR = 0.060
					CASE nTMP_PET >= 500000 AND nTMP_PET < 750000
						nTMP_POR = 0.055
					CASE nTMP_PET >= 750000 AND nTMP_PET < 1000000
						nTMP_POR = 0.050
					CASE nTMP_PET >= 1000000 AND nTMP_PET < 1500000
						nTMP_POR = 0.045
					CASE nTMP_PET >= 1500000 AND nTMP_PET < 2000000
						nTMP_POR = 0.040
					CASE nTMP_PET >= 2000000 AND nTMP_PET < 2500000
						nTMP_POR = 0.035
					CASE nTMP_PET >= 2500000 AND nTMP_PET < 3000000
						nTMP_POR = 0.030
					CASE nTMP_PET >= 3000000 
						nTMP_POR = 0.025
				ENDCASE
			ENDIF
			IF nTMP_COL = 0
				nTMP_COM = nTMP_POR - nTMP_VA3
			ELSE
				//	HACE LA SUMATORIA Y RESTA DE LOS VALORES DE LAS VARIABLES Y ESA ES LA COMISION	\*
				nTMP_COM = nTMP_PCB + nTMP_VA2 - nTMP_VA1 
			ENDIF 
			//	ASIGNA EL VALOR AL CONTROL	\*
			.PAGFR1.PAG004.TXTCOM.VALUE = IIF(nTMP_COM <= 0.010, (0.010 * 100), (nTMP_COM * 100))
		ENDWITH

*/