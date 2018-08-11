var fs = require('fs');

const genContent = () => {
  const content = '<!DOCTYPE html> \n'  
                  + '<html> \n' 
                  + '<head> \n'
                  + ' \t <meta charset="utf-8"/>'
                  + ' \t <title>GutenDocs</title>'
                  + '<link rel="stylesheet" type="text/css" href="main.css" />'
                  + '</head>'
                  + '<body>'
                  + '<div id="app"></div>'
  return content;
};

const genIndexFile = () => {
  const path = './index.html';
  const content = genContent();
  fs.writeFileSync(path, content);
};
module.exports.genIndex = genIndexFile;