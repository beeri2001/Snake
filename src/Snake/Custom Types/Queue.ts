export class Queue<T> {
    _store: T[] = [];
    push(val: T) {
      this._store.push(val);
    }
    pop(): T | undefined {
      return this._store.shift();
    }
    Peek(): T | undefined{
      return this._store[0];
    }
}

// Queue implementation from:
// https://basarat.gitbook.io/algorithms/datastructures/queue