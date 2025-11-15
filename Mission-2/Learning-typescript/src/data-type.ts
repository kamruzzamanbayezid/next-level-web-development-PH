// Reference => Objects

const user: {
  firstName: string;
  lastName: string;
  age: number;
  isMarried?: boolean;
  phone: "01882888860";
  getFullname(): void;
} = {
  firstName: "Kamruzzaman",
  lastName: "Bayezid",
  age: 25,
  phone: "01882888860",
  getFullname: function () {
    console.log(
      `My name is ${this.firstName} ${this.lastName}. I am ${this.age} years old`
    );
  },
};
// console.log(user.getFullname());

// function => method
function sum(num1: number, num2: number): number {
  return num1 + num2;
}

const total = (num1: number, num2: number): number => num1 * num2;

// console.log(total(5, 5));

// Spread operation
const user2 = { name: "Bayezid", phone: "01882888860" };
const otherInfo = { isMaried: true };

const userInfo = { ...user2, ...otherInfo };
// console.log(userInfo);

// Rest operator
const sendInvite = (...friends: string[]) => {
  console.log(friends);
  friends.forEach((friend:string) =>
    console.log(`Sent Invitation to my friend ${friend}`)
  );
};

// console.log(sendInvite("Cat", "Rat", "Dog"));


