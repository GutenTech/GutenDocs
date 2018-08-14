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

/**
 * @description A function that will parse a JSdoc Block of Comments using Doctrine
 * @param commentsArray {[]} An array of JSDoc Comment Blocks structured in AST.
 * @param address {string} The path that the file should be saved to.
 * @return n/a
 */
const parseComments = (commentsArray, address) => {
  const tags = [];
  if (!(commentsArray instanceof Array) || commentsArray === undefined) {
    throw new TypeError('Parse comments should receive and array of comments');
  }
  commentsArray.forEach((comment) => {
    if (!(comment instanceof Object)) {
      throw new TypeError('Array passed to parseComments should contain strings');
    }
    if (comment.comment === undefined || comment.name === undefined) {
      throw new TypeError('Each object in the passed in Array should have a a key of "comment" and "name"');
    }
    const funcName = comment.name;
    const commentObj = doctrine.parse(comment.comment, {
      unwrap: true,
    });
    const descriptionTags = commentObj.tags.filter(tag => tag.title === 'description');
    commentObj.name = funcName;
    descriptionTags.forEach(((descriptionTag) => {
      if (commentObj.description !== '') {
        commentObj.description = commentObj.description.concat('\n');
      }
      commentObj.description = commentObj.description.concat(descriptionTag.description);
    }));
    tags.push(commentObj);
  });
  saveTags(tags, address);
  return (tags);
};

module.exports = parseComments;