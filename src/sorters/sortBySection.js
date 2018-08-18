const sortBySection = (ast, sectionTag) => {

  ast.forEach((file) => {
    console.log(file.fileName);
    console.log(file.content)
  });
};

module.exports.sortBySection = sortBySection;


/* eslint-disable */

/*
[
  {"content":
    [
      {
      "description":"",
      
      "tags":[{"title":"description","description":"This function will save the data to the client/dist folder"}],
      
      "name":"saveTags"
      },
      
      {
        "description":"",
        
        "tags":[
          
          {"title":"description","description":"A function that will parse a JSdoc Block of Comments using Doctrine"},
          
          {"title":"param","description":"{[]} An array of JSDoc Comment Blocks structured in AST.","type":null,      "name":"commentsArray"},
          
          {"title":"param","description":"{string} The path that the file should be saved to.","type":null,"name":"address"},
          
          {"title":"return","description":"n/a","type":null}
        ],
          
          "name":"parseComments"}
    ],
      
  "fileName":"src/parser/parseComments.js"}
]

*/