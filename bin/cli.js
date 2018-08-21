#!/usr/bin/env node

/* eslint-disable  */
// const fs = require('fs');
// const {
//   exec,
// } = require('child_process');
const yargs = require('yargs');
const pjson = require('../package.json');
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');
const {
  findRC,
  refreshFile,
  updateConfig,
  refreshAPI,
  generateAPIFrame,
} = require('../src/utils.js');
const {
  execSorts,
  cleanAST
} = require('../src/sorters/execSorts.js');
const {
  saveTags
} = require('../src/parser/saveTags.js');

yargs.usage(`$0 ${pjson.version}
  Usage: $0 [options] <TargetPathPattern...>
         $0 <option> 
  For more information, see https://www.npmjs.com/package/gutendocs.
  `)
  .command(['init [file]', 'i'], 'initialize gutendocs', {}, (argv) => {
    generateAPIFrame('./', argv.file || 'GutenApi/');
  })
  .command(['reset', 'r'], 'updates the API styles from gutenConfig.json', {},
    () => {
      const pathData = findRC();
      if (!pathData) {
        console.log('You have not initialized gutendocs.  Call "gutendocs init"');
      } else {
        refreshAPI(pathData.absPath, pathData.dirName);
      }
    })
  .command('$0', 'generate the documentation', {
      all: {
        alias: 'a',
        describe: 'parse all js/jsx files in target path',
      },
      watch: {
        alias: 'w',
        describe: 'update GutenApi folder automatically',
      },
    },
    (argv) => {
      const pathData = findRC();
      if (pathData.absPath === 'unintialized') {
        /* eslint-disable-next-line no-console */
        console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
        return;
      }

      if (pathData.absPath === 'missing') {
        /* eslint-disable-next-line no-console */
        console.log('Your gutenrc folder seems to be missing a apiDir key indicating where the folder should be.');
        return;
      }

      if (pathData.err === 'corruptJSON') {
        refreshFile(pathData, '.gutenrc.json', 'client/dist/.gutenRCTemplate.json');
        return;
      }
      const address = pathData ? `${pathData.absPath.concat(pathData.dirName)}0.bundle.js` : undefined;
      const input = argv.all ? ['./'] : argv._;
      extract(input).then(data => {
        const rawAST = parseComments(data, address);
        const ast = cleanAST(rawAST);
        const dataToWrite = execSorts(ast);
        saveTags(dataToWrite, address);
      });
    })
  .command(['config', 'c'], 'initialize gutendocs', {},
    () => {
      const pathData = findRC();
      if (pathData.absPath === 'unintialized') {
        /* eslint-disable-next-line no-console */
        console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
        return;
      }

      if (pathData.absPath === 'missing') {
        /* eslint-disable-next-line no-console */
        console.log('Your gutenrc folder seems to be missing a apiDir key indicating where the folder should be.');
        return;
      }

      if (pathData.err === 'corruptJSON') {
        refreshFile(pathData, '.gutenrc.json', 'client/dist/.gutenRCTemplate.json');
        return;
      }
      updateConfig(pathData.absPath.concat(pathData.dirName));
    }).argv;

// if (argv._.length > 0) {
//   // if the gutendocs has been intialized
//   if (pathData !== false) {
//     const missingFiles = [];
//     argv._.forEach((fileName) => {
//       if (!fs.existsSync(fileName)) {
//         missingFiles.push(fileName);
//       }
//     });

//     // Invalid file paths were supplied.
//     if (missingFiles.length > 0) {
//       console.log('These files do not exist:'); /* eslint-disable-line no-console */
//       /* eslint-disable-next-line no-console */
//       missingFiles.forEach(fileName => console.log(fileName));
//       console.log('Parsing aborted.'); /* eslint-disable-line no-console */
//     }

//     // No invalid file paths supplied.  Parse the files.
//     if (missingFiles.length === 0) {
//       extract(argv._).then((data) => {
//         const rawAST = parseComments(data, address);
//         const ast = cleanAST(rawAST);
//         const dataToWrite = execSorts(ast);
//         saveTags(dataToWrite, address);
//       });