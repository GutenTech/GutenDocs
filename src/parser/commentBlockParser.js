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
  const tags = [];
  commentsArray.forEach((comment) => {
    // This may need to be modified to take in a name
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
};

exports.parseComments = parseComments;

