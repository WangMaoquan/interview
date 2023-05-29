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
- `typeof 操作符的优先级高于加法 (+) 等二进制操作符`

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

##### Object.prototype.toString

```ts
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
```

例子可以看出 完全可以 分辨

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

什么是事件流: 从页面中接收事件的顺序, 有以下三个阶段

- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

#### addeventListener

`addEventListener` 方法将指定的监听器注册到 EventTarget 上, 当该对象触发指定的事件时, 指定的回调函数就会被执行
`addEventListener` 事件目标可以是文档上的元素 Element、Document 和 Window 或者任何其他支持事件的对象(例如 XMLHttpRequest)

语法: target.addEventListener(type, listener, options/useCapture)

- type: 表示监听事件类型的字符串
- listener: 所监听的事件触发, 会接受一个事件通知方法
- options: 一个指定有关 listener 属性的可选参数对象。可选值有 capture (事件捕获阶段传播到这里触发) 、once (在 listener 添加之后最多值调用一次) 、passive (设置为 true 时表示 listener 永远不会调用 preventDefault())
- useCapture: 在 DOM 树中, 注册了 listener 的元素, 是否要先于它下面的 EventTarget 调用该 listener (先就是捕获, 后就是冒泡)

> addEventListener 的第三个参数涉及到冒泡和捕获, 为 true 时是捕获, 为 false 时是冒泡 {capture: true/false} / useCapture: true/ false 默认是冒泡

#### 阻止冒泡

```js
event.stopPropagation; // 方法阻止捕获和冒泡阶段中当前事件的进一步传播

// ie9
e.cancelBubble = true; // ie 下阻止冒泡
```

### this

对于函数而言, 指向最后调用函数的那个对象, 是函数运行时内部自动生成的一个内部对象, 只能在函数内部使用；对于全局而言, this 指向 window

### 模块规范化

没有模块化之前都有啥问题:

- 代码维护成本高, 一个 js 文件几千上万行代码
- 全局变量空间污染, 容易被篡改
- iife 虽然有着自己的作用域, iife 如果依赖别的, 我们还需要把别的 依赖的作为参数传进来, 这么做而且我们还需要明确 依赖顺序, 依赖过多, 渲染性能也是问题

有了模块化之后:

- 能够把我们的代码拆分成不同的功能模块独立成文件, 并且可以被其他模块引用
- 外部不能直接访问模块内的变量, 仅能通过模块暴露的方法或者变量访问
- 模块内的依赖对引用者来说是透明的
- 依赖简单好维护管理

然后就有了 `CommonJS`, `AMD`, `CMD`, `UMD`, `ES Modules`

#### CommonJS

- 导出: `module.exports = {}、exports.xxx = 'xxx'`
- 导入: `require(./index.js)`
- 查找方式: `查找当前目录是否具有文件, 没有则查找当前目录的 node_modules 文件. 再没有, 冒泡查询, 一直往系统中的 npm 目录查找`

**特点**

- 所有代码在模块作用域内运行, 不会污染其他文件
- require 得到的值是值的拷贝, 即你引用其他 JS 文件的变量, 修改操作了也不会影响其他文件
- 文件可以被重复引用、加载. 第一次加载时会被缓存, 之后再引用就直接读取缓存

**缺陷**

- 应用层面: 在 index.html 中做 var index = require('./index.js') 操作报错, 因为它最终是后台执行的, 只能是 index.js 引用 index2.js 这种方式
- 同步加载问题: CommonJS 规范中模块是同步加载的, 即在 index.js 中加载 index2.js, 如果 index2.js 卡住了, 那就要等很久

在每个模块内部有一个 module 对象, 代表当前模块, 通过它来导出当前模块里的 API, module 有几个属性:

- exports: 是对外的接口, 加载某个模块, 就是加载该模块的 module.exports 属性
- loaded: 返回一个布尔值, 表示该模块是否已完成加载
- parent: 返回一个对象, 表示调用该模块的模块
- children: 返回一个数组, 表示该模块被用到了其他模块的集合
- filename: 模块的文件名, 带有绝对路径
- id: 模块的标识符, 一般是带有绝对路径的模块文件名

#### AMD(Asynchronous Module Definiton)

