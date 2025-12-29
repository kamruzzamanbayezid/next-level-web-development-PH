const fs = require('fs');

fs.writeFile('./data/write-file.txt', 'Hi i am a writeFile', (error, data) => {
      if (error) console.log(error.message);
      console.log(data);
})