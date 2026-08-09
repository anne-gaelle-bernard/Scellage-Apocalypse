import React, { useState } from 'react';
import { useApp } from '../App';
import { Type, Link2, BookOpen, Eye, Pencil, Check } from 'lucide-react';

const TECHNIQUES = {
  acronyme: {
    label: 'Acronyme', Icon: Type, color: '#7c3aed',
    prompt: "Formez un mot ou une phrase avec les premières lettres des mots clés du verset.",
    placeholder: 'Ex : RJC = Révélation, Jésus, Christ…',
  },
  association: {
    label: 'Association', Icon: Link2, color: '#2563eb',
    prompt: "Associez ce verset à une image ou une idée qui vous parle.",
    placeholder: "Ex : une porte ouverte sur le ciel…",
  },
  histoire: {
    label: 'Mini-histoire', Icon: BookOpen, color: '#059669',
    prompt: "Racontez ce verset comme une courte histoire, avec vos propres mots.",
    placeholder: "Ex : Jean reçoit un message urgent d'un ange…",
  },
  visualisation: {
    label: 'Visualisation', Icon: Eye, color: '#d97706',
    prompt: "Imaginez une scène mentale qui représente ce verset. Choisissez un emoji et décrivez-la.",
    placeholder: "Ex : une couronne dorée qui brille…",
  },
};

const EMOJI_PALETTE = ['📖','🔥','⚡','👑','🐑','🦁','⭐','🌊','🎺','🕊️','💫','🔑','🚪','⚔️','🌅','🍞'];

function Activity({ verseKey, type, existing, onSave, onClose }) {
  const t = TECHNIQUES[type];
  const [text, setText]   = useState(existing?.type === type ? existing.text : '');
  const [emoji, setEmoji] = useState(existing?.type === type ? (existing.emoji || '') : '');

  function save() {
    if (!text.trim()) return;
    onSave({ type, text: text.trim(), emoji: type === 'visualisation' ? emoji : undefined });
    onClose();
  }

  return (
    <div className="mnemo-activity" style={{ borderColor: t.color }}>
      <div className="mnemo-activity-head" style={{ color: t.color }}>
        <t.Icon size={15} strokeWidth={2} /> {t.label}
      </div>
      <p className="mnemo-activity-prompt">{t.prompt}</p>

      {type === 'visualisation' && (
        <div className="mnemo-emoji-palette">
          {EMOJI_PALETTE.map(em => (
            <button
              key={em}
              className={`mnemo-emoji-opt ${emoji === em ? 'active' : ''}`}
              onClick={() => setEmoji(em)}
            >
              {em}
            </button>
          ))}
        </div>
      )}

      <textarea
        className="mnemo-activity-input"
        placeholder={t.placeholder}
        value={text}
        onChange={e => setText(e.target.value)}
        rows={2}
        autoFocus
      />

      <div className="mnemo-activity-actions">
        <button className="btn-ghost" onClick={onClose}>Annuler</button>
        <button className="btn-gold" onClick={save}>
          <Check size={14} /> Enregistrer
        </button>
      </div>
    </div>
  );
}

export default function MnemoPage() {
  const { selectedVerses, mnemonics, setMnemonic, navigate } = useApp();
  const [activeVerse, setActiveVerse] = useState(null);
  const [activeType, setActiveType]   = useState(null);
  const keys = Object.keys(selectedVerses);

  if (keys.length === 0) {
    return (
      <>
        <div className="training-header">
          <span className="training-header-eyebrow">Mémorisation</span>
          <div className="training-header-title">Mnémotechniques</div>
        </div>
        <p className="page-intro">
          Aucun verset sélectionné. Parcourez les chapitres et cochez des versets pour leur ajouter un moyen mnémotechnique.
        </p>
        <button className="btn-light" onClick={() => navigate('lecture')}>
          Lire les chapitres &#8594;
        </button>
      </>
    );
  }

  const items = Object.entries(selectedVerses)
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);

  function openActivity(key, type) {
    setActiveVerse(key);
    setActiveType(type);
  }

  function closeActivity() {
    setActiveVerse(null);
    setActiveType(null);
  }

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Mémorisation</span>
        <div className="training-header-title">Mnémotechniques</div>
        <p className="training-header-sub">
          Choisissez une technique pour chaque verset : acronyme, association mentale, mini-histoire ou visualisation.
        </p>
      </div>

      <div className="mnemo-list">
        {items.map(item => {
          const existing = mnemonics[item.key];
          const isOpen = activeVerse === item.key;
          return (
            <div key={item.key} className="mnemo-card">
              <div className="mnemo-card-ref">Ap {item.chap}:{item.verse}</div>
              <p className="mnemo-card-text">{item.text}</p>

              {existing?.text && !isOpen && (
                <div className="mnemo-result" style={{ borderColor: TECHNIQUES[existing.type]?.color }}>
                  <span className="mnemo-result-label" style={{ color: TECHNIQUES[existing.type]?.color }}>
                    {existing.emoji && <span>{existing.emoji} </span>}
                    {TECHNIQUES[existing.type]?.label || 'Note'}
                  </span>
                  <span className="mnemo-result-text">{existing.text}</span>
                  <button className="mnemo-result-edit" onClick={() => openActivity(item.key, existing.type)}>
                    <Pencil size={12} />
                  </button>
                </div>
              )}

              {!isOpen && (
                <div className="mnemo-options">
                  {Object.entries(TECHNIQUES).map(([key, t]) => (
                    <button
                      key={key}
                      className="mnemo-option-btn"
                      style={{ '--mo-color': t.color }}
                      onClick={() => openActivity(item.key, key)}
                    >
                      <t.Icon size={16} strokeWidth={2} />
                      {t.label}
                    </button>
                  ))}
                </div>
              )}

              {isOpen && (
                <Activity
                  verseKey={item.key}
                  type={activeType}
                  existing={existing}
                  onSave={(value) => setMnemonic(item.key, value)}
                  onClose={closeActivity}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
