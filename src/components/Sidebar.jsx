import React, { useState } from 'react';
import { useApp } from '../App';
import { APOCALYPSE_LSG } from '../../data.js';
import { formatPomoTime } from '../hooks/usePomodoro';
import { Home, BookMarked, Layers, PenLine, Mic, NotebookPen, Pencil, GraduationCap, HelpCircle, GitBranch, Lightbulb, Timer, ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const { currentPage, currentChapter, navigate, navigateToChapter, sidebarOpen, closeSidebar, selectedVerses, pomodoro } = useApp();
  const selCount = Object.keys(selectedVerses).length;
  const [chaptersOpen, setChaptersOpen] = useState(false);

  function openPomodoro() {
    closeSidebar();
    pomodoro.toggleOpen();
  }

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
        <div
          className={`nav-item nav-item-pomodoro ${pomodoro.running ? 'running' : ''}`}
          onClick={openPomodoro}
        >
          <span className="nav-icon"><Timer size={14} strokeWidth={2} /></span>
          <span style={{ flex: 1 }}>Pomodoro</span>
          {pomodoro.running && (
            <span className="pomodoro-nav-time">{formatPomoTime(pomodoro.secondsLeft)}</span>
          )}
        </div>

        <div className="nav-section-label">Navigation</div>

        <div
          className={`nav-item ${isActive('home') ? 'active' : ''}`}
          onClick={() => navigate('home')}
        >
          <span className="nav-icon"><Home size={14} strokeWidth={2} /></span>
          Accueil
        </div>

        <div className="nav-divider" />
        <button
          className={`nav-section-label nav-section-toggle ${chaptersOpen ? 'open' : ''}`}
          onClick={() => setChaptersOpen(o => !o)}
        >
          Chapitres
          <ChevronDown size={12} strokeWidth={2.5} className="nav-section-chevron" />
        </button>

        {chaptersOpen && (
          <div className="chapters-grid">
            {APOCALYPSE_LSG.chapitres.map(ch => (
              <div
                key={ch.numero}
                className={`chapter-cell ${isChapActive(ch.numero) ? 'active' : ''}`}
                onClick={() => navigateToChapter(ch.numero)}
                title={ch.titre}
              >
                {ch.numero}
              </div>
            ))}
          </div>
        )}
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

        <div
          className={`nav-item ${isActive('qr') ? 'active' : ''}`}
          onClick={() => navigate('qr')}
        >
          <span className="nav-icon"><HelpCircle size={14} strokeWidth={2} /></span>
          Questions à mémoriser
        </div>

        <div
          className={`nav-item ${isActive('mindmap') ? 'active' : ''}`}
          onClick={() => navigate('mindmap')}
        >
          <span className="nav-icon"><GitBranch size={14} strokeWidth={2} /></span>
          Carte mentale
        </div>

        <div
          className={`nav-item ${isActive('mnemo') ? 'active' : ''}`}
          onClick={() => navigate('mnemo')}
        >
          <span className="nav-icon"><Lightbulb size={14} strokeWidth={2} /></span>
          Mnémotechniques
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
