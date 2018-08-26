/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */
const styles = {
  lineHeight: '15px',
  display: 'block',
};
const TagExample = ({ tags, commentId }) => tags.map((tag, index) => (
  <div id="exampleTag" key={commentId.toString().concat(tag.title).concat(index)}>
    {tag.description.split('\n').map(line => <p style={styles}>{line}</p>)}
  </div>
));

export default TagExample;

TagExample.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};