// este arreglo contendra los datos de una cotización
// podrá ser anexadoe elementos o eliminados segun necesidad
let myPersistentArray = [];

const storedArray = localStorage.getItem('myArrayKey'); // 'myArrayKey' is the key for your array

if (storedArray) {
    // If data exists, parse it back into a JavaScript array
    myPersistentArray = JSON.parse(storedArray);
    
} else {
    alert ("No existe la data");
}


// esta funcion cierra la ventana de cotización
function cierraVentana(){
    var r = confirm ("Desea cerrar esta ventana?\nLa información que no haya guardado se perderá")
    if (r){
        
        cleanAll();
        window.opener.document.location.reload();
        window.close();  
    }
          
}

// esta funcion permite cerrar un cuadro modal que se usa para emitir mensajes en formato html
function cierraModal() {
    $('#miModal').modal('hide');
}  

// activa la pestaña generales aqui están la mayoria de los detalles de la cotización
function general(){
    //console.log("1");
    document.getElementById('divGeneral').style.visibility="visible";
    document.getElementById('divPresentacion').style.visibility="hidden";
    document.getElementById('divCostos').style.visibility="hidden";
    document.getElementById('divResumen').style.visibility="hidden";
}        

// activa la pestaña lista
function presentacion(){
    //console.log("2");
    document.getElementById('divGeneral').style.visibility="hidden";
    document.getElementById('divPresentacion').style.visibility="visible";
    document.getElementById('divCostos').style.visibility="hidden";
    document.getElementById('divResumen').style.visibility="hidden";
}  

// activa la pestaña adicionañes
function costos(){
    //console.log("3");
    document.getElementById('divGeneral').style.visibility="hidden";
    document.getElementById('divPresentacion').style.visibility="hidden";
    document.getElementById('divCostos').style.visibility="visible";
    document.getElementById('divResumen').style.visibility="hidden";
}  

// activa la pestaña resumen
function resumen(){
    //console.log("3");
    document.getElementById('divGeneral').style.visibility="hidden";
    document.getElementById('divPresentacion').style.visibility="hidden";
    document.getElementById('divCostos').style.visibility="hidden";
    document.getElementById('divResumen').style.visibility="visible";
}  


// esta función permite cambiar entre las distintas pestañas de la cotización Generales/Lista/Adicionales
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Evita el comportamiento predeterminado del enlace (navegar a la URL)
            event.preventDefault();

            // Desactiva todos los enlaces
            navLinks.forEach(otherLink => {
                otherLink.classList.remove('active');
                otherLink.removeAttribute('aria-current');
            });

            // Activa el enlace clickeado
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');

            // Envía el mensaje de alerta según el texto del enlace
            const textoEnlace = this.textContent.trim().toLowerCase();

            if (textoEnlace === 'general') {
                general();
            } else if (textoEnlace === 'presentación') {
                presentacion();
            } else if (textoEnlace === 'costos') {
                costos();
            }  else if (textoEnlace === 'resumen') {
                resumen();
            }    
            
        });
        // tomamos de la ventana previa el renglo activo
        var nRenglonActivo=parseInt(window.opener.document.getElementById('nLRenglon').innerHTML);
        if((nRenglonActivo == 0) || (typeof(nRenglonActivo)=="undefined") || (nRenglonActivo=="NaN")){
             nRenglonActivo=1;           
        }

        // cambiamos el contenido de la etiqueta de renglon en el formulario para indicar renglon activo
        document.getElementById('nRenglonHeader').innerHTML=nRenglonActivo;
    });
}); 

/*------------ esta funcion permite determinar de que color se verá el estatus de cotizacion según la urgencia de la misma ---------*/
document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('status');

    // Función para aplicar la clase correcta
    function updateSelectColor() {
        const selectedValue = selectElement.value;
        // Limpia las clases de color existentes
        selectElement.classList.remove('bg-normal', 'bg-urgente');

        // Aplica la nueva clase basada en el valor
        if (selectedValue === '1') {
            selectElement.classList.add('bg-normal');
        } else if (selectedValue === '2') {
            selectElement.classList.add('bg-urgente');
        }
    }

    // Agrega un listener para el evento 'change'
    selectElement.addEventListener('change', updateSelectColor);

    // Opcional: Ejecuta la función al cargar la página para colorear la opción por defecto
    updateSelectColor();
});

