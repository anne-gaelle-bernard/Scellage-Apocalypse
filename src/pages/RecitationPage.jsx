import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../App';
import { maskText, firstLettersText, analyzeInput, KIND_CSS } from '../utils/textUtils';
import { Eye, Lightbulb, Contrast, EyeOff, Type, Mic, Square, RefreshCw } from 'lucide-react';

const LEVELS = [
  { n: 0, Icon: Eye,       label: 'Lire',      desc: 'Texte complet' },
  { n: 1, Icon: Lightbulb, label: 'Indices',    desc: 'Premières lettres + tirets' },
  { n: 2, Icon: Contrast,  label: 'Mi-masqué',  desc: 'La moitié des mots cachés' },
  { n: 3, Icon: EyeOff,    label: 'Maîtrise',   desc: 'Tous les mots cachés' },
  { n: 4, Icon: Type,      label: 'Initiales',  desc: 'Seulement la première lettre' },
  { n: 5, Icon: Mic,       label: 'Oral',       desc: 'Réciter à voix haute' },
];

const SR = typeof window !== 'undefined'
  ? (window.SpeechRecognition || window.webkitSpeechRecognition || null)
  : null;

function SpeechWordChip({ r }) {
  const css = KIND_CSS[r.error.kind] || KIND_CSS.correct;
  if (r.error.kind === 'correct') {
    return (
      <span className="dictee-word" style={{ background: css.bg, border: `1.5px solid ${css.border}`, color: css.color }}>
        {r.orig}
      </span>
    );
  }
  if (r.error.kind === 'missing') {
    return (
      <span className="dictee-word dictee-word-missing" style={{ background: css.bg, border: `1.5px solid ${css.border}`, color: css.color }}>
        <span className="dw-miss">✗</span><em>{r.orig}</em>
      </span>
    );
  }
  if (r.error.kind === 'extra') {
    return (
      <span className="dictee-word dictee-word-extra" style={{ background: css.bg, border: `1.5px solid ${css.border}`, color: css.color }}>
        <s>{r.typed}</s>
        <span className="dw-badge" style={{ background: css.color + '22', color: css.color }}>en trop</span>
      </span>
    );
  }
  return (
    <span className="dictee-word dictee-word-err" style={{ background: css.bg, border: `1.5px solid ${css.border}` }}>
      <span className="dw-wrong" style={{ color: css.color }}>{r.typed}</span>
      <span className="dw-arrow">→</span>
      <span className="dw-right">{r.orig}</span>
      <span className="dw-badge" style={{ background: css.color + '20', color: css.color }}>{r.error.label}</span>
    </span>
  );
}

