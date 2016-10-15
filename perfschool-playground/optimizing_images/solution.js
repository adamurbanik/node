var IMGUR_CLIENT_ID = '98128cfaffd30db';

var _ = require('lodash');
// var gm = require('gm');
var gm = require('gm').subClass({ imageMagick: true });
var url = require('url');
var path = require('path');
var util = require('util');
var request = require('request');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;

var concat = require('concat-stream');
var fs = require('fs');
var https = require('https');
var http = require('http');

var im = require('imagemagick');
Canvas = require('canvas');

app.get('/cats', cats);
app.listen(port, listening);

function listening() {
  console.log('Listening on port', port);
}

function cats(req, res) {
  var url = 'https://api.imgur.com/3/gallery/r/kittens';
  var options = {
    headers: { Authorization: 'Client-ID ' + IMGUR_CLIENT_ID },
    qs: { q_size_px: 'small' },
    url: url,
    json: true
  };
  request(options, got);

  function got(err, response) {
    var title = '<title>Optimizing Images!</title>';
    var cats = _.map(response.body.data, 'link');

    iterate(cats);
  }


  function iterate(cats) {
    var deferred = Promise.defer();

    cats.forEach((item, index) => {
      var base = path.basename(item);
      http.get(item, function (resHttp) {
        gm(resHttp)
          .resize(100, 100) // set maximum image size
          .write(`./pictures/${base}`, (err)=> {
            if (err) return console.log(err);
            if (index === cats.length - 1) deferred.resolve('koty za ploty')
          })
      })
    })
    return deferred.promise;
  }



  function random(cats, amount) { //console.log(amount)
    var result = [];
    while (amount--) {
      result.push.apply(result, cats.splice(Math.floor(Math.random() * cats.length), 1));
    }
    return result;
  }

  function toImageTag(cat) {
    return util.format(`<img src=${cat} />`);
  }
}
