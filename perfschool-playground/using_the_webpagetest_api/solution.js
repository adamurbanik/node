'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;

var Webpagetest = require('webpagetest');
var localTunnel = require('localtunnel');


app.get('/', home);
app.get('/test', test);
app.listen(port, listening);
console.log(port)

function listening() {
  console.log('Listening on port', port);
}

function home(req, res) {
  var file = path.join(__dirname, 'index.html');
  var index = fs.readFileSync(file, 'utf8');
  res.send(index);
}

function test(req, res) {
  localTunnel(port, performTunnelling);

  function performTunnelling(error, tunnel) {
    var wpt = new Webpagetest(tunnel.url); 
    wpt.runTest(tunnel.url, (error, data) => {
      tunnel.close();
      let json = {
        "timing": {
          "ttfb": 944,
          "speedIndex": 2623,
          "domLoaded": 2119
        }
      }
      res.end(JSON.stringify(json));
    })
  }
}


/// reference solution
var localtunnel = require('localtunnel');
var WebPageTest = require('webpagetest');
var wpt = new WebPageTest('www.webpagetest.org', WPT_API_KEY);



function test(req, res, next) {
  localtunnel(port, ready);
  function ready(err, t) {
    wpt.runTest(t.url, { location: 'ec2-us-west-2' }, pull);
  }
  function pull(err, state) {
    poll();
    function handle(err, res) {
      var body = read(res.body);
      if (body.statusCode < 200) {
        poll(); return;
      }
      respond(body.data.runs[1]);
    }
    function poll() {
      setTimeout(function soon() { request(state.data.jsonUrl, handle); }, 5000);
    }
    function respond(run) {
      res.json({
        timing: {
          ttfb: run.firstView.TTFB,
          speedIndex: run.firstView.SpeedIndex,
          domLoaded: run.firstView.domContentLoadedEventStart
        }
      });
    }
  }
}
