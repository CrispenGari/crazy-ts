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

### Unions.

Joining types in typescript.

The `|` operator. **This is an or operator which allows us to create a type from either one or another.**

```ts
interface User {
  username: string;
  password: string;
}
interface Profile {
  username: string;
  photoUrl: string;
}

type UserProfile = User | Profile;
const ourUser: UserProfile = {
  username: "",
  photoUrl: "",
};
```

Similar this is the same as saying:

```ts
const user: undefined | string | number | null | boolean;
```

We can use more than one type. So the above expression is saying a user is of type string, undefined , number, null or boolean.

The `&` operator. **This operator allows us to join two types together.** Example:

```ts
interface User {
  username: string;
  password: string;
}
interface Profile {
  username: string;
  photoUrl: string;
}

type UserProfile = User & Profile;
const ourUser: UserProfile = {
  username: "",
  photoUrl: "",
  password: "",
};
```

- TypeScript is happy with the creation of `ourUser` which has all the property of both `User` and `Profile`. **Note that the `User` type and `Profile` type have both username property which is a string so when we join the two types we only pass username of one type since they are duplicate properties.**

### Utility Types

1.  `Partial<Type>` and `Required<Type>`

Let's say we have a type `User` which looks as follows:

```ts
type User = {
  username: string;
  email: string;
  password: string;
};
```

To create a new user object of type `user` this means all the properties of the objects are required in-order for typescript to be our friend. So creating a user will require all the properties as follows:

```ts
const user: User = {
  email: "email@gamil.com",
  password: "password",
  username: "hello",
};
```

Let's say in our program we decided to make a user with optional properties for that we can use `Partial` built in type to wrap our `User` type to make all the field be optional as here is an example:

```ts
const user: Partial<User> = {
  email: "email@gamil.com",
  password: "password",
};
```

So the `Partial` type generate the following new type on the `User` type.

```ts
type User = {
  username?: string;
  email?: string;
  password?: string;
};
```

The `Required` is the reverse of `Partial` in the sense that it makes all properties of an object to be `required`

```ts
type User = {
  username?: string;
  email?: string;
  password?: string;
};

...
const user: Required<User> = {
    email: "email@gamil.com",
    password: "password",
    username: 'hello'
};
```

The new `User` type will be generated and it will look as follows

```ts
type User = {
  username: string;
  email: string;
  password: string;
};
```

2. `Readonly<T>`

Let's say we created an object `user` and make it `Readonly` this tells typescript that in this object's values won't be modified.

```ts
const user: Readonly<User> = {
  email: "email@gamil.com",
  password: "password",
  username: "hello",
};
```

If you try to change the email of the user for example `user.email = ''` then typescript will cry with the following error:

```shell
Cannot assign to 'email' because it is a read-only property.
```

3. `Record<Keys, Type>`

Record allows us to create an object with keys and values as types. Let's take a look at the following example:

```ts
type User = {
  username: string;
  email: string;
  password: string;
};

type Users = "user1" | "user2" | "user3" | "user4";
const users: Record<Users, User> = {
  user1: {
    email: "user1@gmail.com",
    password: "user1@gmail.com",
    username: "user1@gmail.com",
  },
  user2: {
    email: "user2@gmail.com",
    password: "user2@gmail.com",
    username: "user2@gmail.com",
  },
};
```

> Keys can only be one of the union values `Users` and values will be of type `User`.

4. `Pick<Type, Keys>`

Pick allows us to select the properties that we want in our object. Let's create a new object `user` and this user should only have `email` and `password`. We can do it as follows:

```ts
type User = {
  username: string;
  email: string;
  password: string;
};

const user: Pick<User, "email" | "password"> = {
  email: "hello@gmail.com",
  password: "password",
};
console.log({ user });
```

5. `Omit<Type, Keys>`

Just like pick this is the opposite, it allows us to ommit the properties that are selected from a type. Let's create a user of type `User` with no `username` property

```ts
type User = {
  username: string;
  email: string;
  password: string;
};

const user: Omit<User, "username"> = {
  email: "hello@gmail.com",
  password: "password",
};
console.log({ user });
```

6. `Exclude<UnionType, ExcludedMembers>`

Constructs a type by excluding from `UnionType` all union members that are assignable to `ExcludedMembers`.

```ts
type UsernameOrPassword = Exclude<"username" | "email" | "password", "email">;

const email: UsernameOrPassword = "password";
```

