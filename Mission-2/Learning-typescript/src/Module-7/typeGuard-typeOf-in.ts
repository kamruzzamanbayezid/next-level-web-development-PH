type Admin = {
  name: string;
  power: true;
};

type Guest = {
  name: string;
};

const checkUser = (user: Admin | Guest) => {
  if ("power" in user) {
    return `You are Admin`;
  } else {
    return `You are Guest User`;
  }
};

console.log(checkUser({ name: "Polash", power: true }));
