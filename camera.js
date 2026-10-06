const listaModos = document.querySelector(".lista-modos");
const modos = document.querySelectorAll(".modo");

// Componente Bootstrap usado no botão de IA.
if (window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((elemento) => {
        new bootstrap.Tooltip(elemento);
    });
}

let inicioX = 0;
let movimentoX = 0;
let posicaoAtual = 0;

let gravando = false;
let segundos = 0;
let intervalo = null;

function atualizarContador() {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    contadorVideo.textContent =
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundosRestantes).padStart(2, "0");
}

listaModos.addEventListener("mousedown", (evento) => {
    if (gravando) return;

    inicioX = evento.clientX;
    movimentoX = posicaoAtual;
    listaModos.style.transition = "none";
});

listaModos.addEventListener("mousemove", (evento) => {
    if (inicioX === 0) return;

    movimentoX = posicaoAtual + (evento.clientX - inicioX);

    const primeiroModo = modos[0];
    const ultimoModo = modos[modos.length - 1];

    const centroTela = 95;

    const limiteDireita =
        centroTela - (primeiroModo.offsetLeft + primeiroModo.offsetWidth / 2);

    const limiteEsquerda =
        centroTela - (ultimoModo.offsetLeft + ultimoModo.offsetWidth / 2);

    if (movimentoX > limiteDireita) {
        movimentoX = limiteDireita;
    }

    if (movimentoX < limiteEsquerda) {
        movimentoX = limiteEsquerda;
    }

    listaModos.style.transform = `translateX(${movimentoX}px)`;
});

listaModos.addEventListener("mouseup", () => {
    if (gravando) return;

    inicioX = 0;

    let modoMaisProximo = null;
    let menorDistancia = Infinity;

    modos.forEach((modo) => {
        const centroModo =
            modo.offsetLeft +
            (modo.offsetWidth / 2) +
            movimentoX;

        const distancia = Math.abs(95 - centroModo);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            modoMaisProximo = modo;
        }
    });

    modos.forEach((modo) => {
        modo.classList.remove("selecionado");
    });

    modoMaisProximo.classList.add("selecionado");

    if (modoMaisProximo.textContent.includes("Vídeo")) {
        document.querySelector(".botao-foto-img").style.display = "none";
        document.querySelector(".botao-gravar-img").style.display = "block";
    } else {
        document.querySelector(".botao-foto-img").style.display = "block";
        document.querySelector(".botao-gravar-img").style.display = "none";
    }

    if (modoMaisProximo.textContent.includes("Traduzir")) {
        caixaTraducao.style.display = "block";
        fotoFundo.src = "assets/traducao.jpg";
        document.querySelector(".zoom").style.display = "none";

        idiomasTraducao.style.display = "flex";
        iconeIdioma.style.display = "block";

    } else {
        caixaTraducao.style.display = "none";
        fotoFundo.src = "assets/cidade-noite.jpg";
        document.querySelector(".zoom").style.display = "flex";

        idiomasTraducao.style.display = "none";
        iconeIdioma.style.display = "none";

    }

    const centroModo =
        modoMaisProximo.offsetLeft +
        (modoMaisProximo.offsetWidth / 2);

    movimentoX = 95 - centroModo;

    listaModos.style.transition = "transform 0.3s ease";
    listaModos.style.transform = `translateX(${movimentoX}px)`;

    posicaoAtual = movimentoX;
});

listaModos.addEventListener("mouseleave", () => {
    inicioX = 0;
});


const botaoFoto = document.querySelector(".botao-foto");
const caixaTraducao = document.querySelector(".caixa-traducao");
const contadorVideo = document.querySelector(".contador-video");
const botaoGravando = document.querySelector(".botao-gravando-img");
const botaoPause = document.querySelector(".botao-pause");
const botaoFotoPequeno = document.querySelector(".botao-foto-pequeno");
const botaoPausado = document.querySelector(".botao-pausado");
const botaoGravar = document.querySelector(".botao-gravar-img");
const miniaturaGaleria = document.querySelector(".miniatura-galeria");
const trocarCamera = document.querySelector(".trocar-camera");
const fotoFundo = document.querySelector(".foto-fundo");
const idiomasTraducao = document.querySelector(".idiomas-traducao");
const iconeIdioma = document.querySelector(".icone-idioma");


miniaturaGaleria.addEventListener("click", () => {
    window.location.href = "galeria.html";
});


botaoFoto.addEventListener("click", () => {
    const modoSelecionado = document.querySelector(".selecionado");

    if (!modoSelecionado.textContent.includes("Vídeo") && !gravando) {
        return;
    }

    if (gravando) {

        gravando = false;
        clearInterval(intervalo);
        contadorVideo.style.display = "none";

        botaoGravar.style.display = "block";
        botaoGravando.style.display = "none";
        botaoPause.style.display = "none";
        botaoFotoPequeno.style.display = "none";
        botaoPausado.style.display = "none";

        miniaturaGaleria.style.display = "block";
        trocarCamera.style.display = "block";

    } else {
        gravando = true;

        botaoGravar.style.display = "none";
        botaoGravando.style.display = "block";
        botaoPause.style.display = "block";
        botaoFotoPequeno.style.display = "block";

        miniaturaGaleria.style.display = "none";
        trocarCamera.style.display = "none";

        segundos = 0;

        contadorVideo.textContent = "00:00";
        contadorVideo.style.display = "block";

        intervalo = setInterval(() => {
            segundos++;

            atualizarContador();
        }, 1000);
    }
});

