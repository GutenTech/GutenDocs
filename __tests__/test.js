const fs = require('fs');

/* eslint-disable */
const location = fs.realpathSync('./');
console.log(location);
it ('should be an example test', () => expect(true).toBe(true));

/* eslint-enable */