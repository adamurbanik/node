'use strict'
// process.setMaxListeners(100);

var IMGUR_CLIENT_ID = '98128cfaffd30db';

var _ = require('lodash');
var gm = require('gm').subClass({ imageMagick: true });
var path = require('path');
var util = require('util');
var request = require('request');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;
var http = require('http');

// var concat = require('concat-stream');
// var fs = require('fs');
// var https = require('https');
// var through = require('through2');
// var im = require('imagemagick');

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

  res.writeHead(200, {'Content-Type': 'text/plain'});
  // res.writeHead(200, {'Content-Type': 'text/event-stream'});

  function got(err, response) {
    var title = '<title>Optimizing Images!</title>';
    var cats = _.map(response.body.data, 'link');

    iterate(cats);
    // .then(resIterate => {
    //   console.log('wyszedlem z primisa');
    //   console.log('res.length', resIterate.length);
    //   console.log('resIterate[0]', resIterate[0]);

    //   resIterate[0].pipe(res);
    // });
  }

  function iterate(cats) {
    var deferred = Promise.defer();

    let index = 0;
    cats.forEach((item) => {
      (index <= cats.length) ? processItem(item) : cb();

    })

    function cb() {
      res.end();
    }

    function processItem(item) {
      console.log(index, cats.length);
      http.get(item, (resHttp) => {
        gm(resHttp)
          .resize(100, 100) // set maximum image size
          .stream('jpg', processStream)
      })
    }

    const processStream = (err, stdout, stderr) => {
      if (err) return console.log(err);
      
      var content = stdout.toString();     //store image into content + //encode to base64
      var imagedata = new Buffer(content).toString('base64');    
      res.write('<img src="data:image/gif;base64,' + imagedata + '">');//send image

      stdout.pipe(res, { end: false });
      stdout.once('end', function () {
        index++;
      })
    }
  }


  // function iterate(cats) {
  //   var deferred = Promise.defer();

  //   cats.forEach((item, index) => {
  //     var base = path.basename(item);
  //     http.get(item, function (resHttp) {
  //       gm(resHttp)
  //         .resize(100, 100) // set maximum image size
  //         .write(`./pictures/${base}`, (err)=> {
  //           if (err) return console.log(err);
  //           if (index === cats.length - 1) deferred.resolve('koty za ploty')
  //         })
  //     })
  //   })
  //   return deferred.promise;
  // }

  function toImageTag(cat) {
    return util.format(`<img src=${cat} />`);
  }
}
