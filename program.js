// *********** ASYNC YOU ********* 
'use strict'

// 1
// var http = require('http');
// var fs = require('fs');
// var fileContent = fs.readFileSync(process.argv[2]).toString();

// http.get(fileContent, function (res) {
//   res.on('data', function (data) {
//     console.log(data.toString());
//   })
// })

// or
// var fs = require('fs')
//   , http = require('http')
//   , async = require('async');

// async.waterfall([
//   function (done) {
//     fs.readFile(process.argv[2], function (err, data) {
//       if (err) return done(err);
//       done(null, data, 'result2')
//     });
//   },

//   function (data, data2, done) { 
//     var body = '';
//     http.get(data.toString().trimRight(), function (res) {
//       res.on('data', function (chunk) {
//         body += chunk.toString();
//       });

//       res.on('end', function (chunk) {
//         done(null, body);
//       });
//     }).on('error', function (e) {
//       done(e);
//     });
//   }
// ],
// function (err, result) {
//   if (err) return console.error(err);
//   console.log(result);
// }
// );



//2
// let http = require('http'),
//   async = require('async');


// let url1 = process.argv[2];
// let url2 = process.argv[3];

// async.series({
//   requestOne: (done) => {
//     let body = '';
//     http.get(url1, function (res) {
//       res.on('data', (data) => body += data);
//       res.on('end', (data) => {
//         done(null, body);
//       });
//     })
//       .on('error', (e) => done(e));
//   },
//   requestTwo: (done) => {
//     let body = '';    
//     http.get(url2, function (res) { 
//       res.on('data', (data) => body += data);
//       res.on('end', (data) => {
//         done(null, body);
//       });
//     })
//       .on('error', (e) => done(e));
//   },
// }, (err, results) => console.log(results));


//3
// let http = require('http'),
//   async = require('async');

// async.each([process.argv[2], process.argv[3]], function(item, done) {
//   http.get(item, function(res) {
//     res.on('data', (data) => body+= data);
//     res.on('end', (data) => {
//       done(null, body)
//     })
//   })
//   .on('error', (e) => done(e));
// }, (err, results)=> {
//   if (err) console.log(err);
//   if (results) console.log(results);
// })

//4
// let http = require('http'),
//   async = require('async');

// async.map(process.argv.slice(2), function(item, done) {
//   let body = '';
//   http.get(item, function(res) {
//     res.on('data', (data) => body+= data);
//     res.on('end', (data) => {
//       done(null, body)
//     })
//   })
//   .on('error', (e) => done(e));
// }, (err, results)=> {
//   if (err) console.log(err);
//   if (results) console.log(results);
// })


//5
let http = require('http');

let hostName = process.argv[2];
let port = process.argv[3];

console.log(hostName);

var opts = {
  host: hostName + /users/create,
  path: '/post',
  method: 'POST'
}
var body = '';
var req = http.request(opts, function(res) {
  
})


http.post(hostName + '/users/create', function() {

})
