import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../App';
import { Target, BarChart2, PenLine } from 'lucide-react';

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
  return Math.ceil(diff / 86400000);
}

export default function NotesPage() {
  const { selectedVerses, highlightColors } = useApp();

  const [notes,    setNotes]    = useState(() => localStorage.getItem('apoc_notes')    || '');
  const [goal,     setGoal]     = useState(() => parseInt(localStorage.getItem('apoc_goal') || '10'));
  const [deadline, setDeadline] = useState(() => localStorage.getItem('apoc_deadline') || '');
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem('apoc_notes', notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    }, 700);
    return () => clearTimeout(t);
  }, [notes]);

  function handleGoal(v) {
    const n = Math.max(1, Math.min(405, parseInt(v) || 1));
    setGoal(n);
    localStorage.setItem('apoc_goal', String(n));
  }

  function handleDeadline(v) {
    setDeadline(v);
    localStorage.setItem('apoc_deadline', v);
  }

  const selCount  = Object.keys(selectedVerses).length;
  const hlCount   = Object.keys(highlightColors).length;
  const chapsDone = useMemo(
    () => new Set(Object.values(selectedVerses).map(v => v.chap)),
    [selectedVerses]
  );

  const progress = goal > 0 ? Math.min(100, Math.round((selCount / goal) * 100)) : 0;
  const daysLeft = daysUntil(deadline);

  return (
    <>
      <div className="page-title">Notes &amp; Plan</div>

      {/* Top two cards side-by-side on desktop */}
      <div className="notes-grid">

        {/* Objectif */}
        <div className="notes-card">
          <div className="notes-card-header">
            <span className="notes-card-icon"><Target size={16} strokeWidth={2} /></span>
            <h3>Mon objectif</h3>
          </div>

          <div className="notes-goal-row">
            <span>Mémoriser</span>
            <input
              type="number" className="notes-goal-input"
              value={goal} min="1" max="405"
              onChange={e => handleGoal(e.target.value)}
            />
            <span>versets</span>
          </div>

          <div className="notes-goal-row" style={{ marginTop: '10px' }}>
            <span>Avant le</span>
            <input
              type="date" className="notes-date-input"
              value={deadline}
              onChange={e => handleDeadline(e.target.value)}
            />
            {daysLeft !== null && (
              <span className={`notes-days-badge ${daysLeft < 0 ? 'overdue' : daysLeft <= 7 ? 'urgent' : ''}`}>
                {daysLeft < 0
                  ? `${Math.abs(daysLeft)}j dépassé`
                  : daysLeft === 0 ? "aujourd'hui !"
                  : `${daysLeft}j restants`}
              </span>
            )}
          </div>

          <div className="notes-progress-wrap">
            <div className="notes-progress-bar">
              <div className="notes-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="notes-progress-meta">
              <span>{selCount} / {goal} versets</span>
              <span className="notes-pct">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="notes-card">
          <div className="notes-card-header">
            <span className="notes-card-icon"><BarChart2 size={16} strokeWidth={2} /></span>
            <h3>Progression</h3>
          </div>

          <div className="notes-stats-grid">
            <div className="notes-stat">
              <span className="notes-stat-n">{selCount}</span>
              <span className="notes-stat-l">Versets mémorisés</span>
            </div>
            <div className="notes-stat">
              <span className="notes-stat-n">{hlCount}</span>
              <span className="notes-stat-l">Versets surlignés</span>
            </div>
            <div className="notes-stat">
              <span className="notes-stat-n">{chapsDone.size}</span>
              <span className="notes-stat-l">Chapitres travaillés</span>
            </div>
            <div className="notes-stat">
              <span className="notes-stat-n">{22 - chapsDone.size}</span>
              <span className="notes-stat-l">Chapitres restants</span>
            </div>
          </div>

          <div className="notes-chap-track">
            {Array.from({ length: 22 }, (_, i) => i + 1).map(n => (
              <div
                key={n}
                className={`notes-chap-pip ${chapsDone.has(n) ? 'done' : ''}`}
                title={`Ap ${n}`}
              >
                <span className="notes-chap-num">{n}</span>
              </div>
            ))}
          </div>
          <p className="notes-chap-legend">
            <span className="notes-pip-dot done" /> Chapitres avec versets sélectionnés
          </p>
        </div>
      </div>

      {/* Notes libres — full width */}
      <div className="notes-card">
        <div className="notes-card-header">
          <span className="notes-card-icon"><PenLine size={16} strokeWidth={2} /></span>
          <h3>Notes personnelles</h3>
          {saved && <span className="notes-saved">Sauvegardé</span>}
        </div>
        <textarea
          className="notes-textarea"
          placeholder="Réflexions, prières, observations sur les versets que vous mémorisez…"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={10}
        />
      </div>
    </>
  );
}
