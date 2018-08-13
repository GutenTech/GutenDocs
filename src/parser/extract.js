const {
  parse,
  parseExpressionAt,
  Parser,
  tokTypes,
} = require('acorn');
const fs = require('fs');
const dir = require('node-dir');

const extract = (path, exclude) => {
  const result = [];
  dir.readFiles(path, {
    exclude
  }, (err, content, fileName, next) => {
    console.log("?");
    if (err) {
      if (path instanceof RegExp) {
        console.log("regex");
      }
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
    };
  }, () => {
    console.log(result);
    return result;
  })
};
extract("*.js");
module.exports = extract;