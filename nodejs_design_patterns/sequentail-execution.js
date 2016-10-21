var fromArray = require('from2-array');
var through = require('through2');
var fs = require('fs');


function concatFiles(destination, files, callback) {
  var destStream = fs.createWriteStream(destination);
  fromArray.obj(files)
    //[1]
    .pipe(through.obj(function (file, enc, done) {
      var src = fs.createReadStream(file);
      src.pipe(destStream, { end: false });
      src.on('end', function () {
        //[3]
        done();
      });
    }))
    //[2]Coding with Streams
    .on('finish', function () {
      destStream.end();
      callback();
    });
  //[4]
}
module.exports = concatFiles;


split - Transform stream that ensures outputting each line on a different chunk.
  thought - transform stream 


var fs = require('fs'),
  split = require('split'),
  request = require('request'),
  ParallelStream = require('./parallelStream');

fs.createReadStream(process.argv[2])
  //[1]
  .pipe(split())
  //[2]
  .pipe(new ParallelStream(function (url, enc, done) {
    //[3]
    if (!url) return done();
    var self = this;
    request.head(url, function (err, response) {
      self.push(url + ' is ' + (err ? 'down' : 'up') + '\n');
      done();
    });
  }))
  .pipe(fs.createWriteStream('results.txt'))
  //[4]
  .on('finish', function () {
    console.log('All urls were checked');
  });

  transform streams - where chunk is as object or buffer