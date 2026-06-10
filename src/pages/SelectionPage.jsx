import React from 'react';
import { useApp } from '../App';
import { APOCALYPSE_LSG } from '../../data.js';
import { hexToRgba } from '../utils/colors';
import { Volume2, PenLine, Mic, BookOpen } from 'lucide-react';

export default function SelectionPage() {
  const { selectedVerses, highlightColors, removeVerse, clearAll, navigate, play } = useApp();
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
          <Volume2 size={22} strokeWidth={1.75} />
          <span>Écouter</span>
        </button>
        <button className="sel-action-btn" onClick={() => navigate('flashcard')}>
          <BookOpen size={22} strokeWidth={1.75} />
          <span>Cartes</span>
        </button>
        <button className="sel-action-btn" onClick={() => navigate('lacunes')}>
          <PenLine size={22} strokeWidth={1.75} />
          <span>Texte à trou</span>
        </button>
        <button className="sel-action-btn" onClick={() => navigate('recitation')}>
          <Mic size={22} strokeWidth={1.75} />
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
                  <span className="sel-ref" style={hlColor ? { color: hlColor } : {}}>
                    Ap {chNum}:{item.verse}
                  </span>
                  <span className="sel-text">{item.text}</span>
                  <button className="sel-remove" title="Retirer" onClick={() => removeVerse(item.key)}>
                    ×
                  </button>
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
