import React from 'react';
import { useApp } from '../App';
import { APOCALYPSE_LSG } from '../../data.js';

export default function Sidebar() {
  const { currentPage, currentChapter, navigate, navigateToChapter, sidebarOpen, selectedVerses } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  const isActive = (page) => currentPage === page;
  const isChapActive = (num) => currentPage === 'lecture' && currentChapter === num;

  return (
    <nav id="sidebar" className={sidebarOpen ? 'open' : ''}>
      <div id="sidebar-header">
        <div id="sidebar-logo">Louis Segond 1910</div>
        <div id="sidebar-title">
          L'Apocalypse<br /><span>de Jean</span>
        </div>
      </div>

      <div id="sidebar-nav">
        <div className="nav-section-label">Navigation</div>

        <div
          className={`nav-item ${isActive('home') ? 'active' : ''}`}
          onClick={() => navigate('home')}
        >
          <span className="nav-icon">&#9632;</span> Accueil
        </div>

        <div className="nav-divider" />
        <div className="nav-section-label">Chapitres</div>

        {APOCALYPSE_LSG.chapitres.map(ch => (
          <div
            key={ch.numero}
            className={`nav-item ${isChapActive(ch.numero) ? 'active' : ''}`}
            onClick={() => navigateToChapter(ch.numero)}
            title={ch.titre}
          >
            Ap {ch.numero}
          </div>
        ))}

        <div className="nav-divider" />
        <div className="nav-section-label">Entraînement</div>

        <div
          className={`nav-item ${isActive('selection') ? 'active' : ''}`}
          onClick={() => navigate('selection')}
        >
          <span className="nav-icon">&#9670;</span>
          <span style={{ flex: 1 }}>Mes versets</span>
          <span className="badge">{selCount}</span>
        </div>

        <div
          className={`nav-item ${isActive('flashcard') ? 'active' : ''}`}
          onClick={() => navigate('flashcard')}
        >
          <span className="nav-icon">🃏</span> Cartes mémoire
        </div>

        <div
          className={`nav-item ${isActive('lacunes') ? 'active' : ''}`}
          onClick={() => navigate('lacunes')}
        >
          <span className="nav-icon">&#9671;</span> Texte à trou
        </div>

        <div
          className={`nav-item ${isActive('recitation') ? 'active' : ''}`}
          onClick={() => navigate('recitation')}
        >
          <span className="nav-icon">&#9651;</span> Récitation
        </div>
      </div>
    </nav>
  );
}
