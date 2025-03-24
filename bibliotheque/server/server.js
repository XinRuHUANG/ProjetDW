const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Importez le routeur

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Montez le routeur sur le chemin /auth
app.use('/auth', authRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});