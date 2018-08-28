<<<<<<< 595bbd8e39de9c3cd93d767089eed9c1dbcf4d95
const acorn = require('acorn');
const injectAcornJsx = require('acorn-jsx/inject');
const injectAcornObjectRestSpread = require('acorn-object-rest-spread/inject');
=======
// const {
//   parse,
//   Parser,
// } = require('acorn-jsx');
const util = require('util')
>>>>>>> Extract bugfixs
const fs = require('fs');
const path = require('path');
const { parse, Parser } = require('acorn-object-rest-spread/inject')(require('acorn-jsx/inject')(require('acorn-stage3')));
const walk = require("acorn/dist/walk")
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
    walk.onReadIgnoreFile(1, rule, () => { });
    walk.start();
  });
};

const acornParse = (content, tagContent) => {
  const arr = [];
  const tree = parse(content, {
    plugins: {
      jsx: true,
<<<<<<< 595bbd8e39de9c3cd93d767089eed9c1dbcf4d95
=======
      stage3: true,
>>>>>>> Extract bugfixs
      objectRestSpread: true,
    },
    ecmaVersion: 10,
    allowReserved: true,
    allowReturnOutsideFunction: true,
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowHashBang: true,
    onComment: (b, t, s, d) => {
      if (b && t[0] === '*') {
        arr.push({
          comment: t,
<<<<<<< 595bbd8e39de9c3cd93d767089eed9c1dbcf4d95
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
=======
          pos: d,
        });
>>>>>>> Extract bugfixs
      }
    },
  });
  // console.log('arr', arr);
  arr.forEach((x) => {
    const node = walk.findNodeAfter(tree, x.pos).node;
    // console.log('node', node.type);
    switch (node.type) {
      case 'MethodDefinition':
        tagContent.push({
          comment: x.comment,
          name: node.key.name,
        });
        return;
      case 'VariableDeclaration':
        node.declarations.forEach(
          declaration => tagContent.push(
            {
              comment: x.comment,
              name: declaration.id.name,
            },
          ),
        );
        return;
      case 'FunctionDeclaration':
        tagContent.push({
          comment: x.comment,
          name: node.id.name,
        });
        return;
      default:
    }
  }, []);
};
// const acornParse = (content, tagContent, gutenrc) => {
//   const type = ['ClassDeclaration', 'FunctionDeclaration', 'VariableDeclaration'];
//   parse(content, {
//     plugins: {
//       jsx: true,
//       // stage3: true,
//       // objectRestSpread: true,
//     },
//     ecmaVersion: 10,
//     // allowReserved: true,
//     allowReturnOutsideFunction: true,
//     allowImportExportEverywhere: true,
//     // allowAwaitOutsideFunction: true,
//     allowHashBang: true,
//     locations: true,
//     onComment: (b, t, s, d, l) => {
//       if (b && t[0] === '*') {
//         const p = new Parser({
//           plugins: {
//             jsx: true,
//             stage3: true,
//             objectRestSpread: true,
//           },
//           ecmaVersion: 10,
//           allowReserved: true,
//           allowReturnOutsideFunction: true,
//           allowImportExportEverywhere: true,
//           allowAwaitOutsideFunction: true,
//           allowHashBang: true,
//         }, content, d);
//         p.nextToken();
//         const node = p.parseStatement(true, true);
//         // console.log('node', node);
//         if (type.includes(node.type)) {
//           // console.log('location', l);
//           // console.log('node', node);
//           const a = {
//             comment: t,
//           };
//           // console.log(node);
//           // console.log(util.inspect(myObject, false, null))
//           a.name = node.id ? node.id.name : node.declarations[0].id.name;
//           tagContent.push(a);
//         }
//       }
//     },
//   });
// };

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
    // console.log('content', tag.content);
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

extract(['parseComments.js'])
module.exports = extract;