### Classes and Objects in TypeScript

In this readme file we are going to learn some concepts about `OOP` in typescript.

### Defining a class as a Type

In the following example we are going to define a class `Animal` and in this class we are going to make it a type.

```ts
class Animal {
  public name!: string;
  public age!: number;
}

const animal: Animal = {
  age: 20,
  name: "Kudu",
};
```

By using the `!` after the class property member we are telling typescript that a constructor member is not required for these properties. Now we have our type `Animal`. The type `Animal` and it's property can also be declared using access modifiers like `readonly`. Not that we can not use `private` and `protected` because `private` members can not be accessed outside the class and also protected members can only be accessed with the classes that are inheriting from the base class with protected members:

```ts
class Animal {
  readonly name!: string;
  readonly age!: number;
}
```

We can make our type `readonly` and public at the same time as follows:

```ts
class Animal {
  public readonly name!: string;
  public age!: number;
}

const animal: Animal = {
  age: 20,
  name: "Kudu",
};
animal.age = 16;
animal.name = "Cat"; // not allowed because it's read only
console.log({ animal });
```

Without telling typescript that we know about the properties of this class animal that it will be initialized using the `!`, a constructor method is required. Here is how we are defining a class with property members being initialized in a constructor method:

```ts
class Animal {
  name: string;
  age: number;
  domestic: boolean;
  constructor(name: string, age: number, domestic: boolean) {
    this.name = name;
    this.age = age;
    this.domestic = domestic;
  }
}
const animal = new Animal("Kudu", 23, false);
```

Alternatively you can use access modifies to get out of the error trap in the constructor method for example the above class can be modified to:

```ts
class Animal {
  constructor(
    public name: string,
    readonly age: number,
    private readonly domestic: boolean
  ) {
    this.name = name;
    this.age = age;
    this.domestic = domestic;
  }
}
```

Also if you don't want to initialize members in a constructor, you will have to give the default valued to your properties as follows:

```ts
class Animal {
  name: string = "Kudu";
  age: number = 20;
  domestic: boolean = false;
}
const animal = new Animal();
```

Not that by default class members are always have a public modifier.

### Class Methods

In the following example we are going to work on creating class methods in typescript. Let's create a class method that will print the `json` string in the console by calling it on the `animal` object:

```ts
class Animal {
  constructor(
    public name: string,
    public age: number,
    public domestic: boolean
  ) {
    this.name = name;
    this.age = age;
    this.domestic = domestic;
  }

  json = () => {
    console.log(
      JSON.stringify(
        {
          name: this.name,
          age: this.age,
          domestic: this.domestic,
        },
        undefined,
        2
      )
    );
  };
}
const animal = new Animal("Kudu", 23, false);
animal.json();
```

### Accessing and Modifying Private and protected members using setters and getters.

Let's say now that teh age and the domesticity of an animal is now private and protected respectively. This means that we can not be able to access or modify them outside the class. For that we will need to use `setters` and `getters` here is an example.

```ts
class Animal {
  constructor(
    public name: string,
    private age: number,
    protected domestic: boolean = false
  ) {
    this.name = name;
    this.age = age;
    this.domestic = domestic;
  }

  public get getAge() {
    return this.age;
  }
  public set setAge(age: number) {
    this.age = age;
  }
  get getDomestic() {
    return this.domestic;
  }
  set setDomestic(domestic: boolean) {
    this.domestic = domestic;
  }
}
const animal = new Animal("Kudu", 23);
animal.setDomestic = true;
animal.setAge = 34;
console.log({ domestic: animal.getDomestic, age: animal.getAge });
```

The `set` and `get` keywords makes a method a setter and a `getter` respectively. Note that in the constructor method we can pass default parameters like what we did on the `domestic` property.

### Basic Inheritance

In this section we are going to create another class called `cat`. This class will inherit from the `animal` class.

```ts
class Animal {
  constructor(
    public name: string,
    private age: number,
    protected domestic: boolean = false
  ) {
    this.name = name;
    this.age = age;
    this.domestic = domestic;
  }

  json = () => {
    console.log(
      JSON.stringify(
        {
          name: this.name,
          age: this.age,
          domestic: this.domestic,
        },
        undefined,
        2
      )
    );
  };
}

class Cat extends Animal {}
const cat = new Cat("Cat:Mew", 3, true);
cat.json();
```

Using the `extends` keyword for a `Cat` class the drived class will be able to inherit all the public and protected members of the base class `Animal`

```ts
class Cat extends Animal {}
const cat = new Cat("Cat:Mew", 3, true);
cat.name = "Cat:Old";
cat.json();
```

We can not be able to access the `domestic` or `age` because of their access modifiers. And also we can override some methods in the base class as follows:

```ts
class Animal {
  protected parentName: string = "Animal";
  constructor(
    public name: string,
    private age: number,
    protected domestic: boolean = false
  ) {
    this.name = name;
    this.age = age;
    this.domestic = domestic;
  }

  json() {
    console.log(
      JSON.stringify(
        {
          name: this.name,
          age: this.age,
          domestic: this.domestic,
        },
        undefined,
        2
      )
    );
  }
}

class Cat extends Animal {
  constructor(
    name: string,
    age: number,
    domestic: boolean = false,
    protected readonly owner: string,
    public location: string
  ) {
    super(name, age, domestic);
  }
  override json() {
    super.json();
    console.log(
      JSON.stringify(
        {
          owner: this.owner,
          location: this.location,
          parentName: this.parentName,
        },
        undefined,
        2
      )
    );
  }
}
const cat = new Cat("Cat:Mew", 3, true, "Me", "Hi");
cat.name = "Cat:Old";
cat.json();
```

### Implementing a class from an Interface

We can create an interface with class members and use the `implements` keyword on our class. Let's define the properties of our class in an interface `IBook` and create a class `Book` that will implement these class members from this interface. We can do it as follows.

```ts
interface IBook {
  title: string;
  pages: number;
  print: () => void;
}
class Book implements IBook {
  constructor(public title: string, public pages: number) {
    this.title = title;
    this.pages = pages;
  }
  print() {
    console.log(`${this.title} has ${this.pages} pages.`);
  }
}
const book = new Book("Into the bad lands", 56);
book.print();
```

### Static members of a class

Static members of a class are those members that can be accessed on the classname it self. Let's have a look at some few examples here:

```ts
class Book {
  public static bookName = "Hello Jonh";
  public static pages = 45;
}
console.log(`${Book.bookName} has ${Book.pages} pages.`);
```

Static members are also called using the class name within their classes as follows:

```ts
class Book {
  public static bookName = "Hello Jonh";
  public static pages = 45;
  public static count = 0;
  public id: number;
  constructor() {
    this.id = ++Book.count;
  }
}

[new Book(), new Book(), new Book()].forEach((book) => {
  console.log("Book Id: ", book.id);
});
console.log(`${Book.bookName} has ${Book.pages} pages.`);
```

The following will be the output on the console:

```shell
Book Id:  1
Book Id:  2
Book Id:  3
Hello Jonh has 45 pages.
```

This shows that static members are initiated on the class itself, as ypu can see the `id` keep on increasing when we create a new book.
