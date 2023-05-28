/**
 * call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
 *
 * 在 function 函数运行时使用的 this 值。
 * 请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装
 *
 * 原始值 指的是 number, string, boolean, null, undefined
 *
 */

const originConstructorMap = {
  number: Number,
  string: String,
  boolean: Boolean,
};

// bigint symbol 的包装类 使用 Object 包一层
const notUseNew = ['bigint', 'symbol'];

Function.prototype.myCall = function (context, ...callArgs) {
  context = context || window; // 处理 非严格模式情况下 undefined, null 会变成全局对象
  const contextType = typeof context;
  if (contextType !== 'object') {
    // 处理 简单类型
    context = notUseNew.includes(contextType)
      ? Object(context)
      : new originConstructorMap[contextType](context);
  }
  const key = Symbol();
  context[key] = this; // 保存 调用 myCall 的方法
  const r = context[key](...callArgs);
  delete context[key];
  return r;
};

function a() {
  console.log(this);
}

a.myCall(1n);
