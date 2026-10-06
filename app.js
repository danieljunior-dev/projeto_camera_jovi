// ============================================================
// JOVI · Hub de Assistentes — lógica de interface e interação
// ============================================================

const ASSISTANTS = {
  kai: {
    name: 'KAI',
    avatar: 'assets/kai_avatar.png',
    character: 'assets/kai_character.png',
    greetingTitle: 'Olá! 👋',
    greeting: 'Sou o Kai, seu assistente da câmera. Transformo sua câmera num hub inteligente, pronto para facilitar seu dia!',
    placeholder: 'Pergunte ao Kai',
    actions: [
      {
        id: 'qualidade',
        title: 'Melhorar qualidade',
        subtitle: 'Deixe suas fotos mais nítidas e com alta resolução',
        icon: iconWand(),
        reply: 'Posso aumentar a nitidez e a resolução das suas fotos automaticamente. Envie uma imagem ou tire uma nova foto que eu cuido do resto — sem perder detalhes nem naturalidade.'
      },
      {
        id: 'pdf',
        title: 'Digitalização & PDF',
        subtitle: 'Scanner, OCR, assinatura e conversão e resumo',
        icon: iconDoc(),
        reply: 'Posso digitalizar documentos direto pela câmera, reconhecer o texto (OCR), gerar um PDF e até resumir o conteúdo pra você. Quer escanear algo agora?'
      },
      {
        id: 'compartilhar',
        title: 'Compartilhamento IA',
        subtitle: 'Sugere onde enviar, comprime e cria links',
        icon: iconShare(),
        reply: 'Analiso o conteúdo e sugiro o melhor destino pra compartilhar, além de comprimir o arquivo e gerar um link rápido. Qual arquivo você quer compartilhar?'
      },
      {
        id: 'pessoal',
        title: 'Assistente Pessoal',
        subtitle: 'Sugestões, otimização, duplicadas e mais',
        icon: iconStar(),
        reply: 'Posso organizar sua galeria: encontrar fotos duplicadas, sugerir as melhores para guardar e liberar espaço no seu aparelho. Quer que eu comece uma varredura?'
      }
    ]
  },
  mia: {
    name: 'MIA',
    avatar: 'assets/mia_avatar.png',
    character: 'assets/mia_character.png',
    greetingTitle: 'Olá! 👋',
    greeting: 'Sou a Mia, sua assistente da câmera. Posso te ajudar a capturar imagens incríveis!',
    placeholder: 'Pergunte à Mia',
    actions: [
      {
        id: 'fotografia',
        title: 'Fotografia inteligente',
        subtitle: 'Luz, ângulo, enquadramento e composição',
        icon: iconCamera(),
        reply: 'Posso te guiar em tempo real sobre luz, ângulo e enquadramento pra deixar sua foto com cara de profissional. Aponte a câmera pra cena que você quer capturar!'
      },
      {
        id: 'video',
        title: 'Vídeos & Conteúdo',
        subtitle: 'Movimentos, transições, dicas para reels e mais',
        icon: iconVideo(),
        reply: 'Tenho dicas de movimento de câmera, cortes e transições pra deixar seus vídeos e reels muito mais dinâmicos. Qual tipo de vídeo você quer gravar?'
      },
      {
        id: 'editar',
        title: 'Editar imagem',
        subtitle: 'Ajuste e adicione filtros, cores e mais com prompt',
        icon: iconEdit(),
        reply: 'Me conta como você imagina o resultado — cores, clima, estilo — e eu aplico os ajustes e filtros certos na sua imagem a partir do seu prompt.'
      },
      {
        id: 'social',
        title: 'Social Media IA',
        subtitle: 'Performance, capas, melhores horários e sugestões',
        icon: iconChart(),
        reply: 'Posso sugerir os melhores horários pra postar, capas com mais chance de engajamento e o que está performando bem no seu perfil. Quer ver as sugestões da semana?'
      },
      {
        id: 'diretor',
        title: 'Modo diretor',
        subtitle: 'Guia em tempo real como uma diretora virtual',
        icon: iconClapper(),
        reply: 'No modo diretor eu te guio passo a passo durante a gravação, como uma diretora virtual: enquadramento, ritmo e até deixas de atuação. Bora ativar?'
      }
    ]
  }
};

