//Install express server
const express = require('express');
const path = require('path');

const app = express();

// set up rate limiter to maximum thirty  requests per minute
const RateLimiter = require('express-rate-limit');
const limiter = new RateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 30,
});

app.use(limiter);

// Serve only the static files form the build directory
app.use(express.static(__dirname + '/dist/rxjs-maps'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/rxjs-maps/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
