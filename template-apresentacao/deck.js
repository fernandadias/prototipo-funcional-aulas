/* ============================================================
   PROTÓTIPO FUNCIONAL — Engine de apresentação
   Cada aula só precisa do <main id="deck"> com seus <section class="slide">.
   Toda a UI (toolbar de desenho, controles, overlays) é injetada aqui.
   ============================================================ */

(function injectChrome() {
  document.body.insertAdjacentHTML('afterbegin', '<div id="progress" style="width:0%"></div>');
  document.body.insertAdjacentHTML('beforeend', `
<canvas id="drawCanvas"></canvas>
<div id="cursorDot"></div>
<div id="drawToolbar" aria-label="Ferramentas de desenho">
  <button class="tool" data-tool="select" title="Mão · seleciona, move, redimensiona (V · Esc)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v9"/><path d="M6 10v8a4 4 0 0 0 4 4h2a8 8 0 0 0 8-8V8a2 2 0 0 0-4 0v5"/></svg>
    <span class="key">V</span>
  </button>
  <hr>
  <button class="tool active" data-tool="pen" title="Pincel fino (1)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>
    <span class="key">1</span>
  </button>
  <button class="tool" data-tool="highlighter" title="Pincel grosso · marca-texto (2 · H)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>
    <span class="key">2</span>
  </button>
  <button class="tool" data-tool="line" title="Linha (3)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="19" x2="19" y2="5"/></svg>
    <span class="key">3</span>
  </button>
  <button class="tool" data-tool="arrow" title="Seta (4)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="19" x2="18" y2="6"/><polyline points="11 6 18 6 18 13"/></svg>
    <span class="key">4</span>
  </button>
  <button class="tool" data-tool="rect" title="Retângulo (5)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="1"/></svg>
    <span class="key">5</span>
  </button>
  <button class="tool" data-tool="ellipse" title="Elipse (6)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="12" rx="9" ry="6"/></svg>
    <span class="key">6</span>
  </button>
  <button class="tool" data-tool="text" title="Texto (7)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
    <span class="key">7</span>
  </button>
  <button class="tool" data-tool="eraser" title="Borracha (8)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20H7L3 16c-.6-.6-.6-1.5 0-2L13 4c.6-.6 1.5-.6 2 0l6 6c.6.6.6 1.5 0 2L11 22"/></svg>
    <span class="key">8</span>
  </button>
  <hr>
  <button class="swatch active" data-color="#D4F542" style="background:#D4F542" title="Verde neon"></button>
  <button class="swatch" data-color="#FF6B6B" style="background:#FF6B6B" title="Vermelho"></button>
  <button class="swatch" data-color="#4ECDC4" style="background:#4ECDC4" title="Ciano"></button>
  <button class="swatch" data-color="#f0e7da" style="background:#f0e7da" title="Creme"></button>
  <hr>
  <button class="tool" id="drawUndo" title="Desfazer (Ctrl+Z)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/></svg>
  </button>
  <button class="tool" id="drawClear" title="Limpar slide (Shift+D)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
  </button>
  <hr>
  <button class="tool" id="drawClose" title="Fechar modo desenho (D)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
</div>
<canvas id="laserCanvas"></canvas>
<aside id="notes" aria-label="Notas do palestrante">
  <h4>Notas do slide</h4>
  <div class="notes-content"></div>
</aside>
<div id="qr"><img alt="QR Code"/><div class="qr-label">Escaneia pra abrir</div></div>
<div id="timer">
  <div>
    <div class="label">Exercício</div>
    <div class="time">05:00</div>
  </div>
  <button id="timerToggle" title="Pausar/Retomar"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg></button>
  <button id="timerClose" title="Fechar">✕</button>
</div>
<nav id="controls" aria-label="Navegação de slides">
  <button id="btnPrev" title="Anterior (←)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
  <span class="indicator"><span id="curIdx">1</span> / <span id="totalIdx">12</span></span>
  <button id="btnNext" title="Próximo (→)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
  <button id="btnGrid" title="Grade (G)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>
  <button id="btnHelp" title="Atalhos (?)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg></button>
</nav>
<div id="grid" role="dialog" aria-label="Visão em grade">
  <h2>Todos os slides — clique para ir</h2>
  <div class="grid-wrap" id="gridWrap"></div>
</div>
<div id="cheatsheet" role="dialog" aria-label="Atalhos de teclado">
  <div class="panel">
    <h3>Atalhos</h3>
    <dl>
      <dt>← →</dt><dd>Navegar entre slides</dd>
      <dt>Space</dt><dd>Próximo (ou próximo bullet em slides com reveal)</dd>
      <dt>Home / End</dt><dd>Primeiro / último slide</dd>
      <dt>G</dt><dd>Visão em grade</dd>
      <dt>F</dt><dd>Tela cheia</dd>
      <dt>D</dt><dd>Abrir/fechar modo desenho (Shift+D limpa o slide)</dd>
      <dt>V · Esc</dt><dd>Mão — selecionar, mover, redimensionar</dd>
      <dt>1–8</dt><dd>Pincel fino, marca-texto, linha, seta, retângulo, elipse, texto, borracha</dd>
      <dt>H</dt><dd>Atalho extra do marca-texto</dd>
      <dt>Del</dt><dd>Apagar shape selecionado</dd>
      <dt>Ctrl+Z</dt><dd>Desfazer último traço</dd>
      <dt>L</dt><dd>Laser pointer com rastro</dd>
      <dt>N</dt><dd>Notas do palestrante</dd>
      <dt>E</dt><dd>Editar código ao vivo</dd>
      <dt>Q</dt><dd>QR code do slide atual</dd>
      <dt>T</dt><dd>Timer de exercício (5 min)</dd>
      <dt>?</dt><dd>Esta tela</dd>
      <dt>Esc</dt><dd>Fechar overlays</dd>
    </dl>
  </div>
</div>
  `);
})();

const slides = Array.from(document.querySelectorAll('.slide'));
const total = slides.length;
let current = 0;
let revealedBullets = 0;

