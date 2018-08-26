/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const styles = {
  lineHeight: '15px',
  display: 'block',
};
const TagExample = ({ tags, commentId }) => tags.map((tag, exampleNum) => (
  <div
    id="exampleTag"
    key={
          commentId.toString()
            .concat(tag.title)
            .concat(exampleNum)
        }
  >
    {tag.description.split('\n')
      .map((line, exampleLineNum) => (
        <p
          style={styles}
          key={
                commentId.toString()
                  .concat(tag.title)
                  .concat(exampleNum)
                  .concat(exampleLineNum)
              }
        >
          {
            line
          }
        </p>
      ))}
  </div>
));

export default TagExample;

TagExample.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};