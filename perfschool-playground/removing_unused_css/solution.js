'use strict';

var serveStatic = require('serve-static');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;

var uncss = require('uncss');
var fs = require('fs');


app.use(serveStatic(__dirname));
app.listen(port, listening);

function listening() {
  console.log('Listening on port', port);
}

var files = ['index.html'];
var options = {
  ignore: ['#added_at_runtime', /test\-[0-9]+/],
  media: ['(min-width: 700px) handheld and (orientation: landscape)'],
  csspath: '/',
  raw: 'h1 { color: green }',
  stylesheets: ['index.css'],
  ignoreSheets: [/fonts.googleapis/],
  timeout: 1000,
  htmlroot: 'public',
  report: false
  // uncssrc: '.uncssrc'
};

uncss(files, options, function (error, output) {
  if (error) console.log(error);

  fs.writeFile("reduced.css", output, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});