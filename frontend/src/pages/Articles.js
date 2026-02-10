import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../services/api';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await articleService.getAll();
      setArticles(response.articles || []);
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      await articleService.delete(id);
      // Rafraîchir la liste
      fetchArticles();
    } catch (err) {
      alert('Erreur lors de la suppression de l\'article');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">⏳ Chargement des articles...</div>;
  }

  return (
    <div>
      <div className="articles-header">
        <h2>📚 Mes Articles ({articles.length})</h2>
        <button 
          className="btn" 
          style={{ width: 'auto', padding: '0.8rem 1.5rem' }}
          onClick={() => navigate('/create-article')}
        >
          ➕ Nouvel Article
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {articles.length === 0 ? (
        <div className="no-articles">
          <h3>📭 Aucun article pour le moment</h3>
          <p>Commencez par créer votre premier article !</p>
          <button 
            className="btn" 
            style={{ width: 'auto', padding: '1rem 2rem', marginTop: '1rem' }}
            onClick={() => navigate('/create-article')}
          >
            Créer un article
          </button>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
              {article.description && <p>{article.description}</p>}
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#888',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {article.content}
              </p>
              
              <div className="article-meta">
                <div>
                  <div className="article-author">
                    👤 {article.author?.name || 'Anonyme'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.3rem' }}>
                    {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <span className={`article-status ${article.published ? 'status-published' : 'status-draft'}`}>
                  {article.published ? '✓ Publié' : '📝 Brouillon'}
                </span>
              </div>

              {article.author?.id === currentUser.id && (
                <div className="article-actions">
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(article.id)}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;