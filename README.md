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
interface User{
    id: number,
    name: string
}
type Employee = User & {
email: string
}
const people: (User|Employee)[] = [{id: 1, name: 'Jonh'}, {id: 2, name: 'Peter', email: 'user@gmail.com'}]
```
In this case we can check if the user is an employee by just checking the property "email" in the object as follows:

```ts
people.forEach(person=>{
    if("email" in person){
        // this is an employee
        console.log("I am an employee: ", person.email)
    }else{
        // this will be a regular user
        console.log("I'm a regular user.")
    }
})
```
But now if we want to create a utility function that will check if the person is an `employee` or a regular `user` as follows:

```ts
const isEmployee = (person: User|Employee) => "email" in person
people.forEach(person=>{
    if(isEmployee(person)){
        // this is an employee
        console.log("I am an employee: ", person.email)
    }else{
        // this will be a regular user
        console.log("I'm a regular user.")
    }
})
```
Typescript won't be happy with the return type. We can use the type predicate to predict the return type of this function using `is` and the type that we want to check if it iffers to it as follows:

```ts
const isEmployee = (person: User|Employee): person is Employee => "email" in person

people.forEach(person=>{
    if(isEmployee(person)){
        // this is an employee
        console.log("I am an employee: ", person.email)
    }else{
        // this will be a regular user
        console.log("I'm a regular user.")
    }
})
```
### References

1. [typescriptlang.org](https://www.typescriptlang.org/docs/handbook)
