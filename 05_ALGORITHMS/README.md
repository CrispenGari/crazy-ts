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

### Time and Space Complexity Cheat-Sheet.

The following table contains a cheatsheet for time complexity and space complexity for the `Big-O` notations of code expressions.

| Description                                 | Big-O notation | Type          |
| ------------------------------------------- | -------------- | ------------- |
| Alignment operations and conditional checks | `O(1)`         | `Constant`    |
| Loops                                       | `O(n)`         | `Linear`      |
| Nested loops                                | `O(n^2)`       | `Quadratic`   |
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
