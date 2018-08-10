const extract = require('../src/extract.js');

test('Single comment test', () => {
  const address = './mockData/singleComment.js';
  const expected = [{
    comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
    name: 'mul',
  }];
  expect(extract(address)).toEqual(expected);
});

test('Multiple comments test', () => {
  const address = './mockData/multipleComments.js';
  const expected = [{
    comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
    name: 'mul',
  }, {
    comment: '*\n * Sample function\n * @constructor\n * @param {number} a  Numerator\n * @param {number} b  Denominator\n * @return\n ',
    name: 'div',
  }];
  expect(extract(address)).toEqual(expected);
});

test('Declare function as a const', () => {
  const address = './mockData/constFunction.js';
  const expected = [{
    comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
    name: 'mul',
  }];
  expect(extract(address)).toEqual(expected);
});