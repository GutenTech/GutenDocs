const fs = require('fs');
const extract = require('./extract.js');
const parseComments = require('./parseComments.js');

/**
 * @description This function will save the data temporarily to the client/dist folder
 */

const saveData = (data, path) => {
  fs.writeFile(path, `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

    /***/ "./client/src/components/parsedData.js":
    /*!*********************************************!*\
      !*** ./client/src/components/parsedData.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval(\`\n\nvar exampleData = ${JSON.stringify(data)};\nmodule.exports.exampleData = exampleData;\n\n//# sourceURL=webpack:///./client/src/components/parsedData.js?\`);

    /***/ })
    
    }]);`, (err) => {
    if (err) {
      throw err;
    }
  });
};

/**
 * @description This function will scan a file and parse jsdoc block
 * and return the correct parsed output.  Only testing on a single js
 * file for now.
 */

const executeDataParse = () => {
  const path = '../../client/dist/0.bundle.js';

  const out1 = extract('../../mockData/multipleComments.js');
  const out2 = parseComments(out1);
  saveData(out2, path);
};

executeDataParse();