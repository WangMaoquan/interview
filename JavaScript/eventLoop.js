// console.log('start');

// new Promise((resolve) => {
//   console.log('promise start');
//   resolve('微1');
// }).then((v) => {
//   console.log(v);
//   console.log('promise end');
// });

// setTimeout(() => {
//   console.log('宏1');
// }, 1000);

// setTimeout(() => {
//   console.log('宏2');
// }, 500);

// console.log('end');

/**
 * start
 * promise start
 * end
 * 微1
 * promise end
 * 宏2
 * 宏1
 *
 * 先将 console.log('start') 进入执行栈 因为是同步任务 直接执行
 * new Promise 是 同步的 所以 console.log('promise start') 会进入执行栈, 因为是同步的 所以直接执行
 * .then 的回调 是异步的, 所以 (v) => {console.log(v); console.log('promise end')}  会进入 微任务队列
 * setTimeout 的回调也是异步, 所以 等待 1000ms 后 将 () => console.log('宏1') 加入宏任务队列
 * setTimeout 的回调也是异步, 所以 等待 500ms 后 将 () => console.log('宏2') 加入宏任务队列
 * console.log('end') 只进入调用栈 直接执行
 *
 * 同步任务已经没有
 *
 * 检查 微任务队列 存在 然后清空微任务队列
 *
 * 然后检查宏任务队列, 很明显 500ms 比 1000ms 先进入 宏任务队列, 所以 宏2 先 打印 再是 宏1
 */

console.log('start');
Promise.resolve().then(() => {
  console.log('微1');
  Promise.resolve().then(() => {
    console.log('微2 嵌套 微1');
  });
});

setTimeout(() => {
  console.log('宏1');
  Promise.resolve().then(() => {
    console.log('微3 嵌套 宏1');
  });
}, 1000);

setTimeout(() => {
  console.log('宏2');
  setTimeout(() => {
    console.log('宏3 嵌套 宏2');
  }, 100);
}, 1000);

console.log('end');
