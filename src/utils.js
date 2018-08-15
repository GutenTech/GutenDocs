const fs = require('fs');
const path = require('path');

const findRC = () => {
  let rcpath = false;
  let targetPath = fs.realpathSync('./');
  while (rcpath === false && targetPath !== path.dirname(targetPath)) {
    const results = fs.readdirSync(targetPath).filter(file => file === '.gutenrc');
    rcpath = results.length !== 0;
    if (!rcpath) {
      targetPath = path.dirname(targetPath);
    }
  }

  if (rcpath === true) {
    const gutenrc = fs.readFileSync(targetPath.concat('/.gutenrc'));
    const gutenfolder = JSON.parse(gutenrc).apiDir;
    return [targetPath, gutenfolder];
  }
  return false;
};

const generateFilesaveArray = (myPath, filePath, saveDir) => {
  const filesToWrite = [];
  let nextPath = myPath.concat('/client/dist/styles.css');
  filesToWrite.push([fs.readFileSync(nextPath), 'styles.css']);
  nextPath = myPath.concat('/client/dist/index.html');
  filesToWrite.push([fs.readFileSync(nextPath), 'index.html']);
  nextPath = myPath.concat('/client/dist/bundle.js');
  filesToWrite.push([fs.readFileSync(nextPath), 'bundle.js']);
  nextPath = myPath.concat('/client/dist/0.bundle.js');
  filesToWrite.push([fs.readFileSync(nextPath), '0.bundle.js']);
  nextPath = myPath.concat('/client/dist/1.bundle.js');
  filesToWrite.push([fs.readFileSync(nextPath), '1.bundle.js']);
  nextPath = myPath.concat('/client/dist/gutenConfig.json');
  filesToWrite.push([fs.readFileSync(nextPath), 'gutenConfig.json']);

  const APIdir = filePath.concat('/').concat(saveDir);
  if (!fs.existsSync(APIdir)) {
    fs.mkdirSync(APIdir);
  }
  const resourceDir = APIdir.concat('/resources');
  if (!fs.existsSync(resourceDir)) {
    fs.mkdirSync(resourceDir);
  }
  const outPutPath = filePath.concat('/').concat(saveDir);
  filesToWrite.forEach(file => fs.writeFileSync(outPutPath.concat(file[1]), file[0]));
};

module.exports.generateFilesaveArray = generateFilesaveArray;
module.exports.findRC = findRC;