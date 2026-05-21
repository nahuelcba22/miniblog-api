const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// TEST
router.get('/test', (req, res) => {
  res.send('POSTS OK');
});

console.log('🔥 POSTS ROUTES CARGADAS');

// =====================
// GET ALL POSTS
// =====================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM posts ORDER BY id'
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// GET POSTS BY AUTHOR
// =====================
router.get('/author/:authorId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        p.id,
        p.title,
        p.content,
        p.published,
        p.created_at,
        a.id AS author_id,
        a.name AS author_name,
        a.email AS author_email
       FROM posts p
       JOIN authors a
       ON p.author_id = a.id
       WHERE a.id = $1
       ORDER BY p.id`,
      [req.params.authorId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// GET POST BY ID
// =====================
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Post not found'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// CREATE POST
// =====================
router.post('/', async (req, res) => {
  try {
    const { title, content, author_id } = req.body;

    // VALIDATION
    if (!title || !content || !author_id) {
      return res.status(400).json({
        error: 'title, content and author_id are required'
      });
    }

    const result = await pool.query(
      `INSERT INTO posts (title, content, author_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, content, author_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// UPDATE POST
// =====================
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body;

    // VALIDATION
    if (!title || !content || !author_id) {
      return res.status(400).json({
        error: 'title, content and author_id are required'
      });
    }

    const result = await pool.query(
      `UPDATE posts
       SET title = $1,
           content = $2,
           author_id = $3,
           published = $4
       WHERE id = $5
       RETURNING *`,
      [title, content, author_id, published, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Post not found'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// DELETE POST
// =====================
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Post not found'
      });
    }

    res.json({
      message: 'Post deleted'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;