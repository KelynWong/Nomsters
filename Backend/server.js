const express = require('express');
const cors=require('cors');
require('dotenv').config();

const port = 3100;
const app = express();

// Parse JSON and URL-encoded body
app.use(express.json())
app.use(cors())

const authenticate = require('./middleware/authenticate');

// import api routes
const cuisine = require('./routes/maria/cuisine');
const dishtype = require('./routes/maria/dishType');
const diet = require('./routes/maria/diet');
const recipe = require('./routes/maria/recipe');
const user = require('./routes/maria/user');
const auth = require('./routes/maria/auth');
const maps= require('./routes/maria/maps');

// uncomment for localhost
// const cuisine = require('./routes/mysql/cuisine');
// const dishtype = require('./routes/mysql/dishType');
// const diet = require('./routes/mysql/diet');
// const recipe = require('./routes/mysql/recipe');
// const user = require('./routes/mysql/user');
// const auth = require('./routes/mysql/auth');

app.use('/api', auth);
app.use('/api/recipe', authenticate, recipe);
app.use('/api/user', authenticate, user);
app.use('/api/cuisine', authenticate, cuisine);
app.use('/api/dishType', authenticate, dishtype);
app.use('/api/diet', authenticate, diet);
app.use('/api/maps', maps)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});