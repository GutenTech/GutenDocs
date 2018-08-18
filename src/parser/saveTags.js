const fs = require('fs');
const { parseCommentsTemplate } = require('./utils/webpackTemplates.js');

const saveTags = (data, path) => {
  const dataToSave = JSON.stringify(data).replace(/\\n/g, '\\\\n');
  fs.writeFile(path, parseCommentsTemplate(dataToSave), (err) => {
    if (err) {
      console.log(err); /* eslint-disable-line no-console */
    }
  });
};

module.exports.saveTags = saveTags;