// TODO add any modules you might need

/**
 * @description A function a user can define how they want to sort functions with
 * @param { {} } data Receive {ast, priority, options}
 * @return { {} } updatedData {ast, priority, options}
 */
module.exports = (data) => {
  /* eslint-disable-next-line */
  // ! This variable will contain any specifications you added to the GutenRC for the sorter
  const customOptionsFromGutenRC = data.options.sorterName;
  const assignHeader = (block, priority) => {
    const alteredBlock = Object.assign({}, block);

    // TODO This is where you will want to impliment the conditions of your sort
    // TODO the assignment of alterBlock.header is the only thing you should change
    alteredBlock.header = customOptionsFromGutenRC.someSpecOne;

    alteredBlock.priority = priority;
    return alteredBlock;
  };
  /* eslint-disable-next-line no-undef */
  return sortWrapper(data, assignHeader);
};