7. `Extract<Type, Union>`

This is the opposite of `Exclude`, it allows us to extract a union from the one that are available rather than excluding them

```ts
type UsernameOrPassword = Extract<"username" | "email" | "password", "email">;

const email: UsernameOrPassword = "email";
```

8. `NonNullable<Type>`

Construct a type by removing `null` & `undefined` from a type:

```ts
type T = NonNullable<number | undefined | null | string | []>;

// type T = string | number | []
```

9. `ReturnType`

Create or generated a type on return type of a function. Let's say we have a function that looks as follows:

```ts
const getUser = () => {
  return {
    username: "username",
    id: 1,
    email: "username@gmail.com",
    age: 19,
  };
};

type GetUserType = ReturnType<typeof getUser>;
```

Therefore `GetUserType` will be:

```ts
type GetUserType = {
  username: string;
  id: number;
  email: string;
  age: number;
};
```

10. `Uppercase`
    Construct a layer on top of a primitive type `string` and make sure that all characters in the string are `uppercase`.

```ts
type T = Uppercase<string>;
const a: T = "HELLO";
```

> There's also `Lowercase<StringType>`, `Capitalize<StringType>` and `Uncapitalize<StringType>`

You can look at more utility types [here](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)

### Type Predicates

Let's say we have 2 types a User and an Employee and they looks as follows:

```ts
interface User {
  id: number;
  name: string;
}
type Employee = User & {
  email: string;
};
const people: (User | Employee)[] = [
  { id: 1, name: "Jonh" },
  { id: 2, name: "Peter", email: "user@gmail.com" },
];
```

In this case we can check if the user is an employee by just checking the property "email" in the object as follows:

```ts
people.forEach((person) => {
  if ("email" in person) {
    // this is an employee
    console.log("I am an employee: ", person.email);
  } else {
    // this will be a regular user
    console.log("I'm a regular user.");
  }
});
```

But now if we want to create a utility function that will check if the person is an `employee` or a regular `user` as follows:

```ts
const isEmployee = (person: User | Employee) => "email" in person;
people.forEach((person) => {
  if (isEmployee(person)) {
    // this is an employee
    console.log("I am an employee: ", person.email);
  } else {
    // this will be a regular user
    console.log("I'm a regular user.");
  }
});
```

Typescript won't be happy with the return type. We can use the type predicate to predict the return type of this function using `is` and the type that we want to check if it iffers to it as follows:

```ts
const isEmployee = (person: User | Employee): person is Employee =>
  "email" in person;

people.forEach((person) => {
  if (isEmployee(person)) {
    // this is an employee
    console.log("I am an employee: ", person.email);
  } else {
    // this will be a regular user
    console.log("I'm a regular user.");
  }
});
```

### Advanced TS

In this section of the readme we are going to document some advanced typescript features that every developer must know.

### When to use generics?

Generics are used when you don't know what type can be passed to a function or you have some logic in that function that rely on knowing that type. Let's take a look at the following example suppose we have a function that takes in argument of type `Animal` or `Human` and print the display name of that item we could do it this way:

```ts
interface Animal {
  name: string;
}
interface Human {
  firstName: string;
  lastName: string;
}

const getDisplayName = <ItemType extends Animal | Human>(item: ItemType) => {
  if ("name" in item) {
    return {
      animalName: item.name,
    };
  }
  return { personName: item.firstName };
};

const res1 = getDisplayName({ name: "hi" });
const res2 = getDisplayName({ firstName: "jonh", lastName: "doe" });
```

But the return type for `res1` and `res2` is a union that looks as follows:

```ts
const res1|res2:
  | {
      animalName: string;
      personName?: undefined;
    }
  | {
      personName: string;
      animalName?: undefined;
    };
```

We can infer the return type of this function using the `extends` keyword as follows

```ts
const getDisplayName = <ItemType extends Animal | Human>(
  item: ItemType
): ItemType extends Human
  ? {
      personName: string;
    }
  : { animalName: string } => {
  if ("name" in item) {
    return {
      animalName: item.name,
    };
  }
  return { personName: item.firstName };
};

const res1 = getDisplayName({ name: "hi" });
const res2 = getDisplayName({ firstName: "jonh", lastName: "doe" });
```

Now the return types for each one will change to:

```ts
const res1: {
  animalName: string;
};
// and
const res2: {
  personName: string;
};
```

### Removing a union member in Ts

