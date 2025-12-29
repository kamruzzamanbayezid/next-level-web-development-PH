const fs = require('fs');

fs.writeFile('./data/delete.txt', 'File Created..', (err) => {
      if (err) console.log(err?.message);

      console.log('File Created');
      // fs.unlink('./data/delete.txt', (err) => {
      //       if (err) console.log(err?.message);
      //       console.log('File Deleted');

      // })
})

// try {
//       fs.unlinkSync('./data/delete.txt')
// } catch (error) {
//       console.log(error?.message);

// }

// fs.unlink('./data/delete.txt', (err) => {
//       if (err) console.log(err?.message);
//       console.log('File Deleted');

// })