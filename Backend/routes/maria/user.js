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
                res.status(400).json({ message: 'User not found' });
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

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

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

router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    const sql = 'DELETE FROM user WHERE userId = ?';
    db.query(sql, [userId])
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(400).json({ message: 'User not found' });
            } else {
                res.json({ message: 'User deleted successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

router.post('/:id/diet', async (req, res) => {
    const userId = req.params.id;
    const diets = req.body.diets;

    if (!diets) {
        return res.status(400).json({ message: 'Please provide diets' });
    }

    const dietArr = diets.split(',').map(item => item.trim());

    try {
        const userExistsSQL = 'SELECT 1 FROM user WHERE userId = ?';
        const userResult = await db.query(userExistsSQL, [userId]);

        if (userResult.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deleteResult = await new Promise((resolve, reject) => {
            const sqlDelete = 'DELETE FROM userdiet WHERE userId = ?';
            db.query(sqlDelete, [userId])
                .then(result => resolve(result))
                .catch(reject);
        });

        let successfulInserted = 0;

        for (let i = 0; i < dietArr.length; i++) {
            const dietName = dietArr[i];

            const insertResult = await new Promise((resolve, reject) => {
                const sqlInsert = 'INSERT INTO userdiet (userId, diet) VALUES (?,?)';
                db.query(sqlInsert, [userId, dietName])
                    .then(result => resolve(result))
                    .catch(reject);
            });

            if (insertResult.affectedRows === 1) {
                successfulInserted++;
            }
        }

        if (successfulInserted === dietArr.length) {
            res.json({ message: 'User diet updated successfully' });
        } else {
            res.status(500).json({ message: 'Error updating user diet' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id/diet', (req, res) => {
    const userId = req.params.id;
    const diets = req.body.diets;

    if (!diets) {
        return res.status(400).json({ message: 'Please provide diets' });
    }

    const dietArr = diets.split(',').map(diet => diet.trim());

    // Check if the user exists
    const checkUserSQL = 'SELECT 1 FROM user WHERE userId = ?';
    db.query(checkUserSQL, [userId])
        .then((userResult) => {
            if (userResult.length === 0) {
                res.status(400).json({ message: 'User not found' });
                return Promise.reject('User not found');
            }

            // Check if the user favorites exist
            const checkUserDietSQL = 'SELECT * FROM userdiet WHERE userId = ? AND diet = ?';
            const checkPromises = dietArr.map(diet => {
                return db.query(checkUserDietSQL, [userId, diet]);
            });

            return Promise.all(checkPromises);
        })
        .then((userDietResults) => {
            const invalidDiets = userDietResults.filter(result => result.length === 0);

            if (invalidDiets.length > 0) {
                res.status(400).json({ message: 'Diet(s) not found' });
                return Promise.reject('Diet(s) not found');
            }

            // Delete user's favorite recipes
            const deleteSQL = 'DELETE FROM userdiet WHERE userId = ? AND diet IN (?)';
            return db.query(deleteSQL, [userId, dietArr]);
        })
        .then((deleteResult) => {
            if (deleteResult.affectedRows === dietArr.length) {
                res.json({ message: 'User diets deleted successfully' });
            } else {
                res.status(500).json({ message: 'Error deleting user diets' });
            }
        })
        .catch((err) => {
            if (!res.headersSent) {
                res.status(500).json({ message: err });
            }
        });
});

router.get('/:id/recipe', (req, res) => {
    const userId = req.params.id;

    // Check if the user exists
    const checkUserSQL = 'SELECT 1 FROM user WHERE userId = ?';
    db.query(checkUserSQL, [userId])
        .then((userResult) => {
            if (userResult.length === 0) {
                res.status(400).json({ message: 'User not found' });
                return;
            }

            let sql = `
                SELECT recipe.*, 
                    (SELECT JSON_ARRAYAGG(name) FROM dishtypes WHERE dishtypes.recipeId = recipe.recipeId) AS dishtypes,
                    (SELECT JSON_ARRAYAGG(name) FROM diets WHERE diets.recipeId = recipe.recipeId) AS diets,
                    (SELECT JSON_ARRAYAGG(name) FROM cuisines WHERE cuisines.recipeId = recipe.recipeId) AS cuisines FROM recipe
                INNER JOIN userfavourite ON recipe.recipeId=userfavourite.recipeId
                INNER JOIN user ON userfavourite.userId = user.userId
                WHERE user.userId=?;
            `;

            db.query(sql, [userId])
                .then((rows) => {
                    if (rows.length === 0) {
                        res.status(404).json({ message: 'No favourite recipes found' });
                        return;
                    }

                    rows.forEach((row) => {
                        row.dishtypes = row.dishtypes;
                        row.diets = row.diets;
                        row.cuisines = row.cuisines;

                        row.recipeId = Number(row.recipeId);
                        row.id = Number(row.id);
                    });

                    res.json(rows);
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({ error: err.message });
                });
        })
});

router.post('/:userId/recipe/:recipeId', (req, res) => {
    const userId = req.params.userId;
    const recipeId = req.params.recipeId;

    // Check if the user exists
    const checkUserSQL = 'SELECT 1 FROM user WHERE userId = ?';
    db.query(checkUserSQL, [userId])
        .then((userResult) => {
            if (userResult.length === 0) {
                res.status(400).json({ message: 'User not found' });
                return Promise.reject('User not found');
            }

            // Check if the recipe exists
            const checkRecipeSQL = 'SELECT 1 FROM recipe WHERE recipeId = ?';
            return db.query(checkRecipeSQL, [recipeId]);
        })
        .then((recipeResult) => {
            if (recipeResult.length === 0) {
                res.status(400).json({ message: 'Recipe not found' });
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

router.delete('/:id/recipe', (req, res) => {
    const userId = req.params.id;
    const recipeIds = req.body.recipeIds;

    if (!recipeIds) {
        return res.status(400).json({ message: 'Please provide recipeIds' });
    }

    const recipeIdsArr = recipeIds.split(',').map(id => id.trim());

    // Check if the user exists
    const checkUserSQL = 'SELECT 1 FROM user WHERE userId = ?';
    db.query(checkUserSQL, [userId])
        .then((userResult) => {
            if (userResult.length === 0) {
                res.status(400).json({ message: 'User not found' });
                return Promise.reject('User not found');
            }

            // Check if the user favorites exist
            const checkFavoritesSQL = 'SELECT 1 FROM userfavourite WHERE userId = ? AND recipeId = ?';
            const checkPromises = recipeIdsArr.map(recipeId => {
                return db.query(checkFavoritesSQL, [userId, recipeId]);
            });

            return Promise.all(checkPromises);
        })
        .then((favoritesResults) => {
            const invalidRecipes = favoritesResults.filter(result => result.length === 0);

            if (invalidRecipes.length > 0) {
                res.status(400).json({ message: 'Recipe(s) is not user favorites' });
                return Promise.reject('Recipe(s) is not user favorites');
            }

            // Check if each recipeId is valid
            const checkRecipeSQL = 'SELECT 1 FROM recipe WHERE recipeId = ?';
            const checkRecipePromises = recipeIdsArr.map(recipeId => {
                return db.query(checkRecipeSQL, [recipeId]);
            });

            return Promise.all(checkRecipePromises);
        })
        .then((recipeResults) => {
            const invalidRecipes = recipeResults.filter(result => result.length === 0);

            if (invalidRecipes.length > 0) {
                res.status(400).json({ message: 'Recipe(s) not found' });
                return Promise.reject('Recipe(s) not found');
            }

            // Delete user's favorite recipes
            const deleteSQL = 'DELETE FROM userfavourite WHERE userId = ? AND recipeId IN (?)';
            return db.query(deleteSQL, [userId, recipeIdsArr]);
        })
        .then((deleteResult) => {
            if (deleteResult.affectedRows === recipeIdsArr.length) {
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