const parseComments = require('../src/parser/parseComments.js');

const testOutputLocation = './mockData/outputFromTest.js';
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
  it('should turn a array of comments into AST objects containing info about the comment',
    () => expect(parseComments([{
      comment: '* this is a description',
      name: 'test',
    }], testOutputLocation))
      .toEqual([{
        description: 'this is a description',
        name: 'test',
        tags: [],
      }]));
  it('should turn a array of comments with tags into AST objects containing info about the comment including and array of tags', () => expect(parseComments([{
    comment: '* this is a description \n * @param { String } param',
    name: 'test',
  }], testOutputLocation)).toEqual([{
    description: 'this is a description',
    name: 'test',
    tags: [{
      description: null,
      name: 'param',
      title: 'param',
      type: {
        name: 'String',
        type: 'NameExpression',
      },
    }],
  }]));
  it('should add any tags of description to the description key of the object', () => expect(parseComments([{
    comment: '* this is a description \n * @description some more description',
    name: 'test',
  }], testOutputLocation)).toEqual([{
    description: 'this is a description\nsome more description',
    name: 'test',
    tags: [{
      description: 'some more description',
      title: 'description',
    }],
  }]));
});