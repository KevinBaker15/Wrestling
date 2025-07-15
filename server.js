const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/rankings', async (req, res) => {
  try {
    const text = await fs.readFile('college_wrestling_rankings_flat.csv', 'utf8');

    const lines = text.split('\n').filter(line => line.trim() !== '');
    const rankings = {};

    for (const line of lines.slice(1)) { // Skip header
      const [weightClass, rank, name, school] = line.split(',');

      if (!rankings[weightClass]) {
        rankings[weightClass] = [];
      }

      rankings[weightClass].push({
        rank: rank?.trim(),
        name: name?.trim(),
        school: school?.trim()
      });
    }

    res.json(rankings);
  } catch (err) {
    console.error('❌ Error reading rankings file:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
