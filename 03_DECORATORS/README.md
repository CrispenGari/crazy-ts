### Decorators

In this readme we are going to learn how to use and implement decorators in typescript. Decorators in typescript is an experimental feature which is stage `2` decorators. However in stage `3` where typescript is version `5` they expose decorators to us.

> Note that currently decorators works on classes only and we can use decorators on:

1. Class Methods
2. Class Properties
3. Class itself

Okay let's set up the environment and start working with decorators in typescript. We will need to install `typescript` and setup. WE are going to install typescript `5` as follows:

```shell
yarn add -D typescript@next ts-node
```

In our `tsconfig.json` we are going to have the following:

```json
{
  "compilerOptions": {
    "target": "ES2022"
  }
}
```

### Class Decorators

Let's create our first decorator on a class. Let's say we have a class `Animal` that looks as follows:

```ts
class Animal {
  age: number = 0;
  constructor() {
    console.log("Created instance of a class.");
  }
}
const animal = new Animal();
```

Let's say we want to add a property `createdAt` on the class. We can do it in two way. First let's create a decorator that uses a `prototype` to add `createdAt` to our properties of this class:

```ts
@withCreatedAtOnPrototype
class Animal {
  age: number = 0;
  constructor() {
    console.log("Created instance of a class.");
  }
}
const animal = new Animal();
console.log(animal);

function withCreatedAtOnPrototype(value: Function, ctx: ClassDecoratorContext) {
  value.prototype.createdAt = new Date();
}
```

> Note that the above decorator will add createdAt property at the prototype of the class.

Option number `2` we can create a `withTableName` decorator function that will at a property `tableName` to our class as follows:

```ts
@withTableName
class Animal {
  age: number = 0;
  constructor() {
    console.log("Created instance of a class.");
  }
}
const animal = new Animal();
console.log(animal);

function withTableName<T extends { new (...args: any[]): {} }>(
  baseClass: T,
  ctx: ClassDecoratorContext
) {
  return class extends baseClass {
    tableName = ctx.name;
    constructor(...args: any[]) {
      super(args);
    }
  };
}
```

Suppose we want our `withTableName` decorator to take some values and these values we are going to initialize the the class propeties. We are going to use something called `Decorator Factories` which is a function that returns a decorator function. Here is how it will look:

```ts
@withTableName({
  createdAt: new Date(),
  name: "animals",
})
class Animal {
  age: number = 0;
  constructor() {
    console.log("Created instance of a class.");
  }
}
const animal = new Animal();
console.log(animal);

interface MT {
  name?: string;
  createdAt?: Date;
}
function withTableName(_args?: MT) {
  return function <T extends { new (...args: any[]): {} }>(
    baseClass: T,
    ctx: ClassDecoratorContext
  ) {
    return class extends baseClass {
      tableName = _args.name ? _args.name : ctx.name;
      createdAt = _args.createdAt;
      constructor(...args: any[]) {
        super(args);
      }
    };
  };
}
```

This will yield:

```shell
Animal {
  age: 0,
  tableName: 'animals',
  createdAt: 2024-01-23T06:09:55.181Z
}
```

Let's create a decorator function that will print some class data. We can do it as follows:

```ts
@printDecoratorData
class Animal {
  age: number = 0;
  constructor() {
    console.log("Created instance of a class.");
  }
}
const animal = new Animal();
console.log(animal);

function printDecoratorData(value: Function, ctx: ClassDecoratorContext) {
  console.log("value:");
  console.log(value);
  console.log("ctx: ");
  console.log(ctx);
  ctx.addInitializer(() => {
    console.log("Initialized class " + ctx.name);
  });
}
```

So the `ctx.addInitializer` method is going to be called before the constructor has been called.

### Field decorators

Let's create a decorator function that will decorate some fields in our class. We are going to create a decorator function `withColors` that will add colors to our `colors` property of an animal.

