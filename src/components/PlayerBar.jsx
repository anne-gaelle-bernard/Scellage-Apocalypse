import React, { useEffect } from 'react';
import { useApp } from '../App';

const RATES = [
  { value: 0.7, label: 'Lent' },
  { value: 0.9, label: 'Normal' },
  { value: 1.3, label: 'Rapide' },
];

export default function PlayerBar() {
  const { uiState, toggle, stop, skip, setRate, rate, loop, toggleLoop } = useApp();
  const { active, paused, current } = uiState;

  useEffect(() => {
    document.body.classList.toggle('player-open', active);
    return () => document.body.classList.remove('player-open');
  }, [active]);

  if (!active) return null;

  const progress = current
    ? Math.round(((current.index + 1) / current.total) * 100)
    : 0;

  return (
    <div id="player-bar">
      {/* Barre de progression */}
      <div className="player-progress">
        <div className="player-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Info verset en cours */}
      <div className="player-info">
        <div className="player-now-playing">
          <span className="player-dot" />
          <span className="player-label">En lecture</span>
          {loop && <span className="player-loop-badge">Boucle</span>}
        </div>
        <div className="player-ref">{current?.ref || '—'}</div>
        {current && (
          <div className="player-preview">
            {current.text.length > 72 ? current.text.slice(0, 72) + '…' : current.text}
          </div>
        )}
      </div>

      {/* Contrôles */}
      <div className="player-controls">
        <button className="player-ctrl" onClick={() => skip(-1)} title="Précédent">
          &#9664;&#9664;
        </button>
        <button className="player-ctrl player-ctrl-main" onClick={toggle} title={paused ? 'Reprendre' : 'Pause'}>
          {paused ? '▶' : '❙❙'}
        </button>
        <button className="player-ctrl" onClick={stop} title="Arrêter">
          &#9632;
        </button>
        <button className="player-ctrl" onClick={() => skip(1)} title="Suivant">
          &#9654;&#9654;
        </button>
        <button
          className={`player-ctrl player-ctrl-loop ${loop ? 'active' : ''}`}
          onClick={toggleLoop}
          title={loop ? 'Désactiver la boucle' : 'Répéter en boucle'}
        >
          &#8635;
        </button>
      </div>

      {/* Vitesse */}
      <div className="player-speed">
        <span className="player-speed-label">Vitesse</span>
        <div className="player-speed-btns">
          {RATES.map(r => (
            <button
              key={r.value}
              className={`rate-btn ${rate === r.value ? 'active' : ''}`}
              onClick={() => setRate(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Compteur */}
      {current && (
        <div className="player-counter">
          {current.index + 1}<span>/{current.total}</span>
        </div>
      )}
    </div>
  );
}
