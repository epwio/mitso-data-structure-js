

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const addNode = (node, data) => {
      if (!node) return new Node(data);
      if (data === node.data) return node; // не вставляем дубликат (поведение можно изменить)
      if (data < node.data) node.left = addNode(node.left, data);
      else node.right = addNode(node.right, data);
      return node;
    };

    this._root = addNode(this._root, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let node = this._root;
    while (node) {
      if (data === node.data) return node;
      node = data < node.data ? node.left : node.right;
    }
    return null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // node.data === data -> удаляем этот узел
        // случай 1: нет детей
        if (!node.left && !node.right) return null;
        // случай 2: один ребёнок
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // случай 3: два ребёнка - заменить на минимальный элемент правого поддерева
        let minRight = node.right;
        while (minRight.left) minRight = minRight.left;
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) return null;
    let node = this._root;
    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    if (!this._root) return null;
    let node = this._root;
    while (node.right) node = node.right;
    return node.data;
  }
}

export default BinarySearchTree;
