import React, { useState, useRef } from 'react';
import { useApp } from '../App';
import { Volume2, RefreshCw, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { analyzeInput, KIND_CSS } from '../utils/textUtils';

const CATEGORIES = [
  { kind: 'correct',     label: 'Corrects',               color: '#16a34a' },
  { kind: 'accent',      label: 'Accent / majuscule',     color: '#d97706' },
  { kind: 'orthographe', label: 'Orthographe',            color: '#ea580c' },
  { kind: 'ponctuation', label: 'Ponctuation',            color: '#2563eb' },
  { kind: 'conjugaison', label: 'Conjugaison / accord',   color: '#9333ea' },
  { kind: 'vocabulaire', label: 'Vocabulaire / structure', color: '#dc2626' },
  { kind: 'missing',     label: 'Mots manquants',         color: '#b91c1c' },
  { kind: 'extra',       label: 'Mots en trop',           color: '#6b7280' },
];

function countErrors(results) {
  const counts = {};
  for (const r of results) counts[r.error.kind] = (counts[r.error.kind] || 0) + 1;
  return counts;
}

function WordChip({ r, i }) {
  const css = KIND_CSS[r.error.kind] || KIND_CSS.correct;
  const base = {
    background: css.bg,
    border: `1.5px solid ${css.border}`,
  };

  if (r.error.kind === 'correct') {
    return (
      <span key={i} className="dictee-word" style={{ ...base, color: css.color }}>
        {r.typed}
      </span>
    );
  }

  if (r.error.kind === 'missing') {
    return (
      <span key={i} className="dictee-word dictee-word-missing" style={{ ...base, color: css.color }}>
        <span className="dw-miss">✗</span>
        <em>{r.orig}</em>
      </span>
    );
  }

  if (r.error.kind === 'extra') {
    return (
      <span key={i} className="dictee-word dictee-word-extra" style={{ ...base, color: css.color }}>
        <s>{r.typed}</s>
        <span className="dw-badge" style={{ background: css.color + '22', color: css.color }}>en trop</span>
      </span>
    );
  }

  // Error with inline correction
  return (
    <span key={i} className="dictee-word dictee-word-err" style={base}>
      <span className="dw-wrong" style={{ color: css.color }}>{r.typed}</span>
      <span className="dw-arrow">→</span>
      <span className="dw-right">{r.orig}</span>
      <span className="dw-badge" style={{ background: css.color + '20', color: css.color }}>{r.error.label}</span>
    </span>
  );
}

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
  const errors = result ? result.filter(r => r.error.kind !== 'correct') : [];

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

        {/* Show original */}
        {showOrig && <p className="dictee-orig">{card.text}</p>}

        {!result ? (
          <>
            <label className="dictee-label">Écris le verset de mémoire :</label>
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

            {/* Word-by-word result with inline corrections */}
            <div className="dictee-result-words">
              {result.map((r, i) => <WordChip key={i} r={r} i={i} />)}
            </div>

            {/* Error detail list */}
            {errors.length > 0 && (
              <div className="dictee-corr-list">
                <div className="dictee-corr-title">Détail des corrections</div>
                {errors.map((r, i) => {
                  const css = KIND_CSS[r.error.kind];
                  return (
                    <div key={i} className="dictee-corr-row" style={{ borderLeft: `3px solid ${css.color}` }}>
                      <span className="dcr-type" style={{ color: css.color }}>{r.error.label}</span>
                      <span className="dcr-detail">
                        {r.error.kind === 'missing'
                          ? <>Mot oublié : <strong>« {r.orig} »</strong></>
                          : r.error.kind === 'extra'
                          ? <>Mot en trop : <strong>« {r.typed} »</strong></>
                          : <>
                              Écrit : <strong className="dcr-wrong">« {r.typed} »</strong>
                              <span className="dcr-arr"> → </span>
                              Attendu : <strong className="dcr-right">« {r.orig} »</strong>
                            </>
                        }
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Error category chips */}
            {totalErrors > 0 && (
              <div className="dictee-cats">
                {CATEGORIES.filter(c => counts[c.kind] > 0).map(c => (
                  <div
                    key={c.kind}
                    className="dictee-cat"
                    style={{ background: c.color + '18', border: `1.5px solid ${c.color}4a`, color: c.color }}
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
