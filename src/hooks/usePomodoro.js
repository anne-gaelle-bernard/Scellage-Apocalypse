import { useState, useEffect, useCallback } from 'react';

export const PRESETS = {
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

export function formatPomoTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function clampMin(v, fallback) {
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(1, Math.min(180, n));
}

export function usePomodoro() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [presetKey, setPreset]    = useState(() => localStorage.getItem('apoc_pomo_preset') || '25-5');
  const [customWork, setCustomWorkState] = useState(() => clampMin(localStorage.getItem('apoc_pomo_custom_work'), 25));
  const [customBrk, setCustomBrkState]   = useState(() => clampMin(localStorage.getItem('apoc_pomo_custom_brk'), 5));
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

  const toggleOpen = useCallback(() => setPanelOpen(o => !o), []);
  const closeOpen  = useCallback(() => setPanelOpen(false), []);

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
    const suffix = running ? ` — ${formatPomoTime(secondsLeft)} ${phase === 'work' ? '🍅' : '☕'}` : '';
    document.title = 'Scellage' + suffix;
    return () => { document.title = 'Scellage'; };
  }, [secondsLeft, running, phase]);

  const changePreset = useCallback((key) => {
    setPreset(key);
    localStorage.setItem('apoc_pomo_preset', key);
    setRunning(false);
    setPhase('work');
    setSecondsLeft(getPreset(key).work);
  }, [getPreset]);

  // Selecting "Perso" applies the custom duration immediately (using
  // whatever was last saved) instead of requiring a separate "Appliquer"
  // step — that extra tap was easy to miss, especially on mobile, leaving
  // Démarrer silently running the previous preset instead of the custom one.
  const selectCustom = useCallback(() => {
    setCustomOpen(o => !o);
    if (presetKey !== 'custom') changePreset('custom');
  }, [presetKey, changePreset]);

  // Typing new values updates the running duration live (only while the
  // timer isn't already counting down, so an active session isn't disrupted).
  const updateCustomWork = useCallback((v) => {
    setCustomWorkState(prev => {
      const mins = clampMin(v, prev);
      localStorage.setItem('apoc_pomo_custom_work', String(mins));
      if (presetKey === 'custom' && !running && phase === 'work') setSecondsLeft(mins * 60);
      return mins;
    });
  }, [presetKey, running, phase]);

  const updateCustomBrk = useCallback((v) => {
    setCustomBrkState(prev => {
      const mins = clampMin(v, prev);
      localStorage.setItem('apoc_pomo_custom_brk', String(mins));
      if (presetKey === 'custom' && !running && phase === 'break') setSecondsLeft(mins * 60);
      return mins;
    });
  }, [presetKey, running, phase]);

  const reset = useCallback(() => {
    setRunning(false);
    setPhase('work');
    setCycles(0);
    setSecondsLeft(getPreset(presetKey).work);
  }, [presetKey, getPreset]);

  const toggleRunning = useCallback(() => setRunning(r => !r), []);

  return {
    pomodoro: {
      panelOpen, toggleOpen, closeOpen,
      presetKey, changePreset, selectCustom,
      customWork, customBrk, updateCustomWork, updateCustomBrk, customOpen,
      phase, secondsLeft, running, toggleRunning, cycles, reset,
      getPreset,
    },
  };
}
