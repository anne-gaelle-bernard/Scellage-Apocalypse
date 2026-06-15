export const STOP_WORDS = new Set([
  'une','dans','avec','pour','mais','donc','puis','lors','dont',
  'ceux','cela','tout','tous','leur','leurs','cette','comme','aussi',
  'plus','bien','même','très','autre','voici','voilà','cest',
  'était','avait','sera','seront','furent','avaient','soient',
  'avez','avons','ainsi','parce','selon','afin','encore',
  'toute','toutes','celui','celles',
]);

export function makeTokens(text, diff) {
  const freq = diff === 'facile' ? 4 : diff === 'moyen' ? 3 : 2;
  const words = text.split(' ');
  let contentIdx = 0;
  return words.map(word => {
    const clean = word.replace(/[,;:.!?'"()\-«»]/g, '').toLowerCase();
    const isContent = clean.length >= 5 && !STOP_WORDS.has(clean) && /[a-zA-ZÀ-ÿ]/.test(clean);
    if (isContent) {
      contentIdx++;
      if (contentIdx % freq === 0) return { blank: true, original: word, clean };
    }
    return { blank: false, original: word };
  });
}

export function maskText(text, level) {
  const words = text.split(' ');
  const isContent = words.map(w => {
    const clean = w.replace(/[,;:.!?'"()\-«»]/g, '').toLowerCase();
    return clean.length >= 4 && !STOP_WORDS.has(clean) && /[a-zA-ZÀ-ÿ]/.test(clean);
  });
  const contentIndices = words.map((_, i) => i).filter(i => isContent[i]);

  const hideSet = new Set();
  if (level === 1) {
    contentIndices.filter((_, i) => i % 3 === 1).forEach(i => hideSet.add(i));
  } else if (level === 2) {
    contentIndices.filter((_, i) => i % 3 !== 0).forEach(i => hideSet.add(i));
  } else if (level === 3) {
    contentIndices.forEach(i => hideSet.add(i));
  }

  return words.map((word, i) => {
    if (!hideSet.has(i)) return escapeHtml(word);
    const clean = word.replace(/[,;:.!?'"()\-«»]/g, '');
    const punct = word.slice(clean.length);
    if (level === 1) {
      const hint = clean[0] + '_ '.repeat(Math.max(1, Math.floor(clean.length / 2))).trim();
      return `<span class="hint-word">${escapeHtml(hint)}${escapeHtml(punct)}</span>`;
    }
    const dashes = '—'.repeat(Math.max(2, Math.ceil(clean.length * 0.6)));
    return `<span class="masked-word">${dashes}${escapeHtml(punct)}</span>`;
  }).join(' ');
}

export function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function firstLettersText(text) {
  return text.split(' ').map(word => {
    const letterMatch = word.match(/[a-zA-ZÀ-ÿ]/);
    if (!letterMatch) return word;
    const idx = word.indexOf(letterMatch[0]);
    const pre   = word.slice(0, idx);
    const letter = word[idx];
    const after  = word.slice(idx + 1).replace(/[a-zA-ZÀ-ÿ]/g, '_');
    return `<span class="fl-word">${escapeHtml(pre + letter)}<span class="fl-blanks">${escapeHtml(after)}</span></span>`;
  }).join(' ');
}

// ─── Text analysis (shared with DicteePage & RecitationPage) ───────────────

export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val = a[i - 1] === b[j - 1] ? row[j - 1] : 1 + Math.min(prev, row[j], row[j - 1]);
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }
  return row[b.length];
}

export function stripPunct(s) {
  return s.replace(/[.,;:!?«»""''''""\-—()…]/g, '');
}

export function normWord(s) {
  return stripPunct(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function alignWords(typedWords, origWords) {
  const m = typedWords.length, n = origWords.length;
  const eq = (t, o) => normWord(t) === normWord(o);
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = eq(typedWords[i - 1], origWords[j - 1])
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  const pairs = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && eq(typedWords[i - 1], origWords[j - 1])) {
      pairs.unshift({ typed: typedWords[i - 1], orig: origWords[j - 1] }); i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      pairs.unshift({ typed: null, orig: origWords[j - 1] }); j--;
    } else {
      pairs.unshift({ typed: typedWords[i - 1], orig: null }); i--;
    }
  }
  return pairs;
}

export function classifyPair({ typed, orig }) {
  if (!typed) return { kind: 'missing',     label: 'Mot manquant' };
  if (!orig)  return { kind: 'extra',       label: 'Mot en trop' };
  if (typed === orig) return { kind: 'correct', label: 'Correct' };
  const tStrip = stripPunct(typed), oStrip = stripPunct(orig);
  const tNorm  = normWord(typed),   oNorm  = normWord(orig);
  if (tStrip.toLowerCase() === oStrip.toLowerCase())
    return { kind: 'ponctuation', label: 'Ponctuation' };
  if (tNorm === oNorm)
    return { kind: 'accent', label: 'Accent / majuscule' };
  const dist = levenshtein(tNorm, oNorm);
  const maxLen = Math.max(tNorm.length || 1, oNorm.length || 1);
  if (dist <= Math.max(2, Math.ceil(maxLen * 0.4)))
    return { kind: 'orthographe', label: 'Orthographe' };
  let prefix = 0;
  while (prefix < tNorm.length && prefix < oNorm.length && tNorm[prefix] === oNorm[prefix]) prefix++;
  if (prefix >= 4) return { kind: 'conjugaison', label: 'Conjugaison / accord' };
  return { kind: 'vocabulaire', label: 'Vocabulaire / structure' };
}

export function analyzeInput(typed, original) {
  const typedWords = typed.trim().split(/\s+/).filter(Boolean);
  const origWords  = original.trim().split(/\s+/).filter(Boolean);
  return alignWords(typedWords, origWords).map(pair => ({ ...pair, error: classifyPair(pair) }));
}

export const KIND_CSS = {
  correct:     { bg: 'rgba(22,163,74,.12)',   border: 'rgba(22,163,74,.3)',   color: '#15803d' },
  accent:      { bg: 'rgba(217,119,6,.14)',   border: 'rgba(217,119,6,.35)',  color: '#92400e' },
  orthographe: { bg: 'rgba(234,88,12,.13)',   border: 'rgba(234,88,12,.35)',  color: '#9a3412' },
  ponctuation: { bg: 'rgba(37,99,235,.11)',   border: 'rgba(37,99,235,.3)',   color: '#1e40af' },
  conjugaison: { bg: 'rgba(147,51,234,.12)',  border: 'rgba(147,51,234,.3)',  color: '#6b21a8' },
  vocabulaire: { bg: 'rgba(220,38,38,.12)',   border: 'rgba(220,38,38,.3)',   color: '#991b1b' },
  missing:     { bg: 'rgba(185,28,28,.08)',   border: 'rgba(185,28,28,.25)',  color: '#b91c1c' },
  extra:       { bg: 'rgba(107,114,128,.10)', border: 'rgba(107,114,128,.25)',color: '#6b7280' },
};
