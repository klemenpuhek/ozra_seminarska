const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initialize app
const app = express();
const port = 3000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:4200', // Allow only requests from Angular app
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files (images) from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SQLite database setup
const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite DB.');
});

// Create the 'recepti' table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS recepti (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  imeRecepta TEXT NOT NULL,
  casPriprave INTEGER NOT NULL,
  tezavnost TEXT NOT NULL,
  sestavine TEXT NOT NULL,
  opis TEXT NOT NULL,
  slika TEXT
)`);

// Define the POST endpoint for adding a recipe (with image)
app.post('/recepti', upload.single('slika'), (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  const { imeRecepta, casPriprave, tezavnost, sestavine, opis } = req.body;
  const slikaPath = req.file ? `/uploads/${req.file.filename}` : null; // Save image path if exists

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

// Define the GET endpoint to fetch all recipes
app.get('/recepti', (req, res) => {
  db.all('SELECT * FROM recepti', (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);  // Send the recipes as a response
  });
});

// DELETE endpoint for deleting a recipe
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

  // Fetch a single recipe by its ID
app.get('/recepti/:id', (req, res) => {
    const recipeId = req.params.id;
  
    db.get(`SELECT * FROM recepti WHERE id = ?`, [recipeId], (err, row) => {
      if (err) {
        console.error('Error fetching recipe:', err.message);
        return res.status(500).json({ error: err.message });
      }
  
      if (row) {
        res.json(row);  // Send the recipe data as a response
      } else {
        res.status(404).json({ message: 'Recipe not found' });
      }
    });
  });

  // PUT endpoint for updating a recipe
app.put('/recepti/:id', upload.single('slika'), (req, res) => {
    const { id } = req.params;
    const { imeRecepta, casPriprave, tezavnost, sestavine, opis } = req.body;
    const slikaPath = req.file ? `/uploads/${req.file.filename}` : null;
  
    // Update recipe in the database
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
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));