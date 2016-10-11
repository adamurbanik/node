// *********************STREAM ADVENTURE *****
'use strict';

//1
// console.log('beep boop');


//2
// var fs = require('fs');

// let param = process.argv[2];

// fs.createReadStream(param)
//   .pipe(process.stdout);


//3
// let data = process.stdin
//   .pipe(process.stdout);


//4
// var through = require('through2');
// var stream = through(write, end);


// function write(buffer, encoding, next) {
//   let data = buffer.toString().toUpperCase();
//   this.push(data);
//   next();
// }

// function end(done) {
//   done();
// }

// process.stdin.pipe(stream).pipe(process.stdout);


//5
// console.log(process.stdin)

var split = require('split');
var through2 = require('through2');

process.stdin
  // .pipe(split())
  .pipe(through2(function (line, _, next) {
    console.dir(line.toString());
    next();
  }))
  ;
