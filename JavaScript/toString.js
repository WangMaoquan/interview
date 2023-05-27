const getType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

let str = '123';
console.log(getType(str)); // String

let num = 123;
console.log(getType(num)); // Number

let boo = true;
console.log(getType(boo)); // Boolean

let symbol = Symbol();
console.log(getType(symbol)); // Symbol

let val;
console.log(getType(undefined)); // Undefined

let emptyOb = null;
console.log(getType(emptyOb)); // Null

let obj = {};
console.log(getType(obj)); // Object

let arr = [];
console.log(getType(arr)); // Array

let reg = new RegExp('str');
console.log(getType(reg)); // RegExp

let fun = new Function();
console.log(getType(fun)); // Function

let date = new Date();
console.log(getType(date)); // Date

let bigInt = 9007199254740991n;
console.log(getType(bigInt)); // BigInt
