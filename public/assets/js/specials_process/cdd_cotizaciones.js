// este funcion fue desarrollada para buscar dentro de los comentarios de un renglon de cotizacion
// toma dos parametros 
// un comentario el cual contiene variables separadas por ;  y lo convierte en un arreglo
// una cadena que busqueda
// devuelve un json con dos valores {"result":0-1,"valor":"cualquiervalor"}
// result indica si se encontro (1) o no (0)la variable
// clave indica el valor buscado o "" en caso de no eonctrado
function cdd (arregloComentario,clave){
    try {
        console.log ("entrando a CDD");
        paso=1;
        salida=[];
        paso=2;
        arrayDatos=arregloComentario.split(";");
        paso=3;
        //console.log (arrayDatos);
        paso=4;
        // validamos que existan datos en el arreglo
        if (arrayDatos.length > 0){
            paso=5;
            const lineaEncontrada = arrayDatos.find(linea => linea.includes(clave + '='));

            // 2. Si no se encontró la línea, retornar null o un valor predeterminado
            paso=6;
            if (typeof(lineaEncontrada)=="undefined") {
                paso=7;
                elemento={
                    "result":0,
                    "valor":""
                }
            } else {
                // 3. Dividir la línea en el símbolo '='
                // y tomar el segundo elemento del arreglo resultante
                paso=8;
                const partes = lineaEncontrada.split('=');
                paso=9;
                const valor = partes[1];
                
                // Opcional: Si el valor puede ser un número, convertirlo
                // const valorNumerico = parseFloat(valor);
                paso=10;
                elemento={
                    "result":1,
                    "valor":valor
                }
            }
        } else {
            paso=11;
            elemento={
                "result":1,
                "valor":""
            }
        }
        paso=12;
        salida.push(elemento);
        return (JSON.stringify(salida));
    } catch (error) {
        // Código que se ejecuta si hay un error en el bloque try
        console.error("¡Ha ocurrido un error calculo cambiaTipoCotizacion");
        console.error("Mensaje de error:", error.message,"paso:",paso);
        console.error("Tipo de error:", error.name);
    }     

}
