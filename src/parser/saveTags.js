const fs = require('fs');
const { parseCommentsTemplate } = require('./utils/webpackTemplates.js');


/**
 * @description Will write the cleaned and sorted AST tree to a bundle.js file
 * @param {[]} data the ast cleaned tree
 * @param {string} path the path to write the data too
 * @return n/a
 */
const saveTags = (data, path) => {
  const dataToSave = JSON.stringify(data)
    .replace(/(?<!\\)(?:\\\\)*\\n/g, '\\\\n') // replaces \n where there is odd number of \ with a \\n
    .replace(/(?<!\\)(?:\\\\)*`/g, '\\`') //  replaces ` and any ` preceded by an odd number of \ with a \`
    .replace(/(?<!\\)(?:\\)*\\"/g, '\\\\"') //  replaces \" and any \" preceded by an odd number of \ with a \\"
    .replace(/\$\{/g, '\\$\\{'); //  replaces ${ with an escaped \$\{ so we dont have accidental string literals
  fs.writeFile(path, parseCommentsTemplate(dataToSave), (err) => {
    if (err) {
      console.log(err); /* eslint-disable-line no-console */
    }
  });
};

module.exports.saveTags = saveTags;
