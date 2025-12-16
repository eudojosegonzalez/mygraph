// este arreglo contendra los datos de una cotización
// podrá ser anexadoe elementos o eliminados segun necesidad
let myPersistentArray = [];

const storedArray = localStorage.getItem('myArrayKey'); // 'myArrayKey' is the key for your array

if (storedArray) {
    // If data exists, parse it back into a JavaScript array
    myPersistentArray = JSON.parse(storedArray);
}

function salir (){
    var cadena="<span class='text-danger'>¿Desea salir del proceso?<br>";
    cadena=cadena+"La información que no haya guardado se perderá</span><br><br>";
    cadena=cadena+"<div class='text-center'><input type='button' class='btn btn-danger' value='Salir' onclick='javascript:cierraVentana()'>";
    cadena=cadena+"&nbsp;<input type='button' class='btn btn-success' value='Continuar' onclick='javascript:continuar()' ></div>";    
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    try {
        $('#miModal').appendTo('body');
    } catch (e) {
        // Si falla el append, seguimos intentando mostrar el modal de todos modos
        console.warn('No se pudo mover el modal a body:', e);
    }    
    $('#miModal').modal('show');
}

function Salir(){
    $('#miModal').modal('hide');
    window.close();
}

function continuar(){
    $('#miModal').modal('hide');
}

// esta funcion cierra la ventana de cotización
function cierraVentana(){
    //var r = confirm ("Desea cerrar esta ventana?\nLa información que no haya guardado se perderá")
    //if (r){
        
        cleanAll();
        window.opener.document.location.reload();
        window.close();  
    //}
          
}

// esta funcion permite cerrar un cuadro modal que se usa para emitir mensajes en formato html
function cierraModal() {
    $('#miModal').modal('hide');
}  


// esta funcion permite cerrar un cuadro modal que se usa para mostrar los comentarios de el pedido
function cierraModalComentario() {
    $('#miModalAdicionalComentario').modal('hide');
}  

// esta funcion guarda el comentario de la pedido en un cuadro de texto invisible 
function guardarObservacion(){
    console.log (document.getElementById('adicionalComentario').value.trim());
    document.getElementById('comentarioCotizacionAdicionales').value=document.getElementById('adicionalComentario').value.trim();
    $('#miModalAdicionalComentario').modal('hide');
}

// activa la pestaña generales aqui están la mayoria de los detalles de el pedido
function generales(){
    //console.log("1");
    document.getElementById('divGenerales').style.visibility="visible";
    document.getElementById('divLista').style.visibility="hidden";
    document.getElementById('divAdicionales').style.visibility="hidden";
}        

// activa la pestaña lista
function lista(){
    //console.log("2");
    document.getElementById('divGenerales').style.visibility="hidden";
    document.getElementById('divLista').style.visibility="visible";
    document.getElementById('divAdicionales').style.visibility="hidden";
}  

// activa la pestaña adicionañes
function adicionales(){
    //console.log("3");
    document.getElementById('divGenerales').style.visibility="hidden";
    document.getElementById('divLista').style.visibility="hidden";
    document.getElementById('divAdicionales').style.visibility="visible";
}    

// esta función permite cambiar entre las distintas pestañas de el pedido Generales/Lista/Adicionales
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

            if (textoEnlace === 'generales') {
                generales();
            } else if (textoEnlace === 'lista') {
                lista();
            } else if (textoEnlace === 'adicionales') {
                adicionales();
            }                    
        });
    });
}); 

// esta seccion inicializa los objetos e invoca la limpieza del arreglo persistente
document.addEventListener('DOMContentLoaded', (event) => {

    // Tu arreglo persistente
    let myPersistentArray;
    console.log ("Entrando a new myPersistentArray",myPersistentArray);
    // Obtener el arreglo del almacenamiento local
    const storedArray = localStorage.getItem('miArrayPersistente');
    if (storedArray) {
        myPersistentArray = JSON.parse(storedArray);
    } else {
        myPersistentArray = [];
    }

    // datosDesdePHP
    // Borra la clave 'miArrayPersistente' del localStorage
    // Borra la clave 'miArrayPersistente' del localStorage
    //localStorage.removeItem('myArrayKey');     
    cleanAll();
    addItem();
    console.log ("myPersistentArray 1",myPersistentArray);
    console.log ("datosDesdePHP 1",datosDesdePHP);
    viewDetallesPedido(datosDesdePHP);
    console.log ("myPersistentArray 2",myPersistentArray);
    InitialActiveObject ();

}); 

// esta funcion activa los objetos de form inicial al cargar el formulario
function InitialActiveObject (){
    document.getElementById('btnProcessEspe2').disabled=false;
    document.getElementById('imgProcessEspe2').classList.remove('shadow-red');
    document.getElementById('imgProcessEspe2').classList.add('shadow-white');   
    
    // activamos la opcion de imprimir
    document.getElementById('btnPrintCotizacion').disabled=false;
    document.getElementById('imgPrintCotizacion').classList.remove('shadow-red');
    document.getElementById('imgPrintCotizacion').classList.add('shadow-white'); 

    // actiavmos restaurar cotizacion
    document.getElementById('btnRestoreCotizacion').disabled=false;
    document.getElementById('imgRestoreCotizacion').classList.remove('shadow-red');
    document.getElementById('imgRestoreCotizacion').classList.add('shadow-white'); 
     
}

// esta funcion busca una variable dentro de un comentario de cotización
// cVarComentario es el comentario que viene de un pedido desde la base de datos 
// cVarVariable es el nombre de la variabl que estamos buscando dentro del comentario 
/*
    Ejemplos de variables
    TipTro=N;
    CotPre=E;
    TroCod=NUEVO    
*/
function searchVariable(cVarComentario,cVarVariable){
    var aVariables=cVarComentario.split(";");
    var n=aVariables.length;
    var valor="";
    for (j=0; j < n; j++){
        cVarContenido=aVariables[j];
        if (cVarContenido.includes(cVarVariable)){
            aTemp=cVarContenido.split("=");
            valor=aTemp[1];
        }
    }
    return (valor);
}

// esta función busca una cotización dentro de la base de datos
function searchPedido(){
    let inputUsuario;
    let esNumeroEntero = false;
    while (!esNumeroEntero) {
        inputUsuario = prompt("Numero de Pedido a Buscar");

        // 1. Validar si el usuario canceló o dejó el campo vacío
        /*
        if (inputUsuario === null) {
            // El usuario hizo clic en "Cancelar"
            alert("Operación cancelada. No se introdujo ningún número.");
            return null; // O puedes lanzar un error, o devolver un valor por defecto
        }*/

        if (inputUsuario.trim() === "") {
            alert("No introdujiste ningún valor. Por favor, introduce un número entero.");
            continue; // Vuelve a pedir el valor
        }

        // 2. Intentar convertir a número y verificar si es un entero
        const numero = Number(inputUsuario);

        // isNaN() verifica si no es un número.
        // Number.isInteger() verifica si el número es un entero.
        if (!isNaN(numero) && Number.isInteger(numero)) {
            // Borra la clave 'miArrayPersistente' del localStorage
            cleanAll();
            esNumeroEntero = true; // El valor es un número entero válido
            searchPedido2(inputUsuario);
        } else {
            alert("Entrada inválida. Por favor, introduce un número entero válido.");
        }
    }
}

