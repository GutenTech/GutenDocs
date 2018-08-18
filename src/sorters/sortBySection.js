/* eslint-disable */

const sortBySection = (ast, sectionTag, priority) => {
  //const sectionName = sectionTag.slice(1);
  sectionName = 'section';
  ast.forEach((file) => {
    //check if comment block has matching section tag in file's content array
    file.content.forEach((docBlock) => {
      docBlock.tags.forEach((tag) => {
        if (tag.title === sectionName) {
          //we have found a matching section tag name, assign header/priority
          docBlock.header = tag.description;
          docBlock.priority = priority;
        }
      });
    });
  });
  return ast;
};

module.exports.sortBySection = sortBySection;