const progress = document.getElementById('progress');
const curIdx = document.getElementById('curIdx');
const totalIdx = document.getElementById('totalIdx');
totalIdx.textContent = total;

/* --- Navegação --- */
function goTo(i, opts = {}) {
  i = Math.max(0, Math.min(total - 1, i));
  const direction = i < current ? 'back' : 'forward';
  slides[current].classList.remove('active');
  current = i;
  slides[current].classList.add('active');
  curIdx.textContent = i + 1;
  progress.style.width = ((i + 1) / total * 100) + '%';
  history.replaceState(null, '', '#' + (i + 1));
  revealedBullets = 0;
  applyReveal();
  updateNotes();
  updateGridActive();
  updateQR();
  // Reset timeline ao entrar — começa no intro se vier de slide anterior,
  // ou na última parada se vier de slide posterior (voltando)
  if (slides[current].dataset.type === 'timeline') {
    const stopsCount = slides[current].querySelectorAll('.timeline-stop').length;
    slides[current].dataset.activeStop = direction === 'back' ? String(stopsCount - 1) : '-1';
    // espera o layout pintar pra calcular offsets corretos
    requestAnimationFrame(() => updateTimeline(slides[current]));
  }
  // Reset spotlight ao entrar — nenhum destacado se vier do anterior,
  // último destacado se vier do posterior
  if (slides[current].dataset.type === 'spotlight') {
    const cardsCount = slides[current].querySelectorAll('.spotlight-card').length;
    slides[current].dataset.activeSpot = direction === 'back' ? String(cardsCount - 1) : '-1';
    updateSpotlight(slides[current]);
  }
  // Reset case-study ao entrar — zera questions/scoreboard/result
  if (slides[current].dataset.type === 'case-study') {
    resetCaseSlide(slides[current]);
  }
  // Reset prompt-evolution ao entrar — limpa todo o texto digitado
  resetPromptEvolution(slides[current]);
  // Reset quote-reveal ao entrar — frase se vier do anterior, imagem se voltando
  if (slides[current].dataset.type === 'quote-reveal') {
    slides[current].dataset.revealed = direction === 'back' ? 'true' : 'false';
  }
  // Re-highlight code on slide enter (Prism)
  if (window.Prism) Prism.highlightAllUnder(slides[current]);
  // Reset slide numbers chrome
  setSlideChrome();
}

// Recentraliza o timeline quando a janela muda de tamanho
window.addEventListener('resize', () => {
  const slide = slides[current];
  if (slide && slide.dataset.type === 'timeline') updateTimeline(slide);
});

function next() {
  const slide = slides[current];
  if (slide.dataset.type === 'timeline') {
    const stops = slide.querySelectorAll('.timeline-stop');
    const active = parseInt(slide.dataset.activeStop ?? '-1', 10);
    if (active < stops.length - 1) {
      slide.dataset.activeStop = active + 1;
      updateTimeline(slide);
      return;
    }
  }
  if (slide.dataset.type === 'spotlight') {
    const cards = slide.querySelectorAll('.spotlight-card');
    const active = parseInt(slide.dataset.activeSpot ?? '-1', 10);
    if (active < cards.length - 1) {
      slide.dataset.activeSpot = active + 1;
      updateSpotlight(slide);
      return;
    }
  }
  if (slide.dataset.type === 'quote-reveal' && slide.dataset.revealed !== 'true') {
    slide.dataset.revealed = 'true';
    return;
  }
  if (slide.dataset.type === 'case-study') {
    const questions = slide.querySelectorAll('.case-questions li');
    const revealed = slide.querySelectorAll('.case-questions li.revealed').length;
    const result = slide.querySelector('.case-result');
    if (revealed < questions.length) {
      questions[revealed].classList.add('revealed');
      updateCaseScoreboard(slide);
      return;
    }
    if (result && !result.classList.contains('shown')) {
      result.classList.add('shown');
      markCaseLeader(slide);
      return;
    }
  }
  const promptEvol = slide.querySelector('.prompt-evolution');
  if (promptEvol) {
    const targets = Array.from(promptEvol.querySelectorAll('.prompt-text'));
    const nextTarget = targets.find(t => !t.dataset.done);
    const stillTyping = targets.find(t => t.classList.contains('typing'));
    if (stillTyping) return; // ignora se ainda tá digitando
    if (nextTarget) {
      typewritePrompt(nextTarget);
      return;
    }
  }
  if (slide.dataset.reveal === 'true') {
    const bullets = slide.querySelectorAll('.bullets li, .phones .phone, .trio-cards .trio-card');
    if (revealedBullets < bullets.length) {
      bullets[revealedBullets].classList.add('revealed');
      revealedBullets++;
      return;
    }
  }
  goTo(current + 1);
}

function prev() {
  const slide = slides[current];
  if (slide.dataset.type === 'timeline') {
    const active = parseInt(slide.dataset.activeStop ?? '-1', 10);
    if (active > -1) {
      slide.dataset.activeStop = active - 1;
      updateTimeline(slide);
      return;
    }
  }
  if (slide.dataset.type === 'spotlight') {
    const active = parseInt(slide.dataset.activeSpot ?? '-1', 10);
    if (active > -1) {
      slide.dataset.activeSpot = active - 1;
      updateSpotlight(slide);
      return;
    }
  }
  if (slide.dataset.type === 'quote-reveal' && slide.dataset.revealed === 'true') {
    slide.dataset.revealed = 'false';
    return;
  }
  if (slide.dataset.type === 'case-study') {
    const result = slide.querySelector('.case-result');
    if (result && result.classList.contains('shown')) {
      result.classList.remove('shown');
      slide.querySelectorAll('.level-score').forEach(s => s.classList.remove('leader'));
      return;
    }
    const revealed = slide.querySelectorAll('.case-questions li.revealed');
    if (revealed.length > 0) {
      revealed[revealed.length - 1].classList.remove('revealed');
      updateCaseScoreboard(slide);
      return;
    }
  }
  const promptEvolPrev = slide.querySelector('.prompt-evolution');
  if (promptEvolPrev) {
    const done = Array.from(promptEvolPrev.querySelectorAll('.prompt-text')).filter(t => t.dataset.done);
    if (done.length > 0) {
      const last = done[done.length - 1];
      last.textContent = '';
      last.classList.remove('typing');
      delete last.dataset.done;
      return;
    }
  }
  goTo(current - 1);
}

