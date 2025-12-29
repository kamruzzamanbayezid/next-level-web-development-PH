{
  class Student {
    name: string;
    age: number;
    study: string;

    constructor(name: string, age: number, study: string) {
      this.name = name;
      this.age = age;
      this.study = study;
    }

    studentDetails() {
      return `This is ${this.name}. ${this.name} is ${this.age} years old. ${this.name} reads in class ${this.study}`;
    }
  }

  const mahin = new Student("Mahin", 25, "Eight");
  const nihad = new Student("Nihad", 20, "Seven");
  console.log(mahin.studentDetails());
}

{
  // !Using Public class property

  class Student {
    constructor(
      public name: string,
      public age: number,
      public study: string
    ) {}

    studentDetails() {
      return `This is ${this.name}. ${this.name} is ${this.age} years old. ${this.name} reads in class ${this.study}`;
    }
  }

  const mahin = new Student("Mahin", 25, "Eight");
  const nihad = new Student("Nihad", 20, "Seven");
  console.log(mahin.studentDetails());
}


