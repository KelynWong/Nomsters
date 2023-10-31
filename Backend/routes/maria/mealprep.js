const express = require('express');
const router = express.Router();
const db = require('../../db/mariadb');

router.get('/', (req, res) => {
   var calorie_required=req.query.calorie_limit;
   var diets=req.query.diets;
   var num_meals=parseInt(req.query.num_meals);
   var num_snacks=parseInt(req.query.num_snacks);
   var num_days=req.query.num_days;
   var budget_day=parseInt(req.query.budget_day);
   var budget_meal=(budget_day/(num_meals+(num_snacks/2)))
 var calorie_per_dish_max = calorie_required /(num_meals+(num_snacks/2)) + 150;
var calorie_per_dish_min = calorie_required /(num_meals+(num_snacks/2)) - 50;
var calorie_per_snack_max = (calorie_required / (num_meals+(num_snacks/2)))/2 + 100;
var calorie_per_snack_min = (calorie_required / (num_meals+(num_snacks/2)))/2 - 50;

   if(!diets){
    var sql = `(SELECT DISTINCT recipeId, title,image, servings, round(pricePerServing/150,1) as pricePerServing_dollar, readyInMinutes, summary,round(fat/servings) as fatPerServing,round(carbohydrates/servings) as carbsPerServing,
    CASE
      WHEN (protein / servings) > 1000 THEN ROUND((protein / servings) / 100, 1)
      ELSE ROUND((protein / servings) / 20, 1)
      END AS protein_per_serving,
      ROUND(calories / servings, 1) AS calories_per_serving
      FROM recipe
      WHERE (calories / servings) BETWEEN ${calorie_per_snack_min} AND ${calorie_per_snack_max}
      AND pricePerServing/150 <= ${budget_meal}/2
      ORDER BY RAND()
      LIMIT ${num_snacks})
      Union
    (SELECT DISTINCT recipeId, title,image, servings, round(pricePerServing/150,1) as pricerPerServing_dollar, readyInMinutes, summary,round(fat/servings) as fatPerServing,round(carbohydrates/servings) as carbsPerServing,
    CASE
    WHEN (protein / servings) > 1000 THEN ROUND((protein / servings) / 100, 1)
    ELSE ROUND((protein / servings) / 20, 1)
    END AS protein_per_serving,
    ROUND(calories / servings, 1) AS calories_per_serving
    FROM recipe
    WHERE (calories / servings) BETWEEN ${calorie_per_dish_min} AND ${calorie_per_dish_max}
    AND pricePerServing/150 <= ${budget_meal}
     ORDER BY RAND()
    LIMIT ${num_meals})
  `;
    db.query(sql)
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });}
      
      else{ 
        var sql = `(SELECT DISTINCT recipeId, title, image, servings, round(pricePerServing/150, 1) as pricePerServing_dollar, readyInMinutes, summary, round(fat/servings) as fatPerServing, round(carbohydrates/servings) as carbsPerServing,
    CASE
      WHEN (protein / servings) > 1000 THEN ROUND((protein / servings) / 100, 1)
      ELSE ROUND((protein / servings) / 20, 1)
    END AS protein_per_serving,
    ROUND(calories / servings, 1) AS calories_per_serving
    FROM recipe
    WHERE (calories / servings) BETWEEN ${calorie_per_snack_min} AND ${calorie_per_snack_max}
    AND (pricePerServing/150) <= ${budget_meal}/2
    AND recipeId IN (SELECT recipeId FROM diets WHERE name = '${diets}')
    ORDER BY RAND()
    LIMIT ${num_snacks})
    UNION
    (SELECT DISTINCT recipeId, title, servings, image, round(pricePerServing/150, 1) as pricerPerServing_dollar, readyInMinutes, summary, round(fat/servings) as fatPerServing, round(carbohydrates/servings) as carbsPerServing,
    CASE
      WHEN (protein / servings) > 1000 THEN ROUND((protein / servings) / 100, 1)
      ELSE ROUND((protein / servings) / 20, 1)
    END AS protein_per_serving,
    ROUND(calories / servings, 1) AS calories_per_serving
    FROM recipe
    WHERE (calories / servings) BETWEEN ${calorie_per_dish_min} AND ${calorie_per_dish_max}
    AND (pricePerServing/150) <= ${budget_meal}
    AND recipeId IN (SELECT recipeId FROM diets WHERE name = '${diets}')
    ORDER BY RAND()
    LIMIT ${num_meals})`;
      db.query(sql)
        .then((rows) => {
          res.json(rows);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
        
      }
});
  
module.exports = router;
  