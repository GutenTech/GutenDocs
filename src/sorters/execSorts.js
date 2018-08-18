// const gutenrc = require('../../.gutenrc.json');
const { sortBySection } = require('./sortBySection.js');


const execSorts = (ast) => {
  // extract an array of files to be sorted
  // const sortFiles = gutenrc.skeleton.sortByOrder;

  // execute a piping function sequence here
  sortBySection();
};

module.exports.execSorts = execSorts;