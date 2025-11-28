const fs = require('fs');

fs.readFile('./data/data.txt', 'utf-8', (error, data) => {
      if (error) return error?.message;
      console.log('Data COntent....');
      console.log(data);
})

console.log('Running.. Non blocking');
