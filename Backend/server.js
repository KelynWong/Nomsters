const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

// Parse JSON and URL-encoded body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import api routes
const cuisine = require('./routes/cuisines');
const user = require('./routes/user');

app.use('/api/cuisine', cuisine);
app.use('/api/user', user);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});