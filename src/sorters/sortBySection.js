/**
 * @description A function that will assign the classification headings based upon
 * whether or not end-user has specified a custom tag.  catchAllSection is option
 * see params below.
 * @param ast {[]} The AST with parsed information
 * @param sectionTag {string} The matcher section tag to be searched for
 * @param priority {number} The priority in which the sorting fxn was called in pipe
 * @return ast {[]} Return the AST formatted to have priority and headers according to sections
 */


const sortBySection = (ast, sectionTag, priority) => {
  if (!(ast instanceof Array)) {
    throw new TypeError('sortBySection Error: Must Receive Parsed Data as an Array');
  }

  if ((ast.length === 0)) {
    throw new TypeError('sortBySection Error: Parsed Data Array Must Contain Values');
  }

  // if (!(typeof (sectionTag) !== 'string')) {
  //   throw new TypeError('sortBySection Error: Section Tag Must Be In String Format');
  // }

  // if (!(priority instanceof Number)) {
  //   throw new TypeError('sortBySection Error: priority must be of type "Number"');
  // }

  const sectionName = sectionTag.slice(1);
  ast.forEach((file) => {
    file.content.forEach((docBlock) => {
      docBlock.tags.forEach((tag) => {
        if (tag.title === sectionName) {
          /* eslint-disable */
          docBlock.header = tag.description;
          docBlock.priority = priority;
          /* eslint-enable */
        }
      });
    });
  });
  //console.log(JSON.stringify(ast));
  return ast;
};

module.exports.sortBySection = sortBySection;