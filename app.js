// ═══════════════════════════════════════════
//  ÉTAT
// ═══════════════════════════════════════════

let currentChapter = 1;
let selectedVerses  = {};   // { "1:3": { chap, verse, text } }
let highlightColors = {};   // { "1:3": "#hexcolor" }

const COLORS = [
  { hex: '#F5C518', label: 'Or'     },
  { hex: '#48BB78', label: 'Vert'   },
  { hex: '#4299E1', label: 'Bleu'   },
  { hex: '#FC8181', label: 'Rouge'  },
  { hex: '#B794F4', label: 'Violet' },
  { hex: '#F6AD55', label: 'Orange' },
  { hex: '#F687B3', label: 'Rose'   },
];

let lacunesDiff = 'facile';
let lacunesCards = [];     // tableau de tokens par verset
let lacunesIndex = 0;

let recitCards = [];       // [{chap, verse, text}, ...]
let recitIndex = 0;
let recitLevel = 0;        // 0=complet 1=indices 2=mi-masqué 3=tout masqué
let recitRevealed = false;

// ═══════════════════════════════════════════
//  LOCALSTORAGE
// ═══════════════════════════════════════════

function loadSelected() {
  try {
    selectedVerses  = JSON.parse(localStorage.getItem('apoc_selected')    || '{}');
    highlightColors = JSON.parse(localStorage.getItem('apoc_highlights')  || '{}');
  } catch (e) {
    selectedVerses = {}; highlightColors = {};
  }
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function applyHighlight(row, color) {
  if (!color) {
    row.style.backgroundColor = '';
    row.style.borderLeftColor = '';
    row.classList.remove('hl');
  } else {
    row.style.backgroundColor = hexToRgba(color, 0.13);
    row.style.borderLeftColor = color;
    row.classList.add('hl');
  }
}

function setHighlight(key, color) {
  if (color === null) {
    delete highlightColors[key];
  } else {
    highlightColors[key] = color;
  }
  localStorage.setItem('apoc_highlights', JSON.stringify(highlightColors));

  const row = document.getElementById(`vrow-${key}`);
  if (!row) return;
  applyHighlight(row, color || null);

  // Mettre à jour l'état actif des dots
  row.querySelectorAll('.color-dot[data-color]').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === color);
  });
}

function saveSelected() {
  localStorage.setItem('apoc_selected', JSON.stringify(selectedVerses));
  updateBadge();
}

function updateBadge() {
  const count = Object.keys(selectedVerses).length;
  document.getElementById('selection-badge').textContent = count;
  const tb = document.getElementById('topbar-badge');
  if (count > 0) {
    tb.innerHTML = `<span class="badge">${count} versets</span>`;
  } else {
    tb.innerHTML = '';
  }
  const statEl = document.getElementById('stat-selected');
  if (statEl) statEl.textContent = count;
}

// ═══════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════

function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-chapter]').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add('active');

  const titles = { home:'Accueil', lecture:'Lecture', selection:'Mes versets', lacunes:'Texte à trou', recitation:'Récitation' };
  document.getElementById('topbar-title').textContent = (titles[pageId] || 'Apocalypse') + ' — LSG';

  if (pageId === 'selection') renderSelectionPage();
  if (pageId === 'lacunes')   renderLacunesSetup();
  if (pageId === 'recitation') renderRecitationSetup();

  closeSidebar();
  window.scrollTo(0, 0);
}

function navigateToChapter(num) {
  currentChapter = num;
  renderChapter(num);

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('page-lecture').classList.add('active');
  const navCh = document.querySelector(`.nav-item[data-chapter="${num}"]`);
  if (navCh) navCh.classList.add('active');

  document.getElementById('topbar-title').textContent = `Chapitre ${num} — LSG`;
  closeSidebar();
  window.scrollTo(0, 0);
}

function changeChapter(delta) {
  const next = currentChapter + delta;
  if (next >= 1 && next <= 22) navigateToChapter(next);
}

// ═══════════════════════════════════════════
//  SIDEBAR
// ═══════════════════════════════════════════

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('visible');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', () => navigateTo(item.dataset.page));
});

function buildChaptersNav() {
  const container = document.getElementById('chapters-nav');
  APOCALYPSE_LSG.chapitres.forEach(ch => {
    const div = document.createElement('div');
    div.className = 'nav-item';
    div.dataset.chapter = ch.numero;
    div.innerHTML = `
      <span class="nav-icon" style="font-size:11px;font-family:'Inter',sans-serif;color:var(--indigo);font-weight:700;">${ch.numero}</span>
      <span style="flex:1;font-size:13px;">${ch.titre}</span>
    `;
    div.addEventListener('click', () => navigateToChapter(ch.numero));
    container.appendChild(div);
  });
}

