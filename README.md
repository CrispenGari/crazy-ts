### TypeScript and React.

```ts
type User<T> = {
  name: T;
  surname?: T;
};
const user: User<string> = {
  name: "hello world",
};

const main = async () => {
  await console.log(user);
};
main();
```

This ReadMe file contain some TypeScript cool features and React.ts advanced types. This repository is just a mixture of typescript code.

### Generic Types.

1. Array of types.

- It can be an array of numbers, objects, strings, boolean etc.

```ts
const numbers: Array<number> = [1, 2, 3];
const numbers2: number[] = [2, 56, 0.9];
```

We want to create a function that takes a generic type of elements and returns the last element of an array. How do we do that?

```ts
const last = <T>(elements: T[]): T => {
  return elements[elements.length - 1];
};

// By calling a function we can change the generic type T to whatever type we want. For example

last<string>(["hello", "world"]);
/*
By passing string as our type T we are not able to pass anything in the last function except array of strings
*/
```

We want to create a function called `makeArray` that takes two generic types of two elements and return an array of those elements.

```ts
const makeArray = <X, Y>(x: X, y: Y): [X, Y] => {
  return [x, y];
};

/* CALLING THE FUNCTION */

makeArray(2, false);
makeArray<string, number>("hello", 9);
makeArray<string | any, number>(false, 9);
makeArray<string | undefined, number>(undefined, 9);
makeArray<string | undefined, number | null>(undefined, 9);
```

### Working with Objects.

Let's say we have an object that looks as follows:

```js
const user{
    name: string,
    surname: string,
}
```

We want to create a new function that takes this object and returns a new object that looks as follows:

```js
const user{
    name: string,
    surname: string,
    fullName: name + surname
}
```

We can create a function called `makeFullName` that takes a generic type and returns a new object.

```ts
const makeFullName = <T extends { name: string surname: string }>(
  user: T
): T => {
  return {
    ...user,
    fullName: `${user.surname} ${user.name}`,
  };
};
makeFullName({
    surname: "Gari",
    name: "Crispen",
})

/*
When this function is called it expects name and surname to be available in it's object. They are required properties, that why we extends those properties
*/
```

### Interfaces

An interface allows us to define types of our objects. Let's consider an interface `User` that have some properties and we want to be able to create user objects from them.

```ts
interface User {
  name: string;
  surname: string;
  married: boolean | undefined | null;
}
const user1: User = {
  name: "Hello",
  surname: "Word",
  married: false,
};
const user2: User = {
  name: "Hello",
  surname: "Word",
  married: true,
};
```

With interfaces we can create a generic interface.
Let's create a generic interface that allows us to create types from it.

```ts
interface Tabs<X, Y, Z> {
  name: X;
  index: Y;
  focus: Z;
}

type HomeTab = Tabs<string, number, boolean>;
type ProfileTab = Tabs<string, string, boolean>;

const home: HomeTab = {
  name: "Home",
  index: 0,
  focus: true,
};
const profile: ProfileTab = {
  name: "Home",
  index: "0",
  focus: false,
};
console.log(home, profile);
```

The `Tabs` accepts three generic types and allows us to create types from it. So the above code helps us creating `2` types of Tab, with different types for each property.