function typewritePrompt(el) {
  const text = el.dataset.prompt || '';
  el.classList.add('typing');
  el.textContent = '';
  let i = 0;
  function step() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(step, 22 + Math.random() * 28);
    } else {
      el.classList.remove('typing');
      el.dataset.done = 'true';
    }
  }
  step();
}

function resetPromptEvolution(slide) {
  const evol = slide.querySelector('.prompt-evolution');
  if (!evol) return;
  evol.querySelectorAll('.prompt-text').forEach(t => {
    t.textContent = '';
    t.classList.remove('typing');
    delete t.dataset.done;
  });
}

function resetCaseSlide(slide) {
  slide.querySelectorAll('.case-questions li.revealed').forEach(q => q.classList.remove('revealed'));
  slide.querySelectorAll('.level-score').forEach(s => {
    s.classList.remove('has-points', 'leader');
    s.querySelectorAll('.pip.filled').forEach(p => p.classList.remove('filled'));
  });
  const result = slide.querySelector('.case-result');
  if (result) result.classList.remove('shown');
}

function updateCaseScoreboard(slide) {
  const revealed = slide.querySelectorAll('.case-questions li.revealed');
  const counts = {};
  revealed.forEach(q => {
    const targets = (q.dataset.pointsTo || '').split(',').map(s => s.trim()).filter(Boolean);
    targets.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
  });
  slide.querySelectorAll('.level-score').forEach(s => {
    const lvl = s.dataset.level;
    const n = counts[lvl] || 0;
    const pips = s.querySelectorAll('.pip');
    pips.forEach((p, i) => p.classList.toggle('filled', i < n));
    s.classList.toggle('has-points', n > 0);
  });
}

function markCaseLeader(slide) {
  const counts = {};
  slide.querySelectorAll('.level-score').forEach(s => {
    counts[s.dataset.level] = s.querySelectorAll('.pip.filled').length;
  });
  const max = Math.max(0, ...Object.values(counts));
  slide.querySelectorAll('.level-score').forEach(s => {
    const n = counts[s.dataset.level] || 0;
    s.classList.toggle('leader', max > 0 && n === max);
  });
}

function updateTimeline(slide) {
  const stops = slide.querySelectorAll('.timeline-stop');
  const dots = slide.querySelectorAll('.timeline-dot');
  const track = slide.querySelector('.timeline-track');
  const counter = slide.querySelector('.timeline-counter .cur-stop');
  const active = parseInt(slide.dataset.activeStop ?? '-1', 10);

  // Estado intro (active === -1): título + meter centralizados, nenhuma parada/foco ativo
  slide.classList.toggle('timeline-intro', active === -1);

  stops.forEach((s, i) => {
    s.classList.toggle('active', i === active);
    s.classList.toggle('passed', i < active && active >= 0);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === active);
    d.classList.toggle('passed', i < active && active >= 0);
  });
  if (counter) counter.textContent = active >= 0 ? String(active + 1).padStart(2, '0') : '00';

  if (active === -1) {
    // zera todas as barras do meter no intro
    const rows = slide.querySelectorAll('.focus-row');
    rows.forEach(row => {
      const fill = row.querySelector('.focus-row-fill');
      if (fill) fill.style.height = '0%';
      row.classList.remove('active');
    });
    return;
  }

  if (!track || !stops[active]) return;
  const viewport = track.parentElement;
  const stop = stops[active];
  const stopCenter = stop.offsetLeft + stop.offsetWidth / 2;
  const offset = (viewport.offsetWidth / 2) - stopCenter;
  track.style.transform = `translateX(${offset}px)`;

  const focusData = (stops[active].dataset.focus || '').split(',').map(n => parseFloat(n) || 0);
  if (focusData.length === 4) {
    const rows = slide.querySelectorAll('.focus-row');
    const maxVal = Math.max(...focusData);
    rows.forEach((row, i) => {
      const fill = row.querySelector('.focus-row-fill');
      if (fill) fill.style.height = focusData[i] + '%';
      row.classList.toggle('active', focusData[i] === maxVal && maxVal > 0);
    });
  }
}

function updateSpotlight(slide) {
  const cards = slide.querySelectorAll('.spotlight-card');
  const active = parseInt(slide.dataset.activeSpot ?? '-1', 10);
  cards.forEach((c, i) => c.classList.toggle('active', i === active));
}

function applyReveal() {
  const slide = slides[current];
  const bullets = slide.querySelectorAll('.bullets li, .phones .phone, .trio-cards .trio-card');
  if (slide.dataset.reveal === 'true') {
    bullets.forEach(b => b.classList.remove('revealed'));
  } else {
    bullets.forEach(b => b.classList.add('revealed'));
  }
}

function setSlideChrome() {
  slides.forEach((s, i) => {
    let num = s.querySelector('.slide-num');
    if (!num && s.dataset.type !== 'image' && s.dataset.type !== 'video') {
      num = document.createElement('div');
      num.className = 'slide-num';
      num.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      s.appendChild(num);
    }
    let brand = s.querySelector('.slide-brand');
    if (!brand && s.dataset.type !== 'cover' && s.dataset.type !== 'image' && s.dataset.type !== 'video' && s.dataset.type !== 'quote') {
      brand = document.createElement('div');
      brand.className = 'slide-brand';
      brand.textContent = 'Protótipo Funcional';
      s.appendChild(brand);
    }
  });
}

