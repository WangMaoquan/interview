/**
 * new 运算符 做了什么?
 * 1. 创建一个空的简单 JavaScript 对象 (即 {})
 * 2. 为新创建的对象添加属性 __proto__ ,将该属性链接至构造函数的原型对象(prototype)
 * 3. 将this 指向 新创建的对象
 * 4. 函数如果没有返回对象, 则返回创建的对象, 否则返回函数返回的对象
 */

function myNew(Func, ...args) {
  const r = Object.create(Func.prototype);
  const res = Func.apply(r, args);
  if (typeof res === 'function' || (res !== null && typeof res === 'object')) {
    return res;
  }
  return r;
}
