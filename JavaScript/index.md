### javascript 数据类型

String, Number, Boolean, undefiend, null, Symbol, bigint

Object, Array, Date, Function

#### typeof 运算符

```ts
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
```

由例子可以得出结论, 对于基本的数据类型, `除了null 以外都能准确的判断类型`
对于复杂类型 `除了 Function 可以准确的判断, 别的都不行`

##### 为什么 `typeof null === "object"`

[具体的文章](https://2ality.com/2013/10/typeof-null.html)

在 `javascript` 中, 我们使用 32 位二级制的来存储值, 其中 前面的 `1 - 3` 位 是用来存储数据类型的,

000: 代表着 Object
001: 代表着 31 bit signed integer
010: 代表着 a double floating point number.
100: 代表着 string
110: 代表着 boolean

而 `null` 存储的 32 进制的 类型位 是 000, 这也就是 为啥 `typeof null === "object"` 的由来

- `typeof 不会在 一个变量没有被声明时抛出错误, 但是 但在加入了块级作用域的 let 和 const 之后, 在其被声明之前对块中的 let 和 const 变量使用 typeof 会抛出一个 ReferenceError。块作用域变量在块的头部处于“暂存死区”, 直至其被初始化, 在这期间, 访问变量将会引发错误`
- `typeof 操作符的优先级高于加法（+）等二进制操作符`

##### instanceof 运算符

`instanceof` 的原理 其实就是 检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上

```ts
// instanceof 判断数据类型

const instanceofFn = (target, contructor) => {
  return target instanceof contructor;
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
```

由例子可以推出, 基本数据类型 无法使用 `instanceof` 来判断类型
复杂数据类型 也都可以 判断出来, 但是因为 `instanceof` 是通过`原型链`来判断, 所以当我们修改原型链后, instanceof 也就可能存在 不准确的情况了

##### 讲述一下 javascript 原型 与 原型对象 与 原型链

什么是原型: 原型就是对象创建之初的模型, 它拥有同一类对象的共有属性和方法
什么是原型对象: js 中每个函数都有一个指向原型的属性 `prototype`, 这就是 `原型对象`
什么是原型链: js 中每个对象 都有一个指向原型对象的属性 `__proto__`, 通过 `__proto__`连接起来的一些列对象其实就是原型链

```ts
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
```

### null 和 undefined 区别

null

- 表示缺少, 指变量没有指向任何对象, 同时 `Object.prototype.__proto__ === null`
- 1 + Null === 1

undefined

- 表示变量声明但是没有赋值
- 调用函数时, 对应的参数没有提供, 也是 undefined
- 对象没有赋值, 这个属性的值为 undefined
- 函数没有返回值, 默认返回 undefined
- undefiend 是 window 的一个全局属性
- 1 + undefiend 是一个 NaN

### 事件流
