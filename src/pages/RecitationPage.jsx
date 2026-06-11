import React, { useState, useCallback } from 'react';
import { useApp } from '../App';
import { maskText, firstLettersText } from '../utils/textUtils';
import { Eye, Lightbulb, Contrast, EyeOff, Type } from 'lucide-react';

const LEVELS = [
  { n: 0, Icon: Eye,       label: 'Lire',       desc: 'Texte complet' },
  { n: 1, Icon: Lightbulb, label: 'Indices',     desc: 'Premières lettres + tirets' },
  { n: 2, Icon: Contrast,  label: 'Mi-masqué',   desc: 'La moitié des mots cachés' },
  { n: 3, Icon: EyeOff,    label: 'Maîtrise',    desc: 'Tous les mots cachés' },
  { n: 4, Icon: Type,      label: 'Initiales',   desc: 'Seulement la première lettre' },
];

export default function RecitationPage() {
  const { selectedVerses, navigate } = useApp();
  const [level, setLevel] = useState(0);
  const [revealed, setRevealed] = useState({});

  const cards = Object.values(selectedVerses)
    .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);

  function handleSetLevel(n) {
    setLevel(n);
    setRevealed({});
  }

  function toggleReveal(i) {
    setRevealed(r => ({ ...r, [i]: !r[i] }));
  }

  function getMaskedHtml(card) {
    return level === 4 ? firstLettersText(card.text) : maskText(card.text, level);
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

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Entraînement</span>
        <div className="training-header-title">Récitation</div>
        <p className="training-header-sub">
          Masquez progressivement le texte pour tourner le verset en bouche et renforcer votre mémorisation.
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

      {cards.map((card, i) => (
        <div key={`${card.chap}:${card.verse}`} className="recitation-card">
          <div className="exercise-ref">Ap {card.chap}:{card.verse}</div>

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
        </div>
      ))}
    </>
  );
}