// esta funcion borra el localStore para limpiar la memoria del navegador
function cleanAll(){
    try {
        console.log ("Entrando a cleanAll");
        paso=1;
        myPersistentArray =[];
        paso=2;
        localStorage.removeItem('myArrayKey'); 
        paso=3;
        // limpiamos los totales de facturas
        document.getElementById('subTotal').value=parseFloat("0.00").toFixed(2);
        paso=4;
        document.getElementById('ivaGeneral').value=parseFloat("0.00").toFixed(2);
        paso=5;
        document.getElementById('otrosMontos').value=parseFloat("0.00").toFixed(2);
        paso=6;
        document.getElementById('total').value=parseFloat("0.00").toFixed(2);
        paso=7;
        document.getElementById('coArt2').value="";
        paso=8;
        document.getElementById('desArt2').value="";
        paso=9;
        document.getElementById('adicionalComentario').value="";
        paso=10;
        document.getElementById('comentarioCotizacionAdicionales').value="";
        // limpiamos los objetos de adicionales 
        paso=11;
        document.getElementById('nombreClienteAdicionales').value='';
        paso=12;
        document.getElementById('rifClienteAdicionales').value='';
        paso=13;
        document.getElementById('nitClienteAdicionales').value='';
        paso=14;
        document.getElementById('telefonoClienteAdicionales').value='';
        paso=15;
        document.getElementById('nocAdicionales').value='';
        paso=16;
        document.getElementById('campo2').value='';
        paso=17;
        document.getElementById('usuarioAdicionales').value='';
        paso=18;
        document.getElementById('campo4').value='';
        paso=19;
        document.getElementById('comisionAdicionales').value='';
        paso=20;
        document.getElementById('campo6').value='';
        paso=21;
        document.getElementById('fechaAdicionales').value='';
        paso=22;
        document.getElementById('aprobadoAdicionales').value='';        
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error cleanAll");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }          

 
}

/*
Esta funcion se usa para encontrar la primera cotización en la base de datos
*/
function searchFirst(){
    //------------------------
        empresaSeleccionada=document.getElementById("selectEmpresa").value;
        $.ajax({
        url: "/first_pedido",
        type: "get",
        dataType: "html",
        data:{
            db:empresaSeleccionada
        }
    }).done(function (res) {
        console.log (res);
        var data = JSON.parse(res);                
        //console.log  (data.valor);                                      
        if (data.valor==1){
            //console.log ("si");
            cotizacion=data.cotizacion;
            datos=data.data;
            document.getElementById('numero').value=datos[0].fact_num;
            viewDetallesPedido(datos);
        } else {
            alert ("Ocurrió un error que no pudo ser controlado\nInténtelo de nuevo");
        }
    });   
}

/*
esta funcin se usa para buscar la ultima contización en la base de datos
*/
function searchLast(){
   //------------------------
        empresaSeleccionada=document.getElementById("selectEmpresa").value;
        $.ajax({
        url: "/last_pedido",
        type: "get",
        dataType: "html",
        data:{
            db:empresaSeleccionada
        }
    }).done(function (res) {
        //console.log (res);
        var data = JSON.parse(res);                
        //console.log  (data.valor);                                      
        if (data.valor==1){
            //console.log ("si");
            cotizacion=data.cotizacion;
            datos=data.data;
            document.getElementById('numero').value=datos[0].fact_num;
            viewDetallesPedido(datos);
        } else {
            alert ("Ocurrió un error que no pudo ser controlado\nInténtelo de nuevo");
        }
    });   
}

function searchPrev(){
    var numero=parseInt(document.getElementById('numero').value);
    if (numero > 0){
        numero=numero-1;
         searchPedido2(numero);
    } else {
        alert ("El numero de Pedido es inválido")
    }
}

function searchNext(){
    var numero=parseInt(document.getElementById('numero').value);
    if (numero > 0){
        numero=numero+1;
         searchPedido2(numero);
    } else {
        alert ("El numero de pedido es inválido")
    }
}

// esta funcion activa los elementos dce edicion del menu
function activeEditElements(){
    try {
        console.log ("entrando activeEditElements")
        paso=1;
        // deshabilitar los links
        document.getElementById('imgAddItem').classList.remove('shadow-red');
        paso=2;
        document.getElementById('imgDeleteItem').classList.remove('shadow-red'); 
        paso=3;
        document.getElementById('imgSaveCotizacion').classList.remove('shadow-red');
        paso=4;
        document.getElementById('imgRestoreCotizacion').classList.remove('shadow-red');
        paso=5;
        document.getElementById('imgDeleteCotizacion').classList.remove('shadow-red');
        paso=6;
        document.getElementById('imgReorderCotizacion').classList.remove('shadow-white');
        paso=7;
        document.getElementById('imgNextCode').classList.remove('shadow-white');
        paso=8;
        document.getElementById('imgExportRecord').classList.remove('shadow-white');
        paso=9;
        document.getElementById('imgImportar').classList.remove('shadow-red');
        paso=10;
        document.getElementById('imgConsultarClientes').classList.remove('shadow-red');       
        paso=11;
        document.getElementById('imgAnular').classList.remove('shadow-red');   
        paso=12;
        document.getElementById('imgProcesarDocumento').classList.remove('shadow-red'); 
        paso=13;
        document.getElementById('imgMargenGanancia').classList.remove('shadow-white'); 
        paso=14;
        document.getElementById('imgProcessEspe1').classList.remove('shadow-red');
        paso=15;
        document.getElementById('imgProcessEspe2').classList.remove('shadow-red');        
        


        //---- deshabilitar las imagenes -----
        paso=20;
        document.getElementById('imgAddItem').classList.add('shadow-white');
        paso=22;
        document.getElementById('imgDeleteItem').classList.add('shadow-white');   
        paso=23;
        document.getElementById('imgSaveCotizacion').classList.add('shadow-white'); 
        paso=24;
        document.getElementById('imgRestoreCotizacion').classList.add('shadow-white');     
        paso=25;
        document.getElementById('imgDeleteCotizacion').classList.add('shadow-white');      
        paso=27;
        document.getElementById('imgReorderCotizacion').classList.add('shadow-red');        
        paso=28;
        document.getElementById('imgNextCode').classList.add('shadow-red');      
        paso=29;
        document.getElementById('imgExportRecord').classList.add('shadow-red');     
        paso=30;
        document.getElementById('imgImportar').classList.add('shadow-white');    
        paso=31;          
        document.getElementById('imgConsultarClientes').classList.add('shadow-red');
        paso=32;          
        document.getElementById('imgAnular').classList.add('shadow-white');     
        paso=33;
        document.getElementById('imgProcesarDocumento').classList.add('shadow-white'); 
        paso=34;
        document.getElementById('imgMargenGanancia').classList.add('shadow-red'); 
        paso=35;
        document.getElementById('imgProcessEspe1').classList.add('shadow-white');
        paso=36;
        document.getElementById('imgProcessEspe2').classList.add('shadow-white');        

        // desactivamos los botones
        paso=60;
        document.getElementById('btnAdicional').disabled=false;
        paso=61;
        document.getElementById('btnDeleteCotizacion').disabled=false;
        paso=62;
        document.getElementById('btnSaveCotizacion').disabled=false;   
        paso=63;
        document.getElementById('btnAddItem').disabled=false;
        paso=64;
        document.getElementById('btnDeleteItem').disabled=false;  
        paso=65; 
        document.getElementById('btnProcessEspe3').disabled=true; 
        paso=66;
        document.getElementById('btnInfoContable').disabled=true; 
        paso=67;
        document.getElementById('btnInfoContableRenglon').disabled=true; 
        paso=68;
        document.getElementById('btnImportar').disabled=false; 
        paso=69;
        document.getElementById('btnConsultarClientes').disabled=true; 
        paso=70;
        document.getElementById('btnAnular').disabled=false; 
        paso=71;       
        document.getElementById('btnProcesarDocumento').disabled=false; 
        paso=72;       
        document.getElementById('btnRestoreCotizacion').disabled=false; 
        paso=73;       
        document.getElementById('btnProcessEspe1').disabled=false;             
        paso=74;       
        document.getElementById('btnProcessEspe2').disabled=false;                



    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error activeEditElements");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}


// esta funcion desactiva los elementos dce edicion del menu
function deactiveEditElements(){
    try {
        console.log ("entrando deactiveEditElements")
        paso=1;
        // deshabilitar los links
        document.getElementById('imgAddItem').classList.remove('shadow-white');
        paso=2;
        document.getElementById('imgDeleteItem').classList.remove('shadow-white'); 
        paso=3;
        document.getElementById('imgSaveCotizacion').classList.remove('shadow-white');
        paso=4;
        document.getElementById('imgRestoreCotizacion').classList.remove('shadow-white');
        paso=5;
        document.getElementById('imgDeleteCotizacion').classList.remove('shadow-white');
        paso=6;
        document.getElementById('imgReorderCotizacion').classList.remove('shadow-white');
        paso=7;
        document.getElementById('imgNextCode').classList.remove('shadow-white');
        paso=8;
        document.getElementById('imgExportRecord').classList.remove('shadow-white');
        paso=9;
        document.getElementById('imgImportar').classList.remove('shadow-white');
        paso=10;
        document.getElementById('imgConsultarClientes').classList.remove('shadow-white');       
        paso=11;
        document.getElementById('imgAnular').classList.remove('shadow-white');   
        paso=12;
        document.getElementById('imgProcesarDocumento').classList.remove('shadow-white'); 
        paso=13;
        document.getElementById('imgMargenGanancia').classList.remove('shadow-white'); 
        paso=14;
        //document.getElementById('imgProcessEspe1').classList.remove('shadow-white');
        paso=15;
        //document.getElementById('imgProcessEspe2').classList.remove('shadow-white');
        


        //---- deshabilitar las imagenes -----
        paso=20;
        document.getElementById('imgAddItem').classList.add('shadow-red');
        paso=22;
        document.getElementById('imgDeleteItem').classList.add('shadow-red');   
        paso=23;
        document.getElementById('imgSaveCotizacion').classList.add('shadow-red'); 
        paso=24;
        document.getElementById('imgRestoreCotizacion').classList.add('shadow-red');     
        paso=25;
        document.getElementById('imgDeleteCotizacion').classList.add('shadow-red');      
        paso=27;
        document.getElementById('imgReorderCotizacion').classList.add('shadow-red');        
        paso=28;
        document.getElementById('imgNextCode').classList.add('shadow-red');      
        paso=29;
        document.getElementById('imgExportRecord').classList.add('shadow-red');     
        paso=30;
        document.getElementById('imgImportar').classList.add('shadow-red');    
        paso=31;          
        document.getElementById('imgConsultarClientes').classList.add('shadow-red');
        paso=32;          
        document.getElementById('imgAnular').classList.add('shadow-red');     
        paso=33;
        document.getElementById('imgProcesarDocumento').classList.add('shadow-red'); 
        paso=34;
        document.getElementById('imgMargenGanancia').classList.add('shadow-red'); 
        paso=35;
        //document.getElementById('imgProcessEspe1').classList.add('shadow-red'); 
        paso=36;
        //document.getElementById('imgProcessEspe2').classList.add('shadow-red'); 

        

        // desactivamos los botones
        paso=60;
        document.getElementById('btnAdicional').disabled=true;
        paso=61;
        document.getElementById('btnDeleteCotizacion').disabled=true;
        paso=62;
        document.getElementById('btnSaveCotizacion').disabled=true;   
        paso=63;
        document.getElementById('btnAddItem').disabled=true;
        paso=64;
        document.getElementById('btnDeleteItem').disabled=true;  
        paso=65; 
        document.getElementById('btnProcessEspe3').disabled=true; 
        paso=66;
        document.getElementById('btnInfoContable').disabled=true; 
        paso=67;
        document.getElementById('btnInfoContableRenglon').disabled=true; 
        paso=68;
        document.getElementById('btnImportar').disabled=true; 
        paso=69;
        document.getElementById('btnConsultarClientes').disabled=true; 
        paso=70;
        document.getElementById('btnAnular').disabled=true; 
        paso=71;       
        document.getElementById('btnProcesarDocumento').disabled=true; 
        paso=72;       
        document.getElementById('btnRestoreCotizacion').disabled=true;      
        paso=73;       
        //document.getElementById('btnProcessEspe1').disabled=true;             
        paso=74;       
        //document.getElementById('btnProcessEspe2').disabled=true;             
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error deactiveEditElements");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      

}

/*
// esta funcion permite cargar los detalles de la pedido el encabezado la página
@ params datos Arreglo que contiene los datos de  el pedido
*/
function viewDetallesPedido1(cotizacion){
    try {
        console.log ("entrando viewDetallesPedido1 ");
        /*
            anulada: "0"
            aux01: ".00000"
            aux02: "                              "
            campo1: "6201                                                        "
            campo2: " "
            campo3: " "
            campo4: " "
            campo5: "8                                                           "
            campo6: " "
            campo7: "12/06/2025                                                  "
            campo8: "Procesada"
            co_cli: "1609      "
            co_sucu: "PPAL  "
            co_tran: "000001"
            co_us_el: "      "
            co_us_in: "ADLI  "
            co_us_mo: "DAMA  "
            co_ven: "0025  "
            comentario: " "
            contrib: "1"
            cta_contab: "               "
            descrip: " "
            dir_ent: " "
            fact_num: "35686"
            fe_us_el: "2025-03-17 16:31:56.000"
            fe_us_in: "2025-03-17 16:31:56.000"
            fe_us_mo: "2025-06-17 13:53:00.000"
            fec_emis: "2025-06-17 00:00:00"
            fec_venc: "2025-06-17 00:00:00"
            feccom: "2025-03-17 00:00:00"
            forma_pag: "CON   "
            glob_desc: ".00"
            impresa: "0"
            iva: "599.36"
            iva_dev: ".00"
            mon_ilc: ".00000"
            moneda: "USS   "
            monto_dev: ".00"
            nit: "                  "
            nombre: "                                                            "
            numcom: "0"
            origen: " "
            origen_d: "                    "
            otros1: ".00000"
            otros2: ".00000"
            otros3: ".00000"
            porc_gdesc: "               "
            porc_reca: "               "
            revisado: " "
            rif: "                  "
            rowguid: "C5056AFB-01B9-4AF8-B4F1-40E6B8636891"
            saldo: "4345.36"
            salestax: "        "
            seriales: "0"
            sta_prod: " "
            status: "2"
            tasa: "1.00000"
            tasag: "16.00000"
            tasag10: "9.00000"
            tasag20: "12.00000"
            telefono: "                                                            "
            tot_bruto: "3746.00"
            tot_flete: ".00"
            tot_neto: "4345.36"
            tot_reca: ".00"
            total_cp: ".00"
            total_uc: ".00"
            totklu: ".00"
            trasnfe: " "
        */
        // verificamos si esta procesada
        console.log ("arreglo cotizacion",cotizacion);
        document.getElementById('logoFuente').src='assets/images/2k8b.png';
        document.getElementById('logoFuente').style.visibility="visible";
        document.getElementById('logoFuente').title="Datos tomados del Histórico 2K8";
        document.getElementById('fuente').innerHTML="2K8";
        //document.getElementById('fuente').style.visibility="visible";
        // inhabilitamos la anulacion por que proviene del 2k8
        paso=1;
        cVarCampo8=cotizacion[0].campo8;
        paso=2;
        cVarAnulada=cotizacion[0].anulada;
        paso=3;
        if (cVarCampo8.trim()=="Procesada"){
            paso=3;
            document.getElementById("estatus").value="Procesada";
            paso=4;
            deactiveEditElements();
        } else {
            // verificamos si esta anulada
            paso=5;
            if (cVarAnulada=="1"){
                paso=6;
                document.getElementById("estatus").value="Anulada";
                paso=7;
                deactiveEditElements();
            } else {
                // esta sin procesar
                paso=8;
                document.getElementById("estatus").value="Sin Procesar";
                paso=9;
                activeEditElements();
            }
        }
        // inhabilitamos la anulacion por que proviene del 2k8
        deactiveEditElements();
        // desplegamos el iva
        paso=10;
        document.getElementById('subTotal').value=parseFloat(cotizacion[0].tot_bruto).toFixed(2);
        paso=11;
        // validamos el iva segun el origen
        document.getElementById('ivaGeneral').value=parseFloat(cotizacion[0].iva).toFixed(2);
        
        paso=12;
        document.getElementById('otrosMontos').value=parseFloat(cotizacion[0].otros1).toFixed(2);
        paso=13;
        document.getElementById('total').value=parseFloat(cotizacion[0].tot_neto).toFixed(2);
        // llenamos los datos de la seccion adicionales
        paso=14;
        document.getElementById('nombreClienteAdicionales').value=cotizacion[0].nombre.trim();
        paso=15;
        document.getElementById('rifClienteAdicionales').value=cotizacion[0].rif.trim();
        paso=16;
        document.getElementById('nitClienteAdicionales').value=cotizacion[0].nit.trim();        
        paso=16;
        document.getElementById('telefonoClienteAdicionales').value=cotizacion[0].telefono.trim();
        paso=17;
        document.getElementById('campo2').value=cotizacion[0].campo2.trim();
        paso=18;
        document.getElementById('usuarioAdicionales').value=cotizacion[0].campo3.trim();
        paso=19;
        document.getElementById('campo4').value=cotizacion[0].campo4.trim();
        paso=20;
        document.getElementById('comisionAdicionales').value=cotizacion[0].campo5.trim();
        paso=21;
        document.getElementById('campo6').value=cotizacion[0].campo6.trim();    
        paso=22;
        document.getElementById('fechaAdicionales').value=cotizacion[0].campo7.trim();
        paso=23;
        document.getElementById('aprobadoAdicionales').value=cotizacion[0].campo8.trim();
        paso=24;
        document.getElementById('nocAdicionales').value=cotizacion[0].campo1.trim();
        paso=25;
        document.getElementById('comentarioCotizacionAdicionales').value=cotizacion[0].comentario.trim();
        console.log ("comentario general de cotizacion",cotizacion[0].comentario.trim());
        // fin de la carga de datos de adi
        
        

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error viewDetallesPedido1");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  

}

// esta funcion permite cargar los datos de un pedido del 2k12
function viewDetallesPedido12K12(cotizacion){
    try {
        console.log ("entrando viewDetallesPedido1 2k12 ");
        /*
        {
        "doc_num": "000002              ",
        "descrip": null,
        "co_cli": "0870            ",
        "co_tran": "000001",
        "co_mone": "USS   ",
        "co_ven": "0025  ",
        "co_cond": "ACO   ",
        "fec_emis": "2025-11-13 15:27:00",
        "fec_venc": "2025-11-13 15:27:00",
        "fec_reg": "2025-11-13 15:27:00",
        "anulado": "0",
        "status": "2",
        "n_control": null,
        "ven_ter": "0",
        "tasa": "1.00000000",
        "porc_desc_glob": null,
        "monto_desc_glob": ".00",
        "porc_reca": null,
        "monto_reca": ".00",
        "total_bruto": "655.00",
        "monto_imp": ".00",
        "monto_imp2": ".00",
        "monto_imp3": ".00",
        "otros1": ".00",
        "otros2": ".00",
        "otros3": ".00",
        "total_neto": "655.00",
        "saldo": "655.00",
        "dir_ent": null,
        "comentario": null,
        "dis_cen": null,
        "feccom": null,
        "numcom": null,
        "contrib": "1",
        "impresa": "0",
        "seriales_s": null,
        "salestax": null,
        "impfis": null,
        "impfisfac": null,
        "campo1": null,
        "campo2": null,
        "campo3": null,
        "campo4": null,
        "campo5": null,
        "campo6": null,
        "campo7": null,
        "campo8": null,
        "co_us_in": "PROFIT",
        "co_sucu_in": "PPAL  ",
        "fe_us_in": "2025-11-13 15:28:47.813",
        "co_us_mo": "PROFIT",
        "co_sucu_mo": "PPAL  ",
        "fe_us_mo": "2025-11-13 15:35:45.393",
        "revisado": null,
        "trasnfe": null,
        "validador": "AAAAAAAISuY=",
        "rowguid": "4116D6F2-8041-46F8-B17F-3DC756B7583D",
        "co_cta_ingr_egr": null
        }
        */
        // verificamos si esta procesada
        console.log ("arreglo pedido 2k12",cotizacion);
        document.getElementById('logoFuente').src='assets/images/2k12b.png';
        document.getElementById('logoFuente').style.visibility="visible";
        document.getElementById('logoFuente').title="Datos tomados del Profit 9.1";
        document.getElementById('fuente').innerHTML="9.1";
        //document.getElementById('fuente').style.visibility="visible";

        paso=1;
        cVarCampo8=cotizacion[0].status;
        paso=2;
        cVarAnulada=cotizacion[0].anulado;
        console.log(`estatus ${cVarCampo8} anulada ${cVarAnulada}`);
        paso=3;
        if (cVarCampo8.trim()=="2"){
            paso=3;
            document.getElementById("estatus").value="Procesada";
            paso=4;
            deactiveEditElements();
        } else {
            // verificamos si esta anulada
            paso=5;
            if ((cVarAnulada==1) || (cVarAnulada=="1")){
                paso=6;
                document.getElementById("estatus").value="Anulada";
                paso=7;
                deactiveEditElements();
            } else {
                // esta sin procesar
                paso=8;
                document.getElementById("estatus").value="Sin Procesar";
                paso=9;
                activeEditElements();
            }
        }

        if ((cVarAnulada=="1") ||(cVarAnulada==1)){
            // cambiamos la image de anular pedido por activar cotizacion
            document.getElementById('imgAnular').src='assets/images/activar_cotizacion.png';
            document.getElementById('imgAnular').classList.remove('shadow-red');   
            document.getElementById('imgAnular').classList.add('shadow-white');     
            document.getElementById('btnAnular').title="Activar";
            document.getElementById('btnAnular').disabled=false; 
        } else {
            // cambiamos la image de anular cotiazacion por activar cotizacion
            document.getElementById('imgAnular').src='assets/images/anular.png';
            document.getElementById('imgAnular').classList.remove('shadow-red');   
            document.getElementById('imgAnular').classList.add('shadow-white');    
            document.getElementById('btnAnular').title="Anular";
            document.getElementById('btnAnular').disabled=false; 
        }


        // desplegamos el iva
        paso=10;
        document.getElementById('subTotal').value=parseFloat(cotizacion[0].total_bruto).toFixed(2);
        paso=11;
        document.getElementById('ivaGeneral').value=parseFloat(cotizacion[0].monto_imp).toFixed(2);
        paso=12;
        document.getElementById('otrosMontos').value=parseFloat(cotizacion[0].otros1).toFixed(2);
        paso=13;
        document.getElementById('total').value=parseFloat(cotizacion[0].total_neto).toFixed(2);
        // llenamos los datos de la seccion adicionales
        paso=14;
        //document.getElementById('nombreClienteAdicionales').value=cotizacion[0].nombre.trim();
        paso=15;
        //document.getElementById('rifClienteAdicionales').value=cotizacion[0].rif.trim();
        paso=16;
        //document.getElementById('nitClienteAdicionales').value=cotizacion[0].nit.trim();        
        paso=16;
        //document.getElementById('telefonoClienteAdicionales').value=cotizacion[0].telefono.trim();
        paso=17;
        if (cotizacion[0].campo2!=null){
            document.getElementById('campo2').value=cotizacion[0].campo2.trim();
        } 

        paso=18;
        if (cotizacion[0].campo3!=null){
            document.getElementById('usuarioAdicionales').value=cotizacion[0].campo3.trim();
        }
        paso=19;
        if (cotizacion[0].campo4!=null){        
            document.getElementById('campo4').value=cotizacion[0].campo4.trim();
        }
        paso=20;
        if (cotizacion[0].campo5!=null){        
            document.getElementById('comisionAdicionales').value=cotizacion[0].campo5.trim();
        }
        paso=21;
        if (cotizacion[0].campo6!=null){        
            document.getElementById('campo6').value=cotizacion[0].campo6.trim();    
        }
        paso=22;
        if (cotizacion[0].campo7!=null){        
            document.getElementById('fechaAdicionales').value=cotizacion[0].campo7.trim();
        }
        paso=23;
        if (cotizacion[0].campo8!=null){
            document.getElementById('aprobadoAdicionales').value=cotizacion[0].campo8.trim();
        }
        paso=24;
        if (cotizacion[0].campo1!=null){        
            document.getElementById('nocAdicionales').value=cotizacion[0].campo1.trim();
        }
        paso=25;
        if (cotizacion[0].comentario!=null){        
            document.getElementById('comentarioCotizacionAdicionales').value=cotizacion[0].comentario.trim();
            console.log ("comentario general de cotizacion",cotizacion[0].comentario.trim());
        }
        // fin de la carga de datos de adi
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error viewDetallesPedido1 2k12");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  

}


/*
// esta funcion permite cargar los detalles de los renglones de la pedido 
// en el grid de la página
@ params datos Arreglo que contiene los datos de  el pedido
*/
function viewDetallesPedido(datos){
    try {
        console.log ("entrando viewDetallesPedido 2k8 Renglones");  
        paso=1;  
        console.log("Data Renglones 2k8",datos);
        document.getElementById("DetalleCotizacion").innerHTML="";
        paso=2;
        var cadenaHTML="";     
        paso=3;   
        var n=datos.length;
        paso=4;
        console.log ("numero de elementos ",n);
        for (i=0; i< n; i++){
            paso=5;
            /*
            anulado: "0"
            aux01: ".00000"
            aux02: " "
            cant_imp: ".00000"
            cant_prod: ".00000"
            co_alma: "APT   "
            co_alma2: "      "
            co_art: "ETQ17010002                   "
            comentario: "æ;TipCot=I;AncEtq=29.9;AncSol=20.00;TipTro=L;CotPre=E;TroCod=LASER;TroBas=;AvaEtq=20.00;SepEtq=0.30;CanEtq=1;EtqSol=400;PorSeg=7.00;AncBob=12.75;LarEtq=20.30;CmsLin=8120.00;TotLin=8688.40;Mt2Bob=32.39;MtsLin=86.88;Mt2Etq=28.14;Cm2Cli=645.54;CodEtq=ETQ17010002;Factor=0.01;ObsCot=- BAJO EL NRO. DE OC SE ENCUENTRAN LOS ARTES.\r\n- ENVIAR PARA APROBACION.\r\n- EL CLIENTE VENDRA APROBAR EN MAQUINA.\r\n- ESTAS OBSERVACIONES APLICAN PARA TODOS LOS CAMBIOS.;TipPre=R;CanPre=400;CorDia=C;CanDes=1;CanCor=1;NomEtq=VOLTEX 15W40 SAE API SP MIENRAL 19L COD.;Serigraf=0;PrecSerigraf=0;CanNum=320;CodEm1=;CodEm2=;TipCli=F;ImpRib=0;ImpAdh=0;ImpEsp=0;TipEtq=N;SigPar=0;ForCon=0;ArtRed=0;LevArt=0;PegMan=1;UsaSig=0;CanEPP=2.00;RepInd=2;CodMat=PLDPG1300-IK;CosMat=0.5500;PreMat=0.550;PrcMat=15.4748;CosEtq=0.0387;OptCol=1;CanCol=4;PreCol=0.00012;PreTco=0.00048;PreCli=58.00;PreTcl=232.00;CliAdi=0;PorTra=10;CosTra=1.55;PorMDO=15;CosMDO=2.32;SumCos=0.0135;CosTot=0.0522;PreFin=0.0557;ActDto=0;PorDto=0.000;MonDto=0.000;MatEtq=0.0362;TipAca=N;ResvBar1=0;BarMat=0;ResvBar2=0;Barniz=0;BarMat2=0;SerLam=1;CodLam=PPTLA1275-IK;AncLam=12.75;PreLam=0.0155;MatLam=0;TipSer=N;AncSer=0.00;CosFoil=0.0000;CosFoil2=0.0000;AsuDes=0;DesBob=0.0470;BobDis=13.00;AncDif=0.25;UsaSan=0;PorCom=3.00;EstEtq=22.28;EstFac=254.28;IVAEst=40.68;TotEst=294.96;StaCot=Normal;æ"
            cos_pro_om: ".00000"
            cos_pro_un: ".00000"
            des_art: " "
            fact_num: "36384"
            fec_lote: "2025-06-09 00:00:00"
            imp_prod: ".00000"
            mon_ilc: ".00000"
            monto_dev: ".00000"
            nro_lote: "                    "
            num_doc: "0"
            num_doc2: "0"
            otros: ".00000"
            pendiente: ".00000"
            pendiente2: ".00000"
            porc_desc: "               "
            prec_vta: ".00010"
            prec_vta2: ".00010"
            reng_doc: "0"
            reng_doc2: "0"
            reng_neto: ".04"
            reng_num: "1"
            rowguid: "30AFD4C2-1D92-4F49-A967-2363475DE96B"
            seleccion: "0"
            stotal_art: ".00000"
            tipo_doc: " "
            tipo_doc2: " "
            tipo_imp: "1"
            total_art: "400.00000"
            total_dev: ".00000"
            total_uni: "1.00000"
            ult_cos_om: ".00000"
            ult_cos_un: ".00000"
            uni_venta: "UNI   "  
            descripcion_articulo:
            modelo:                          
            */
            var cAnulado=datos[i].anulado; 
            paso=6;
            var fAux01=datos[i].aux01; 
            paso=7;
            var cAux02=datos[i].aux02;
            paso=8;
            var fCantImp=datos[i].cant_imp;
            paso=9;
            var fCanProd=datos[i].can_prod;
            paso=10;
            var cAlmacen=datos[i].co_alma;
            paso=11;
            var cAlmacen2=datos[i].co_alma2;
            paso=12;
            var cCoArt=datos[i].co_art;
            paso=13;
            var cComentario=datos[i].comentario;  
            paso=14; 
            var fCosProOm=datos[i].cos_pro_om;
            paso=15;
            var fCosProUn=datos[i].cos_pro_un;
            paso=16;
            var cDesArt=datos[i].descripcion_articulo.trim();
            paso=17;
            var nFactNum=datos[i].fact_num;
            paso=18;
            var dFecLote=datos[i].fech_lot;
            paso=19;
            var fImpProd=datos[i].imp_prod;
            paso=20;
            var fMonIlc=datos[i].mon_ilc;
            paso=21;
            var fMontDev=datos[i].monto_dev;
            paso=22;
            var nNroLote=datos[i].nro_lote;
            paso=23;
            var nNumDoc=parseInt(datos[i].num_doc);
            paso=24;
            var nNumDoc2=parseInt(datos[i].num_doc2);
            paso=25;
            var fOtros=datos[i].otros;
            paso=26;
            var fPendiente=datos[i].pendiente;
            paso=27;
            var fPendiente2=datos[i].pendiente2;
            paso=28;
            var fPorDesc=datos[i].porc_desc;
            paso=29;
            var fPrecio1=parseFloat(datos[i].prec_vta).toFixed(4);
            paso=30;
            var fPrecio2=parseFloat(datos[i].prec_vta2).toFixed(4);
            paso=31;
            //var nRengDoc=datos[i].reng_doc;
            var nRengDoc="Cotización";
            paso=32;
            var nRengDoc2=document.getElementById('numero').value;
            paso=33;
            var fRengNeto=datos[i].reng_neto;
            paso=34;
            var nRenNum=datos[i].reng_num; 
            paso=35;    
            var cRowId=datos[i].rowguid
            paso=36;
            var nSeleccion=datos[i].seleccion;
            paso=37;
            var fSTotalArt=datos[i].stotal_art;
            paso=38;
            var cTipoDoc=datos[i].tipo_doc;
            paso=39;
            var cTipoDoc2=datos[i].tipo_doc2;
            paso=40;
            var fIva=datos[i].tipo_imp; 
            paso=41;
            var fSTotalArt=datos[i].total_art;
            paso=42;
            var fSTotalDev=datos[i].total_dev;
            paso=43;
            var fSTotalUni=datos[i].total_uni;  
            paso=44;
            var fUltCosOm=datos[i].ult_cos_om;
            paso=45;  
            var fUltCosUn=datos[i].ult_cos_un;  
            paso=46;            
            var nUnidad=datos[i].uni_venta.trim();
            paso=47;
            var fCant=datos[i].total_art;
            paso=48;
            //var cModelo=searchVariable(cComentario,"Modelo");
            var cModelo=datos[i].modelo ?? "";
            paso=49;
            var fAdicional=0.00;
            paso=50;
            // hay que buscar el modelo en los comentarios
            
            //var fPendiente=" ";
            //var nDocumento= " ";
            //var nOrigen=datos[i].reng_doc2;
            var fAdicional=0.00;
            //cVarComentario,cVarVariable
            paso=51;
            var fNeto2=" ";

            // buscamos el nombre del articulo en los comentarios
            //cDesArt=searchVariable(cComentario,"NomEtq");
            cadenaHTML=cadenaHTML+"<tr class='tr-cotizacion'>";
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'>${nRenNum}`;
            if (i < (n-1)){
                cadenaHTML=cadenaHTML+`<a href='javascript:downRenglon(${i})' title='Bajar'><img src='assets/images/icons8-abajo-48.png' style='height:12px !important;width:auto !important'></a>`
            }
            if (i !=0){
                cadenaHTML=cadenaHTML+`<a href='javascript:upRenglon(${i})' title='Subir'><img src='assets/images/icons8-arriba-48.png' style='height:12px !important;width:auto !important'></a>`
            }
            cadenaHTML=cadenaHTML+`</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><input type='text' id='co_art${i}' name='co_art' value='${cCoArt}' onclick='javascript:touchArt("${cCoArt}","${nRenNum}","co_art${i}")' `;
            cadenaHTML=cadenaHTML+` onchange='javascript:changeArt("${cCoArt}","${nRenNum}","co_art${i}")'></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'><input type='text' id='almacen${i}' name='almacen' value='${cAlmacen}' size='3' disabled></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='cantidad${i}' name='cantidad' value='${parseInt(fCant)}' size='8' style='text-align:right !important' disabled></td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'>${nUnidad}</td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='precio${i}' name='precio' value='${fPrecio1}' size='8' style='text-align:right !important' disabled></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='precio${i}_2' name='precio_2' value='${fPrecio2}' size='8' style='text-align:right !important' disabled ></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><label id='ivaRenglon${i}'>${fIva}</label></td>`;
            cadenaHTML=cadenaHTML+`<td  class='text-right td-cotizacion'><label id='neto${i}'>${fRengNeto}</label></td>`;
            cadenaHTML=cadenaHTML+`<td  class='text-right td-cotizacion'>${fPorDesc}</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>${nRengDoc}</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>${nRengDoc2}</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><label id='descArt${i}'>${cDesArt}</label></td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><label id='modeloArt${i}'>${cModelo}</label></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'>${nRenNum}</td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'>${fAdicional}</td>`;                            
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><span class='monto_resaltado'><label id='neto${i}_2'>${fRengNeto}</label></span></td></tr>`;

            /*
            elemento={
                "nReng":parseInt(nRenNum),
                "co_Art":cCoArt.trim(),
                "almacen":cAlmacen.trim(),
                "ncantidad":nCant,
                "iva":fIva,
                "fNeto1":fNeto1,
                "fPorcentajeDescuento":fPorcentajeDescuento,
                "fPendiente":fPendiente,
                "nDocumento":nDocumento,
                "nOrigen":nOrigen,
                "cDesArt":cDesArt,
                "cModelo":cModelo,
                "nRenNum":parseInt(nRenNum),
                "fAdicional":fAdicional,
                "fNeto1":fNeto1,
                "cComentario": cComentario
            }
                */
            paso=60;
            elemento={
                "cAnulado":cAnulado, 
                "fAux01":fAux01, 
                "cAux02":cAux02,
                "fCantImp":fCantImp,
                "fCanProd":fCanProd,
                "cAlmacen":cAlmacen,
                "cAlmacen2":cAlmacen2,
                "cCoArt":cCoArt,
                "cComentario":cComentario,   
                "fCosProOm":fCosProOm,
                "fCosProUn":fCosProUn,
                "cDesArt":cDesArt,
                "nFactNum":nFactNum,
                "dFecLote":dFecLote,
                "fImpProd":fImpProd,
                "fMonIlc":fMonIlc,
                "fMontDev":fMontDev,
                "nNroLote":nNroLote,
                "nNumDoc":nNumDoc,
                "nNumDoc2":nNumDoc2,
                "fOtros":fOtros,
                "fPendiente":fPendiente,
                "fPendiente2":fPendiente2,
                "fPorDesc":fPorDesc,
                "fPrecio1":fPrecio1,
                "fPrecio2":fPrecio2,
                "nRengDoc":nRengDoc,
                "nRengDoc2":nRengDoc2,
                "fRengNeto":fRengNeto,
                "nRenNum":nRenNum,     
                "cRowId":cRowId,
                "nSeleccion":nSeleccion,
                "fSTotalArt":fSTotalArt,
                "cTipoDoc":cTipoDoc,
                "cTipoDoc2":cTipoDoc2,
                "fIva":fIva, 
                "fSTotalDev":fSTotalDev,
                "fSTotalUni":fSTotalUni,        
                "fUltCosOm":fUltCosOm,  
                "fUltCosUn":fUltCosUn,              
                "nUnidad":nUnidad,
                "fCant":fCant,
                "cModelo":cModelo,
                "fAdicional":fAdicional,
            };
            paso=61;
            myPersistentArray.push(elemento)
            paso=62;
            agregarNuevoComentario(cCoArt, cComentario,parseInt(nRenNum));         
        }
        paso=63;
        document.getElementById("DetalleCotizacion").innerHTML=cadenaHTML;
        //console.log (cadenaHTML);
        paso=64;
        localStorage.setItem('myArrayKey', JSON.stringify(myPersistentArray));
        paso=65;
        const misComentariosActuales = obtenerComentarios();
        //console.log("Comentarios actuales:", misComentariosActuales);        
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error viewDetallesPedido 2k8 Renglones");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }          

   
}


/*
// esta funcion permite cargar los detalles de los renglones de la pedido del 2k12
// en el grid de la página
@ params datos Arreglo que contiene los datos de  el pedido
*/
function viewDetallesPedido2k12(datos){
    try {
        console.log ("entrando viewDetallesPedido 2k12 Renglones");  
        paso=1;  
        console.log("Data Renglones 2k12",datos);
        document.getElementById("DetalleCotizacion").innerHTML="";
        paso=2;
        var cadenaHTML="";     
        paso=3;   
        var n=datos.length;
        paso=4;
        for (i=0; i< n; i++){
            paso=5;
            /*
            {
                "reng_num": "1",
                "doc_num": "000002              ",
                "co_art": "ETQ00100037                   ",
                "des_art": null,
                "co_alma": "APT   ",
                "total_art": "1.00000",
                "stotal_art": ".00000",
                "co_uni": "UND   ",
                "sco_uni": null,
                "co_precio": "01    ",
                "prec_vta": "100.00000",
                "prec_vta_om": null,
                "porc_desc": null,
                "monto_desc": ".00000",
                "tipo_imp": "1",
                "tipo_imp2": null,
                "tipo_imp3": null,
                "porc_imp": ".00000",
                "porc_imp2": ".00000",
                "porc_imp3": ".00000",
                "monto_imp": ".00000",
                "monto_imp2": ".00000",
                "monto_imp3": ".00000",
                "reng_neto": "100.00",
                "pendiente": ".00000",
                "pendiente2": ".00000",
                "tipo_doc": null,
                "num_doc": null,
                "rowguid_doc": null,
                "total_dev": ".00000",
                "monto_dev": ".00000",
                "otros": ".00000",
                "comentario": "dfdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdf",
                "lote_asignado": "0",
                "monto_desc_glob": ".00000",
                "monto_reca_glob": ".00000",
                "otros1_glob": ".00000",
                "otros2_glob": ".00000",
                "otros3_glob": ".00000",
                "monto_imp_afec_glob": ".00000",
                "monto_imp2_afec_glob": ".00000",
                "monto_imp3_afec_glob": ".00000",
                "dis_cen": null,
                "co_us_in": "PROFIT",
                "co_sucu_in": "PPAL  ",
                "fe_us_in": "2025-11-13 15:28:47.827",
                "co_us_mo": "PROFIT",
                "co_sucu_mo": "PPAL  ",
                "fe_us_mo": "2025-11-13 15:30:38.867",
                "revisado": null,
                "trasnfe": null,
                "rowguid": "53F7731B-7B82-42F9-90E3-65E446781D66",
                "descripcion_articulo": "SKY 4T SAE 20W50 SM PREMIUN PLUS FRONTAL (MEETLT016)"
                "modelo":""
            }                        
            */
            var cAnulado=datos[i].anulado; 
            paso=6;
            var fAux01=datos[i].aux01; 
            paso=7;
            var cAux02=datos[i].aux02;
            paso=8;
            var fCantImp=datos[i].cant_imp;
            paso=9;
            var fCanProd=datos[i].can_prod;
            paso=10;
            var cAlmacen=datos[i].co_alma;
            paso=11;
            var cAlmacen2=datos[i].co_alma2;
            paso=12;
            var cCoArt=datos[i].co_art;
            paso=13;
            var cComentario=datos[i].comentario;  
            paso=14; 
            var fCosProOm=datos[i].cos_pro_om;
            paso=15;
            var fCosProUn=datos[i].cos_pro_un;
            paso=16;
            var cDesArt=datos[i].descripcion_articulo.trim();
            paso=17;
            var nFactNum=datos[i].fact_num;
            paso=18;
            var dFecLote=datos[i].fech_lot;
            paso=19;
            var fImpProd=datos[i].imp_prod;
            paso=20;
            var fMonIlc=datos[i].mon_ilc;
            paso=21;
            var fMontDev=datos[i].monto_dev;
            paso=22;
            var nNroLote=datos[i].nro_lote;
            paso=23;
            var nNumDoc=parseInt(datos[i].num_doc);
            paso=24;
            var nNumDoc2=parseInt(datos[i].num_doc2);
            paso=25;
            var fOtros=datos[i].otros;
            paso=26;
            var fPendiente=datos[i].pendiente;
            paso=27;
            var fPendiente2=datos[i].pendiente2;
            paso=28;
            if (datos[i].porc_desc!=null){
                var fPorDesc=datos[i].porc_desc;
            } else {
                var fPorDesc="0.0000";
            }
            paso=29;
            var fPrecio1=parseFloat(datos[i].prec_vta).toFixed(4);
            paso=30;
            var fPrecio2=parseFloat(datos[i].prec_vta).toFixed(4);
            paso=31;
            if (datos[i].reng_doc!=null){
                var nRengDoc=datos[i].reng_doc;
            } else {
                var nRengDoc="0";
            }
            paso=32;
            if (datos[i].reng_doc2!=null){
                var nRengDoc2=datos[i].reng_doc2;
            } else {
                var nRengDoc2="0";
            }            
            paso=33;
            var fRengNeto=datos[i].reng_neto;
            paso=34;
            var nRenNum=datos[i].reng_num; 
            paso=35;    
            var cRowId=datos[i].rowguid
            paso=36;
            var nSeleccion=datos[i].seleccion;
            paso=37;
            var fSTotalArt=datos[i].stotal_art;
            paso=38;
            var cTipoDoc=datos[i].tipo_doc;
            paso=39;
            var cTipoDoc2=datos[i].tipo_doc2;
            paso=40;
            var fIva=datos[i].tipo_imp; 
            paso=41;
            var fSTotalArt=datos[i].total_art;
            paso=42;
            var fSTotalDev=datos[i].total_dev;
            paso=43;
            var fSTotalUni=datos[i].total_uni;  
            paso=44;
            var fUltCosOm=datos[i].ult_cos_om;
            paso=45;  
            var fUltCosUn=datos[i].ult_cos_un;  
            paso=46;            
            var nUnidad=datos[i].co_uni.trim();
            paso=47;
            var fCant=datos[i].total_art;
            paso=48;
            if (cComentario!=null){
                if (cComentario.includes(';')){
                    var cModelo=searchVariable(cComentario,"Modelo");
                } else {
                    var cModelo="";                
                }
            }
            var cModelo=datos[i].modelo ?? "";

            paso=49;
            var fAdicional=0.00;
            paso=50;
            // hay que buscar el modelo en los comentarios
            
            //var fPendiente=" ";
            //var nDocumento= " ";
            //var nOrigen=datos[i].reng_doc2;
            var fAdicional=0.00;
            //cVarComentario,cVarVariable
            paso=51;
            var fNeto2=" ";

            // buscamos el nombre del articulo en los comentarios
            //cDesArt=searchVariable(cComentario,"NomEtq");
            cadenaHTML=cadenaHTML+"<tr class='tr-cotizacion'>";
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'>${nRenNum}`;
            if (i < (n-1)){
                cadenaHTML=cadenaHTML+`<a href='javascript:downRenglon(${i})' title='Bajar'><img src='assets/images/icons8-abajo-48.png' style='height:12px !important;width:auto !important'></a>`
            }
            if (i !=0){
                cadenaHTML=cadenaHTML+`<a href='javascript:upRenglon(${i})' title='Subir'><img src='assets/images/icons8-arriba-48.png' style='height:12px !important;width:auto !important'></a>`
            }
            cadenaHTML=cadenaHTML+`</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><input type='text' id='co_art${i}' name='co_art' value='${cCoArt}' onclick='javascript:touchArt("${cCoArt}","${nRenNum}","co_art${i}")' `;
            cadenaHTML=cadenaHTML+` onchange='javascript:changeArt("${cCoArt}","${nRenNum}","co_art${i}")'></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'><input type='text' id='almacen${i}' name='almacen' value='${cAlmacen}' size='3' disabled></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='cantidad${i}' name='cantidad' value='${parseInt(fCant)}' size='8' style='text-align:right !important' disabled></td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'>${nUnidad}</td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='precio${i}' name='precio' value='${fPrecio1}' size='8' style='text-align:right !important' disabled></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='precio${i}_2' name='precio_2' value='${fPrecio2}' size='8' style='text-align:right !important' disabled ></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><label id='ivaRenglon${i}'>${fIva}</label></td>`;
            cadenaHTML=cadenaHTML+`<td  class='text-right td-cotizacion'><label id='neto${i}'>${fRengNeto}</label></td>`;
            cadenaHTML=cadenaHTML+`<td  class='text-right td-cotizacion'>${fPorDesc}</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>${nRengDoc}</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>${nRengDoc2}</td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><label id='descArt${i}'>${cDesArt}</label></td>`;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><label id='modeloArt${i}'>${cModelo}</label></td>`;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'>${nRenNum}</td>`;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'>${fAdicional}</td>`;                            
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><span class='monto_resaltado'><label id='neto${i}_2'>${fRengNeto}</label></span></td></tr>`;

            /*
            elemento={
                "nReng":parseInt(nRenNum),
                "co_Art":cCoArt.trim(),
                "almacen":cAlmacen.trim(),
                "ncantidad":nCant,
                "iva":fIva,
                "fNeto1":fNeto1,
                "fPorcentajeDescuento":fPorcentajeDescuento,
                "fPendiente":fPendiente,
                "nDocumento":nDocumento,
                "nOrigen":nOrigen,
                "cDesArt":cDesArt,
                "cModelo":cModelo,
                "nRenNum":parseInt(nRenNum),
                "fAdicional":fAdicional,
                "fNeto1":fNeto1,
                "cComentario": cComentario
            }
                */
            paso=60;
            elemento={
                "cAnulado":cAnulado, 
                "fAux01":fAux01, 
                "cAux02":cAux02,
                "fCantImp":fCantImp,
                "fCanProd":fCanProd,
                "cAlmacen":cAlmacen,
                "cAlmacen2":cAlmacen2,
                "cCoArt":cCoArt,
                "cComentario":cComentario,   
                "fCosProOm":fCosProOm,
                "fCosProUn":fCosProUn,
                "cDesArt":cDesArt,
                "nFactNum":nFactNum,
                "dFecLote":dFecLote,
                "fImpProd":fImpProd,
                "fMonIlc":fMonIlc,
                "fMontDev":fMontDev,
                "nNroLote":nNroLote,
                "nNumDoc":nNumDoc,
                "nNumDoc2":nNumDoc2,
                "fOtros":fOtros,
                "fPendiente":fPendiente,
                "fPendiente2":fPendiente2,
                "fPorDesc":fPorDesc,
                "fPrecio1":fPrecio1,
                "fPrecio2":fPrecio2,
                "nRengDoc":nRengDoc,
                "nRengDoc2":nRengDoc2,
                "fRengNeto":fRengNeto,
                "nRenNum":nRenNum,     
                "cRowId":cRowId,
                "nSeleccion":nSeleccion,
                "fSTotalArt":fSTotalArt,
                "cTipoDoc":cTipoDoc,
                "cTipoDoc2":cTipoDoc2,
                "fIva":fIva, 
                "fSTotalDev":fSTotalDev,
                "fSTotalUni":fSTotalUni,        
                "fUltCosOm":fUltCosOm,  
                "fUltCosUn":fUltCosUn,              
                "nUnidad":nUnidad,
                "fCant":fCant,
                "cModelo":cModelo,
                "fAdicional":fAdicional,
            };
            paso=61;
            myPersistentArray.push(elemento)
            paso=62;
            agregarNuevoComentario(cCoArt, cComentario,parseInt(nRenNum));         
        }
        paso=63;
        document.getElementById("DetalleCotizacion").innerHTML=cadenaHTML;
        paso=64;
        localStorage.setItem('myArrayKey', JSON.stringify(myPersistentArray));
        
        //console.log('Array after adding:', myPersistentArray);
        paso=65;
        const misComentariosActuales = obtenerComentarios();
        //console.log("Comentarios actuales:", misComentariosActuales);        
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error viewDetallesPedido 2k12 Renglones");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }          

   
}

// esta funcion permite cargar el comentario enel modal que lo muestra
function touchArt(coArt,nReng,objName){
    try {
        console.log ("entrando a touchArt");
        paso=1;
        //var cComentario=obtenerComentarioPorCoArt(coArt);
        //console.log (cComentario) 
        var cComentario=obtenerRenglonPorCoArtReng(coArt,nReng);   
        //console.log (cComentario) 
        paso=2;
        document.getElementById('comentCotizacion').value="";
        // limpiamos la etiqueta que muestra el codigo del artículo
        paso=3;
        document.getElementById('cLCoArt').innerHTML="";
        // actualizamos la etiqueta que muestra el codigo del artículo
        console.log ("codigo del articulo",coArt);
        paso=4;
        document.getElementById('cLCoArt').innerHTML=coArt;
        // limpiamos la etiqueta que muestra el renglón
        paso=5;
        document.getElementById('nLRenglon').innerHTML="";
        // actualizamos la etiqueta que muestra el renglón del artículo
        paso=6;
        document.getElementById('nLRenglon').innerHTML= nReng;
        paso=7;
        const cadenaConSaltosDeLinea = cComentario.replace(/;/g, '\n');   
        paso=8;
        document.getElementById('comentCotizacion').value=cadenaConSaltosDeLinea;
        paso=10;
        console.log("comentario activo ", cComentario);
        paso=11;
        // colocamos el color blanco a todos los objetos de detalle del formulario
        n=window.document.getElementsByName("co_art").length;
        paso=12;
        for (i=0; i < n; i++){
            paso=13;
            document.getElementsByName("co_art").item(i).style.backgroundColor="#FFFFFF";
        }
        paso=14;
        // colocamos en azul el item activo
        document.getElementById(objName).style.backgroundColor="#09efffff";

        // colocamos en el cuadro de objeto activo el valor
        paso=15;
        document.getElementById('coArt2').value=coArt;

        paso=16;
        // buscamos la descripcion del articulo
        indice=nReng-1;
        console.log (`descArt${indice}`);
        if ((typeof(document.getElementById(`descArt${indice}`))!="undefined") && (document.getElementById(`descArt${indice}`) !== null)){
            valorDescricpion=document.getElementById(`descArt${indice}`).innerHTML;
            paso=17;
            console.log ("descripcion articulo:",valorDescricpion,`descArt${indice}`);
            paso=18;
            document.getElementById('desArt2').value=valorDescricpion;
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error touchArt");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }         
}


// esta funcion permite actualizar el renglon activo en el arreglo persistente
function changeArt(coArt,nReng,objName){
    try {
        console.log ("Entrando en changeArt");
        paso=1;
        console.log (`codigo: ${coArt}`);
        paso=2;
        console.log (`renglon: ${nReng}`);
        paso=3;
        console.log (`objeto: ${objName}`);
        paso=4;
        console.log (myPersistentArray);
        coArt=document.getElementById(objName).value.trim().toUpperCase();
        document.getElementById(objName).value=coArt;
        idEmpresaV=document.getElementById('selectEmpresa').value;
        // buscamos en la base de datos las propiedades del articulo
        $.ajax({
            url: "/search_articulo",
            type: "post",
            dataType: "html",
            data: {
                codArticulo:coArt,
                idEmpresa:idEmpresaV
            },
        }).done(function (res) {
            console.log (res);
            var data = JSON.parse(res);                
            //console.log  (data.valor);                                      
            if (data.valor==1){
                // articulo encontrado
                /*
                co_art,	
                art_des,
                modelo
                */
                // extraemos los datos a un arreglo
                datosArticulos=data.articulo;
                descripcionArticulo=datosArticulos[0].art_des.trim();
                
                modeloArticulo=datosArticulos[0].modelo ?? "";
                myPersistentArray[(nReng-1)].cCoArt=coArt;
                myPersistentArray[(nReng-1)].cDesArt=descripcionArticulo;
                myPersistentArray[(nReng-1)].cModelo=modeloArticulo.trim();
                paso=5;
                // redibujamos la tabla
                drawTableDatail(myPersistentArray);


            } else if (data.valor==-1) {
                // el articulo no existe
                msgError(data.cadena);
                
            } else if (data.valor==-3){
                // error en la consulta
                msgError(data.cadena);
            }
        });    
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeArt");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}


/*
// esta funcion permite cargar los detalles de la pedido en el grid de la página
@ params datos Arreglo que contiene los datos de  el pedido
*/
function viewDetallesCliente(cliente){
    console.log ("datos del cliente",cliente);
    var coCliente=cliente[0].co_cli.trim();
    seleccionarCliente(coCliente);
    // seteamos la dirección del cliente
    document.getElementById('direccionClienteAdicionales').value=cliente[0].direc1.trim();
}

// esta función fue creada para poder mostrar cuatro decimales de los precios de los renglones de cotización
function redondearACuatroDecimales(fNumero) {
    return Math.round(fNumero * 10000) / 10000; // Multiplica y divide por 10^4
}

// esta funcion selecciona el cliente tomando en cuenta su codigo
function seleccionarCliente(coCliente) {
    // objeto de la pagina que contiene los codigos de clientes
    const selectElement = document.getElementById('codcliente');

    // Limpiar selección previa
    selectElement.selectedIndex = 0; // Selecciona la primera opción (usualmente el "-- Selecciona --")

    let found = false;
    for (let x = 0; x < selectElement.options.length; x++) {
        const option = selectElement.options[x];
        if (option.value.trim() === coCliente.trim()) {
            option.selected = true;
            found = true; // Marcar que hemos encontrado una
            break; // Salir del bucle interno

        }
    }

    // objeto de la pagina que contiene los codigos de clientes
    const selectElement2 = document.getElementById('codcliente2');

    // Limpiar selección previa
    selectElement2.selectedIndex = 0; // Selecciona la primera opción (usualmente el "-- Selecciona --")

    let found2 = false;
    for (let x = 0; x < selectElement2.options.length; x++) {
        const option2 = selectElement2.options[x];
        if (option2.value.trim() === coCliente.trim()) {
            option2.selected = true;
            found = true; // Marcar que hemos encontrado una
            break; // Salir del bucle interno

        }
    }    
}

// esta funcion es la que ejecuta la busqueda en si de el pedido
// utiliza el parametro numero el cual es entero y se valida en searchCotizacion
function searchPedido2(numero){
    // limpiamos los comentarios
    limpiarComentarios();
    //------------------------
    $.ajax({
        url: "/search_pedido",
        type: "get",
        dataType: "html",
        data: {
            idPedido:numero,
        },
    }).done(function (res) {

        paso=1;
        document.getElementById('numero').value=numero;
        paso=2;
        console.log (res);
        var data = JSON.parse(res);                
        paso=3;
        console.log  (data.valor);   
        paso=4;
        if (data.valor=="1"){
            paso=5;
            //console.log ("si");
            pedido=data.pedido;
            paso=6;
            // data de los renglones de cotizacion
            datos=data.data;
            paso=7;
            // data del cliente
            cliente=data.cliente;
            paso=8;
            // data de los comentarios de pedido
            comentariosPedidos=data.dataPedidos;
            paso=9;
            // cotizacionesAnteriores
            pedidosAnteriores=data.pedidosAnteriores;
            paso=10;
            // determinamos el origen de el pedido
            origenPedido=data.origen;
            paso=11;
            console.log ("origen del pedido:",origenPedido);
            paso=12;
            console.log ("Datos del pedido:",pedido);
            paso=13;
            console.log ("Datos de los renglones de pedido:",datos);
            console.log ("Datos del cliente:",cliente);
            paso=14;
            // limiamos los elementos del arreglo persistente
            cleanAll();
            paso=15;
            // cargamos los detalles de el pedido
            if (origenPedido=="2K8"){
                // cargamos los detalles de el pedido
                viewDetallesPedido1(pedido);
                paso=16;
                // cargamos los detalles de los renglones de cotizacion
                // esto tambien carga el arreglo persistente de los renglones
                // de pedido
                viewDetallesPedido(datos);
                paso=17;
                // desactivamos los elementos de edicion por tratarse del 2k8
                deactiveEditElements();
                paso=18;
            } else {
                // cargamos los detalles de la pedido 
                viewDetallesPedido12K12(pedido);
                paso=19;
                // cargamos los detalles de los renglones de cotizacion
                // esto tambien carga el arreglo persistente de los renglones
                // de pedido                
                viewDetallesPedido2k12(datos);
                paso=20;
                // activamos los elementos de edicion por tratarse del 2k12
                //activeEditElements();
            }
            
            // cargamos lo detalles del cliente
            viewDetallesCliente(cliente);
            paso=21;
            // cargamos los datos de las cotizaciones anteriores
            if (comentariosPedidos.length>0){
                console.log (cotizacionesAnteriores);
                viewCotizacionesAnteriores(cotizacionesAnteriores);
                paso=22;
            }   
            // activamos el cuadro de generales
            generales();
            paso=23;
        } else {
            if (data.valor=="-1"){
                paso=24;
                alert ("Esta pedido no existe, por favor verifique los datos");
            } else {
                paso=25;
                /*'valor' => "-3",
                'status' => 'error',
                'message' => 'Modulo DashboardPlanificadorController->searchPedido',
                'error' => $e->getMessage(),
                'query' => $query,
                'subquery'=>$query2,
                'paso'=>$paso,*/       
                paso=26;
                cadena="Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo<br>";
                paso=27;
                cadena=cadena+data.message+"<br>";
                paso=28;
                cadena=cadena+"Query: "+data.query+"<br>";
                paso=29;
                cadena=cadena+"Subquery: "+data.subquery+"<br>";
                paso=30;
                cadena=cadena+"Paso: "+data.paso+"<br>";
                paso=31;
                cadena=cadena+"Error: "+data.error+"<br>";
                paso=32;
                msgError(cadena);
            }
            
        }
    });          
                        
}

// esta funcion es usada para navegar en la lista de cotizaciones
function searchCotizacion3(numero){
    try {
        console.log ("entrando searchCotizacion3 ");
        paso=1;
        // limpiamos los comentarios
        cleanAll();
        // activamos la division generales
        paso=2;
        generales();
        paso=3;
        navegarACotizacion(numero);
        paso=4; 
        // ejecutamos la busqueda de el pedido
        searchCotizacion2(numero);
    } catch (error) {   
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchCotizacion3");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }
}

// esta funcion permite navegar a el pedido seleccionada en la lista
function navegarACotizacion(numeroCotizacion) {
    console.log("Navegando a el pedido:", numeroCotizacion);
    // 1. Construir el ID completo de la fila
    const idAncla = `cotizacion_${numeroCotizacion}`;
    
    // 2. Encontrar el elemento TR usando su ID
    const elementoCotizacion = document.getElementById(idAncla);

    if (elementoCotizacion) {
        // 3. Hacer visible el contenedor de la tabla si estuviera oculto
        // Asumiendo que 'divLista' es el contenedor principal que se oculta
        document.getElementById('divLista').style.visibility = 'visible';
        
        // 4. Desplazar la vista hasta ese elemento
        elementoCotizacion.scrollIntoView({ 
            behavior: 'smooth', // Desplazamiento suave
            block: 'start'      // Alinea el elemento con la parte superior
        });
        
        // Opcional: Resaltar temporalmente la fila
        elementoCotizacion.style.backgroundColor = '#ffc107'; // Amarillo Bootstrap
        setTimeout(() => {
            elementoCotizacion.style.backgroundColor = ''; // Quitar el color
        }, 3000); 

    } else {
        console.warn(`No se encontró el pedido con el ID: ${idAncla}`);
    }
}

// esta funcion permite cargar los detalles de las cotizaciones anteriores
function viewCotizacionesAnteriores(cotizacionesAnteriores){
    try {
        console.log ("entrando viewCotizacionesAnteriores ");  
        paso=1;  
        console.log(cotizacionesAnteriores);
        document.getElementById("detallesCotizacionesAnteriores").innerHTML="";
        paso=2;
        var cadenaHTML="";     
        paso=3;   
        var n=cotizacionesAnteriores.length;
        paso=4;
        for (i=0; i< n; i++){
            paso=5;
            var nNumeroCotizacion=cotizacionesAnteriores[i].fact_num;
            paso=6;
            var dFechaCotizacion=cotizacionesAnteriores[i].fec_emis;
            paso=7;
            // 1. Crear un objeto Date a partir de la cadena
            const fecha = new Date(dFechaCotizacion);

            // 2. Extraer día, mes y año
            // Nota: getMonth() devuelve un índice de 0 (enero) a 11 (diciembre), 
            // por lo que se le suma 1 para obtener el mes real.
            paso=8;
            const dia = fecha.getDate().toString().padStart(2, '0');
            paso=9;
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
            paso=10;
            const anio = fecha.getFullYear();

            // 3. Formatear la cadena final
            paso=11;
            const fechaFormateada = `${dia}/${mes}/${anio}`;            
            paso=12;
            var codCliente=cotizacionesAnteriores[i].co_cli.trim();
            paso=13;
            var descrip=cotizacionesAnteriores[i].descrip.trim();
            paso=14;
            cadenaHTML += `<tr class='tr-cotizacion' id='cotizacion_${nNumeroCotizacion}'>`;
            paso=15;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'><a href='javascript:searchCotizacion3(${nNumeroCotizacion})'>${nNumeroCotizacion}</a></td>`;
            paso=16;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'>${fechaFormateada}</td>`;
            paso=17;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'>${codCliente}</td>`;
            paso=18;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'>${descrip}</td>`;                        
            paso=19;
            cadenaHTML=cadenaHTML+"</tr>";
        }   
        paso=20;
        document.getElementById("detallesCotizacionesAnteriores").innerHTML=cadenaHTML;       
    } catch (error) {       
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error viewCotizacionesAnteriores");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }
}

function cierraModalSearch() {
    $('#miModalSearch').modal('hide');
} 

function viewComment(){
    var cVarComentario=document.getElementById('comentCotizacion').value;
    if (cVarComentario.trim()!="") {
        // Asegurarse que el modal es hijo directo de <body> para evitar problemas
        // con contextos de apilamiento (transform/position en ancestros) que
        // pueden hacer que el backdrop se muestre pero el dialog quede detrás.
        try {
            $('#miModalComentario').appendTo('body');
        } catch (e) {
            // Si falla el append, seguimos intentando mostrar el modal de todos modos
            console.warn('No se pudo mover el modal a body:', e);
        }
        $('#miModalComentario').modal('show');
    } else {
        alert ("No hay comentarios que mostrar");
    }
    
}

function cierraModalComentario() {
    $('#miModalComentario').modal('hide');
} 


// funciones para procesar los comentarios
// Clave para localStorage
const STORAGE_KEY = 'comentariosArticulos';

/**
 * Obtiene el arreglo de comentarios de localStorage.
 * Si no existe, devuelve un arreglo vacío.
 * @returns {Array<Object>} El arreglo de comentarios.
 */
function obtenerComentarios() {
    try {
        console.log ("entrando obtenerComentarios");
        paso=1;
        const comentariosJSON = localStorage.getItem(STORAGE_KEY);
        paso=2;
        console.log (comentariosJSON);
        return comentariosJSON ? JSON.parse(comentariosJSON) : [];

   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error obtenerComentarios");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

/**
 * Guarda el arreglo de comentarios en localStorage.
 * @param {Array<Object>} comentarios El arreglo de comentarios a guardar.
 */
function guardarComentarios(comentarios) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comentarios));
}

/**
 * Añade un nuevo comentario al arreglo y lo guarda en localStorage.
 * @param {string} coArt El código del artículo.
 * @param {string} comentario El texto del comentario.
 */
function agregarNuevoComentario(coArt, comentario, reng) {
    const comentarios = obtenerComentarios(); // Obtiene los comentarios existentes
    comentarios.push({ co_art: coArt, nreng:reng , comentarios: comentario }); // Añade el nuevo
    guardarComentarios(comentarios); // Guarda el arreglo actualizado
}

/**
 * Limpia todos los comentarios de localStorage.
 */
function limpiarComentarios() {
    localStorage.removeItem(STORAGE_KEY);
    //console.log("Todos los comentarios han sido eliminados de localStorage.");
    document.getElementById('logoFuente').style.visibility="hidden";
    document.getElementById('fuente').style.visibility="hidden";
}

/**
 * Extrae el valor del campo 'comentarios' basándose en el 'co_art' proporcionado.
 * Si hay múltiples entradas para el mismo co_art, devuelve la primera encontrada.
 * @param {string} coArtBuscado El código de artículo a buscar.
 * @returns {string|null} El comentario asociado al co_art o null si no se encuentra.
 */
function obtenerComentarioPorCoArt(coArtBuscado) {
    const comentarios = obtenerComentarios(); // Obtiene el arreglo completo
    
    // Usa el método .find() para buscar el primer objeto que coincida
    const comentarioEncontrado = comentarios.find(item => item.co_art === coArtBuscado);

    // Si se encontró un objeto, devuelve su propiedad 'comentarios', de lo contrario devuelve null
    return comentarioEncontrado ? comentarioEncontrado.comentarios : null;
}

// buscamos el comentario de pedido usando el codigo del articulo y el renglon de cotizacion
function obtenerRenglonPorCoArtReng(coArtBuscado, nReng) {
    const comentarios = obtenerComentarios(); // Obtiene el arreglo completo
    //console.log ("-------------------------------");
    //console.log (comentarios);
    //console.log ("-------------------------------");
    var cVarCoArt="";
    var cVarNreng="";
    var cVarComentario="";


    // Método 2: Usando for...of (ideal para iterar sobre valores de arrays/iterables)
    // for...of es más moderno y legible que el bucle for tradicional cuando solo necesitas los valores.
    // Permite usar 'break' y 'continue'.
    for (const item of comentarios) {
        //console.log (item.nreng);
        // 'item' es el objeto actual en la iteración
        cVarCoArt=item.co_art.trim();
        cVarNreng=item.nreng;
        cVarComentario="";
        if ((cVarCoArt==coArtBuscado.trim()) && (cVarNreng==nReng)) {
            cVarComentario=item.comentarios;
            break;
        }
    }  
   

    return cVarComentario;
}

// --- Ejemplos de Uso ---
/*
// 1. Añadir algunos comentarios
agregarNuevoComentario("ART001", "Necesita revisión de stock.");
agregarNuevoComentario("ART003", "Cliente solicitó cambio de color.");
agregarNuevoComentario("ART001", "Se envió notificación al proveedor.");

// 2. Obtener y mostrar todos los comentarios
const misComentariosActuales = obtenerComentarios();
//console.log("Comentarios actuales:", misComentariosActuales);

// 3. Puedes iterar sobre ellos
misComentariosActuales.forEach(item => {
    //console.log(`Artículo: ${item.co_art}, Comentario: ${item.comentarios}`);
});

// 4. Limpiar los comentarios (descomenta para probar)
// limpiarComentarios();

// 5. Verificar después de limpiar
// //console.log("Comentarios después de limpiar:", obtenerComentarios());

*/
// esta funcion permite crear una nueva cotizacion
function newPedido(){
    // es neceario verificar si hubo cambios para sugerir guardar
    var r=confirm("Desea abandonar el proceso y crear un nuevo Pedido?\nLa información que no haya guardado se perderá");
    if (r){
        document.getElementById('numero').value="";
        document.location="/new_pedido";
    }
}

// esta funcion permite eliminar una nueva cotizacion
function deletePedido(){
    try {
        console.log ("entrando deletePedido");
        paso=1;
        // es neceario verificar si hubo cambios para sugerir guardar
        var r=confirm("Desea eliminar este Pedido?\nEsta acción es irreversible");
        if (r){
            var numeroCotizacionV=document.getElementById('numero').value;
            var idEmpresaV=document.getElementById('selectEmpresa').value;
            // actualizando un pedido existente
            $.ajax({
                url: "/delete_pedido",
                type: "POST",
                dataType: "html",
                data:{
                    numeroCotizacion:numeroCotizacionV,
                    idEmpresa:idEmpresaV
                }
            }).done(function (res) {
                paso=10;
                console.log (res);
                paso=11;
                var data = JSON.parse(res);  
                console.log (data);  
                paso=12;
                //console.log  (data.valor);                                   
                if (data["valor"]=="1"){
                    paso=13;
                    estado=data["estado"];
                    resultado=data["resultados"];
                    $numeroCotizacion=data["cotizacion"];
                    msgInfo2 (`${resultado}`);
                    setTimeout(function() {
                        $('#miModal').modal('hide');
                        cleanAll();
                        document.getElementById('numero').value="";
                        document.location.reload();
                    }, 5000);                      
                } else if (data["valor"]=="-1") {
                    // pedido no existe
                    paso=14;
                    estado=data["status"];
                    paso=15;
                    mensaje=data["message"];
                    console.log (mensaje);
                    paso=16;
                    cotizacion=data["cotizacion"];
                    paso=17;
                    if (mensaje.includes("SQLSTATE[23000]")){
                        paso=18;
                        msgError (`No puede eliminar este pedido porque el número no existe<br>Número de pedido ${cotizacion}`);
                    } else {
                        paso=19;
                        msgError (`${mensaje}`);
                    }
                } else if (data["valor"]=="-2") {
                    // pedido no existe
                    paso=14;
                    estado=data["status"];
                    paso=15;
                    mensaje=data["resultados"];
                    console.log (mensaje);
                    paso=16;
                    cotizacion=data["cotizacion"];
                    paso=17;
                    msgError (mensaje);
                } else if (data["valor"]=="-3") {
                    // error al eliminar el pedido
                    paso=15;
                    msgError ("Error al intentar eliminar el pedido, intenelo mas tarde");
                } else {
                    // error inesperado
                    paso=15;
                    msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log (jqXHR.responseText);
                paso=50;
                // Verifica si el código de estado HTTP es 500
                if (jqXHR.status === 500) {
                    paso=52;
                    var data = JSON.parse(jqXHR.responseText);  
                    paso=53;
                    console.log (data);  
                    paso=54;
                    estado=data["status"];
                    paso=55;
                    mensaje=data["message"];
                    paso=56;
                    console.log (mensaje);
                    paso=57;
                    cotizacion=data["cotizacion"];
                    paso=58;
                    if (mensaje.includes("SQLSTATE[23000]")){
                        paso=59;
                        msgError (`No puede eliminar este pedido porque el numero no existe<br>Número de pedido ${cotizacion}`);
                    } else {
                        paso=60;
                        msgError (`${mensaje}`);
                    }
                    
                } else {
                    // Maneja otros errores (ej. 404 Not Found, 403 Forbidden, errores de red)
                    console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
                    // alert(`Ocurrió un error: ${textStatus}`);
                }
            });        

        }  else {
            alert ("No se efectuo ningun cambio");
        }     

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error deleteCotizacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }        
}

// esta funcion permite refrescar el arreglo persistente con la data proveniente de otra pagina
function refreshPersistenteArray (arregloDatos){
    console.log ("Entrando a refreshPersistenteArray");
    console.log ("+++++++++++++++++++++++++++++++++++++++++++++++");
    console.log ("antes del cambio")
    console.log (myPersistentArray);
    myPersistentArray=arregloDatos;
    console.log ("despues del cambio");
    console.log (myPersistentArray);
    console.log ("+++++++++++++++++++++++++++++++++++++++++++++++");    
}

// esta funcion permite guardar una nueva cotizacion
function savePedido(){
    try {
        console.log ("Entrando a salvar cotizacion");
        console.log ("+++++++++++++++++++++++++++++++++++++++++++++++");
        console.log (myPersistentArray);
        console.log ("+++++++++++++++++++++++++++++++++++++++++++++++");
        // revisamos si los items no estan vacios
        // pasamos los datos al cotrolador
        // si no hay error mostramos el alerta
        paso=1;
        numeroCotizacionV=document.getElementById('numero').value;
        idEmpresaV=document.getElementById('selectEmpresa').value;
        paso=2;
        condicionPagoV=document.getElementById('condicion_pago').value;
        paso=3;
        fechaEntregaV=document.getElementById('fecha_entrega').value;
        paso=4;
        idClienteV=document.getElementById('codcliente').value;
        paso=5;
        idVendedorV=document.getElementById('codvendedor').value;
        paso=6;
        idTransporteV=document.getElementById('codtransporte').value;
        paso=7;
        idMonedaV=document.getElementById('codmoneda').value;
        paso=8;
        arregloDatosV=JSON.stringify(myPersistentArray);
        
        comentarioGeneralCotizacionV=document.getElementById('comentarioCotizacionAdicionales').value.trim();
        console.log ("=================== guardando ==============================");
        console.log (myPersistentArray);
        console.log ("=================================================");
        paso=9;
        $montoTotalV=document.getElementById('total').value;
        paso=10;
        ivaGeneralV=document.getElementById('ivaGeneral').value;
        paso=11;
        netoV=document.getElementById('subTotal').value;
        // faltan los campos adicionales 
        /*
        campo1 nocAdicionales
        campo3 usuarioAdicionales
        campo4 campo4
        campo5 comisionAdicionales
        campo7 fechaAdicionales
        campo8 AprobadoAdicionales
        */
        paso=1101;
        campo1V=document.getElementById('nocAdicionales').value;
        paso=1102;
        campo3V=document.getElementById('usuarioAdicionales').value;
        paso=1103;
        campo4V=document.getElementById('campo4').value;
        paso=1104;
        campo5V=document.getElementById('comisionAdicionales').value;
        paso=1105;
        campo7V=document.getElementById('fechaAdicionales').value;
        paso=1106;
        campo8V=document.getElementById('aprobadoAdicionales').value;
        
        if (
            (idEmpresaV!="") &&
            (idClienteV!="") &&
            (condicionPagoV!="") &&
            (fechaEntregaV!="") &&
            (idVendedorV!="") &&
            (idTransporteV!="") &&
            (idMonedaV!="") &&
            (arregloDatosV.length!=0)
        ){
            if (numeroCotizacionV.trim()!=""){
                // debemos encontrar por lo menos un renglon con cotizaciones
                var n=myPersistentArray.length;
                encontrado=false;
                for (i=0;i <n; i++){
                    coArtv=myPersistentArray[i]['cCoArt'].trim();
                    if (coArtv.length!=0){
                        encontrado=true;
                    }
                }
            } else {
                // debemos encontrar por lo menos un renglon con cotizaciones
                var n=myPersistentArray.length;
                encontrado=false;
                for (i=0;i <n; i++){
                    coArtv=myPersistentArray[i]['cCoArt'].trim();
                    if (coArtv.length!=0){
                        encontrado=true;
                    }
                }
            }

            if (!encontrado){
                msgError("No puede crear un pedido vacío, por favor agregue elementos al mismo");
                return (false);
            }

            if (numeroCotizacionV.trim()!=""){
                // actualizando un pedido existente
                $.ajax({
                    url: "/update_pedido",
                    type: "POST",
                    dataType: "html",
                    data:{
                        numeroCotizacion:numeroCotizacionV,
                        idEmpresa:idEmpresaV,
                        condicionPago:condicionPagoV,
                        fechaEntrega:fechaEntregaV,
                        idCliente:idClienteV,
                        idVendedor:idVendedorV,
                        idTransporte:idTransporteV,
                        idMoneda:idMonedaV,
                        arregloDatos:arregloDatosV,
                        montoTotal:$montoTotalV,
                        ivaGeneral:ivaGeneralV,
                        netoGeneral:netoV,
                        comentarioGeneralCotizacion:comentarioGeneralCotizacionV,
                        campo1:campo1V,
                        campo3:campo3V,
                        campo4:campo4V,
                        campo5:campo5V,
                        campo7:campo7V,
                        campo8:campo8V,
                    }
                }).done(function (res) {
                    paso=10;
                    console.log (res);
                    paso=11;
                    var data = JSON.parse(res);  
                    console.log (data);  
                    paso=12;
                    //console.log  (data.valor);                                   
                    if (data["valor"]=="1"){
                        paso=13;
                        estado=data["estado"];
                        resultado=data["resultados"];
                        $numeroCotizacion=data["cotizacion"];
                        document.getElementById('numero').value=$numeroCotizacion;
                        msgInfo2 (`${resultado}`);
                        setTimeout(function() {
                            $('#miModal').modal('hide');     
                        }, 5000);                      
                    } else if (data["valor"]=="-1") {
                        // pedido no existe
                        paso=14;
                        estado=data["status"];
                        paso=15;
                        mensaje=data["message"];
                        console.log (mensaje);
                        paso=16;
                        cotizacion=data["cotizacion"];
                        paso=17;
                        if (mensaje.includes("SQLSTATE[23000]")){
                            paso=18;
                            msgError (`No puede actualizar este pedido porque el numero no existe<br>Número de pedido ${cotizacion}`);
                        } else {
                            paso=19;
                            msgError (`${mensaje}`);
                        }
                    } else if (data["valor"]=="-3") {
                        // error al actuazlizar el pedido
                        paso=15;
                        msgError ("Error al intentar actualizar el pedido, intenelo mas tarde");
                    } else {
                        // error inesperado
                        paso=15;
                        msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log (jqXHR.responseText);
                    paso=50;
                    // Verifica si el código de estado HTTP es 500
                    if (jqXHR.status === 500) {
                        paso=52;
                        var data = JSON.parse(jqXHR.responseText);  
                        paso=53;
                        console.log (data);  
                        paso=54;
                        estado=data["status"];
                        paso=55;
                        mensaje=data["message"];
                        paso=56;
                        console.log (mensaje);
                        paso=57;
                        cotizacion=data["cotizacion"];
                        paso=58;
                        if (mensaje.includes("SQLSTATE[23000]")){
                            paso=59;
                            msgError (`No puede crear este pedido porque el numero ya existe<br>Número de pedido ${cotizacion}`);
                        } else {
                            paso=60;
                            msgError (`${mensaje}`);
                        }
                        
                    } else {
                        // Maneja otros errores (ej. 404 Not Found, 403 Forbidden, errores de red)
                        console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
                        // alert(`Ocurrió un error: ${textStatus}`);
                    }
                });                 

            } else {
                // creando un pedido nueva
                $.ajax({
                    url: "/save_new_pedido",
                    type: "POST",
                    dataType: "html",
                    data:{
                        numeroCotizacion:numeroCotizacionV,
                        idEmpresa:idEmpresaV,
                        condicionPago:condicionPagoV,
                        fechaEntrega:fechaEntregaV,
                        idCliente:idClienteV,
                        idVendedor:idVendedorV,
                        idTransporte:idTransporteV,
                        idMoneda:idMonedaV,
                        arregloDatos:arregloDatosV,
                        montoTotal:$montoTotalV,
                        ivaGeneral:ivaGeneralV,
                        netoGeneral:netoV,
                        comentarioGeneralCotizacion:comentarioGeneralCotizacionV,
                        campo1:campo1V,
                        campo3:campo3V,
                        campo4:campo4V,
                        campo5:campo5V,
                        campo7:campo7V,
                        campo8:campo8V,                        
                    }
                }).done(function (res) {
                    paso=10;
                    console.log (res);
                    paso=11;
                    var data = JSON.parse(res);  
                    console.log (data);  
                    paso=12;
                    //console.log  (data.valor);                                   
                    if (data["valor"]=="1"){
                        // se creo la pedido con éxito
                        paso=13;
                        estado=data["estado"];
                        resultado=data["resultados"];
                        $numeroCotizacion=data["cotizacion"];
                        document.getElementById('numero').value=$numeroCotizacion;
                        msgInfo2 (`${resultado}`);
                        setTimeout(function() {
                            $('#miModal').modal('hide');     

                        }, 5000);                      
                    } else if (data["valor"]=="-1") {
                        // error al crear el pedido, se debe a que uno de los renglones no tiene uniad
                        // asignada
                        paso=14;
                        estado=data["status"];
                        paso=15;
                        mensaje=data["message"];
                        console.log (mensaje);
                        paso=16;
                        cotizacion=data["cotizacion"];
                        paso=17;
                        if (mensaje.includes("SQLSTATE[23000]")){
                            paso=18;
                            msgError (`Ocurrió un error al crear los renglones de pedido porque uno de los artículos no tiene unidad asignada<br>Número de pedido ${cotizacion}`);
                        } else {
                            paso=19;
                            msgError (`${mensaje}`);
                        }
                    } else if (data["valor"]=="-3") {
                        // error de SQL
                        paso=15;
                        msgError ("Error al intentar inserta el pedido, intenelo mas tarde");
                    } else {
                        // error de conexion o inesperado
                        paso=15;
                        msgError ("Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo");
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log (jqXHR.responseText);
                    paso=50;
                    // Verifica si el código de estado HTTP es 500
                    if (jqXHR.status === 500) {
                        paso=52;
                        var data = JSON.parse(jqXHR.responseText);  
                        paso=53;
                        console.log (data);  
                        paso=54;
                        estado=data["status"];
                        paso=55;
                        mensaje=data["message"];
                        paso=56;
                        console.log (mensaje);
                        paso=57;
                        cotizacion=data["cotizacion"];
                        paso=58;
                        if (mensaje.includes("SQLSTATE[23000]")){
                            paso=59;
                            msgError (`No puede crear este pedido porque el numero ya existe<br>Número de pedido ${cotizacion}`);
                        } else {
                            paso=60;
                            msgError (`${mensaje}`);
                        }
                        
                    } else {
                        // Maneja otros errores (ej. 404 Not Found, 403 Forbidden, errores de red)
                        console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
                        // alert(`Ocurrió un error: ${textStatus}`);
                    }
                });                    
            }
     
        }

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error savePedido!");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
    
}

// esta funcion permite restaurar una cotizacion
function restorePedido(){
    alert("restaurar cotizacion");    
}

// esta funcion permite imprimir una cotizacion
function printPedido(){
    try {
        console.log ("entrando a printPedido");
        paso=1;
        cVarColorError="#f0ac74";
        document.getElementById('numero').style.backgroundColor="#FFFFFF";
        paso=2;
        var numeroCotizacionV=document.getElementById('numero').value;
        var dbV=document.getElementById('selectEmpresa').value;
        arregloDatosV=JSON.stringify(myPersistentArray);
        paso=3;
        if (!Number.isNaN(numeroCotizacionV) &&(typeof(numeroCotizacionV)!="undefined") && (parseInt(numeroCotizacionV)>0)){
            paso=4;
                $.ajax({
                    url: "/imprimir_pedido",
                    type: "POST",
                    dataType: "html",
                    data:{
                        numeroCotizacion:numeroCotizacionV,
                        db:dbV,
                        arregloDatos:arregloDatosV
                    }
                }).done(function (res) {
                    var data = JSON.parse(res);  
                    console.log (data); 
                    if (data['valor']=="1") {
                        /*remitente=data['remitente'];
                        destinatario=data['destinatario'];
                        document.getElementById('remitente').value=remitente;
                        document.getElementById('destinatario').value=destinatario;
                        $('#miModalSendMail').modal('show');  */

                        // se creo el archivo de impresion
                        nombrePdf=data['archivo'];
                        w=Math.ceil(window.screen.availWidth*0.8);
                        y=Math.ceil(window.screen.availHeight*0.8);
                        window.open (nombrePdf,`_cotizacion${numeroCotizacionV}`,`width:${w},height:${y}, scrollbars:yes`);
                    } else if (data['valor']=="-1"){
                        // error al intentar crear el archivo
                    } else if (data['valor']=="-2"){
                        // no existe el pedido
                    }
                }); 

        } else {
            paso=5;
            document.getElementById('numero').style.backgroundColor=cVarColorError;
            paso=6;
            document.getElementById('numero').focus();
            paso=7;
            cadena="Debe suministrar un número de pedido para imprimir";
            paso=8;
            msgError (cadena);
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error printPedido");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     

    
}

// esta funcion rescribe la tabla de detalles de cotizacion
// toma como parametro el arreglo persistente y rellena la tabla con los elementos presentes
function drawTableDatail(myPersistentArray){
    try {
        console.log ("entrando a drawTableDatail")
        paso=1;
        // eliminamos las columnas de la tabla
        console.log ("redibujando la tabla de detalles");
        console.log ("/////////////////////////////////////////////////////");
        paso=2;
        console.log (myPersistentArray);
        console.log ("/////////////////////////////////////////////////////");
        paso=3;
        var detallesTabla=document.getElementById('DetalleCotizacion');
        paso=4;
        detallesTabla.innerHTML="";    
        
        // determinamos la longitud del arreglo
        paso=5;
        var n=myPersistentArray.length;
        paso=6;
        cadenaHTML="";
        paso=7;
        var fSubTotal=0.00;
        paso=8;
        for (i=0; i < n; i++){
            paso=9;
            //console.log ("Iteraccion:",i);
            //console.log(myPersistentArray[i]);

            /*
            almacen: ""
            cComentario: ""
            cDesArt: ""
            cModelo: ""
            co_Art: ""
            fAdicional: 0
            fNeto1: 0
            fPendiente: 0
            fPorcentajeDescuento: 0
            iva: 0
            nDocumento: 0
            nOrigen: 0
            nRenNum: 1
            nReng: 1
            ncantidad: 0
            */
            // pasmos el contenido del arreglo persistente a variables de trabajo
            paso=10;
            var nRenNum=(i+1);     
            paso=11;
            var cCoArt=myPersistentArray[i]['cCoArt'];
            paso=12;
            var cDesArt=myPersistentArray[i]['cDesArt'];
            paso=13;
            var nCant=myPersistentArray[i]['fCant'];
            paso=14;
            var cAlmacen=myPersistentArray[i]['cAlmacen'];
            paso=15;
            var nUnidad="";
            paso=16;
            var fPrecio1=parseFloat(myPersistentArray[i]['fPrecio1']).toFixed(4);
            paso=17;
            var fPrecio2=parseFloat(myPersistentArray[i]['fPrecio2']).toFixed(4);
            paso=18;
            var fIva=0.00;
            paso=19;
            var fNeto1=parseFloat(myPersistentArray[i]['fRengNeto']).toFixed(2);
            paso=20;
            var fPorcentajeDescuento=parseFloat(myPersistentArray[i]['fPorDesc']).toFixed(2);
            paso=21;
            var fPendiente=parseInt(myPersistentArray[i]['fPendiente']);
            paso=22;
            var nDocumento=parseInt(myPersistentArray[i]['nNumDoc']);
            paso=23;
            var nOrigen=parseInt(myPersistentArray[i]['nNumDoc2']);
            paso=24;
            var fAdicional=myPersistentArray[i]['fAdicional'];
            paso=25;
            var cModelo=myPersistentArray[i]['cModelo'];
            paso=26;
            var fNeto2=0.00;
            paso=27;
            var cComentario=myPersistentArray[i]['cComentario'];
            paso=28;
            fSubTotal=fSubTotal + (fPrecio2 * nCant);
            paso=29;
            // buscamos el nombre del articulo en los comentarios
            //cDesArt=searchVariable(cComentario,"NomEtq");
            cadenaHTML=cadenaHTML+"<tr class='tr-cotizacion'>";
            paso=30;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'>${nRenNum}`;
            paso=31;
            if (i < (n-1)){
                paso=32;
                cadenaHTML=cadenaHTML+`<a href='javascript:downRenglon(${i})' title='Bajar'><img src='assets/images/icons8-abajo-48.png' style='height:12px !important;width:auto !important'></a>`
            }
            paso=33;
            if (i !=0){
                paso=34;
                cadenaHTML=cadenaHTML+`<a href='javascript:upRenglon(${i})' title='Subir'><img src='assets/images/icons8-arriba-48.png' style='height:12px !important;width:auto !important'></a>`
            }
            paso=35;
            cadenaHTML=cadenaHTML+`</td>`;
            paso=36;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><input type='text' id='co_art${i}' name='co_art' value='${cCoArt}' onclick='javascript:touchArt("${cCoArt}","${nRenNum}","co_art${i}")' `;
            cadenaHTML=cadenaHTML+ `ondblclick='javascript:dblClickCodigoArticulo("${nRenNum}","co_art${i}")' `;
            cadenaHTML=cadenaHTML+ `onchange='javascript:changeArt("${cCoArt}","${nRenNum}","co_art${i}")'></td>`;
            paso=37;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'><input type='text' id='almacen${i}' name='almacen' value='${cAlmacen}' size='3' disabled></td>`;
            paso=38;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='cantidad${i}' name='cantidad' value='${parseInt(nCant)}' size='8' style='text-align:right !important' disabled></td>`;
            paso=39;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'>${nUnidad}</td>`;
            paso=40;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='precio${i}' name='precio' value='${fPrecio1}' size='8' style='text-align:right !important' disabled></td>`;
            paso=41;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><input type='text' id='precio${i}_2' name='precio2' value='${fPrecio2}' size='8' style='text-align:right !important' disabled></td>`;
            paso=42;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'>${fIva}</td>`;
            paso=43;
            cadenaHTML=cadenaHTML+`<td  class='text-right td-cotizacion'>${fNeto1}</td>`;
            paso=44;
            cadenaHTML=cadenaHTML+`<td  class='text-right td-cotizacion'>${fPorcentajeDescuento}</td>`;
            paso=45;
            console.log ("nDocumento",nDocumento);
            if ((typeof(nDocumento)!=null) && (!isNaN(nDocumento))){
                cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>${nDocumento}</td>`;
            } else {
                cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>0</td>`;
            }
            
            paso=46;
            console.log ("nOrigen",nOrigen);
            if ((typeof(nOrigen)!=null) && (!isNaN(nOrigen))){
                cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>${nOrigen}</td>`;
            } else {
                cadenaHTML=cadenaHTML+`<td class='td-cotizacion6'>0</td>`;
            }
            
            paso=47;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><label id='descArt${i}'>${cDesArt}</label></td>`;
            paso=48;
            cadenaHTML=cadenaHTML+`<td class='td-cotizacion'><label id='modeloArt${i}'>${cModelo}</label></td>`;
            paso=49;
            cadenaHTML=cadenaHTML+`<td class='text-center td-cotizacion'>${nRenNum}</td>`;
            paso=50;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'>${fAdicional}</td>`;                            
            paso=51;
            cadenaHTML=cadenaHTML+`<td class='text-right td-cotizacion'><span class='monto_resaltado'>${fNeto1}</span></td></tr>`;        
        }
        
        // reescribimos la tabla 
        paso=52;
        detallesTabla.innerHTML=cadenaHTML;    
        // actualizamos el subtotal de el pedido
        paso=53;
        document.getElementById('subTotal').value=parseFloat(fSubTotal).toFixed(2);
        // calculamos el iva
        paso=54;
        fIva=fSubTotal*16/100;
        paso=55;
        document.getElementById('ivaGeneral').value=parseFloat(fIva).toFixed(2);
        // actualizamos el total de el pedido
        paso=56;
        fTotal=fSubTotal+fIva;
        paso=57;
        document.getElementById('total').value=parseFloat(fTotal).toFixed(2);

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error drawTableDatail");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    } 

}

// esta funcion permite actualizar el precio del renglon
// forza un recalculo del total de la factura
// n representa la fila del arreglo
function actualizaReng(n){
    // rebajamos 1 por que los objetos estan en indices de base 0
    if (n>=1){
        n=n-1;
    }
    var cantV=document.getElementsByName('cantidad').item(n).value;
    var precioV=document.getElementsByName('precio').item(n).value;
    var sTotal=cantV*precioV;

    document.getElementsByName('precio2').item(n).value=precioV;

    console.log (myPersistentArray);
    // actualizamos los elementos en el arreglo de datos
    myPersistentArray[n]['fCant']=cantV;
    myPersistentArray[n]['fPrecio1']=parseFloat(precioV).toFixed(4);
    myPersistentArray[n]['fPrecio2']=parseFloat(precioV).toFixed(4);
    myPersistentArray[n]['fRengNeto']=parseFloat(sTotal).toFixed(2);


    drawTableDatail(myPersistentArray)
    //recalPedido();
}


// esta funcion recorre el arreglo y reordena el campo nRenNum de forma correlativa 
function reordernaRenglones(arreglo){
    console.log ("arreglo desordenado", arreglo);
    var l=arreglo.length;
    console.log (`cantidad de elementos ${l}`);
    var i=1;
    for (j=0; j < l; j++){
        console.log (`indice ${j}`);
        arreglo[j]["nRenNum"]=i;
        g=arreglo[j]["nRenNum"];
        console.log (`elemento ${g}`);
        i++;
    }

    console.log ("arreglo reordenado",arreglo);

    return (arreglo);
}

// esta funcion permite agrega un nuevo item a el pedido
function addItem(){
    try {
        console.log ("enrando a addItem");
        paso=1;
        var nRenNum=(myPersistentArray.length + 1);
        paso=2;
        elemento={
                "cAnulado":" ", 
                "cAux01":" ", 
                "cAux02":" ",
                "fCantImp":0.00,
                "fCanProd":0.00,
                "cAlmacen":" ",
                "cAlmacen2":" ",
                "cCoArt":" ",
                "cComentario":" ",   
                "fCosProOm":0.00,
                "fCosProUn":0.00,
                "cDesArt":" ",
                "nFactNum":0,
                "dFecLote":" ",
                "fImpProd":0.00,
                "fMonIlc":0.00,
                "fMontDev":0.00,
                "nNroLote":0,
                "nNumDoc":0,
                "nNumDoc2":0,
                "fOtros":0.00,
                "fPendiente":0.00,
                "fPendiente2":0.00,
                "fPorDesc":0.00,
                "fPrecio1":0.00,
                "fPrecio2":0.00,
                "nRengDoc":0,
                "nRengDoc2":0,
                "fRengNeto":0.00,
                "nRenNum":nRenNum,     
                "cRowId":" ",
                "nSeleccion":0,
                "fSTotalArt":0.00,
                "cTipoDoc":" ",
                "cTipoDoc2":" ",
                "fIva":0.00, 
                "fSTotalDev":0.00,
                "fSTotalUni":0.00,        
                "fUltCosOm":0.00,  
                "fUltCosUn":0.00,              
                "nUnidad":" ",
                "fCant":0.00,
                "cModelo":" ",
                "fAdicional":0.00
            };
        
        // agregamos el elemento al arreglo definitivo
        paso=3;
        myPersistentArray.push(elemento);
        paso=4;
        agregarNuevoComentario(" ", " ",parseInt(nRenNum)); 
        paso=5;
        console.log ("Arreglo actualizado",myPersistentArray);
        
        // reodernamos los renglones del arreglo
        paso=6;
        arregloTemp=reordernaRenglones(myPersistentArray);

        // pasamos los datos reodernado los renglones
        paso=7;
        myPersistentArray=arregloTemp;
        
        // mandamos a redibujar la tabla
        paso=8;
        drawTableDatail(myPersistentArray);
        
        // habilitar los links
        paso=9;
        document.getElementById('btnDeleteItem').classList.remove('disabled-link'); 
        
        //---- hanilitar las imagenes ---
        paso=10;
        document.getElementById('imgDeleteItem').classList.remove('imagen-link-deshabilitado');

        //---- totalizamos la pedido ---------------//
        paso=11;
        recalPedido(myPersistentArray);

        // activamos el elemento de eliminado de item
        paso=12;
        document.getElementById('btnDeleteItem').disabled=false;
        paso=13;
        document.getElementById('imgDeleteItem').classList.remove('shadow-red');
        paso=14;
        document.getElementById('imgDeleteItem').classList.add('shadow-white');
        //
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error addItem");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }
}

// esta funcion permite eliminar un item de el pedido
function deleteItem(){
    try {
        console.log ("Entrando en deleteItem");
        paso=1;
        var coArtV=document.getElementById('cLCoArt').innerHTML;
        paso=2;
        var nRenglon=parseInt(document.getElementById('nLRenglon').innerHTML);

        //console.log("Eliminar Item ",nRenglon);
        
        // Paso 1: Filtrar el arreglo para eliminar el elemento
        // El método filter() crea un nuevo arreglo con todos los elementos que pasan la prueba.
        // Aquí, la prueba es que el nReng del elemento no sea igual al nRengAEliminar.
        paso=3;
        let arregloActualizado = myPersistentArray.filter(elemento => (elemento.nRenNum) != nRenglon);

        // Paso 2: Recorrer el nuevo arreglo y actualizar los nReng
        // El método forEach() ejecuta la función para cada elemento del arreglo.
        // Usamos el índice del elemento (index) para asignar el nuevo valor correlativo.
        paso=4;
        index=0;
        
        // recorremos el nuevo arreglo para reordenar los renglones
        paso=5;
        var l=arregloActualizado.length;

        paso=6;
        console.log ("arreglo actualizado",arregloActualizado);

        // reodernamos los renglones del arreglo
        // reodernamos los renglones del arreglo
        paso=7;
        arregloTemp=reordernaRenglones(arregloActualizado);

        // pasamos los datos reodernado los renglones
        paso=8;
        myPersistentArray=arregloTemp;  

        paso=9;
        drawTableDatail(myPersistentArray);

        // determinamos el tamaño del arreglo
        var n = myPersistentArray.length;

        paso=10;
        if (n == 0){
            paso=11;
            // deshabilitar los links
            document.getElementById('idDeleteItem').classList.add('disabled-link');  
            //---- deshabilitar las imagenes -----
            paso=12;
            document.getElementById('idDeleteItem').classList.add('imagen-link-deshabilitado'); 

            // habilitamos el agregado de items 
            paso=13;
            document.getElementById('idAddItem').classList.remove('disabled-link');
            
            //---- habilitar las imagenes ---
            paso=14;
            document.getElementById('idAddItem').classList.remove('imagen-link-deshabilitado');

        } 
        // ejecutamos el recalculo de el pedido;
        paso=15;
        recalPedido(myPersistentArray);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error deleteItem");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}

// esta funcion permite recalcular el total de una factura una vez Agregado o eliminado un item
function recalPedido(myPersistentArray){
    try {
        console.log ("entrando a recalPedido");
        paso=1;
        var n=myPersistentArray.length;
        // inicializamos el acumulador
        paso=2;
        var st=0.00;

        paso=3;
        for (i=0; i < n; i++){
            paso=4;
            st=st+(1 * parseFloat(myPersistentArray[i]['fRengNeto']).toFixed(2));
        }
        paso=5;
        console.log(st);

        paso=6;
        document.getElementById('subTotal').value=parseFloat(st).toFixed(2);
        // caculamos el IVA
        paso=7;
        var ivaV=(st*16)/100;
        paso=8;
        document.getElementById('ivaGeneral').value=parseFloat(ivaV).toFixed(2);

        // calculamos el total de la factura
        paso=9;
        var totalV=0.00;
        paso=10;
        totalV=st+ivaV;

        // actualizamos el total de la factura en la pantalla
        paso=11;
        document.getElementById('total').value=parseFloat(totalV).toFixed(2);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error recalPedido");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     

}

// esta funcion llama al proceso especial 1
function processEsp1(){
    try {
        console.log ("entrando a processEsp1");

        paso=1;
        console.log ("arreglo persistente")
        paso=2;
        console.log (myPersistentArray);
        paso=3;
        localStorage.setItem('myArrayKey', JSON.stringify(myPersistentArray));   
        paso=4; 
        console.log ("local storage");
        paso=5;
        console.log(localStorage.getItem('myArrayKey'));
        paso=6;
        const anchoVentana = screen.width*0.65;
        paso=7;
        const altoVentana = screen.height*0.65;    
        paso=8;     
        const izquierda = (screen.width - anchoVentana) / 2;
        paso=9;
        const arriba = (screen.height - altoVentana) / 2;  
        paso=10;
        var empresaV=document.getElementById('selectedEnterprise').value; 
        paso=11;            
        var dolarHPV=document.getElementById('dolarHP').value;
        paso=12;
        window.open ("/orden_produccion/?empresa="+empresaV+"&dolarHP="+dolarHPV,"_orden_produccion",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error processEsp1");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

// esta funcion llama al proceso especial 2
function processEsp2(){
    try {
        console.log ("Entrando a processEsp2");
        paso=1;
        alert ("Proceso Especial 2");
   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error processEsp2");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }      
}

// esta funcion llama al proceso especial 1
function processEsp3(){
    try {
        console.log ("Entrando a processEsp3");
        paso=1;
        alert ("Proceso Especial 3");
   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error processEsp3");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

// esta funcion despliega el formulario de articulos
function consultarArticulo(){
    try {
        console.log ("Entrando a consultarArticulo");
        paso=1;
        const anchoVentana = screen.width*0.75;
        paso=2;
        const altoVentana = screen.height*0.75;         
        paso=3;
        const izquierda = (screen.width - anchoVentana) / 2;
        paso=4;
        const arriba = (screen.height - altoVentana) / 2;               
        paso=5;
        window.open ("/list_products","_blank",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error consultarArticulo");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }
}


// esta funcion despliega el formulario de busquedas asistidas
function searchAssistsArticulo(idElemento){
    try {
        console.log ("Entrando a searchAssistsArticulo");
        paso=1;
        const anchoVentana = screen.width*0.45;
        paso=2;
        const altoVentana = screen.height*0.45;         
        paso=3;
        const izquierda = (screen.width - anchoVentana) / 2;
        paso=4;
        const arriba = (screen.height - altoVentana) / 2;               
        paso=5;
        window.open ("/search_asists_articulos?idElemento="+idElemento,"_blank",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error searchAssistsArticulo");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }    
}

//----- esta funcion se ejecuta cuando el usuario cambia de empresa -----------------//
function changeEnterprise(){
    try {
        console.log ("Entrando a changeEnterprise");
        paso=1;
        var empresa=document.getElementById('selectEmpresa').value;
        paso=2;
        console.log (empresa);
        paso=3;
        document.location="/nueva_cotizacion/?empresa="+empresa;
   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error changeEnterprise");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

/*--- esta funcion se utiliza para desplegar el formulario de busqueda de articulos/servicios ---*/
function dblClickCodigoArticulo(nRenglon,objName){
    alert (`Renglon Activo ${nRenglon}  objeto:${objName}`);
}

// esta fcuion se utiliza para desplegar la busqueda asistedia de clientes
function buscarClientes(){
    try {
        console.log ("Entrando a buscarClientes");
        paso=1;
        const anchoVentana = screen.width*0.45;
        paso=2;
        const altoVentana = screen.height*0.45;    
        paso=3;     
        const izquierda = (screen.width - anchoVentana) / 2;
        paso=4;
        const arriba = (screen.height - altoVentana) / 2;       
        paso=5;       
        idElemento="0"; 
        paso=6;
        window.open ("/search_asists_cliente?idElemento="+idElemento,"_blank",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error buscarClientes");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}


// esta fcuion se utiliza para desplegar la busqueda asistedia de Vendedores
function buscarVendedores(){
    try {
        console.log ("Entrando a buscarVendedores");
        paso=1;
        const anchoVentana = screen.width*0.45;
        paso=2;
        const altoVentana = screen.height*0.45;    
        paso=3;     
        const izquierda = (screen.width - anchoVentana) / 2;
        paso=4;
        const arriba = (screen.height - altoVentana) / 2;       
        paso=5;       
        idElemento="0"; 
        paso=6;
        window.open ("/search_asists_vendedor?idElemento="+idElemento,"_blank",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
   } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error buscarVendedores");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

// este evento se usa para poder detectar F2 sobre los articulos y levantar la busqueda asistida
document.addEventListener('keydown', function(event) {
    // Verificamos si la tecla presionada es F2
    if (event.key === 'F2' || event.code === 'F2') {
        // Obtenemos el elemento que tiene el foco actualmente
        const focusedElement = document.activeElement;
        const idActiveElement=focusedElement.id;

        // Comprobamos si el elemento es un input y si su ID comienza con 'co_art'
        if (focusedElement.tagName === 'INPUT' && focusedElement.id.startsWith('co_art')) {
            // Prevenimos la acción predeterminada de la tecla F2
            event.preventDefault();
            // tomamos el renglon activo 
            // Aquí obtienes el ID
            const idDelElemento = focusedElement.id;

            // Convierte el arreglo a una cadena JSON
            const jsonArray = JSON.stringify(myPersistentArray);

            // Guarda la cadena en localStorage con una clave (por ejemplo, 'myArrayKey')
            localStorage.setItem('myArrayKey', jsonArray);

            // permite abrir las busquedas asistidas
            searchAssistsArticulo(idDelElemento);

        }

        // activamos la busqueda de clientes con F2
        if ((idActiveElement==='codcliente') || (idActiveElement==='codcliente2')) {
            buscarClientes();
        }        

        // activamos la busqueda de vendedores con F2
        if ((idActiveElement==='codvendedor') || (idActiveElement==='codvendedor2')) {
            buscarVendedores();
        }        

    }
});  


window.addEventListener('storage', function(event) {
    // 1. Verificamos si el cambio es para la clave que nos interesa
    if (event.key === 'myPersistentArray') {
        
        // 2. Leemos la nueva data directamente de localStorage
        const nuevaDataJSON = localStorage.getItem('myPersistentArray');
        const nuevoArreglo = JSON.parse(nuevaDataJSON);
        
        // 3. Actualizamos la variable en memoria de la Página A y/o la interfaz de usuario
        console.log("¡Datos actualizados en la otra pestaña! Nuevo contenido:", nuevoArreglo);
        
        // Aquí puedes actualizar la vista (DOM) de la Página A
        // Por ejemplo: actualizar un gráfico o una tabla.
        // updateUI(nuevoArreglo); 
    }
});

//---- esta funcion se usa para mostrar errores 
function msgError (cadena){
    var cadena="<span class='text-danger'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');    
}

function msgWarning (cadena){
    var cadena="<span class='text-warning'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');     
}

function msgInfo (cadena){
    var cadena="<span class='text-info'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');     
}


function msgInfo2 (cadena){
    var cadena="<span class='text-info'>"+cadena+"</span><br><div class='d-flex justify-content-center'>";
    cadena=cadena+"<img src='assets/images/icons8-wait.gif'></div>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');     
}


function sendMailCotizacion(){
    alert ("aqui");
}

// esta funcion muestra la direccion del cliente en la division adicionales
function mostrarDireccionAdicional(){
    var cadena=document.getElementById('direccionClienteAdicionales').value;
    $('#miModalDireccion').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModalDireccion .modal-title');
    tituloModal.innerHTML = "Dirección del Cliente";
    $('#miModalDireccion').modal('show');
}

// esta funcion muestra los comentarios de la pedido en la division adicionales
function mostrarComentarioAdicional(){
    var cadena=document.getElementById('comentarioCotizacionAdicionales').value;
    // se uso este cambio para que pueda mostrar caracteres como < > saltos de linea etc
    document.getElementById('adicionalComentario').value=cadena;
    console.log ("comentarios adicionales",cadena);
    $('#miModalAdicionalComentario').modal('show');
}

// esta funcion permite anular un pedido en el sistema nuevo
function anularPedido(){
    try {
        console.log ("Entrando anularCotizacion 2k12");
        if (document.getElementById('btnAnular').title=="Activar"){
            paso=1;
            var idCotizacion=document.getElementById('numero').value;
            var empresaSeleccionada=document.getElementById('selectEmpresa').value;
            if (idCotizacion!=""){
                $.ajax({
                    url: "/activar_cotizacion",
                    type: "POST",
                    dataType: "html",
                    data:{
                        idEmpresa:empresaSeleccionada,
                        numeroCotizacion:idCotizacion
                    }
                }).done(function (res) {
                    console.log (res);
                    var data = JSON.parse(res);                
                    console.log  (data.valor);                           
                    if (data.valor=="1"){
                        estado=data["estado"];
                        resultado=data["resultados"];
                        numeroCotizacion=data["cotizacion"];
                        //document.getElementById('numero').value=$numeroCotizacion;
                        msgInfo2 (`${resultado}`);

                        setTimeout(function() {
                            $('#miModal').modal('hide');     
                            searchCotizacion2(idCotizacion);
                        }, 10000);                                               
                   
                    } else if (data.valor=="-2") {
                        resultado=data["resultados"];
                        numeroCotizacion=data["cotizacion"];
                        msgError(resultado);
                    } else if (data.valor=="-3") {
                        resultado=data["resultados"];
                        numeroCotizacion=data["cotizacion"];
                        msgError(resultado);
                    }                
                });  
            } else {
                msgError("Debe definir un número de cotización a anular, la misma será considerada solo en el sistema nuevo");
            }
        } else {
            paso=1;
            var idCotizacion=document.getElementById('numero').value;
            var empresaSeleccionada=document.getElementById('selectEmpresa').value;
            if (idCotizacion!=""){
                $.ajax({
                    url: "/anular_cotizacion",
                    type: "POST",
                    dataType: "html",
                    data:{
                        idEmpresa:empresaSeleccionada,
                        numeroCotizacion:idCotizacion
                    }
                }).done(function (res) {
                    console.log (res);
                    var data = JSON.parse(res);                
                    console.log  (data.valor);                           
                    if (data.valor=="1"){
                        estado=data["estado"];
                        resultado=data["resultados"];
                        numeroCotizacion=data["cotizacion"];
                        //document.getElementById('numero').value=$numeroCotizacion;
                        msgInfo2 (`${resultado}`);
                        setTimeout(function() {
                            $('#miModal').modal('hide');  
                            searchCotizacion2(idCotizacion);
                        }, 10000);                    
                    } else if (data.valor=="-2") {
                        resultado=data["resultados"];
                        numeroCotizacion=data["cotizacion"];
                        msgError(resultado);
                    } else if (data.valor=="-3") {
                        resultado=data["resultados"];
                        numeroCotizacion=data["cotizacion"];
                        msgError(resultado);
                    }                
                });  
            } else {
                msgError("Debe definir un número de cotización a anular, la misma será considerada solo en el sistema nuevo");
            }            
        }

    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error anularCotizacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     
}

// esta funcion mueve un elemento dentro de arreglo persistente
// arr arreglo de datos
// fromIndex posicion original en el arreglo
// toIndex posicion de destino en el arreglo
function moverElemento(arr, fromIndex, toIndex) {
    try {
        console.log ("entrando a moverElemento ");
        paso=1;
        // 1. Eliminar el elemento de la posición original y guardarlo.
        // splice(start, deleteCount, item1, item2, ...)
        const [elementoMovido] = arr.splice(fromIndex, 1);

        // 2. Insertar el elemento guardado en la nueva posición.
        paso=2;
        arr.splice(toIndex, 0, elementoMovido);

        // devolvemo el arreglo resultante
        paso=3;
        return arr;
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error moverElemento");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }  
}

// esta funcion permite subir un renglon de posicion
function upRenglon(item){
    try {    
        console.log (`entrando upRenglon`);
        paso=1;
        // caclulamos item-1
        // si es >= 0 entonces
        // elementoA = arregloPersistente[item]
        // elementoB = arregloPersistente[item-1]
        // intercambiamos los registros
        // arregloPersistente[item]=elementoB
        // arregloPersistente[item-1]=elementoA
        // reordenamos el arreglo
        m=item;
        n= m - 1;
        paso=2;
        console.log (`posicion original ${m}`);
        console.log (`posicion de destino ${n}`);
        paso=3;
        if (n >=0){
            paso=4;
            // movemos el cotenido a un arreglo temporal
            arregloTemp=myPersistentArray;
            paso=5;
            console.log ("arreglo Temporal",arregloTemp);
            paso=6;
            // movemos los elementos y lo pasamos al arreglo persistente
            // el parametro m representa la posicion original
            // el parametro n representa la posicion de destino n-1
            myPersistentArray=moverElemento(arregloTemp, m, n) ;
            // mandamos a redibujar la tabla
            paso=12;
            drawTableDatail(myPersistentArray);
        } else {
            msgError("No puede subir mas este elemento es el primero de la lista");
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error upRenglon");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }
}

// esta funcion permite bajar un renglon de posicion
function downRenglon(item){
    try {    
        console.log (`entrando downRenglon`);
        paso=1;
        // caclulamos item-1
        // si es >= 0 entonces
        // elementoA = arregloPersistente[item]
        // elementoB = arregloPersistente[item-1]
        // intercambiamos los registros
        // arregloPersistente[item]=elementoB
        // arregloPersistente[item-1]=elementoA
        // reordenamos el arreglo
        m=item;
        n= m + 1;
        paso=2;
        console.log (`posicion original ${m}`);
        console.log (`posicion de destino ${n}`);
        paso=3;

        if (n <= myPersistentArray.length ){
            paso=4;
            // movemos el cotenido a un arreglo temporal
            arregloTemp=myPersistentArray;
            paso=5;
            console.log ("arreglo Temporal",arregloTemp);
            paso=6;
            // movemos los elementos y lo pasamos al arreglo persistente
            // el parametro m representa la posicion original
            // el parametro n representa la posicion de destino n-1
            myPersistentArray=moverElemento(arregloTemp, m, n) ;
            // mandamos a redibujar la tabla
            paso=12;
            drawTableDatail(myPersistentArray);
        } else {
            msgError("No puede bajar mas este elemento, es el ultimo de la lista");
        }
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error downRenglon");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }
}