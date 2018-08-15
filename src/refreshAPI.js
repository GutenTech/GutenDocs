const fs = require('fs');

const generateAPIFrame = (path, saveDir) => {
  const filesToWrite = [];
  const myPath = __dirname.concat('/..');
  filesToWrite.push([fs.readFileSync(myPath.concat('/client/dist/styles.css')), 'styles.css']);
  filesToWrite.push([fs.readFileSync(myPath.concat('/client/dist/index.html')), 'gutenapi.html']);
  filesToWrite.push([fs.readFileSync(myPath.concat('/client/dist/bundle.js')), 'bundle.js']);
  filesToWrite.push([fs.readFileSync(myPath.concat('/client/dist/0.bundle.js')), '0.bundle.js']);
  filesToWrite.push([fs.readFileSync(myPath.concat('/client/dist/1.bundle.js')), '1.bundle.js']);
  filesToWrite.push([fs.readFileSync(myPath.concat('/client/dist/gutenConfig.json')), 'gutenConfig.json']);

  if (!fs.existsSync(path.concat('/').concat(saveDir))) {
    fs.mkdirSync(path.concat('/').concat(saveDir));
  }

  filesToWrite.forEach(file => fs.writeFileSync(path.concat('/').concat(saveDir).concat(file[1]), file[0]));
};

module.exports = generateAPIFrame;