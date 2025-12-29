const crypto = require('crypto');

/**
 * একটি প্রদত্ত স্ট্রিংকে SHA256 অ্যালগরিদম ব্যবহার করে হ্যাশ করে।
 * @param {string} data - হ্যাশ করার জন্য ইনপুট স্ট্রিং।
 * @returns {string} - হেক্সাডেসিমেল ফরম্যাটে হ্যাশ ভ্যালু।
 */
function hashData(data) {
      // হ্যাশ অবজেক্ট তৈরি
      const hash = crypto.createHash('sha256');
      console.log('first', hash);

      // ইনপুট ডেটা আপডেট করা (বাফার বা স্ট্রিং)
      hash.update(data);
      console.log('hash update: ', hash.update(data));

      // চূড়ান্ত হ্যাশ ভ্যালু বের করা এবং হেক্সাডেসিমেল ফরম্যাটে রিটার্ন করা
      return hash.digest('hex');
}

const password = 'mySecretPassword123';
const hashedPswd = hashData(password);

console.log(`Original Data: ${password}`);
console.log(`SHA256 Hash: ${hashedPswd}`);

// হ্যাশ সবসময় একই থাকবে
// const hashedPswd2 = hashData(password);
// console.log(`Second Hash (same input): ${hashedPswd2}`);
// আউটপুট: দুটি হ্যাশ ভ্যালু একই হবে।