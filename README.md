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

### Prop Type React.

We can define what props the component will be receiving. `React.FC` is a generic type that takes props type, which are the props that the component will be using. If we don't pass
`HomeProps` to `React.FC` then typescript wont be happy if we try to destructure props.

```tsx
import React from "react";
import "./main.ts";
interface HomeProps {
  name: string;
  index: number;
}
const Home: React.FC<HomeProps> = ({ name, index, children }) => {
  return (
    <>
      <p>
        {name}: <strong>{index}</strong>
      </p>
    </>
  );
};
const App: React.FC = () => {
  return (
    <div className="app">
      <Home name="Home" index={10} />
    </div>
  );
};
export default App;
```

### Hooks Types

1. `useState<T>()`
   Let's create a simple counter that will change the state when the button is clicked. Using the `useState`hook we can change the counter by doing it as follow:

```ts
import React, { useState } from "react";
import "./main.ts";

interface CounterType {
  count: number;
}
const App: React.FC = () => {
  const [counter, setCounter] = useState<CounterType>({
    count: 0,
  });
  return (
    <div className="app">
      <h1>{counter.count}</h1>
      <button
        onClick={() =>
          setCounter((prev) => ({
            count: prev.count + 1,
          }))
        }
      >
        Increment
      </button>
    </div>
  );
};

export default App;
```

2. `useRef<T>()`
   Let's create a simple application i guess which when we hover over an input element it will trigger the click handler of a button using `useRef()` hook.

```ts
import React, { useRef } from "react";
import "./main.ts";
const App: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const alertMessage = (): void => {
    alert("Hello world");
  };
  return (
    <div className="app">
      <input
        type="text"
        onMouseEnter={() => {
          buttonRef.current?.click();
        }}
      />

      <button ref={buttonRef} onClick={alertMessage}>
        Alert
      </button>
    </div>
  );
};
export default App;
```

**Where did i get the `HTMLButtonElement` type?**. If you are using `VScode` you just hover of the `ref` attribute of the html element that you want to pass reference. By doing so you will be able to see the type.

The `HTMLDivElement` type...

```tsx
const divRef = useRef<HTMLDivElement | undefined>(null);
```

3. `useReducer<T>`

We can think the `useReducer()` hook as a hook that allows us to create state in our react application. Let's create a `counterReducer` that will allow us to update the `count` value in the reducer.

```tsx
import React, { useReducer } from "react";
import "./main.ts";

type Action =
  | {
      type: "INCREMENT";
      value: number;
    }
  | {
      type: "DECREMENT";
      value: number;
    };
interface Counter {
  count: number;
}
type State = Counter;
const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "DECREMENT":
      return (state = { count: state.count - action.value });
    case "INCREMENT":
      return (state = { count: state.count - action.value });
    default:
      return state;
  }
};
const App: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
  });
  return (
    <div className="app">
      <h1>State</h1>
      <code>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </code>
      <button
        onClick={() =>
          dispatch({
            type: "INCREMENT",
            value: 5,
          })
        }
      >
        increment
      </button>
      <br />
      <button
        onClick={() => {
          dispatch({
            type: "DECREMENT",
            value: 4,
          });
        }}
      >
        decrement
      </button>
    </div>
  );
};
export default App;
```
