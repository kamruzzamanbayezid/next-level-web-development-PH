//? Create a class Car with brand, model and a method start() that prints “Car started”.

class Car {
  constructor(public brand: string, public model: string) {}
  start() {
    console.log("Car started");
  }
}

const RangeRover = new Car("Range River", "Premium");

// console.log(RangeRover.start());

//? Write a function that checks whether input is number or string and handles accordingly.

type StrOrNum = string | number;

function add(value1: StrOrNum, value2: StrOrNum): StrOrNum {
  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 + value2;
  } else {
    return value1.toString() + value2.toString();
  }
}

// console.log(add(55, 5));

//? Create two classes Cat and Dog, and write a function makeSound using instanceof.

class Cat {
  constructor(public name: string, public sound: string) {}
}

class Dog {
  constructor(public name: string, public sounds: string) {}
}

const makeSound = (instance: Cat | Dog) => {
  if (instance instanceof Cat) {
    return `${instance.name} is sound like ${instance.sound}`;
  } else {
    return `${instance.name} is sound like ${instance.sounds}`;
  }
};

const dog1 = new Dog("Kitty", "Ghew ghew");
const cat1 = new Cat("Mimi", "Meow Meow");

// console.log(makeSound(cat1));

//? Create a Payment parent class and override method in Bkash, Nagad, Cash.

class Payment {
  paymentWith() {
    console.log("Make Payment....");
  }
}

class PaymentWithBkash extends Payment {
  paymentWith(): void {
    console.log("Make Payment with  Bkash");
  }
}

class PaymentWithNogod extends Payment {
  paymentWith(): void {
    console.log("Make Payment with  Nogod");
  }
}

class PaymentWithCash extends Payment {
  paymentWith(): void {
    console.log("Make Payment with  Cash");
  }
}

function makePayment(paymentMethod: Payment) {
  paymentMethod.paymentWith();
}

const bkash = new PaymentWithBkash();
const nogod = new PaymentWithNogod();
const cash = new PaymentWithCash();

// makePayment(bkash);
// makePayment(nogod);
// makePayment(cash);

{
  //? Make an abstract class Animal with abstract method sound().

  abstract class Animal {
    abstract sound(): void;
  }

  class Cat extends Animal {
    sound(): void {
      console.log("Cat Sounds Meow Meow");
    }
  }

  const cat1 = new Cat();
  //   cat1.sound();
}

// Task 1: Create a fully OOP system for School Management
// Student Teacher Admin All inherit from Person
// Override introduce() method

class Person {
  constructor(public name: string, public profession: string) {}
  introduce() {
    console.log(`Hi!! This is ${this.name}. I am a ${this.profession}`);
  }
}

class Teacher extends Person {
  teachingHour: number;

  constructor(
    public name: string,
    public profession: string,
    teachingHour: number
  ) {
    super(name, profession);
    this.teachingHour = teachingHour;
  }

  introduce(): void {
    console.log(
      `Hi!! This is ${this.name}. I am a ${this.profession}. I am teaching for ${this.teachingHour} hours!!`
    );
  }
}

class Admin extends Person {
  role: string;

  constructor(public name: string, public profession: string, role: string) {
    super(name, profession);
    this.role = role;
  }

  introduce(): void {
    console.log(
      `Hi!! This is ${this.name}. I am a ${this.profession}. I have ${this.role}`
    );
  }
}

const person1 = new Person("Habib", "Bekar");
const person2 = new Teacher("Nazmul", "Teacher", 5);
const person3 = new Admin("Aslam", "Admin", "Super Power");

// person1.introduce();
// person2.introduce();
// person3.introduce();

// Task 3: Create a Shape Calculator
// Using (abstract + polymorphism + getter/setter)

abstract class Calculator {
  shape() {}
}

class Circle extends Calculator {
  constructor(public radius: number) {
    super();
  }

  shape(): void {
    console.log(Math.PI * this.radius * this.radius);
  }
}

class Area extends Calculator {
  constructor(public height: number, public width: number) {
    super();
  }

  shape(): void {
    console.log(this.height * this.width);
  }
}

function calculateShape(instance: Calculator) {
  instance.shape();
}

const circle1 = new Circle(5);
const area1 = new Area(5, 3);

// calculateShape(circle1);
// calculateShape(area1);

//? Build a static-based ID generator

// class User {
//   public static counter: number = 0;
//   public readonly id: number;
//   public name: string;

//   constructor(name: string) {
//     this.name = name;
//     this.id = ++User.counter;
//   }
// }

// const user1 = new User("Bayezid");
// const user2 = new User("Halim");

// console.log(user1.id);
// console.log(user2.id);

class EnrolledStudent {
  public name: string;
  public static count: number = 1;
  public readonly id: number;

  constructor(name: string) {
    this.name = name;
    this.id = EnrolledStudent.count++;
  }
}

const student1 = new EnrolledStudent("Bayezid");
const student2 = new EnrolledStudent("Halim");
const student3 = new EnrolledStudent("Halima");
const student4 = new EnrolledStudent("Salam");

// console.log(student1.id);
// console.log(student2.id);
// console.log(student3.id);
// console.log(student4.id);
