/**
 * 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
 *
 * 主要的点 在于 怎么判断 是否需要返回一个函数 去接收剩下的参数
 *
 * 即 接收到的参数 与 形参的数量 是否相等
 *
 * function test(a, b, c) {
 *    console.log(test.length);
 *    console.log(arguments.length);
 * }
 *
 * test(1);
 *
 * 通过例子 我们看出来 arguments.length 是实际传入的
 *
 * function.length 是定义时需要的 数量
 *
 * 通过这俩我们就可以 判断是返回函数 还是返回结果
 */

function carrying(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}
const curriedSum = carrying(sum);
console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1)(2)(3));
