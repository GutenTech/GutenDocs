const { generateFilesaveArray } = require('./utils.js');
const updateConfig = require('./updateConfig.js');

const refreshAPI = (absPath, dirName) => {
  generateFilesaveArray(absPath, dirName);
  updateConfig(absPath.concat(dirName));
};

module.exports = refreshAPI;