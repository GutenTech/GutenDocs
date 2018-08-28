const path = require('path');

/**
 * @description A wrapper function that iterates over every comment block
 * and executes a sort of blocks that haven't been sorted yet
 * @param { object } data Receive {ast, priority, options}
 * @param { function } cb sorting function to execute on block
 * @param { boolean } isCatchAll Receive {ast-array, priority-number, options-object}
 * @return { object } updatedData {ast, priority, options}
 */
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
 * whether or not end-user has specified a custom tag.
 * @param { object } data Receive {ast, priority, options}
 * @return { object } updatedData {ast, priority, options}
 */
const sortByTag = (data) => {
  const tagName = data.options.sortByTag.tag.replace('@', '');
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    alteredBlock.tags.forEach((tag) => {
      if (tag.title === tagName) {
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
 * @param { object } data Receive {ast, priority, options}
 * @return { object } updatedData {ast, priority, options}
 */
const catchAll = (data) => {
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    alteredBlock.header = data.options.catchAll.section;
    alteredBlock.priority = priority;
    return alteredBlock;
  };
  return sortWrapper(data, assignHeader, true);
};

/**
 * @description A function that will assign a general header name based on fileName
 * @param { object } data Receive {ast, priority, options}
 * @return { object } updatedData {ast, priority, options}
 */
const sortByFileName = (data) => {
  const { includeExtension } = data.options.sortByFileName;
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    const ext = path.extname(block.pathName);
    alteredBlock.header = includeExtension
      ? path.basename(block.pathName)
      : path.basename(block.pathName, ext);
    alteredBlock.priority = priority;
    return alteredBlock;
  };
  return sortWrapper(data, assignHeader);
};

/**
 * @description A function that will assign a general header name based on parentDirectory
 * @param { object } data Receive {ast, priority, options}
 * @return { ocject } updatedData {ast, priority, options}
 */
const sortByParentDirectoryName = (data) => {
  const { targetDepth } = data.options.sortByParentDirectoryName;
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    let targetFolder = block.pathName;
    for (let depth = targetDepth; depth > 0; depth -= 1) {
      targetFolder = path.dirname(targetFolder);
    }
    alteredBlock.header = path.basename(targetFolder);
    alteredBlock.priority = priority;
    return alteredBlock;
  };
  return sortWrapper(data, assignHeader);
};
module.exports.sortWrapper = sortWrapper;
module.exports.sorts = {};
module.exports.sorts.sortByParentDirectoryName = sortByParentDirectoryName;
module.exports.sorts.sortByTag = sortByTag;
module.exports.sorts.catchAll = catchAll;
module.exports.sorts.sortByFileName = sortByFileName;
