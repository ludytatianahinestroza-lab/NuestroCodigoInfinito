// ================= CAMBIO DE PANTALLA =================
function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(p => {
        p.classList.remove("activa");
    });
    document.getElementById(id).classList.add("activa");
}

// ================= PANTALLA INICIAL =================
document.getElementById("btnStart").addEventListener("click", () => {
    mostrarPantalla("nivel1");

    // 🔊 Música de fondo suave
    const musica = document.getElementById("musicaFondo");
    musica.volume = 0.2; // volumen bajito
    musica.play();
});

// ================= NIVEL 1 =================
const balon = document.getElementById("balon");
const curryContainer = document.getElementById("curryContainer");
const rebote = new Audio("assets/bounce.mp3");

balon.addEventListener("click", () => {
    rebote.play();
    curryContainer.classList.remove("oculto");
});

document.getElementById("btnNivel2").addEventListener("click", () => {
    mostrarPantalla("nivel2");
});

// ================= NIVEL 2 - PLAYLIST =================
let cancionesDesbloqueadas = 0;

document.querySelectorAll(".cancion").forEach(cancion => {
    cancion.addEventListener("click", () => {

        const link = cancion.dataset.link;
        window.open(link, "_blank");

        if (!cancion.classList.contains("usada")) {
            cancion.classList.add("usada");
            cancion.style.opacity = "0.5";
            cancionesDesbloqueadas++;
        }

        if (cancionesDesbloqueadas === 4) {
            document.getElementById("btnNivel3").classList.remove("oculto");
        }
    });
});

document.getElementById("btnNivel3").addEventListener("click", () => {
    mostrarPantalla("nivel3");
});

// ================= NIVEL 3 - ENCUENTRO =================
const tatiana = document.getElementById("tatianaMove");
const julian = document.getElementById("julianFinal");
const mensajeEncuentro = document.getElementById("mensajeEncuentro");
const btnNivel4 = document.getElementById("btnNivel4");

let posicion = 50;
let encuentroActivado = false;

document.addEventListener("keydown", function(e) {
    if (!document.getElementById("nivel3").classList.contains("activa")) return;

    if (e.key === "ArrowRight" && !encuentroActivado) {
        posicion += 20;
        tatiana.style.left = posicion + "px";

        let limite = julian.offsetLeft - 80;

        if (posicion >= limite) {
            encuentroActivado = true;

            // Mostrar mensaje
            mensajeEncuentro.classList.remove("oculto");

            // Mostrar botón Nivel 4
            btnNivel4.classList.remove("oculto");

            // Animación salto
            tatiana.classList.add("salto");
            setTimeout(() => {
                tatiana.classList.remove("salto");
            }, 500);

            // Explosión corazones
            for (let i = 0; i < 12; i++) {
                let corazon = document.createElement("div");
                corazon.textContent = "💗";
                corazon.classList.add("explosion-corazon");

                corazon.style.left = (julian.offsetLeft + 40) + "px";
                corazon.style.top = (julian.offsetTop) + "px";

                document.getElementById("nivel3").appendChild(corazon);

                setTimeout(() => {
                    corazon.remove();
                }, 1500);
            }
        }
    }
});

btnNivel4.addEventListener("click", () => {
    mostrarPantalla("nivel4");
    iniciarMemoria();
});

// ================= NIVEL 4 - MEMORIA =================
const valores = [
    "Te amo","Te amo",
    "mucho","mucho",
    "con demasiado","con demasiado",
    "❤️","❤️"
];

let cartasSeleccionadas = [];
let parejasEncontradas = 0;

function iniciarMemoria() {
    const contenedor = document.getElementById("juegoMemoria");
    contenedor.innerHTML = "";
    parejasEncontradas = 0;
    cartasSeleccionadas = [];

    valores.sort(() => 0.5 - Math.random());

    valores.forEach(valor => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.valor = valor;
        carta.textContent = "💌";

        carta.addEventListener("click", () => voltear(carta));

        contenedor.appendChild(carta);
    });
}

function voltear(carta) {
    if (cartasSeleccionadas.length < 2 && !cartasSeleccionadas.includes(carta)) {
        carta.textContent = carta.dataset.valor;
        cartasSeleccionadas.push(carta);

        if (cartasSeleccionadas.length === 2) {
            comprobar();
        }
    }
}

function comprobar() {
    const [c1, c2] = cartasSeleccionadas;

    if (c1.dataset.valor === c2.dataset.valor) {
        parejasEncontradas++;
        cartasSeleccionadas = [];

        if (parejasEncontradas === 4) {
            document.getElementById("btnFinal").classList.remove("oculto");
        }

    } else {
        setTimeout(() => {
            c1.textContent = "💌";
            c2.textContent = "💌";
            cartasSeleccionadas = [];
        }, 800);
    }
}

// ================= FINAL =================
document.getElementById("btnFinal").addEventListener("click", () => {
    mostrarPantalla("final");
});

// ================= REINICIAR =================
document.getElementById("reiniciar").addEventListener("click", () => {
    location.reload();
});
