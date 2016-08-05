const PORT = process.env.PORT || 8000;



const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

// const mongoose = require('mongoose');
// const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/final-test-yelp';
// mongoose.connect(mongoUrl, err => {
//   console.log(err || `MongoDB connected to ${mongoUrl}`); // eslint-disable-line no-console
// });

server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`); // eslint-disable-line no-console
});

// view engine setup
app.set('view engine', 'html');

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);


// /////// ROUTERS //////////////

app.use('/api', require('./api/index'));

// //////////////////////////////

app.get('/', (req, res) => {
  res.send('hello');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send(err);
});
