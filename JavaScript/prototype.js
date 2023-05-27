// Object.getPrototypeof(object) 返回 object 的原型对象 (prototype)
const getObjectPrototype = (object) => {
  if (
    (typeof object === 'object' && object !== null) ||
    typeof object === 'function'
  ) {
    return Object.getPrototypeOf(object);
  }
  const type = object === null ? 'null' : typeof object;
  return `getObjectPrototype receive an object, but receive a ${type}`;
};

let str = '123';
console.log(getObjectPrototype(str)); // getObjectPrototype receive an object, but receive a string

let num = 123;
console.log(getObjectPrototype(num)); // getObjectPrototype receive an object, but receive a number

let boo = true;
console.log(getObjectPrototype(boo)); // getObjectPrototype receive an object, but receive a boolean

let symbol = Symbol();
console.log(getObjectPrototype(symbol)); // getObjectPrototype receive an object, but receive a symbol

let val;
console.log(getObjectPrototype(val)); // getObjectPrototype receive an object, but receive a undefined

let emptyOb = null;
console.log(getObjectPrototype(emptyOb)); // getObjectPrototype receive an object, but receive a null

let obj = {};
console.log(getObjectPrototype(obj)); // Object 的原型对象(prototype)

let arr = [];
console.log(getObjectPrototype(arr)); // Array 的原型对象

let reg = new RegExp('str');
console.log(getObjectPrototype(reg)); // RegExp 的原型对象

let fun = new Function();
console.log(getObjectPrototype(fun)); // ƒ () { [native code] }

let date = new Date();
console.log(getObjectPrototype(date)); // Date 的原型对象

let bigInt = 9007199254740991n;
console.log(getObjectPrototype(bigInt)); // getObjectPrototype receive an object, but receive a bigint

// Object.hasOwn(object, prop) 如果 prop 是 object 的自有属性 返回true
// Object.prototype.hasOwnProperty(prop) 如果 prop 是 object 自有属性 返回 true
// in 运算符 会查询到原型链

// Object.prototype.isPrototypeof(object) 方法用于测试一个对象是否存在于另一个对象的原型链上, 与instanceof 不同的是 该方法会检查 本身
// Object.setPrototypeOf(obj, prototype) 设置一个指定的对象的原型
