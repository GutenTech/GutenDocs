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
const { findRC } = require('../utils.js');

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

const exclude = (address, ROOT) => {
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

const walk = (searchPath, ROOT) => {
  const result = [];
  let badFile = false;
  let fileCount = 0;
  const unReadableFiles = [];
  return exclude(searchPath, ROOT).then(list => new Promise((resolve, reject) => klaw(searchPath)
    .on('data', (item) => {
      if (!item.stats.isDirectory() && ['.js', '.jsx'].includes(path.extname(item.path)) && list.includes(path.relative(ROOT, item.path))) {
        const tag = {
          content: [],
          name: path.relative(ROOT, item.path),
        };
        const content = fs.readFileSync(item.path, 'utf8');
        try {
          acornParse(content, tag.content);
        } catch (error) {
          unReadableFiles.push(path.basename(item.path));
          badFile = true;
        }
        fileCount += 1;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Files Processed: ${fileCount}`);
        process.stdout.cursorTo(25);
        process.stdout.write(item.path.replace(ROOT, './').slice(0, 60));
        if (!badFile) {
          result.push(tag);
        }
        badFile = false;
      }
    })
    .on('error', (err) => {
      reject(err);
    })
    .on('end', () => {
      resolve(result);
      process.stdout.write('\n');
      if (unReadableFiles.length !== 0) {
        /* eslint-disable-next-line no-console */
        console.log(`${unReadableFiles.lenth} files were unpasable, and ommited from parsing:`);
        /* eslint-disable-next-line no-console */
        unReadableFiles.forEach(fileName => console.log(fileName));
      } else {
        /* eslint-disable-next-line no-console */
        console.log('All .js and .jsx files were parsed (except those indicated in the ignore file');
      }
    })));
};


const extract = arr => Promise.all(arr.map(x => globParse(x))).then((x) => {
  const ROOT = findRC().absPath;
  const paths = [].concat(...x);
  return Promise.all(paths.map(address => walk(address, ROOT)))
    .then(result => [].concat(...result));
});

module.exports = extract;