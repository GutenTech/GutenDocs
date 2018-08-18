const fs = require('fs');
const path = require('path');
const updateConfig = require('./updateConfig.js');
const { generateFilesaveArray } = require('./utils.js');

const generateAPIFrame = (relPath, dirName) => {
  const srcPath = path.dirname(__dirname).concat('/');
  if (!fs.existsSync(relPath.concat('.gutenrc.json'))) {
    const absPath = fs.realpathSync(relPath).concat('/');
    generateFilesaveArray(absPath, dirName);
    const templateRC = fs.readFileSync(srcPath.concat('client/dist/.gutenRCTemplate.json'));
    const mergedRC = Object.assign(JSON.parse(templateRC), { apiDir: dirName });
    fs.writeFileSync(absPath.concat('.gutenrc.json'), JSON.stringify(mergedRC));
    updateConfig(absPath.concat(dirName));
  } else {
    /* eslint-disable-next-line no-console */
    console.log('You have already initialized gutendocs in this Repo.  If you want to refresh the files call "gutendocs --reset"');
  }
};

module.exports = generateAPIFrame;