/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const TagReturn = ({ tags, commentId }) => tags.map((tag, index) => (
  <div key={commentId.toString().concat(tag.title).concat(index)}>
    <div className="tagReturn">
      {
        `Return value: ${tag.description}`
      }
    </div>
    <div className="tagType">
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