和 `CommonJS` 一样都是模块化，只不过 `CommonJS` 规范加载模块是同步加载，只有加载完成，才能执行后面的操作，而 AMD 是异步加载模块，可以指定回调函数

为啥会出现 `AMD`:

因为 Node.js 运行在服务器上，所有的文件一般都存在本地硬盘里，不需要再去请求异步加载。可如果放在浏览器环境下，就需要去请求从服务器获取模块文件，这时如果再使用同步加载显然就不合适了，所以才有了完全贴合浏览器的 AMD 规范，该规范的实现就是 `require.js`

它的使用方法就是通过一个全局函数 `define`，把代码定义为模块，再用 `require` 方法加载模块

```js
/**
 * 第一个是模块名称，也可以不填，默认就是文件名
 * 第二个参数必须是一个数组，定义了该模块依赖的模块列表
 * 第三个参数是模块初始化要执行的函数或对象. 如果是函数，只会被执行一次，如果是对象，那这个对象应该作为模块的输出值
 */

define('myModule', ['require', 'exports', 'beta'], function (
  require,
  exports,
  beta,
) {
  exports.foo = function () {
    return beat.foo();
  };
});

// 导出
module.exports = { ... }

// 导入
const foo = require("./xxx")
```

`requirejs` 会在模块方法调用前就加载并执行了

#### CMD(Common Module Definition)

`CMD` 规范整合了上面说的 CommonJS 规范和 AMD 规范的特点, CMD 规范的实现就是 `sea.js`

`CMD` 规范最大的特点就是`懒加载`，不需要在定义模块的时候声明依赖，可以在模块执行时动态加载依赖，并且同时支持同步和异步加载模块

`CMD` 和 `AMD` 的主要区别是:

- AMD 需要异步加载模块，而 CMD 可以同步加载(require)，也可以异步加载(require.sync)
- CMD 遵循依赖就近原则，AMD 遵循依赖前置原则。就是说在 AMD 中我们需要把模块需要的依赖都提前在依赖数组里声明，而在 CMD 里我们只需要在具体代码逻辑内，把需要使用的模块 require 进来就可以了

用法和 require.js 差不多，通过定义一个全局函数 `define` 来实现，不过只能接受一个参数，可以是函数或者对象。如果是对象，模块导出的就是对象，如果是函数，那这个函数会被传入三个参数

```js
/**
 * require：可以引用其他模块，也可以用 require.async 异步调用其他模块
 * expxort：是一个对象，定义模块的时候，需要通过参数 export 添加属性来导出 API
 * module：是一个对象，它有三个属性
 *    uri： 模块完整的 URI 路径
 *    dependencies：模块的依赖
 *    exports：模块需要被导出的 API
 */
define(function (require, exports, module) {
  const add = require('math').add;
  exports.increment = function (val) {
    return add(val, 1);
  };
  module.id = 'increment';
});
```

#### UMD(Universal Module Definition)

UMD 没有专门的规范，而是集合了上面说的三个规范于一身，它可以让我们在合适的环境选择合适的模块规范

```js
(function(root, factory){
    if(typeof define === "function" && define.amd){ // 先判断支不支持 AMD (define 是否存在)，存在就使用 AMD 方式加载模块
        define(["xxx"], factory)
    }else if(typeof exports === "object"){ // 再判断支不支持 Node.js 模块格式(export 是否存在)，存在就用 Node.js 模块格式
        module.exports = factory( require("xxx") )
    }else{
        root.returnExports = factory( root.xxx ) // 如果前两个都不存在，就将模块公开到全局，window 或 global
    }
}(this, ($) => {
    return { ... }
}))
```

#### ES Modules

`CommonJS` 和 `AMD` 都是在`运行时确定依赖关系`, 也就是运行时加载, `CommonJS` 加载的是`值的拷贝`, 而 ESM 是在`编译时`确定依赖关系, 所有的加载都是`引用`, 这样做的好处就是可以执行静态分析和类型检查

ESM 和 CommonJS 的区别:

