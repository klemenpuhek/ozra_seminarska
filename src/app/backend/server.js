const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initialize app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for Angular frontend
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SQLite database
const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite DB.');
});

// Create recepti table
db.run(`CREATE TABLE IF NOT EXISTS recepti (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  imeRecepta TEXT NOT NULL,
  casPriprave INTEGER NOT NULL,
  tezavnost TEXT NOT NULL,
  sestavine TEXT NOT NULL,
  opis TEXT NOT NULL,
  slika TEXT
)`);

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

// Register user endpoint
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email in geslo sta obvezna.' });
  }

  db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password], function(err) {
    if (err) {
      console.error('Error registering user:', err.message);
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Uporabnik že obstaja.' });
      }
      return res.status(500).json({ error: 'Napaka v bazi podatkov.' });
    }
    res.status(201).json({ message: 'Registracija uspešna!', userId: this.lastID });
  });
});

app.post('/login', express.json(), (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email in geslo sta obvezna.' });
  }

  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Napaka pri prijavi.' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Napačen email ali geslo.' });
    }

    // Successful login
    res.status(200).json({ message: 'Prijava uspešna', userId: row.id });
  });
});

// Add recipe
app.post('/recepti', upload.single('slika'), (req, res) => {
  const { imeRecepta, casPriprave, tezavnost, sestavine, opis } = req.body;
  const slikaPath = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    `INSERT INTO recepti (imeRecepta, casPriprave, tezavnost, sestavine, opis, slika)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [imeRecepta, casPriprave, tezavnost, sestavine, opis, slikaPath],
    function (err) {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, imeRecepta, slika: slikaPath });
    }
  );
});

// Get all recipes
app.get('/recepti', (req, res) => {
  db.all('SELECT * FROM recepti', (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single recipe by ID
app.get('/recepti/:id', (req, res) => {
  const recipeId = req.params.id;

  db.get(`SELECT * FROM recepti WHERE id = ?`, [recipeId], (err, row) => {
    if (err) {
      console.error('Error fetching recipe:', err.message);
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  });
});

// Delete recipe
app.delete('/recepti/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM recepti WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted' });
  });
});

// Update recipe
app.put('/recepti/:id', upload.single('slika'), (req, res) => {
  const { id } = req.params;
  const { imeRecepta, casPriprave, tezavnost, sestavine, opis } = req.body;
  const slikaPath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    UPDATE recepti
    SET imeRecepta = ?, casPriprave = ?, tezavnost = ?, sestavine = ?, opis = ?, slika = ?
    WHERE id = ?`;

  db.run(
    sql,
    [imeRecepta, casPriprave, tezavnost, sestavine, opis, slikaPath, id],
    function (err) {
      if (err) {
        console.error('Error updating recipe:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: id, imeRecepta, slika: slikaPath });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});