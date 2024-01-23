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