- ESM 都 import 是静态引入, CommonJS 的 require 是动态引入
- ESM 是对模块的引用, 输出的是值的引用, 改变原来模块中的值引用的值也会发生改变, CommonJS 是对模块的拷贝, 修改原来模块的值不会影响导出的值
- ESM 里面的 this 是 undefiend, CommonJS 里面的 this 指向该模块
- ESM 是在编译时确定依赖关系, 而 CommonJS 是在运行时确定依赖关系
- ESM 可以单独加载某个方法, CommonJS 加载就是整个模块
- ESM 不能被重新赋值, CommonJS 可以重新赋值(改变 this 的指向)

什么是静态引入? 什么是动态引入?

```js
// CommonJS / AMD 中动态引入的写法
const foo = require(`all/${['f', 'o', 'o'].join('')}`);
const foo = require('all/FOO'.toLowerCase());
const foo = require((() => 'foo')());
const foo = xx.get(require('foo'));

// ES6 Module 中静态引入的写法
import foo from 'xxxx/xxx';
import { foo1, foo2 } from 'xxxx/xxx';
```

### 防抖与节流

防抖(debounce), 节流(throttle) 都是防止某一时间频繁触发

debounce(防抖): 触发后单位时间后 再去执行回调, 如果单位时间内重复触发, 则会重新计时, 直到再过一个单位的时间没有触发, 才会执行回调
throttle(节流): 每单位时间, 只会执行一次回调

```js
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

function throttle(fn, wait) {
  let canRun = true;
  return function (...args) {
    const context = this;
    if (!canRun) {
      return;
    }
    setTimeout(() => {
      fn.apply(context, args);
      canRun = true;
    }, wait);
  };
}
```

### new

`new` 运算符做了那些事?

1. 创建一个新的空对象 `{}`
2. 将创建对象的 `__proto__` 指向 构造函数的原型对象`prototype`
3. 调用构造函数并将 `this` 指向 新创建的对象
4. 如果构造函数返回的值不是 `object/function` 则返回新创建的对象, 否则返回构造函数的返回值

```js
function myNew(Func, ...args) {
  const r = Object.create(Func.prototype);
  const res = Func.apply(r, args);
  if (type res === "function" || (res !== null && typeof res === "object")) {
    return res;
  }
  return r;
}
```

### bind

bind 主要是返回一个 `新的方法`, 该方法的 `this` 是 bind 的第一个参数, bind 后续的参数作为 返回方法的 参数传入
当返回 的方法 使用 `new ReturnFunc` 这么使用时, bind 的第一个参数无效

```js
Function.prototype.myBind = function (context, ...bindArgs) {
  const fn = this; // 保存调用 myBind 的那个函数
  const newFunc = function (...newFuncArgs) {
    if (this instanceof newFunc) {
      // 处理new
      fn.apply(this, [...bindArgs, ...newFuncArgs]);
    } else {
      // 处理一般
      fn.apply(context, [...bindArgs, ...newFuncArgs]);
    }
  };
  newFunc.prototype = Object.create(fn.prototype);
  return newFunc;
};
```

### call

call(thisArg, arg1, arg2, ....argn) 方法使用指定的 `this` 值和单独给出的一个或者多个参数来调用一个函数

thisArg 当函数处于 非严格模式的情况下, 指定 null 或者 undefined 时会替换成 全局对象, 使用原始值时会被包装

```js
const originValueMap = {
  string: String,
  number: Number,
  boolean: Boolean,
};

const notUseNew = ['bigint', 'symbol'];

Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const contextType = typeof context;
  if (contextType !== 'object') {
    context = notUseNew.includes(contextType)
      ? Object(context)
      : new originValueMap[contextType](context);
  }
  const key = Symbol();
  context[key] = this;
  const r = context[key](...args);
  delete context[key];
  return r;
};
```

### apply

apply(thisArg, [arg1, arg2, ....argn]) 方法使用指定的 `this` 值 及以一个数组（或一个类数组对象）的形式提供的参数

thisArg 当函数处于 非严格模式的情况下, 指定 null 或者 undefined 时会替换成 全局对象, 使用原始值时会被包装

