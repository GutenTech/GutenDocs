/**
 * @description An internal helper function that processes and checks if a header/priority exist
 * @param header {{string}} The value to be set as the header
 * @param priority {{number}} The value to be set as the priority
 * @return n/a as Array is passed by reference.
 */

 const _processBlocks = (header, priority) {
   
 }


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
          block.priority = priority;
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
  const priority = data[1];
  const options = data[2];

  const sectionName = sectionTag.slice(1);

  commentBlocks.forEach((block) => {
    if (block.header === undefined && block.priority === undefined) {
      block.tags.forEach((tag) => {
        if (tag.title === sectionName) {
          /* eslint-disable */
          block.header = sectionName;
          block.priority = priority;
          /* eslint-enable */
        }
      });
    }
  });

  return commentBlocks;
};

module.exports.sortBySection = sortBySection;
module.exports.sortByFiles = sortByFiles;