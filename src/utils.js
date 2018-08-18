const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

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
      return { absPath: targetPath.concat('/'), err: 'corruptJSON' };
    }
    if (gutenfolder === undefined) {
      return { absPath: 'missing' };
    }
    return { absPath: targetPath.concat('/'), dirName: gutenfolder };
  }
  return { absPath: 'unintialized' };
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

const replaceTheRCFile = (pathData) => {
  /* eslint-disable-next-line no-console */
  const RCFile = pathData.absPath.concat('.gutenrc.json');
  /* eslint-disable-next-line no-console */
  console.log('Your .gutenrc.json file seems to no longer be a valid json file.');
  const corruptJSONPrompt = [
    {
      type: 'confirm', name: 'deleteRC', message: 'Can I erase the existing file and replace it with the default settings?', default: false,
    },
  ];
  const confirmDeletePrompt = [
    {
      type: 'list',
      name: 'method',
      message: `You could lose the information currently in the file.
      Are you sure you want to overwrite it?`,
      choices: [
        'I changed my mind, dont delete my .gutenrc.json',
        'Save a copy as .gutenrc.backup',
        'Just overwrite it.',
      ],
    },
  ];

  inquirer
    .prompt(corruptJSONPrompt)
    .then((answer) => {
      if (answer.deleteRC === true) {
        inquirer
          .prompt(confirmDeletePrompt)
          .then((how) => {
            if (how.method === 'I changed my mind, dont delete my .gutenrc.json') {
              // do nothing
            } else if (how.method === 'Save a copy as .gutenrc.backup') {
              copyFile(RCFile, pathData.absPath.concat('.gutenrc.backup'), () => {
                copyFile(pathData.absPath.concat('client/dist/.gutenRCTemplate.json'), RCFile);
              });
            } else if (how.method === 'Just overwrite it.') {
              copyFile(pathData.absPath.concat('client/dist/.gutenRCTemplate'), RCFile);
            }
          });
      }
    });
};

module.exports.replaceTheRCFile = replaceTheRCFile;
module.exports.generateFilesaveArray = generateFilesaveArray;
module.exports.findRC = findRC;