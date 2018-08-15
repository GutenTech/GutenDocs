#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  argv,
} = require('yargs').option('all', {
  alias: 'a',
  default: false,
}).option('verbose', {
  alias: 'v',
  default: false,
}).option('init', {
  alias: 'i',
  default: false,
})
.option('refresh', {
  alias: 'r',
  default: false,
});
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');
const generateAPIFrame = require('../src/generateAPIFrame.js');
const { findRC } = require('../src/utils.js');

const input = argv.all ? ['./'] : argv._;
if (argv.init) {
  if (argv.init === true) {
    generateAPIFrame('./', 'GutenApi/');
  } else {
    generateAPIFrame('./', argv.init.concat('/'));
  }
} else {
  findRC((err, pathData) => {
    if (err) {
      console.log('You have not initialized gutendocs in any dirctory above current directory.  Call "gutendocs --init"');
    } else {
      if (argv.refresh) {
        console.log('refresh all the data');
      }
      const address = `${pathData[0].concat('/').concat(pathData[1])}0.bundle.js`;
      const exclude = fs.readFileSync(`${pathData[0]}/.gutenignore`, 'utf8').split('\n');
      extract(input, exclude).then((data) => {
        parseComments(data, address);
      });
    }
  });
}