In the following example we are going to demostrate how to remove a union member in ts. Let's say we have a union that contains `"car" | "dog" |"bike"` and let's say we want to remove a `dog` from this union we can do it as follows.

```ts
type ItemType = "car" | "dog" | "bike";
type RemoveDog<TType> = TType extends "dog" ? never : TType;
type ObjectsType = RemoveDog<ItemType>;
```

This process is known as distributivity. ObjectType will contain `"car" | "bike"`. We can return a union type like `"car" | "bike" | "bus" | "truck"` from the `ItemType` by changing `never` to `bus | truck` as follows:

```ts
type ItemType = "car" | "dog" | "bike";
type RemoveDog<TType> = TType extends "dog" ? "bus" | "truck" : TType;
type ObjectsType = RemoveDog<ItemType>;
```

### React Props to a component

Let's say we have a component called `Avatar` that takes in color as prop of type `"red"|"green"` you also want this component to accept other colors that are string. We can do it as follows:

```tsx
type Color = "red" | "green";
interface AProps {
  color: Color;
}
const Avatar = (props: AProps) => <></>;
const App = () => {
  return (
    <>
      <Avatar color="red" />
    </>
  );
};
export default App;
```

If we were to say `type Color = "red" | "green" | string` we will lose the auto completion and if we remove the `string` we will only be able to pass either `green` or `red`. So to get around this we change our type Color to:

```ts
type Color = "red" | "green" | Omit<string, "red" | "green">;
```

With this type we can pass either `"red" | "green"` or an string. We can futher on create a type wrapper

```ts
type AutoComplete<T extends string> = T | Omit<string, T>;
type Color = AutoComplete<"red" | "green">;
```

### Dynamic Function Arguments

Let's say we have a type called `Event` with allows the user to `LOGIN` or `LOGOUT` with optional payload we can do it as follows:

```ts
type EventType = { type: "LOGIN"; payload: { id: 1 } } | { type: "LOGOUT" };
const sendEvent = (e: EventType["type"], payload?: any) => {};

sendEvent("LOGOUT");
sendEvent("LOGIN");
```

But we are sending `LOGIN` with no payload of which it should be sent when calling this `sendEvent` function. The reason is because in our function payload is `optional` we can fix this by doing this:

```ts
type EventType =
  | { type: "LOGIN"; payload: { id: number } }
  | { type: "LOGOUT" };

const sendEvent = <Type extends EventType["type"]>(
  ...args: Extract<EventType, { type: Type }> extends {
    payload: infer TPayload;
  }
    ? [Type, TPayload]
    : [Type]
) => {};

sendEvent("LOGOUT");
sendEvent("LOGIN", { id: 5 });
```

Here we are infering the type from the args that we will get. If there is payload in the args we extract it otherwise we are only going to get a type. But you will nortice that our `sendEvent` function will take `args_1` and `args_2` of which you don't want. We can use named `tuple` for our `Type` and `TPayload` as follows:

```ts
type EventType =
  | { type: "LOGIN"; payload: { id: number } }
  | { type: "LOGOUT" };

const sendEvent = <Type extends EventType["type"]>(
  ...args: Extract<EventType, { type: Type }> extends {
    payload: infer TPayload;
  }
    ? [type: Type, payload: TPayload]
    : [type: Type]
) => {};

sendEvent("LOGOUT");
sendEvent("LOGIN", { id: 5 });
```

### "noUncheckedIndexedAccess"

This is a typescript compiler option that allows us to check for indexed access. Let's say we have an object that looks as follows:

```ts
const data: Record<string, number[]> = {};
data.hi.push(2, 3, 5);
```

This should result in an error because we don't have a `hi` property in the object. But the compiler can not pick it up. We can change our compiler options to:

```json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    ...
  }
}
```

By adding this option typescript will show errors when we try that operation. We can solve this as follows:

```ts
const data: Record<string, number[]> = {};
if (!data.hi) {
  data.hi = [];
}
data.hi.push(2, 3, 5);
```

### TypeScript Globals

### Decode Search Parameters

### `extends` to constrain generics

We can use the `extends` to to constrain generics. Let's say we have an object that user, and in this user we want to get a value using a method called `getDeepValue`

```ts
const user = {
  id: 1,
  username: "hi",
  profile: { avatar: "hi.jpg" },
  address: { country: "za" },
};

const getDeepValue = <Obj, Key1, Key2>(
  Obj: Obj,
  firstKey: Key1,
  secondKey: Key2
) => ({} as any);
const res = getDeepValue(user, "profile", "avatar");
```