// ═══════════════════════════════════════════
//  LECTURE
// ═══════════════════════════════════════════

function renderChapter(num) {
  const ch = APOCALYPSE_LSG.chapitres[num - 1];
  if (!ch) return;

  document.getElementById('ch-number').textContent = `Chapitre ${ch.numero} / 22`;
  document.getElementById('ch-title').textContent   = ch.titre;
  document.getElementById('ch-theme').textContent   = ch.theme;
  document.getElementById('ch-counter').textContent = `${ch.versets.length} versets`;

  const container = document.getElementById('ch-versets');
  container.innerHTML = '';

  ch.versets.forEach(v => {
    const key    = `${ch.numero}:${v.n}`;
    const isSel  = !!selectedVerses[key];
    const hlColor = highlightColors[key] || null;

    // ── Ligne du verset ──
    const row = document.createElement('div');
    row.className = 'verse-row' + (isSel ? ' selected' : '');
    row.id = `vrow-${key}`;
    if (hlColor) applyHighlight(row, hlColor);

    // ── Checkbox ──
    const label = document.createElement('label');
    label.className = 'verse-check';
    label.title = 'Sélectionner pour écouter';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'vc-input';
    input.checked = isSel;
    input.addEventListener('change', () => toggleVerseSelection(ch.numero, v.n, v.t));

    const box = document.createElement('span');
    box.className = 'vc-box';
    label.appendChild(input);
    label.appendChild(box);

    // ── Bouton audio ──
    const audioBtn = document.createElement('button');
    audioBtn.className = 'verse-audio-btn';
    audioBtn.title = 'Écouter depuis ce verset';
    audioBtn.textContent = '▶';
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playFromVerse(ch.numero, v.n);
    });

    // ── Numéro ──
    const numEl = document.createElement('span');
    numEl.className = 'verse-num';
    numEl.textContent = v.n;

    // ── Texte ──
    const textEl = document.createElement('span');
    textEl.className = 'verse-text';
    textEl.textContent = v.t;

    // ── Palette de couleurs ──
    const colorsDiv = document.createElement('div');
    colorsDiv.className = 'verse-colors';

    COLORS.forEach(c => {
      const dot = document.createElement('button');
      dot.className = 'color-dot' + (hlColor === c.hex ? ' active' : '');
      dot.style.background = c.hex;
      dot.dataset.color = c.hex;
      dot.title = c.label;
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        setHighlight(key, hlColor === c.hex ? null : c.hex);
      });
      colorsDiv.appendChild(dot);
    });

    // Bouton effacer la couleur
    const eraseBtn = document.createElement('button');
    eraseBtn.className = 'color-dot erase';
    eraseBtn.title = 'Effacer la couleur';
    eraseBtn.textContent = '✕';
    eraseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setHighlight(key, null);
    });
    colorsDiv.appendChild(eraseBtn);

    row.appendChild(label);
    row.appendChild(audioBtn);
    row.appendChild(numEl);
    row.appendChild(textEl);
    row.appendChild(colorsDiv);
    container.appendChild(row);
  });

  document.getElementById('btn-prev').disabled = num === 1;
  document.getElementById('btn-next').disabled = num === 22;
}

function toggleVerseSelection(chNum, vNum, text) {
  const key = `${chNum}:${vNum}`;
  if (selectedVerses[key]) {
    delete selectedVerses[key];
  } else {
    selectedVerses[key] = { chap: chNum, verse: vNum, text };
  }
  saveSelected();

  const row = document.getElementById(`vrow-${key}`);
  if (!row) return;
  const isSel = !!selectedVerses[key];
  row.classList.toggle('selected', isSel);

  // Synchroniser la checkbox
  const cb = row.querySelector('.vc-input');
  if (cb) cb.checked = isSel;
}

// ═══════════════════════════════════════════
//  MES VERSETS
// ═══════════════════════════════════════════

