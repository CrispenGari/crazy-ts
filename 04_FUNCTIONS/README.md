#### Functions and Functional Programming

In this readme we are going to learn how functions works and functional programming concept.

1. Defining a function

```ts
function user(name: string, age: number = 9) {
  return `${name}: ${age}`;
}
```

You can call the above function in `3` ways.

```ts
// this way
console.log(user.apply(null, ["hi"]));
// OR
console.log(user("hi"));

// OR

console.log(user.call(null, "hello"));
```

> Note: Unlike the `apply` the `call` method takes in the rest of the arguments as they are whilst the `apply` expects arguments to be an iterable.

You can convert a function to a string version by calling a `.toString()` method as follows:

```ts
console.log(user.toString());
```

You can check the number of required parameters of a function by calling the `.length` property as follows

```ts
console.log(user.length); // 1
```

You can call the `.name` to check the name of the function

```ts
console.log(user.name); // user
```

let's say we have an object `me` that has a function called `getName` that returns that property `name` in the same object. Creating a `unboundGetName` and calling it will result in `undefined` or an error saying:

```shell
Cannot read properties of undefined (reading 'name')
```

This is because the `unboundGetName` does not have access to the `this` that we are calling in that object.

```ts
const me = {
  name: "Jonh",
  getName: function () {
    return this.name;
  },
};
const unboundGetName = me.getName;
console.log(unboundGetName());
```

To solve this issue we can call the `.bind()` method on our method so that it can get exposed to the `this` keyword in `me`

```ts
const boundGetName = me.getName.bind(me);
console.log(boundGetName()); // John
```

Let's say we have a class `hi` that takes in age as a number. And we want to do method chaining on this class object. we can do it as follows

```ts
class hi {
  constructor(public age: number) {}
  addOne() {
    this.age += 1;
    return this;
  }
  getDOB() {
    return new Date().getFullYear() - this.age;
  }
}
const h = new hi(24);
console.log(h.addOne().addOne().getDOB());
```

> Note that all the instances that we are chaining on returns the keyword `this`.
