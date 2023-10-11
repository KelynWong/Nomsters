const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

// Parse JSON and URL-encoded body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authenticate = require('./middleware/authenticate');

// import api routes
const cuisine = require('./routes/cuisine');
const dishtype = require('./routes/dishType');
const diet = require('./routes/diet');
const recipe = require('./routes/recipe');
const user = require('./routes/user');
const auth = require('./routes/auth');

app.use('/api', auth);
app.use('/api/recipe', authenticate, recipe);
app.use('/api/user', authenticate, user);
app.use('/api/cuisine', authenticate, cuisine);
app.use('/api/dishType', authenticate, dishtype);
app.use('/api/diet', authenticate, diet);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});