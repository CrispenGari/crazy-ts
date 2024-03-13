### Data Structures in TypeScript

In this readme we are going to have a loop at data structures in `typescript`. We are going to start by looking at the build in data structures and then we are going to have a look at how we can build other data structures from the existing data structures.

### Table of contents

- [Data Structures in TypeScript](#data-structures-in-typescript)
- [Table of contents](#table-of-contents)
  - [What is a data structure?](#what-is-a-data-structure)
  - [Built in data structures.](#built-in-data-structures)
    - [1. `Array`](#1-array)
    - [2. `Objects (Hash table)`](#2-objects-hash-table)
    - [3. `Set`](#3-set)
    - [4. `Map`](#4-map)
  - [Custom data structures](#custom-data-structures)
    - [1. `Stack`](#1-stack)
    - [2. `Queue`](#2-queue)
    - [3. `Circular Queue`](#3-circular-queue)
    - [5. `Linked List`](#5-linked-list)
    - [5.1 `Stack implementation using the Linked Lists.`](#51-stack-implementation-using-the-linked-lists)
    - [5.2 `Queue implementation using the Linked Lists.`](#52-queue-implementation-using-the-linked-lists)

#### What is a data structure?

A data structure is a specialized format for organizing, processing, retrieving and storing data.

#### Built in data structures.

In this section we are going to have a look at some built in data structures.

##### 1. `Array`

An array is a collection of elements at with any datatype and have a dynamic length.

```ts
const arr = [3, 7, "hey", false, -9];
```

- array methods like `forEach`, `filter`, `map`, `reduce` , `splice`, `slice`, `concat`, `shift`, `unshift` have a `linear` time complexity
- accessing an element in an array has a constant time complexity
- removing from the end of an array is `constant`
- removing from the beginning is `linear` because each operation in an array will restore the index of array members.
- searching an element is `linear`
- `pop` and `push` have a constant time complexity.

##### 2. `Objects (Hash table)`

An object is a data structure that stores data in key-value pair.

```ts
const obj = { name: "John", age: 34, female: false, getName: () => "John" };
```

- You can access the values of an object at any position using the `dot` or the `bracket` notation and that operation has a constant time complexity.
- Deleting an element in an object we use the `delete` keyword and it also have a constant time complexity.
  ```ts
  delete obj.name;
  ```
- inserting an element has a constant time complexity.
- Methods like `entries`, `keys`, `values` have a linear time complexity as they depends on the number of keys in an object.
- searching an element is `linear`

##### 3. `Set`

A set is a data structure that contains unique elements. It doesn't care about the data type of these elements. Here is how we can create a set.

```ts
const hello = new Set([2, 3, 5, true]);
hello.add(9); // add an element to a set
hello.delete(9); // delete an element to a set
hello.size; // length of a set
hello.has(true); // checking if the set contains that element
hello.clear(); // removing all elements of a set
```

- `add`, `delete`, `clear` and the `size` property has a constant time complexity

##### 4. `Map`

A map is an unordered collection of key-value pairs. Unlike objects where keys must me a symbol or a string, in a map keys can be of any type.

- Unlike object maps are iterables.

```ts
const hello = new Map();
hello.set("me", "join"); // add an element to a map
hello.clear(); // clear elements in a map
hello.delete("me"); // delete an element from a map
hello.size; // check the size of an element in a map
hello.get("me"); // accessing an element in a map
```

#### Custom data structures

In this section we are going to have a look on how we can build our custom data structures using built in data structures.

##### 1. `Stack`

A stack is a data structure which stores sequential elements that follows the principle **Last In First Out (`LIFO`)**. Let's implement our very first `Stack`. The code below shows the implementation of the `Stack` data structure using a built in array.

```ts
class Stack<TItem> {
  private items: TItem[];
  constructor(...args: TItem[]) {
    this.items = args;
  }
  push(...item: TItem[]) {
    this.items.push(...item);
  }
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.size() - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}
const stack = new Stack<number>(3, 5, 7, 9, 9);
stack.push(8, 9, -2);
```

- `peek` - returns the element at the top of the stack without removing it
- `size` - returns the size of the stack which is essentially the total number of elements in the stack.
- `push` - add an new element or elements at a top of the stack
- `isEmpty` - checks if the stack is empty or not.
- `pop` - returns the element at the to of the stack and remove it.

The code bellow shows the implementation of the stack data structure using javascript objects.

```ts
class Stack<TItem> {
  private items: Record<string, TItem>;
  private head: number = 0;
  constructor(...elements: TItem[]) {
    this.items = {};
    this.push(...elements);
  }
  push(...items: TItem[]) {
    items.forEach((item) => {
      this.items[this.head] = item;
      this.head += 1;
    });
  }
  pop() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head - 1];
    delete this.items[this.head - 1];
    this.head -= 1;
    return item;
  }
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.head - 1];
  }
  isEmpty() {
    return this.head === 0;
  }
  size() {
    return this.head;
  }
}
const stack = new Stack<number>(3, 5, 7, 9, 9);
```

##### 2. `Queue`

A Queue is a sequential data structure that follows the principle **First In First Out `FIFO`**. In the following code cell we are going to implement the `Queue` data structure using typescript.

```ts
class Queue<TItem> {
  private items: TItem[];
  constructor(...args: TItem[]) {
    this.items = args;
  }
  enqueue(...item: TItem[]) {
    this.items.push(...item);
  }
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  peek() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}
const queue = new Queue<number>(3, 5, 7, 9, 10);
```

- `peek` - returns the element at the head of the queue without removing it
- `size` - returns the size of the queue which is essentially the total number of elements in the queue.
- `enqueue` - add an new element or elements at a head of the queue
- `dequeue` - returns the element at the head of the queue and remove it.
- `isEmpty` - checks if the queue is empty or not.

We can optimize the `dequeue` method by the make use of objects instead of arrays to build a queue as follows:

```ts
class Queue<TItem> {
  private items: Record<string, TItem>;
  private head: number = 0;
  private tail: number = 0;
  constructor(...elements: TItem[]) {
    this.items = {};
    this.enqueue(...elements);
  }
  enqueue(...items: TItem[]) {
    items.forEach((item) => {
      this.items[this.tail] = item;
      this.tail += 1;
    });
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head += 1;
    return item;
  }
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.head];
  }
  size() {
    return this.tail - this.head;
  }
  isEmpty() {
    return this.head === this.tail;
  }
}
const queue = new Queue<number>(3, 5, 7, 9, 10);
```

##### 3. `Circular Queue`

A **Circular Queue**is a queue that have a fixed size. A single block of memory is used since the first element and the last are connected to each other. This Queue als follows the same principle of **`FIFO`** In the following code cell we are going to implement a circular queue using build in array.

```ts
class CircularQueue<TItem> {
  private items: TItem[];
  private head: number = -1;
  private tail: number = -1;
  private capacity: number;
  private currentLength: number = 0;
  constructor(capacity: number, ...elements: TItem[]) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.enqueue(...elements);
  }

  isFull() {
    return this.capacity === this.currentLength;
  }
  isEmpty() {
    return this.currentLength === 0;
  }
  size() {
    return this.currentLength;
  }
  enqueue(...items: TItem[]) {
    items.forEach((item) => {
      this.tail = (this.tail + 1) % this.capacity;
      if (this.isFull()) {
        throw new Error("The Circular Queue is full!");
      }
      this.items[this.tail] = item;
      this.currentLength += 1;
      if (this.head === -1) {
        this.head = this.tail;
      }
    });
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    this.currentLength -= 1;
    if (this.isEmpty()) {
      this.head = -1;
      this.tail = -1;
    }
    return item;
  }
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.head];
  }
}
console.clear();
const queue = new CircularQueue<number>(13, 5, 7, 9, 10, -11);
```

- `peek` - returns the element at the head of a circular queue without removing it
- `size` - returns the size of a circular queue which is essentially the total number of elements in a circular queue.
- `enqueue` - add an new element or elements at a head of a circular queue
- `dequeue` - returns the element at the head of a circular queue and remove it.
- `isEmpty` - checks if a circular queue is empty or not.
- `isFull` - checks if a circular queue is full or not.

##### 5. `Linked List`

A linked list is a data structure which contains a series of connected nodes where each node consist of a data value and a pointer to the next node. In this section we are going to implement a linked list data structure using typescript and it's methods. A linked list data structure support mainly 3 operations which are insertion, deletions and searching.

```shell

[10| •-]---->[20| •-]---->[30| •-]---->[null]
   |
  head
```

The last element of a linked list point to null.

> Note that all operations of a linked list starts at the tail.

In this section we are going to go step by step in the implementation of a singly linked list in typescript. First let's create a class called `ListNode` and `LinkedList` and add some few methods:

1. `isEmpty()` - checks if the linked list is empty or not.
2. `getSize()` - returns the size of the linked list.

```ts
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
}
const list = new LinkedList<number>();
```

Next we are going to create a method called `prepend`. This method takes in a value and add it to the beginning of the linked list.

- if the linked list is empty then the head is that newly created node
- if not then the node.next will be the head and the head will be

```ts
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

list.prepend(10);
list.prepend(15);
list.prepend(30);
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.print();
```

Output:

```shell
{ empty: false, size: 3 }
[30| •-]---->[15| •-]---->[10| •-]---->[null]
```

- The time complexity of the prepared method is constant **(O(n))**

Next we are going to create a `append` method which adds an element at the end of a linked list.

- if the linked list is empty we add a new node and set is as a head
- if not we need a reference to the last node in the list
- we add a new node at the end of of the linked list and attach the link between the last node and the currently inserted node.
- the currently inserted node will the point to null.

```ts
class LinkedList<TValue> {
  // ...
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
  // ...
}

const list = new LinkedList<number>();
list.prepend(10);
list.prepend(15);
list.prepend(30);
list.append(0);
list.append(35);
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.print();
```

The time complexity of this operation is **O(n)** since we have to traverse down th list to find the last node.

Output:

```shell
{ empty: false, size: 5 }
[30| •-]---->[15| •-]---->[10| •-]---->[0| •-]---->[35| •-]---->[null]
```

The next method that we are going to implement is the `insert`. This method will insert a certain value in a linked list at a certain index.

- If the index is greater than the size of the linked list we return the function
- If the list is empty we insert the node in the list and set that node as a head of a linked list using the `prepend` method.
- If not then we find the node at `index -1` which will be the previous node
- we point the previous node to the newly created node
- we point the inserted node to what previous was pointing to

```ts
class LinkedList<TValue> {
  // ...
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
  //  ...
}

const list = new LinkedList<number>();
list.insert(1, 0);
list.insert(2, 1);
list.insert(3, 1);
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.print();
```

Output:

```shell
{ empty: false, size: 3 }
[1| •-]---->[3| •-]---->[2| •-]---->[null]
```

Next we are going to implement the `removeFrom` function. This function takes in an index of the node that you want to remove and returns the value from the removed node.

1. if the index is less than 0, or the index is greater than the list size we return null.
2. if we try to remove the head we point the head pointer to the next node (if index is 0)
3. if not head we need to find the previous node and then link it with the next node that was connected to the currently removed node.

```ts
class LinkedList<TValue> {
  // ...
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
  // ...
}

const list = new LinkedList<number>();
list.insert(1, 0);
list.insert(2, 1);
list.insert(3, 1);
list.removeFrom(1);
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.print();
```

Output:

```shell
{ empty: false, size: 2 }
[1| •-]---->[2| •-]---->[null]
```

Next we are going to implement the `removeValue` function that removes a node and returns a value based on the value passed.

- if the list is empty we return null
- if the value is at the head we point the head to the next node
- if the value is not at the head then we traverse through the list searching for a node value that matches the value passed.
- In this case we need to keep in track of the previous node that is linked to the one that we want to remove
- then we point the previous node to the node that is pointed by the node that we are tying to remove.
- return the value of the removed node

```ts
class LinkedList<TValue> {
  // ...
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
  // ...
}
const list = new LinkedList<number>();
list.insert(1, 0);
list.insert(2, 1);
list.insert(3, 1);
list.removeValue(3);
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.print();
```

Output:

```shell
{ empty: false, size: 2 }
[1| •-]---->[2| •-]---->[null]
```

Next we are going to implement the `search` method. Which will return the index of the node that matches a value or `-1` if the value is not found in the linked list.

```ts
class LinkedList<TValue> {
  // ...
  search(value) {
    if (this.isEmpty()) {
      return -1;
    }
    let i = 0;
    let curr = this.head;
    while (curr) {
      if (curr.value === value) {
        return i;
      }
      curr = curr.next;
      i++;
    }
    return -1;
  }
  // ...
}

const list = new LinkedList<number>();
list.insert(1, 0);
list.insert(2, 1);
list.insert(3, 1);
console.log(list.search(3));
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.print();
```

Output:

```shell
1
{ empty: false, size: 3 }
[1| •-]---->[3| •-]---->[2| •-]---->[null]
```

The next method that we are going to implement is the `reverse` method that is responsible for reversing a linked list. Here is how we will go about it:

- start from the head of the linked list
- the head should point to null
- then we move to the next node that will point to the head

```ts
class LinkedList<TValue> {
  // ...
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
  // ...
}
const list = new LinkedList<number>();
list.insert(1, 0);
list.insert(2, 1);
list.insert(3, 1);
console.log(list.search(3));
console.log({ empty: list.isEmpty(), size: list.getSize() });
list.reverse();
list.print();
```

Output:

```shell
1
{ empty: false, size: 3 }
[2| •-]---->[3| •-]---->[1| •-]---->[null]
```

The whole code for the implementation of a linked list in typescript is as follows:

```ts
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
```

Some operations that we are doing on the above implementation can be optimized when implementing linked list that has both a `head` and a `tail`. In this section we are going to implement the linked list that contains both the `head` and a `tail` and we will modify some few method. So here is the idea:

```shell
  head
   |
[10| •-]---->[20| •-]---->[30| •-]---->[null]
                             |
                            tail
```

The first methods that we are going to modify is the `append` and `prepend` so that they look as follows

```ts
class LinkedList<TValue> {
  // ...
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
  // ...
}
```

All the above methods will have a constant time complexity. We are also going to add two other methods that allows elements to be removed from `head` or from `tail`.

1. `removeFromFront`

- this method remove the head node and adjust the next pointer to point to the node that follows the head.
- It then reduce the size of the list by 1 and return the value from that list.

2. `removeFromEnd`

- this function is responsible for removing the last node or the tail node in a list
- if the size of the list is 1 then both the head and the tail will point to null.
- We will find the node that is followed by the tail node using a while loop
- we adjust the tail to point to that node
- we return the value of that node after decrementing the size of the list.

```ts
class LinkedList<TValue> {
  // ...
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
  // ...
}
```

The next method that we are going to add is the `reverse` it just work like the print method but instead join the lists in reverse order.

```ts
class LinkedList<TValue> {
  // ...
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
  // ...
}
```

The code bellow shows the whole implementation of a linked list and it's methods using the `head` and `tail` approach.

```ts
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
  private tail: typeof this.head;
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
```

##### 5.1 `Stack implementation using the Linked Lists.`

In this subsection we are going to implement the the `Stack` using a linked list data structure.

```ts
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
```

##### 5.2 `Queue implementation using the Linked Lists.`

In this subsection we are going to implement the the `Queue` data structure using a linked list data structure.

```ts
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
```

Up to now we have been implementing a singly linked list. We also have a doubly linked list which can be shown in the following visualization.

```shell
[null] <----[10| •-]---->[20| •-]---->[30| •-]---->[null]
            [  |   ]<----[-•|   ]<----[-•|   ]
               |
             (head)
```

```ts
class ListNode<TValue> {
  public value: TValue;
  public next: ListNode<TValue> | null;
  public prev: typeof this.next;
  constructor(value: TValue) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList<TValue> {
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
      this.head!.prev = node;
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
      node.prev = this.tail;
      this.tail = node;
    }
    this.size += 1;
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
      this.tail = this.tail!.prev;
      this.tail!.next = null;
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

const list = new DoublyLinkedList<number>();
list.append(0);
list.prepend(5);
list.print();
```

Output:

```shell

```

```ts
class LinkedList<TValue> {
  // ...
  // ...
}
```

Output:

```shell

```
