alert ("Bienvenido a mi pagina web, espero que te guste");

const regexTexto = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let Usuario = {
    Datos: null,
    Edad: null
};

let contadorServicios = 0;
let modoOscuro = false;

function validarDatos(datos) {
  const {nombre, apellido, ciudad, email} = datos;

  return {
    nombre: regexTexto.test(nombre),
    apellido: regexTexto.test(apellido),
    ciudad: regexTexto.test(ciudad),
    email: regexEmail.test(email)
  };
}

function validarEdad(edad) {
    const edadNum = parseInt(edad, 10);

    if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
        return {
            valido: false,
            mensaje: "Por favor, ingrese una edad válida (entre 1 y 120 años)."
        };
    }

    const esMayorDeEdad = edadNum >= 18;
    return {
        valido: true,
        edadNum: edadNum,
        esMayorDeEdad: esMayorDeEdad,
        mensaje: esMayorDeEdad ? "Eres mayor de edad." : "Eres menor de edad."
    };
}   

document.getElementById("btnDatos").addEventListener("click", () => {
    contadorServicios++;

    const nombre = prompt("Ingrese su nombre:");
    const apellido = prompt("Ingrese su apellido:");
    const ciudad = prompt("Ingrese su ciudad:");
    const email = prompt("Ingrese su correo electrónico:");

    if (nombre === null || apellido === null || ciudad === null || email === null) {
        alert("Operación cancelada.");
        return;
    }

    const resultados = validarDatos({ nombre, apellido, ciudad, email });

    if (!resultados.nombre) {
        alert("El nombre debe contener solo letras y tener entre 2 y 50 caracteres.");
    } else if (!resultados.apellido) {
        alert("El apellido debe contener solo letras y tener entre 2 y 50 caracteres.");
    } else if (!resultados.ciudad) {
        alert("La ciudad debe contener solo letras y tener entre 2 y 50 caracteres.");
    } else if (!resultados.email) {
        alert("El correo electrónico no es válido.");
    } else {
        Usuario.Datos = {nombre, apellido, ciudad, email};
        alert("Datos validados y registrados correctamente" );
    }
});

document.getElementById("btnEdad").addEventListener("click", () => {
    contadorServicios++;

    const edadInput = prompt("Ingrese su edad:");
    if (edadInput === null) {
        alert("Operación cancelada.");
        return;
    }
    const resultado = validarEdad(edadInput);

    if (!resultado.valido) {
        alert(resultado.mensaje);
        return;
    }
    Usuario.Edad = resultado;
    alert("Edad validada correctamente: " + resultado.edadNum + " años. " + resultado.mensaje);
});

document.getElementById("btnRegistro").addEventListener("click", () => {
    contadorServicios++;

    if (!Usuario.Datos || !Usuario.Edad) {
        alert("Primero debes validar tus datos personales y tu edad antes de registrarte.");
        return;
    }
    if (!Usuario.Datos) {
        alert("Aun no has validado tus datos personales. Por favor, valida tus datos antes de registrarte.");
        return;
    }
    if (!Usuario.Edad) {
        alert("Aun no has validado tu edad. Por favor, valida tu edad antes de registrarte.");
        return;
    }   

   const {nombre, apellido, ciudad, email} = Usuario.Datos;
   const {edadNum, esMayorDeEdad} = Usuario.Edad;

    alert(
        "USUARIO REGISTRADO CORRECTAMENTE\n\n" +
        "---- DATOS DEL USUARIO ---\n" +
        "Nombre Completo: " + nombre + " " + apellido + "\n" +
        "Ciudad: " + ciudad + "\n" +
        "Correo Electrónico: " + email + "\n" +
        "Edad: " + edadNum + " años\n" +
        (esMayorDeEdad ? "Eres mayor de edad." : "Eres menor de edad.") + "\n\n" +
        "Servicios solicitados: " + contadorServicios + " veces."
    );
});

document.getElementById("btnModoOscuro").addEventListener("click", () => {
    const body = document.body;
    const btnModoOscuro = document.getElementById("btnModoOscuro");
    const icono = document.getElementById("iconoModo");
    const texto = document.getElementById("textoModo");

    modoOscuro = !modoOscuro;

    if (modoOscuro) {
        body.classList.add("bg-dark", "text-light");
        icono.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
        texto.textContent = "Modo Claro";
        btnModoOscuro.classList.replace("btn-dark", "btn-light");
    } else {
        body.classList.remove("bg-dark", "text-light");
        icono.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
        texto.textContent = "Modo Oscuro";
        btnModoOscuro.classList.replace("btn-light", "btn-dark");
    }
});