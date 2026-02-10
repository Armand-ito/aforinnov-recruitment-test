const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const { authenticate } = require('../controllers/auth.controller');

/**
 * @route   GET /articles
 * @desc    Récupérer tous les articles
 * @access  Public
 */
router.get('/', articleController.getAllArticles);

/**
 * @route   GET /articles/:id
 * @desc    Récupérer un article par son ID
 * @access  Public
 */
router.get('/:id', articleController.getArticleById);

/**
 * @route   POST /articles
 * @desc    Créer un nouvel article
 * @access  Private (authentification requise)
 */
router.post('/', authenticate, articleController.createArticle);

/**
 * @route   PUT /articles/:id
 * @desc    Mettre à jour un article
 * @access  Private (authentification requise)
 */
router.put('/:id', authenticate, articleController.updateArticle);

/**
 * @route   DELETE /articles/:id
 * @desc    Supprimer un article
 * @access  Private (authentification requise)
 */
router.delete('/:id', authenticate, articleController.deleteArticle);

module.exports = router;