module.exports = {
  extends: 'airbnb-base',
  "rules": {
    "eol-last": "off",
    "no-underscore-dangle": "off",
  },
  "env": {
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
  }
};