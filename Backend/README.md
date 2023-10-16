# API Documentation

## Introduction


## Authentication
All endpoints (except login and sign up) requires a "authentication" header in the request with corresponding jwt token value in the format of: BEARER < token value >

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
- [Update User Diet](#update-user-diet)
- [Add User Favourite Recipe](#add-user-favourite-recipe)
- [Delete User Favourite Recipe](#delete-user-favourite-recipe)
- [Get Dish Types](#get-dish-types)
- [Get Diets](#get-diets)
- [Get Cuisines](#get-cuisines)
- [Get Recipes](#get-recipes)

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
    ```json
    {
        "username": "username",
        "password": "password",
        "image": ""
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
        "image": "0xFFD8FFE000104A46494600010100000100010000FFDB0043000403030404040405050405050906060509080A0A09080A0A0A0D0F120C0F0A0B0E0B0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0"
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
        "image": ""
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
        "image": ""
    }

- **Example response:**
  - status code: `400`
    ```json
    {
	    "message": "Please provide username and password"
    }

### Get A User
- **URL:** `/signup`
- **Method:** `Get`
- **Description:** 
- **Header:**
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
        "image": "0xFFD8FFE000104A46494600010100000100010000FFDB0043000403030404040405050405050906060509080A0A09080A0A0A0D0F120C0F0A0B0E0B0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0A0"
    }

- **Example response:**
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NzAyNDU4NCwiZXhwIjoxNjk3MTEwOTg0fQ.gP4p17aaOT1e2TuJk4Ay0M6_eWnkWL3LwQ2C87N6ZEw",
        "userId": 1
    }