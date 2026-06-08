import React from 'react';
import { useApp } from '../App';
import VoiceSelector from './VoiceSelector';
import InstallPrompt from './InstallPrompt';

export default function Topbar() {
  const { navigate, toggleSidebar, selectedVerses } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  return (
    <div id="topbar">
      <button id="menu-toggle" onClick={toggleSidebar}>&#9776;</button>
      <div id="topbar-title">L'Apocalypse — LSG 1910</div>
      <VoiceSelector />
      <InstallPrompt />
      <div id="topbar-badge-wrap">
        {selCount > 0 && (
          <span
            id="topbar-badge"
            onClick={() => navigate('selection')}
            title="Mes versets sélectionnés"
            style={{ cursor: 'pointer' }}
          >
            <span className="badge">{selCount} versets</span>
          </span>
        )}
      </div>
    </div>
  );
}
