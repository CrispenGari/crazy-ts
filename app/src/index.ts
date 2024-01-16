const user = { name: "hi", age: 10, id: 5, password: "pass" };

const removeKeys =
  <Key extends string>(keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };
const keyRemover = removeKeys(["password"]);
const safe = keyRemover(user);
