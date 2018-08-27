const fs = require('fs');
const R = require('ramda');
const { getRC } = require('../utils.js');
const { sorts } = require('./sorters.js');

/**
 * loads all the custom function definitions defined in gutenRC
 * @param { object } gutenRC the settings file retrieved by getRC()
 * @return {} { CustomSorters, CustomOptions }
 * @example
 * returns {
 *  {
 *    sorterName: [Function],
 *    sorterNameTwo: [Function]
 *  },
 *  {
 *    sorterName: {
 *      "someSpecOne": "fred"
 *    },
 *    sorterNameTwo: {
 *      "someSpecOne": "bob"
 *    }
 *  }
 * }
 */
const getCustomFunctions = (gutenRC) => {
  const { customSorters } = gutenRC;
  const loadedCustomSorters = {};
  const loadedCustomOptions = {};
  Object.keys(customSorters).forEach((sorter) => {
    const pathToSorter = gutenRC.absPath
      .concat(gutenRC.apiDir)
      .concat(customSorters[sorter].sorterRelPath);
    if (fs.existsSync(pathToSorter)) {
      /* eslint-disable-next-line */
      const customFuntion = require(pathToSorter);
      loadedCustomSorters[sorter] = customFuntion;
      loadedCustomOptions[sorter] = customSorters[sorter].sorterSpecs;
    }
  });
  return { loadedCustomSorters, loadedCustomOptions };
};

/**
 * @description Execute various sorting functions
 * @param {[]} ast The Cleaned AST with parsed information
 * @return {[]} ast The AST "sorted" with appropriate headers and priorities
 * assigned to it.
 */

const execSorts = (ast) => {
  const gutenRC = getRC();

  const { loadedCustomSorters, loadedCustomOptions } = getCustomFunctions(gutenRC);
  let options = gutenRC.skeleton;
  options = Object.assign(loadedCustomOptions, options);
  options = Object.assign(loadedCustomOptions, options);
  const { ...sortFxnsObj } = Object.assign(loadedCustomSorters, sorts);
  const sortFxns = [];
  gutenRC.skeleton.sortByOrder.forEach((fxn) => {
    if (sortFxnsObj[fxn] !== undefined) sortFxns.push(sortFxnsObj[fxn]);
    else {
      /* eslint-disable-next-line no-console */
      console.log('\nComment Sorting Error:\n'
      + '******************\n'
      + `${fxn} is not a function.\nRemove it from .gutenrc.skelete.sortBtOrder array.`
      + '  Continuing to parse without it.\n'
      + '******************');
    }
  });
  sortFxns.push(sortFxnsObj.catchAll);
  const sortPipe = R.pipe(...sortFxns);
  // results will be in the format [ast, priority number, and options]. Only need ast.
  return sortPipe({ ast, priority: 1, options }).ast;
};


/**
 * @description This will cleanup the incoming AST structure
 * @param {[]} ast The AST with parsed information
 * @return {[]} commentBlocks Return an array of commentBlock objects.
 * @example return
 *  {
 *   header: (string or undefined),
 *   priority: (number or undefined),
 *   description: (string),
 *   tags: [{title: (string), description: (string)}],
 *   name: commentBlock.name,
 *   pathName: file.fileName
 *  }
 */

const cleanAST = (ast) => {
  const commentBlocks = [];

  ast.forEach((file) => {
    file.content.forEach((commentBlock) => {
      commentBlocks.push({
        header: undefined,
        priority: undefined,
        description: commentBlock.description,
        tags: commentBlock.tags,
        name: commentBlock.name,
        pathName: file.fileName,
      });
    });
  });

  return commentBlocks;
};

module.exports.execSorts = execSorts;
module.exports.cleanAST = cleanAST;