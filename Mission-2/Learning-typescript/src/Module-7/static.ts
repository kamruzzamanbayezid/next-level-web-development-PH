class Calculator {
  static count: number = 0;

  //   plus() {
  //     return (Calculator.count = Calculator.count + 1);
  //   }

  //   minus() {
  //     return (Calculator.count = Calculator.count - 1);
  //   }

  static plus() {
    return (Calculator.count = Calculator.count + 1);
  }

  static minus() {
    return (Calculator.count = Calculator.count - 1);
  }
}

// const instance = new Calculator();
// console.log(instance.plus());
// console.log(instance.plus());
// console.log(instance.plus());

// const instance1 = new Calculator();
// console.log(instance1.plus());
// console.log(instance1.plus());
// console.log(instance1.plus());

console.log(Calculator.plus());
console.log(Calculator.plus());
console.log(Calculator.plus());

console.log(Calculator.minus());