Here the result is of type `any` and we don't get auto completion. We can solve this issue by doing it as follows.

```ts
const getDeepValue = <
  Obj,
  Key1 extends keyof Obj,
  Key2 extends keyof Obj[Key1]
>(
  obj: Obj,
  firstKey: Key1,
  secondKey: Key2
): Obj[Key1][Key2] => ({} as any);

const res = getDeepValue(user, "profile", "avatar");
```

Now we will be able to get `auto-completion` and the `res` will be type-safe.

### Function Overloads

In this section we are going to have a look at how we can do functional over-loading in typescript.

```ts
function compose<Input, FirstArg>(
  func: (input: Input) => FirstArg
): (input: Input) => FirstArg;

function compose<Input, FirstArg, SecondArg>(
  func: (input: Input) => FirstArg,
  fun2: (input: FirstArg) => SecondArg
): (input: FirstArg) => SecondArg;

function compose<Input, FirstArg, SecondArg, ThirArg>(
  func: (input: Input) => FirstArg,
  fun2: (input: FirstArg) => SecondArg,
  func3: (input: SecondArg) => ThirArg
): (input: SecondArg) => ThirArg;

function compose(...args: any[]) {
  return {} as any;
}

const addOne = (a: number) => a + 1;
const toStrng = (a: number) => a.toString();
const toNumber = (a: string) => Number(a);

const res1 = compose(addOne); // number
const res2 = compose(addOne, toStrng); // string
const res3 = compose(addOne, toStrng, toNumber); // number
```

1. The first signature takes in an input and a function and returns that function
2. The second function takes a previous input which is a function and return another function

> **Note**: All the function that will be overloaded should be exported or not exported at all. Meaning that you can not export 1 of them and leave others, if you decide to export 1 export all of them.

### Extracting React Props

In react sometime we will want to extract components props. Suppose we have a class-based and functional based components. And from these components we want to extract prop types we can do it as follows.

```ts
import React from "react";

class CBC extends React.Component<{ userId: number; name: string }> {
  render(): React.ReactNode {
    return null;
  }
}
type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : TComponent extends React.Component<infer Props>
  ? Props
  : never;

const FBC = (props: { enabled: boolean }) => null;
const props: PropsFrom<typeof FBC> = {
  enabled: true
};
const props2: PropsFrom<typeof CBC> = {userId: 6; name: 'hi'};
```

We created a type helper `PropsFrom` that allows us to extract the props from our components.

### Getting Object Keys

In javascript we use the `object.keys()` function to get the keys of an object. Let's say we have the following user object and we want to iterate through the object keys and print it's value. We can do it as follows in javascript:

```ts
const user = { name: "hi", age: 10, id: 5 };
Object.keys(user).forEach((key) => console.log(user[key]));
```

But in typescript we can create our own `objectKeys` function that will be typesafe as follows:

```ts
const user = { name: "hi", age: 10, id: 5 };
const objectKeys = <Obj extends Object>(ob: Obj): (keyof Obj)[] => {
  return Object.keys(ob) as (keyof Obj)[];
};
objectKeys(user).forEach((key) => console.log(user[key]));
```

### Generics in React Components

In this section we are going to use generics in React-componets. Let's say we have a component `Table` and this component takes in the `renderItem` component and `items` as props.

```tsx
import React from "react";
interface TProps<TItem> {
  items: Array<TItem>;
  renderItem: (item: TItem) => React.ReactNode;
}
function Table<TItem>(props: TProps<TItem>) {
  return null;
}
const App = () => {
  return (
    <>
      <Table
        items={[{ id: "2", name: "hey" }]}
        renderItem={(item) => <p>{item.id}</p>}
      />
    </>
  );
};

export default App;
```

By making the `TProps` to accept generics we can be able to type safely render our item as follows.

### Removing Object Keys

In the following example we are going to learn how to remove `object-keys` and still remain typesafe. We want to remove the `password` in the `user` object. We can do it as follows:

```ts
const user = { name: "hi", age: 10, id: 5, password: "pass" };
const removeKeys =
  <Key extends string>(keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };
const keyRemover = removeKeys(["password"]);
const safe = keyRemover(user);
```

> So remove keys takes in an array of strings and returns a function which omits the specified keys in an object.

### Building TS Libraries

