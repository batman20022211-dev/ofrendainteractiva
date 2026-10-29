const fotos = [
    { src: "img/foto1.png", descripcion: "Un recuerdo que vive en el corazón" },
    { src: "img/foto2.png", descripcion: "Momentos que nunca olvidaremos" },
    { src: "img/foto3.png", descripcion: "Su cariño nos acompaña" },
    { src: "img/foto4.png", descripcion: "Siempre presente en nuestra memoria" }
];
let indice = 0;
const imagen = document.getElementById("imagenOfrenda");
const descripcion = document.getElementById("descripcion");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const puntos = document.getElementById("puntos");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
function crearIndicadores() {
    puntos.innerHTML = "";
    fotos.forEach((_, i) => {
        const punto = document.createElement("span");
        punto.classList.add("punto");
        punto.addEventListener("click", () => mostrarFoto(i));
        puntos.appendChild(punto);
    });
}
function mostrarFoto(nuevoIndice) {
    indice = (nuevoIndice + fotos.length) % fotos.length;
    imagen.src = fotos[indice].src;
    descripcion.textContent = fotos[indice].descripcion;
    actualizarIndicadores();
}
function actualizarIndicadores() {
    const puntosElem = document.querySelectorAll(".punto");
    puntosElem.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}
anterior.addEventListener("click", () => {
    mostrarFoto(indice - 1);
});
siguiente.addEventListener("click", () => {
    mostrarFoto(indice + 1);
});
btnMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        btnMusica.innerHTML = "▮▮ Pausar música";
        btnMusica.classList.add("activo");
    } else {
        audio.pause();
        audio.currentTime = 0;
        btnMusica.innerHTML = "▶ Reproducir música";
        btnMusica.classList.remove("activo");
    }
});
let intervalo = setInterval(() => {
    mostrarFoto(indice + 1);
}, 6000);
anterior.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        mostrarFoto(indice + 1);
    }, 6000);
});
siguiente.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        mostrarFoto(indice + 1);
    }, 6000);
});
document.addEventListener("DOMContentLoaded", () => {
    crearIndicadores();
    mostrarFoto(0);
});