#!/usr/bin/env node

const {
  exec,
} = require('child_process');
/*eslint-disable */
const argv = require('yargs').option('all', {
  alias: 'a',
  default: false,
}).option('verbose', {
  alias: 'v',
  default: false,
}).argv;
/* eslint-enable */
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');

let input = argv.all ? './' : argv._[0];

exec('dirname `npm root`', (e, o) => {
  const address = `${o.slice(0, -1)}/client/dist/0.bundle.js`;
  parseComments(extract(input), address);
});