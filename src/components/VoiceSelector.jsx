import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';

export default function VoiceSelector() {
  const { voices, selectedVoiceURI, setVoice, cleanVoiceName } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  if (!voices.length) return null;

  const current = voices.find(v => v.voiceURI === selectedVoiceURI) || voices[0];

  return (
    <div className="voice-selector" ref={ref}>
      <button
        className={`voice-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Choisir une voix"
      >
        <span className="voice-btn-icon">🎙</span>
        <span className="voice-btn-label">{current ? cleanVoiceName(current) : 'Voix'}</span>
        <span className="voice-btn-arrow">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="voice-dropdown">
          <div className="voice-dropdown-header">Voix disponibles</div>
          {voices.map(v => {
            const isSelected = v.voiceURI === selectedVoiceURI;
            return (
              <button
                key={v.voiceURI}
                className={`voice-option ${isSelected ? 'selected' : ''}`}
                onClick={() => { setVoice(v.voiceURI); setOpen(false); }}
              >
                <span className="voice-option-name">{cleanVoiceName(v)}</span>
                <span className="voice-option-meta">
                  {v.lang}
                  {v.localService && <span className="voice-local-badge">local</span>}
                </span>
                {isSelected && <span className="voice-check-icon">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
