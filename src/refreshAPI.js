const { generateFilesaveArray } = require('./utils.js');
const updateConfig = require('./updateConfig.js');

const refreshAPI = (path, saveDir) => {
  const myPath = __dirname.concat('/..');
  generateFilesaveArray(myPath, path, saveDir);
  updateConfig(path.concat('/').concat(saveDir));
};

module.exports = refreshAPI;