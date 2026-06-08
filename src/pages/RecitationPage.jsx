import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import { maskText, firstLettersText } from '../utils/textUtils';

const LEVELS = [
  { n: 0, icon: '👁',  label: 'Lire',       desc: 'Texte complet' },
  { n: 1, icon: '💡',  label: 'Indices',     desc: 'Premières lettres + tirets' },
  { n: 2, icon: '◑',   label: 'Mi-masqué',   desc: 'La moitié des mots cachés' },
  { n: 3, icon: '🙈',  label: 'Maîtrise',    desc: 'Tous les mots cachés' },
  { n: 4, icon: '🔤',  label: 'Initiales',   desc: 'Seulement la première lettre' },
];

export default function RecitationPage() {
  const { selectedVerses, navigate } = useApp();
  const [level, setLevel]     = useState(0);
  const [index, setIndex]     = useState(0);
  const [revealed, setRevealed] = useState(false);

  const cards = useMemo(() => (
    Object.values(selectedVerses)
      .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse)
  ), [selectedVerses]);

  if (!cards.length) {
    return (
      <>
        <div className="page-title">Récitation</div>
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

  const card = cards[Math.min(index, cards.length - 1)];

  function goTo(delta) {
    const next = Math.max(0, Math.min(cards.length - 1, index + delta));
    setIndex(next);
    setRevealed(false);
    window.scrollTo(0, 0);
  }

  function handleSetLevel(n) {
    setLevel(n);
    setRevealed(false);
  }

  const maskedHtml = !revealed && level > 0
    ? (level === 4 ? firstLettersText(card.text) : maskText(card.text, level))
    : null;

  return (
    <>
      <div className="page-title">Récitation</div>
      <p className="recap-intro">
        Masquez progressivement le texte pour tourner le verset en bouche et renforcer votre mémorisation.
      </p>

      <div className="level-btns">
        {LEVELS.map(lv => (
          <button
            key={lv.n}
            className={`level-btn ${level === lv.n ? 'active' : ''}`}
            onClick={() => handleSetLevel(lv.n)}
            title={lv.desc}
          >
            <span className="level-icon">{lv.icon}</span>
            {lv.label}
          </button>
        ))}
      </div>

      <div className="recitation-card">
        <div className="exercise-ref">Ap {card.chap}:{card.verse}</div>

        <div className="recitation-text">
          {(level === 0 || revealed)
            ? card.text
            : <span dangerouslySetInnerHTML={{ __html: maskedHtml }} />
          }
        </div>

        {level > 0 && (
          <button className="reveal-btn" onClick={() => setRevealed(r => !r)}>
            {revealed ? '🙈 Masquer à nouveau' : '👁 Révéler le texte'}
          </button>
        )}
      </div>

      <div className="exercise-nav" style={{ marginTop: '24px' }}>
        <button className="ch-nav-btn" disabled={index === 0} onClick={() => goTo(-1)}>
          ← Précédent
        </button>
        <span style={{ color: 'var(--ink-3)', fontSize: '13px', fontStyle: 'italic' }}>
          {index + 1} / {cards.length}
        </span>
        <button className="ch-nav-btn" disabled={index === cards.length - 1} onClick={() => goTo(1)}>
          Suivant →
        </button>
      </div>
    </>
  );
}
