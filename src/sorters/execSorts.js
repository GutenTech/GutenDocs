const R = require('ramda');
const { getRC } = require('../utils.js');
const { ...sortFxnsObj } = require('./sorters.js');

/**
 * @description Execute various sorting functions
 * @param {[]} ast The Cleaned with parsed information
 * @return {[]} ast The AST "sorted" with appropriate headers and priorities
 * assigned to it.
 */

const execSorts = (ast) => {
  const gutenRC = getRC();
  // options will contain sorting options for particular functions.  In this case: sectionSort
  const options = {
    sectionTag: gutenRC.skeleton.sortBySection.section,
    catchAllTag: gutenRC.skeleton.catchAll.section,
  };
  const sortFxns = [];
  gutenRC.skeleton.sortByOrder.forEach(fxn => sortFxns.push(sortFxnsObj[fxn]));
  const sortPipe = R.pipe(...sortFxns);
  // results will be in the format [ast, priority number, and options]. Only need ast.
  return (sortPipe([ast, 1, options])[0]);
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
 *   tags: [{title: (string), description: (string)}]
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