var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(fs.createWriteStream('post.txt'));
  }
  res.end(req);
});
server.listen(process.argv[2]);
