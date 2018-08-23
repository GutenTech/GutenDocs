const parseCommentsArrayErr = (filesArray) => {
  if (!(filesArray instanceof Array)) {
    throw new TypeError('Parse comments should receive and array of comments');
  }
};

/**
 * @description error test description
 * @section parsing function
 */

const parseCommentsFileErr = (file) => {
  if (!(file instanceof Object)) {
    throw new TypeError('Array passed to parseComments should contain strings');
  }
  if (file.content === undefined || file.name === undefined) {
    throw new TypeError('Each object in input Array must have "comment" & "name" properties');
  }
};

module.exports.parseCommentsArrayErr = parseCommentsArrayErr;
module.exports.parseCommentsFileErr = parseCommentsFileErr;