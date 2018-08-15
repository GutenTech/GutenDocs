#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');
const {
  argv,
} = require('yargs')
  .option('all', {
    alias: 'a',
    default: false,
    describe: 'parse all js/jsx in dir and subdir',
  }).option('init', {
    alias: 'i',
    default: false,
    describe: 'initialize gutendocs',
  })
  .option('reset', {
    alias: 'r',
    default: false,
    describe: 'reset gutendocs to fresh state',
  })
  .option('version', {
    alias: 'v',
    default: false,
    describe: 'output version of gutendocs installed',
  })
  .option('config', {
    alias: 'c',
    default: false,
    describe: 'updates the API styles from gutenConfig.json',
  })
  .option('info', {
    default: false,
    describe: 'get package info',
  })
  .usage('Usage: $0 filename [additional filenames optional]')
  .help();

const pjson = require('../package.json');
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');
const generateAPIFrame = require('../src/generateAPIFrame.js');
const refreshAPI = require('../src/refreshAPI.js');
const updateConfig = require('../src/updateConfig.js');
const {
  findRC,
} = require('../src/utils.js');

if (argv.init) {
  const folderName = argv.init === true ? 'GutenApi/' : argv.init.concat('/');
  generateAPIFrame('./', folderName);
} else if (argv.version) {
  console.log(pjson.version); /* eslint-disable-line no-console */
} else if (argv.info) {
  exec('npm view gutendocs', ((err, result) => {
    if (err) {
      console.log('Failed to retrieve info'); /* eslint-disable-line no-console */
    } else {
      console.log(result); /* eslint-disable-line no-console */
    }
  }));
} else {
  const pathData = findRC();
  if (pathData === false) {
    /* eslint-disable-next-line no-console */
    console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
  } else {
    const address = `${pathData[0].concat('/').concat(pathData[1])}/0.bundle.js`;
    if (argv.reset) {
      refreshAPI(pathData[0], pathData[1]);
    } else if (argv.config) {
      updateConfig(pathData[0].concat('/').concat(pathData[1]));
    } else if (argv.all) {
      // const exclude = fs.readFileSync(`${pathData[0]}/.gutenignore`, 'utf8').split('\n');
      extract(['./']).then((data) => {
        parseComments(data, address);
      });
    } else if (argv._.length > 0) {
      const missingFiles = [];
      argv._.forEach((fileName) => {
        if (!fs.existsSync(fileName)) {
          missingFiles.push(fileName);
        }
      });
      if (missingFiles.length > 0) {
        console.log('These files do not exist:'); /* eslint-disable-line no-console */
        /* eslint-disable-next-line no-console */
        missingFiles.forEach(fileName => console.log(fileName));
        console.log('Parsing aborted.'); /* eslint-disable-line no-console */
      } else {
        extract(argv._).then((data) => {
          parseComments(data, address);
        });
      }
    } else {
      /* eslint-disable-next-line no-console */
      console.log('Gutendocs requires arguements.  Call "gutendocs --help" for help');
    }
  }
}