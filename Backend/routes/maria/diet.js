const express = require('express');
const router = express.Router();
const db = require('../../db/mariadb');

router.get('/', (req, res) => {
    const sql = `SELECT DISTINCT name FROM diets`;
    db.query(sql)
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
});
  
module.exports = router;