const doctrine = require('doctrine');
const fs = require('fs');
const { parseCommentsTemplate } = require('./utils/webpackTemplates.js');
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


const procDesc = (descriptionTagArray, fileObjDesc) => {
  let description = fileObjDesc;

  descriptionTagArray.forEach((descriptionTag) => {
    if (fileObjDesc !== '') {
      description = description.concat('\n');
    }
    description = description.concat(descriptionTag.description);
  });
  return description;
};

/**
 * @description catchAll descritpiton
 * @param tagArray {[]} catchall param
 * @return catchall return
 */
const processFile = (tagArray) => {
  const tags = {
    content: [],
  };

  tagArray.forEach((x) => {
    const fileObj = doctrine.parse(x.comment, {
      unwrap: true,
    });
    fileObj.name = x.name;
    fileObj.description = procDesc(fileObj.tags.filter(tag => tag.title === 'description'), fileObj.description);
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

  const files = [];
  filesArray.forEach((file) => {
    errors.parseCommentsFileErr(file);
    const fileContent = processFile(file.content);
    fileContent.fileName = file.name;
    files.push(fileContent);
  });
  saveTags(files, address);
  return files;
};

module.exports = parseComments;