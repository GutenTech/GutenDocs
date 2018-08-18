const gutenrc = require('../../.gutenrc.json');
const { sortBySection } = require('./sortBySection.js');


const execSorts = (ast) => {
  // extract an array of files to be sorted
  // const sortFiles = gutenrc.skeleton.sortByOrder;
  //console.log(ast);
  // execute a piping function sequence here
  sortBySection(ast, gutenrc.skeleton.sortBySections.sections, 1);
};

module.exports.execSorts = execSorts;

/* eslint-disable */
/*

Current Notes:
  The latest custom tag will overwrite earlier custom tags (like CSS rules),
  this allows the user to easily reassign


*/