/**
  * @description This function will scan a file and parse jsdoc block
  * and return the correct parsed output.  Only testing on a single js
  * file for now.
*/

const blockParser = require('./commentBlockParser.js');
const extract = require('./extract.js');

const test = () => {
  const extractionResult = extract('../../mockData/multipleComments.js');
  const finalParsedOutput = blockParser(extractionResult);
  return finalParsedOutput;
};

module.exports.test = test;