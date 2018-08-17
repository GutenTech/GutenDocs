const fs = require('fs');
const generateAPIFrame = require('./../src/generateAPIFrame.js');

/* eslint-disable */
const location = fs.readdirSync('./');
console.log(location);
generateAPIFrame('./', 'GutenApi');
location = fs.readdirSync('./');
console.log(location);
it ('should be an example test', () => expect(true).toBe(true));

/* eslint-enable */