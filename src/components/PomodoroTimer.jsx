import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw, X } from 'lucide-react';

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

export default function PomodoroTimer() {
  const [open, setOpen]         = useState(false);
  const [presetKey, setPreset]  = useState(() => localStorage.getItem('apoc_pomo_preset') || '25-5');
  const [phase, setPhase]       = useState('work'); // 'work' | 'break'
  const [secondsLeft, setSecondsLeft] = useState(PRESETS[presetKey].work);
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
    const preset = PRESETS[presetKey];
    if (phase === 'work') {
      setCycles(c => c + 1);
      setPhase('break');
      setSecondsLeft(preset.brk);
    } else {
      setPhase('work');
      setSecondsLeft(preset.work);
    }
  }, [secondsLeft, running, phase, presetKey]);

  useEffect(() => {
    const suffix = running ? ` — ${formatTime(secondsLeft)} ${phase === 'work' ? '🍅' : '☕'}` : '';
    document.title = 'Scellage' + suffix;
    return () => { document.title = 'Scellage'; };
  }, [secondsLeft, running, phase]);

  const changePreset = useCallback((key) => {
    setPreset(key);
    localStorage.setItem('apoc_pomo_preset', key);
    setRunning(false);
    setPhase('work');
    setSecondsLeft(PRESETS[key].work);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setPhase('work');
    setCycles(0);
    setSecondsLeft(PRESETS[presetKey].work);
  }, [presetKey]);

  const preset = PRESETS[presetKey];
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
          </div>

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
