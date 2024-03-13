import { LinkedList } from "./linked_list";
class Stack<TItem> {
  private items: LinkedList<TItem>;
  constructor(...elements: TItem[]) {
    this.items = new LinkedList();
    this.push(...elements);
  }
  push(...items: TItem[]) {
    items.forEach((item) => {
      this.items.append(item);
    });
  }
  pop() {
    return this.items.removeFromFront();
  }
  peek() {
    return this.items.head!.value;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size;
  }
}
const stack = new Stack<number>(3, 5, 7, 9, 9);
