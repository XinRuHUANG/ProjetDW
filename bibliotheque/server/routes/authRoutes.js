//Définir des routes

const express = require('express');
const router = express.Router(); // Créez un routeur Express

// Route pour l'inscription
router.post('/register', (req, res) => {
  res.json({ message: 'Inscription réussie' });
});

// Route pour la connexion
router.post('/login', (req, res) => {
  res.json({ message: 'Connexion réussie' });
});

// Exportez le routeur
module.exports = router;