const acorn = require('acorn');
const injectAcornJsx = require('acorn-jsx/inject');
const injectAcornObjectRestSpread = require('acorn-object-rest-spread/inject');
const fs = require('fs');
const path = require('path');
const {
  Walker,
} = require('ignore-walk');
const {
  getRC,
} = require('../utils.js');

injectAcornJsx(acorn);
injectAcornObjectRestSpread(acorn);
const {
  parse,
  Parser,
} = acorn;

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

const acornParse = (content, tagContent, gutenrc) => {
  parse(content, {
    plugins: {
      jsx: true,
      objectRestSpread: true,
    },
    ...gutenrc.acornSettings,
    onComment: (b, t, s, d) => {
      if (b && t[0] === '*') {
        const a = {
          comment: t,
        };
        const p = new Parser({
          plugins: {
            jsx: true,
            objectRestSpread: true,
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
  const gutenrc = getRC();
  const badFiles = [];
  const result = list.map((file, fileCount) => {
    const tag = {
      content: [],
      name: file,
    };
    const content = fs.readFileSync(`${path.dirname(gutenrc.absPath)}/${file}`, 'utf8');
    try {
      acornParse(content, tag.content, gutenrc);
    } catch (e) {
      badFiles.push(file);
      if (gutenrc.verbosity >= 4) {
        /* eslint-disable */
        console.log(`\n\nError processing ${file}\n**********`);
        console.log(e);
        console.log('**********\n');
        /* eslint-enable */
      } else if (gutenrc.verbosity >= 3) {
        /* eslint-disable-next-line no-console */
        console.log(`\n\nError processing ${file}\n**********\n${e.message}\n**********\n`);
      }
    }
    if (gutenrc.verbosity >= 2) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Files Processed: ${fileCount}`);
      process.stdout.cursorTo(25);
      process.stdout.write(file.slice(0, 60));
    }
    return tag;
  });
  /* eslint-disable-next-line no-console */
  console.log(`Files Processed: ${list.length}`);
  if (badFiles.length !== 0 && gutenrc.verbosity >= 2) {
    /* eslint-disable-next-line no-console */
    console.log(`\n\nThe following ${badFiles.length} files were unparsable\n***********`);
    /* eslint-disable-next-line no-console */
    badFiles.forEach(fileName => console.log(fileName));
  } else if (badFiles.length !== 0 && gutenrc.verbosity >= 1) {
    /* eslint-disable-next-line no-console */
    console.log(`${badFiles.length} files were unparsable`);
  }

  return new Promise(resolve => resolve(result));
});

module.exports = extract;