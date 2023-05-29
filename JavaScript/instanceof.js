/**
 * 主要的思路就是 比对 instance.__proto__ 是否是 === Func.prototype
 */

function myInstanceOf(instance, Func) {
  let proto = instance.__proto__;
  let prototype = Func.prototype;
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
}

// instanceof 判断数据类型

const instanceofFn = (target, contructor) => {
  return myInstanceOf(target, contructor);
};

let str = '123';
console.log(instanceofFn(str, String)); // false

let str1 = new String('123');
console.log(instanceofFn(str1, String)); // true

let num = 123;
console.log(instanceofFn(num, Number)); // false

let num1 = new Number(123);
console.log(instanceofFn(num1, Number)); // true

let boo = true;
console.log(instanceofFn(boo, Boolean)); // false

let boo1 = new Boolean(true);
console.log(instanceofFn(boo1, Boolean)); // true

let symbol = Symbol();
console.log(instanceofFn(symbol, Symbol)); // false

// let symbol1 = new Symbol();
// console.log(instanceofFn(symbol1, Symbol));

let val;
console.log('undefined'); // undefined

let emptyOb = null;
console.log('null'); // object

let obj = {};
console.log(instanceofFn(obj, Object)); // true

let arr = [];
console.log(instanceofFn(arr, Array)); // true

let reg = new RegExp('str');
console.log(instanceofFn(reg, RegExp)); // true

let fun = new Function();
console.log(instanceofFn(fun, Function)); // true

let date = new Date();
console.log(instanceofFn(date, Date)); // true

let bigInt = 9007199254740991n;
console.log(instanceofFn(bigInt, BigInt)); // false
