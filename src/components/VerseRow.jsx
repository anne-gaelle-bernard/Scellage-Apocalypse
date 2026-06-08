import React, { useRef, useEffect } from 'react';
import { useApp } from '../App';
import { COLORS, hexToRgba } from '../utils/colors';

export default function VerseRow({ chap, verse }) {
  const { selectedVerses, highlightColors, toggleVerse, setHighlight, speakingKey, play, currentPage } = useApp();
  const rowRef = useRef(null);

  const isSpeaking = speakingKey === `${chap.numero}:${verse.n}`;
  useEffect(() => {
    if (isSpeaking && currentPage === 'lecture' && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSpeaking, currentPage]);

  const key = `${chap.numero}:${verse.n}`;
  const isSel = !!selectedVerses[key];
  const hlColor = highlightColors[key] || null;

  const rowStyle = hlColor
    ? { backgroundColor: hexToRgba(hlColor, 0.13), borderLeftColor: hlColor }
    : {};

  const rowClass = [
    'verse-row',
    isSel ? 'selected' : '',
    isSpeaking ? 'speaking' : '',
  ].filter(Boolean).join(' ');

  function handlePlay(e) {
    e.stopPropagation();
    const start = chap.versets.findIndex(v => v.n === verse.n);
    const queue = chap.versets.slice(start >= 0 ? start : 0).map(v => ({
      chap: chap.numero, verse: v.n, text: v.t, ref: `Ap ${chap.numero}:${v.n}`,
    }));
    play(queue, 0);
  }

  function handleColorClick(e, hex) {
    e.stopPropagation();
    setHighlight(key, hlColor === hex ? null : hex);
  }

  function handleErase(e) {
    e.stopPropagation();
    setHighlight(key, null);
  }

  return (
    <div ref={rowRef} className={rowClass} id={`vrow-${key}`} style={rowStyle}>
      <label className="verse-check" title="Sélectionner">
        <input
          type="checkbox"
          className="vc-input"
          checked={isSel}
          onChange={() => toggleVerse(chap.numero, verse.n, verse.t)}
        />
        <span className="vc-box" />
      </label>

      <button className="verse-audio-btn" title="Écouter depuis ce verset" onClick={handlePlay}>
        ▶
      </button>

      <span className="verse-num">{verse.n}</span>
      <span className="verse-text">{verse.t}</span>

      <div className="verse-colors">
        {COLORS.map(c => (
          <button
            key={c.hex}
            className={`color-dot ${hlColor === c.hex ? 'active' : ''}`}
            style={{ background: c.hex }}
            title={c.label}
            onClick={(e) => handleColorClick(e, c.hex)}
          />
        ))}
        <button className="color-dot erase" title="Effacer" onClick={handleErase}>
          ✕
        </button>
      </div>
    </div>
  );
}
