const sortBySection = (ast, sectionTag, priority, catchAllSection) => {
  const sectionName = sectionTag.slice(1);
  ast.forEach((file) => {
    file.content.forEach((docBlock) => {
      docBlock.tags.forEach((tag, index) => {
        if (tag.title === sectionName) {
          /* eslint-disable */
          docBlock.header = tag.description;
          docBlock.priority = priority;
        } else if (index === docBlock.tags - 1 && tag.title !== sectionName) {
          // If section not detected, assign catchAll section (only if defined)
          docBlock.header = catchAllSection === '' ? undefined : catchAllSection;
          /* eslint-enable */
        }
      });
    });
  });
  return ast;
};

module.exports.sortBySection = sortBySection;