const fs = require('fs');

// fs.writeFileSync('./data/test.txt', 'Application Started...')
// console.log('File created');

const logEntry1 = `\n ${new Date().toISOString()} logged in time!!`
fs.appendFileSync('./data/test.txt', logEntry1)

const logEntry2 = `\n ${new Date().toISOString()} fetched data!!`
fs.appendFileSync('./data/test.txt', logEntry2)
console.log('Application End');
