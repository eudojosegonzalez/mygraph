function aceptar(){
    alert ("Aceptar")
}

// esta funcion limpia el formulario
function clean(){

    const allSelects = document.querySelectorAll('select'); // Obtiene todos los elementos select
    allSelects.forEach(selectElement => {
        // Verifica si el select tiene opciones antes de intentar deseleccionar
        if (selectElement.options.length > 0) {
            selectElement.selectedIndex = 0; // Establece la primera opción como seleccionada
        }
    });    
 
    // Deseleccionar el checkbox fMantener
    const checkboxMantener = document.getElementById('fMantener');
    if (checkboxMantener) {
        checkboxMantener.checked = false;
    }    
}

// esta funcion cierra el formulario
function salir(){
   window.close();
}

// esta funcion busa el codigo del proveedor y selecciona el objeto de descripcion del nombre del proveedor
function searchProveedorCod(){
    var codProv=document.getElementById('fCodigoProveedor').value;
    var l=document.getElementById('fDesProveedor').length;
    const objetoSelect=document.getElementById('fDesProveedor');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }
}

// esta funcion busa el la descripcion del proveedor y selecciona el objeto de codigo del proveedor
function searchProveedorDes(){
    var codProv=document.getElementById('fDesProveedor').value;
    var l=document.getElementById('fCodigoProveedor').length;
    const objetoSelect=document.getElementById('fCodigoProveedor');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }    
}


// esta funcion busa el codigo la linea y selecciona el objeto de descripcion del nombre de linea
function searchLinCod(){
    var codProv=document.getElementById('fCodigoLinea').value;
    var l=document.getElementById('fDesLinea').length;
    const objetoSelect=document.getElementById('fDesLinea');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }
}


// esta funcion busa el la descripcion de la linea y selecciona el objeto de codigo linea
function searchLinDes(){
    var codProv=document.getElementById('fDesLinea').value;
    var l=document.getElementById('fCodigoLinea').length;
    const objetoSelect=document.getElementById('fCodigoLinea');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }    
}

// esta funcion busca el codigo la sublinea y selecciona el objeto de descripcion del nombre de sublinea
function searchSubLinCod(){
    var codProv=document.getElementById('fCodigoSubLinea').value;
    var l=document.getElementById('fDesSubLinea').length;
    const objetoSelect=document.getElementById('fDesSubLinea');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }
}

// esta funcion busa el la descripcion de la sublinea y selecciona el objeto de codigo sublinea
function searchSubLinDes(){
    var codProv=document.getElementById('fDesSubLinea').value;
    var l=document.getElementById('fCodigoSubLinea').length;
    const objetoSelect=document.getElementById('fCodigoSubLinea');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }    
}

// esta funcion busca el codigo la categoria y selecciona el objeto de descripcion de la categoria
function searchCategoriaCod(){
    var codProv=document.getElementById('fCodigoCategoria').value;
    var l=document.getElementById('fDesCategoria').length;
    const objetoSelect=document.getElementById('fDesCategoria');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }
}

// esta funcion busa el la descripcion de la categoria y selecciona el objeto de codigo categoria
function searchCategoriaDes(){
    var codProv=document.getElementById('fDesCategoria').value;
    var l=document.getElementById('fCodigoCategoria').length;
    const objetoSelect=document.getElementById('fCodigoCategoria');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }    
}


// esta funcion busca el codigo los colores y selecciona el objeto de descripcion de los colores
function searchColorCod(){
    var codProv=document.getElementById('fCodigoColor').value;
    var l=document.getElementById('fDesColor').length;
    const objetoSelect=document.getElementById('fDesColor');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }
}

// esta funcion busa el la descripcion los colores y selecciona el objeto de codigo de colores
function searchColorDes(){
    var codProv=document.getElementById('fDesColor').value;
    var l=document.getElementById('fCodigoColor').length;
    const objetoSelect=document.getElementById('fCodigoColor');
    for  (i=0; i < l; i++){
        if (codProv==objetoSelect.item(i).value){
             objetoSelect.selectedIndex = i;
        }
    }    
}


