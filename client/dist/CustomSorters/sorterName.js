// TODO use this file as a template.  You can copy and rename it whatever you want
// TODO make sure you edit the .gutenrc file to define the custom options as well as
// TODO the path and the function name

/*
! this is an example of what an alteredblock has available for you to define sort from
  {
    "description": "description from outside the tags array",
    "tags": [
      {
        "title": "the type of tag it is (if it were a @param tag this would be "param")",
        "description": "the description of the tag"
      },
    ],
    "name": "the name of the function",
    "pathName": "Path/to/your/file.js",
  },
*/

// TODO add any modules you might need

/**
 * @description A function a user can define how they want to sort functions with
 * @param { {} } data Receive {ast, priority, options}
 * @return { {} } updatedData {ast, priority, options}
 */
module.exports = (data) => {
  // TODO Change "sorterName to match the name indicated in the gutenRC folder"
  const customOptionsFromGutenRC = data.options.sorterName;
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);
    alteredBlock.priority = priority;

    // TODO This is where you will want to impliment the conditions of your sort
    alteredBlock.header = customOptionsFromGutenRC.someSpecOne;

    return alteredBlock;
  };
  /* eslint-disable-next-line no-undef */
  return sortWrapper(data, assignHeader);
};