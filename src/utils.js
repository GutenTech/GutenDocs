const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const inquirerOptions = require('./inquirerOptions.js');

const findRC = () => {
  let rcpath = false;
  let targetPath = fs.realpathSync('./');
  while (rcpath === false && targetPath !== path.dirname(targetPath)) {
    const results = fs.readdirSync(targetPath).filter(file => file === '.gutenrc.json');
    rcpath = results.length !== 0;
    if (!rcpath) {
      targetPath = path.dirname(targetPath);
    }
  }
  if (rcpath === true) {
    let parsingError = false;
    const gutenrc = fs.readFileSync(targetPath.concat('/.gutenrc.json'));
    let gutenfolder;
    try {
      gutenfolder = JSON.parse(gutenrc).apiDir;
    } catch (error) {
      parsingError = true;
    }
    if (parsingError) {
      return {
        absPath: targetPath.concat('/'),
        err: 'corruptJSON'
      };
    }
    if (gutenfolder === undefined) {
      return {
        absPath: 'missing'
      };
    }
    return {
      absPath: targetPath.concat('/'),
      dirName: gutenfolder
    };
  }
  return {
    absPath: 'unintialized'
  };
};

const generateFilesaveArray = (absPath, dirName) => {
  const filesToWrite = [];
  const srcPath = path.dirname(__dirname).concat('/');
  let nextPath = srcPath.concat('client/dist/styles.css');
  filesToWrite.push([fs.readFileSync(nextPath), 'styles.css']);
  nextPath = srcPath.concat('client/dist/index.html');
  filesToWrite.push([fs.readFileSync(nextPath), 'index.html']);
  nextPath = srcPath.concat('client/dist/bundle.js');
  filesToWrite.push([fs.readFileSync(nextPath), 'bundle.js']);
  nextPath = srcPath.concat('client/dist/0.bundle.js');
  filesToWrite.push([fs.readFileSync(nextPath), '0.bundle.js']);
  nextPath = srcPath.concat('client/dist/1.bundle.js');
  filesToWrite.push([fs.readFileSync(nextPath), '1.bundle.js']);
  nextPath = srcPath.concat('client/dist/gutenConfig.json');
  filesToWrite.push([fs.readFileSync(nextPath), 'gutenConfig.json']);
  nextPath = srcPath.concat('client/dist/imgs/');
  const images = fs.readdirSync(nextPath);
  images.forEach(img => filesToWrite.push([fs.readFileSync(nextPath.concat(img)), 'imgs/'.concat(img)]));

  const APIdir = absPath.concat(dirName);
  if (!fs.existsSync(APIdir)) {
    fs.mkdirSync(APIdir);
  }

  const resourceDir = APIdir.concat('resources/');
  if (!fs.existsSync(resourceDir)) {
    fs.mkdirSync(resourceDir);
  }

  const imgDir = APIdir.concat('imgs/');
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
  }

  filesToWrite.forEach(file => fs.writeFileSync(APIdir.concat(file[1]), file[0]));
};

const copyFile = (absPath, destination, cb) => fs.readFile(absPath, (err, original) => {
  if (err) console.log(err); /* eslint-disable-line no-console */
  return fs.writeFile(destination, original, (writeErr) => {
    if (writeErr) throw writeErr;
    if (cb !== undefined) {
      cb();
    }
  });
});

const findValidBackupName = (location, baseName) => {
  const backupExt = path.extname(baseName);
  let backupName = path.basename(baseName, backupExt).concat('.backup');
  let filecount = 0;
  if (fs.existsSync(location.concat(backupName).concat(backupExt))) {
    while (fs.existsSync(location.concat(backupName).concat(filecount).concat(backupExt))) {
      filecount += 1;
    }
    backupName = backupName.concat(filecount.toString());
  }
  return backupName.concat(backupExt);
};

const refreshFile = (pathData, fileName, source) => {
  /* eslint-disable-next-line no-console */
  const RCFile = pathData.absPath.concat(fileName);
  const corruptFilePrompt = inquirerOptions.corruptFilePrompt(fileName);
  const confirmDeletePrompt = inquirerOptions.confirmDeletePrompt(fileName);

  inquirer
    .prompt(corruptFilePrompt)
    .then((answer) => {
      if (answer.delete === true) {
        inquirer
          .prompt(confirmDeletePrompt.questions)
          .then((how) => {
            if (how.method === confirmDeletePrompt.options[0]) {
              // do nothing
            } else if (how.method === confirmDeletePrompt.options[1]) {
              const backupName = findValidBackupName(pathData.absPath, fileName);
              copyFile(RCFile, pathData.absPath.concat(backupName), () => {
                copyFile(pathData.absPath
                  .concat(source), RCFile);
              });
            } else if (how.method === confirmDeletePrompt.options[2]) {
              copyFile(pathData.absPath.concat(source), RCFile);
            }
          });
      }
    });
};

const fillBlanksWithDefaults = (assignedSettings, defaultSettings) => {
  const defaultConfig = fs.readFileSync(defaultSettings);
  const mergedSettings = Object.assign(JSON.parse(assignedSettings), JSON.parse(defaultConfig));
  return mergedSettings;
};

const updateConfig = (APIdir) => {
  const pathToConfigBundle = APIdir.concat('1.bundle.js');
  const pathToConfigJSON = APIdir.concat('gutenConfig.json');
  if (!fs.existsSync(APIdir)) {
    // if (!fs.existsSync(pathToConfigBundle)) {
    /* eslint-disable-next-line no-console */
    console.log(`Write Error:
    The folder specified in the .gutenrc.json file seems to be missing.  
    Update .gutenrc.json to match your API folder if you have changed the folder name,
    or call "gutendocs --reset" if and only if you have accidentally deleted it 
    and would like it to be reset to the original state.`);
  } else {
    let configSettings = fs.readFileSync(pathToConfigJSON);
    const defaultFileLoc = path.dirname(__dirname).concat('/client/dist/gutenConfig.json');
    configSettings = fillBlanksWithDefaults(configSettings, defaultFileLoc);

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

const refreshAPI = (absPath, dirName) => {
  generateFilesaveArray(absPath, dirName);
  updateConfig(absPath.concat(dirName));
};

const generateAPIFrame = (relPath, dirName) => {
  const srcPath = path.dirname(__dirname).concat('/');
  if (!fs.existsSync(relPath.concat('.gutenrc.json'))) {
    const absPath = fs.realpathSync(relPath).concat('/');
    generateFilesaveArray(absPath, dirName);
    const templateRC = fs.readFileSync(srcPath.concat('client/dist/.gutenRCTemplate.json'));
    const mergedRC = Object.assign(JSON.parse(templateRC), {
      apiDir: dirName
    });
    fs.writeFileSync(absPath.concat('.gutenrc.json'), JSON.stringify(mergedRC));
    updateConfig(absPath.concat(dirName));
  } else {
    /* eslint-disable-next-line no-console */
    console.log('You have already initialized gutendocs in this Repo.  If you want to refresh the files call "gutendocs --reset"');
  }
};

module.exports.generateAPIFrame = generateAPIFrame;
module.exports.refreshAPI = refreshAPI;
module.exports.refreshFile = refreshFile;
module.exports.updateConfig = updateConfig;
module.exports.generateFilesaveArray = generateFilesaveArray;
module.exports.findRC = findRC;