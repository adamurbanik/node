// server side
var http = require('http');
var fs = require('fs');
var zlib = require('zlib');

var server = http.createServer(function (req, res) {
  var filename = req.headers.filename;
  console.log('File request received: ' + filename);
  req
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filename))
    .on('finish', function () {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end('That\'s it\n');
      console.log('File saved: ' + filename);
    });
});
server.listen(3000, function () {
  console.log('Listening');
});


//client side
var fs = require('fs'),
  zlib = require('zlib'),
  http = require('http'),
  path = require('path'),
  file = process.argv[2],
  server = process.argv[3];

var options = {
  hostname: server,
  port: 3000,
  path: '/',
  method: 'PUT',
  headers: {
    filename: path.basename(file),
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip'
  }
};

var req = http.request(options, function (res) {
  console.log('Server response: ' + res.statusCode);
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(req)
  .on('finish', function () {
    console.log('File successfully sent');
  });