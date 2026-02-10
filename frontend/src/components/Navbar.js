import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          📰 AFORINNOV Articles
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <span style={{ color: '#667eea', fontWeight: 'bold' }}>
                👤 {user.name || user.email}
              </span>
              <Link to="/articles" className="navbar-link">
                Mes Articles
              </Link>
              <Link to="/create-article" className="navbar-link">
                Créer un Article
              </Link>
              <button onClick={onLogout} className="navbar-link" style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Connexion
              </Link>
              <Link to="/register" className="navbar-link">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;