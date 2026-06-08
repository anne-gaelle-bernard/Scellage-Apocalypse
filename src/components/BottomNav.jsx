import React from 'react';
import { useApp } from '../App';

const TABS = [
  { id: 'home',       icon: '⌂',  label: 'Accueil'   },
  { id: 'lecture',    icon: '📖', label: 'Lire'       },
  { id: 'selection',  icon: '⭐', label: 'Versets'    },
  { id: 'flashcard',  icon: '🃏', label: 'Cartes'     },
  { id: 'lacunes',    icon: '✏️', label: 'Exercices'  },
];

export default function BottomNav() {
  const { currentPage, navigate, selectedVerses } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  return (
    <nav id="bottom-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`bottom-tab ${currentPage === tab.id ? 'active' : ''}`}
          onClick={() => navigate(tab.id)}
        >
          <span className="bottom-tab-icon">{tab.icon}</span>
          <span className="bottom-tab-label">{tab.label}</span>
          {tab.id === 'selection' && selCount > 0 && (
            <span className="bottom-tab-badge">{selCount}</span>
          )}
        </button>
      ))}
    </nav>
  );
}
