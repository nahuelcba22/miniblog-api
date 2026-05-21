require('dotenv').config();

const express = require('express');
const app = express();

const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// rutas
app.use('/api/authors', authorsRoutes);
app.use('/api/posts', postsRoutes);

// health check
app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API OK' });
});

// error fallback (opcional pero correcto)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

module.exports = app;