You can use the `preconstruct` CLI to fix the packages.json for you before you publish your npm/yarn package. All you have to do is to install the `cli` by running the following command:

```shell
yarn add --dev @preconstruct/cli
```

Then you can fix the `package.json` by running the following command.

```shell
yarn preconstruct fix
```

After that you can build your `package` by running the command:

```shell
yarn preconstruct build
```

You can add the `build` command in the `package.json` file as follows:

```json
{
  "scripts": {
    "build": "yarn preconstruct build"
  }
}
```

> You can read more: https://github.com/preconstruct/preconstruct

### Literal Types

Declaring and assigning variable with a keyword `let` allows the variable to chance. However if you use the `const` keyword the variables will not change. This works perfect with primitive type. But with arrays the following variables that we are trying to modify.

```ts
let age = 20;
const name = "hey";

const names = ["marry", "jonh", "petter"];
names[0] = "heys"; // ts is happy
const user = {
  id: 3,
  name: "hello",
  age: 16,
  gender: "m",
  isHappy: true,
};
user.isHappy = false; // ts is also happy
```

If we don't want to allow change of values of arrays and object we can then cast to `const` as follows;

```ts
const names = ["marry", "jonh", "petter"] as const;
const user = {
  id: 3,
  name: "hello",
  age: 16,
  gender: "m",
  isHappy: true,
} as const;
```

This will result in `readonly` properties for our object and array. Here are the type output for each variable:

```ts
const names: readonly ["marry", "jonh", "petter"];
const user: {
  readonly id: 3;
  readonly name: "hello";
  readonly age: 16;
  readonly gender: "m";
  readonly isHappy: true;
};
```

### Index Access Types

Let's say we have the following types:

```ts
type Role = ["Admin", "User", "Super-User"];

interface Colors {
  primary: "primary";
  secondary: "secondary";
  tertiary: "tertiary";
}

interface UserRole {
  user: ["view", "create", "update"];
  superAdmin: ["view", "create", "update", "delete"];
}
```

We can extract the types from the above types using the power of indexed access types as follows:

```ts
type AdimOrUser = Role[0 | 1]; // type AdimOrUser = "Admin" | "User"
type AllRoles = Role[number]; // type AllRoles = "Admin" | "User" | "Super-User"

type PrimaryColor = Colors["primary"]; // type PrimaryColor = "primary"
type NonPrimaryColor = Colors["secondary" | "tertiary"]; // type NonPrimaryColor = "secondary" | "tertiary";
type AllColors = Colors[keyof Colors]; // type AllColors = "primary" | "secondary" | "tertiary"

type Roles = UserRole[keyof UserRole][number]; // type Roles = "view" | "create" | "update" | "delete"
```

### Fixing Objects with infer and template literals

Let's say our `API` is returning the following type:

```ts
interface ApiData {
  "maps:longitude": string;
  "maps:latitude": string;
}
```

We want to fix this so that this type will look as follows:

```ts
type DesiredShape = {
  longitude: string;
  latitude: string;
};
```

First we are going to create a type helper called `RemoveMaps` which takes a generic T and extends to a `maps:{string}` but we want to infer the rest of the string after `maps:` so we will infer it's type as `U` this is done as follows:

```ts
type RemoveMaps<T> = T extends `maps:${infer U}` ? U : T;
```

Now we can create `RemoveMapsFromObj` helper type again that takes another generic `T` and pair the keys of the type with their respective type. We will then cast the keys `K` using the `RemoveMaps<T>` as follows and then we will get the desired type output in `DesiredShape` type.

```ts
type RemoveMapsFromObj<T> = {
  [K in keyof T as RemoveMaps<K>]: T[K];
};

type DesiredShape = RemoveMapsFromObj<ApiData>;
```

### Turning Module to Type

Let's say we have a file that contains some constants and this file is called `constants.ts` and have the following constants in it:

```ts
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const EDIT_TODO = "EDIT_TODO";
```

Our goal is to convert this in a union typescript type as follows. In our index.ts we are going to have the following:

```ts
export type ActionModule = typeof import("./constants");
```

This will yield the following:

```ts
const actions: ActionModule = {
  ADD_TODO: "ADD_TODO",
  EDIT_TODO: "EDIT_TODO",
  REMOVE_TODO: "REMOVE_TODO",
};
```

We can convert this to a union type as follows:

```ts
type ActionType = ActionModule[keyof ActionModule];
```

