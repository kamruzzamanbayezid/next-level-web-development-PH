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
  constructor(public name: string, age: number) {}
}
