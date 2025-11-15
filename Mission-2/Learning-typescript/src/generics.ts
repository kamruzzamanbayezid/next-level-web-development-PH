type Student<T, K> = {
  name: T;
  age: K;
};

const student1: Student<string, number> = {
  name: "Bayezid",
  age: 20,
};

const student2: Student<string, number> = {
  name: "Bayezid",
  age: 20,
};

type GenericArr<T> = T[];

const friends: GenericArr<string> = ["x", "y", "z"];
const rolls: GenericArr<number> = [1, 2, 3];
const boolean: GenericArr<boolean> = [true, false, true];

const userLists: GenericArr<{ name: string; age: number; phone: string }> = [
  {
    name: "Bayexid",
    age: 20,
    phone: "2222",
  },
  {
    name: "Kamruzzaman",
    age: 25,
    phone: "25255",
  },
];

type Add = (num1: number, num2: number) => number;

const sum: Add = (num1, num2) => num1 + num2;

type Coordinates<T, P> = [T, P];
const ages: Coordinates<number, number> = [12, 11];
const ages2: Coordinates<string, string> = ["12", "11"];
