***************** Currying in JavaScript *****
'use strict'

1 
var identity = function (args) {
  return args;
};
module.exports = identity;


2 
var binary = function (firstArg, secondArg) {
  return firstArg + secondArg ;
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

var caller = function (object, method, param1, param2, param3) {
  method.call(object, param1, param2, param3);
};

// caller(person, update, 'Sharma', 29, 'XL');

// console.log(person) // => person.name = Sharma, person.age = 29 and person.tShirtSize = XL

var callAndApply = {
  caller: function (object, method, param1, param2, param3) { //console.log(object, method, param1, param2, param3)
    update.call(object, param1, param2, param3);
  },
  applier: function (object, method, argumentsArr) {
    update.apply(object, argumentsArr);
  }
};
module.exports = callAndApply;


6



