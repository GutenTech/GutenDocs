const {
  parse,
  Parser,
} = require('acorn-jsx');
const fs = require('fs');
const path = require('path');
const {
  Walker,
} = require('ignore-walk');
const {
  getRC,
} = require('../utils.js');

const exclude = (arr) => {
  const ROOT = path.dirname(getRC().absPath.slice(0, -1));
  const options = {
    path: ROOT,
    ignoreFiles: ['.gutenignore', 1],
  };
  return new Promise((resolve, reject) => {
    const walk = new Walker(options).on('done', resolve).on('error', reject);
    const rule = arr.reduce((r, p) => {
      const relPath = path.relative(ROOT, p);
      if (['.js', '.jsx'].includes(path.extname(p))) {
        return `${r}\n!${relPath}/**/*.js\n!${relPath}/**/*.jsx\n!${relPath}`;
      }
      return `${r}\n!${relPath}/**/*.js\n!${relPath}/**/*.jsx`;
    }, '*');
    walk.onReadIgnoreFile(1, rule, () => {});
    walk.start();
  });
};

const acornParse = (content, tagContent) => {
  parse(content, {
    plugins: {
      jsx: true,
    },
    allowImportExportEverywhere: true,
    onComment: (b, t, s, d) => {
      if (b && t[0] === '*') {
        const a = {
          comment: t,
        };
        const p = new Parser({
          plugins: {
            jsx: true,
          },
        }, content, d);
        p.nextToken();
        const node = p.parseStatement(true, true, exports);
        a.name = node.id ? node.id.name : node.declarations[0].id.name;
        tagContent.push(a);
      }
    },
  });
};

const extract = arr => exclude(arr).then((list) => {
  const ROOT = getRC().absPath;
  const badFiles = [];
  const result = list.map((f) => {
    const tag = {
      content: [],
      name: f,
    };
    const content = fs.readFileSync(`${path.dirname(ROOT)}/${f}`, 'utf8');
    try {
      acornParse(content, tag.content);
    } catch (e) {
      badFiles.push(f);
    }
    return tag;
  });
  /* eslint-disable-next-line no-console */
  console.log(`Files Processed: ${list.length}`);
  if (badFiles.length !== 0) {
    /* eslint-disable-next-line no-console */
    console.log(`The following ${badFiles.length} files were unparsable`);
    /* eslint-disable-next-line no-console */
    // badFiles.forEach(fileName => console.log(fileName));
  }
  // process.stdout.clearLine();
  // process.stdout.cursorTo(0);
  // process.stdout.write(`Files Processed: ${fileCount}`);
  // process.stdout.cursorTo(25);
  // process.stdout.write(item.path.replace(ROOT, './').slice(0, 60));
  return new Promise(resolve => resolve(result));
});

module.exports = extract;