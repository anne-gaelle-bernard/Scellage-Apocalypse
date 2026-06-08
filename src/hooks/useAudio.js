import { useState, useEffect, useRef, useCallback } from 'react';

function cleanVoiceName(voice) {
  let name = voice.name;
  // "Microsoft Hortense Desktop - French (France)" → "Hortense"
  if (/^microsoft/i.test(name)) {
    name = name.replace(/^microsoft\s+/i, '').split(/\s+desktop|\s+mobile|\s+-/i)[0].trim();
  }
  // "Google français" → keep as-is but strip redundant lang suffix
  name = name.replace(/\s*[-–]\s*(french|français|fr[-_]fr).*/i, '').trim();
  return name;
}

export function useAudio() {
  const synth = window.speechSynthesis;
  const voiceRef  = useRef(null);
  const queueRef  = useRef([]);
  const indexRef  = useRef(0);
  const rateRef   = useRef(0.9);
  const activeRef = useRef(false);
  const loopRef   = useRef(false);

  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(
    () => localStorage.getItem('apoc_voice') || ''
  );
  const [uiState, setUiState] = useState({ active: false, paused: false, current: null });
  const [speakingKey, setSpeakingKey] = useState(null);
  const [rate, setRateState] = useState(0.9);
  const [loop, setLoopState] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const all = synth.getVoices();
      if (!all.length) return;

      // French voices first; fall back to all if none found
      const fr = all.filter(v => v.lang.startsWith('fr'));
      const list = fr.length > 0 ? fr : all;
      setVoices(list);

      // Restore or auto-select
      const storedURI = localStorage.getItem('apoc_voice');
      const match   = storedURI ? list.find(v => v.voiceURI === storedURI) : null;
      const local   = list.find(v => v.lang === 'fr-FR' && v.localService);
      const anyFr   = list.find(v => v.lang.startsWith('fr'));
      voiceRef.current = match || local || anyFr || list[0] || null;

      if (voiceRef.current && !storedURI) {
        setSelectedVoiceURI(voiceRef.current.voiceURI);
        localStorage.setItem('apoc_voice', voiceRef.current.voiceURI);
      }
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;
    return () => { synth.onvoiceschanged = null; };
  }, []);

  const speakCurrent = useCallback(() => {
    if (!activeRef.current) return;

    if (indexRef.current >= queueRef.current.length) {
      if (loopRef.current && queueRef.current.length > 0) {
        indexRef.current = 0;
        speakCurrent();
        return;
      }
      activeRef.current = false;
      setSpeakingKey(null);
      setUiState({ active: false, paused: false, current: null });
      return;
    }

    const item = queueRef.current[indexRef.current];
    const utt  = new SpeechSynthesisUtterance(item.text);
    utt.lang   = 'fr-FR';
    utt.rate   = rateRef.current;
    if (voiceRef.current) utt.voice = voiceRef.current;

    utt.onstart = () => {
      setSpeakingKey(`${item.chap}:${item.verse}`);
      setUiState({
        active: true, paused: false,
        current: {
          ref: item.ref, text: item.text,
          index: indexRef.current,
          total: queueRef.current.length,
          loop: loopRef.current,
        },
      });
    };
    utt.onend = () => {
      setSpeakingKey(null);
      indexRef.current++;
      speakCurrent();
    };
    utt.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        setSpeakingKey(null);
        indexRef.current++;
        speakCurrent();
      }
    };
    synth.speak(utt);
  }, []);

  const play = useCallback((queue, startIndex = 0) => {
    synth.cancel();
    queueRef.current  = queue;
    indexRef.current  = startIndex;
    activeRef.current = true;
    setUiState({ active: true, paused: false, current: null });
    speakCurrent();
  }, [speakCurrent]);

  const toggle = useCallback(() => {
    if (!activeRef.current) return;
    if (synth.paused) {
      synth.resume();
      setUiState(prev => ({ ...prev, paused: false }));
    } else {
      synth.pause();
      setUiState(prev => ({ ...prev, paused: true }));
    }
  }, []);

  const stop = useCallback(() => {
    synth.cancel();
    activeRef.current = false;
    queueRef.current  = [];
    setSpeakingKey(null);
    setUiState({ active: false, paused: false, current: null });
  }, []);

  const skip = useCallback((delta) => {
    if (!activeRef.current) return;
    synth.cancel();
    setSpeakingKey(null);
    indexRef.current = Math.max(0, Math.min(queueRef.current.length - 1, indexRef.current + delta));
    speakCurrent();
  }, [speakCurrent]);

  const setRate = useCallback((r) => {
    rateRef.current = r;
    setRateState(r);
    if (activeRef.current) { synth.cancel(); speakCurrent(); }
  }, [speakCurrent]);

  const toggleLoop = useCallback(() => {
    const next = !loopRef.current;
    loopRef.current = next;
    setLoopState(next);
    setUiState(prev => prev.current
      ? { ...prev, current: { ...prev.current, loop: next } }
      : prev
    );
  }, []);

  const setVoice = useCallback((voiceURI) => {
    const all = synth.getVoices();
    const voice = all.find(v => v.voiceURI === voiceURI) || null;
    voiceRef.current = voice;
    setSelectedVoiceURI(voiceURI);
    localStorage.setItem('apoc_voice', voiceURI);
    if (activeRef.current) { synth.cancel(); speakCurrent(); }
  }, [speakCurrent]);

  return {
    uiState, speakingKey,
    play, toggle, stop, skip,
    setRate, rate,
    loop, toggleLoop,
    voices, selectedVoiceURI, setVoice, cleanVoiceName,
  };
}
