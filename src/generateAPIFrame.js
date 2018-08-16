const fs = require('fs');
const updateConfig = require('./updateConfig.js');
const { generateFilesaveArray } = require('./utils.js');

const generateAPIFrame = (relPath, dirName) => {
  if (!fs.existsSync(relPath.concat('.gutenrc'))) {
    const absPath = fs.realpathSync(relPath).concat('/');
    generateFilesaveArray(absPath, dirName);
    fs.writeFileSync(absPath.concat('.gutenrc'), `{ "apiDir": "${dirName}" }`);
    updateConfig(absPath.concat(dirName));
  } else {
    /* eslint-disable-next-line no-console */
    console.log('You have already initialized gutendocs in this Repo.  If you want to refresh the files call "gutendocs --reset"');
  }
};

module.exports = generateAPIFrame;