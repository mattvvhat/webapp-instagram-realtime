var url = require('url');
var app = require('express')();
var InstagramStream = require('instagram-realtime');
var opts = require('./secrets.json');

var stream = InstagramStream(app, opts);

stream.on('unsubscribe', function (req, resp) {
  console.log('unsubscribe'.green);
  stream.subscribe({ tag : 'yolo' });
});

stream.on('new', function (req, body) {
    console.log(body);
});

app.get('/', function (req, resp) {
  resp.set('Content-Type', 'text/plain; charset=utf-8');
  resp.end('🍕🏊');
});

stream.unsubscribe('all');


app.get('/', function(req, res) {
  res.end('you know');
});

app.listen(process.env.PORT || 5000);
