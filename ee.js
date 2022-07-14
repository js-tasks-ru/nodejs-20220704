// emit
// on


class EE {
  handlers = {};

  emit(eventName, ...args) {
    this.handlers[eventName].forEach(cb => cb(...args));
  }

  on(eventName, cb) {
    this.handlers[eventName] = this.handlers[eventName] || [];
    this.handlers[eventName].push(cb);
  }
}

const ee = new EE();

ee.on('lala', console.log);
ee.emit('lala', 'foo', 1, ['bar', 'baz']);
