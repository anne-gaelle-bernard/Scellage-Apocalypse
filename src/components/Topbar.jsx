import React from 'react';
import { useApp } from '../App';
import VoiceSelector from './VoiceSelector';

const PAGE_TITLES = {
  home: 'Apocalypse — LSG 1910',
  selection: 'Mes versets — LSG',
  lacunes: 'Texte à trou — LSG',
  recitation: 'Récitation — LSG',
};

export default function Topbar() {
  const { currentPage, currentChapter, navigate, toggleSidebar, selectedVerses } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  const title = currentPage === 'lecture'
    ? `Chapitre ${currentChapter} — LSG`
    : PAGE_TITLES[currentPage] || 'Apocalypse — LSG';

  return (
    <div id="topbar">
      <button id="menu-toggle" onClick={toggleSidebar}>&#9776;</button>
      <div id="topbar-title">{title}</div>
      <VoiceSelector />
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
