const args = process.argv;

// args[0]=node path
// args[1]=file path
// args[2]=first actual argument

const name3 = args[2] || 'Guest';
const time = new Date().getHours();

let greeting;
if (time < 12) {
      greeting = 'Good Morning'
}
else if (time < 18) {
      greeting = 'Good Afternoon'
}
else {
      greeting = 'Good Night'
}

console.log(`${greeting} ${name3}`);

