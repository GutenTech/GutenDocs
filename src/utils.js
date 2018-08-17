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
    return { absPath: targetPath.concat('/'), dirName: gutenfolder };
  }
  return false;
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

  // fs.writeFileSync(APIdir.concat(.gutenrc), file[0]);
};

module.exports.generateFilesaveArray = generateFilesaveArray;
module.exports.findRC = findRC;