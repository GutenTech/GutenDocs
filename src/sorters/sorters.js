/**
 * @description A function that will assign the classification headings based upon
 * whether or not end-user has specified a custom tag.  catchAllSection is option
 * see params below.
 * @param {[]} data Receive [ast-array, priority-number, options-object]
 * @return {[]} updatedData [ast-array, priority-number, options-object]
 */
const sortBySection = (data) => {
  const commentBlocks = data[0];
  const sectionName = data[2].sectionTag.slice(1);

  commentBlocks.forEach((block) => {
    if (block.header === undefined && block.priority === undefined) {
      block.tags.forEach((tag) => {
        if (tag.title === sectionName) {
          /* eslint-disable */
          block.header = tag.description;
          block.priority = data[1];
          /* eslint-enable */
        }
      });
    }
  });

  return [commentBlocks, data[1] + 1, data[2]];
};

/**
  * @description A function that will assign a general header name to unclassified
  * comment blocks
  * @param {[]} data Receive [ast-array, priority-number, options-object]
  * @return {[]} ast Return the AST formatted to have priority and headers according to sections
  */
const catchAll = (data) => {
  const commentBlocks = data[0];
  let reactMapKey = 0;

  commentBlocks.forEach((block) => {
    if (block.header === undefined && block.priority === undefined) {
      /* eslint-disable */
      block.header = data[2].catchAllTag;
      block.priority = data[1];
    }
    // Assign a unique ID key for reactMapping
    reactMapKey += 1;
    block.id = reactMapKey;
    /* eslint-enable */
  });

  return [commentBlocks, data[1] + 1, data[2]];
};

/**
  * @description A function that will assign a general header name based on fileName
  * @param {[]} data Receive [ast-array, priority-number, options-object]
  * @return {[]} ast Return the AST formatted to have priority and headers according to sections
  */
const sortByFileName = (data) => {
  /* Function implementation goes here */
  const commentBlocks = data[0];
  return [commentBlocks, data[1] + 1, data[2]];
};

module.exports.sortBySection = sortBySection;
module.exports.catchAll = catchAll;
module.exports.sortByFileName = sortByFileName;
