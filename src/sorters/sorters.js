const path = require('path');

const sortWrapper = (data, cb, isCatchAll) => {
  const { ast, priority, options } = data;
  const alteredBlockArray = [];
  let reactMapKey = 0;
  ast.forEach((block) => {
    let alteredBlock = Object.assign({}, block);
    if (alteredBlock.header === undefined && block.priority === undefined) {
      alteredBlock = cb(alteredBlock, priority);
    }
    if (isCatchAll) {
      reactMapKey += 1;
      alteredBlock.id = reactMapKey;
    }
    alteredBlockArray.push(alteredBlock);
  });
  return { ast: alteredBlockArray, priority: priority + 1, options };
};

/**
 * @description A function that will assign the classification headings based upon
 * whether or not end-user has specified a custom tag.  catchAllSection is option
 * see params below.
 * @param {[]} data Receive [ast-array, priority-number, options-object]
 * @return {[]} updatedData [ast-array, priority-number, options-object]
 */
const sortBySection = (data) => {
  const sectionName = data.options.sectionTag.replace('@', '');
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    alteredBlock.tags.forEach((tag) => {
      if (tag.title === sectionName) {
        alteredBlock.header = tag.description;
        alteredBlock.priority = priority;
      }
    });
    return alteredBlock;
  };
  return sortWrapper(data, assignHeader);
};

/**
  * @description A function that will assign a general header name to unclassified
  * comment blocks
  * @param {[]} data Receive [ast-array, priority-number, options-object]
  * @return {[]} ast Return the AST formatted to have priority and headers according to sections
  */


const catchAll = (data) => {
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    alteredBlock.header = data.options.catchAllTag;
    alteredBlock.priority = priority;
    return alteredBlock;
  };
  return sortWrapper(data, assignHeader, true);
};

/**
  * @description A function that will assign a general header name based on fileName
  * @param {[]} data Receive [ast-array, priority-number, options-object]
  * @return {[]} ast Return the AST formatted to have priority and headers according to sections
  */
const sortByFileName = (data) => {
  /* Function implementation goes here */
  const extension = data.options.fileTag;
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    const ext = path.extname(block.pathName);
    alteredBlock.header = extension
      ? path.basename(block.pathName)
      : path.basename(block.pathName, ext);
    alteredBlock.priority = priority;
    return alteredBlock;
  };
  return sortWrapper(data, assignHeader);
};

/**
  * @description A function that will assign a general header name based on parentDirectory
  * @param {[]} data Receive [ast-array, priority-number, options-object]
  * @return {[]} ast Return the AST formatted to have priority and headers according to sections
  */
const sortByParentDirectoryName = (data) => {
  const targetdepth = data.options.sortByParentDirectoryName;
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    let targetFolder = block.pathName;
    for (let depth = targetdepth; depth > 0; depth -= 1) {
      targetFolder = path.dirname(targetFolder);
    }
    alteredBlock.header = path.basename(targetFolder);
    alteredBlock.priority = priority;
    return alteredBlock;
  };
  return sortWrapper(data, assignHeader);
};

module.exports.sortByParentDirectoryName = sortByParentDirectoryName;
module.exports.sortBySection = sortBySection;
module.exports.catchAll = catchAll;
module.exports.sortByFileName = sortByFileName;
