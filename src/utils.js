const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const inquirerOptions = require('./inquirerOptions.js');

/**
 * Returns a object with the defaults added to the assigned settings.
 * Userful for making sure that whenever the user has deleted settings from their
 * copy that the defaults are still available.
 * @param { string } defaultSettingsPath path to orignal file with defaults
 * @param { {} } assignedSettings settings imported from the users settings
 */
const fillBlanksWithDefaults = (defaultSettingsPath, assignedSettings) => {
  const defaultConfig = JSON.parse(fs.readFileSync(defaultSettingsPath));
  const mergedSettings = Object.assign(defaultConfig, JSON.parse(assignedSettings));
  return mergedSettings;
};

/**
 * Finds the next unused name in the directory to save a backup file
 * @param { string } location the path to the directory of intesting
 * @param { string } baseName the original name of the file being backed up
 * @example findValidBackupName('somePath', exam.js) returns exam.backup.js
 * @example findValidBackupName('somePath', exam.js) returns exam.backup0.js
 * @example findValidBackupName('somePath', exam.js) returns exam.backup1.js
 * @return string
 */
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
/**
 * Copys a files from source to destination and then executes a callback
 * @param { string } source path to the file you want to copy
 * @param { string } destination path to copy destination
 * @param { string } cb callback function to execute upon completion
 */
const copyFile = (source, destination, modifier, cb) => fs.readFile(source, (err, original) => {
  if (err) throw new Error(err);
  let fileToWrite = original.toString();
  if (typeof modifier === 'function') fileToWrite = modifier(original);
  return fs.writeFile(destination, fileToWrite, (writeErr) => {
    if (writeErr) throw writeErr;
    if (typeof cb === 'function') {
      cb();
    }
  });
});

/**
 * Overwrites target file with specified file contents
 * Prompts the user to make sure the want to complete this operations before doing it
 * If the user confirms then asks the user if they want to save a backup of current file
 * @param { string } pathData path to file to overwrite
 * @param { string } source path to source file to copy to pathData
 */
const refreshFile = (oldFile, source, additionsToTemplate, error) => {
  const fileName = path.basename(oldFile);
  const pathData = path.dirname(oldFile).concat('/');
  const corruptFilePrompt = inquirerOptions.corruptFilePrompt(fileName);
  const confirmDeletePrompt = inquirerOptions.confirmDeletePrompt(fileName);

  inquirer
    .prompt(corruptFilePrompt)
    .then((answer) => {
      if (answer.delete === false) console.error(error.message);
      if (answer.delete === true) {
        inquirer
          .prompt(confirmDeletePrompt.questions)
          .then((how) => {
            if (how.method === confirmDeletePrompt.options[0]) {
              // do nothing
            } else if (how.method === confirmDeletePrompt.options[1]) {
              const backupName = findValidBackupName(pathData, fileName);
              copyFile(
                oldFile,
                pathData.concat(backupName),
                null,
                () => copyFile(
                  pathData.concat(source),
                  oldFile,
                  additionsToTemplate,
                ),
              );
            } else if (how.method === confirmDeletePrompt.options[2]) {
              copyFile(pathData.concat(source), oldFile, additionsToTemplate);
            }
          });
      }
    });
};
/**
 * Finds the closet gutenRC.json file at or above current directory and
 * returns the JSON Object containing the users settings merged with the defaults
 * @return { {} } contents of .gutenRC.json
 */
const getRC = () => {
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
      refreshFile(targetPath.concat('/.gutenrc.json'),
        'client/dist/.gutenRCTemplate.json', null, error);
      return false;
    }
    if (gutenfolder === undefined) {
      throw new Error('Your gutenrc folder seems to be missing a apiDir key indicating where the folder should be. Either add a key of apiDir with a value of the name of your api folder or delete the RC file and reinitialize.  A backup of your Api Folder will be created as [folderName].backup#.');
    }
    const RCTemplatePath = path.dirname(__dirname).concat('/client/dist/.gutenRCTemplate.json');
    const missingValuesFilled = fillBlanksWithDefaults(RCTemplatePath, gutenrc);
    return Object.assign({ absPath: targetPath.concat('/') }, missingValuesFilled);
  }
  throw new Error('You have not initialized gutendocs.  Call "gutendocs init"');
};

/**
 * Function used to test a filename as to whether or not we want to include it
 * Used when filtering a list of files that were read using fs.readDir
 * @param { string } file name of the file being checked
 * @param { string } dirPath directory of the files being checked
 * @param { [] } toIgnore array of filenames to ignore
 * @return { boolean } indicates whether or not this is a file of interest
 */
const filterFiles = (file, dirPath, toIgnore) => {
  const fieslToIgnore = toIgnore || ['.DS_Store', '.gutenRCTemplate.json'];
  if (fieslToIgnore.includes(file)) return false;
  if (fs.lstatSync(dirPath.concat(file)).isDirectory()) return false;
  return true;
};

