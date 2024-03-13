import { LinkedList } from "./linked_list";

class Queue<TItem> {
  private items: LinkedList<TItem>;
  constructor(...args: TItem[]) {
    this.items = new LinkedList();
    this.enqueue(...args);
  }
  enqueue(...item: TItem[]) {
    item.forEach((it) => {
      this.items.append(it);
    });
  }
  dequeue() {
    return this.items.removeFromFront();
  }
  peek() {
    return this.items.head!.value;
  }
  size() {
    return this.items.getSize();
  }
  isEmpty() {
    return this.items.isEmpty();
  }
}
const queue = new Queue<number>(3, 5, 7, 9, 10);