export default function RecitationPage() {
  const { selectedVerses, navigate } = useApp();
  const [level, setLevel]             = useState(0);
  const [revealed, setRevealed]       = useState({});
  const [listening, setListening]     = useState({});
  const [speechRes, setSpeechRes]     = useState({});
  const [interimTx, setInterimTx]     = useState({});
  const recognitions                  = useRef({});

  const cards = Object.values(selectedVerses)
    .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);

  function handleSetLevel(n) {
    setLevel(n);
    setRevealed({});
    // stop any active recognition
    Object.values(recognitions.current).forEach(r => { try { r.stop(); } catch (_) {} });
    recognitions.current = {};
    setListening({});
    setSpeechRes({});
    setInterimTx({});
  }

  function toggleReveal(i) {
    setRevealed(r => ({ ...r, [i]: !r[i] }));
  }

  function getMaskedHtml(card) {
    return level === 4 ? firstLettersText(card.text) : maskText(card.text, level);
  }

  const startListening = useCallback((cardIdx, cardText) => {
    if (!SR) return;
    const recog = new SR();
    recog.lang = 'fr-FR';
    recog.continuous = true;
    recog.interimResults = true;
    recog.maxAlternatives = 1;

    let finalAccum = '';

    recog.onresult = (e) => {
      let interim = '';
      finalAccum = '';
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalAccum += e.results[i][0].transcript + ' ';
        else interim += e.results[i][0].transcript;
      }
      setInterimTx(t => ({ ...t, [cardIdx]: interim }));
    };

    recog.onend = () => {
      setListening(l => ({ ...l, [cardIdx]: false }));
      setInterimTx(t => ({ ...t, [cardIdx]: '' }));
      if (finalAccum.trim()) {
        setSpeechRes(r => ({ ...r, [cardIdx]: analyzeInput(finalAccum.trim(), cardText) }));
      }
    };

    recog.onerror = (e) => {
      if (e.error !== 'no-speech') console.warn('Speech error', e.error);
      setListening(l => ({ ...l, [cardIdx]: false }));
    };

    recognitions.current[cardIdx] = recog;
    setSpeechRes(r => ({ ...r, [cardIdx]: null }));
    setListening(l => ({ ...l, [cardIdx]: true }));
    recog.start();
  }, []);

  function stopListening(cardIdx) {
    try { recognitions.current[cardIdx]?.stop(); } catch (_) {}
    setListening(l => ({ ...l, [cardIdx]: false }));
  }

  function resetSpeech(cardIdx) {
    setSpeechRes(r => ({ ...r, [cardIdx]: null }));
    setInterimTx(t => ({ ...t, [cardIdx]: '' }));
  }

  if (!cards.length) {
    return (
      <>
        <div className="training-header">
          <span className="training-header-eyebrow">Entraînement</span>
          <div className="training-header-title">Récitation</div>
        </div>
        <div className="empty-msg">
          Aucun verset sélectionné.{' '}
          <span style={{ color: 'var(--action)', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('lecture')}>
            Allez lire et sélectionnez des versets →
          </span>
        </div>
      </>
    );
  }

  const isOral = level === 5;

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Entraînement</span>
        <div className="training-header-title">Récitation</div>
        <p className="training-header-sub">
          {isOral
            ? 'Récite chaque verset à voix haute, puis découvre où tu t\'es trompé(e).'
            : 'Masquez progressivement le texte pour tourner le verset en bouche et renforcer votre mémorisation.'}
        </p>
      </div>

      <div className="level-btns">
        {LEVELS.map(lv => (
          <button
            key={lv.n}
            className={`level-btn ${level === lv.n ? 'active' : ''}`}
            onClick={() => handleSetLevel(lv.n)}
            title={lv.desc}
          >
            <span className="level-icon"><lv.Icon size={20} strokeWidth={1.75} /></span>
            {lv.label}
          </button>
        ))}
      </div>

      {isOral && !SR && (
        <div className="speech-unsupported">
          La reconnaissance vocale n'est pas disponible dans ce navigateur.
          Utilisez Chrome ou Edge pour cette fonctionnalité.
        </div>
      )}

      {cards.map((card, i) => {
        const isListening = !!listening[i];
        const result      = speechRes[i];
        const interim     = interimTx[i] || '';
        const hasResult   = result && result.length > 0;
        const errors      = hasResult ? result.filter(r => r.error.kind !== 'correct') : [];
        const score       = hasResult
          ? Math.round(result.filter(r => r.error.kind === 'correct').length / result.length * 100)
          : null;

        return (
          <div key={`${card.chap}:${card.verse}`} className="recitation-card">
            <div className="exercise-ref">Ap {card.chap}:{card.verse}</div>

            {isOral ? (
              <>
                {/* Oral mode: show verse text always (reference) */}
                <div className="recitation-text speech-ref-text">{card.text}</div>

                {/* Mic controls */}
                {!hasResult && (
                  <div className="speech-controls">
                    {!isListening ? (
                      <button
                        className="speech-btn speech-btn-start"
                        onClick={() => SR && startListening(i, card.text)}
                        disabled={!SR}
                      >
                        <Mic size={18} />
                        Réciter à voix haute
                      </button>
                    ) : (
                      <>
                        <div className="speech-listening-row">
                          <span className="speech-pulse" />
                          <span className="speech-listening-label">En écoute…</span>
                          <button className="speech-btn speech-btn-stop" onClick={() => stopListening(i)}>
                            <Square size={14} />
                            Terminer
                          </button>
                        </div>
                        {interim && <div className="speech-interim">{interim}</div>}
                      </>
                    )}
                  </div>
                )}

                {/* Result */}
                {hasResult && (
                  <div className="speech-result">
                    <div className="dictee-score" style={{ marginBottom: 0 }}>
                      <span className="dictee-score-n" style={{ color: score >= 80 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626' }}>
                        {score} %
                      </span>
                      <span className="dictee-score-label">
                        {score === 100 ? '🎉 Parfait !' : score >= 80 ? 'Très bien !' : score >= 50 ? 'Bien, continue !' : 'Continue à pratiquer'}
                      </span>
                    </div>

                    <div className="dictee-result-words" style={{ marginTop: 12 }}>
                      {result.map((r, j) => <SpeechWordChip key={j} r={r} />)}
                    </div>

                    {errors.length > 0 && (
                      <div className="dictee-corr-list" style={{ marginTop: 12 }}>
                        <div className="dictee-corr-title">Détail des corrections</div>
                        {errors.map((r, j) => {
                          const css = KIND_CSS[r.error.kind];
                          return (
                            <div key={j} className="dictee-corr-row" style={{ borderLeft: `3px solid ${css.color}` }}>
                              <span className="dcr-type" style={{ color: css.color }}>{r.error.label}</span>
                              <span className="dcr-detail">
                                {r.error.kind === 'missing'
                                  ? <>Mot oublié : <strong>« {r.orig} »</strong></>
                                  : r.error.kind === 'extra'
                                  ? <>Mot en trop : <strong>« {r.typed} »</strong></>
                                  : <>
                                      Dit : <strong className="dcr-wrong">« {r.typed} »</strong>
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

                    <button className="btn-outline speech-retry-btn" onClick={() => resetSpeech(i)}>
                      <RefreshCw size={14} /> Réessayer
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="recitation-text">
                  {(level === 0 || revealed[i])
                    ? card.text
                    : <span dangerouslySetInnerHTML={{ __html: getMaskedHtml(card) }} />
                  }
                </div>

                {level > 0 && (
                  <button className="reveal-btn" onClick={() => toggleReveal(i)}>
                    {revealed[i]
                      ? <><EyeOff size={14} strokeWidth={2} /> Masquer à nouveau</>
                      : <><Eye size={14} strokeWidth={2} /> Révéler le texte</>
                    }
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
