### Algorithms in TypeScript

In this readme we are going to have a look at how to implement some algorithms in typescript.

### Table of contents

- [Algorithms in TypeScript](#algorithms-in-typescript)
- [Table of contents](#table-of-contents)
- [Time and Space Complexity Cheat-Sheet.](#time-and-space-complexity-cheat-sheet)
- [Math Algorithms](#math-algorithms)
  - [1. factorial](#1-factorial)
  - [2. Fibonacci Serries](#2-fibonacci-serries)
  - [2. prime](#2-prime)
  - [3. powerOfTwo](#3-poweroftwo)
- [Recursion Algorithms](#recursion-algorithms)
  - [1. factorial problem](#1-factorial-problem)
  - [2. fibonacci problem](#2-fibonacci-problem)
- [Searching Algorithm](#searching-algorithm)
  - [1. Linear Search](#1-linear-search)
  - [2. Binary Search](#2-binary-search)
    - [2.1 Iterative approach](#21-iterative-approach)
    - [2.2 Recursive approach](#22-recursive-approach)
- [Sorting Algorithm](#sorting-algorithm)
  - [1. Bubble Sort](#1-bubble-sort)
  - [2. Insertion Sort](#2-insertion-sort)
  - [3. Quick Sort](#3-quick-sort)
  - [4. Merge Sort](#4-merge-sort)
  - [5. Stalin Sort](#5-stalin-sort)
- [Miscellaneous](#miscellaneous)
  - [1. Cartesian Product](#1-cartesian-product)
  - [2. Climbing Stairs](#2-climbing-stairs)
  - [3. Tower of Hanoi](#3-tower-of-hanoi)
- [Algorithm Design Techniques and Terminologies](#algorithm-design-techniques-and-terminologies)

### Time and Space Complexity Cheat-Sheet.

The following table contains a cheatsheet for time complexity and space complexity for the `Big-O` notations of code expressions.

| Description                                 | Big-O notation | Type          |
| ------------------------------------------- | -------------- | ------------- |
| Alignment operations and conditional checks | `O(1)`         | `Constant`    |
| Loops                                       | `O(n)`         | `Linear`      |
| 2 Nested loops                              | `O(n^2)`       | `Quadratic`   |
| Loops that reduces by half in the body      | `O(log(n))`    | `Logarithmic` |

### Math Algorithms

In this section we are going to implement some mathematical algorithms identify their time complexity and optimize them where necessary.

#### 1. factorial

A factorial of a number (`n`) is product of the numbers starting from `1` to `n`.

```ts
const factorial = (n: number) => {
  let fact = 1;
  for (let i = 2; i <= n; i++) {
    fact *= i;
  }
  return fact;
};
```

- Time complexity: **O(n)**

#### 2. Fibonacci Serries

This is a serries of numbers in which the next number is obtained by adding the 2 previous numbers in the series.

```ts
const fibonacci = (n: number) => {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    // fib.push(fib[i - 1] + fib[i - 2]);
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
};
```

- Time complexity: **O(n)**

#### 2. prime

A prime number `n` is a number that have oly two factors, which are `1` and `n`.

```ts
const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};
```

- Time complexity: **O(n)**
  > Integers lager than the square root do not need to be checked for prime because whenever `n=a*b`, one of the two factors `a` and `b` is less than or equal to the square root of `n`
- The above algorithm can be optimized or improved as follows.

```ts
const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};
```

- Time complexity: **O(sqrt(n))**

#### 3. powerOfTwo

We want to determine given an integer value `n` if `n` is a power of 2.

```ts
const powerOfTwo = (n: number) => {
  if (n < 1) return false;
  while (n > 1) {
    if (n % 2 !== 0) return false;
    n /= 2;
  }
  return true;
};
```

- Time complexity: **O(log(n))**
- The above alorithm can be improved as follows

```ts
const powerOfTwo = (n: number) => {
  if (n < 1) return false;
  return (n & (n - 1)) === 0;
};
```

- Time complexity: **O(1)**

### Recursion Algorithms

A recursive function is a function that calls itself in the function body. Let's have a look at some of the examples.

> Note: Every recessive function should have a base case, which controls the termination of a function otherwise an infinite loop will arise.

#### 1. factorial problem

We are going to approach the factorial problem to find a factorial of `n` which is a positive integer greater than 0 using recursion.

```ts
const factorial = (n: number): number => {
  if (n < 2) return 1;
  return n * factorial(n - 1);
};
```

- Time complexity: **O(n)**
  > We can conclude that using iterative approach is the same as using the recursive approach in solving factorial problem.

#### 2. fibonacci problem

Let's use the recursive approach to find the `nth` fibonacci term

```ts
const fibonacci = (n: number): number => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};
```

- Time complexity: **O(2^n)**
  > We can conclude that using iterative approach is better than using recessive approach when solving the fibonacci problem.

### Searching Algorithm

In this section we are going to have a look at how we can implement some searching algorithms in typescript.

#### 1. Linear Search

Given an array of numbers and a target element return the index of that element or `-1` if the element does not exists in an array. Here is how we can go about it:

1. loop through elements in an array and compare if the element matches the element at that particular index
2. if it does return the index of that element
3. if the element was not found return `-1`

```ts
function linearSearch(array: number[], ele: number) {
  for (let i = 0; i < array.length; i++) {
    if (ele === array[i]) return i;
  }
  return -1;
}
```

- Time complexity: **O(n)**

#### 2. Binary Search

Given an **sorted** array of elements, find the index of the element in an array and return `-1` if the element does not exists in an array. Here is how the binary search algorithm works.

##### 2.1 Iterative approach

1. find the first and last index
2. if the first and last index are equal return `-1`
3. find the middle index by rounding down the sum of `first` and `last` index after dividing them by `2`.
4. check if the middle element is greater than the element:
   - if it is this means the element is on the left half
     - update the right index to middle index less 1
   - if not this means the element is on the right half
     - update the left index to middle index plus 1

> Note that `Binary Search` algorithm works on sorted arrays.

```ts
function binarySearch(array: number[], ele: number) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) * 0.5);
    if (array[mid] === ele) {
      return mid;
    }
    if (array[mid] > ele) {
      // the element is on the left half
      right = mid - 1;
    } else {
      // the element is on the right half
      left = mid + 1;
    }
  }
  return -1;
}
```

? What if the array is sorted in descending order?
...

1. check if the middle element is less than the element:
   - if it is this means the element is on the left half
     - update the right index to middle index less 1
   - if not this means the element is on the right half
     - update the left index to middle index plus 1

- For that we can do it as follows:

```ts
function binarySearch(array: number[], ele: number) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) * 0.5);
    if (array[mid] === ele) {
      return mid;
    }
    if (array[mid] < ele) {
      // the element is on the left half
      right = mid - 1;
    } else {
      // the element is on the right half
      left = mid + 1;
    }
  }
  return -1;
}
```

- Time complexity: **O(log(n))**

##### 2.2 Recursive approach

We can approach the same problem using the recursive approach by implementing another function called `search` this function does the following:

1. takes in 4 arguments array, element, left index and right index.
2. we find the middle index
3. if the left index is greater than the right index, this means that we don't have an element in that array we return `-1`
4. if not we check if the middle element is equal to the element and return it.
5. if not we check if the middle element is greater than element
   - if this condition sets then which means the element is on the left half
     - we recursively call the `search` with the right index updated
   - else this means that the element is on the right half.
     - we recursively call the `search` with the left index updated.

```ts
const search = (array: number[], ele: number, left: number, right: number) => {
  let mid = Math.floor((left + right) * 0.5);
  if (left > right) return -1;
  if (array[mid] === ele) {
    return mid;
  }
  if (array[mid] > ele) {
    // the element is on the left half
    return search(array, ele, left, mid - 1);
  } else {
    // the element is on the right half
    return search(array, ele, mid + 1, right);
  }
};
function binarySearch(array: number[], ele: number) {
  return search(array, ele, 0, array.length - 1);
}
```

? What if elements are sorted in descending order?

1. if not we check if the middle element is less than element
   - if this condition sets then which means the element is on the left half
     - we recursively call the `search` with the right index updated
   - else this means that the element is on the right half.
     - we recursively call the `search` with the left index updated.

```ts
const search = (array: number[], ele: number, left: number, right: number) => {
  let mid = Math.floor((left + right) * 0.5);
  if (left > right) return -1;
  if (array[mid] === ele) {
    return mid;
  }
  if (array[mid] < ele) {
    // the element is on the left half
    return search(array, ele, left, mid - 1);
  } else {
    // the element is on the right half
    return search(array, ele, mid + 1, right);
  }
};
function binarySearch(array: number[], ele: number) {
  return search(array, ele, 0, array.length - 1);
}
```

- Time complexity: **O(log(n))**

### Sorting Algorithm

In this section we are going to look at some sorting algorithms.

#### 1. Bubble Sort

Given an array of numbers we want to sort them in `ascending` order. Here is how we can do it using the `bubbleSort` algorithm.

1. Keep in track of elements being swapped or not
2. Repeat the loop till swapped value is false
3. If the `left` element is greater than the `right` element we swap the two elements and set the `swapped` to `true`.

```ts
function bubbleSort(ele: number[]) {
  let swapped: boolean = true;
  do {
    swapped = false;
    for (let i = 0; i < ele.length - 1; i++) {
      if (ele[i] > ele[i + 1]) {
        let temp = ele[i];
        ele[i] = ele[i + 1];
        ele[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}
```

Here is the implementation that allows us to order elements in descending order using the `bubbleSort`.

1. If the `left` element is less than the `right` element we swap the two elements and set the `swapped` to `true`.

```ts
function bubbleSort(ele: number[]) {
  let swapped: boolean = true;
  do {
    swapped = false;
    for (let i = 0; i < ele.length - 1; i++) {
      if (ele[i] < ele[i + 1]) {
        let temp = ele[i];
        ele[i] = ele[i + 1];
        ele[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}
```

#### 2. Insertion Sort

Having an array of numbers we want to sort the numbers in either descending or ascending order. Here is how the insertion sort works.

1. The array is split into two arrays a sorted and unsorted array.
2. We assume that the first element in the array is sorted.
3. Select an element in an unsorted array and compare it with the sorted part.
4. If the elements in the sorted array is smaller than the selected we proceed to the next element in the unsorted array else we shift the elements in the sorted part towards the right
5. We insert the selected element at the right index.
6. We repeat the above steps till all the elements are sorted. Let's consider the following visualization.

| -                 | -          | -          |                                     |
| ----------------- | ---------- | ---------- | ----------------------------------- |
| `[-6 20 8 -2 4]`  | `NTI` = 20 | `SE` = -6  | -6 > 20? NO : place 20 to the right |
| `[-6 20 8 -2 4]`  | `NTI` = 8  | `SE` = 20  | 20> 8? YES : Shift 20 the right     |
| `[-6 20 20 -2 4]` | `NTI` = 8  | `SE` = -6  | -6> 8? NO : place 8 the right       |
| `[-6 8 20 -2 4]`  | `NTI` = -2 | `SE` = -20 | 20> -2? YES : Shift 20 to the right |
| `[-6 8 20 20 4]`  | `NTI` = -2 | `SE` = 8   | 8> -2? YES : Shift 8 to the right   |
| `[-6 8 8 20 4]`   | `NTI` = -2 | `SE` = -6  | -6> -2? YES : Shift -6 to the right |
| `[-6 -2 8 20 4]`  | `NTI` = -2 | `SE` = -6  | -6> -2? No : place -2 to the right  |
| `[-6 -2 8 20 4]`  | `NTI` = 4  | `SE` = 20  | 20> 4? Yes : Shift 20 to the right  |
| `[-6 -2 8 20 20]` | `NTI` = 4  | `SE` = 8   | 8> 4? Yes : Shift 8 to the right    |
| `[-6 -2 8 8 20]`  | `NTI` = 4  | `SE` = -2  | -2> 4? No : place 4 to the right    |
| `[-6 -2 4 8 20]`  | -          | -          | -                                   |

- `NTI` - Number to insert.
- `SE` - Sorted element.

> Finally we will have a sorted array `[-6 -2 4 8 20]`. Now let's go and implement this:

```ts
function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    let nti = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > nti) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = nti;
  }
}
```

? What about sorting in descending order?

```ts
function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    let nti = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] < nti) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = nti;
  }
}
```

- Time complexity: **O(n^2)**

#### 3. Quick Sort

- When doing a quicksort first we need to pick up the pivot element.
  - **How do we pick up a pivot?.**
    - first element of an array
    - last element of an array
    - median value as pivot
    - random element as pivot
- When sorting with this algorithm we basically put everything that is smaller than the pivot to the left and to the right if greater.
- we repeat the process till we have an array of length 1. which is sorted by definition.

```ts
function quickSort(arr: number[]) {
  if (arr.length < 2) return arr;
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

The above function returns a sorted array. If we want to sort arrays in place we can do it as follows:

```ts
function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, right);
  return i + 1;
}

function quickSort(
  arr: number[],
  left: number = 0,
  right: number = arr.length - 1
): void {
  if (left < right) {
    const pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
}
```

? What about sorting in descending order?

```ts
function quickSort(arr: number[]) {
  if (arr.length < 2) return arr;
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

To sort in descending order in place you just need to modify the `partition` to

```ts
function partition(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] > pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, right);
  return i + 1;
}
```

- Time complexity: **O(n^2)**

#### 4. Merge Sort

The merge sort works as follows

1. We divide the array into sub arrays with only one element which is considered sorted.
2. We will then merge them together

```ts
function merge(left: number[], right: number[]) {
  const sorted = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }
  return [...sorted, ...left, ...right];
}
function mergeSort(arr: number[]) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
```

? What about sorting in descending order?

```ts
function merge(left: number[], right: number[]) {
  const sorted = [];
  while (left.length && right.length) {
    if (left[0] >= right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }
  return [...sorted, ...left, ...right];
}
function mergeSort(arr: number[]) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
```

- Time complexity: **O(n.log(n))**

#### 5. Stalin Sort

This is a sorting algorithm where an element that us not in order is removed from the list. The elements that are not sorted are moved to the start of the list in the order that they have appeared in the list. This process is repeated until the list is sorted.

```ts
function stalinSort(arr: number[]) {
  let j = 0;
  while (true) {
    let moved = 0;
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        let index;
        let temp;
        index = arr[i];
        temp = arr[i + 1];
        arr.splice(i, 1);
        arr.splice(i, 0, temp);
        arr[i] = temp;
        arr.splice(i + 1, 1);
        arr.splice(i + 1, 0, index);
        arr[i + 1] = index;
        moved++;
      }
    }
    j++;
    if (moved == 0) {
      break;
    }
  }
}
```

- Time complexity: **O(n^2)**

### Miscellaneous

In this section we are going to have a look at some miscellaneous algorithms.

#### 1. Cartesian Product

Given 2 finite non-empty sets find their **Cartesian Product**.

Let's say we have sets `A =[1, 2]` and `B = [1, 2, 3]` their Cartesian Product is `AxB = [[1, 2], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3]]`

```ts
function cartesianProduct(a: number[], b: number[]) {
  const cp: Array<number[]> = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      cp.push([a[i], b[j]]);
    }
  }
  return cp;
}
```

- Time complexity: **O(mn)** - depends on the length of set `A` and `B`

#### 2. Climbing Stairs

Given a staircase of `n` find the number of distinct ways to climb to the top. You can either climb 1 step or 2 steps at a time.

```shell
n = 1 -> [(1)]
n = 2 -> [(1), (2)]
n = 3 -> [(1, 1, 1), (1, 2), (2, 1)]
n = 4 -> [(1, 1, 1, 1), (1, 2, 1), (1 , 1, 2), (2, 1, 1), (2, 2)]
```

We can see from the patten that the number of ways we are getting by adding the `2` previous values eg:

```shell
n = 4 -> 2 + 3
n = 3 -> 2 + 1
```

Where our base case is `1` and `2`

```ts
function climbingStaircase(n: number) {
  const steps = [1, 2];
  for (let i = 2; i <= n; i++) {
    steps.push(steps[i - 1] + steps[i - 2]);
  }
  return steps[n - 1];
}
```

We can do this with recursion as follows:

```ts
function climbingStaircase(n: number) {
  if (n < 3) return n;
  return climbingStaircase(n - 1) + climbingStaircase(n - 2);
}
```

- Time complexity: **O(n)**

#### 3. Tower of Hanoi

The goal is to move the entire stuck from the first rod to the last one abiding the following rules:

1. Only one disk can be moved
2. You only take the upper disk and place it on top of a smaller disk and on an empty rod.
3. No disk should be placed on top of the smaller disk.

**Procedure**

1. Shift `n-1` disk from `A` to `B` using `C` when required.
2. Shift the last disk from `A` to `C`
3. Shift `n-1` disk from `B` to `C` using `A` when required.
4. repeat the process

```ts
function towerOfHanoi(disks: number, _from: string, to: string, using: string) {
  if (disks === 1) {
    console.log(`✔️ Moving 💿 ${disks} from ${_from} to ${to}.`);
    return;
  }
  towerOfHanoi(disks - 1, _from, using, to);
  console.log(`✔️ Moving 💿 ${disks} from ${_from} to ${to}.`);
  towerOfHanoi(disks - 1, using, to, _from);
}
```

- Time complexity: **O(2^n)**

### Algorithm Design Techniques and Terminologies

1. **Brute force** - Simple and exhaustive technique that evaluate every possible outcome to find the best. e.g (Linear Search Algorithm)
2. **Greedy** - Choose the best option at that current time without considering the future e.g (Dijkstra's algorithm, Prim's algorithm and Kruskai's Algorithm)
3. **Divide and Conquer** - Divide a problem into smaller problem and each smaller problem will be solved and the partial solutions are then combined as a single solution. eg (Binary Search, Quick Sort, Merge Sort and Tower of hanoi)
4. **Dynamic Programming** - Divide the problem into smaller sub problems, breaking it down into smaller sub problem. Store the result and reuse it into sub problems. This is called a memorization and optimization technique that improves the time complexity of an algorithm. eg (Fibonacci and Climbing staircase)
5. **Backtracking** - Generates all possible solutions, check if the solution satisfies all the given constraints and only then you proceed with generating subsequent solutions. If the constraints are not satisfied backtrack and go on different path to find the solution. eg (N-Queens) problem.