function renderSelectionPage() {
  const list = document.getElementById('selection-list');
  const intro = document.getElementById('selection-intro');
  const actions = document.getElementById('selection-actions');
  list.innerHTML = '';

  const keys = Object.keys(selectedVerses);
  if (keys.length === 0) {
    intro.style.display = 'block';
    actions.style.display = 'none';
    return;
  }
  intro.style.display = 'none';
  actions.style.display = 'flex';

  // Grouper par chapitre
  const byChap = {};
  keys.forEach(k => {
    const v = selectedVerses[k];
    if (!byChap[v.chap]) byChap[v.chap] = [];
    byChap[v.chap].push({ key: k, verse: v.verse, text: v.text });
  });

  Object.keys(byChap).sort((a, b) => +a - +b).forEach(chNum => {
    const ch = APOCALYPSE_LSG.chapitres[chNum - 1];
    const title = document.createElement('div');
    title.className = 'sel-group-title';
    title.textContent = `Chapitre ${chNum} — ${ch ? ch.titre : ''}`;
    list.appendChild(title);

    byChap[chNum].sort((a, b) => a.verse - b.verse).forEach(item => {
      const hlColor = highlightColors[item.key] || null;
      const row = document.createElement('div');
      row.className = 'sel-verse-row';
      if (hlColor) {
        row.style.borderLeftColor = hlColor;
        row.style.backgroundColor = hexToRgba(hlColor, 0.1);
      }
      row.innerHTML = `
        <span class="sel-ref" style="${hlColor ? `color:${hlColor}` : ''}">Ap ${chNum}:${item.verse}</span>
        <span class="sel-text">${item.text}</span>
        <button class="sel-remove" title="Retirer" onclick="removeVerse('${item.key}')">×</button>
      `;
      list.appendChild(row);
    });
  });
}

function removeVerse(key) {
  delete selectedVerses[key];
  saveSelected();
  renderSelectionPage();
}

function clearAllVerses() {
  if (!confirm('Effacer tous les versets sélectionnés ?')) return;
  selectedVerses = {};
  saveSelected();
  renderSelectionPage();
}

// ═══════════════════════════════════════════
//  TEXTE À TROU — SETUP
// ═══════════════════════════════════════════

function selectDiff(btn, diff) {
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  lacunesDiff = diff;
}

function renderLacunesSetup() {
  const keys = Object.keys(selectedVerses);
  const emptyEl = document.getElementById('lacunes-empty');
  const setupEl = document.getElementById('lacunes-setup');
  const exerEl  = document.getElementById('lacunes-exercise');

  exerEl.style.display = 'none';
  setupEl.style.display = 'block';

  if (keys.length === 0) {
    emptyEl.style.display = 'block';
    document.getElementById('lacunes-start-btn').style.display = 'none';
    document.getElementById('lacunes-difficulty').style.display = 'none';
  } else {
    emptyEl.style.display = 'none';
    document.getElementById('lacunes-start-btn').style.display = 'inline-block';
    document.getElementById('lacunes-difficulty').style.display = 'flex';
  }
}

function startLacunes() {
  const keys = Object.keys(selectedVerses);
  if (keys.length === 0) return;

  // Trier par chapitre puis verset
  const sorted = keys
    .map(k => selectedVerses[k])
    .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);

  lacunesCards = sorted.map(v => ({
    ref: `Ap ${v.chap}:${v.verse}`,
    text: v.text,
    tokens: makeTokens(v.text, lacunesDiff)
  }));
  lacunesIndex = 0;

  document.getElementById('lacunes-setup').style.display = 'none';
  document.getElementById('lacunes-exercise').style.display = 'block';

  renderLacunesCard();
}

// ═══════════════════════════════════════════
//  TEXTE À TROU — LOGIQUE
// ═══════════════════════════════════════════

const STOP_WORDS = new Set([
  'une','dans','avec','pour','mais','donc','puis','lors','dont',
  'ceux','cela','tout','tous','leur','leurs','cette','comme','aussi',
  'plus','bien','même','très','autre','voici','voilà','cest','cest',
  'était','avait','sera','seront','furent','avaient','soient',
  'leurs','leur','avez','avons','comme','ainsi','parce','selon',
  'afin','donc','puis','encore','toute','toutes','celui','celles'
]);

