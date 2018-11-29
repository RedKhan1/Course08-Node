const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { queryParam } = require('./middleware/middleware');

const port = 4000;
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Create a middleware that parses out the query of a url
app.use(queryParam);

app.get('/', (req, res) => {
  res.json(req.query2);
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
