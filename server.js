const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for development (optional if you're hosting everything on same domain)
app.use(cors());

// Serve static files from the "public" folder (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL connection setup
const pool = new Pool({
  user: 'wrestling_user',
  host: 'localhost',
  database: 'wrestling_rankings',
  password: 'securepassword',
  port: 5432,
});

// API route to fetch rankings
app.get('/api/rankings', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM rankings ORDER BY weight_class::int, rank_order'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
