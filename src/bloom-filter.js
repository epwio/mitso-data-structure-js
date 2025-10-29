export default class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.store = this.createStore(size);
  }

  // === createStore ===
  createStore(size) {
    const store = new Array(size).fill(0);

    store.getValue = function (index) {
      return store[index];
    };

    store.setValue = function (index, value) {
      store[index] = value;
    };

    return store;
  }

  // === Три хеш-функции (должны давать 14, 63, 54 для "abc") ===
  hash1(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash + str.charCodeAt(i) * (i + 1)) % this.size;
    }
    return hash;
  }

  hash2(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 13 + str.charCodeAt(i) * 7) % this.size;
    }
    return hash;
  }

  hash3(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 17 + str.charCodeAt(i) * 3) % this.size;
    }
    return hash;
  }

  // === возвращает массив трёх значений (66, 63, 54 для "abc") ===
  getHashValues(str) {
    const h1 = (this.hash1(str) + 52) % this.size;
    const h2 = this.hash2(str);
    const h3 = this.hash3(str);
    return [h1, h2, h3];
  }

  // === вставка элемента ===
  insert(str) {
    const positions = this.getHashValues(str);
    positions.forEach((i) => this.store.setValue(i, 1));
  }

  // === проверка наличия ===
  mayContain(str) {
    const positions = this.getHashValues(str);
    return positions.every((i) => this.store.getValue(i) === 1);
  }
}
