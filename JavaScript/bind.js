/**
 * bind 方法创建一个新的函数
 * 在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
 * 如果使用 new 运算符构造绑定函数，则忽略该值(即第一个参数)
 */

Function.prototype.myBind = function (context, ...bindArgs) {
  const fn = this; // 这个this 是 调用myBind 的this 即原始的func
  console.log(fn);
  // 创建一个的函数
  const newFun = function (...newFunArgs) {
    // 这个函数里面需要处理 myBind 传进来的参数 和 newFun的参数
    if (this instanceof newFun) {
      fn.apply(this, [...bindArgs, ...newFunArgs]);
    } else {
      fn.apply(context, [...bindArgs, ...newFunArgs]);
    }
  };
  newFun.prototype = Object.create(fn.prototype);
  return newFun;
};

function Test(name, age) {
  this.name = name;
  this.age = age;
  return this;
}

const bindTest = Test.myBind(window, 'decade', 21);
const test = new bindTest();
console.log(test);
const test1 = new Test('decade', 22);
console.log(test1);
