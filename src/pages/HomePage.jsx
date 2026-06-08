import React from 'react';
import { useApp } from '../App';

const STEPS = [
  { n: 1, title: 'Lisez le texte', body: 'Parcourez les 22 chapitres de l\'Apocalypse en version Louis Segond 1910.' },
  { n: 2, title: 'Sélectionnez', body: 'Cochez la case à côté d\'un verset pour l\'ajouter à votre liste d\'entraînement.' },
  { n: 3, title: 'Écoutez', body: 'Cliquez sur le bouton lecture pour écouter le chapitre ou vos versets favoris.' },
  { n: 4, title: 'Texte à trou', body: 'Pratiquez la mémorisation en complétant les mots manquants de vos versets.' },
  { n: 5, title: 'Récitation', body: 'Masquez progressivement le texte pour tourner les versets en bouche.' },
];

export default function HomePage() {
  const { navigate, navigateToChapter, selectedVerses } = useApp();
  const selCount = Object.keys(selectedVerses).length;

  return (
    <>
      <div className="hero">
        <div className="hero-eyebrow">Texte biblique — Version Louis Segond 1910</div>
        <h1>
          L'Apocalypse
          <span>de Jean</span>
        </h1>
        <div className="hero-ornament">✦</div>
        <p className="hero-verse">
          « Heureux celui qui lit et ceux qui entendent les paroles de la prophétie,
          et qui gardent les choses qui y sont écrites ! Car le temps est proche. »
          <em>— Apocalypse 1:3</em>
        </p>
        <div className="hero-actions">
          <button className="btn-gold" onClick={() => navigateToChapter(1)}>
            Commencer la lecture
          </button>
          <button className="btn-outline" onClick={() => navigate('selection')}>
            Mes versets
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-n">22</span>
            <span className="stat-l">Chapitres</span>
          </div>
          <div className="stat">
            <span className="stat-n">404</span>
            <span className="stat-l">Versets</span>
          </div>
          <div className="stat">
            <span className="stat-n">{selCount}</span>
            <span className="stat-l">Sélectionnés</span>
          </div>
        </div>
      </div>

      <div className="how-to">
        <div className="how-to-header">
          <h2>Comment utiliser l'application</h2>
          <p>Cinq étapes pour lire, mémoriser et réciter l'Apocalypse de Jean.</p>
        </div>
        <div className="steps">
          {STEPS.map(s => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div className="step-body">
                <strong>{s.title}</strong>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
