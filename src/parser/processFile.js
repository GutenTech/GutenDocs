const fs = require('fs');
const extract = require('./extract.js');
const block = require('./commentBlockParser.js');


/**
  * @description This function will scan a file and parse jsdoc block
  * and return the correct parsed output.  Only testing on a single js
  * file for now.
*/

const test = () => {
  const fileName = 'output123.txt';
  const path = '../../client/dist';
  
  const out1 = extract.extract('../../mockData/multipleComments.js');
  const out2 = block.blockParser(out1);
  //console.log(JSON.parse(out2));
  //fs.writeFileSync(fileName, finalParsedOutput);
};

test ();