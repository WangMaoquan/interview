/**
 * bind 方法创建一个新的函数
 * 在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
 * 如果使用 new 运算符构造绑定函数，则忽略该值(即第一个参数)
 *
 * 调用绑定函数时作为 this 参数传递给目标函数的值。
 * 如果使用new运算符构造绑定函数，则忽略该值。当
 * 使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。
 * 如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg
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
