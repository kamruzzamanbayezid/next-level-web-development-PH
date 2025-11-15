interface People<X, Y = null> {
  name: string;
  age: number;
  phone: string;
  isMarried: boolean;
  hasJob: X;
  hasBike?: Y;
}

interface Job {
  company: string;
  salary: number;
}

interface Bike {
  model: string;
  mileage: number;
  price: number;
}

const richPeople: People<Job, Bike> = {
  name: "Kamruzzaman",
  age: 25,
  phone: "01444",
  isMarried: true,
  hasJob: {
    company: "bdCalling",
    salary: 200,
  },
  hasBike: {
    model: "Yamaha",
    mileage: 200,
    price: 5000,
  },
};

const poorPeople: People<Job> = {
  name: "Bayezid",
  age: 24,
  phone: "01555",
  isMarried: false,
  hasJob: {
    company: "DIGI5",
    salary: 20,
  },
};
