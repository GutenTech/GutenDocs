const fs = require('fs');
const updateConfig = require('./updateConfig.js');
const { generateFilesaveArray } = require('./utils.js');

const generateAPIFrame = (path, saveDir) => {
  if (!fs.existsSync(path.concat('.gutenrc'))) {
    const myPath = __dirname.concat('/..');
    generateFilesaveArray(myPath, path, saveDir);

    fs.writeFileSync(path.concat('.gutenrc'), `{ "apiDir": "${saveDir}" }`);
    updateConfig(path.concat(saveDir));
  } else {
    /* eslint-disable-next-line no-console */
    console.log('You have already initialized gutendocs in this Repo.  If you want to refresh the files call "gutendocs --reset"');
  }
};

module.exports = generateAPIFrame;