{
  class Animal {
    makeSound() {
      console.log("Tip top!!");
    }
  }

  class Cat extends Animal {
    makeSound() {
      console.log("Meow Meow");
    }
  }

  class Dog extends Animal {
    makeSound(): void {
      console.log("Gheu Gheu");
    }
  }

  const makeSound = (animal: Animal) => {
    animal.makeSound();
  };

  const result1 = new Animal();
  const result2 = new Cat();
  const result3 = new Dog();
  // console.log(result2.makeSound());

  // makeSound(result3)

  class MakePayment {
    makePayment() {
      return "How do u pay the amount??";
    }
  }

  class PaymentWithBkash extends MakePayment {
    paymentMethod: string;

    constructor(paymentMethod: string) {
      super();
      this.paymentMethod = paymentMethod;
    }

    makePayment(): string {
      return `I want to pay the amount with ${this.paymentMethod}`;
    }
  }

  class PaymentWithCash extends MakePayment {
    paymentMethod: string;

    constructor(paymentMethod: string) {
      super();
      this.paymentMethod = paymentMethod;
    }

    makePayment(): string {
      return `I want to pay the amount with ${this.paymentMethod}`;
    }
  }

  const paymentOption = (option: MakePayment) => {
    //     console.log("Option:", option);

    return option.makePayment();
  };

  const paymentOption1 = new MakePayment();
  const paymentOption2 = new PaymentWithBkash("Bkash Payment");
  const paymentOption3 = new PaymentWithCash("Cash Payment");

  //     console.log(paymentOption1.makePayment());
  //     console.log(paymentOption2.makePayment());
  //     console.log(paymentOption3.makePayment());

  console.log(paymentOption(paymentOption1));
  console.log(paymentOption(paymentOption2));
  console.log(paymentOption(paymentOption3));
}
