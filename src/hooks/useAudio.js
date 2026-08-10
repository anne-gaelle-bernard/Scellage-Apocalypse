import { useState, useEffect, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

function cleanVoiceName(voice) {
  let name = voice.name;
  // "Microsoft Hortense Desktop - French (France)" → "Hortense"
  if (/^microsoft/i.test(name)) {
    name = name.replace(/^microsoft\s+/i, '').split(/\s+desktop|\s+mobile|\s+-/i)[0].trim();
  }
  // "Microsoft Denise Online (Natural) - French (France)" → "Denise"
  name = name.replace(/\s*online\s*\(natural\)/i, '').trim();
  // "Google français" → keep as-is but strip redundant lang suffix
  name = name.replace(/\s*[-–]\s*(french|français|fr[-_]fr).*/i, '').trim();
  return name;
}

// Edge/Chrome expose higher-quality "Online (Natural)" neural voices alongside
// the old robotic offline ones, and Android exposes better network voices
// alongside compact on-device ones. Neither flags this explicitly in the name
// in a consistent way, so detect by name and by localService === false.
function isNaturalVoice(voice) {
  return /natural|online|network/i.test(voice.name) || voice.localService === false;
}

// ─── Web: browser Web Speech API (window.speechSynthesis) ─────────────────────
// True pause/resume, used outside the packaged app (desktop + mobile browsers).
function useWebAudio() {
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

      // French voices first; fall back to all if none found.
      // Natural/online voices are sorted ahead of old robotic offline ones.
      const fr = all.filter(v => v.lang.startsWith('fr'));
      const list = (fr.length > 0 ? fr : all)
        .slice()
        .sort((a, b) => (isNaturalVoice(b) ? 1 : 0) - (isNaturalVoice(a) ? 1 : 0));
      setVoices(list);

      // Restore or auto-select — prefer a natural voice by default
      const storedURI = localStorage.getItem('apoc_voice');
      const match   = storedURI ? list.find(v => v.voiceURI === storedURI) : null;
      const natural = list.find(v => v.lang === 'fr-FR' && isNaturalVoice(v));
      const local   = list.find(v => v.lang === 'fr-FR');
      const anyFr   = list.find(v => v.lang.startsWith('fr'));
      voiceRef.current = match || natural || local || anyFr || list[0] || null;

      if (voiceRef.current && !storedURI) {
        setSelectedVoiceURI(voiceRef.current.voiceURI);
        localStorage.setItem('apoc_voice', voiceRef.current.voiceURI);
      }
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    // Mobile browsers (esp. iOS Safari) rarely fire voiceschanged — poll as fallback
    let tries = 0;
    const poll = setInterval(() => {
      if (++tries > 20) { clearInterval(poll); return; }
      loadVoices();
    }, 250);

    return () => {
      synth.onvoiceschanged = null;
      clearInterval(poll);
    };
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
    voices, selectedVoiceURI, setVoice, cleanVoiceName, isNaturalVoice,
    needsVoiceInstall: false, installVoiceData: () => {},
  };
}

