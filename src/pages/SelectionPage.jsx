import React, { useState } from 'react';
import { useApp } from '../App';
import { APOCALYPSE_LSG } from '../../data.js';
import { hexToRgba } from '../utils/colors';
import { Volume2, PenLine, Mic, BookOpen, Lightbulb } from 'lucide-react';

function MnemoField({ initial, onSave }) {
  const [text, setText]   = useState(initial || '');
  const [open, setOpen]   = useState(!!initial);

  function commit(v) {
    setText(v);
    onSave(v.trim());
  }

  if (!open) {
    return (
      <button className="sel-mnemo-toggle" onClick={() => setOpen(true)}>
        <Lightbulb size={12} strokeWidth={2} /> Ajouter un moyen mnémotechnique
      </button>
    );
  }

  return (
    <div className="sel-mnemo-field">
      <Lightbulb size={13} strokeWidth={2} className="sel-mnemo-icon" />
      <input
        className="sel-mnemo-input"
        placeholder="Acronyme, association d'idée, mini-histoire, image mentale…"
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
      />
    </div>
  );
}

export default function SelectionPage() {
  const { selectedVerses, highlightColors, mnemonics, setMnemonic, removeVerse, clearAll, navigate, play } = useApp();
  const keys = Object.keys(selectedVerses);

  function handlePlaySelected() {
    const items = Object.values(selectedVerses)
      .sort((a, b) => a.chap !== b.chap ? a.chap - b.chap : a.verse - b.verse);
    const queue = items.map(v => ({
      chap: v.chap, verse: v.verse, text: v.text, ref: `Ap ${v.chap}:${v.verse}`,
    }));
    play(queue, 0);
  }

  function handleClear() {
    if (window.confirm('Effacer tous les versets sélectionnés ?')) clearAll();
  }

  if (keys.length === 0) {
    return (
      <>
        <div className="training-header">
          <span className="training-header-eyebrow">Collection</span>
          <div className="training-header-title">Mes versets</div>
        </div>
        <p className="page-intro">
          Aucun verset sélectionné. Parcourez les chapitres et cochez des versets pour les ajouter ici.
        </p>
        <button className="btn-light" onClick={() => navigate('lecture')}>
          Lire les chapitres &#8594;
        </button>
      </>
    );
  }

  // Group by chapter
  const byChap = {};
  keys.forEach(k => {
    const v = selectedVerses[k];
    if (!byChap[v.chap]) byChap[v.chap] = [];
    byChap[v.chap].push({ key: k, verse: v.verse, text: v.text });
  });

  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Collection</span>
        <div className="training-header-title">Mes versets</div>
        <p className="training-header-sub">
          {keys.length} verset{keys.length > 1 ? 's' : ''} sélectionné{keys.length > 1 ? 's' : ''}. Entraînez-vous ou écoutez.
        </p>
      </div>

      <div className="sel-actions">
        <button className="sel-action-btn" onClick={handlePlaySelected}>
          <Volume2 size={24} strokeWidth={1.75} />
          <span>Écouter</span>
        </button>
        <button className="sel-action-btn" onClick={() => navigate('flashcard')}>
          <BookOpen size={24} strokeWidth={1.75} />
          <span>Cartes</span>
        </button>
        <button className="sel-action-btn" onClick={() => navigate('lacunes')}>
          <PenLine size={24} strokeWidth={1.75} />
          <span>Texte à trou</span>
        </button>
        <button className="sel-action-btn" onClick={() => navigate('recitation')}>
          <Mic size={24} strokeWidth={1.75} />
          <span>Récitation</span>
        </button>
      </div>

      <button className="btn-ghost sel-clear-btn" onClick={handleClear}>Tout effacer</button>

      {Object.keys(byChap).sort((a, b) => +a - +b).map(chNum => {
        const ch = APOCALYPSE_LSG.chapitres[chNum - 1];
        return (
          <div key={chNum}>
            <div className="sel-group-title">Ap {chNum}</div>
            <div className="sel-verse-grid">
            {byChap[chNum].sort((a, b) => a.verse - b.verse).map(item => {
              const hlColor = highlightColors[item.key] || null;
              return (
                <div
                  key={item.key}
                  className="sel-verse-row"
                  style={hlColor ? {
                    borderLeftColor: hlColor,
                    backgroundColor: hexToRgba(hlColor, 0.1),
                  } : {}}
                >
                  <div className="sel-verse-main">
                    <span className="sel-ref" style={hlColor ? { color: hlColor } : {}}>
                      Ap {chNum}:{item.verse}
                    </span>
                    <span className="sel-text">{item.text}</span>
                    <button className="sel-remove" title="Retirer" onClick={() => removeVerse(item.key)}>
                      ×
                    </button>
                  </div>
                  <MnemoField
                    initial={mnemonics[item.key]}
                    onSave={(text) => setMnemonic(item.key, text)}
                  />
                </div>
              );
            })}
            </div>
          </div>
        );
      })}
    </>
  );
}
