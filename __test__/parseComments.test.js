const parseComments = require('../Parser/commentBlockParser.js');

describe('parseComments', () => {
  parseComments.getJSDocs('hello');
  it('should be true', () => expect(true).toEqual(true));
});

describe('parseComments', () => {
  it('should be true', () => expect(true).toEqual(true));
});
