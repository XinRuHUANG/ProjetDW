const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'votre_utilisateur',
  host: 'localhost',
  database: 'bibliotheque',
  password: 'votre_mot_de_passe',
  port: 5432,
});

// Route pour récupérer les livres
app.get('/books', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM books');
  res.json(rows);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});


// Route pour l'inscription
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  connection.query(
    'INSERT INTO Utilisateur (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    }
  );
});

// Route pour la connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }
      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }
      const token = jwt.sign({ userId: user.id }, 'votre_secret_jwt', { expiresIn: '1h' });
      res.json({ token });
    }
  );
});