/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

const TagDesc = ({ tags, commentId }) => tags.map((tag, index) => (
  <div key={commentId.toString().concat(tag.title).concat(index)}>
    {tag.description}
  </div>
));

export default TagDesc;

TagDesc.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};