// typeof 判断数据类型
let str = '123';
console.log(typeof str); // string

let num = 123;
console.log(typeof num); // number

let boo = true;
console.log(typeof boo); // boolean

let symbol = Symbol();
console.log(typeof symbol); // symbol

let val;
console.log(typeof val); // undefined

let emptyOb = null;
console.log(typeof emptyOb); // object

let obj = {};
console.log(typeof obj); // object

let arr = [];
console.log(typeof arr); // object

let reg = new RegExp('str');
console.log(typeof reg); // object

let fun = new Function();
console.log(typeof fun); // function

let date = new Date();
console.log(typeof date); // object

let bigInt = 9007199254740991n;
console.log(typeof bigInt); // bigint
