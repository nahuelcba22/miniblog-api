const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// TEST
router.get('/test', (req, res) => {
  res.json({ ok: true });
});

// GET ALL AUTHORS
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM authors ORDER BY id'
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET AUTHOR BY ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM authors WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Author not found'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE AUTHOR
router.post('/', async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'name and email are required'
      });
    }

    const result = await pool.query(
      `INSERT INTO authors (name, email, bio)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, bio]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {

    if (err.code === '23505') {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }

    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE AUTHOR
router.put('/:id', async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'name and email are required'
      });
    }

    const result = await pool.query(
      `UPDATE authors
       SET name = $1,
           email = $2,
           bio = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, bio, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Author not found'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {

    if (err.code === '23505') {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }

    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE AUTHOR
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM authors WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Author not found'
      });
    }

    res.json({
      message: 'Author deleted'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;