const { sortBySection } = require('../src/sorters/sorters.js');

jest.mock('../src/utils.js');

describe('sortBySection.js foundational tests', () => {
  it('should be a function', () => expect(sortBySection).toBeInstanceOf(Function));

  it('should throw an error on receiving a non-array as AST', () => {
    expect(() => sortBySection('hello world', '@section', 1)).toThrowError();
  });
});


/* eslint-disable */
// [
//   {
//     content: 
//       [
//         {
//           description: '', 
//           tags: [{title: 'description', description: 'sample description'}],
//           name: 'Sample Function Block'
//         }
//       ]
//   }
// ]
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