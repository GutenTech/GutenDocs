#!/usr/bin/env node

const fs = require('fs');
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
  })
  .option('version', {
    alias: 'v',
    default: false,
  })
  .option('info', {
    default: false,
  })
  .option('config', {
    alias: 'c',
    default: false,
  });

const helpTxt = require('./help.js');
const pjson = require('../package.json');
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');
const generateAPIFrame = require('../src/generateAPIFrame.js');
const refreshAPI = require('../src/refreshAPI.js');
const updateConfig = require('../src/updateConfig.js');
const { findRC } = require('../src/utils.js');

const input = argv.all ? ['./'] : argv._;
if (argv.init) {
  let folderName;
  if (argv.init === true) {
    folderName = 'GutenApi/';
  } else {
    folderName = argv.init.concat('/');
  }
  generateAPIFrame('./', folderName);
} else if (argv.info) {
  helpTxt();
} else if (argv.version) {
  console.log(pjson.version);
} else {
  findRC((err, pathData) => {
    if (err) {
      console.log('You have not initialized gutendocs in any dirctory below current directory.  Call "gutendocs --init"');
    } else if (argv.refresh) {
      refreshAPI(pathData[0], pathData[1]);
      updateConfig(pathData[0].concat('/').concat(pathData[1]));
    } else if (argv.config) {
      updateConfig(pathData[0].concat('/').concat(pathData[1]));
    } else {
      const address = `${pathData[0].concat('/').concat(pathData[1])}0.bundle.js`;
      const exclude = fs.readFileSync(`${pathData[0]}/.gutenignore`, 'utf8').split('\n');
      extract(input, exclude).then((data) => {
        parseComments(data, address);
      });
    }
  });
}