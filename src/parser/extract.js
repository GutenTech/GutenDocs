const {
  parse,
  parseExpressionAt,
  Parser,
  tokTypes,
} = require('acorn');
const fs = require('fs');
const dir = require('node-dir');
const glob = require('glob');

const extract = (path, exclude) => {
  const result = [];
  if (glob.hasMagic(path)) {
    console.log("glob");
    glob(path, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        console.log(files);
        Promise.all(files.map(fileName => new Promise((resolve) => {
          const tag = {
            content: [],
            fileName,
          };
          const content = fs.readFileSync(fileName);
          parse(content, {
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
                }
                tag.content.push(a);
              }
            },
          });
          resolve(tag);
        }))).then((x) => {
          console.log(x);
          return x;
        });
      }
    })
  } else {
    console.log("not glob");
    console.log(path);
    console.log(exclude);
    dir.readFiles(path, {
      match: /.js$/,
      exclude,
    }, (err, content, fileName, next) => {
      console.log(fileName);
      if (err) {
        console.log(err);
      } else {
        const tag = {
          content: [],
          fileName,
        };
        result.push(tag);
        parse(content, {
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
              }
              tag.content.push(a);
            }
          },
        });
        // console.log('********************');
        next(); // next file
      }
    }, () => {
      console.log(result);
      return result;
    });
  }
};
// extract("**/*.js");

module.exports = extract;