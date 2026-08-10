import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { Mic, ChevronUp, ChevronDown, Check, Download } from 'lucide-react';

export default function VoiceSelector() {
  const { voices, selectedVoiceURI, setVoice, cleanVoiceName, isNaturalVoice, needsVoiceInstall, installVoiceData } = useApp();
  const [open, setOpen] = useState(false);
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

  if (!voices.length) return null;

  const current = voices.find(v => v.voiceURI === selectedVoiceURI) || voices[0];

  return (
    <div className="voice-selector" ref={ref}>
      <button
        className={`voice-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Choisir une voix"
      >
        <span className="voice-btn-icon"><Mic size={14} strokeWidth={2} /></span>
        <span className="voice-btn-label">{current ? cleanVoiceName(current) : 'Voix'}</span>
        <span className="voice-btn-arrow">
          {open ? <ChevronUp size={12} strokeWidth={2.5} /> : <ChevronDown size={12} strokeWidth={2.5} />}
        </span>
      </button>

      {open && (
        <div className="voice-dropdown">
          {needsVoiceInstall && (
            <button className="voice-install-banner" onClick={installVoiceData}>
              <Download size={13} strokeWidth={2} />
              Aucune voix française installée — installer
            </button>
          )}
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
                  {isNaturalVoice(v)
                    ? <span className="voice-local-badge voice-natural-badge">naturelle</span>
                    : <span className="voice-local-badge">standard</span>}
                </span>
                {isSelected && <span className="voice-check-icon"><Check size={12} strokeWidth={2.5} /></span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
