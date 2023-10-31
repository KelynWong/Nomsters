const express = require('express');
const router = express.Router();
const db = require('../../db/mysqldb');

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
    if (title) {
      sql += ' AND';
    } else {
      sql += ' WHERE';
    }
    sql += ` EXISTS (SELECT 1 FROM cuisines c WHERE c.recipeId = recipe.recipeId AND c.name = '${cuisine}')`;
  }

  // Filter recipes by dishtype
  const dishtype = req.query.dishtype;
  if (dishtype) {
    if (title || cuisine) {
      sql += ' AND';
    } else {
      sql += ' WHERE';
    }
    sql += ` EXISTS (SELECT 1 FROM dishtypes d WHERE d.recipeId = recipe.recipeId AND d.name = '${dishtype}')`;
  }

  // Filter recipes by diet
  const diet = req.query.diet;
  if (diet) {
    if (title || cuisine || dishtype) {
      sql += ' AND';
    } else {
      sql += ' WHERE';
    }
    sql += ` EXISTS (SELECT 1 FROM diets d WHERE d.recipeId = recipe.recipeId AND d.name = '${diet}')`;
  }

  // Sorting
  const sort = req.query.sort;
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC';

  if (sort) {
    sql += ` ORDER BY ${sort} ${order}`;
  }

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ message: 'No recipes found' });
      return;
    }

    // Manually parse the JSON strings into arrays
    rows.forEach((row) => {
        row.dishtypes = JSON.parse(row.dishtypes);
        row.diets = JSON.parse(row.diets);
        row.cuisines = JSON.parse(row.cuisines);
    });

    res.json(rows);
  });
});

module.exports = router;
