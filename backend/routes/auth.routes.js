const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @route   POST /auth/register
 * @desc    Inscription d'un nouvel utilisateur
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @route   POST /auth/login
 * @desc    Connexion d'un utilisateur
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   GET /auth/me
 * @desc    Récupérer les informations de l'utilisateur connecté
 * @access  Private
 */
router.get('/me', authController.authenticate, authController.getMe);

module.exports = router;