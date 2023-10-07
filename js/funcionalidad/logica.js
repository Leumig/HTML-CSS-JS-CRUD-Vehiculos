import { vehiculos as vehiculosImportados } from "./vehiculos.js";
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
    if (vehiculos.length > 0) {
        let promedioValor = calcularVelMaxPromedio();
        $promedio.value = promedioValor.toFixed(2);
    }
});

function calcularVelMaxPromedio() {
    let velocidades = [];
    let cantidad = vehiculos.length;
    
    if ($selectFiltro.value === "Todos") velocidades = vehiculos.map(p => p["velMax"]);
    
    if ($selectFiltro.value === "Aereo") {
        velocidades = aereos.map(a => a["velMax"]);
        cantidad = aereos.length;
    } 
    
    if ($selectFiltro.value === "Terrestre") {
        velocidades = terrestres.map(t => t["velMax"]);
        cantidad = terrestres.length;
    }

    let total = velocidades.reduce((acumulador, velocidad) => acumulador + velocidad, 0);
    
    return total / cantidad;
}
/////   SWITCHEAR FORMULARIOS   //////////////////////////////////////////////////////////////////////
const $seccionDatos = document.getElementById("seccion-datos");
const $seccionABM = document.getElementById("seccion-ABM");

$seccionDatos.style.setProperty("display", "flex");
$seccionABM.style.setProperty("display", "none");

const $formABM = document.getElementById("form-ABM");
const $botonABM = document.getElementById("botonABM");
const $botonCancelar = document.getElementById("botonCancelar");

const $selectTipo = document.getElementById("tipo");
$selectTipo.setAttribute("disabled", "false");

const $inputId = document.getElementById("id");
const $labelId = document.getElementById("idLabel");

const $inputBaja = document.getElementById("inputBaja");
const $inputSubmit = document.getElementById("inputSubmit");

$botonABM.addEventListener("click", () => {
    intercambiarFormularios();

    $formABM.reset();
    intercambiarInputs();

    $inputSubmit.value = "Agregar";
    $inputBaja.setAttribute("type", "hidden");

    $inputId.style.setProperty("display", "none");
    $labelId.style.setProperty("display", "none");

    $selectTipo.removeAttribute("disabled");
});

$botonCancelar.addEventListener("click", () => {
    intercambiarFormularios();
});

function intercambiarFormularios() {
    if ($seccionABM.style.getPropertyValue("display") === "none") {
        $seccionABM.style.setProperty("display", "flex");
        $seccionDatos.style.setProperty("display", "none");
    } else {
        $seccionABM.style.setProperty("display", "none");
        $seccionDatos.style.setProperty("display", "flex");
    }
}

/////   SWITCHEAR INPUTS EN ABM   ////////////////////////////////////////////////////////////////////
const $inputsAereo = document.getElementById("inputAereo");
const $inputsTerrestre = document.getElementById("inputTerrestre");

$selectTipo.addEventListener("change", () => {
    intercambiarInputs();
});

function intercambiarInputs() {
    if ($selectTipo.value === "Aereo") {
        $inputsTerrestre.style.setProperty("display", "none");
        $inputsAereo.style.setProperty("display", "block");

        document.querySelectorAll("#inputAereo input").forEach((input) => {
            input.setAttribute("required", "true");
        });
        document.querySelectorAll("#inputTerrestre input").forEach((input) => {
            input.removeAttribute("required");
        });
    } else {
        $inputsAereo.style.setProperty("display", "none");
        $inputsTerrestre.style.setProperty("display", "block");

        document.querySelectorAll("#inputTerrestre input").forEach((input) => {
            input.setAttribute("required", "true");
        });
        document.querySelectorAll("#inputAereo input").forEach((input) => {
            input.removeAttribute("required");
        });
    }
}

/////   ABM DOBLE CLICK (MODIFICAR)   ////////////////////////////////////////////////////////////////
const { txtId, txtModelo, numAnoFab, numVelMax,
    numAltMax, numAutonomia, numCantPue, numCantRue} = $formABM;

window.addEventListener("dblclick", (e) => {
    if (e.target.matches("td")) {
       const id = e.target.parentElement.getAttribute("data-id");

       const vehiculoSeleccionado = vehiculos.find((v) => v.id == id);

       cargarFormABM(vehiculoSeleccionado);
       intercambiarFormularios();

       $inputBaja.setAttribute("type", "button");
       $inputSubmit.value = "Modificar";
   }
});

function cargarFormABM(vehiculo) {   
   txtId.value = vehiculo.id;
   txtModelo.value = vehiculo.modelo;
   numAnoFab.value = vehiculo.anoFab;
   numVelMax.value = vehiculo.velMax;

   $selectTipo.setAttribute("disabled", "true");

   $labelId.style.setProperty("display", "block");
   $inputId.style.setProperty("display", "block");

   if ("altMax" in vehiculo) {
       numAltMax.value = vehiculo.altMax;
       numAutonomia.value = vehiculo.autonomia;
       $selectTipo.value = "Aereo";

       $inputsTerrestre.style.setProperty("display", "none");
       $inputsAereo.style.setProperty("display", "block");
   } else {
       numCantPue.value = vehiculo.cantPue;
       numCantRue.value = vehiculo.cantRue;
       $selectTipo.value = "Terrestre";

       $inputsAereo.style.setProperty("display", "none");
       $inputsTerrestre.style.setProperty("display", "block");
   }
}

