const fs = require('fs');
const path = require('path');

/**
 * @description Will write the cleaned and sorted AST tree to a js file exporting it
 * @param { array } data the ast cleaned tree
 * @param { string } path the path to write the data too
 */
const saveTags = (data, writePath) => {
  const variableName = path.basename(writePath, path.extname(writePath));
  fs.writeFile(writePath,
    `const ${variableName} = ${JSON.stringify(data, null, 2)};`
    + `\n\nwindow.${variableName} = ${variableName};`,
    (err) => {
      if (err) {
        throw err;
      }
    });
};

module.exports.saveTags = saveTags;
