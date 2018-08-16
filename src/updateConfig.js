const fs = require('fs');
const path = require('path');

const fillBlanksWithDefaults = (assignedSettings) => {
  const defaultConfig = fs.readFileSync(path.dirname(__dirname).concat('/client/dist/gutenConfig.json'));
  const mergedSettings = Object.assign(JSON.parse(assignedSettings), JSON.parse(defaultConfig));
  return mergedSettings;
};

const updateConfig = (APIdir) => {
  const pathToConfigBundle = APIdir.concat('1.bundle.js');
  const pathToConfigJSON = APIdir.concat('gutenConfig.json');
  if (!fs.existsSync(pathToConfigBundle)) {
    /* eslint-disable-next-line no-console */
    console.log(`Write Error:
    The folder specified in the .gutenrc file seems to be missing.  
    Update .gutenrc to match your API folder if you have changed the folder name,
    or call "gutendocs --reset" if and only if you have accidentally deleted it 
    and would like it to be reset to the original state.`);
  } else {
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
      eval(\`\n\nmodule.exports = ${JSON.stringify(configSettings)};\n\n//# sourceURL=webpack:///./client/src/components/configData.json?\`);
      
      /***/ })
      
      }]);`;
      /* eslint-enable */
    fs.writeFileSync(pathToConfigBundle, fileToWrite);
  }
};

module.exports = updateConfig;
