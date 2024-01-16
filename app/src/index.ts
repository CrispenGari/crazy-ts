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
