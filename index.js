var app = require('express')();
var InstagramStream = require('instagram-realtime');
var secrets = require('./secrets.json');
var opts = {
  client_id     : secrets.client_id,
  client_secret : secrets.client_secret,
  url           : "http://instagram-realtime.herokuapp.com",
  callback_path : 'callback'
};
console.log(opts);

// instagram-realtime

var stream = InstagramStream(app, opts);

stream.on('unsubscribe', function (req, resp) {
  console.log('unsubscribe');
  stream.subscribe({ tag : 'yolo' });
});
stream.on('unsubscribe/error', function (error, req, resp) {
  console.log('unsubscribe/error');
});
stream.on('new', function (req, body) {
  console.log(body);
});
stream.on('subscribe', function (req, resp) {
  console.log("subscribe");
});
stream.on('subscribe/error', function (error, req, resp) {
  console.log("subscribe/error");
  console.log(req.body);
});

stream.unsubscribe('all');

// Express

app.get('/', function(req, res) {
  res.end('you know');
});

app.listen(process.env.PORT || 5000);
