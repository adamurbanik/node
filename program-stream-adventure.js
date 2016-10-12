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
// var split = require('split');
// var through = require('through2');

// var count = 1;

// function write(buffer, encoding, next) {
//   let line = (count % 2 === 0) ? buffer.toString().toUpperCase() + '\n' : buffer.toString().toLowerCase() + '\n';
//   this.push(line);
//   count ++ ;
//   next();
// }

// function end(done) {
//   done();
// }

// let stream = through(write);

// process.stdin
//   .pipe(split())
//   .pipe(stream)
//   .pipe(process.stdout);


//6
// var concat = require('concat-stream');

// function concatText(text) {
//   text = text.toString().split('').reverse().join('');
//   console.log(text);
// }

// process.stdin
//   .pipe(concat(concatText));


//7
// let http = require('http');
// let through = require('through2');

// function listener(req, res) {
//   console.log(req.url)
//   if (req.method === 'POST') {
//     let data = '';
//     req.on('data', (chunk) => data += chunk.toString().toUpperCase());
//     req.on('end', () => res.end(data));
//   }
// }

// let server = http.createServer(listener);
// server.listen(process.argv[2]);

// **** curl -XPOST http://localhost:3000 -d 'a=poszly konie' -d 'b=po betonie'

// or the reference solution
// var http = require('http');
// var through = require('through2');

// var server = http.createServer(function (req, res) {
//   if (req.method === 'POST') {
//     req.pipe(through(function (buf, _, next) {
//       this.push(buf.toString().toUpperCase());
//       next();
//     })).pipe(res);
//   }
//   else res.end('send me a POST\n');
// });
// server.listen(parseInt(process.argv[2]));


//8
// var request = require('request');
// var r = request.post('http://localhost:8099');
// process.stdin.pipe(r).pipe(process.stdout);


//9
// var ws = require('websocket-stream');
// var stream = ws('ws://localhost:8099');
// stream.end('hello\n');


//10
// let trumpet = require('trumpet');
// let through = require('through2');

// let convertedStream = through(convert);

// let tr = trumpet();

// function convert(buffer, encoding, next) {
//   let data = buffer.toString().toUpperCase();
//   this.push(data);
//   next();
// }

// process.stdin.pipe(tr).pipe(process.stdout);
// let trStream = tr.select('.loud').createStream();
// trStream.pipe(convertedStream).pipe(trStream);


//11
var spawn = require('child_process').spawn;
var duplexer = require('duplexer2');

module.exports = function (cmd, args) {
  let proc = spawn(cmd, args);
  return duplexer(proc.stdin, proc.stdout);
};


//12
var duplexer = require('duplexer2');

module.exports = function (counter) { //console.log(counter)

    return duplexer(counter)
  // return a duplex stream to count countries on the writable side
  // and pass through `counter` on the readable side
};


