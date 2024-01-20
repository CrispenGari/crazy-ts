type TGender = "M" | "F";
interface TUser {
  [key: string]: number | TGender | string;
  name: string;
  age: number;
  gender: "M" | "F";
}

const me: TUser = {
  name: "hi",
  age: 6,
  gender: "F",
  phoneNumber: 0,
};

for (const key in me) {
  const _key = key as keyof TUser;
  console.log(`${key}: ${me[_key]}`);
}
Object.keys(me).forEach((key) => console.log(me[key as keyof typeof me]));
