import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="crash-screen">
        <div className="crash-box">
          <div className="crash-title">Une erreur est survenue</div>
          <p className="crash-msg">
            Désolé, quelque chose s'est mal passé. Vos versets et notes restent enregistrés.
          </p>
          <button className="btn-gold" onClick={() => window.location.reload()}>
            Recharger l'application
          </button>
        </div>
      </div>
    );
  }
}
