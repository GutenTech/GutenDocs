const parseComments = require('../src/parser/parseComments.js');

const testOutputLocation = './mockData/outputFromTest.js';
jest.mock('fs');
describe('parseComments', () => {
  it('should be a function', () => expect(parseComments).toBeInstanceOf(Function));
  it('should throw error on a string', () => expect(() => parseComments('hello')).toThrowError());
  it('should throw error on a number', () => expect(() => parseComments(5)).toThrowError());
  it('should throw error when not passed params', () => expect(() => parseComments()).toThrowError());
  it('should throw error passed an object with no key of comment',
    () => expect(() => parseComments([{}])).toThrowError());
  it('should throw error passed an object with no key of name',
    () => expect(() => parseComments([{
      comment: '',
    }])).toThrowError());

  xit('should turn a array of comments into AST objects containing info about the comment',
    () => expect(parseComments([{
      content: [{
        comment: '*\n * @description sample description\n ',
        name: 'someFxnName',
      }],
      name: '../src/parser/test.js',
    }], testOutputLocation)).toEqual([{
      content: [{
        description: 'sample description',
        tags: [{
          title: 'description',
          description: 'sample description',
        }],
        name: 'someFxnName',
      }],
      fileName: '../src/parser/test.js',
    }]));

  xit('should turn a array of comments with tags into AST objects containing info about the comment including an array of tags', () => expect(parseComments([{
    content: [{
      comment: '*\n * @description sample description\n ',
      name: 'someFxnName',
    }, {
      comment: '*\n * @description sample description2\n ',
      name: 'someFxnName2',
    }],
    name: '../src/parser/test.js',
  }], testOutputLocation)).toEqual(
    [{
      content: [{
        description: 'sample description',
        tags: [{
          title: 'description',
          description: 'sample description',
        }],
        name: 'someFxnName',
      }, {
        description: 'sample description2',
        tags: [{
          title: 'description',
          description: 'sample description2',
        }],
        name: 'someFxnName2',
      }],
      fileName: '../src/parser/test.js',
    }],
  ));

  xit('should add any tags of description to the description key of the object', () => expect(parseComments(
    [{
      content: [{
        comment: '*\n * blank description\n * @description sample description\n ',
        name: 'someFxnName',
      }, {
        comment: '*\n * @description sample description2\n ',
        name: 'someFxnName2',
      }],
      name: '../src/parser/test.js',
    }], testOutputLocation,
  )).toEqual(
    [{
      content: [{
        description: 'blank description\nsample description',
        tags: [{
          title: 'description',
          description: 'sample description',
        }],
        name: 'someFxnName',
      }, {
        description: 'sample description2',
        tags: [{
          title: 'description',
          description: 'sample description2',
        }],
        name: 'someFxnName2',
      }],
      fileName: '../src/parser/test.js',
    }],
  ));
});