const fs = require('fs');
const path = require('path');

const findRC = (cb) => {
  let rcpath = false;
  let targetPath = fs.realpathSync('./');
  while (rcpath === false && path.dirname(targetPath) !== '/') {
    const results = fs.readdirSync(targetPath).filter(file => file === '.gutenrc');
    rcpath = results.length !== 0;
    if (!rcpath) { targetPath = path.dirname(targetPath); }
  }
  if (rcpath === true) {
    const gutenrc = fs.readFileSync(targetPath.concat('/.gutenrc'));
    const gutenfolder = JSON.parse(gutenrc).apiDir;
    cb(null, [targetPath, gutenfolder]);
  } else {
    cb(true, null);
  }
};

module.exports.findRC = findRC;