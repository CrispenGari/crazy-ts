class ListNode<TValue> {
  public value: TValue;
  public next: ListNode<TValue> | null;
  constructor(value: TValue) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<TValue> {
  public size: number;
  public head: ListNode<TValue> | null;
  public tail: typeof this.head;
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }

  prepend(value: TValue) {
    const node = new ListNode(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size += 1;
  }
  append(value: TValue) {
    const node = new ListNode(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.size += 1;
  }

  insert(value: TValue, index: number) {
    if (index < 0 || index > this.size) return;
    const node = new ListNode(value);
    if (index === 0) {
      this.prepend(value);
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev!.next;
      }
      node.next = prev!.next;
      prev!.next = node;
      this.size += 1;
    }
  }

  removeFromFront() {
    if (this.isEmpty()) return null;
    const removedNode = this.head;
    const value = removedNode!.value;
    this.head = removedNode!.next;
    this.size -= 1;
    return value;
  }
  removeFromEnd() {
    if (this.isEmpty()) return null;
    const value = this.tail!.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let prev = this.head;
      while (prev?.next?.next !== null) {
        prev = prev!.next;
      }
      prev.next = null;
      this.tail = prev;
    }
    this.size--;
    return value;
  }
  removeFrom(index: number) {
    if (this.isEmpty()) return null;
    if (index < 0 || index > this.size) return;
    let removedNode: typeof this.head;
    if (index === 0) {
      removedNode = this.head;
      this.head = removedNode!.next;
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev!.next;
      }
      removedNode = prev!.next;
      prev!.next = removedNode!.next;
    }
    this.size--;
    return removedNode!.value;
  }

  removeValue(value: TValue) {
    if (this.isEmpty()) return null;
    if (this.head!.value === value) {
      this.head = this.head!.next;
      this.size -= 1;
      return value;
    } else {
      let prev = this.head;

      while (prev!.next && prev!.next.value !== value) {
        prev = prev!.next;
      }
      if (prev?.next) {
        prev.next = prev.next.next;
        this.size -= 1;
        return value;
      }
      return null;
    }
  }

  search(value: TValue) {
    if (this.isEmpty()) return -1;
    let index = 0;
    let curr = this.head;
    while (curr) {
      if (curr.value === value) {
        return index;
      }
      index += 1;
      curr = curr.next;
    }
    return -1;
  }
  reverse() {
    let curr = this.head;
    let prev: typeof this.head = null;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.tail = this.head;
    this.head = prev;
  }
  print() {
    if (this.isEmpty()) {
      console.log("The linked list is empty");
    } else {
      let curr = this.head;
      let str = "";
      while (curr) {
        str += `[${curr.value}| •-]---->`;
        curr = curr.next;
      }
      console.log(str + "[null]");
    }
  }
}