let currentId = 'kai';
let voiceListening = false;

// ---------- ícones (inline SVG, cor herdada do container) ----------
function iconWand() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 20L15 9" stroke="#3457F5" stroke-width="2" stroke-linecap="round"/><path d="M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#3457F5"/><path d="M19 10l.7 1.4L21 12l-1.3.6L19 14l-.7-1.4L17 12l1.3-.6L19 10z" fill="#3457F5"/></svg>` }
function iconDoc() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="#3457F5" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v4a1 1 0 001 1h4" stroke="#3457F5" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 13h8M8 17h5" stroke="#3457F5" stroke-width="1.8" stroke-linecap="round"/></svg>` }
function iconShare() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="2.4" stroke="#3457F5" stroke-width="1.8"/><circle cx="18" cy="6" r="2.4" stroke="#3457F5" stroke-width="1.8"/><circle cx="18" cy="18" r="2.4" stroke="#3457F5" stroke-width="1.8"/><path d="M8.2 10.8L15.8 7.2M8.2 13.2l7.6 3.6" stroke="#3457F5" stroke-width="1.8" stroke-linecap="round"/></svg>` }
function iconStar() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.2 6.6H21l-5.4 4 2 6.6-5.6-4.2-5.6 4.2 2-6.6L3 9.6h6.8L12 3z" stroke="#3457F5" stroke-width="1.6" stroke-linejoin="round"/></svg>` }
function iconCamera() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" stroke="#3457F5" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.4" stroke="#3457F5" stroke-width="1.8"/></svg>` }
function iconVideo() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="13" height="12" rx="2" stroke="#3457F5" stroke-width="1.8"/><path d="M16 10.5l5-2.8v9.6l-5-2.8" stroke="#3457F5" stroke-width="1.8" stroke-linejoin="round"/></svg>` }
function iconEdit() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 20l4.2-.9L19.6 7.7a1.7 1.7 0 000-2.4l-1-1a1.7 1.7 0 00-2.4 0L4.9 15.7 4 20z" stroke="#3457F5" stroke-width="1.7" stroke-linejoin="round"/><path d="M14.5 5.5l3.6 3.6" stroke="#3457F5" stroke-width="1.7"/></svg>` }
function iconChart() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 20V10M11 20V4M18 20v-7" stroke="#3457F5" stroke-width="2" stroke-linecap="round"/></svg>` }
function iconClapper() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 10l1.4-4.6a1 1 0 011-.7l13.6 2a1 1 0 01.8 1.2L19 10" stroke="#3457F5" stroke-width="1.7" stroke-linejoin="round"/><rect x="3" y="10" width="18" height="9" rx="1.5" stroke="#3457F5" stroke-width="1.7"/><path d="M6.5 5.2l2 4M11 4.6l2 4" stroke="#3457F5" stroke-width="1.5"/></svg>` }

// ---------- render ----------
let selectedActionId = null;

function renderAssistant(id, { animate = false } = {}) {
  currentId = id;
  selectedActionId = null;
  const data = ASSISTANTS[id];

  document.getElementById('hdrAvatar').src = data.avatar;
  document.getElementById('hdrName').textContent = data.name;
  document.getElementById('charImg').src = data.character;
  document.getElementById('greetingText').textContent = data.greeting;
  document.getElementById('chatInput').placeholder = data.placeholder;
  document.getElementById('chatInput').value = '';

  document.getElementById('tabKai').classList.toggle('active', id === 'kai');
  document.getElementById('tabMia').classList.toggle('active', id === 'mia');

  renderActionArea({ animate });
  document.getElementById('chatLog').innerHTML = '';
}

