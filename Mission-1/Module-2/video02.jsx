const rawApiData = [
  {
    id: "p-001",
    productName: "Quantum Laptop",
    category: "Electronics",
    price: 1200,
    rating: 4.8,
    stock: 15,
  },
  {
    id: "p-002",
    productName: "The Art of Code",
    category: "Books",
    price: 45,
    rating: 4.5,
    stock: 100,
  },
  {
    id: "p-003",
    productName: "Cyber Hoodie",
    category: "Clothing",
    price: 80,
    rating: 4.7,
    stock: 50,
  },
  {
    id: "p-004",
    productName: "4K Drone",
    category: "Electronics",
    price: 650,
    rating: 4.3,
    stock: 20,
  },
  {
    id: "p-005",
    productName: "Basic JavaScript",
    category: "Books",
    price: 25,
    rating: 3.8,
    stock: 200,
  },
  {
    id: "p-006",
    productName: "Smart Watch",
    category: "Electronics",
    price: 250,
    rating: 4.7,
    stock: 70,
  },
  {
    id: "p-007",
    productName: "Classic T-Shirt",
    category: "Clothing",
    price: 30,
    rating: 4.2,
    stock: 300,
  },
  {
    id: "p-008",
    productName: "Design Patterns",
    category: "Books",
    price: 55,
    rating: 4.9,
    stock: 80,
  },
  {
    id: "p-009",
    productName: "VR Headset",
    category: "Electronics",
    price: 400,
    rating: 4.6,
    stock: 30,
  },
  {
    id: "p-010",
    productName: "USB-C Cable",
    category: "Electronics",
    price: 15,
    rating: 4.0,
    stock: 500,
  },
  {
    id: "p-011",
    productName: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: 300,
    rating: 4.7,
    stock: 40,
  },
  {
    id: "p-012",
    productName: "Algorithms Explained",
    category: "Books",
    price: 50,
    rating: 4.5,
    stock: 60,
  },
];

//? Output => [{ name: "Phone" }, { name: "Smart Watch" }]

//* Process
//TODO Filter => Electronics
//TODO Sort by => Rating
//TODO Slice => first 3 (top 3)
//TODO Map => transform object shape to { name : "Name"}

const top3Electronics = rawApiData
  .filter((item) => item.category === "Electronics")
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3)
  .map((item) => ({ name: item.productName }));

// console.log(top3Electronics);

const mySet = new Set([1, 2, 2, 3]);
const arr = Array.from(mySet);
// console.log(arr); // [1, 2, 3]

const currentUserRole = ["moderator", "author", "admin"];
const featuredAccessRole = ["admin", "manager"];

const canAccess = currentUserRole.some((role) =>
  featuredAccessRole.includes(role)
);
// console.log(canAccess);

// Array.from
const str = "Bayezid";
// const arr1 = Array.from({ length: 5 });
// const arr1 = Array.from({ length: 5 }).fill(5);
// const arr1 = Array.from({ length: 4 }, (_, i) => i);
const arr1 = Array.from([1, 2, 3, 4, 5, 6], (value, i) => i); // i => length; value => array ta;
// console.log(arr1);

// Range
const range = (start, end, step) =>
  Array.from(
    { length: Math.ceil(end - start) / step },
    (_, i) => start + i * step
  );
// console.log(range(0, 10, 2));

// Count subtotal

const cartItems = [
  { id: "p-001", name: "Daraz Laptop Bag", price: 1500, quantity: 1 },
  { id: "p-002", name: "Walton USB-C Cable", price: 350, quantity: 2 },
  { id: "p-003", name: "Aarong Kurta", price: 2200, quantity: 1 },
];

const subtotal = cartItems.reduce(
  (subtotal, item) => subtotal + item.price * item.quantity,
  0
);

// console.log(subtotal);

// Find best scorer

const players = [
  { name: "Jamal Bhuyan", score: 88 },
  { name: "Shekh Morsalin", score: 81 },
  { name: "Rakib Hossain", score: 95 },
  { name: "Topu Barman", score: 91 },
  { name: "Sohel Rana", score: 72 },
];

