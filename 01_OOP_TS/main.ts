class ListNode<TValue> {
  public value: TValue;
  public next: ListNode<TValue> | null;
  constructor(value: TValue) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<TValue> {
  private size: number;
  private head: ListNode<TValue> | null;
  constructor() {
    this.size = 0;
    this.head = null;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }

  prepend(value: TValue) {
    const node = new ListNode(value);
    if (!this.isEmpty()) {
      node.next = this.head;
    }
    this.head = node;
    this.size += 1;
  }
  append(value: TValue) {
    const node = new ListNode(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr?.next) {
        curr = curr.next;
      }
      curr!.next = node;
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
    let prev = null;
    let curr = this.head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
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

const list = new LinkedList<number>();
list.insert(1, 0);
list.insert(2, 1);
list.insert(3, 1);
console.log(list.search(3));
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.reverse();
list.print();
