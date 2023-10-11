const express = require('express');
const router = express.Router();
const db = require('../db/config');

router.get('/:id', (req, res) => {
  const userId = req.params.id; 

  const sql = 'SELECT * FROM user WHERE userId = ?';
  db.query(sql, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(rows[0]);
  });
});

module.exports = router;
