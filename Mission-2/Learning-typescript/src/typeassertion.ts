const response = '{"id": 101, "name": "Kamruzzaman", "isAdmin": true}';
const userData = JSON.parse(response) as User;
console.log(userData);

console.log(userData.name.toUpperCase());
// ❌ Property 'name' does not exist on type 'any'.
type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};

// 🧩 Step:
// 1. userData এর উপরে type assertion করো

// 2. এরপর userData.name কে uppercase করে console এ প্রিন্ট করো

// 👉 তোমার প্রত্যাশিত Output:
// NAME: KAMRUZZAMAN
