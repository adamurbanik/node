// Implementing a process pool
var fork = require('child_process').fork;

function ProcessPool(file, poolMax) {
  this.file = file;
  this.poolMax = poolMax;
  this.pool = [];
  this.active = [];
  this.waiting = [];
}
module.exports = ProcessPool;

ProcessPool.prototype.acquire = function (callback) {
  var worker;
  if (this.pool.length > 0) {
    //[1]
    worker = this.pool.pop();
    this.active.push(worker);
    return process.nextTick(callback.bind(null, null, worker));
  }
  if (this.active.length >= this.poolMax) {
    return this.waiting.push(callback);
  }
  //[2]
  worker = fork(this.file);
  //[3]
  this.active.push(worker);
  process.nextTick(callback.bind(null, null, worker));
}

// return process back in the pool
ProcessPool.prototype.release = function (worker) {
  if (this.waiting.length > 0) {
    //[1]
    var waitingCallback = this.waiting.shift();
    waitingCallback(null, worker);
  }
  this.active = this.active.filter(function (w) {
    return worker !== w;
  });
  this.pool.push(worker);
}

// Communicating with a child process
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var ProcessPool = require('./processPool');
var workers = new ProcessPool(__dirname + '/subsetSumWorker.js', 2);

function SubsetSumFork(sum, set) {
  EventEmitter.call(this);
  this.sum = sum;
  this.set = set;
}

inherits(SubsetSumFork, EventEmitter);
module.exports = SubsetSumFork;
SubsetSumFork.prototype.start = function () {
  workers.acquire(function (worker) {
    //[1]
    worker.send({ sum: this.sum, set: this.set });
    var onMessage = function (msg) {
      if (msg.event === 'end') {
        //[3]
        worker.removeListener('message', onMessage);
        workers.release(worker);
      }
      this.emit(msg.event, msg.data);
    }.bind(this);
    worker.on('message', onMessage);
  }.bind(this));
  //[4]
  //[2]
}


// Communicating with the parent process
var SubsetSum = require('./subsetSum');
process.on('message', function (msg) {
  //[1]
  var subsetSum = new SubsetSum(msg.sum, msg.set);
  subsetSum.on('match', function (data) {
    //[2]
    process.send({ event: 'match', data: data });
  });
  subsetSum.on('end', function (data) {
    process.send({ event: 'end', data: data });
  });
  subsetSum.start();
});