/* --- Teclado --- */
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
  const k = e.key.toLowerCase();
  if (k === 'arrowright' || k === ' ') { e.preventDefault(); next(); }
  else if (k === 'arrowleft') { e.preventDefault(); prev(); }
  else if (k === 'home') goTo(0);
  else if (k === 'end') goTo(total - 1);
  else if (k === 'g') toggleGrid();
  else if (k === 'f') toggleFullscreen();
  else if (k === 'd' && e.shiftKey) clearSlideDrawing();
  else if (k === 'd') toggleDraw();
  else if (document.body.classList.contains('drawing') && '12345678'.includes(k)) {
    const tools = { '1':'pen', '2':'highlighter', '3':'line', '4':'arrow', '5':'rect', '6':'ellipse', '7':'text', '8':'eraser' };
    setTool(tools[k]);
  }
  else if (document.body.classList.contains('drawing') && k === 'v') setTool('select');
  else if (document.body.classList.contains('drawing') && k === 'h') setTool('highlighter');
  else if (document.body.classList.contains('drawing') && (k === 'delete' || k === 'backspace') && selected) {
    e.preventDefault(); deleteSelected();
  }
  else if ((e.ctrlKey || e.metaKey) && k === 'z') { e.preventDefault(); undo(); }
  else if (k === 'l') toggleLaser();
  else if (k === 'n') toggleNotes();
  else if (k === 'e') toggleEditOnCurrent();
  else if (k === 'q') toggleQR();
  else if (k === 't') toggleTimer();
  else if (k === '?' || (e.shiftKey && k === '/')) toggleHelp();
  else if (k === 'escape') {
    if (document.body.classList.contains('drawing')) setTool('select');
    else closeOverlays();
  }
});

/* --- Botões --- */
document.getElementById('btnPrev').onclick = prev;
document.getElementById('btnNext').onclick = next;
document.getElementById('btnGrid').onclick = toggleGrid;
document.getElementById('btnHelp').onclick = toggleHelp;

/* --- Hash inicial --- */
function bootFromHash() {
  const h = parseInt(location.hash.replace('#', ''), 10);
  if (h && h >= 1 && h <= total) goTo(h - 1);
  else goTo(0);
}

/* --- Mostrar UI temporariamente ao mover mouse --- */
let uiTimer;
document.addEventListener('mousemove', () => {
  document.body.classList.add('show-ui');
  clearTimeout(uiTimer);
  uiTimer = setTimeout(() => document.body.classList.remove('show-ui'), 2500);
});

/* ============================================================
   GRADE VIEW
   ============================================================ */
const gridEl = document.getElementById('grid');
const gridWrap = document.getElementById('gridWrap');

function buildGrid() {
  gridWrap.innerHTML = '';
  slides.forEach((s, i) => {
    const t = document.createElement('div');
    t.className = 'grid-thumb';
    t.dataset.idx = i;
    const title = s.querySelector('h1, h2, blockquote')?.textContent.trim().slice(0, 80) || 'Sem título';
    t.innerHTML = `
      <span class="grid-thumb-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="grid-thumb-title">${title}</span>
      <span class="grid-thumb-type">${s.dataset.type || 'slide'}</span>
    `;
    t.onclick = () => { goTo(i); toggleGrid(false); };
    gridWrap.appendChild(t);
  });
}

function updateGridActive() {
  gridWrap.querySelectorAll('.grid-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === current);
  });
}

function toggleGrid(force) {
  const open = typeof force === 'boolean' ? force : !gridEl.classList.contains('open');
  gridEl.classList.toggle('open', open);
}

/* ============================================================
   FULLSCREEN
   ============================================================ */
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}

/* ============================================================
   DESENHO — engine estilo Excalidraw (select + resize + snap)
   ============================================================ */
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const cursorDot = document.getElementById('cursorDot');

let tool = 'pen';
let drawColor = '#D4F542';
const lineWidth = 4;
const shapeWidth = 3;
const highlightWidth = 22;
let shapeIdCounter = 0;

// Cada slide guarda seus próprios shapes (memória; perde ao refresh)
const shapesPerSlide = {};
function getShapes() {
  if (!shapesPerSlide[current]) shapesPerSlide[current] = [];
  return shapesPerSlide[current];
}
function shapesById(id) {
  return getShapes().find(s => s.id === id) || null;
}

let pointer = { active: false, start: null, currentPath: null, preview: null };
let selected = null;
let interaction = null;     // {type:'move'|'resize', handle, dragStart, shapeStart}
let snapTarget = null;      // id do shape sob snap durante draw

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function toggleDraw() {
  document.body.classList.toggle('drawing');
  if (!document.body.classList.contains('drawing')) {
    pointer.active = false;
    selected = null;
    interaction = null;
    render();
  }
}
function clearSlideDrawing() {
  shapesPerSlide[current] = [];
  selected = null;
  render();
}

/* ---- Render ---- */
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of getShapes()) drawShape(s);
  if (pointer.preview) drawShape(pointer.preview);
  renderSnapHighlight();
  renderSelection();
}

