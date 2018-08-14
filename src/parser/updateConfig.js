const fs = require('fs');

const pathToConfigBundle = '../../client/dist/1.bundle.js';
const pathToConfigJSON = '../../client/dist/gutenConfig.json';

const fillBlanksWithDefaults = (assignedSettings) => {
  const mergedSettings = Object.assign(assignedSettings, {});
  return mergedSettings;
};

const updateConfig = (path) => {
  let configSettings = fs.readFileSync(path);
  configSettings = fillBlanksWithDefaults(configSettings);
  /* eslint-disable */
  const fileToWrite = `(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

    /***/ "./client/src/components/configData.json":
    /*!***********************************************!*\
      !*** ./client/src/components/configData.json ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval(\`\n\nmodule.exports = ${configSettings};\n\n//# sourceURL=webpack:///./client/src/components/configData.json?\`);
    
    /***/ })
    
    }]);`;
    /* eslint-enable */

  fs.writeFileSync(pathToConfigBundle, fileToWrite);
};
updateConfig(pathToConfigJSON);

module.exports = updateConfig;
