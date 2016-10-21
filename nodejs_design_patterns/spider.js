var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('/home/jaalinoe/code/node/nodejs_design_patterns/node_modules/utilities');
var path = require('path');

function spider(url, callback) {
  var filename = path.basename(url);
  // var filename = utilities.urlToFilename(url);
  fs.exists(filename, function (exists) {
    //[1]
    if (!exists) {
      console.log("Downloading " + url);
      request(url, function (err, response, body) {
        //[2]
        response.on('data', (chunk) => console.log(chunk));

        if (err) {
          callback(err);
        } else {
          mkdirp(path.dirname(filename), function (err) {
            //[3]
            if (err) {
              callback(err);
            } else {
              // fs.writeFile(filename, body, function (err) { //[4]
              //   if (err) {
              //     callback(err);
              //   } else {
              //     callback(null, filename, true);
              //   }
              // });
            }
          });
        }
      });
    } else {
      callback(null, filename, false);
    }
  });
}

spider(process.argv[2], function (err, filename, downloaded) {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log('Completed the download of "' + filename + '"');
  } else {
    console.log('"' + filename + '" was already downloaded');
  }
});


// zajebisty przyklad na iteracje kolekcji rekursywnie i wolajac callback na samym koncu 
function iterate(index) {
  if (index === tasks.length)
    return finish();
}
var task = tasks[index];
task(function () {
  iterate(index + 1);
});
function finish() {
  //iteration completed
}
iterate(0);

// generalizacja
iterateSeries(collection, iteratorCallback, finalCallback)

// wrzuc callbacka do listy i zwroc returna
return process.nextTick(callback);


var tasks = [...];
var concurrency = 2, running = 0, completed = 0, index = 0;
function next() {
  //[1]
  while (running < concurrency && index < tasks.length) {
    task = tasks[index++];
    task(function () {
      //[2]
      if (completed === tasks.length) {
        return finish();
      }
      completed++ , running--;
      next();
    });
    running++;
  }
}
next();
function finish() {


'use strict'
let count = 0;

function iterate(collection, cb) {
  collection.forEach((item) => cb(item))

  if (count === collection.length) finalcb();
}

function cb(item) {
  console.log(item);
  count++;
}

function finalcb() {
  console.log('jetsem kurde ostatni!');
}

iterate(['1', '2', '3', '4', '5', '5'], cb);

sekwencyjne uruchomienie promisow, taks jeden po drugim
var tasks = [...]
var promise = Promise.resolve();
tasks.forEach(function (task) {
  promise = promise.then(function () {
    return task();
  });
});

function* twoWayGenerator() {
  var what = yield null;
  console.log('Hello ' + what);
}


var twoWay = twoWayGenerator();
twoWay.next();
// twoWay.next('world');
