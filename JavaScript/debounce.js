/**
 * 防抖 即 防止抖动
 * 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 *
 * 防抖的思路 主要是 n 秒内重复调用 重复计时
 *
 * 所以 我们只需要 清除上一次定时器, 然后重新 生成一个定时器就好
 *
 * 场景:
 * 用户拖拽改变窗口大小 触发 resize
 */

const debounce = (fn, wait) => {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};
