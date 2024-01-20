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
export {};
