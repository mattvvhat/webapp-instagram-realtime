var mongoose  = require('mongoose');
var app       = require('express')();
var server    = require('http').createServer(app).listen(process.env.PORT || 5000);
var io        = require('socket.io').listen(server, { log : false })


mongoose.connect('mongodb://nodejitsu_razorblade:doo8n92i8sb1eb7dpd3cekgoe3@ds029950.mongolab.com:29950/nodejitsu_razorblade_nodejitsudb5500477112');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});

var InstagramStream = require('instagram-realtime');
var secrets = require('./secrets.json');

var opts = {
  client_id     : secrets.client_id,
  client_secret : secrets.client_secret,
  // Replace this with: callback_url: "http://irir.jit.su/callback"
  url           : "http://irir.jit.su",
  callback_path : 'callback'
};

// instagram-realtime

var stream = InstagramStream(server, opts);

stream.on('unsubscribe', function (req, resp) {
  console.log('unsubscribe');
  console.log(req.body);
  stream.subscribe({ tag : 'video' });
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

stream.on('new', function (req, body) {
  console.log('new');
  io.sockets.emit('new', req.body);
});
stream.on('new/error', function (error, req, resp) {
  console.log('new/error');
  console.log(req.body);
});

stream.unsubscribe('all');

// Express

app.get('/', function(req, res) {
  res.render('index.jade', {});

});
