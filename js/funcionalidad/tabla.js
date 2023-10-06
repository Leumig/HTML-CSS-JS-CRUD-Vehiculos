export function crearTabla(listaDeElementos, filtro, columnasOcultas) {
    if (!Array.isArray(listaDeElementos)) return null;

    const tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla");

    let columnas = [];
        
    if (filtro !== "Todos")
        columnas = Object.keys(listaDeElementos[0]);
    else {
        columnas = ["id", "modelo", "anoFab", "velMax",
        "altMax", "autonomia", "cantPue", "cantRue"];
    }
    
    columnas = columnas.filter(columna => !columnasOcultas.includes(columna));

    tabla.appendChild(crearEncabezado(columnas));

    tabla.appendChild(crearCuerpo(listaDeElementos, columnas));

    return tabla;
}

const crearEncabezado = (columnas) => {
    const thead = document.createElement("thead");
    const trEncabezado = document.createElement("tr");

    for (const columna of columnas) {
        const th = document.createElement("th");
        th.textContent = columna;
        trEncabezado.appendChild(th);
    }

    thead.appendChild(trEncabezado);

    return thead;
};

const crearCuerpo = (listaDeElementos, columnas) => {
    if (!Array.isArray(listaDeElementos)) return null;

    const tbody = document.createElement("tbody");

    listaDeElementos.forEach((elemento, index) => {
        const tr = document.createElement("tr");

        if (index % 2 === 0) {
            tr.classList.add("filaPar"); 
        }

        for (const columna of columnas) {
            const td = document.createElement("td");
            const valor = elemento[columna] || "-";

            if (columna === "id") {
                tr.setAttribute("data-id", valor);
            }

            td.textContent = valor;
            tr.appendChild(td);
        }

    tbody.append(tr);
  });

  return tbody;
};

export const actualizarTabla = (contenedor, data, filtro, columnasOcultas) => {
    while(contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstElementChild);
    }
    if (data !== null && data.length > 0) {
      contenedor.appendChild(crearTabla(data, filtro, columnasOcultas));
    }
};