const bestScorer = players.reduce((bestScorer, player) => {
  if (bestScorer.score > player.score) {
    return bestScorer;
  }
  return player;
}, players[0]);

// console.log(bestScorer);

//* Generate a lookup table

//? Input
const postsArray = [
  { id: "p-101", title: "Intro to SQL", author: "Alex" },
  { id: "p-102", title: "Data Structures in JS", author: "Beth" },
  { id: "p-103", title: "Understanding Reduce", author: "Chris" },
  { id: "p-104", title: "CSS Grid Tricks", author: "Alex" },
];

const lookupTable = postsArray.reduce((lockup, post) => {
  lockup[post.id] = post;
  return lockup;
}, {});

// console.log(lookupTable["p-103"]);

//? Output
// {
//   "p-101": { "id": "p-101", "title": "Intro to SQL", "author": "Alex" },
//   "p-102": { "id": "p-102", "title": "Data Structures in JS", "author": "Beth" },
//   "p-103": { "id": "p-103", "title": "Understanding Reduce", "author": "Chris" },
//   "p-104": { "id": "p-104", "title": "CSS Grid Tricks", "author": "Alex" }
// }

//* Grouping and Aggregating Data

// Scenario: Count every survey and group by response

//? input
const surveyResponses = [
  "A",
  "C",
  "B",
  "A",
  "B",
  "B",
  "C",
  "A",
  "B",
  "D",
  "A",
  "C",
  "B",
  "A",
];

const count = surveyResponses.reduce((count, response) => {
  // console.log(count[response]);
  // if (count[response]) {
  //   count[response] = count[response] + 1;
  // } else {
  //   count[response] = 1;
  // }

  count[response] || 0 + 1;

  return count;
}, {});

// console.log(count);

//? Output
// { A: 5, C: 3, B: 5, D: 1 }

//* Grouping and Aggregating Data

// Scenario: You have a flat array of sales data, and you need to group the sales by category,
// calculating the total revenue and the number of items sold for each.

const sales = [
  { category: "Electronics", item: "Laptop", price: 1200, quantity: 1 },
  { category: "Books", item: "JS Basics", price: 30, quantity: 2 },
  { category: "Electronics", item: "Mouse", price: 25, quantity: 2 },
  { category: "Home", item: "Chair", price: 150, quantity: 1 },
  { category: "Books", item: "React Deep Dive", price: 50, quantity: 1 },
  { category: "Electronics", item: "Keyboard", price: 80, quantity: 1 },
];

const salesByCategory = sales.reduce((item, response) => {
  const { category, price, quantity } = response;
  if (!item[category]) {
    item[category] = {
      totalRevenue: 0,
      itemCount: 0,
    };
  }
  item[category].totalRevenue = item[category].totalRevenue + price * quantity;
  item[category].itemCount = item[category].itemCount + quantity;
  return item;
}, {});

// console.log(salesByCategory);

//? Output
// {
//   Electronics: {
//     totalRevenue: 1330,
//     itemCount: 4,
//   },
//   Books: {
//     totalRevenue: 110,
//     itemCount: 3,
//   },
//   Home: {
//     totalRevenue: 150,
//     itemCount: 1,
//   },
// };

//* Denormalizing Data (Client-Side "Join")

// Scenario: You have an array of users and a separate array of posts.
// You want to create a new array of users where each user object contains a posts array of their own posts.

//? input
const users = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Charlie" },
];

const posts = [
  { id: 1, userId: 102, title: "My first post" },
  { id: 2, userId: 101, title: "React Hooks" },
  { id: 3, userId: 101, title: "Data Structures" },
  { id: 4, userId: 103, title: "CSS is fun" },
  { id: 5, userId: 102, title: "Node.js streams" },
];

const postByUserId = posts.reduce((post, response) => {
  post[response.userId] = response;
  return post;
}, {});
console.log(postByUserId);

//? output
// [
//   { id: 101, name: 'Alice', posts: [ { id: 2, ... }, { id: 3, ... } ] },
//   { id: 102, name: 'Bob', posts: [ { id: 1, ... }, { id: 5, ... } ] },
//   { id: 103, name: 'Charlie', posts: [ { id: 4, ... } ] }
// ]
