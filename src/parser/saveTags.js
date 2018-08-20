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
  const commentBlocks = [];

  ast.forEach((file) =>{
    file.content.forEach((commentBlock) => {
      // const updatedCommentBlock = {};
      // updatedCommentBlock.description = commentBlock.description;
      // updatedCommentBlock.tags = commentBlock.tags;
      // updatedCommentBlock.name = commentBlock.name;   
      // updatedCommentBlock.header = undefined;
      // updatedCommentBlock.priority = undefined;  
      commentBlocks.push({
        header: undefined,
        priority: undefined,
        description: commentBlock.description,
        tags: commentBlock.tags,
        name: commentBlock.name,
        pathName: file.fileName,
      });
    });
  });
  
  for (let i = 0; i < commentBlocks.length; i++) {
    console.log('*************************');
    console.log(commentBlocks[i]);
  }
  return commentBlocks;
};

module.exports.saveTags = saveTags;
module.exports.cleanAST = cleanAST;
