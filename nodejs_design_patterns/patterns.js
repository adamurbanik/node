// Factory pattern
function createPerson(name) {
  var privateProperties = {};
  var person = {
    setName: function (name) {
      if (!name) throw new Error('A person must have a name');
      privateProperties.name = name;
    },
    getName: function () {
      return privateProperties.name;
    }
  };
  person.setName(name);
  return person;
}

// Decorator
function decorate(component) {
  var proto = Object.getPrototypeOf(component);

  function Decorator(component) {
    this.component = component;
  }
  Decorator.prototype = Object.create(proto);
  //new method
  Decorator.prototype.greetings = function () {
    //...
  };
  //delegated method
  Decorator.prototype.hello = function () {
    this.component.hello.apply(this.component, arguments);
  };
  return new Decorator(component);
}

//or Decorator
function decorate(component) {
  //new method
  component.greetings = function () {
    //...
  };
  return component;
}

// or Decorator
var oldLogin = authService.login;

authService.login = function (username, password, callback) {
  oldLogin(username, password, function (err, token) {
    if (err) return callback(err);

    tokensDb.put(token, { username: username }, function () {
      callback(null, token);
    });
  });
}


// Dependency Injection of asynchronouse module
var db = require('aDb'); //The async module
var findAllFactory = require('./findAll');
db.on('connected', function () {
  var findAll = findAllFactory(db);
});

//in the module findAll.js
module.exports = function (db) {
  //db is guaranteed to be initialized
  return function findAll(type, callback) {
    db.findAll(type, callback);
  }
}

// module loading asynchronously
var asyncModule = module.exports;
asyncModule.initialized = false;

asyncModule.initialize = function (callback) {
  setTimeout(function () {
    asyncModule.initialized = true;
    callback();
  }, 10000);
}
asyncModule.tellMeSomething = function (callback) {
  process.nextTick(function () {
    if (!asyncModule.initialized) {
      return callback(
        new Error('I don\'t have anything to say right now')
      );
    }
    callback(null, 'Current time is: ' + new Date());
  })
}


// Batching requests in the total sales web server
var totalSales = require('./totalSales');
var queues = {};
module.exports = function totalSalesBatch(item, callback) {
  if (queues[item]) {
    console.log('Batching operation');
    return queues[item].push(callback);
  }
  queues[item] = [callback];
  totalSales(item, function (err, res) {
    var queue = queues[item];
    queues[item] = null;
    queue.forEach(function (cb) {
      cb(err, res);
    });
  });
}


// totalSales module
var level = require('level');
var sublevel = require('level-sublevel');
var db = sublevel(level('example-db', { valueEncoding: 'json' }));
var salesDb = db.sublevel('sales');

module.exports = function totalSales(item, callback) {
  var sum = 0;
  salesDb.createValueStream()
    //[1]
    .on('data', function (data) {
      if (!item || data.item === item) {
        //[2]
        sum += data.amount;
      }
    })
    .on('end', function () {
      callback(null, sum);
      //[3]
    });
}


