import React, { useState, useRef } from 'react';
import { useApp } from '../App';
import { Volume2, RefreshCw, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

// ─── Utilities ─────────────────────────────────────────────────────────────

function levenshtein(a, b) {
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

function stripPunct(s) {
  return s.replace(/[.,;:!?«»""''‘’“”\-—()…]/g, '');
}

function norm(s) {
  return stripPunct(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

// LCS-based alignment — matches on normalized equality
function alignWords(typedWords, origWords) {
  const m = typedWords.length, n = origWords.length;
  const eq = (t, o) => norm(t) === norm(o);
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
      pairs.unshift({ typed: typedWords[i - 1], orig: origWords[j - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      pairs.unshift({ typed: null, orig: origWords[j - 1] });
      j--;
    } else {
      pairs.unshift({ typed: typedWords[i - 1], orig: null });
      i--;
    }
  }
  return pairs;
}

function classifyPair({ typed, orig }) {
  if (!typed) return { kind: 'missing',  label: 'Mot manquant' };
  if (!orig)  return { kind: 'extra',    label: 'Mot en trop' };
  if (typed === orig) return { kind: 'correct', label: 'Correct' };

  const tStrip = stripPunct(typed), oStrip = stripPunct(orig);
  const tNorm  = norm(typed),        oNorm  = norm(orig);

  if (tStrip.toLowerCase() === oStrip.toLowerCase())
    return { kind: 'ponctuation', label: 'Ponctuation' };

  if (tNorm === oNorm)
    return { kind: 'accent', label: 'Accent / majuscule' };

  const dist = levenshtein(tNorm, oNorm);
  const maxLen = Math.max(tNorm.length || 1, oNorm.length || 1);
  if (dist <= Math.max(2, Math.ceil(maxLen * 0.4)))
    return { kind: 'orthographe', label: 'Orthographe' };

  // Shared prefix ≥ 4 chars → likely same root verb, conjugation/agreement issue
  let prefix = 0;
  while (prefix < tNorm.length && prefix < oNorm.length && tNorm[prefix] === oNorm[prefix]) prefix++;
  if (prefix >= 4)
    return { kind: 'conjugaison', label: 'Conjugaison / accord' };

  return { kind: 'vocabulaire', label: 'Vocabulaire / structure' };
}

function analyzeInput(typed, original) {
  const typedWords = typed.trim().split(/\s+/).filter(Boolean);
  const origWords  = original.trim().split(/\s+/).filter(Boolean);
  return alignWords(typedWords, origWords).map(pair => ({ ...pair, error: classifyPair(pair) }));
}

function countErrors(results) {
  const counts = {};
  for (const r of results) counts[r.error.kind] = (counts[r.error.kind] || 0) + 1;
  return counts;
}

// ─── Config ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { kind: 'correct',     label: 'Corrects',              color: '#16a34a' },
  { kind: 'accent',      label: 'Accent / majuscule',    color: '#d97706' },
  { kind: 'orthographe', label: 'Orthographe',           color: '#ea580c' },
  { kind: 'ponctuation', label: 'Ponctuation',           color: '#2563eb' },
  { kind: 'conjugaison', label: 'Conjugaison / accord',  color: '#9333ea' },
  { kind: 'vocabulaire', label: 'Vocabulaire / structure', color: '#dc2626' },
  { kind: 'missing',     label: 'Mots manquants',        color: '#b91c1c' },
  { kind: 'extra',       label: 'Mots en trop',          color: '#6b7280' },
];

const KIND_CSS = {
  correct:     { bg: 'rgba(22,163,74,.12)',   border: 'rgba(22,163,74,.3)',   color: '#15803d', underline: 'none' },
  accent:      { bg: 'rgba(217,119,6,.14)',   border: 'rgba(217,119,6,.35)',  color: '#92400e', underline: '2px solid #f59e0b' },
  orthographe: { bg: 'rgba(234,88,12,.13)',   border: 'rgba(234,88,12,.35)',  color: '#9a3412', underline: '2px dashed #f97316' },
  ponctuation: { bg: 'rgba(37,99,235,.11)',   border: 'rgba(37,99,235,.3)',   color: '#1e40af', underline: '2px dotted #3b82f6' },
  conjugaison: { bg: 'rgba(147,51,234,.12)',  border: 'rgba(147,51,234,.3)',  color: '#6b21a8', underline: '2px solid #a855f7' },
  vocabulaire: { bg: 'rgba(220,38,38,.12)',   border: 'rgba(220,38,38,.3)',   color: '#991b1b', underline: '2px solid #ef4444' },
  missing:     { bg: 'rgba(185,28,28,.08)',   border: 'rgba(185,28,28,.25)',  color: '#b91c1c', underline: 'none' },
  extra:       { bg: 'rgba(107,114,128,.10)', border: 'rgba(107,114,128,.25)',color: '#6b7280', underline: 'none' },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function DicteePage() {
  const { selectedVerses, navigate, play } = useApp();
  const cards = Object.values(selectedVerses)
    .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);

  const [idx, setIdx]           = useState(0);
  const [input, setInput]       = useState('');
  const [result, setResult]     = useState(null);
  const [showOrig, setShowOrig] = useState(false);
  const taRef = useRef(null);

  if (!cards.length) return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Entraînement dyslexie</span>
        <div className="training-header-title">Dictée guidée</div>
      </div>
      <div className="empty-msg">
        Aucun verset sélectionné.{' '}
        <span
          style={{ color: 'var(--action)', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('lecture')}
        >
          Allez lire et sélectionnez des versets →
        </span>
      </div>
    </>
  );

  const card  = cards[idx];
  const total = cards.length;

  function goTo(newIdx) {
    setIdx(newIdx);
    setInput('');
    setResult(null);
    setShowOrig(false);
    setTimeout(() => taRef.current?.focus(), 50);
  }

  function handleSpeak() {
    play([{ text: card.text, chap: card.chap, verse: card.verse, ref: `Ap ${card.chap}:${card.verse}` }], 0);
  }

  function handleSubmit() {
    if (!input.trim()) return;
    setResult(analyzeInput(input, card.text));
    setShowOrig(true);
  }

  const counts      = result ? countErrors(result) : null;
  const totalErrors = counts
    ? Object.entries(counts).filter(([k]) => k !== 'correct').reduce((s, [, v]) => s + v, 0)
    : 0;
  const score = result ? Math.round((counts.correct || 0) / result.length * 100) : null;

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Entraînement dyslexie</span>
        <div className="training-header-title">Dictée guidée</div>
        <p className="training-header-sub">
          Écoute le verset, écris-le, puis découvre tes erreurs par catégorie.
        </p>
      </div>

      {/* Verse navigator */}
      <div className="dictee-nav">
        <button className="dictee-nav-btn" onClick={() => goTo((idx - 1 + total) % total)} disabled={total <= 1}>
          <ChevronLeft size={16} />
        </button>
        <span className="dictee-nav-ref">Ap {card.chap}:{card.verse} &nbsp;·&nbsp; {idx + 1}/{total}</span>
        <button className="dictee-nav-btn" onClick={() => goTo((idx + 1) % total)} disabled={total <= 1}>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="dictee-card">

        {/* Listen button */}
        <button className="dictee-listen-btn" onClick={handleSpeak}>
          <Volume2 size={16} />
          {result ? 'Réécouter le verset' : 'Écouter le verset'}
        </button>

        {/* Show / hide original */}
        {showOrig && <p className="dictee-orig">{card.text}</p>}

        {!result ? (
          <>
            <label className="dictee-label">
              Écris le verset de mémoire :
            </label>
            <textarea
              ref={taRef}
              className="dictee-ta"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Tapez le verset ici…"
              rows={5}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
            />
            <div className="dictee-actions">
              <button className="btn-outline dictee-peek-btn" onClick={() => setShowOrig(v => !v)}>
                {showOrig ? <EyeOff size={14} /> : <Eye size={14} />}
                {showOrig ? 'Cacher le texte' : 'Voir le texte'}
              </button>
              <button className="btn-gold" onClick={handleSubmit} disabled={!input.trim()}>
                Corriger ✓
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Score */}
            <div className="dictee-score">
              <span className="dictee-score-n" style={{ color: score >= 80 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626' }}>
                {score} %
              </span>
              <span className="dictee-score-label">
                {score === 100 ? '🎉 Parfait !' : score >= 80 ? 'Très bien !' : score >= 50 ? 'Bien, continue !' : 'Continue à pratiquer'}
              </span>
            </div>

            {/* Word-by-word result */}
            <div className="dictee-result-words">
              {result.map((r, i) => {
                const css = KIND_CSS[r.error.kind] || KIND_CSS.correct;
                const tooltip = r.error.kind !== 'correct'
                  ? r.error.label + (r.orig && r.typed !== r.orig ? ` → « ${r.orig} »` : '')
                  : 'Correct';
                return (
                  <span
                    key={i}
                    className="dictee-word"
                    title={tooltip}
                    style={{
                      background: css.bg,
                      border: `1.5px solid ${css.border}`,
                      color: css.color,
                      textDecoration: css.underline !== 'none' ? css.underline : undefined,
                      textDecorationColor: undefined,
                    }}
                  >
                    {r.error.kind === 'missing'
                      ? <em className="dictee-missing-word">{r.orig}</em>
                      : r.error.kind === 'extra'
                        ? <s>{r.typed}</s>
                        : r.typed
                    }
                  </span>
                );
              })}
            </div>

            {/* Error categories */}
            {totalErrors > 0 && (
              <div className="dictee-cats">
                {CATEGORIES.filter(c => counts[c.kind] > 0).map(c => (
                  <div
                    key={c.kind}
                    className="dictee-cat"
                    style={{
                      background: c.color + '18',
                      border: `1.5px solid ${c.color}4a`,
                      color: c.color,
                    }}
                  >
                    <span className="dictee-cat-n">{counts[c.kind]}</span>
                    <span className="dictee-cat-label">{c.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Legend */}
            <details className="dictee-legend">
              <summary>Légende des couleurs</summary>
              <div className="dictee-legend-grid">
                {CATEGORIES.map(c => (
                  <div key={c.kind} className="dictee-legend-row">
                    <span className="dictee-legend-swatch" style={{ background: c.color + '20', border: `1.5px solid ${c.color}50`, color: c.color }}>Aa</span>
                    <span className="dictee-legend-text">{c.label}</span>
                  </div>
                ))}
              </div>
            </details>

            <div className="dictee-actions">
              <button className="btn-outline" onClick={() => { setResult(null); setInput(''); setShowOrig(false); }}>
                <RefreshCw size={14} /> Réessayer
              </button>
              <button className="btn-gold" onClick={() => goTo((idx + 1) % total)}>
                Verset suivant →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
