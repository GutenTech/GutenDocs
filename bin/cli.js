#!/usr/bin/env node

const fs = require('fs');
const {
  exec,
} = require('child_process');
const {
  argv,
} = require('yargs').option('all', {
  alias: 'a',
  default: false,
}).option('verbose', {
  alias: 'v',
  default: false,
});
const extract = require('../src/parser/extract.js');
const parseComments = require('../src/parser/parseComments.js');


const input = argv.all ? ['./'] : argv._;

exec('dirname `npm root`', (e, o) => {
  const address = `${o.slice(0, -1)}/client/dist/0.bundle.js`;
  const exclude = fs.readFileSync(`${o.slice(0, -1)}/.gutenignore`, 'utf8').split('\n');
  console.log("in cli", input, argv._);
  extract(input, exclude).then((data) => {
    parseComments(data, address);
  });
});