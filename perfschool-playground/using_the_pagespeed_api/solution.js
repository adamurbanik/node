'use strict';
// console.log(process.env.PORT)

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;

var psi = require('psi');
var localtunnel = require('localtunnel');

app.get('/', home);
app.get('/insights', insights);
app.listen(port, listening);

function listening() {
  console.log('Listening on port', port);
}

function home(req, res) {
  console.log('__dirname', __dirname)
  var file = path.join(__dirname, 'index.html');
  var index = fs.readFileSync(file, 'utf8');
  res.send(index);
}

function insights(req, res) {
  localtunnel(port, (error, pipe) => {
    psi(pipe.url, (error, data) => {
      console.log(data);
      pipe.close();
      let json = {
        "resources": {
          "css": 3,
          "js": 3,
          "hosts": 6,
          "total": 18
        }
      }
      res.end(JSON.stringify(json));
    })
  });

}