function renderActionArea({ animate = false } = {}) {
  const data = ASSISTANTS[currentId];
  const list = document.getElementById('actionList');
  list.innerHTML = '';

  const selected = data.actions.find(a => a.id === selectedActionId);

  if (selected) {
    // Modo detalhe: some com as outras opções, mostra só a selecionada + descrição.
    const detail = document.createElement('div');
    detail.className = 'bg-white rounded-2xl shadow-card p-4 animate-popIn';
    detail.innerHTML = `
      <div class="flex items-center gap-3 mb-3">
        <span class="w-10 h-10 rounded-xl bg-jovi-iconbg flex items-center justify-center shrink-0">${selected.icon}</span>
        <span class="font-bold text-jovi-ink text-[14.5px] leading-tight">${selected.title}</span>
      </div>
      <p class="text-jovi-gray text-[13px] leading-relaxed">${selected.reply}</p>
    `;
    list.appendChild(detail);

    const backBtn = document.createElement('button');
    backBtn.className = 'w-full flex items-center justify-center gap-2 bg-jovi-iconbg text-jovi-blue font-semibold text-[13px] rounded-2xl py-3 mt-2.5 active:scale-[0.98] transition-transform animate-popIn';
    backBtn.style.animationDelay = '60ms';
    backBtn.onclick = () => backToMenu();
    backBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#3457F5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Voltar ao menu inicial
    `;
    list.appendChild(backBtn);
    return;
  }

  // Modo lista: mostra todas as opções normalmente.
  data.actions.forEach((action, i) => {
    const btn = document.createElement('button');
    btn.className = 'w-full flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 shadow-card text-left active:scale-[0.98] transition-transform' + (animate ? ' animate-popIn' : '');
    if (animate) btn.style.animationDelay = (i * 60) + 'ms';
    btn.onclick = () => handleActionClick(action);
    btn.innerHTML = `
      <span class="w-8 h-8 rounded-lg bg-jovi-iconbg flex items-center justify-center shrink-0">${action.icon}</span>
      <span class="flex-1 min-w-0">
        <span class="block font-semibold text-jovi-ink text-[12.5px] leading-tight">${action.title}</span>
        <span class="block text-jovi-gray text-[10.5px] leading-snug">${action.subtitle}</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="shrink-0"><path d="M9 6l6 6-6 6" stroke="#B4B8D6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    `;
    list.appendChild(btn);
  });
}

function backToMenu() {
  selectedActionId = null;
  renderActionArea({ animate: true });
}

// ---------- switching between assistants ----------
function switchAssistant(id) {
  if (id === currentId) return;
  renderAssistant(id, { animate: true });
}

function openSwitcher() {
  document.getElementById('sheetOverlay').classList.remove('hidden');
  document.getElementById('switcherSheet').classList.remove('hidden');
  document.getElementById('dotMenu').classList.add('hidden');
}
function closeSwitcher() {
  document.getElementById('sheetOverlay').classList.add('hidden');
  document.getElementById('switcherSheet').classList.add('hidden');
}
function selectAssistant(id) {
  closeSwitcher();
  switchAssistant(id);
}

function toggleMenu() {
  document.getElementById('dotMenu').classList.toggle('hidden');
}
document.addEventListener('click', (e) => {
  const menu = document.getElementById('dotMenu');
  if (!menu.contains(e.target) && !e.target.closest('button[aria-label="Mais opções"]')) {
    menu.classList.add('hidden');
  }
});

// ---------- chat ----------
function scrollToBottom() {
  const area = document.getElementById('scrollArea');
  area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
}

function appendUserMessage(text) {
  const log = document.getElementById('chatLog');
  const wrap = document.createElement('div');
  wrap.className = 'flex justify-end animate-popIn';
  wrap.innerHTML = `
    <div class="msg-user-tail relative max-w-[78%] bg-jovi-blue text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-[13.5px] leading-relaxed shadow-bubble">
      ${escapeHtml(text)}
    </div>`;
  log.appendChild(wrap);
  scrollToBottom();
}

function appendTypingIndicator() {
  const log = document.getElementById('chatLog');
  const wrap = document.createElement('div');
  wrap.id = 'typingIndicator';
  wrap.className = 'flex justify-start animate-popIn';
  wrap.innerHTML = `
    <div class="msg-bot-tail relative bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-bubble flex items-center gap-1.5">
      <span class="typing-dot animate-blink1"></span>
      <span class="typing-dot animate-blink2"></span>
      <span class="typing-dot animate-blink3"></span>
    </div>`;
  log.appendChild(wrap);
  scrollToBottom();
}

function appendBotMessage(text) {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.remove();
  const log = document.getElementById('chatLog');
  const wrap = document.createElement('div');
  wrap.className = 'flex justify-start animate-popIn';
  wrap.innerHTML = `
    <div class="msg-bot-tail relative max-w-[80%] bg-white text-jovi-ink rounded-2xl rounded-bl-sm px-4 py-2.5 text-[13.5px] leading-relaxed shadow-bubble">
      ${escapeHtml(text)}
    </div>`;
  log.appendChild(wrap);
  scrollToBottom();
}