function drawShape(s) {
  ctx.save();
  ctx.strokeStyle = s.color;
  ctx.fillStyle = s.color;
  ctx.lineWidth = s.width || shapeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;

  if (s.type === 'pen') {
    if (s.points.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) ctx.lineTo(s.points[i].x, s.points[i].y);
      ctx.stroke();
    }
  } else if (s.type === 'highlighter') {
    if (s.points.length >= 2) {
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = s.width || highlightWidth;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) ctx.lineTo(s.points[i].x, s.points[i].y);
      ctx.stroke();
    }
  } else if (s.type === 'line') {
    const { start, end } = resolveEndpoints(s);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  } else if (s.type === 'arrow') {
    const { start, end } = resolveEndpoints(s);
    drawArrow(start, end, s.width || shapeWidth);
  } else if (s.type === 'rect') {
    const box = boxFromStartEnd(s);
    ctx.strokeRect(box.x, box.y, box.w, box.h);
  } else if (s.type === 'ellipse') {
    const box = boxFromStartEnd(s);
    if (box.w >= 1 && box.h >= 1) {
      ctx.beginPath();
      ctx.ellipse(box.x + box.w / 2, box.y + box.h / 2, box.w / 2, box.h / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (s.type === 'text') {
    ctx.font = `600 ${s.size || 28}px Geist, sans-serif`;
    ctx.textBaseline = 'top';
    ctx.fillText(s.text, s.pos.x, s.pos.y);
  }
  ctx.restore();
}

function drawArrow(a, b, w) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const len = Math.max(12, w * 4);
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(b.x - len * Math.cos(ang - Math.PI / 6), b.y - len * Math.sin(ang - Math.PI / 6));
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(b.x - len * Math.cos(ang + Math.PI / 6), b.y - len * Math.sin(ang + Math.PI / 6));
  ctx.stroke();
}

function boxFromStartEnd(s) {
  const x = Math.min(s.start.x, s.end.x), y = Math.min(s.start.y, s.end.y);
  return { x, y, w: Math.abs(s.end.x - s.start.x), h: Math.abs(s.end.y - s.start.y) };
}

function getShapeBox(s) {
  if (s.type === 'rect' || s.type === 'ellipse' || s.type === 'line' || s.type === 'arrow') {
    return boxFromStartEnd(s);
  }
  if (s.type === 'pen' || s.type === 'highlighter') {
    let mnX = Infinity, mnY = Infinity, mxX = -Infinity, mxY = -Infinity;
    for (const p of s.points) {
      if (p.x < mnX) mnX = p.x; if (p.y < mnY) mnY = p.y;
      if (p.x > mxX) mxX = p.x; if (p.y > mxY) mxY = p.y;
    }
    return { x: mnX, y: mnY, w: mxX - mnX, h: mxY - mnY };
  }
  if (s.type === 'text') {
    ctx.font = `600 ${s.size || 28}px Geist, sans-serif`;
    return { x: s.pos.x, y: s.pos.y, w: ctx.measureText(s.text).width, h: (s.size || 28) * 1.2 };
  }
  return { x: 0, y: 0, w: 0, h: 0 };
}

function centerOf(s) {
  if (!s) return { x: 0, y: 0 };
  const b = getShapeBox(s);
  return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
}

/* ---- Snap: resolução dinâmica de extremos de line/arrow ---- */
function resolveEndpoints(s) {
  let start = s.start, end = s.end;
  if (s.startBound) {
    const t = shapesById(s.startBound);
    if (t) {
      const toward = s.endBound ? centerOf(shapesById(s.endBound)) : end;
      start = connectionPoint(t, toward.x, toward.y);
    }
  }
  if (s.endBound) {
    const t = shapesById(s.endBound);
    if (t) {
      const toward = s.startBound ? centerOf(shapesById(s.startBound)) : start;
      end = connectionPoint(t, toward.x, toward.y);
    }
  }
  return { start, end };
}

function connectionPoint(shape, fromX, fromY) {
  const box = getShapeBox(shape);
  const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
  const dx = fromX - cx, dy = fromY - cy;
  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return { x: cx, y: cy };

  if (shape.type === 'ellipse') {
    const rx = Math.max(1, box.w / 2), ry = Math.max(1, box.h / 2);
    const denom = Math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry));
    return { x: cx + dx / denom, y: cy + dy / denom };
  }
  // box (rect, text)
  const halfW = Math.max(1, box.w / 2), halfH = Math.max(1, box.h / 2);
  const tx = Math.abs(dx) > 0.001 ? halfW / Math.abs(dx) : Infinity;
  const ty = Math.abs(dy) > 0.001 ? halfH / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty);
  return { x: cx + t * dx, y: cy + t * dy };
}

function findSnapTarget(x, y, excludeId) {
  const SNAP = 30;
  const shapes = getShapes();
  for (let i = shapes.length - 1; i >= 0; i--) {
    const s = shapes[i];
    if (!s.id || s.id === excludeId) continue;
    if (s.type !== 'rect' && s.type !== 'ellipse' && s.type !== 'text') continue;
    const box = getShapeBox(s);
    if (x >= box.x - SNAP && x <= box.x + box.w + SNAP &&
        y >= box.y - SNAP && y <= box.y + box.h + SNAP) {
      return s.id;
    }
  }
  return null;
}

/* ---- Seleção: handles, hit-test, render ---- */
function getHandles(s) {
  if (s.type === 'rect' || s.type === 'ellipse') {
    const x0 = Math.min(s.start.x, s.end.x), y0 = Math.min(s.start.y, s.end.y);
    const x1 = Math.max(s.start.x, s.end.x), y1 = Math.max(s.start.y, s.end.y);
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    return {
      nw: { x: x0, y: y0 }, n: { x: mx, y: y0 }, ne: { x: x1, y: y0 },
      w:  { x: x0, y: my },                       e:  { x: x1, y: my },
      sw: { x: x0, y: y1 }, s: { x: mx, y: y1 }, se: { x: x1, y: y1 }
    };
  }
  if (s.type === 'line' || s.type === 'arrow') {
    const { start, end } = resolveEndpoints(s);
    return { start, end };
  }
  return {};
}

function hitHandle(s, x, y) {
  const tol = 8;
  for (const [name, p] of Object.entries(getHandles(s))) {
    if (Math.abs(p.x - x) <= tol && Math.abs(p.y - y) <= tol) return name;
  }
  return null;
}

function hitTestShapes(x, y) {
  const shapes = getShapes();
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapeContains(shapes[i], x, y)) return shapes[i];
  }
  return null;
}

function renderSelection() {
  if (!selected) return;
  const box = getShapeBox(selected);
  ctx.save();
  ctx.strokeStyle = '#D4F542';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(box.x - 5, box.y - 5, box.w + 10, box.h + 10);
  ctx.setLineDash([]);

  const handles = getHandles(selected);
  ctx.fillStyle = '#1c1c1c';
  ctx.strokeStyle = '#D4F542';
  ctx.lineWidth = 2;
  for (const p of Object.values(handles)) {
    ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
    ctx.strokeRect(p.x - 5, p.y - 5, 10, 10);
  }
  ctx.restore();
}

