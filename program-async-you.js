// *********** ASYNC YOU ********* 
'use strict'

// 1
var http = require('http');
var fs = require('fs');
var fileContent = fs.readFileSync(process.argv[2]).toString();

http.get(fileContent, function (res) {
  res.on('data', function (data) {
    console.log(data.toString());
  })
})

// or
var fs = require('fs')
  , http = require('http')
  , async = require('async');

async.waterfall([
  function (done) {
    fs.readFile(process.argv[2], function (err, data) {
      if (err) return done(err);
      done(null, data, 'result2')
    });
  },

  function (data, data2, done) { 
    var body = '';
    http.get(data.toString().trimRight(), function (res) {
      res.on('data', function (chunk) {
        body += chunk.toString();
      });

      res.on('end', function (chunk) {
        done(null, body);
      });
    }).on('error', function (e) {
      done(e);
    });
  }
],
function (err, result) {
  if (err) return console.error(err);
  console.log(result);
}
);



//2
let http = require('http'),
  async = require('async');


let url1 = process.argv[2];
let url2 = process.argv[3];

async.series({
  requestOne: (done) => {
    let body = '';
    http.get(url1, function (res) {
      res.on('data', (data) => body += data);
      res.on('end', (data) => {
        done(null, body);
      });
    })
      .on('error', (e) => done(e));
  },
  requestTwo: (done) => {
    let body = '';    
    http.get(url2, function (res) { 
      res.on('data', (data) => body += data);
      res.on('end', (data) => {
        done(null, body);
      });
    })
      .on('error', (e) => done(e));
  },
}, (err, results) => console.log(results));


//3
let http = require('http'),
  async = require('async');

async.each([process.argv[2], process.argv[3]], function(item, done) {
  http.get(item, function(res) {
    res.on('data', (data) => body+= data);
    res.on('end', (data) => {
      done(null, body)
    })
  })
  .on('error', (e) => done(e));
}, (err, results)=> {
  if (err) console.log(err);
  if (results) console.log(results);
})

//4
let http = require('http'),
  async = require('async');

async.map(process.argv.slice(2), function(item, done) {
  let body = '';
  http.get(item, function(res) {
    res.on('data', (data) => body+= data);
    res.on('end', (data) => {
      done(null, body)
    })
  })
  .on('error', (e) => done(e));
}, (err, results)=> {
  if (err) console.log(err);
  if (results) console.log(results);
})


//5
let http = require('http');
let async = require('async');

let hostName = process.argv[2];
let port = process.argv[3];

async.series({

  firstPost: (done) => {
    function postUser(user_id, callback) {
      let obj = JSON.stringify({ "user_id": user_id });

      let body = '';
      var opts = {
        host: hostName,
        port: port,
        path: '/users/create',
        method: 'POST'
      }
      var request = http.request(opts, function (response) {
        response.on('data', function (chunk) {
          body += chunk;
        });
        response.on('end', function (chunk) {
          callback();
        });
      });

      request.on('error', callback);
      request.write(obj);
      request.end();
    }

    async.times(5, function (n, next) {
      postUser(++n, function (result) { //console.log(result)
        next(result);
      })
    }, function (err, result) { //console.log(result)
      if (err) return done(err);
      done(null);
    })
  },

  secondGet: (done) => {
    let url = 'http://' + hostName + ':' + port + '/users';
    http.get(url, function (response) {
      let body = '';
      response.on('data', (data) => body += data.toString());
      response.on('end', (data) => done(null, body));
    }).on('error', done);
  }


}, (err, results) => {
  if (err) { console.log(err); return };
  console.log(results);
});

// output
//  "{ firstPost: undefined,"           !=    "{\"users\":[{\"user_id\":1},{\"user_id\":2},{\"user_id\":3},{\"user_id\":4},{\"user_id\":5}]}"
//  "  secondGet: '{\"users\":[{\"user_id\":1},{\"user_id\":2},{\"user_id\":3},{\"user_id\":4},{\"user_id\":5}]}' }" !=    ""                                 
//  ""                                  !=             


//6
var http = require('http');
var async = require('async');

let param = process.argv[2];

// console.log(url);

async.reduce(['one', 'two', 'three'], 0, function (memo, item, callback) {
  let url = `${param}?number=${item}`;
  http.get(url, function (res) {
    let body = '';
    res.on('data', function (data) {
      body += data.toString();
    })
    res.on('end', function () { 
      let result = memo + parseInt(body, 10);
      callback(null, result);
    })
  })

}, function (error, result) {
  console.log(result);
});


//7
var http = require('http');
var async = require('async');

let param = process.argv[2];

var count = 0;
let data = '';

async.whilst(
  function () { return data.trim() !== 'meerkat'},
  function (callback) {
    let body = '';
    http.get(param, function (response) {
      response.on('data', function (chunk) {
        body += chunk.toString();
      });
      response.on('end', function () {
        data = body;
        count++;
        callback();
      })
    })

  },
  function (err, n) {
    console.log(count);
  }
);