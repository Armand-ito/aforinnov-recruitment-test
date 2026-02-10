require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/article.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API AFORINNOV',
    version: '1.0.0',
    endpoints: {
      auth: '/auth',
      articles: '/articles'
    }
  });
});

app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur',
    message: err.message
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Base de données: PostgreSQL`);
  console.log(`🔧 Environnement: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;