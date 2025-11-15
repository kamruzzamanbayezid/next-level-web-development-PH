const arrOfString = (value: string) => [value];
const arrOfNumber = (value: number) => [value];
const arrOfObj = (value: { name: string; age: number }) => [value];

const arrOfGeneric = <T>(value: T) => [value];

const arrString = arrOfString("Bayezid");
const arrNumber = arrOfNumber(222);
const arrObj = arrOfObj({ name: "Bayezid", age: 25 });

const genericArrString = arrOfGeneric<string>("Habib");
const genericArrNumber = arrOfGeneric<number>(222);
// console.log(genericArrNumber);

const createGenericWithArr = <X, Y, Z>(value1: X, value2: Y, value3: Z) => [
  value1,
  value2,
  value3,
];

const genericArrOfFriends = createGenericWithArr<string, string, string>(
  "Habib",
  "Kalam",
  "Mofiz"
);

const genericArrOfMobile = createGenericWithArr<string, number, boolean>(
  "Habib",
  222,
  true
);

// console.log(genericArrOfMobile);

interface basicInfo {
  id: number;
  name: string;
}
const createGenericForCourse = <T extends basicInfo>(courseInfo: T) => {
  return {
    course: "Next Level",
    ...courseInfo,
  };
};

const student1 = {
  name: "Kela",
  id: 2222,
  hasPhone: true,
};

const student2 = {
  name: "Mela",
  id: 2223,
  hasPhone: false,
  hasDevice: "Laptop",
};

const student3 = {
  name: "Mela",
  id: 555,
  hasPhone: false,
  hasDevice: "Laptop",
};

const result = createGenericForCourse(student1);
const result1 = createGenericForCourse(student2);
const result2 = createGenericForCourse(student3);
// console.log(result);
// console.log(result1);

// Constraints

// const arrOfPerson = <X, Y extends keyof X>(person1: X, person2: Y) => [
//   person1,
//   person2,
// ];

const person = { name: "Sakib", age: 25 };
// console.log(arrOfPerson(person, "name"));

const arrOfPerson = <X, Y extends object>(person1: X, person2: Y) => [
  person1,
  person2,
];

const result3 = arrOfPerson("Bayezid", { name: "kela", age: 20 });
// console.log(result3);

function sum<T extends number>(num1: T, num2: T): number {
  return num1 + num2;
}

console.log(sum(5, 5));
