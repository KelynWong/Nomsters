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
                rows[0].userId = Number(rows[0].userId);
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

router.post('/:userId/recipe/:recipeId', (req, res) => {
    const userId = req.params.userId;
    const recipeId = req.params.recipeId;

    // Check if the user exists
    const checkUserSQL = 'SELECT 1 FROM user WHERE userId = ?';
    db.query(checkUserSQL, [userId])
        .then((userResult) => {
            if (userResult.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return Promise.reject('User not found');
            }

            // Check if the recipe exists
            const checkRecipeSQL = 'SELECT 1 FROM recipe WHERE recipeId = ?';
            return db.query(checkRecipeSQL, [recipeId]);
        })
        .then((recipeResult) => {
            if (recipeResult.length === 0) {
                res.status(404).json({ message: 'Recipe not found' });
                return Promise.reject('Recipe not found');
            }

            // Check if the user and recipe exist in the userfavourite table
            const checkIfExistsSQL = 'SELECT 1 FROM userfavourite WHERE userId = ? AND recipeId = ?';
            return db.query(checkIfExistsSQL, [userId, recipeId]);
        })
        .then((result) => {
            if (result.length > 0) {
                res.status(400).json({ message: 'User favorite recipe already added' });
                return Promise.reject('User favorite recipe already added');
            }

            // User and recipe do not exist in userfavourite, proceed to insert
            const insertSQL = 'INSERT INTO userfavourite (userId, recipeId) VALUES (?, ?)';
            return db.query(insertSQL, [userId, recipeId]);
        })
        .then((insertResult) => {
            if (insertResult.affectedRows === 1) {
                res.json({ message: 'User favorite recipe added successfully' });
            } else {
                res.status(500).json({ message: 'Error adding user favorite recipe' });
            }
        })
        .catch((err) => {
            if (!res.headersSent) {
                res.status(500).json({ message: err });
            }
        });
});

router.delete('/:userId/recipe/:recipeIds', (req, res) => {
    const userId = req.params.userId;
    const recipeIds = req.body.recipeIds;
    const recipeIdsArray = recipeIds.split(',').map(d => d.trim()); 

    const sql = `DELETE FROM userfavourite WHERE userId = ? AND recipeId IN (${recipeIdsArray.map(id => `'${id}'`).join(', ')})`;
    db.query(sql, [userId, recipeId])
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(500).json({ message: 'Error adding user favourite recipe' });
            } else {
                res.json({ message: 'User favourite recipe added successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

router.delete('/:userId/recipe', (req, res) => {
    const userId = req.params.userId;
    const recipeIds = req.body.recipeIds.split(',').map(id => id.trim());

    // Check if the user exists
    const checkUserSQL = 'SELECT 1 FROM user WHERE userId = ?';
    db.query(checkUserSQL, [userId])
        .then((userResult) => {
            if (userResult.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return Promise.reject('User not found');
            }

            // Check if the user favorites exist
            const checkFavoritesSQL = 'SELECT 1 FROM userfavourite WHERE userId = ? AND recipeId = ?';
            const checkPromises = recipeIds.map(recipeId => {
                return db.query(checkFavoritesSQL, [userId, recipeId]);
            });

            return Promise.all(checkPromises);
        })
        .then((favoritesResults) => {
            const invalidRecipes = favoritesResults.filter(result => result.length === 0);

            if (invalidRecipes.length > 0) {
                res.status(404).json({ message: 'Invalid recipe(s) in user favorites' });
                return Promise.reject('Invalid recipe(s) in user favorites');
            }

            // Check if each recipeId is valid
            const checkRecipeSQL = 'SELECT 1 FROM recipe WHERE recipeId = ?';
            const checkRecipePromises = recipeIds.map(recipeId => {
                return db.query(checkRecipeSQL, [recipeId]);
            });

            return Promise.all(checkRecipePromises);
        })
        .then((recipeResults) => {
            const invalidRecipes = recipeResults.filter(result => result.length === 0);

            if (invalidRecipes.length > 0) {
                res.status(404).json({ message: 'Invalid recipe(s) in recipe table' });
                return Promise.reject('Invalid recipe(s) in recipe table');
            }

            // Delete user's favorite recipes
            const deleteSQL = 'DELETE FROM userfavourite WHERE userId = ? AND recipeId IN (?)';
            return db.query(deleteSQL, [userId, recipeIds]);
        })
        .then((deleteResult) => {
            if (deleteResult.affectedRows === recipeIds.length) {
                res.json({ message: 'User favorite recipes deleted successfully' });
            } else {
                res.status(500).json({ message: 'Error deleting user favorite recipes' });
            }
        })
        .catch((err) => {
            if (!res.headersSent) {
                res.status(500).json({ message: err });
            }
        });
});



module.exports = router;