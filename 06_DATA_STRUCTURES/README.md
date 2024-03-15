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
    - [4. `Linked List`](#4-linked-list)
      - [4.1 `Stack implementation using the Linked Lists.`](#41-stack-implementation-using-the-linked-lists)
      - [4.2 `Queue implementation using the Linked Lists.`](#42-queue-implementation-using-the-linked-lists)
    - [5. `Hash Tables`](#5-hash-tables)
      - [`Handling Collisions`](#handling-collisions)
    - [6. `Trees`](#6-trees)
      - [1.1 `Binary Search Tree (BST)`](#11-binary-search-tree-bst)
      - [`1.1 Traversing through a BST`](#11-traversing-through-a-bst)
      - [`1.1.1 Depth First Search (DFS)`](#111-depth-first-search-dfs)
      - [`1.1.2 Breadth First Search (BFS)`](#112-breadth-first-search-bfs)
    - [7. `Graphs`](#7-graphs)
      - [`Types of Graphs`](#types-of-graphs)
      - [`Graphs Representation`](#graphs-representation)
      - [1. `Adjacency matrix`](#1-adjacency-matrix)
      - [2. `Adjacency list`](#2-adjacency-list)

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

##### 4. `Linked List`

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

###### 4.1 `Stack implementation using the Linked Lists.`

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

###### 4.2 `Queue implementation using the Linked Lists.`

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

##### 5. `Hash Tables`

A hash table is also know as a hash map is a data structure that is used to store key value pairs. In this section we are going to implement a hash table data structures from scratch. This function will contains the following operations

1. `set` - inserting a new key value pair
2. `get` - get a value based on a key provided
3. `remove` - remove a key and it's value from the table.

Let's implement a hash table data structure from scratch. First things first we will need to implement the `hash` function which is used to create hash keys. What we are going to do when creating a hash keys is that we are going to convert a string into `ASCII` characters and sum them together. That how we will be hashing our keys assuming that all the keys will be strings.

```ts
class HashTable<TItem> {
  private table: TItem[];
  constructor(private size: number) {
    this.table = new Array(size);
  }
  hash(key: string) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size;
  }

  set(key: string, value: TItem) {
    const index = this.hash(key);
    this.table[index] = value;
  }
  get(key: string) {
    const index = this.hash(key);
    return this.table[index];
  }
}

const table = new HashTable<string | number>(50);

table.set("name", "John");
table.set("surname", "Doe");
table.set("age", 23);
table.set("gea", "hello");

console.log({
  age: table.get("age"),
  surname: table.get("surname"),
  name: table.get("name"),
  gea: table.get("gea"),
});
```

Output:

```shell
{ age: 'hello', surname: 'Doe', name: 'John', gea: 'hello' }
```

We can see that there is collision between property `age` and `gea` because these two properties have the same characters hence the hash key will be the same. So we need to handle this because this can't be handled by increasing the table size.

###### `Handling Collisions`

Collision occurs when there is a class in keys in a hash table. This is a problem because we might loose data which is not the primary purpose of a data structure. We are going to handle this in a simple way by storing the keys and values as an array inside the `table`. The code bellow show the implementation of that. We are going to modify the `set` and `get` methods to:

```ts
class HashTable<TItem> {
  private table: Array<Array<TItem | string>[]>;
  constructor(private size: number) {
    this.table = new Array(size);
  }
  //   [i]
  hash(key: string) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size;
  }

  set(key: string, value: TItem) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (!!!bucket) {
      this.table[index] = [[key, value]];
    } else {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem) {
        sameKeyItem[1] = value;
      } else {
        bucket.push([key, value]);
      }
    }
  }
  get(key: string) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem) {
        return sameKeyItem[1];
      }
    }
    return undefined;
  }
}

const table = new HashTable<string | number>(50);

table.set("name", "John");
table.set("surname", "Doe");
table.set("age", 23);
table.set("gea", "hello");

console.log({
  age: table.get("age"),
  surname: table.get("surname"),
  name: table.get("name"),
  gea: table.get("gea"),
  und: table.get("Undefined"),
});
```

Output:

```shell
{ age: 23, surname: 'Doe', name: 'John', gea: 'hello', und: undefined }
```

With just that we have handled collision. Next we are going to implement the `remove` function which allows us to remove an item from the hash table.

```ts
class HashTable<TItem> {
  private table: Array<Array<TItem | string>[]>;
  constructor(private size: number) {
    this.table = new Array(size);
  }
  //   [i]
  hash(key: string) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size;
  }

  set(key: string, value: TItem) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (!!!bucket) {
      this.table[index] = [[key, value]];
    } else {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem) {
        sameKeyItem[1] = value;
      } else {
        bucket.push([key, value]);
      }
    }
  }
  get(key: string) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem) {
        return sameKeyItem[1];
      }
    }
    return undefined;
  }
  remove(key: string) {
    let index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem) {
        bucket.splice(bucket.indexOf(sameKeyItem), 1);
      }
    }
  }
}

const table = new HashTable<string | number>(50);

table.set("name", "John");
table.set("surname", "Doe");
table.set("age", 23);
table.set("gea", "hello");
table.remove("gea");

console.log({
  age: table.get("age"),
  surname: table.get("surname"),
  name: table.get("name"),
  gea: table.get("gea"),
});
```

Output:

```shell
{ age: 23, surname: 'Doe', name: 'John', gea: undefined }
```

##### 6. `Trees`

A tree is a hierarchical data structure that consist of nodes connected by edges. Tress allow quicker and easier access to data. Let's first have a look at some terminology that are used in tree data structure.

1. Parent Node - is the node where the tree starts, it sometimes called a root node. This is where all operations of a tree originates.
2. Child Node - Any node that is connected to another node above it's hierarch.
3. Leaf Nodes -Nodes that doesn't have root nodes.
4. Siblings - Nodes with the same parent.
5. Ancestor Node - Is a node that has grand children.
6. Path - The sequency of edges from one node to another.
7. Distance - the number of shotes edges between two nodes.
8. Degree - A degree of a node is the total number of nodes it has.
9. Depth - the number of edges from the root node to that node. Eg the depth of the root node is 0
10. Height- The number of edges from the deepest leaf to that node.

###### 1.1 `Binary Search Tree (BST)`

This is a tree data structure where each node has at most 2 children. A BST has the following two properties

1. The value of each left node must be smaller that the parent node.
2. The value of each right node must be greater that the parent node.

`BST` supports the following operations:

1. Insertion
2. Search
3. DFS and BFS
4. Deletion

Now let's implement the `BST` in typescript.

```ts
class TreeNode<T> {
  public left: TreeNode<T> | null;
  public right: typeof this.left;
  constructor(public value: T) {
    this.left = null;
    this.right = null;
  }
}

class BST<T> {
  public root: TreeNode<T> | null;
  constructor() {
    this.root = null;
  }
  isEmpty() {
    return this.root === null;
  }
}

const bst = new BST();
console.log({ empty: bst.isEmpty() });
```

Output:

```shell
{ empty: true }
```

The next method that we are going to implement is the `insert` which is responsible for adding elements to a tree. The insert method will:

1. It takes in a value and if the tree is empty that newly created node is the root node.
2. If not we are going to traverse through the tree using recursion checking if the node value that we are going to insert belongs to the `left` or `right` depending on the fact that is it greater or less than the parent node value.

```ts
class BST<T> {
  // ...

  insert(value: T) {
    const node = new TreeNode(value);
    if (this.isEmpty()) {
      this.root = node;
    } else {
      this.insertNode(this.root!, node);
    }
  }

  private insertNode(root: Required<TreeNode<T>>, node: Required<TreeNode<T>>) {
    if (node.value < root.value) {
      // left insertion
      if (root.left == null) {
        root.left = node;
      } else {
        this.insertNode(root.left, node);
      }
    } else {
      // right insertion
      if (root.right == null) {
        root.right = node;
      } else {
        this.insertNode(root.right, node);
      }
    }
  }
  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(20);
bst.insert(5);
bst.insert(99);
bst.insert(0);
console.log({ empty: bst.isEmpty() });
```

Output:

```shell
{ empty: false }
```

The next method that we are going to implement is the `search` method. It takes in a value and returns `true` if the value exist in a tree else `false`. We are going to start searching from the `root` node.

1. if the value we are trying to search is greater than the value of the parent node we go to the right
2. else we go to the left
3. only if the value we are trying to search is not the value of the root node.

```ts
class BST<T> {
  // ...
  search(value: T) {
    return this.searchTree(this.root, value);
  }
  private searchTree(root: TreeNode<T> | null, value: T): boolean {
    if (!!!root) return false;
    if (root.value === value) return true;
    if (root.value < value) {
      // go to the right
      return this.searchTree(root.right, value);
    } else {
      // go to teh left
      return this.searchTree(root.left, value);
    }
  }
  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(20);
bst.insert(5);
bst.insert(99);
bst.insert(0);
console.log({
  empty: bst.isEmpty(),
  ten: bst.search(10),
  twenty: bst.search(20),
  thirty: bst.search(30),
});
```

Output:

```shell
{ empty: false, ten: true, twenty: true, thirty: false }
```

The next method that we are going to implement is the `min` which is responsible for finding the minimum value in a tree.

1. If the tree has `1` node which means that is the minimum value.
2. Otherwise we focus on the left side of the tree.

```ts
class BST<T> {
  // ...
  min() {
    return this.searchMin(this.root);
  }
  private searchMin(root: TreeNode<T> | null): T | null {
    if (!root) return null;
    if (!root.left) return root.value;
    return this.searchMin(root.left);
  }

  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(20);
bst.insert(5);
bst.insert(99);
bst.insert(0);
console.log({
  empty: bst.isEmpty(),
  ten: bst.search(10),
  twenty: bst.search(20),
  thirty: bst.search(30),
  min: bst.min(),
});
```

Output:

```shell
{ empty: false, ten: true, twenty: true, thirty: false, min: 0 }
```

The next method that we are going to implement is the `max` which is responsible for finding the maximum value in a tree.

1. If the tree has `1` node which means that is the maximum value.
2. Otherwise we focus on the right side of the tree.

```ts
class BST<T> {
  // ...

  max() {
    return this.searchMax(this.root);
  }
  private searchMax(root: TreeNode<T> | null): T | null {
    if (!root) return null;
    if (!root.right) return root.value;
    return this.searchMax(root.right);
  }

  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(99);
bst.insert(5);

console.log({
  empty: bst.isEmpty(),
  ten: bst.search(10),
  twenty: bst.search(20),
  thirty: bst.search(30),
  min: bst.min(),
  max: bst.max(),
});
```

Output:

```shell
{
  empty: false,
  ten: true,
  twenty: true,
  thirty: false,
  min: 0,
  max: 99
}
```

The next method that we will implement is the `delete` method. This method is responsible for deleting a node by value in a tree.

1. if the root is null we return the root
2. if the vale that we are trying to delete is less than the root value we traverse to the left and recursively call the deleteNode method otherwise we traverse to the right.
3. if there is no left or right node then this means that we are trying to delete the value that is not in teh tree we return null.
4. if there is no left node we return the root's right node
5. if there is no right node we return the root's left node
6. the root value will be set to the minimum value in on the right
7. we return the root node after all the checks.

```ts
class BST<T> {
  // ...
  delete(value: T) {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(root: TreeNode<T> | null, value: T) {
    if (root === null) return root;
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (root > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!!!root.left && !!!root.right) return null;
      if (!!!root.left) {
        return root.right;
      } else if (!!!root.right) {
        return root.left;
      }
      root.value = this.searchMin(root.right)!;
      root.right = this.deleteNode(root.right, root.value);
    }
    return root;
  }
  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(99);
bst.insert(5);
bst.delete(0);
console.log({
  empty: bst.isEmpty(),
  ten: bst.search(10),
  twenty: bst.search(20),
  thirty: bst.search(30),
  min: bst.min(),
  max: bst.max(),
});
```

Output:

```shell
{
  empty: false,
  ten: true,
  twenty: true,
  thirty: false,
  min: 5,
  max: 99
}
```

###### `1.1 Traversing through a BST`

This basically means that we are visiting all nodes in a tree. There are two ways to traverse a tree which are:

1. Depth First Search (DFS)
2. Breadth First Search (BFS)

###### `1.1.1 Depth First Search (DFS)`

The DFS algorithm start at the root node and explores as far as possible along each branch before backtracking. Depending on the order there are 3 type of `DFS` which are:

1. PreOrder
2. InOrder
3. PostOrder

**Pre Order Traversal**
The algorithm for this traversal is as follows:

- Read the data of the node
- Visit the left subtree
- Visit the right subtree

**In Order Traversal**

- Visit the left subtree
- Read the data of the node
- Visit the right subtree

**Post Order Traversal**

- Visit the left subtree
- Visit the right subtree
- Read the data of the node

Now let's implement this in code. We are going to add `3` methods:

1. `preOrder`
2. `postOrder`
3. `inOrder`

In our `BST` class as follows:

```ts
class BST<T> {
  // ...
  preOrder() {
    console.log(this._preOrder(this.root).join(", "));
  }
  inOrder() {
    console.log(this._inOrder(this.root).join(", "));
  }
  postOrder() {
    console.log(this._postOrder(this.root).join(", "));
  }

  private _preOrder(root: TreeNode<T> | null): T[] {
    const values: T[] = [];
    if (root) {
      values.push(root.value); // read the value
      const leftValues = this._preOrder(root.left);
      values.push(...leftValues);
      const rightValues = this._preOrder(root.right);
      values.push(...rightValues);
    }
    return values;
  }
  private _inOrder(root: TreeNode<T> | null): T[] {
    const values: T[] = [];
    if (root) {
      const leftValues = this._inOrder(root.left);
      values.push(...leftValues);
      values.push(root.value); // read the value
      const rightValues = this._inOrder(root.right);
      values.push(...rightValues);
    }
    return values;
  }
  private _postOrder(root: TreeNode<T> | null): T[] {
    const values: T[] = [];
    if (root) {
      const leftValues = this._postOrder(root.left);
      values.push(...leftValues);
      const rightValues = this._postOrder(root.right);
      values.push(...rightValues);
      values.push(root.value); // read the value
    }
    return values;
  }

  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(99);
bst.insert(5);
bst.delete(0);

bst.preOrder();
bst.inOrder();
bst.postOrder();
```

Output:

```shell
10, 5, 20, 99
5, 10, 20, 99
5, 99, 20, 10
```

###### `1.1.2 Breadth First Search (BFS)`

With the BFS algorithm we explore all the nodes preset depth prior to moving on to the nodes at the next depth level. Here are the steps to achieve `BFS`

1. Create a Queue
2. Enqueue the root node
3. As long as the node exist in the queue perform the following operations:

- Dequeue the node from the front
- Read the node's value
- Enqueue the node's left child if exists
- Enqueue the node's right child if exists

Let's create a method called `levelOrder` that will do the `bfs` traversal in a tree.

```ts
class BST<T> {
  // ...
  levelOrder() {
    const queue = [];
    const values: T[] = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      if (curr) {
        values.push(curr.value);
        if (curr.left) {
          queue.push(curr.left);
        }
        if (curr.right) {
          queue.push(curr.right);
        }
      }
    }
    console.log(values.join(", "));
  }
  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(99);
bst.insert(5);
bst.delete(0);

bst.preOrder();
bst.inOrder();
bst.postOrder();
bst.levelOrder();
```

Output:

```shell
10, 5, 20, 99
5, 10, 20, 99
5, 99, 20, 10
10, 5, 20, 99
```

The next method that we are going to implement is the `height`. which is responsible for calculating the height of the tree.

1. traverse through the left node and right node from the root
2. return the maximum number of nodes a tree has from the two branches.

```ts
class BST<T> {
  // ...
  height() {
    return this.getHeight(this.root);
  }
  private getHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  // ...
}

const bst = new BST<number>();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(99);
bst.insert(5);
console.log({ height: bst.height() });
```

Output:

```shell
{ height: 3 }
```

The next method that we are going to implement is the `isBST` method which checks if the a tree is binary tree or not.

```ts
class BST<T> {
  // ...
  isBST() {
    return this._isBST(this.root, this.min(), this.max());
  }

  private _isBST(node: TreeNode<T> | null, min: any, max: any): boolean {
    if (!node) {
      return true;
    }
    if (node.value < min || node.value > max) {
      return false;
    }
    return (
      this._isBST(node.left, min, node.value) &&
      this._isBST(node.right, node.value, max)
    );
  }
  // ...
}
const bst = new BST<number>();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(99);
bst.insert(5);

console.log({ height: bst.height(), bst: bst.isBST() });
```

Output:

```shell
{ height: 3, bst: true }
```

The whole implementation of the `BST` will be found in the [`bst.ts`](/06_DATA_STRUCTURES/bst.ts) file.

##### 7. `Graphs`

A graph is a non-linear data structure that contains a finite number of vertices also called nodes connected by edges.

###### `Types of Graphs`

1. Directed Graphs - A graph in which the edges have a direction.
2. Undirected Graphs - A graph where edges are bidirectional. Meaning the graph can be traversed in any direction. These types of graphs can be visually shown with no arrows.

###### `Graphs Representation`

A graph can be presented in two ways.

###### 1. `Adjacency matrix`

An adjacency matrix is a `2D` array which consist of size `VxV` where V is the number of vertices in a graph.

- Each row and column represents a vertex.
  - if the value of matrix[i][j] = 1 then this means that there is an edge connecting vertex i and vertex j.

```ts
const matrix = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
];
```

Assuming that we have vertices `A`, `B` and `C` from the above matrix representation respectively we can take the following points.

1. vertex `A` is connected to vertex `B`
2. vertex `B` is connected to vertex `A` and vertex `C`
3. vertex `C` is connected to vertex `B` only

###### 2. `Adjacency list`

Vertices are stored in a map like data structure, and every vertex stores a list of it's adjacent vertices. Let's have a look at the following points and create an `adjacencyList` from them

1. vertex `A` is connected to vertex `B`
2. vertex `B` is connected to vertex `A` and vertex `C`
3. vertex `C` is connected to vertex `B` only

```ts
const adjacencyList = {
  A: ["B"],
  B: ["A", "C"],
  C: ["B"],
};
```

We are going to use this to implement our graph data structure because of the following reasons compared to the Adjacency Matrix.

1. It's storage efficient
2. It has constant time complexity.
3. Doesn't store unnecessary information for example, even if `C` and `A` are not connected we still have to store `0` in the matrix.

The first method that we'll implement is the `addVertex` and it:

1. Take in a vertex which is a string
2. Check if it exists in the verticesLists.
3. If it does then it will not add it
4. If not then it will add it as an object property and set it's initial value as an empty set.

```ts
class Graph<T extends string> {
  private adjacencyList: Record<string, Set<T>>;
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: T) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }
}

const graph = new Graph<string>();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
console.log({ graph });
```

Output:

```shell
{
  graph: Graph { verticesList: { A: Set(0) {}, B: Set(0) {}, C: Set(0) {} } }
}
```

The next method that we are going to implement is called `addEdge` which:

1. Takes in two vertices and add them to the graph.
2. First we check if the vertex is in the graph if not we create it.
3. Then we create a bidirectional connection between these two vertices.

```ts
class Graph<T extends string> {
  // ...

  addEdge(vertex1: T, vertex2: T) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }
  // ...
}

const graph = new Graph<string>();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");

graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "B");
console.log({ graph });
```

Output:

```shell
{ graph: Graph { adjacencyList: { A: [Set], B: [Set], C: [Set] } } }
```

The next method that we are going to create is called `display` that will display the `Vertex` and it's adjacency list.

```ts
class Graph<T extends string> {
  // ...
  display() {
    for (const vertex in this.adjacencyList) {
      console.log(`vertex ${vertex}:`, [...this.adjacencyList[vertex]]);
    }
  }
  // ...
}
```

Output:

```shell
vertex A: [ 'B' ]
vertex B: [ 'A', 'C' ]
vertex C: [ 'B' ]
```

The next to method that we are going to add are called `removeEdge` and `removeVertex` which does what their names says.

1. When removing edges we need to make sure we remove the bidirectional edges of these edges.
2. When removing a vertex we need to make sure that we remove the edges first.

```ts
class Graph<T extends string> {
  // ...
  removeEdge(vertex1: T, vertex2: T) {
    this.adjacencyList[vertex1].delete(vertex2);
    this.adjacencyList[vertex2].delete(vertex1);
  }
  removeVertex(vertex: T) {
    if (!this.adjacencyList[vertex]) {
      return;
    }
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
  // ...
}
const graph = new Graph<string>();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");

graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "B");
graph.display();
console.log("-------------------");
graph.removeEdge("B", "C");
graph.display();
console.log("-------------------");
graph.removeVertex("C");
graph.display();
```

Output:

```shell
vertex A: [ 'B' ]
vertex B: [ 'A', 'C' ]
vertex C: [ 'B' ]
-------------------
vertex A: [ 'B' ]
vertex B: [ 'A' ]
vertex C: []
-------------------
vertex A: [ 'B' ]
vertex B: [ 'A' ]
```

The last method that we are going to implement is called `hasEdge` which is responsible for checking if 2 vertices have edge between them.

```ts
class Graph<T extends string> {
  // ...
  hasEdge(vertex1: T, vertex2: T) {
    return (
      this.adjacencyList[vertex1].has(vertex2) &&
      this.adjacencyList[vertex2].has(vertex1)
    );
  }
  // ...
}
const graph = new Graph<string>();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");

graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "B");
graph.display();
console.log("-------------------");
graph.removeEdge("B", "C");
graph.display();
console.log("-------------------");
graph.removeVertex("C");
graph.display();
console.log("-------------------");
console.log({
  aHasB: graph.hasEdge("A", "B"),
  bHasC: graph.hasEdge("B", "C"),
});
```

Output:

```shell
vertex A: [ 'B' ]
vertex B: [ 'A', 'C' ]
vertex C: [ 'B' ]
-------------------
vertex A: [ 'B' ]
vertex B: [ 'A' ]
vertex C: []
-------------------
vertex A: [ 'B' ]
vertex B: [ 'A' ]
-------------------
{ aHasB: true, bHasC: false }
```

> The full implementation of the `graph` data structure can be found [`graph.ts`](/06_DATA_STRUCTURES/graph.ts) file.
