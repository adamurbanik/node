// ******* tower-of-babel ****** //
'use strict';

//1
// console.log(`Hello ${process.argv[2]}`);

//2
// class Character {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.health_ = 100;
//   }

//   damage() {
//     this.health_ = this.health_ - 10;
//   }

//   getHealth() {
//     return this.health_;
//   }

//   toString() {
//     return "x: " + this.x + " y: " + this.y + " health: " + this.getHealth();
//   }
// }

// var x = process.argv[2];
// var y = process.argv[3];
// var character = new Character(+x, +y);
// character.damage();
// console.log(character.toString());


//3
// class Character {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.health_ = 100;
//   }

//   damage() {
//     this.health_ = this.health_ - 10;
//   }

//   getHealth() {
//     return this.health_;
//   }

//   toString() {
//     return "x: " + this.x + " y: " + this.y + " health: " + this.getHealth();
//   }
// }

// class Player extends Character{
//   constructor(x, y, name) {
//     super(x, y);
//     this.name = name;
//   }

//   move(dx, dy) {
//     this.x += dx;
//     this.y += dy;
//   };

//   toString() {
//     return "name: " + this.name + " " + super.toString();
//   };

// }

// var x = process.argv[2];
// var y = process.argv[3];
// var name = process.argv[4];
// var character = new Character(+x, +y);
// character.damage();
// console.log(character.toString());
// var player = new Player(+x, +y, name);
// player.damage();
// player.move(7, 8);
// console.log(player.toString());


//4
// import * as PI from './math.js';

// import {PI} from './math.js';
// import {_sqrt} from './math.js';
// import {sqrt} from './math.js';
// import {square} from './math.js';
// console.log(PI);
// console.log(_sqrt);
// console.log(sqrt);
// console.log(square);

// var arg1 = process.argv[2];
// var arg2 = process.argv[3];

// console.log(PI);
// console.log(sqrt(+arg1));
// console.log(square(+arg2));


//5

//6
// This variable `a` should be accessible outside of the block scope.
// var a = 5;

// // This variable `b` should not be reassignable.
// const b = process.argv[2];

// if (a === 5) {
//   // This variable `c` should only be valid in this block.
//   let  c = 4;
//   console.log(c);  // 4

//   // This variable `b` should only be valid in this block and should not be reassignable.
//   const b = 8;
//   console.log(b); // 8
// }

// console.log(a); // 5
// console.log(b);
// try {
//   // Trying to change the value of `c`
//   c = 1000;
// } catch (e) {
//   // but an `c is not defined` error should occur.
//   console.log(e);
// }


//7
// var evenOrOdd = +process.argv[2];
// var evenOrOddKey = evenOrOdd % 2 === 0 ? "even" : "odd";
// var sum = +process.argv[3] + evenOrOdd;
// var obj = {
//   [evenOrOddKey]: evenOrOdd,
//   [sum]: sum
// }
// console.log(obj);


//8
const max = process.argv[2]; //console.log('max', max)
let FizzBuzz = {
  [Symbol.iterator]() {
    let count = 1, result = '';
    return {
      next() {
        if (count > max) return { done: true }
        result = '';
        if (count % 3 === 0) result += 'Fizz';
        if (count % 5 === 0) result += 'Buzz';
        if (result === '') result = count;
        count++;
        return { done: false, value: result }
      }
    }
  }
}

for (var n of FizzBuzz) {
  console.log(n);
}

