/* ==========================================
   1. CONTADOR REGRESIVO
   ========================================== */
// Fijamos la fecha exacta para el 12 de Julio de 2026
// Nota: El mes 6 corresponde a Julio en JavaScript ya que Enero es 0.
const fechaEvento = new Date(2026, 6, 12, 18, 0, 0).getTime(); 

const x = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;
    
    // Desglosar el tiempo restante
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    
    // Renderizar los números con formato '00' si son menores a 10
    document.getElementById("dias").innerHTML = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerHTML = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerHTML = minutos < 10 ? "0" + minutos : minutos; // <-- CORREGIDO
    document.getElementById("segundos").innerHTML = segundos < 10 ? "0" + segundos : segundos;
    
    // Texto alternativo cuando el contador llegue a cero
    if (distancia < 0) {
        clearInterval(x);
        document.getElementById("cuenta-regresiva").innerHTML = "<h3>¡Llegó el gran día!</h3>";
    }
}, 1000);


/* ==========================================
   2. SISTEMA DE BURBUJAS DE MÚSICA
   ========================================== */
const cancionesSugeridas = [
    "Mantra - jennie",
    "Cruel Summer - Taylor Swift",
    "Blinding Lights - The Weeknd",
    "Dynamite - BTS",
    "Night Changes - One Direction"
];

const contenedor = document.getElementById("contenedor-burbujas-musica");

// Función unificada para crear burbujas flotantes (sirve para el inicio y para nuevas sugerencias)
function crearBurbuja(textoCancion, esNueva = false) {
    if (!contenedor) return;

    const burbuja = document.createElement("div");
    burbuja.classList.add("burbuja-cancion");
    burbuja.innerText = esNueva ? "🎵 " + textoCancion : textoCancion;

    // Posición horizontal aleatoria
    const posicionX = Math.random() * 75; 
    burbuja.style.left = `${posicionX}%`;

    if (esNueva) {
        // Si el invitado la acaba de sugerir, aparece de inmediato y se borra en 6 segundos
        burbuja.style.animationDelay = "0s";
        contenedor.appendChild(burbuja);
        setTimeout(() => { burbuja.remove(); }, 6000);
    } else {
        // Las canciones iniciales llevan retraso aleatorio para la animación CSS continua
        const retraso = Math.random() * 5; 
        burbuja.style.animationDelay = `${retraso}s`;
        contenedor.appendChild(burbuja);
    }
}

// Iniciar cargando las canciones por defecto
function iniciarBurbujas() {
    cancionesSugeridas.forEach(cancion => {
        crearBurbuja(cancion, false);
    });
}

document.addEventListener("DOMContentLoaded", iniciarBurbujas);


/* ==========================================
   3. ENVÍO DE FORMULARIOS SILENCIOSOS (AJAX)
   ========================================== */
function enviarFormularioSilencioso(idFormulario, mensajeExito, esPlaylist = false) {
    const formulario = document.getElementById(idFormulario);
    if (!formulario) return;

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Detiene el salto de página

        // Si es el formulario de música, atrapamos el texto antes de limpiar para hacer la burbuja viva
        let tituloCancion = "";
        if (esPlaylist) {
            const inputCancion = document.getElementById('input-cancion');
            tituloCancion = inputCancion ? inputCancion.value : "";
            if (tituloCancion.trim() === '') return;
        }

        const datos = new FormData(formulario);

        fetch(formulario.action, {
            method: formulario.method,
            body: datos,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert(mensajeExito); 
                
                // Si todo sale bien y es una canción, lanzamos su burbuja en tiempo real
                if (esPlaylist && tituloCancion) {
                    crearBurbuja(tituloCancion, true);
                }
                
                formulario.reset();   
            } else {
                alert("Hubo un problemita al enviar. Intenta de nuevo.");
            }
        })
        .catch(error => {
            // Fallback por si falla la conexión en el envío de música
            if (esPlaylist && tituloCancion) {
                crearBurbuja(tituloCancion, true);
                formulario.reset();
            } else {
                alert("Error de conexión. Intenta de nuevo.");
            }
        });
    });
}

// Activamos el truco para tus 3 formularios de manera limpia
enviarFormularioSilencioso("form-asistencia-si", "¡Genial! Tu asistencia ha sido confirmada.");
enviarFormularioSilencioso("form-asistencia-talvez", "¡Entendido! Anotamos que tal vez vienes.");
enviarFormularioSilencioso("form-playlist", "Gracias por tu sugerencia. <3", true);