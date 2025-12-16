/*--- esta funcion permite seleccionar el codigo del artículo y pasarlo a la ventana de procesos especiales uno ---*/
function selectArt(coArt,desArt){
    window.opener.setCodigoEtiqueta(coArt);
    window.opener.setNombreEtiqueta(desArt);
    window.close();
}

function msgError (cadena){
    var cadena="<span class='text-danger'>"+cadena+"</span>";
    $('#miModal').find('.modal-body').html(cadena);
    const tituloModal = document.querySelector('#miModal .modal-title');
    tituloModal.innerHTML = "Atención";
    $('#miModal').modal('show');    
}

/*------ esta funcon permite hacer el filtrado de articulos ----*/
function buscarArt(){
    document.getElementById('selectTipoSearch').style.backgroundColor="#FFFFFF";
    document.getElementById('txtSearchInput').style.backgroundColor="#FFFFFF";
    var tipoBusqueda=document.getElementById('selectTipoSearch').value;
    if (tipoBusqueda=="-99"){
        document.getElementById('selectTipoSearch').style.backgroundColor="#dc3545";
        var cadena="Debe seleccionar un criterio para efectuar la Búsqueda";
        msgError(cadena);
        return (false);
    }

    var txtSearch=document.getElementById('txtSearchInput').value.trim();
    if (txtSearch.length==0){
        var cadena="Debe escribir una frase para efectuar la Búsqueda";
        document.getElementById('txtSearchInput').style.backgroundColor="#dc3545";
        msgError(cadena);
        return (false);
    }
    var empresaV=document.getElementById('selectedEnterprise').value;
    window.document.location="/bus_articulos/?empresa="+empresaV+"&searchInput="+txtSearch+"&searchType="+tipoBusqueda;
}

/*--- esta funcion permite limpiar los filtros de busqueda -----*/
function limpiarSearch(){
    var empresaV=document.getElementById('selectedEnterprise').value;
    window.document.location="/bus_articulos/?empresa="+empresaV;
}

/*----- esta funcion permite salir del formulario --------------*/
function salir(){
    window.close();
}