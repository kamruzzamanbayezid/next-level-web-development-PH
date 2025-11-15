class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  getSleep(numOfHours: number) {
    console.log(`${this.name} is sleeping for ${numOfHours} hours`);
  }
}

class Student extends Person {
  constructor(name: string) {
    super(name);
  }

  getStudy(numOfHours: number) {
    console.log(`${this.name} is studying for ${numOfHours} hours`);
  }
}

class Teacher extends Person {
  constructor(name: string) {
    super(name);
  }

  getClass(numOfHours: number) {
    console.log(`${this.name} is teaching for ${numOfHours} hours`);
  }
}

// ? Function Guard
const isStudent = (user: Person) => {
  return user instanceof Student;
};

const isTeacher = (user: Person) => {
  return user instanceof Teacher;
};

const getUserInfo = (user: Person) => {
  if (isStudent(user)) {
    console.log(user.getStudy(10));
  } else if (isTeacher(user)) {
    console.log(user.getClass(3));
  } else {
    user.getSleep(8);
  }
};

// const getUserInfo = (user: Person) => {
//   if (user instanceof Student) {
//     console.log(user.getStudy(10));
//   } else if (user instanceof Teacher) {
//     console.log(user.getClass(3));
//   } else {
//     user.getSleep(8);
//   }
// };

getUserInfo(new Person("Bayezid"));
