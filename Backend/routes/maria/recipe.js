const express = require('express');
const router = express.Router();
const db = require('../../db/mariadb');
const axios = require('axios');
require('dotenv').config();

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
                row.id = Number(row.id);
            });

            res.json(rows);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err.message });
        });
});

router.post('/', async (req, res) => {
    const info = req.body;

    if (!info.title || !info.servings || !info.ingredients || !info.instructions || !info.image) {
        return res.status(400).json({ message: 'Please provide all recipe information' });
    }

    try {
        const response = await axios.post(`https://api.spoonacular.com/recipes/analyze?language=en&includeNutrition=true`,
            {
                "title": info.title,
                "servings": info.servings,
                "ingredients": info.ingredients,
                "instructions": info.instructions
            },
            {
                headers: { "x-api-key": process.env.SPOONACULAR_API }
            });

        const recipeData = response.data;

        // SQL query to insert data into the 'recipe' table
        const recipeSql = `INSERT INTO nomsters.recipe (vegetarian, vegan, glutenFree, dairyFree, veryHealthy, cheap, veryPopular, sustainable, lowFodMap, weightWatcherSmartPoints, gaps, preparationMinutes, cookingMinutes, aggregateLikes, healthScore, creditsText, license, sourceName, pricePerServing, id, title, readyInMinutes, servings, sourceUrl, image, image2, imageType, summary, instructions, originalId, spoonacularSourceUrl, calories, fat, saturatedFat, carbohydrates, sugar, cholesterol, sodium, protein) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        var recipeId;
        db.query(recipeSql, [
            recipeData.vegetarian,
            recipeData.vegan,
            recipeData.glutenFree,
            recipeData.dairyFree,
            recipeData.veryHealthy,
            recipeData.cheap,
            recipeData.veryPopular,
            recipeData.sustainable,
            recipeData.lowFodmap,
            recipeData.weightWatcherSmartPoints,
            recipeData.gaps,
            recipeData.preparationMinutes,
            recipeData.cookingMinutes,
            recipeData.aggregateLikes,
            recipeData.healthScore,
            recipeData.creditsText,
            recipeData.license,
            recipeData.sourceName,
            recipeData.pricePerServing,
            recipeData.id,
            recipeData.title,
            recipeData.readyInMinutes,
            recipeData.servings,
            recipeData.sourceUrl,
            recipeData.image,
            info.image,
            recipeData.imageType,
            recipeData.summary,
            recipeData.instructions,
            recipeData.originalId,
            recipeData.spoonacularSourceUrl,
            recipeData.nutrition.nutrients[0].amount,
            recipeData.nutrition.nutrients[1].amount,
            recipeData.nutrition.nutrients[2].amount,
            recipeData.nutrition.nutrients[3].amount,
            recipeData.nutrition.nutrients[4].amount,
            recipeData.nutrition.nutrients[5].amount,
            recipeData.nutrition.nutrients[6].amount,
            recipeData.nutrition.nutrients[7].amount,
        ])
        .then((recipeInsertResults) => {
            if (recipeInsertResults.affectedRows === 0) {
                res.status(500).json({ error: 'Failed to insert into recipe table' });
                return Promise.reject('Failed to insert into recipe table');
            }
            recipeId = Number(recipeInsertResults.insertId)
            
            // SQL query to insert data into the 'cuisines' table
            const cuisinesSql = `INSERT INTO nomsters.cuisines (recipeId, name) VALUES (?, ?)`;

            const checkCuisinePromises = recipeData.cuisines.map(cuisine => {
                return db.query(cuisinesSql, [recipeId, cuisine]);
            });

            return Promise.all(checkCuisinePromises);
        })
        .then((cuisineInsertResults) => {
            if (cuisineInsertResults.affectedRows === 0) {
                res.status(500).json({ error: 'Failed to insert into cuisine table' });
                return Promise.reject('Failed to insert into cuisine table');
            }

            // SQL query to insert data into the 'dishtypes' table
            const dishtypesSql = `INSERT INTO nomsters.dishtypes (recipeId, name) VALUES (?, ?)`;

            const checkDishTypePromises = recipeData.dishTypes.map(dishtype => {
                return db.query(dishtypesSql, [recipeId, dishtype]);
            });

            return Promise.all(checkDishTypePromises);
        })
        .then((dishTypeInsertResults) => {
            if (dishTypeInsertResults.affectedRows === 0) {
                res.status(500).json({ error: 'Failed to insert into dish type table' });
                return Promise.reject('Failed to insert into dish type table');
            }

            // SQL query to insert data into the 'diets' table
            const dietsSql = `INSERT INTO nomsters.diets (recipeId, name) VALUES (?, ?)`;

            const checkDietPromises = recipeData.diets.map(diet => {
                return db.query(dietsSql, [recipeId, diet]);
            });

            return Promise.all(checkDietPromises);
        })
        .then((dietInsertResults) => {
            if (dietInsertResults.affectedRows === 0) {
                res.status(500).json({ error: 'Failed to insert into diet table' });
            } else {
                res.json({ message: 'Recipe added successfully' });
            }
        })
        .catch((err) => {
            if (!res.headersSent) {
                res.status(500).json({ message: err });
            }
        });
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Failed to retrieve data from spoonacular' });
        }
    }
});

router.delete('/:id', (req, res) => {
    const recipeId = req.params.id;

    const sql = 'DELETE FROM recipe WHERE recipeId = ?';
    db.query(sql, [recipeId])
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(400).json({ message: 'Recipe not found' });
            } else {
                res.json({ message: 'Recipe deleted successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;