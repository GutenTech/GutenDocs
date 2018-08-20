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
<<<<<<< 7c6e378b305f6a8a9b72021f18a86a7515a82f45
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
=======
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
      const address = pathData ? `${pathData.absPath.concat(pathData.dirName)}0.bundle.js` : undefined;
      if (!pathData) {
        console.log('You have not initialized gutendocs.  Call "gutendocs init"');
      } else {
        const input = argv.all ? ['./'] : argv._;
        extract(input).then(data => parseComments(data, address));
      }
    })
  .command(['config', 'c'], 'initialize gutendocs', {},
    () => {
      const pathData = findRC();
      if (!pathData) {
        console.log('You have not initialized gutendocs.  Call "gutendocs init"');
      } else {
        updateConfig(pathData.absPath.concat(pathData.dirName));
      }
    }).argv;

// yargs.parse(process.argv.slice(2), (err, argv, output) => {
// if (pathData !== false) {
//   const missingFiles = [];
//   argv._.forEach((fileName) => {
//     if (!fs.existsSync(fileName)) {
//       missingFiles.push(fileName);
//     }
//   });

//   // Invalid file paths were supplied.
//   if (missingFiles.length > 0) {
//     console.log('These files do not exist:'); /* eslint-disable-line no-console */
//     /* eslint-disable-next-line no-console */
//     missingFiles.forEach(fileName => console.log(fileName));
//     console.log('Parsing aborted.'); /* eslint-disable-line no-console */
//   }

//   // No invalid file paths supplied.  Parse the files.
//   if (missingFiles.length === 0) {
//     extract(argv._).then((data) => {
//       parseComments(data, address);
//     });
//   }
// }
// }
//   const pathData = findRC();
//   const address = pathData ? `${pathData.absPath.concat(pathData.dirName)}0.bundle.js` : undefined;
//   // Output error if something unexpected happened
//   if (err) {
//     console.error(output); /* eslint-disable-line no-console */
//     process.exitCode = 1;
//     return;
//   }

//   // help or version info
//   if (output) {
//     console.log(output); /* eslint-disable-line no-console */
//     return;
//   }

//   processOption(argv.all, () => extract(['./']).then(data => parseComments(data, address)));
//   const processOption = (option, cb) => {
//     if (option) {
//       if (pathData === false) {
//         console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
//       } else {
//         cb();
//       }
//     };
//   }


//   // if user supplied files parse them
//   if (argv._.length > 0) {
//     if (pathData === false) {
//       /* eslint-disable-next-line no-console */
//       console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
//     }

//     // if the gutendocs has been intialized
//     if (pathData !== false) {
//       const missingFiles = [];
//       argv._.forEach((fileName) => {
//         if (!fs.existsSync(fileName)) {
//           missingFiles.push(fileName);
//         }
//       });

//       // Invalid file paths were supplied.
//       if (missingFiles.length > 0) {
//         console.log('These files do not exist:'); /* eslint-disable-line no-console */
//         /* eslint-disable-next-line no-console */
//         missingFiles.forEach(fileName => console.log(fileName));
//         console.log('Parsing aborted.'); /* eslint-disable-line no-console */
//       }

//       // No invalid file paths supplied.  Parse the files.
//       if (missingFiles.length === 0) {
//         extract(argv._).then((data) => {
//           parseComments(data, address);
//         });
//       }
//     }
//   }
// });

// init: {
//   alias: 'i',
//   default: false,
//   describe: 'initialize gutendocs',
// },
// reset: {
//   alias: 'r',
//   default: false,
//   describe: 'reset gutendocs to fresh state',
// },
// config: {
//   alias: 'c',
//   default: false,
//   describe: 'updates the API styles from gutenConfig.json',
// },
// info: {
//   default: false,
//   describe: 'get package info',
// },

// processOption(argv.config, () => updateConfig(pathData.absPath.concat(pathData.dirName)));
// processOption(argv.reset, () => refreshAPI(pathData.absPath, pathData.dirName));

// initialize the gutendocs API
// if (argv.init) {
//   const folderName = argv.init === true ? 'GutenApi/' : argv.init.concat('/');
//   generateAPIFrame('./', folderName);
// }

// output the npm info for the package
// if (argv.info) {
//   exec('npm view gutendocs', ((npmErr, result) => {
//     if (npmErr) {
//       console.log('Failed to retrieve info'); /* eslint-disable-line no-console */
//     } else {
//       console.log(result); /* eslint-disable-line no-console */
//     }
//   }));
// }



// update the config file
// if (argv.config) {
//   if (pathData === false) {
//     /* eslint-disable-next-line no-console */
//     console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
//   } else {
//     updateConfig(pathData.absPath.concat(pathData.dirName));
//   }
// }

// // parse all files in directory and all subdirectories
// if (argv.all) {
//   if (pathData === false) {
//     /* eslint-disable-next-line no-console */
//     console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
//   } else {
//     // const exclude = fs.readFileSync(`${pathData.absPath}/.gutenignore`, 'utf8').split('\n');
//     extract(['./']).then((data) => {
//       parseComments(data, address);
//     });
//   }
// }

// // reset the files to the way they were when initialize
// if (argv.reset) {
//   if (pathData === false) {
//     /* eslint-disable-next-line no-console */
//     console.log('You have not initialized gutendocs.  Call "gutendocs --init"');
//   } else {
//     refreshAPI(pathData.absPath, pathData.dirName);
//   }
// }
>>>>>>> cli refactor in progress
