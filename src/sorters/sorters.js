/**
 * @description A function that will assign the classification headings based upon
 * whether or not end-user has specified a custom tag.  catchAllSection is option
 * see params below.
 * @param data {[]} Receive [ast-array, priority-number, options-object]
 * @return updatedData {[]} [ast-array, priority-number, options-object]
 */

const sortBySection = (data) => {
  const commentBlocks = data[0];
  const sectionName = data[2].sectionTag.slice(1);

  commentBlocks.forEach((block) => {
    if (block.header === undefined && block.priority === undefined) {
      block.tags.forEach((tag) => {
        if (tag.title === sectionName) {
          /* eslint-disable */
          block.header = sectionName;
          block.priority = data[1];
          /* eslint-enable */
        }
      });
    }
  });

  return [commentBlocks, data[1] + 1, data[2]];
};

/**
 * @description A function that will assign the classification headings based upon
 * the filename of the comment block
 * @param ast {[]} The AST with parsed information
 * @param sectionTag {string} The matcher section tag to be searched for
 * @param priority {number} The priority in which the sorting fxn was called in pipe
 * @return ast {[]} Return the AST formatted to have priority and headers according to sections
 */


const sortByFiles = (data) => {
  const commentBlocks = data[0];
  
  //console.log('in sort by files function');

  // commentBlocks.forEach((block) => {
  //   if (block.header === undefined && block.priority === undefined) {
  //     block.tags.forEach((tag) => {
  //       if (tag.title === sectionName) {
  //         /* eslint-disable */
  //         block.header = sectionName;
  //         block.priority = priority;
  //         /* eslint-enable */
  //       }
  //     });
  //   }
  // });

  return [commentBlocks, data[1] + 1, data[2]];
};

module.exports.sortBySection = sortBySection;
module.exports.sortByFiles = sortByFiles;