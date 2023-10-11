const express = require('express');
const router = express.Router();
const db = require('../db/config'); 

router.get('/cuisines', (req, res) => {
  const sql = `SELECT DISTINCT name FROM cuisines`
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

module.exports = router;