function makeTokens(text, diff) {
  // fréquence : facile=1/4, moyen=1/3, difficile=1/2
  const freq = diff === 'facile' ? 4 : diff === 'moyen' ? 3 : 2;
  const words = text.split(' ');
  let contentIdx = 0;

  return words.map(word => {
    const clean = word.replace(/[,;:.!?'"()\-«»]/g, '').toLowerCase();
    const isContent = clean.length >= 5 && !STOP_WORDS.has(clean) && /[a-zA-ZÀ-ÿ]/.test(clean);

    if (isContent) {
      contentIdx++;
      if (contentIdx % freq === 0) {
        return { blank: true, original: word, clean };
      }
    }
    return { blank: false, original: word };
  });
}

function renderLacunesCard() {
  if (lacunesIndex < 0 || lacunesIndex >= lacunesCards.length) return;
  const card = lacunesCards[lacunesIndex];

  document.getElementById('lacunes-ref').textContent = card.ref;
  document.getElementById('lacunes-progress-txt').textContent =
    `${lacunesIndex + 1} / ${lacunesCards.length}`;
  document.getElementById('lacunes-feedback').classList.remove('visible');
  document.getElementById('lacunes-feedback').textContent = '';

  const display = document.getElementById('lacunes-verse-display');
  display.innerHTML = '';

  card.tokens.forEach((tok, i) => {
    if (tok.blank) {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'blank-input';
      inp.dataset.index = i;
      inp.dataset.answer = tok.clean;
      // Taille proportionnelle au mot
      inp.style.width = Math.max(60, tok.clean.length * 11) + 'px';
      inp.placeholder = '·'.repeat(Math.min(tok.clean.length, 6));
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkLacunes(); });
      display.appendChild(inp);
    } else {
      display.appendChild(document.createTextNode(tok.original));
    }
    if (i < card.tokens.length - 1) display.appendChild(document.createTextNode(' '));
  });

  // Boutons navigation
  document.getElementById('lacunes-prev').disabled = lacunesIndex === 0;
  document.getElementById('lacunes-next').disabled = lacunesIndex === lacunesCards.length - 1;
}

