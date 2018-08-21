const fs = require('fs');
const { getRC } = require('../utils.js');
const R = require('ramda');
const { ...sortFxnsObj } = require('./sorters.js');

/**
 * @description Execute various sorting functions
 * @param commentBlocks {[]} The Cleaned AST with parsed information
 * @return ats {[]} The AST "sorted" with appropriate headers and priorities
 * assigned to it.
 */

const execSorts = (ast) => {
  const pathData = getRC();
  const gutenRC = JSON.parse(fs.readFileSync(pathData.absPath.concat('.gutenrc.json'))); 
  // options will contain sorting options for particular functions.  In this case: sectionSort
  const options = { sectionTag: gutenRC.skeleton.sortBySection.sections };
  const sortFxns = [];
  gutenRC.skeleton.sortByOrder.forEach(fxn => sortFxns.push(sortFxnsObj[fxn]));
  const sortPipe = R.pipe(...sortFxns);
  // results will be in the format [ast, priority number, and options]. Only need ast.
  return sortPipe([ast, 1, options])[0];
};


/**
 * @description This will cleanup the incoming AST structure
 * @param ast {[]} The AST with parsed information
 * @return commentBlocks {[]} Return an array of commentBlock objects.Each object
 * will be in the following format as an object:
 *
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

/* eslint-disable */

// var testa = (x) => {console.log(x); return ++x;};
// var testb = (x) => {console.log(x); return ++x;};
// var testc = (x) => {console.log(x); return ++x;};

// var arr = [testa, testb, testc]

// var pipe = R.pipe(...arr);
// pipe(4);

    // extract an array of files to be sorted
  // const sortFiles = gutenrc.skeleton.sortByOrder;
  // console.log(ast);
  // execute a piping function sequence here