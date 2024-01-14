# CRUD Vehículos
## Página Web - HTML, CSS y JavaScript

Este repositorio contiene un proyecto que corresponde al Primer Parcial de la materia Laboratorio I, perteneciente a la carrera Tecnicatura Universitaria en Programación.
Utilizo HTML, CSS y JavaScript. Todo hecho en el IDE Visual Studio Code.

### Detalles de la aplicación
La página web tiene dos formularios, uno para filtrar/mostrar los datos, y otro para hacer el alta, baja o modificación. Los datos son simplemente una lista de vehículos la cual pueden ser aéreos o terrestres. En este proyecto no hay persistencia de datos, al reiniciar la página se carga una lista de vehículos predeterminada.

### Funcionamiento
Al entrar a la página podemos ver un formulario para filtrar los datos que se ven en la tabla desplegada abajo. La tabla contiene todos los datos de los vehículos que formen parte del sistema. Se permite filtrar entre todos los tipos de vehículos, solo los terrestres, o solo los aéreos. También hay checkbox's para elegir qué columnas de la tabla mostrar y cuáles no. También te da la opción de ver un promedio de la velocidad máxima el cual se calcula con los vehículos que se estén mostrando en la tabla al momento de pulsar en 'Calcular'. Por último, aparece el botón 'AGREGAR'.

Al hacer clic en 'AGREGAR', se cambia al formulario del Alta. Obviamente sirve para agregar vehículos a la lista, con el tipo y los datos que el usuario quiera.

Para realizar la modificación o eliminación de un vehículo, solo basta con hacer doble clic en la fila del vehículo que se quiera afectar. Al hacerlo, automáticamente se va a desplegar el otro formulario mostrando los datos del vehículo solicitado. Aparecerá la opción de Modificar para confirmar los cambios, o el de Eliminar para hacer la baja.

> [!NOTE]
> Universidad Tecnológica Nacional, 2023.
