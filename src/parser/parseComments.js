const doctrine = require('doctrine');
const errors = require('./utils/errors.js');
const { getRC } = require('./../utils.js');

/**
 * @description catchAll method that added a header and a priority to all unassigned
 * files as well as a unique id
 * @param { array } tagArray catchall param
 * @section parsing function1
 * @return { object } catchall return
 */
const processFile = (tagArray) => {
  const tags = {
    content: [],
  };
  const gutenRC = getRC();
  tagArray.forEach((x) => {
    const fileObj = doctrine.parse(x.comment, {
      ...gutenRC.doctrineSettings,
    });
    fileObj.name = x.name;
    tags.content.push(fileObj);
  });
  return tags;
};


/**
 * @description A function that will parse a JSdoc Block of Comments using Doctrine
 * @param { array } commentsArray An array of JSDoc Comment Blocks structured in AST.
 * @param { string } address The path that the file should be saved to.
 * @section section name 2
 * @return { array } array of AST objects representing the comments extracted from comments
 */
const parseComments = (filesArray) => {
  errors.parseCommentsArrayErr(filesArray);

  const files = [];
  filesArray.forEach((file) => {
    errors.parseCommentsFileErr(file);
    const fileContent = processFile(file.content);
    fileContent.fileName = file.name;
    files.push(fileContent);
  });
  return files;
};

module.exports = parseComments;