import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useApp } from '../App';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardPage() {
  const { selectedVerses, navigate } = useApp();
  const keys = Object.keys(selectedVerses);

  const [mode, setMode] = useState('ref→text'); // 'ref→text' | 'text→ref'
  const [deck, setDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [scores, setScores] = useState({}); // key → 'good' | 'again'
  const [done, setDone] = useState(false);

  // Fullscreen mode on mobile when a session is active
  useEffect(() => {
    const playing = deck !== null && !done;
    document.body.classList.toggle('fc-playing', playing);
    return () => document.body.classList.remove('fc-playing');
  }, [deck, done]);

  const allCards = useMemo(() => (
    Object.values(selectedVerses)
      .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse)
  ), [selectedVerses]);

  function startDeck(withShuffle) {
    const cards = withShuffle ? shuffle(allCards) : [...allCards];
    setDeck(cards);
    setIndex(0);
    setFlipped(false);
    setScores({});
    setDone(false);
  }

  function handleScore(result) {
    const card = deck[index];
    const key = `${card.chap}:${card.verse}`;
    setScores(prev => ({ ...prev, [key]: result }));
    const next = index + 1;
    if (next >= deck.length) {
      setDone(true);
    } else {
      setIndex(next);
      setFlipped(false);
    }
  }

  function restart() {
    const again = deck.filter(c => scores[`${c.chap}:${c.verse}`] === 'again');
    if (again.length === 0) {
      startDeck(false);
      return;
    }
    setDeck(again);
    setIndex(0);
    setFlipped(false);
    setScores({});
    setDone(false);
  }

  if (keys.length === 0) {
    return (
      <>
        <div className="page-title">Cartes mémoire</div>
        <div className="empty-msg">
          Aucun verset sélectionné.{' '}
          <span style={{ color: 'var(--action)', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('lecture')}>
            Lisez et sélectionnez des versets →
          </span>
        </div>
      </>
    );
  }

  if (!deck) {
    const goodCount = Object.values(scores).filter(s => s === 'good').length;
    return (
      <>
        <div className="page-title">Cartes mémoire</div>
        <p className="page-intro">{allCards.length} versets disponibles. Choisissez votre mode.</p>

        <div className="fc-setup">
          <div className="fc-mode-row">
            <span className="fc-setup-label">Mode</span>
            <div className="fc-mode-btns">
              <button
                className={`fc-mode-btn ${mode === 'ref→text' ? 'active' : ''}`}
                onClick={() => setMode('ref→text')}
              >
                <span>Référence → Texte</span>
                <small>Voir « Ap 3:20 », réciter le verset</small>
              </button>
              <button
                className={`fc-mode-btn ${mode === 'text→ref' ? 'active' : ''}`}
                onClick={() => setMode('text→ref')}
              >
                <span>Texte → Référence</span>
                <small>Voir le début du verset, trouver la référence</small>
              </button>
            </div>
          </div>

          <div className="fc-start-row">
            <button className="btn-primary" onClick={() => startDeck(false)}>
              Commencer dans l'ordre
            </button>
            <button className="btn-ghost" onClick={() => startDeck(true)}>
              🔀 Mélanger
            </button>
          </div>
        </div>
      </>
    );
  }

  if (done) {
    const good  = Object.values(scores).filter(s => s === 'good').length;
    const again = Object.values(scores).filter(s => s === 'again').length;
    const pct   = Math.round((good / deck.length) * 100);

    return (
      <>
        <div className="page-title">Résultats</div>
        <div className="fc-result">
          <div className="fc-result-score">{pct}%</div>
          <div className="fc-result-label">de réussite</div>
          <div className="fc-result-breakdown">
            <span className="fc-rb good">✓ {good} sus</span>
            <span className="fc-rb again">↺ {again} à revoir</span>
          </div>
          <div className="fc-result-actions">
            {again > 0 && (
              <button className="btn-primary" onClick={restart}>
                Revoir les {again} difficiles
              </button>
            )}
            <button className="btn-ghost" onClick={() => startDeck(true)}>
              Recommencer (mélangé)
            </button>
            <button className="btn-ghost" onClick={() => setDeck(null)}>
              Retour
            </button>
          </div>
        </div>
      </>
    );
  }

  const card = deck[index];
  const ref  = `Ap ${card.chap}:${card.verse}`;
  const preview = card.text.slice(0, 60) + (card.text.length > 60 ? '…' : '');

  const front = mode === 'ref→text'
    ? { top: 'Référence', main: ref, sub: null }
    : { top: 'Début du verset', main: `« ${preview} »`, sub: null };

  const back = mode === 'ref→text'
    ? { top: ref, main: card.text, sub: null }
    : { top: 'Référence', main: ref, sub: card.text };

  const progress = Math.round(((index) / deck.length) * 100);
  const good  = Object.values(scores).filter(s => s === 'good').length;
  const again = Object.values(scores).filter(s => s === 'again').length;

  return (
    <>
      <div className="fc-header">
        <div className="fc-progress-bar">
          <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="fc-meta">
          <span className="fc-counter">{index + 1} / {deck.length}</span>
          <span className="fc-score-good">✓ {good}</span>
          <span className="fc-score-again">↺ {again}</span>
          <button className="fc-exit-btn" onClick={() => setDeck(null)}>✕</button>
        </div>
      </div>

      <div className="fc-stage">
        <div className="fc-card-wrapper" onClick={() => setFlipped(f => !f)}>
          <div className={`fc-card-inner ${flipped ? 'flipped' : ''}`}>
            <div className="fc-face fc-front">
              <span className="fc-face-label">{front.top}</span>
              <div className="fc-face-main">{front.main}</div>
              <span className="fc-tap-hint">Appuyer pour révéler ↓</span>
            </div>
            <div className="fc-face fc-back">
              <span className="fc-face-label">{back.top}</span>
              <div className="fc-face-main">{back.main}</div>
              {back.sub && <div className="fc-face-sub">{back.sub}</div>}
            </div>
          </div>
        </div>

        {flipped && (
          <div className="fc-actions">
            <button className="fc-btn-again" onClick={() => handleScore('again')}>
              <span>↺</span> À revoir
            </button>
            <button className="fc-btn-good" onClick={() => handleScore('good')}>
              <span>✓</span> Je sais !
            </button>
          </div>
        )}

        {!flipped && (
          <p className="fc-hint-text">Tap la carte pour voir la réponse</p>
        )}
      </div>
    </>
  );
}
