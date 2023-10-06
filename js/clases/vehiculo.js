export class Vehiculo{
    constructor(id, modelo, anoFab, velMax){
		this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
	}

    toString() {
        let cadena = "";

        if (this.id !== null && this.modelo !== null && this.anoFab !== null && this.velMax !== null) {
            cadena = `ID: ${this.id} - MODELO: ${this.modelo}
            - AÑO FAB.: ${this.anoFab} - VEL. MAX: ${this.velMax}`;
        }

        return cadena;
    }
}