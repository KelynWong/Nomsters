const express = require('express');
const bcrypt = require('bcrypt');
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

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, image } = req.body;
  
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const sql = 'UPDATE user SET username = ?, password = ?, image = ? WHERE userId = ?';
    db.query(sql, [username, passwordHash, image, userId], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
});

router.post('/:id/diet', async (req, res) => {
    const userId = req.params.id;
    const { diet } = req.body;
  
    try {
      const deleteResult = await new Promise((resolve, reject) => {
        const sqlDelete = 'DELETE FROM userdiet WHERE userId = ?';
        db.query(sqlDelete, [userId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      let successfulInserted = 0;
  
      for (let i = 0; i < diet.length; i++) {
        const dietName = diet[i];
  
        const insertResult = await new Promise((resolve, reject) => {
          const sqlInsert = 'INSERT INTO userdiet (userId, diet) VALUES (?,?)';
          db.query(sqlInsert, [userId, dietName], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
  
        if (insertResult.affectedRows === 1) {
          successfulInserted++;
        }
      }
  
      if (successfulInserted === diet.length) {
        res.json({ message: 'User diet updated successfully' });
      } else {
        res.status(500).json({ message: 'Error updating user diet' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
  
    const sql = 'DELETE FROM user WHERE userId = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
});

module.exports = router;
