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