function renderSnapHighlight() {
  if (!snapTarget) return;
  const t = shapesById(snapTarget);
  if (!t) return;
  const box = getShapeBox(t);
  ctx.save();
  ctx.strokeStyle = 'rgba(212,245,66,0.9)';
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(box.x - 6, box.y - 6, box.w + 12, box.h + 12);
  ctx.restore();
}

function cloneShape(s) { return JSON.parse(JSON.stringify(s)); }

function moveShape(s, original, dx, dy) {
  if (s.type === 'pen' || s.type === 'highlighter') {
    s.points = original.points.map(p => ({ x: p.x + dx, y: p.y + dy }));
  } else if (s.type === 'text') {
    s.pos = { x: original.pos.x + dx, y: original.pos.y + dy };
  } else {
    s.start = { x: original.start.x + dx, y: original.start.y + dy };
    s.end = { x: original.end.x + dx, y: original.end.y + dy };
  }
}

function resizeShape(s, original, handle, x, y) {
  if (s.type === 'line' || s.type === 'arrow') {
    if (handle === 'start') { s.start = { x, y }; delete s.startBound; }
    else if (handle === 'end') { s.end = { x, y }; delete s.endBound; }
  } else if (s.type === 'rect' || s.type === 'ellipse') {
    let x0 = Math.min(original.start.x, original.end.x);
    let y0 = Math.min(original.start.y, original.end.y);
    let x1 = Math.max(original.start.x, original.end.x);
    let y1 = Math.max(original.start.y, original.end.y);
    if (handle.includes('n')) y0 = y;
    if (handle.includes('s')) y1 = y;
    if (handle.includes('w')) x0 = x;
    if (handle.includes('e')) x1 = x;
    s.start = { x: x0, y: y0 };
    s.end = { x: x1, y: y1 };
  }
}

function handleCursor(h) {
  if (h === 'start' || h === 'end') return 'move';
  if (h === 'nw' || h === 'se') return 'nwse-resize';
  if (h === 'ne' || h === 'sw') return 'nesw-resize';
  if (h === 'n' || h === 's') return 'ns-resize';
  if (h === 'e' || h === 'w') return 'ew-resize';
  return 'default';
}

function updateSelectCursor(x, y) {
  if (interaction) return;
  let cur = 'default';
  if (selected) {
    const h = hitHandle(selected, x, y);
    if (h) cur = handleCursor(h);
    else if (shapeContains(selected, x, y)) cur = 'move';
  }
  if (cur === 'default' && hitTestShapes(x, y)) cur = 'move';
  canvas.style.cursor = cur;
}

/* ---- Pointer events ---- */
canvas.addEventListener('pointerdown', (e) => {
  if (!document.body.classList.contains('drawing')) return;
  const x = e.clientX, y = e.clientY;
  canvas.setPointerCapture(e.pointerId);

  if (tool === 'select') {
    if (selected) {
      const h = hitHandle(selected, x, y);
      if (h) {
        interaction = { type: 'resize', handle: h, dragStart: { x, y }, shapeStart: cloneShape(selected) };
        return;
      }
    }
    const hit = hitTestShapes(x, y);
    if (hit) {
      selected = hit;
      interaction = { type: 'move', dragStart: { x, y }, shapeStart: cloneShape(hit) };
    } else {
      selected = null;
    }
    render();
    return;
  }

  if (tool === 'text') { spawnTextInput(x, y); return; }
  if (tool === 'eraser') { eraseAt(x, y); return; }

  pointer.active = true;
  pointer.start = { x, y };

  if (tool === 'pen' || tool === 'highlighter') {
    pointer.currentPath = {
      type: tool, points: [{ x, y }], color: drawColor,
      width: tool === 'highlighter' ? highlightWidth : lineWidth
    };
    pointer.preview = pointer.currentPath;
  } else {
    pointer.preview = { type: tool, start: { x, y }, end: { x, y }, color: drawColor, width: shapeWidth };
    if (tool === 'line' || tool === 'arrow') {
      const t = findSnapTarget(x, y);
      if (t) pointer.preview.startBound = t;
    }
  }
  render();
});

canvas.addEventListener('pointermove', (e) => {
  updateCursorDot(e.clientX, e.clientY);

  if (tool === 'select') {
    updateSelectCursor(e.clientX, e.clientY);
    if (interaction && selected) {
      const dx = e.clientX - interaction.dragStart.x;
      const dy = e.clientY - interaction.dragStart.y;
      if (interaction.type === 'move') moveShape(selected, interaction.shapeStart, dx, dy);
      else if (interaction.type === 'resize') resizeShape(selected, interaction.shapeStart, interaction.handle, e.clientX, e.clientY);
      render();
    }
    return;
  }

  if (!pointer.active) return;

  if ((tool === 'pen' || tool === 'highlighter') && pointer.currentPath) {
    pointer.currentPath.points.push({ x: e.clientX, y: e.clientY });
  } else if (pointer.preview) {
    pointer.preview.end = { x: e.clientX, y: e.clientY };
    if (tool === 'line' || tool === 'arrow') {
      const t = findSnapTarget(e.clientX, e.clientY);
      snapTarget = t;
      if (t) pointer.preview.endBound = t;
      else delete pointer.preview.endBound;
    }
  }
  render();
});

function commitDraw() {
  if (tool === 'select') { interaction = null; return; }
  if (!pointer.active) return;
  pointer.active = false;
  if (pointer.preview) {
    const p = pointer.preview;
    const isShape = ['line', 'arrow', 'rect', 'ellipse'].includes(p.type);
    const degenerate = isShape && !p.startBound && !p.endBound &&
      Math.hypot(p.end.x - p.start.x, p.end.y - p.start.y) < 4;
    if (!degenerate) {
      p.id = ++shapeIdCounter;
      getShapes().push(p);
    }
  }
  pointer.preview = null;
  pointer.currentPath = null;
  snapTarget = null;
  render();
}
canvas.addEventListener('pointerup', commitDraw);

