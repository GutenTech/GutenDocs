const templateRC = require('../../client/dist/.gutenRCTemplate.json');

const getRC = () => Object.assign({ absPath: './' }, templateRC);

module.exports.getRC = getRC;