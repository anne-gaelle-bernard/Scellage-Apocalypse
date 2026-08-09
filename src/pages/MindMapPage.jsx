import React from 'react';
import MindMap from '../components/MindMap';

export default function MindMapPage() {
  return (
    <>
      <div className="training-header">
        <span className="training-header-eyebrow">Mémorisation</span>
        <div className="training-header-title">Carte mentale</div>
        <p className="training-header-sub">
          Reliez les thèmes et les visions de l'Apocalypse entre eux pour en saisir la structure d'ensemble.
        </p>
      </div>

      <div className="notes-card">
        <MindMap />
      </div>
    </>
  );
}
