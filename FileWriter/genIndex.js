var fs = require('fs');

const genContent = () => {
  const content = '<!DOCTYPE html> \n'  
                  + '<html> \n' 
                  + '<head> \n'
                  + ' \t <meta charset="utf-8"/> \n'
                  + ' \t <title>GutenDocs</title> \n'
                  + '<link rel="stylesheet" type="text/css" href="main.css" /> \n'
                  + '</head> \n'
                  + '<body> \n'
                  + '<div id="app"></div> \n'
                  + '<script type="text/javascript" src="bundle.js"></script> \n'
                  + '</body> \n'
                  + '</html> \n';
  return content;
};

const genIndexFile = () => {
  const path = './index.html';
  const content = genContent();
  fs.writeFileSync(path, content);
};
module.exports.genIndex = genIndexFile;