function botReplyTo(text) {
  const data = ASSISTANTS[currentId];
  const lower = text.toLowerCase();
  const found = data.actions.find(a =>
    lower.includes(a.id) ||
    a.title.toLowerCase().split(' ').some(word => word.length > 3 && lower.includes(word))
  );
  appendTypingIndicator();
  setTimeout(() => {
    if (found) {
      appendBotMessage(found.reply);
    } else {
      appendBotMessage('Entendi! Deixa eu preparar isso pra você. Enquanto isso, dá uma olhada nas sugestões rápidas abaixo. ✨');
    }
  }, 900 + Math.random() * 500);
}

function handleActionClick(action) {
  selectedActionId = action.id;
  renderActionArea({ animate: true });
  setTimeout(scrollToBottom, 50);
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  appendUserMessage(text);
  input.value = '';
  botReplyTo(text);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- mic / send button ----------
function onMicOrSend() {
  const input = document.getElementById('chatInput');
  if (input.value.trim().length > 0) {
    sendMessage();
    return;
  }
  if (voiceListening) return;
  simulateVoiceInput();
}

function simulateVoiceInput() {
  const input = document.getElementById('chatInput');
  const micBtn = document.getElementById('micBtn');
  const data = ASSISTANTS[currentId];
  const samples = data.actions.map(a => a.title);
  const phrase = samples[Math.floor(Math.random() * samples.length)];

  voiceListening = true;
  micBtn.classList.add('animate-pulseRing');
  const prevPlaceholder = input.placeholder;
  input.placeholder = 'Ouvindo...';

  setTimeout(() => {
    input.value = phrase.toLowerCase();
    input.placeholder = prevPlaceholder;
    micBtn.classList.remove('animate-pulseRing');
    voiceListening = false;
    input.focus();
  }, 1600);
}

// Layout do "celular": largura, altura e escala do conteúdo são
// calculados juntos, a partir do mesmo número, para nunca haver
// divergência entre o tamanho da moldura e o do conteúdo escalado.
const DESIGN_W = 390;
const DESIGN_H = 844;
const RATIO = DESIGN_W / DESIGN_H;
const MOBILE_BREAKPOINT = 480;

function layoutPhone() {
  const shell = document.querySelector('.phone-shell');
  const screen = document.getElementById('phoneScreen');
  if (!shell || !screen) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw <= MOBILE_BREAKPOINT) {
    // Tela de celular real: sem moldura, sem escala, ocupa 100%.
    shell.style.width = '';
    shell.style.height = '';
    screen.style.transform = '';
    return;
  }

  // Espaço reservado pra faixa "Protótipo" + legenda acima/abaixo do celular.
  const chromeReserve = 130;
  const maxW = vw * 0.92;
  const maxH = Math.max(120, vh - chromeReserve);
  const widthFromHeight = maxH * RATIO;
  const finalW = Math.min(DESIGN_W, maxW, widthFromHeight);
  const finalH = finalW / RATIO;

  shell.style.width = finalW + 'px';
  shell.style.height = finalH + 'px';
  screen.style.transform = `scale(${finalW / DESIGN_W})`;
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const assistente = params.get('assistente') || 'kai';

  renderAssistant(assistente);
  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // relógio real no status bar
  const clock = document.getElementById('clock');
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${h}:${m}`;
  }
  updateClock();
  setInterval(updateClock, 15000);

  // Recalcula o layout do celular em vários momentos, pra cobrir
  // qualquer mudança tardia (fontes carregando, painel redimensionando, etc.)
  layoutPhone();
  window.addEventListener('resize', layoutPhone);
  window.addEventListener('load', layoutPhone);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layoutPhone);
  }
  if (window.ResizeObserver) {
    new ResizeObserver(layoutPhone).observe(document.body);
  }
  // Rede de segurança: recalcula por mais alguns instantes após o load,
  // caso algo mude o tamanho disponível sem disparar os eventos acima.
  let safetyTicks = 0;
  const safetyTimer = setInterval(() => {
    layoutPhone();
    safetyTicks++;
    if (safetyTicks > 10) clearInterval(safetyTimer);
  }, 200);
});
