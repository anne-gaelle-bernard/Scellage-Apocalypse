import React, { useState } from 'react';
import { useApp } from '../App';
import { Lightbulb } from 'lucide-react';

function MnemoField({ initial, onSave }) {
  const [text, setText] = useState(initial || '');

  function commit(v) {
    setText(v);
    onSave(v.trim());
  }

  return (
    <div className="mnemo-field">
      <Lightbulb size={14} strokeWidth={2} className="mnemo-field-icon" />
      <input
        className="mnemo-field-input"
        placeholder="Acronyme, association mentale, mini-histoire, image mentale…"
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
      />
    </div>
  );
}

export default function MnemoPage() {
  const { selectedVerses, mnemonics, setMnemonic, navigate } = useApp();
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

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Mémorisation</span>
        <div className="training-header-title">Mnémotechniques</div>
        <p className="training-header-sub">
          Pour chaque verset, notez un acronyme, une association mentale, une mini-histoire ou une image mentale qui vous aide à le retenir.
        </p>
      </div>

      <div className="mnemo-list">
        {items.map(item => (
          <div key={item.key} className="mnemo-card">
            <div className="mnemo-card-ref">Ap {item.chap}:{item.verse}</div>
            <p className="mnemo-card-text">{item.text}</p>
            <MnemoField
              initial={mnemonics[item.key]}
              onSave={(text) => setMnemonic(item.key, text)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
