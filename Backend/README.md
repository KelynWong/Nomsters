# API Documentation

## Introduction


## Authentication
All endpoints (except login and sign up) requires a "suthentication" header in the request with corresponding jwt token value

## Base URL
- local - `http://localhost:3000/api`
- hosted - `tbc`

## Endpoints
- [Login](#login)
- [Sign Up](#signup)
- [Get A User](#getuser)
- [Update User](#updateuser)
- [Delete User](#deleteuser)
- [Update User Diet](#updateuserdiet)
- [Add User Favourite Recipe](#addfavrecipe)
- [Delete User Favourite Recipe](#deletefavrecipe)
- [Get Dish Types](#dishtypes)
- [Get Diets](#diets)
- [Get Cuisines](#cuisines)

### Login {#login}
- **URL:** `/login`
- **Method:** `POST`
- **Description:** 
- **Json body request:**
  - `username` (string)
  - `password` (string)
    ```json
    {
        "username": "username",
        "password": "password"
    }
- **Response:**
  - `token` (string)
  - `userId` (int)
    ```json
    {
        "token": "tokenValue",
        "userId": 1
    }
  
#### Example
- **Example request:**
    ```json
    {
        "username": "test",
        "password": "password123"
    }

- **Example response:**
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NzAyNDU4NCwiZXhwIjoxNjk3MTEwOTg0fQ.gP4p17aaOT1e2TuJk4Ay0M6_eWnkWL3LwQ2C87N6ZEw",
        "userId": 1
    }

### Sign Up {#signup}
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
  
#### Example
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