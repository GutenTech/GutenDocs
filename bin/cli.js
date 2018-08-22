#!/usr/bin/env node

const yargs = require('yargs');
const pjson = require('../package.json');
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');
const {
  getRC,
  updateConfig,
  refreshAPI,
  generateAPIFrame,
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
    gutenrc.verbosity = 0;
  }
  /* eslint-disable-next-line no-console */
  if (gutenrc.verbosity === 1) console.log(err.message);
  /* eslint-disable-next-line no-console */
  else if (gutenrc.verbosity === 0) console.log(err);
};

yargs.usage(`$0 ${pjson.version}
  Usage: $0 [options] <TargetPathPattern...>
         $0 <option> 
  For more information, see https://www.npmjs.com/package/gutendocs.
  `);
yargs.command(['init [file]', 'i'], 'initialize gutendocs', {}, (argv) => {
  generateAPIFrame('./', argv.file || 'GutenApi/');
});
yargs.command(['reset', 'r'], 'overwrite api folder with initial values', {},
  () => {
    const gutenrc = getRC();
    if (gutenrc) {
      refreshAPI(gutenrc);
    }
  });
yargs.command('$0', 'Parse all file in dir and subdir', {
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

try {
  yargs.parse();
} catch (err) {
  errorHandler(err);
}