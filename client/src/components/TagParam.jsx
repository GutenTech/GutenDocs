/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const TagParam = ({ tags, commentId }) => tags.map((tag, index) => (
  <div key={commentId.toString().concat(tag.title).concat(index)}>
    <div>
      {
        `Param: ${tag.name}`
      }
    </div>
    <div>
      {
        ` - Type: ${tag.type ? tag.type.name : 'undefined'} Desc: ${tag.description}`
      }
    </div>
  </div>
));


export default TagParam;

TagParam.propTypes = {
  /* eslint-disable-next-line */
  tags: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};