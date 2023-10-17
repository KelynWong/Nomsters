const mysql = require('mysql');
const axios = require('axios');
require('dotenv').config();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');

  // Insert data into a table
  const dataToInsert = [
    {
		"id": 663252,
		"title": "The Blarney Burger",
		"image": "https://spoonacular.com/recipeImages/663252-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 663641,
		"title": "Tomato tarte tatin",
		"image": "https://spoonacular.com/recipeImages/663641-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 663638,
		"title": "Tomato Stack Salad",
		"image": "https://spoonacular.com/recipeImages/663638-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 663837,
		"title": "Triple Citrus Cake",
		"image": "https://spoonacular.com/recipeImages/663837-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 664037,
		"title": "Turkey Kofta Pitas",
		"image": "https://spoonacular.com/recipeImages/664037-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 667709,
		"title": "fresh tomato salsa",
		"image": "https://spoonacular.com/recipeImages/667709-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 1095748,
		"title": "Vegan French Toast",
		"image": "https://spoonacular.com/recipeImages/1095748-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 1098288,
		"title": "Tuna Avocado Salad",
		"image": "https://spoonacular.com/recipeImages/1098288-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 632194,
		"title": "Almond Tea Cookies",
		"image": "https://spoonacular.com/recipeImages/632194-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 637797,
		"title": "Chess Pie Two Ways",
		"image": "https://spoonacular.com/recipeImages/637797-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 640713,
		"title": "Creamy Tomato Soup",
		"image": "https://spoonacular.com/recipeImages/640713-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 641079,
		"title": "Curried Lamb Tarts",
		"image": "https://spoonacular.com/recipeImages/641079-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 642347,
		"title": "Eggy In The Basket",
		"image": "https://spoonacular.com/recipeImages/642347-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 645555,
		"title": "Green Tomato Salad",
		"image": "https://spoonacular.com/recipeImages/645555-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 648279,
		"title": "Italian Tuna Pasta",
		"image": "https://spoonacular.com/recipeImages/648279-312x231.jpg",
		"imageType": "jpg"
	},
	{
		"id": 652706,
		"title": "Mushroom Tofu Stew",
		"image": "https://spoonacular.com/recipeImages/652706-312x231.jpg",
		"imageType": "jpg"
	}
  ];

  // Counter to keep track of completed insertions
  let completedInsertions = 0;

  for (let i = 0; i < dataToInsert.length; i++) {
    let id = dataToInsert[i]["id"];

    const apiKey = process.env.SPOONACULAR_API;

    setTimeout(() => {
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`, {
          params: {
            apiKey,
          },
        })
        .then((response) => {
          console.log('API response:', response.data);
          let recipeData = response.data;
    
          // SQL query to insert data into the 'recipe' table
          const recipeSql = `INSERT INTO nomsters.recipe (vegetarian,vegan,glutenFree,dairyFree,veryHealthy,cheap,veryPopular,sustainable,lowFodMap,weightWatcherSmartPoints,gaps,preparationMinutes,cookingMinutes,aggregateLikes,healthScore,creditsText,license,sourceName,pricePerServing,id,title,readyInMinutes,servings,sourceUrl,image,imageType,summary,instructions,originalId,spoonacularSourceUrl,calories,fat,saturatedFat,carbohydrates,sugar,cholesterol,sodium,protein) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
          // SQL query to insert data into the 'cuisines' table
          const cuisinesSql = `
            INSERT INTO nomsters.cuisines (recipeId, name) VALUES (?, ?)
          `;
    
          // SQL query to insert data into the 'dishtypes' table
          const dishtypesSql = `
            INSERT INTO nomsters.dishtypes (recipeId, name) VALUES (?, ?)
          `;
    
          // SQL query to insert data into the 'diets' table
          const dietsSql = `
            INSERT INTO nomsters.diets (recipeId, name) VALUES (?, ?)
          `;
    
          // Execute the SQL queries within a transaction
          connection.beginTransaction((err) => {
            if (err) {
              console.error('Error starting transaction:', err);
              return;
            }
    
            // Insert data into the 'recipe' table
            connection.query(
              recipeSql,
              [
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
              ],
              (err, results) => {
                if (err) {
                  console.error('Error inserting data into recipe table:', err);
                  connection.rollback();
                  return;
                }
    
                // Get the inserted recipe ID
                const recipeId = results.insertId;
    
                // Insert data into the 'cuisines' table
                for (const cuisine of recipeData.cuisines) {
                  connection.query(cuisinesSql, [recipeId, cuisine], (err) => {
                    if (err) {
                      console.error('Error inserting data into cuisines table:', err);
                      connection.rollback();
                      return;
                    }
                  });
                }
    
                // Insert data into the 'dishtypes' table
                for (const dishtype of recipeData.dishTypes) {
                  connection.query(dishtypesSql, [recipeId, dishtype], (err) => {
                    if (err) {
                      console.error('Error inserting data into dishtypes table:', err);
                      connection.rollback();
                      return;
                    }
                  });
                }
    
                // Insert data into the 'diets' table
                for (const diet of recipeData.diets) {
                  connection.query(dietsSql, [recipeId, diet], (err) => {
                    if (err) {
                      console.error('Error inserting data into diets table:', err);
                      connection.rollback();
                      return;
                    }
                  });
                }
    
                // Commit the transaction
                connection.commit((err) => {
                  if (err) {
                    console.error('Error committing transaction:', err);
                    connection.rollback();
                  } else {
                    console.log('Data inserted successfully.');
                  }
    
                // Increment the counter of completed insertions
                completedInsertions++;
            
                // Check if all insertions are completed before closing the connection
                if (completedInsertions === dataToInsert.length) {
                  // Close the database connection
                  connection.end((endErr) => {
                    if (endErr) {
                      console.error('Error closing database connection:', endErr);
                      return;
                    }
                    console.log('Connection closed');
                  });
                }
                  
                });
              }
            );
          });
        })
        .catch((apiErr) => {
          console.error('Error making API call:', apiErr);
    
          // Close the database connection if there is an API error
          connection.end((endErr) => {
            if (endErr) {
              console.error('Error closing database connection:', endErr);
              return;
            }
            console.log('Connection closed');
          });
        });
    }, 2000); // 0.1 seconds
  }
});