// ─── Native: Android/iOS system TTS engine via Capacitor plugin ───────────────
// Used inside the packaged app. Same Google/system voices as any other native
// app — much better quality than the WebView's Web Speech API, which on
// Android often only exposes a couple of very robotic on-device voices.
// The plugin has no native pause API, so "pause" stops the current utterance
// and "resume" re-speaks that same verse from the start.
function useNativeAudio() {
  const voiceRef     = useRef(null);   // selected voice object (from rawVoicesRef)
  const rawVoicesRef  = useRef([]);    // unsorted list exactly as returned by the plugin
  const queueRef      = useRef([]);
  const indexRef       = useRef(0);
  const rateRef        = useRef(0.9);
  const activeRef      = useRef(false);
  const pausedRef      = useRef(false);
  const loopRef         = useRef(false);
  const genRef           = useRef(0); // cancellation token for in-flight speak() awaits

  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(
    () => localStorage.getItem('apoc_voice') || ''
  );
  const [uiState, setUiState] = useState({ active: false, paused: false, current: null });
  const [speakingKey, setSpeakingKey] = useState(null);
  const [rate, setRateState] = useState(0.9);
  const [loop, setLoopState] = useState(false);
  // True when the device has no French voice at all — many Android phones
  // ship without French TTS data installed, silently falling back to
  // English or a robotic default. Surfaced so the UI can offer a one-tap
  // fix via installVoiceData() instead of just sounding wrong.
  const [needsVoiceInstall, setNeedsVoiceInstall] = useState(false);

  useEffect(() => {
    let cancelled = false;
    TextToSpeech.getSupportedVoices().then(({ voices: all }) => {
      if (cancelled || !all?.length) return;
      rawVoicesRef.current = all;

      const fr = all.filter(v => v.lang.startsWith('fr'));
      setNeedsVoiceInstall(fr.length === 0);
      const list = (fr.length > 0 ? fr : all)
        .slice()
        .sort((a, b) => (isNaturalVoice(b) ? 1 : 0) - (isNaturalVoice(a) ? 1 : 0));
      setVoices(list);

      const storedURI = localStorage.getItem('apoc_voice');
      const match   = storedURI ? list.find(v => v.voiceURI === storedURI) : null;
      const natural = list.find(v => v.lang === 'fr-FR' && isNaturalVoice(v));
      const local   = list.find(v => v.lang === 'fr-FR');
      const anyFr   = list.find(v => v.lang.startsWith('fr'));
      voiceRef.current = match || natural || local || anyFr || list[0] || null;

      if (voiceRef.current && !storedURI) {
        setSelectedVoiceURI(voiceRef.current.voiceURI);
        localStorage.setItem('apoc_voice', voiceRef.current.voiceURI);
      }
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const installVoiceData = useCallback(() => {
    TextToSpeech.openInstall().catch(() => {});
  }, []);

  const speakCurrent = useCallback(async () => {
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

    const myGen = genRef.current;
    const item  = queueRef.current[indexRef.current];
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

    const voiceIdx = voiceRef.current
      ? rawVoicesRef.current.findIndex(v => v.voiceURI === voiceRef.current.voiceURI)
      : -1;

    try {
      await TextToSpeech.speak({
        text: item.text,
        lang: 'fr-FR',
        rate: rateRef.current,
        voice: voiceIdx >= 0 ? voiceIdx : undefined,
        category: 'playback',
      });
    } catch (_) { /* interrupted by stop() on pause/skip/stop — expected */ }

    if (myGen !== genRef.current) return; // superseded by a newer play/skip/stop/pause
    if (!activeRef.current || pausedRef.current) return;

    indexRef.current++;
    speakCurrent();
  }, []);

  const play = useCallback((queue, startIndex = 0) => {
    genRef.current++;
    TextToSpeech.stop().catch(() => {});
    queueRef.current  = queue;
    indexRef.current  = startIndex;
    activeRef.current = true;
    pausedRef.current = false;
    setUiState({ active: true, paused: false, current: null });
    speakCurrent();
  }, [speakCurrent]);

  const toggle = useCallback(() => {
    if (!activeRef.current) return;
    if (pausedRef.current) {
      pausedRef.current = false;
      setUiState(prev => ({ ...prev, paused: false }));
      speakCurrent();
    } else {
      pausedRef.current = true;
      genRef.current++;
      TextToSpeech.stop().catch(() => {});
      setUiState(prev => ({ ...prev, paused: true }));
    }
  }, [speakCurrent]);

  const stop = useCallback(() => {
    genRef.current++;
    TextToSpeech.stop().catch(() => {});
    activeRef.current = false;
    pausedRef.current = false;
    queueRef.current  = [];
    setSpeakingKey(null);
    setUiState({ active: false, paused: false, current: null });
  }, []);

  const skip = useCallback((delta) => {
    if (!activeRef.current) return;
    genRef.current++;
    TextToSpeech.stop().catch(() => {});
    setSpeakingKey(null);
    indexRef.current = Math.max(0, Math.min(queueRef.current.length - 1, indexRef.current + delta));
    pausedRef.current = false;
    speakCurrent();
  }, [speakCurrent]);

  const setRate = useCallback((r) => {
    rateRef.current = r;
    setRateState(r);
    if (activeRef.current && !pausedRef.current) {
      genRef.current++;
      TextToSpeech.stop().catch(() => {});
      speakCurrent();
    }
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
    const voice = rawVoicesRef.current.find(v => v.voiceURI === voiceURI) || null;
    voiceRef.current = voice;
    setSelectedVoiceURI(voiceURI);
    localStorage.setItem('apoc_voice', voiceURI);
    if (activeRef.current && !pausedRef.current) {
      genRef.current++;
      TextToSpeech.stop().catch(() => {});
      speakCurrent();
    }
  }, [speakCurrent]);

  return {
    uiState, speakingKey,
    play, toggle, stop, skip,
    setRate, rate,
    loop, toggleLoop,
    voices, selectedVoiceURI, setVoice, cleanVoiceName, isNaturalVoice,
    needsVoiceInstall, installVoiceData,
  };
}

// Platform is fixed for the lifetime of the app, so branching here never
// violates the rules of hooks (the same branch runs on every render).
export function useAudio() {
  return Capacitor.isNativePlatform() ? useNativeAudio() : useWebAudio();
}
