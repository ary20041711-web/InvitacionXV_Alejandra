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
    document.getElementById("minutos").innerHTML = minutes = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerHTML = segundos < 10 ? "0" + segundos : segundos;
    
    // Texto alternativo cuando el contador llegue a cero
    if (distancia < 0) {
        clearInterval(x);
        document.getElementById("cuenta-regresiva").innerHTML = "<h3>¡Llegó el gran día!</h3>";
    }
}, 1000);
document.getElementById('form-playlist').addEventListener('submit', function(event) {
    // 1. Evitamos que la página se recargue por completo
    event.preventDefault();

    const formulario = this;
    const inputCancion = document.getElementById('input-cancion');
    const tituloCancion = inputCancion.value;

    if (tituloCancion.trim() === '') return;

    // 2. Enviamos los datos a Formspree de forma silenciosa (en segundo plano)
    fetch(formulario.action, {
        method: formulario.method,
        body: new FormData(formulario),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Si el envío fue exitoso, creamos la burbuja en la pantalla
            crearBurbuja(tituloCancion);
            formulario.reset(); // Limpia los campos del formulario para otra sugerencia
        } else {
            alert('Hubo un pequeño problema al enviar. Inténtalo de nuevo.');
        }
    }).catch(error => {
        // Fallback por si no hay internet: crea la burbuja comoquiera para que el usuario lo vea
        crearBurbuja(tituloCancion);
        formulario.reset();
    });
});

// Función mágica que genera la burbuja en una posición aleatoria
function crearBurbuja(texto) {
    const contenedor = document.getElementById('contenedor-burbujas-musica');
    const burbuja = document.createElement('div');
    
    burbuja.classList.add('burbuja-cancion');
    burbuja.innerText = "🎵 " + texto;

    // Calculamos una posición horizontal al azar para que no salgan todas pegadas
    const anchoContenedor = contenedor.offsetWidth;
    // Dejamos un margen para que no se corten en las orillas
    const posicionX = Math.random() * (anchoContenedor - 130); 
    burbuja.style.left = `${posicionX}px`;

    // Metemos la burbuja al contenedor
    contenedor.appendChild(burbuja);

    // Borramos la burbuja del código después de 6 segundos (cuando termina su animación)
    setTimeout(() => {
        burbuja.remove();
    }, 6000);
}
// 1. LA LISTA DE CANCIONES: Aquí puedes agregar, quitar o cambiar las canciones que quieras que aparezcan
const cancionesSugeridas = [
    "Mantra - jennie",
    "Cruel Summer - Taylor Swift",
    "Blinding Lights - The Weeknd",
    "Dynamite - BTS",
    "Night Changes - One Direction"
];

// 2. Seleccionamos el contenedor que tienes en tu HTML
const contenedor = document.getElementById("contenedor-burbujas-musica");

// 3. Función mágica para crear una burbuja flotante
function crearBurbuja(textoCancion) {
    // Si por alguna razón el contenedor no existe en la página, no hacemos nada
    if (!contenedor) return;

    // Creamos el elemento div de la burbuja
    const burbuja = document.createElement("div");
    burbuja.classList.add("burbuja-cancion");
    burbuja.innerText = textoCancion;

    // Posición horizontal aleatoria (para que no salgan todas en el mismo lugar)
    const posicionX = Math.random() * 75; // Deja un margen del 20% a la derecha
    burbuja.style.left = `${posicionX}%`;

    // Retraso aleatorio al nacer (para que no salgan todas al mismo tiempo al cargar la página)
    const retraso = Math.random() * 5; 
    burbuja.style.animationDelay = `${retraso}s`;

    // Agregamos la burbuja al contenedor de tu HTML
    contenedor.appendChild(burbuja);
}

// 4. INICIAR EL EFECTO: Creamos una burbuja por cada canción de nuestra lista
function iniciarBurbujas() {
    cancionesSugeridas.forEach(canción => {
        crearBurbuja(canción);
    });
}

// Ejecutamos la función en cuanto la página termine de cargar
document.addEventListener("DOMContentLoaded", iniciarBurbujas);