```js
const originConstructorMap = {
  string: String,
  number: Number,
  boolean: Boolean,
};

const notUseNew = ['bigint', 'symbol'];

Function.prototype.myApply = function (context, args = []) {
  context = context || window;
  const contextType = typeof context;
  if (contextType !== 'object') {
    context = notUseNew.includes(contextType)
      ? Object(context)
      : new originConstructorMap[contextType](context);
  }
  const key = Symbol();
  context[key] = this;
  const r = context[key](...args);
  delete context[key];
  return r;
};
```

### deepClone

主要的思路就是 遍历 对象的 `key`

然后判断 obj[key] 的类型, 针对不同的类型 执行不同的操作

1. 对 undefiend, string, number, boolean, symbol, bigint, null 直接返回
2. 处理 Object 是用 Object.create(obj.**proto**) 保存原型链, 记得 cache 避免循环引用
3. 处理 Date,Map,Set,WeakMap,WeakSet,String,Number,Boolean 直接 new XXX(obj)
4. 处理 function 返回一个 function

```js
const getType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

function deepClone(obj, cache = new WeakMap()) {
  const isObject = obj !== null && typeof obj === 'object';
  const isFunction = typeof obj === 'function';
  // 传入的 obj 是 number, string, boolean, bigint, symbol, undefined, null 直接返回
  if (!isFunction && !isObject) {
    return obj;
  }
  // 处理对象循环引用
  if (cache.get(obj)) {
    return cache.get(obj);
  }

  if (isFunction) {
    return function () {
      return obj.apply(this, arguments);
    };
  }

  if (getType(obj) === 'Date') {
    return new Date(obj);
  }

  if (getType(obj) === 'RegExp') {
    return new RegExp(obj.source, obj.flags);
  }

  if (getType(obj) === 'Map') {
    return new Map(obj);
  }

  if (getType(obj) === 'Set') {
    return new Set(obj);
  }
  // 根据 obj 是数组还是对象来返回
  const res = Array.isArray(obj) ? [] : Object.create(obj.__proto__);

  // 缓存 copy 的对象，用于处理循环引用的情况
  cache.set(obj, res);

  Object.keys(obj).forEach((key) => {
    if (isObject || isFunction) {
      // 处理 object
      res[key] = deepClone(obj[key], cache);
    } else {
      // number, string, boolean, bigint, symbol, undefined, null 直接复制就行
      res[key] = obj[key];
    }
  });

  return res;
}
```

#### JSON.parse(JSON.stringify(obj))

1. 处理 `date` 对象时 会变成 字符串
2. 处理 `Error`, `RegExp` 会变成 空对象
3. 处理 `函数` 或者 `undefiend` 时 会丢失
4. 处理 `NaN`, `Infinity`, `-Infinity` 会变成 null
5. 处理对象时, 最后的结果只有 对象的 `可枚举的自有属性`, 也会丢失原型链
6. 处理不了对象的循环引用

```js
console.log(JSON.parse(JSON.stringify({ d: new Date() }))); // 变成字符串
console.log(
  JSON.parse(JSON.stringify({ r: new RegExp('111'), e: new Error() })),
); // 变成空对象
console.log(JSON.parse(JSON.stringify({ f() {}, u: undefined }))); // 函数 和 undefined 会丢失
console.log(
  JSON.parse(JSON.stringify({ nan: NaN, max: Infinity, min: -Infinity })),
); // NaN, Infinity, -Infinity 会变成 null

class TestC {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  say() {
    console.log('11');
  }
}

const testc = new TestC('1', '2');

Object.defineProperty(testc, 'c', {
  enumerable: false, // 不可枚举
  value: 'un enumerable c',
});

testc.d = Symbol();
console.log(testc);

console.log(JSON.parse(JSON.stringify(testc))); // 忽略不可枚举的键, symbol 键, 丢失原型链
```

### EventBus

主要是处理 怎么存储对应的事件, 怎么去触发对应的事件

EventBus 应该有这么几个方法 `on`, `emit`, `off` 这三个是最基本的

### carrying

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

涉及到知识点两个

1. arguments.length 是调用函数时传入的参数数量
2. function.length 是定义函数时 需要的形参数量

```js
function carrying(func) {
  return function carried(...args) {
    if (arg1.length >= func.length) {
      return fun.apply(this, arg1);
    } else {
      return function (...args2) {
        return carried.apply(this, [...args, ...args2]);
      };
    }
  };
}
```
