// esta funcion selecciona el troquel y busca la imagen del mismo
function selTroquel(codTroquelV){
    // llenamos los objetos que se usaran para la comparacion
    //------------------------
    $.ajax({
        url: "/show_coment_troquel",
        type: "get",
        dataType: "html",
        data:{
            codTroquel:codTroquelV
        }
    }).done(function (res) {
        //console.log (res);
        var data = JSON.parse(res);                
        console.log  (data);                                      
        if (data["result"]=="1"){
            var comentario=data["data"];
            if (comentario.length > 0) {
                var cadena=comentario;
                $('#miModal').find('.modal-body').html(cadena);
                const tituloModal = document.querySelector('#miModal .modal-title');
                tituloModal.innerHTML = "Atención";
                $('#miModal').modal('show');            
            }
        } else {
            var cadena="No se consiguieron comentarios del troquel";
            muestraModalError(cadena);
            $('#miModal').modal('show');            
        }
    }); 
}

// esta funcion selecciona el troquel y busca la imagen del mismo
function viewTroquel(codTroquelV){
    const anchoVentana = screen.width*0.35;
    const altoVentana = screen.height*0.35;         
    const izquierda = (screen.width - anchoVentana) / 2;
    const arriba = (screen.height - altoVentana) / 2;               

    window.open("/show_troquel/?codTroquel="+codTroquelV,"_show_troquel",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
}

// esta funcion permite cerrar un cuadro modal que se usa para emitir mensajes en formato html
function cierraModal() {
    $('#miModal').modal('hide');
} 

function muestraModalError(cadena){
        var cadenaF="<span class='text-danger'>"+cadena+"</span>";
        $('#miModal').find('.modal-body').html(cadenaF);
        const tituloModal = document.querySelector('#miModal .modal-title');
        tituloModal.innerHTML = "Atención";
        $('#miModal').modal('show'); 
}

// esta función activa el criterio de busqueda
function tipoSearch(){
    var tipoBusquedaV=document.getElementById('selectTipoSearch').value;
    if (tipoBusquedaV == 1){
        byCodigo()
    } else if (tipoBusquedaV == 2) {
        byAncho()
    } else if (tipoBusquedaV == 3) {
        byAvance()
    } else if (tipoBusquedaV == 4) {
        byMedidas()
    } else {
        alert ("Criterio de Búsqueda desconocido");
    }
}

// esta fucion activa la busqueda de troqueles por codigo
function byCodigo(){
    document.getElementById('txtSearchTroquel').value=""
    document.getElementById('divTxtSearch').style.display="block";
    document.getElementById('lblDescripcion').innerHTML="Código"
    // ocultamos los elementos de busqueda por ancho y avance
    document.getElementById('idAncho').style.display="none";    
    document.getElementById('idAvance').style.display="none";
    document.getElementById('txtAnchoTroquel').value=0.00;
    document.getElementById('txtAvanceTroquel').value=0.00;
}

// esta fucion activa la busqueda de troqueles por codigo
function byAncho(){
    document.getElementById('txtSearchTroquel').value=""
    document.getElementById('divTxtSearch').style.display="block"; 
    document.getElementById('lblDescripcion').innerHTML="Ancho"
    // ocultamos los elementos de busqueda por ancho y avance
    document.getElementById('idAncho').style.display="none";    
    document.getElementById('idAvance').style.display="none";
    document.getElementById('txtAnchoTroquel').value=0.00;
    document.getElementById('txtAvanceTroquel').value=0.00;
}

// esta fucion activa la busqueda de troqueles por codigo
function byAvance(){
    document.getElementById('txtSearchTroquel').value=""
    document.getElementById('divTxtSearch').style.display="block";
    document.getElementById('lblDescripcion').innerHTML="Avance"    
    // ocultamos los elementos de busqueda por ancho y avance
    document.getElementById('idAncho').style.display="none";    
    document.getElementById('idAvance').style.display="none";
    document.getElementById('txtAnchoTroquel').value=0.00;
    document.getElementById('txtAvanceTroquel').value=0.00;
}
// esta fucion activa la busqueda de troqueles por codigo
function byMedidas(){
    // inicializamos el elemento de busqueda
    document.getElementById('txtSearchTroquel').value=""
    // ocultamos los elementos de busqueda de texto
    document.getElementById('divTxtSearch').style.display="none";
    // visualizamos los elementos de busqueda por ancho y avance
    document.getElementById('idAncho').style.display="block";    
    document.getElementById('idAvance').style.display="block";        
}

// esta es la funcion que efectivamente realiza la busqueda
// toma el criterio de busqueda, los valores buscados y lo envia al controlador
function buscar(){
    // determinamos que criterio se usara 
    var tipoBusquedaV=document.getElementById('selectTipoSearch').value;
    // capturamos el contenido de la busqueda
    var txtSearchV=document.getElementById('txtSearchTroquel').value.trim();
    // capturamos el ancho del troquel
    var anchoTroquelV=parseFloat(document.getElementById('txtAnchoTroquel').value);
    // capturamos el avance del troquel
    var avanceTroquelV=parseFloat(document.getElementById('txtAvanceTroquel').value);
    // capturamos la tolerancia troquel
    var toleranciaTroquelV=parseFloat(document.getElementById('txtToleranciaSearch').value);

    // validamos los datos segun el tipo de busqueda
    valido=true;
    if (tipoBusquedaV == "4"){
        // se trata de ancho y avance
        if ((anchoTroquelV == 0.00) || (avanceTroquelV == 0.00)){
            var cadena="Debe definir el Ancho y el Avance para efectuar la búsqueda";
            muestraModalError(cadena);
            valido=false;
        }
    } else {
        // se trata de Codigo,Ancho o Avance
        if (txtSearchV.lenth == 0){
            var cadena="Debe definir un Texto para efectuar la búsqueda";
            muestraModalError(cadena);
            valido=false;            
        }
    }

    console.log (tipoBusquedaV,txtSearchV,anchoTroquelV,avanceTroquelV,toleranciaTroquelV);
    // los campos son validos efectuamos los busqueda
    if (valido){
        document.getElementById('detallesMaestroTroqueles').innerHTML="";
        $.ajax({
        url: "/search_troqueles",
        type: "GET",
        dataType: "html",
        data:{
            tipoBusqueda:tipoBusquedaV,
            txtSearch:txtSearchV,
            anchoTroquel:anchoTroquelV,
            avanceTroquel:avanceTroquelV,
            toleranciaTroquel:toleranciaTroquelV
        }
    }).done(function (res) {
        //console.log (res);
        var data = JSON.parse(res);   
        console.log (data);                                                
        if (data['result']=="1"){
            arregloDatos=data['data'];
            sql=data['sql'];
            texto=data['texto'];
            criterio=data['criterio'];
            avance=data['avance'];
            ancho=data['ancho'];
            tolerancia=data['tolerancia'];
            /*
            "result"=>"1",
            "data"=>$pagination,
            "sql"=>$query,
            "criterio"=>$criterioBusqueda,
            "texto"=>$searchInput,
            "avance"=>$avanceTroquel,
            "ancho"=>$anchoTroquel,
            "tolerancia"=>$searchTolerancia
            */
            var n = arregloDatos.length;
            cadena="";
            for (i=0; i < n; i++){
                var codTroquel=arregloDatos[i]['cod_tro'].trim();
                var desTroquel=arregloDatos[i]['des_tro'].trim();
                var tipTroquel=arregloDatos[i]['tip_tro'].trim();
                var ancTroquel=arregloDatos[i]['anc_tro'];
                var larTroquel=arregloDatos[i]['lar_tro'];
                var avaTroquel=arregloDatos[i]['ava_tro'];
                var canTroquel=arregloDatos[i]['can_tro'];
                var dieTroquel=arregloDatos[i]['die_tro'];
                var repTroquel=arregloDatos[i]['rep_tro']; 
                var comTroquel=arregloDatos[i]['com_tro'].trim(); 
                if (comTroquel.length > 0){
                    cadena=cadena+"<tr class='tr-maestro-troqueles bg-danger'>";
                } else {
                    cadena=cadena+"<tr class='tr-maestro-troqueles'>";
                }     
                cadena=cadena+"<td class='text-center td-maestro-troqueles'>";
                //                                                                                                      0            1             2               3                4             5               6                                      
                cadena=cadena+"<input type='checkbox' id='chkTroquelActivo"+i+"' name='chkTroquelActivo' value='"+codTroquel+"~"+ancTroquel+"~"+avaTroquel+"~"+tipTroquel+"~"+canTroquel+"~"+repTroquel+"~"+larTroquel+"'></td>";
                cadena=cadena+"<td class='text-center td-maestro-troqueles'>";
                cadena=cadena+"<a href=javascript:viewTroquel('"+codTroquel+"','"+ancTroquel+"','"+avaTroquel+"')>";
                cadena=cadena+"<img src='assets/images/icons8-ver-96.png' style='width:12px'>";
                cadena=cadena+"</a></td>"
                cadena=cadena+"<td class='td-maestro-troqueles link-negro-contenedor'>";
                cadena=cadena+"<a href=javascript:selTroquel('"+codTroquel+"')>"+codTroquel+"</a></td>";
                cadena=cadena+"<td class='td-maestro-troqueles'>"+desTroquel+"</td>";
                cadena=cadena+"<td class='td-maestro-troqueles text-center'>"+tipTroquel+"</td>";                
                cadena=cadena+"<td class='td-maestro-troqueles text-right'>"+ancTroquel+"</td>";
                cadena=cadena+" <td class='td-maestro-troqueles text-right'>"+larTroquel+"</td>";                
                cadena=cadena+"<td class='td-maestro-troqueles text-right'>"+avaTroquel+"</td>";
                cadena=cadena+"<td class='td-maestro-troqueles text-center'>"+canTroquel+"</td>";                
                cadena=cadena+"<td class='td-maestro-troqueles text-center'>"+dieTroquel+"</td>";
                cadena=cadena+" <td class='td-maestro-troqueles text-center'>"+repTroquel+"</td>";                
                cadena=cadena+"</tr>";                
            }
            document.getElementById('detallesMaestroTroqueles').innerHTML=cadena;
            console.log (cadena);
        } else {
            cadena="<tr><td class='text-danger' colspan='11'>Sus criterios no arrojaron resultados, por favor rectifique sus criterios</td></tr>"
            document.getElementById('detallesMaestroTroqueles').innerHTML=cadena;
            var cadena="Debe definir un Texto para efectuar la búsqueda";
            muestraModalError(cadena);
            valido=false;            
        }
    });   
    }
}

// esta funcion permite seleccionar el troquel y ejecutar las funciones correspondientes
function SelectTroquel(){
    try {  
        console.log ("entrando a SelectTroquel"); 
        paso=1;
        var n=document.getElementsByName('chkTroquelActivo').length;
        paso=2;
        var codTroquelSel="";
        paso=3;
        if (n > 0){
            paso=4;
            // buscamos el objeto activo
            var elementosActivos=0;
            for (i=0;i < n; i++){
                paso=5;
                if (document.getElementsByName('chkTroquelActivo').item(i).checked){
                    paso=6;
                    codTroquelSelT=document.getElementsByName('chkTroquelActivo').item(i).value;
                    elementosActivos++;
                }
            }
            // verificamos que si se selecciono un objeto
            paso=7;
            console.log ("Codigo Troquel ",codTroquelSelT);
            arregloTmp=codTroquelSelT.split("~");
            paso=8;
            console.log (codTroquelSelT);
            paso=9;
            codTroquelSel=arregloTmp[0];
            paso=10;
            ancTroquelSel=arregloTmp[1];
            paso=11;
            avaTroquelSel=arregloTmp[2];
            paso=12;
            tipTroquelSel=arregloTmp[3];
            paso=13;
            canTroquelSel=arregloTmp[4];
            paso=14;
            repTroquelSel=arregloTmp[5];
            paso=15;
            largoTroquelSel=arregloTmp[6];

            console.log ("Codigo Troquel",codTroquelSelT);
            console.log ("Ancho Troquel",ancTroquelSel);
            console.log ("Avance Troquel",avaTroquelSel);
            console.log ("Tipo Troquel",tipTroquelSel);
            console.log ("Canales Troquel",canTroquelSel);
            console.log ("Largo Troquel",largoTroquelSel);

            paso=16;
            document.getElementById('hAncTroquel').value=ancTroquelSel;
            paso=17;
            document.getElementById('hAvaTroquel').value=avaTroquelSel;
            paso=18;
            document.getElementById('hCodTroquel').value=codTroquelSel;
            paso=19;
            document.getElementById('hTipTroquel').value=tipTroquelSel;
            paso=20;
            document.getElementById('hCanTroquel').value=canTroquelSel;
            paso=21;
            document.getElementById('hRepTroquel').value=repTroquelSel;
            paso=22;
            document.getElementById('hLarTroquel').value=largoTroquelSel;

            paso=23;
            if ((codTroquelSel!="") && (elementosActivos==1)){
                paso=24;
                // comienza validación del troquel 
                // el ancho y largo del troquel es igual al ancho y largo de la etiqueta?
                paso=25;
                if (window.opener.document.getElementById('tipoCotiz0').checked){
                    paso=26;
                    // es una cotizacion Flexo
                    var anchoEtiqueta=window.opener.getAnchoFlexo();
                } else {
                    paso=27;
                    // es una cotizacion laser
                    var anchoEtiqueta=window.opener.getAnchoIndigo();
                }
                paso=28;
                var avanceEtiqueta=window.opener.getAvanceEtiqueta();
                // tomamos los valores del troquel seleccionado
                paso=29;
                var anchoTroquelSeleccionado=0.00;
                paso=30;
                var avanceTroquelSeleccionado=0.00;
                paso=31;
                var canalesTroquelSeleccionado=0;
                paso=32;
                var repeticionesTroquelSeleccionado=0;
                paso=33;
                var largoTroquelSeleccionado=0.00;
                paso=34;
                var codTroquelSeleccionado="";

                paso=35;
                anchoTroquelSeleccionado=parseFloat(document.getElementById('hAncTroquel').value);
                paso=36;
                avanceTroquelSeleccionado=parseFloat(document.getElementById('hAvaTroquel').value);
                paso=37;
                canalesTroquelSeleccionado=parseFloat(document.getElementById('hCanTroquel').value);
                paso=38;
                repeticionesTroquelSeleccionado=parseFloat(document.getElementById('hRepTroquel').value);
                paso=39;
                codTroquelSeleccionado=document.getElementById('hCodTroquel').value;
                paso=40;
                largoTroquelSeleccionado=parseFloat(document.getElementById('hLarTroquel').value);
                
                paso=41;
                console.log ("Ancho:",anchoTroquelSeleccionado);
                paso=42;
                console.log ("Avance:",avanceTroquelSeleccionado);
                paso=43;
                console.log ("Canales:",canalesTroquelSeleccionado);
                paso=44;
                console.log ("Repeticiones:",repeticionesTroquelSeleccionado);
                paso=45;
                console.log ("Largo:",largoTroquelSeleccionado);

                // asignamos el codigo del troquel al objeto correspondiente
                paso=46;
                window.opener.setCodigoTroquelSuperficie(codTroquelSeleccionado);
                // validamos si dimensiones coinciden //

                // verificamos si es flexo o indigo
                paso=47;
                if (window.opener.document.getElementById('tipoCotiz0').checked){
                    paso=48;
                    console.log ("ancho flexo");
                    // esta visible el ancho de etiquetas flexo
                    paso=49;
                    window.opener.setAnchoFlexo(anchoTroquelSeleccionado);
                    paso=50;
                    window.opener.changeAncho1();
                } else {
                    paso=51;
                    console.log ("ancho indigo");
                    // esta visible ancho de etiquetas indigo
                    // actualizammos el valor del objeto en el formulario de procesos especiales uno
                    paso=52;
                    window.opener.setAnchoIndigo(anchoTroquelSeleccionado);
                    // ejecutamos el script de actualizacion del objeto
                    paso=53;
                    window.opener.changeSelAnchoEtq();
                }
                // actualizamos el ancho de la etiqueta en el resumen
                paso=54;
                window.opener.setResumenAnchoEtiqueta(anchoTroquelSeleccionado);

                // actualizamos el avance del troquel
                paso=55;
                window.opener.setAvanceEtiqueta(largoTroquelSeleccionado);
                paso=56;
                window.opener.changeAvance();

                // actualizamos en el formulario de procesos especiales la separacion
                paso=57;
                difTroquel=0.00;
                paso=58;
                difTroquel=avanceTroquelSeleccionado - largoTroquelSeleccionado;
                paso=59;
                console.log ("Diferencia ",difTroquel);
                paso=60;
                roundDifTroquel=difTroquel.toFixed(1);
                paso=61;
                console.log ("Diferencia Redondeada ",roundDifTroquel);
                // original foxpro
                // oTMP_FRM.PAGFR1.PAG001.SPISEP.VALUE = 
                // IIF(ROUND(uTroquel.AVA_TRO - uTroquel.LAR_TRO, 1) < 0, 0.00, 
                // ROUND(uTroquel.AVA_TRO - uTroquel.LAR_TRO, 1))
                paso=62;
                if(roundDifTroquel < 0) {
                    paso=63;
                    window.opener.setSeparacionEtiqueta(0.00);
                } else{
                    paso=64;
                    window.opener.setSeparacionEtiqueta(roundDifTroquel);
                }
                // ejecutamos el script de actualizacion del objeto
                paso=65;
                window.opener.changeSeparacion();

                // actualizamos el objeto de canales de impresion en el formulario de procesos especiales
                paso=66;
                window.opener.setCanalesEtiqueta(canalesTroquelSeleccionado);
                paso=67;
                window.opener.changeCanales();

                // actualizamos el largo de la etiqueta
                paso=68;
                window.opener.setLargoEtiqueta(avanceTroquelSeleccionado);
                paso=69;
                window.opener.changeLargoEtiqueta();

                // actualizamos el objeto de repeticiones de troquel en el formulario de procesos especiales
                paso=70;
                window.opener.setRepeticionesTroquel(repeticionesTroquelSeleccionado);
                paso=71;
                window.opener.changeRepeticionTroquel();

                setTimeout(() => {
                    window.close();
                    console.log ("cerrando");
                }, 1000); // 3000 milisegundos = 3 segundos
            } else {
                // validamos que solo se haya seleccioando un solo elemento
                paso=72;
                if (elementosActivos>1){
                    paso=73;
                    // hay mas de un elemento activo
                    var cadena="Debe selecionar un SOLO elemento para poder efectuar la operación";
                } else {
                    paso=74;
                    // no se ha seleccionado ningun elemento
                    var cadena="Debe selecionar un elemento para poder efectuar la operación";
                }
                paso=75;
                muestraModalError(cadena);
            }
            
        } else {
            var cadena="No hay elementos que seleccionar, por favor efectúe una búsqueda que arroje resultados";
            muestraModalError(cadena);
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error SelectTroquel");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}