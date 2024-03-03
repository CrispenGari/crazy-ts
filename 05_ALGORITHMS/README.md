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
