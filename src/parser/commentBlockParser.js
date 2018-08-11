const fs = require('fs');
const doctrine = require('doctrine');

const saveTags = (tagsArray) => {
  fs.writeFile('./tags.json', JSON.stringify(tagsArray), (err) => {
    if (err) {
      throw err;
    }
  });
};

/**
 * @description A function that will parse a JSdoc Block of Comments using Doctrine
 * @param comments {[]} An array of JSDoc Comment Blocks that have been extracted from a JS File.
 * @param name {string} Will need to be modified take in a name string.
 * @return n/a
 */

const parseComments = (commentsArray) => {
  if (!(commentsArray instanceof Array) || commentsArray === undefined) {
    throw new TypeError('Parse comments should receive and array of comments');
  }
  const tags = [];
  commentsArray.forEach((comment) => {
    if (!(comment instanceof Object)) {
      throw new TypeError('Array passed to parseComments should contain strings');
    }
    if (comment.comment === undefined || comment.name === undefined) {
      throw new TypeError('Each object in the passed in Array should have a a key of "comment" and "name"');
    }
    const funcName = comment.name;
    const commentObj = doctrine.parse(comment.comment, {
      unwrap: true,
    });
    const descriptionTags = commentObj.tags.filter(tag => tag.title === 'description');
    commentObj.name = funcName;
    descriptionTags.forEach(((descriptionTag) => {
      commentObj.description = commentObj.description.concat(' \n').concat(descriptionTag.description);
    }));
    tags.push(commentObj);
  });
  saveTags(tags);
  return JSON.stringify(tags);
};

module.exports.blockParser = parseComments;