function checkLacunes() {
  const inputs = document.querySelectorAll('.blank-input');
  let correct = 0, total = inputs.length;
  if (total === 0) return;

  inputs.forEach(inp => {
    const answer = inp.dataset.answer;
    const given = inp.value.trim().toLowerCase().replace(/[,;:.!?'"()\-«»]/g, '');
    inp.classList.remove('correct', 'wrong');
    if (given === answer) {
      inp.classList.add('correct');
      correct++;
    } else {
      inp.classList.add('wrong');
    }
  });

  const fb = document.getElementById('lacunes-feedback');
  if (correct === total) {
    fb.textContent = `✓ Parfait ! Tous les ${total} mots sont corrects.`;
  } else {
    fb.textContent = `${correct} / ${total} corrects. Les mots en rouge sont incorrects.`;
  }
  fb.classList.add('visible');
}

function revealLacunes() {
  const inputs = document.querySelectorAll('.blank-input');
  inputs.forEach(inp => {
    const card = lacunesCards[lacunesIndex];
    const idx = +inp.dataset.index;
    inp.value = card.tokens[idx].clean;
    inp.classList.remove('correct', 'wrong');
    inp.classList.add('revealed');
    inp.disabled = true;
  });
  const fb = document.getElementById('lacunes-feedback');
  fb.textContent = 'Réponses révélées. Lisez attentivement pour mémoriser.';
  fb.classList.add('visible');
}

function resetLacunesCard() {
  renderLacunesCard();
}

function changeLacunesCard(delta) {
  const next = lacunesIndex + delta;
  if (next >= 0 && next < lacunesCards.length) {
    lacunesIndex = next;
    renderLacunesCard();
    window.scrollTo(0, 0);
  }
}

// ═══════════════════════════════════════════
//  RÉCITATION
// ═══════════════════════════════════════════

function renderRecitationSetup() {
  const keys = Object.keys(selectedVerses);
  const emptyEl = document.getElementById('recitation-empty');
  const bodyEl  = document.getElementById('recitation-body');

  if (keys.length === 0) {
    emptyEl.style.display = 'block';
    bodyEl.style.display  = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  bodyEl.style.display  = 'block';

  recitCards = Object.values(selectedVerses)
    .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);

  recitIndex = 0;
  recitLevel = 0;
  recitRevealed = false;

  document.querySelectorAll('.level-btn').forEach(b => {
    b.classList.toggle('active', +b.dataset.level === 0);
  });

  renderRecitCard();
}

function setLevel(n) {
  recitLevel = n;
  recitRevealed = false;
  document.querySelectorAll('.level-btn').forEach(b => {
    b.classList.toggle('active', +b.dataset.level === n);
  });
  renderRecitCard();
}

function changeRecitCard(delta) {
  const next = recitIndex + delta;
  if (next >= 0 && next < recitCards.length) {
    recitIndex = next;
    recitRevealed = false;
    renderRecitCard();
    window.scrollTo(0, 0);
  }
}

function toggleReveal() {
  recitRevealed = !recitRevealed;
  renderRecitCard();
}

function renderRecitCard() {
  if (!recitCards.length) return;
  const v = recitCards[recitIndex];

  document.getElementById('recitation-ref').textContent =
    `Apocalypse ${v.chap}:${v.verse}`;

  document.getElementById('recit-counter').textContent =
    `${recitIndex + 1} / ${recitCards.length}`;

  document.getElementById('recit-prev').disabled = recitIndex === 0;
  document.getElementById('recit-next').disabled = recitIndex === recitCards.length - 1;

  const revBtn = document.getElementById('reveal-btn');
  revBtn.style.display = recitLevel > 0 ? 'inline-block' : 'none';
  revBtn.textContent = recitRevealed ? 'Masquer à nouveau' : 'Révéler le texte';

  const textEl = document.getElementById('recitation-text');
  if (recitRevealed) {
    textEl.innerHTML = escapeHtml(v.text);
    return;
  }

  if (recitLevel === 0) {
    textEl.innerHTML = escapeHtml(v.text);
  } else {
    textEl.innerHTML = maskText(v.text, recitLevel);
  }
}

function maskText(text, level) {
  const words = text.split(' ');

  // Identifier les mots de contenu (≥4 chars, non stop words)
  const isContent = words.map(w => {
    const clean = w.replace(/[,;:.!?'"()\-«»]/g, '').toLowerCase();
    return clean.length >= 4 && !STOP_WORDS.has(clean) && /[a-zA-ZÀ-ÿ]/.test(clean);
  });

  const contentIndices = words
    .map((_, i) => i)
    .filter(i => isContent[i]);

  let hideSet = new Set();

  if (level === 1) {
    // ~1/3 des mots de contenu → indices (première lettre)
    const step = Math.ceil(contentIndices.length / 3);
    contentIndices.filter((_, i) => i % 3 === 1).forEach(i => hideSet.add(i));
  } else if (level === 2) {
    // ~2/3 des mots de contenu → masqués complètement
    contentIndices.filter((_, i) => i % 3 !== 0).forEach(i => hideSet.add(i));
  } else if (level === 3) {
    // Tout masqué
    contentIndices.forEach(i => hideSet.add(i));
  }

  return words.map((word, i) => {
    if (!hideSet.has(i)) return escapeHtml(word);

    const clean = word.replace(/[,;:.!?'"()\-«»]/g, '');
    const punct = word.slice(clean.length);

    if (level === 1) {
      // Première lettre + tirets
      const hint = clean[0] + '_ '.repeat(Math.max(1, Math.floor(clean.length / 2))).trim();
      return `<span class="hint-word">${escapeHtml(hint)}${escapeHtml(punct)}</span>`;
    } else {
      // Bloc masqué de la taille du mot
      const dashes = '—'.repeat(Math.max(2, Math.ceil(clean.length * 0.6)));
      return `<span class="masked-word">${dashes}${escapeHtml(punct)}</span>`;
    }
  }).join(' ');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ═══════════════════════════════════════════
//  AUDIO / TEXT-TO-SPEECH
// ═══════════════════════════════════════════

const SYNTH = window.speechSynthesis;
let audioVoice = null;
let audioQueue  = [];   // [{chap, verse, text, ref}, ...]
let audioIndex  = 0;
let audioActive = false;
let audioPaused = false;
let audioRate   = 0.9;

function loadVoices() {
  const voices = SYNTH.getVoices();
  // Chercher une voix française de qualité
  audioVoice =
    voices.find(v => v.lang === 'fr-FR' && v.localService) ||
    voices.find(v => v.lang === 'fr-FR') ||
    voices.find(v => v.lang.startsWith('fr')) ||
    null;
}

if (typeof SYNTH.onvoiceschanged !== 'undefined') {
  SYNTH.onvoiceschanged = loadVoices;
}
loadVoices();

// ── Lancement d'une file de versets ──
function audioPlay(queue, startIndex) {
  SYNTH.cancel();
  audioQueue  = queue;
  audioIndex  = startIndex || 0;
  audioActive = true;
  audioPaused = false;
  showPlayerBar();
  speakCurrent();
}

function speakCurrent() {
  if (!audioActive || audioIndex >= audioQueue.length) {
    audioStop();
    return;
  }

  const item = audioQueue[audioIndex];
  const utt = new SpeechSynthesisUtterance(item.text);
  utt.lang  = 'fr-FR';
  utt.rate  = audioRate;
  if (audioVoice) utt.voice = audioVoice;

  utt.onstart = () => {
    updatePlayerBar(item);
    setVerseSpeaking(item.chap, item.verse, true);
  };

  utt.onend = () => {
    setVerseSpeaking(item.chap, item.verse, false);
    audioIndex++;
    speakCurrent();
  };

  utt.onerror = (e) => {
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      setVerseSpeaking(item.chap, item.verse, false);
      audioIndex++;
      speakCurrent();
    }
  };

  SYNTH.speak(utt);
  updatePlayerUI();
}

// ── Contrôles ──
function audioToggle() {
  if (!audioActive) return;
  if (SYNTH.paused) {
    SYNTH.resume();
    audioPaused = false;
  } else {
    SYNTH.pause();
    audioPaused = true;
  }
  updatePlayerUI();
}

function audioStop() {
  SYNTH.cancel();
  audioActive = false;
  audioPaused = false;
  audioQueue  = [];
  document.querySelectorAll('.verse-row.speaking').forEach(el => el.classList.remove('speaking'));
  hidePlayerBar();
  updatePlayerUI();
}

function audioSkip(delta) {
  if (!audioActive) return;
  SYNTH.cancel();
  const item = audioQueue[audioIndex];
  if (item) setVerseSpeaking(item.chap, item.verse, false);
  audioIndex = Math.max(0, Math.min(audioQueue.length - 1, audioIndex + delta));
  speakCurrent();
}

function setAudioRate(r) {
  audioRate = r;
  document.querySelectorAll('.rate-btn').forEach(b => {
    b.classList.toggle('active', +b.dataset.rate === r);
  });
  if (audioActive) {
    SYNTH.cancel();
    speakCurrent();
  }
}

// ── Mise en évidence du verset lu ──
function setVerseSpeaking(chap, verse, on) {
  const el = document.getElementById(`vrow-${chap}:${verse}`);
  if (el) {
    el.classList.toggle('speaking', on);
    if (on) el.scrollIntoView({ behavior:'smooth', block:'center' });
  }
}

// ── Player bar UI ──
function showPlayerBar() {
  document.getElementById('player-bar').style.display = 'flex';
  document.body.classList.add('player-open');
}

function hidePlayerBar() {
  document.getElementById('player-bar').style.display = 'none';
  document.body.classList.remove('player-open');
}

function updatePlayerBar(item) {
  document.getElementById('player-ref').textContent = item.ref;
  document.getElementById('player-counter').textContent =
    `${audioIndex + 1} / ${audioQueue.length}`;
  const prev = item.text.length > 70 ? item.text.slice(0, 70) + '…' : item.text;
  document.getElementById('player-preview').textContent = prev;
}

function updatePlayerUI() {
  const btn = document.getElementById('player-play');
  if (!btn) return;
  btn.textContent = audioPaused ? '▶' : '⏸';
  btn.title = audioPaused ? 'Reprendre' : 'Pause';
}

// ── Fonctions de lancement ──

// Lire un chapitre depuis un verset précis
function playFromVerse(chNum, vNum) {
  const ch = APOCALYPSE_LSG.chapitres[chNum - 1];
  if (!ch) return;
  const start = ch.versets.findIndex(v => v.n === vNum);
  const queue = ch.versets.slice(start >= 0 ? start : 0).map(v => ({
    chap: chNum, verse: v.n, text: v.t, ref: `Ap ${chNum}:${v.n}`
  }));
  audioPlay(queue, 0);
}

// Lire tout le chapitre
function playChapter(chNum) {
  const ch = APOCALYPSE_LSG.chapitres[chNum - 1];
  if (!ch) return;
  const queue = ch.versets.map(v => ({
    chap: chNum, verse: v.n, text: v.t, ref: `Ap ${chNum}:${v.n}`
  }));
  audioPlay(queue, 0);
}

// Lire les versets sélectionnés
function playSelected() {
  const items = Object.values(selectedVerses)
    .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);
  if (!items.length) return;
  const queue = items.map(v => ({
    chap: v.chap, verse: v.verse, text: v.text, ref: `Ap ${v.chap}:${v.verse}`
  }));
  audioPlay(queue, 0);
}

// ═══════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════

function init() {
  loadSelected();
  buildChaptersNav();
  renderChapter(1);
  updateBadge();
}

init();
