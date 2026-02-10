import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../services/api';

function CreateArticle() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    published: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.title || !formData.content) {
      setError('Le titre et le contenu sont requis');
      setLoading(false);
      return;
    }

    try {
      await articleService.create(formData);
      
      // Rediriger vers la liste des articles
      navigate('/articles');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création de l\'article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: '700px' }}>
      <h2>✏️ Créer un Article</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre de l'article *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Les avantages du développement web moderne"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optionnel)</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Court résumé de votre article"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenu de l'article *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Écrivez le contenu de votre article ici..."
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          <label htmlFor="published" style={{ marginBottom: 0 }}>
            Publier immédiatement
          </label>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Création...' : '✓ Créer l\'article'}
        </button>

        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={() => navigate('/articles')}
          disabled={loading}
        >
          ← Retour aux articles
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;