/*---- esta funcion llama a la inicializacion de los objetos cuando la pagina se carga o es actualizada ---*/
/*--- esto es lo que permite cargar la data del renglon activo ------------------*/
document.addEventListener('DOMContentLoaded', function() {
    try{    
        paso=1;
        limpia();
        // verificamos si esta hay un renglon seleccionado y hay datos
        paso=2;
        nRenglon=parseInt(document.getElementById('nRenglonHeader').innerHTML);
        paso=3;
        if (nRenglon > 0){
            paso=4;
            console.log ("Renglon Activo",nRenglon);
            arregloComentario=getComentRenglonAnctivo();
            objeto="co_art"+(nRenglon-1);
            console.log ("objeto ",objeto);
            coArt=window.opener.document.getElementById(objeto).value.trim();
            console.log ("codigo de etiqueta",coArt);
            if (Array.isArray(arregloComentario)){
                cargaDataECD(coArt,arregloComentario);
            }

        } else {
            paso=5;
            console.log ("No hay renglon activo");
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error LImpiando el documento al entrar");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
 
});


function activaControl(nombreObjeto){
    console.log ("activando objeto:", nombreObjeto);
    document.getElementById('objetoActivo').value=nombreObjeto;
}

/*--- esta funcion agrega un listener al cuadro que muestra el diametro de los cores ------------*/
 document.addEventListener('keydown', function(event) {
    const imgElement = document.getElementById('imgDiametroCore');
    const imgElement2 = document.getElementById('imgEmbobinadoFrontal');
    const imgElement3 = document.getElementById('imgEmbobinadoDorsal');
   
    const key = event.key.toUpperCase();
    // Mapeamos cada tecla a su imagen correspondiente
    const imageMap = {
        'A': 'assets/images/diametroA.png',
        'B': 'assets/images/diametroB.png',
        'C': 'assets/images/diametroC.png',
        'D': 'assets/images/diametroD.png',
        'E': 'assets/images/diametroE.png'
    };    

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

    // determinamos cual es el objeto activo
    controlActivoV=document.getElementById('objetoActivo').value.trim();

    if (controlActivoV!=""){
        // se hizo click el objeto Diametro del Core
        if (controlActivoV=="objDiametroCore"){
            // Verificamos si la tecla presionada está en nuestro mapa
            if (imageMap[key]) {
                // Si la tecla existe, cambiamos la fuente de la imagen
                imgElement.src = imageMap[key];
                document.getElementById('txtDiametroCore').value=key;
            } else {
                // Si no es ninguna de las teclas deseadas, puedes restaurar la imagen predeterminada si lo deseas.
                imgElement.src = 'assets/images/diametronull.png';
                document.getElementById('txtDiametroCore').value="";
            }
            // seteamos el diametro del core en el resumen
            setResumenDiametroCore(0);
            switch (key){
                case "A":
                    setResumenDiametroCore(1);
                    break;
                case "B":
                    setResumenDiametroCore(1.5);
                    break;  
                case "C":
                    setResumenDiametroCore(3);
                    break;
                case "D":
                    setResumenDiametroCore(0.5);
                    break;   
                case "E":
                    setResumenDiametroCore(6);
                    break;                                                          
            }
            /*
            THISFORM.PAGFR1.PAG004.TXTCOR.VALUE = 	
            IIF(UPPER(THIS.VALUE) = "A", "1", ;
            IIF(UPPER(THIS.VALUE) = "B", "1 1/2", ;
            IIF(UPPER(THIS.VALUE) = "C", "3", ;
            IIF(UPPER(THIS.VALUE) = "D", "1/2", ""))))
            */
        }

        // se hizo click cobre el embobinado frontal
        if (controlActivoV=="objEmbobinadoFrontal"){
            // Verificamos si la tecla presionada está en nuestro mapa
            if (imageMap2[key]) {
                // Si la tecla existe, cambiamos la fuente de la imagen
                imgElement2.src = imageMap2[key];
                document.getElementById('txtEmbobinadoFrontal').value=key;
            } else {
                // Si no es ninguna de las teclas deseadas, puedes restaurar la imagen predeterminada si lo deseas.
                imgElement2.src = 'assets/images/diametronull.png';
                document.getElementById('txtEmbobinadoFrontal').value="";
            }   
            if ((key>=0) && (key<=9)){
                setResumenEmbobinado(key);
            }
        }

        // se hizo click cobre el embobinado dorsal
        if (controlActivoV=="objEmbobinadoDorsal"){
            // Verificamos si la tecla presionada está en nuestro mapa
            if (imageMap2[key]) {
                // Si la tecla existe, cambiamos la fuente de la imagen
                imgElement3.src = imageMap2[key];
                document.getElementById('txtEmbobinadoDorsal').value=key;
            } else {
                // Si no es ninguna de las teclas deseadas, puedes restaurar la imagen predeterminada si lo deseas.
                imgElement3.src = 'assets/images/diametronull.png';
                document.getElementById('txtEmbobinadoDorsal').value="";
            }        
        }   
        
        // verificamos si se esta buscando en el maestro de troqueles
        if (controlActivoV=="txtCodigoTroquelSuperficie"){
            // Check if the pressed key is 'Enter' (key code 13)
            if (event.key === 'F2') {
                // Prevent the default action (e.g., opening dev tools)
                event.preventDefault();
                const anchoVentana = screen.width*0.45;
                const altoVentana = screen.height*0.45;         
                const izquierda = (screen.width - anchoVentana) / 2;
                const arriba = (screen.height - altoVentana) / 2;               

                window.open("/troqueles","_master_troqueles",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
            }
        }   
        
        // verificamos si se esta buscando en el maestro de materiales
        if (controlActivoV=="txtCodigoEtiqueta"){
            // Check if the pressed key is 'Enter' (key code 13)
            if (event.key === 'F2') {
                // Prevent the default action (e.g., opening dev tools)
                event.preventDefault();
                const anchoVentana = screen.width*0.45;
                const altoVentana = screen.height*0.45;         
                const izquierda = (screen.width - anchoVentana) / 2;
                const arriba = (screen.height - altoVentana) / 2;               
                
                //alert ("En desarrollo");
                empresaV=document.getElementById('selectedEnterprise').value;
                window.open("/bus_articulos/?empresa="+empresaV,"_master_articulos",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);        
            }   
        }

        // verificamos si se esta buscando en el maestro de materiales
        if (controlActivoV=="codigoMaterial"){
            // Check if the pressed key is 'Enter' (key code 13)
            if (event.key === 'F2') {
                // Prevent the default action (e.g., opening dev tools)
                event.preventDefault();
                const anchoVentana = screen.width*0.45;
                const altoVentana = screen.height*0.45;         
                const izquierda = (screen.width - anchoVentana) / 2;
                const arriba = (screen.height - altoVentana) / 2;               
                empresaV=document.getElementById('selectedEnterprise').value;
                window.open("/maestro_materiales?empresa="+empresaV+"&cTMP_TIP=M","_maestro_materiales",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
            }

            if (event.key === 'Enter') {
                // Prevent the default action (e.g., opening dev tools)
                if (getCodigoMaterial()!=""){
                    changeCostoMaterial();
                }
            }            

        }      
        
        // verificamos si se esta buscando en el maestro de materiales txtSandwich
        if (controlActivoV=="txtSandwich"){
            // Check if the pressed key is 'Enter' (key code 13)
            if (event.key === 'F2') {
                // Prevent the default action (e.g., opening dev tools)
                event.preventDefault();
                const anchoVentana = screen.width*0.45;
                const altoVentana = screen.height*0.45;         
                const izquierda = (screen.width - anchoVentana) / 2;
                const arriba = (screen.height - altoVentana) / 2;               
                empresaV=document.getElementById('selectedEnterprise').value;
                window.open("/maestro_materiales?empresa="+empresaV+"&cTMP_TIP=S","_maestro_materiales",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
            }
        }   
        
        
        // verificamos si se esta buscando en el maestro de materiales
        if (controlActivoV=="codigoLaminado"){
            // Check if the pressed key is 'Enter' (key code 13)
            if (event.key === 'F2') {
                // Prevent the default action (e.g., opening dev tools)
                event.preventDefault();
                const anchoVentana = screen.width*0.45;
                const altoVentana = screen.height*0.45;         
                const izquierda = (screen.width - anchoVentana) / 2;
                const arriba = (screen.height - altoVentana) / 2;               
                empresaV=document.getElementById('selectedEnterprise').value;
                window.open("/maestro_materiales?empresa="+empresaV+"&cTMP_TIP=L","_maestro_materiales",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
            }

        }           

    }
});

/*--- esta funcion se ejecuta cuando se hace doble click sobre el codigo del material ---*/
function dblClickCodigoMaterial(){
    const anchoVentana = screen.width*0.45;
    const altoVentana = screen.height*0.45;         
    const izquierda = (screen.width - anchoVentana) / 2;
    const arriba = (screen.height - altoVentana) / 2;               
    empresaV=document.getElementById('selectedEnterprise').value;
    window.open("/maestro_materiales?empresa="+empresaV+"&cTMP_TIP=M","_maestro_materiales",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
}

/*----- esta funcion se ejecuta cuando se le hace doble click al codigo de troqueles ----*/
function dblClickCodigoTroqueles(){
    const anchoVentana = screen.width*0.45;
    const altoVentana = screen.height*0.45;         
    const izquierda = (screen.width - anchoVentana) / 2;
    const arriba = (screen.height - altoVentana) / 2;               
    window.open("/troqueles","_master_troqueles",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
}

/*----- esta funcion se ejecuta cuando se le hace doble click al codigo de las etiquetas ----*/
function dblClickCodigoEtiqueta(){
    const anchoVentana = screen.width*0.45;
    const altoVentana = screen.height*0.45;         
    const izquierda = (screen.width - anchoVentana) / 2;
    const arriba = (screen.height - altoVentana) / 2;               
    
    //alert ("En desarrollo");
    empresaV=document.getElementById('selectedEnterprise').value;
    window.open("/bus_articulos/?empresa="+empresaV,"_master_articulos",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);        

}

/*----- esta funcion se ejecuta cuando se le hace doble click al codigo del Laminado ----*/
function dblClickCodigoLaminado(){
    const anchoVentana = screen.width*0.45;
    const altoVentana = screen.height*0.45;         
    const izquierda = (screen.width - anchoVentana) / 2;
    const arriba = (screen.height - altoVentana) / 2;               
    empresaV=document.getElementById('selectedEnterprise').value;
    window.open("/maestro_materiales?empresa="+empresaV+"&cTMP_TIP=L","_maestro_materiales",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
}


/*----- esta funcion se ejecuta cuando se le hace doble click al codigo de los Sandwich----*/
function dblClickCodigoSandwich(){
    const anchoVentana = screen.width*0.45;
    const altoVentana = screen.height*0.45;         
    const izquierda = (screen.width - anchoVentana) / 2;
    const arriba = (screen.height - altoVentana) / 2;               
    empresaV=document.getElementById('selectedEnterprise').value;
    window.open("/maestro_materiales?empresa="+empresaV+"&cTMP_TIP=S","_maestro_materiales",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
}


//--- funciones de la botonera ---/
function rengAnterior(){
    try{
        console.log ("Renglon anterior");
        paso=1;

        // tomamos el renglon activo de la etiqueta
        nRenglonV=parseInt(document.getElementById('nRenglonHeader').innerHTML);
        // verificamos si al restarle es mayor que 0
        paso=2;
        console.log ("Renglon:",nRenglonV);
        if ((nRenglonV-1)>=0){
            paso=3;
            // decrementamos el valor
            nRenglonV=(nRenglonV-1);
            console.log ("Renglon:",nRenglonV);
            paso=4;
            // buscamos el objeto correspondiente en la pagina anterior
            nomObjeto="co_art"+(nRenglonV-1);
            console.log ("Nombre del objeto:",nomObjeto);
            paso=5;
            if (typeof(window.opener.document.getElementById(nomObjeto))!="undefined"){
                codigoArticulo=window.opener.document.getElementById(nomObjeto).value;
                console.log ("codigo de la etiqueta:",codigoArticulo);
                paso=6;
                if (codigoArticulo.startsWith("ETQ")){
                    paso=7;
                    window.opener.touchArt(codigoArticulo,nRenglonV,nomObjeto);
                    paso=8; 
                    window.opener.processEsp1();
                }                
            }
        } else {
            // deshabilitamos el objeto
        }
   
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error renglon anterior");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
   
}

function rengSiguiente(){
    try{
        console.log ("Renglon siguiente");
        paso=1;

        // tomamos el renglon activo de la etiqueta
        nRenglonV=parseInt(document.getElementById('nRenglonHeader').innerHTML);
        // verificamos si al restarle es mayor que 0
        paso=2;
        console.log ("Renglon:",nRenglonV);
        paso=3;
        // decrementamos el valor
        nRenglonV=nRenglonV+1;
        console.log ("Renglon:",nRenglonV);
        paso=4;
        // buscamos el objeto correspondiente en la pagina anterior
        nomObjeto="co_art"+(nRenglonV-1);
        console.log ("Nombre del objeto:",nomObjeto);
        paso=5;
        // activamos el objeto anterior
        if (typeof(window.opener.document.getElementById(nomObjeto))!="undefind"){
            codigoArticulo=window.opener.document.getElementById(nomObjeto).value;
            console.log ("codigo de la etiqueta:",codigoArticulo);
            paso=6;
            if (codigoArticulo.startsWith("ETQ")){
                paso=7;
                window.opener.touchArt(codigoArticulo,nRenglonV,nomObjeto);
                paso=8; 
                window.opener.processEsp1();
            }
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error renglon siguiente");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}

function cantDesglozadas(){
    alert ("En desarrollo");
}

function nuevo(){
    alert ("En desarrollo");
}

function guardar(){
    preValidar();
    if (validar()){
        guardarRenglonCotizacion();
    } else {
        console.log("no puede guardar");
    }
}

function salir(){
    var cadena="<span class='text-danger'>¿Desea salir del proceso?<br>";
    cadena=cadena+"La información que no haya guardado se perderá</span><br><br>";
    cadena=cadena+"<div class='text-center'><input type='button' class='btn btn-danger' value='Salir' onclick='javascript:Salir()'>";
    cadena=cadena+"&nbsp;<input type='button' class='btn btn-success' value='Continuar' onclick='javascript:continuar()' ></div>";    
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');
}

function Salir(){
    $('#miModal').modal('hide');
    window.close();
}

function continuar(){
    $('#miModal').modal('hide');
}

// esta funcion permite cargar renglones de una cotiacion
function searchOldQuotes(){
    var idCotizacionOld=document.getElementById('txtCotizacionOld').value.trim();
    if ((idCotizacionOld.length > 0) && (parseInt(idCotizacionOld)>0)){
        const anchoVentana = screen.width*0.55;
        const altoVentana = screen.height*0.55;         
        const izquierda = (screen.width - anchoVentana) / 2;
        const arriba = (screen.height - altoVentana) / 2;               
        window.open ("/search_old_quotes?idCotizacionOld="+idCotizacionOld,"_search_old_quotes",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
    } else {
        var cadena="<span class='text-danger'>Debe sumnistrar un numero de cotización para buscar los renglones<br>Ademas debe ser un número entero</span>";    
        $('#miModal').find('.modal-body').html(cadena);
        const tituloModal = document.querySelector('#miModal .modal-title');
        tituloModal.innerHTML = "Atención";
        $('#miModal').modal('show');        
    }
}

/************************************************************************************/
/* funciones de cambio de objetos de pagina generales                               */
/************************************************************************************/
/*======================================================================*/
function cambiaTipocotizacion(tipo){
    try { 
        if (tipo=="1"){
            paso=1;
            console.log ("Flexografica");
            // es una cotizacion flexografica
            paso=2;
            document.getElementById('txtPorcentajeSeguridad').value=19.70;
            paso=3;
            // visualizamos el txtAnchoEtiqueta
            document.getElementById('txtAnchoEtiqueta').style.display="block";
            paso=4;
            // ocultamos el select de anchos de la indigo
            document.getElementById('selAnchoEtiqueta').style.display="none";   
            paso=5;

            // desactivamos ls CMYK
            paso=5;
            document.getElementById('coloresInd0').disabled=true;
            paso=7;
            document.getElementById('coloresInd1').disabled=true;
            paso=8;
            document.getElementById('coloresInd2').disabled=true;
            paso=9;
            document.getElementById('coloresInd3').disabled=true;
            paso=10;
            document.getElementById('coloresInd4').disabled=true;

            // buscamos en los comentarios //
            // hay que validar si el renglon tiene comentarios
            // esto se hace en el 
            paso=11;
            const storedArray = localStorage.getItem('myArrayKey'); // 'myArrayKey' is the key for your array

            paso=12;
            if (storedArray) {
                paso=13;
                // tomamos el renglon activo
                renglonActivo=parseInt(document.getElementById('nRenglonHeader').innerHTML);
                paso=14;
                // If data exists, parse it back into a JavaScript array
                myPersistentArray = JSON.parse(storedArray);
                paso=15;
                cComentario=myPersistentArray[renglonActivo]['cComentario'];
            
                // si existe comentarios buscamos el acho de etiqueta
                paso=16;
                if (typeof(cComentario)!="undefined"){
                    paso=1601;
                    if (cComentario.trim().length>0) {
                        paso=1701;
                        cadenaResult=cdd(cComentario,"AncEtq");
                        paso=1801;
                        result=JSON.parse(cadenaResult);
                        paso=1901;
                        if (result[0]=="1"){
                            paso=2001;
                            valor=result[1];
                        } else {
                            paso=2101;
                            valor=0.00;
                        }
                        paso=2201;
                        document.getElementById('txtAnchoEtiqueta').value=valor;
                    }
                }
          
            }
            // evaluamos el tipo de troquel
            paso=23;
            if (document.getElementById('tipTroq0').checked){
                paso=24;
                console.log ("Troquel Fisico");
                // es un troquel fisico
                // deshabilitamos el control de ancho de etiqueta
                paso=25;
                document.getElementById('txtAnchoEtiqueta').disabled=true;
                // deshabilitamos el control de avance
                paso=26;
                document.getElementById('txtAvanceEtiqueta').disabled=true;
                // habilitamos la cantidad de canales
                paso=27;
                document.getElementById('txtCanales').disabled=false;
            } else {
                console.log ("Otros Troqueles");
                // cualquier otro tipo de troquel
                // habilitamos el control de ancho de etiqueta
                paso=28;
                document.getElementById('txtAnchoEtiqueta').disabled=false;
                // habilitamos el control de avance
                paso=29;
                document.getElementById('txtAvanceEtiqueta').disabled=false;
                // habilitamos la cantidad de canales
                paso=30;
                document.getElementById('txtCanales').disabled=false;
            }

            // ocultamos el objeto txtSol
            paso=31;
            document.getElementById('groupSol').style.display="none";
            // inicializamos el valor del control
            paso=32;
            document.getElementById('txtSol').value=0.00;
            // inicializamos la cantidad de colores en los costos
            paso=33;
            document.getElementById('txtCantidadColores').value=0;
            // buscamos en los comentarios si existe definicion de cantidad de colores
            paso=34;
            if (storedArray) {
                paso=35;
                // tomamos el renglon activo
                renglonActivo=parseInt(document.getElementById('nRenglonHeader').innerHTML);
                paso=36;
                // If data exists, parse it back into a JavaScript array
                myPersistentArray = JSON.parse(storedArray);
                paso=37;
                cComentario=myPersistentArray[renglonActivo]['cComentario'];
            
                // si existe comentarios buscamos el acho de etiqueta
                paso=38;
                if (typeof(cComentario)!="undefined"){
                    paso=3801;
                    if (cComentario.trim().length>0) {
                        paso=3901;
                        cadenaResult=cdd(cComentario,"CanCol");
                        
                        paso=4001;
                        result=JSON.parse(cadenaResult);
                        paso=4101;
                        if (result[0]=="1"){
                            paso=4201;
                            valor=result[1];
                        } else {
                            paso=4301;
                            valor=0;
                        }
                        // pasamos el valor al control
                        paso=4401;
                        document.getElementById('txtCantidadColores').value=valor;
                    } 
                }
         
            }
            // colocamos la cantidad de colores como deshabilitado
            paso=45;
            document.getElementById('txtCantidadColores').disabled=false;
        } else {
            console.log ("Digital");
            // es una cotiacion digital
            // activamos ls CMYK
            paso=46;
            document.getElementById('coloresInd0').disabled=false;
            paso=47;
            document.getElementById('coloresInd1').disabled=false;
            paso=48;
            document.getElementById('coloresInd2').disabled=false;
            paso=49;
            document.getElementById('coloresInd3').disabled=false;
            paso=50;
            document.getElementById('coloresInd4').disabled=false;

            // descativamos el control de cantidad de colores
            paso=51;
            document.getElementById('txtCantidadColores').disabled=true;        

            // estamos activando una cotizacion digital 
            paso=52;
            document.getElementById('txtPorcentajeSeguridad').value=7.00;			

            // ocultamos el txtAnchoEtiqueta
            paso=53;
            document.getElementById('txtAnchoEtiqueta').style.display="none";
            paso=54;
            // visualizamos el select de anchos de la indigo
            document.getElementById('selAnchoEtiqueta').style.display="block";   
            paso=55;       
            document.getElementById('txtCanales').value=1;
            paso=56;
            document.getElementById('txtCanales').disabled=false;

            // hay que validar si el renglon tiene comentarios
            // esto se hace en el 
            paso=57;
            const storedArray = localStorage.getItem('myArrayKey'); // 'myArrayKey' is the key for your array

            // 
            paso=58;
            if (storedArray) {
                paso=59;
                // tomamos el renglon activo
                renglonActivo=parseInt(document.getElementById('nRenglonHeader').innerHTML);
                paso=60;
                // If data exists, parse it back into a JavaScript array
                myPersistentArray = JSON.parse(storedArray);
                paso=61;
                cComentario=myPersistentArray[renglonActivo]['cComentario'];
                //console.log (myPersistentArray[renglonActivo]['cComentario']);
            
                // si existe comentarios buscamos el acho de etiqueta
                paso=62;
                if (typeof(cComentario)!="undefined"){
                    paso=6201;
                    if (cComentario.trim().length>0) {
                        paso=6301;
                        cadenaResult=cdd(cComentario,"AncEtq");
                        
                        paso=6401;
                        result=JSON.parse(cadenaResult);
                        if (result[0]=="1"){
                            paso=6501;
                            valor=result[1];
                        } else {
                            paso=6601;
                            valor=0.00;
                        }
                        paso=6701;
                        document.getElementById('selAnchoEtiqueta').value=valor;
                    }   
                }
       
            }

            // verificamos que troquel esta seleccionado
            paso=68;
            var tipTroquel = getTipoTroquel();
            paso=69;
            if (tipTroquel==1){
                paso=70;
                // es un troquel fisico
                // se deshabilita el avance
                desactivaAvanceEtiqueta();
            } else {
                // es otro tipo de troquel
                // se habilita el avance del troquel
                paso=71;
                activaAvanceEtiqueta();           
            }
            
            // visualizamos el grupo TxtSol
            paso=72;
            document.getElementById('groupSol').style.display="block";
            paso=73;
            document.getElementById('txtSol').value=0.00;

            // hacemos click sobre el objeto de seleccion de ancho de etiqueta de indigo selAnchoEtiqueta
            paso=74;
            clickSelAnchoEtiqueta();
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo cambiaTipoCotizacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

function changeSelAnchoEtq(){
    try { 
        console.log ("entrando a changeSelAnchoEtq");
        paso=1;
        // tommos el valor del ancho 
        //var anchoBobina= parseFloat(document.getElementById('selAnchoEtiqueta').value);
        anchoBobina=parseFloat(getAnchoIndigo());
        paso=2;
        switch (anchoBobina){
            case 29.9:
                paso=3;
                //document.getElementById('txtCanales').value=1;
                setCanalesEtiqueta(1);
                break;
            case 14.7:
                paso=4;
                //document.getElementById('txtCanales').value=2;
                setCanalesEtiqueta(2);
                break;   
            case 9.7:
                paso=5;
                //document.getElementById('txtCanales').value=3;
                setCanalesEtiqueta(3);
                break;  
            case 7.1:
                paso=6;
                //document.getElementById('txtCanales').value=4;
                setCanalesEtiqueta(4);
                break;    
            case 5.5:
                paso=7;
                //document.getElementById('txtCanales').value=5;
                setCanalesEtiqueta(5);
                break;  
            case 4.6:
                paso=8;
                //document.getElementById('txtCanales').value=6;
                setCanalesEtiqueta(6);
                break;   
            case 3.9:
                paso=9;
                //document.getElementById('txtCanales').value=7;
                setCanalesEtiqueta(7);
                break; 
            case 3.3:
                paso=10;
                //document.getElementById('txtCanales').value=8;
                setCanalesEtiqueta(8);
                break;    
            case 2.9:
                paso=11;
                //document.getElementById('txtCanales').value=9;
                setCanalesEtiqueta(9);
                break;  
            case 2.6:
                paso=12;
                //document.getElementById('txtCanales').value=10;
                setCanalesEtiqueta(10);
                break;   
            case 2.3:
                paso=13;
                //document.getElementById('txtCanales').value=11;
                setCanalesEtiqueta(11);
                break;     
            case 2.1:
                paso=14;
                //document.getElementById('txtCanales').value=12;
                setCanalesEtiqueta(12);
                break;                                                                                                                  
        }
        changeCanales();
        /*	VALIDA QUE EL ANCHO Y CANALES TENGAN DATOS	*/	
        //var cantidadCanales=parseInt(document.getElementById('txtCanales').value);
        paso=15;
        cantidadCanales=getCanalesEtiqueta();

        paso=16;
        if ((anchoBobina !=0.00) &&  (cantidadCanales!=0)) {
            paso=17;
            /*	LLAMA AL METODO QUE HACE EL CALCULO	*/
            /*	.oTMP_CAL(7) */
            calculos7();

            /*	HACE EL CALCULO	DE MTS 2 DE BOBINA	*/
            /*	VALIDA CAMPOS OBLIGATORIOS	*/ 
            paso=18;
            
            if (getMtrsLineales()!=0.00){
                paso=19;
                calculos8();

                /*	HACE EL CALCULO DE PRECIO TOTAL MATERIAL	*/
                /*	VALIDA LOS CAMPOS NECESARIOS	*/ 
                paso=20;
                //costoMaterial=parseFloat(document.getElementById('txtCostoMaterial').value);
                costoMaterial=getCostoMaterial();
                paso=21;
                //mtrs2Bobina=parseFloat(document.getElementById('txtMtrs2Bobina').value);
                mtrs2Bobina=getMtrs2Bobina();

                paso=22;
                if ((costoMaterial!=0.00) && (mtrs2Bobina!=0)){
                     paso=23;
                    calculos10();
                }
                paso=24;
                calculos21();
            } 
        }

        /*	ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	*/
        /*.PAGFR1.PAG004.TXTANC.VALUE = VAL(THIS.VALUE) */  
        paso=25;    
        setResumenAnchoEtiqueta(parseFloat(getAnchoIndigo()));

        // llamamos al metodo que hace el calculo de cantidad de etiuqetas por pagina en la indigo
        paso=26;
        cep();

        // visaulizamos el grupo Sol
        paso=27;
        document.getElementById('groupSol').style.display="block";

        // llenamos los valores de txtSol
         paso=28;
        document.getElementById('txtSol').value='';    
        
        paso=29;
        let myPersistentArray = [];

         paso=30;
        const storedArray = localStorage.getItem('myArrayKey'); // 'myArrayKey' is the key for your array

        paso=31;
        if (storedArray) {
            // tomamos el renglon activo
            paso=31;
            renglonActivo=parseInt(document.getElementById('nRenglonHeader').innerHTML);
            // If data exists, parse it back into a JavaScript array
            paso=33;
            myPersistentArray = JSON.parse(storedArray);
            paso=34;
            cComentario=myPersistentArray[renglonActivo]['cComentario'];
            paso=35;
            if (cComentario.trim().length>0) {
                paso=36;
                //.PAGFR1.PAG001.TXTSOL.VALUE = 
                // IIF(!EMPTY(vreng_cac.comentario), 
                // VAL(Thisform.oTmp_cdd("AncSol", vreng_cac.comentario)),
                // IIF(!empty(cTMP_MEM), VAL(Thisform.oTmp_cdd("AncSol", cTMP_MEM)), 
                // VAL(THIS.VALUE))) &&	0.00 

                cadenaResult=cdd(cComentario,"AncSol");
                
                paso=37;
                result=JSON.parse(cadenaResult);
                paso=38;
                if (result[0]=="1"){
                    paso=39;
                    valor=result[1];
                } else {
                    paso=40;
                    valor=0.00;
                }
                paso=41;
                //document.getElementById('txtSol').value=valor;
                setSol(valor);
            } else {
                paso=42;
                //document.getElementById('txtSol').value=anchoBobina;
                setSol(getAnchoIndigo());
            }
        }  else {
            // no hay comentarios
            paso=43;
            //document.getElementById('txtSol').value=anchoBobina;
            setSol(getAnchoIndigo());
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeSelAnchoEtq");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se hace click sobre el select ancho de etiqueta de la indigo */
function clickSelAnchoEtiqueta(){
    console.log ("en desarrollo clickSelAnchoEtiqueta");
}

/*---- esta funcion activa/desactiva los objetos de repetir cotizaciones ----*/
function activaRepetirCotizacion(){
    if (document.getElementById('txtCotizacionOld').disabled==true){
        // los controles estan inactivos, se inactivan
        document.getElementById('txtCotizacionOld').disabled=false;
        document.getElementById('btnSeacrhCotizacionesOld').disabled=false;
    } else{
        // los controles estan activos, se desactivas
        document.getElementById('txtCotizacionOld').disabled=true;
        document.getElementById('btnSeacrhCotizacionesOld').disabled=true;        
    }
}

/*--- esta fucnon se ejecuta cuandp se cambia el ancho de la etiquetas flexo ----*/
// hecho
function changeAncho1(){
    try { 
        console.log ("------------ Entrando a cambio ancho de etiqueta Flexo");
        paso=1;
        ancho=getAnchoFlexo();
        paso=2;
        canales=getCanalesEtiqueta();
        paso=3;
        console.log ("ancho Etiqueta:",ancho);
        paso=4;
        console.log ("canales:",canales);
        paso=5;
        if ((canales !=0) && (ancho !=0.00)){
            paso=6;
            calculos7();
            paso=7;
            calculos21();
            // se asigna el valor al objeto correspondiente en la pagina de resumen
            paso=8;
            setResumenAnchoEtiqueta(ancho);
            //document.getElementById('txtResumenAnchoEtiqueta').value=ancho;
        }
        /*---- original Foxpro---*/
        /*
        HACE EL CALCULO DE ANCHO DE BOBINA	
        WITH THISFORM
            VALIDA CAMPOS OBLIGATORIOS	
            VALIDA QUE EL ANCHO Y CANALES TENGAN DATOS			
            IF THIS.VALUE != 0.00 AND .PAGFR1.PAG001.SPICAN.VALUE # 0.00
                LLAMA AL METODO QUE HACE EL CALCULO	
                .oTMP_CAL(7)
            ENDIF
            
            INVOCA AL METODO	
            bValAux = 0
                .oTMP_CAL(21)
            
            ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	
            .PAGFR1.PAG004.TXTANC.VALUE = THIS.VALUE
        ENDWITH
        */
        console.log ("Fin cambio ancho de etiqueta");
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeAncho1");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }           
}

/*----- esta funcion se activa cuando se cambia el avance de la etiqueta proviente del troquel -----*/
// hecho
function changeAvance(){
    try {
        console.log ("Entrando cambio de Avance");
        paso=1;

        // capturamos la separacion
        separacion=getSeparacionEtiqueta();
        paso=2;
        // capturamos el ancho dependiendo de si ex flexo o indigo
        if (document.getElementById('tipoCotiz0').checked){
            paso=3;
            ancho=getAnchoFlexo();
        } else {
            paso=4;
            ancho=getAnchoIndigo();
        }
        // capturamos el avance
        paso=5;
        avance=getAvanceEtiqueta();

        // capturamos los canales 
        paso=6;
        canales=getCanalesEtiqueta();

        // capturamos el costo del material 
        paso=7;
        costoMaterial=getCostoMaterial();

        // cantidad de etiquetas por rollo
        paso=8;
        cantidadXRollos=getEtiquetasXRollo();

        // capturamos el ancho de bobina
        paso=9;
        anchoBobina=getAnchoBobina();

        // validamos que exista una separacion
        paso=10;
        if (separacion != 0.00){
            paso=11;
            calculos1();
        }

        // validamos que se haya definido un avance y que la cantidad de etiquetas por rollo no este vacia
        paso=12;
        if ((avance != 0.00) && (cantidadXRollos!=0)){
            paso=13;
            calculos5();
        }

        // validamos que el ancho de bobina exista, elavance sea diferenete de 0 y tengamos costo de material
        paso=14;
        if ((avance!=0.00) && (anchoBobina!=0.00) && (costoMaterial!=0.00)){
            paso=15;
            calculos9();
        }

        // asignamos el valor al objeto en la pagina de resumen
        paso=16;
        document.getElementById('txtResumenAvanceEtiqueta').value=avance;

        // validamos si esta seleccionado la opcion de cotizacion indigo
        paso=17;
        if (document.getElementById('tipoCotiz1').checked){
            paso=18;
            cep();
        }    
        paso=19;
        calculos21();
        /*
        original foxpro
        
        /*	CALCULA EL LARGO TOTAL DE LA ETIQUETA	\*
        WITH THISFORM
            /*	VALIDA QUE LA SEPARACION TENGA DATOS	\*			
            IF .PAGFR1.PAG001.SPISEP.VALUE != 0.00 THEN
                /*	LLAMA AL METODO QUE HACE EL CALCULO	\*
                .oTMP_CAL(1)
            ENDIF
            
                /* HACE EL CALCULO DE CANT NUMEROS POR ROLLOS	\*
            /*	VALIDA CAMPOS OBLIGATORIOS	\*
            /*IF .PAGFR1.PAG001.SPIAVA.VALUE != 0.00 AND EMPTY(.PAGFR1.PAG002.TXTEXR.VALUE) = .F. THEN
                
                /*	LLAMA AL METODO QUE HACE EL CALCULO	\*
                .oTMP_CAL(5)
            ENDIF
            
            /*	HACE EL CALCULO DE MATERIAL POR ETIQUETAS	\*
            /*	VALIDA LOS CAMPOS NECESARIOS	\*
            IF (.PAGFR1.PAG001.TXTABO.VALUE) # 0.00 AND ;
                THIS.VALUE != 0.00 AND (.PAGFR1.PAG003.TXTPRM.VALUE) # 0.00
                
                /*	LLAMA AL METODO QUE HACE EL CALCULO	\*
                .oTMP_CAL(9)
            ENDIF
                
            /*	ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
            .PAGFR1.PAG004.TXTAVA.VALUE = THIS.VALUE	
            
            /*	VALIDA SI ESTA SELECCIONADO LA COTIZACION POR LA INDGIGO	\*
            IF .PAGFR1.PAG001.OPTGR1.OPTIND.VALUE = 1 THEN
            
                /*	LLAMA AL METODO QUE HACE EL CALCULO \*
                .oTMP_CEP()
            ENDIF		
            
            /*	INVOCA AL METODO	\*
            bValAux = 0
                .oTMP_CAL(21)
        ENDWITH    
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeAvance");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*---- esta funcion de activa cuando se cambia el valor de los canales del troquel ---------*/
// hecho
function changeCanales(){
    try { 
        console.log ("Entrando cambio de canales");
        paso=1;
        // capturamos los datos del formulario
        // capturamos la cantidad de etiquetas
        cantidadEtiquetas=getCantidadEtiquetas();

        // capturamos la cantidad de canales 
        paso=2;
        canales=getCanalesEtiqueta();

        // capturamos el ancho dependiendo de si ex flexo o indigo
        paso=3;
        if (document.getElementById('tipoCotiz0').checked){
            paso=4;
            ancho=getAnchoFlexo();
        } else {
            paso=5;
            ancho=getAnchoIndigo();
        }

        // capturamos el largo de la etiqueta 
        paso=6;
        largo=getLargoEtiqueta();
        
        // validamos los datos
        paso=7;
        if ((cantidadEtiquetas!=0) && (canales!=0) && (largo!=0)){
            paso=8;
            calculos2();
        }

        paso=9;
        if ((ancho!=0) && (canales!=0)){
            paso=10;
            calculos7();
        }

        paso=11;
        if ((largo!=0) && (cantidadEtiquetas!=0)){
            paso=12;
            calculos5();
        }

        paso=13;
        calculos21();

        // asignamos el calculo a el objeto en resumen
        paso=14;
        document.getElementById('txtResumenCanales').value=canales;

        /*--------- original foxpro -------------*/
        /*/	HACE EL CALCULO DE CMS LINEALES	\*
        WITH THISFORM
            
            /*	VALIDA LOS CAMPOS ANTES DE HACER EL CALCULO	\*
            /*IF EMPTY(.PAGFR1.PAG001.TXTCET.VALUE) = .F. AND .PAGFR1.PAG001.SPICAN.VALUE != 0 AND EMPTY(.PAGFR1.PAG001.TXTTLA.VALUE) = .F. THEN
                
                /*	LLAMA AL METODO QUE HACE EL CALCULO	\*
                .oTMP_CAL(2)
            ENDIF

            *	HACE EL CALCULO DE ANCHO DE BOBINA	\*
            /*	VALIDA CAMPOS OBLIGATORIOS	\*
            /*	COTIZACION FLEXOGRAFICA	\*
            /*	VALIDA QUE ANCHO Y CANALES TENGAN DATOS	\*
            IF (.PAGFR1.PAG001.SPIANC.VALUE != 0.00 OR !EMPTY(.PAGFR1.PAG001.COBANC.VALUE)) ;
                    AND THIS.VALUE != 0 THEN
                
                /*	LLAMA AL METODO QUE HACE EL CALCULO	\*
            //    .oTMP_CAL(7)
            //ENDIF	

            /*	HACE EL CALCULO DE CANT NUMEROS POR ROLLOS	\*
            /*	VALIDA CAMPOS OBLIGATORIOS	\*
            /*IF .PAGFR1.PAG001.TXTTLA.VALUE != 0.00 AND (.PAGFR1.PAG001.TXTCET.VALUE) != 0.00 THEN
                
                *	LLAMA AL METODO QUE HACE EL CALCULO	\*
            //    .oTMP_CAL(5)
            /*ENDIF	
            
            *	INVOCA AL METODO	\*
            /*bValAux = 0
                .oTMP_CAL(21)

            /*	ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
            /*.PAGFR1.PAG004.TXTCAN.VALUE = THIS.VALUE		
            
        ENDWITH */   
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeCanales");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---------- esta funcion se ejectuta cuando se cambia la separacion de la etiqueta -------------*/
// hecho
function changeSeparacion(){
    try {
        // capturamos los datos el formulario
        paso=1;
        avance=getAvanceEtiqueta();

        // capturamos la separacion
        paso=2;
        separacion=getSeparacionEtiqueta();

        // capturamos los canales
        paso=3;
        canales=getCanalesEtiqueta();
        
        // validamos los datos
        paso=4;
        if (avance!=0){
            paso=5;
            calculos1();
        }

        //asignamos el valor al cuadro de resumen
        paso=6;
        setResumenSeparacionEtiqueta(separacion);

        // capturamos el ancho dependiendo de si ex flexo o indigo
        paso=7;
        if (document.getElementById('tipoCotiz0').checked){
            paso=8;
            ancho=getAnchoFlexo();
        } else {
            paso=9;
            ancho=getAnchoIndigo();
        }

        // validamos los datos
        paso=10;
        if ((ancho!=0) && (separacion!=0) && (canales!=0)){
            paso=11;
            calculos7();
        }


        /* original foxpro
            
        //  	CALCULA EL LARGO TOTAL DE LA ETIQUETA	
        //WITH THISFORM
        //    VALIDA QUE EL AVANCE TENGA DATOS	\*			
        //    IF .PAGFR1.PAG001.SPIAVA.VALUE != 0.00 THEN
        //        	LLAMA AL METODO QUE HACE EL CALCULO	\*
        //        .oTMP_CAL(1)
        //    ENDIF
            
        //    	ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
        //    .PAGFR1.PAG004.TXTSEP.VALUE = THIS.VALUE	
            
        //    	HACE EL CALCULO DE ANCHO DE BOBINA	\*
        //    	VALIDA CAMPOS OBLIGATORIOS	\*
        //    	COTIZACION FLEXOGRAFICA	\*
        //    IF .PAGFR1.PAG001.OPTGR1.OPTFLX.VALUE = 1 THEN
                
        //        	VALIDA QUE ANCHO Y CANALES TENGAN DATOS	\*
        //        IF .PAGFR1.PAG001.SPIANC.VALUE != 0.00 AND THIS.VALUE != 0 AND .PAGFR1.PAG001.SPICAN.VALUE # 0 THEN
                    
        //            	LLAMA AL METODO QUE HACE EL CALCULO	\*
        //            .oTMP_CAL(7)
        //        ENDIF	
        //    ELSE
        //        	VALIDA QUE EL ANCHO Y CANALES TENGAN DATOS	\*				
        //        IF EMPTY(.PAGFR1.PAG001.COBANC.VALUE) = .F. AND THIS.VALUE != 0 AND .PAGFR1.PAG001.SPICAN.VALUE # 0 THEN
                    
        //            	LLAMA AL METODO QUE HACE EL CALCULO	\*
        //            .oTMP_CAL(7)
        //        ENDIF
        //    ENDIF
                    
        //ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeSeparacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*----------- esta funcion se ejecuta cuando se cambia la repeticion del troquel -----------------------*/
// hecho
function changeRepeticionTroquel(){
    try{ 
        paso=1;
        calculos21();
        /*
        original foxpro


        *{	Asigna el valor a la variable	}*
        nVarRep = This.Value
        bValAux = 0
        Thisform.oTMP_CAL(21)
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeRepeticionTroquel");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      

}

/**--------  esta funcion se invoca cuando cambia la cantidad de etiquetas*/
function changeCantidadEtiquetas(){
    try {

        console.log ("Entrando a changeCantidadEtiquetas");
        // capturamos cantidad de etiquetas
        paso=1;
        cantidadEtiquetas=getCantidadEtiquetas();

        // capturamos los canales
        paso=2;
        canales=getCanalesEtiqueta();

        // capturamos el largo de la etiqueta
        paso=3;
        largoEtiquetas=getLargoEtiqueta();

        //capturamos las etiquetas por rollo
        paso=4;
        etiquetasPorRollo=getEtiquetasXRollo();

        // capturamos el costo del material
        paso=5;
        costoTotalMaterial=getCostoTotalMaterial();

        // capturamos costo de transporte
        paso=6;
        costoTransporte=getCostoTransporte();

        // capturamos costo de mano de obra
        paso=7;
        costoManoObra=getCostoManoObra();

        // validamos los datos 
        paso=8;
        if ((cantidadEtiquetas!=0) && (canales!=0) && (largoEtiquetas!=0.00)){
            paso=9;
            calculos2();
        }

        // validamos los datos
        paso=10;
        if ((etiquetasPorRollo !=0) && (canales != 0) && (cantidadEtiquetas!=0)){
            paso=11;
            calculos4();
        }

        // validamos los datos 
        paso=12;
        if ((cantidadEtiquetas !=0) && (costoTotalMaterial!=0.00 )){
            paso=13;
            calculos15();
        }
        
        paso=14;
        if ((costoTotalMaterial !=0) && (costoTransporte!=0) && (costoManoObra!=0) && (cantidadEtiquetas !=0)){
            paso=15;
            calculos14();
        }
        cVarCantRol=0;
        cVarTip="";

        cVarTip=getCbbTip();
        /*
        <option value='1'>Etiquetas</option>
        <option value='2'>Rollos</option>
        <option value='3'>Hojas</option>
        <option value='4'>Millar</option>
        */
        if ((cVarTip=="2") || (cVarTip="3")){
            //cVarCantRol=cantidadEtiquetas/etiquetasXRollo;
            cVarCantRol=cantidadEtiquetas/etiquetasPorRollo;
            setCantrol(cVarCantRol);
        }

        // asginamos el valor al objeto correspondiente en la seccion de resumen
        paso=16;
        setResumenCantidadEtiqueta(cantidadEtiquetas);
        
        /*

        original foxpro
            /*	HACE EL CALCULO DE CMS LINEALES	
            WITH THISFORM
                    VALIDA LOS CAMPOS ANTES DE HACER EL CALCULO	\*
                IF EMPTY(.PAGFR1.PAG001.TXTCET.VALUE) = .F. AND .PAGFR1.PAG001.SPICAN.VALUE != 0 AND EMPTY(.PAGFR1.PAG001.TXTTLA.VALUE) = .F. THEN
                        LLAMA AL METODO QUE HACE EL CALCULO	
                    .oTMP_CAL(2)
                ENDIF
                    METODO QUE HACE EL CALCULO DE CANT CORES	\*
                    VALIDA LOS CAMPOS OBLIGATORIOS	\*
                IF EMPTY(.PAGFR1.PAG002.TXTEXR.VALUE) = .F. AND ;
                EMPTY(THIS.VALUE) = .F. AND .PAGFR1.PAG002.SPICAN.VALUE != 0 THEN
                        LLAMA AL METODO QUE HACE EL CALCULO	\*
                    .oTMP_CAL(4)
                ENDIF
                    HACE EL CALCULO DE COSTO DE ETQ	\*
                    VALIDA LOS CAMPOS NECESARIOS	\*
                IF EMPTY(THIS.VALUE) = .F. AND EMPTY(.PAGFR1.PAG003.TXTPFM.VALUE) THEN
                        LLAMA AL METODO QUE HACE EL CALCULO	\*
                    .oTMP_CAL(15)
                ENDIF			
                    HACE EL CALCULO DE SUMA DE COSTOS	\*
                        VALIDA LOS CAMPOS NECESARIOS	\*	
                IF EMPTY(.PAGFR1.PAG003.TXTPFM.VALUE) = .F. AND EMPTY(.PAGFR1.PAG003.TXTCDT.VALUE) = .F. AND ;
                    EMPTY(.PAGFR1.PAG003.TXTCMO.VALUE) = .F. AND EMPTY(.PAGFR1.PAG001.TXTCET.VALUE) = .F. THEN
                        LLAMA AL METODO QUE HACE EL CALCULO	\*
                    .oTMP_CAL(14)
                ENDIF
                    ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
                .PAGFR1.PAG004.TXTETQ.VALUE = THIS.VALUE
            ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeCantidadEtiquetas");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}


/**--------  esta funcion se invoca cuando cambia el procentaje de seguridad de las etiquetas --------------*/
function changePorcentajeSeguridad(){
    try {
        // capturamos los cms lineales
        cmsLineales=getCmsLineales();

        // capturamos el porcentaje de seguridad
        porcentajeSeguridad=getPorcentajeSeguridad();

        // validamos los datos 
        if ((cmsLineales !=0.00) && (porcentajeSeguridad!=0.00)){
            calculos3();
        } 

        /*
        Original Foxpro
			HACE EL CALCULO DE CMS LINEALES TOTALES	\*
		WITH THISFORM
					VALIDA LOS CAMPOS NECESARIOS PARA REALIZAR EL CALCULO	\*
				IF (.PAGFR1.PAG001.TXTCMS.VALUE) # 0.00 AND THIS.VALUE # 0.00
						LLAMA AL METODO QUE HACE EL CALCULO	\*
					.oTMP_CAL(3)
				ENDIF
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeProcentajeSeguridad");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}

/**--------  esta funcion se invoca cuando cambia el ancho de bobina --------------*/
function changeAnchoBobina(){
    try {
        console.log ("entrando changeAnchoBobina");
        paso=1;
        // capturamos los metros lineales
        metrosLineales=getMtrsLineales();
        paso=2;
        calculos8();

        // capturamos el avance de la etiqueta
        paso=3;
        avanceEtiqueta=getAvanceEtiqueta();

        // capturamos el precio el material
        paso=4;
        costoMaterial=getCostoMaterial();

        // validamos los datos
        paso=5;
        if ((avanceEtiqueta!=0.00) && (costoMaterial!=0.00)){
            paso=6;
            calculos9();
        }

        // capturamos el ancho de la etiqueta
        paso=7;
        anchoEtiqueta=getAnchoFlexo();

        // capturamos el ancho de la bobina
        paso=8;
        anchoBobina=getAnchoBobina();

        // validamos los datos 
        paso=9;
        if ((anchoEtiqueta!=0.00) && (anchoBobina!=0.00)){
            paso=10;
            calculos9();
        }

        // validamos si hay desperdicio
        paso=11;
        checkDesperdicio=getAsumirDesperdicio();

        // validamos los datos 
        paso=12;
        if ((checkDesperdicio==true) && (anchoBobina!=0.00)){
            paso=13;
            nTMP_DIF=anchoEtiqueta-anchoBobina;
            
            // asignamos el valor al objeto del formulario
            paso=14;
            setDifAncho(nTMP_DIF);
        }
        // actualizamos el control de costos
        paso=15;
        //setCostoAnchoBobina(anchoBobina);
        //changeCostoAnchoBobina();
        /*
        Original Foxpro
			HACE EL CALCULO DE MTS 2 BOBINA	\*
				VALIDA CAMPOS NECESARIOS	\*
			IF (THISFORM.PAGFR1.PAG001.TXTMTL.VALUE) # 0.00
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				THISFORM.oTMP_CAL(8)
			ENDIF
				HACE EL CALCULO DE COSTO MATERIAL X ETQ	\*
				VALIDA LOS CAMPOS NECESARIOS	\*
			IF THISFORM.PAGFR1.PAG001.SPIAVA.VALUE # 0.00 AND (THISFORM.PAGFR1.PAG003.TXTPRM.VALUE) # 0.00
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				THISFORM.oTMP_CAL(9)
			ENDIF
				HACE EL CALCULO DEL DESPERDICIO DE BOBINA ADICIONAL	\*
				VALIDA LOS DATOS NECESARIOS	\*
			IF this.Value # 0.00 AND THISFORM.PAGFR1.PAG003.CHKDES.VALUE = 0 
					HACE EL CALCULO A VER SI HAY DIFERENCIA DE ANCHO DE BOBINA	\*
				nTMP_DIF = THISFORM.PAGFR1.PAG003.TXTANC.VALUE - THISFORM.PAGFR1.PAG001.TXTABO.VALUE
					DIFERENCIA POR ANCHO DE BOBINA	y ejecuta el cal(20) cuando cambia el valor del control	\*
				THISFORM.PAGFR1.PAG003.TXTDIF.VALUE = nTMP_DIF
			ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeAnchoBobina");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}

/* esta funcion se ejecuta cuando se cambia el largo de la etiqueta ----*/
function changeLargoEtiqueta(){
    try {

        console.log ("Entrando changeLargoEtiqueta");
        paso=1;
        // capturamos la cantidad de etiquetas
        cantidadEtiquetas=getCantidadEtiquetas();

        // capturamos los canales
        paso=2;
        canales=getCanalesEtiqueta();

        // capturamos el largo de la etiqueta
        paso=3;
        largoEtiquetas=getLargoEtiqueta();

        // validamos los datos
        paso=4;
        if ((cantidadEtiquetas!=0) && (canales!=0)){
            paso=5;
            calculos2();
        }

        // validamos los datos
        paso=6;
        if ((largoEtiquetas!=0.00) && (cantidadEtiquetas!=0)){
            paso=7;
            calculos5();
        }

        // aplicamos calculos finales
        paso=8;
        calculos21();

        /*
        Original Foxpro
			METODO QUE HACE EL RECALCULO DE CMTS LINEANES	\*
		WITH THISFORM
				VALIDA CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG001.TXTCET.VALUE) = .F. AND .PAGFR1.PAG001.SPICAN.VALUE != 0 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(2)
			ENDIF
				HACE EL CALCULO DE CANT NUMEROS POR ROLLOS	\*
				VALIDA CAMPOS OBLIGATORIOS	\*
			IF .PAGFR1.PAG001.TXTTLA.VALUE != 0.00 AND (.PAGFR1.PAG001.TXTCET.VALUE) != 0.00 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(5)
			ENDIF	
			.oTMP_CAL(21)
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeLargoEtiqueta");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/* esta funcion se ejecuta cuando se cambia los cms lineales ----*/
function changeCmsLineales(){
    try {
        console.log ("Entrando a changeCmsLineales");
        paso=1;
        // capturamos el procentaje de seguridad
        porcentajeSeguridad=getPorcentajeSeguridad();
        
        // validamos los datos
         paso=2;
        if (porcentajeSeguridad!=0.00){
             paso=3;
            calculos3();
        }
        /* 
        original foxpro
		
		METODO QUE HACE EL CALCULO DE CMTS TOTAL	\*
		WITH THISFORM
			VALIDA CAMPOS NECESARIOS	\*
			IF .PAGFR1.PAG001.TXTPSE.VALUE # 0.00
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(3)
			ENDIF
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeCmsLineales");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}


/* esta funcion se ejecuta cuando se cambia los cms lineales totales ----*/
function changeCmsLinealesTotales(){
    try {
        console.log ("Entrando a changeCmsLinealesTotales");
        calculos6();
        
        /*
        original foxpro
		HACE EL CALCULO DE MTS LINEALES	\*
		WITH THISFORM
				LLAMA AL METODO QUE HACE EL CALCULO	\*
			.oTMP_CAL(6)
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeCmsLinealesTotales");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*----- esta funcion se ejecuta cuando cambian los cms 2 de clishe ----*/
function changeCms2Clishe(){
    try {
        console.log ("Entrando a changeCms2Clishe");
        paso=1;
        // nTMP_PrecioClishe es una constante del sistema que proviene del archivo services.yaml
        // y pasa a la pagina mediante el controlador

        precioClishe=nTMP_PrecioClishe;
        paso=2;
        setPrecioClishe(precioClishe)
        /*
        original foxpro
        // 	thisform.precioCliche(this.Value, 1)
        LPARAMETERS nCentimetrosCliche, nOpcion
        
        LOCAL nVarAux, cVarAux, nPrecioClicheDolar
        *nPrecioClicheDolar = 0.047549  && Precio en dolar del CM2 del cliche
        nPrecioClicheDolar = 0.09  && Precio en dolar del CM2 del cliche actualizacio el 2025-04-01
        nVarAux = 0
        cVarAux = ""
        *	Busca el cambio del dolar
        cTMP_SQL = ""
        cTMP_SQl = cTMP_SQL + " select cambio from moneda where co_mone = '$$$'"
        
        *	Evalua la instrucción 
        IF SQLEXEC(Tconnect, cTMP_SQL, "vCurAux") <= 0
            MESSAGEBOX("Error al ejecutar Instrucción SQL", 0+48, cTMP_TIT)
            bValAux = 0
            RETURN .F.
        ELSE	
            *	valida los datos obtenido	
            IF RECCOUNT("vCurAux") = 0
                MESSAGEBOX("No se encuentra el cód. $$$", 0 + 48, cTMP_TIT)
                bValAux = 0
                RETURN .f. 
            ENDIF 
        ENDIF 
            
        * caso principal
        IF nOpcion = 1	
            * modificado el 2025-04-01
            * se elimina la consulta de costo en dolares por que se aume que ya todos los precios estàn en dolares
            *nVarAux = ROUND(((nCentimetrosCliche * nPrecioClicheDolar) * vCurAux.cambio), 0)
            nVarAux = ROUND(((nCentimetrosCliche * nPrecioClicheDolar) ), 0)
            IF (nVarAux < 50)
                nVarAux=50
            endif
            Thisform.PagFr1.Pag003.txtPcl.Value = nVarAux
            bValAux = 1

        ENDIF         
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeCms2Clishe");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}


/**---------- esta funcion se ejecuta cuando cambian los metros lineales */
function changeMetrosLineales(){
    try {
        console.log ("Entrando a changeMetrosLineales");
        paso=1;
        //capturamos el ancho de la bobina
        anchoBobina=getAnchoBobina();

        // validamos los datos
        paso=2;
        if (anchoBobina!=0.00){
            paso=3;
            calculos8();
        }
        /*
        original foxpro
			HACE EL RECALCULO DE MT2 DE ETIQUETAS	\*
		WITH THISFORM
				HACE EL CALCULO DE MTS 2 DE BOBINA	\*
				VALIDA EL CAMPO OBLIGATORIO	\*
			IF EMPTY(.PAGFR1.PAG001.TXTABO.VALUE) = .F. THEN
					LLAMA AL METODO QUE CALCULA	\*	
				.oTMP_CAL(8)
			ENDIF
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeMetrosLineales");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/**---------- esta funcion se ejecuta cuando cambian los metros cuadrados de bobina */
function changeMtrs2Bobina(){
    console.log ("No tiene funcion en profit");
}
/*-------- esta funcion se ejecuta cuando cambian los metros cuadrados de etiquetas  ------------*/
function changeMtrs2Etiqueta(){
    try {
        console.log ("entrando changeMtrs2Etiqueta");
        paso=1;
        var precioMaterial=0.00;
        paso=2;
        var mtrs2Etiquetas=0.00;

        // asignamos el color blanco al objeto
        paso=3;
        document.getElementById('txtMtrs2Etiqueta').style.backgroundColor='#FFFFFF';
        paso=4;
        document.getElementById('txtMtrs2Etiqueta').style.color='#000000';        

        // capturamos los datos mtrs2Etiqueta
        paso=5;
        mtrs2Etiquetas=getMtrs2Etiquetas();

        // validamos los datos para reasignar el color
        paso=6;
        if ((mtrs2Etiquetas<100) && (mtrs2Etiquetas != 0.00)){
            paso=7;
            // asignamos el color rojo al objeto
            document.getElementById('txtMtrs2Etiqueta').style.backgroundColor='#dc3545';
            paso=8;
            document.getElementById('txtMtrs2Etiqueta').style.color='#FFFFFF';

        } else {
            // asigamos el color blanco al objeto
            paso=9;
            document.getElementById('txtMtrs2Etiqueta').style.backgroundColor='#FFFFFF';
            paso=10;
            document.getElementById('txtMtrs2Etiqueta').style.color='#000000';
        }

        // capturamos el precio del material
        paso=11;
        precioMaterial=getCostoMaterial();

        // validamos los datos
        paso=12;
        if (precioMaterial!=0.00){
            paso=13;
            calculos10();
        }
        /*
        original foxpro
		IF this.Value < 100 AND this.Value # 0
			This.DisabledBackColor = RGB(255,0,0)
		ELSE
			This.DisabledBackColor = RGB(255,255,255)
		ENDIF 
		HACE EL CALCULO DEL PRECIO TOTAL DEL MATERIAL	\*
		WITH THISFORM
			VALIDA CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG003.TXTPRM.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(10)
			ENDIF
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeMtrs2Etiqueta");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/*--------------- esta funcion se ejecuta cuando se cambia el cbbTip ------*/
function changeCbbTip(){
    try {
        console.log ("entrando a changeCbbTip");
        paso=1;
        cbbTipV=getCbbTip();
        /*
        <select id='cbbTip' name='cbbTip' class="form-control-sm" style='width:95% !important' onchange="javascript:changeCbbTip()">
            <option value='1'>Etiquetas</option>
            <option value='2'>Rollos</option>
            <option value='3'>Hojas</option>
            <option value='4'>Millar</option>
        </select>
        */
        if (cbbTipV=="2"){
            document.getElementById('labelTxtSol').innerHTML="Avance en Mts.:";
            document.getElementById('labelTxtSol').style.visibility="block";
            document.getElementById('txtSol').style.visibility="block";
        } else {
            if (getTipoCotizacion()==1){
                document.getElementById('labelTxtSol').innerHTML="Ancho Sol.:";
                document.getElementById('labelTxtSol').style.visibility="block";
                document.getElementById('txtSol').style.visibility="block";                
            } else {
                document.getElementById('labelTxtSol').innerHTML="Ancho Sol.:";
                document.getElementById('labelTxtSol').style.visibility="hidden";
                document.getElementById('txtSol').style.visibility="hidden";                
            }
            
        }
        /*
        original foxpro
        si presionan la opcion de Rollos se habilita el control	\*
        IF UPPER(this.Value) = "ROLLOS"
            thisform.pagFr1.pag001.label3.Caption = "Avance en Mts.:"
            thisform.pagFr1.pag001.label3.Visible = .t.
            thisform.pagFr1.pag001.txtsol.Visible = .t.
        ELSE
            IF THISFORM.PAGFr1.PAg001.OPTGR1.OPTIND.VALUE = 1 
                thisform.pagFr1.pag001.label3.Caption = "Ancho Sol.:"
                thisform.pagFr1.pag001.label3.Visible = .T.
                thisform.pagFr1.pag001.txtsol.Visible = .T.
            ELSE
                thisform.pagFr1.pag001.label3.Caption = "Ancho Sol.:"
                thisform.pagFr1.pag001.label3.Visible = .F.
                thisform.pagFr1.pag001.txtsol.Visible = .F.
            ENDIF 
        ENDIF 
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCbbTip");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }          
}

/*-------- esta funcion se ejecuta cuando cambian los metros cuadrados de etiquetas  ------------*/
function changeChkRedondas(){
    try {
        console.log ("entrando a changeChkRedondas");
        paso=1;
        var codigoTroquelSuperficie="";
        paso=2;
        var numTroquel="";
        paso=3;
        var inicialTroquel="";
        paso=4;
        var tipoCotizacion=0;
        paso=5;
        var tipoTroquel="";
        paso=6;
        var redondas=false;
        paso=7;
        var cadenaTroquel="";

        // capturamos el codigo del troquel de superficie
        paso=8;
        codigoTroquelSuperficie=getCodigoTroquelSuperficie();

        // capturamos la numeracion del troquel
        paso=9;
        numTroquel=codigoTroquelSuperficie.replace("R-", "");

        // capturamos la incial del troquel
        paso=10;
        inicialTroquel=codigoTroquelSuperficie[0];

        // capturamos el tipo de troquel
        paso=11;
        tipoTroquel=getTipoTroquel();        
        
        // determinamos si son etiquetas redondas
        paso=12;
        redondas=getEtiquetasRedondas();
        if (redondas == true){
            paso=13;
            // determinamos que tipo de cotizacion es Flexo o Indigo
            tipoCotizacion=getTipoCotizacion();
            paso=14;
            if (tipoCotizacion==1){
                paso=15;
                // es cotizacion flexo
                if (tipoTroquel=="fisico"){
                    paso=16;
                    if (inicialTroquel!="R"){
                        paso=16;
                        msgError("Seleccione un troquel redondo");
                    } else{
                        // deseleccionamos el objeto
                        paso=17;
                        document.getElementById('chkRedondas').checked=false;
                    }
                } else {
                    paso=18;
                    // asignamos el codigo del troquel al objeto
                    cadenaTroquel="R-"+numTroquel;
                    paso=19;
                    setCodigoTroquelSuperficie( cadenaTroquel);
                }
            } else {
                // es cotizacion indigo
                paso=20;
                if (tipoTroquel=="fisico"){
                    paso=21;
                    if (inicialTroquel!="R"){
                        paso=22;
                        msgError("Seleccione un troquel redondo");
                    } else{
                        // deseleccionamos el objeto
                        paso=23;
                        document.getElementById('chkRedondas').checked=false;
                    }
                } else {
                    // asignamos el codigo del troquel al objeto
                    paso=24;
                    cadenaTroquel="R-"+numTroquel;
                    paso=25;
                    setCodigoTroquelSuperficie( cadenaTroquel);
                }                
            }
        } else {
            // se asigna el codigo del troquel al troquel de superficie
            paso=26;
            setCodigoTroquelSuperficie(numTroquel);            
        }
        /*
        original foxpro
        LOCAL cVarAux 
        cVarAux = STRTRAN(thisform.pagFr1.pag001.TxtCtr.value, "R-", "")		&&	Asigna el valor del troquel	&&
        WITH thisform.pagFr1.pag001
            IF THIS.Value = 1
            *{	Evalua los datos para que sea redonda	}*
                DO CASE 
                    *{	Flexografica	}*
                    CASE .OptGr1.OptFlx.value = 1
                        *{	Evalua el tipo de troquel	}*
                        DO CASE 
                            *{	Troquel fisico	}*
                            CASE .OptGr2.Opt001.value = 1 
                                *{	Valida que el troquel seleccionado sea redondo	}*
                                IF LEFT(.TxtCtr.value, 1) # "R"
                                    *{	Mensaje de sistema	}*
                                    MESSAGEBOX("Seleccione un troquel redondo", 0 + 48, cTMP_TIT)
                                ELSE
                                    *{	Desselecciona el control	}*
                                    This.Value = 0
                                ENDIF 
                            *{	Cualquier otro	}*
                            OTHERWISE 
                                *{	Asigna el valor }*
                                .TxtCtr.value = "R-" + cVarAux
                        ENDCASE 
                    *{	Laser	}*
                    CASE .OptGr1.OptInd.value = 1
                        *{	Evalua el tipo de troquel	}*
                        DO CASE 
                            *{	Troquel fisico	}*
                            CASE .OptGr2.Opt001.value = 1 
                                *{	Valida que el troquel seleccionado sea redondo	}*
                                IF LEFT(.TxtCtr.value, 1) # "R"
                                    *{	Mensaje de sistema	}*
                                    MESSAGEBOX("Seleccione un troquel redondo", 0 + 48, cTMP_TIT)
                                ELSE
                                    *{	Desselecciona el control	}*
                                    This.Value = 0
                                ENDIF 
                            *{	Cualquier otro	}*
                            OTHERWISE 
                                *{	Asigna el valor }*
                                .TxtCtr.value = "R-" + cVarAux
                        ENDCASE 
                ENDCASE 
            ELSE
                *{	Asigna el valor }*
                .TxtCtr.value = cVarAux
            ENDIF 
        ENDWITH 
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo changeChkRedondas");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}


/*------ esta funcion se ejecuta cuando cambia las repeticiones en un Troquel Nuevo  ----------*/
function changeRepeticionesNuevo(){
    try {
        console.log ("entrando a changeRepeticionesNuevo");
        paso=1;
        calculos21();

        /*
        original foxpro 
		nVarRep = this.Value
		bValAux = 0
		THISFORM.oTMP_CAL(21)
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePresentacionPaquetes");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/**********************************************************************/
/* funciones de cambio de la division Presentacion                    */
/**********************************************************************/

/*-------- esta funcion se ejecuta cuando cambia la presentacion a Rollos  ------------*/
function changePresentacionRollos(){
    try {
        console.log ("Entrando a changePresentacionRollos");
        paso=1;
        // sa cambia el enunciado de la etiqueta
        document.getElementById('lblExR').innerHTML="Cant. por Rollos";
        
        // se inicializa el control de dobladas cada
        paso=2;
        setDobladasCada(0);

        // se deshabilita el control dobladas cada
        paso=3;
        setDisabledDobladasCada();

        /*
        original foxpro 
		THISFORM.PAGFR1.PAG002.LBLEXR.CAPTION = "Cant. por " + THIS.CAPTION
		HABILITA EL CONTROL	\*
		THISFORM.PAGFR1.PAG002.TXTDOB.VALUE = 0
		THISFORM.PAGFR1.PAG002.TXTDOB.ENABLED = .F.
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePresentacionRollos");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/*-------- esta funcion se ejecuta cuando cambia la presentacion por paquetes  ------------*/
function changePresentacionPaquetes(){
    try {
        console.log ("Entrando a changePresentacionPaquetes");
        paso=1;
        // sa cambia el enunciado de la etiqueta
        document.getElementById('lblExR').innerHTML="Cant. por Paquetes";
        
        // se deshabilita el control dobladas cada
        paso=2;
        setEnabledDobladasCada();

        /*
        original foxpro 
		THISFORM.PAGFR1.PAG002.LBLEXR.CAPTION = "Cant. por " + THIS.CAPTION
		HABILITA EL CONTROL	\*
		THISFORM.PAGFR1.PAG002.TXTDOB.ENABLED = .T.
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePresentacionPaquetes");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/*------ esta funcion se ejecuta cuando cambia la cantidad por presentacion ----*/
function changeCantidadxRollos(){
    try {
        console.log ("Entrando a changeCantidadxRollos");
        paso=1;
        // capturamos la cantidad de etiquetas
        cantidadEtiquetas=getCantidadEtiquetas();

        // capturamos los canales a despachar
        paso=2;
        canalesDespachar=getCanalesDespachar();

        // capturamos el largo de las etiquetas
        paso=3;
        largoEtiquetas=getLargoEtiqueta();

        // capturamos la cantidad por presentacion
        paso=4;
        cantidadEtiquetasxRollo=getEtiquetasXRollo();

        paso=5;
        tipoPresentacion=getCbbTip();

        paso=6;
        presentacionV=getTipoPresentacion();

        // validamos los datos
        paso=7;
        if ((cantidadEtiquetas!=0) && (canalesDespachar!=0) && (cantidadEtiquetasxRollo!=0)){
            paso=8;
            // calcula la cantidad de cores
            calculos4();
        }

        // validamos los datos
        paso=9;
        if ((largoEtiquetas!=0.00) && (cantidadEtiquetasxRollo!=0)){
            paso=10;
            calculos5();
        }

        // validamos los datos referentes a cotizacion vs presentacion
        paso=11;
        console.log ("entrando a cantrol");
        console.log ("tipoPresentacion",tipoPresentacion);
        console.log ("presentacionV",presentacionV);

        // capturamos el tipo de impresion
        /*
        <option value='1'>Etiquetas</option>
        <option value='2'>Rollos</option>
        <option value='3'>Hojas</option>
        <option value='4'>Millar</option>

        if (document.getElementById('radioPresentacion0').checked){
            return ('rollo');
        } else {
            return ('paqueta');   
        }        
        */
        console.log ("cantidad por rollos ")
        if ((tipoPresentacion=="1") && (presentacionV=="rollo")){
            // Etiquetas - Rollo
            paso=12;
            console.log ("Etiquetas - Rollo");
            // asignamos el resultado al control
            nTemp=cantidadEtiquetas / cantidadEtiquetasxRollo;
            console.log (`resultado del calculo: ${cantidadEtiquetas} / ${cantidadEtiquetasxRollo}`,nTemp);
            paso=13;
            setCantrol(nTemp);
        } else if  ((tipoPresentacion=="3") && (presentacionV=="paquete")){
            // Hojas - Paquete
            console.log ("Hojas - Paquete");
            paso=14;
            // asignamos el resultado al control
            nTemp=cantidadEtiquetas / cantidadEtiquetasxRollo;
            console.log (`resultado del calculo: ${cantidadEtiquetas} / ${cantidadEtiquetasxRollo}`,nTemp);
            paso=15;
            setCantrol(nTemp);
        } else if  ((tipoPresentacion=="4") ){
            // Millar
            console.log ("Millar");
            paso=16;
            // asignamos el resultado al control
            nTemp=cantidadEtiquetas / 1000;
            console.log (`resultado del calculo: ${cantidadEtiquetas} / 1000`,nTemp);
            paso=17;
            setCantrol(nTemp);
        } else if (((tipoPresentacion=="2") && (presentacionV!="rollo")) || ((tipoPresentacion=="3") && (presentacionV!="paquete"))){
            // si es Hoja y Diferente de Paqueta
            // o 
            // si es Rollo y Diferente de Rollo
            // mensaje de error
            console.log ("cantrol 4");
            paso=18;
            msgError("El tipo de cotización presenta inconsistencia con el tipo de presentación <br>Por favor verifique los datos sumnistrados");
        }
        
        console.log ("saliendo de control");

        // se asigna el valor al cuadro de resumen
        paso=19;
        setResumenCantidadPorPresentacion(cantidadEtiquetasxRollo);
        /*
        original foxpro 
			*METODO QUE HACE EL CALCULO DE CANT CORES	\*
			*VALIDA LOS CAMPOS OBLIGATORIOS	\*
			IF THISFORM.PAGFR1.PAG001.TXTCET.VALUE # 0 AND ;
			   THIS.VALUE # 0 AND THISFORM.PAGFR1.PAG002.SPICAN.VALUE != 0 THEN
				*LLAMA AL METODO QUE HACE EL CALCULO	\*
				THISFORM.oTMP_CAL(4)
			ENDIF
			*HACE EL CALCULO DE CANT NUMEROS POR ROLLOS	\*
			*VALIDA CAMPOS OBLIGATORIOS	\*
			IF THISFORM.PAGFR1.PAG001.TXTTLA.VALUE != 0.00 AND (THISFORM.PAGFR1.PAG001.TXTEXR.VALUE) != 0.00 THEN
				*LLAMA AL METODO QUE HACE EL CALCULO	\*
				THISFORM.oTMP_CAL(5)
			ENDIF	
			DO CASE
				CASE (left(THISFORM.PAGFR1.PAG001.CBBTIP.VALUE,1) = "R") AND (THISFORM.PAGFR1.PAG002.OPTGR1.OPTROL.VALUE = 1)
					THISFORM.PAGFR1.PAG002.TXTCANTROL.VALUE = (THISFORM.PAGFR1.PAG001.TXTCET.VALUE / THIS.VALUE)
				CASE (left(THISFORM.PAGFR1.PAG001.CBBTIP.VALUE, 1) = "H") AND (THISFORM.PAGFR1.PAG002.OPTGR1.OPTPAQ.VALUE = 1)
					THISFORM.PAGFR1.PAG002.TXTCANTROL.VALUE = (THISFORM.PAGFR1.PAG001.TXTCET.VALUE / THIS.VALUE)
				CASE left(.PAGFR1.PAG001.CBBTIP.VALUE, 1) = "M"
					THISFORM.PAGFR1.PAG002.TXTCANTROL.VALUE = (THISFORM.PAGFR1.PAG001.TXTCET.VALUE / 1000)
				CASE (left(THISFORM.PAGFR1.PAG001.CBBTIP.VALUE,1) = "R") AND (THISFORM.PAGFR1.PAG002.OPTGR1.OPTROL.VALUE # 1) 
                OR (left(THISFORM.PAGFR1.PAG001.CBBTIP.VALUE, 1) = "H") AND (THISFORM.PAGFR1.PAG002.OPTGR1.OPTPAQ.VALUE # 1)
					MESSAGEBOX( " El tipo de cotización " + ALLTRIM(THISFORM.PAGFR1.PAG001.CBBTIP.VALUE) + " presenta inconsistencia con el tipo de presentación " + CHR(13) + ;
										"                  por favor verifique los datos suministrados ", 0 + 48, cTMP_TIT)
			ENDCASE
			*ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
			THISFORM.PAGFR1.PAG004.TXTPRE.VALUE = THIS.VALUE
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCantidadxRollos");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/*------------- esta funcion se ejecuta cuando dambian los canales a despachar --------------*/
function changeCanalesADespachar(){
    try {
        console.log ("Entrando a changeCanalesADespachar");
        paso=1;

        /* METODO QUE HACE EL CALCULO DE CANT CORES	*/
        // capturamos los canales a despachar
        canalesADespachar=getCanalesDespachar();

        // capturamos la cantidad de etiquetas
        paso=2;
        cantidadEtiquetas=getCantidadEtiquetas();

        // capturamos la eetiquetas por rollos
        paso=3;
        cantidadEtiquetasxRollo=getCantNPresentacion();

        // cpatumaos el lago de la etiqueta
        paso=4;
        largoEtiquetas=getLargoEtiqueta();


        // validamos los datos
        paso=5;
        if ((canalesADespachar!=0) && (cantidadEtiquetas!=0) && (cantidadEtiquetasxRollo!=0)){
            paso=6;
            calculos4();
        }

        /*	HACE EL CALCULO DE CANT NUMEROS POR ROLLOS	*/
        // validamos los datos
        paso=7;
        if ((largoEtiquetas!=0) && (cantidadEtiquetasxRollo!=0)){
            paso=8;
            calculos5();
        }
        paso=9;
        setResumenCantidadADespachar(canalesADespachar);

        /*
        original foxpro 
		METODO QUE HACE EL CALCULO DE CANT CORES	
		WITH THISFORM
			VALIDA LOS CAMPOS OBLIGATORIOS	\*
			IF (.PAGFR1.PAG002.TXTEXR.VALUE) != 0 AND ;
			   (.PAGFR1.PAG001.TXTCET.VALUE) != 0.00 AND THIS.VALUE != 0 THEN
				
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(4)
			ENDIF
			HACE EL CALCULO DE CANT NUMEROS POR ROLLOS	\*
			VALIDA CAMPOS OBLIGATORIOS	\*
			IF .PAGFR1.PAG001.TXTTLA.VALUE != 0.00 AND (.PAGFR1.PAG001.TXTEXR.VALUE) != 0.00 THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(5)
			ENDIF	
			ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
			.PAGFR1.PAG004.TXTCAD.VALUE = THIS.VALUE
		ENDWITH	
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCanalesADespachar");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/*----- esta función permite cambiar los cores -------------*/
function changeCantidadCores(){
    try {
        console.log ("Entrando a changeCantidadCores");
        paso=1;
		/* HACE EL CALCULO DEL PRECIO DE ETIQUETA	*/
        cantidadCores=getCantidadCores();

        // capturamos el factor
        paso=2;
        factor=getFactor();

        // validamos los dados
        paso=3;
        if (factor!=0.00){
            paso=4;
            calculos17();
        }
        paso=5;
        setResumenCantidadCores(cantidadCores);
        /*
        original foxpro 
		HACE EL CALCULO DEL PRECIO DE ETIQUETA	\*
		WITH THISFORM
			VALIDA CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG003.TXTFAC.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(17)
			ENDIF
			
			ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
			.PAGFR1.PAG004.TXTCCO.VALUE = THIS.VALUE
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCantidadCores");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

/*------ esta funcion permite activar la etiqueta nueva ------*/
function clickTipoEtiquetaNueva(){
    try {
        console.log ("Entrando a clickTipoEtiquetaNueva");
        paso=1;
        // establecemos el porcentaje de transporte
        setPorcentajeTransporte(10.00);

        // establecemos el porcentaje de mano de obra
        paso=2;
        setPorcentajeManoObra(15.00);

        // activamos los objetos de Arte en LAN
        paso=3;
        activaArteRedLan();

        // activamos el objeto leavntar arte
        paso=4;
        activaLevantarArte();

        // capturamos el ancho de la bobina
        paso=5;
        anchoBobina=getAnchoBobina();

        // capturamos el precio del material
        paso=6;
        precioMaterial=getCostoMaterial();

        // validamos los datos
        paso=7;
        if ((anchoBobina!=0.00) && (precioMaterial!=0.00)){
            paso=8;
            calculos9();
        }

        /*
        original foxpro 
			deja solo el % de gastos por mano de obra	\*
		WITH thisform.pagFr1.pag003
			.spipdt.value = 10
			.spipmO.Value = 15
		ENDWITH 
		thisform.command1.Click
		WITH thisform.pagFr1.pag002
			.ChkRed.Enabled = .t.
			.ChkLev.Enabled = .t.
		ENDWITH 
			HACE EL CALCULO DE MATERIAL POR ETIQUETAS	\*
			VALIDA LOS CAMPOS NECESARIOS	\*
		IF (.PAGFR1.PAG001.TXTABO.VALUE) # 0.00 AND ;
		   THIS.VALUE != 0.00 AND (.PAGFR1.PAG003.TXTPRM.VALUE) # 0.00
		   	LLAMA AL METODO QUE HACE EL CALCULO	\*
		   .oTMP_CAL(9)
		ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickTipoEtiquetaNueva");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*------ esta funcion permite activar la etiqueta modificacion ------*/
function clickTipoEtiquetaModificacion(){
    try {
        console.log ("Entrando a clickTipoEtiquetaModificacion");
        paso=1;
        // establecemos el porcentaje de transporte
        setPorcentajeTransporte(10.00);

        // establecemos el porcentaje de mano de obra
        paso=2;
        setPorcentajeManoObra(15.00);

        // activamos los objetos de Arte en LAN
        paso=3;
        activaArteRedLan();

        // activamos el objeto leavntar arte
        paso=4;
        activaLevantarArte();

        // capturamos el ancho de la bobina
        paso=5;
        anchoBobina=getAnchoBobina();

        // capturamos el precio del material
        paso=6;
        precioMaterial=getCostoMaterial();

        // validamos los datos
        paso=7;
        if ((anchoBobina!=0.00) && (precioMaterial!=0.00)){
            paso=8;
            calculos9();
        }

        /*
        original foxpro 
			deja solo el % de gastos por mano de obra	\*
		WITH thisform.pagFr1.pag003
			.spipdt.value = 10
			.spipmO.Value = 15
		ENDWITH 
		thisform.command1.Click
		WITH thisform.pagFr1.pag002
			.ChkRed.Enabled = .t.
			.ChkLev.Enabled = .t.
		ENDWITH 
			HACE EL CALCULO DE MATERIAL POR ETIQUETAS	\*
			VALIDA LOS CAMPOS NECESARIOS	\*
		IF (.PAGFR1.PAG001.TXTABO.VALUE) # 0.00 AND ;
		   THIS.VALUE != 0.00 AND (.PAGFR1.PAG003.TXTPRM.VALUE) # 0.00
		   	LLAMA AL METODO QUE HACE EL CALCULO	\*
		   .oTMP_CAL(9)
		ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickTipoEtiquetaModificacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*------ esta funcion permite activar la etiqueta repeticion ------*/
function clickTipoEtiquetaRepeticion(){
    try {
        console.log ("Entrando a clickTipoEtiquetaRepeticion");
        paso=1;
        // establecemos el porcentaje de transporte
        setPorcentajeTransporte(10.00);

        // establecemos el porcentaje de mano de obra
        paso=2;
        setPorcentajeManoObra(15.00);

        // establecemos a cero el precio del clishe
        paso=3;
        setPrecioClishe(0.00);

        // desactivamos los objetos de Arte en LAN
        paso=4;
        desactivaArteRedLan();

        // activamos el objeto leavantar arte
        paso=5;
        desactivaLevantarArte();

        // capturamos el ancho de la bobina
        paso=6;
        anchoBobina=getAnchoBobina();

        // capturamos el precio del material
        paso=7;
        precioMaterial=getCostoMaterial();

        // validamos los datos
        paso=8;
        if ((anchoBobina!=0.00) && (precioMaterial!=0.00)){
            paso=9;
            calculos9();
        }
        /*
        original foxpro 
			deja solo el % de gastos por mano de obra	\*
		WITH thisform.pagFr1.pag003
			.spipdt.value = 10
			.spipmO.Value = 15
			.TXTPCL.Value = 0
		ENDWITH 
		WITH thisform.pagFr1.pag002
			.ChkRed.Enabled = .f.
			.ChkLev.Enabled = .f.
		ENDWITH 
		HACE EL CALCULO DE MATERIAL POR ETIQUETAS	\*
		VALIDA LOS CAMPOS NECESARIOS	\*
		IF (.PAGFR1.PAG001.TXTABO.VALUE) # 0.00 AND ;
		   THIS.VALUE != 0.00 AND (.PAGFR1.PAG003.TXTPRM.VALUE) # 0.00
		   LLAMA AL METODO QUE HACE EL CALCULO	\*
		   .oTMP_CAL(9)
		ENDIF	
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickTipoEtiquetaRepeticion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*------ esta funcion permite activar la etiqueta Blanco ------*/
function clickTipoEtiquetaBlanco(){
    try {
        console.log ("Entrando a clickTipoEtiquetaBlanco");
        paso=1;
        // establecemos el porcentaje de transporte
        setPorcentajeTransporte(0.00);

        // establecemos el porcentaje de mano de obra
        paso=2;
        setPorcentajeManoObra(0.00);

        // establecemos a cero el precio del clishe
        paso=3;
        setPrecioClishe(0.00);

        // desactivamos los objetos de Arte en LAN
        paso=4;
        desactivaArteRedLan();

        // activamos el objeto leavantar arte
        paso=5;
        desactivaLevantarArte();

        // capturamos el ancho de la bobina
        paso=6;
        anchoBobina=getAnchoBobina();

        // capturamos el precio del material
        paso=7;
        precioMaterial=getCostoMaterial();

        // validamos los datos
        paso=8;
        if ((anchoBobina!=0.00) && (precioMaterial!=0.00)){
            paso=10;
            calculos9();
        }
        /*
        original foxpro 
		deja solo el % de gastos por mano de obra	\*
		WITH thisform.pagFr1.pag003
			.spipdt.value = 0
			.spipmO.Value = 0
			.TXTPCL.Value = 0
		ENDWITH 
		WITH thisform.pagFr1.pag002
			.ChkRed.Enabled = .f.
			.ChkLev.Enabled = .f.
		ENDWITH 
		HACE EL CALCULO DE MATERIAL POR ETIQUETAS	\*
		VALIDA LOS CAMPOS NECESARIOS	\*
		IF (.PAGFR1.PAG001.TXTABO.VALUE) # 0.00 AND ;
		   THIS.VALUE != 0.00 AND (.PAGFR1.PAG003.TXTPRM.VALUE) # 0.00
		   
		   LLAMA AL METODO QUE HACE EL CALCULO	\*
		   .oTMP_CAL(9)
		ENDIF			
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickTipoEtiquetaBlanco");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*------ esta funcion permite activar la etiqueta Fondeado ------*/
function clickTipoEtiquetaFondeado(){
    try {
        console.log ("Entrando a clickTipoEtiquetaFondeado");
        paso=1;
        // establecemos el porcentaje de transporte
        setPorcentajeTransporte(0.00);

        // establecemos el porcentaje de mano de obra
        paso=2;
        setPorcentajeManoObra(0.00);

        // establecemos a cero el precio del clishe
        paso=3;
        setPrecioClishe(0.00);

        // desactivamos los objetos de Arte en LAN
        paso=4;
        desactivaArteRedLan();

        // activamos el objeto leavantar arte
        paso=5;
        desactivaLevantarArte();

        // capturamos el ancho de la bobina
        paso=6;
        anchoBobina=getAnchoBobina();

        // capturamos el precio del material
        paso=7;
        precioMaterial=getCostoMaterial();

        // validamos los datos
        paso=8;
        if ((anchoBobina!=0.00) && (precioMaterial!=0.00)){
            paso=9;
            calculos9();
        }
        /*
        original foxpro 
		deja solo el % de gastos por mano de obra	\*
		WITH thisform.pagFr1.pag003
			.spipdt.value = 0
			.spipmO.Value = 0
			.TXTPCL.Value = 0
		ENDWITH 
		WITH thisform.pagFr1.pag002
			.ChkRed.Enabled = .f.
			.ChkLev.Enabled = .f.
		ENDWITH 
		HACE EL CALCULO DE MATERIAL POR ETIQUETAS	\*
		VALIDA LOS CAMPOS NECESARIOS	\*
		IF (.PAGFR1.PAG001.TXTABO.VALUE) # 0.00 AND ;
		   THIS.VALUE != 0.00 AND (.PAGFR1.PAG003.TXTPRM.VALUE) # 0.00
		   
		   LLAMA AL METODO QUE HACE EL CALCULO	\*
		   .oTMP_CAL(9)
		ENDIF			
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickTipoEtiquetaFondeado");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*------ esta funcion se activa cuando cambia el costo por impresion ------*/
function changeCostoPorImpresion(){
    try {
        console.log ("Entrando a changeCostoPorImpresion");
        paso=1;
        calculos17();
         console.log ("fin  changeCostoPorImpresion");
        /*
        original foxpro 
        *  	precio de etiqueta	*
        thisform.oTMP_CAL(17)			
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoPorImpresion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*----- esta funcion se eejcuta cuando se hace click sobre el objeto chkRibbon-*/
function clickCheckImpresionRibbon(){
    try {
        console.log ("Entrando a clickCheckImpresionRibbon");
        // verificamos que l objeto esté activo 
        paso=1;
        if (document.getElementById('chkImpresionRibbon').checked){
            paso=2;
            activaChkTextoRibbon();
            paso=3;
            activaChkNumeracionRibbon()
            paso=4;
            metrosLineales=getMtrsLineales();
            paso=5;
            nTMP_RIB=parseFloat(prompt("Ingrese la cant. de mts por Ribbon"));
            paso=6;
            if (nTMP_RIB!=0.00){
                paso=7;
                document.getElementById('lblRib').innerHTML="";
                paso=8;
                document.getElementById('lblRib').innerHTML="Cant. Ribbons: " + String(metrosLineales/nTMP_RIB);
                paso=9;
                displayLblRib();
            } else {
                paso=10;
                hideLblRib();
            }            
        } else {
            // desactiva los objetos 
            paso=11;
            activaChkTextoRibbon();
            paso=12;
            activaChkNumeracionRibbon()
            // oculta la etiqueta
            paso=13;
            hideLblRib();           
        }
        /*
		original foxpro
			VERIFICA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1 THEN
			HABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.CHECK1.ENABLED = .T.
			THISFORM.PAGFR1.PAG002.CHECK2.ENABLED = .T.
			nTMP_RIB = VAL(INPUTBOX("Ingrese la cant. de mts por Ribbon", "Mts. x Ribbon", ""))
			IF nTMP_RIB # 0.00
				thisform.pagFr1.pag002.lblrib.visible = .t.
				thisform.pagFr1.pag002.lblrib.Caption = "Cant. Ribbons: " +  ALLTRIM(STR(thisform.pagFr1.pag001.txtmtl.Value / nTMP_RIB, 10, 2))
			ELSE
				thisform.pagFr1.pag002.lblrib.visible = .F.
			ENDIF 
		ELSE
			DESHABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.CHECK1.ENABLED = .F.
			THISFORM.PAGFR1.PAG002.CHECK2.ENABLED = .F.
			thisform.pagFr1.pag002.lblrib.visible = .F.
		ENDIF		
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickCheckImpresionRibbon");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}


/*--------------- esta funcon se ejecuta cuando se presiona el objeto chkTextnRibbon() de presentacion ----*/
function clickChkTextRibbon(){
    try {
        console.log ("Entrando a clickChkTextRibbon");
        paso=1;
        // verificamos que l objeto esté activo 
        if (document.getElementById('chkTextoRibbon').checked){
            paso=12;
            // habilitamos el cuadro de texto
            activaTextoRibbon();
        } else {
            paso=13;
            desactivaTextoRibbon();
        }
        /*
		original foxpro
		VERIFICA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1 THEN
			HABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.EDTDES.ENABLED = .T.
		ELSE
			DESHABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.EDTDES.ENABLED = .F.
		ENDIF	
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkTextRibbon");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*--------------- esta funcon se ejecuta cuando se presiona el objeto chkTextnRibbon() de presentacion ----*/
function clickChkNumeracionRibbon(){
    try {
        console.log ("Entrando a clickChkNumeracionRibbon");
        paso=1;
        // verificamos que l objeto esté activo 
        if (document.getElementById('chkNumeracionRibbon').checked){
            paso=2;
            // habilitamos el cuadro de texto
            activaNumeracionDesdeRibbon();
            paso=3;
            activaNumeracionHastaRibbon();
        } else {
            paso=4;
            desactivaNumeracionDesdeRibbon();
            paso=5;
            desactivaNumeracionHastaRibbon();
        }
        /*
		original foxpro
		VERIFICA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1 THEN
			HABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.EDTDES.ENABLED = .T.
		ELSE
			DESHABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.EDTDES.ENABLED = .F.
		ENDIF	
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkNumeracionRibbon");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*------------- esta funcion se ejecuta cuando se hace click sobre cl check de signado ------*/
function clickChkUtilizaSignado(){
    try {
        console.log ("Entrando a clickChkUtilizaSignado");
        paso=1;
        // verificamos que l objeto esté activo 
        if (document.getElementById('chkUtilizaSignado').checked){
            paso=2;
            activaTxtUtilizaSignado();
            paso=2;
            activaSignadoPulgadas();
            paso=3;
            activaSignadoCadaXEtq();            
        } else {
            paso=4;
            desactivaTxtUtilizaSignado();
            paso=5;
            desactivaSignadoPulgadas();
            paso=6;
            desactivaSignadoCadaXEtq();
        }
        /*
		original foxpro
		VERIFICA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1 THEN
			HABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.TXTSIG.ENABLED = .T.
			THISFORM.PAGFR1.PAG002.SPIPUL.ENABLED = .T.
			THISFORM.PAGFr1.PAG002.TXTSEP.ENABLED = .T.
		ELSE
			DESHABILITA LOS CONTROLES	\*
			THISFORM.PAGFR1.PAG002.TXTSIG.ENABLED = .F.
			THISFORM.PAGFR1.PAG002.SPIPUL.ENABLED = .F.
			THISFORM.PAGFr1.PAG002.TXTSEP.ENABLED = .F.
		ENDIF	
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkUtilizaSignado");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }          
}

/*------- esta funcion se ejecuta cuando cambia el objeto TxtUtilizaSignado ----*/
/* busca en el maestro de troqueles las pulgadas del troquel PUL_TRO ----*/
function changeTxtUtilizaSignado(){
    try {
        console.log ("Entrando a changeTxtUtilizaSignado");
        paso=1;
        codigoTroquel=getTextosignado();
        paso=2;
        if (codigoTroquel.length > 0){
            paso=3;
            //------------------------
            $.ajax({
                url: "/search_pulgadas_troquel",
                type: "get",
                dataType: "html",
                data:{
                    codtroquel:codigoTroquel
                }
            }).done(function (res) {
                console.log (res);
                var data = JSON.parse(res);                
                //console.log  (data.valor);     
                paso=4;                                 
                if (data["result"]=="1"){
                    paso=5;
                    setSignadoPulgadas(parseFloat(data["data"]).toFixed(3));
                } else if (data["result"]=="-1") {
                    paso=6;
                    msgError (`El signado <b>${codigoTroquel}</b> no se encuentra registrado`);
                } else {
                    paso=7;
                    msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
                }
            }); 
        } else {
            paso=8;
            msgError("Debe suministrar un codigo de troquel para efectuar la búsqueda");
        }
          
        /*
		original foxpro

        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeTxtUtilizaSignado");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*----- esta funcion se ejecuta cuando hacemos cllick al objeto Forma Continua -----*/
function clickChkFormaContinua(){
    try {
        console.log ("Entrando a clickChkFormaContinua");
        paso=1;
        if (document.getElementById('chkFormaContinua').checked){
            paso=2;
            // capturamos los canales de las etiquetas
            canalesEtiquetas=getCanalesEtiqueta();  
            paso=3;         
            if (getTipoCotizacion()=="1"){
                paso=4;
                // es cotizacion flexo
                // capturamos el ancho de la etiqueta
                anchoEtiqueta=getAnchoFlexo();
            } else {
                // es cotizacion indigo
                // capturamos el ancho de la etiqueta
                paso=5;
                anchoEtiqueta=getAnchoIndigo();
            }
            // validamos los datos
            if ((anchoEtiqueta!=0.00) && (canalesEtiquetas!=0)){
                paso=6;
                calculos7();
            }      
        }
        /*
		original foxpro
		WITH THISFORM
				VALIDA CAMPOS OBLIGATORIOS	\*
			COTIZACION FLEXOGRAFICA	\*
			IF .PAGFR1.PAG001.OPTGR1.OPTFLX.VALUE = 1 THEN
				VALIDA QUE ANCHO Y CANALES TENGAN DATOS	\*
				IF .PAGFR1.PAG001.SPIANC.VALUE != 0.00 AND .PAGFR1.PAG001.SPICAN.VALUE != 0 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
					.oTMP_CAL(7)
				ENDIF	
			ELSE
				VALIDA QUE EL ANCHO Y CANALES TENGAN DATOS				
				IF EMPTY(.PAGFR1.PAG001.COBANC.VALUE) = .F. AND .PAGFR1.PAG001.SPICAN.VALUE != 0 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
					.oTMP_CAL(7)
				ENDIF
			ENDIF	
		ENDWITH 
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkFormaContinua");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}


/*----- esta funcion se ejecuta cuando hacemos click al objeto Impresion Espejo -----*/
function clickChkEspejo(){
    try {
        console.log ("Entrando a clickChkEspejo");
        paso=1;
        if (document.getElementById('chkEspejo').checked){
            paso=2;
            desactivaChkImpAdhesivo();
        }
        /*
		original foxpro
		 VALIDA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1
			IF THISFORM.PAGFr1.PAg002.CHKADH.VALUE = 1
				THISFORM.PAGFr1.PAg002.CHKADH.VALUE = 0
			ENDIF
		ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkEspejo");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*----- esta funcion se ejecuta cuando se hace click sobre el objeto ChkPegManual ---*/
function clickChkPegManual(){
    try {
        console.log ("Entrando a clickChkPegManual");
        paso=1;
        if (document.getElementById('chkPegManual').checked){
            paso=2;
            desactivaChkImpAdhesivo();
        }
        /*
		original foxpro
		VALIDA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1
			IF THISFORM.PAGFr1.PAg002.CHKADH.VALUE = 1
				THISFORM.PAGFr1.PAg002.CHKADH.VALUE = 0
			ENDIF
		ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkPegManual");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*---- esta funcion se ejecuta cuando se hace click al objeto Impresion por el adhesivo ---*/
function clickChkImpAdhesivo(){
    try {
        console.log ("Entrando a clickChkImpAdhesivo()");
        paso=1;
        // capturamos el valor del factor
        factorV=getResumenFactor();
        paso=2;

        if (document.getElementById('chkImpAdhesivo').checked){
            paso=3;
            desactivaChkEspejo();
            paso=4;
            factorV=factorV+0.2;
        } else {
            paso=5;
            factorV=factorV-0.2;
        }
        paso=6;
        setResumenFactor(factorV);
        /*
		original foxpro
		VALIDA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1
			IF THISFORM.PAGFr1.PAg002.CHKESP.VALUE = 1
				THISFORM.PAGFr1.PAg002.CHKESP.VALUE = 0
			ENDIF
			THISFORM.PAGFr1.PAg003.TXTFAc.Value = THISFORM.PAGFr1.PAg003.TXTFAc.Value + 0.2
		ELSE
			THISFORM.PAGFr1.PAg003.TXTFAc.Value = THISFORM.PAGFr1.PAg003.TXTFAc.Value - 0.2
		ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkImpAdhesivo()");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}



/**********************************************************************/
/* funciones de cambio de la division Costos                          */
/**********************************************************************/
/* esta funcion se ejcuta cuando cambia el valor del costo en ancho de bobina */
function changeCostoAnchoBobina(){
    try {
        console.log ("Entrando a changeCostoAnchoBobina");
        paso=1;        
        // capturamos el ancho de bobina en la pagina de generales
        anchoBobina=getAnchoBobina();

        // capturamos el ancho de bobina de la pagina de costos 
        paso=2;
        anchoBobinaCostos=getCostoAnchoBobina();

        // capturamos los metros lineales de la pagina generales
        paso=3;
        metrosLineales=getMtrsLineales();

        // validamos los datos
        if (anchoBobina!=0.00){
            paso=4;
            // varificamos i hay diferencias
            nTMP_DIF=anchoBobinaCostos-anchoBobina;

            // asignamos la diferencia l control correspondiente
            paso=5;
            setDifAncho(nTMP_DIF);

            // validamos el dato
            paso=6;
            if (nTMP_DIF> 0.00){
                paso=7;
                activaChkDesperdicio();

                // validamos los datos
                paso=8;
                if (metrosLineales != 0.00){
                    paso=9;
                    calculos20();
                }
            } else {
                paso=10;
                desactivaChkDesperdicio();
            }
            paso=11;
        }
        /*
		original foxpro
		LLAMA AL METODO QUE HACE EL CALCULO POR DIFERENCIA	\*
		VALIDA QUE TENGA DATOS EL ANCHO DE BOBINA SOLICITADO	\*
		IF THISFORM.PAGFR1.PAG001.TXTABO.VALUE != 0.00 THEN
			HACE EL CALCULO A VER SI HAY DIFERENCIA DE ANCHO DE BOBINA	\*
			nTMP_DIF = THIS.VALUE - THISFORM.PAGFR1.PAG001.TXTABO.VALUE
			DIFERENCIA POR ANCHO DE BOBINA	\*
			THISFORM.PAGFR1.PAG003.TXTDIF.VALUE = nTMP_DIF
			HACE LA VALIDACION PARA VER SI HACE EL CALCULO POR DESPERDICIO ADICIONAL	\*
			IF nTMP_DIF > 0.00 THEN
				HABILITA EL CHECK DE ASUMIR DESPERDICIO	\*
				THISFORM.PAGFr1.PAG003.CHKDES.Enabled = .T.
				VALIDA DATOS NECESARIOS	PARA EL CALCULO	\*
				IF THISFORM.PAGFR1.PAG001.TXTMTL.VALUE != 0 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
					THISFORM.oTMP_CAL(20)
				ENDIF
			ELSE
				HABILITA EL CHECK DE ASUMIR DESPERDICIO	\*
				THISFORM.PAGFr1.PAG003.CHKDES.Enabled = .T.
			ENDIF			
		ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoAnchoBobina");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}


/*---- esta funcion se ejecuta cuando se le hace click al objeto CMYK ---*/
function clickCMYK(){
    try {
        console.log ("Entrando a clickCMYK");
        paso=1;        
        setCantidadColores(4);
        paso=2;
        changeCantidadColores();

        /*
		original foxpro
        thisform.pagFr1.pag003.spiCol.Value = 4
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickCMYK");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}

/*---- esta funcion se ejecuta cuando se le hace click al objeto CMYKNV ---*/
function clickCMYKNV(){
    try {
        console.log ("Entrando a clickCMYKNV");
        paso=1;        
        setCantidadColores(6);
        paso=2;
        changeCantidadColores();

        /*
		original foxpro
        	thisform.pagFr1.pag003.spiCol.Value =
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickCMYKNV");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}

/*---- esta funcion se ejecuta cuando se le hace click al objeto clickCMYKB ---*/
function clickCMYKB(){
    try {
        console.log ("Entrando a clickCMYKB");
        paso=1;        
        setCantidadColores(5);
        paso=2;
        changeCantidadColores();

        /*
		original foxpro
        	thisform.pagFr1.pag003.spiCol.Value = 5
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickCMYKB()");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}


/*---- esta funcion se ejecuta cuando se le hace click al objeto clickCMYKBNV ---*/
function clickCMYKBNV(){
    try {
        console.log ("Entrando a clickCMYKBNV");
        paso=1;        
        setCantidadColores(7);
        paso=2;
        changeCantidadColores();

        /*
		original foxpro
        	thisform.pagFr1.pag003.spiCol.Value = 7
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickCMYKBNV");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}

/*---- esta funcion se ejecuta cuando se le hace click al objeto clickBlanco ---*/
function clickBlanco(){
    try {
        console.log ("Entrando a clickBlanco");
        paso=1;        
        setCantidadColores(1);
        paso=2;
        changeCantidadColores();
        /*
		original foxpro
        thisform.pagFr1.pag003.spiCol.Value = 1
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickBlanco");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 
}

/*---- esta funcion se ejecuta cuando cambia el numero de colores ----*/
function changeCantidadColores(){
    try {
        console.log ("Entrando a changeCantidadColores");
        paso=1;        
        
        // capturamos el ancho de la etiqueta dependeindo de sei es Flexo o Indigo
        paso=2;
        tipoCotizacion=getTipoCotizacion();

        //capturamos la cantidad de canales
        paso=3;        
        canales=getCanalesEtiqueta();

        // capturamos la cantidad de colores
        paso=4;
        cantidadColores=getCantidadColores();

        // capturamos el precio del color
        paso=5;
        precioColores=getPrecioColores();

        // capturamos si esta fondeada 
        paso=6;
        tipoEtiqueta=getTipoEtiqueta();
        
        // capturamos el precio del clishe
        paso=7;
        precioClishe=getPrecioClishe();

        paso=8;
        if (tipoCotizacion==1){
            paso=9;
            // es flexo
            ancho=getAnchoFlexo();
        } else {
            // es indigo
            paso=10;
            ancho = getAnchoIndigo();
        }
        
        // validamos los datos
        paso=11;
        if ((ancho!=0.00) && (canales!=0)){
            paso=12;
            console.log ("llamando calculos7 desde changeCantidadColores() paso:",paso);
            calculos7();
        }

        // validamos los datos para el precio del color
        paso=13;
        if (precioColores!=0.00){
            paso=14;
            console.log ("llamando calculos11 desde changeCantidadColores() paso:",paso);
            calculos11();
        }

        // validamos si hay precio del clishe
        paso=15;
        if (precioClishe !=0.00){
            paso=16;
            calculos18();
            console.log ("llamando calculos18 desde changeCantidadColores() paso:",paso);
        }

        // hacemos el calculo final
        paso=17;
        console.log ("llamando cep desde changeCantidadColores() paso:",paso);
        cep();
        /*
		original foxpro
		HACE EL CALCULO DE ANCHO DE BOBINA	\*
		WITH THISFORM
			VALIDA CAMPOS OBLIGATORIOS	\*
			COTIZACION FLEXOGRAFICA	\*				
			VALIDA QUE ANCHO Y CANALES TENGAN DATOS	\*
			IF (.PAGFR1.PAG001.SPIANC.VALUE != 0.00 OR !EMPTY(.PAGFR1.PAG001.COBANC.VALUE)) AND ;
				.PAGFR1.PAG001.SPICAN.VALUE != 0
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(7)
			ENDIF
			HACE EL CALCULO DEL PRECIO DEL COLOR	\*
				VALIDA CAMPOS OBLIGATORIOS			\*
			IF EMPTY(.PAGFR1.PAG003.TXTPRC.VALUE) = .F. THEN
				LLAMA AL METODOQ QUE HACE EL CALCULO	\*
				.oTMP_CAL(11)
			ENDIF
			HACE EL CALCULO DEL PRECIO DEL TOTAL DEL CLISHE		\*
					VALIDA CAMPOS OBLIGATORIOS					\*
			IF EMPTY(.PAGFR1.PAG003.TXTPCL.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(18)
			ENDIF
			LLAMA AL METODO QUE HACE EL CALCULO	\*
			THISFORM.oTMP_CEP()
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCantidadColores");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}

/*----- esta funcion se eejcuta cuando se cambia el precio del color en el cuadro de costos -------*/
function changePrecioColor(){
    try {
        console.log ("Entrando a changePrecioColor");
        
        // capturamos el precio del transporte
        paso=1;
        // capturamos el precio del color
        precioColores=getPrecioColores();
        
        // capturamos la cantidad de colores
        paso=2;
        cantidadColores=getCantidadColores();

        // validamos los datos
        paso=3;
        if ((precioColores!=0) && (cantidadColores!=0)){
            paso=4;
            calculos11();
            paso=5;
            setResumenPrecioColor(precioColores);
        }
        /*
		original foxpro
		HACE EL CALCULO DEL PRECIO DEL COLOR	\*
		WITH THISFORM
			VALIDA CAMPOS OBLIGATORIOS			\*
			IF EMPTY(.PAGFR1.PAG003.TXTPRC.VALUE) = .F. AND .PAGFR1.PAG003.SPICOL.VALUE != 0 THEN
				LLAMA AL METODOQ QUE HACE EL CALCULO	\*
				.oTMP_CAL(11)
			ENDIF			
		ENDWITH     
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePrecioColor");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }          
}
/*--- esta funcion se ejecuta cuando cambia el precio total de los colores ----*/
function changePrecioTotalColores(){
    try {
        console.log ("Entrando a changePrecioTotalColores");
        
        // capturamos el precio del transporte
        paso=1;        
        costoTransporte=getCostoTransporte();

        // capruramos el costo de mano de obra
        paso=2;
        costoManoObra=getCostoManoObra();

        // capturamos la cantidad de las etiquetas 
        paso=3;
        cantidadEtiquetas=getCantidadEtiquetas();

        if ((costoTransporte!=0) && (costoManoObra!=0) && (cantidadEtiquetas!=0)){
            calculos14();
        }

        /*
		original foxpro
	    HACE EL RECALCULO DE SUMA DE COSTOS	\*
		WITH THISFORM
		VALIDA CAMPOS NECESARIOS	\*
		IF EMPTY(.PAGFR1.PAG003.TXTCDT.VALUE) = .F. AND ;
			EMPTY(.PAGFR1.PAG003.TXTCMO.VALUE) = .F. AND EMPTY(.PAGFR1.PAG001.TXTCET.VALUE) = .F. THEN
			LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
			ENDIF	
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePrecioTotalColores");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*------ esta funcion se ejecuta cuando cambia el precio del clishe ----*/
function changePrecioClishe(){
    try {
        console.log ("Entrando a changePrecioClishe");
        
        // capturamos la cantidad de colores
        paso=1;  
        cantidadColores=getCantidadColores();
        
        paso=2
        // capturamos el precsio del clishe
        precioCliche=getPrecioClishe();

        // validamos los datos
        paso=3;
        if (cantidadColores!=0){
            paso=4;
            calculos18();
        }

        // actualizamos el precio del del clishe en el resumen
        paso=5;
        setResumenPrecioClishe(precioCliche);
        /*
		original foxpro
		HACE EL CALCULO DEL PRECIO DEL TOTAL DEL CLISHE		\*
		WITH THISFORM
			VALIDA CAMPOS OBLIGATORIOS					\*
			IF .PAGFR1.PAG003.SPICOL.VALUE != 0 THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(18)
			ENDIF
			IF nVarPTC = 0
				nVarPTC = this.Value 
			ENDIF 
			THISFORM.PAGFR1.PAG004.TXTPCL.VALUE = THIS.VALUE
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePrecioClishe");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*------ esta funcion se ejecuta cuando cambia el porcentaje de transporte -----*/
function changePorcentajeTransporte(){
    try {
        console.log ("Entrando a changePorcentajeTransporte");

        paso=1;  
        // capturamos el costo del material
        costoTotalMaterial= getCostoTotalMaterial();

        // validamos la data
        paso=2;
        if (costoTotalMaterial!=0.00){
            paso=3;
            calculos12();
        }
        paso=4;
        calculos14();
        /*
		original foxpro
		HACE EL CALCULO DEL COSTO DEL TRANSPORTE	\*
		WITH THISFORM
			VALIDA LOS CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG003.TXTPFM.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(12)
			ENDIF	
			HACE EL CALCULO DE SUMA DE COSTOS	\*
			VALIDA LOS CAMPOS NECESARIOS	\*	
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePorcentajeTransporte");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*----- esta funcion se ejecyta cuando cambia el costo total del transporte ----*/
function changeCostoTransporte(){
    try {
        console.log ("Entrando a changeCostoTransporte");

        paso=1; 
        calculos14();
        paso=2;
        calculos15();

        /*
		original foxpro
		
		LLAMA AL METODO PARA HACER LA SUMA DE COSTOS	\*
		VALIDA DATOS NECESARIOS	\*
		WITH THISFORM
            LLAMA AL METODO QUE HACE EL CALCULO	\*
            .oTMP_CAL(14)
            .oTMP_CAL(15)
		ENDWITH	
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoTransporte");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}


/*------ esta funcion se ejecuta cuando se cambia el procentaje de mano de obra ----*/
function changePorcentajeManoObra(){
    try {
        console.log ("Entrando a changePorcentajeManoObra");

        paso=1; 
        // capturamos el costo del material
        costoTotalMaterial= getCostoTotalMaterial();
        
        // validamos los datos 
        paso=2;
        if (costoTotalMaterial!=0.00){
            paso=3;
            calculos13()
        }
        paso=4;
        calculos14();
        /*
		original foxpro
		HACE EL CALCULO DEL COSTO DEL TRANSPORTE	\*
		WITH THISFORM
			VALIDA LOS CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG003.TXTPFM.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(13)
			ENDIF	
			HACE EL CALCULO DE SUMA DE COSTOS	\*
			VALIDA LOS CAMPOS NECESARIOS	\*	
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePorcentajeManoObra");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*------ esta funcion se ejecuta cuando se cambia el procentaje de mano de obra ----*/
function changeCostoManoObra(){
    try {
        console.log ("Entrando a changeCostoManoObra");

        paso=1; 
        calculos14();

        paso=2;
        calculos15();

        /*
		original foxpro
		LLAMA AL METODO PARA HACER LA SUMA DE COSTOS	\*
		VALIDA DATOS NECESARIOS	\*
		WITH THISFORM
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
				.oTMP_CAL(15)
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoManoObra");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando cambia el costo total del material ------*/
function changeCostoTotalMaterial(){
    try {
        console.log ("Entrando a changeCostoTotalMaterial");

        paso=1; 
        // capturamos la cantidad de etiquetas
        cantidadEtiquetas=getCantidadEtiquetas();

        // validamos los datos
        paso=2;
        if (cantidadEtiquetas!=0){
            paso=3;
            calculos15();
        }

        // capturamos el procentaje de transporte
        paso=4;
        porcentajeTransporte=getPorcentajeTransporte();

        // validamos los datos
        paso=5;
        if (porcentajeTransporte!=0.00){
            paso=6;
            calculos12();
        }

        // capturamos el porcentaje de mano de obra
        paso=7;
        porcentajeManoObra=getPorcentajeManoObra();

        // validamos 
        paso=8;
        if (porcentajeManoObra!=0.00){
            paso=9;
            calculos13();
        }

        // capturamos el precio total del color
        paso=10;
        precioTotalColor=getPrecioTotalColores();

        // capturamos el costo del trnaspote
        paso=11;
        costoTransporte=getCostoTransporte();

        // capturamos el costo de mano de obra
        paso=12;
        costoManoObra=getCostoManoObra();

        // capturamos la cantidad de etiquetas
        paso=13;
        cantidadEtiquetas=getCantidadEtiquetas();

        // validamos los datos
        paso=14;
        if ((precioTotalColor!=0.00) && (costoTransporte!=0.00) && (costoManoObra!=0.00) && (cantidadEtiquetas!=0)){
            paso=15;
            calculos14();
        }

        /*
		original foxpro
		HACE EL RECALCULO DE COSTO DE ETQ	\*
		WITH THISFORM
				VALIDA CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG001.TXTCET.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(15)
			ENDIF
				HACE EL RECALCULO DE COSTO DE TRANSPORTE	\*
				VALIDA CAMPOS NECESARIOS	\*
			IF .PAGFR1.PAG003.SPIPDT.VALUE != 0 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(12)
			ENDIF
				HACE EL RECALCULO DE COSTO DE MANO DE OBRA	\*
				VALIDA CAMPOS NECESARIOS	\*
			IF .PAGFR1.PAG003.SPIPMO.VALUE != 0 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(13)
			ENDIF
				HACE EL RECALCULO DE SUMA DE COSTOS	\*
				VALIDA CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG003.TXTPTC.VALUE) = .F.
             AND EMPTY(.PAGFR1.PAG003.TXTCDT.VALUE) = .F. AND ;
				EMPTY(.PAGFR1.PAG003.TXTCMO.VALUE) = .F. 
                AND EMPTY(.PAGFR1.PAG001.TXTCET.VALUE) = .F. THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
			ENDIF	
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoTotalMaterial");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando cambia el costo de la etiqueta -----*/
function changeCostoTotalEtiqueta(){
    try {
        console.log ("Entrando a changeCostoTotalEtiqueta");

        paso=1; 
        // capturamos suma de costos
        sumaCostos=getSumaCostos();

        // validamos el datos
        paso=2;
        if (sumaCostos!=0.00){
            paso=3;
            calculos16();
        }

        /*
		original foxpro
		HACE EL CALCULO DEL COSTO FINAL	\*
		WITH THISFORM
			VALIDA LOS CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG003.TXTSDC.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				thisform.edit2.Value=thisform.edit2.Value+CHR(13)+"/// calculando desde txtcoe.programatic.change ////"+CHR(13)+STR(.PAGFR1.PAG003.TXTSDC.VALUE)
				.oTMP_CAL(16)
			ENDIF	
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoTotalEtiqueta");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}


/*----- esta funcion se ejecuta cuando cambia la suma de costos -----------*/
function changeSumaCostos(){
    try {
        console.log ("Entrando a changeSumaCostos");

        paso=1; 
        // capturamos el costo de la etiqueta
        costoEtiqueta=getCodigoEtiqueta();

        // capturamos la suma de costos
        paso=2;
        sumaCostos=getSumaCostos();

        // validamos los datos
        paso=3;
        if (costoEtiqueta!=0.00){
            paso=4;
            calculos16();
        }

        // asignamos el resultado a el cuadro de resumen
         paso=5;
        setResumenSumaCostos(sumaCostos);
        /*
		original foxpro
		HACE EL CALCULO DEL COSTO FINAL	\*
		WITH THISFORM
			VALIDA LOS CAMPOS NECESARIOS	\*
			IF EMPTY(.PAGFR1.PAG003.TXTCOE.VALUE) = .F. THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(16)
			ENDIF	
			ASIGNA EL VALOR AL CONTROL	\*
			.PAGFR1.PAG004.TXTSCO.VALUE = THIS.VALUE
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeSumaCostos");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*----- esta funcion se ejecuta cuando cambia la suma de costos -----------*/
function changeCostoTotal(){
    try {
        console.log ("Entrando a changeCostoTotal");

        paso=1; 
        // capturamos el factor
        factorV=getFactor();

        // capturamos la cantidad de cores
        paso=2;
        cantidadCores=getCantidadCores();

        // validamos los datos
        paso=3;
        if ((factorV!=0.00) && (cantidadCores!=0)){
            paso=4;
            calculos17();
        }
        /*
		original foxpro
		HACE EL CALCULO DEL PRECIO DE LA ETIQUETA	\*
		WITH THISFORM
			VALIDA DATOS NECESARIOS	\*
			IF .PAGFR1.PAG003.TXTFAC.VALUE # 0.00 AND .PAGFR1.PAG002.TXTCCO.VALUE # 0.00
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(17)
			ENDIF
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoTotal");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*------ esta funcion se ejecuta cuando se cambia el factor ------*/
function changeFactor(){
    try {
        console.log ("Entrando a changeFactor");

        paso=1; 
        // determinamos que tipo de impresion es
        tipoCotizacion=getTipoCotizacion();

        paso=2;
        factorV=getFactor();
        factorV2=getFactor();

        paso=3;
        setResumenFactor(factorV);

        paso=4;
        if (tipoCotizacion==1){
            // es flexografica
            // capturamos si es una etiqueta en blanco
            paso=5;
            if ( getEtiquetasBlancas()){
                // es blanca
                paso=6;
                factorV=FactorV * 2;
            } else {
                // no es blanca
                paso=7;
                factorV=FactorV + 0.2;
            }
        } 

        // capturamos el costo total
        paso=9;
        costoTotal=getCostoTotal();

        // capturamos el numero de cores
        paso=10;
        cantidadCores=getCantidadCores();

        // validamos los datos
        paso=11;
        //if ((costoTotal!=0.00) && (cantidadCores!=0)){
        if ((costoTotal!=0.00)){
            paso=12;
            document.getElementById('txtFactor').value=parseFloat(factorV).toFixed(2);
            paso=13;
            calculos17();
        }
        paso=14;
        setFactor(factorV2);
        /*
		original foxpro
			CONDICION PARA EL FACTOR	\*
		* valida si es flexografica 
		IF thisform.pagFr1.pag001.optGr1.optFlx.Value = 1 
			* valida si es una etiqueta en blaco o no
			IF THISFORM.PAGFr1.PAG002.OPTGR3.OPtBla.Value = 1
				nFACTOR = THIS.VALUE * 2 &&+ 0.4
			ELSE
				* es una etiqueta a color
				nFACTOR = THIS.VALUE + 0.2
			ENDIF
		ELSE
			* es una etiqueta laser
			nFACTOR = THIS.VALUE
		ENDIF
			HACE EL CALCULO DEL PRECIO DE ETIQUETA	\*
		WITH THISFORM
				VALIDA LOS CAMPOS NECESARIOS	\*
			IF val(.PAGFR1.PAG003.TXTCTO.VALUE) # 0.00 AND val(.PAGFR1.PAG002.TXTCCO.VALUE) # 0.00
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(17)
			ENDIF
				ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
			.PAGFR1.PAG004.TXTFAC.VALUE = THIS.VALUE
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeFactor");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*------ esta funcion se ejecuta cuando se cambia el costo de Material por Etiquetas ------*/
function changeCostoMaterialEtiquetas(){
    try {
        console.log ("Entrando a changeCostoMaterialEtiquetas");

        paso=1; 
        // capturamos el factor
        factorV=getFactor();

        // capturamos la cantidad de cores
        paso=2;
        cantidadCores=getCantidadCores();

        // validamos los datos
        paso=3;
        if ((factorV!=0.00) && (cantidadCores!=0)){
            paso=4;
            calculos17();
        }
        /*
		original foxpro
		HACE EL CALCULO DEL PRECIO DE LA ETIQUETA	\*
		WITH THISFORM
			VALIDA DATOS NECESARIOS	\*
			IF (.PAGFR1.PAG003.TXTFAC.VALUE) # 0.00 AND (.PAGFR1.PAG002.TXTCCO.VALUE) # 0.00
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(17)
			ENDIF
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoMaterialEtiquetas");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se cambia el costo del foil1 ----*/
function changeCostoFoil1(){
    try {
        console.log ("Entrando a changeCostoFoil1");

        cVarCostoFoil1=0.00;
        cVarCostoFoil2=0.00;
        cVarCostoFoilT=0.00;        

        paso=1; 
        // capturamos costo total del material
        costoTotalMaterial=getCostoTotalMaterial();

        // capturamos el costo del transporte 
        paso=2; 
        costoTransporte=getCostoTransporte();

        // capturamos el costo de mano de obra
        paso=3; 
        costoManoObra=getCostoManoObra();

        // capturamos cantidad de etiquetas
        paso=4; 
        cantidadEtiquetas=getCantidadEtiquetas();

        // validamos los datos
        paso=5; 
        if ((costoTotalMaterial!=0.00) && (costoTransporte!=0.00) && (costoManoObra!=0.00) && (cantidadEtiquetas!=0.00)){
            paso=6; 
            calculos14();
            paso=7; 
            calculos17();
        }
        paso=8; 
        cVarCostoFoil1=getCostoFoil1();
        paso=9; 
        cVarCostoFoil2=getCostoFoil1();
        paso=10; 
        cVarCostoFoilT=cVarCostoFoil1+cVarCostoFoil2;
        paso=11; 
        setCostoTotalFoil(cVarCostoFoilT);
        paso=12; 
        changeCostoTotalFoil();

        /*
		original foxpro
		LLAMA AL METODO PARA HACER LA SUMA DE COSTOS	\*
		VALIDA DATOS NECESARIOS	\*
		WITH THISFORM
			IF (.PAGFR1.PAG003.TXTPFM.VALUE) != 0.00 AND (.PAGFR1.PAG003.TXTCDT.VALUE) != 0.00 AND ;
				(.PAGFR1.PAG003.TXTCMO.VALUE) != 0.00 AND (.PAGFR1.PAG001.TXTCET.VALUE) != 0.00 THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
				.oTMP_CAL(17)
			ENDIF	
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoFoil1");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se cambia el costo del foil2 ----*/
function changeCostoFoil2(){
    try {
        console.log ("Entrando a changeCostoFoil2");

        cVarCostoFoil1=0.00;
        cVarCostoFoil2=0.00;
        cVarCostoFoilT=0.00;    

        paso=1; 
        // capturamos costo total del material
        costoTotalMaterial=getCostoTotalMaterial();

        // capturamos el costo del transporte 
        paso=2; 
        costoTransporte=getCostoTransporte();

        // capturamos el costo de mano de obra
        paso=3; 
        costoManoObra=getCostoManoObra();

        // capturamos cantidad de etiquetas
        paso=4; 
        cantidadEtiquetas=getCantidadEtiquetas();

        // validamos los datos
        paso=5; 
        if ((costoTotalMaterial!=0.00) && (costoTransporte!=0.00) && (costoManoObra!=0.00) && (cantidadEtiquetas!=0.00)){
            paso=6; 
            calculos14();
            paso=7; 
            calculos17();
        }
        paso=8; 
        cVarCostoFoil1=getCostoFoil1();
        paso=9; 
        cVarCostoFoil2=getCostoFoil1();
        paso=10; 
        cVarCostoFoilT=cVarCostoFoil1+cVarCostoFoil2;
        paso=11; 
        setCostoTotalFoil(cVarCostoFoilT); 
        paso=12; 
        changeCostoTotalFoil();       
        /*
		original foxpro
		LLAMA AL METODO PARA HACER LA SUMA DE COSTOS	\*
		VALIDA DATOS NECESARIOS	\*
		WITH THISFORM
			IF (.PAGFR1.PAG003.TXTPFM.VALUE) != 0.00 AND (.PAGFR1.PAG003.TXTCDT.VALUE) != 0.00 AND ;
				(.PAGFR1.PAG003.TXTCMO.VALUE) != 0.00 AND (.PAGFR1.PAG001.TXTCET.VALUE) != 0.00 THEN
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
				.oTMP_CAL(17)
			ENDIF	
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoFoil2");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se cambia el precio de la Etiqueta ----*/
function changePrecioEtiqueta(){
    try {
        console.log ("Entrando a changePrecioEtiqueta");

        paso=1; 
        // capturamos la cantidad de etiquetas
        cantidadEtiquetas=getCantidadEtiquetas();

        // capturamos el precio de la etiqueta
        paso=2; 
        precioEtiqueta=getPrecioEtiqueta();
        console.log ("changePrecioEtiqueta ",precioEtiqueta);

        // validamos los datos
        paso=3; 
        if (cantidadEtiquetas!=0){
            paso=4; 
            calculos19();
        }

        // asignamos el valor al objeto en el cuadro de resumen
        paso=5; 
        setResumenPrecioEtiqueta(precioEtiqueta);
        /* opciones de cbbTip
        <option value='1'>Etiquetas</option>
        <option value='2'>Rollos</option>
        <option value='3'>Hojas</option>
        <option value='4'>Millar</option>
        */
        // capturamos el tipo de cotizacion
        paso=6; 
        cbbTipV=getCbbTip();
        if ((cbbTipV=="2") || (cbbTipV=="3")){
            paso=7; 
            // capturamos etiquetas por rollo
            etiquetasXRollo=getEtiquetasXRollo();
            setPrecioXRollo((precioEtiqueta * etiquetasXRollo));
        } else if ((cbbTipV=="4") ){
            paso=8; 
            setPrecioXRollo((precioEtiqueta * 1000));
        } 
        /*
		original foxpro
		HACE EL CALCULO DE LOS ESTIMADOS A FACTURAR	\*
		WITH THISFORM
				VALIDA CAMPOS NECESARIOS	\*
			IF (.PAGFR1.PAG001.TXTCET.VALUE) != 0 THEN
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				thisform.edit2.Value =thisform.edit2.Value+CHR(13)+"////////// llamando metodo de calculo desde page3.txtpet.programaticchange /////"+CHR(13)
				.oTMP_CAL(19)
			ENDIF
				ASIGNA EL VALOR AL CONTROL	\*
			.PAGFR1.PAG004.TXTPET.VALUE = THIS.VALUE
			thisform.edit2.Value =thisform.edit2.Value+CHR(13)+"////////// llamando metodo de calculo desde page3.txtpet.programaticchange /////"+CHR(13)
			DO CASE 
				CASE LEFT(.pagfr1.pag001.cbbtip.value,1) = "R" OR LEFT(.pagfr1.pag001.cbbtip.value, 1) = "H" 
					.PAGFr1.PAG002.TXTPREcRol.Value = THIS.Value * THISFORM.PAGFr1.PAg002.TXTEXR.VALUE
				CASE LEFT(.pagfr1.pag001.cbbtip.value, 1) = "M"
					.PAGFr1.PAG002.TXTPREcRol.Value = THIS.Value * 1000
			ENDCASE 
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changePrecioEtiqueta");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se cambia la diferencia por ancho de la Bobina ----*/
function changeDiferenciaPorAncho(){
    try {
        console.log ("Entrando a changeDiferenciaPorAncho");

        paso=1; 
        // capturamos el ancho de bobina
        anchoBobina=getAnchoBobina();

        // capturamos los metros lineales
        paso=2;
        metrosLineales=getMtrsLineales();

        // validamos los datos
        paso=3;
        if (anchoBobina!=0.00){
            paso=4;
            // se ha definido ancho de bobina
            if (metrosLineales!=0.00){
                paso=5;
                calculos20();
            }
        } else {
            // no se ha definido ancho de bobina
            paso=6;
            setCostoDesperdicioBobina(0.00);
            // falta THISFORM.PAGFr1.PAG003.TXTCTO.VALUE = nTMP_COS
       }
        /*
		original foxpro
        IF this.Value # 0.00
           	VALIDA LOS DATOS NECESARIOS	\*
            If Thisform.PAGFR1.PAG001.TXTABO.Value != 0.00 Then
               	VALIDA DATOS NECESARIOS	PARA EL CALCULO	\*
                If Thisform.PAGFR1.PAG001.TXTMTL.Value != 0.00 Then
                   	LLAMA AL METODO QUE HACE EL CALCULO	\*
                    Thisform.oTMP_CAL(20)
                Endif
            Endif
        ELSE
            LIMPIA EL CONTROL	\*
            THISFORM.PAGFR1.PAG003.TXTDES.VALUE = 000000000.00	
            THISFORM.PAGFr1.PAG003.TXTCTO.VALUE = nTMP_COS
        ENDIF 
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeDiferenciaPorAncho");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se cambia el costo total del foil ----*/
function changeCostoTotalFoil(){
    try {
        console.log ("Entrando a changeCostoTotalFoil");

        paso=1; 
        // capturamos el costo total del material
        costoTotalMaterial=getCostoTotalMaterial();

        // capturamos el costo del transporte
        paso=2; 
        costoTransporte=getCostoTransporte();

        // capturamos el costo de mano  de obra
        paso=3; 
        costoManoObra=getCostoManoObra();

        // capturamos la cantidad de etiquetas
        paso=4; 
        cantidadEtiquetas=getCantidadEtiquetas();

        // validamos los datos
        paso=5; 
        if ((costoMaterial!=0.00) && (costoManoObra!=0.00) && (costoTransporte!=0.00) && (cantidadEtiquetas!=0)){
            paso=6; 
            calculos14();
            paso=7; 
            calculos17();
        }

        /*
		original foxpro
        LLAMA AL METODO PARA HACER LA SUMA DE COSTOS	\*
        VALIDA DATOS NECESARIOS	\*
		WITH THISFORM
			IF (.PAGFR1.PAG003.TXTPFM.VALUE) != 0.00 AND (.PAGFR1.PAG003.TXTCDT.VALUE) != 0.00 AND ;
				(.PAGFR1.PAG003.TXTCMO.VALUE) != 0.00 AND (.PAGFR1.PAG001.TXTCET.VALUE) != 0.00 THEN
                LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(14)
				.oTMP_CAL(17)
			ENDIF	
		ENDWITH        
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoTotalFoil");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se hace click sobre el check de descuento ----*/
function clickChkDescuento(){
    try {
        console.log ("Entrando a clickChkDescuento");

        paso=1; 
        // determinamos si activo o no el descuento
        if (getHayDescuento()){
            paso=2;
            activaDescuento();
        } else {
            paso=3;
            desactivaDescuento();
        }
        /*
		original foxpro
        WITH Thisform.PagFr1.Pag003
            IF this.Value = 1
                .SpiDes.Enabled = .T.
                .SpiDes.Value = nPorDto 
            ELSE
                .SpiDes.Value = 0.00
                .SpiDes.Enabled = .F.
            ENDIF 
        ENDWITH       
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkDescuento");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando cambia el valor del descuento ----*/
function changeDescuento(){
    try {
        descuento=0.00;
        precioEtiqueta=0.00;
        nVarAux=0.00;
        nVarDesc=0.00;
        console.log ("Entrando a changeDescuento");

        paso=1; 
        // capturamos el valor del descuento
        if (getDescuento!="NaN"){
            descuento=getDescuento();
        } else {
            descuento=0.00;
        }
        
        // capturamos el precio total de la etiqueta
        paso=2; 
        precioEtiqueta=getPrecioEtiqueta();
        console.log ("precio etiqueta changeDescuento:",precioEtiqueta);

        // validamos los datos
        paso=3; 
        if (descuento!=0.00){
            paso=4; 
            nVarAux=(descuento*precioEtiqueta)/100;
            paso=5; 
            nVarDesc=nVarAux;
            paso=6; 
            nVarAux=precioEtiqueta-nVarAux;
            paso=7; 
            setPrecioEtiqueta(nVarAux.toFixed(4));
            paso=8;
            setMontoDescontado(nVarDesc);
        }
        /*
		original foxpro
            LOCAL nVarAux
            nVarAux = 0.00	&&	Auxiliar para el calculo del nuevo precio	&&
           	HACE LOS CALCULOS PARA EL NUEVO PRECIO DE ETIQUETA CON EL PORCENTAJE APLICADO	\*	
            WITH THISFORM.PAgFr1.PAg003 
               IF THIS.Value # 0.00
                    nVarAux = (this.Value * nVarMon) / 100
                    nVarDesc = nVarAux
                    nVarAux = nVarMon - nVarAux
                    .TxtPet.Value = IIF(nVarAux > 1, ROUND(nVarAux, 4), ROUND(nVarAux, 4))
                ELSE
                    .TxtPet.Value = nVarMon
                ENDIF 
            ENDWITH       
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeDescuento");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcion se ejecuta cuando se hace click sobre el check de sandwich ----*/
function clickCkSandwich(){
    try {
        console.log ("Entrando a clickCkSandwich");

        paso=1; 
        // determinamos si hay o no sanwich
        if (getHaySandwich()){
            paso=2;
            activaSandwich();
        } else {
            paso=3;
            desactivaSandwich();
        }

        /*
		original foxpro
		VALIDA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1 THEN
			HABILITA EL CONTROL	\*
			THISFORM.PAGFR1.PAG003.TXTSAN.ENABLED = .T.
			THISFORM.PAGFr1.PAG003.TXTSAN.Value = cVarSan
			THISFORM.PAGFR1.PAG003.TXTSAN.SETFOCUS
			THISFORM.PAGFr1.PAG003.TXTCOS.Value = nVarPsa
			thisform.pagFr1.pag003.txtdescrip.Enabled = .t.
			thisform.pagFr1.pag003.txtdescrip.ReadOnly = .t.
		ELSE
			DESHABILITA EL CONTROL	\*
			THISFORM.PAGFR1.PAG003.TXTSAN.Value = ""
			THISFORM.PAGFR1.PAG003.TXTSAN.ENABLED = .F.
			THISFORM.PAGFr1.PAG003.TXTCOS.Value = 0.00
			thisform.pagFr1.pag003.txtdescrip.Enabled = .t.
			thisform.pagFr1.pag003.txtdescrip.ReadOnly = .t.
		ENDIF        
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickCkSandwich");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}


/*---- esta funcion se ejecuta cuando se hace click sobre el check de sandwich ----*/
function changeCostoSandwich(){
    try {
        console.log ("Entrando a changeCostoSandwich");
        nVarPsa=0.00;
        costoSandwich=0.00;

        paso=1; 
        // capturamos el precio del sandwich
        if (getCostoSandwich()!="NaN"){
            costoSandwich=getCostoSandwich();
        } else {
            costoSandwich=0.00;
        }
  

        // validamos los datos
        paso=2; 
        if (nVarPsa==0.00){
            paso=3; 
            nVarPsa=costoSandwich;
        }

        // capturamos el precio de la etiqueta
        paso=4; 
        precioEtiqueta=getPrecioEtiqueta();
        console.log ("precio etiqueta changeCostoSandwich 1:",precioEtiqueta);

        // pasamos al costo de la etiqueta el valor
        paso=5; 
        if (costoSandwich==0.00){
            paso=6; 
            precioEtiqueta=precioEtiqueta+costoSandwich-nVarPsa;
        } else {
            paso=7; 
            precioEtiqueta=precioEtiqueta+costoSandwich;
        }

        // pasamos el resultado al precio de la etiqueta
        paso=8; 
        console.log ("precio etiqueta changeCostoSandwich 2:",precioEtiqueta);
        setPrecioEtiqueta(precioEtiqueta);

        /*
		original foxpro
        Pasa el valor a la variable	\*
        IF nVarPsa = 0.00
            nVarPsa = This.Value 
        ENDIF 
        SUMA AL PRECIO DE LA ETIQUETA	\*
        Thisform.pagFr1.pag003.TXTPET.Value = Thisform.pagFr1.pag003.TXTPET.Value + 
        this.value - IIF(this.value = 0.00, nVarPsa, 0.00)      
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoSandwich");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta function se ejecuta cuando se hace click sobre el objeto Ningun Acabado ----*/
function clickNingunAcabado(){
    try {
        console.log ("Entrando a clickNingunAcabado");

        paso=1; 
        // deshabilitamos los objetos de acabados
        if (getNingunAcabado()){
            paso=2; 
            // verificamos si esta activo la reserva de barniz 
            if (getReservaBarniz()){
                paso=3; 
                // actualizamos los clishe adicionales
                nClishe=getCantidadClisheAdicional();
                paso=4; 
                nClishe=nClishe-1;
                // asignamos el resultado 
                paso=5; 
                if (nClishe>0){
                    paso=6; 
                    setCantidadClisheAdicional(nClishe); 
                }
                // desactivamos el control
                paso=7; 
                desseleccionaReservaBarniz1();
                paso=8; 
                desseleccionaAcabadoMate1();
            }

            // verificamos que la reserva de barniz 2 esta activa
            paso=9; 
            if(getReservaBarniz2()){
                paso=10; 
                // actualizamos los clishe adicionales
                nClishe=getCantidadClisheAdicional();
                paso=11; 
                nClishe=nClishe-1;
                // asignamos el resultado 
                paso=12; 
                if (nClishe>0){
                    paso=13; 
                    setCantidadClisheAdicional(nClishe);   
                }
                // desactivamos el control
                paso=14; 
                desseleccionaReservaBarniz2();              
            }
            
            // verificamos si el barniz esta activo
            paso=15; 
            if (getBarniz()){
                paso=16; 
                // actualizamos los clishe adicionales
                nClishe=getCantidadClisheAdicional();
                paso=17; 
                nClishe=nClishe-1;
                paso=18; 
                // asignamos el resultado 
                if (nClishe>0){
                    paso=19; 
                    setCantidadClisheAdicional(nClishe);    
                }
                // desactivamos el control
                paso=20; 
                desseleccionaBarniz();   
                paso=21;
                desseleccionaAcabadoMate2();            
            }

            // verificamos si la malla serigrafica está activa
            paso=22;
            if (getMallaSerigrafica()){
                // actualizamos los clishe adicionales
                paso=23;
                nClishe=getCantidadClisheAdicional();
                paso=24;
                nClishe=nClishe-1;
                // asignamos el resultado 
                paso=25;
                if (nClishe>0){
                    paso=26;
                    setCantidadClisheAdicional(nClishe);    
                }
                // desactivamos el control
                paso=26;
                desseleccionaMallaSerigrafica(); 

                paso=27;
                cadenaFinal=deleteNombreEtqSerigrafias().toUpperCase();

                paso=28;
                setNombreEtiqueta(cadenaFinal);

                paso=29;
                setNombreEtiquetaHeader(cadenaFinal);

            }
            paso=30;
            desactivaAcabadoMate1();

            paso=31;
            desactivaAcabadoMate2();
        
            paso=32;
            setCantidadClisheAdicional(0); 

            paso=33;
            desseleccionaClisheAdicional();

            paso=34;
            seleccionaNingunAcabado();

            paso=35;
            changeClisheAdicional(); 
        }

        /*
		original foxpro
        * deseleccionamos los check
        * actualizamos los cliches adicionales
        * se resta el clishe de reserva de barniz
        IF (thisform.pagFr1.pag003.CHKResBarniz.Value=1)
            IF (thisform.pagFr1.pag003.spiAdi.Value > 0) then
                thisform.pagFr1.pag003.spiAdi.Value=	thisform.pagFr1.pag003.spiAdi.Value-1
            endif
        ENDIF
        * se resta el clishe de reserva de barniz 2
        IF (thisform.pagFr1.pag003.CHKResBarniz2.Value=1)
            IF (thisform.pagFr1.pag003.spiAdi.Value > 0) then
                thisform.pagFr1.pag003.spiAdi.Value=	thisform.pagFr1.pag003.spiAdi.Value-1
            endif
        ENDIF
        * se resta el clishe barniz corrido
        IF (thisform.pagFr1.pag003.CHKBarniz.Value=1)
            IF (thisform.pagFr1.pag003.spiAdi.Value > 0) then
                thisform.pagFr1.pag003.spiAdi.Value=	thisform.pagFr1.pag003.spiAdi.Value-1
            endif
        ENDIF

        * se resta el clishe de serigrafia
        IF (thisform.pagFr1.pag003.chkSerigraf.Value=1)
            IF (thisform.pagFr1.pag003.spiAdi.Value > 0) then
                thisform.pagFr1.pag003.spiAdi.Value=	thisform.pagFr1.pag003.spiAdi.Value-1
            endif
        ENDIF

        thisform.pagFr1.pag003.CHKBarniz.Value=0
        thisform.pagFr1.pag003.chKResBarniz.Value=0
        thisform.pagFr1.pag003.chKResBarniz2.Value=0
        thisform.pagFr1.pag003.CHKMat.Value=0
        thisform.pagFr1.pag003.CHKMat2.Value=0
        thisform.pagFr1.pag003.chkSerigraf.Value=0
        * deshabilitamos el check de mate
        thisform.pagFr1.pag003.CHKMat.Enabled= .F.
        thisform.pagFr1.pag003.CHKMat2.Enabled=.f.
        this.Value=1
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickNingunAcabado");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
}

/*--- esta funcion cuenta cuantos controles estan activos y calcula cuantos
clishes adicionales hacen falta
*/
function calculaClishesAdcionales(){
    try {
        console.log("entrando calculaClishesAdcionales");
        paso=1;
        nClishe=0;
        if (getReservaBarniz()){
            paso=2;
            nClishe++;
        }

        paso=3;
        if (getReservaBarniz2()){
            paso=4;
            nClishe++;
        }
        paso=5;
        if (getBarniz()){
            paso=6;
            nClishe++;
        }
        paso=7;
        if (getMallaSerigrafica()){
            paso=8;
            nClishe++;
        }
        paso=9;
        return (nClishe);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculaClishesAdcionales");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta function se ejecuta cuando se hace click sobre el objeto Ningun Acabado ----*/
function clickReservaBarniz(){
    try {
        console.log ("Entrando a clickReservaBarniz");

        paso=1; 
        // deshabilitamos ningun acabado
        if (getReservaBarniz()){
            console.log("esta activo res barniz 1");
            paso=2;
            // desactivamos ningun acabado
            desseleccionaNingunAcabado();

            // activamos barniz mate 1
            paso=3;
            activaAcabadoMate1();

            // desactivamos barniz corrido
            paso=4;
            if(getBarniz){
                paso=5;
                desseleccionaBarniz();

                paso=6;
                desseleccionaBarniz();

                // desactivamos barniz mate 2
                paso=7;
                desseleccionaAcabadoMate2();                
            }

            // activamos el objeto
            paso=8;
            seleccionaReservaBarniz1();

            // activamos el check de clishe adicional
            paso=9;
            seleccionaClisheAdicional();            
        } else {
            console.log("esta inactivo res barniz 1");
            paso=10;
            desactivaAcabadoMate1();           
        }
        paso=20;
        setCantidadClisheAdicional(calculaClishesAdcionales());
        paso=21;
        changeClisheAdicional(); 

        /*
		original foxpro
        IF this.Value=1 then
            * desactivamos el check ninguno	
            thisform.pagFr1.pag003.chKNinAca.Value=0
            * habilitamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat.Enabled= .T.
            * verificamos si esta activo barniz corrido
            IF (thisform.pagFr1.pag003.chkBarniz.Value=1) then	
                thisform.pagFr1.pag003.chkBarniz.value=0
                thisform.pagFr1.pag003.chkmat2.Value=0
                * verificamos que podamos rebajar el clishe adicional
                IF (thisform.pagFr1.pag003.spiAdi.Value>0) then
                    thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
                ENDIF
            endif
            thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value+1
            * activamos el chek de clishe adicionales
            thisform.pagFr1.pag003.chkAdi.Value=1
        ELSE
            * deshabilitamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat.Enabled= .T.
            * deseleccionamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat.Value=0
            * verificamos que se pueda rebajar el clishe adicional
            IF (thisform.pagFr1.pag003.chkAdi.Value>0) then
                thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
            ELSE
                * descativamos el check de clishe adicional
                thisform.pagFr1.pag003.chkAdi.Value=0
            endif
        ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickReservaBarniz");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
}


/*---- esta function se ejecuta cuando se hace click sobre el objeto Ningun Acabado ----*/
function clickReservaBarniz2(){
    try {
        console.log ("Entrando a clickReservaBarniz2");

        paso=1; 
        // verificamos si el control esta activo 
        if (getReservaBarniz2()){
            console.log("esta activo res barniz 2");
            paso=2;
            // desactivamos ningun acabado
            desseleccionaNingunAcabado();

            // activamos barniz mate 1
            paso=3;
            activaAcabadoMate1();

            // desactivamos barniz corrido
            paso=4;
            if(getBarniz){
                paso=5;
                desseleccionaBarniz();

                // desactivamos barniz mate 2
                paso=6;
                desseleccionaAcabadoMate2();          
            }

            // activamos el objeto
            paso=7;
            seleccionaReservaBarniz2();

            // activamos el check de clishe adicional
            paso=8;
            seleccionaClisheAdicional();
                           
        } else {
            /* 
            debemos crear una funcion que cuente cuantos controles 
            estan activos y sumar selecctivamente
            
            */
            paso=9;
            console.log("esta inactivo res barniz 2");
        }

        paso=20;
        setCantidadClisheAdicional(calculaClishesAdcionales());
        paso=21;
        changeClisheAdicional(); 

        /*
		original foxpro
        * creado el 2025-04-14 para poder adecuarse a las nuevas especificaciones de las etiquetas
        IF this.Value=1 then
            * desactivamos el check ninguno	
            thisform.pagFr1.pag003.chKNinAca.Value=0
            * habilitamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat.Enabled= .T.
            * verificamos si esta activo barniz corrido
            IF (thisform.pagFr1.pag003.chkBarniz.Value=1) then	
                thisform.pagFr1.pag003.chkBarniz.value=0
                thisform.pagFr1.pag003.chkmat2.Value=0
                * verificamos que podamos rebajar el clishe adicional
                IF (thisform.pagFr1.pag003.spiAdi.Value>0) then
                    thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
                ENDIF
            endif	
            * incrementamos los chishe adicionales
            thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value+1
            * activamos el chek de clishe adicionales
            thisform.pagFr1.pag003.chkAdi.Value=1	
        ELSE
            * deshabilitamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat.Enabled= .T.
            * deseleccionamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat.Value=0
            * verificamos que se pueda rebajar el clishe adicional
            IF (thisform.pagFr1.pag003.chkAdi.Value>0) then
                thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
            ELSE
                * descativamos el check de clishe adicional
                thisform.pagFr1.pag003.chkAdi.Value=0
            endif
        ENDIF
        thisform.verificaacabados()

        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickReservaBarniz2");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
}

/*---- esta function se ejecuta cuando se hace click sobre el objeto Ningun Acabado ----*/
function clickBarniz(){
    try {
        console.log ("Entrando a clickBarniz");

        paso=1; 
        // verificamos si el control esta activo 
        if (getBarniz()){
            paso=2;
            // desactivamos ningun acabado
            desseleccionaNingunAcabado();

            paso=3;
            // deshabilitamos las reserva de barniz 1
            if(getReservaBarniz()){
                paso=4;
                desseleccionaReservaBarniz1();         
            }     

            paso=5;
            // deshabilitamos las reserva de barniz 2
            if(getReservaBarniz2()){
                paso=6;
                desseleccionaReservaBarniz2();         
            } 

            // deshabilitamos acabado mate 1
            paso=7;
            desseleccionaAcabadoMate1();

            // habilitamos el mate 2
            paso=8;
            activaAcabadoMate2();
            
            // activamos el check de clishe adicional
            paso=9;
            seleccionaClisheAdicional();

        } else {
            // desactivamos el objeto de acabado mate 2
            paso=10;
            desseleccionaAcabadoMate2();
        }
        paso=20;
        setCantidadClisheAdicional(calculaClishesAdcionales());
        paso=21;
        changeClisheAdicional();        
        /*
		original foxpro
        * creado el 2025-04-14 para poder adecuarse a las nuevas especificaciones de las etiquetas
        IF this.Value=1 then
            * desactivamos el check ninguno	
            thisform.pagFr1.pag003.chKNinAca.Value=0
            * habilitamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat.value=0
            thisform.pagFr1.pag003.CHKMat.Enabled= .T.
            thisform.pagFr1.pag003.CHKMat2.Enabled= .T.
            * deshabilitamos los objetos de reserva de barniz
            IF (thisform.pagFr1.pag003.chKResBarniz.Value=1) then
                thisform.pagFr1.pag003.chKResBarniz.Value=0
                * verificamos si podesm rebajar el cliche adicional
                IF (thisform.pagFr1.pag003.spiAdi.Value>0) then
                    thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
                endif	
            ENDIF
            IF (thisform.pagFr1.pag003.chKResBarniz2.Value=1) then	
                thisform.pagFr1.pag003.chKResBarniz2.Value=0
                * verificamos si podesm rebajar el cliche adicional
                IF (thisform.pagFr1.pag003.spiAdi.Value>0) then
                    thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
                endif		
            ENDIF
            * agregamos el clishe adicional
            thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value+1
            * activamos el check de clishe adicionales
            thisform.pagFr1.pag003.chkAdi.Value=1
        ELSE
            * deshabilitamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat2.Enabled= .T.
            * deseleccionamos el check de acabado mate
            thisform.pagFr1.pag003.CHKMat2.Value=0
            * verificamos que se pueda rebajar el clishe adicional
            IF (thisform.pagFr1.pag003.chkAdi.Value>0) then
                thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
            ELSE
                * descativamos el check de clishe adicional
                thisform.pagFr1.pag003.chkAdi.Value=0
            endif	
        ENDIF
        thisform.verificaacabados()

        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickBarniz");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
}

// esta funcion permite determinar si el nombre de la etiqueta incluye las mayas serigraficas
function searchNombreEtqSerigrafias(){
    resultado=false;
    nombreEtiquetaV="";
    nombreEtiquetaV=getNombreEtiqueta();
    if (nombreEtiquetaV.includes("+ SERIGRAFIA ")){
        resultado=true;
    } else if (nombreEtiquetaV.includes("+ SERIGRAFIA")){
        resultado=true;
    } else if (nombreEtiquetaV.includes("+SERIGRAFIA")){
        resultado=true;
    }
    return (resultado);
}

// esta funcion elimina las serigrafias del nombre de la etiqueta
function deleteNombreEtqSerigrafias(){
    try {
        console.log ("entrando deleteNombreEtqSerigrafias")
        paso=1;
        resultado=false;
        paso=2;
        cadenaFinal="";
        paso=3;
        nombreEtiquetaV=getNombreEtiqueta();
        console.log ("nombre de la etiqueta ",nombreEtiquetaV);
        paso=4;
        if (nombreEtiquetaV.includes("+ SERIGRAFIA ")){
            paso=5;
            cadenaFinal=nombreEtiquetaV.replace("+ SERIGRAFIA ", "");
            paso=6;
        } else if (nombreEtiquetaV.includes("+ SERIGRAFIA")){
            paso=7;
            cadenaFinal=nombreEtiquetaV.replace("+ SERIGRAFIA", "");
            paso=8;
        } else if (nombreEtiquetaV.includes("+SERIGRAFIA")){
            paso=9;
            cadenaFinal=nombreEtiquetaV.replace("+SERIGRAFIA", "");
            paso=10;
        } else{
            cadenaFinal=nombreEtiquetaV;
        }
        paso=11;
        return (cadenaFinal);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo cambiaTipoCotizacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  

}

/*---- esta function se ejecuta cuando se hace click sobre el objeto Ningun Acabado ----*/
function clickMallaSerigrafica(){
    try {
        console.log ("Entrando a  clickMallaSerigrafica");

        paso=1; 
        nombreFinalEtq="";
        // verificamos si el control esta activo 
         paso=2;
        if (getMallaSerigrafica()){
             paso=3;
            // desactivamos ningun acabado
            desseleccionaNingunAcabado();

            paso=4;
            // verificamos que el nombre no contenga la frase "+ SERIGRAFIA "
            if (searchNombreEtqSerigrafias()){
                paso=5;
                // eliminamos las serigrafias 
                cadenaFinal=deleteNombreEtqSerigrafias().toUpperCase();
                console.log ("borrando serigrafia del nombre",cadenaFinal);
            } else {
                 paso=6;
                cadenaFinal=getNombreEtiqueta().toUpperCase();
                console.log ("sin borrado del nombre",cadenaFinal);
            }
            // agregamos "+ SERIGRAFIA " al inicio del nombre
            paso=7;
            nombreFinalEtq="+ SERIGRAFIA "+cadenaFinal;
            console.log ("resultado final",nombreFinalEtq);

            // asignamos el resultado al nombre de la etiqueta
            paso=8;
            setNombreEtiqueta(nombreFinalEtq);

            paso=9;
            setNombreEtiquetaHeader(nombreFinalEtq);            
            
            // activamos el check de clishe adicional
            paso=10;
            seleccionaClisheAdicional();

        } else {
            // desactivamos las mallas serigraficas
            paso=11
            cadenaFinal=deleteNombreEtqSerigrafias();
            console.log ("borrando serigrafia del nombre",cadenaFinal);

            // asignamos el resultado al nombre de la etiqueta
            paso=12;
            setNombreEtiqueta(cadenaFinal);
            
            paso=13;
            setNombreEtiquetaHeader(cadenaFinal);
        }
        paso=20;
        setCantidadClisheAdicional(calculaClishesAdcionales());
        paso=21;
        changeClisheAdicional();        
        /*
		original foxpro
        paso=1
        thisform.pagFr1.pag003.chKNinAca.Value=0
        cVarDescripcion=UPPER(ALLTRIM(thisform.pagFr1.pag002.txtEtq.Value))	
        IF this.Value=1
            paso=2
            IF (AT("+ SERIGRAFIA ",cVarDescripcion)>=1)
                paso=3
                cVarFinal=STRTRAN(cVarDescripcion,"+ SERIGRAFIA ","")
            ELSE
                paso=4
                IF (AT("+ SERIGRAFIA",cVarDescripcion)>=1)
                    paso=5
                    cVarFinal=STRTRAN(cVarDescripcion,"+ SERIGRAFIA","")
                ELSE
                    paso=7
                    IF (AT("+SERIGRAFIA",cVarDescripcion)>=1)
                        paso=9
                        cVarFinal=STRTRAN(cVarDescripcion,"+SERIGRAFIA","")
                    ELSE
                        cVarFinal=cVarDescripcion
                    endif
                endif
            ENDIF
            paso=10
            cVarDescripcion="+ SERIGRAFIA " + cVarFinal
            paso=11
            thisform.pagFr1.pag002.txtEtq.Value=cVarDescripcion
            thisform.label3.Caption=cVarDescripcion
            
            * agregamos el clishe adicional
            thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value+1
            * activamos el chek de clishe adicionales
            thisform.pagFr1.pag003.chkAdi.Value=1		
        ELSE
            * no lleva malla serigrafica
            cVarDescripcion=UPPER(ALLTRIM(thisform.pagFr1.pag002.txtEtq.Value))
            paso=12
            IF (AT("+ SERIGRAFIA ",cVarDescripcion)>=1)
                paso=13		
                cVarFinal=STRTRAN(cVarDescripcion,"+ SERIGRAFIA "," ")
            ELSE
                paso=14
                IF (AT("+ SERIGRAFIA",cVarDescripcion)>=1)
                    paso=15
                    cVarFinal=STRTRAN(cVarDescripcion,"+ SERIGRAFIA"," ")
                ELSE
                    paso=17
                    IF (AT("+SERIGRAFIA",cVarDescripcion)>=1)
                        paso=18
                        cVarFinal=STRTRAN(cVarDescripcion,"+SERIGRAFIA"," ")
                    endif
                endif
            ENDIF
            paso=20
            cVarDescripcion=UPPER(ALLTRIM(cVarFinal))
            paso=21
            thisform.pagFr1.pag002.txtEtq.Value=cVarDescripcion
            thisform.label3.Caption=cVarDescripcion

            * verificamos que se pueda rebajar el clishe adicional
            IF (thisform.pagFr1.pag003.chkAdi.Value>0) then
                thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
            ELSE
                * descativamos el check de clishe adicional
                thisform.pagFr1.pag003.chkAdi.Value=0
            endif	
        endif	
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error  clickMallaSerigrafica");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }   
}

function changeNombreEtiqueta(){
    // pasmos el nombre de la etiqueta que contiene el campo a texto al header
    cadenaFinal=getNombreEtiqueta().toUpperCase();
    setNombreEtiqueta(cadenaFinal);
    setNombreEtiquetaHeader(cadenaFinal);
}

/*----- esta funcion se ejecuta cuando el usuario activa el check de laminado -----*/
function clickChkLaminado(){
    try {
        console.log ("Entrando a clickChkLaminado");

        paso=1; 
        // determinamos si esta activo el control
        if (getLaminado()){
            paso=2;
            // esta activo
            setCostoLaminado(nTMP_PLA);
            paso=3;
            // habilitamos los controles
            activaMateLaminado();
            paso=4;
            activaCodigoLaminado();
            paso=5;
            setCodigoLaminado(cVarLam);
        } else {
            // esta inactivo
            // se asgina el valor del costo
            paso=6;
            setCostoLaminado(0.00);
            paso=7;
            desactivaMateLaminado();
            paso=8;
            desseleccionaMateLaminado();
            paso=9;
            setCostoLaminado(0.00);
            paso=10;
            setDescripcionLaminado("");
            paso=11;
            setCodigoLaminado("");
            paso=12;
            desactivaCodigoLaminado();
        }
        /*
		original foxpro
		VALIDA SI ESTA SELECCIONADO	\*
		IF THIS.VALUE = 1 THEN
			*{	Asigna el precio de laminado	}*
			Thisform.PagFr1.Pag003.TxtCosLam.Value = nTMP_PLA
			HABILITA EL CONTROL	\*
			thisform.pagFr1.pag003.chkmate.Enabled = .t.
			THISFORM.PAGFR1.PAG003.TXTCOL.ENABLED = .T.
			THISFORM.PAGFr1.PAG003.TXTCOL.Value = cVarLam
			THISFORM.PAGFR1.PAG003.TXTCOL.SETFOCUS
			Thisform.pagFr1.pag003.txtdel.Enabled = .t.
			thisform.pagFr1.pag003.txtdEL.ReadOnly = .t.
		ELSE
			*{	Asigna el precio de laminado	}*
			Thisform.PagFr1.Pag003.TxtCosLam.Value = 0.00
			DESHABILITA EL CONTROL	\*
			thisform.pagFr1.pag003.chkmate.Value = 0
			thisform.pagFr1.pag003.chkmate.Enabled = .F.
			THISFORM.PAGFR1.PAG003.TXTCOL.Value = ""
			THISFORM.PAGFR1.PAG003.TXTCOL.ENABLED = .F.
			Thisform.pagFr1.pag003.txtdel.Enabled = .t.
			thisform.pagFr1.pag003.txtdEL.ReadOnly = .t.
		ENDIF
		*{	Actualiza el factor	}*
		*.PAG003.TxtFac.VALUE = .PAG003.TxtFac.VALUE        
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkLaminado");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*--- esta funcion se ejecuta cuando cambia el costo de la laminacion por efectos de carga de data 
de un renglon de cotizacion --------*/
function changeCostoLaminacion(){
    try {
        console.log ("Entrando a changeCostoLaminacion");

        paso=1; 
        // capturamos el porcentaje de seguridad
        porcentajeSeguridad=getPorcentajeSeguridad();

        paso=2;
        nVarAux= (1 + (porcentajeSeguridad / 100));

        paso=3;
        costoLaminacion=getCostoLaminado();

        PASO=3;
        setCostoLaminado((costoLaminacion * nVarAux));

        PASO=4;
        calculos17();

        /*
		original foxpro
        LOCAL nVarAux
        nVarAux = (1 + (nVarPse / 100))
        WITH thisform
            *{	Aplica el porcentaje de seguridad	}*
            This.Value = This.Value * nVarAux
            LLAMA AL METODO QUE HACE EL CALCULO	\*
            .oTMP_CAL(17)
        ENDWITH 
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoLaminacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/*--------- esta funcion se ecjuta cuando el usuario hace click sobre ningun acabado ----*/
function clickChkNingunAcabado(){
    try {
        console.log ("Entrando a clickChkNingunAcabado");

        paso=1;
        // validamos el el objeto esté seleccionado
        if (getNingunAcabado()){
            // deja en cero el costo de los foils
            paso=2;
            setCostoFoil1(0.00); 
            // desencadenamos la funcion de cambio del costo de foil1
            paso=3;
            changeCostoFoil1();
            // cambiamos el
            setCostoFoil2(0.00);
            paso=4;
            // desencadenamos la funcion de cambio del costo de foil2
            changeCostoFoil2();
            // cambiamos a cero el costo total del foil
            paso=5;
            setCostoTotalFoil(0.00);
            // desencadenamos la funcion de cambio del costo total del foil
            paso=6;
            changeCostoTotalFoil();
            // cambiamos el ancho del foil
            paso=7;
            setAnchoFoil(0.00);
            // limpiamos el color del foil 1
            paso=8;
            setColorFoil1("");
            // limpiamos el color del foil 2
            paso=9;
            setColorFoil2("");
            // validamos los datos

            // validamos si el foil 1 esta activo
            paso=10;
            if (getFoil1()){
                paso=11;
                // verificamos que podamos rebajar el chishe adicional
                clisheAdicional=getCantidadClisheAdicional();   
                paso=12;             
                if (clisheAdicional>0){
                    paso=13;
                    // hay clishe adicionales decrementamos en uno
                    clisheAdicional--;
                    paso=14;
                    setCantidadClisheAdicional(clisheAdicional);
                    paso=15; 
                    deseleccionaChkFoil1();
                } else {
                    paso=16;
                    setCantidadClisheAdicional(0);
                    paso=17;
                    desseleccionaClisheAdicional();
                }
            }            

            // validamos si el foil 2 esta activo
            paso=18;
            if (getFoil2()){
                paso=19;
                // verificamos que podamos rebajar el chishe adicional
                clisheAdicional=getCantidadClisheAdicional();     
                paso=20;           
                if (clisheAdicional>0){
                    paso=21;           
                    // hay clishe adicionales decrementamos en uno
                    clisheAdicional--;
                    paso=22;           
                    setCantidadClisheAdicional(clisheAdicional);
                    paso=23; 
                    deseleccionaChkFoil2();
                } else {
                    paso=24;
                    setCantidadClisheAdicional(0);
                    paso=25;
                    desseleccionaClisheAdicional();
                }                
            }      
            //desactivamos el check de foil1
            paso=26;
            deseleccionaChkFoil1();          
            //desactivamos el check de foil2
            paso=27;
            deseleccionaChkFoil2();          

        }
        /*
		original foxpro
        **	Deja en cero es costo del foil	**
        THISFORM.PAGFr1.PAG003.TxtCosFoil.VALUE = 0.000
        ** agregado eudo 2023-07-03
        THISFORM.PAGFr1.PAG003.TxtCosFoil2.VALUE = 0.000
        THISFORM.PAGFr1.PAG003.TxtCosTotFoil.VALUE = 0.000	
        **********************************************************************************************
        * agregado el 2025-02-20 para limpar los objetos de indicación de ancho del servicio y colores de los foils
        thisform.pagFr1.Pag003.txtAnchoFoil.Value=""
        thisform.pagFr1.Pag003.txtColorFoil1.Value=""
        thisform.pagFr1.Pag003.txtColorFoil2.Value=""
        * esta encendico el check?
        IF (thisform.pagFr1.Pag003.chkFoil1.Value=1) then
            * verificamos que podamos rebajar el clishe adicional
            IF (thisform.pagFr1.pag003.spiAdi.Value > 0) then
                thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
            ELSE
                * desactivamos el check de clishe adicionales
                thisform.pagFr1.pag003.chkAdi.Value=0
            ENDIF
            thisform.pagFr1.Pag003.chkFoil1.Value=0
        ENDIF
        * esta encendico el check?
        IF (thisform.pagFr1.Pag003.chkFoil2.Value=1) then
            * verificamos que podamos rebajar el clishe adicional
            IF (thisform.pagFr1.pag003.spiAdi.Value > 0) then
                thisform.pagFr1.pag003.spiAdi.Value=thisform.pagFr1.pag003.spiAdi.Value-1
            ELSE
                * desactivamos el check de clishe adicionales
                thisform.pagFr1.pag003.chkAdi.Value=0
            ENDIF
            thisform.pagFr1.Pag003.chkFoil2.Value=0
        ENDIF
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkNingunAcabado");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}

/*---- esta funcion se ejecuta cuando el usuario activa el objeto hotfoil ----*/
function clickChkHotFoil(){
    try {
        console.log ("Entrando a clickChkHotFoil");

        paso=1;
        // predeterminamos el tipo de foil
        cVarFoil = "H";
        paso=2;
        // capturamos el ancho de foil
        anchoFoil=getAnchoFoil();
        paso=3;
        // tipo de empresa
        db=document.getElementById('selectedEnterprise').value;
        paso=4;
        //capturamos el color del foil1
        colorFoil1=getColorFoil1();
        paso=5;
        colorFoil2=getColorFoil2();        

        // abrimos el formulario de foil
        paso=6;
        const anchoVentana = screen.width*0.25;
        paso=7;
        const altoVentana = screen.height*0.55;   
        paso=8;      
        const izquierda = (screen.width - anchoVentana) / 2;
        paso=9;
        const arriba = (screen.height - altoVentana) / 2;               
        paso=10;
        window.open("/maestro_foils/?tipoFoil="+cVarFoil+"&anchoFoil="+anchoFoil+"&db="+db+"&colorFoil1="+colorFoil1+"&colorFoil2="+colorFoil2,"_master_troqueles",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);

        /*
		original foxpro
        *	INGRESA EL VALOR INDICADO	\*	
        cVarFoi = "F"
        * esto le pasa el valor del ancho del foil a la variable publica
        AnchoTxt=thisform.pagFr1.pag003.txtAnchoFoil.Value
        * verificamos que el objeto foil1 o foil2 esten activos
        IF FILE(SYS(5) + CURDIR() + "REPORTS\FRMSERV3.SCT") AND FILE(SYS(5) + CURDIR() + "REPORTS\FRMSERV3.SCX")
            *	ASIGNA EL CLISHE ADICIONAL	\*

            *	Muestra el formulario	\*
            DO FORM(SYS(5) + CURDIR() + "REPORTS\FRMSERV3.SCX")
        ELSE
            MESSAGEBOX(	" No se pueden localizar los archivos " + CHR(13) + ;
                        "     [FRMSERV3.SCT] / [FRMSERV3.SCX]" + CHR(13) + ;
                        "    no se podrá ejecutar el proceso ", 0 + 48, cTMP_TIT)
        ENDIF 		

        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkHotFoil");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*---- esta funcion se ejecuta cuando el usuario activa el objeto colfoil ----*/
function clickChkColdFoil(){
    try {
        console.log ("Entrando a clickChkColdFoil");

        paso=1;
        // predeterminamos el tipo de foil
        cVarFoil = "C";
        paso=2;
        // capturamos el ancho de foil
        anchoFoil=getAnchoFoil();
        // tipo de empresa
        paso=3;
        db=document.getElementById('selectedEnterprise').value;
        //capturamos el color del foil1
        paso=4;
        colorFoil1=getColorFoil1();
        paso=5;
        colorFoil2=getColorFoil2();

        // abrimos el formulario de foil
        paso=6;
        const anchoVentana = screen.width*0.25;
        paso=7;
        const altoVentana = screen.height*0.55;      
        paso=8;   
        const izquierda = (screen.width - anchoVentana) / 2;
        paso=9;
        const arriba = (screen.height - altoVentana) / 2;               
        paso=10;
        window.open("/maestro_foils/?tipoFoil="+cVarFoil+"&anchoFoil="+anchoFoil+"&db="+db+"&colorFoil1="+colorFoil1+"&colorFoil2="+colorFoil2,"_master_troqueles",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
        /*
		original foxpro
        *	INGRESA EL VALOR INDICADO	\*	
        cVarFoi = "F"
        * esto le pasa el valor del ancho del foil a la variable publica
        AnchoTxt=thisform.pagFr1.pag003.txtAnchoFoil.Value
        * verificamos que el objeto foil1 o foil2 esten activos
        IF FILE(SYS(5) + CURDIR() + "REPORTS\FRMSERV3.SCT") AND FILE(SYS(5) + CURDIR() + "REPORTS\FRMSERV3.SCX")
            *	ASIGNA EL CLISHE ADICIONAL	\*

            *	Muestra el formulario	\*
            DO FORM(SYS(5) + CURDIR() + "REPORTS\FRMSERV3.SCX")
        ELSE
            MESSAGEBOX(	" No se pueden localizar los archivos " + CHR(13) + ;
                        "     [FRMSERV3.SCT] / [FRMSERV3.SCX]" + CHR(13) + ;
                        "    no se podrá ejecutar el proceso ", 0 + 48, cTMP_TIT)
        ENDIF 		
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error clickChkColdFoil");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*---- esta funcions e ejecuta cuando cambia el costo del material ----*/
function changeCostoMaterial(){
    try {
        console.log ("Entrando a changeCostoMaterial");
        paso=1;
        // capturamos el ancho de bobina
        anchoBobina=getAnchoBobina();

        // capturamos el costo del material
        paso=2;
        costoMaterial=getCostoMaterial();

        // capturamos el avance de etiqueta
        paso=3;
        avanceEtiqueta=getAvanceEtiqueta();

        // capturamos los metros cuadrados
        paso=4;
        mtrs2Etiquetas=getMtrs2Etiquetas();

        // capturamos el anchio de bobina en la seccion costos
        paso=5;
        anchoBobinaCostos=getCostoAnchoBobina();

        // capturamos los metros lineales
        paso=6;
        mtrsLineales=getMtrsLineales();

        // validamos los datos
        // HACE EL CALCULO DE MATERIAL POR ETIQUETAS
        paso=7;
        if ((anchoBobina!=0.00) && (costoMaterial!=0.00) && (avanceEtiqueta!=0.00)){
            paso=8;
            calculos9();
        }

        // HACE EL CALCULO DEL PRECIO TOTAL DEL MATERIAL
        // validamos los datos 
        paso=9;
        if ((costoMaterial!=0.00) && (mtrs2Etiquetas!=0.00)){
            paso=10;
            calculos10();
        }

        // HACE EL CALCULO DEL DESPERDICIO DE BOBINA ADICIONA
        paso=11;
        if ((getAsumirDesperdicio()==false) && (anchoBobina!=0.00)){
            paso=12;
            // calculamos la direncia por ancho de bobina
            nTMP_DIF=anchoBobinaCostos-anchoBobina;
            //HACE LA VALIDACION PARA VER SI HACE EL CALCULO POR DESPERDICIO ADICIONAL
            paso=13;
            setDifAncho(nTMP_DIF);

            paso=14;
            if (nTMP_DIF>0){
                paso=15;
                if (metrosLineales!=0.00){
                    paso=16;
                    calculos20();
                }
            }
        }
        // asignamos el valor al objeto en la pagina resumen
        paso=17;
        setResumenCostoMateriales(costoMaterial);
        /*
		original foxpro
		*HACE EL CALCULO DE MATERIAL POR ETIQUETAS	\*
		WITH THISFORM
			*VALIDA LOS CAMPOS NECESARIOS	\*
			IF (.PAGFR1.PAG001.TXTABO.VALUE) # 0.00 AND ;
			   (THIS.VALUE) # 0.00 AND .PAGFR1.PAG001.SPIAVA.VALUE # 0.00
			   	LLAMA AL METODO QUE HACE EL CALCULO	\*
			   .oTMP_CAL(9)
			ENDIF
			*HACE EL CALCULO DEL PRECIO TOTAL DEL MATERIAL	\*
			*VALIDA LOS CAMPOS NECESARIOS	\*
			IF (THIS.VALUE) # 0.00 AND (.PAGFR1.PAG001.TXTMT2.VALUE) # 0.00
					LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(10)
			ENDIF
			*HACE EL CALCULO DEL DESPERDICIO DE BOBINA ADICIONAL	\*
			*VALIDA LOS DATOS NECESARIOS	\*
			IF .PAGFR1.PAG001.TXTABO.VALUE # 0.00 AND .PAGFR1.PAG003.CHKDES.VALUE = 0 
                	*HACE EL CALCULO A VER SI HAY DIFERENCIA DE ANCHO DE BOBINA	\*
                nTMP_DIF = .PAGFR1.PAG003.TXTANC.VALUE - .PAGFR1.PAG001.TXTABO.VALUE
                *DIFERENCIA POR ANCHO DE BOBINA	\*
                .PAGFR1.PAG003.TXTDIF.VALUE = nTMP_DIF
                *HACE LA VALIDACION PARA VER SI HACE EL CALCULO POR DESPERDICIO ADICIONAL	\*
                IF nTMP_DIF > 0.00 THEN
                    *VALIDA DATOS NECESARIOS	PARA EL CALCULO	\*
                    IF .PAGFR1.PAG001.TXTMTL.VALUE != 0 
                        *LLAMA AL METODO QUE HACE EL CALCULO	\*
                        .oTMP_CAL(20)
                    ENDIF
                ENDIF
            ENDIF
            *ASIGNA EL VALOR AL PAGE 4 DE RESUMEN	\*
            THISFORM.PAGFR1.PAG004.TXTCMA.VALUE = THIS.VALUE			
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeCostoMaterial");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}

/*---- esta funcions e ejecuta cuando cambia el el valor de los clishe adicionales ----*/
function changeClisheAdicional(){
    try {
        console.log ("Entrando a changeClisheAdicional");
        paso=1;

        if (getCantidadClisheAdicional()>0){
            paso=2;
            calculos18();
        } else {
           calculos18(); 
        }
        /*
		original foxpro
		HACE EL CALCULO DEL PRECIO DEL TOTAL DEL CLISHE		\*
		WITH THISFORM
			VALIDA CAMPOS OBLIGATORIOS					\*
			IF THIS.VALUE != 0 
				LLAMA AL METODO QUE HACE EL CALCULO	\*
				.oTMP_CAL(18)
			ENDIF
		ENDWITH
        */
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeClisheAdicional");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }       
}


/**********************************************************************/
/* funciones de cambio de la division Resumen                         */
/**********************************************************************/		

function changeResumenMontoEtq(){
    comisionesVendedor();
}


