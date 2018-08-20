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

const cleanAST = (ast) => {
  // console.log('this ast is', JSON.stringify(ast));

  //iterate through each file
  ast.forEach((file) =>{
    console.log('FileName====>>>>', file.fileName);
  });
};

module.exports.saveTags = saveTags;
module.exports.cleanAST = cleanAST;
