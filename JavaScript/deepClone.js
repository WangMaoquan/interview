/**
 * 深度克隆其实最主要的就是处理引用类型
 */

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

class Test {
  say() {
    console.log('test say');
  }
}

const source = {
  name: 'Jack',
  other: {
    age: 12,
    birth: new Date('1997-10-10'),
    ary: [1, 2, { a: 1 }],
    say() {
      console.log('Hello');
    },
    s: new Set([1, 2, 3]),
    m: new Map([
      [1, 2],
      [2, 3],
    ]),
  },
  test: new Test(),
};
source.source = source;
const newObj = deepClone(source);

console.log(newObj);

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
