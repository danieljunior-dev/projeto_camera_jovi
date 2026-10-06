// ===================== Navegação entre telas =====================
function showPage(id) {
  document.querySelectorAll('.page').forEach(function (page) {
    page.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  document.getElementById(id).querySelector('.screen').scrollTop = 0;
}

// ===================== Curtir / descurtir foto =====================
function toggleLike(btn) {
  btn.classList.toggle('liked');
}

// ===================== Modal de vídeo em tela cheia (Bootstrap) =====================
var videoModalEl = document.getElementById('videoModal');
var videoModal = new bootstrap.Modal(videoModalEl, { backdrop: false });
var videoPlayer = document.getElementById('videoPlayer');

// Sempre que o modal do vídeo é fechado (pelo X ou clicando fora),
// pausa e reseta o vídeo automaticamente.
videoModalEl.addEventListener('hidden.bs.modal', function () {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
});

function playVideo(src) {
  videoPlayer.src = src;
  videoModal.show();
  videoPlayer.play();
}

function closeVideo() {
  videoModal.hide();
}

// ===================== Modal de confirmação de exclusão (Bootstrap) =====================
var confirmDeleteModalEl = document.getElementById('confirmDeleteModal');
var confirmDeleteModal = new bootstrap.Modal(confirmDeleteModalEl, { backdrop: false });

function deletePhoto() {
  confirmDeleteModal.show();
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
  confirmDeleteModal.hide();
  showPage('page-memorias');
});

// ===================== Mini player de vídeo dentro dos cards =====================

// Ícone usado no botão depois que o mini player começa a tocar
var expandIconSVG = '<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 5V1H5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 9V13H9" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 1L8 6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M1 13L6 8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>';

// Toca o vídeo dentro do próprio card (mini player, "in-frame")
function playInline(videoId, btnId, src) {
  var video = document.getElementById(videoId);
  var btn = document.getElementById(btnId);

  // guarda o botão original (ícone de play) para restaurar depois
  var originalHTML = btn.getAttribute('data-original-html') || btn.innerHTML;
  var originalLabel = btn.getAttribute('data-original-label') || btn.getAttribute('aria-label');
  btn.setAttribute('data-original-html', originalHTML);
  btn.setAttribute('data-original-label', originalLabel);

  video.src = src;
  video.style.display = 'block';
  video.currentTime = 0;
  video.play();

  // troca o botão de "play" para um botão de "expandir para tela cheia"
  btn.classList.add('expand-btn');
  btn.innerHTML = expandIconSVG;
  btn.setAttribute('aria-label', 'Ver em tela cheia');
  btn.onclick = function (e) {
    if (e) e.stopPropagation();
    video.pause();
    playVideo(src);
  };

  // quando o vídeo termina, volta para a imagem congelada e o botão de play original
  video.onended = function () {
    resetInline(video, btn, videoId, btnId, src, originalHTML, originalLabel);
  };
}

// Restaura o card ao estado original (imagem parada + botão de play)
function resetInline(video, btn, videoId, btnId, src, originalHTML, originalLabel) {
  video.pause();
  video.currentTime = 0;
  video.style.display = 'none';

  btn.classList.remove('expand-btn');
  btn.innerHTML = originalHTML;
  btn.setAttribute('aria-label', originalLabel || 'Reproduzir vídeo');
  btn.onclick = function (e) {
    if (e) e.stopPropagation();
    playInline(videoId, btnId, src);
  };
}

// Pausa/retoma o mini player ao tocar no próprio vídeo
function toggleInline(video) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
