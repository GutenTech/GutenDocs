const acorn = require('acorn');
const fs = require('fs');
const doctrine = require('doctrine');

const saveTags = (tagsArray) => {
  fs.writeFile('./tags.json', JSON.stringify(tagsArray), (err) => {
    if (err) {
      throw err;
    }
  });
};

const parseComments = (commentsArray) => {
  const tags = [];
  commentsArray.forEach((comment) => {
    const funcName = comment.name;
    const commentObj = doctrine.parse(comment.comment, { unwrap: true });
    const descriptionTags = commentObj.tags.filter(tag => tag.title === 'description');
    commentObj.name = funcName;
    descriptionTags.forEach(((descriptionTag) => {
      commentObj.description = commentObj.description.concat(' \n').concat(descriptionTag.description);
    }));
    tags.push(commentObj);
  });
  saveTags(tags);
};

const getJSDocs = (fileText) => {
  const comments = [];
  acorn.parse(fileText, {
    onComment: (b, t) => {
      if (b) {
        comments.push({ comment: t, name: 'name' });
      }
    },
  });
  parseComments(comments);
};

fs.readFile('./parserSample.js', (err, data) => {
  if (err) {
    throw err;
  } else {
    getJSDocs(data.toString());
  }
});

module.exports = parseComments;
