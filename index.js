var app = require("express")();

app.get('/', function(req, res) {
  res.end('you know');
});

app.listen(process.env.PORT || 5000);
