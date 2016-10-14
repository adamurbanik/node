*********************STREAM ADVENTURE *****
'use strict';

1
console.log('beep boop');


2
var fs = require('fs');

let param = process.argv[2];

fs.createReadStream(param)
  .pipe(process.stdout);


3
let data = process.stdin
  .pipe(process.stdout);


4
var through = require('through2');
var stream = through(write, end);


function write(buffer, encoding, next) {
  let data = buffer.toString().toUpperCase();
  this.push(data);
  next();
}

function end(done) {
  done();
}

process.stdin.pipe(stream).pipe(process.stdout);


5
var split = require('split');
var through = require('through2');

var count = 1;

function write(buffer, encoding, next) {
  let line = (count % 2 === 0) ? buffer.toString().toUpperCase() + '\n' : buffer.toString().toLowerCase() + '\n';
  this.push(line);
  count ++ ;
  next();
}

function end(done) {
  done();
}

let stream = through(write);

process.stdin
  .pipe(split())
  .pipe(stream)
  .pipe(process.stdout);


6
var concat = require('concat-stream');

function concatText(text) {
  text = text.toString().split('').reverse().join('');
  console.log(text);
}

process.stdin
  .pipe(concat(concatText));


7
let http = require('http');
let through = require('through2');

function listener(req, res) {
  console.log(req.url)
  if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => data += chunk.toString().toUpperCase());
    req.on('end', () => res.end(data));
  }
}

let server = http.createServer(listener);
server.listen(process.argv[2]);

**** curl -XPOST http://localhost:3000 -d 'a=poszly konie' -d 'b=po betonie'

or the reference solution
var http = require('http');
var through = require('through2');

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(through(function (buf, _, next) {
      this.push(buf.toString().toUpperCase());
      next();
    })).pipe(res);
  }
  else res.end('send me a POST\n');
});
server.listen(parseInt(process.argv[2]));


8
var request = require('request');
var r = request.post('http://localhost:8099');
process.stdin.pipe(r).pipe(process.stdout);


9
var ws = require('websocket-stream');
var stream = ws('ws://localhost:8099');
stream.end('hello\n');


10
let trumpet = require('trumpet');
let through = require('through2');

let convertedStream = through(convert);

let tr = trumpet();

function convert(buffer, encoding, next) {
  let data = buffer.toString().toUpperCase();
  this.push(data);
  next();
}

process.stdin.pipe(tr).pipe(process.stdout);
let trStream = tr.select('.loud').createStream();
trStream.pipe(convertedStream).pipe(trStream);


11
'use strict';

var spawn = require('child_process').spawn;
var duplexer = require('duplexer2');

module.exports = function (cmd, args) {
  let proc = spawn(cmd, args);
  return duplexer(proc.stdin, proc.stdout);
};


12
var duplexer = require('duplexer2');
var through = require('through2').obj;

module.exports = function (counter) {
  var counts = {};
  var count = 1;
  var stream = through(write, end);

  return duplexer({ objectMode: true }, stream, counter);

  function write(obj, _, next) { 
    counts[obj.country] = (counts[obj.country] == null)? 1 : counts[obj.country] + 1;
    next();
  }

  function end(done) {
    counter.setCounts(counts);
    done();
  }

};

solution
var duplexer = require('duplexer2');
var through = require('through2').obj;

module.exports = function (counter) {
  var counts = {};
  var input = through(write, end);
  return duplexer({ objectMode: true }, input, counter);

  function write(row, _, next) {
    counts[row.country] = (counts[row.country] || 0) + 1;
    next();
  }
  function end(done) {
    counter.setCounts(counts);
    done();
  }
};


13
var combine = require('stream-combiner')
var through = require('through2');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
  var genres = through(write, end);

  var library = [];
  var line;

  function write(buffer, _, next) {
    if (buffer.length === 0) return next();

    var obj = JSON.parse(buffer.toString());

    if (obj.type === 'genre') {
      if (line != null) this.push(JSON.stringify(line) + '\n');
      line = { name: obj.name, books: [] };
    }

    if (obj.type === 'book') line.books.push(obj.name)
    next();
  }

  function end(done) { 
    done();
  }

  return combine(genres, zlib.createGzip())
}

ok 1 solution exports a function
not ok 2 should be equivalent
  ---
    operator: deepEqual
    expected:
      [ { books: [ 'Bring the Jubilee', 'The Man in the High Castle' ], name: 'alternate history' }, { books: [ 'Alas, Babylon', 'Earth Abides', 'Riddley Walker' ], name: 'apocalypse' }, { books: [ 'Accelerando', 'Heavy Weather', 'Neuromancer', 'Snow Crash', 'The Diamond Age' ], name: 'cyberpunk' }, { books: [ 'Bug Jack Barron', 'Dangerous Visions', 'The Heat Death of the Universe' ], name: 'new wave' }, { books: [ 'A Deepness in the Sky', 'Skylark', 'Void' ], name: 'space opera' }, { books: [ 'A Connecticut Yankee in King Arthur\'s Court', 'The Time Machine' ], name: 'time travel' } ]
    actual:
      [ { books: [ 'Bring the Jubilee', 'The Man in the High Castle' ], name: 'alternate history' }, { books: [ 'Alas, Babylon', 'Earth Abides', 'Riddley Walker' ], name: 'apocalypse' }, { books: [ 'Accelerando', 'Heavy Weather', 'Neuromancer', 'Snow Crash', 'The Diamond Age' ], name: 'cyberpunk' }, { books: [ 'Bug Jack Barron', 'Dangerous Visions', 'The Heat Death of the Universe' ], name: 'new wave' }, { books: [ 'A Connecticut Yankee in King Arthur\'s Court', 'The Time Machine' ], name: 'time travel' } ]
    at: ConcatStream.<anonymous> (/usr/lib/node_modules/stream-adventure/node_modules/concat-stream/index.js:36:43)


14
var crypto = require('crypto');

var stream = crypto.createDecipher('aes256', process.argv[2]);
process.stdin.pipe(stream).pipe(process.stdout);

15
'use strict'
var crypto = require('crypto');
var zlib = require('zlib');
var parseFile = require('tar').Parse();
var through = require('through2');

var stream = through(write);

function write(buffer, _, next) {
  // console.log(buffer.toString() + ' ' + );
  next();
}

parseFile.on('entry', (item) => {
  if (item.type === 'File') {

    var hash = crypto.createHash('md5', { encoding: 'hex' });
    item.pipe(hash).pipe(through(function write(buffer, _, next) {
      var line = buffer.toString() + ' ' + item.path;
      console.log(line)
      this.push(line);
      next();
    }));
  }
})

process.stdin
  .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
  .pipe(zlib.createGunzip())
  .pipe(parseFile)
  // .pipe(process.stdout);




