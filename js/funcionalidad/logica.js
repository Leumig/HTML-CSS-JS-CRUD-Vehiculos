import { vehiculos as vehiculosImportados } from "./vehiculos.js";
import { Vehiculo } from "../clases/vehiculo.js"
import { Aereo } from "../clases/aereo.js"
import { Terrestre } from "../clases/terrestre.js"
import { actualizarTabla } from "./tabla.js";
import { validarEntidad } from "./validaciones.js";

const vehiculos = vehiculosImportados || [];

const $divTablaContenedor = document.getElementById("tabla-contenedor");
const $selectFiltro = document.getElementById("filtro");

let aereos = vehiculos.map(v => "altMax" in v ? new Aereo(v["id"], v["modelo"], v["anoFab"],
    v["velMax"], v["altMax"], v["autonomia"]): null).filter(a => a !== null);

let terrestres = vehiculos.map(v => "cantPue" in v ? new Terrestre(v["id"], v["modelo"], v["anoFab"],
    v["velMax"], v["cantPue"], v["cantRue"]): null).filter(t => t !== null);

/////   ESTABLECER FILTRO (SELECT)   /////////////////////////////////////////////////////////////////
$selectFiltro.addEventListener("change", () => {
    const filtro = $selectFiltro.value;

    console.log(`Seleccionaste: ${filtro}`);

    actualizarTablaFiltrada($divTablaContenedor, filtro, getColumnasOcultas());
});

/////   OCULTAR COLUMNAS (CHECKBOX)   ////////////////////////////////////////////////////////////////
const $listaDeCheckboxs = document.querySelectorAll(".chkColumna");
const $contenedorCheckbox = document.getElementById("contenedor-checkbox");

$contenedorCheckbox.addEventListener("change", () => {    
    actualizarTablaFiltrada($divTablaContenedor, $selectFiltro.value, getColumnasOcultas());
});

function getColumnasOcultas() {
    let columnasOcultas = [];
    
    Array.from($listaDeCheckboxs).forEach(checkbox => {
        if (!checkbox.checked) {
            let columna = checkbox.getAttribute("name");

            if (!columnasOcultas.includes(columna))
                columnasOcultas.push(columna);
       }
    });

    console.log(columnasOcultas);
    return columnasOcultas;
}

/////   ACTUALIZAR TABLA  ////////////////////////////////////////////////////////////////////////////
function actualizarTablaFiltrada(contenedor, filtro, columnasOcultas,) {
    if (filtro === "Todos") actualizarTabla(contenedor, vehiculos, filtro, columnasOcultas);
    if (filtro === "Aereo") actualizarTabla(contenedor, aereos, filtro, columnasOcultas);
    if (filtro === "Terrestre") actualizarTabla(contenedor, terrestres, filtro, columnasOcultas);
}

if (vehiculos.length > 0)
    actualizarTablaFiltrada($divTablaContenedor, $selectFiltro.value, getColumnasOcultas());

/////   CALCULAR PROMEDIO   //////////////////////////////////////////////////////////////////////////
const $botonCalcular = document.getElementById("calcular");
const $promedio = document.getElementById("promedio");

$botonCalcular.addEventListener("click", () => {
    if (personas.length > 0) {
        let promedioValor = calcularEdadPromedio();
        $promedio.value = promedioValor.toFixed(2);
    }
});

/////   SWITCHEAR FORMULARIOS   //////////////////////////////////////////////////////////////////////


/////   SWITCHEAR INPUTS EN ABM   ////////////////////////////////////////////////////////////////////


/////   ABM DOBLE CLICK (MODIFICAR)   ////////////////////////////////////////////////////////////////


/////   BOTÓN SUBMIT (ALTA O MODIFICACIÓN)   ////////////////////////////////////////////////////////////
/////   VALIDACIÓN (TRY-CATCH)   /////////////////////////////////////////////////////////////////////


/////   ABM BOTÓN ELIMINAR   ///////////////////////////////////////////////////////////////////////


/////   ORDENAR COLUMNAS   ///////////////////////////////////////////////////////////////////////
