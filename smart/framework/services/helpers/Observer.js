/**
 * Observer pattern
 */
class Observer {

    on(eventName, handler, context) {
      if (!this._eventHandlers) {
        this._eventHandlers = [];
      }

      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }

      this._eventHandlers[eventName].push({fn: handler, ctx: context});
    }

    off(eventName, handler) {
      if (!this._eventHandlers || !this._eventHandlers[eventName]) {
        return;
      }

      const handlers = this._eventHandlers[eventName];

      for (let index = 0, length = handlers.length; index < length; index++) {
        if (handlers[index].fn === handler) {
          handlers.splice(index--, 1);
        }
      }
    }

    trigger(eventName) {
      if (!this._eventHandlers || !this._eventHandlers[eventName]) {
        return;
      }

      const args = Array.prototype.slice.call(arguments, 1);

      this._eventHandlers[eventName].forEach((handler) => handler.fn.apply(handler.ctx || this, args), this);
    }

}

export default Observer;
