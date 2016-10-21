***************** Currying in JavaScript *****
  'use strict'

1
var identity = function (args) {
  return args;
};
module.exports = identity;


2
var binary = function (firstArg, secondArg) {
  return firstArg + secondArg;
};
module.exports = binary;


3
const unary1 = (unary1Param) => (unary2Param) => unary1Param + unary2Param

module.exports = unary1;


console.log(unary1(2)(4))


4
let total = 0;
let unary = (param) => {
  if (!param) return total;
  total += param;
  return unary;
}

module.exports = unary;


5
var update = function (name, age, tShirtSize) {
  this.name = name; //console.log(this.name)
  this.age = age;
  this.tShirtSize = tShirtSize;

  console.log(this.name, this.age, this.tShirtSize)
};

var person = { name: 'Kishor', age: 28, tShirtSize: 'L' };

var caller = (object, method, param1, param2, param3) => method.call(object, param1, param2, param3);

caller(person, update, 'Sharma', 29, 'XL');

// console.log(person) // => person.name = Sharma, person.age = 29 and person.tShirtSize = XL

var callAndApply = {
  caller: (object, method, param1, param2, param3) => method.call(object, param1, param2, param3),
  applier: (object, method, argumentsArr) => method.apply(object, argumentsArr)
};
module.exports = callAndApply;

callAndApply.caller(person, update, 'Sharma', 29, 'XL');
callAndApply.applier(person, update, ['Sharma', 29, 'XL'])

// 6
function curry(fx) {
  var arity = fx.length;

  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= arity) {
      return fx.apply(null, args);
    }
    else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      }
    }
  };
}

module.exports = curry;

var sumFour = curry(function (w, x, y) {
  var args = Array.prototype.slice.call(arguments, 0);
  var total = 0;
  args.forEach((item) => total += item)
  return total;
});

console.log(sumFour(10)(10)(10));


