import React from 'react';
import { useApp } from '../App';
import { APOCALYPSE_LSG } from '../../data.js';
import { hexToRgba } from '../utils/colors';

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
        <div className="page-title">Mes versets</div>
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
      <div className="page-title">Mes versets</div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
        <button className="btn-light" onClick={handlePlaySelected}>&#9654; Écouter mes versets</button>
        <button className="btn-light" onClick={() => navigate('lacunes')}>Texte à trou</button>
        <button className="btn-light" onClick={() => navigate('recitation')}>Récitation</button>
        <button className="btn-ghost" onClick={handleClear}>Tout effacer</button>
      </div>

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