/* ---- Borracha (apaga shape sob o ponto) ---- */
function eraseAt(x, y) {
  const shapes = getShapes();
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapeContains(shapes[i], x, y)) {
      const removed = shapes[i];
      shapes.splice(i, 1);
      if (removed.id) {
        for (const s of shapes) {
          if (s.startBound === removed.id) delete s.startBound;
          if (s.endBound === removed.id) delete s.endBound;
        }
      }
      render();
      return;
    }
  }
}

function shapeContains(s, x, y) {
  const tol = 12;
  if (s.type === 'pen' || s.type === 'highlighter') {
    const r = s.type === 'highlighter' ? highlightWidth / 2 : tol;
    return s.points.some(p => Math.hypot(p.x - x, p.y - y) < r);
  }
  if (s.type === 'line' || s.type === 'arrow') {
    const { start, end } = resolveEndpoints(s);
    return distToSegment({ x, y }, start, end) < tol;
  }
  if (s.type === 'rect' || s.type === 'ellipse') {
    const box = boxFromStartEnd(s);
    if (s.type === 'ellipse') {
      const rx = Math.max(1, box.w / 2) + tol, ry = Math.max(1, box.h / 2) + tol;
      const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      return dx * dx + dy * dy <= 1.1;
    }
    return x >= box.x - tol && x <= box.x + box.w + tol && y >= box.y - tol && y <= box.y + box.h + tol;
  }
  if (s.type === 'text') {
    const box = getShapeBox(s);
    return x >= box.x - tol && x <= box.x + box.w + tol && y >= box.y - tol && y <= box.y + box.h + tol;
  }
  return false;
}
function distToSegment(p, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  if (dx === 0 && dy === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/* ---- Texto ---- */
function spawnTextInput(x, y) {
  const input = document.createElement('div');
  input.className = 'draw-text-input';
  input.style.left = x + 'px';
  input.style.top = y + 'px';
  input.style.color = drawColor;
  input.contentEditable = 'true';
  document.body.appendChild(input);
  setTimeout(() => input.focus(), 0);
  const commit = () => {
    const text = input.textContent.replace(/​/g, '').trim();
    if (text) getShapes().push({ id: ++shapeIdCounter, type: 'text', pos: { x, y }, text, color: drawColor, size: 28 });
    input.remove();
    render();
  };
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Escape') {
      e.preventDefault();
      input.blur();
    }
  });
}

/* ---- Cursor dot ---- */
function updateCursorDot(x, y) {
  if (tool === 'select') return;
  cursorDot.style.left = x + 'px';
  cursorDot.style.top = y + 'px';
  cursorDot.style.opacity = '1';
  if (tool === 'eraser') {
    Object.assign(cursorDot.style, { background: 'transparent', border: '2px solid #fff', width: '28px', height: '28px', borderRadius: '50%' });
  } else if (tool === 'text') {
    Object.assign(cursorDot.style, { background: drawColor, border: 'none', width: '3px', height: '24px', borderRadius: '1px' });
  } else if (tool === 'highlighter') {
    Object.assign(cursorDot.style, { background: drawColor, border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: highlightWidth + 'px', height: highlightWidth + 'px', opacity: '0.5' });
  } else {
    const size = (tool === 'pen' ? lineWidth : shapeWidth) * 2.6;
    Object.assign(cursorDot.style, { background: drawColor, border: 'none', borderRadius: '50%', width: size + 'px', height: size + 'px' });
  }
}

/* ---- Undo / Delete ---- */
function undo() {
  const shapes = getShapes();
  shapes.pop();
  selected = null;
  render();
}
function deleteSelected() {
  if (!selected) return;
  const shapes = getShapes();
  const idx = shapes.indexOf(selected);
  if (idx < 0) return;
  const removedId = selected.id;
  shapes.splice(idx, 1);
  if (removedId) {
    for (const s of shapes) {
      if (s.startBound === removedId) delete s.startBound;
      if (s.endBound === removedId) delete s.endBound;
    }
  }
  selected = null;
  render();
}

/* ---- Toolbar handlers ---- */
function setTool(t) {
  tool = t;
  document.body.classList.toggle('select-mode', t === 'select');
  document.querySelectorAll('#drawToolbar [data-tool]').forEach(b =>
    b.classList.toggle('active', b.dataset.tool === t)
  );
  if (t !== 'select') {
    selected = null;
    interaction = null;
  }
  canvas.style.cursor = '';
  render();
}
document.querySelectorAll('#drawToolbar [data-tool]').forEach(b => {
  b.onclick = () => setTool(b.dataset.tool);
});
document.querySelectorAll('#drawToolbar .swatch').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('#drawToolbar .swatch').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    drawColor = b.dataset.color;
    if (selected) { selected.color = drawColor; render(); }
  };
});
document.getElementById('drawUndo').onclick = undo;
document.getElementById('drawClear').onclick = clearSlideDrawing;
document.getElementById('drawClose').onclick = toggleDraw;

// Ao trocar de slide: renderiza shapes do novo slide
const _goTo = goTo;
goTo = function (i, o) { selected = null; interaction = null; _goTo(i, o); render(); };

/* ============================================================
   LASER POINTER — com rastro (estilo Google Slides)
   ============================================================ */
const laserCanvas = document.getElementById('laserCanvas');
const lctx = laserCanvas.getContext('2d');
function resizeLaser() {
  laserCanvas.width = window.innerWidth;
  laserCanvas.height = window.innerHeight;
}
resizeLaser();
window.addEventListener('resize', resizeLaser);

let laserPoints = [];
let laserAnimating = false;
const LASER_TTL = 700; // ms

function toggleLaser() {
  document.body.classList.toggle('laser');
  if (!document.body.classList.contains('laser')) {
    laserPoints = [];
    lctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
  }
}

