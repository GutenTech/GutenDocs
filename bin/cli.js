#!/usr/bin/env node

const yargs = require('yargs');
const pjson = require('../package.json');
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');
const {
  findRC,
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
    const pathData = findRC();
    if (pathData) {
      refreshAPI(pathData.absPath, pathData.dirName);
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
  const pathData = findRC();
  if (pathData) {
    const address = pathData ? `${pathData.absPath.concat(pathData.dirName)}0.bundle.js` : undefined;
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
    const pathData = findRC();
    if (pathData) {
      updateConfig(pathData.absPath.concat(pathData.dirName));
    }
  });

return yargs.argv;