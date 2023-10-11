const express = require('express');
const router = express.Router();
const db = require('../db/config'); 

router.get('/all', (req, res) => {
  const sql = `SELECT * FROM recipe`
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;