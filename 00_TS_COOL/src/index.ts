export {};

type CheckForArgs<T> = T extends Array<any>
  ? "You can not compare two arrays."
  : T;

const compare = <T>(a: CheckForArgs<T>, b: CheckForArgs<T>): boolean => {
  if (Array.isArray(a) || Array.isArray(b))
    throw new Error("You can not compare two arrays.");
  return a === b;
};
