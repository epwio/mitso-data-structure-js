

class Stack {
  constructor() {
    this._items = [];
  }

  push(value) {
    this._items.push(value);
  }

  pop() {
    return this._items.pop();
  }

  peek() {
    return this._items.length === 0 ? undefined : this._items[this._items.length - 1];
  }
}

export default Stack;
