import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useApp } from '../App';
import { useSrsStore } from '../hooks/useSrsStore';
import { useCustomCardStore } from '../hooks/useCustomCardStore';
import { Shuffle, BookMarked, BookOpen, Clock, Lightbulb, Plus, Trash2 } from 'lucide-react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Verse cards use "chap:verse" as SRS key; custom cards are prefixed to avoid clashes.
const cardKey = (c) => c.custom ? `custom:${c.id}` : `${c.chap}:${c.verse}`;

export default function FlashcardPage() {
  const { selectedVerses, navigate, mnemonics } = useApp();
  const keys = Object.keys(selectedVerses);
  const { markReview, isDue } = useSrsStore('apoc_srs_verses');
  const { customCards, addCard, removeCard } = useCustomCardStore();

  const [mode, setMode] = useState('ref→text'); // 'ref→text' | 'text→ref'
  const [deck, setDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [scores, setScores] = useState({}); // key → 'good' | 'again'
  const [done, setDone] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');

  // Fullscreen mode on mobile when a session is active
  useEffect(() => {
    const playing = deck !== null && !done;
    document.body.classList.toggle('fc-playing', playing);
    return () => document.body.classList.remove('fc-playing');
  }, [deck, done]);

  const allCards = useMemo(() => [
    ...Object.values(selectedVerses)
      .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse),
    ...customCards.map(c => ({ ...c, custom: true })),
  ], [selectedVerses, customCards]);

  const dueCards = useMemo(() => (
    allCards.filter(c => isDue(cardKey(c)))
  ), [allCards, isDue]);

  function handleAddCard(e) {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;
    addCard(newFront, newBack);
    setNewFront('');
    setNewBack('');
  }

  function startDeck(withShuffle, cardsOverride) {
    const source = cardsOverride || allCards;
    const cards = withShuffle ? shuffle(source) : [...source];
    setDeck(cards);
    setIndex(0);
    setFlipped(false);
    setScores({});
    setDone(false);
  }

  function handleScore(result) {
    const card = deck[index];
    const key = cardKey(card);
    markReview(key, result === 'good');
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
    const again = deck.filter(c => scores[cardKey(c)] === 'again');
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

  if (!deck) {
    const parts = [];
    if (keys.length) parts.push(`${keys.length} verset${keys.length > 1 ? 's' : ''}`);
    if (customCards.length) parts.push(`${customCards.length} carte${customCards.length > 1 ? 's' : ''} perso`);

    return (
      <>
        <div className="training-header">
          <span className="training-header-eyebrow">Entraînement</span>
          <div className="training-header-title">Cartes mémoire</div>
          <p className="training-header-sub">
            {parts.length ? `${parts.join(' et ')} disponibles. Choisissez votre mode.` : 'Aucune carte pour le moment.'}
          </p>
        </div>

        <div className="fc-setup">
          {keys.length === 0 && (
            <div className="empty-msg">
              Aucun verset sélectionné.{' '}
              <span style={{ color: 'var(--action)', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('lecture')}>
                Lisez et sélectionnez des versets →
              </span>
            </div>
          )}

          {keys.length > 0 && (
            <div className="fc-mode-row">
              <span className="fc-setup-label">Mode</span>
              <div className="fc-mode-btns">
                <button
                  className={`fc-mode-btn ${mode === 'ref→text' ? 'active' : ''}`}
                  onClick={() => setMode('ref→text')}
                >
                  <div className="fc-mode-icon"><BookMarked size={36} strokeWidth={1.5} /></div>
                  <div className="fc-mode-text">
                    <span>Référence → Texte</span>
                    <small>On vous donne la référence (ex. Ap 3:20), vous récitez le verset de mémoire.</small>
                  </div>
                </button>
                <button
                  className={`fc-mode-btn ${mode === 'text→ref' ? 'active' : ''}`}
                  onClick={() => setMode('text→ref')}
                >
                  <div className="fc-mode-icon"><BookOpen size={36} strokeWidth={1.5} /></div>
                  <div className="fc-mode-text">
                    <span>Texte → Référence</span>
                    <small>On vous montre le début du verset, vous retrouvez la référence du passage.</small>
                  </div>
                </button>
              </div>
            </div>
          )}

          <div className="fc-custom">
            <span className="fc-setup-label">Mes cartes</span>
            <form className="fc-custom-form" onSubmit={handleAddCard}>
              <textarea
                className="qr-pair-input qr-pair-ta"
                value={newFront}
                onChange={e => setNewFront(e.target.value)}
                placeholder="Recto (question, mot, idée…)"
                rows={2}
              />
              <textarea
                className="qr-pair-input qr-pair-ta"
                value={newBack}
                onChange={e => setNewBack(e.target.value)}
                placeholder="Verso (réponse à retenir)"
                rows={2}
              />
              <button type="submit" className="btn-ghost fc-custom-add" disabled={!newFront.trim() || !newBack.trim()}>
                <Plus size={15} strokeWidth={2} /> Ajouter la carte
              </button>
            </form>

            {customCards.length > 0 && (
              <ul className="fc-custom-list">
                {customCards.map(c => (
                  <li key={c.id} className="fc-custom-item">
                    <div className="fc-custom-text">
                      <strong>{c.front}</strong>
                      <span>{c.back}</span>
                    </div>
                    <button className="qr-rm-btn" onClick={() => removeCard(c.id)} title="Supprimer">
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {dueCards.length > 0 && (
            <button className="fc-due-btn" onClick={() => startDeck(true, dueCards)}>
              <Clock size={15} strokeWidth={2} />
              {dueCards.length} carte{dueCards.length > 1 ? 's' : ''} à réviser aujourd'hui
            </button>
          )}

          {allCards.length > 0 && (
            <div className="fc-start-row">
              <button className="btn-primary" onClick={() => startDeck(false)}>
                Commencer dans l'ordre
              </button>
              <button className="btn-ghost" onClick={() => startDeck(true)}>
                <Shuffle size={15} strokeWidth={2} /> Mélanger
              </button>
            </div>
          )}
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
        <div className="training-header">
          <span className="training-header-eyebrow">Terminé</span>
          <div className="training-header-title">Résultats</div>
        </div>
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
  let front, back, mnemo;

  if (card.custom) {
    front = { top: 'Recto', main: card.front, sub: null };
    back  = { top: 'Verso', main: card.back, sub: null };
  } else {
    const ref  = `Ap ${card.chap}:${card.verse}`;
    const preview = card.text.slice(0, 60) + (card.text.length > 60 ? '…' : '');
    mnemo = mnemonics[`${card.chap}:${card.verse}`];

    front = mode === 'ref→text'
      ? { top: 'Référence', main: ref, sub: null }
      : { top: 'Début du verset', main: `« ${preview} »`, sub: null };

    back = mode === 'ref→text'
      ? { top: ref, main: card.text, sub: null }
      : { top: 'Référence', main: ref, sub: card.text };
  }

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
              {mnemo?.text && (
                <div className="fc-face-mnemo">
                  {mnemo.emoji ? <span>{mnemo.emoji}</span> : <Lightbulb size={12} strokeWidth={2} />} {mnemo.text}
                </div>
              )}
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
