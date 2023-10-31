const express = require('express');
const router = express.Router();
const db = require('../../db/mysqldb');

router.get('/', (req, res) => {
  const sql = `SELECT DISTINCT name FROM diets`
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;