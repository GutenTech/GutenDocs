/**
 * @description A function that will assign the classification headings based upon
 * whether or not end-user has specified a custom tag.  catchAllSection is option
 * see params below.
 * @param ast {[]} The AST with parsed information
 * @param sectionTag {string} The matcher section tag to be searched for
 * @param priority {number} The priority in which the sorting fxn was called in pipe
 * @param catchAllSection {string} catchAllSection, if defined (and not a blank string)
 * will file sections that are not labeled
 */


const sortBySection = (ast, sectionTag, priority, catchAllSection) => {
  const sectionName = sectionTag.slice(1);
  ast.forEach((file) => {
    file.content.forEach((docBlock) => {
      docBlock.tags.forEach((tag, index) => {
        if (tag.title === sectionName) {
          /* eslint-disable */
          docBlock.header = tag.description;
          docBlock.priority = priority;
        } else if (index === docBlock.tags.length - 1 && tag.title !== sectionName) {
          // If section not detected yet, assign catchAll section and priority (only if defined)
          if (docBlock.header === undefined && docBlock.priority === undefined) {
            // increase priority by one to place catchAll Section at end, as no more sorts later 
            docBlock.priority = catchAllSection === '' ? undefined : priority + 1;
            docBlock.header = catchAllSection === '' ? undefined : catchAllSection;
            /* eslint-enable */
          }
        }
      });
    });
  });
  console.log(JSON.stringify(ast));
  return ast;
};

module.exports.sortBySection = sortBySection;