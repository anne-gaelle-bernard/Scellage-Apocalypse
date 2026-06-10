import React, { useEffect, useCallback } from 'react';
import { useApp } from '../App';
import { APOCALYPSE_LSG } from '../../data.js';
import VerseRow from '../components/VerseRow';
import { useSwipe } from '../hooks/useSwipe';

export default function LecturePage() {
  const { currentChapter, navigateToChapter, play } = useApp();
  const ch = APOCALYPSE_LSG.chapitres[currentChapter - 1];

  useEffect(() => { document.getElementById('page-lecture')?.scrollTo(0, 0); }, [currentChapter]);

  const goNext = useCallback(() => {
    if (currentChapter < 22) navigateToChapter(currentChapter + 1);
  }, [currentChapter, navigateToChapter]);

  const goPrev = useCallback(() => {
    if (currentChapter > 1) navigateToChapter(currentChapter - 1);
  }, [currentChapter, navigateToChapter]);

  const swipe = useSwipe(goNext, goPrev);

  if (!ch) return null;

  function handlePlayChapter() {
    const queue = ch.versets.map(v => ({
      chap: ch.numero, verse: v.n, text: v.t, ref: `Ap ${ch.numero}:${v.n}`,
    }));
    play(queue, 0);
  }

  return (
    <div {...swipe}>
      <div className="chapter-header">
        <div className="chapter-eyebrow">Apocalypse — Louis Segond 1910</div>
        <div className="chapter-title">Ap {ch.numero}</div>
        <button className="btn-listen-chapter" onClick={handlePlayChapter}>
          ▶ Écouter le chapitre
        </button>
      </div>

      <div className="verse-legend">
        <span><span className="legend-cb" /> Sélectionner</span>
        <span>▶ Écouter</span>
        <span>
          <span className="legend-dots">
            <span style={{ background: '#F5C518' }} />
            <span style={{ background: '#48BB78' }} />
            <span style={{ background: '#4299E1' }} />
          </span>
          Surligner
        </span>
        <span className="legend-swipe">← Swipe → changer chapitre</span>
      </div>

      <div id="ch-versets">
        {ch.versets.map(v => (
          <VerseRow key={v.n} chap={ch} verse={v} />
        ))}
      </div>

      <div className="chapter-nav">
        <button className="ch-nav-btn" disabled={currentChapter === 1} onClick={goPrev}>
          ← Précédent
        </button>
        <span style={{ color: 'var(--ink-3)', fontSize: '13px', fontStyle: 'italic' }}>
          {ch.versets.length} versets
        </span>
        <button className="ch-nav-btn" disabled={currentChapter === 22} onClick={goNext}>
          Suivant →
        </button>
      </div>
    </div>
  );
}
