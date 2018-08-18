const gutenrc = require('../../.gutenrc.json');
const { sortBySection } = require('./sortBySection.js');


const execSorts = (ast) => {
  // extract an array of files to be sorted
  // const sortFiles = gutenrc.skeleton.sortByOrder;
  //console.log(ast);
  // execute a piping function sequence here
  sortBySection(ast, gutenrc.skeleton.sortBySections.sections);
};

module.exports.execSorts = execSorts;