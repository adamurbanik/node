'use strict';

var serveStatic = require('serve-static');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;


app.use(serveStatic(__dirname));
app.listen(port, listening);

function listening () {
  console.log('Listening on port', port);
}

const Datauri = require('datauri');
let   datauri = new Datauri('/home/jaalinoe/code/node/perfschool-playground/inlining_images/fire.png');
console.log(datauri.content);
let   datauri2 = new Datauri('/home/jaalinoe/code/node/perfschool-playground/inlining_images/grin.png');
console.log(datauri2.content);
let   datauri3 = new Datauri('/home/jaalinoe/code/node/perfschool-playground/inlining_images/hot.png');
console.log(datauri3.content);
let   datauri4 = new Datauri('/home/jaalinoe/code/node/perfschool-playground/inlining_images/pirate.png');
console.log(datauri4.content);
let   datauri5 = new Datauri('/home/jaalinoe/code/node/perfschool-playground/inlining_images/plane.png');
console.log(datauri5.content);