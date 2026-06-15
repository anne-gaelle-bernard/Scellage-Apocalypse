import React from 'react';
import { useApp } from '../App';
import { APOCALYPSE_LSG } from '../../data.js';
import { Home, BookMarked, Layers, PenLine, Mic, NotebookPen, Pencil, GraduationCap } from 'lucide-react';

export default function Sidebar() {
  const { currentPage, currentChapter, navigate, navigateToChapter, sidebarOpen, selectedVerses } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  const isActive = (page) => currentPage === page;
  const isChapActive = (num) => currentPage === 'lecture' && currentChapter === num;

  return (
    <nav id="sidebar" className={sidebarOpen ? 'open' : ''}>
      <div id="sidebar-header">
        <div id="sidebar-logo">L'Apocalypse · LSG 1910</div>
        <div id="sidebar-title">
          Scellage<br /><span>en cours</span>
        </div>
      </div>

      <div id="sidebar-nav">
        <div className="nav-section-label">Navigation</div>

        <div
          className={`nav-item ${isActive('home') ? 'active' : ''}`}
          onClick={() => navigate('home')}
        >
          <span className="nav-icon"><Home size={14} strokeWidth={2} /></span>
          Accueil
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
      </div>

      <div id="sidebar-training">
        <div className="nav-section-label">Entraînement</div>

        <div
          className={`nav-item ${isActive('selection') ? 'active' : ''}`}
          onClick={() => navigate('selection')}
        >
          <span className="nav-icon"><BookMarked size={14} strokeWidth={2} /></span>
          <span style={{ flex: 1 }}>Mes versets</span>
          <span className="badge">{selCount}</span>
        </div>

        <div
          className={`nav-item ${isActive('flashcard') ? 'active' : ''}`}
          onClick={() => navigate('flashcard')}
        >
          <span className="nav-icon"><Layers size={14} strokeWidth={2} /></span>
          Cartes mémoire
        </div>

        <div
          className={`nav-item ${isActive('lacunes') ? 'active' : ''}`}
          onClick={() => navigate('lacunes')}
        >
          <span className="nav-icon"><PenLine size={14} strokeWidth={2} /></span>
          Texte à trou
        </div>

        <div
          className={`nav-item ${isActive('recitation') ? 'active' : ''}`}
          onClick={() => navigate('recitation')}
        >
          <span className="nav-icon"><Mic size={14} strokeWidth={2} /></span>
          Récitation
        </div>

        <div
          className={`nav-item ${isActive('dictee') ? 'active' : ''}`}
          onClick={() => navigate('dictee')}
        >
          <span className="nav-icon"><Pencil size={14} strokeWidth={2} /></span>
          Dictée guidée
        </div>

        <div
          className={`nav-item ${isActive('cours') ? 'active' : ''}`}
          onClick={() => navigate('cours')}
        >
          <span className="nav-icon"><GraduationCap size={14} strokeWidth={2} /></span>
          Cours de français
        </div>
      </div>

      <div id="sidebar-footer">
        <div className="nav-section-label">Suivi</div>
        <div
          className={`nav-item ${isActive('notes') ? 'active' : ''}`}
          onClick={() => navigate('notes')}
        >
          <span className="nav-icon"><NotebookPen size={14} strokeWidth={2} /></span>
          Notes &amp; Plan
        </div>
      </div>
    </nav>
  );
}
