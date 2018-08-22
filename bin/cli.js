#!/usr/bin/env node

const {
  exec,
} = require('child_process');
const yargs = require('yargs');
const pjson = require('../package.json');
const globalSettings = require('../client/dist/.gutenRCTemplate.json');
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');
const {
  getRC,
  updateConfig,
  refreshAPI,
  generateAPIFrame,
  setVerbosity,
} = require('../src/utils.js');
const {
  execSorts,
  cleanAST,
} = require('../src/sorters/execSorts.js');
const {
  saveTags,
} = require('../src/parser/saveTags.js');

const errorHandler = (err) => {
  let gutenrc;
  try {
    gutenrc = getRC();
  } catch (error) {
    gutenrc = {};
    gutenrc.verbosity = globalSettings.verbosity;
  }
  /* eslint-disable-next-line no-console */
  if (gutenrc.verbosity === 0) console.log(err.message);
  /* eslint-disable-next-line no-console */
  else if (gutenrc.verbosity === 1) console.log(err);
  /* eslint-disable-next-line no-console */
  else console.log(err);
};

yargs.usage(`$0 ${pjson.version}
  Usage: $0 [options] <TargetPathPattern...>
         $0 <option> 
  For more information, see https://www.npmjs.com/package/gutendocs.
  `);

yargs.command(['init [file]', 'i'], 'initialize gutendocs', {}, (argv) => {
  generateAPIFrame('./', argv.file || 'GutenApi/');
});

yargs.command(['reset', 'r'], 'overwrite api folder with initial values', {
  backup: {
    alias: 'b',
    describe: 'create a backup copy before resetting the folder',
  },
},
(argv) => {
  const gutenrc = getRC();
  if (gutenrc) {
    refreshAPI(gutenrc, argv.backup);
  }
});

yargs.command(['parse', 'document', 'doc', 'd'], 'Parse all file in dir and subdir', {
  all: {
    alias: 'a',
    describe: 'parse all js/jsx files in target path',
  },
  watch: {
    alias: 'w',
    describe: 'update GutenApi folder automatically',
  },
}, (argv) => {
  const gutenrc = getRC();
  if (gutenrc) {
    const address = gutenrc ? `${gutenrc.absPath.concat(gutenrc.apiDir)}0.bundle.js` : undefined;
    const input = argv.all ? ['./'] : argv._;
    extract(input).then((data) => {
      const rawAST = parseComments(data, address);
      const ast = cleanAST(rawAST);
      const dataToWrite = execSorts(ast);
      saveTags(dataToWrite, address);
    });
  }
});

yargs.command(['config', 'c'], 'update rendered API with gutenConfig settings', {},
  () => {
    const gutenrc = getRC();
    if (gutenrc) {
      updateConfig(gutenrc);
    }
  });

yargs.command(['verbosity [level]', 'verbose [level]'], 'Set verbosity level [0-5]', {
  global: {
    alias: 'g',
    describe: 'set the default verbosity for gutendocs',
  },
}, (argv) => {
  const gutenrc = getRC();
  if (Object.prototype.hasOwnProperty.call(argv, 'g')) { // needed hasOwnProperty because 0 is falsy
    setVerbosity(argv.global, gutenrc, true);
    return;
  }
  if (gutenrc) {
    setVerbosity(argv.level, gutenrc);
  }
});

yargs.command(['info'], 'Get info about the package', {},
  () => {
    exec('npm view gutendocs', (npmErr, results) => {
      if (npmErr) {
        throw new Error('Npm was unable to retrieve info on the gutendocs project');
      } else {
        /* eslint-disable-next-line no-console */
        console.log(results);
      }
    });
  });

yargs.command(['version'], 'See version information', {},
  () => {
    /* eslint-disable-next-line no-console */
    console.log(`Gutendocs version ${pjson.version}`);
  });


// TODO this should be the default and should be uncommented
// TODO could probably be written without exec but I couldn't figure out how
// yargs.command('$0', 'See usage information', {},
//   () => {
//     exec('gutendocs help', (npmErr, results) => {
//       if (npmErr) {
//         throw new Error('Something went wrong running "gutendocs help",'
//         + 'try it explicitly yourself');
//       } else {
//         /* eslint-disable-next-line no-console */
//         console.log(results);
//       }
//     });
//   });


// TODO left this in for development purposes so people could still use it the way they have been
// TODO should be removed when the above is uncommented.
yargs.command('$0', 'Parse all file in dir and subdir', {
  all: {
    alias: 'a',
    describe: 'parse all js/jsx files in target path',
  },
  watch: {
    alias: 'w',
    describe: 'update GutenApi folder automatically',
  },
}, (argv) => {
  const gutenrc = getRC();
  if (gutenrc) {
    const address = gutenrc ? `${gutenrc.absPath.concat(gutenrc.apiDir)}0.bundle.js` : undefined;
    const input = argv.all ? ['./'] : argv._;
    extract(input).then((data) => {
      const rawAST = parseComments(data, address);
      const ast = cleanAST(rawAST);
      const dataToWrite = execSorts(ast);
      saveTags(dataToWrite, address);
    });
  }
});

try {
  yargs.parse();
} catch (err) {
  errorHandler(err);
}