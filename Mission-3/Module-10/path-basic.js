const path = require('path');

// console.log(__filename);
// console.log(__dirname);

const filePath = '/bayezid/next-level/mission-3/doc.pdf';
const pathArr = ['course', 'web-deb', 'enroll', 'student']

console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));

console.log(path.join(...pathArr));

console.log(path.isAbsolute(filePath));

const parsedPath = path.parse(filePath);
console.log(parsedPath);

console.log(path.format(parsedPath));





