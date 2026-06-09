import React from 'react';
import { useApp } from '../App';
import { Home, BookOpen, BookMarked, Layers, NotebookPen } from 'lucide-react';

const TABS = [
  { id: 'home',      Icon: Home,        label: 'Accueil'  },
  { id: 'lecture',   Icon: BookOpen,    label: 'Lire'     },
  { id: 'selection', Icon: BookMarked,  label: 'Versets'  },
  { id: 'flashcard', Icon: Layers,      label: 'Cartes'   },
  { id: 'notes',     Icon: NotebookPen, label: 'Notes'    },
];

export default function BottomNav() {
  const { currentPage, navigate, selectedVerses } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  return (
    <nav id="bottom-nav">
      {TABS.map(({ id, Icon, label }) => (
        <button
          key={id}
          className={`bottom-tab ${currentPage === id ? 'active' : ''}`}
          onClick={() => navigate(id)}
        >
          <span className="bottom-tab-icon">
            <Icon size={20} strokeWidth={1.75} />
          </span>
          <span className="bottom-tab-label">{label}</span>
          {id === 'selection' && selCount > 0 && (
            <span className="bottom-tab-badge">{selCount}</span>
          )}
        </button>
      ))}
    </nav>
  );
}
