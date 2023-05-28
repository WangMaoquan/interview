/**
 * 实现一个简单的发布订阅
 */

class EventBus {
  constructor() {
    this.cache = {}; // 初始化 存储的cache
  }

  on(name, cb) {
    if (this.cache[name]) {
      this.cache[name].push(cb);
    } else {
      this.cache[name] = [cb];
    }
  }
  off(name, cb) {
    const tasks = this.cache[name];
    if (tasks) {
      const i = tasks.findIndex((f) => f === fn);
      if (i !== -1) {
        tasks.splice(index, 1);
      }
    }
  }
  emit(name) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      const tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn();
      }
    }
  }
}
