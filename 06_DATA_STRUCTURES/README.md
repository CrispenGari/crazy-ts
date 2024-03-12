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
