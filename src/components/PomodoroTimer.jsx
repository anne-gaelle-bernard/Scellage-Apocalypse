import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Check } from 'lucide-react';

const PRESETS = {
  '25-5':  { label: '25 / 5',  work: 25 * 60, brk: 5 * 60 },
  '50-10': { label: '50 / 10', work: 50 * 60, brk: 10 * 60 },
};

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (_) { /* AudioContext unavailable — silent fallback */ }
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function clampMin(v, fallback) {
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(180, n));
}

export default function PomodoroTimer() {
  const [open, setOpen]         = useState(false);
  const [presetKey, setPreset]  = useState(() => localStorage.getItem('apoc_pomo_preset') || '25-5');
  const [customWork, setCustomWork] = useState(() => clampMin(localStorage.getItem('apoc_pomo_custom_work'), 25));
  const [customBrk, setCustomBrk]   = useState(() => clampMin(localStorage.getItem('apoc_pomo_custom_brk'), 5));
  const [customOpen, setCustomOpen] = useState(false);

  const getPreset = useCallback((key) => (
    key === 'custom'
      ? { label: 'Perso', work: customWork * 60, brk: customBrk * 60 }
      : PRESETS[key]
  ), [customWork, customBrk]);

  const [phase, setPhase]       = useState('work'); // 'work' | 'break'
  const [secondsLeft, setSecondsLeft] = useState(() => getPreset(presetKey).work);
  const [running, setRunning]   = useState(false);
  const [cycles, setCycles]     = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClose(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('touchstart', handleClose, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('touchstart', handleClose);
    };
  }, [open]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (secondsLeft > 0) return;
    if (!running) return;
    beep();
    const preset = getPreset(presetKey);
    if (phase === 'work') {
      setCycles(c => c + 1);
      setPhase('break');
      setSecondsLeft(preset.brk);
    } else {
      setPhase('work');
      setSecondsLeft(preset.work);
    }
  }, [secondsLeft, running, phase, presetKey, getPreset]);

  useEffect(() => {
    const suffix = running ? ` — ${formatTime(secondsLeft)} ${phase === 'work' ? '🍅' : '☕'}` : '';
    document.title = 'Scellage' + suffix;
    return () => { document.title = 'Scellage'; };
  }, [secondsLeft, running, phase]);

  const changePreset = useCallback((key) => {
    setPreset(key);
    localStorage.setItem('apoc_pomo_preset', key);
    setCustomOpen(false);
    setRunning(false);
    setPhase('work');
    setSecondsLeft(getPreset(key).work);
  }, [getPreset]);

  const applyCustom = useCallback(() => {
    localStorage.setItem('apoc_pomo_custom_work', String(customWork));
    localStorage.setItem('apoc_pomo_custom_brk', String(customBrk));
    changePreset('custom');
  }, [customWork, customBrk, changePreset]);

  const reset = useCallback(() => {
    setRunning(false);
    setPhase('work');
    setCycles(0);
    setSecondsLeft(getPreset(presetKey).work);
  }, [presetKey, getPreset]);

  const preset = getPreset(presetKey);
  const total = phase === 'work' ? preset.work : preset.brk;
  const pct = Math.round((1 - secondsLeft / total) * 100);

  return (
    <div className="pomodoro-wrap" ref={ref}>
      {open && (
        <div className={`pomodoro-panel ${phase}`}>
          <div className="pomodoro-panel-header">
            <span>{phase === 'work' ? '🍅 Concentration' : '☕ Pause'}</span>
            <button className="pomodoro-close" onClick={() => setOpen(false)}><X size={14} /></button>
          </div>

          <div className="pomodoro-time">{formatTime(secondsLeft)}</div>

          <div className="pomodoro-progress">
            <div className="pomodoro-progress-fill" style={{ width: `${pct}%` }} />
          </div>

          <div className="pomodoro-presets">
            {Object.entries(PRESETS).map(([key, p]) => (
              <button
                key={key}
                className={`pomodoro-preset-btn ${presetKey === key ? 'active' : ''}`}
                onClick={() => changePreset(key)}
              >
                {p.label}
              </button>
            ))}
            <button
              className={`pomodoro-preset-btn ${presetKey === 'custom' ? 'active' : ''}`}
              onClick={() => setCustomOpen(o => !o)}
            >
              {presetKey === 'custom' ? `${customWork} / ${customBrk}` : 'Perso'}
            </button>
          </div>

          {customOpen && (
            <div className="pomodoro-custom-row">
              <label>
                <span>Travail</span>
                <input
                  type="number" min="1" max="180" value={customWork}
                  onChange={e => setCustomWork(clampMin(e.target.value, customWork))}
                />
                <span>min</span>
              </label>
              <label>
                <span>Pause</span>
                <input
                  type="number" min="1" max="180" value={customBrk}
                  onChange={e => setCustomBrk(clampMin(e.target.value, customBrk))}
                />
                <span>min</span>
              </label>
              <button className="pomodoro-custom-apply" onClick={applyCustom} title="Appliquer">
                <Check size={14} />
              </button>
            </div>
          )}

          <div className="pomodoro-controls">
            <button className="pomodoro-ctrl-btn" onClick={reset} title="Réinitialiser">
              <RotateCcw size={15} />
            </button>
            <button className="pomodoro-ctrl-btn pomodoro-ctrl-main" onClick={() => setRunning(r => !r)}>
              {running ? <Pause size={16} /> : <Play size={16} />}
              {running ? 'Pause' : 'Démarrer'}
            </button>
          </div>

          {cycles > 0 && <div className="pomodoro-cycles">{cycles} session{cycles > 1 ? 's' : ''} terminée{cycles > 1 ? 's' : ''}</div>}
        </div>
      )}

      <button
        className={`pomodoro-fab ${running ? (phase === 'work' ? 'running-work' : 'running-break') : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Minuteur Pomodoro"
      >
        {running ? <span className="pomodoro-fab-time">{formatTime(secondsLeft)}</span> : <Timer size={18} strokeWidth={2} />}
      </button>
    </div>
  );
}
