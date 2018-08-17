/*eslint-disable */

const parseCommentsTemplate = (dataToSave) => {
  return `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

    /***/ "./client/src/components/parsedData.json":
    /*!***********************************************!*\
      !*** ./client/src/components/parsedData.json ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval(\`\n\nmodule.exports = ${dataToSave};\n\n//# sourceURL=webpack:///./client/src/components/parsedData.json?\`);
    
    /***/ })
    
    }]);`
}

  module.exports.parseCommentsTemplate = parseCommentsTemplate;