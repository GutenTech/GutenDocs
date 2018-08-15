const doctrine = require('doctrine');
const fs = require('fs');
/**
 * @description This function will save the data to the client/dist folder
 */

const saveTags = (data, path) => {
  const dataToSave = JSON.stringify(data).replace(/\\n/g, '\\\\n');
  /*eslint-disable */
  fs.writeFile(path, `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

    /***/ "./client/src/components/parsedData.json":
    /*!***********************************************!*\
      !*** ./client/src/components/parsedData.json ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval(\`\n\nmodule.exports = ${dataToSave};\n\n//# sourceURL=webpack:///./client/src/components/parsedData.json?\`);
    
    /***/ })
    
    }]);`, (err) => {
    /* eslint-enable */
    if (err) {
      throw err;
    }
  });
};


const processFile = (tagArray) => {
  const tags = { content: [], };
  tagArray.forEach(x => {
    const fileObj = doctrine.parse(x.comment, { unwrap: true,});
    fileObj.name = x.name;
    const descriptionTags = fileObj.tags.filter(tag => tag.title === 'description');

    descriptionTags.forEach(((descriptionTag) => {
      if (fileObj.description !== '') {
        fileObj.description = fileObj.description.concat('\n');
      }
      fileObj.description = fileObj.description.concat(descriptionTag.description);
    }));
    tags.content.push(fileObj);
  });
  return tags;
};


/**
 * @description A function that will parse a JSdoc Block of Comments using Doctrine
 * @param commentsArray {[]} An array of JSDoc Comment Blocks structured in AST.
 * @param address {string} The path that the file should be saved to.
 * @return n/a
 */
const parseComments = (filesArray, address) => {
  if (!(filesArray instanceof Array)) {
    throw new TypeError('Parse comments should receive and array of comments');
  }
  const files = [];
  filesArray.forEach((file) => {
    if (!(file instanceof Object)) {
      throw new TypeError('Array passed to parseComments should contain strings');
    }
    if (file.content === undefined || file.name === undefined) {
      throw new TypeError('Each object in input Array must have "comment" & "name" properties');
    }
    const fileContent = processFile(file.content);
    fileContent.fileName = file.name;
    files.push(fileContent);
  });
  saveTags(files, address);
}

module.exports = parseComments;