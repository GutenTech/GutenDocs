const fs = require('fs');
const extract = require('./extract.js');
const block = require('./commentBlockParser.js');

/**
  * @description This function will save the data temporarily to the client/dist folder
*/

const saveData = (data, path) => {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
  });
};

/**
  * @description This function will scan a file and parse jsdoc block
  * and return the correct parsed output.  Only testing on a single js
  * file for now.
*/

const executeDataParse = () => {
  const path = '../../client/dist/parsedData.json';

  const out1 = extract.extract('../../mockData/multipleComments.js');
  const out2 = block.blockParser(out1);
  saveData(out2, path);
};

executeDataParse();