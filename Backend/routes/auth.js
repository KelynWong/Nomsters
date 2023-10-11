const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db/config');
require('dotenv').config();

router.post('/signup', (req, res) => {
  const { username, password, image } = req.body;

  const sqlGet = 'SELECT * FROM user';

  db.query(sqlGet, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Check if the username already exists in the database
    const usernameExists = rows.some((user) => user.username === username);

    if (usernameExists) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Hash the user's password
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const sqlInsert = 'INSERT INTO user (username, password, image) VALUES (?,?,?)';

    db.query(sqlInsert, [username, passwordHash, image], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const userId = results.insertId;

      const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({ token, userId: userId });
    });
  });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const sql = `SELECT * FROM user`
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      const user = rows.find((user) => user.username === username);
    
      if (!user) {
        return res.status(401).json({ message: 'Username doesnt exist' });
      }
    
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, userId: user.userId});
      } else {
        res.status(401).json({ message: 'Password is incorrect' });
      }
    });
});

module.exports = router;