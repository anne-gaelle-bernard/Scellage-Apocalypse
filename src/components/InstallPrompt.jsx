import React, { useState, useEffect } from 'react';

// Detects iOS Safari (no beforeinstallprompt support)
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
}
// Already installed as standalone
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOS, setShowIOS]               = useState(false);

  useEffect(() => {
    function handler(e) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (isStandalone()) return null;

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else if (isIOS()) {
      setShowIOS(true);
    }
  }

  const canInstall = !!deferredPrompt || isIOS();
  if (!canInstall) return null;

  return (
    <>
      <button className="install-btn" onClick={handleInstall} title="Installer l'application">
        <span className="install-btn-icon">⬇</span>
        <span className="install-btn-label">Installer</span>
      </button>

      {showIOS && (
        <div className="install-ios-overlay" onClick={() => setShowIOS(false)}>
          <div className="install-ios-modal" onClick={e => e.stopPropagation()}>
            <button className="install-ios-close" onClick={() => setShowIOS(false)}>✕</button>
            <div className="install-ios-icon">📱</div>
            <h3>Installer sur iPhone / iPad</h3>
            <ol className="install-ios-steps">
              <li>Appuyez sur <strong>Partager</strong> <span className="install-ios-share">⎋</span> en bas de Safari</li>
              <li>Faites défiler et tapez <strong>« Sur l'écran d'accueil »</strong></li>
              <li>Confirmez avec <strong>Ajouter</strong></li>
            </ol>
            <p className="install-ios-note">L'app fonctionnera hors-ligne et aura sa propre icône.</p>
          </div>
        </div>
      )}
    </>
  );
}
