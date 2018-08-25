const fs = require('fs');
const path = require('path');

/**
 * @description Will write the cleaned and sorted AST tree to a js file exporting it
 * @param {[]} data the ast cleaned tree
 * @param {string} path the path to write the data too
 * @return n/a
 */
const saveTags = (data, writePath) => {
  const variableName = path.basename(writePath, path.extname(writePath));
  fs.writeFile(writePath,
    '/* eslint-disable quote-props */\n'
    + '/* eslint-disable quotes */\n'
    + '/* eslint-disable comma-dangle */\n'
    + `const ${variableName} = ${JSON.stringify(data, null, 2)};`
    + `\n\nwindow.${variableName} = ${variableName};`,
    (err) => {
      if (err) {
        console.log(err); /* eslint-disable-line no-console */
      }
    });
};

module.exports.saveTags = saveTags;
