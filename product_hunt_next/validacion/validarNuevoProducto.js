export default function validarNuevoProducto(valores) {
    let errores = { };

    //Nombre usuario
    if(!valores.nombre) {
        errores.nombre = "nombre";
    }

    //Validar empresa
    if(!valores.empresa) {
        errores.empresa = "empresa";
    }

    //validar imagen
    if(!valores.imagen) {
        errores.password = "imagen";
    }

    //validar imagen
    if(!valores.url) {
        errores.url = "url";
    }

    //validar descripcion
    if(!valores.descripcion) {
        errores.descripcion = "descripcion";
    }

    return errores;
}