// Función para sincronizar los dos elementos select
function syncProveedorSelects() {
    const selectCodigo = document.getElementById('fCodigoProveedor');
    const selectNombre = document.getElementById('fDesProveedor');
    
    // Obtener el valor seleccionado del primer select y eliminar espacios en blanco
    const selectedValue = selectCodigo.value.trim();

    // Iterar sobre las opciones del segundo select para encontrar la coincidencia
    for (let i = 0; i < selectNombre.length; i++) {
        // Comparar el valor de la opción del segundo select (también sin espacios)
        if (selectNombre.options[i].value.trim() === selectedValue) {
            selectNombre.selectedIndex = i; // Seleccionar la opción coincidente
            break; // Salir del bucle una vez encontrada la opción
        }
    }

    // Opcional: Si quieres mostrar el modal con el valor seleccionado, descomenta las siguientes líneas:
    // const modalBody = document.getElementById('modalBodyContent');
    // const customModal = document.getElementById('customModal');
    // if (selectedValue !== '-1') { // Evitar mostrar el modal para la opción por defecto
    //     modalBody.textContent = `Proveedor seleccionado: ${selectedValue}`;
    //     customModal.classList.add('show');
    // } else {
    //     hideCustomModal();
    // }
}

// Función para manejar los eventos de teclado en los elementos select para la búsqueda rápida
function handleSelectKeydown(event) {
    const selectElement = event.target;
    const keyPressed = event.key;

    // Solo procesar teclas alfanuméricas
    if (keyPressed.length === 1 && (/[a-zA-Z0-9]/.test(keyPressed))) {
        searchBuffer += keyPressed.toLowerCase(); // Añadir al buffer, sin distinción de mayúsculas/minúsculas
        
        // Limpiar el temporizador anterior y establecer uno nuevo para reiniciar el buffer
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            searchBuffer = ''; // Reiniciar el buffer después del retraso
        }, TYPE_AHEAD_DELAY);

        let foundIndex = -1;
        // Buscar la primera coincidencia en las opciones del select actual
        for (let i = 0; i < selectElement.length; i++) {
            const optionValue = selectElement.options[i].value.trim().toLowerCase();
            const optionText = selectElement.options[i].textContent.trim().toLowerCase();

            // Verificar si el valor o el texto de la opción comienza con el buffer de búsqueda actual
            if (optionValue.startsWith(searchBuffer) || optionText.startsWith(searchBuffer)) {
                foundIndex = i;
                break; // Encontrada la primera coincidencia
            }
        }

        if (foundIndex !== -1) {
            selectElement.selectedIndex = foundIndex; // Seleccionar la opción encontrada
            
            // Si el select actual es fCodigoProveedor, sincronizar fNombreProveedor
            if (selectElement.id === 'fCodigoProveedor') {
                syncProveedorSelects();
            } else if (selectElement.id === 'fNombreProveedor') {
                // Si el select actual es fNombreProveedor, sincronizar fCodigoProveedor
                // Asignamos el valor directamente ya que los valores son idénticos
                document.getElementById('fCodigoProveedor').value = selectElement.value;
            }
            // Prevenir el comportamiento predeterminado del navegador para evitar saltos nativos del select
            event.preventDefault();
        }
    } else if (keyPressed === 'Backspace') {
        // Permitir que Backspace borre parcialmente el buffer de búsqueda
        if (searchBuffer.length > 0) {
            searchBuffer = searchBuffer.slice(0, -1);
        }
        // Reiniciar el temporizador
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            searchBuffer = '';
        }, TYPE_AHEAD_DELAY);
    } else {
        // Para otras teclas (ej. flechas, Enter), reiniciar el buffer
        searchBuffer = '';
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
    }
}

// Adjuntar los listeners de eventos después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const selectCodigo = document.getElementById('fCodigoProveedor');
    const selectNombre = document.getElementById('fNombreProveedor');

    if (selectCodigo) {
        selectCodigo.addEventListener('keydown', handleSelectKeydown);
    }
    if (selectNombre) {
        selectNombre.addEventListener('keydown', handleSelectKeydown);
    }

    // Sincronización inicial al cargar la página
    syncProveedorSelects();
});