const {
  parse,
  parseExpressionAt,
  Parser,
  tokTypes,
} = require('acorn');
const fs = require('fs');

const extract = (address) => {
  const content = fs.readFileSync(address, 'utf8');
  const result = [];
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
          a.name = p.parseVarStatement(p.startNode());
        } else {
          a.name = p.parseStatement().declarations[0].id.name;
        }
        result.push(a);
      }
    },
  });
  return result;
};

module.exports = extract;