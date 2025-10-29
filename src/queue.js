// Очередь на базе одноcвязного списка
// Методы: enqueue(value), dequeue(), getUnderlyingList()
// getUnderlyingList возвращает head в формате { value: ..., next: ... }

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null; // старший элемент (извлекаемый)
    this.tail = null; // последний добавленный
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  dequeue() {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    return value;
  }

  getUnderlyingList() {
    return this.head;
  }
}

export default Queue;