This will yield the following union type

```ts
type ActionType = "ADD_TODO" | "EDIT_TODO" | "REMOVE_TODO";
```

### Extracting Type from keys that starts with `a`

Let's say we want to get the union type from an object type whose key starts with a. We can do it as follows:

```ts
type Obj = {
  a: "0";
  a1: "1";
  a2: "2";
  b: "0";
  b1: "1";
  b2: "2";
};
type ValueOfKeysStartingWithA<T> = {
  [K in Extract<keyof T, `a${string}`>]: T[K];
}[Extract<keyof T, `a${string}`>];

type NewUnion = ValueOfKeysStartingWithA<Obj>;
```

This will yield `type NewUnion = "0" | "1" | "2"` however we are repeating our self in the helper type `ValueOfKeysStartingWithA` when we are saying "Extract<keyof T, `a${string}`>" We can solve this as follows:

```ts
type ValueOfKeysStartingWithA<
  T,
  _ExtractedKeys extends keyof T = Extract<keyof T, `a${string}`>
> = {
  [K in _ExtractedKeys]: T[K];
}[_ExtractedKeys];
type NewUnion = ValueOfKeysStartingWithA<Obj>;
```

We are giving `ValueOfKeysStartingWithA` 2 generics `T` and `_ExtractKeys` T being the type of the object that we are trying to extract values from and `_ExtractKeys` having a default type of **\_Extract<keyof T, `a${string}`>**.

### Assertion Functions

Let's say we are having a class called `AuthManager` in this class a contructor function takes in a `jwt` token which is a string or `undefined`.

```ts
export class AuthManager {
  constructor(public jwt?: string) {}
  createPost = (jwt: string, title: string) => {
    this.assertIsAuth();
    this.createPost(this.jwt, tittle);
  };
  assertIsAuth() {
    if (!!!this.jwt) throw new Error("You are not authenticated.");
  }
}
```

When we create a method `assertIsAuth` we make sure that it checks if the token is defined as a string. Meaning that when we call ` this.assertIsAuth();` in the createPost method won't be happy with this. So to so `this.jwt` will be defined as string. However `this.jwt` is possibly undefined though we call ` this.assertIsAuth();` first before we call createPost. We can solve this issue by changing our `assertIsAuth` method to:

```ts
export class AuthManager {
  constructor(public jwt?: string) {}
  createPost = (jwt: string, title: string) => {
    this.assertIsAuth();
    this.createPost(this.jwt, title);
  };
  assertIsAuth(): asserts this is this & { jwt: string } {
    if (!!!this.jwt) throw new Error("You are not authenticated.");
  }
}
```

### Deep Partials

In this section we are going to create a helper type that allows us to create partials in a deep object. Reason for this is because if you will use typescript utility `Partial` it only go one level. But with the following helper type we can create partials for even deeper object.

```ts
type DeepPartial<Thing> = Thing extends Function
  ? Thing
  : Thing extends Array<infer InferredArrayMember>
  ? DeepPartial<InferredArrayMember>
  : Thing extends object
  ? DeepPartial<Thing>
  : Thing | undefined;

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
type DeepPartialObject<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

interface Post {
  id: string;
  meta: { name: string; desc: string };
  comments: { text: string }[];
}

const post: DeepPartial<Post> = {
  id: "1",
};
```

### Custom Errors

Let's say we have a function that compares to parameters if there are equal. And this functions throws an error if one of the args is of type array. We can do it as follows:

```ts
const compare = <T>(a: T, b: T): boolean => {
  if (Array.isArray(a) || Array.isArray(b))
    throw new Error("You can not compare two arrays.");
  return a === b;
};

compare(1, 1);
compare([], []);
```

This will work, as the function will throw an error at runtime. We can take this to a compiler level so that it won't accept array arguments by creating another helper `CheckForArgs` and modify our function to:

```ts
type CheckForArgs<T> = T extends Array<any>
  ? "You can not compare two arrays."
  : T;

const compare = <T>(a: CheckForArgs<T>, b: CheckForArgs<T>): boolean => {
  if (Array.isArray(a) || Array.isArray(b))
    throw new Error("You can not compare two arrays.");
  return a === b;
};

compare(1, 1);
compare([], []); // Error: Argument of type 'never[]' is not assignable to parameter of type '"You can not compare two arrays."'.
```

### References

1. [typescriptlang.org](https://www.typescriptlang.org/docs/handbook)
