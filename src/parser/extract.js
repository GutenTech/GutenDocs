const {
  parse,
  parseExpressionAt,
  Parser,
  tokTypes,
} = require('acorn-jsx');
const fs = require('fs');
const glob = require('glob');
const klaw = require('klaw');
const path = require('path');
const {
  Walker,
} = require('ignore-walk');

const ROOT = require('../utils.js').findRC().absPath;

const globParse = address => new Promise((resolve, reject) => glob(address, {
  dot: true,
}, (err, files) => {
  if (err) {
    reject(err);
  } else {
    resolve(files);
  }
}));

const acornParse = (content, tagContent) => {
  parse(content, {
    plugins: {
      jsx: true,
    },
    allowImportExportEverywhere: true,
    onComment: (b, t, s, d) => {
      if (b && t[0] === '*') {
        const a = {};
        a.comment = t;
        const p = new Parser({
          plugins: {
            jsx: true,
          },
        }, content, d);
        p.nextToken();
        if (p.type === tokTypes._function) {
          a.name = parseExpressionAt(content, d).id.name;
        } else if (p.type === tokTypes._const) {
          a.name = p.parseVarStatement(p.startNode()).declarations[0].id.name;
        } else {
          a.name = p.parseStatement().declarations[0].id.name;
        }
        tagContent.push(a);
      }
    },
  });
};

const exclude = (address) => {
  const options = {
    path: ROOT,
    ignoreFiles: ['.gutenignore', 1],
  };
  return new Promise((resolve, reject) => {
    const walk = new Walker(options).on('done', resolve).on('error', reject);
    const relAddress = path.relative(ROOT, address);
    const rule = `*\n!${relAddress}/**/*\n!${relAddress}`;
    walk.onReadIgnoreFile(1, rule, () => {});
    walk.start();
  });
};

const walk = (x) => {
  const result = [];
  return exclude(x).then(list => new Promise((resolve, reject) => klaw(x)
    .on('data', (item) => {
      if (!item.stats.isDirectory() && ['.js', '.jsx'].includes(path.extname(item.path)) && list.includes(path.relative(ROOT, item.path))) {
        const tag = {
          content: [],
          name: path.relative(ROOT, item.path),
        };
        const content = fs.readFileSync(item.path, 'utf8');
        acornParse(content, tag.content);
        result.push(tag);
      }
    })
    .on('error', (err) => {
      reject(err);
    })
    .on('end', () => {
      resolve(result);
    })));
};


const extract = arr => Promise.all(arr.map(x => globParse(x))).then((x) => {
  const paths = [].concat(...x);
  return Promise.all(paths.map(address => walk(address))).then(result => [].concat(...result));
});

module.exports = extract;