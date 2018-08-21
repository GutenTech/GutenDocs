const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const inquirerOptions = require('./inquirerOptions.js');

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

const copyFile = (absPath, destination, cb) => fs.readFile(absPath, (err, original) => {
  if (err) console.log(err);
  return fs.writeFile(destination, original, (writeErr) => {
    if (writeErr) throw writeErr;
    if (cb !== undefined) {
      cb();
    }
  });
});

const refreshFile = (pathData, fileName, source) => {
  const RCFile = pathData.concat(fileName);
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
              const backupName = findValidBackupName(pathData, fileName);
              copyFile(RCFile, pathData.concat(backupName), () => {
                copyFile(pathData
                  .concat(source), RCFile);
              });
            } else if (how.method === confirmDeletePrompt.options[2]) {
              copyFile(pathData.concat(source), RCFile);
            }
          });
      }
    });
};

const returnRC = () => {
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
    const gutenrc = fs.readFileSync(targetPath.concat('/.gutenrc.json'));
    let gutenfolder;
    try {
      gutenfolder = JSON.parse(gutenrc).apiDir;
    } catch (error) {
      // throw new TypeError('Invalid JSON');
      refreshFile(targetPath.concat('/'), '.gutenrc.json', 'client/dist/.gutenRCTemplate.json');
      return false;
    }
    if (gutenfolder === undefined) {
      throw new TypeError('Your gutenrc folder seems to be missing a apiDir key indicating where the folder should be.');
    }
    return {
      absPath: targetPath.concat('/'),
      dirName: gutenfolder,
    };
  }
  throw new TypeError('You have not initialized gutendocs.  Call "gutendocs --init"');
};

const findRC = () => {
  let pathData;
  let success = true;
  try {
    pathData = returnRC();
  } catch (err) {
    success = false;
    /* eslint-disable-next-line no-console */
    console.log(err.lineNumber);
    console.log(err);
  }
  if (success) {
    return pathData;
  }
  return false;
};

const filterFiles = (file, dirPath, toIgnore) => {
  const fieslToIgnore = toIgnore || ['.DS_Store'];
  if (fieslToIgnore.includes(file)) return false;
  if (fs.lstatSync(dirPath.concat(file)).isDirectory()) return false;
  return true;
};

const generateFilesaveArray = (absPath, dirName) => {
  const filesToWrite = [];
  const srcPath = path.dirname(__dirname).concat('/client/dist/');
  const srcFiles = fs.readdirSync(srcPath).filter(file => filterFiles(file, srcPath));
  srcFiles.forEach(file => filesToWrite.push(
    {
      content: fs.readFileSync(srcPath.concat(file)),
      writePath: file,
    },
  ));

  const imgPath = srcPath.concat('imgs/');
  const images = fs.readdirSync(imgPath).filter(file => filterFiles(file, imgPath));
  images.forEach(img => filesToWrite.push(
    {
      content: fs.readFileSync(imgPath.concat(img)),
      writePath: 'imgs/'.concat(img),
    },
  ));

  const APIdir = absPath.concat(dirName);
  if (!fs.existsSync(APIdir)) fs.mkdirSync(APIdir);

  const imgDir = APIdir.concat('imgs/');
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

  filesToWrite.forEach(file => fs.writeFileSync(APIdir.concat(file.writePath), file.content));
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
      apiDir: dirName,
    });
    fs.writeFileSync(absPath.concat('.gutenrc.json'), JSON.stringify(mergedRC, null, 2));
    updateConfig(absPath.concat(dirName));
  } else {
    console.log('You have already initialized gutendocs in this Repo.  If you want to refresh the files call "gutendocs --reset"');
  }
};

module.exports.generateAPIFrame = generateAPIFrame;
module.exports.refreshAPI = refreshAPI;
module.exports.refreshFile = refreshFile;
module.exports.updateConfig = updateConfig;
module.exports.generateFilesaveArray = generateFilesaveArray;
module.exports.findRC = findRC;