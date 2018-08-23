/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

const TagReturn = ({ tags, commentId }) => tags.map((tag, index) => (
  <div key={commentId.toString().concat(tag.title).concat(index)}>
    <div>
      {
        `Return value: ${tag.description}`
      }
    </div>
    <div>
      {
        `- Type: ${tag.type ? tag.type.name : 'undefined'} Desc: ${tag.description}`
      }
    </div>
  </div>
));


export default TagReturn;

TagReturn.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};