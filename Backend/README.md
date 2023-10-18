# API Documentation

## Introduction


## Authentication
- All endpoints (except login and sign up) requires a "authentication" header in the request with corresponding jwt token value in the format of: BEARER < token value >
- If token is expired or wrong token
  - status code: `401`
    ```json
    {
	    "message": "Invalid token"
    }
- If no authentication header provided
  - status code: `401`
    ```json
    {
        "message": "Token is missing"
    }

## Database error standard response (all endpoints)
- status code: `500`
    ```json
    {
	    "error": "error message"
    }

## Base URL
- local - `http://localhost:3000/api`
- hosted - `https://leaptron2.dscloud.me:3000/api`

## Endpoints
- [Login](#login) 
- [Sign Up](#sign-up) 
- [Get A User](#get-a-user) 
- [Update User](#update-user) 
- [Delete User](#delete-user) 
- [Add or update User Diet](#add-or-update-user-diet) 
- [Delete User Diet](#delete-user-diet) 
- [Add User Favourite Recipe](#add-user-favourite-recipe) 
- [Delete User Favourite Recipe](#delete-user-favourite-recipe) 
- [Get User Favourite Recipe](#get-user-favourite-recipe) 
- [Get Dish Types](#get-dish-types) 
- [Get Diets](#get-diets) 
- [Get Cuisines](#get-cuisines) 
- [Get Recipes](#get-recipes) 
- [Add Recipe](#add-recipe) 
- [Delete Recipe](#delete-recipe) 

### Login 
- **URL:** `/login`
- **Method:** `POST`
- **Description:** 
- **Basic auth request:**
  - `username` (string)
  - `password` (string)
- **Response:**
  - `token` (string)
  - `userId` (int)
    ```json
    {
        "token": "tokenValue",
        "userId": 1
    }
  
#### Success Example
- **Example request:**
  - username = "test"
  - password = "password123"

- **Example response:**
  - status code: `200`
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NzAyNDU4NCwiZXhwIjoxNjk3MTEwOTg0fQ.gP4p17aaOT1e2TuJk4Ay0M6_eWnkWL3LwQ2C87N6ZEw",
        "userId": 1
    }

#### Error Example 1 (unknown username)
- **Example request:**
  - username = "test"
  - password = "password123"

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Username doesnt exist"
    }

#### Error Example 2 (wrong password)
- **Example request:**
  - username = "test"
  - password = "password123"

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Password is incorrect"
    }

#### Error Example 3 (empty credentials)
- **Example request:**
  - username = ""
  - password = ""

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide login credentials"
    }

### Sign Up 
- **URL:** `/signup`
- **Method:** `POST`
- **Description:** 
- **Json body request:**
  - `username` (string)
  - `password` (string)
  - `image` (blob) - optional
  - `diets` (string) - optional, multiple diet seperated by commas
    ```json
    {
        "username": "username",
        "password": "password",
        "image": "",
        "diets": ""
    }
- **Response:**
  - `token` (string)
  - `userId` (int)
    ```json
    {
        "token": "tokenValue",
        "userId": 1
    }
  
#### Success Example
- **Example request:**
    ```json
    {
        "username": "test",
        "password": "password123",
        "image": "0xFFD8FFE000104A46494600010100000100010000FFDB0043000403030404040405050405050906060509080A0A09080A0A0A0D0F120C0F0A0B0E0B0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0",
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }

- **Example response:**
  - status code: `200`
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NzAyNDU4NCwiZXhwIjoxNjk3MTEwOTg0fQ.gP4p17aaOT1e2TuJk4Ay0M6_eWnkWL3LwQ2C87N6ZEw",
        "userId": 1
    }

#### Error Example 1 (duplicate username)
- **Example request:**
  ```json
    {
        "username": "username",
        "password": "password",
        "image": "",
        "diets": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Username already in use"
    }

#### Error Example 2 (empty username or password)
- **Example request:**
  ```json
    {
        "username": "",
        "password": "",
        "image": "",
        "diets": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide username and password"
    }

### Get A User
- **URL:** `/user/:id`
- **Method:** `GET`
- **Description:** 
- **Params:**
  - `id` (int)
- **Response:**
  - `userId` (int)
  - `username` (string)
  - `password` (string)
  - `image` (blob)
    ```json
    {
        "userId": 1,
        "username": "username",
        "password": "password",
        "image": "imageBlob"
    }
  
#### Success Example
- **Example request:**
  - url: /user/1

- **Example response:**
    - status code: `200`
    ```json
    {
        "userId": 1,
        "username": "kelyn",
        "password": "$2b$10$A01kjTpQiXJ1Mv63d6ATYerlQ1qm/YcKd3dGQF.MPMPrdZ0usDnUm",
        "image": null
    }

#### Error Example (user doesnt exist)
- **Example request:**
  - url: /user/3847

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

### Update User
- **URL:** `/user/:id`
- **Method:** `PUT`
- **Description:** 
- **Params:**
  - `id` (int)
- **Json body request:**
  - `username` (string)
  - `password` (string)
  - `image` (blob) - optional
    ```json
    {
        "username": "username",
        "password": "password",
        "image": ""
    }
- **Response:**
  - `message` (string)
    ```json
    { 
        "message": "User updated successfully" 
    }
  
#### Success Example
- **Example request:**
  - url: /user/1
  - Json body request:
  ```json
    {
        "username": "testUsername",
        "password": "password",
        "image": ""
    }

- **Example response:**
  - status code: `200`
    ```json
    { 
        "message": "User updated successfully" 
    }

#### Error Example 1 (user doesnt exist)
- **Example request:**
  - url: /user/3847
  - Json body request:
  ```json
    {
        "username": "testUsername",
        "password": "password",
        "image": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

#### Error Example 2 (empty username/password)
- **Example request:**
  - url: /user/1
  - Json body request:
  ```json
    {
        "username": "",
        "password": "",
        "image": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide username and password"
    }

### Delete User
- **URL:** `/user/:id`
- **Method:** `DELETE`
- **Description:** 
- **Params:**
  - `id` (int)
- **Response:**
  - `message` (string)
    ```json
    { 
        "message": "User deleted successfully" 
    }
  
#### Success Example
- **Example request:**
  - url: /user/1

- **Example response:**
  - status code: `200`
    ```json
    { 
        "message": "User deleted successfully" 
    }

#### Error Example (user doesnt exist)
- **Example request:**
  - url: /user/3847

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

### Add or Update User Diet
- **URL:** `/user/:id/diet`
- **Method:** `POST`
- **Description:** 
- **Params:**
  - `id` (int)
- **Json body request:**
  - `diets` (string) - multiple diet seperated by commas
    ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }
- **Response:**
  - `message` (string)
    ```json
    {
	    "message": "User diet updated successfully"
    }
  
#### Success Example
- **Example request:**
  - url: /user/1/diet
  - Json body request:
  ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }

- **Example response:**
  - status code: `200`
    ```json
    { 
        "message": "User diet updated successfully" 
    }

#### Error Example 1 (user doesnt exist)
- **Example request:**
  - url: /user/3846/diet
  - Json body request:
  ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

#### Error Example 2 (empty diet)
- **Example request:**
  - url: /user/1/diet
  - Json body request:
  ```json
    { 
        "diets": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide diets"
    }

### Delete User Diet
- **URL:** `/user/:id/diet`
- **Method:** `POST`
- **Description:** 
- **Params:**
  - `id` (int)
- **Json body request:**
  - `diets` (string) - multiple diet seperated by commas
    ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }
- **Response:**
  - `message` (string)
    ```json
    {
	    "message": "User diet deleted successfully"
    }
  
#### Success Example
- **Example request:**
  - url: /user/1/diet
  - Json body request:
  ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }

- **Example response:**
  - status code: `200`
    ```json
    { 
        "message": "User diet deleted successfully" 
    }

#### Error Example 1 (user doesnt exist)
- **Example request:**
  - url: /user/3846
  - Json body request:
  ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

#### Error Example 2 (empty diet)
- **Example request:**
  - url: /user/1
  - Json body request:
  ```json
    { 
        "diets": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide diets"
    }

#### Error Example 3 (no such diet exists for user to delete)
- **Example request:**
  - url: /user/1
  - Json body request:
  ```json
    { 
        "diets": "testdiet, vegan, paleolithic"
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Diet(s) not found"
    }

### Add User Favourite Recipe
- **URL:** `/user/:userId/recipe/:recipeId`
- **Method:** `POST`
- **Description:** 
- **Params:**
  - `userId` (int)
  - `recipeId` (int)
- **Response:**
  - `message` (string)
    ```json
    {
	    "message": "User favorite recipe added successfully"
    }
  
#### Success Example
- **Example request:**
  - url: /user/1/recipe/1

- **Example response:**
  - status code: `200`
    ```json
    { 
        "message": "User favorite recipe added successfully" 
    }

#### Error Example 1 (user doesnt exist)
- **Example request:**
  - url: /user/3846/recipe/1

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

#### Error Example 2 (recipe doesnt exist)
- **Example request:**
  - url: /user/1/recipe/2384682

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Recipe not found"
    }

#### Error Example 3 (recipe already added to favourites)
- **Example request:**
  - url: /user/1/recipe/1

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User favorite recipe already added"
    }

### Delete User Favourite Recipe
- **URL:** `/user/:id/recipe`
- **Method:** `DELETE`
- **Description:** 
- **Params:**
  - `id` (int)
- **Json body request:**
  - `recipeIds` (string) - multiple recipe ids seperated by commas
    ```json
    { 
        "recipeIds": "1, 4, 8, 10"
    }
- **Response:**
  - `message` (string)
    ```json
    {
	    "message": "User favorite recipes deleted successfully"
    }
  
#### Success Example
- **Example request:**
  - url: /user/1/recipe
  - Json body request:
  ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }

- **Example response:**
  - status code: `200`
    ```json
    {
	    "message": "User favorite recipes deleted successfully"
    }

#### Error Example 1 (user doesnt exist)
- **Example request:**
  - url: /user/3846/recipe
  - Json body request:
  ```json
    { 
        "diets": "gluten free, vegan, paleolithic, fodmap friendly"
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

#### Error Example 2 (empty recipeIds)
- **Example request:**
  - url: /user/1/recipe
  - Json body request:
  ```json
    { 
        "recipeIds": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide recipeIds"
    }

#### Error Example 3 (recipe(s) not in user favourites)
- **Example request:**
  - url: /user/1/recipe
  - Json body request:
  ```json
    { 
        "recipeIds": "6, 3"
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Recipe(s) is not user favorites"
    }

#### Error Example 4 (recipe(s) doesnt exist)
- **Example request:**
  - url: /user/1/recipe
  - Json body request:
  ```json
    { 
        "recipeIds": "28463203, 84462834, 3895058"
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Recipe(s) not found"
    }

### Get User Favourite Recipe
- **URL:** `/user/:id/recipe`
- **Method:** `GET`
- **Description:** 
- **Params:**
  - `id` (int)
- **Response:**
  - Array: 
    - `recipeId` (int)
    - `vegetarian` (tinyint)
    - `vegan` (tinyint)
    - `glutenFree` (tinyint)
    - `dairyFree` (tinyint)
    - `veryHealthy` (tinyint)
    - `cheap` (tinyint)
    - `veryPopular` (tinyint)
    - `sustainable` (tinyint)
    - `lowFodMap` (tinyint)
    - `weightWatcherSmartPoints` (int)
    - `gaps` (string)
    - `preparationMinutes` (int)
    - `cookingMinutes` (int)
    - `aggregateLikes` (int)
    - `healthScore` (int)
    - `creditsText` (string)
    - `license` (string)
    - `sourceName` (string)
    - `pricePerServing` (float)
    - `id` (int)
    - `title` (string)
    - `readyInMinutes` (int)
    - `servings` (int)
    - `sourceUrl` (string)
    - `image` (string)
    - `image2` (blob)
    - `imageType` (string)
    - `summary` (string)
    - `instructions` (string)
    - `originalId` (string)
    - `spoonacularSourceUrl` (string)
    - `calories` (float)
    - `fat` (float)
    - `saturatedFat` (float)
    - `carbohydrates` (float)
    - `sugar` (float)
    - `cholesterol` (float)
    - `sodium` (float)
    - `protein` (float)
    - `dishtypes` (array of strings)
    - `diets` (array of strings)
    - `cuisines` (array of strings)
    ```json
    [
      {
        "recipeId": 161,
        "vegetarian": 1,
        "vegan": 1,
        "glutenFree": 1,
        "dairyFree": 1,
        "veryHealthy": 0,
        "cheap": 0,
        "veryPopular": 0,
        "sustainable": 0,
        "lowFodMap": 1,
        "weightWatcherSmartPoints": 0,
        "gaps": "no",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 3,
        "healthScore": 36,
        "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
        "license": "CC BY 3.0",
        "sourceName": "Foodista",
        "pricePerServing": 87.85,
        "id": 631913,
        "title": "A Refreshing Drink To Welcome You All",
        "readyInMinutes": 45,
        "servings": 6,
        "sourceUrl": "https://www.foodista.com/recipe/8XQZRM44/a-refreshing-drink-to-welcome-you-all",
        "image": "https://spoonacular.com/recipeImages/631913-556x370.jpg",
        "image2": null,
        "imageType": "jpg",
        "summary": "A Refreshing Drink To Welcome You All is a beverage that serves 6. One serving contains <b>43 calories</b>, <b>2g of protein</b>, and <b>0g of fat</b>. For <b>88 cents per serving</b>, this recipe <b>covers 7%</b> of your daily requirements of vitamins an",
        "instructions": "Pick the mint leaves and wash it in running water.\nClean and grate the ginger.\nHeat water in a vessel and add sugar to it. Let the sugar dissolve; filter the sugar syrup with a thin muslin cloth.\nBoil it further on medium heat till the syrup becomes a bit",
        "originalId": null,
        "spoonacularSourceUrl": "https://spoonacular.com/a-refreshing-drink-to-welcome-you-all-631913",
        "calories": 42.6,
        "fat": 0.47,
        "saturatedFat": 0.08,
        "carbohydrates": 12.49,
        "sugar": 8.27,
        "cholesterol": 2.87,
        "sodium": 0,
        "protein": 15.17,
        "dishtypes": [
          "beverage",
          "drink"
        ],
        "diets": [
          "gluten free",
          "dairy free",
          "lacto ovo vegetarian",
          "fodmap friendly",
          "vegan"
        ],
        "cuisines": null
      }
    ]
  
#### Success Example
- **Example request:**
  - url: /user/1/recipe

- **Example response:**
  - status code: `200`
    ```json
    [
      {
        "recipeId": 161,
        "vegetarian": 1,
        "vegan": 1,
        "glutenFree": 1,
        "dairyFree": 1,
        "veryHealthy": 0,
        "cheap": 0,
        "veryPopular": 0,
        "sustainable": 0,
        "lowFodMap": 1,
        "weightWatcherSmartPoints": 0,
        "gaps": "no",
        "preparationMinutes": -1,
        "cookingMinutes": -1,
        "aggregateLikes": 3,
        "healthScore": 36,
        "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
        "license": "CC BY 3.0",
        "sourceName": "Foodista",
        "pricePerServing": 87.85,
        "id": 631913,
        "title": "A Refreshing Drink To Welcome You All",
        "readyInMinutes": 45,
        "servings": 6,
        "sourceUrl": "https://www.foodista.com/recipe/8XQZRM44/a-refreshing-drink-to-welcome-you-all",
        "image": "https://spoonacular.com/recipeImages/631913-556x370.jpg",
        "image2": null,
        "imageType": "jpg",
        "summary": "A Refreshing Drink To Welcome You All is a beverage that serves 6. One serving contains <b>43 calories</b>, <b>2g of protein</b>, and <b>0g of fat</b>. For <b>88 cents per serving</b>, this recipe <b>covers 7%</b> of your daily requirements of vitamins an",
        "instructions": "Pick the mint leaves and wash it in running water.\nClean and grate the ginger.\nHeat water in a vessel and add sugar to it. Let the sugar dissolve; filter the sugar syrup with a thin muslin cloth.\nBoil it further on medium heat till the syrup becomes a bit",
        "originalId": null,
        "spoonacularSourceUrl": "https://spoonacular.com/a-refreshing-drink-to-welcome-you-all-631913",
        "calories": 42.6,
        "fat": 0.47,
        "saturatedFat": 0.08,
        "carbohydrates": 12.49,
        "sugar": 8.27,
        "cholesterol": 2.87,
        "sodium": 0,
        "protein": 15.17,
        "dishtypes": [
          "beverage",
          "drink"
        ],
        "diets": [
          "gluten free",
          "dairy free",
          "lacto ovo vegetarian",
          "fodmap friendly",
          "vegan"
        ],
        "cuisines": null
      }
    ]

#### Error Example 1 (user doesnt exist)
- **Example request:**
  - url: /user/3846/recipe

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "User not found"
    }

#### Error Example 2 (user doesnt have any favourited recipes)
- **Example request:**
  - url: /user/2/recipe

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "No favourite recipes found"
    }

### Get Dish Types
- **URL:** `/dishType`
- **Method:** `GET`
- **Description:** 
- **Response:**
  - Array: `name` (string)
    ```json
    [
        {
            "name": "side dish"
        },
        {
            "name": "antipasti"
        }
    ]
  
#### Success Example
- **Example request:**
  - url: /dishType

- **Example response:**
    - status code: `200`
    ```json
    [
        {
            "name": "side dish"
        },
        {
            "name": "antipasti"
        },
        {
            "name": "starter"
        },
        {
            "name": "snack"
        },
        {
            "name": "appetizer"
        },
        {
            "name": "antipasto"
        },
        {
            "name": "hor d'oeuvre"
        },
        {
            "name": "beverage"
        },
        {
            "name": "drink"
        },
        {
            "name": "lunch"
        },
        {
            "name": "main course"
        },
        {
            "name": "main dish"
        },
        {
            "name": "dinner"
        },
        {
            "name": "soup"
        },
        {
            "name": "dessert"
        },
        {
            "name": "sauce"
        },
        {
            "name": "salad"
        },
        {
            "name": "morning meal"
        },
        {
            "name": "brunch"
        },
        {
            "name": "breakfast"
        },
        {
            "name": "condiment"
        },
        {
            "name": "dip"
        },
        {
            "name": "spread"
        },
        {
            "name": "bread"
        },
        {
            "name": "fingerfood"
        },
        {
            "name": "seasoning"
        },
        {
            "name": "marinade"
        }
    ]

### Get Diets
- **URL:** `/diet`
- **Method:** `GET`
- **Description:** 
- **Response:**
  - Array: `name` (string)
    ```json
    [
        {
            "name": "gluten free"
        },
        {
            "name": "dairy free"
        }
    ]
  
#### Success Example
- **Example request:**
  - url: /diet

- **Example response:**
    - status code: `200`
    ```json
    [
        {
            "name": "gluten free"
        },
        {
            "name": "dairy free"
        },
        {
            "name": "lacto ovo vegetarian"
        },
        {
            "name": "fodmap friendly"
        },
        {
            "name": "vegan"
        },
        {
            "name": "paleolithic"
        },
        {
            "name": "primal"
        },
        {
            "name": "whole 30"
        },
        {
            "name": "pescatarian"
        },
        {
            "name": "ketogenic"
        }
    ]

### Get Cuisines
- **URL:** `/cuisine`
- **Method:** `GET`
- **Description:** 
- **Response:**
  - Array: `name` (string)
    ```json
    [
        {
            "name": "Mexican"
        },
        {
            "name": "Creole"
        }
    ]
  
#### Success Example
- **Example request:**
  - url: /cuisine

- **Example response:**
    - status code: `200`
    ```json
    [
        {
            "name": "Mexican"
        },
        {
            "name": "Creole"
        },
        {
            "name": "Cajun"
        },
        {
            "name": "South American"
        },
        {
            "name": "Latin American"
        },
        {
            "name": "Southern"
        },
        {
            "name": "Middle Eastern"
        },
        {
            "name": "American"
        },
        {
            "name": "Mediterranean"
        },
        {
            "name": "Italian"
        },
        {
            "name": "European"
        },
        {
            "name": "Asian"
        },
        {
            "name": "English"
        },
        {
            "name": "Scottish"
        },
        {
            "name": "British"
        },
        {
            "name": "Chinese"
        },
        {
            "name": "French"
        },
        {
            "name": "Indian"
        },
        {
            "name": "Vietnamese"
        },
        {
            "name": "Spanish"
        },
        {
            "name": "Eastern European"
        },
        {
            "name": "Greek"
        },
        {
            "name": "Irish"
        },
        {
            "name": "Japanese"
        },
        {
            "name": "Jewish"
        },
        {
            "name": "Nordic"
        },
        {
            "name": "Scandinavian"
        },
        {
            "name": "African"
        },
        {
            "name": "Korean"
        },
        {
            "name": "bbq"
        },
        {
            "name": "Barbecue"
        },
        {
            "name": "Thai"
        }
    ]

### Get Recipes
- **URL:** `/recipe`
- **Method:** `GET`
- **Description:** 
- **Params:**
  - `title` (string) - optional
  - `cuisine` (string) - optional, multiple cuisines seperate by commas
  - `dishtype` (string) - optional, multiple dish types seperate by commas
  - `diet` (string) - optional, multiple diets seperate by commas
  - `sort` (string) - optional, must be a field that exists in recipe (recommended fields to sort by: "healthScore", "pricePerServing", "readyInMinutes", "servings", "calories")
  - `order` (string) - optional, only either "ASC" or "DESC" (if blank, default is ASC)
- **Response:**
  - Array: 
    - `recipeId` (int)
    - `vegetarian` (tinyint)
    - `vegan` (tinyint)
    - `glutenFree` (tinyint)
    - `dairyFree` (tinyint)
    - `veryHealthy` (tinyint)
    - `cheap` (tinyint)
    - `veryPopular` (tinyint)
    - `sustainable` (tinyint)
    - `lowFodMap` (tinyint)
    - `weightWatcherSmartPoints` (int)
    - `gaps` (string)
    - `preparationMinutes` (int)
    - `cookingMinutes` (int)
    - `aggregateLikes` (int)
    - `healthScore` (int)
    - `creditsText` (string)
    - `license` (string)
    - `sourceName` (string)
    - `pricePerServing` (float)
    - `id` (int)
    - `title` (string)
    - `readyInMinutes` (int)
    - `servings` (int)
    - `sourceUrl` (string)
    - `image` (string)
    - `image2` (blob)
    - `imageType` (string)
    - `summary` (string)
    - `instructions` (string)
    - `originalId` (string)
    - `spoonacularSourceUrl` (string)
    - `calories` (float)
    - `fat` (float)
    - `saturatedFat` (float)
    - `carbohydrates` (float)
    - `sugar` (float)
    - `cholesterol` (float)
    - `sodium` (float)
    - `protein` (float)
    - `dishtypes` (array of strings)
    - `diets` (array of strings)
    - `cuisines` (array of strings)
    ```json
    [
        {
            "recipeId": 161,
            "vegetarian": 1,
            "vegan": 1,
            "glutenFree": 1,
            "dairyFree": 1,
            "veryHealthy": 0,
            "cheap": 0,
            "veryPopular": 0,
            "sustainable": 0,
            "lowFodMap": 1,
            "weightWatcherSmartPoints": 0,
            "gaps": "no",
            "preparationMinutes": -1,
            "cookingMinutes": -1,
            "aggregateLikes": 3,
            "healthScore": 36,
            "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
            "license": "CC BY 3.0",
            "sourceName": "Foodista",
            "pricePerServing": 87.85,
            "id": "631913",
            "title": "A Refreshing Drink To Welcome You All",
            "readyInMinutes": 45,
            "servings": 6,
            "sourceUrl": "https://www.foodista.com/recipe/8XQZRM44/a-refreshing-drink-to-welcome-you-all",
            "image": "https://spoonacular.com/recipeImages/631913-556x370.jpg",
            "image2": null,
            "imageType": "jpg",
            "summary": "A Refreshing Drink To Welcome You All is a beverage that serves 6. One serving contains <b>43 calories</b>, <b>2g of protein</b>, and <b>0g of fat</b>. For <b>88 cents per serving</b>, this recipe <b>covers 7%</b> of your daily requirements of vitamins an",
            "instructions": "Pick the mint leaves and wash it in running water.\nClean and grate the ginger.\nHeat water in a vessel and add sugar to it. Let the sugar dissolve; filter the sugar syrup with a thin muslin cloth.\nBoil it further on medium heat till the syrup becomes a bit",
            "originalId": null,
            "spoonacularSourceUrl": "https://spoonacular.com/a-refreshing-drink-to-welcome-you-all-631913",
            "calories": 42.6,
            "fat": 0.47,
            "saturatedFat": 0.08,
            "carbohydrates": 12.49,
            "sugar": 8.27,
            "cholesterol": 2.87,
            "sodium": 0,
            "protein": 15.17,
            "dishtypes": [
                "beverage",
                "drink"
            ],
            "diets": [
                "gluten free",
                "dairy free",
                "lacto ovo vegetarian",
                "fodmap friendly",
                "vegan"
            ],
            "cuisines": null
        }
    ]
  
#### Success Example
- **Example request:**
  - url: /recipe

- **Example response:**
    - status code: `200`
    ```json
    [
        {
            "recipeId": 161,
            "vegetarian": 1,
            "vegan": 1,
            "glutenFree": 1,
            "dairyFree": 1,
            "veryHealthy": 0,
            "cheap": 0,
            "veryPopular": 0,
            "sustainable": 0,
            "lowFodMap": 1,
            "weightWatcherSmartPoints": 0,
            "gaps": "no",
            "preparationMinutes": -1,
            "cookingMinutes": -1,
            "aggregateLikes": 3,
            "healthScore": 36,
            "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
            "license": "CC BY 3.0",
            "sourceName": "Foodista",
            "pricePerServing": 87.85,
            "id": "631913",
            "title": "A Refreshing Drink To Welcome You All",
            "readyInMinutes": 45,
            "servings": 6,
            "sourceUrl": "https://www.foodista.com/recipe/8XQZRM44/a-refreshing-drink-to-welcome-you-all",
            "image": "https://spoonacular.com/recipeImages/631913-556x370.jpg",
            "image2": null,
            "imageType": "jpg",
            "summary": "A Refreshing Drink To Welcome You All is a beverage that serves 6. One serving contains <b>43 calories</b>, <b>2g of protein</b>, and <b>0g of fat</b>. For <b>88 cents per serving</b>, this recipe <b>covers 7%</b> of your daily requirements of vitamins an",
            "instructions": "Pick the mint leaves and wash it in running water.\nClean and grate the ginger.\nHeat water in a vessel and add sugar to it. Let the sugar dissolve; filter the sugar syrup with a thin muslin cloth.\nBoil it further on medium heat till the syrup becomes a bit",
            "originalId": null,
            "spoonacularSourceUrl": "https://spoonacular.com/a-refreshing-drink-to-welcome-you-all-631913",
            "calories": 42.6,
            "fat": 0.47,
            "saturatedFat": 0.08,
            "carbohydrates": 12.49,
            "sugar": 8.27,
            "cholesterol": 2.87,
            "sodium": 0,
            "protein": 15.17,
            "dishtypes": [
                "beverage",
                "drink"
            ],
            "diets": [
                "gluten free",
                "dairy free",
                "lacto ovo vegetarian",
                "fodmap friendly",
                "vegan"
            ],
            "cuisines": null
        }
    ]

#### Error Example (no recipe(s) found)
- **Example request:**
  - url: /recipe
  - Params:
    - title = pasta
    - diet = gluten free, pescatarian
    - dishtype = beverage

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "No recipes found"
    }

### Add recipe
- **URL:** `/recipe`
- **Method:** `POST`
- **Description:** 
- **Json body request:**
  - `title` (string)
  - `servings` (int)
  - `ingredients` (array of strings)
  - `instructions` (string)
  - `image` (blob)
    ```json
    {
      "title": "Chicken Stir-Fry",
      "servings": 4,
      "ingredients": [
          "1 lb boneless, skinless chicken breasts, cut into strips",
          "2 cups broccoli florets",
          "1 red bell pepper, sliced",
          "3 cloves garlic, minced",
          "2 Tbsps soy sauce",
          "1 Tbsp oyster sauce",
          "2 tsp cornstarch",
          "1/2 tsp red pepper flakes",
          "2 Tbsps vegetable oil",
          "Cooked rice for serving"
      ],
      "instructions": "In a small bowl, mix together soy sauce, oyster sauce, cornstarch, and red pepper flakes. Heat vegetable oil in a large skillet or wok over medium-high heat. Add chicken and stir-fry until cooked through. Remove chicken from the skillet. In the same skillet, add a bit more oil if needed and stir-fry broccoli, bell pepper, and garlic until tender. Return chicken to the skillet and pour the sauce mixture over. Stir-fry for a couple of minutes until the sauce thickens. Serve hot over cooked rice.",
      "image": "0xFFD8FFE000104A46494600010100000100010000FFDB0043000403030404040405050405050906060509080A0A09080A0A0A0D0F120C0F0A0B0E0B0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0"
    }
- **Response:**
  - `message` (string)
    ```json
    {
	    "message": "Recipe added successfully"
    }
  
#### Success Example
- **Example request:**
  - url: /recipe
  - Json body request:
  ```json
    {
      "title": "Chicken Stir-Fry",
      "servings": 4,
      "ingredients": [
          "1 lb boneless, skinless chicken breasts, cut into strips",
          "2 cups broccoli florets",
          "1 red bell pepper, sliced",
          "3 cloves garlic, minced",
          "2 Tbsps soy sauce",
          "1 Tbsp oyster sauce",
          "2 tsp cornstarch",
          "1/2 tsp red pepper flakes",
          "2 Tbsps vegetable oil",
          "Cooked rice for serving"
      ],
      "instructions": "In a small bowl, mix together soy sauce, oyster sauce, cornstarch, and red pepper flakes. Heat vegetable oil in a large skillet or wok over medium-high heat. Add chicken and stir-fry until cooked through. Remove chicken from the skillet. In the same skillet, add a bit more oil if needed and stir-fry broccoli, bell pepper, and garlic until tender. Return chicken to the skillet and pour the sauce mixture over. Stir-fry for a couple of minutes until the sauce thickens. Serve hot over cooked rice.",
      "image": "0xFFD8FFE000104A46494600010100000100010000FFDB0043000403030404040405050405050906060509080A0A09080A0A0A0D0F120C0F0A0B0E0B0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0"
    }

- **Example response:**
  - status code: `200`
    ```json
    {
	    "message": "Recipe added successfully"
    }

#### Error Example (empty title/servings/ingredients/instructions/image)
- **Example request:**
  - url: /recipe
  - Json body request:
  ```json
    {
      "title": "",
      "servings": 0,
      "ingredients": [],
      "instructions": "",
      "image": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide all recipe information"
    }

### Delete Recipe
- **URL:** `/recipe/:id`
- **Method:** `DELETE`
- **Description:** 
- **Params:**
  - `id` (int)
- **Response:**
  - `message` (string)
    ```json
    { 
        "message": "Recipe deleted successfully" 
    }
  
#### Success Example
- **Example request:**
  - url: /recipe/1

- **Example response:**
  - status code: `200`
    ```json
    { 
        "message": "User deleted successfully" 
    }

#### Error Example (recipe doesnt exist)
- **Example request:**
  - url: /recipe/384724

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Recipe not found"
    }