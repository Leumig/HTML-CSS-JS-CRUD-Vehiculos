function validarCadena(cadena, longitudMaxima) {
    let validacion = false;

    if (typeof cadena === "string") {
        cadena = cadena.trim();
    
        const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s'.-]+$/;
        
        validacion = cadena.length > 1 && cadena.length <= longitudMaxima && regex.test(cadena);
    }

    return validacion;
}

function validarNumero(valor, valorMinimo, valorMaximo) {
    return typeof valor === "number" && valor >= valorMinimo && valor <= valorMaximo;
}

export function validarEntidad(v1, v2, v3, v4, v5, v6, v7, tipo) {
    const errores = [];

    // v1 es Modelo
    if (!validarCadena(v1, 20)) errores.push("Modelo");

    // v2 es Año Fab.
    if (!validarNumero(v2, 1885, 3000)) errores.push("Año Fab.");

    // v3 es Vel. Max.
    if (!validarNumero(v3, 1, 9999)) errores.push("Vel. Max.");


    if(tipo === "Aereo") {
        // v4 es Alt. Max.
        if (!validarNumero(v4, 1, 9999)) errores.push("Alt. Max.");

        // v5 es Autonomia
        if (!validarNumero(v5, 1, 9999)) errores.push("Autonomia");
    } else {
        // v7 es Cant. Pue.
        if (!validarNumero(v6, 0, 12)) errores.push("Cant. Pue.");

        // v8 es Cant. Rue.
        if (!validarNumero(v7, 0, 12)) errores.push("Cant. Rue.");
    }

    if (errores.length > 0) {
        const mensajeError = `Datos inválidos en: ${errores.join(', ')}`;
        throw new Error(mensajeError);
    }

    return true;
};