botaoPause.addEventListener("click", () => {
    clearInterval(intervalo);

    botaoPause.style.display = "none";
    botaoPausado.style.display = "block";
});

botaoPausado.addEventListener("click", () => {
    botaoPausado.style.display = "none";
    botaoPause.style.display = "block";

    intervalo = setInterval(() => {
        segundos++;

        atualizarContador();
    }, 1000);
});


idiomasTraducao.style.display = "none";
iconeIdioma.style.display = "none";
caixaTraducao.style.display = "none";


const botaoFlash = document.querySelector("#flash");

let estadoFlash = 0;

botaoFlash.addEventListener("click", () => {
    estadoFlash++;

    if (estadoFlash === 1) {
        botaoFlash.src = "assets/flash-on.svg";
    }

    if (estadoFlash === 2) {
        botaoFlash.src = "assets/flash-auto.svg";
    }

    if (estadoFlash === 3) {
        botaoFlash.src = "assets/flash.svg";
        estadoFlash = 0;
    }
});


const botaoTimer = document.querySelector("#timer");

let estadoTimer = 0;

botaoTimer.addEventListener("click", () => {
    estadoTimer++;

    if (estadoTimer === 1) {
        botaoTimer.src = "assets/timer3.svg";
    }

    if (estadoTimer === 2) {
        botaoTimer.src = "assets/timer5.svg";
    }

    if (estadoTimer === 3) {
        botaoTimer.src = "assets/timer10.svg";
    }

    if (estadoTimer === 4) {
        botaoTimer.src = "assets/timer.svg";
        estadoTimer = 0;
    }
});


const fecharAssistentes = document.querySelector(".fechar-assistentes");

fecharAssistentes.addEventListener("click", (evento) => {
    evento.stopPropagation();
    document.querySelector(".botao-assistentes").style.display = "none";
});

const botaoAssistentes = document.querySelector(".botao-assistentes");
const convitesIa = document.querySelector(".convites-ia");
const botoesConvite = document.querySelectorAll(".convite-ia");
const selecaoAssistente = document.querySelector(".selecao-assistente");
const voltarCamera = document.querySelector(".voltar-camera");
const cardsPersonagem = document.querySelectorAll(".personagem-card");
const confirmacaoPersonagem = document.querySelector(".confirmacao-personagem");
const nomeConfirmacao = confirmacaoPersonagem.querySelector("span strong");
const botaoConfirmar = confirmacaoPersonagem.querySelector("button");
const telaConfirmado = document.querySelector(".confirmado");
const nomeConfirmado = telaConfirmado.querySelector("strong");
const voltarConfirmado = telaConfirmado.querySelector("button");

function mostrarConvites() {
    convitesIa.classList.toggle("visivel");
    botaoAssistentes.setAttribute("aria-expanded", convitesIa.classList.contains("visivel"));
}

function abrirSelecao() {
    convitesIa.classList.remove("visivel");
    botaoAssistentes.setAttribute("aria-expanded", "false");
    selecaoAssistente.classList.add("aberta");
    selecaoAssistente.setAttribute("aria-hidden", "false");
}

function fecharSelecao() {
    selecaoAssistente.classList.remove("aberta");
    selecaoAssistente.setAttribute("aria-hidden", "true");
    telaConfirmado.classList.remove("visivel");
    confirmacaoPersonagem.classList.remove("visivel");
}

botaoAssistentes.addEventListener("click", mostrarConvites);

botoesConvite.forEach((botao) => {
    botao.addEventListener("click", abrirSelecao);
});

voltarCamera.addEventListener("click", fecharSelecao);

voltarConfirmado.addEventListener("click", () => {
    const escolhido = document.querySelector(".personagem-card.selecionado-personagem");

    if (!escolhido) return;

    const nome = escolhido.dataset.personagem;

    window.location.href = `assistentes.html?assistente=${nome.toLowerCase()}`;
});

cardsPersonagem.forEach((card) => {
    card.addEventListener("click", () => {

        cardsPersonagem.forEach((item) => {
            item.classList.remove("selecionado-personagem");
            item.setAttribute("aria-pressed", "false");
        });

        card.classList.add("selecionado-personagem");
        card.setAttribute("aria-pressed", "true");

        const nome = card.dataset.personagem;
        nomeConfirmacao.textContent = nome;
        confirmacaoPersonagem.classList.add("visivel");
    });
});

botaoConfirmar.addEventListener("click", () => {
    const escolhido = document.querySelector(".personagem-card.selecionado-personagem");

    if (!escolhido) return;

    const nome = escolhido.dataset.personagem;
    nomeConfirmado.textContent = `${nome} foi selecionado!`;
    telaConfirmado.classList.add("visivel");
});