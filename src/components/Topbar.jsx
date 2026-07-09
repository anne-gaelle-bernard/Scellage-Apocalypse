import React from 'react';
import { useApp } from '../App';
import VoiceSelector from './VoiceSelector';
import InstallPrompt from './InstallPrompt';

const PAGE_TITLES = {
  home:       'Scellage',
  lecture:    'Lecture',
  selection:  'Mes versets',
  flashcard:  'Cartes mémoire',
  lacunes:    'Texte à trou',
  recitation: 'Récitation',
  notes:      'Notes & Plan',
  dictee:     'Dictée guidée',
};

export default function Topbar() {
  const { navigate, toggleSidebar, selectedVerses, currentPage } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  return (
    <div id="topbar">
      <button id="menu-toggle" onClick={toggleSidebar}>&#9776;</button>
      <div id="topbar-title">{PAGE_TITLES[currentPage] ?? 'Scellage'}</div>
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