```ts
class Animal {
  @withColors
  colors: string[] = [];
}
const animal = new Animal();
console.log(animal);

function withColors<T, V extends string[]>(
  target: undefined,
  ctx: ClassFieldDecoratorContext<T, V>
) {
  return function (args: V) {
    args.push(...["black", "white", "brown"]);
    return args;
  };
}
```

> Note that we still have the context which contains some important propeties of the class field. Here is another example where we can pass a values to our `withColors` decorator function:

```ts
class Animal {
  @withColors("red")
  @withColors(["blue", "pink"])
  colors: string[] = [];
}
const animal = new Animal();
console.log(animal);

function withColors(_args?: string | string[]) {
  return function <T, V extends string[]>(
    target: undefined,
    ctx: ClassFieldDecoratorContext<T, V>
  ) {
    return function (args: V) {
      if (typeof _args === "string") {
        args.push(_args);
      } else {
        args.push(..._args);
      }
      return args;
    };
  };
}
```

The above will yield:

```ts
Animal { colors: [ 'red', 'blue', 'pink' ] }
```

### Method Decorators

Method decorators works on class methods. Let's create a class called `Project` that we are going to decorate with a decorator `withBudget()` note that the idea is to invoke the function when the budget does not exceeds what we have as budget. We can do it as follows:

```ts
class Project {
  budget: number = 900;
  @withBudget(10)
  writeTests() {
    console.log("Tests are important!!!");
  }

  @withBudget(500)
  fixBugInProduction() {
    console.log("Fixing bug in production ....");
  }
}

const project = new Project();
project.fixBugInProduction();
project.fixBugInProduction();

function withBudget(actionBudget: number) {
  return function <T extends { budget: number }>(
    target: Function,
    ctx: ClassMethodDecoratorContext<T>
  ) {
    return function (...args: any) {
      const instance = this as T;
      if (instance.budget > actionBudget) {
        instance.budget = instance.budget - actionBudget;
        target.apply(instance, args);
      } else {
        console.error(
          `Insufficient budget for ${ctx.name.toString()}. Required ${actionBudget}, available ${
            instance.budget
          }`
        );
      }
      return target;
    };
  };
}
```

### Accessor Decorators

> An Accessor Decorator is declared just before an accessor declaration. The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions.

```ts
class Test {
  @watchChange
  accessor description: string = "Testing...";
}

const test = new Test();
test.description = "Hey there";
console.log({ dec: test.description });
console.log(test);

function watchChange<T, V>(
  accessor: {
    get: (this: T) => V;
    set: (this: T, v: V) => void;
  },
  ctx: ClassAccessorDecoratorContext<T, V>
) {
  return {
    get: function (this: T) {
      return accessor.get.call(this);
    },
    set: function (this: T, value: V) {
      console.log(`setting ${ctx.name.toString()} to: ${value}`);
      accessor.set.call(this, value);
    },
  };
}
```

### Params Decorators

These are decorators that works on the parameters of a function within a class. With params decorators you should use experimental decorators from stage 2. Modify your `tsconfig.json` to

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Here is how we use it. Let's say we have a class called `Cat` and in this class we want to print the parameters that is decorated using the `logParamDec` decorator in the class method `me`. WE can do it as follows:

```ts
class Cat {
  me(@logParamDec name: string, age: number) {
    console.log(`I am ${name} and ${age} is my age `);
  }
}

const cat = new Cat();
cat.me("jonh", 4);

function logParamDec(
  target: Object,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("target:");
  console.log(target);
  console.log("propertyKey:");
  console.log(propertyKey);
  console.log("parameterIndex:");
  console.log(parameterIndex);
}
```

We will get the following in the console.

```shell
target:
{}
propertyKey:
me
parameterIndex:
0
I am jonh and 4 is my age
Done in 1.69s.

```

### Refs

1.  https://www.typescriptlang.org/docs/handbook/decorators.html
2.  https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators
