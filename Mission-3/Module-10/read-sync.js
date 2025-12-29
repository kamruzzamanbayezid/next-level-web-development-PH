const fs = require('fs');

try {
      const data = fs.readFileSync('./data/data.txt', 'utf-8');
      console.log('Data content');
      console.log(data);
} catch (error) {
      console.log(error?.message);
}

console.log('Finished....');

