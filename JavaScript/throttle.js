/**
 * 节流:
 * 间隔时间内多次触发事件, 只会在间隔时间结束时 真正的触发
 * 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
 *
 * 单位时间内多次触发 所以我们只需要判断 这次触发距离上次触发的间隔 是不是比 wait 大
 *
 * 使用场景: 输入框联想词
 */

function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const context = this;
    let now = Date.now();
    if (now - last >= wait) {
      fn.apply(context, args);
      last = Date.now();
    }
  };
}

function throttleUseTimeOut(fn, wait) {
  let canRun = true;
  return function (...args) {
    const context = this;
    if (!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(context, args);
      canRun = true;
    }, wait);
  };
}