document.addEventListener('pointermove', (e) => {
  if (!document.body.classList.contains('laser')) return;
  laserPoints.push({ x: e.clientX, y: e.clientY, t: performance.now() });
  if (laserPoints.length > 80) laserPoints.shift();
  if (!laserAnimating) { laserAnimating = true; requestAnimationFrame(animateLaser); }
});

function animateLaser() {
  const now = performance.now();
  laserPoints = laserPoints.filter(p => now - p.t < LASER_TTL);
  lctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);

  if (laserPoints.length === 0) {
    laserAnimating = false;
    return;
  }

  // Rastro: linhas conectadas com largura e opacidade decrescentes
  lctx.lineCap = 'round';
  lctx.lineJoin = 'round';
  for (let i = 1; i < laserPoints.length; i++) {
    const p0 = laserPoints[i - 1], p1 = laserPoints[i];
    const age = (now - p1.t) / LASER_TTL;
    const alpha = Math.pow(1 - age, 1.5);
    const width = (1 - age) * 10 + 1.5;
    lctx.strokeStyle = `rgba(212, 245, 66, ${alpha * 0.85})`;
    lctx.lineWidth = width;
    lctx.beginPath();
    lctx.moveTo(p0.x, p0.y);
    lctx.lineTo(p1.x, p1.y);
    lctx.stroke();
  }

  // Glow no rastro (passa de novo mais fino e branquinho)
  for (let i = 1; i < laserPoints.length; i++) {
    const p0 = laserPoints[i - 1], p1 = laserPoints[i];
    const age = (now - p1.t) / LASER_TTL;
    const alpha = Math.pow(1 - age, 2.5);
    lctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
    lctx.lineWidth = Math.max(0.5, (1 - age) * 3);
    lctx.beginPath();
    lctx.moveTo(p0.x, p0.y);
    lctx.lineTo(p1.x, p1.y);
    lctx.stroke();
  }

  // Cabeça do laser
  const head = laserPoints[laserPoints.length - 1];
  const headGrad = lctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22);
  headGrad.addColorStop(0, 'rgba(255,255,255,1)');
  headGrad.addColorStop(0.25, 'rgba(212,245,66,0.95)');
  headGrad.addColorStop(0.6, 'rgba(212,245,66,0.3)');
  headGrad.addColorStop(1, 'rgba(212,245,66,0)');
  lctx.fillStyle = headGrad;
  lctx.beginPath();
  lctx.arc(head.x, head.y, 22, 0, Math.PI * 2);
  lctx.fill();

  requestAnimationFrame(animateLaser);
}

/* ============================================================
   NOTAS DO PALESTRANTE
   ============================================================ */
const notesEl = document.getElementById('notes');
function toggleNotes() { notesEl.classList.toggle('open'); }
function updateNotes() {
  notesEl.querySelector('.notes-content').textContent = slides[current].dataset.notes || '';
}

/* ============================================================
   EDIÇÃO DE CÓDIGO AO VIVO
   ============================================================ */
function toggleEdit(btn) {
  const pre = btn.closest('.slide').querySelector('pre');
  if (!pre) return;
  const editing = pre.classList.toggle('editable');
  pre.setAttribute('contenteditable', editing);
  btn.classList.toggle('editing', editing);
  btn.textContent = editing ? 'Sair da edição' : 'Editar ao vivo (E)';
  if (editing) pre.focus();
  else if (window.Prism) Prism.highlightAllUnder(pre.parentElement);
}
function toggleEditOnCurrent() {
  const btn = slides[current].querySelector('.btn-edit');
  if (btn) toggleEdit(btn);
}

/* ============================================================
   QR CODE
   ============================================================ */
const qrEl = document.getElementById('qr');
function toggleQR() {
  qrEl.classList.toggle('open');
  updateQR();
}
function updateQR() {
  if (!qrEl.classList.contains('open')) return;
  const url = location.href;
  qrEl.querySelector('img').src =
    'https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=' + encodeURIComponent(url);
}

/* ============================================================
   TIMER DE EXERCÍCIO
   ============================================================ */
const timerEl = document.getElementById('timer');
const timeDisplay = timerEl.querySelector('.time');
let timerSeconds = 300;
let timerInterval = null;
let timerPaused = false;

function formatTime(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

function toggleTimer() {
  if (timerEl.classList.contains('open')) {
    closeTimer();
  } else {
    startTimer(300);
  }
}

function startTimer(seconds) {
  timerSeconds = seconds;
  timerPaused = false;
  timerEl.classList.add('open');
  timerEl.classList.remove('warning', 'done');
  timeDisplay.textContent = formatTime(timerSeconds);
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timerPaused) return;
    timerSeconds--;
    timeDisplay.textContent = formatTime(Math.max(0, timerSeconds));
    if (timerSeconds <= 30) timerEl.classList.add('warning');
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerEl.classList.remove('warning');
      timerEl.classList.add('done');
    }
  }, 1000);
}

function closeTimer() {
  clearInterval(timerInterval);
  timerEl.classList.remove('open', 'warning', 'done');
}

document.getElementById('timerToggle').onclick = () => { timerPaused = !timerPaused; };
document.getElementById('timerClose').onclick = closeTimer;

/* ============================================================
   CHEATSHEET / OVERLAYS
   ============================================================ */
const helpEl = document.getElementById('cheatsheet');
function toggleHelp() { helpEl.classList.toggle('open'); }
function closeOverlays() {
  helpEl.classList.remove('open');
  gridEl.classList.remove('open');
  notesEl.classList.remove('open');
  qrEl.classList.remove('open');
  // Modo desenho NÃO sai com Esc — só com D ou pelo botão X (Esc volta pra mão)
  if (document.body.classList.contains('laser')) toggleLaser();
}

/* ============================================================
   BOOT
   ============================================================ */
setSlideChrome();
buildGrid();
bootFromHash();
window.addEventListener('hashchange', bootFromHash);

// Prism re-highlight after dom is built
if (window.Prism) Prism.highlightAll();
