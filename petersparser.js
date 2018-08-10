const acorn = require('acorn');
const fs = require('fs');
const doctrine = require('doctrine');

let tags;

const getJSDocs = (fileText) => {
  acorn.parse(fileText, {
    onComment: (b, t) => {
      if (b) {
        tags = doctrine.parse(t, { unwrap: true });
        fs.writeFile('./tags.json', JSON.stringify(tags), (err) => {
          if (err) {
            throw err;
          }
        });
      }
    },
  });
};

fs.readFile('./petersexample.js', (err, data) => {
  if (err) {
    throw err;
  } else {
    getJSDocs(data.toString());
  }
});
