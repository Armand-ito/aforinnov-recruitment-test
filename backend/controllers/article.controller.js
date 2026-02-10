const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Récupérer tous les articles
 */
const getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      count: articles.length,
      articles
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      error: 'Erreur lors de la récupération des articles',
      details: error.message
    });
  }
};

/**
 * Récupérer un article par son ID
 */
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!article) {
      return res.status(404).json({
        error: 'Article non trouvé'
      });
    }

    res.status(200).json({ article });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    res.status(500).json({
      error: 'Erreur lors de la récupération de l\'article',
      details: error.message
    });
  }
};

/**
 * Créer un nouvel article
 */
const createArticle = async (req, res) => {
  try {
    const { title, content, description, published } = req.body;
    const authorId = req.user.id;

    // Validation des champs
    if (!title || !content) {
      return res.status(400).json({
        error: 'Le titre et le contenu sont requis'
      });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        description: description || null,
        published: published || false,
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Article créé avec succès',
      article
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({
      error: 'Erreur lors de la création de l\'article',
      details: error.message
    });
  }
};

/**
 * Mettre à jour un article
 */
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, description, published } = req.body;
    const userId = req.user.id;

    // Vérifier si l'article existe et appartient à l'utilisateur
    const existingArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingArticle) {
      return res.status(404).json({
        error: 'Article non trouvé'
      });
    }

    if (existingArticle.authorId !== userId) {
      return res.status(403).json({
        error: 'Vous n\'êtes pas autorisé à modifier cet article'
      });
    }

    // Mettre à jour l'article
    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: title || existingArticle.title,
        content: content || existingArticle.content,
        description: description !== undefined ? description : existingArticle.description,
        published: published !== undefined ? published : existingArticle.published
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      message: 'Article mis à jour avec succès',
      article
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({
      error: 'Erreur lors de la mise à jour de l\'article',
      details: error.message
    });
  }
};

/**
 * Supprimer un article
 */
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Vérifier si l'article existe et appartient à l'utilisateur
    const existingArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingArticle) {
      return res.status(404).json({
        error: 'Article non trouvé'
      });
    }

    if (existingArticle.authorId !== userId) {
      return res.status(403).json({
        error: 'Vous n\'êtes pas autorisé à supprimer cet article'
      });
    }

    // Supprimer l'article
    await prisma.article.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      message: 'Article supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({
      error: 'Erreur lors de la suppression de l\'article',
      details: error.message
    });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};