/////   BOTÓN SUBMIT (ALTA O MODIFICACIÓN)   ////////////////////////////////////////////////////////////
$formABM.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
        validarEntidad(txtModelo.value, parseInt(numAnoFab.value), parseInt(numVelMax.value),
            parseInt(numAltMax.value), parseInt(numAutonomia.value),
            parseInt(numCantPue.value), parseInt(numCantRue.value), $selectTipo.value)

        if (txtId.value === "") {
    
            if ($selectTipo.value === "Aereo") {
                const aereoNuevo = new Aereo(
                    Date.now(),
                    txtModelo.value,
                    parseInt(numAnoFab.value),
                    parseInt(numVelMax.value),
                    parseInt(numAltMax.value),
                    parseInt(numAutonomia.value)
                )
    
                aereos.push(aereoNuevo);
                vehiculos.push(aereoNuevo);
            } else {
                const terrestreNuevo = new Terrestre(
                    Date.now(),
                    txtModelo.value,
                    parseInt(numAnoFab.value),
                    parseInt(numVelMax.value),
                    parseInt(numCantPue.value),
                    parseInt(numCantRue.value)
                )
    
                terrestres.push(terrestreNuevo);
                vehiculos.push(terrestreNuevo);
            }

            actualizarTablaFiltrada($divTablaContenedor, $selectFiltro.value, getColumnasOcultas());
        } else {
            if ($selectTipo.value === "Aereo") {
                const aereoNuevo = new Aereo(
                    txtId.value,
                    txtModelo.value,
                    parseInt(numAnoFab.value),
                    parseInt(numVelMax.value),
                    parseInt(numAltMax.value),
                    parseInt(numAutonomia.value)
                )

                let index = vehiculos.findIndex((v) => v.id == aereoNuevo.id);
                vehiculos.splice(index, 1, aereoNuevo);
    
                index = aereos.findIndex((a) => a.id == aereoNuevo.id);
                aereos.splice(index, 1, aereoNuevo);
            } else {
                const terrestreNuevo = new Terrestre(
                    txtId.value,
                    txtModelo.value,
                    parseInt(numAnoFab.value),
                    parseInt(numVelMax.value),
                    parseInt(numCantPue.value),
                    parseInt(numCantRue.value)
                )
    
                let index = vehiculos.findIndex((v) => v.id == terrestreNuevo.id);
                vehiculos.splice(index, 1, terrestreNuevo);
    
                index = terrestres.findIndex((t) => t.id == terrestreNuevo.id);
                terrestres.splice(index, 1, terrestreNuevo);
            }

            actualizarTablaFiltrada($divTablaContenedor, $selectFiltro.value, getColumnasOcultas());
        }
        intercambiarFormularios();
    } catch (error) {
        alert(error.message);
    }
});


/////   ABM BOTÓN ELIMINAR   ///////////////////////////////////////////////////////////////////////
$inputBaja.addEventListener("click", () => {
    if (window.confirm("¿Seguro de eliminar este vehículo?")) {
        let id = txtId.value;
        let index = vehiculos.findIndex((v) => v.id == id);
        vehiculos.splice(index, 1);

        if ($selectTipo.value === "Aereo") {
            index = aereos.findIndex((a) => a.id == id);
            aereos.splice(index, 1);
        } else {
            index = terrestres.findIndex((t) => t.id == id);
            terrestres.splice(index, 1);
        }

        actualizarTablaFiltrada($divTablaContenedor, $selectFiltro.value, getColumnasOcultas());
        intercambiarFormularios();
    }
});

/////   ORDENAR COLUMNAS   ///////////////////////////////////////////////////////////////////////
let contenedorTabla = document.getElementById("tabla-contenedor");

contenedorTabla.addEventListener("click", e => {
    if (e.target.matches("th")) {
        let columna = e.target.textContent;

        document.querySelectorAll("th.columnaOrdenada").forEach(e => e.classList.remove("columnaOrdenada"));

        ordenarDatos("id");
        ordenarDatos(columna);
        actualizarTablaFiltrada($divTablaContenedor, $selectFiltro.value, getColumnasOcultas(), e.target);
    }
});

function ordenarDatos(columna) {
    switch (columna) {
        case "id":
        case "anoFab":
        case "velMax":
        case "altMax":
        case "autonomia":
        case "cantPue":
        case "cantRue":
            vehiculos.sort((a, b) => {
                return a[columna] - b[columna];
            });
            aereos.sort((a, b) => {
                return a[columna] - b[columna];
            });
            terrestres.sort((a, b) => {
                return a[columna] - b[columna];
            });
            break;
        case "modelo":
            vehiculos.sort((a, b) => {
                if (a[columna] && b[columna])
                    return a[columna].localeCompare(b[columna]);
            });
            break;
        default:
            break;
    }

    aereos.splice(0, aereos.length);
    terrestres.splice(0, terrestres.length);

    aereos = vehiculos.map(v => "altMax" in v ? new Aereo(v["id"], v["modelo"], v["anoFab"],
        v["velMax"], v["altMax"], v["autonomia"]): null).filter(a => a !== null);

    terrestres = vehiculos.map(v => "cantPue" in v ? new Terrestre(v["id"], v["modelo"], v["anoFab"],
        v["velMax"], v["cantPue"], v["cantRue"]): null).filter(t => t !== null);
};