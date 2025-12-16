//esta funcion muestra los detalles de un articulo hacerle click
function selCoArt(coArt){
   document.getElementById('idDetCoArt').value=coArt;
}

//----------- primera fila
// esta funcion permite ver los articulos relacionados
function verRelacionados(){
   alert ("En desarrollo");
}

// esta funcion permite ver los lotes de un articulo
function verLotes(){
   alert ("En desarrollo");
}

// esta funcion permite ver los costos de importacion
function verCostosImportacion(){
   alert ("En desarrollo");
}


//------------ segunda fila -------
// esta funcion ordena por  codigo el conjunto de resultados
function ajustarDescripcion(){
   alert ("Ajustar Descripcion");   
}

// esta funcion ordena por  codigo el conjunto de resultados
function orderByCodigo(){
   document.location="/list_products/?ordenamiento=codigo";   
}

// esta funcion ordena por  modelo el conjunto de resultados
function orderByModelo(){
   document.location="/list_products/?ordenamiento=modelo"   ;
}

// tercera fila --------
// esta funcion ordena por  descripcion el conjunto de resultados
function orderByDescripcion(){
   document.location="/list_products/?ordenamiento=descripcion"   ;
}

// esta funcion ordena por  referencia el conjunto de resultados
function orderByReferencia(){
   document.location="/list_products/?ordenamiento=referencia"   ;
}

// esta funcion permite ver los costos de un artículo
function verCostos(){
   alert ("En desarrollo");
}


// esta función permite ir al filtrado segun los objetos
function goPage(pagina){
   var nArticulos=document.getElementById('nArticulos').value;
   var nRecords=document.getElementById('nRecords').value;
   document.location="/list_products/?nArticulos="+nArticulos+"&page="+pagina+"&nRecords="+nRecords;
}


// funcion de filtrado
function filtrar(){
   const anchoVentana = screen.width*0.5;
   const altoVentana = screen.height*0.5;         
   const izquierda = (screen.width - anchoVentana) / 2;
   const arriba = (screen.height - altoVentana) / 2;               
   window.open ("/filter_products","_blank",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);

}


// esta funcion despliega el formulario de busquedas asistidas
function searchAssistsArticulo(){
    const anchoVentana = screen.width*0.45;
    const altoVentana = screen.height*0.45;         
    const izquierda = (screen.width - anchoVentana) / 2;
    const arriba = (screen.height - altoVentana) / 2;               
    window.open ("/search_asists_articulos","_blank",`scrollbars=yes;resizable=yes,width=${anchoVentana},height=${altoVentana},left=${izquierda},top=${arriba}`);
}