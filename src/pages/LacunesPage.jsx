import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../App';
import { makeTokens } from '../utils/textUtils';

const DIFFS = [
  { id: 'facile',   label: 'Facile',    hint: '1 mot sur 4' },
  { id: 'moyen',    label: 'Moyen',     hint: '1 mot sur 3' },
  { id: 'difficile',label: 'Difficile', hint: '1 mot sur 2' },
];

function ExerciseCard({ card, onCheck, onReveal, onReset }) {
  const inputsRef = useRef({});

  const check = useCallback(() => {
    const inputs = Object.values(inputsRef.current).filter(Boolean);
    let correct = 0;
    inputs.forEach(inp => {
      const answer = inp.dataset.answer;
      const given = inp.value.trim().toLowerCase().replace(/[,;:.!?'"()\-«»]/g, '');
      inp.classList.remove('correct', 'wrong');
      if (given === answer) { inp.classList.add('correct'); correct++; }
      else inp.classList.add('wrong');
    });
    const total = inputs.length;
    if (total === 0) return;
    if (correct === total) onCheck(`Parfait ! Tous les ${total} mots sont corrects.`);
    else onCheck(`${correct} / ${total} corrects. Les mots en rouge sont incorrects.`);
  }, [onCheck]);

  const reveal = useCallback(() => {
    Object.values(inputsRef.current).filter(Boolean).forEach(inp => {
      const i = +inp.dataset.index;
      inp.value = card.tokens[i].clean;
      inp.classList.remove('correct', 'wrong');
      inp.classList.add('revealed');
      inp.disabled = true;
    });
    onReveal('Réponses révélées. Lisez attentivement pour mémoriser.');
  }, [card, onReveal]);

  return (
    <div className="verse-exercise">
      <div className="verse-exercise-text">
        {card.tokens.map((tok, i) => {
          if (!tok.blank) return <React.Fragment key={i}>{tok.original} </React.Fragment>;
          return (
            <React.Fragment key={i}>
              <input
                type="text"
                className="blank-input"
                data-index={i}
                data-answer={tok.clean}
                placeholder={'·'.repeat(Math.min(tok.clean.length, 6))}
                style={{ width: Math.max(60, tok.clean.length * 11) + 'px' }}
                ref={el => { inputsRef.current[i] = el; }}
                onKeyDown={e => { if (e.key === 'Enter') check(); }}
              />{' '}
            </React.Fragment>
          );
        })}
      </div>
      <div className="exercise-actions">
        <button className="btn-light" onClick={check}>Vérifier</button>
        <button className="btn-ghost" onClick={reveal}>Voir les réponses</button>
        <button className="btn-ghost" onClick={onReset}>Réessayer</button>
      </div>
    </div>
  );
}

export default function LacunesPage() {
  const { selectedVerses, navigate } = useApp();
  const [diff, setDiff]       = useState('facile');
  const [cards, setCards]     = useState([]);
  const [index, setIndex]     = useState(0);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [resetKey, setResetKey] = useState(0);

  const keys = Object.keys(selectedVerses);

  function start() {
    const sorted = keys.map(k => selectedVerses[k])
      .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);
    setCards(sorted.map(v => ({
      ref: `Ap ${v.chap}:${v.verse}`,
      text: v.text,
      tokens: makeTokens(v.text, diff),
    })));
    setIndex(0); setFeedback(''); setResetKey(0); setStarted(true);
  }

  function goTo(delta) {
    const next = Math.max(0, Math.min(cards.length - 1, index + delta));
    setIndex(next); setFeedback(''); setResetKey(0);
    document.getElementById('page-lacunes')?.scrollTo(0, 0);
  }

  if (!started) {
    return (
      <>
        <div className="training-header">
          <span className="training-header-eyebrow">Entraînement</span>
          <div className="training-header-title">Texte à trou</div>
          {keys.length > 0 && (
            <p className="training-header-sub">Choisissez la difficulté, puis complétez les mots manquants.</p>
          )}
        </div>
        {keys.length === 0 ? (
          <div className="empty-msg">
            Aucun verset sélectionné.{' '}
            <span style={{ color: 'var(--action)', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate('lecture')}>
              Allez lire et sélectionnez des versets →
            </span>
          </div>
        ) : (
          <div className="lacunes-setup">
            <div className="lacunes-setup-left">
              <div className="diff-cards">
                {DIFFS.map(d => (
                  <button
                    key={d.id}
                    className={`diff-card ${diff === d.id ? 'active' : ''}`}
                    onClick={() => setDiff(d.id)}
                  >
                    <span className="diff-card-label">{d.label}</span>
                    <span className="diff-card-hint">{d.hint}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="lacunes-setup-right">
              <div className="lacunes-setup-info">
                <span className="lacunes-count-n">{keys.length}</span>
                <span className="lacunes-count-l">versets à travailler</span>
              </div>
              <button className="btn-primary lacunes-start-btn" onClick={start}>
                Commencer →
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  const card = cards[index];

  return (
    <>
      <div className="lacunes-session">
        <div className="lacunes-main">
          <div className="exercise-header">
            <div className="exercise-ref">{card.ref}</div>
            <div className="exercise-progress-txt">{index + 1} / {cards.length}</div>
          </div>

          <ExerciseCard
            key={`${index}-${resetKey}`}
            card={card}
            onCheck={setFeedback}
            onReveal={setFeedback}
            onReset={() => { setFeedback(''); setResetKey(k => k + 1); }}
          />

          {feedback && (
            <div className="lacunes-feedback visible">{feedback}</div>
          )}
        </div>

        <div className="lacunes-sidebar">
          <div className="lacunes-nav-card">
            <div className="lacunes-nav-progress">
              <div className="lacunes-nav-bar">
                <div
                  className="lacunes-nav-fill"
                  style={{ width: `${Math.round(((index + 1) / cards.length) * 100)}%` }}
                />
              </div>
              <span>{index + 1} / {cards.length}</span>
            </div>

            <div className="exercise-nav">
              <button className="ch-nav-btn" disabled={index === 0} onClick={() => goTo(-1)}>
                ← Précédent
              </button>
              <button className="ch-nav-btn" disabled={index === cards.length - 1} onClick={() => goTo(1)}>
                Suivant →
              </button>
            </div>

            <button
              className="btn-ghost"
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              onClick={() => { setStarted(false); setCards([]); }}
            >
              ← Réglages
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