/**
 * Generates the files needed to have a gutendocs API
 * by copying them from the gutendocs client folder
 * @param { string } destination the path to the directory the API folder should be made in
 * @param { string } dirName the name of the folder the API dir should have
 * @param { boolean } backup whether or not to make a backup folder
 */
const generateFilesaveArray = (destination, dirName, backup) => {
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

  const APIdir = destination.concat(dirName);
  if (fs.existsSync(APIdir) && backup) {
    const BackupDirName = findValidBackupName(destination, dirName);
    fs.renameSync(APIdir, destination.concat(BackupDirName));
    fs.mkdirSync(APIdir);
  }
  if (!fs.existsSync(APIdir)) {
    fs.mkdirSync(APIdir);
  }

  const imgDir = APIdir.concat('imgs/');
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

  filesToWrite.forEach(file => fs.writeFileSync(APIdir.concat(file.writePath), file.content));
};

/**
 * Updates the config guten api to have all the config settings from gutenCofig.json
 * @param { {} } gutenrc the rc file for gutendocs
 */
const updateConfig = (gutenrc) => {
  const GutenAPIDir = gutenrc.absPath.concat(gutenrc.apiDir);
  const pathToConfigBundle = GutenAPIDir.concat('1.bundle.js');
  const pathToConfigJSON = GutenAPIDir.concat('gutenConfig.json');
  if (!fs.existsSync(GutenAPIDir)) {
    throw new Error('Write Error:'
    + 'The folder specified in the .gutenrc.json file seems to be missing.'
    + 'Update .gutenrc.json to match your API folder if you have changed the folder name,'
    + 'or call "gutendocs reset" if and only if you have accidentally deleted it'
    + 'and would like it to be reset to the original state.');
  } else {
    let configSettings = fs.readFileSync(pathToConfigJSON);
    const defaultFileLoc = path.dirname(__dirname).concat('/client/dist/gutenConfig.json');
    configSettings = fillBlanksWithDefaults(defaultFileLoc, configSettings);

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

/**
 * refreshes the API with all the settings to the defauts
 * @param { {} } gutenrc the gutenrc object the defines the users settings
 * @param { boolean } backup whether or not to make a backup folder
 */
const refreshAPI = (gutenrc, backup) => {
  generateFilesaveArray(gutenrc.absPath, gutenrc.apiDir, backup);
  updateConfig(gutenrc);
};

/**
 * Generates a API folder as well as a gutenRC file
 * @param { string } relPath the directory that the user wants to make the APIDir
 * @param { string } dirName the desired name of the APIDir
 */
const generateAPIFrame = (relPath, apiDir) => {
  const srcPath = path.dirname(__dirname).concat('/');
  const absPath = fs.realpathSync(relPath).concat('/');
  if (!fs.existsSync(relPath.concat('.gutenrc.json'))) {
    generateFilesaveArray(absPath, apiDir);
    const templateRC = fs.readFileSync(srcPath.concat('client/dist/.gutenRCTemplate.json'));
    const mergedRC = Object.assign(JSON.parse(templateRC), {
      apiDir,
    });
    fs.writeFileSync(absPath.concat('.gutenrc.json'), JSON.stringify(mergedRC, null, 2));
  } else {
    throw Error('You have already initialized gutendocs in this Repo.  If you want to refresh the files call "gutendocs --reset"');
  }
  updateConfig({ absPath, apiDir });
};

/**
 * Sets the verbosity level in the local and sometimes the global settings
 * @param { number } level the desired verbosity level
 * @param { {} } gutenrc the local gutenRC settings
 * @param { boolean } globally whether or not the global settings should also be set
 */
const setVerbosity = (level, gutenrc, globally) => {
  if (typeof level === 'number' && level >= 0 && level <= 5) {
    if (gutenrc) {
      let newSettings = JSON.parse(fs.readFileSync(gutenrc.absPath.concat('.gutenrc.json')));
      newSettings.verbosity = level;
      newSettings = JSON.stringify(newSettings, null, 2);
      fs.writeFileSync(gutenrc.absPath.concat('.gutenrc.json'), newSettings);
    }
    if (globally) {
      const pathToGlobal = path.dirname(__dirname).concat('/client/dist/.gutenRCTemplate.json');
      let globalSettings = JSON.parse(fs.readFileSync(pathToGlobal));
      globalSettings.verbosity = level;
      delete globalSettings.absPath;
      globalSettings = JSON.stringify(globalSettings, null, 2);
      fs.writeFileSync(pathToGlobal, globalSettings);
    }
    return;
  }
  throw new Error('Verbosity level must be a number from 0 to 5');
};

module.exports.setVerbosity = setVerbosity;
module.exports.generateAPIFrame = generateAPIFrame;
module.exports.refreshAPI = refreshAPI;
module.exports.refreshFile = refreshFile;
module.exports.updateConfig = updateConfig;
module.exports.generateFilesaveArray = generateFilesaveArray;
module.exports.getRC = getRC;