// const fs = require('fs');
// const { findRC } = require('../src/utils.js');
const extract = require('../src/parser/extract.js');


// module.lib.baz = jest.fn(() => 'bar');


// fs.writeFileSync = jest.fn();
// utils.findRC = { absPath: 'asdfasdfasdfsdf' };
// const findRC = jest.fn();
// findRC.mockReturnValue({ absPath: 'asdfasdfasdf' });

test('Single comment test', () => {
  const address = ['./mockData/singleComment.js'];
  const expected = [{
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }],
    name: 'mockData/singleComment.js',
  }];
  expect.assertions(1);
  return extract(address).then((received) => {
    expect(received).toEqual(expected);
  });
});

test('Multiple comments test', () => {
  const address = ['./mockData/subFolder/multipleComments.js'];
  const expected = [{
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }, {
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  Numerator\n * @param {number} b  Denominator\n * @return\n ',
      name: 'div',
    }],
    name: 'mockData/subFolder/multipleComments.js',
  }];
  expect.assertions(1);
  return extract(address).then((received) => {
    expect(received).toEqual(expected);
  });
});

test('Declare function as a const', () => {
  const address = ['./mockData/constFunction.js'];
  const expected = [{
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }],
    name: 'mockData/constFunction.js',
  }];
  expect.assertions(1);
  return extract(address).then((received) => {
    expect(received).toEqual(expected);
  });
});

test('Arrow Function test', () => {
  const address = ['./mockData/subFolder/moreFolder/arrowExpression.js'];
  const expected = [{
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }],
    name: 'mockData/subFolder/moreFolder/arrowExpression.js',
  }];
  expect.assertions(1);
  return extract(address).then((received) => {
    expect(received).toEqual(expected);
  });
});

test('should work for a folder and only process js and jsx file', () => {
  const address = ['./mockData/subFolder'];
  const expected = [{
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }, {
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  Numerator\n * @param {number} b  Denominator\n * @return\n ',
      name: 'div',
    }],
    name: 'mockData/subFolder/multipleComments.js',
  }, {
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }],
    name: 'mockData/subFolder/moreFolder/arrowExpression.js',
  }];
  expect.assertions(1);
  return extract(address).then((received) => {
    expect(received).toEqual(expected);
  });
});

xtest('should work for jsx', () => {
  const address = ['./mockData/arrowExpression.jsx'];
  const expected = [{
    content: [{
      comment: '*\n * @description displays the info about the field\n * @param props.data.fieldName the name of the field\n * @param props.data.notes the notes on the field\n ',
      name: 'FieldInfo',
    }],
    name: 'mockData/arrowExpression.jsx',
  }];
  expect.assertions(1);
  return extract(address).then((received) => {
    expect(received).toEqual(expected);
  });
});

xtest('should work for glob pattern', () => {
  const address = ['./mockData/**/*.js'];
  const expected = [{
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }],
    name: 'mockData/constFunction.js',
  }, {
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }],
    name: 'mockData/singleComment.js',
  }, {
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }],
    name: 'mockData/subFolder/moreFolder/arrowExpression.js',
  }, {
    content: [{
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  First multiplier\n * @param {number} b  Second multiplier\n * @return\n ',
      name: 'mul',
    }, {
      comment: '*\n * Sample function\n * @constructor\n * @param {number} a  Numerator\n * @param {number} b  Denominator\n * @return\n ',
      name: 'div',
    }],
    name: 'mockData/subFolder/multipleComments.js',
  }];
  expect.assertions(1);
  return extract(address).then((received) => {
    expect(received).toEqual(expected);
  });
});

// fs.unlinkSync('./'.concat(TestFolderName));

// if (OriginalRCFileContent) fs.writeFileSync('.gutenrc.json', OriginalRCFileContent);