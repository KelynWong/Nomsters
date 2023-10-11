const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

// Parse JSON and URL-encoded body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
const cuisine = require('./routes/cuisines');
app.use('/api', cuisine);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});