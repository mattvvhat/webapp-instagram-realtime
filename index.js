var url = require('url');
var app = require('express')();
var InstagramStream = require('instagram-realtime');
var opts = require('./secrets.json');

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
stream.on('subscribe/error', function (error, req, resp) {
  console.log(error);
});

stream.unsubscribe('all');

// Express

app.get('/', function(req, res) {
  res.end('you know');
});

app.listen(process.env.PORT || 5000);
