const express = require('express');
const router = express.Router();
const db = require('../../db/mariadb');

router.get('/', (req, res) => {
    let sql = `
        SELECT
        recipe.*,
        (SELECT JSON_ARRAYAGG(name) FROM dishtypes WHERE dishtypes.recipeId = recipe.recipeId) AS dishtypes,
        (SELECT JSON_ARRAYAGG(name) FROM diets WHERE diets.recipeId = recipe.recipeId) AS diets,
        (SELECT JSON_ARRAYAGG(name) FROM cuisines WHERE cuisines.recipeId = recipe.recipeId) AS cuisines
        FROM recipe
    `;

    // Filter recipes by title
    const title = req.query.title;
    if (title) {
        sql += ` WHERE title LIKE '%${title}%'`;
    }

    // Filter recipes by cuisine
    const cuisine = req.query.cuisine;
    if (cuisine) {
        const cuisineArray = cuisine.split(',').map(c => c.trim());
        if (cuisineArray.length > 0) {
            if (title) {
                sql += ' AND';
            } else {
                sql += ' WHERE';
            }
            sql += ` EXISTS (SELECT 1 FROM cuisines c WHERE c.recipeId = recipe.recipeId AND c.name IN (${cuisineArray.map(name => `'${name}'`).join(', ')}))`;
        }
    }

    // Filter recipes by dishtype
    const dishtype = req.query.dishtype;
    if (dishtype) {
        const dishtypeArray = dishtype.split(',').map(d => d.trim()); 
        if (dishtypeArray.length > 0) {
            if (title || cuisine) {
                sql += ' AND';
            } else {
                sql += ' WHERE';
            }
            sql += ` EXISTS (SELECT 1 FROM dishtypes d WHERE d.recipeId = recipe.recipeId AND d.name IN (${dishtypeArray.map(name => `'${name}'`).join(', ')}))`;
        }
    }

    // Filter recipes by diet
    const diet = req.query.diet;
    if (diet) {
        const dietArray = diet.split(',').map(d => d.trim()); 
        if (dietArray.length > 0) {
            if (title || cuisine || dishtype) {
                sql += ' AND';
            } else {
                sql += ' WHERE';
            }
            sql += ` EXISTS (SELECT 1 FROM diets d WHERE d.recipeId = recipe.recipeId AND d.name IN (${dietArray.map(name => `'${name}'`).join(', ')}))`;
        }
    }

    // Sorting
    const sort = req.query.sort;
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';

    if (sort) {
        sql += ` ORDER BY ${sort} ${order}`;
    }

    db.query(sql)
        .then((rows) => {
            if (rows.length === 0) {
                res.status(404).json({ message: 'No recipes found' });
                return;
            }

            rows.forEach((row) => {
                row.dishtypes = row.dishtypes;
                row.diets = row.diets;
                row.cuisines = row.cuisines;

                row.recipeId = Number(row.recipeId);
            });

            res.json(rows);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;