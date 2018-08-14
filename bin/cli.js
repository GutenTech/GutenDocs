
#!/usr/bin/env node

const {
  exec,
} = require('child_process');
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');

var argv = require('yargs').option('all', {
  alias: 'a',
  default: false
}).option('verbose', {
  alias: 'v',
  default: false
}).argv;

if (argv.all) {
  exec('dirname `npm root`', (e, o) => {
    const address = `${o.slice(0, -1)}/client/dist/`;
    parseComments(extract(argv._[0]), address);
  });
} else {
  exec('dirname `npm root`', (e, o) => {
    const address = `${o.slice(0, -1)}/client/dist/0.bundle.js`;
    parseComments(extract(argv._[0]), address);
  });
}