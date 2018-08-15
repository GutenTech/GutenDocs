const fs = require('fs');

const fillBlanksWithDefaults = (assignedSettings) => {
  const mergedSettings = Object.assign(assignedSettings, {});
  return mergedSettings;
};

const updateConfig = (path) => {
  const pathToConfigBundle = path.concat('/1.bundle.js');
  const pathToConfigJSON = path.concat('gutenConfig.json');

  let configSettings = fs.readFileSync(pathToConfigJSON);
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

module.exports = updateConfig;
