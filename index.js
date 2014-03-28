var app     = require('express')();
var server  = require('http').createServer(app).listen(process.env.PORT || 5000);
var InstagramStream = require('instagram-realtime');
var secrets = require('./secrets.json');

var opts = {
  client_id     : secrets.client_id,
  client_secret : secrets.client_secret,
  url           : "http://instagram-realtime.herokuapp.com",
  callback_path : 'callback'
};

// instagram-realtime

var stream = InstagramStream(server, opts);

stream.on('unsubscribe', function (req, resp) {
  console.log('unsubscribe');
  console.log(req.body);
  stream.subscribe({ tag : 'yolo' });
});
stream.on('unsubscribe/error', function (error, req, resp) {
  console.log('unsubscribe/error');
  console.log(req.body);
});
stream.on('subscribe', function (req, resp) {
  console.log("subscribe");
  console.log(req.body);
});
stream.on('subscribe/error', function (error, req, resp) {
  console.log("subscribe/error");
  console.log(req.body);
});
stream.on('new', function (req, resp) {
  console.log('new');
  console.log(req.body);
});
stream.on('new/error', function (req, resp) {
  console.log('new/error');
  console.log(req.body);
});

stream.unsubscribe('all');

// Express

app.get('/', function(req, res) {
  res.end('you know');
});
