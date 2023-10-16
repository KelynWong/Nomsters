const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db/mariadb');

router.get('/:id', (req, res) => {
    const userId = req.params.id;

    const sql = 'SELECT * FROM user WHERE userId = ?';
    db.query(sql, [userId])
        .then((rows) => {
            if (rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json(rows[0]);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, image } = req.body;

    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const sql = 'UPDATE user SET username = ?, password = ?, image = ? WHERE userId = ?';
    db.query(sql, [username, passwordHash, image, userId])
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json({ message: 'User updated successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

router.post('/:id/diet', async (req, res) => {
    const userId = req.params.id;
    const { diet } = req.body;

    try {
        const deleteResult = await new Promise((resolve, reject) => {
            const sqlDelete = 'DELETE FROM userdiet WHERE userId = ?';
            db.query(sqlDelete, [userId])
                .then((result) => resolve(result))
                .catch(reject);
        });

        let successfulInserted = 0;

        for (let i = 0; i < diet.length; i++) {
            const dietName = diet[i];

            const insertResult = await new Promise((resolve, reject) => {
                const sqlInsert = 'INSERT INTO userdiet (userId, diet) VALUES (?,?)';
                db.query(sqlInsert, [userId, dietName])
                    .then((result) => resolve(result))
                    .catch(reject);
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
    db.query(sql, [userId])
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json({ message: 'User deleted successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;