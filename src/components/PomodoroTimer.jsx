import React, { useRef, useEffect } from 'react';
import { useApp } from '../App';
import { PRESETS, formatPomoTime } from '../hooks/usePomodoro';
import { Timer, Play, Pause, RotateCcw, X, Check } from 'lucide-react';

function clampMin(v, fallback) {
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(180, n));
}

export default function PomodoroTimer() {
  const { pomodoro: p } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    if (!p.panelOpen) return;
    function handleClose(e) {
      if (ref.current && !ref.current.contains(e.target)) p.closeOpen();
    }
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('touchstart', handleClose, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('touchstart', handleClose);
    };
  }, [p.panelOpen, p.closeOpen]);

  const preset = p.getPreset(p.presetKey);
  const total = p.phase === 'work' ? preset.work : preset.brk;
  const pct = Math.round((1 - p.secondsLeft / total) * 100);

  return (
    <div className="pomodoro-wrap" ref={ref}>
      {p.panelOpen && (
        <div className={`pomodoro-panel ${p.phase}`}>
          <div className="pomodoro-panel-header">
            <span>{p.phase === 'work' ? '🍅 Concentration' : '☕ Pause'}</span>
            <button className="pomodoro-close" onClick={p.closeOpen}><X size={14} /></button>
          </div>

          <div className="pomodoro-time">{formatPomoTime(p.secondsLeft)}</div>

          <div className="pomodoro-progress">
            <div className="pomodoro-progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <div className="pomodoro-presets">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                className={`pomodoro-preset-btn ${p.presetKey === key ? 'active' : ''}`}
                onClick={() => p.changePreset(key)}
              >
                {preset.label}
              </button>
            ))}
            <button
              className={`pomodoro-preset-btn ${p.presetKey === 'custom' ? 'active' : ''}`}
              onClick={() => p.setCustomOpen(o => !o)}
            >
              {p.presetKey === 'custom' ? `${p.customWork} / ${p.customBrk}` : 'Perso'}
            </button>
          </div>

          {p.customOpen && (
            <div className="pomodoro-custom-row">
              <label>
                <span>Travail</span>
                <input
                  type="number" min="1" max="180" value={p.customWork}
                  onChange={e => p.setCustomWork(clampMin(e.target.value, p.customWork))}
                />
                <span>min</span>
              </label>
              <label>
                <span>Pause</span>
                <input
                  type="number" min="1" max="180" value={p.customBrk}
                  onChange={e => p.setCustomBrk(clampMin(e.target.value, p.customBrk))}
                />
                <span>min</span>
              </label>
              <button className="pomodoro-custom-apply" onClick={p.applyCustom} title="Appliquer">
                <Check size={14} />
              </button>
            </div>
          )}

          <div className="pomodoro-controls">
            <button className="pomodoro-ctrl-btn" onClick={p.reset} title="Réinitialiser">
              <RotateCcw size={15} />
            </button>
            <button className="pomodoro-ctrl-btn pomodoro-ctrl-main" onClick={p.toggleRunning}>
              {p.running ? <Pause size={16} /> : <Play size={16} />}
              {p.running ? 'Pause' : 'Démarrer'}
            </button>
          </div>

          {p.cycles > 0 && <div className="pomodoro-cycles">{p.cycles} session{p.cycles > 1 ? 's' : ''} terminée{p.cycles > 1 ? 's' : ''}</div>}
        </div>
      )}

      <button
        className={`pomodoro-fab ${p.running ? (p.phase === 'work' ? 'running-work' : 'running-break') : ''}`}
        onClick={p.toggleOpen}
        title="Minuteur Pomodoro"
      >
        {p.running ? <span className="pomodoro-fab-time">{formatPomoTime(p.secondsLeft)}</span> : <Timer size={18} strokeWidth={2} />}
      </button>
    </div>
  );
}
