const doctrine = require('doctrine');
const fs = require('fs');
const wp = require('./webpackTemplates.js');

const _throw = err => {throw err;}

/**
 * @description This function will save the data to the client/dist folder
 */

const saveTags = (data, path) => {
  const dataToSave = JSON.stringify(data).replace(/\\n/g, '\\\\n');
   
  fs.writeFile(path, wp.x(dataToSave), (err) => {
    err ? _throw(err) : console.log('Parsed Data Can Now Be Viewed In Your Index.html File');
  });
};

const procDesc = (descriptionTagArray) => {
  let description = '\n';
  
  descriptionTagArray.forEach((descriptionTag) => {
    description = description.concat(descriptionTag.description);
  });
  
  return description;
}


const processFile = (tagArray) => {
  const tags = { content: [], };
  
  tagArray.forEach(x => {
    const fileObj = doctrine.parse(x.comment, { unwrap: true,});
    fileObj.name = x.name;
    fileObj.description = procDesc(fileObj.tags.filter(tag => tag.title === 'description'));
    tags.content.push(fileObj);
  });
  
  return tags;
};


/**
 * @description A function that will parse a JSdoc Block of Comments using Doctrine
 * @param commentsArray {[]} An array of JSDoc Comment Blocks structured in AST.
 * @param address {string} The path that the file should be saved to.
 * @return n/a
 */
const parseComments = (filesArray, address) => {
  if (!(filesArray instanceof Array)) {
    throw new TypeError('Parse comments should receive and array of comments');
  }
  const files = [];
  filesArray.forEach((file) => {
    if (!(file instanceof Object)) {
      throw new TypeError('Array passed to parseComments should contain strings');
    }
    if (file.content === undefined || file.name === undefined) {
      throw new TypeError('Each object in input Array must have "comment" & "name" properties');
    }
    const fileContent = processFile(file.content);
    fileContent.fileName = file.name;
    files.push(fileContent);
  });
  saveTags(files, address);
}

module.exports = parseComments;