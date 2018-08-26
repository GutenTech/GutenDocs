/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const GeneratedFunc = ({ funcComment }) => `      ${funcComment.name}(`
  .concat(
    funcComment.tags.filter(tag => tag.title === 'param').map((tag, index, allParams) => {
      const param = [];
      if (tag.type !== null && tag.type.type !== null && tag.type.type === 'OptionalType') param.push(` [${tag.name}]`);
      else param.push(` ${tag.name}`);
      if (allParams.length === index + 1) param.push(' ');
      return param.join('');
    }),
  ).concat(')');

export default GeneratedFunc;

GeneratedFunc.propTypes = {
  /* eslint-disable-next-line */
  funcComment: PropTypes.object.isRequired,
};