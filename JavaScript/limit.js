/**
 * 实现并发
 *
 * 什么是并发?
 *
 * 两个或者多个独立进行的方法(异步请求)
 *
 * 这个其实是很好做 就 Promise.all() 或者 Promise.race()
 *
 * 这两个方法都是 批量执行异步方法
 *
 * Promise.all()
 * 1. 如果传入的参数是一个空的可迭代对象, 则返回一个已完成状态的 Promise(同步)
 * 2. 如果传入的参数不包含任何 promise, 则返回一个异步完成Promise. 注意: Google Chrome 58 在这种情况下返回一个已完成状态的 Promise
 * 3. 其他情况下返回一个处理中 (pending) 的Promise. 这个返回的 promise 之后会在所有的 promise 都完成 或 有一个 promise 失败时异步地变为完成或失败
 *
 * Promise.race()
 * 1. race 函数返回一个 Promise, 它将与第一个传递的 promise 相同的完成方式被完成
 * 2. 如果传的迭代是空的，则返回的 promise 将永远等待
 *
 * 并发限制 主要的就是限制
 *
 * 也就是 同时执行的 异步数量为 限制数量
 *
 * 我们思考下是 使用 all 还是 race, 选race 因为我们没有必要等 同时执行的异步 全部完成, 只要完成一个 我们再加入一个新的, 保持 同时执行的数量 一直是 限制数量, 直到不能添加进新的
 *
 * const pendingArr = []; // 保存同时进行的 异步任务的 数组, length 就是我们的限制数量
 * const result = [] // 最后所有完成的 promise
 *
 */

const wrapperTask = (fn) => {
  if (fn instanceof Promise) {
    return fn;
  } else {
    return new Promise((resolve) => {
      const r = typeof fn === 'function' ? fn() : fn;
      resolve(r);
    });
  }
};

async function concurrencyAsync(tasks, max) {
  const pendingTasks = [];
  const result = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = wrapperTask(tasks[i]);
    result.push(task);
    pendingTasks.push(task);
    task.then((data) => {
      console.log(`data: ${data}, 当前并发数: ${pendingTasks.length}`);
      pendingTasks.splice(pendingTasks.indexOf(task), 1);
    });

    if (pendingTasks.length === max) {
      await Promise.race(pendingTasks);
    }
  }
  return Promise.all(result);
}

const mockRequest = (value, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });
};

const tasks = [
  mockRequest(1, 1000),
  2,
  mockRequest(3, 1000),
  mockRequest(4, 20000),
];

async function test() {
  const r = await concurrencyAsync(tasks, 2);
  console.log(r);
}
test();
