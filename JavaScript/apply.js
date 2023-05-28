/**
 * apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数
 *
 * 在 func 函数运行时使用的 this 值
 * 请注意, this 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装
 */

const originConstructorMap = {
  string: String,
  number: Number,
  boolean: Boolean,
};

const notUseNew = ['bigint', 'symbol'];

Function.prototype.myApply = function (context, args = []) {
  context = context || window; // 处理 undefined, null
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

function a() {
  console.log(this);
}

a.myApply(1);
