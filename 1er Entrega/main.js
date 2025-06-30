const Alumnos = []
let bandera = true

function agregarAlumnos(nombre, apellido, edad, matricula, genero) {
	let objetoAuxiliar = {
		nombre,
		apellido,
		edad,
		matricula,
		genero,
		parciales: {
            parcial1:"No cargado",
            parcial2:"No cargado",
            parcial3:"No cargado",
        }
	}
	Alumnos.push(objetoAuxiliar)
}

const verAlumnos = () => {
	let mensaje =
		'Los alumnos son: \n  Matricula  |  Nombre    |  Apellido    |  Edad  |  Genero\n '

	if (Alumnos.length == 0) {
		alert('Aun no se ingreso un alumno')
		return
	}

	for (let i = 0; i < Alumnos.length; i++) {
		mensaje += `  ${Alumnos[i].matricula}      |  ${Alumnos[i].nombre}      |  ${Alumnos[i].apellido}     |  ${Alumnos[i].edad}   |  ${Alumnos[i].genero}\n`
	}

	alert(mensaje)
}



function buscadorPorMatricula(matricula) {
	let mensaje =
		'El alumno que usted busca es:\n  Matricula  |  Nombre    |  Apellido    |  Edad  |  Genero \n'
    if (Alumnos.length == 0) {
		alert('No hay registro de alumnos')
		return -1
	}

	for (let i = 0; i < Alumnos.length; i++) {
        console.log(Alumnos[i].matricula)
        while(Alumnos[i].matricula == matricula){
            
            alert(
		    mensaje+=`  ${Alumnos[i].matricula}     |  ${Alumnos[i].nombre}      |  ${Alumnos[i].apellido}     |  ${Alumnos[i].edad}   |  ${Alumnos[i].genero}`
	        )
            return i
        }
            
    }
    alert("No existe alumno con esa matricula");
    return -1
}

const selectorParcial = (numAlumno) =>{
    let nota
    let seleccion= Number(prompt("Que nota de parcial desea agregar?\n 1-Parcial 1\n 2-Parcial 2\n 3-Parcial 3"))
    switch (seleccion) {
        case 1:
            nota = Number(prompt("Ingresar nota del parcial 1\n (Usar '.' en vez de ',' para las notas con decimales)"))
			if(isNaN(nota)){
				alert("Numero no valido")
				break;
			}
			Alumnos[numAlumno].parciales.parcial1.toFixed(2)= nota
            break;
        case 2:
            nota = Number(prompt("Ingresar nota del parcial 2\n (Usar '.' en vez de ',' para las notas con decimales)"))
			if(isNaN(nota)){
				alert("Numero no valido")
				break;
			}   
            Alumnos[numAlumno].parciales.parcial2toFixed(2)= nota
            break;
        case 3:
            nota = Number(prompt("Ingresar nota del parcial 3\n (Usar '.' en vez de ',' para las notas con decimales)"))
			if(isNaN(nota)){
				alert("Numero no valido")
				break;
			}  
            Alumnos[numAlumno].parciales.parcial3toFixed(2)= nota
            break;
        case 0:
            alert("Numero no valido")
            break;
        default:
            alert("Numero no valido")
            break;
    }

}


function mostrarParciales(matriculaAux){  
    let mensaje =
		'El alumno que usted busca es:\n  Matricula  |  Nombre    |  Apellido    |  Edad  |  Genero\n '
    if (Alumnos.length == 0) {
		alert('No hay registro de alumnos')
		return -1
	}

	for (let i = 0; i < Alumnos.length; i++) {
        console.log(Alumnos[i].matricula)
        while(Alumnos[i].matricula == matriculaAux){
            
            alert(
        mensaje +=`  ${Alumnos[i].matricula}       |  ${Alumnos[i].nombre}       |  ${Alumnos[i].apellido}        |  ${Alumnos[i].edad}     |   ${Alumnos[i].genero}\n Parcial 1 = ${Alumnos[i].parciales.parcial1}\n Parcial 2 = ${Alumnos[i].parciales.parcial2}\n Parcial 3 = ${Alumnos[i].parciales.parcial3}`
        )
        return
        }
            
    }
    alert("No existe alumno con esa matricula");
    return -1
    }


while (bandera) {
	let opcion = Number(
		prompt(
			'Bienvendio Profe, que desea hacer?: \n 1- Cargar un alumno \n 2- Ver alumnos cargados \n 3- Buscar un alumno por su matricula \n 4- Agregar una nota a un alumno\n 5- Ver notas de los parciales \n 0- Salir'
		)
	)

	switch (opcion) {
		case 0:
			bandera = false
			break
		case 1:
			let salida = true;
			let nombreRegistro
			do {
				nombreRegistro = prompt('Datos del alumno\n Nombre:')
				if (nombreRegistro === null || nombreRegistro == "" || nombreRegistro == " ") {
					alert("Nombre ingresado no valido")
				}else{
					salida = false;
				}
			} while (salida);
			salida=true;
			let apellidoRegistro
			do {
				apellidoRegistro = prompt('Datos del alumno\n Apellido:')
				if (apellidoRegistro === null || apellidoRegistro == "" || apellidoRegistro == " ") {
					alert("Apellido ingresado no valido")
				}else{
					salida = false;
				}
			} while (salida);
			salida=true;
			let edadRegistro
			do {
				edadRegistro = Number(prompt('Datos del alumno\nEdad:'))
				if (isNaN(edadRegistro) || edadRegistro == "" || edadRegistro == " ") {
					alert("Edad ingresada no valida")
				}else{
					salida = false;
				}
			} while (salida);
			salida=true;
			let matriculaRegistro;
			do {
				matriculaRegistro = Number(prompt('Datos del alumno\n Matricula (Solo caracteres numericos):'))
				if (isNaN(matriculaRegistro) || matriculaRegistro == "" || matriculaRegistro == " ") {
					alert("Matricula ingresada no valida")
				}else{
					salida = false;
				}
			} while (salida);
			salida=true;
			let generoRegistro
			do {
				generoRegistro = prompt('Datos del alumno\n Genero:')
				if (generoRegistro === null  || generoRegistro == "" || generoRegistro == " ") {
					alert("Genero ingresado no valido")
				}else{
					salida = false;
				}
			} while (salida);

			agregarAlumnos(
				nombreRegistro,
				apellidoRegistro,
				edadRegistro,
				matriculaRegistro,
				generoRegistro
			)
			break
		case 2:
			verAlumnos()
			break
		case 3:
			let matriculaAuxBuscar = Number(
				prompt('¿Cual es la matricula del alumno?')
			)
			buscadorPorMatricula(matriculaAuxBuscar)
			break
		case 4:
            let respuesta
			let numAlumno
            do {
                let matriculaAuxParcial = Number(
				prompt('¿Cual es la matricula del alumno?')
			    )
                numAlumno = buscadorPorMatricula(matriculaAuxParcial)
                if(numAlumno == -1){
                    break
                }
                respuesta = Number(prompt("Es el alumno que busca?\n 1-Si\n 0-No"))
                if(respuesta == 1){
                    selectorParcial(numAlumno)
                    respuesta = 0
                }else{
                    respuesta = Number(prompt("Desea ingresar otro?\n 1-Si\n 0-No "))
                    if(respuesta == 0){
                        break
                    }
                }
                
            } while (respuesta == 1);
            
			break
        case 5:
            let matriculaAux = Number(
            prompt('¿Cual es la matricula del alumno?')
            )
            mostrarParciales(matriculaAux)
            break
		default:
			alert('No existe esa opcion')
			break
	}
}