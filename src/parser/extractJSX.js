const {
  parse,
  parseExpressionAt,
  Parser,
  tokTypes,
} = require('acorn-jsx');
const fs = require('fs');
const glob = require('glob');
const klaw = require('klaw');

const globParse = path => new Promise((resolve, reject) => glob(path, {
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
        const p = new Parser(undefined, content, d);
        p.nextToken();
        if (p.type === tokTypes._function) {
          a.name = parseExpressionAt(content, d).id.name;
        } else if (p.type === tokTypes._const) {
          a.name = p.parseVarStatement(p.startNode()).declarations[0].id.name;
        } else {
          a.name = p.parseStatement().declarations[0].id.name;
          // a.name = p.parseVarStatement(p.startNode()).declarations[0].id.name;
          // a.name = parseExpressionAt(content, d).id.name;
        }
        // console.log(4);
        // tagContent.push(a);
      }
    },
  });
};

const walk = (x) => {
  const result = [];
  return new Promise((resolve, reject) => {
    klaw(x)
      .on('data', (item) => {
        if (!item.stats.isDirectory()) {
          const tag = {
            content: [],
            name: item.path,
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
        console.log('final result', result);
        resolve(result);
      });
  });
};

const extract = (arr) => Promise.all(arr.map(x => globParse(x))).then((x) => {
  const paths = [].concat(...x);
  return Promise.all(paths.map(path => walk(path))).then(result => [].concat(...result));
});

extract(['test.jsx']);
module.exports = extract;