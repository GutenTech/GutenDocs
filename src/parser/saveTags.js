const fs = require('fs');
const { parseCommentsTemplate } = require('./utils/webpackTemplates.js');

const saveTags = (data, path) => {
  const dataToSave = JSON.stringify(data)
  .replace(/(?<!\\)(?:\\\\)*\\n/g, '\\\\n`') // replaces \n where there is odd number of \ with a \\n
  .replace(/(?<!\\)(?:\\\\)*`/g, '\\`'); //  replaces ` and any ` preceded by an odd number of \ with a \`
  fs.writeFile(path, parseCommentsTemplate(dataToSave), (err) => {
    if (err) {
      console.log(err); /* eslint-disable-line no-console */
    }
  });
};

module.exports.saveTags = saveTags;
