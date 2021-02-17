export default function validarNuevoProducto(valores) {
    let errores = { };

    //Nombre usuario
    if(!valores.nombre) {
        errores.nombre = "El nombre del producto es obligatorio.";
    }

    //Validar empresa
    if(!valores.empresa) {
        errores.empresa = "El nombre de la Empresa es obligatorio.";
    }


    //validar imagen
    if(!valores.url) {
        errores.url = "La URL es obligatoria.";
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "Formato de URL No válido.";
    }

    //validar descripcion
    if(!valores.descripcion) {
        errores.descripcion = "Agrega una descripción a tu producto..";
    }

    return errores;
}