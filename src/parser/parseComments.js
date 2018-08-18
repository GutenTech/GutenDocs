const doctrine = require('doctrine');
const fs = require('fs');
const {
  parseCommentsTemplate,
} = require('./utils/webpackTemplates.js');
const errors = require('./utils/errors.js');

/**
 * @description This function will save the data to the client/dist folder
 * @section Heading1
 * @section Heading2
 */

const saveTags = (data, path) => {
  const dataToSave = JSON.stringify(data).replace(/\\n/g, '\\\\n');
  fs.writeFile(path, parseCommentsTemplate(dataToSave), (err) => {
    if (err) {
      console.log(err); /* eslint-disable-line no-console */
    }
  });
};

const procDesc = (fileObj) => {
  const d = fileObj.description ? `${fileObj.description}\n` : '';
  // eslint-disable-next-line no-param-reassign
  fileObj.description = fileObj.tags.reduce((acc, tag) => (tag.title === 'description' ? acc + d + tag.description : acc), '');
};

const processFile = (file) => {
  errors.parseCommentsFileErr(file);
/**
 * @description catchAll descritpiton
 * @param tagArray {[]} catchall param
 * @return catchall return
 */
const processFile = (tagArray) => {
  const tags = {
    content: [],
    fileName: file.name,
  };
  file.content.forEach((x) => {
    const fileObj = doctrine.parse(x.comment, {
      unwrap: true,
    });
    fileObj.name = x.name;
    procDesc(fileObj);
    /* fileObj.description = procDesc(fileObj.tags.filter(tag => tag.title === 'description'), fileObj.description); */
    tags.content.push(fileObj);
  });
  return tags;
};

/**
 * @description A function that will parse a JSdoc Block of Comments using Doctrine
 * @param commentsArray {[]} An array of JSDoc Comment Blocks structured in AST.
 * @param address {string} The path that the file should be saved to.
 * @section section name 2
 * @return n/a
 */

const parseComments = (filesArray, address) => {
  errors.parseCommentsArrayErr(filesArray);
  const files = filesArray.reduce((acc, f) => acc.push(processFile(f)) && acc, []);
  saveTags(files, address);
  return files;
};

module.exports = parseComments;