const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../../db/mariadb');
require('dotenv').config();

router.post('/signup', (req, res) => {
  const { username, password, image } = req.body;
  const sqlGet = 'SELECT * FROM user';

  db.query(sqlGet)
    .then((rows) => {
      // Check if the username already exists in the database
      const usernameExists = rows.some((user) => user.username === username);

      if (usernameExists) {
        res.status(400).json({ message: 'Username already in use' });
        return;
      }

      // Hash the user's password
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    })
    .then((passwordHash) => {
      const sqlInsert = 'INSERT INTO user (username, password, image) VALUES (?,?,?)';
      return db.query(sqlInsert, [username, passwordHash, image]);
    })
    .then((results) => {
      const userId = Number(results.insertId);
      const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, userId });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM user';

  db.query(sql)
    .then((rows) => {
      console.log(rows)
      const user = rows.find((user) => user.username === username);

      if (!user) {
        res.status(401).json({ message: 'Username doesnt exist' });
        return;
      }

      return bcrypt.compare(password, user.password)
        .then((passwordMatch) => {
          if (passwordMatch) {
            const token = jwt.sign({ userId: Number(user.userId) }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, userId: Number(user.userId) });
          } else {
            res.status(401).json({ message: 'Password is incorrect' });
          }
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


module.exports = router;