/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

const TagReturn = ({ tags, commentId }) => tags.map((tag, index) => (
  <div key={commentId.toString().concat(tag.title).concat(index)}>
    {
      `Return value: ${tag.description}`
    }
  </div>
));


export default TagReturn;

TagReturn.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};