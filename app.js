require('dotenv').config();
const morganBody = require('morgan-body');
const { rateLimiterRoute } = require('./util/ratelimiter');
const Cache = require('./util/cache');
const {  PORT,  API_VERSION } = process.env;
const port = PORT;

// Express Initialization
const express = require('express');
const cors = require('cors');
const app = express();

app.set('trust proxy', true);
// app.set('trust proxy', 'loopback');
app.set('json spaces', 2);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// morganBody(app);

// CORS allow all
app.use(cors());

// Create the HTTP server
const http = require('http');
const socket = require('./util/socket');

// Configure Socket.IO to work with the server
const server = http.createServer(app);
const io = socket(server);

// API routes
app.use('/api/' + API_VERSION, rateLimiterRoute, [
  require('./server/routes/admin_route'),
  require('./server/routes/product_route'),
  require('./server/routes/marketing_route'),
  require('./server/routes/user_route'),
  require('./server/routes/order_route'),
  require('./server/routes/message'),
]);

// Page not found
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  Cache.connect().catch(() => {
    console.log('redis connect fail');
  });
});

module.exports = app;
